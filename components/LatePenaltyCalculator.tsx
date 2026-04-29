'use client';

import { useState } from 'react';
import { calculateLatePenalty } from '@/lib/filing/penalty';
import { formatCurrency as fmt, formatPercent as fmtPct } from '@/lib/formatting';

export default function LatePenaltyCalculator() {
  const [balanceNum, setBalance] = useState(0);
  const [months, setMonths] = useState(0);
  const [repeat, setRepeat] = useState(false);

  const result = calculateLatePenalty({
    balanceOwing: balanceNum,
    monthsLate: months,
    isRepeatOffender: repeat,
  });

  const hasBalance = balanceNum > 0;

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Balance owing */}
        <div>
          <label
            htmlFor="lpc-balance"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Balance owing
          </label>
          <div className="relative mt-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
              $
            </span>
            <input
              id="lpc-balance"
              type="number"
              min={0}
              step={100}
              value={balanceNum || ''}
              onChange={(e) => setBalance(Number(e.target.value) || 0)}
              placeholder="0"
              className="w-full rounded-lg border border-neutral-300 bg-white pl-7 pr-3 py-2 text-base tabular-nums outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
            />
          </div>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            Enter the amount you owe. If you&apos;re getting a refund, leave this at $0 — there&apos;s no penalty.
          </p>
        </div>

        {/* Months late */}
        <div>
          <label
            htmlFor="lpc-months"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Complete months late
          </label>
          <input
            id="lpc-months"
            type="number"
            min={0}
            max={20}
            step={1}
            value={months}
            onChange={(e) => setMonths(Math.max(0, Math.min(20, parseInt(e.target.value) || 0)))}
            className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-base outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          />
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            Complete months past the April 30, 2026 deadline.
          </p>
        </div>
      </div>

      {/* Repeat offender */}
      <div className="flex items-start gap-3">
        <input
          id="lpc-repeat"
          type="checkbox"
          checked={repeat}
          onChange={(e) => setRepeat(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-neutral-300 dark:border-neutral-700"
        />
        <div>
          <label htmlFor="lpc-repeat" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            CRA charged me a late-filing penalty in 2022, 2023, or 2024, and also issued a demand to file
          </label>
          <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
            Both conditions must apply. If you&apos;re unsure, leave unchecked.
          </p>
        </div>
      </div>

      {/* Outputs */}
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-5 dark:border-neutral-800 dark:bg-neutral-900">
        {result.note ? (
          <p className="text-base font-medium text-emerald-700 dark:text-emerald-400">{result.note}</p>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                Estimated penalty
              </p>
              <p className="mt-1 tabular-nums text-4xl font-bold text-amber-600 dark:text-amber-400">
                {fmt(result.totalPenalty)}
              </p>
            </div>

            <div className="flex gap-6">
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Base penalty</p>
                <p className="tabular-nums text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {fmt(result.basePenalty)}
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Monthly addition</p>
                <p className="tabular-nums text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {fmt(result.monthlyPenalty)}
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Effective rate</p>
                <p className="tabular-nums text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {fmtPct(result.effectivePenaltyRate)}
                </p>
              </div>
            </div>

            {result.penaltyCapReached && (
              <p className="text-xs text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2">
                Penalty cap reached — additional months do not increase the penalty further.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Notes — only shown when there's a balance */}
      {hasBalance && (
        <div className="space-y-2 text-xs text-neutral-500 dark:text-neutral-400">
          <p>
            <strong className="font-medium text-neutral-700 dark:text-neutral-300">Interest also applies:</strong>{' '}
            CRA charges daily-compounding interest on both the unpaid balance and on the penalty itself, starting
            May 1, 2026. This calculator shows penalties only.
          </p>
          <p>
            <strong className="font-medium text-neutral-700 dark:text-neutral-300">Important:</strong>{' '}
            Filing on time even if you can&apos;t pay stops the late-filing penalty. Only interest accrues on an unpaid
            balance. The penalty is the expensive part.
          </p>
        </div>
      )}
    </div>
  );
}
