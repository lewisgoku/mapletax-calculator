import { describe, it, expect } from 'vitest';
import { computeRRSPRoom, computeTFSARoom, computeFHSARoom } from './room';
import { RRSP_2026, TFSA_2026, FHSA_2026 } from './2026';

// ---------------------------------------------------------------------------
// RRSP
// ---------------------------------------------------------------------------

describe('computeRRSPRoom', () => {
  it('$50k earned income → $9,000 new room', () => {
    const result = computeRRSPRoom({ priorYearEarnedIncome: 50000 });
    expect(result.newRoomThisYear).toBe(9000); // 0.18 × 50000 = 9000
    expect(result.totalRoom).toBe(9000);
    expect(result.cappedAtDollarLimit).toBe(false);
  });

  it('$200k earned income → capped at $33,810', () => {
    const result = computeRRSPRoom({ priorYearEarnedIncome: 200000 });
    expect(result.newRoomThisYear).toBe(33810);
    expect(result.totalRoom).toBe(33810);
    expect(result.cappedAtDollarLimit).toBe(true);
  });

  it('exactly at cap: $187,833 earned income → capped', () => {
    // 0.18 × 187833 = 33809.94 which is < 33810, so not capped
    const result = computeRRSPRoom({ priorYearEarnedIncome: 187833 });
    expect(result.newRoomThisYear).toBe(0.18 * 187833);
    expect(result.cappedAtDollarLimit).toBe(false);
  });

  it('carry-forward adds to total room', () => {
    const result = computeRRSPRoom({
      priorYearEarnedIncome: 50000,
      carryForward: 15000,
    });
    expect(result.newRoomThisYear).toBe(9000);
    expect(result.totalRoom).toBe(24000); // 9000 + 15000
  });

  it('pension adjustment reduces total room dollar-for-dollar', () => {
    const result = computeRRSPRoom({
      priorYearEarnedIncome: 80000,
      carryForward: 5000,
      pensionAdjustment: 8000,
    });
    // new room: 0.18 × 80000 = 14400
    // total: 14400 + 5000 - 8000 = 11400
    expect(result.newRoomThisYear).toBe(14400);
    expect(result.totalRoom).toBe(11400);
  });

  it('pension adjustment larger than room → totalRoom floors at 0', () => {
    const result = computeRRSPRoom({
      priorYearEarnedIncome: 10000,
      pensionAdjustment: 5000,
    });
    // new room: 0.18 × 10000 = 1800
    // 1800 - 5000 = -3200 → floors at 0
    expect(result.totalRoom).toBe(0);
  });

  it('$0 earned income → $0 new room', () => {
    const result = computeRRSPRoom({ priorYearEarnedIncome: 0 });
    expect(result.newRoomThisYear).toBe(0);
    expect(result.totalRoom).toBe(0);
    expect(result.cappedAtDollarLimit).toBe(false);
  });

  it('throws on negative earned income', () => {
    expect(() => computeRRSPRoom({ priorYearEarnedIncome: -1 })).toThrow(RangeError);
  });

  it('throws on negative pension adjustment', () => {
    expect(() =>
      computeRRSPRoom({ priorYearEarnedIncome: 60000, pensionAdjustment: -100 }),
    ).toThrow(RangeError);
  });
});

// ---------------------------------------------------------------------------
// TFSA
// ---------------------------------------------------------------------------

