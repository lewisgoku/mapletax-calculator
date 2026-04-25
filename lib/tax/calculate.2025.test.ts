/**
 * 2025 tax year calculation tests — four hand-computed scenarios.
 *
 * Run with: npx vitest run
 */

import { describe, it, expect } from 'vitest';
import { calculateTax } from './calculate';
import {
  FEDERAL_2025,
  PROVINCES_2025,
  CPP_2025,
  EI_2025,
} from '../rates/2025';

const RATES_2025 = {
  federal: FEDERAL_2025,
  provinces: PROVINCES_2025,
  cpp: CPP_2025,
  ei: EI_2025,
};

describe('calculateTax 2025 — BC employee $60k', () => {
  const result = calculateTax(
    { grossIncome: 60000, provinceCode: 'BC' },
    RATES_2025
  );

  it('taxable income equals gross (no deductions)', () => {
    expect(result.taxableIncome).toBe(60000);
  });

  it('federal gross tax: first bracket 14.5%, spillover 20.5%', () => {
    // 57,375 × 14.5% + 2,625 × 20.5%
    expect(result.federalTax).toBeCloseTo(57375 * 0.145 + 2625 * 0.205, 2);
  });

  it('BC gross provincial tax: first bracket 5.06%, spillover 7.7%', () => {
    // 45,654 × 5.06% + 14,346 × 7.7%
    expect(result.provincialTax).toBeCloseTo(45654 * 0.0506 + 14346 * 0.077, 2);
  });

  it('CPP1 only (income below YMPE $71,300)', () => {
    expect(result.cpp2).toBe(0);
    expect(result.cppContributions).toBeCloseTo((60000 - 3500) * 0.0595, 2);
  });

  it('EI at 1.64% (below max insurable $65,700)', () => {
    expect(result.eiPremiums).toBeCloseTo(60000 * 0.0164, 2);
  });

  it('net income is in a reasonable range', () => {
    expect(result.netIncome).toBeGreaterThan(42000);
    expect(result.netIncome).toBeLessThan(50000);
  });
});

describe('calculateTax 2025 — AB employee $80k', () => {
  const result = calculateTax(
    { grossIncome: 80000, provinceCode: 'AB' },
    RATES_2025
  );

  it('AB 8% bracket applies on first $60k', () => {
    // All $80k taxed: 60,000 × 8% + 20,000 × 10%
    expect(result.provincialTax).toBeCloseTo(60000 * 0.08 + 20000 * 0.10, 2);
  });

  it('CPP1 maxed, CPP2 on earnings between YMPE and income', () => {
    // income $80k > YMPE $71,300; income $80k < YAMPE $81,200
    expect(result.cpp1).toBeCloseTo((71300 - 3500) * 0.0595, 2);
    expect(result.cpp2).toBeCloseTo((80000 - 71300) * 0.04, 2);
    expect(result.cppContributions).toBeCloseTo(result.cpp1 + result.cpp2, 2);
  });

  it('EI capped at max insurable earnings', () => {
    expect(result.eiPremiums).toBeCloseTo(65700 * 0.0164, 2);
  });
});

describe('calculateTax 2025 — ON employee $120k with $10k RRSP', () => {
  const result = calculateTax(
    { grossIncome: 120000, provinceCode: 'ON', rrspContribution: 10000 },
    RATES_2025
  );

  it('taxable income reduced to $110k by RRSP', () => {
    expect(result.taxableIncome).toBe(110000);
  });

  it('federal gross tax uses taxable income (second bracket 20.5%)', () => {
    expect(result.federalTax).toBeCloseTo(
      57375 * 0.145 + (110000 - 57375) * 0.205,
      2
    );
  });

  it('ON provincial gross tax spans three brackets', () => {
    expect(result.provincialTax).toBeCloseTo(
      51446 * 0.0505 +
        (102894 - 51446) * 0.0915 +
        (110000 - 102894) * 0.1116,
      2
    );
  });

  it('CPP1 + CPP2 both maxed (gross income $120k exceeds YAMPE $81,200)', () => {
    expect(result.cpp1).toBeCloseTo((71300 - 3500) * 0.0595, 2);
    expect(result.cpp2).toBeCloseTo((81200 - 71300) * 0.04, 2);
  });

  it('combined marginal rate spans federal 20.5% + ON 11.16% (third bracket)', () => {
    // taxable income $110k puts ON in third bracket ($102,894–$150,000 at 11.16%)
    expect(result.combinedMarginalRate).toBeCloseTo(0.205 + 0.1116, 4);
  });
});

describe('calculateTax 2025 — QC self-employed $80k', () => {
  const result = calculateTax(
    { grossIncome: 80000, provinceCode: 'QC', isSelfEmployed: true },
    RATES_2025
  );

  it('QC provincial gross tax spans two brackets', () => {
    expect(result.provincialTax).toBeCloseTo(
      51780 * 0.14 + (80000 - 51780) * 0.19,
      2
    );
  });

  it('self-employed CPP is doubled', () => {
    const employeeCPP1 = (71300 - 3500) * 0.0595;
    const employeeCPP2 = (80000 - 71300) * 0.04;
    expect(result.cpp1).toBeCloseTo(employeeCPP1 * 2, 2);
    expect(result.cpp2).toBeCloseTo(employeeCPP2 * 2, 2);
    expect(result.cppContributions).toBeCloseTo((employeeCPP1 + employeeCPP2) * 2, 2);
  });

  it('self-employed pays no EI', () => {
    expect(result.eiPremiums).toBe(0);
  });
});

describe('calculateTax 2025 — federal BPA phase-out', () => {
  it('full BPA at low income', () => {
    const result = calculateTax(
      { grossIncome: 100000, provinceCode: 'ON' },
      RATES_2025
    );
    expect(result.federalCredit).toBeCloseTo(16129 * 0.145, 2);
  });

  it('reduced BPA above clawback start ($177,882)', () => {
    const highResult = calculateTax(
      { grossIncome: 300000, provinceCode: 'ON' },
      RATES_2025
    );
    expect(highResult.federalCredit).toBeCloseTo(14538 * 0.145, 2);
  });
});
