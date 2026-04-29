import type { Metadata } from 'next';
import SubPageTemplate from '@/components/SubPageTemplate';
import { getFAQs } from '@/lib/content/faqs';

const BASE = 'https://mapletaxcalculator.ca';

export const metadata: Metadata = {
  title: 'Tax credits and deductions to plan for in 2026 | MapleTax Calculator',
  description:
    'Credits and deductions you can act on before December 31, 2026: charitable donations, medical expenses, home accessibility, capital gains strategies, and more.',
  alternates: {
    canonical: `${BASE}/tax-planning-2026/credits-and-deductions`,
    languages: {
      en: `${BASE}/tax-planning-2026/credits-and-deductions`,
      fr: `${BASE}/fr/tax-planning-2026/credits-and-deductions`,
      'x-default': `${BASE}/tax-planning-2026/credits-and-deductions`,
    },
  },
  openGraph: {
    title: 'Tax credits and deductions to plan for in 2026 | MapleTax Calculator',
    description: 'Act before December 31, 2026: charitable donations, medical expenses, capital gains strategies, and more.',
    url: `${BASE}/tax-planning-2026/credits-and-deductions`,
  },
};

const FAQS = getFAQs([
  'tp26-credits-rate-change',
  'tp26-dtc-deadline',
  'tp26-charity-eligible',
  'tp26-caip-province',
]);

