import type { Metadata } from 'next';
import SubPageTemplate from '@/components/SubPageTemplate';
import FAQAccordion from '@/components/FAQAccordion';
import { getFAQs } from '@/lib/content/faqs';

const BASE = 'https://mapletaxcalculator.ca';

export const metadata: Metadata = {
  title: 'How 2025 life events affect your Canadian tax return | MapleTax Calculator',
  description:
    'Tax impacts of marriage, divorce, new baby, home purchase, retirement, and self-employment in 2025. Know what changes on your T1.',
  alternates: {
    canonical: `${BASE}/tax-filing-2025/life-events`,
    languages: {
      en: `${BASE}/tax-filing-2025/life-events`,
      fr: `${BASE}/fr/tax-filing-2025/life-events`,
      'x-default': `${BASE}/tax-filing-2025/life-events`,
    },
  },
};

const FAQS = getFAQs([
  'tf25-principal-residence',
  'tf25-common-law',
  'tf25-home-office-employee',
  'tf25-ccb-stopped',
]);

const EVENTS = [
  {
    id: 'new-baby',
    title: 'Had a baby or adopted',
    content: (
      <>
        <p>
          The <strong>Canada Child Benefit (CCB)</strong> begins in the month after birth or adoption. Both parents
          must file their 2025 returns for CCB to be calculated correctly for July 2026 onward. Register the child
          with Service Canada as soon as possible.
        </p>
        <p className="mt-3">
          The <strong>childcare deduction</strong> applies to eligible expenses paid in 2025: $8,000 per child under 7,
          $5,000 for ages 7–16. The lower-income spouse must claim it. Keep all receipts.
        </p>
        <p className="mt-3">
          Maternity and parental EI benefits are reported on a <strong>T4E</strong> slip and are taxable income.
          Income tax is not automatically withheld at source from EI — you may have a balance owing if you didn&apos;t
          request additional withholding.
        </p>
        <p className="mt-3">
          Consider opening an <strong>RESP</strong> — the Canada Education Savings Grant (CESG) provides 20% on the
          first $2,500 contributed per year, starting from the year of birth.
        </p>
      </>
    ),
  },
  {
    id: 'married',
    title: 'Got married or moved in common-law',
    content: (
      <>
        <p>
          Update your marital status on your T1 return for 2025. Common-law status begins after{' '}
          <strong>12 continuous months of cohabitation</strong>, or immediately if you have a child together.
        </p>
        <p className="mt-3">
          A spousal or common-law partner amount may be available if your partner&apos;s net income was below the BPA
          ($15,705 for 2025). The credit reduces as their income rises and is eliminated at approximately the BPA level.
        </p>
        <p className="mt-3">
          <strong>Pension income splitting</strong> becomes available: up to 50% of eligible pension income can be
          allocated to a lower-income spouse, reducing combined household tax. This is done on Form T1032.
        </p>
        <p className="mt-3">
          GST/HST credit and CCB are calculated on <strong>combined household income</strong> from the year of
          marriage or common-law status. Notify CRA of the status change via My Account.
        </p>
      </>
    ),
  },
  {
    id: 'separated',
    title: 'Separated or divorced',
    content: (
      <>
        <p>
          Update your marital status on your T1 as of the date of separation. GST/HST credit and CCB are recalculated
          based on your individual income from that date, which can result in increased benefit payments.
        </p>
        <p className="mt-3">
          <strong>Child support</strong> payments are not deductible for the payer and not taxable income for the
          recipient — they are invisible to the tax system. <strong>Spousal support</strong> payments under a written
          agreement or court order are deductible for the payer and taxable income for the recipient.
        </p>
        <p className="mt-3">
          The <strong>eligible dependant credit</strong> (formerly &quot;equivalent-to-spouse&quot;) may be available to a
          single parent supporting a child under 18. This credit is mutually exclusive — only one parent can claim
          it, and the support payer is generally not eligible.
        </p>
        <p className="mt-3">
          <strong>Shared custody</strong> (at least 40% of the time with each parent) splits the CCB equally between
          parents. Notify CRA of the custody arrangement.
        </p>
      </>
    ),
  },
  {
    id: 'bought-home',
    title: 'Bought a first home',
    content: (
      <>
        <p>
          The <strong>First-Time Home Buyers&apos; Tax Credit</strong> gives you a $10,000 amount (line 31270) that
          produces a <strong>$1,500 federal credit</strong> at 15%. You qualify if neither you nor your spouse
          owned a principal residence in any of the four preceding years.
        </p>
        <p className="mt-3">
          If you used the <strong>RRSP Home Buyers&apos; Plan (HBP)</strong>, repayments begin two years after the year
          of withdrawal. Repayments are not deductible — they restore RRSP room without providing a tax deduction.
          Track your repayment schedule in CRA My Account.
        </p>
        <p className="mt-3">
          <strong>FHSA qualifying withdrawals</strong> are completely tax-free when used to purchase a qualifying
          first home. Include Form RC725 with your return in the year of withdrawal.
        </p>
        <p className="mt-3">
          Several provinces offer <strong>land transfer tax rebates</strong> for first-time buyers — Ontario (up to
          $4,000), BC (up to $8,000), and others. These are claimed provincially, not on your T1.
        </p>
      </>
    ),
  },
  {
    id: 'sold-property',
    title: 'Sold a property',
    content: (
      <>
        <p>
          You must <strong>report the sale on Schedule 3</strong> even if the property is fully exempt as your
          principal residence. CRA has required designation since 2016. Failing to report can result in penalties
          and the loss of exemption for years not properly designated.
        </p>
        <p className="mt-3">
          For a <strong>principal residence</strong>, you designate it on Schedule 3 and the gain is generally
          exempt from tax. Only one property per family unit per year can be designated.
        </p>
        <p className="mt-3">
          For <strong>non-principal-residence property</strong> (cottage, rental, investment property), the capital
          {/* TODO: Verify final legislative status of capital gains inclusion rate change before publishing.
              The 2024 federal budget proposed 2/3 inclusion on gains above $250,000/year for individuals
              (effective June 25, 2024). Confirm this is enacted law as of the 2025 filing year. */}
          gain is reportable. The capital gains inclusion rate for dispositions in 2025 depends on timing and
          the size of your annual gains. For gains realized <strong>before June 25, 2024</strong>, the
          inclusion rate is 1/2. For gains realized <strong>on or after June 25, 2024</strong>, the first
          $250,000 of annual capital gains for individuals is still included at 1/2 — only the portion{' '}
          <strong>above $250,000</strong> per year is included at 2/3. Most Canadians selling a single
          property with a moderate gain will use the 1/2 rate on the full amount. Consult a tax professional
          if your annual gains exceed $250,000.
        </p>
        <p className="mt-3">
          Rental properties have recaptured CCA (Capital Cost Allowance) to consider — this is ordinary income, not a
          capital gain. Consult a tax professional for properties with significant depreciation claimed.
        </p>
      </>
    ),
  },
  {
    id: 'retired',
    title: 'Retired or turned 65',
    content: (
      <>
        <p>
          At 65 you become eligible for the <strong>Age Amount</strong> — a federal credit of $8,396 for 2025,
          phasing out above $42,335 net income. Your provincial equivalent also kicks in at 65.
        </p>
        <p className="mt-3">
          The <strong>Pension Income Amount</strong> allows you to claim up to $2,000 of eligible pension income
          (RRIF withdrawals, defined benefit pension, life annuities) as a non-refundable credit. CPP and OAS
          do not qualify.
        </p>
        <p className="mt-3">
          <strong>Pension income splitting</strong> becomes available: up to 50% of eligible pension income can be
          allocated to your spouse using Form T1032, reducing combined household tax.
        </p>
        <p className="mt-3">
          CPP (T4A(P)) and OAS (T4A(OAS)) are both <strong>taxable income</strong>. You can request voluntary tax
          withholding from Service Canada to avoid a balance owing at filing.
        </p>
        <p className="mt-3">
          If you turn <strong>71 in 2025</strong>, you must convert your RRSP to a RRIF or annuity by December 31,
          2025. Any RRSP room used in 2025 before conversion is still deductible.
        </p>
      </>
    ),
  },
  {
    id: 'self-employed',
    title: 'Started a side hustle or self-employment',
    content: (
      <>
        <p>
          Self-employment income (and losses) are reported on <strong>Form T2125</strong> (Statement of Business or
          Professional Activities). Business expenses — home office (pro-rated), vehicle (log required), supplies,
          professional fees — are deductible against business income.
        </p>
        <p className="mt-3">
          If your gross self-employment revenue exceeded <strong>$30,000</strong> in any single quarter or over four
          consecutive quarters, you must register for and collect <strong>GST/HST</strong>. File GST/HST returns
          separately from your T1.
        </p>
        <p className="mt-3">
          Self-employed individuals pay <strong>both the employee and employer share of CPP</strong> — effectively
          double the rate of an employee (11.9% on net self-employment income for 2025). This is the single largest
          financial surprise for new self-employed Canadians.
        </p>
        <p className="mt-3">
          If your net tax owing exceeds $3,000 ($1,800 in Quebec) in 2025 and either prior year, CRA will require{' '}
          <strong>quarterly instalment payments</strong> for 2026. Voluntary instalments prevent interest charges.
        </p>
      </>
    ),
  },
  {
    id: 'moved',
    title: 'Moved for work or school',
    content: (
      <>
        <p>
          <strong>Moving expenses are deductible</strong> if you moved at least 40 kilometres closer to a new place
          of work or post-secondary institution, and you earned employment or self-employment income at the new
          location (or received scholarships/bursaries as a student).
        </p>
        <p className="mt-3">
          Eligible expenses include: transportation and storage of household effects, travel costs (vehicle, meals,
          accommodation en route), temporary housing (up to 15 days), cost of maintaining the old residence while
          trying to sell, legal fees and real estate commission on the sale, and costs of cancelling a lease.
        </p>
        <p className="mt-3">
          The deduction is limited to income earned at the new location — you cannot create a loss with moving
          expenses, but unused amounts carry forward to the next year. Claimed on <strong>Form T1-M</strong>.
        </p>
      </>
    ),
  },
];

