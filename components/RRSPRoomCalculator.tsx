'use client';

import { useState, useMemo } from 'react';
import { computeRRSPRoom } from '@/lib/registered-accounts/room';
import { RRSP_2026 } from '@/lib/registered-accounts/2026';

function fmt(n: number) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(n);
}

export default function RRSPRoomCalculator() {
  const [earnedIncome, setEarnedIncome] = useState('');
  const [carryForward, setCarryForward] = useState('');
  const [pensionAdjustment, setPensionAdjustment] = useState('');

  const result = useMemo(() => {
    const income = parseFloat(earnedIncome.replace(/,/g, ''));
    if (!earnedIncome || isNaN(income) || income < 0) return null;
    try {
      return computeRRSPRoom({
        priorYearEarnedIncome: income,
        carryForward: carryForward ? parseFloat(carryForward.replace(/,/g, '')) : undefined,
        pensionAdjustment: pensionAdjustment ? parseFloat(pensionAdjustment.replace(/,/g, '')) : undefined,
      });
    } catch {
      return null;
    }
  }, [earnedIncome, carryForward, pensionAdjustment]);

  return (
    <div>
      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
        RRSP contribution room calculator — 2026
      </h3>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        Enter your 2025 earned income to see your 2026 RRSP room.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div>
          <label
            htmlFor="rrsp-earned-income"
            className="block text-xs font-medium text-neutral-700 dark:text-neutral-300"
          >
            2025 earned income
          </label>
          <input
            id="rrsp-earned-income"
            type="number"
            min="0"
            placeholder="e.g. 80000"
            value={earnedIncome}
            onChange={(e) => setEarnedIncome(e.target.value)}
            className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm tabular-nums text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
          />
        </div>

        <div>
          <label
            htmlFor="rrsp-carry-forward"
            className="block text-xs font-medium text-neutral-700 dark:text-neutral-300"
          >
            Carry-forward room{' '}
            <span className="font-normal text-neutral-400">(optional)</span>
          </label>
          <input
            id="rrsp-carry-forward"
            type="number"
            min="0"
            placeholder="From your NOA"
            value={carryForward}
            onChange={(e) => setCarryForward(e.target.value)}
            className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm tabular-nums text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
          />
        </div>

        <div>
          <label
            htmlFor="rrsp-pension-adj"
            className="block text-xs font-medium text-neutral-700 dark:text-neutral-300"
          >
            Pension adjustment{' '}
            <span className="font-normal text-neutral-400">(T4 box 52)</span>
          </label>
          <input
            id="rrsp-pension-adj"
            type="number"
            min="0"
            placeholder="0 if none"
            value={pensionAdjustment}
            onChange={(e) => setPensionAdjustment(e.target.value)}
            className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm tabular-nums text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
          />
        </div>
      </div>

      {result && (
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-neutral-200 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">New room this year</p>
            <p className="mt-1 tabular-nums text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {fmt(result.newRoomThisYear)}
            </p>
            {result.cappedAtDollarLimit && (
              <p className="mt-0.5 text-xs text-neutral-400">Capped at $33,810 limit</p>
            )}
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Total available room</p>
            <p className="mt-1 tabular-nums text-lg font-semibold text-emerald-600 dark:text-emerald-400">
              {fmt(result.totalRoom)}
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Deadline</p>
            <p className="mt-1 text-sm font-medium text-neutral-900 dark:text-neutral-100">
              {RRSP_2026.sixtyDayDeadline}
            </p>
            <p className="mt-0.5 text-xs text-neutral-400">60 days after Dec 31, 2026</p>
          </div>
        </div>
      )}
    </div>
  );
}
