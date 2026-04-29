import { describe, it, expect } from 'vitest';
import { calculateInstalments } from './instalments';
import { INSTALMENTS_2026 } from '../registered-accounts/2026';

const D = INSTALMENTS_2026;

describe('calculateInstalments', () => {
  it('$2,500 net tax, not Quebec → mustPayInstalments: false', () => {
    const result = calculateInstalments({ priorYearNetTax: 2500, isQuebec: false }, D);
    expect(result.mustPayInstalments).toBe(false);
    expect(result.quarterlyAmount).toBe(0);
    expect(result.threshold).toBe(3000);
  });

  it('$3,000 exactly → mustPayInstalments: false (not above threshold)', () => {
    const result = calculateInstalments({ priorYearNetTax: 3000, isQuebec: false }, D);
    expect(result.mustPayInstalments).toBe(false);
  });

  it('$3,001 → mustPayInstalments: true (just above threshold)', () => {
    const result = calculateInstalments({ priorYearNetTax: 3001, isQuebec: false }, D);
    expect(result.mustPayInstalments).toBe(true);
    expect(result.quarterlyAmount).toBe(750.25);
  });

  it('$12,000 net tax → quarterlyAmount: $3,000', () => {
    const result = calculateInstalments({ priorYearNetTax: 12000, isQuebec: false }, D);
    expect(result.mustPayInstalments).toBe(true);
    expect(result.quarterlyAmount).toBe(3000);
    expect(result.annualTotal).toBe(12000);
  });

  it('$10,000 net tax, Quebec → mustPayInstalments: true, threshold: $1,800', () => {
    const result = calculateInstalments({ priorYearNetTax: 10000, isQuebec: true }, D);
    expect(result.mustPayInstalments).toBe(true);
    expect(result.threshold).toBe(1800);
    expect(result.quarterlyAmount).toBe(2500);
  });

  it('$1,799 net tax, Quebec → mustPayInstalments: false', () => {
    const result = calculateInstalments({ priorYearNetTax: 1799, isQuebec: true }, D);
    expect(result.mustPayInstalments).toBe(false);
  });

  it('$1,800 net tax, Quebec → mustPayInstalments: false (not above threshold)', () => {
    const result = calculateInstalments({ priorYearNetTax: 1800, isQuebec: true }, D);
    expect(result.mustPayInstalments).toBe(false);
  });

  it('$1,801 net tax, Quebec → mustPayInstalments: true', () => {
    const result = calculateInstalments({ priorYearNetTax: 1801, isQuebec: true }, D);
    expect(result.mustPayInstalments).toBe(true);
  });

  it('$100,000 net tax → quarterlyAmount: $25,000', () => {
    const result = calculateInstalments({ priorYearNetTax: 100000, isQuebec: false }, D);
    expect(result.quarterlyAmount).toBe(25000);
    expect(result.annualTotal).toBe(100000);
  });

  it('due dates are the four 2026 instalment dates', () => {
    const result = calculateInstalments({ priorYearNetTax: 5000, isQuebec: false }, D);
    expect(result.dueDates).toEqual(['2026-03-15', '2026-06-15', '2026-09-15', '2026-12-15']);
  });

  it('throws on negative priorYearNetTax', () => {
    expect(() =>
      calculateInstalments({ priorYearNetTax: -1, isQuebec: false }, D),
    ).toThrow(RangeError);
  });
});
