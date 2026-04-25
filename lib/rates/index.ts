import { FEDERAL_2025, PROVINCES_2025, CPP_2025, EI_2025 } from './2025';
import { FEDERAL_2026, PROVINCES_2026, CPP_2026, EI_2026 } from './2026';

export const RATES_BY_YEAR = {
  2025: { federal: FEDERAL_2025, provinces: PROVINCES_2025, cpp: CPP_2025, ei: EI_2025 },
  2026: { federal: FEDERAL_2026, provinces: PROVINCES_2026, cpp: CPP_2026, ei: EI_2026 },
} as const;

export type TaxYear = keyof typeof RATES_BY_YEAR;
export const SUPPORTED_YEARS: TaxYear[] = [2025, 2026];
export const DEFAULT_YEAR: TaxYear = 2026;