/**
 * Canadian tax rates and thresholds for the 2026 tax year.
 *
 * Sources:
 * - Federal: CRA 2026 indexation (2.0%), Carney government bottom-rate cut to 14%
 * - BC: BC Budget 2026 (Feb 17, 2026) — bottom rate increased to 5.60%, indexation paused 2027–2030
 * - Alberta: New 8% bottom bracket on first $60,000 (indexed)
 * - Ontario, others: Standard 2026 indexation
 *
 * CRITICAL: This file must be reviewed and updated every November/December when
 * CRA publishes next-year indexation. BPA, brackets, CPP ceilings all change annually.
 */

import type {
  FederalTaxData,
  ProvincialTaxData,
  CppData,
  EiData,
} from './types';

export const FEDERAL_2026: FederalTaxData = {
  brackets: [
    { upper: 58523, rate: 0.14 },
    { upper: 117045, rate: 0.205 },
    { upper: 181440, rate: 0.26 },
    { upper: 258482, rate: 0.29 },
    { upper: Infinity, rate: 0.33 },
  ],
  basicPersonalAmount: 16452,
  bpaBase: 14829,
  bpaAdditional: 1623,
  bpaClawbackStart: 181440,
  bpaClawbackEnd: 258482,
  creditRate: 0.14,
};

export const CPP_2026: CppData = {
  basicExemption: 3500,
  ympe: 74600,
  yampe: 85000,
  cpp1Rate: 0.0595,
  cpp2Rate: 0.04,
  selfEmployedMultiplier: 2,
};

export const EI_2026: EiData = {
  maxInsurableEarnings: 65700,
  employeeRate: 0.0164,
  quebecEmployeeRate: 0.0131,
};

