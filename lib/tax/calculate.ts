/**
 * Core tax calculation engine.
 *
 * Pure TypeScript functions — no React, no framework dependencies.
 * Can be used server-side, client-side, or in tests.
 *
 * Every function takes a rate-year data object explicitly, so we can
 * support prior years and scenarios without global state.
 */

import type {
  TaxBracket,
  FederalTaxData,
  ProvincialTaxData,
  CppData,
  EiData,
} from '../rates/types';

export interface TaxCalculationInput {
  grossIncome: number;
  provinceCode: string;
  rrspContribution?: number;
  otherDeductions?: number;
  isSelfEmployed?: boolean;
}

export interface TaxCalculationResult {
  grossIncome: number;
  taxableIncome: number;

  federalTax: number;
  federalCredit: number;
  federalTaxAfterCredits: number;

  provincialTax: number;
  provincialCredit: number;
  provincialTaxAfterCredits: number;

  cppContributions: number;
  cpp1: number;
  cpp2: number;

  eiPremiums: number;

  totalTax: number;
  netIncome: number;

  averageTaxRate: number;
  marginalTaxRate: number;
  combinedMarginalRate: number;

  takeHomeMonthly: number;
  takeHomeBiweekly: number;
}

/**
 * Calculate tax on a bracket schedule.
 * Brackets must be sorted ascending by `upper`.
 */
export function applyBrackets(income: number, brackets: TaxBracket[]): number {
  if (income <= 0) return 0;

  let tax = 0;
  let lower = 0;

  for (const bracket of brackets) {
    if (income <= lower) break;
    const taxableInBracket = Math.min(income, bracket.upper) - lower;
    tax += taxableInBracket * bracket.rate;
    lower = bracket.upper;
  }

  return tax;
}

/**
 * Find the marginal tax rate — the rate applied to the next dollar earned.
 */
export function marginalRate(income: number, brackets: TaxBracket[]): number {
  let lower = 0;
  for (const bracket of brackets) {
    if (income <= bracket.upper) return bracket.rate;
    lower = bracket.upper;
  }
  return brackets[brackets.length - 1].rate;
}

/**
 * Federal BPA has a phase-out between $181,440 and $258,482.
 * Above $258,482, only the base BPA of $14,829 applies.
 * Below $181,440, the full $16,452 applies.
 */
export function federalBPA(income: number, data: FederalTaxData): number {
  if (income <= data.bpaClawbackStart) return data.basicPersonalAmount;
  if (income >= data.bpaClawbackEnd) return data.bpaBase;

  const clawbackRange = data.bpaClawbackEnd - data.bpaClawbackStart;
  const incomeInRange = income - data.bpaClawbackStart;
  const additionalReduction =
    data.bpaAdditional * (incomeInRange / clawbackRange);

  return data.basicPersonalAmount - additionalReduction;
}

/**
 * CPP contributions. Two tiers as of 2024+:
 *  - CPP1: 5.95% on earnings between basicExemption and YMPE
 *  - CPP2: 4% on earnings between YMPE and YAMPE
 * Self-employed individuals pay 2× (both employer and employee portions).
 */
export function calculateCPP(
  grossIncome: number,
  data: CppData,
  isSelfEmployed = false
): { cpp1: number; cpp2: number; total: number } {
  const multiplier = isSelfEmployed ? data.selfEmployedMultiplier : 1;

  const cpp1Earnings = Math.max(
    0,
    Math.min(grossIncome, data.ympe) - data.basicExemption
  );
  const cpp1 = cpp1Earnings * data.cpp1Rate * multiplier;

  const cpp2Earnings = Math.max(
    0,
    Math.min(grossIncome, data.yampe) - data.ympe
  );
  const cpp2 = cpp2Earnings * data.cpp2Rate * multiplier;

  return { cpp1, cpp2, total: cpp1 + cpp2 };
}

/**
 * EI premiums. Self-employed individuals are normally exempt unless enrolled
 * in the EI special benefits program — we assume they're not by default.
 * Quebec residents pay a reduced rate (QPIP handles parental benefits separately).
 */
export function calculateEI(
  grossIncome: number,
  data: EiData,
  opts: { isQuebec?: boolean; isSelfEmployed?: boolean } = {}
): number {
  if (opts.isSelfEmployed) return 0;

  const insurable = Math.min(grossIncome, data.maxInsurableEarnings);
  const rate = opts.isQuebec ? data.quebecEmployeeRate : data.employeeRate;
  return insurable * rate;
}

/**
 * Main orchestrator. Takes input + rate data, returns a full result.
 */
export function calculateTax(
  input: TaxCalculationInput,
  rates: {
    federal: FederalTaxData;
    provinces: Record<string, ProvincialTaxData>;
    cpp: CppData;
    ei: EiData;
  }
): TaxCalculationResult {
  const province = rates.provinces[input.provinceCode];
  if (!province) {
    throw new Error(`Unknown province code: ${input.provinceCode}`);
  }

  const grossIncome = Math.max(0, input.grossIncome);
  const deductions =
    (input.rrspContribution ?? 0) + (input.otherDeductions ?? 0);
  const taxableIncome = Math.max(0, grossIncome - deductions);

  const federalTax = applyBrackets(taxableIncome, rates.federal.brackets);
  const federalBPAAmount = federalBPA(taxableIncome, rates.federal);
  const federalCredit = federalBPAAmount * rates.federal.creditRate;
  const federalTaxAfterCredits = Math.max(0, federalTax - federalCredit);

  const provincialTax = applyBrackets(taxableIncome, province.brackets);
  const provincialCredit =
    province.basicPersonalAmount * province.creditRate;
  const provincialTaxAfterCredits = Math.max(
    0,
    provincialTax - provincialCredit
  );

  const { cpp1, cpp2, total: cppContributions } = calculateCPP(
    grossIncome,
    rates.cpp,
    input.isSelfEmployed
  );

  const eiPremiums = calculateEI(grossIncome, rates.ei, {
    isQuebec: input.provinceCode === 'QC',
    isSelfEmployed: input.isSelfEmployed,
  });

  const totalTax =
    federalTaxAfterCredits +
    provincialTaxAfterCredits +
    cppContributions +
    eiPremiums;

  const netIncome = grossIncome - totalTax;

  const federalMarginal = marginalRate(taxableIncome, rates.federal.brackets);
  const provincialMarginal = marginalRate(taxableIncome, province.brackets);
  const combinedMarginalRate = federalMarginal + provincialMarginal;

  return {
    grossIncome,
    taxableIncome,
    federalTax,
    federalCredit,
    federalTaxAfterCredits,
    provincialTax,
    provincialCredit,
    provincialTaxAfterCredits,
    cppContributions,
    cpp1,
    cpp2,
    eiPremiums,
    totalTax,
    netIncome,
    averageTaxRate: grossIncome > 0 ? totalTax / grossIncome : 0,
    marginalTaxRate: federalMarginal,
    combinedMarginalRate,
    takeHomeMonthly: netIncome / 12,
    takeHomeBiweekly: netIncome / 26,
  };
}
