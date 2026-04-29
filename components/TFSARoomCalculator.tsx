'use client';

import { useState, useMemo } from 'react';
import { computeTFSARoom } from '@/lib/registered-accounts/room';
import { formatCurrency as fmt } from '@/lib/formatting';

const CURRENT_YEAR = 2026;

export default function TFSARoomCalculator() {
  const [birthYear, setBirthYear] = useState('');
  const [contributions, setContributions] = useState('');
  const [withdrawalsLastYear, setWithdrawalsLastYear] = useState('');

  const result = useMemo(() => {
    const by = parseInt(birthYear, 10);
    const contrib = parseFloat((contributions || '0').replace(/,/g, ''));
    const withdrawals = parseFloat((withdrawalsLastYear || '0').replace(/,/g, ''));

    if (!birthYear || isNaN(by) || by > CURRENT_YEAR) return null;
    if (isNaN(contrib) || contrib < 0) return null;

    try {
      return computeTFSARoom({
        birthYear: by,
        currentYear: CURRENT_YEAR,
        contributionsToDate: contrib,
        withdrawalsLastYear: withdrawals > 0 ? withdrawals : undefined,
      });
    } catch {
      return null;
    }
  }, [birthYear, contributions, withdrawalsLastYear]);

  const firstEligibleYear = birthYear ? Math.max(parseInt(birthYear, 10) + 18, 2009) : null;

  return (
    <div>
      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
        TFSA contribution room calculator — 2026
      </h3>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        Your room depends on your age. Room accumulates from the year you turned 18, or 2009 —
        whichever is later.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div>
          <label
            htmlFor="tfsa-birth-year"
            className="block text-xs font-medium text-neutral-700 dark:text-neutral-300"
          >
            Birth year
          </label>
          <input
            id="tfsa-birth-year"
            type="number"
            min="1950"
            max={CURRENT_YEAR}
            placeholder="e.g. 1990"
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
            className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm tabular-nums text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
          />
          {firstEligibleYear && (
            <p className="mt-1 text-xs text-neutral-400">Eligible from {firstEligibleYear}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="tfsa-contributions"
            className="block text-xs font-medium text-neutral-700 dark:text-neutral-300"
          >
            Total contributions to date{' '}
            <span className="font-normal text-neutral-400">(all accounts)</span>
          </label>
          <input
            id="tfsa-contributions"
            type="number"
            min="0"
            placeholder="0"
            value={contributions}
            onChange={(e) => setContributions(e.target.value)}
            className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm tabular-nums text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
          />
        </div>

        <div>
          <label
            htmlFor="tfsa-withdrawals"
            className="block text-xs font-medium text-neutral-700 dark:text-neutral-300"
          >
            Withdrawals in 2025{' '}
            <span className="font-normal text-neutral-400">(optional)</span>
          </label>
          <input
            id="tfsa-withdrawals"
            type="number"
            min="0"
            placeholder="0"
            value={withdrawalsLastYear}
            onChange={(e) => setWithdrawalsLastYear(e.target.value)}
            className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm tabular-nums text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
          />
          <p className="mt-1 text-xs text-neutral-400">Room from 2025 withdrawals returns Jan 1, 2026</p>
        </div>
      </div>

      {result && (
        <div className="mt-5 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-neutral-200 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800">
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Cumulative limit</p>
              <p className="mt-1 tabular-nums text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {fmt(result.cumulativeLimit)}
              </p>
            </div>
            <div
              className={[
                'rounded-xl border px-4 py-3',
                result.isOverContributed
                  ? 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950'
                  : 'border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800',
              ].join(' ')}
            >
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {result.isOverContributed ? 'Over-contribution' : 'Room available now'}
              </p>
              <p
                className={[
                  'mt-1 tabular-nums text-lg font-semibold',
                  result.isOverContributed
                    ? 'text-red-700 dark:text-red-400'
                    : 'text-emerald-600 dark:text-emerald-400',
                ].join(' ')}
              >
                {result.isOverContributed
                  ? `${fmt(result.overContributionAmount)} over`
                  : fmt(result.availableRoom)}
              </p>
            </div>
          </div>
          {result.isOverContributed && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
            >
              You appear to be over-contributed by{' '}
              <span className="tabular-nums font-semibold">
                {fmt(result.overContributionAmount)}
              </span>
              . The CRA charges 1% per month on excess amounts. Withdraw the excess or contact
              your financial institution.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
