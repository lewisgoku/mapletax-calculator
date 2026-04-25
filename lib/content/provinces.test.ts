import { describe, it, expect } from 'vitest';
import { getProvinceContent, CONTENT_PROVINCE_CODES } from './provinces';
import { PROVINCE_FAQS, getProvinceFAQs } from './faqs';
import type { TaxYear } from '@/lib/rates';

const YEARS: TaxYear[] = [2025, 2026];
const PROVINCE_CODES = [
  'BC', 'AB', 'SK', 'MB', 'ON', 'QC',
  'NB', 'NS', 'PE', 'NL', 'YT', 'NT', 'NU',
] as const;

describe('CONTENT_PROVINCE_CODES', () => {
  it('lists all 13 province codes', () => {
    expect(CONTENT_PROVINCE_CODES).toHaveLength(13);
    for (const code of PROVINCE_CODES) {
      expect(CONTENT_PROVINCE_CODES).toContain(code);
    }
  });
});

describe('getProvinceContent — all 26 blocks exist', () => {
  for (const code of PROVINCE_CODES) {
    for (const year of YEARS) {
      it(`${code} ${year} content block exists`, () => {
        expect(() => getProvinceContent(code, year)).not.toThrow();
      });
    }
  }
});

describe('getProvinceContent — required fields non-empty', () => {
  for (const code of PROVINCE_CODES) {
    for (const year of YEARS) {
      describe(`${code} ${year}`, () => {
        const content = getProvinceContent(code, year);

        it('intro is non-empty', () => {
          expect(content.intro.trim().length).toBeGreaterThan(0);
        });

        it('howItWorks has at least 100 words', () => {
          const wordCount = content.howItWorks.trim().split(/\s+/).length;
          expect(wordCount).toBeGreaterThanOrEqual(100);
        });

        it('provincialQuirks is non-empty', () => {
          expect(content.provincialQuirks.trim().length).toBeGreaterThan(0);
        });

        it('creditsAndDeductions has at least 50 words', () => {
          const wordCount = content.creditsAndDeductions.trim().split(/\s+/).length;
          expect(wordCount).toBeGreaterThanOrEqual(50);
        });

        it('code matches province', () => {
          expect(content.code).toBe(code);
        });

        it('year matches', () => {
          expect(content.year).toBe(year);
        });
      });
    }
  }
});

describe('PROVINCE_FAQS — all 13 provinces have entries', () => {
  for (const code of PROVINCE_CODES) {
    it(`${code} has at least one FAQ ID`, () => {
      const ids = PROVINCE_FAQS[code];
      expect(ids).toBeDefined();
      expect(ids.length).toBeGreaterThanOrEqual(1);
    });
  }
});

describe('PROVINCE_FAQS — territories and QC/BC have at least two', () => {
  const multipleRequired = ['BC', 'QC', 'YT', 'NT', 'NU'];
  for (const code of multipleRequired) {
    it(`${code} has at least two FAQs`, () => {
      expect(PROVINCE_FAQS[code].length).toBeGreaterThanOrEqual(2);
    });
  }
});

describe('getProvinceFAQs — all province FAQs resolve without throwing', () => {
  for (const code of PROVINCE_CODES) {
    it(`${code} FAQs resolve`, () => {
      expect(() => getProvinceFAQs(code)).not.toThrow();
      const faqs = getProvinceFAQs(code);
      expect(faqs.length).toBeGreaterThan(0);
      for (const faq of faqs) {
        expect(faq.id).toBeTruthy();
        expect(faq.question.trim().length).toBeGreaterThan(0);
        expect(faq.answer.trim().length).toBeGreaterThan(0);
      }
    });
  }
});
