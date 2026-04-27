import type { Metadata } from 'next';
import SubPageTemplate from '@/components/SubPageTemplate';
import FHSARoomCalculator from '@/components/FHSARoomCalculator';

export const metadata: Metadata = {
  title: 'FHSA contribution limit and rules 2026 | MapleTax Calculator',
  description:
    '2026 FHSA limit is $8,000/year, $40,000 lifetime. Tax-deductible like RRSP, tax-free withdrawals like TFSA when used for a qualifying first home.',
  alternates: {
    canonical: 'https://mapletaxcalculator.ca/tax-planning-2026/fhsa',
    languages: {
      en: 'https://mapletaxcalculator.ca/tax-planning-2026/fhsa',
      fr: 'https://mapletaxcalculator.ca/fr/tax-planning-2026/fhsa',
    },
  },
  openGraph: {
    title: 'FHSA contribution limit and rules 2026 | MapleTax Calculator',
    description:
      '2026 FHSA: $8,000/year, $40,000 lifetime. Deductible like RRSP, tax-free withdrawals like TFSA.',
    url: 'https://mapletaxcalculator.ca/tax-planning-2026/fhsa',
  },
};

const TOC = [
  { id: 'fhsa-limit', label: '2026 limit and lifetime cap' },
  { id: 'eligibility', label: 'Eligibility (first-time buyer)' },
  { id: 'carry-forward', label: 'How carry-forward works' },
  { id: 'fhsa-hbp-stack', label: 'Stacking with RRSP HBP' },
  { id: 'if-no-purchase', label: "If you don't buy" },
  { id: 'fifteen-year-clock', label: 'The 15-year clock' },
];

const COMMON_MISTAKES = [
  {
    title: 'Contributing without claiming the deduction',
    body: "The FHSA deduction is the entire tax advantage on the way in — it reduces your taxable income just like an RRSP contribution. If you contribute but forget to claim the deduction on your T1, you've lost the refund for that year. The deduction can be carried forward (similar to RRSP), but you have to actively claim it each year you want the benefit.",
  },
  {
    title: 'Opening too late in the year and missing a year of room',
    body: 'You get $8,000 of FHSA participation room for the calendar year in which you open your account — even if you open it on December 31. Opening in late 2026 gives you 2026 room immediately. Waiting until January 2027 means you never recover 2026\'s $8,000. Open early.',
  },
  {
    title: "Not stacking with the HBP when both apply",
    body: "Many first-time buyers use one or the other, not both. An FHSA withdrawal is completely independent of the RRSP Home Buyers' Plan. If you have both, you can use the FHSA for up to $40,000 (no repayment) plus the HBP for up to $60,000 (repayable over 15 years) — a combined $100,000 for a single buyer.",
  },
];

const QUICK_WINS = [
  {
    title: 'Open one even if you\'re not sure you\'ll buy',
    body: "Opening an FHSA starts the carry-forward clock and the 15-year participation period. You don't have to contribute the day you open it. If you never end up buying, you can transfer the balance to your RRSP or RRIF without penalty and without using RRSP contribution room — so there's no downside to opening early.",
  },
  {
    title: 'Stack with the RRSP HBP for up to $100,000',
    body: "An FHSA and an RRSP Home Buyers' Plan withdrawal can both be used toward the same qualifying first home purchase. The FHSA gives you $40,000 of tax-deductible, tax-free-withdrawal savings. The HBP gives you up to $60,000 more from your RRSP (repayable over 15 years). Together: $100,000 for an individual, $200,000 for a couple.",
  },
  {
    title: "If you don't buy, transfer to RRSP — no penalty, no room impact",
    body: "If your plans change and you don't purchase a qualifying home within the participation period, your FHSA balance can be transferred directly to your RRSP or RRIF. This transfer does not use any of your RRSP contribution room. The deductions you claimed on the way in are preserved, and the funds continue to grow tax-deferred.",
  },
];

