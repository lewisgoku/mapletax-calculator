'use client';

import { useEffect, useMemo, useState } from 'react';
import { PROVINCE_CODES, PROVINCES_2026 } from '@/lib/rates/2026';
import { RATES_BY_YEAR } from '@/lib/rates';
import { calculateTax } from '@/lib/tax/calculate';

const RATES_2026 = RATES_BY_YEAR[2026];

const QUICK_PICKS = [40000, 60000, 80000, 100000, 150000, 200000];

function fmt(n: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(n);
}

function fmtPct(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}

function fmtBracket(lower: number, upper: number): string {
  if (lower === 0) return `First ${fmt(upper)}`;
  if (!isFinite(upper)) return `Over ${fmt(lower)}`;
  return `${fmt(lower)} to ${fmt(upper)}`;
}

interface CompareRow {
  label: string;
  getValue: (r: ReturnType<typeof calculateTax>) => number;
  higherBetter: boolean;
  bold?: boolean;
  topBorder?: boolean;
  isRate?: boolean;
}

const ROWS: CompareRow[] = [
  { label: 'Federal tax',       getValue: r => r.federalTaxAfterCredits,    higherBetter: false },
  { label: 'Provincial tax',    getValue: r => r.provincialTaxAfterCredits,  higherBetter: false },
  { label: 'CPP contributions', getValue: r => r.cppContributions,           higherBetter: false },
  { label: 'EI premiums',       getValue: r => r.eiPremiums,                 higherBetter: false },
  { label: 'Total tax',         getValue: r => r.totalTax,                   higherBetter: false, bold: true, topBorder: true },
  { label: 'Take-home pay',     getValue: r => r.netIncome,                  higherBetter: true,  bold: true },
  { label: 'Average tax rate',  getValue: r => r.averageTaxRate,             higherBetter: false, topBorder: true, isRate: true },
  { label: 'Marginal tax rate', getValue: r => r.combinedMarginalRate,       higherBetter: false, isRate: true },
  { label: 'Monthly take-home', getValue: r => r.takeHomeMonthly,            higherBetter: true,  topBorder: true },
  { label: 'Biweekly take-home',getValue: r => r.takeHomeBiweekly,           higherBetter: true },
];

