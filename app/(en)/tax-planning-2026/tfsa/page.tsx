import type { Metadata } from 'next';
import SubPageTemplate from '@/components/SubPageTemplate';
import TFSARoomCalculator from '@/components/TFSARoomCalculator';

export const metadata: Metadata = {
  title: 'TFSA contribution limit and room calculator 2026 | MapleTax Calculator',
  description:
    '2026 TFSA limit is $7,000. Cumulative limit is $109,000 for those eligible since 2009. Calculate your room and avoid over-contribution penalties.',
  alternates: {
    canonical: 'https://mapletaxcalculator.ca/tax-planning-2026/tfsa',
    languages: {
      en: 'https://mapletaxcalculator.ca/tax-planning-2026/tfsa',
      fr: 'https://mapletaxcalculator.ca/fr/tax-planning-2026/tfsa',
    },
  },
  openGraph: {
    title: 'TFSA contribution limit and room calculator 2026 | MapleTax Calculator',
    description:
      '2026 TFSA limit is $7,000. Cumulative $109,000. Calculate your room and avoid penalties.',
    url: 'https://mapletaxcalculator.ca/tax-planning-2026/tfsa',
  },
};

const TOC = [
  { id: 'tfsa-limit', label: '2026 contribution limit' },
  { id: 'room-calculation', label: 'How TFSA room is calculated' },
  { id: 'withdrawal-trap', label: 'The withdrawal-and-recontribution trap' },
  { id: 'what-to-hold', label: 'What to hold inside a TFSA' },
  { id: 'tfsa-vs-rrsp', label: 'TFSA vs. RRSP decision framework' },
];

const COMMON_MISTAKES = [
  {
    title: 'Recontributing a withdrawal in the same calendar year',
    body: 'If you withdraw $10,000 in July 2026 and put it back in October 2026, you have over-contributed by $10,000. Your withdrawal room does not return until January 1, 2027. The CRA charges 1% per month on the excess — on $10,000, that is $100 per month until you withdraw again.',
  },
  {
    title: 'Holding US dividend stocks in a TFSA instead of an RRSP',
    body: 'US dividends paid to a TFSA are subject to 15% US withholding tax under the Canada-US treaty — and that withholding is not recoverable. The same US stock held in an RRSP has its withholding waived entirely under the treaty. For meaningful US dividend positions, an RRSP is the superior account.',
  },
  {
    title: 'Defaulting to TFSA when a high marginal rate makes RRSP the better choice',
    body: 'A TFSA is ideal for low-income years or retirement when RRSP withdrawals would push income high. But if your current marginal rate is 30%+ and you have RRSP room, the RRSP deduction often generates a larger after-tax benefit. Do not treat the TFSA as a default without comparing marginal rates.',
  },
];

const QUICK_WINS = [
  {
    title: "Use last year's withdrawals plus the new $7,000 starting January 1",
    body: 'Every dollar you withdrew in 2025 returns as new room on January 1, 2026. Add $7,000 of new annual room on top, and your effective available room may be well above $7,000 — especially if you made large withdrawals last year.',
  },
  {
    title: 'In retirement, draw your TFSA last to avoid OAS clawback',
    body: 'TFSA withdrawals are tax-free and completely invisible to the OAS clawback calculation. Drawing RRIF and other taxable sources first — while leaving the TFSA intact — lets you control your net income in retirement and protect Old Age Security payments from the 15% recovery tax.',
  },
  {
    title: 'Hold high-growth or high-yield assets in your TFSA',
    body: 'The bigger the return inside a TFSA, the bigger the tax-free windfall. Bonds and GICs shelter interest that would otherwise be fully taxable. Growth-oriented equities turn capital gains (50% inclusion) into zero-inclusion tax-free gains. The TFSA is most powerful when its contents compound aggressively.',
  },
];

