import type { Metadata } from 'next';
import SubPageTemplate from '@/components/SubPageTemplate';
import { getFAQs } from '@/lib/content/faqs';

const BASE = 'https://mapletaxcalculator.ca';

export const metadata: Metadata = {
  title: '2025 tax credits and deductions Canadians commonly miss | MapleTax Calculator',
  description:
    'Commonly missed 2025 T1 credits and deductions: disability, caregiver, childcare, moving expenses, CAIP, and more. With 2025 amounts.',
  alternates: {
    canonical: `${BASE}/tax-filing-2025/credits-and-deductions`,
    languages: {
      en: `${BASE}/tax-filing-2025/credits-and-deductions`,
      fr: `${BASE}/fr/tax-filing-2025/credits-and-deductions`,
      'x-default': `${BASE}/tax-filing-2025/credits-and-deductions`,
    },
  },
};

const FAQS = getFAQs(['tf25-credit-vs-deduction', 'tf25-childcare-school', 'tf25-dtc-apply', 'tf25-caip-quebec']);

export default function CreditsAndDeductionsPage() {
  return (
    <SubPageTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Tax Filing 2025', href: '/tax-filing-2025' },
        { label: 'Credits & Deductions', href: '/tax-filing-2025/credits-and-deductions' },
      ]}
      h1="Commonly missed 2025 tax credits and deductions"
      intro="Credits reduce tax directly. Deductions reduce taxable income — their value depends on your marginal rate. Both are worth claiming."
      tableOfContents={[
        { id: 'distinction', label: 'Credits vs. deductions' },
        { id: 'non-refundable', label: 'Non-refundable credits' },
        { id: 'refundable', label: 'Refundable credits' },
        { id: 'deductions', label: 'Deductions' },
        { id: 'scope-note', label: 'Provincial credits' },
      ]}
      commonMistakes={[
        {
          title: 'Missing the childcare deduction because of the spousal rule',
          body: 'The lower-income spouse must claim childcare expenses in almost all cases. Both parents claiming, or the higher earner claiming, is a CRA audit flag and will be disallowed.',
        },
        {
          title: 'Not claiming DTC due to the application barrier',
          body: 'The Disability Tax Credit requires prior CRA approval via Form T2201 — you cannot self-declare. Many eligible Canadians never apply. Once approved, retroactive claims can go back 10 years.',
        },
        {
          title: 'Forgetting the Northern Residents Deduction',
          body: 'Residents of Yukon, Northwest Territories, Nunavut, and many other prescribed zones qualify for a deduction worth up to $4,015/year for 2025. It is easy to overlook for first-year northern residents.',
        },
      ]}
      quickWins={[
        {
          title: 'Apply for the DTC now if a dependent has a disability',
          body: 'Once CRA approves Form T2201, the credit can be carried back 10 years and assigned to a supporting person. The retroactive tax recovery is often significant.',
        },
        {
          title: 'Donate securities instead of cash',
          body: 'Capital gains on publicly listed securities donated directly to a registered charity are taxed at zero. You still receive a donation receipt for the full fair market value — a double benefit over donating cash proceeds from a sale.',
        },
      ]}
      relatedSubPages={[
        { title: 'Life Events', description: 'How life changes affect your credits', href: '/tax-filing-2025/life-events' },
        { title: 'Slips Checklist', description: 'Documents you need to claim these', href: '/tax-filing-2025/slips-checklist' },
        { title: 'Amend a Return', description: 'Claim a missed credit on a filed return', href: '/tax-filing-2025/amend-a-return' },
      ]}
      faqs={FAQS}
      pageMetadata={{
        title: '2025 tax credits and deductions | MapleTax Calculator',
        description: 'Commonly missed 2025 T1 credits and deductions with amounts.',
        canonical: `${BASE}/tax-filing-2025/credits-and-deductions`,
      }}
    >
      {/* Credits vs. deductions */}
      <section id="distinction">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          The difference between a credit and a deduction
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            A <strong>deduction</strong> reduces your taxable income before tax is calculated. Its value scales with
            your marginal rate: a $5,000 RRSP deduction saves $2,150 at a 43% combined marginal rate, but only $1,000
            at 20%. Higher earners benefit more from deductions.
          </p>
          <p>
            A <strong>non-refundable tax credit</strong> reduces taxes owing directly at a fixed rate — typically 15%
            federal. A $1,000 credit saves $150 in federal tax regardless of your income. Excess non-refundable credits
            cannot produce a refund; they reduce taxes to zero and stop there.
          </p>
          <p>
            A <strong>refundable credit</strong> (like the GST/HST credit) is paid out in full even if you owe no tax.
            These are the most valuable for lower-income Canadians.
          </p>
        </div>
      </section>

      {/* Non-refundable credits */}
      <section id="non-refundable">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Non-refundable credits for 2025
        </h2>
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100">Basic Personal Amount (BPA)</h3>
            <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Every Canadian resident receives a federal BPA of <strong className="tabular-nums">$15,705</strong> for 2025.
              This amount is converted to a credit at the 15% federal rate, saving $2,356 in federal tax. The 2025 BPA
              is at 15% (the rate cut to 14% takes effect in 2026 only). Claimed automatically on your T1 — no action required.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100">Canada Caregiver Credit</h3>
            <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Available if you support a spouse, common-law partner, or dependent with a physical or mental impairment.
              The credit for an infirm dependent (other than spouse) is up to $7,999 for 2025 and phases out as the
              dependent&apos;s income rises. The spousal/partner amount has an additional infirmity supplement. Claimed on
              Schedule 5.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100">Disability Tax Credit (DTC)</h3>
            <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              For individuals with severe and prolonged physical or mental impairments. The federal base amount for 2025
              is <strong className="tabular-nums">$9,872</strong>. Requires prior CRA approval via Form T2201. Unused portions
              can be transferred to a supporting person. Must be claimed on Schedule 1.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100">Age Amount</h3>
            <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              For taxpayers 65 or older at December 31, 2025. The federal amount is{' '}
              <strong className="tabular-nums">$8,396</strong> for 2025, phasing out when net income exceeds $42,335 and
              fully eliminated above $98,309. Claimed on Schedule 1, line 30100.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100">Pension Income Amount</h3>
            <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Up to <strong className="tabular-nums">$2,000</strong> of eligible pension income (RRIF, annuities, defined benefit
              pension) qualifies for a credit at 15%, saving up to $300 in federal tax. OAS and CPP do not qualify as
              eligible pension income for this credit. Claimed on Schedule 1, line 31400.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100">Tuition Tax Credit</h3>
            <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Students can claim eligible tuition fees paid in 2025 as a non-refundable credit at 15%. Unused portions
              can be carried forward or transferred to a parent, grandparent, or spouse — up to a lifetime transfer
              limit of <strong className="tabular-nums">$5,000</strong>. Requires a T2202 from your educational institution.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100">First-Time Home Buyers&apos; Tax Credit</h3>
            <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              If you purchased a qualifying home in 2025 and neither you nor your spouse owned a principal residence in
              any of the preceding four years, you can claim <strong className="tabular-nums">$10,000</strong> on line 31270,
              producing a <strong className="tabular-nums">$1,500</strong> federal credit (at 15%). Claimed on Schedule 1.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100">Home Accessibility Tax Credit</h3>
            <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              For qualifying renovation costs that improve accessibility for a senior or person with a disability.
              The credit applies to up to <strong className="tabular-nums">$20,000</strong> of eligible expenses, producing up
              to $3,000 in federal credit. Claimed on Schedule 1, line 31285. Keep all receipts.
            </p>
          </div>
        </div>
      </section>

      {/* Refundable credits */}
      <section id="refundable">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Refundable credits for 2025
        </h2>
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100">GST/HST Credit</h3>
            <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              A quarterly refundable credit to offset GST/HST paid by lower- and modest-income Canadians. The amount
              depends on your 2025 net income and family size. You receive it automatically by filing your T1 — no
              separate application. Delivered quarterly starting July 2026 based on your 2025 return.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100">Canada Child Benefit (CCB)</h3>
            <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              A monthly tax-free payment for families with children under 18. Calculated on 2025 adjusted family net
              income; new amounts take effect July 2026. Both parents must file their 2025 returns for CCB to be
              calculated correctly. Late filing can interrupt payments.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100">Canada Workers Benefit (CWB)</h3>
            <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              A refundable credit for low-income workers (not self-employed) with earned income above a minimum
              threshold. For 2025, the basic CWB phases out at approximately $33,000 (single) or $43,000 (families).
              Advance CWB payments were issued during 2025; the final amount is reconciled on your T1. Claimed on
              Schedule 6.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100">Climate Action Incentive Payment (CAIP)</h3>
            <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Available only to residents of Ontario, Manitoba, Saskatchewan, and Alberta — provinces under the federal
              carbon pricing backstop. Delivered quarterly via direct deposit. The amount depends on your province and
              family size. No action required beyond filing your T1.
            </p>
          </div>
        </div>
      </section>

      {/* Deductions */}
      <section id="deductions">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Commonly missed deductions for 2025
        </h2>
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100">Childcare Expenses</h3>
            <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Deductible from the income of the <strong>lower-income spouse</strong> in almost all cases. The 2025 limits
              are <strong className="tabular-nums">$8,000</strong> per child under 7 and{' '}
              <strong className="tabular-nums">$5,000</strong> per child ages 7–16. Eligible expenses include daycare, babysitters,
              day camps, boarding schools, and before/after-school care. Keep all receipts — CRA may request them.
              Claimed on Form T778.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100">Employment Expenses (T2200)</h3>
            <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Salaried and commission employees required by their employer to pay certain expenses without reimbursement
              can deduct them on Form T777. Eligible expenses include home office costs, vehicle use, supplies, and
              certain professional dues. Requires a signed T2200 from your employer before filing.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100">Moving Expenses</h3>
            <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Deductible if you moved at least 40 kilometres closer to a new place of work or school and earned income
              at the new location in 2025. Eligible costs include moving truck, travel, temporary accommodation, and
              storage. Deduction is limited to net income earned at the new location. Claimed on Form T1-M.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100">Union and Professional Dues</h3>
            <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Annual dues paid to professional associations and unions required for employment are deductible from
              income. Claimed on line 21200 of the T1. Often auto-populated from your T4 (box 44) but verify the
              amount is correct and include any additional dues not reflected on the slip.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100">Investment Expenses</h3>
            <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Interest paid on money borrowed to earn investment income (other than tax shelters), and investment
              counsel fees paid to manage a non-registered portfolio, are deductible. Claimed on line 22100. Note:
              fees inside registered accounts (RRSP, TFSA) are not deductible.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100">Northern Residents Deduction</h3>
            <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              For residents who lived in a prescribed northern zone for at least six consecutive months beginning or
              ending in 2025. Includes all of Yukon, Northwest Territories, and Nunavut, plus many remote northern
              communities in other provinces. The residency deduction is <strong className="tabular-nums">$11/day</strong> for the
              northern zone (up to <strong className="tabular-nums">$4,015</strong> for a full year). A travel deduction is also
              available for up to two trips per year. Claimed on Form T2222.
            </p>
          </div>
        </div>
      </section>

      {/* Scope note */}
      <section id="scope-note">
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            <strong className="font-medium text-neutral-700 dark:text-neutral-300">Provincial credits not listed here:</strong>{' '}
            Ontario Trillium Benefit, BC Climate Action Tax Credit (cancelled 2025), Alberta Child Benefit, Quebec
            Solidarity Credit, Manitoba Home Affordability Tax Credit, and others are administered provincially.
            Refer to your province&apos;s tax agency for amounts and eligibility.
          </p>
        </div>
      </section>
    </SubPageTemplate>
  );
}
