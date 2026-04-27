import type { Metadata } from 'next';
import SubPageTemplate from '@/components/SubPageTemplate';
import RRSPRoomCalculator from '@/components/RRSPRoomCalculator';

export const metadata: Metadata = {
  title: 'RRSP contribution limit and strategy 2026 | MapleTax Calculator',
  description:
    '2026 RRSP contribution limit is $33,810 or 18% of 2025 earned income. Calculate your room, plan deductions, and avoid penalties.',
  alternates: {
    canonical: 'https://mapletaxcalculator.ca/tax-planning-2026/rrsp',
    languages: {
      en: 'https://mapletaxcalculator.ca/tax-planning-2026/rrsp',
      fr: 'https://mapletaxcalculator.ca/fr/tax-planning-2026/rrsp',
    },
  },
  openGraph: {
    title: 'RRSP contribution limit and strategy 2026 | MapleTax Calculator',
    description:
      '2026 RRSP limit is $33,810. Calculate your room, plan deductions, and avoid the attribution trap.',
    url: 'https://mapletaxcalculator.ca/tax-planning-2026/rrsp',
  },
};

const TOC = [
  { id: 'contribution-limit', label: '2026 contribution limit' },
  { id: 'contribute-or-wait', label: 'Should you contribute or wait?' },
  { id: 'hbp', label: "Home Buyers' Plan" },
  { id: 'llp', label: 'Lifelong Learning Plan' },
  { id: 'spousal', label: 'Spousal RRSPs' },
  { id: 'rrif', label: 'RRSP-to-RRIF mechanics' },
  { id: 'pitfalls', label: 'Common pitfalls' },
];

const COMMON_MISTAKES = [
  {
    title: 'Maxing your RRSP in a low-income year',
    body: "Contributing your full room when your marginal rate is low — say 20% — means you get a 20-cent refund per dollar. If you wait until a high-income year at 33%, that same contribution generates a 33-cent refund. The contribution builds your carry-forward instead; claim the deduction when your rate is highest.",
  },
  {
    title: 'Forgetting the pension adjustment eats into room',
    body: 'If your employer runs a defined-benefit or defined-contribution pension plan, a pension adjustment (PA) appears in box 52 of your T4. It reduces your RRSP room dollar-for-dollar. Many employees with workplace pensions overestimate their available room by ignoring this.',
  },
  {
    title: 'Triggering the spousal attribution rule too early',
    body: 'Withdrawals from a spousal RRSP are attributed back to the contributing spouse — taxed in their hands — if made in the year of contribution or either of the two following calendar years. This is the 3-calendar-year rule. Plan withdrawals carefully to avoid the attribution.',
  },
];

const QUICK_WINS = [
  {
    title: 'Contribute now, deduct later',
    body: 'You can contribute to your RRSP at any time and defer claiming the deduction until a higher-income year. The room carries forward indefinitely. Contributing early starts tax-deferred compounding immediately, and you choose the best year to use the deduction.',
  },
  {
    title: "Use the HBP for your first home — $60,000 tax-free",
    body: "The Home Buyers' Plan lets you withdraw up to $60,000 from your RRSP tax-free for a qualifying first home purchase. You repay over 15 years at no interest. Stack it with an FHSA for up to $100,000 of registered savings for your first home.",
  },
  {
    title: 'Spousal RRSP for income splitting in retirement',
    body: 'If there is a meaningful income gap between you and your partner, contributing to a spousal RRSP shifts future retirement income to the lower-income spouse. This reduces the combined household tax bill when withdrawals are made — often decades later at a much lower marginal rate.',
  },
];