const FAQS = [
  {
    id: 'tfsa-2026-limit',
    question: 'What is the TFSA limit for 2026?',
    answer:
      'The annual TFSA contribution limit for 2026 is $7,000 — unchanged from 2024 and 2025. For someone who has been eligible since 2009 and has never contributed, the cumulative limit is $109,000.',
  },
  {
    id: 'tfsa-cumulative-room',
    question: "What's my cumulative TFSA room?",
    answer:
      'Your cumulative room depends on when you turned 18 and how much you have contributed and withdrawn over the years. Use the calculator above — enter your birth year, total contributions to date, and any 2025 withdrawals. The program sums up all annual limits from the year you turned 18 (or 2009, whichever is later) through 2026.',
  },
  {
    id: 'tfsa-withdrawal-recontribution',
    question: 'Can I withdraw from my TFSA and put it back later?',
    answer:
      'Yes, but not in the same calendar year. If you withdraw in 2026, your room returns on January 1, 2027. Recontributing the same year will put you over your limit and trigger the 1% per month penalty. The exception: if you had unused room before the withdrawal, you may be able to recontribute up to that unused amount in the same year.',
  },
  {
    id: 'tfsa-vs-rrsp',
    question: 'Should I prioritize TFSA or RRSP first?',
    answer:
      "It depends on your marginal tax rate now versus in retirement. If you're in a low bracket now (under 26%), the TFSA is usually the better immediate choice — you can always use RRSP room later when your rate is higher. If you're in a higher bracket today (26%+), the RRSP deduction generates a larger refund, making it worth prioritizing. Many Canadians benefit from using both.",
  },
  {
    id: 'tfsa-oas-gis',
    question: 'Do TFSA withdrawals affect my OAS or GIS?',
    answer:
      'No. TFSA withdrawals are completely excluded from the income calculations for Old Age Security, Guaranteed Income Supplement, and most other income-tested benefits. This makes the TFSA uniquely valuable in retirement — drawing from it does not trigger the OAS clawback (recovery tax) or reduce GIS.',
  },
];

const INTRO = `A Tax-Free Savings Account (TFSA) is a registered account where Canadians 18 and older can save and invest, and all growth — capital gains, dividends, interest — accumulates completely tax-free. The 2026 annual contribution limit is $7,000, unchanged for the third consecutive year. For someone who has been eligible since the TFSA program began in 2009, the cumulative limit through 2026 is $109,000.

Unlike an RRSP, TFSA contributions are not deductible — you contribute after-tax dollars. But withdrawals are completely tax-free and invisible to income-tested benefit calculations. That combination makes the TFSA uniquely flexible: it works for both short-term savings goals and long-term retirement income.`;

