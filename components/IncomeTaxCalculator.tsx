'use client';

import { useMemo, useState } from 'react';
import {
  FEDERAL_2026,
  PROVINCES_2026,
  CPP_2026,
  EI_2026,
  PROVINCE_CODES,
} from '@/lib/rates/2026';
import { calculateTax } from '@/lib/tax/calculate';

const RATES_2026 = {
  federal: FEDERAL_2026,
  provinces: PROVINCES_2026,
  cpp: CPP_2026,
  ei: EI_2026,
};

function formatCurrency(n: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(n);
}

function formatPercent(n: number, digits = 1): string {
  return `${(n * 100).toFixed(digits)}%`;
}

interface Props {
  /** Pre-select a province (used by programmatic /[province]/ pages) */
  defaultProvince?: string;
  /** Pre-fill an income (used by programmatic /[province]/[income]/ pages) */
  defaultIncome?: number;
}

export default function IncomeTaxCalculator({
  defaultProvince = 'BC',
  defaultIncome = 75000,
}: Props) {
  const [income, setIncome] = useState(defaultIncome);
  const [province, setProvince] = useState(defaultProvince);
  const [rrsp, setRrsp] = useState(0);
  const [otherDeductions, setOtherDeductions] = useState(0);
  const [isSelfEmployed, setIsSelfEmployed] = useState(false);

  const result = useMemo(
    () =>
      calculateTax(
        {
          grossIncome: income,
          provinceCode: province,
          rrspContribution: rrsp,
          otherDeductions,
          isSelfEmployed,
        },
        RATES_2026
      ),
    [income, province, rrsp, otherDeductions, isSelfEmployed]
  );

  return (
    <div className="mx-auto max-w-5xl p-6 md:p-10">
      <header className="mb-8">
        <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
          Canadian income tax calculator 2026
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Federal and provincial tax, CPP, and EI. Live calculation as you
          type — no page refresh, no sign-up.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
        <section className="space-y-5 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <Field label="Gross annual income">
            <CurrencyInput value={income} onChange={setIncome} />
          </Field>

          <Field label="Province or territory">
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-base outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900"
            >
              {PROVINCE_CODES.map((code) => (
                <option key={code} value={code}>
                  {PROVINCES_2026[code].name}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="RRSP contribution"
            hint="Reduces your taxable income dollar-for-dollar."
          >
            <CurrencyInput value={rrsp} onChange={setRrsp} />
          </Field>

          <Field
            label="Other deductions"
            hint="Union dues, child care, home office, etc."
          >
            <CurrencyInput
              value={otherDeductions}
              onChange={setOtherDeductions}
            />
          </Field>

          <label className="flex cursor-pointer items-center gap-3 pt-2">
            <input
              type="checkbox"
              checked={isSelfEmployed}
              onChange={(e) => setIsSelfEmployed(e.target.checked)}
              className="h-4 w-4 rounded border-neutral-300"
            />
            <span className="text-sm">
              Self-employed{' '}
              <span className="text-neutral-500">(2× CPP, no EI)</span>
            </span>
          </label>
        </section>

        <section className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <Stat
              label="Take-home pay"
              value={formatCurrency(result.netIncome)}
              accent
            />
            <Stat
              label="Total tax"
              value={formatCurrency(result.totalTax)}
            />
            <Stat
              label="Average rate"
              value={formatPercent(result.averageTaxRate)}
            />
            <Stat
              label="Marginal rate"
              value={formatPercent(result.combinedMarginalRate)}
            />
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
            <h2 className="mb-4 text-sm font-medium text-neutral-500">
              Breakdown
            </h2>
            <dl className="space-y-2 text-sm">
              <Row
                label="Federal tax"
                value={result.federalTaxAfterCredits}
              />
              <Row
                label="Provincial tax"
                value={result.provincialTaxAfterCredits}
              />
              <Row label="CPP contributions" value={result.cppContributions}>
                {result.cpp2 > 0 && (
                  <span className="text-xs text-neutral-500">
                    {' '}
                    (incl. {formatCurrency(result.cpp2)} CPP2)
                  </span>
                )}
              </Row>
              {result.eiPremiums > 0 && (
                <Row label="EI premiums" value={result.eiPremiums} />
              )}
              <div className="border-t border-neutral-200 pt-2 dark:border-neutral-800">
                <Row label="Total deductions" value={result.totalTax} bold />
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
            <h2 className="mb-4 text-sm font-medium text-neutral-500">
              Take-home per period
            </h2>
            <dl className="grid grid-cols-3 gap-3 text-sm">
              <Period
                label="Monthly"
                value={result.takeHomeMonthly}
              />
              <Period
                label="Biweekly"
                value={result.takeHomeBiweekly}
              />
              <Period
                label="Weekly"
                value={result.netIncome / 52}
              />
            </dl>
          </div>

          <StackedBar result={result} grossIncome={income} />
        </section>
      </div>

      <footer className="mt-10 text-xs text-neutral-500">
        <p>
          Estimates based on 2026 CRA-published rates. Your actual tax may
          differ based on additional deductions and credits. Not tax advice —
          consult a professional before making financial decisions.
        </p>
      </footer>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
      {hint && (
        <p className="mt-1.5 text-xs text-neutral-500">{hint}</p>
      )}
    </div>
  );
}

function CurrencyInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
        $
      </span>
      <input
        type="number"
        min="0"
        step="500"
        value={value || ''}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="w-full rounded-lg border border-neutral-300 bg-white pl-7 pr-3 py-2 text-base outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900"
      />
    </div>
  );
}

function Stat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        accent
          ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30'
          : 'border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950'
      }`}
    >
      <div className="text-xs text-neutral-500">{label}</div>
      <div
        className={`mt-1 text-2xl font-medium tabular-nums ${
          accent ? 'text-emerald-900 dark:text-emerald-200' : ''
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  bold = false,
  children,
}: {
  label: string;
  value: number;
  bold?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`flex items-baseline justify-between ${
        bold ? 'font-medium' : ''
      }`}
    >
      <dt className="text-neutral-600 dark:text-neutral-400">
        {label}
        {children}
      </dt>
      <dd className="tabular-nums">{formatCurrency(value)}</dd>
    </div>
  );
}

