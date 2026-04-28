import type { Metadata } from 'next';
import SubPageTemplate from '@/components/SubPageTemplate';
import { getFAQs } from '@/lib/content/faqs';

const BASE = 'https://mapletaxcalculator.ca';

export const metadata: Metadata = {
  title: '2025 T1 tax slips checklist — every slip you need | MapleTax Calculator',
  description:
    'Complete checklist of 2025 T-slips and documents before filing: T4, T5, T3, RRSP receipts, medical, charitable, and more.',
  alternates: {
    canonical: `${BASE}/tax-filing-2025/slips-checklist`,
    languages: {
      en: `${BASE}/tax-filing-2025/slips-checklist`,
      fr: `${BASE}/fr/tax-filing-2025/slips-checklist`,
      'x-default': `${BASE}/tax-filing-2025/slips-checklist`,
    },
  },
};

const SLIPS = [
  { slip: 'T4', reports: 'Employment income, source deductions (income tax, CPP, EI)', who: 'Anyone employed' },
  { slip: 'T4A', reports: 'Pension, annuity, scholarships, self-employment fees, CERB', who: 'Pensioners, freelancers, students' },
  { slip: 'T4A(P)', reports: 'CPP/QPP benefit payments', who: 'CPP or QPP recipients' },
  { slip: 'T4A(OAS)', reports: 'Old Age Security payments', who: 'OAS recipients' },
  { slip: 'T4E', reports: 'Employment Insurance benefits', who: 'EI recipients' },
  { slip: 'T4RSP', reports: 'RRSP income (withdrawals, conversions)', who: 'Anyone who withdrew from an RRSP' },
  { slip: 'T4RIF', reports: 'RRIF income payments', who: 'RRIF holders' },
  { slip: 'T5', reports: 'Investment income: interest, eligible and non-eligible dividends', who: 'Anyone with taxable investment or savings accounts' },
  { slip: 'T3', reports: 'Trust income distributions from mutual funds and ETFs', who: 'Non-registered fund and ETF investors' },
  { slip: 'T5008', reports: 'Proceeds of securities dispositions (capital gains/losses)', who: 'Anyone who sold investments in 2025' },
  { slip: 'T5013', reports: 'Partnership income and losses', who: 'Partnership members' },
  { slip: 'T2202', reports: 'Tuition and enrolment amounts for post-secondary education', who: 'Post-secondary students' },
  { slip: 'T2200', reports: 'Declaration of Conditions of Employment (signed by employer)', who: 'Employees claiming home office or vehicle expenses' },
  { slip: 'T1006', reports: 'First Home Savings Account (FHSA) contributions', who: 'FHSA account holders' },
  { slip: 'RRSP contribution receipts', reports: 'Contributions made Jan 1 – Mar 1, 2026 (deductible on 2025 return under the 60-day rule)', who: 'Anyone who contributed to an RRSP in early 2026' },
  { slip: 'Medical expense receipts', reports: 'Eligible medical costs for the 12-month period you choose', who: 'Anyone claiming the medical expense credit' },
  { slip: 'Charitable donation receipts', reports: 'Official receipts from registered charities', who: 'Anyone claiming the charitable donation credit' },
  { slip: 'Childcare receipts', reports: 'Payments to daycare centres, babysitters, camps', who: 'Parents claiming the childcare deduction' },
  { slip: 'T777 (Employment Expenses form)', reports: 'Employment expenses calculation form — not a slip, but required alongside T2200', who: 'Employees with a signed T2200 claiming home office or vehicle costs' },
];

const FAQS = getFAQs(['tf25-missing-slip', 'tf25-t3-timing', 'tf25-file-without-slips', 'tf25-autofill']);