export default function TFSAPage() {
  return (
    <SubPageTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Tax Planning 2026', href: '/tax-planning-2026' },
        { label: 'TFSA', href: '/tax-planning-2026/tfsa' },
      ]}
      h1="TFSA contribution room and strategy for 2026"
      intro={INTRO}
      tableOfContents={TOC}
      miniTool={<TFSARoomCalculator />}
      commonMistakes={COMMON_MISTAKES}
      quickWins={QUICK_WINS}
      relatedSubPages={[
        {
          title: 'RRSP',
          description: 'Contribution and deduction strategy for 2026',
          href: '/tax-planning-2026/rrsp',
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
        title: 'TFSA contribution limit and room calculator 2026 | MapleTax Calculator',
        description:
          '2026 TFSA limit is $7,000. Cumulative limit is $109,000 for those eligible since 2009. Calculate your room and avoid over-contribution penalties.',
        canonical: 'https://mapletaxcalculator.ca/tax-planning-2026/tfsa',
      }}
    >
      {/* 2026 limit */}
      <section id="tfsa-limit" aria-labelledby="section-tfsa-limit">
        <h2
          id="section-tfsa-limit"
          className="text-xl font-medium text-neutral-900 dark:text-neutral-100"
        >
          2026 TFSA contribution limit
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm">
          <p>
            The 2026 TFSA annual limit is{' '}
            <span className="tabular-nums font-medium">$7,000</span> — the same as 2024 and
            2025. Cumulative limits since 2009 have been: $5,000 for 2009–2012, $5,500 for
            2013–2014, $10,000 for 2015, $5,500 for 2016–2018, $6,000 for 2019–2022,{' '}
            $6,500 for 2023, and $7,000 for 2024–2026. Sum to date:{' '}
            <span className="tabular-nums font-medium">$109,000</span> for anyone eligible
            since 2009 who has never contributed.
          </p>
          <p>
            New annual room is added on January 1 each year, not on your birthday. You can
            contribute to your TFSA on any day of the year. Any unused room carries forward
            indefinitely; there is no deadline for using prior-year room.
          </p>
        </div>
      </section>

      {/* Room calculation */}
      <section id="room-calculation" aria-labelledby="section-room-calculation">
        <h2
          id="section-room-calculation"
          className="text-xl font-medium text-neutral-900 dark:text-neutral-100"
        >
          How TFSA room is calculated
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm">
          <p>
            Your total available room equals your cumulative annual limits from your first
            eligible year through today, minus all contributions you have made, plus any
            withdrawals from prior calendar years. You must be a Canadian resident and 18 or
            older to accumulate room — room does not accumulate during years you are a
            non-resident or under 18.
          </p>
          <p>
            Someone born in 2008 becomes 18 in 2026 and receives their first $7,000 of TFSA
            room on January 1, 2026. Someone born in 1991 has been accumulating room since 2009
            and has the full $109,000 cumulative limit if they have never contributed. The
            calculator above handles any birth year — just enter your year and current
            contributions.
          </p>
          <p>
            The CRA tracks your TFSA room in real time. You can see your current available room
            by logging into CRA My Account or by calling the CRA directly. Note that issuers
            report contributions to the CRA with a delay, so the CRA's figure may lag by one
            tax year. When in doubt, track your own contributions.
          </p>
        </div>
      </section>

      {/* Withdrawal trap */}
      <section id="withdrawal-trap" aria-labelledby="section-withdrawal-trap">
        <h2
          id="section-withdrawal-trap"
          className="text-xl font-medium text-neutral-900 dark:text-neutral-100"
        >
          The withdrawal-and-recontribution trap
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm">
          <p>
            The most common and expensive TFSA mistake is recontributing a withdrawal in the
            same calendar year. The rule: TFSA withdrawal room does not return until January 1
            of the following calendar year. If you withdraw $20,000 in March and contribute
            $20,000 in November of the same year, you have over-contributed by $20,000 (assuming
            no other unused room). The CRA charges 1% per month on the excess until withdrawn.
          </p>
          <p>
            The fix is simple: track your room carefully. If you need to withdraw and recontribute,
            either wait until January 1 of the next year to recontribute, or ensure you have
            enough pre-existing unused room to absorb the same-year recontribution.
          </p>
        </div>
      </section>

      {/* What to hold */}
      <section id="what-to-hold" aria-labelledby="section-what-to-hold">
        <h2
          id="section-what-to-hold"
          className="text-xl font-medium text-neutral-900 dark:text-neutral-100"
        >
          What to hold inside a TFSA
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm">
          <p>
            The TFSA is most powerful when it contains assets that generate the most tax you want
            to shelter. Interest income is taxed at full marginal rates — holding GICs or bonds
            in a TFSA converts fully taxable interest into zero-tax income. High-dividend Canadian
            stocks benefit from the dividend tax credit outside a TFSA, but growth-oriented
            equities that compound inside a TFSA create fully tax-free capital gains that would
            otherwise face a 50% inclusion rate.
          </p>
          <p>
            US-dividend stocks are the notable exception: the Canada-US tax treaty does not
            exempt TFSA accounts from the 15% US withholding tax on dividends. For US equities
            that pay meaningful dividends, holding them in an RRSP (where the treaty exemption
            applies) will result in better after-tax returns.
          </p>
          <p>
            High-yield assets and high-growth equities are the highest-value TFSA content.
            Canadian equities with dividend tax credits or growth assets held in an RRSP for
            the US-dividend exemption leave the TFSA room for the most tax-inefficient assets.
          </p>
        </div>
      </section>

      {/* TFSA vs RRSP */}
      <section id="tfsa-vs-rrsp" aria-labelledby="section-tfsa-vs-rrsp">
        <h2
          id="section-tfsa-vs-rrsp"
          className="text-xl font-medium text-neutral-900 dark:text-neutral-100"
        >
          TFSA vs. RRSP decision framework
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm">
          <p>
            The RRSP wins when your marginal rate at contribution is meaningfully higher than
            your expected marginal rate at withdrawal. A 33% refund on the way in, followed by
            26% tax on the way out, nets a significant gain. The TFSA wins when rates are similar
            or when withdrawals would push you into benefit clawbacks — OAS, GIS, or income-
            tested credits.
          </p>
          <p>
            For most Canadians in their peak earning years (26%+ marginal rate), the RRSP
            deduction is the strongest lever. For lower-income savers, new graduates, or those
            in retirement where RRSP withdrawals would be fully taxable and push income above
            OAS thresholds, the TFSA is often the right first choice.
          </p>
          <p>
            In practice, both accounts complement each other. Use the RRSP first when your rate
            is high and the tax refund is substantial; redirect a portion of that refund into
            the TFSA. In lower-income years, prioritize the TFSA and preserve RRSP room for
            future high-rate years.
          </p>
        </div>
      </section>
    </SubPageTemplate>
  );
}
