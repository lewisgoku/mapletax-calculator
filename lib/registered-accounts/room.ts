import { RRSP_2026, TFSA_2026, FHSA_2026 } from './2026';

// ---------------------------------------------------------------------------
// RRSP
// ---------------------------------------------------------------------------

export interface RRSPRoomInput {
  /** Prior tax year's earned income (employment + self-employment + net rental) */
  priorYearEarnedIncome: number;
  /** Unused RRSP room carried forward from prior years (from CRA Notice of Assessment) */
  carryForward?: number;
  /** Pension adjustment from T4 box 52 — reduces room dollar-for-dollar */
  pensionAdjustment?: number;
}

export interface RRSPRoomResult {
  /** New room earned this year: min(18% × earned income, dollar limit) */
  newRoomThisYear: number;
  /** Total available room: newRoomThisYear + carryForward − pensionAdjustment */
  totalRoom: number;
  /** True when the 18% formula was capped at the dollar limit */
  cappedAtDollarLimit: boolean;
}

/**
 * Compute 2026 RRSP contribution room.
 *
 * Formula: new room = min(18% × prior-year earned income, dollar limit)
 * Total room = new room + carry-forward − pension adjustment
 */
export function computeRRSPRoom(
  input: RRSPRoomInput,
  data: typeof RRSP_2026 = RRSP_2026,
): RRSPRoomResult {
  if (input.priorYearEarnedIncome < 0) {
    throw new RangeError('priorYearEarnedIncome must be non-negative');
  }
  if (input.pensionAdjustment !== undefined && input.pensionAdjustment < 0) {
    throw new RangeError('pensionAdjustment must be non-negative');
  }

  const formula = data.percentageOfEarnedIncome * input.priorYearEarnedIncome;
  const cappedAtDollarLimit = formula >= data.dollarLimit;
  const newRoomThisYear = Math.min(formula, data.dollarLimit);

  const carryForward = input.carryForward ?? 0;
  const pensionAdjustment = input.pensionAdjustment ?? 0;

  const totalRoom = Math.max(0, newRoomThisYear + carryForward - pensionAdjustment);

  return { newRoomThisYear, totalRoom, cappedAtDollarLimit };
}

// ---------------------------------------------------------------------------
// TFSA
// ---------------------------------------------------------------------------

export interface TFSARoomInput {
  /** Year the person was born */
  birthYear: number;
  /** Current tax year for which to compute room */
  currentYear: number;
  /** Total TFSA contributions made to date across all accounts */
  contributionsToDate: number;
  /** TFSA withdrawals made in the previous calendar year (room returns Jan 1 this year) */
  withdrawalsLastYear?: number;
}

export interface TFSARoomResult {
  /** Total room available right now (cumulativeLimit − contributions + prior-year withdrawals) */
  availableRoom: number;
  /** Sum of all annual limits from first eligible year through currentYear */
  cumulativeLimit: number;
  /** True when contributions exceed cumulative limit plus prior-year withdrawals */
  isOverContributed: boolean;
  /** Amount over-contributed (0 when not over-contributed) */
  overContributionAmount: number;
}

/**
 * Compute cumulative TFSA contribution room.
 *
 * Room accumulates from the LATER of:
 *  (a) the year the person turned 18, or
 *  (b) 2009 (program inception).
 * Withdrawals made in the prior calendar year restore room on January 1.
 */
export function computeTFSARoom(
  input: TFSARoomInput,
  data: typeof TFSA_2026 = TFSA_2026,
): TFSARoomResult {
  const firstEligibleYear = Math.max(input.birthYear + 18, 2009);

  if (input.birthYear > input.currentYear) {
    throw new RangeError('birthYear cannot be after currentYear');
  }
  if (input.contributionsToDate < 0) {
    throw new RangeError('contributionsToDate must be non-negative');
  }
  if (input.withdrawalsLastYear !== undefined && input.withdrawalsLastYear < 0) {
    throw new RangeError('withdrawalsLastYear must be non-negative');
  }

  // Sum annual limits from first eligible year through currentYear
  let cumulativeLimit = 0;
  for (let year = firstEligibleYear; year <= input.currentYear; year++) {
    const limit = data.annualLimitsByYear[year];
    if (limit !== undefined) {
      cumulativeLimit += limit;
    }
  }

  const withdrawalsLastYear = input.withdrawalsLastYear ?? 0;
  const effectiveRoom = cumulativeLimit + withdrawalsLastYear - input.contributionsToDate;

  const isOverContributed = effectiveRoom < 0;
  const availableRoom = Math.max(0, effectiveRoom);
  const overContributionAmount = isOverContributed ? Math.abs(effectiveRoom) : 0;

  return { availableRoom, cumulativeLimit, isOverContributed, overContributionAmount };
}

// ---------------------------------------------------------------------------
// FHSA
// ---------------------------------------------------------------------------

export interface FHSARoomInput {
  /** Calendar year the first FHSA was opened */
  accountOpenYear: number;
  /** Current tax year */
  currentYear: number;
  /** Total FHSA contributions made to date across all accounts */
  contributionsToDate: number;
}

export interface FHSARoomResult {
  /** Room available to contribute in the current year (new annual room + carry-forward) */
  annualRoomThisYear: number;
  /** Remaining lifetime room: lifetimeLimit − contributionsToDate */
  lifetimeRoomRemaining: number;
  /**
   * Carry-forward amount from prior year unused room.
   * Modelled as max(0, annualLimit − min(contributionsToDate, annualLimit))
   * since year-by-year contribution history is not tracked.
   * Capped at annualLimit per CRA rules (max $8,000 carry-forward in any year).
   */
  carryForwardAvailable: number;
}

/**
 * Compute FHSA contribution room for the current year.
 *
 * CRA rules: each year the account is open adds $8,000 of room. Up to $8,000
 * of unused room from the prior year carries forward (max $16,000 in any year).
 * Lifetime ceiling is $40,000.
 *
 * Note: this function accepts total contributions-to-date rather than a
 * year-by-year breakdown. Carry-forward is estimated conservatively as the
 * unused portion of one year's annual room (i.e., the first $8,000 of room
 * minus the portion of contributions that fits within it).
 */
export function computeFHSARoom(
  input: FHSARoomInput,
  data: typeof FHSA_2026 = FHSA_2026,
): FHSARoomResult {
  if (input.accountOpenYear > input.currentYear) {
    throw new RangeError('accountOpenYear cannot be after currentYear');
  }
  if (input.contributionsToDate < 0) {
    throw new RangeError('contributionsToDate must be non-negative');
  }

  const lifetimeRoomRemaining = Math.max(0, data.lifetimeLimit - input.contributionsToDate);

  // Carry-forward = unused portion of a single year's annual room
  // (conservative estimate when year-by-year history is unavailable)
  const carryForwardAvailable = Math.max(
    0,
    data.annualLimit - Math.min(input.contributionsToDate, data.annualLimit),
  );

  const annualRoomThisYear = Math.min(
    data.annualLimit + carryForwardAvailable,
    lifetimeRoomRemaining,
  );

  return { annualRoomThisYear, lifetimeRoomRemaining, carryForwardAvailable };
}
