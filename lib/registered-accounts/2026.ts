/**
 * 2026 registered-account limits and rules.
 *
 * Sources:
 * - RRSP dollar limit: https://www.canada.ca/en/revenue-agency/services/tax/registered-plans-administrators/pspa/mp-rrsp-dpsp-tfsa-limits-ympe.html
 *   (CRA confirmed $33,810 for 2026 — announced November 2025)
 * - TFSA annual limit: same CRA limits page — $7,000 for 2026 (third consecutive year)
 * - TFSA cumulative: $109,000 for eligible-since-2009 non-contributor (verified via CRA)
 * - HBP $60,000: https://www.canada.ca/en/department-finance/news/2024/04/budget-2024.html
 *   (raised from $35,000 in 2024 federal budget, effective April 16 2024)
 * - LLP limits: https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/lifelong-learning-plan.html
 *   ($10,000/year, $20,000/participation-period lifetime cap)
 * - FHSA: https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/first-home-savings-account/contributing-your-fhsa.html
 *   ($8,000/year, $40,000 lifetime, up to $8,000 carry-forward, max $16,000 in any year)
 */

/** 2026 RRSP limits and parameters */
export const RRSP_2026 = {
  /** Maximum dollar limit on new RRSP room for 2026 */
  dollarLimit: 33810,
  /** Earned-income percentage used to compute new room */
  percentageOfEarnedIncome: 0.18,
  /** Prior-year earned income needed to earn the full dollar limit (33810 / 0.18) */
  incomeForMaxContribution: 187833,
  /** HBP maximum withdrawal per person (raised from $35,000 in 2024 budget) */
  hbpWithdrawalLimit: 60000,
  /** LLP maximum withdrawal per calendar year */
  llpAnnualLimit: 10000,
  /** LLP maximum cumulative withdrawals per participation period */
  llpLifetimeLimit: 20000,
  /** Deadline for contributions deductible on the 2026 return (60 days after Dec 31, 2026) */
  sixtyDayDeadline: '2027-03-02',
  /** CRA allows up to $2,000 lifetime over-contribution without penalty */
  overContributionBuffer: 2000,
} as const;

/** Year-by-year TFSA annual contribution limits since program inception */
const TFSA_ANNUAL_LIMITS_BY_YEAR: Record<number, number> = {
  2009: 5000,
  2010: 5000,
  2011: 5000,
  2012: 5000,
  2013: 5500,
  2014: 5500,
  2015: 10000,
  2016: 5500,
  2017: 5500,
  2018: 5500,
  2019: 6000,
  2020: 6000,
  2021: 6000,
  2022: 6000,
  2023: 6500,
  2024: 7000,
  2025: 7000,
  2026: 7000,
};

/** 2026 TFSA limits and parameters */
export const TFSA_2026 = {
  /** Annual dollar limit for 2026 */
  annualLimit: 7000,
  /** Cumulative limit for someone eligible since 2009 who never contributed (sum 2009–2026) */
  cumulativeLimitFor1991OrEarlier: 109000,
  /** Over-contribution penalty rate (1% per month on excess amount) */
  overContributionPenaltyRate: 0.01,
  /** Year-by-year limits — used by the room calculator to determine per-birth-year totals */
  annualLimitsByYear: TFSA_ANNUAL_LIMITS_BY_YEAR,
} as const;

/** 2026 FHSA limits and parameters */
export const FHSA_2026 = {
  /** Annual participation room added each year the account is open */
  annualLimit: 8000,
  /** Lifetime contribution ceiling across all FHSAs */
  lifetimeLimit: 40000,
  /** Maximum contributable in any single year (annual limit + max carry-forward) */
  maxAnnualWithCarryForward: 16000,
  /** Account must be closed by year 15 of participation (or earlier at age 71) */
  participationLimitYears: 15,
  /**
   * "First-time home buyer" window: must not have owned a home lived in as principal
   * residence during the current calendar year OR any of the 4 prior calendar years.
   */
  firstTimeBuyerWindowYears: 4,
} as const;