describe('computeTFSARoom', () => {
  it('born 1991, currentYear 2026, $0 contributed → $109,000 available', () => {
    const result = computeTFSARoom({
      birthYear: 1991,
      currentYear: 2026,
      contributionsToDate: 0,
    });
    expect(result.cumulativeLimit).toBe(109000);
    expect(result.availableRoom).toBe(109000);
    expect(result.isOverContributed).toBe(false);
    expect(result.overContributionAmount).toBe(0);
  });

  it('born 2008, currentYear 2026 → $7,000 available (first eligible year = 2026)', () => {
    const result = computeTFSARoom({
      birthYear: 2008,
      currentYear: 2026,
      contributionsToDate: 0,
    });
    expect(result.cumulativeLimit).toBe(7000);
    expect(result.availableRoom).toBe(7000);
  });

  it('born 1991, $50,000 contributed, $5,000 withdrawn last year → $64,000', () => {
    const result = computeTFSARoom({
      birthYear: 1991,
      currentYear: 2026,
      contributionsToDate: 50000,
      withdrawalsLastYear: 5000,
    });
    // 109000 - 50000 + 5000 = 64000
    expect(result.availableRoom).toBe(64000);
    expect(result.isOverContributed).toBe(false);
  });

  it('born 2000 (first eligible 2018), currentYear 2026, $0 contributed', () => {
    // Years 2018–2026: 5500+6000+6000+6000+6000+6500+7000+7000+7000 = 57000
    const result = computeTFSARoom({
      birthYear: 2000,
      currentYear: 2026,
      contributionsToDate: 0,
    });
    expect(result.cumulativeLimit).toBe(57000);
    expect(result.availableRoom).toBe(57000);
  });

  it('over-contribution detected', () => {
    const result = computeTFSARoom({
      birthYear: 1991,
      currentYear: 2026,
      contributionsToDate: 115000, // 109000 limit → 6000 over
    });
    expect(result.availableRoom).toBe(0);
    expect(result.isOverContributed).toBe(true);
    expect(result.overContributionAmount).toBe(6000);
  });

  it('born in birth year that makes first eligible year exactly 2009', () => {
    // Born 1991 → first eligible 2009
    const result = computeTFSARoom({
      birthYear: 1991,
      currentYear: 2009,
      contributionsToDate: 0,
    });
    expect(result.cumulativeLimit).toBe(5000);
  });

  it('throws when birthYear > currentYear', () => {
    expect(() =>
      computeTFSARoom({ birthYear: 2027, currentYear: 2026, contributionsToDate: 0 }),
    ).toThrow(RangeError);
  });

  it('throws on negative contributions', () => {
    expect(() =>
      computeTFSARoom({ birthYear: 1990, currentYear: 2026, contributionsToDate: -1 }),
    ).toThrow(RangeError);
  });
});

// ---------------------------------------------------------------------------
// FHSA
// ---------------------------------------------------------------------------

describe('computeFHSARoom', () => {
  it('opened 2024, contributed $5k in 2024, $0 in 2025, currentYear 2026 → $11k this year, $35k lifetime', () => {
    const result = computeFHSARoom({
      accountOpenYear: 2024,
      currentYear: 2026,
      contributionsToDate: 5000,
    });
    expect(result.annualRoomThisYear).toBe(11000); // 8000 + 3000 carry-forward
    expect(result.lifetimeRoomRemaining).toBe(35000); // 40000 - 5000
    expect(result.carryForwardAvailable).toBe(3000); // 8000 - 5000
  });

  it('opened 2025, $0 contributed, currentYear 2026 → $16k this year, $40k lifetime', () => {
    const result = computeFHSARoom({
      accountOpenYear: 2025,
      currentYear: 2026,
      contributionsToDate: 0,
    });
    expect(result.carryForwardAvailable).toBe(8000); // full year unused
    expect(result.annualRoomThisYear).toBe(16000); // 8000 + 8000
    expect(result.lifetimeRoomRemaining).toBe(40000);
  });

  it('$40,000 already contributed → 0 lifetime room remaining', () => {
    const result = computeFHSARoom({
      accountOpenYear: 2022,
      currentYear: 2026,
      contributionsToDate: 40000,
    });
    expect(result.lifetimeRoomRemaining).toBe(0);
    expect(result.annualRoomThisYear).toBe(0);
    expect(result.carryForwardAvailable).toBe(0);
  });

  it('$8,000 contributed → $0 carry-forward, $8,000 room this year', () => {
    const result = computeFHSARoom({
      accountOpenYear: 2023,
      currentYear: 2026,
      contributionsToDate: 8000,
    });
    expect(result.carryForwardAvailable).toBe(0);
    expect(result.annualRoomThisYear).toBe(8000);
    expect(result.lifetimeRoomRemaining).toBe(32000);
  });

  it('throws when accountOpenYear is after currentYear', () => {
    expect(() =>
      computeFHSARoom({ accountOpenYear: 2027, currentYear: 2026, contributionsToDate: 0 }),
    ).toThrow(RangeError);
  });

  it('throws on negative contributions', () => {
    expect(() =>
      computeFHSARoom({ accountOpenYear: 2024, currentYear: 2026, contributionsToDate: -1 }),
    ).toThrow(RangeError);
  });
});
