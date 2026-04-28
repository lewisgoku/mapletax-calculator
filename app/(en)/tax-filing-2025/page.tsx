import type { Metadata } from 'next';
import FAQAccordion from '@/components/FAQAccordion';
import FAQSchema from '@/components/FAQSchema';
import DeadlineStatusBanner from '@/components/DeadlineStatusBanner';
import LatePenaltyCalculator from '@/components/LatePenaltyCalculator';
import { getFAQs } from '@/lib/content/faqs';

const BASE = 'https://mapletaxcalculator.ca';

export const metadata: Metadata = {
  title: 'File your 2025 Canadian tax return | MapleTax Calculator',
  description:
    'Everything you need to file your 2025 T1 return: deadline, slips checklist, free NETFILE software, credits, and what to do if you\'re late or can\'t pay.',
  alternates: {
    canonical: `${BASE}/tax-filing-2025`,
    languages: {
      en: `${BASE}/tax-filing-2025`,
      fr: `${BASE}/fr/tax-filing-2025`,
      'x-default': `${BASE}/tax-filing-2025`,
    },
  },
  openGraph: {
    title: 'File your 2025 Canadian tax return | MapleTax Calculator',
    description:
      'Deadline, slips checklist, free NETFILE software, credits, and what to do if you\'re late or can\'t pay.',
    url: `${BASE}/tax-filing-2025`,
  },
};

const CARDS = [
  {
    title: 'Slips Checklist',
    description: 'Every slip you need before you start',
    keyNumber: '19 common slips',
    href: '/tax-filing-2025/slips-checklist',
  },
  {
    title: 'Free NETFILE Software',
    description: 'CRA-certified options that cost nothing',
    keyNumber: '5 free options',
    href: '/tax-filing-2025/free-software',
  },
  {
    title: '2025 Credits & Deductions',
    description: 'Commonly missed amounts for 2025',
    keyNumber: 'Save money',
    href: '/tax-filing-2025/credits-and-deductions',
  },
  {
    title: 'Life Events',
    description: 'What changed in 2025 affects your return',
    keyNumber: '8 checklists',
    href: '/tax-filing-2025/life-events',
  },
  {
    title: 'Amend a Return',
    description: 'Fix mistakes on a filed return',
    keyNumber: 'ReFILE or T1-ADJ',
    href: '/tax-filing-2025/amend-a-return',
  },
  {
    title: "Can't Pay?",
    description: 'File on time, arrange payments, avoid the worst',
    keyNumber: 'No penalty if $0 owing',
    href: '/tax-filing-2025/cant-pay',
  },
  {
    title: 'Filing Late?',
    description: 'Penalties, interest, and damage control',
    keyNumber: 'Deadline passed',
    href: '/tax-filing-2025/late-filing',
  },
];

const LANDING_FAQS = getFAQs([
  'tf25-deadline',
  'tf25-must-file',
  'tf25-late-penalty',
  'tf25-free-software',
  'tf25-cant-pay',
  'tf25-amend',
]);

export default function TaxFiling2025Page() {
  return (
    <main>
      {/* Deadline banner — full width, above everything */}
      <DeadlineStatusBanner />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-[1200px] px-6 pt-6 pb-2 text-sm text-neutral-500 dark:text-neutral-400"
      >
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <a href="/" className="hover:text-neutral-700 dark:hover:text-neutral-200">Home</a>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-neutral-900 dark:text-neutral-100">Tax Filing 2025</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-[1200px] px-6 pt-6 pb-4">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Filing your 2025 Canadian tax return
        </h1>
        <p className="mt-3 max-w-2xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Most Canadians must file by April 30, 2026. Self-employed filers have until June 15 — but any balance owing is always due April 30.
        </p>
      </section>

      {/* Penalty calculator */}
      <section className="mx-auto max-w-[1200px] px-6 pb-8">
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
            Estimate your late-filing penalty
          </h2>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            If you owe nothing, there is no penalty — just file.
          </p>
          <div className="mt-5">
            <LatePenaltyCalculator />
          </div>
        </div>
      </section>

      {/* Card grid */}
      <section className="mx-auto max-w-[1200px] px-6 pb-12" aria-labelledby="topics-heading">
        <h2
          id="topics-heading"
          className="mb-5 text-xl font-medium text-neutral-900 dark:text-neutral-100"
        >
          Filing guides
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card) => (
            <a
              key={card.href}
              href={card.href}
              className="group flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white px-5 py-5 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-600"
            >
              <div>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">{card.title}</p>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{card.description}</p>
                <p className="mt-3 tabular-nums text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {card.keyNumber}
                </p>
              </div>
              <svg
                className="mt-4 h-4 w-4 text-neutral-400 transition-transform group-hover:translate-x-0.5 dark:text-neutral-500"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[1200px] px-6 pb-12">
        <FAQSchema faqs={LANDING_FAQS} />
        <FAQAccordion faqs={LANDING_FAQS} title="Frequently asked questions" />
      </section>

      {/* Disclaimer */}
      <footer className="mx-auto max-w-[1200px] px-6 pb-10">
        <p className="text-xs text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800 pt-6">
          Estimates based on 2025 CRA-published rates. Your actual tax may differ based on additional deductions and
          credits. Not tax advice — consult a professional before making financial decisions.
        </p>
      </footer>
    </main>
  );
}
