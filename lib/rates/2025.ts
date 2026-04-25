/**
 * Canadian tax rates and thresholds for the 2025 tax year.
 *
 * Sources:
 * - Federal: CRA T1 General 2025 — canada.ca/en/revenue-agency/services/forms-publications/tax-packages-years.html
 * - CPP: canada.ca/en/revenue-agency/news/2024/11/cpp-2025.html — YMPE $71,300, YAMPE $81,200
 * - EI: canada.ca/en/employment-social-development/news/2024/10/ei-2025.html — rate 1.64% (NOT 1.66%; that was 2024)
 * - BC: gov.bc.ca — 2025 brackets, 5.06% bottom rate; LIR via taxtips.ca/bc-tax-rates.htm
 * - AB: alberta.ca/budget — 8% bracket on first $60k effective January 1, 2025 (NOT a 2026 change)
 * - Other provinces: taxtips.ca/provincial-tax-rates.htm, verified against provincial revenue agencies
 *
 * NOTES FOR NEXT EDITOR:
 *  • EI employee rate is 1.64% for 2025. CRA's 2025 T4032 confirms this. Prior spec incorrectly stated 1.66%.
 *  • Alberta's 8% bottom bracket was NEW for 2025 (retroactive to Jan 1, 2025 via Budget 2025).
 *    Both the 2025 and 2026 files have this bracket — do not remove it from 2025 thinking it was 2026-only.
 *  • Territorial rates (YT, NT, NU) should be re-verified against territorial budget documents each year.
 */

import type {
  FederalTaxData,
  ProvincialTaxData,
  CppData,
  EiData,
} from './types';

export const FEDERAL_2025: FederalTaxData = {
  brackets: [
    { upper: 57375, rate: 0.145 },
    { upper: 114750, rate: 0.205 },
    { upper: 177882, rate: 0.26 },
    { upper: 253414, rate: 0.29 },
    { upper: Infinity, rate: 0.33 },
  ],
  basicPersonalAmount: 16129,
  bpaBase: 14538,
  bpaAdditional: 1591,
  bpaClawbackStart: 177882,
  bpaClawbackEnd: 253414,
  creditRate: 0.145,
};

export const CPP_2025: CppData = {
  basicExemption: 3500,
  ympe: 71300,
  yampe: 81200,
  cpp1Rate: 0.0595,
  cpp2Rate: 0.04,
  selfEmployedMultiplier: 2,
};

export const EI_2025: EiData = {
  maxInsurableEarnings: 65700,
  employeeRate: 0.0164,
  quebecEmployeeRate: 0.0131,
};

