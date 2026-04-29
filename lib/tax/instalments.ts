import type { INSTALMENTS_2026 } from '../registered-accounts/2026';

export interface InstalmentInput {
  /** Net tax owing from the prior T1 (line 43500 minus refundable credits) */
  priorYearNetTax: number;
  /** Quebec residents use a lower instalment threshold */
  isQuebec: boolean;
  /** Defaults to 2026 */
  currentYear?: number;
}

export interface InstalmentResult {
  /** False if prior-year net tax is at or below the threshold */
  mustPayInstalments: boolean;
  /** Prior-year method: priorYearNetTax ÷ 4 (unrounded) */
  quarterlyAmount: number;
  /** Total annual instalments using the prior-year method */
  annualTotal: number;
  /** $3,000 (federal) or $1,800 (Quebec) */
  threshold: number;
  /** ISO date strings for each due date */
  dueDates: readonly string[];
  methodNote: string;
}

/**
 * Determine whether quarterly tax instalments are required and compute amounts
 * using the prior-year method.
 *
 * Instalments are required when net tax owing exceeds the threshold in the
 * current year AND in either of the two prior years. This function models
 * only the prior-year method (25% of prior-year net tax each quarter) since
 * it is the simplest to compute without access to the current-year estimate.
 */
export function calculateInstalments(
  input: InstalmentInput,
  data: typeof INSTALMENTS_2026,
): InstalmentResult {
  if (input.priorYearNetTax < 0) {
    throw new RangeError('priorYearNetTax must be non-negative');
  }

  const threshold = input.isQuebec ? data.quebecThreshold : data.federalThreshold;
  const mustPayInstalments = input.priorYearNetTax > threshold;

  if (!mustPayInstalments) {
    return {
      mustPayInstalments: false,
      quarterlyAmount: 0,
      annualTotal: 0,
      threshold,
      dueDates: data.dueDates,
      methodNote:
        'Your prior-year net tax is at or below the instalment threshold — no instalments required based on prior-year tax alone.',
    };
  }

  const quarterlyAmount = input.priorYearNetTax / 4;

  return {
    mustPayInstalments: true,
    quarterlyAmount,
    annualTotal: input.priorYearNetTax,
    threshold,
    dueDates: data.dueDates,
    methodNote:
      'Prior-year method: pay 25% of your prior-year net tax by each due date. ' +
      'CRA also sends instalment reminders with a no-calculation-required amount based on a two-year average.',
  };
}
