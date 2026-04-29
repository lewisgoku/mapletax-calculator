import type { Metadata } from 'next';
import SubPageTemplate from '@/components/SubPageTemplate';

export const metadata: Metadata = {
  title: "What's new in Canadian taxes for 2026",
  description:
    'Federal bottom rate cut to 14%, higher BPA, Alberta new 8% bracket, CPP2 expansion, and more. Full summary of every 2026 Canadian tax change.',
  alternates: {
    canonical: 'https://mapletaxcalculator.ca/whats-new-2026',
    languages: {
      en: 'https://mapletaxcalculator.ca/whats-new-2026',
      'x-default': 'https://mapletaxcalculator.ca/whats-new-2026',
    },
  },
  openGraph: {
    title: "What's new in Canadian taxes for 2026",
    description:
      'Federal bottom rate cut to 14%, higher BPA, Alberta new 8% bracket, CPP2 expansion — every 2026 tax change summarised.',
    url: 'https://mapletaxcalculator.ca/whats-new-2026',
  },
};

const TOC = [
  { id: 'federal-rate-cut',    label: 'Federal bottom rate cut to 14%' },
  { id: 'bpa',                 label: 'Basic Personal Amount rises to $16,452' },
  { id: 'indexation',          label: 'Bracket indexation — 2.0%' },
  { id: 'alberta',             label: 'Alberta: new 8% bracket' },
  { id: 'bc',                  label: 'British Columbia changes' },
  { id: 'cpp2',                label: 'CPP2 expansion' },
  { id: 'ei',                  label: 'EI premiums 2026' },
  { id: 'capital-gains',       label: 'Capital gains inclusion rate' },
  { id: 'unchanged',           label: 'What did not change' },
];

const FAQS = [
  {
    id: 'wn26-biggest-change',
    question: 'What is the biggest tax change for 2026?',
    answer:
      'The federal bottom marginal rate dropped from 15% to 14%, effective January 1, 2026. This is the first cut to the lowest federal bracket since 2016. It applies to the first $58,523 of taxable income and saves most Canadians between $300 and $800 per year, depending on province.',
  },
  {
    id: 'wn26-ab-bracket',
    question: 'How does Alberta\'s new 8% bracket work?',
    answer:
      'Starting in 2026, Alberta taxes the first $60,000 of taxable income at 8%, down from the previous flat 10% starting rate. Income above $60,000 continues through the existing bracket schedule (10%, 12%, 13%, 14%, 15%). An Albertan earning $60,000 saves approximately $1,200 in provincial tax compared to the old structure.',
  },
  {
    id: 'wn26-cpp2',
    question: 'Who is affected by the CPP2 change?',
    answer:
      'The CPP2 second ceiling (YAMPE) rises from 2025 levels to $85,000 in 2026. Employees and self-employed individuals earning between $74,600 (the first ceiling, YMPE) and $85,000 pay an additional 4% CPP2 contribution on that band. CPP2 contributions are deductible from income — not just a credit — making them more tax-efficient than CPP1.',
  },
  {
    id: 'wn26-capital-gains',
    question: 'Did the capital gains inclusion rate change?',
    answer:
      'The federal government proposed raising the inclusion rate from 1/2 to 2/3 on capital gains above $250,000 for individuals. As of April 2026, this change remains legislatively uncertain — Parliament has not passed final legislation. MapleTax Calculator uses the current 1/2 inclusion rate. We add an editorial disclaimer wherever capital gains are discussed.',
  },
  {
    id: 'wn26-tfsa',
    question: 'Did the TFSA limit change for 2026?',
    answer:
      'No. The TFSA annual contribution limit remains $7,000 for 2026, the same as 2024 and 2025. The cumulative lifetime limit for someone who has been eligible since 2009 is now $102,000.',
  },
];

const RELATED = [
  {
    title: 'Key Dates 2026',
    description: 'RRSP deadline, instalment dates, and filing deadline',
    href: '/tax-planning-2026/key-dates',
  },
  {
    title: 'RRSP 2026',
    description: '$33,810 limit — contribution and deduction strategy',
    href: '/tax-planning-2026/rrsp',
  },
  {
    title: 'Credits & Deductions',
    description: 'What you can claim to reduce your 2026 tax owing',
    href: '/tax-planning-2026/credits-and-deductions',
  },
];

