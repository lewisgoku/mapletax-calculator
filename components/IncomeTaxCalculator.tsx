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
import { useProvince } from '@/contexts/ProvinceContext';

const RATES_2026 = {
  federal: FEDERAL_2026,
  provinces: PROVINCES_2026,
  cpp: CPP_2026,
  ei: EI_2026,
};

const PROVINCE_GOV_LINKS: Record<string, { label: string; href: string }> = {
  BC: { label: 'BC Ministry of Finance — Personal Income Tax',          href: 'https://www2.gov.bc.ca/gov/content/taxes/income-taxes/personal' },
  AB: { label: 'Alberta — Personal Income Tax',                         href: 'https://www.alberta.ca/personal-income-tax' },
  ON: { label: 'Ontario — Tax Credits and Benefits',                    href: 'https://www.ontario.ca/page/ontario-tax-credits-and-benefits' },
  SK: { label: 'Saskatchewan — Personal Income Tax',                    href: 'https://www.saskatchewan.ca/business/taxes-licensing-and-reporting/personal-income-tax' },
  MB: { label: 'Manitoba Finance — Personal Income Tax',                href: 'https://www.gov.mb.ca/finance/taxation/taxes/personal.html' },
  QC: { label: 'Revenu Québec — Income Tax Return',                     href: 'https://www.revenuquebec.ca/en/citizens/income-tax-return/' },
  NB: { label: 'New Brunswick — Personal Income Tax',                   href: 'https://www2.gnb.ca/content/gnb/en/departments/finance/taxes/personal_income_tax.html' },
  NS: { label: 'Nova Scotia Finance — Personal Income Tax',             href: 'https://novascotia.ca/finance/en/home/taxation/tax101/personalincometax/default.aspx' },
  PE: { label: 'Prince Edward Island — Income Tax',                     href: 'https://www.princeedwardisland.ca/en/topic/income-tax' },
  NL: { label: 'Newfoundland and Labrador — Personal Income Tax',       href: 'https://www.gov.nl.ca/fin/tax-programs-incentives/personal/pit/' },
  YT: { label: 'Yukon — Income Tax for Individuals',                    href: 'https://yukon.ca/en/income-tax-individuals' },
  NT: { label: 'NWT Finance — Personal Income Tax',                     href: 'https://www.fin.gov.nt.ca/en/services/personal-income-tax' },
  NU: { label: 'Nunavut Finance — Personal Income Tax',                 href: 'https://www.gov.nu.ca/finance/information/personal-income-tax' },
};

