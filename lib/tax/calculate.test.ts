/**
 * Tax calculation tests.
 *
 * These tests are the MOAT. They prove the calculator's accuracy against
 * hand-computed scenarios. Every time you update rates.ts, run these.
 * If you find a bug in the calculation, add a regression test before fixing.
 *
 * Run with: npx vitest run
 */

import { describe, it, expect } from 'vitest';
import {
  applyBrackets,
  federalBPA,
  calculateCPP,
  calculateEI,
  calculateTax,
} from './calculate';
import {
  FEDERAL_2026,
  PROVINCES_2026,
  CPP_2026,
  EI_2026,
} from '../rates/2026';

const RATES_2026 = {
  federal: FEDERAL_2026,
  provinces: PROVINCES_2026,
  cpp: CPP_2026,
  ei: EI_2026,
};

describe('applyBrackets', () => {
  const simple = [
    { upper: 10000, rate: 0.1 },
    { upper: 50000, rate: 0.2 },
    { upper: Infinity, rate: 0.3 },
  ];

  it('returns 0 for zero or negative income', () => {
    expect(applyBrackets(0, simple)).toBe(0);
    expect(applyBrackets(-100, simple)).toBe(0);
  });

  it('applies first-bracket rate only within first bracket', () => {
    expect(applyBrackets(5000, simple)).toBe(500);
    expect(applyBrackets(10000, simple)).toBe(1000);
  });

  it('stacks brackets correctly', () => {
    expect(applyBrackets(30000, simple)).toBe(1000 + 20000 * 0.2);
    expect(applyBrackets(60000, simple)).toBe(1000 + 40000 * 0.2 + 10000 * 0.3);
  });
});

describe('federalBPA (2026)', () => {
  it('returns full BPA for incomes below clawback start', () => {
    expect(federalBPA(50000, FEDERAL_2026)).toBe(16452);
    expect(federalBPA(181440, FEDERAL_2026)).toBe(16452);
  });

  it('returns base BPA for incomes above clawback end', () => {
    expect(federalBPA(258482, FEDERAL_2026)).toBe(14829);
    expect(federalBPA(500000, FEDERAL_2026)).toBe(14829);
  });

  it('linearly phases out between thresholds', () => {
    const midpoint = (181440 + 258482) / 2;
    const midpointBPA = federalBPA(midpoint, FEDERAL_2026);
    expect(midpointBPA).toBeCloseTo(16452 - 1623 / 2, 2);
  });
});

describe('calculateCPP (2026)', () => {
  it('returns 0 on income below basic exemption', () => {
    const { total } = calculateCPP(3000, CPP_2026);
    expect(total).toBe(0);
  });

  it('maxes CPP1 at the YMPE ceiling', () => {
    const { cpp1 } = calculateCPP(74600, CPP_2026);
    const expectedMax = (74600 - 3500) * 0.0595;
    expect(cpp1).toBeCloseTo(expectedMax, 2);
    expect(cpp1).toBeCloseTo(4230.45, 2);
  });

  it('adds CPP2 above the YMPE', () => {
    const { cpp1, cpp2, total } = calculateCPP(85000, CPP_2026);
    expect(cpp1).toBeCloseTo(4230.45, 2);
    expect(cpp2).toBeCloseTo((85000 - 74600) * 0.04, 2);
    expect(total).toBeCloseTo(4230.45 + 416, 2);
  });

  it('caps CPP2 at the YAMPE ceiling', () => {
    const { cpp2 } = calculateCPP(200000, CPP_2026);
    expect(cpp2).toBeCloseTo(416, 2);
  });

  it('doubles for self-employed', () => {
    const employee = calculateCPP(60000, CPP_2026, false);
    const selfEmployed = calculateCPP(60000, CPP_2026, true);
    expect(selfEmployed.total).toBeCloseTo(employee.total * 2, 2);
  });
});

describe('calculateEI (2026)', () => {
  it('applies standard rate outside Quebec', () => {
    const ei = calculateEI(50000, EI_2026);
    expect(ei).toBeCloseTo(50000 * 0.0164, 2);
  });

  it('caps at max insurable earnings', () => {
    const ei = calculateEI(100000, EI_2026);
    expect(ei).toBeCloseTo(65700 * 0.0164, 2);
  });

  it('applies Quebec rate for QC residents', () => {
    const ei = calculateEI(50000, EI_2026, { isQuebec: true });
    expect(ei).toBeCloseTo(50000 * 0.0131, 2);
  });

  it('returns 0 for self-employed', () => {
    const ei = calculateEI(50000, EI_2026, { isSelfEmployed: true });
    expect(ei).toBe(0);
  });
});

describe('calculateTax — BC scenarios (2026)', () => {
  it('handles a $60k BC employee', () => {
    const result = calculateTax(
      { grossIncome: 60000, provinceCode: 'BC' },
      RATES_2026
    );

    expect(result.grossIncome).toBe(60000);
    expect(result.taxableIncome).toBe(60000);
    expect(result.federalTax).toBeCloseTo(58523 * 0.14 + 1477 * 0.205, 2);
    expect(result.provincialTax).toBeCloseTo(
      50363 * 0.056 + 9637 * 0.077,
      2
    );
    expect(result.cppContributions).toBeCloseTo((60000 - 3500) * 0.0595, 2);
    expect(result.eiPremiums).toBeCloseTo(60000 * 0.0164, 2);
    expect(result.netIncome).toBeGreaterThan(40000);
    expect(result.netIncome).toBeLessThan(50000);
  });

  it('handles a high-income BC earner with RRSP deduction', () => {
    const result = calculateTax(
      {
        grossIncome: 200000,
        provinceCode: 'BC',
        rrspContribution: 30000,
      },
      RATES_2026
    );

    expect(result.taxableIncome).toBe(170000);
    expect(result.combinedMarginalRate).toBeCloseTo(0.26 + 0.147, 4);
    expect(result.cppContributions).toBeCloseTo(4230.45 + 416, 2);
  });

  it('applies BPA clawback for $220k earner', () => {
    const result = calculateTax(
      { grossIncome: 220000, provinceCode: 'BC' },
      RATES_2026
    );

    const fullBPACredit = FEDERAL_2026.basicPersonalAmount * 0.14;
    expect(result.federalCredit).toBeLessThan(fullBPACredit);
    expect(result.federalCredit).toBeGreaterThan(FEDERAL_2026.bpaBase * 0.14);
  });

  it('handles self-employed (no EI, 2× CPP)', () => {
    const employee = calculateTax(
      { grossIncome: 80000, provinceCode: 'BC' },
      RATES_2026
    );
    const selfEmployed = calculateTax(
      { grossIncome: 80000, provinceCode: 'BC', isSelfEmployed: true },
      RATES_2026
    );

    expect(selfEmployed.eiPremiums).toBe(0);
    expect(selfEmployed.cppContributions).toBeCloseTo(
      employee.cppContributions * 2,
      2
    );
  });
});

describe('calculateTax — Alberta 8% bottom bracket (2026)', () => {
  it('applies the new 8% rate on first $60k', () => {
    const result = calculateTax(
      { grossIncome: 50000, provinceCode: 'AB' },
      RATES_2026
    );
    expect(result.provincialTax).toBeCloseTo(50000 * 0.08, 2);
  });
});

describe('calculateTax — unknown province', () => {
  it('throws a clear error', () => {
    expect(() =>
      calculateTax({ grossIncome: 50000, provinceCode: 'ZZ' }, RATES_2026)
    ).toThrow(/Unknown province code: ZZ/);
  });
});