export default function SlipsChecklistPage() {
  return (
    <SubPageTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Tax Filing 2025', href: '/tax-filing-2025' },
        { label: 'Slips Checklist', href: '/tax-filing-2025/slips-checklist' },
      ]}
      h1="2025 tax slips checklist — everything you need before you start"
      intro="You don't need all of these — only the slips relevant to your situation. Missing a slip? CRA's Auto-fill My Return feature inside any NETFILE software will pull all slips CRA has on file for you."
      tableOfContents={[
        { id: 'employment', label: 'Employment income' },
        { id: 'investment', label: 'Investment income' },
        { id: 'government', label: 'Government benefits' },
        { id: 'registered', label: 'Registered accounts' },
        { id: 'education', label: 'Education' },
        { id: 'deductions', label: 'Deduction receipts' },
        { id: 'all-slips', label: 'Full slip list' },
      ]}
      commonMistakes={[
        {
          title: 'Forgetting RRSP receipts for early-2026 contributions',
          body: 'Contributions made January 1 – March 1, 2026 can be deducted on your 2025 return. RRSP issuers have until March 31 to send receipts, so they often arrive late. Check your mail and online account in late March.',
        },
        {
          title: 'Missing T3 slips',
          body: 'T3 slips for mutual funds and ETFs arrive late — often March or even early April. Many filers overlook them because they don\'t come with regular mail. Download directly from your investment platform.',
        },
        {
          title: 'Filing without a signed T2200',
          body: 'You cannot claim home office or vehicle expenses as an employee without a T2200 signed by your employer before you file. Request it early — employers can be slow.',
        },
      ]}
      quickWins={[
        {
          title: 'Use Auto-fill My Return',
          body: 'Log in with your CRA My Account credentials inside any NETFILE software to automatically import T4, T5, T3, and other slips. Saves 20–30 minutes of manual entry and catches slips you didn\'t know about.',
        },
        {
          title: 'Get T5008 from your investment portal',
          body: 'Your brokerage generates the T5008 internally — download it directly from your investment account online rather than waiting for a paper copy.',
        },
        {
          title: 'Check March 31 for RRSP receipts',
          body: 'RRSP contribution receipts for January–March 2026 contributions must be issued by March 31. Set a calendar reminder to check your account and mailbox.',
        },
      ]}
      relatedSubPages={[
        { title: 'Free NETFILE Software', description: 'File for free with Auto-fill support', href: '/tax-filing-2025/free-software' },
        { title: 'Credits & Deductions', description: 'What to claim on your return', href: '/tax-filing-2025/credits-and-deductions' },
        { title: 'Amend a Return', description: 'Fix a missing slip after filing', href: '/tax-filing-2025/amend-a-return' },
      ]}
      faqs={FAQS}
      pageMetadata={{
        title: '2025 T1 tax slips checklist | MapleTax Calculator',
        description: 'Complete checklist of 2025 T-slips before filing.',
        canonical: `${BASE}/tax-filing-2025/slips-checklist`,
      }}
    >
      {/* Full slip table */}
      <section id="all-slips">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Complete 2025 slip list
        </h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-left dark:border-neutral-800 dark:bg-neutral-900">
                <th className="px-4 py-3 font-medium text-neutral-700 dark:text-neutral-300">Slip / document</th>
                <th className="px-4 py-3 font-medium text-neutral-700 dark:text-neutral-300">What it reports</th>
                <th className="px-4 py-3 font-medium text-neutral-700 dark:text-neutral-300">Who gets it</th>
              </tr>
            </thead>
            <tbody>
              {SLIPS.map((row, i) => (
                <tr
                  key={row.slip}
                  className={`border-b border-neutral-100 dark:border-neutral-800 ${
                    i % 2 === 0 ? 'bg-white dark:bg-neutral-950' : 'bg-neutral-50 dark:bg-neutral-900'
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-neutral-900 dark:text-neutral-100 whitespace-nowrap">
                    {row.slip}
                  </td>
                  <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">{row.reports}</td>
                  <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">{row.who}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </SubPageTemplate>
  );
}