const PROVINCE_INFO: Record<string, readonly string[]> = {
  BC: [
    'Basic personal amount: $13,216 — income below this is sheltered from provincial tax.',
    'Five brackets from 5.6% to 20.5%. A low-income reduction reduces tax for earnings under ~$25,570.',
    'BC has no PST on most services; a 7% PST applies to goods.',
  ],
  AB: [
    'Basic personal amount: $22,323 — the highest BPA of any province, sheltering significantly more income.',
    'Flat 8% on the first $60,000, rising through five brackets to 15% at the top.',
    'Alberta has no provincial sales tax (PST), lowering overall cost of living relative to other provinces.',
  ],
  ON: [
    'Basic personal amount: $12,747.',
    'Five brackets from 5.05% to 13.16%. A surtax applies on provincial tax exceeding $5,554, effectively pushing top rates higher.',
    'Ontario also offers a low-income tax reduction and targeted benefit credits for families.',
  ],
  SK: [
    'Basic personal amount: $18,491.',
    'Three brackets: 10.5% on the first $54,064, 12.5% to $154,459, then 14.5% at the top.',
    'Saskatchewan levies its own 6% PST on goods and certain services.',
  ],
  MB: [
    'Basic personal amount: $15,969.',
    'Three brackets from 10.8% to 17.4%. Manitoba sits mid-range among Canadian provinces.',
    'The province harmonized its retail sales tax (7% RST) with most goods but not services.',
  ],
  QC: [
    'Basic personal amount: $18,571.',
    'Quebec administers its own tax system — residents file a separate return with Revenu Québec in addition to the CRA.',
    'Four brackets from 14% to 25.75%, giving Quebec the highest top combined marginal rate in Canada at ~58.75%.',
  ],
  NB: [
    'Basic personal amount: $13,396.',
    'Four brackets from 9.4% to 19.5%.',
    'New Brunswick uses a 15% HST (harmonized with the federal GST), applied to most goods and services.',
  ],
  NS: [
    'Basic personal amount: $11,744 — one of the lower BPAs in Canada, so provincial tax applies sooner.',
    'Five brackets from 8.79% to 21%; the top provincial rate is among the highest in Atlantic Canada.',
    'A 15% HST applies province-wide.',
  ],
  PE: [
    'Basic personal amount: $14,250.',
    'Five brackets from 9.5% to 19%. PEI is Canada\'s smallest province with its own distinct rate schedule.',
    'A 15% HST applies to most goods and services.',
  ],
  NL: [
    'Basic personal amount: $10,818 — the lowest in Canada, meaning provincial tax applies at a lower income threshold.',
    'Eight brackets from 8.7% to 21.8%. Newfoundland and Labrador has the highest top combined marginal rate in Canada at ~54.8%.',
    'A 15% HST applies province-wide.',
  ],
  YT: [
    'Basic personal amount: $16,452, matching the federal BPA.',
    'Five brackets from 6.4% to 15%. Yukon has some of the lowest territorial rates in Canada.',
    'No territorial sales tax; only the federal 5% GST applies.',
  ],
  NT: [
    'Basic personal amount: $17,842.',
    'Four brackets from 5.9% to 14.05%. The Northwest Territories offers competitive low territorial rates.',
    'No territorial sales tax; only the federal 5% GST applies.',
  ],
  NU: [
    'Basic personal amount: $19,297 — the highest BPA in Canada.',
    'Four brackets from 4% to 11.5%. Nunavut has the lowest top combined marginal rate in Canada at ~44.5%.',
    'No territorial sales tax; only the federal 5% GST applies.',
  ],
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
  /**
   * Pre-select a province code. When omitted, falls back to the value set in
   * ProvinceContext (e.g. via the nav dropdown), then 'BC'.
   */
  defaultProvince?: string;
  /** Pre-fill an income (used by programmatic /[province]/[income]/ pages) */
  defaultIncome?: number;
}

