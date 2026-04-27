'use client';

import { useState, useMemo } from 'react';
import { computeFHSARoom } from '@/lib/registered-accounts/room';
import { FHSA_2026 } from '@/lib/registered-accounts/2026';

const CURRENT_YEAR = 2026;

function fmt(n: number) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(n);
}

export default function FHSARoomCalculator() {
  const [accountOpenYear, setAccountOpenYear] = useState('');
  const [contributions, setContributions] = useState('');

  const result = useMemo(() => {
    const openYear = parseInt(accountOpenYear, 10);
    const contrib = parseFloat((contributions || '0').replace(/,/g, ''));

    if (!accountOpenYear || isNaN(openYear) || openYear > CURRENT_YEAR) return null;
    if (isNaN(contrib) || contrib < 0) return null;

    try {
      return computeFHSARoom({
        accountOpenYear: openYear,
        currentYear: CURRENT_YEAR,
        contributionsToDate: contrib,
      });
    } catch {
      return null;
    }
  }, [accountOpenYear, contributions]);

  const closureYear = accountOpenYear
    ? parseInt(accountOpenYear, 10) + FHSA_2026.participationLimitYears
    : null;

  const yearsRemaining =
    closureYear !== null ? Math.max(0, closureYear - CURRENT_YEAR) : null;

  return (
    <div>
      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
        FHSA contribution room calculator — 2026
      </h3>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        Calculate how much room you have available this year, including any carry-forward.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="fhsa-open-year"
            className="block text-xs font-medium text-neutral-700 dark:text-neutral-300"
          >
            Year FHSA was opened
          </label>
          <input
            id="fhsa-open-year"
            type="number"
            min="2023"
            max={CURRENT_YEAR}
            placeholder="e.g. 2024"
            value={accountOpenYear}
            onChange={(e) => setAccountOpenYear(e.target.value)}
            className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm tabular-nums text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
          />
          {closureYear && (
            <p className="mt-1 text-xs text-neutral-400">
              Must close by {closureYear} ({yearsRemaining} year{yearsRemaining !== 1 ? 's' : ''}{' '}
              remaining)
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="fhsa-contributions"
            className="block text-xs font-medium text-neutral-700 dark:text-neutral-300"
          >
            Total contributions to date
          </label>
          <input
            id="fhsa-contributions"
            type="number"
            min="0"
            max={FHSA_2026.lifetimeLimit}
            placeholder="0"
            value={contributions}
            onChange={(e) => setContributions(e.target.value)}
            className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm tabular-nums text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
          />
        </div>
      </div>

      {result && (
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-neutral-200 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Room this year</p>
            <p className="mt-1 tabular-nums text-lg font-semibold text-emerald-600 dark:text-emerald-400">
              {fmt(result.annualRoomThisYear)}
            </p>
            {result.carryForwardAvailable > 0 && (
              <p className="mt-0.5 text-xs text-neutral-400">
                Includes{' '}
                <span className="tabular-nums">{fmt(result.carryForwardAvailable)}</span>{' '}
                carry-forward
              </p>
            )}
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Lifetime remaining</p>
            <p className="mt-1 tabular-nums text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {fmt(result.lifetimeRoomRemaining)}
            </p>
            <p className="mt-0.5 text-xs text-neutral-400">of $40,000 lifetime</p>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">15-year clock</p>
            {yearsRemaining !== null && (
              <>
                <p className="mt-1 tabular-nums text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  {yearsRemaining} yr{yearsRemaining !== 1 ? 's' : ''}
                </p>
                <p className="mt-0.5 text-xs text-neutral-400">until forced closure</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
