import type { Metadata } from 'next';
import SubPageTemplate from '@/components/SubPageTemplate';
import KeyDatesTimeline from '@/components/KeyDatesTimeline';
import { getFAQs } from '@/lib/content/faqs';

const BASE = 'https://mapletaxcalculator.ca';

export const metadata: Metadata = {
  title: 'Key tax dates for Canadians in 2026 | MapleTax Calculator',
  description:
    'Complete list of 2026 Canadian tax deadlines: RRSP, TFSA, instalment due dates, T1 filing deadline, and year-end cutoffs. Timeline highlights the next upcoming date.',
  alternates: {
    canonical: `${BASE}/tax-planning-2026/key-dates`,
    languages: {
      en: `${BASE}/tax-planning-2026/key-dates`,
      fr: `${BASE}/fr/tax-planning-2026/key-dates`,
      'x-default': `${BASE}/tax-planning-2026/key-dates`,
    },
  },
  openGraph: {
    title: 'Key tax dates for Canadians in 2026 | MapleTax Calculator',
    description: '2026 tax deadlines: RRSP, TFSA, instalments, T1 filing, and year-end cutoffs.',
    url: `${BASE}/tax-planning-2026/key-dates`,
  },
};

const FAQS = getFAQs([
  'tp26-rrsp-deadline-2026',
  'tp26-netfile-opens',
  'tp26-t3-before-filing',
  'tp26-self-employed-balance-due',
]);

