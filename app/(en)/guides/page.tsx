import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Canadian tax guides 2025 & 2026',
  description:
    'Guides for filing your 2025 Canadian tax return and planning for 2026. Covers RRSP, TFSA, FHSA, credits, deadlines, and more.',
  alternates: {
    canonical: 'https://mapletaxcalculator.ca/guides',
    languages: {
      en: 'https://mapletaxcalculator.ca/guides',
      fr: 'https://mapletaxcalculator.ca/fr/guides',
      'x-default': 'https://mapletaxcalculator.ca/guides',
    },
  },
  openGraph: {
    title: 'Canadian tax guides 2025 & 2026',
    description:
      'Everything you need to file your 2025 return and plan your 2026 taxes — RRSP, TFSA, credits, deadlines, and calculators.',
    url: 'https://mapletaxcalculator.ca/guides',
  },
};

const FILING_CARDS = [
  {
    title: 'Deadlines & Penalties',
    description: 'Filing and payment deadlines, late-filing penalties explained',
    href: '/tax-filing-2025/deadlines-and-penalties',
  },
  {
    title: 'Late Filing',
    description: 'What happens if you miss April 30 — and what to do now',
    href: '/tax-filing-2025/late-filing',
  },
  {
    title: 'Credits & Deductions',
    description: 'Non-refundable credits, refundable credits, and deductions for 2025',
    href: '/tax-filing-2025/credits-and-deductions',
  },
  {
    title: 'Slips Checklist',
    description: 'T4, T5, T3, RRSP receipts — every slip you need before you file',
    href: '/tax-filing-2025/slips-checklist',
  },
  {
    title: 'Free Tax Software',
    description: 'CRA-certified NETFILE software, including free options',
    href: '/tax-filing-2025/free-software',
  },
  {
    title: 'Amend a Return',
    description: 'How to fix a mistake on a filed return using T1-ADJ or My Account',
    href: '/tax-filing-2025/amend-a-return',
  },
  {
    title: "Can't Pay Your Bill",
    description: 'Payment arrangements, relief options, and what not to do',
    href: '/tax-filing-2025/cant-pay',
  },
  {
    title: 'Life Events & Filing',
    description: 'Marriage, new baby, home purchase, death — how each changes your return',
    href: '/tax-filing-2025/life-events',
  },
];

const PLANNING_CARDS = [
  {
    title: 'RRSP',
    description: 'Contribution limits, deduction timing, Home Buyers Plan, and spousal RRSPs',
    href: '/tax-planning-2026/rrsp',
  },
  {
    title: 'TFSA',
    description: 'Annual room, lifetime room, and what counts as a contribution',
    href: '/tax-planning-2026/tfsa',
  },
  {
    title: 'FHSA',
    description: 'First Home Savings Account — $8,000/year toward your first home',
    href: '/tax-planning-2026/fhsa',
  },
  {
    title: 'RESP',
    description: 'Education savings with up to $500/year in government CESG grants',
    href: '/tax-planning-2026/resp',
  },
  {
    title: 'Credits & Deductions',
    description: 'Medical, charitable, childcare, tuition, and more for 2026',
    href: '/tax-planning-2026/credits-and-deductions',
  },
  {
    title: 'Life Events',
    description: 'Eight planning checklists for major life changes in 2026',
    href: '/tax-planning-2026/life-events',
  },
  {
    title: 'Self-Employed',
    description: 'GST/HST registration, quarterly instalments, and deductible expenses',
    href: '/tax-planning-2026/self-employed',
  },
  {
    title: 'Year-End Checklist',
    description: 'December 31 is the hard deadline for TFSA, tax-loss selling, and donations',
    href: '/tax-planning-2026/year-end-checklist',
  },
  {
    title: 'Key Dates 2026',
    description: 'RRSP deadline, instalment dates, filing deadline — all in one timeline',
    href: '/tax-planning-2026/key-dates',
  },
];

const CALCULATOR_CARDS = [
  {
    title: 'Income Tax Calculator 2026',
    description: 'Federal + provincial tax, CPP, EI, and take-home pay — all 13 provinces',
    href: '/income-tax-calculator',
  },
  {
    title: 'Compare Provinces',
    description: 'Side-by-side take-home pay comparison for any two provinces',
    href: '/income-tax-calculator/compare',
  },
  {
    title: 'Income Tax Calculator 2025',
    description: 'Same calculator using 2025 CRA rates for late filers and comparison',
    href: '/income-tax-calculator-2025',
  },
];

function ArrowIcon() {
  return (
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
  );
}

function CardGrid({ cards }: { cards: { title: string; description: string; href: string }[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <a
          key={card.href}
          href={card.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white px-5 py-5 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-600"
        >
          <div>
            <p className="font-semibold text-neutral-900 dark:text-neutral-100">{card.title}</p>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              {card.description}
            </p>
          </div>
          <ArrowIcon />
        </a>
      ))}
    </div>
  );
}

export default function GuidesPage() {
  return (
    <main>
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-[1200px] px-6 pt-6 pb-2 text-sm text-neutral-500 dark:text-neutral-400"
      >
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <a href="/" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-700 dark:hover:text-neutral-200">
              Home
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-neutral-900 dark:text-neutral-100">
            Guides
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-[1200px] px-6 pt-6 pb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Canadian tax guides
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-neutral-600 dark:text-neutral-400">
          Everything you need to navigate the Canadian tax system. From filing your 2025 return to
          planning your 2026 contributions.
        </p>
      </section>

      {/* Filing section */}
      <section className="mx-auto max-w-[1200px] px-6 pb-12" aria-labelledby="filing-heading">
        <h2
          id="filing-heading"
          className="mb-5 text-xl font-medium text-neutral-900 dark:text-neutral-100"
        >
          Filing your 2025 taxes
        </h2>
        <CardGrid cards={FILING_CARDS} />
      </section>

      {/* Planning section */}
      <section className="mx-auto max-w-[1200px] px-6 pb-12" aria-labelledby="planning-heading">
        <h2
          id="planning-heading"
          className="mb-5 text-xl font-medium text-neutral-900 dark:text-neutral-100"
        >
          Planning for 2026
        </h2>
        <CardGrid cards={PLANNING_CARDS} />
      </section>

      {/* Calculators section */}
      <section
        className="mx-auto max-w-[1200px] px-6 pb-16"
        aria-labelledby="calculators-heading"
      >
        <h2
          id="calculators-heading"
          className="mb-5 text-xl font-medium text-neutral-900 dark:text-neutral-100"
        >
          Calculators
        </h2>
        <CardGrid cards={CALCULATOR_CARDS} />
      </section>
    </main>
  );
}
