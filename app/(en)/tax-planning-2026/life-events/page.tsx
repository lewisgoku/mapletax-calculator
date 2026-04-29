import type { Metadata } from 'next';
import SubPageTemplate from '@/components/SubPageTemplate';
import { getFAQs } from '@/lib/content/faqs';

const BASE = 'https://mapletaxcalculator.ca';

export const metadata: Metadata = {
  title: '2026 life event tax planning — marriage, home, retirement, and more | MapleTax Calculator',
  description:
    'Tax planning actions to take in 2026 for major life events: new baby, marriage, home purchase, retirement, self-employment, and significant investments.',
  alternates: {
    canonical: `${BASE}/tax-planning-2026/life-events`,
    languages: {
      en: `${BASE}/tax-planning-2026/life-events`,
      fr: `${BASE}/fr/tax-planning-2026/life-events`,
      'x-default': `${BASE}/tax-planning-2026/life-events`,
    },
  },
  openGraph: {
    title: '2026 life event tax planning | MapleTax Calculator',
    description: 'Tax planning actions for major 2026 life events: baby, marriage, home, retirement, self-employment.',
    url: `${BASE}/tax-planning-2026/life-events`,
  },
};

const EVENTS = [
  {
    id: 'new-baby',
    title: 'Having a baby or adopting in 2026',
    content: (
      <>
        <p>Register for the <strong>Canada Child Benefit (CCB)</strong> immediately after birth or adoption through Service Canada — benefits start the month after birth and retroactive payment is available, but delays are unnecessary. Both parents must file their returns for CCB to be calculated correctly.</p>
        <p className="mt-3">Open an <strong>RESP in the year of birth</strong>. CESG room does not accumulate while no account exists — opening now maximizes the number of years the government adds $500 in matching grants. See the <a href="/tax-planning-2026/resp" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-75">RESP guide</a> for the age-17 rules that catch late starters.</p>
        <p className="mt-3"><strong>Parental EI and Quebec QPIP benefits</strong> are fully taxable income. Tax is not automatically withheld at source — set aside money throughout the leave or request additional withholding.</p>
        <p className="mt-3">If <strong>childcare begins in 2026</strong>, keep all receipts: provider name, SIN (for individual caregivers), and amounts paid. The childcare deduction is one of the largest available to families — $8,000 for children under 7, $5,000 for ages 7–16.</p>
        <p className="mt-3">Update <strong>beneficiary designations</strong> on RRSPs, TFSAs, life insurance, and group benefits.</p>
      </>
    ),
  },
  {
    id: 'married',
    title: 'Getting married or moving in common-law in 2026',
    content: (
      <>
        <p>Update your <strong>marital status with CRA</strong> via My Account — this triggers recalculation of GST/HST credit and CCB based on combined household income from the date of the status change. Common-law status begins after 12 continuous months of cohabitation, or immediately if you have a child together.</p>
        <p className="mt-3"><strong>Spousal RRSP contributions:</strong> if your income will be materially higher than your spouse's in retirement, contributing to a spousal RRSP shifts future income to a lower-rate taxpayer. The 3-year attribution rule starts running from the first contribution — earlier is better.</p>
        <p className="mt-3">Update <strong>beneficiary designations</strong> on all registered accounts, life insurance, and group benefits. A will update is also advisable.</p>
        <p className="mt-3">If property is transferred between spouses, some provinces allow transfers at cost base without triggering capital gains — verify provincial rules before any property transfer.</p>
      </>
    ),
  },
  {
    id: 'separated',
    title: 'Separating or divorcing in 2026',
    content: (
      <>
        <p>Update marital status with CRA immediately — <strong>GST/HST credit and CCB recalculate</strong> from the month of separation based on individual income rather than combined income. This can increase benefit payments for the lower-income parent.</p>
        <p className="mt-3"><strong>Child support</strong> is not deductible by the payer and not taxable to the recipient. <strong>Spousal support</strong> paid under a written agreement or court order is deductible by the payer and taxable income for the recipient. This asymmetry matters for negotiating the right amounts.</p>
        <p className="mt-3">The <strong>eligible dependant credit</strong> may be available to a single parent who is the primary caregiver for a child under 18. The credit is equivalent to the spousal amount — only one parent can claim it, and it cannot be combined with the spousal amount in the same year.</p>
        <p className="mt-3"><strong>Shared custody</strong> (at least 40% of time with each parent) splits CCB equally between parents from the month after separation. Both parents must update their CRA profile.</p>
        <p className="mt-3">Division of <strong>pension assets</strong> is governed by provincial family law. RRSP/RRIF transfers made under a separation agreement are typically not taxable events when done via Form T2220.</p>
      </>
    ),
  },
  {
    id: 'bought-home',
    title: 'Buying your first home in 2026',
    content: (
      <>
        <p><strong>FHSA qualifying withdrawal:</strong> if you opened an FHSA in 2025 or earlier and buy a qualifying first home in 2026, the withdrawal is completely tax-free. An FHSA opened in 2026 cannot be withdrawn tax-free until 2027 — the account must be open for at least one full calendar year.</p>
        <p className="mt-3">The <strong>RRSP Home Buyers&apos; Plan</strong> allows withdrawal of up to $60,000 per person ($120,000 for a couple) with no immediate tax. Repayment starts two years after the year of withdrawal — 1/15th per year over 15 years.</p>
        <p className="mt-3">The <strong>First-Time Home Buyers&apos; Tax Credit</strong> provides a non-refundable $10,000 credit amount — equal to $1,500 in federal tax reduction at the 15% calculation rate. You qualify if neither you nor your spouse owned and lived in a home in any of the prior four years.</p>
        <p className="mt-3">For newly constructed homes, the <strong>federal HST rebate</strong> applies on the first $350,000 of purchase price. Several provinces layer additional rebates. Verify current thresholds and provincial programs at time of closing.</p>
      </>
    ),
  },
  {
    id: 'sold-property',
    title: 'Selling a home or property in 2026',
    content: (
      <>
        <p>You must <strong>designate your principal residence on Schedule 3</strong> for every year it qualifies — CRA requires this even when the property is fully exempt from capital gains. The penalty for not filing is $100/month up to $8,000, and CRA can deny the exemption for years not properly designated.</p>
        <p className="mt-3">Only one property per <strong>family unit</strong> per calendar year can be designated as a principal residence. If you own a cottage and a city home, track which was designated in prior years — this decision has tax implications.</p>
        <p className="mt-3">Capital gains on non-principal-residence property use the <strong>2026 inclusion rate</strong>: 1/2 on the first $250,000 of annual net gains per individual, 2/3 above $250,000. <em>Verify the legislative status of the 2/3 rate at canada.ca — it was applied by CRA on an interim basis pending parliamentary confirmation.</em></p>
        <p className="mt-3">For <strong>rental properties</strong>: recaptured CCA (depreciation you claimed) is taxed as ordinary income — separate from, and in addition to, any capital gain on appreciation above adjusted cost base. Consult a tax professional for properties with significant depreciation.</p>
      </>
    ),
  },
  {
    id: 'retired',
    title: 'Retiring or turning 65 in 2026',
    content: (
      <>
        <p>At 65 you become eligible for the <strong>Age Amount</strong> — approximately $8,396 federal for 2026, phasing out above roughly $42,335 in net income. Your province adds its own age amount on top.</p>
        <p className="mt-3">The <strong>Pension Income Amount</strong> allows you to claim up to $2,000 of eligible pension income for a 15% non-refundable credit. Eligible income: RRIF withdrawals, defined benefit pension payments, life annuities. CPP and OAS do not qualify as eligible pension income for this credit.</p>
        <p className="mt-3"><strong>Pension income splitting:</strong> up to 50% of eligible pension income can be allocated to your spouse via Form T1032, potentially reducing combined household tax significantly. Run the calculation in your NETFILE software — most optimize this automatically.</p>
        <p className="mt-3"><strong>RRSP → RRIF conversion</strong> is required by December 31 of the year you turn 71. If you are 65 in 2026, start understanding the RRIF minimum withdrawal schedule — it begins at approximately 5.28% of the prior January 1 balance at age 71 and rises each year.</p>
        <p className="mt-3"><strong>OAS clawback:</strong> if net income exceeds approximately $90,997 for 2026, OAS is reduced by 15 cents per dollar above that threshold. TFSA withdrawals do not count as net income — draw TFSA before OAS to reduce or avoid the clawback.</p>
      </>
    ),
  },
  {
    id: 'self-employed',
    title: 'Starting a business or side hustle in 2026',
    content: (
      <>
        <p><strong>GST/HST registration</strong> is mandatory once you exceed $30,000 in taxable revenues in any four consecutive calendar quarters. Below that you are a "small supplier" and registration is optional — but early voluntary registration lets you claim Input Tax Credits on business expenses.</p>
        <p className="mt-3"><strong>Quarterly tax instalments</strong> are required if you expect net tax owing above $3,000 in 2026 and in either prior year. In your first year of self-employment, instalments are usually not required yet — the surprise hits in April of year two. Due dates: March 15, June 15, September 15, December 15.</p>
        <p className="mt-3"><strong>Self-employed CPP</strong> doubles the rate: you pay both employee and employer portions — 11.9% on net self-employment income between $3,500 and $74,600. This is the single largest financial shock for new self-employed Canadians. Set aside 30–35% of net self-employment income for income tax and CPP.</p>
        <p className="mt-3">See the <a href="/tax-planning-2026/self-employed" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-75">Self-Employed guide</a> for the instalment calculator, deductible expenses breakdown, and home office rules.</p>
      </>
    ),
  },
  {
    id: 'investment',
    title: 'Making a major investment or receiving an inheritance in 2026',
    content: (
      <>
        <p><strong>Asset location</strong> matters: interest income is 100% taxable, Canadian dividends benefit from the dividend gross-up and credit, capital gains have the inclusion rate advantage. Tax-efficient assets (growth equity, Canadian dividends) belong in non-registered accounts; tax-inefficient assets (bonds, foreign dividends) belong in registered accounts where they grow sheltered.</p>
        <p className="mt-3"><strong>Inherited RRSP or RRIF:</strong> if you are a qualifying survivor (spouse, financially dependent child, financially dependent infirm person), you can transfer the balance to your own RRSP or RRIF without immediate tax. Otherwise, the full balance is included in the deceased&apos;s final return. This is often the largest avoidable tax cost in estate planning.</p>
        <p className="mt-3"><strong>Inherited property</strong> comes to you at fair market value at the date of death — this becomes your adjusted cost base. Keep the estate documents; your cost base is NOT what the deceased originally paid.</p>
        <p className="mt-3"><strong>Attribution rules on income splitting:</strong> if you transfer or loan money to your spouse below the prescribed interest rate, income produced attributes back to you. Prescribed rate loans at the CRA quarterly prescribed rate are the standard method to avoid attribution — once set, the rate is locked for the life of the loan.</p>
      </>
    ),
  },
];