export const PROVINCES_2026: Record<string, ProvincialTaxData> = {
  BC: {
    name: 'British Columbia',
    code: 'BC',
    brackets: [
      { upper: 50363, rate: 0.056 },
      { upper: 100728, rate: 0.077 },
      { upper: 115648, rate: 0.105 },
      { upper: 140430, rate: 0.1229 },
      { upper: 190405, rate: 0.147 },
      { upper: 265545, rate: 0.168 },
      { upper: Infinity, rate: 0.205 },
    ],
    basicPersonalAmount: 13216,
    creditRate: 0.056,
    lowIncomeReduction: {
      maxCredit: 690,
      clawbackStart: 25570,
      clawbackRate: 0.0356,
    },
  },

  AB: {
    name: 'Alberta',
    code: 'AB',
    brackets: [
      { upper: 60000, rate: 0.08 },
      { upper: 151234, rate: 0.10 },
      { upper: 181481, rate: 0.12 },
      { upper: 241974, rate: 0.13 },
      { upper: 362961, rate: 0.14 },
      { upper: Infinity, rate: 0.15 },
    ],
    basicPersonalAmount: 22323,
    creditRate: 0.08,
  },

  ON: {
    name: 'Ontario',
    code: 'ON',
    brackets: [
      { upper: 52886, rate: 0.0505 },
      { upper: 105775, rate: 0.0915 },
      { upper: 150000, rate: 0.1116 },
      { upper: 220000, rate: 0.1216 },
      { upper: Infinity, rate: 0.1316 },
    ],
    basicPersonalAmount: 12747,
    creditRate: 0.0505,
  },

  /**
   * TODO: Verify 2026 numbers with provincial budget documents before shipping.
   * The structure is correct — fill in exact thresholds and BPA from official sources.
   * Pattern to copy for: SK, MB, QC, NB, NS, PE, NL, YT, NT, NU
   */
  SK: {
    name: 'Saskatchewan',
    code: 'SK',
    brackets: [
      { upper: 54064, rate: 0.105 },
      { upper: 154459, rate: 0.125 },
      { upper: Infinity, rate: 0.145 },
    ],
    basicPersonalAmount: 18491,
    creditRate: 0.105,
  },

  MB: {
    name: 'Manitoba',
    code: 'MB',
    brackets: [
      { upper: 47564, rate: 0.108 },
      { upper: 101569, rate: 0.1275 },
      { upper: Infinity, rate: 0.174 },
    ],
    basicPersonalAmount: 15969,
    creditRate: 0.108,
  },

  QC: {
    name: 'Quebec',
    code: 'QC',
    brackets: [
      { upper: 53255, rate: 0.14 },
      { upper: 106495, rate: 0.19 },
      { upper: 129590, rate: 0.24 },
      { upper: Infinity, rate: 0.2575 },
    ],
    basicPersonalAmount: 18571,
    creditRate: 0.14,
  },

  NB: {
    name: 'New Brunswick',
    code: 'NB',
    brackets: [
      { upper: 49958, rate: 0.094 },
      { upper: 99916, rate: 0.14 },
      { upper: 185064, rate: 0.16 },
      { upper: Infinity, rate: 0.195 },
    ],
    basicPersonalAmount: 13396,
    creditRate: 0.094,
  },

  NS: {
    name: 'Nova Scotia',
    code: 'NS',
    brackets: [
      { upper: 30507, rate: 0.0879 },
      { upper: 61015, rate: 0.1495 },
      { upper: 95883, rate: 0.1667 },
      { upper: 154650, rate: 0.175 },
      { upper: Infinity, rate: 0.21 },
    ],
    basicPersonalAmount: 11744,
    creditRate: 0.0879,
  },

  PE: {
    name: 'Prince Edward Island',
    code: 'PE',
    brackets: [
      { upper: 33328, rate: 0.095 },
      { upper: 64656, rate: 0.1347 },
      { upper: 105000, rate: 0.166 },
      { upper: 140000, rate: 0.1762 },
      { upper: Infinity, rate: 0.19 },
    ],
    basicPersonalAmount: 14250,
    creditRate: 0.095,
  },

  NL: {
    name: 'Newfoundland and Labrador',
    code: 'NL',
    brackets: [
      { upper: 44192, rate: 0.087 },
      { upper: 88382, rate: 0.145 },
      { upper: 157792, rate: 0.158 },
      { upper: 220910, rate: 0.178 },
      { upper: 282214, rate: 0.198 },
      { upper: 564429, rate: 0.208 },
      { upper: 1128858, rate: 0.213 },
      { upper: Infinity, rate: 0.218 },
    ],
    basicPersonalAmount: 10818,
    creditRate: 0.087,
  },

  YT: {
    name: 'Yukon',
    code: 'YT',
    brackets: [
      { upper: 58523, rate: 0.064 },
      { upper: 117045, rate: 0.09 },
      { upper: 181440, rate: 0.109 },
      { upper: 500000, rate: 0.128 },
      { upper: Infinity, rate: 0.15 },
    ],
    basicPersonalAmount: 16452,
    creditRate: 0.064,
  },

  NT: {
    name: 'Northwest Territories',
    code: 'NT',
    brackets: [
      { upper: 51964, rate: 0.059 },
      { upper: 103930, rate: 0.086 },
      { upper: 168967, rate: 0.122 },
      { upper: Infinity, rate: 0.1405 },
    ],
    basicPersonalAmount: 17842,
    creditRate: 0.059,
  },

  NU: {
    name: 'Nunavut',
    code: 'NU',
    brackets: [
      { upper: 54707, rate: 0.04 },
      { upper: 109413, rate: 0.07 },
      { upper: 177881, rate: 0.09 },
      { upper: Infinity, rate: 0.115 },
    ],
    basicPersonalAmount: 19297,
    creditRate: 0.04,
  },
};

export const PROVINCE_CODES = Object.keys(PROVINCES_2026) as Array<
  keyof typeof PROVINCES_2026
>;

export const PROVINCE_SLUGS: Record<string, string> = {
  'british-columbia': 'BC',
  'alberta': 'AB',
  'ontario': 'ON',
  'saskatchewan': 'SK',
  'manitoba': 'MB',
  'quebec': 'QC',
  'new-brunswick': 'NB',
  'nova-scotia': 'NS',
  'prince-edward-island': 'PE',
  'newfoundland-and-labrador': 'NL',
  'yukon': 'YT',
  'northwest-territories': 'NT',
  'nunavut': 'NU',
};
