import type { Metadata } from 'next';
import SubPageTemplate from '@/components/SubPageTemplate';
import InstalmentCalculator from '@/components/InstalmentCalculator';
import { getFAQs } from '@/lib/content/faqs';

const BASE = 'https://mapletaxcalculator.ca';

export const metadata: Metadata = {
  title: 'Tax planning for self-employed Canadians 2026 | MapleTax Calculator',
  description:
    'Quarterly instalments, double CPP, GST/HST, home office, and vehicle deductions for self-employed Canadians. Instalment calculator included.',
  alternates: {
    canonical: `${BASE}/tax-planning-2026/self-employed`,
    languages: {
      en: `${BASE}/tax-planning-2026/self-employed`,
      fr: `${BASE}/fr/tax-planning-2026/self-employed`,
      'x-default': `${BASE}/tax-planning-2026/self-employed`,
    },
  },
  openGraph: {
    title: 'Tax planning for self-employed Canadians 2026 | MapleTax Calculator',
    description: 'Quarterly instalments, double CPP, GST/HST, home office, vehicle deductions.',
    url: `${BASE}/tax-planning-2026/self-employed`,
  },
};

const FAQS = getFAQs([
  'tp26-instalment-start',
  'tp26-cpp-self-employed',
  'tp26-gst-register',
  'tp26-home-office-secondary',
  'tp26-vehicle-records',
]);