export default function LifeEventsPage() {
  return (
    <SubPageTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Tax Filing 2025', href: '/tax-filing-2025' },
        { label: 'Life Events', href: '/tax-filing-2025/life-events' },
      ]}
      h1="How 2025 life events affect your tax return"
      intro="Major life changes often change your tax situation more than income changes do. Here are the eight most common events and their T1 implications."
      tableOfContents={EVENTS.map((e) => ({ id: e.id, label: e.title }))}
      commonMistakes={[
        {
          title: "Not designating a principal residence on Schedule 3 when selling",
          body: "CRA requires the designation even for fully exempt sales since 2016. The penalty for failing to report is $100 per month, up to $8,000. If you sold a property and didn't designate, file an amended return immediately.",
        },
        {
          title: 'Spending all self-employment income without setting aside taxes and CPP',
          body: "Self-employed Canadians pay double CPP (both employee and employer share) on top of income tax. A rough rule: set aside 30–35% of net self-employment income for taxes and CPP if this is your first year.",
        },
      ]}
      quickWins={[
        {
          title: 'Open an RESP after having a baby — CESG starts from birth',
          body: "The Canada Education Savings Grant gives 20% free on the first $2,500 contributed per year, starting from the year of birth. Unused grant room carries forward but not past age 17.",
        },
        {
          title: 'Check pension income splitting in your retirement year',
          body: "Splitting up to 50% of RRIF income with a lower-income spouse can save thousands in combined tax. Run the comparison in your NETFILE software — most handle the optimization automatically.",
        },
      ]}
      relatedSubPages={[
        { title: 'Credits & Deductions', description: 'Credits triggered by life events', href: '/tax-filing-2025/credits-and-deductions' },
        { title: 'Slips Checklist', description: 'Slips for your specific situation', href: '/tax-filing-2025/slips-checklist' },
        { title: "Can't Pay?", description: 'If life events created a tax bill', href: '/tax-filing-2025/cant-pay' },
      ]}
      faqs={FAQS}
      pageMetadata={{
        title: '2025 life events and your tax return | MapleTax Calculator',
        description: 'Tax impacts of major 2025 life events on your T1.',
        canonical: `${BASE}/tax-filing-2025/life-events`,
      }}
    >
      {/* Life event accordions */}
      <div className="space-y-3">
        {EVENTS.map((event) => (
          <details
            key={event.id}
            id={event.id}
            className="group rounded-2xl border border-neutral-200 dark:border-neutral-800"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-base font-medium text-neutral-900 dark:text-neutral-100 [&::-webkit-details-marker]:hidden">
              <span>{event.title}</span>
              <svg
                className="h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-200 group-open:rotate-180"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 6l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </summary>
            <div className="px-5 pb-5 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-0">
              {event.content}
            </div>
          </details>
        ))}
      </div>
    </SubPageTemplate>
  );
}