export default function IncomeTaxCalculator({
  defaultProvince,
  defaultIncome = 75000,
}: Props) {
  const { province: contextProvince } = useProvince();
  const [income, setIncome] = useState(defaultIncome);
  const [province, setProvince] = useState(defaultProvince ?? contextProvince ?? 'BC');
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
          <Field
            label="Province or territory"
            hint="Your provincial tax rate depends on this."
            highlighted
          >
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full rounded-lg border-2 border-maple-red bg-white px-3 py-2 text-base font-medium outline-none focus:ring-2 focus:ring-maple-red/20 dark:bg-neutral-900"
            >
              {PROVINCE_CODES.map((code) => (
                <option key={code} value={code}>
                  {PROVINCES_2026[code].name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Gross annual income">
            <CurrencyInput value={income} onChange={setIncome} />
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

          <div className="border-t border-neutral-200 dark:border-neutral-800" />

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-maple-red">
              {PROVINCES_2026[province].name}
            </p>
            <ul className="space-y-2">
              {PROVINCE_INFO[province].map((fact, i) => (
                <li key={i} className="flex gap-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                  <span className="mt-px shrink-0 text-maple-red" aria-hidden="true">—</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
            {PROVINCE_GOV_LINKS[province] && (
              <a
                href={PROVINCE_GOV_LINKS[province].href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-xs text-maple-red underline underline-offset-2 hover:opacity-70 transition-opacity"
              >
                {PROVINCE_GOV_LINKS[province].label}
                <svg className="h-3 w-3 shrink-0" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M3.5 2H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V8.5M7 1h4m0 0v4m0-4L5 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            )}
          </div>
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
  highlighted = false,
  children,
}: {
  label: string;
  hint?: string;
  highlighted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        highlighted
          ? '-mx-3 rounded-lg bg-[#fff0f0] px-3 py-2 dark:bg-maple-red/10'
          : ''
      }
    >
      <label
        className={`mb-1.5 block text-sm font-medium ${
          highlighted ? 'text-maple-red' : ''
        }`}
      >
        {label}
      </label>
      {children}
      {hint && (
        <p
          className={`mt-1.5 text-xs ${
            highlighted ? 'text-maple-red/70' : 'text-neutral-500'
          }`}
        >
          {hint}
        </p>
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
  const [view, setView] = useState<'bar' | 'donut'>('bar');

  if (grossIncome <= 0) return null;

  const segments = [
    { label: 'Take-home', value: result.netIncome,                    bg: 'bg-emerald-500', hex: '#10b981' },
    { label: 'Federal',   value: result.federalTaxAfterCredits,       bg: 'bg-blue-500',    hex: '#3b82f6' },
    { label: 'Provincial',value: result.provincialTaxAfterCredits,    bg: 'bg-indigo-500',  hex: '#6366f1' },
    { label: 'CPP',       value: result.cppContributions,             bg: 'bg-amber-500',   hex: '#f59e0b' },
    ...(result.eiPremiums > 0
      ? [{ label: 'EI',   value: result.eiPremiums,                   bg: 'bg-rose-500',    hex: '#f43f5e' }]
      : []),
  ];

  // Donut geometry
  const cx = 100, cy = 100, r = 70, sw = 38;
  const C = 2 * Math.PI * r;
  let acc = 0;
  const donutSegments = segments.map((s) => {
    const len = (s.value / grossIncome) * C;
    const out = { ...s, len, acc };
    acc += len;
    return out;
  });

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
      {/* Header + toggle */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-medium text-neutral-500">
          Where your money goes
        </h2>
        <div className="flex text-[10px]">
          {(['bar', 'donut'] as const).map((v, i) => (
            <button
              key={v}
              onClick={() => setView(v)}
              aria-pressed={view === v}
              className={[
                'px-2 py-1 font-bold uppercase tracking-tight border border-neutral-200 transition-colors dark:border-neutral-700',
                i > 0 ? '-ml-px' : '',
                view === v
                  ? 'bg-neutral-800 text-white dark:bg-white dark:text-neutral-900'
                  : 'bg-white text-neutral-500 hover:text-neutral-800 dark:bg-neutral-900 dark:text-neutral-400',
              ].join(' ')}
            >
              {v === 'bar' ? 'Bar' : 'Donut'}
            </button>
          ))}
        </div>
      </div>

      {/* Bar chart */}
      {view === 'bar' && (
        <div
          className="flex h-8 w-full overflow-hidden rounded-md"
          role="img"
          aria-label="Breakdown of gross income by destination"
        >
          {segments.map((s) => (
            <div
              key={s.label}
              className={s.bg}
              style={{ width: `${(s.value / grossIncome) * 100}%` }}
              title={`${s.label}: ${formatCurrency(s.value)}`}
            />
          ))}
        </div>
      )}

      {/* Donut chart */}
      {view === 'donut' && (
        <div className="flex justify-center py-1">
          <svg
            viewBox="0 0 200 200"
            className="w-44 h-44"
            role="img"
            aria-label="Donut chart breakdown of gross income by destination"
          >
            <g transform={`rotate(-90 ${cx} ${cy})`}>
              {donutSegments.map(({ label, hex, len, acc: segAcc }) => (
                <circle
                  key={label}
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke={hex}
                  strokeWidth={sw}
                  strokeDasharray={`${len} ${C - len}`}
                  strokeDashoffset={-segAcc}
                />
              ))}
            </g>
            {/* Centre: take-home % */}
            <text
              x={cx}
              y={cy - 7}
              textAnchor="middle"
              style={{ fontSize: 9, fontFamily: 'Inter, sans-serif', fill: '#737373' }}
            >
              Take-home
            </text>
            <text
              x={cx}
              y={cy + 10}
              textAnchor="middle"
              style={{ fontSize: 14, fontWeight: 600, fontFamily: 'Inter, sans-serif', fill: '#059669' }}
            >
              {formatPercent(result.netIncome / grossIncome, 0)}
            </text>
          </svg>
        </div>
      )}

      {/* Shared legend */}
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-sm ${s.bg}`} />
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