export const PROVINCES_2025: Record<string, ProvincialTaxData> = {
  BC: {
    name: 'British Columbia',
    code: 'BC',
    brackets: [
      { upper: 45654, rate: 0.0506 },
      { upper: 91310, rate: 0.077 },
      { upper: 104835, rate: 0.105 },
      { upper: 127299, rate: 0.1229 },
      { upper: 172602, rate: 0.147 },
      { upper: 240716, rate: 0.168 },
      { upper: Infinity, rate: 0.205 },
    ],
    basicPersonalAmount: 11981,
    creditRate: 0.0506,
    lowIncomeReduction: {
      maxCredit: 611,
      clawbackStart: 23179,
      clawbackRate: 0.0356,
    },
  },

  AB: {
    name: 'Alberta',
    code: 'AB',
    brackets: [
      { upper: 60000, rate: 0.08 },
      { upper: 148269, rate: 0.10 },
      { upper: 177922, rate: 0.12 },
      { upper: 237230, rate: 0.13 },
      { upper: 355845, rate: 0.14 },
      { upper: Infinity, rate: 0.15 },
    ],
    basicPersonalAmount: 21003,
    creditRate: 0.08,
  },

  ON: {
    name: 'Ontario',
    code: 'ON',
    brackets: [
      { upper: 51446, rate: 0.0505 },
      { upper: 102894, rate: 0.0915 },
      { upper: 150000, rate: 0.1116 },
      { upper: 220000, rate: 0.1216 },
      { upper: Infinity, rate: 0.1316 },
    ],
    basicPersonalAmount: 11865,
    creditRate: 0.0505,
  },

  SK: {
    name: 'Saskatchewan',
    code: 'SK',
    brackets: [
      { upper: 49720, rate: 0.105 },
      { upper: 142058, rate: 0.125 },
      { upper: Infinity, rate: 0.145 },
    ],
    basicPersonalAmount: 17661,
    creditRate: 0.105,
  },

  MB: {
    name: 'Manitoba',
    code: 'MB',
    brackets: [
      { upper: 47000, rate: 0.108 },
      { upper: 100000, rate: 0.1275 },
      { upper: Infinity, rate: 0.174 },
    ],
    basicPersonalAmount: 15780,
    creditRate: 0.108,
  },

  QC: {
    name: 'Quebec',
    code: 'QC',
    brackets: [
      { upper: 51780, rate: 0.14 },
      { upper: 103545, rate: 0.19 },
      { upper: 126000, rate: 0.24 },
      { upper: Infinity, rate: 0.2575 },
    ],
    basicPersonalAmount: 17183,
    creditRate: 0.14,
  },

  NB: {
    name: 'New Brunswick',
    code: 'NB',
    brackets: [
      { upper: 47715, rate: 0.094 },
      { upper: 95431, rate: 0.14 },
      { upper: 176756, rate: 0.16 },
      { upper: Infinity, rate: 0.195 },
    ],
    basicPersonalAmount: 12458,
    creditRate: 0.094,
  },

  NS: {
    name: 'Nova Scotia',
    code: 'NS',
    brackets: [
      { upper: 29590, rate: 0.0879 },
      { upper: 59180, rate: 0.1495 },
      { upper: 93000, rate: 0.1667 },
      { upper: 150000, rate: 0.175 },
      { upper: Infinity, rate: 0.21 },
    ],
    basicPersonalAmount: 8481,
    creditRate: 0.0879,
  },

  PE: {
    name: 'Prince Edward Island',
    code: 'PE',
    brackets: [
      { upper: 32656, rate: 0.095 },
      { upper: 64313, rate: 0.1347 },
      { upper: 105000, rate: 0.166 },
      { upper: 140000, rate: 0.1762 },
      { upper: Infinity, rate: 0.19 },
    ],
    basicPersonalAmount: 12000,
    creditRate: 0.095,
  },

  NL: {
    name: 'Newfoundland and Labrador',
    code: 'NL',
    brackets: [
      { upper: 43198, rate: 0.087 },
      { upper: 86395, rate: 0.145 },
      { upper: 154244, rate: 0.158 },
      { upper: 215943, rate: 0.178 },
      { upper: 275870, rate: 0.198 },
      { upper: 551739, rate: 0.208 },
      { upper: 1103478, rate: 0.213 },
      { upper: Infinity, rate: 0.218 },
    ],
    basicPersonalAmount: 10818,
    creditRate: 0.087,
  },

  YT: {
    name: 'Yukon',
    code: 'YT',
    brackets: [
      { upper: 57375, rate: 0.064 },
      { upper: 114750, rate: 0.09 },
      { upper: 177882, rate: 0.109 },
      { upper: 500000, rate: 0.128 },
      { upper: Infinity, rate: 0.15 },
    ],
    basicPersonalAmount: 16129,
    creditRate: 0.064,
  },

  NT: {
    name: 'Northwest Territories',
    code: 'NT',
    brackets: [
      { upper: 50597, rate: 0.059 },
      { upper: 101198, rate: 0.086 },
      { upper: 164525, rate: 0.122 },
      { upper: Infinity, rate: 0.1405 },
    ],
    basicPersonalAmount: 16593,
    creditRate: 0.059,
  },

  NU: {
    name: 'Nunavut',
    code: 'NU',
    brackets: [
      { upper: 53268, rate: 0.04 },
      { upper: 106537, rate: 0.07 },
      { upper: 173205, rate: 0.09 },
      { upper: Infinity, rate: 0.115 },
    ],
    basicPersonalAmount: 18799,
    creditRate: 0.04,
  },
};

export const PROVINCE_CODES_2025 = Object.keys(PROVINCES_2025) as Array<
  keyof typeof PROVINCES_2025
>;

export const PROVINCE_SLUGS_2025: Record<string, string> = {
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