const FAQS = [
  {
    id: 'rrsp-2026-deadline',
    question: 'When is the RRSP contribution deadline for the 2026 tax year?',
    answer:
      'Contributions made on or before March 2, 2027 — 60 days after December 31, 2026 — can be deducted on your 2026 tax return. This is the "60-day rule." Contributions made after March 2, 2027 apply to the 2027 tax year.',
  },
  {
    id: 'rrsp-spousal-deduction',
    question: "Can I contribute to my spouse's RRSP and claim the deduction myself?",
    answer:
      "Yes. You can contribute to a spousal RRSP and claim the deduction on your own return — but only up to your own RRSP room. The contribution reduces your room, not your spouse's. The spousal RRSP is a separate account registered in your spouse's name; they own the funds and name the beneficiary.",
  },
  {
    id: 'rrsp-over-contribution',
    question: 'What happens if I over-contribute to my RRSP?',
    answer:
      'The CRA allows a cumulative $2,000 lifetime over-contribution buffer without penalty. Any excess above that buffer is taxed at 1% per month until withdrawn. If you discover an over-contribution, file form T1-OVP and withdraw the excess promptly to stop the penalty clock.',
  },
  {
    id: 'rrsp-cpp-ei',
    question: 'Do RRSP contributions affect my CPP or EI?',
    answer:
      'No. CPP and EI premiums are based on employment income before RRSP deductions. The RRSP deduction reduces your federal and provincial income tax but has no effect on CPP contributions or EI premiums.',
  },
  {
    id: 'rrsp-fhsa-hbp-stack',
    question: 'Can I use both the HBP and the FHSA for the same home purchase?',
    answer:
      "Yes. An FHSA withdrawal for a qualifying first home is completely separate from the RRSP Home Buyers' Plan. You can withdraw up to $40,000 from an FHSA (tax-free, no repayment required) plus up to $60,000 from your RRSP via the HBP (repayable over 15 years). Combined: $100,000 for a single buyer, $200,000 for a couple.",
  },
];

const INTRO = `An RRSP is a registered savings plan that lets you deduct contributions from your taxable income and let investments grow tax-deferred until withdrawal. For 2026, the RRSP dollar limit is $33,810 — the maximum new room any individual can earn in a single year. Your personal room is the lesser of that dollar limit and 18% of your prior year's earned income. Unused room carries forward indefinitely from prior years, and your Notice of Assessment each spring shows your exact current room.

The two decisions around an RRSP are distinct: how much to contribute (determined by room and cash flow) and when to claim the deduction (determined by your current and future marginal rates). You can contribute without deducting — or contribute now and deduct years later in a higher-income year. Getting both decisions right is what separates a good RRSP strategy from a routine one.`;

