import { describe, it, expect } from 'vitest';
import { calculateLatePenalty } from './penalty';

describe('calculateLatePenalty', () => {
  it('returns zero penalty with note when balance is $0', () => {
    const result = calculateLatePenalty({ balanceOwing: 0, monthsLate: 3, isRepeatOffender: false });
    expect(result.totalPenalty).toBe(0);
    expect(result.basePenalty).toBe(0);
    expect(result.monthlyPenalty).toBe(0);
    expect(result.effectivePenaltyRate).toBe(0);
    expect(result.penaltyCapReached).toBe(false);
    expect(result.note).not.toBeNull();
  });

  it('returns zero penalty when balance is negative', () => {
    const result = calculateLatePenalty({ balanceOwing: -500, monthsLate: 5, isRepeatOffender: false });
    expect(result.totalPenalty).toBe(0);
    expect(result.note).not.toBeNull();
  });

  it('$10,000 / 3mo / standard → $800', () => {
    const result = calculateLatePenalty({ balanceOwing: 10000, monthsLate: 3, isRepeatOffender: false });
    expect(result.basePenalty).toBe(500);
    expect(result.monthlyPenalty).toBe(300);
    expect(result.totalPenalty).toBe(800);
    expect(result.effectivePenaltyRate).toBeCloseTo(0.08);
    expect(result.penaltyCapReached).toBe(false);
    expect(result.note).toBeNull();
  });

  it('$10,000 / 12mo / standard → $1,700 with cap reached', () => {
    const result = calculateLatePenalty({ balanceOwing: 10000, monthsLate: 12, isRepeatOffender: false });
    expect(result.basePenalty).toBe(500);
    expect(result.monthlyPenalty).toBe(1200);
    expect(result.totalPenalty).toBe(1700);
    expect(result.penaltyCapReached).toBe(true);
  });

  it('months > cap clamps to 12 for standard filer', () => {
    const result12 = calculateLatePenalty({ balanceOwing: 10000, monthsLate: 12, isRepeatOffender: false });
    const result25 = calculateLatePenalty({ balanceOwing: 10000, monthsLate: 25, isRepeatOffender: false });
    expect(result25.totalPenalty).toBe(result12.totalPenalty);
    expect(result25.penaltyCapReached).toBe(true);
  });

  it('$10,000 / 3mo / repeat → $1,600', () => {
    const result = calculateLatePenalty({ balanceOwing: 10000, monthsLate: 3, isRepeatOffender: true });
    expect(result.basePenalty).toBe(1000);
    expect(result.monthlyPenalty).toBe(600);
    expect(result.totalPenalty).toBe(1600);
    expect(result.effectivePenaltyRate).toBeCloseTo(0.16);
    expect(result.penaltyCapReached).toBe(false);
  });

  it('$10,000 / 20mo / repeat → $5,000 with cap reached', () => {
    const result = calculateLatePenalty({ balanceOwing: 10000, monthsLate: 20, isRepeatOffender: true });
    expect(result.basePenalty).toBe(1000);
    expect(result.monthlyPenalty).toBe(4000);
    expect(result.totalPenalty).toBe(5000);
    expect(result.penaltyCapReached).toBe(true);
  });

  it('$15,000 / 6mo / repeat → $3,300', () => {
    const result = calculateLatePenalty({ balanceOwing: 15000, monthsLate: 6, isRepeatOffender: true });
    expect(result.basePenalty).toBe(1500);
    expect(result.monthlyPenalty).toBe(1800);
    expect(result.totalPenalty).toBe(3300);
  });

  it('months > 20 clamps for repeat offender', () => {
    const result20 = calculateLatePenalty({ balanceOwing: 10000, monthsLate: 20, isRepeatOffender: true });
    const result30 = calculateLatePenalty({ balanceOwing: 10000, monthsLate: 30, isRepeatOffender: true });
    expect(result30.totalPenalty).toBe(result20.totalPenalty);
    expect(result30.penaltyCapReached).toBe(true);
  });

  it('0 months late with balance still has base penalty', () => {
    const result = calculateLatePenalty({ balanceOwing: 10000, monthsLate: 0, isRepeatOffender: false });
    expect(result.basePenalty).toBe(500);
    expect(result.monthlyPenalty).toBe(0);
    expect(result.totalPenalty).toBe(500);
  });
});
