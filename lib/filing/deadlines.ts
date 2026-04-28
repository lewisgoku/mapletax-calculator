// CRA deadlines for the 2025 T1 return
// Source: https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/important-dates-individuals.html

export type DeadlineStatus =
  | { status: 'upcoming'; daysRemaining: number; deadline: Date }
  | { status: 'today'; deadline: Date }
  | { status: 'passed'; daysLate: number; deadline: Date }
  | { status: 'self-employed-window'; daysRemaining: number; seDeadline: Date; balanceDueDate: Date }
  | { status: 'netfile-closed' };

// April 30, 2026 — T1 filing deadline (and balance owing due date for all filers)
const FILING_DEADLINE = new Date(2026, 3, 30);
// June 15, 2026 — self-employed filing deadline (balance still due April 30)
const SE_DEADLINE = new Date(2026, 5, 15);
// January 29, 2027 — last day NETFILE accepts 2025 returns
const NETFILE_CLOSE = new Date(2027, 0, 29);

function toDateOnly(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function daysBetween(from: Date, to: Date): number {
  const ms = to.getTime() - from.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

/**
 * Compute the current filing status for the 2025 T1 return.
 * Pass `now` explicitly to keep this pure and testable.
 */
export function get2025FilingStatus(now: Date): DeadlineStatus {
  const today = toDateOnly(now);
  const apr30 = toDateOnly(FILING_DEADLINE);
  const jun15 = toDateOnly(SE_DEADLINE);
  const jan29 = toDateOnly(NETFILE_CLOSE);

  if (today > jan29) {
    return { status: 'netfile-closed' };
  }

  if (today > jun15) {
    const daysLate = daysBetween(apr30, today);
    return { status: 'passed', daysLate, deadline: FILING_DEADLINE };
  }

  if (today > apr30) {
    // May 1 – June 15: balance due date passed, SE filing window still open
    const daysRemaining = daysBetween(today, jun15);
    return {
      status: 'self-employed-window',
      daysRemaining,
      seDeadline: SE_DEADLINE,
      balanceDueDate: FILING_DEADLINE,
    };
  }

  if (today.getTime() === apr30.getTime()) {
    return { status: 'today', deadline: FILING_DEADLINE };
  }

  // Before April 30
  const daysRemaining = daysBetween(today, apr30);
  return { status: 'upcoming', daysRemaining, deadline: FILING_DEADLINE };
}