export default function RRSPPage() {
  return (
    <SubPageTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Tax Planning 2026', href: '/tax-planning-2026' },
        { label: 'RRSP', href: '/tax-planning-2026/rrsp' },
      ]}
      h1="RRSP contribution and deduction strategy for 2026"
      intro={INTRO}
      tableOfContents={TOC}
      miniTool={<RRSPRoomCalculator />}
      commonMistakes={COMMON_MISTAKES}
      quickWins={QUICK_WINS}
      relatedSubPages={[
        {
          title: 'TFSA',
          description: 'Tax-free savings room and strategy for 2026',
          href: '/tax-planning-2026/tfsa',
        },
        {
          title: 'FHSA',
          description: 'First Home Savings Account — stack with RRSP HBP',
          href: '/tax-planning-2026/fhsa',
        },
        {
          title: 'Self-Employed',
          description: 'GST/HST, instalments, and RRSP for self-employed',
          href: '/tax-planning-2026/self-employed',
        },
      ]}
      faqs={FAQS}
      pageMetadata={{
        title: 'RRSP contribution limit and strategy 2026 | MapleTax Calculator',
        description:
          '2026 RRSP contribution limit is $33,810 or 18% of 2025 earned income. Calculate your room, plan deductions, and avoid penalties.',
        canonical: 'https://mapletaxcalculator.ca/tax-planning-2026/rrsp',
      }}
    >
      {/* Contribution limit section */}
      <section id="contribution-limit" aria-labelledby="section-contribution-limit">
        <h2
          id="section-contribution-limit"
          className="text-xl font-medium text-neutral-900 dark:text-neutral-100"
        >
          2026 RRSP contribution limit
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm">
          <p>
            Your 2026 RRSP room is the lesser of two amounts: 18% of your 2025 earned income, or
            the dollar limit of{' '}
            <span className="tabular-nums font-medium">$33,810</span> — whichever is smaller.
            To earn the full dollar limit, your prior-year earned income must exceed{' '}
            <span className="tabular-nums">$187,833</span>. "Earned income" for RRSP purposes
            includes employment income, self-employment net income, and net rental income — it
            excludes investment income, pension income, and most other passive sources.
          </p>
          <p>
            If you have a workplace pension, your T4 will show a pension adjustment (PA) in
            box 52. The CRA subtracts this amount from your RRSP room dollar-for-dollar because
            your employer-sponsored plan is already providing registered retirement savings on
            your behalf. Members of rich defined-benefit plans can have very little RRSP room
            even on high incomes.
          </p>
          <p>
            Unused room from every prior year carries forward indefinitely — it never expires.
            Your exact available room appears on your most recent Notice of Assessment or in
            CRA My Account. The calculator above lets you estimate room if your NOA is not handy.
          </p>
          <p>
            The CRA also allows a{' '}
            <span className="tabular-nums font-medium">$2,000</span> lifetime over-contribution
            buffer. You can hold up to $2,000 over your room without penalty, but you cannot
            deduct the excess portion. Over-contributions above $2,000 are penalized at 1% per
            month on the excess.
          </p>
        </div>
      </section>

      {/* Contribute or wait section */}
      <section id="contribute-or-wait" aria-labelledby="section-contribute-or-wait">
        <h2
          id="section-contribute-or-wait"
          className="text-xl font-medium text-neutral-900 dark:text-neutral-100"
        >
          Should you contribute or wait?
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm">
          <p>
            The "contribute or wait" question comes in two forms. First: should you contribute
            now or hold cash and contribute closer to the March deadline? Contribute as early as
            possible — every month of tax-deferred growth compounds, and there is no benefit to
            waiting unless you expect to need the cash.
          </p>
          <p>
            Second: should you claim the deduction now or carry it forward to a higher-income
            year? This is where timing strategy matters most. If you're in a low marginal rate
            year — such as early career, parental leave, or a sabbatical — contributing still
            starts compounding inside the RRSP, but you can defer the deduction until a year
            when your marginal rate is higher. The refund will be larger per dollar deducted.
          </p>
          <p>
            Couples should consider income-splitting through a spousal RRSP: the higher-income
            partner contributes and deducts at their rate; the lower-income partner eventually
            withdraws at their lower rate. Over a 20–30 year horizon, the combined tax savings
            from income splitting in retirement can exceed those of two individual RRSPs of
            equal size.
          </p>
        </div>
      </section>

      {/* HBP section */}
      <section id="hbp" aria-labelledby="section-hbp">
        <h2
          id="section-hbp"
          className="text-xl font-medium text-neutral-900 dark:text-neutral-100"
        >
          Home Buyers&apos; Plan (HBP)
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm">
          <p>
            The Home Buyers&apos; Plan lets first-time home buyers withdraw up to{' '}
            <span className="tabular-nums font-medium">$60,000</span> from their RRSP
            tax-free. The limit was doubled from $35,000 in the 2024 federal budget and applies
            to qualifying agreements signed on or after April 16, 2024. For couples, each
            partner can use the HBP separately, giving a combined ceiling of $120,000.
          </p>
          <p>
            Repayment begins in the second calendar year after you make the withdrawal. You must
            repay at least one-fifteenth of the total each year for 15 years. Missed repayments
            are added to your income for that year and taxed at your marginal rate. Repayments
            do not restore RRSP room — they simply repay the borrowed amount.
          </p>
          <p>
            To qualify as a "first-time home buyer," you must not have owned a home that you
            used as your principal residence at any time during the current calendar year or the
            four prior calendar years. The CRA administers this via form T1036 at the time of
            withdrawal. The RRSP funds must have been held for at least 90 days before being
            withdrawn under the HBP.
          </p>
          <p>
            The HBP can be stacked with an FHSA. Together, a buyer can access up to{' '}
            <span className="tabular-nums">$100,000</span> of registered savings for a first
            home: $40,000 from the FHSA (no repayment required, contributions are deductible)
            plus $60,000 via the HBP (repayable over 15 years).
          </p>
        </div>
      </section>

      {/* LLP section */}
      <section id="llp" aria-labelledby="section-llp">
        <h2
          id="section-llp"
          className="text-xl font-medium text-neutral-900 dark:text-neutral-100"
        >
          Lifelong Learning Plan (LLP)
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm">
          <p>
            The Lifelong Learning Plan allows you to withdraw up to{' '}
            <span className="tabular-nums font-medium">$10,000</span> per calendar year, to a
            maximum of <span className="tabular-nums font-medium">$20,000</span> in total per
            participation period, from your RRSP to finance full-time education for yourself or
            your spouse. The withdrawals are tax-free at the time of withdrawal, provided you
            meet the repayment requirements.
          </p>
          <p>
            Repayment begins in the earlier of two events: the year after you complete your
            last year of qualifying education, or 5 years after the first LLP withdrawal.
            You have 10 years to repay the full amount, with at least 10% of the total due
            each year. Unpaid amounts are added to your income for the year they were due.
            Once your LLP balance reaches zero, you can participate again.
          </p>
        </div>
      </section>

      {/* Spousal section */}
      <section id="spousal" aria-labelledby="section-spousal">
        <h2
          id="section-spousal"
          className="text-xl font-medium text-neutral-900 dark:text-neutral-100"
        >
          Spousal RRSPs
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm">
          <p>
            A spousal RRSP is registered in the lower-income spouse's name but funded by
            contributions from the higher-income spouse, who claims the deduction. The strategy
            works because it shifts income from the higher-bracket spouse to the lower-bracket
            spouse at the time of eventual withdrawal — typically in retirement when both incomes
            are lower.
          </p>
          <p>
            The attribution rule applies for three calendar years. If the lower-income spouse
            withdraws from a spousal RRSP in the year of the contribution or either of the two
            following calendar years, the amount is attributed back to the contributing spouse
            and taxed in their hands. To cleanly avoid attribution, the last contribution to the
            spousal RRSP must be in a calendar year at least two full calendar years before the
            withdrawal year.
          </p>
          <p>
            Contributions to a spousal RRSP reduce your own room — not your spouse's. Both
            partners can hold individual RRSPs and spousal RRSPs simultaneously, as long as total
            contributions do not exceed the contributing spouse's available room.
          </p>
        </div>
      </section>

      {/* RRIF section */}
      <section id="rrif" aria-labelledby="section-rrif">
        <h2
          id="section-rrif"
          className="text-xl font-medium text-neutral-900 dark:text-neutral-100"
        >
          RRSP-to-RRIF mechanics
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm">
          <p>
            An RRSP must be converted to a Registered Retirement Income Fund (RRIF), an annuity,
            or a lump-sum withdrawal by December 31 of the year you turn 71. Failing to convert
            results in the CRA deeming the entire RRSP balance as income in that year — an
            enormous tax hit. Most Canadians convert to a RRIF, which mandates minimum annual
            withdrawals (as a percentage of the account balance) starting the following year.
          </p>
          <p>
            RRIF minimum withdrawals increase with age and are fully taxable as income. They
            count toward OAS clawback income thresholds, CPP, and income-tested benefit
            calculations. Strategic conversion before age 71 — such as collapsing part of an
            RRSP in a low-income year — can spread the tax liability more evenly across
            retirement years.
          </p>
        </div>
      </section>

      {/* Pitfalls section */}
      <section id="pitfalls" aria-labelledby="section-pitfalls">
        <h2
          id="section-pitfalls"
          className="text-xl font-medium text-neutral-900 dark:text-neutral-100"
        >
          Common pitfalls
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm">
          <p>
            Several common RRSP errors are hard to reverse. Holding foreign-currency assets in
            an RRSP is fine (the CRA allows it), but US-domiciled holdings benefit from the
            Canada-US tax treaty — US withholding on dividends is waived for RRSP accounts but
            not TFSA accounts. This makes an RRSP the preferred home for US equities generating
            dividends.
          </p>
          <p>
            Naming an estate instead of a spouse or dependent child as beneficiary on an RRSP
            delays the rollover and exposes the proceeds to probate. Naming your spouse directly
            allows the RRSP balance to roll into their RRSP on death, fully tax-deferred. Review
            beneficiary designations whenever your family situation changes.
          </p>
        </div>
      </section>
    </SubPageTemplate>
  );
}