function Period({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="text-xs text-neutral-500">{label}</div>
      <div className="mt-1 text-lg font-medium tabular-nums">
        {formatCurrency(value)}
      </div>
    </div>
  );
}

function StackedBar({
  result,
  grossIncome,
}: {
  result: ReturnType<typeof calculateTax>;
  grossIncome: number;
}) {
  if (grossIncome <= 0) return null;

  const segments = [
    {
      label: 'Take-home',
      value: result.netIncome,
      color: 'bg-emerald-500',
    },
    {
      label: 'Federal',
      value: result.federalTaxAfterCredits,
      color: 'bg-blue-500',
    },
    {
      label: 'Provincial',
      value: result.provincialTaxAfterCredits,
      color: 'bg-indigo-500',
    },
    {
      label: 'CPP',
      value: result.cppContributions,
      color: 'bg-amber-500',
    },
    ...(result.eiPremiums > 0
      ? [
          {
            label: 'EI',
            value: result.eiPremiums,
            color: 'bg-rose-500',
          },
        ]
      : []),
  ];

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
      <h2 className="mb-3 text-sm font-medium text-neutral-500">
        Where your money goes
      </h2>
      <div
        className="flex h-8 w-full overflow-hidden rounded-md"
        role="img"
        aria-label="Breakdown of gross income by destination"
      >
        {segments.map((s) => (
          <div
            key={s.label}
            className={s.color}
            style={{ width: `${(s.value / grossIncome) * 100}%` }}
            title={`${s.label}: ${formatCurrency(s.value)}`}
          />
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-sm ${s.color}`} />
            <span className="text-neutral-600 dark:text-neutral-400">
              {s.label}
            </span>
            <span className="tabular-nums">
              {formatPercent(s.value / grossIncome, 1)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