export default function CreditsAndDeductionsPage() {
  return (
    <SubPageTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Tax Planning 2026', href: '/tax-planning-2026' },
        { label: 'Credits & Deductions', href: '/tax-planning-2026/credits-and-deductions' },
      ]}
      h1="Tax credits and deductions to plan for in 2026"
      intro={
        "The 2026 federal bottom rate dropped from 15% to 14%, which means non-refundable federal credits are worth 14 cents per dollar of credit amount instead of 15. The Basic Personal Amount rose to $16,452, producing a credit of $2,303 — slightly less than the prior-year $2,356 despite the higher BPA. The rate cut and BPA increase roughly offset each other for most taxpayers, but credits with unchanged amounts (DTC, age amount) are worth marginally less.\n\n" +
        "Planning credits means knowing which ones require action before December 31 — charitable donations, medical expense timing, renovation work for HATC — and which require paperwork now: DTC applications take 8–12 weeks to process, and a T2200 for employment expenses must be signed by your employer before you can claim home-office or vehicle deductions."
      }
      tableOfContents={[
        { id: 'act-before-dec31', label: 'Non-refundable credits: act before December 31' },
        { id: 'paperwork-now', label: 'Non-refundable credits: paperwork to start now' },
        { id: 'refundable', label: 'Refundable credits: file on time' },
        { id: 'deductions', label: 'Deductions: reduce taxable income' },
        { id: 'capital-gains', label: 'Capital gains and losses: 2026 inclusion rate' },
      ]}
      commonMistakes={[
        {
          title: 'Not collecting medical receipts throughout the year',
          body: 'The 12-month window lets you claim any period ending in 2026 — optimizing it requires receipts you cannot reconstruct from memory. Keep a folder or photograph receipts as they arrive.',
        },
        {
          title: 'Forgetting the T2200 must come from the employer',
          body: 'You cannot claim 2026 home-office or vehicle expenses as an employee without a signed T2200. Request it now — do not wait until filing season.',
        },
        {
          title: 'Donating cash when appreciated securities are available',
          body: 'Donating publicly-listed securities directly to a registered charity triggers zero capital gains AND generates a donation receipt for the full fair market value. Cash giving from a non-registered account with embedded gains is the most tax-inefficient way to give.',
        },
      ]}
      quickWins={[
        {
          title: 'High-income year? Accelerate donations and deductible expenses before December 31',
          body: 'Charitable donations, medical procedures, and deductible renovation work should be completed this year if your income is unusually high (bonus, severance, property sale). The credit or deduction is worth more in a high-income year.',
        },
        {
          title: 'Low-income year? Consider contributing to RRSP without claiming the deduction yet',
          body: 'RRSP deductions do not have to be claimed in the year of contribution. If your income is unusually low in 2026, contribute to build room and carry the deduction forward to a future year when it reduces tax at a higher rate.',
        },
        {
          title: 'Inform adult children about the FHSA — the parent cannot open it for them',
          body: 'Only the individual who intends to buy a first home can open an FHSA. The $8,000 annual deduction is only available while the account is open. Earlier is better — unused room carries forward, but only from the year the account opens.',
        },
      ]}
      relatedSubPages={[
        { title: 'RRSP', description: 'Contribution and deduction strategy', href: '/tax-planning-2026/rrsp' },
        { title: 'Life Events', description: 'Credits triggered by major 2026 events', href: '/tax-planning-2026/life-events' },
        { title: 'Year-End Checklist', description: 'December 31 action list', href: '/tax-planning-2026/year-end-checklist' },
      ]}
      faqs={FAQS}
      pageMetadata={{
        title: 'Tax credits and deductions to plan for in 2026 | MapleTax Calculator',
        description: 'Act before December 31, 2026: charitable donations, medical, HATC, capital gains, DTC.',
        canonical: `${BASE}/tax-planning-2026/credits-and-deductions`,
      }}
    >
      {/* What's new callout */}
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 dark:border-neutral-800 dark:bg-neutral-900">
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          Key changes for 2026
        </p>
        <ul className="mt-3 space-y-1.5 text-sm text-neutral-700 dark:text-neutral-300">
          <li>Federal bottom rate: <strong>14%</strong> (down from 15%) — non-refundable credits worth slightly less per dollar of amount</li>
          <li>Federal Basic Personal Amount: <strong>$16,452</strong> (up from $15,705)</li>
          <li>Capital gains inclusion rate: <strong>1/2 on first $250,000</strong> of annual net gains per individual; <strong>2/3 above $250,000</strong> <span className="font-normal text-neutral-500 dark:text-neutral-400">(verify current legislative status at canada.ca — rate was proposed but subject to parliamentary confirmation)</span></li>
        </ul>
      </div>

      {/* Act before December 31 */}
      <section id="act-before-dec31">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Non-refundable credits: act before December 31
        </h2>

        <div className="mt-4 space-y-6 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <div>
            <h3 className="text-base font-medium text-neutral-900 dark:text-neutral-100">Charitable donation credit</h3>
            <div className="mt-2 space-y-2 text-sm">
              <p>Federal credit: 15% on the first $200 donated, 29% on amounts above $200. Most provinces have a parallel two-tier structure.</p>
              <p>Donate by December 31 for a 2026 credit — there is no 60-day grace period for donations.</p>
              <p><strong>Donating appreciated securities:</strong> if you hold publicly-listed securities with an unrealized gain in a non-registered account, donating them directly to a registered charity triggers <em>zero capital gains tax</em> while you receive a donation receipt for the full fair market value. This is often the highest-leverage charitable giving strategy available.</p>
            </div>
          </div>

          <div>
            <h3 className="text-base font-medium text-neutral-900 dark:text-neutral-100">Medical expense credit</h3>
            <div className="mt-2 space-y-2 text-sm">
              <p>15% federal (plus provincial rate) on eligible medical expenses above the lower of 3% of net income or <strong>$2,635</strong> (2026 threshold — indexed annually).</p>
              <p><strong>12-month window strategy:</strong> you can claim any 12-month period ending in 2026, not just the calendar year. If expenses bunched in late 2025 and early 2026, compare "October 2025 – September 2026" vs. "January 2026 – December 2026" to find the window that minimizes the threshold deduction.</p>
              <p><strong>Combine family expenses:</strong> claim all eligible amounts for self, spouse, and dependants together on one return. The threshold is based only on the claimant's net income — the lower-income spouse claiming may produce a larger credit.</p>
            </div>
          </div>

          <div>
            <h3 className="text-base font-medium text-neutral-900 dark:text-neutral-100">Home Accessibility Tax Credit (HATC)</h3>
            <div className="mt-2 space-y-2 text-sm">
              <p>Up to <strong>$20,000</strong> of eligible renovation costs for qualifying individuals: those 65 or older, DTC-eligible, or eligible for the disability supplement. The 15% credit on $20,000 is $3,000 maximum.</p>
              <p>Work must be done and paid for by December 31 to count for 2026. Eligible work includes wheelchair ramps, walk-in tubs, doorway widening, grab bars, and stair lifts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Paperwork now */}
      <section id="paperwork-now">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Non-refundable credits: paperwork to start now
        </h2>
        <div className="mt-3 space-y-6 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <div>
            <h3 className="text-base font-medium text-neutral-900 dark:text-neutral-100">Disability Tax Credit (DTC)</h3>
            <div className="mt-2 space-y-2 text-sm">
              <p>The DTC cannot be claimed without a CRA-approved T2201 certificate. Apply: have your medical practitioner complete Form T2201, submit to CRA, and wait for approval (typically 8–12 weeks).</p>
              <p>Once approved, the credit applies going forward AND can be carried back up to 10 years retroactively — apply as early as the qualifying condition exists.</p>
              <p>The 2026 base federal DTC amount is approximately <strong>$9,872</strong>. Unused amounts can be transferred to a supporting family member.</p>
            </div>
          </div>

          <div>
            <h3 className="text-base font-medium text-neutral-900 dark:text-neutral-100">T2200 for employment expenses</h3>
            <div className="mt-2 space-y-2 text-sm">
              <p>Your employer must sign Form T2200 before you can deduct home-office, vehicle, or supply expenses as an employee. Request this in January or February — not in March when everyone scrambles.</p>
              <p>Home office deduction: the detailed method (actual costs × business-use percentage) is the standard option. Calculate the business-use percentage by dividing the dedicated workspace area by total home area.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Refundable credits */}
      <section id="refundable">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Refundable credits: file on time to keep them coming
        </h2>
        <div className="mt-3 space-y-2 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p><strong>GST/HST Credit:</strong> based on your 2026 net income. Filing your 2026 return is required to receive quarterly GST/HST credit payments starting July 2027.</p>
          <p><strong>Canada Child Benefit (CCB):</strong> recalculated each July using the prior year's return. Late filing stops payments. If family income dropped significantly in 2026, file as soon as possible.</p>
          <p><strong>Canada Workers Benefit (CWB):</strong> refundable credit for low-income working Canadians. Advance CWB payments are available — check CRA My Account to confirm eligibility and amounts.</p>
          <p><strong>Climate Action Incentive Payment (CAIP):</strong> automatic quarterly payments to residents of Alberta, Saskatchewan, Manitoba, and Ontario (federal backstop provinces). No action required beyond filing — payment is based on your province of residence on December 31.</p>
        </div>
      </section>

      {/* Deductions */}
      <section id="deductions">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Deductions: decisions that reduce taxable income
        </h2>
        <div className="mt-3 space-y-4 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            <strong>RRSP and FHSA:</strong> covered in detail on their own sub-pages.{' '}
            <a href="/tax-planning-2026/rrsp" className="underline underline-offset-2 hover:opacity-75">RRSP guide</a>{' '}
            ·{' '}
            <a href="/tax-planning-2026/fhsa" className="underline underline-offset-2 hover:opacity-75">FHSA guide</a>.
          </p>
          <div>
            <p className="font-medium text-neutral-900 dark:text-neutral-100">Childcare expenses</p>
            <p className="mt-1">The lower-income spouse must generally claim childcare expenses. 2026 limits: <strong>$8,000</strong> per child under age 7 at year-end, <strong>$5,000</strong> for ages 7–16, <strong>$11,000</strong> for children with severe disabilities. Keep all receipts including provider name, SIN (for individual babysitters), and amounts paid.</p>
          </div>
          <div>
            <p className="font-medium text-neutral-900 dark:text-neutral-100">Moving expenses</p>
            <p className="mt-1">Deductible if you moved at least 40 km closer to a new workplace or post-secondary institution, and earned income at the new location. Deduction is limited to income earned at the new location — unused amounts carry forward.</p>
          </div>
        </div>
      </section>

      {/* Capital gains */}
      <section id="capital-gains">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Capital gains and losses: 2026 inclusion rate
        </h2>
        <div className="mt-3 space-y-3 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            For 2026, individuals pay capital gains tax on <strong>1/2 (50%) of the first $250,000</strong> of net annual capital gains and <strong>2/3 (67%) of net gains above $250,000</strong>. The $250,000 threshold resets each calendar year. Most Canadians selling a single investment will use the 1/2 rate on the full amount. <em>The 2/3 rate for gains above $250,000 was proposed in the 2024 federal budget and applied by CRA on an interim basis — verify that legislation has received Royal Assent at canada.ca before relying on this rate for large transactions.</em>
          </p>
          <p>
            <strong>Tax-loss selling:</strong> realize capital losses in non-registered accounts before December 31 to offset capital gains from earlier in 2026. Losses reduce net capital gains subject to the inclusion rate. Observe the superficial loss rule — wait more than 30 days before repurchasing the same security.
          </p>
          <p>
            The <a href="/tax-planning-2026/year-end-checklist" className="underline underline-offset-2 hover:opacity-75">Year-End Checklist</a> covers tax-loss selling mechanics in detail, including settlement timing and what you can immediately buy instead.
          </p>
        </div>
      </section>
    </SubPageTemplate>
  );
}