const FAQS = [
  {
    id: 'fhsa-2026-limit',
    question: 'What is the FHSA limit for 2026?',
    answer:
      'The 2026 FHSA annual contribution limit is $8,000. The lifetime limit across all your FHSAs is $40,000. In any year, you can contribute up to $8,000 of new room plus up to $8,000 of unused carry-forward from the prior year — a maximum of $16,000 in a single year.',
  },
  {
    id: 'fhsa-hbp-stack',
    question: 'Can I use FHSA and the RRSP Home Buyers Plan together?',
    answer:
      "Yes. An FHSA qualifying withdrawal and an RRSP Home Buyers' Plan withdrawal are independent. For the same qualifying home purchase you can withdraw your full FHSA balance (up to the $40,000 lifetime limit, tax-free, no repayment required) and also withdraw up to $60,000 via the RRSP HBP (repayable over 15 years). A couple can stack all four sources: $200,000 total.",
  },
  {
    id: 'fhsa-no-purchase',
    question: "What happens if I don't buy a home?",
    answer:
      "If you don't make a qualifying first-home purchase by the end of your FHSA participation period, you must close the account. The balance can be transferred tax-free to your RRSP or RRIF — and this transfer does not count against your RRSP contribution room. Alternatively, you can take a cash withdrawal, but that amount will be fully included in your income for that year.",
  },
  {
    id: 'fhsa-carry-forward',
    question: 'How does carry-forward work?',
    answer:
      'If you contribute less than $8,000 in a year, the unused portion — up to $8,000 — carries forward to the following year. This means in your best year you can contribute up to $16,000 ($8,000 new room + $8,000 carried from prior year). The carry-forward only applies from year to year; it does not accumulate over multiple years.',
  },
  {
    id: 'fhsa-first-time',
    question: 'Am I a first-time home buyer if I owned a home 5 years ago?',
    answer:
      'It depends on how recently you stopped using it as your principal residence. The CRA defines "first-time home buyer" for FHSA purposes as not having owned a home you lived in as your principal residence during the current calendar year or any of the 4 prior calendar years. If you last lived in your own home in 2020 or earlier and have not owned since, you likely qualify in 2026.',
  },
];

const INTRO = `The First Home Savings Account (FHSA) combines the best features of an RRSP and a TFSA specifically for first-time home buyers. Contributions are tax-deductible like an RRSP, reducing your taxable income in the year you contribute. Qualifying withdrawals for a first home are completely tax-free — like a TFSA. The 2026 annual limit is $8,000, and the lifetime limit is $40,000.

The FHSA was launched in 2023 and has quickly become one of the most valuable accounts available to prospective homeowners. If you qualify as a first-time buyer and don't yet own a home, opening an FHSA as soon as possible starts the clock on both the 15-year participation window and the annual carry-forward room.`;