const FAQS = getFAQs([
  'tp26-common-law-immediate',
  'tp26-cpp-splitting',
  'tp26-principal-residence-deadline',
  'tp26-side-business-instalments',
]);

export default function LifeEvents2026Page() {
  return (
    <SubPageTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Tax Planning 2026', href: '/tax-planning-2026' },
        { label: 'Life Events', href: '/tax-planning-2026/life-events' },
      ]}
      h1="Tax planning for 2026 life events"
      intro="Life events don't just affect the return you file next spring — they create decisions you must make during the year for the best tax outcome. Acting before December 31 closes opportunities that can't be recovered. The eight events below are the most common triggers for missed planning."
      tableOfContents={EVENTS.map((e) => ({ id: e.id, label: e.title }))}
      commonMistakes={[
        {
          title: 'Not registering for CCB immediately after a birth',
          body: 'Retroactive payments are available, but every month of delay means you receive less of what you are owed. Register with Service Canada within days of the birth — you do not need to wait for the T1 filing season.',
        },
        {
          title: 'Contributing to a spousal RRSP and withdrawing within the three-year attribution window',
          body: 'Withdrawals within 3 years of the most recent spousal RRSP contribution attribute back to the contributor as income. If you plan to retire early and draw on a spousal RRSP, the 3-year clock matters. Contribute earlier rather than later.',
        },
        {
          title: 'Not designating a principal residence on Schedule 3 when selling',
          body: "CRA requires the designation even for fully exempt sales since 2016. The penalty is $100/month up to $8,000. If you sold a property and didn't designate, file an amended return immediately.",
        },
      ]}
      quickWins={[
        {
          title: 'Got married? Contribute to a spousal RRSP now',
          body: 'The 3-year attribution clock starts from the first contribution, not from when you start planning to retire. Contributing now (even a small amount) starts the clock while you plan the larger strategy.',
        },
        {
          title: 'Turning 65? Elect pension income splitting even if the benefit is small this year',
          body: 'Starting the pension splitting election sets the pattern and ensures you do not forget it in higher-income future years when the benefit grows.',
        },
        {
          title: 'Starting a business? Open a separate business bank account on day one',
          body: 'Mixing personal and business expenses in one account creates an audit nightmare and forces costly reconstruction of records. A dedicated account makes deductions defensible.',
        },
      ]}
      relatedSubPages={[
        { title: 'RRSP', description: 'Spousal RRSP and contribution strategy', href: '/tax-planning-2026/rrsp' },
        { title: 'FHSA', description: 'First home savings account', href: '/tax-planning-2026/fhsa' },
        { title: 'Credits & Deductions', description: 'Credits triggered by life events', href: '/tax-planning-2026/credits-and-deductions' },
      ]}
      faqs={FAQS}
      pageMetadata={{
        title: '2026 life event tax planning | MapleTax Calculator',
        description: 'Tax planning actions for major 2026 life events: baby, marriage, home, retirement, investments.',
        canonical: `${BASE}/tax-planning-2026/life-events`,
      }}
    >
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
            <div className="px-5 pb-5 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {event.content}
            </div>
          </details>
        ))}
      </div>
    </SubPageTemplate>
  );
}
