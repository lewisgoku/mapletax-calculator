/**
 * Shared type definitions for Canadian tax rate data.
 * All brackets are progressive: `rate` applies to income between the prior
 * bracket's `upper` (or 0 for the first bracket) and this bracket's `upper`.
 * Use Infinity for the top bracket's upper bound.
 */

export interface TaxBracket {
  upper: number;
  rate: number;
}

export interface ProvincialTaxData {
  name: string;
  code: string;
  brackets: TaxBracket[];
  basicPersonalAmount: number;
  /** Rate applied to BPA to compute the non-refundable credit. Usually the lowest bracket rate. */
  creditRate: number;
  /** Optional: low-income tax reduction for calculating effective rates. */
  lowIncomeReduction?: {
    maxCredit: number;
    clawbackStart: number;
    clawbackRate: number;
  };
}

export interface FederalTaxData {
  brackets: TaxBracket[];
  /** Full BPA available at low/middle incomes (base + additional). */
  basicPersonalAmount: number;
  /** Base BPA available at the top bracket (after clawback). */
  bpaBase: number;
  /** Additional BPA amount, clawed back between thresholds. */
  bpaAdditional: number;
  bpaClawbackStart: number;
  bpaClawbackEnd: number;
  creditRate: number;
}

export interface CppData {
  basicExemption: number;
  /** Year's Maximum Pensionable Earnings — first CPP ceiling. */
  ympe: number;
  /** Year's Additional Maximum Pensionable Earnings — CPP2 ceiling. */
  yampe: number;
  /** Employee rate on earnings between basicExemption and ympe. */
  cpp1Rate: number;
  /** Employee rate on earnings between ympe and yampe. */
  cpp2Rate: number;
  /** Self-employed rate is 2× employee. */
  selfEmployedMultiplier: number;
}

export interface EiData {
  maxInsurableEarnings: number;
  employeeRate: number;
  /** Quebec has a separate reduced rate because QPIP covers parental benefits. */
  quebecEmployeeRate: number;
}
