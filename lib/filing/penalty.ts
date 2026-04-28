// CRA late-filing penalty rules for the 2025 T1 return
// Source: https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/interest-penalties/late-filing-penalty.html

export interface PenaltyInput {
  balanceOwing: number;
  monthsLate: number;       // complete months past April 30, 2026; 0–20
  isRepeatOffender: boolean; // penalized in any of prior 3 years AND CRA issued demand to file
}

export interface PenaltyResult {
  basePenalty: number;
  monthlyPenalty: number;
  totalPenalty: number;
  effectivePenaltyRate: number; // decimal, e.g. 0.08 for 8%
  penaltyCapReached: boolean;
  note: string | null;
}

export function calculateLatePenalty(input: PenaltyInput): PenaltyResult {
  const { balanceOwing, monthsLate, isRepeatOffender } = input;

  if (balanceOwing <= 0) {
    return {
      basePenalty: 0,
      monthlyPenalty: 0,
      totalPenalty: 0,
      effectivePenaltyRate: 0,
      penaltyCapReached: false,
      note: "No penalty — you don't owe any tax. File as soon as possible to avoid delays to your benefits.",
    };
  }

  const baseRate = isRepeatOffender ? 0.10 : 0.05;
  const monthlyRate = isRepeatOffender ? 0.02 : 0.01;
  const maxMonths = isRepeatOffender ? 20 : 12;

  const cappedMonths = Math.min(monthsLate, maxMonths);
  const penaltyCapReached = monthsLate >= maxMonths;

  const basePenalty = balanceOwing * baseRate;
  const monthlyPenalty = balanceOwing * monthlyRate * cappedMonths;
  const totalPenalty = basePenalty + monthlyPenalty;
  const effectivePenaltyRate = totalPenalty / balanceOwing;

  return {
    basePenalty,
    monthlyPenalty,
    totalPenalty,
    effectivePenaltyRate,
    penaltyCapReached,
    note: null,
  };
}