export default function WhatsNew2026Page() {
  return (
    <SubPageTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "What's New 2026", href: '/whats-new-2026' },
      ]}
      h1="What's new in Canadian taxes for 2026"
      intro="The Carney government cut the federal bottom rate, Alberta introduced a new bracket, and CPP2 ceilings rose again. Here is every change that affects your 2026 tax return."
      tableOfContents={TOC}
      commonMistakes={[]}
      quickWins={[]}
      relatedSubPages={RELATED}
      faqs={FAQS}
      pageMetadata={{
        title: "What's new in Canadian taxes for 2026",
        description: 'Every 2026 Canadian tax change summarised.',
        canonical: 'https://mapletaxcalculator.ca/whats-new-2026',
      }}
    >
      <section id="federal-rate-cut" className="space-y-3">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Federal bottom rate cut to 14%
        </h2>
        <p>
          The most significant federal change for 2026 is that the lowest bracket rate dropped from
          15% to <strong>14%</strong>, effective January 1, 2026. This rate applies to the first{' '}
          <strong>$58,523</strong> of federal taxable income (after subtracting the Basic Personal
          Amount and other deductions).
        </p>
        <p>
          For a taxpayer earning $60,000 with no deductions, the saving is approximately{' '}
          <strong>$585</strong> in federal tax alone (1% × $58,523). The combined federal-provincial
          saving varies by province — it is largest where provincial rates are lowest, such as
          Alberta and the territories.
        </p>
        <p>
          This is the first reduction to the bottom federal bracket since 2016 and was a central
          commitment of the Carney government&apos;s first budget.
        </p>
      </section>

      <section id="bpa" className="space-y-3">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Basic Personal Amount rises to $16,452
        </h2>
        <p>
          The federal Basic Personal Amount (BPA) — the amount of income sheltered from federal tax
          — rises to <strong>$16,452</strong> for 2026. The credit is calculated at 14% (the new
          bottom rate), making it worth up to <strong>$2,303</strong> for most taxpayers.
        </p>
        <p>
          The BPA phases out for high earners. Above <strong>$181,440</strong> of net income, the
          enhanced portion of the BPA begins to claw back, reaching a base level of{' '}
          <strong>$14,829</strong> at income of <strong>$258,482</strong> and above. High earners
          still receive the base BPA credit; they simply do not benefit from the full enhancement.
        </p>
      </section>

      <section id="indexation" className="space-y-3">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Bracket indexation — 2.0%
        </h2>
        <p>
          CRA applied a <strong>2.0% indexation factor</strong> to all federal bracket thresholds
          for 2026. This annual adjustment is based on the Consumer Price Index and ensures that
          Canadians are not pushed into higher brackets by inflation alone.
        </p>
        <p>
          Most provinces applied a similar indexation factor, though rates vary by jurisdiction.
          Notable exceptions: British Columbia paused indexation on its provincial brackets from
          2027 through 2030 as part of Budget 2026 — so BC&apos;s brackets are indexed for 2026
          but will be frozen thereafter.
        </p>
      </section>

      <section id="alberta" className="space-y-3">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Alberta: new 8% bracket on the first $60,000
        </h2>
        <p>
          Alberta introduced a new bottom bracket for 2026: income up to <strong>$60,000</strong>{' '}
          is now taxed at <strong>8%</strong>, down from the previous entry rate of 10%. Income
          above $60,000 continues through the existing schedule (10%, 12%, 13%, 14%, 15%).
        </p>
        <p>
          An Albertan earning exactly $60,000 saves approximately{' '}
          <strong>$1,200 in provincial tax</strong> compared to the old structure (2% × $60,000).
          Higher earners benefit from the same saving on their first $60,000 of taxable income.
          Alberta remains the only province with no provincial sales tax.
        </p>
        <p>
          Combined with the federal rate cut, Albertans in the lower income range now have access
          to some of the lowest combined marginal rates in Canada.
        </p>
      </section>

      <section id="bc" className="space-y-3">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          British Columbia changes
        </h2>
        <p>
          BC made two changes via Budget 2026. First, the bottom provincial rate increased from
          5.06% to <strong>5.60%</strong>. Second, BC paused bracket indexation from 2027 through
          2030, meaning bracket thresholds will not be adjusted for inflation during that period.
        </p>
        <p>
          For 2026, the higher bottom rate partly offsets the federal rate cut for lower-income BC
          residents. The indexation pause will have a more pronounced effect starting in 2027, as
          inflation will gradually push more income into higher brackets without the thresholds
          rising to match.
        </p>
      </section>

      <section id="cpp2" className="space-y-3">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          CPP2 expansion
        </h2>
        <p>
          Canada Pension Plan contributions now operate on a two-tier system. The first ceiling —
          the Year&apos;s Maximum Pensionable Earnings (YMPE) — is <strong>$74,600</strong> for
          2026. The second ceiling — the Year&apos;s Additional Maximum Pensionable Earnings
          (YAMPE) — rises to <strong>$85,000</strong>.
        </p>
        <p>
          Employees earning between $74,600 and $85,000 pay an additional{' '}
          <strong>4% CPP2</strong> contribution on that band (up to $414 for employees; double for
          the self-employed). Unlike CPP1 contributions, which are a non-refundable credit, CPP2
          contributions are <strong>deductible from income</strong> on line 22215 of the T1 return.
          This makes CPP2 more tax-efficient — the deduction is worth more than a credit for most
          taxpayers.
        </p>
        <p>
          CPP2 contributions build enhanced CPP retirement benefits beginning in 2024 and beyond.
        </p>
      </section>

      <section id="ei" className="space-y-3">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          EI premiums 2026
        </h2>
        <p>
          Employment Insurance maximum insurable earnings rise to <strong>$65,700</strong> for
          2026. The employee premium rate is <strong>1.64%</strong>, giving a maximum annual
          employee premium of approximately <strong>$1,078</strong>.
        </p>
        <p>
          Quebec employees pay a lower rate of <strong>1.31%</strong> because Quebec operates its
          own parental insurance plan (RQAP/QPIP), which covers benefits that EI covers in other
          provinces. Employers pay 1.4× the employee rate in all provinces.
        </p>
      </section>

      <section id="capital-gains" className="space-y-3">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Capital gains inclusion rate
        </h2>
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm dark:border-amber-900 dark:bg-amber-950/30">
          <p className="font-medium text-amber-900 dark:text-amber-200">Legislative uncertainty</p>
          <p className="mt-1 text-amber-800 dark:text-amber-300">
            The proposed 2/3 inclusion rate has not received Royal Assent as of April 2026.
            MapleTax Calculator uses the current 1/2 rate. Consult a tax professional before
            realising large capital gains.
          </p>
        </div>
        <p>
          The federal government proposed raising the capital gains inclusion rate from{' '}
          <strong>1/2 to 2/3</strong> on gains above <strong>$250,000</strong> per year for
          individuals (corporations and trusts would face the 2/3 rate on all gains). If passed,
          this would meaningfully increase the effective tax rate on large investment gains, real
          estate dispositions, and business sales.
        </p>
        <p>
          As of April 2026, the legislation remains in progress. We note this uncertainty
          prominently wherever capital gains are discussed on this site.
        </p>
      </section>

      <section id="unchanged" className="space-y-3">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          What did not change
        </h2>
        <p>Several key limits carried forward unchanged from 2025:</p>
        <ul className="space-y-2 pl-4 list-disc text-sm">
          <li>
            <strong>TFSA annual limit:</strong> $7,000 — unchanged for the third consecutive year.
            Cumulative lifetime room since 2009 is now $102,000.
          </li>
          <li>
            <strong>FHSA:</strong> $8,000/year, $40,000 lifetime limit, rules unchanged.
          </li>
          <li>
            <strong>RRSP Home Buyers&apos; Plan:</strong> $60,000 lifetime withdrawal limit,
            unchanged.
          </li>
          <li>
            <strong>RESP CESG:</strong> 20% grant on the first $2,500 of annual contributions
            ($500/year), unchanged.
          </li>
          <li>
            <strong>Age amount:</strong> indexed to inflation; no structural change.
          </li>
          <li>
            <strong>GST/HST rates:</strong> federal 5% GST unchanged; provincial HST rates
            unchanged.
          </li>
        </ul>
      </section>
    </SubPageTemplate>
  );
}
