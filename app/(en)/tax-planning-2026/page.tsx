import type { Metadata } from 'next';
import FAQAccordion from '@/components/FAQAccordion';
import FAQSchema from '@/components/FAQSchema';

export const metadata: Metadata = {
  title: 'Tax planning 2026 — registered accounts, credits, and strategies | MapleTax Calculator',
  description:
    'Plan your 2026 Canadian taxes. Compare RRSP, TFSA, and FHSA contribution strategies, claim missed credits, and time year-end moves to reduce tax owing.',
  alternates: {
    canonical: 'https://mapletaxcalculator.ca/tax-planning-2026',
    languages: {
      'en': 'https://mapletaxcalculator.ca/tax-planning-2026',
      'fr': 'https://mapletaxcalculator.ca/fr/tax-planning-2026',
      'x-default': 'https://mapletaxcalculator.ca/tax-planning-2026',
    },
  },
  openGraph: {
    title: 'Tax planning 2026 | MapleTax Calculator',
    description:
      'Plan your 2026 Canadian taxes. Compare RRSP, TFSA, and FHSA contribution strategies.',
    url: 'https://mapletaxcalculator.ca/tax-planning-2026',
  },
};

const ACTIVE_CARDS = [
  {
    title: 'RRSP',
    description: 'Contribution and deduction strategy',
    keyNumber: '$33,810 max',
    href: '/tax-planning-2026/rrsp',
  },
  {
    title: 'TFSA',
    description: 'Tax-free savings room',
    keyNumber: '$7,000 / year',
    href: '/tax-planning-2026/tfsa',
  },
  {
    title: 'FHSA',
    description: 'First Home Savings Account',
    keyNumber: '$8,000 / year',
    href: '/tax-planning-2026/fhsa',
  },
];

const NEWLY_ACTIVE_CARDS = [
  {
    title: 'RESP',
    description: 'Education savings + CESG matching',
    keyNumber: 'Up to $500/year in grants',
    href: '/tax-planning-2026/resp',
  },
  {
    title: 'Credits & Deductions',
    description: 'Medical, charitable, tuition, and more',
    keyNumber: '14% federal rate (new)',
    href: '/tax-planning-2026/credits-and-deductions',
  },
  {
    title: 'Life Events',
    description: 'Marriage, baby, home, retirement',
    keyNumber: '8 planning checklists',
    href: '/tax-planning-2026/life-events',
  },
  {
    title: 'Self-Employed',
    description: 'GST/HST, instalments, expenses',
    keyNumber: 'Double CPP + instalments',
    href: '/tax-planning-2026/self-employed',
  },
  {
    title: 'Year-End Checklist',
    description: 'Tax-loss selling and December moves',
    keyNumber: 'Dec 31 hard deadline',
    href: '/tax-planning-2026/year-end-checklist',
  },
  {
    title: 'Key Dates 2026',
    description: 'RRSP deadline, instalments, filing',
    keyNumber: 'All 2026 deadlines',
    href: '/tax-planning-2026/key-dates',
  },
];

const LANDING_FAQS = [
  {
    id: 'tp26-whats-new',
    question: 'What changed for 2026 Canadian taxes?',
    answer:
      'The most significant federal change is that the bottom marginal rate dropped from 15% to 14%, saving up to $580 for most taxpayers. The RRSP dollar limit rises to $33,810 (up from $32,490). CPP contributions continue under the two-tier system, with the second ceiling at $85,000. The TFSA annual limit remains $7,000 for the third consecutive year. BC paused inflation indexation on its brackets from 2027–2030.',
  },
  {
    id: 'tp26-tfsa-vs-rrsp',
    question: 'Should I prioritize TFSA or RRSP in 2026?',
    answer:
      'If your marginal rate is 26% or higher, the RRSP deduction is typically worth more — you get a refund now and the money grows tax-deferred. If your rate is low (under 26%), or you expect to be in a higher bracket in retirement, the TFSA often wins because withdrawals never count as income. Many Canadians benefit from contributing to both: RRSP for the immediate refund, TFSA for tax-free flexibility. The FHSA stacks with RRSP for first-time buyers.',
  },
  {
    id: 'tp26-rrsp-deadline',
    question: "What's the RRSP contribution deadline for the 2026 tax year?",
    answer:
      'Contributions made in the first 60 days of 2027 — on or before March 2, 2027 — can be applied to your 2026 tax return. Contributions made after that date count toward 2027. You can still contribute after the deadline; your room carries forward indefinitely, but the deduction applies to the year you claim it.',
  },
  {
    id: 'tp26-fhsa-eligible',
    question: 'Can I use both the FHSA and the RRSP Home Buyers Plan?',
    answer:
      "Yes. The FHSA ($8,000/year, $40,000 lifetime) and the RRSP Home Buyers' Plan ($60,000 withdrawal limit) can be stacked for the same qualifying home purchase. Combined, a single buyer can access up to $100,000 of registered savings tax-advantaged — $40,000 from an FHSA plus $60,000 via the HBP. Couples can double that to $200,000.",
  },
  {
    id: 'tp26-year-end',
    question: 'What year-end moves should I make before December 31?',
    answer:
      'Before December 31: make TFSA contributions to use this year\'s room (there is no 60-day grace period for TFSA); review tax-loss selling opportunities in non-registered accounts; make charitable donations if you want to claim them on 2026 return; top up FHSA if room remains. After January 1, 2027: the 60-day RRSP window opens — contributions made by March 2, 2027 apply to 2026 taxes.',
  },
  {
    id: 'tp26-cpp-changes',
    question: 'How does CPP2 affect my 2026 tax return?',
    answer:
      'CPP2 second-tier contributions (on earnings between $74,600 and $85,000) are deductible from income, not just a tax credit like CPP1 contributions. This means CPP2 reduces your taxable income dollar-for-dollar. Employees who earn above $74,600 can deduct the full CPP2 contribution on line 22215 of their T1 return.',
  },
];

