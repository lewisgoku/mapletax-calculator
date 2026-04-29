'use client';

import { useState } from 'react';
import { calculateInstalments } from '@/lib/tax/instalments';
import { INSTALMENTS_2026 } from '@/lib/registered-accounts/2026';
import { formatCurrency as fmt } from '@/lib/formatting';

const fmtDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-CA', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export default function InstalmentCalculator() {
  const [priorYearNetTax, setPriorYearNetTax] = useState(0);
  const [isQuebec, setIsQuebec] = useState(false);

  const result = calculateInstalments(
    { priorYearNetTax, isQuebec },
    INSTALMENTS_2026,
  );

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Prior-year net tax */}
        <div>
          <label
            htmlFor="inst-prior-tax"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Prior-year net tax (2025 T1)
          </label>
          <div className="relative mt-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
              $
            </span>
            <input
              id="inst-prior-tax"
              type="number"
              min={0}
              step={100}
              value={priorYearNetTax || ''}
              onChange={(e) => setPriorYearNetTax(Number(e.target.value) || 0)}
              placeholder="0"
              className="w-full rounded-lg border border-neutral-300 bg-white pl-7 pr-3 py-2 text-base tabular-nums outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
            />
          </div>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            Check your 2025 Notice of Assessment or line 43500 of your 2025 T1 return.
          </p>
        </div>

        {/* Province */}
        <div>
          <label
            htmlFor="inst-province"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Province
          </label>
          <select
            id="inst-province"
            value={isQuebec ? 'qc' : 'other'}
            onChange={(e) => setIsQuebec(e.target.value === 'qc')}
            className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-base outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            <option value="other">All provinces except Quebec</option>
            <option value="qc">Quebec</option>
          </select>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            Quebec uses a lower instalment threshold ($1,800 vs. $3,000).
          </p>
        </div>
      </div>

      {/* Output */}
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-5 dark:border-neutral-800 dark:bg-neutral-900">
        {!result.mustPayInstalments ? (
          <div className="space-y-2">
            <p className="text-base font-medium text-emerald-700 dark:text-emerald-400">
              Instalments not required based on prior-year tax.
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Your prior-year net tax ({fmt(priorYearNetTax)}) is at or below the{' '}
              {fmt(result.threshold)} threshold. However, if your 2026 income is significantly
              higher, you may owe a large balance in April. Consider voluntary instalments to
              spread the cost.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                Quarterly instalment (prior-year method)
              </p>
              <p className="mt-1 tabular-nums text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                {fmt(result.quarterlyAmount)}
              </p>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                per quarter · {fmt(result.annualTotal)} annual total
              </p>
            </div>

            <div className="space-y-2">
              {result.dueDates.map((date, i) => (
                <div
                  key={date}
                  className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-4 py-2.5 dark:border-neutral-700 dark:bg-neutral-800"
                >
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">
                    Q{i + 1} — {fmtDate(date)}
                  </span>
                  <span className="tabular-nums text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {fmt(result.quarterlyAmount)}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Prior-year method: 25% of your 2025 net tax per quarter. CRA also mails instalment
              reminders in February and August with a two-year-average amount — either method is
              acceptable.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
