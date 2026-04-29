import type { RESP_2026 } from './2026';

export interface CesgProjectionInput {
  /** Year the beneficiary was born (e.g. 2020) */
  beneficiaryBirthYear: number;
  /** Calendar year for which to project CESG (e.g. 2026) */
  currentYear: number;
  /** Planned contribution for currentYear */
  annualContribution: number;
  /** Total contributions ever made to this beneficiary's RESP */
  totalContributionsToDate: number;
  /** Total basic CESG received to date (check RESP statement) */
  totalCesgReceivedToDate: number;
  /** Prior-year family net income — used to determine Additional CESG eligibility */
  familyNetIncome?: number;
  /**
   * Whether the beneficiary meets the age-15/16/17 special CESG eligibility rules.
   * Only required when beneficiaryAge is 15, 16, or 17.
   * Rules: at least $2,000 contributed in any single prior year, OR at least $100
   * contributed in at least 4 prior calendar years.
   * Pass `false` to model the case where conditions are not met (returns $0 CESG).
   * Pass `undefined` (default) when unknown — a warning is surfaced.
   */
  meetsAge17Requirements?: boolean;
}

export interface CesgProjectionResult {
  /** Basic CESG earned in currentYear (before additional CESG) */
  cesgThisYear: number;
  /** Additional CESG earned in currentYear (low/mid income supplement) */
  additionalCesgThisYear: number;
  /** Total CESG earned this year (basic + additional) */
  totalCesgThisYear: number;
  /** Remaining lifetime basic CESG that can still be earned */
  cesgRemainingLifetime: number;
  /** Number of years (including currentYear) where CESG can still be earned */
  yearsOfEligibilityRemaining: number;
  /** Projected total basic CESG earned (to date + this year + future years at same annual contribution) */
  projectedTotalCesg: number;
  /** Lifetime contribution room remaining: lifetimeContributionLimit − totalContributionsToDate */
  lifetimeContributionRemaining: number;
  /** False when beneficiary has passed the December 31 of the year they turn 17 */
  isEligibleThisYear: boolean;
  /**
   * Warning message when age-15/16/17 special rules may affect eligibility,
   * or when the beneficiary is no longer eligible.
   */
  warningMessage: string | null;
}

/**
 * Project CESG for a single calendar year and estimate future CESG at the stated annual pace.
 *
 * CESG is earned until December 31 of the year the beneficiary turns 17.
 * In the year the beneficiary is age 15, 16, or 17, special prior-contribution
 * conditions must be met — see meetsAge17Requirements input.
 */
export function projectCesg(
  input: CesgProjectionInput,
  data: typeof RESP_2026,
): CesgProjectionResult {
  const beneficiaryAge = input.currentYear - input.beneficiaryBirthYear;
  const lastEligibleYear = input.beneficiaryBirthYear + data.cesgEligibilityMaxAge;
  const isEligibleThisYear = input.currentYear <= lastEligibleYear;

  const lifetimeContributionRemaining = Math.max(
    0,
    data.lifetimeContributionLimit - input.totalContributionsToDate,
  );

  if (!isEligibleThisYear) {
    return {
      cesgThisYear: 0,
      additionalCesgThisYear: 0,
      totalCesgThisYear: 0,
      cesgRemainingLifetime: 0,
      yearsOfEligibilityRemaining: 0,
      projectedTotalCesg: input.totalCesgReceivedToDate,
      lifetimeContributionRemaining,
      isEligibleThisYear: false,
      warningMessage: null,
    };
  }

  const isSpecialAgeWindow = beneficiaryAge >= 15 && beneficiaryAge <= 17;
  let warningMessage: string | null = null;
  let cesgThisYear = 0;

  if (isSpecialAgeWindow && input.meetsAge17Requirements === false) {
    warningMessage =
      `Beneficiary is age ${beneficiaryAge} — CESG cannot be paid this year because the prior-contribution conditions are not met. ` +
      `To qualify, at least $2,000 must have been contributed in a single prior year, ` +
      `or at least $100 contributed in at least 4 different prior calendar years.`;
    // cesgThisYear remains 0
  } else {
    if (isSpecialAgeWindow) {
      warningMessage =
        `Beneficiary is age ${beneficiaryAge} — special CESG eligibility conditions apply. ` +
        `Confirm with your RESP provider that prior contribution conditions are met ` +
        `(at least $2,000 contributed in a single prior year, or $100+ in at least 4 prior years).`;
    }
    const contributionForCesg = Math.min(input.annualContribution, data.basicCesgMaxAnnualContribution);
    const rawCesg = contributionForCesg * data.basicCesgRate;
    const cesgRoomRemaining = Math.max(0, data.basicCesgLifetimeLimit - input.totalCesgReceivedToDate);
    cesgThisYear = Math.min(rawCesg, cesgRoomRemaining);
  }

  // Additional CESG (independent from basic CESG cap, but only when basic is earned)
  let additionalCesgThisYear = 0;
  if (input.familyNetIncome !== undefined && cesgThisYear > 0) {
    const contributionForAdditional = Math.min(
      input.annualContribution,
      data.additionalCesgMaxContribution,
    );
    if (input.familyNetIncome <= data.additionalCesgLowIncomeThreshold) {
      additionalCesgThisYear = Math.min(
        contributionForAdditional * data.additionalCesgLow,
        data.additionalCesgMaxLow,
      );
    } else if (input.familyNetIncome <= data.additionalCesgMidIncomeThreshold) {
      additionalCesgThisYear = Math.min(
        contributionForAdditional * data.additionalCesgMid,
        data.additionalCesgMaxMid,
      );
    }
  }

  const yearsOfEligibilityRemaining = Math.max(0, lastEligibleYear - input.currentYear + 1);
  const cesgRoomAfterThisYear = Math.max(
    0,
    data.basicCesgLifetimeLimit - input.totalCesgReceivedToDate - cesgThisYear,
  );
  const annualCesgAtCurrentPace =
    Math.min(input.annualContribution, data.basicCesgMaxAnnualContribution) * data.basicCesgRate;
  const futureYears = yearsOfEligibilityRemaining - 1;
  const futureCesg = Math.min(annualCesgAtCurrentPace * futureYears, cesgRoomAfterThisYear);
  const projectedTotalCesg = input.totalCesgReceivedToDate + cesgThisYear + futureCesg;

  return {
    cesgThisYear,
    additionalCesgThisYear,
    totalCesgThisYear: cesgThisYear + additionalCesgThisYear,
    cesgRemainingLifetime: cesgRoomAfterThisYear,
    yearsOfEligibilityRemaining,
    projectedTotalCesg,
    lifetimeContributionRemaining,
    isEligibleThisYear: true,
    warningMessage,
  };
}