export default function TaxPlanning2026Page() {
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
            Tax Planning 2026
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-[1200px] px-6 pt-6 pb-4">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Plan your 2026 Canadian taxes
        </h1>
        <p className="mt-3 max-w-2xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Registered accounts, credits, and timing strategies to reduce your 2026 tax owing.
          Maximize RRSP, TFSA, and FHSA room before the deadlines.
        </p>
      </section>

      {/* What's new callout */}
      <section className="mx-auto max-w-[1200px] px-6 pb-6">
        <div className="rounded-2xl border-2 border-[#C41E3A] bg-[#C41E3A]/5 px-6 py-5 dark:bg-[#C41E3A]/10">
          <p className="text-xs font-bold uppercase tracking-widest text-[#C41E3A]">
            What&apos;s new in 2026
          </p>
          <div className="mt-3 flex flex-wrap gap-4">
            <div className="min-w-0">
              <p className="tabular-nums text-2xl font-bold text-neutral-900 dark:text-neutral-100">14%</p>
              <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">Federal bottom rate (was 15%)</p>
            </div>
            <div className="w-px self-stretch bg-neutral-300 dark:bg-neutral-700" aria-hidden="true" />
            <div className="min-w-0">
              <p className="tabular-nums text-2xl font-bold text-neutral-900 dark:text-neutral-100">$33,810</p>
              <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">RRSP dollar limit</p>
            </div>
            <div className="w-px self-stretch bg-neutral-300 dark:bg-neutral-700" aria-hidden="true" />
            <div className="min-w-0">
              <p className="tabular-nums text-2xl font-bold text-neutral-900 dark:text-neutral-100">$7,000</p>
              <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">TFSA annual limit</p>
            </div>
            <div className="w-px self-stretch bg-neutral-300 dark:bg-neutral-700" aria-hidden="true" />
            <div className="min-w-0">
              <p className="tabular-nums text-2xl font-bold text-neutral-900 dark:text-neutral-100">$85,000</p>
              <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">CPP2 second ceiling</p>
            </div>
          </div>
          <p className="mt-4 text-xs">
            <a
              href="/whats-new-2026"
              className="font-medium text-[#C41E3A] underline underline-offset-2 hover:opacity-75"
            >
              See all 2026 changes
            </a>
          </p>
        </div>
      </section>

      {/* Card grid */}
      <section className="mx-auto max-w-[1200px] px-6 pb-12" aria-labelledby="topics-heading">
        <h2
          id="topics-heading"
          className="mb-5 text-xl font-medium text-neutral-900 dark:text-neutral-100"
        >
          Topics
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Active cards */}
          {ACTIVE_CARDS.map((card) => (
            <a
              key={card.href}
              href={card.href}
              className="group flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white px-5 py-5 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-600"
            >
              <div>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {card.title}
                </p>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {card.description}
                </p>
                <p className="mt-3 tabular-nums text-lg font-medium text-neutral-900 dark:text-neutral-100">
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

          {/* Newly active cards */}
          {NEWLY_ACTIVE_CARDS.map((card) => (
            <a
              key={card.href}
              href={card.href}
              className="group flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white px-5 py-5 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-600"
            >
              <div>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {card.title}
                </p>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {card.description}
                </p>
                <p className="mt-3 tabular-nums text-lg font-medium text-neutral-900 dark:text-neutral-100">
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
          Estimates based on 2026 CRA-published rates. Your actual tax may differ based on
          additional deductions and credits. Not tax advice — consult a professional before
          making financial decisions.
        </p>
      </footer>
    </main>
  );
}