export default function ProvinceCompare() {
  const [province1, setProvince1] = useState('BC');
  const [province2, setProvince2] = useState('ON');
  const [income, setIncome] = useState(80000);
  const [copied, setCopied] = useState(false);

  // Read URL params on mount only
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const compare = params.get('compare');
    const inc = params.get('income');
    if (compare) {
      const [a, b] = compare.split(',');
      if (a && PROVINCES_2026[a]) setProvince1(a);
      if (b && PROVINCES_2026[b]) setProvince2(b);
    }
    if (inc && !isNaN(Number(inc)) && Number(inc) >= 0) setIncome(Number(inc));
  }, []);

  // Write URL params on state change
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('compare', `${province1},${province2}`);
    params.set('income', String(income));
    window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
  }, [province1, province2, income]);

  const result1 = useMemo(
    () => calculateTax({ grossIncome: income, provinceCode: province1 }, RATES_2026),
    [income, province1],
  );
  const result2 = useMemo(
    () => calculateTax({ grossIncome: income, provinceCode: province2 }, RATES_2026),
    [income, province2],
  );

  const diff = result1.netIncome - result2.netIncome;
  const winner = Math.abs(diff) >= 1 ? (diff > 0 ? province1 : province2) : null;
  const winnerAmt = Math.abs(diff);
  const winnerName = winner ? PROVINCES_2026[winner].name : null;

  function handleCopy() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const prov1Data = PROVINCES_2026[province1];
  const prov2Data = PROVINCES_2026[province2];

  return (
    <div className="mx-auto max-w-5xl p-6 md:p-10">
      <header className="mb-8">
        <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
          Compare province taxes 2026
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Side-by-side income tax, CPP, EI, and take-home pay for any two Canadian provinces.
        </p>
      </header>

      {/* Controls */}
      <div className="mb-8 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950" data-print="hide">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium" htmlFor="province-a">
              Province A
            </label>
            <select
              id="province-a"
              value={province1}
              onChange={e => setProvince1(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-base outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900"
            >
              {PROVINCE_CODES.map(c => (
                <option key={c} value={c}>{PROVINCES_2026[c].name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium" htmlFor="province-b">
              Province B
            </label>
            <select
              id="province-b"
              value={province2}
              onChange={e => setProvince2(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-base outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900"
            >
              {PROVINCE_CODES.map(c => (
                <option key={c} value={c}>{PROVINCES_2026[c].name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium" htmlFor="compare-income">
              Annual income
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
              <input
                id="compare-income"
                type="number"
                min="0"
                step="5000"
                value={income || ''}
                onChange={e => setIncome(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-neutral-300 bg-white pl-7 pr-3 py-2 text-base outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900"
              />
            </div>
          </div>
        </div>

        {/* Quick-pick pills */}
        <div className="mt-4 flex flex-wrap gap-2" data-print="hide">
          {QUICK_PICKS.map(v => (
            <button
              key={v}
              onClick={() => setIncome(v)}
              className={[
                'rounded-full px-3 py-1 text-sm font-medium transition-colors',
                income === v
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                  : 'border border-neutral-300 text-neutral-600 hover:border-neutral-500 dark:border-neutral-700 dark:text-neutral-400',
              ].join(' ')}
            >
              {fmt(v)}
            </button>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleCopy}
            className="no-print shrink-0 rounded-lg border border-neutral-300 px-3 py-1.5 text-sm transition-colors hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-600"
            aria-label="Copy shareable link"
          >
            {copied ? 'Copied!' : 'Share link'}
          </button>
        </div>
      </div>

      {/* Winner callout */}
      {winner && (
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/30">
          <p className="text-sm leading-relaxed text-emerald-900 dark:text-emerald-200">
            At {fmt(income)}, <strong>{winnerName}</strong> keeps{' '}
            <strong>{fmt(winnerAmt)}</strong> more per year in take-home pay.
            That&apos;s <strong>{fmt(winnerAmt / 12)}</strong>/month or{' '}
            <strong>{fmt(winnerAmt / 26)}</strong>/biweekly.
            CPP and EI are identical — the difference is purely provincial tax.
          </p>
        </div>
      )}

      {/* Comparison table */}
      <div className="mb-10 overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800" data-print="compare-tool">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800">
              <th className="px-5 py-3 text-left font-medium text-neutral-500 w-1/3">Line item</th>
              <th className="px-5 py-3 text-right font-medium tabular-nums">{prov1Data.name}</th>
              <th className="px-5 py-3 text-right font-medium tabular-nums">{prov2Data.name}</th>
            </tr>
          </thead>
          <tbody>
            {/* Gross income — neutral */}
            <tr className="border-b border-neutral-100 dark:border-neutral-800/50">
              <td className="px-5 py-3 text-neutral-600 dark:text-neutral-400">Gross income</td>
              <td className="px-5 py-3 text-right tabular-nums">{fmt(income)}</td>
              <td className="px-5 py-3 text-right tabular-nums">{fmt(income)}</td>
            </tr>

            {ROWS.map(row => {
              const v1 = row.getValue(result1);
              const v2 = row.getValue(result2);
              const isCurrency = !row.isRate;
              const tie = isCurrency
                ? Math.abs(v1 - v2) < 0.5
                : Math.abs(v1 - v2) < 0.0001;
              const v1wins = !tie && (row.higherBetter ? v1 > v2 : v1 < v2);
              const v2wins = !tie && (row.higherBetter ? v2 > v1 : v2 < v1);

              const winClass = 'text-emerald-700 dark:text-emerald-400';

              return (
                <tr
                  key={row.label}
                  className={[
                    row.topBorder
                      ? 'border-t-2 border-neutral-200 dark:border-neutral-700'
                      : 'border-b border-neutral-100 dark:border-neutral-800/50',
                    row.bold ? 'font-semibold' : '',
                  ].join(' ')}
                >
                  <td className="px-5 py-3 text-neutral-600 dark:text-neutral-400">{row.label}</td>
                  <td className={`px-5 py-3 text-right tabular-nums ${v1wins ? winClass : ''}`}>
                    {row.isRate ? fmtPct(v1) : fmt(v1)}
                    {v1wins && <span className="ml-1 text-xs">✓</span>}
                  </td>
                  <td className={`px-5 py-3 text-right tabular-nums ${v2wins ? winClass : ''}`}>
                    {row.isRate ? fmtPct(v2) : fmt(v2)}
                    {v2wins && <span className="ml-1 text-xs">✓</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Province bracket tables */}
      <div className="grid gap-8 md:grid-cols-2">
        {([{ code: province1, data: prov1Data }, { code: province2, data: prov2Data }] as const).map(({ code, data }) => (
          <div key={code} className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
            <h2 className="mb-1 text-base font-semibold">{data.name}</h2>
            <p className="mb-4 text-xs text-neutral-500">
              BPA: {fmt(data.basicPersonalAmount)}
            </p>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800">
                  <th className="pb-2 text-left font-medium text-neutral-500">Income range</th>
                  <th className="pb-2 text-right font-medium text-neutral-500">Rate</th>
                </tr>
              </thead>
              <tbody>
                {data.brackets.map((b, i) => {
                  const lower = i === 0 ? 0 : data.brackets[i - 1].upper;
                  return (
                    <tr key={i} className="border-b border-neutral-100 dark:border-neutral-800/50">
                      <td className="py-1.5 text-neutral-600 dark:text-neutral-400">
                        {fmtBracket(lower, b.upper)}
                      </td>
                      <td className="py-1.5 text-right tabular-nums">{fmtPct(b.rate)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <footer className="mt-10 text-xs text-neutral-500">
        <p>
          Estimates based on 2026 CRA-published rates. Base-case comparison — no RRSP, deductions, or self-employment income.
          Your actual tax may differ. Not tax advice — consult a professional before making financial decisions.
        </p>
      </footer>
    </div>
  );
}