export default function KeyDates2026Page() {
  return (
    <SubPageTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Tax Planning 2026', href: '/tax-planning-2026' },
        { label: 'Key Dates 2026', href: '/tax-planning-2026/key-dates' },
      ]}
      h1="Key tax dates for Canadians in 2026"
      intro={
        "The timeline below covers the major 2026 Canadian tax deadlines — from the January 1 TFSA room reset to the March 2027 RRSP deadline. Past dates are dimmed; the next upcoming deadline is highlighted.\n\n" +
        "Two dates most Canadians get wrong: the RRSP deadline is NOT December 31 — contributions made by March 2, 2027 count for 2026. And self-employed filers get an extended filing deadline of June 15, 2026 for the 2025 return, but their balance owing is still due April 30."
      }
      tableOfContents={[
        { id: 'timeline', label: 'Full timeline' },
        { id: 'instalment-dates', label: 'Quarterly instalment dates' },
        { id: 'filing-deadlines', label: 'Filing and payment deadlines' },
        { id: 'year-end-hard-stops', label: 'Year-end hard stops' },
      ]}
      commonMistakes={[
        {
          title: 'Self-employed: paying the balance owing late because of the June 15 filing extension',
          body: 'The June 15 filing deadline extends the time to file the 2025 return — it does NOT extend the deadline to pay the balance owing. Interest on unpaid 2025 tax starts accruing from May 1, 2026 for all filers including self-employed.',
        },
        {
          title: 'Waiting for T3 slips before filing',
          body: 'T3 slips from mutual funds and ETFs can arrive as late as March 31 or even April — after the RRSP contribution deadline in many cases. If you hold these in a non-registered account, filing may need to wait. Consider requesting an extension rather than filing with missing information and then amending.',
        },
        {
          title: 'Missing the Q4 instalment on December 15, not December 31',
          body: 'The fourth quarterly instalment is due December 15 — two weeks before year-end. Interest on underpaid instalments accrues from the due date, not from April 30. The December 15 date is easy to miss while focused on year-end planning.',
        },
      ]}
      quickWins={[
        {
          title: 'Set calendar reminders for all four instalment dates in January',
          body: 'Schedule March 15, June 15, September 15, and December 15 with a 1-week advance reminder. Automate payments through CRA My Business Account so they run without manual action.',
        },
        {
          title: "File your 2025 return as early as possible — even if you can't pay yet",
          body: 'Filing early starts the refund clock, establishes CCB and GST credit entitlements, and gives CRA time to process before May 1. If you owe money and can\'t pay, file anyway — the late-filing penalty is far more expensive than interest alone.',
        },
        {
          title: 'Mark December 31 as the TFSA and FHSA deadline, not the RRSP deadline',
          body: 'Most year-end urgency should focus on TFSA (use this year\'s $7,000 room), FHSA ($8,000 room), and charitable donations — all hard December 31 cutoffs. The RRSP can wait until March 2, 2027.',
        },
      ]}
      relatedSubPages={[
        { title: 'Self-Employed', description: 'Instalment calculator and due dates', href: '/tax-planning-2026/self-employed' },
        { title: 'Year-End Checklist', description: 'December 31 action list', href: '/tax-planning-2026/year-end-checklist' },
        { title: 'RRSP', description: 'RRSP contribution strategy and deadline', href: '/tax-planning-2026/rrsp' },
      ]}
      faqs={FAQS}
      pageMetadata={{
        title: 'Key tax dates for Canadians in 2026 | MapleTax Calculator',
        description: '2026 tax deadlines: RRSP, TFSA, instalments, filing, and year-end cutoffs.',
        canonical: `${BASE}/tax-planning-2026/key-dates`,
      }}
    >
      {/* Timeline */}
      <section id="timeline">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Full timeline
        </h2>
        <div className="mt-4">
          <KeyDatesTimeline />
        </div>
      </section>

      {/* Instalment dates */}
      <section id="instalment-dates">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Quarterly instalment dates
        </h2>
        <div className="mt-3 space-y-3 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>Quarterly instalments are required if net tax owing exceeds <strong>$3,000</strong> (or <strong>$1,800</strong> in Quebec) in 2026 and in at least one of 2024 or 2025. CRA sends instalment reminders in February and August — receiving one means you likely must pay.</p>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-700">
                  <th className="py-2 pr-6 text-left font-medium text-neutral-900 dark:text-neutral-100">Quarter</th>
                  <th className="py-2 text-left font-medium text-neutral-900 dark:text-neutral-100">Due date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {[
                  ['Q1', 'March 15, 2026'],
                  ['Q2', 'June 15, 2026'],
                  ['Q3', 'September 15, 2026'],
                  ['Q4', 'December 15, 2026'],
                ].map(([q, date]) => (
                  <tr key={q}>
                    <td className="py-2 pr-6 font-medium text-neutral-800 dark:text-neutral-200">{q}</td>
                    <td className="py-2 text-neutral-600 dark:text-neutral-400">{date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>Interest on underpaid instalments is charged from the due date — not from April 30. If cumulative underpayment interest exceeds $1,000, CRA adds a 50% excess-interest surcharge on top. Use the{' '}
            <a href="/tax-planning-2026/self-employed" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-75">instalment calculator</a>{' '}
            on the Self-Employed page to estimate quarterly amounts using the prior-year method.
          </p>
        </div>
      </section>

      {/* Filing and payment deadlines */}
      <section id="filing-deadlines">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Filing and payment deadlines
        </h2>
        <div className="mt-3 space-y-3 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p><strong>April 30, 2026:</strong> filing deadline for most Canadians on their 2025 T1 return. Also the deadline for the 2025 balance owing — for all filers, including self-employed. Interest on unpaid 2025 tax starts May 1.</p>
          <p><strong>June 15, 2026:</strong> extended filing deadline for self-employed individuals and their spouses/common-law partners. Balance owing is still due April 30 — the extension is for the paperwork only.</p>
          <p><strong>March 2, 2027:</strong> RRSP contribution deadline for the 2026 tax year. Contributions made in the first 60 days of 2027 can be deducted on the 2026 return.</p>
          <p>For the 2025 return filing guide including NETFILE software options, visit the{' '}
            <a href="/tax-filing-2025" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-75">Tax Filing 2025</a>{' '}
            section.
          </p>
        </div>
      </section>

      {/* Year-end hard stops */}
      <section id="year-end-hard-stops">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Year-end hard stops — December 31
        </h2>
        <div className="mt-3 space-y-3 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>The following actions must be completed by December 31 to count for the 2026 tax year. There are no grace periods for any of these:</p>
          <ul className="mt-2 space-y-2 pl-4 list-disc">
            <li><strong>TFSA contributions</strong> — the 2026 room ($7,000 plus carry-forward) cannot be accessed retroactively. Unused room from 2026 carries forward to 2027.</li>
            <li><strong>FHSA contributions</strong> — $8,000 annual limit (up to $16,000 with carry-forward from prior year). Hard December 31 deadline.</li>
            <li><strong>RESP contributions</strong> — CESG is earned in the calendar year the contribution is made. Contributions after December 31 count toward 2027 CESG eligibility.</li>
            <li><strong>Charitable donations</strong> — must be received (not postmarked) by December 31. No 60-day extension like RRSP.</li>
            <li><strong>Tax-loss selling</strong> — trades must settle by December 31. For Canadian equities (T+1 settlement), the last trading day is approximately December 30.</li>
            <li><strong>Business expense timing</strong> — deductible expenses paid or incurred by December 31 reduce 2026 self-employment income.</li>
          </ul>
          <p className="mt-3">For a complete action list organized by category, see the{' '}
            <a href="/tax-planning-2026/year-end-checklist" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-75">Year-End Checklist</a>.
          </p>
        </div>
      </section>
    </SubPageTemplate>
  );
}