export default function FHSAPage() {
  return (
    <SubPageTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Tax Planning 2026', href: '/tax-planning-2026' },
        { label: 'FHSA', href: '/tax-planning-2026/fhsa' },
      ]}
      h1="FHSA: First Home Savings Account in 2026"
      intro={INTRO}
      tableOfContents={TOC}
      miniTool={<FHSARoomCalculator />}
      commonMistakes={COMMON_MISTAKES}
      quickWins={QUICK_WINS}
      relatedSubPages={[
        {
          title: 'RRSP',
          description: 'RRSP HBP — up to $60,000 for your first home',
          href: '/tax-planning-2026/rrsp',
        },
        {
          title: 'TFSA',
          description: 'Tax-free savings room and strategy for 2026',
          href: '/tax-planning-2026/tfsa',
        },
        {
          title: 'Life Events',
          description: 'First home, marriage, and other milestone tax moves',
          href: '/tax-planning-2026/life-events',
        },
      ]}
      faqs={FAQS}
      pageMetadata={{
        title: 'FHSA contribution limit and rules 2026 | MapleTax Calculator',
        description:
          '2026 FHSA limit is $8,000/year, $40,000 lifetime. Tax-deductible like RRSP, tax-free withdrawals like TFSA when used for a qualifying first home.',
        canonical: 'https://mapletaxcalculator.ca/tax-planning-2026/fhsa',
      }}
    >
      {/* Limit and cap */}
      <section id="fhsa-limit" aria-labelledby="section-fhsa-limit">
        <h2
          id="section-fhsa-limit"
          className="text-xl font-medium text-neutral-900 dark:text-neutral-100"
        >
          2026 FHSA contribution limit and lifetime cap
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm">
          <p>
            Each calendar year that your FHSA is open, you receive{' '}
            <span className="tabular-nums font-medium">$8,000</span> of new participation room.
            The lifetime ceiling across all your FHSAs is{' '}
            <span className="tabular-nums font-medium">$40,000</span>. In any single year you
            can contribute up to $8,000 of new room plus up to $8,000 of unused carry-forward
            from the prior year — giving a maximum of{' '}
            <span className="tabular-nums font-medium">$16,000</span> in one year.
          </p>
          <p>
            Contributions to an FHSA are deductible from your income, similar to RRSP
            contributions. The deduction reduces your net income, which in turn reduces income
            tax, OAS clawback exposure, and some income-tested benefit calculations. If you
            don't claim the deduction in the year of contribution, you can carry it forward to a
            future year when your marginal rate is higher.
          </p>
          <p>
            Withdrawals are entirely tax-free when used for a qualifying first-home purchase.
            Non-qualifying withdrawals are fully included in income for that year. Income earned
            inside an FHSA — interest, dividends, capital gains — accumulates tax-free while the
            account is open.
          </p>
        </div>
      </section>

      {/* Eligibility */}
      <section id="eligibility" aria-labelledby="section-eligibility">
        <h2
          id="section-eligibility"
          className="text-xl font-medium text-neutral-900 dark:text-neutral-100"
        >
          Eligibility: first-time home buyer definition
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm">
          <p>
            To open an FHSA you must be a Canadian resident, at least 18 years old, and a
            "first-time home buyer" as defined by the CRA. That definition requires that you
            have not owned a home that you lived in as your principal residence at any time
            during the current calendar year or the four prior calendar years.
          </p>
          <p>
            Practically: if you last owned and lived in a home in 2020, you can open an FHSA
            in 2026 because five full calendar years have passed since 2021 (the year after last
            ownership). If you sold your home in 2022 and have been renting since, you would
            not yet qualify in 2026 — you would need to wait until 2027. The calculation resets
            on January 1 of each year.
          </p>
          <p>
            Spouses and common-law partners each qualify independently, based on their own
            ownership history. It is possible for one partner to qualify when the other does not.
          </p>
        </div>
      </section>

      {/* Carry-forward */}
      <section id="carry-forward" aria-labelledby="section-carry-forward">
        <h2
          id="section-carry-forward"
          className="text-xl font-medium text-neutral-900 dark:text-neutral-100"
        >
          How carry-forward works
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm">
          <p>
            If you contribute less than $8,000 in a given year, the unused portion — up to
            $8,000 — carries forward to the following year. This carry-forward applies to the
            IMMEDIATELY prior year only; it does not accumulate over multiple years of non-use.
            In any year, you can contribute at most $8,000 of new room plus $8,000 of carry-
            forward from the prior year, for a maximum of{' '}
            <span className="tabular-nums font-medium">$16,000</span>.
          </p>
          <p>
            Example: You open an FHSA in 2024 and contribute $5,000 in 2024. Your carry-forward
            to 2025 is $3,000. If you contribute nothing in 2025, your 2026 room is $8,000 (new)
            plus carry-forward from 2025. The carry-forward only applies one year at a time —
            if you skip 2025 contributions, you do not stack 2024 and 2025 unused room into 2026.
          </p>
          <p>
            The best way to use the carry-forward strategically: open your account as early as
            possible even if you cannot fund it immediately, then in a high-income year make a
            double contribution using both the new annual room and the carry-forward.
          </p>
        </div>
      </section>

      {/* HBP stack */}
      <section id="fhsa-hbp-stack" aria-labelledby="section-fhsa-hbp-stack">
        <h2
          id="section-fhsa-hbp-stack"
          className="text-xl font-medium text-neutral-900 dark:text-neutral-100"
        >
          Stacking with the RRSP Home Buyers&apos; Plan
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm">
          <p>
            An FHSA qualifying withdrawal and an RRSP Home Buyers&apos; Plan withdrawal are two
            separate programs that can be used simultaneously for the same qualifying first-home
            purchase. Together, a single buyer can access:
          </p>
          <ul className="ml-4 space-y-1 list-disc text-neutral-600 dark:text-neutral-400">
            <li>
              Up to <span className="tabular-nums font-medium">$40,000</span> from an FHSA
              (tax-free, no repayment required, contributions were deductible)
            </li>
            <li>
              Up to <span className="tabular-nums font-medium">$60,000</span> from an RRSP
              via the HBP (tax-free at withdrawal, repayable over 15 years)
            </li>
          </ul>
          <p>
            Combined ceiling for a single buyer:{' '}
            <span className="tabular-nums font-medium">$100,000</span>. For a couple where both
            partners qualify: $200,000. This makes the FHSA and HBP stack the most powerful
            registered-account combination available for first-time home buyers in Canada.
          </p>
          <p>
            To maximize this stack: open an FHSA as early as possible and contribute up to the
            annual limit each year (deducting for maximum refund), while building RRSP savings
            in parallel. When ready to buy, use FHSA first (no repayment obligation), then
            supplement with HBP.
          </p>
        </div>
      </section>

      {/* If no purchase */}
      <section id="if-no-purchase" aria-labelledby="section-if-no-purchase">
        <h2
          id="section-if-no-purchase"
          className="text-xl font-medium text-neutral-900 dark:text-neutral-100"
        >
          What happens if you don&apos;t buy
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm">
          <p>
            If you do not make a qualifying home purchase before the end of your participation
            period, you have two options. You can transfer the FHSA balance directly to your RRSP
            or RRIF — this transfer is tax-free and does not count against your RRSP contribution
            room. Alternatively, you can take a taxable withdrawal, in which case the full amount
            is included in your income for that year.
          </p>
          <p>
            The RRSP transfer option means there is effectively no downside to opening an FHSA.
            If your plans change, the funds continue compounding inside a registered account —
            just in an RRSP rather than an FHSA. You keep all the deductions you claimed when
            you contributed to the FHSA, and you only pay tax when you eventually withdraw from
            the RRSP in retirement.
          </p>
        </div>
      </section>

      {/* 15-year clock */}
      <section id="fifteen-year-clock" aria-labelledby="section-fifteen-year-clock">
        <h2
          id="section-fifteen-year-clock"
          className="text-xl font-medium text-neutral-900 dark:text-neutral-100"
        >
          The 15-year clock
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm">
          <p>
            Your FHSA participation period runs for 15 years from the year the account was
            opened, or until December 31 of the year you turn 71, whichever comes first.
            At the end of the participation period, you must close all FHSAs. At that point,
            any balance is either transferred to an RRSP or RRIF (tax-deferred) or withdrawn
            as taxable income.
          </p>
          <p>
            The 15-year limit is a reason to open early. Someone who opens in 2026 has until
            2040 to use the account. Someone who waits until 2031 only has until 2045 — the
            same calendar year limit minus 5 years of room that was never accumulated. Opening
            early also gives you more annual contribution slots and more carry-forward
            opportunities.
          </p>
        </div>
      </section>
    </SubPageTemplate>
  );
}