export default function SelfEmployedPage() {
  return (
    <SubPageTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Tax Planning 2026', href: '/tax-planning-2026' },
        { label: 'Self-Employed', href: '/tax-planning-2026/self-employed' },
      ]}
      h1="Tax planning for self-employed Canadians in 2026"
      intro={
        "Being your own employer has real tax advantages — business expense deductions, the ability to time income and expenses, and RRSP contributions made from self-employment income. The 2026 RRSP dollar limit of $33,810 is built on 18% of prior-year earned income, and self-employment income counts as earned income.\n\n" +
        "It also comes with obligations employees don't face: quarterly instalments, CPP at double the employee rate, GST/HST registration and remittance, and a larger-than-expected April bill for anyone who hasn't set money aside throughout the year. Plan now — corrections are expensive."
      }
      tableOfContents={[
        { id: 'instalments', label: 'Quarterly tax instalments' },
        { id: 'cpp', label: 'Self-employed CPP' },
        { id: 'gst-hst', label: 'GST/HST registration and remittance' },
        { id: 'expenses', label: 'Deductible business expenses' },
        { id: 'home-office', label: 'Home office deduction' },
        { id: 'vehicle', label: 'Vehicle deduction' },
        { id: 'year-end-timing', label: 'Year-end income and expense timing' },
      ]}
      miniTool={
        <div>
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
            Calculate your 2026 quarterly instalments using the prior-year method.
          </p>
          <InstalmentCalculator />
        </div>
      }
      commonMistakes={[
        {
          title: 'Not setting aside money for CPP throughout the year',
          body: 'Self-employed CPP at double the employee rate frequently arrives as a shock in April. Rough rule: set aside 30–35% of net self-employment income throughout the year to cover income tax and CPP together.',
        },
        {
          title: 'Skipping quarterly instalments in year one ("I\'ll pay it all in April")',
          body: 'Interest on underpaid instalments compounds daily from the due date. If cumulative underpayment interest exceeds $1,000, CRA also charges a 50% excess-interest surcharge — making large instalment gaps very expensive.',
        },
        {
          title: 'No vehicle logbook',
          body: '"I drive mostly for business" is not a substitute for records. CRA requires contemporaneous logs — date, destination, purpose, and km for each business trip. A reconstructed logbook is difficult to defend.',
        },
      ]}
      quickWins={[
        {
          title: 'Open a dedicated business bank account and card on day one',
          body: 'Mixing personal and business transactions creates a costly reconstruction problem. A dedicated account creates a natural paper trail and makes expense tracking dramatically easier.',
        },
        {
          title: 'Automate quarterly instalment payments via CRA My Business Account',
          body: 'Schedule all four due dates in January and let them run automatically. Missing even one by a week triggers daily compound interest.',
        },
        {
          title: 'The employer half of CPP1 is deductible from income',
          body: 'Self-employed individuals can deduct the employer portion of CPP1 contributions on line 22200 of the T1 — up to $4,230 at maximum 2026 earnings. It reduces taxable income dollar-for-dollar, not just as a credit.',
        },
      ]}
      relatedSubPages={[
        { title: 'Life Events', description: 'Tax impact of starting a business', href: '/tax-planning-2026/life-events' },
        { title: 'Key Dates 2026', description: 'Instalment and filing deadlines', href: '/tax-planning-2026/key-dates' },
        { title: 'Credits & Deductions', description: 'Business expense deep-dive', href: '/tax-planning-2026/credits-and-deductions' },
      ]}
      faqs={FAQS}
      pageMetadata={{
        title: 'Tax planning for self-employed Canadians 2026 | MapleTax Calculator',
        description: 'Instalments, double CPP, GST/HST, home office, vehicle deductions.',
        canonical: `${BASE}/tax-planning-2026/self-employed`,
      }}
    >
      {/* Instalments */}
      <section id="instalments">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Quarterly tax instalments
        </h2>
        <div className="mt-3 space-y-3 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>Instalments are required when net tax owing exceeds <strong>$3,000</strong> (or <strong>$1,800</strong> in Quebec) in the current year AND in at least one of the two prior years. CRA sends instalment reminders in February and August — receiving one means you likely must pay.</p>
          <p><strong>Prior-year method:</strong> pay 25% of last year's net tax each quarter. Safe — no interest if you pay the exact amount CRA calculates. <strong>Current-year method:</strong> estimate current-year tax and pay in four equal instalments — useful if income dropped significantly but creates interest risk if underestimated.</p>
          <p>Due dates: <strong>March 15, June 15, September 15, December 15</strong>. Interest on underpaid instalments is charged from the due date, not from April 30. If cumulative interest exceeds $1,000, CRA adds a 50% excess-interest surcharge.</p>
        </div>
      </section>

      {/* CPP */}
      <section id="cpp">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Self-employed CPP
        </h2>
        <div className="mt-3 space-y-3 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>Self-employed individuals pay both the employee and employer portions of CPP:</p>
          <ul className="mt-2 space-y-1 pl-4 list-disc">
            <li><strong>CPP1:</strong> 5.95% + 5.95% = <strong>11.9%</strong> on net self-employment income between $3,500 and $74,600 (YMPE). Maximum contribution: approximately $8,461.</li>
            <li><strong>CPP2:</strong> 4% + 4% = <strong>8%</strong> on income between $74,600 and $85,000. Maximum: approximately $832.</li>
          </ul>
          <p>Total maximum CPP for self-employed individuals at maximum 2026 earnings: approximately <strong>$9,293</strong> — before income tax.</p>
          <p>The employer half of CPP1 (not CPP2) is deductible on line 22200 — it reduces taxable income, not just provides a credit. The employee half of CPP1 generates a 15% non-refundable credit like it does for employees.</p>
        </div>
      </section>

      {/* GST/HST */}
      <section id="gst-hst">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          GST/HST registration and remittance
        </h2>
        <div className="mt-3 space-y-3 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>GST/HST registration is mandatory once you exceed <strong>$30,000 in taxable revenues</strong> in any four consecutive calendar quarters. Below that threshold you are a "small supplier" — registration is optional.</p>
          <p>Voluntary registration before $30,000 lets you claim <strong>Input Tax Credits (ITCs)</strong> to recover GST/HST paid on business expenses — worthwhile if you have significant up-front costs.</p>
          <p>Filing frequency options: <strong>annual</strong> (under $1.5M in revenues), quarterly, or monthly. Quebec businesses must also register for QST (9.975%) separately with Revenu Québec.</p>
        </div>
      </section>

      {/* Expenses */}
      <section id="expenses">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Deductible business expenses
        </h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-700">
                <th className="py-2 pr-4 text-left font-medium text-neutral-900 dark:text-neutral-100">Expense</th>
                <th className="py-2 text-left font-medium text-neutral-900 dark:text-neutral-100">Key rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {[
                ['Home office', 'Detailed method: actual costs × business-use %; proportion of home used exclusively for business'],
                ['Vehicle', 'Business km ÷ total km; logbook is mandatory — CRA will not accept estimates'],
                ['Meals and entertainment', '50% of eligible meals with a business purpose'],
                ['Professional development', 'Courses, books, conferences directly related to your business'],
                ['Software and subscriptions', 'Deductible if used for business; CCA Class 12 for software licenses'],
                ['Equipment and tools', 'Capital Cost Allowance (CCA) — deducted over multiple years, not fully in year of purchase'],
                ['Health insurance premiums', 'Self-employed can deduct eligible health/dental premiums as a business expense'],
                ['Professional fees', 'Accounting, legal, business consulting'],
                ['Advertising and marketing', 'Business website, digital ads, printed materials'],
              ].map(([expense, rule]) => (
                <tr key={expense}>
                  <td className="py-2 pr-4 font-medium text-neutral-800 dark:text-neutral-200 align-top">{expense}</td>
                  <td className="py-2 text-neutral-600 dark:text-neutral-400 align-top">{rule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Home office */}
      <section id="home-office">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Home office deduction
        </h2>
        <div className="mt-3 space-y-3 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>Business-use percentage = business space area ÷ total home area. Eligible expenses: heat, electricity, water, internet, rent, and maintenance of the business area.</p>
          <p><strong>Mortgage principal is not deductible.</strong> Mortgage interest and property taxes are, at the business-use percentage.</p>
          <p>The home office deduction cannot create or increase a business loss — it can reduce business income to zero but not below. Unused home-office amounts carry forward to future years.</p>
          <p>You must use the space either principally for business (more than 50% of your working time) or exclusively for business and regularly for meeting clients. If you also have a rented office, the home office deduction is more difficult to defend unless you spend the majority of your working time there.</p>
        </div>
      </section>

      {/* Vehicle */}
      <section id="vehicle">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Vehicle deduction
        </h2>
        <div className="mt-3 space-y-3 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>A contemporaneous logbook is mandatory. Record for each business trip: date, destination, business purpose, and kilometres. At year-end, total business km ÷ total km = deductible percentage.</p>
          <p>The deductible percentage applies to both operating costs (fuel, insurance, maintenance) and CCA on the vehicle purchase price. The vehicle cost eligible for CCA is capped at a prescribed amount (verify the 2026 passenger vehicle cost limit at canada.ca).</p>
          <p>For <strong>leased vehicles</strong>: monthly deductible lease payments are also capped at a prescribed limit — verify the 2026 limit.</p>
        </div>
      </section>

      {/* Year-end timing */}
      <section id="year-end-timing">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Year-end income and expense timing
        </h2>
        <div className="mt-3 space-y-3 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>Cash-basis self-employed individuals have more timing flexibility than employees:</p>
          <ul className="mt-2 space-y-1 pl-4 list-disc">
            <li><strong>Defer December invoices to January</strong> if your income is unusually high this year — defers the tax one year.</li>
            <li><strong>Accelerate deductible purchases before December 31</strong>: prepaid software, equipment purchases, advertising commitments.</li>
            <li><strong>RRSP contributions</strong> (with the March 2027 deadline) reduce net self-employment income dollar-for-dollar — one of the most efficient tax-reduction tools for high-income self-employed individuals.</li>
          </ul>
          <p className="mt-3 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900">
            <strong>Incorporation decision:</strong> whether to incorporate depends on income level, need to retain earnings in the business, and tolerance for additional compliance. Corporate tax rates (approximately 9–12% on the first $500,000 of active business income) can be dramatically lower than personal top marginal rates — but the savings only matter if you can leave money inside the corporation. This page does not cover corporate tax. Consult a CPA before incorporating.
          </p>
        </div>
      </section>
    </SubPageTemplate>
  );
}
