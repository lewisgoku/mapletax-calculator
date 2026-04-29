'use client';

import { useState } from 'react';
import { projectCesg } from '@/lib/registered-accounts/resp';
import { RESP_2026 } from '@/lib/registered-accounts/2026';

const CURRENT_YEAR = 2026;

const fmt = (n: number) =>
  new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(n);

export default function CesgCalculator() {
  const [birthYear, setBirthYear] = useState(2020);
  const [annualContribution, setAnnualContribution] = useState(2500);
  const [contributionsToDate, setContributionsToDate] = useState(0);
  const [cesgToDate, setCesgToDate] = useState(0);

  const beneficiaryAge = CURRENT_YEAR - birthYear;
  const isSpecialWindow = beneficiaryAge >= 15 && beneficiaryAge <= 17;
  let meetsAge17Req: boolean | undefined = undefined;
  if (isSpecialWindow) {
    if (contributionsToDate === 0) meetsAge17Req = false;
    else if (contributionsToDate >= 2000) meetsAge17Req = true;
    // 0 < x < 2000: undefined → warning + CESG shown (Rule 2 may still be met)
  }

  const result = projectCesg(
    {
      beneficiaryBirthYear: birthYear,
      currentYear: CURRENT_YEAR,
      annualContribution,
      totalContributionsToDate: contributionsToDate,
      totalCesgReceivedToDate: cesgToDate,
      meetsAge17Requirements: meetsAge17Req,
    },
    RESP_2026,
  );

  const cesgPct = Math.min(
    100,
    ((result.totalCesgThisYear + cesgToDate) / RESP_2026.basicCesgLifetimeLimit) * 100,
  );

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Birth year */}
        <div>
          <label
            htmlFor="cesg-birth-year"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Child&apos;s birth year
          </label>
          <input
            id="cesg-birth-year"
            type="number"
            min={CURRENT_YEAR - 18}
            max={CURRENT_YEAR}
            step={1}
            value={birthYear}
            onChange={(e) => {
              const v = parseInt(e.target.value) || CURRENT_YEAR - 6;
              setBirthYear(Math.max(CURRENT_YEAR - 18, Math.min(CURRENT_YEAR, v)));
            }}
            className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-base outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          />
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            Used to calculate remaining CESG-eligible years.
          </p>
        </div>

        {/* Annual contribution */}
        <div>
          <label
            htmlFor="cesg-annual"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Annual contribution
          </label>
          <div className="relative mt-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
              $
            </span>
            <input
              id="cesg-annual"
              type="number"
              min={0}
              max={50000}
              step={100}
              value={annualContribution || ''}
              onChange={(e) => setAnnualContribution(Number(e.target.value) || 0)}
              placeholder="2500"
              className="w-full rounded-lg border border-neutral-300 bg-white pl-7 pr-3 py-2 text-base tabular-nums outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
            />
          </div>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            CESG is earned on up to $2,500/year — more contributions don&apos;t increase the grant.
          </p>
        </div>

        {/* Contributions to date */}
        <div>
          <label
            htmlFor="cesg-contrib-date"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Total contributions to date
          </label>
          <div className="relative mt-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
              $
            </span>
            <input
              id="cesg-contrib-date"
              type="number"
              min={0}
              max={50000}
              step={100}
              value={contributionsToDate || ''}
              onChange={(e) => setContributionsToDate(Number(e.target.value) || 0)}
              placeholder="0"
              className="w-full rounded-lg border border-neutral-300 bg-white pl-7 pr-3 py-2 text-base tabular-nums outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
            />
          </div>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            All contributions ever made to this beneficiary&apos;s RESP. Lifetime cap: $50,000.
          </p>
        </div>

        {/* CESG received to date */}
        <div>
          <label
            htmlFor="cesg-received-date"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Total CESG received to date
          </label>
          <div className="relative mt-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
              $
            </span>
            <input
              id="cesg-received-date"
              type="number"
              min={0}
              max={7200}
              step={100}
              value={cesgToDate || ''}
              onChange={(e) => setCesgToDate(Number(e.target.value) || 0)}
              placeholder="0"
              className="w-full rounded-lg border border-neutral-300 bg-white pl-7 pr-3 py-2 text-base tabular-nums outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
            />
          </div>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            Check your RESP statement. Lifetime maximum is $7,200.
          </p>
        </div>
      </div>

      {/* Age-17 warning */}
      {result.warningMessage && (
        <div className="border-l-4 border-amber-400 pl-4 dark:border-amber-500">
          <p className="text-sm text-amber-800 dark:text-amber-300">{result.warningMessage}</p>
        </div>
      )}

      {/* Outputs */}
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-5 dark:border-neutral-800 dark:bg-neutral-900">
        {!result.isEligibleThisYear ? (
          <p className="text-base font-medium text-neutral-600 dark:text-neutral-400">
            Beneficiary is no longer eligible for CESG — the grant window closed December 31 of the year they turned 17.
          </p>
        ) : (
          <div className="space-y-4">
            {/* Primary output */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                CESG earned in {CURRENT_YEAR}
              </p>
              <p className="mt-1 tabular-nums text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                {fmt(result.totalCesgThisYear)}
              </p>
            </div>

            {/* Secondary stats */}
            <div className="flex flex-wrap gap-6">
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  CESG toward $7,200 lifetime
                </p>
                <p className="tabular-nums text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {fmt(cesgToDate + result.cesgThisYear)} of {fmt(RESP_2026.basicCesgLifetimeLimit)}
                </p>
                {/* Progress bar */}
                <div
                  role="img"
                  aria-label={`${Math.round(cesgPct)}% of lifetime CESG received`}
                  className="mt-1.5 h-1.5 w-32 rounded-full bg-neutral-200 dark:bg-neutral-700"
                >
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: `${cesgPct}%` }}
                  />
                </div>
              </div>
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Eligible years remaining
                </p>
                <p className="tabular-nums text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {result.yearsOfEligibilityRemaining}
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Projected total CESG
                </p>
                <p className="tabular-nums text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {fmt(result.projectedTotalCesg)}
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Contribution room remaining
                </p>
                <p className="tabular-nums text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {fmt(result.lifetimeContributionRemaining)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
