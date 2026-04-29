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

/**
 * RESP limits and grant parameters.
 *
 * Sources:
 * - Lifetime contribution limit / over-contribution penalty:
 *   https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/registered-education-savings-plans-resps/resp-contributions.html
 * - Basic CESG (20% on first $2,500, lifetime $7,200):
 *   https://www.canada.ca/en/employment-social-development/services/student-financial-aid/education-savings/cesg.html
 * - Additional CESG income thresholds: 2025 net family income thresholds published by ESDC;
 *   2026 CESG grants are based on 2025 family net income.
 *   https://www.canada.ca/en/employment-social-development/services/student-financial-aid/education-savings/cesg/additional-cesg.html
 * - Canada Learning Bond:
 *   https://www.canada.ca/en/employment-social-development/services/student-financial-aid/education-savings/clb.html
 */
export const RESP_2026 = {
  /** No annual contribution limit. Lifetime cap per beneficiary. */
  lifetimeContributionLimit: 50000,
  /** 1% per month on contributions exceeding the lifetime limit */
  overContributionPenaltyRate: 0.01,
  /** Basic CESG: 20% on first $2,500 contributed per year per beneficiary */
  basicCesgRate: 0.20,
  basicCesgMaxAnnualContribution: 2500,
  /** Maximum basic CESG per year: 20% × $2,500 */
  basicCesgMaxAnnual: 500,
  /** Lifetime CESG cap per beneficiary */
  basicCesgLifetimeLimit: 7200,
  /** Additional CESG for low-income families: 20% on first $500 */
  additionalCesgLow: 0.20,
  /** Additional CESG for mid-income families: 10% on first $500 */
  additionalCesgMid: 0.10,
  additionalCesgMaxContribution: 500,
  additionalCesgMaxLow: 100,
  additionalCesgMaxMid: 50,
  /**
   * 2025 family net income threshold for 20% additional CESG.
   * Applied to 2026 grants (ESDC uses prior-year family net income).
   * Expected to be indexed annually — verify with ESDC each year.
   */
  additionalCesgLowIncomeThreshold: 55867,
  /** 2025 family net income threshold for 10% additional CESG (above low, up to this amount). */
  additionalCesgMidIncomeThreshold: 111733,
  /** CESG can be earned until December 31 of the year the beneficiary turns 17 */
  cesgEligibilityMaxAge: 17,
  /** Canada Learning Bond: flat $500 at birth for qualifying low-income families */
  clbBaseBenefit: 500,
  /** Additional $100/year for up to 15 years for qualifying families */
  clbAnnualBenefit: 100,
  clbMaxYears: 15,
  clbLifetimeMax: 2000,
} as const;

/**
 * Quarterly instalment parameters for 2026.
 *
 * Sources:
 * - Threshold / due dates:
 *   https://www.canada.ca/en/revenue-agency/services/payments-cra/individual-payments/income-tax-instalments/when-make-instalment-payments.html
 * - Quebec threshold ($1,800):
 *   https://www.revenuquebec.ca/en/citizens/income-tax/income-tax-return/making-tax-instalment-payments/
 */
export const INSTALMENTS_2026 = {
  /** Must pay instalments if net tax owing exceeds this amount in current AND either prior 2 years */
  federalThreshold: 3000,
  /** Quebec residents use a lower threshold */
  quebecThreshold: 1800,
  /** 2026 instalment due dates (ISO format) */
  dueDates: ['2026-03-15', '2026-06-15', '2026-09-15', '2026-12-15'] as const,
} as const;

/**
 * Key tax dates for the 2026 calendar year.
 *
 * Sources:
 * - CRA tax instalment due dates: https://www.canada.ca/en/revenue-agency/services/payments-cra/individual-payments/income-tax-instalments/when-make-instalment-payments.html
 * - TFSA room reset: https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account.html
 * - T1 filing / balance due deadline: https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/important-dates-individuals.html
 * - NETFILE 2026 open date (for 2025 returns): typically mid-to-late February; exact date pending CRA announcement
 * - RRSP 60-day deadline for 2026 tax year: March 2, 2027 (as per RRSP_2026.sixtyDayDeadline)
 */
export const KEY_DATES_2026 = {
  /** TFSA room from 2026 becomes available January 1, 2026 */
  tfsaRoomReset: '2026-01-01',
  /** T4, T5 slip mailing deadline for employers and issuers */
  slipMailingDeadlineT4T5: '2026-01-31',
  /**
   * NETFILE opens for 2025 T1 returns. Typically mid-to-late February.
   * Confirm exact date at canada.ca/netfile once announced.
   */
  netfileOpens2025Returns: '2026-02-24',
  /** Q1 instalment due date */
  q1Instalment: '2026-03-15',
  /** T3 slip mailing deadline (trusts, mutual funds, ETFs) */
  t3SlipMailing: '2026-03-31',
  /** 2025 T1 filing deadline; also when 2025 balance owing is due */
  t1FilingDeadline2025: '2026-04-30',
  balanceOwingDue2025: '2026-04-30',
  /** Self-employed 2025 T1 filing deadline (balance still due April 30) */
  selfEmployedFilingDeadline2025: '2026-06-15',
  /** Q2 instalment due date */
  q2Instalment: '2026-06-15',
  /** Q3 instalment due date */
  q3Instalment: '2026-09-15',
  /** Q4 instalment due date */
  q4Instalment: '2026-12-15',
  /** Last day for 2026 TFSA, RESP, FHSA, charitable donations, tax-loss selling */
  yearEnd: '2026-12-31',
  /**
   * RRSP contribution deadline for the 2026 tax year.
   * 60 days after December 31, 2026 = March 1, 2027; if that falls on a weekend,
   * the next business day applies. CRA has confirmed March 2, 2027.
   */
  rrspDeadlineFor2026TaxYear: '2027-03-02',
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
