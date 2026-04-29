import type { Metadata } from 'next';
import SubPageTemplate from '@/components/SubPageTemplate';
import { getFAQs } from '@/lib/content/faqs';

const BASE = 'https://mapletaxcalculator.ca';

export const metadata: Metadata = {
  title: 'Tax filing deadlines and penalties 2025 | MapleTax Calculator',
  description:
    'April 30, 2026 is the deadline to file your 2025 tax return. Self-employed filers have until June 15. Miss the deadline and owe money? A 5% penalty starts immediately.',
  alternates: {
    canonical: `${BASE}/tax-filing-2025/deadlines-and-penalties`,
    languages: {
      en: `${BASE}/tax-filing-2025/deadlines-and-penalties`,
      'x-default': `${BASE}/tax-filing-2025/deadlines-and-penalties`,
    },
  },
};

const FAQS = getFAQs([
  'tf25-deadline',
  'tf25-must-file',
  'tf25-late-penalty',
  'tf25-cant-pay',
  'tf25-no-penalty-refund',
]);

export default function DeadlinesAndPenaltiesPage() {
  return (
    <SubPageTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Tax Filing 2025', href: '/tax-filing-2025' },
        { label: 'Deadlines & Penalties', href: '/tax-filing-2025/deadlines-and-penalties' },
      ]}
      h1="2025 tax filing deadlines and penalties"
      intro="Your 2025 T1 return is due April 30, 2026. Self-employed Canadians get until June 15 — but any balance owing is still due April 30. Miss the deadline with a balance and a 5% penalty applies the same day."
      tableOfContents={[
        { id: 'key-dates',        label: 'Key deadlines at a glance' },
        { id: 'payment-deadline', label: 'Payment deadline vs. filing deadline' },
        { id: 'late-penalty',     label: 'Late-filing penalty' },
        { id: 'interest',         label: 'Interest on overdue balances' },
        { id: 'self-employed',    label: 'Self-employed filing deadline' },
        { id: 'who-must-file',    label: 'Who must file' },
        { id: 'cant-pay',         label: "If you can't pay" },
      ]}
      commonMistakes={[
        {
          title: 'Assuming the June 15 extension applies to the balance owing',
          body: 'Self-employed filers get until June 15 to file, but any balance owing is still due April 30. Interest accrues from May 1 regardless of your filing deadline. File by June 15 if you can, but pay your estimated balance by April 30.',
        },
        {
          title: '"I\'m getting a refund — no rush."',
          body: 'There is no penalty for filing late when you have a refund, but delaying your return delays your refund and can interrupt benefit payments like the GST/HST credit and Canada Child Benefit. CRA uses the prior-year return to calculate current-year benefits.',
        },
        {
          title: 'Not filing because you can\'t afford to pay',
          body: 'Filing and paying are separate. File your return on time to stop the late-filing penalty from accruing. Then deal with the balance: a payment arrangement, partial payment, or taxpayer relief application can all reduce what you ultimately owe.',
        },
      ]}
      quickWins={[
        {
          title: 'Set a calendar reminder for April 30, 2026',
          body: 'The deadline is the same every year (April 30, or the next business day if it falls on a weekend). Setting a recurring annual reminder means you never miss the filing date.',
        },
        {
          title: 'Pay an estimate if your return isn\'t ready',
          body: 'If your slips haven\'t arrived by April 30, pay a rough estimate of what you owe. This reduces the balance interest accrues on. Adjust after you file — any overpayment comes back as a refund.',
        },
        {
          title: 'File even if you owe more than you can pay',
          body: 'Filing on time costs nothing if you can\'t pay. The 5% late-filing penalty only applies when you both owe money and file late. Filing immediately stops that penalty — only interest continues on the unpaid balance.',
        },
      ]}
      relatedSubPages={[
        { title: 'Filing Late?', description: 'Estimate your penalty and next steps', href: '/tax-filing-2025/late-filing' },
        { title: "Can't Pay?", description: 'Payment arrangements and relief options', href: '/tax-filing-2025/cant-pay' },
        { title: 'Key Dates 2026', description: 'Instalment and filing timeline', href: '/tax-planning-2026/key-dates' },
      ]}
      faqs={FAQS}
      pageMetadata={{
        title: '2025 tax filing deadlines and penalties | MapleTax Calculator',
        description: 'April 30, 2026 filing deadline, self-employed June 15 extension, and late-filing penalty rules.',
        canonical: `${BASE}/tax-filing-2025/deadlines-and-penalties`,
      }}
    >
      {/* Key dates */}
      <section id="key-dates">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Key deadlines at a glance
        </h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                <th className="px-4 py-3 text-left font-medium text-neutral-500">Date</th>
                <th className="px-4 py-3 text-left font-medium text-neutral-500">What is due</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              <tr>
                <td className="px-4 py-3 font-medium tabular-nums whitespace-nowrap">March 3, 2026</td>
                <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">RRSP contribution deadline for 2025 deduction</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium tabular-nums whitespace-nowrap">April 30, 2026</td>
                <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
                  <strong>Filing deadline</strong> for most Canadians. Balance owing due. Late-filing penalty starts May 1.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium tabular-nums whitespace-nowrap">June 15, 2026</td>
                <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
                  Filing deadline for self-employed individuals and their spouses/partners.{' '}
                  <strong>Balance owing still due April 30.</strong>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium tabular-nums whitespace-nowrap">January 29, 2027</td>
                <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">NETFILE closes for 2025 returns</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Payment vs filing */}
      <section id="payment-deadline">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Payment deadline vs. filing deadline
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            These are two separate obligations. <strong>Filing deadline</strong> is when your completed T1 return must
            be submitted. <strong>Payment deadline</strong> is when any balance owing must be paid. For most Canadians,
            both are April 30, 2026.
          </p>
          <p>
            For self-employed filers, the filing deadline extends to June 15, 2026 — but the payment deadline
            remains April 30. Interest at CRA&apos;s prescribed rate begins compounding daily from May 1 on any unpaid
            balance, regardless of whether you have until June 15 to file.
          </p>
          <p>
            If April 30 falls on a weekend or statutory holiday, the deadline shifts to the next business day. In 2026,
            April 30 is a Thursday — the deadline is April 30.
          </p>
        </div>
      </section>

      {/* Late-filing penalty */}
      <section id="late-penalty">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Late-filing penalty
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            If you file late <em>and</em> have a balance owing, CRA assesses a penalty of{' '}
            <strong>5% of the balance owing</strong> immediately, plus <strong>1% for each complete month late</strong>,
            up to 12 months. Maximum standard penalty: <strong>17%</strong>.
          </p>
          <p>
            If you were assessed a late-filing penalty in any of the three previous tax years (2022, 2023, or 2024)
            and CRA issued a formal demand to file your 2025 return, the higher repeat-offender rate applies:{' '}
            <strong>10% plus 2% per complete month</strong>, up to 20 months. Maximum: <strong>50%</strong>.
          </p>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 dark:border-emerald-900 dark:bg-emerald-950">
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
              No balance owing = no late-filing penalty
            </p>
            <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-300 leading-relaxed">
              The late-filing penalty is calculated on your balance owing — not on total tax. If your return shows a
              refund or nil balance, there is no penalty regardless of how late you file.
            </p>
          </div>
          <p>
            The penalty is assessed on the balance owing at the original deadline, not at the time you file. Paying
            your estimated balance on April 30 and filing later reduces the penalty base to zero — you pay only
            interest on any remaining unpaid amount.
          </p>
        </div>
      </section>

      {/* Interest */}
      <section id="interest">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Interest on overdue balances
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            CRA charges interest at its quarterly prescribed rate on any unpaid balance from May 1, 2026. The rate is
            set at the Bank of Canada overnight rate plus 4 percentage points, compounded daily.
          </p>
          <p>
            Interest compounds on both the unpaid tax balance and on any assessed late-filing penalty. Each payment
            you make reduces the balance that future interest accrues on — partial payments always help.
          </p>
          <p>
            Interest cannot be waived unless you qualify for the Taxpayer Relief Program (serious illness, natural
            disaster, or CRA error). See the{' '}
            <a href="/tax-filing-2025/cant-pay" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-75">
              Can&apos;t Pay guide
            </a>{' '}
            for relief options.
          </p>
        </div>
      </section>

      {/* Self-employed */}
      <section id="self-employed">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Self-employed filing deadline
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            If you or your spouse/common-law partner had self-employment income in 2025, your filing deadline
            is <strong>June 15, 2026</strong>. This applies to sole proprietors, freelancers, and anyone reporting
            business or professional income on Form T2125.
          </p>
          <p>
            The June 15 extension applies to filing only. Any balance owing must be paid by April 30 to avoid
            interest. If you are not certain of your exact tax owing, pay a conservative estimate by April 30 and
            top up when you file. CRA refunds overpayments automatically.
          </p>
          <p>
            Partners in a partnership also qualify for the June 15 extension, even if the partnership has not
            yet filed its T5013 partnership information return.
          </p>
        </div>
      </section>

      {/* Who must file */}
      <section id="who-must-file">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">Who must file</h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>You are required to file a 2025 T1 return if any of the following apply:</p>
          <ul className="space-y-2 pl-4 list-disc">
            <li>You have tax owing after withholdings</li>
            <li>CRA has sent you a request to file</li>
            <li>You disposed of capital property (including real estate) in 2025</li>
            <li>You have a Home Buyers&apos; Plan or Lifelong Learning Plan repayment due</li>
            <li>You received Working Income Tax Benefit (WITB) advance payments</li>
            <li>You were self-employed in 2025</li>
            <li>You want to claim or carry forward the disability tax credit, tuition credits, or other credits</li>
          </ul>
          <p>
            Even if you are not required to file, you should file if you have any income — including part-time or
            seasonal work — to receive benefit payments such as the GST/HST credit, Canada Child Benefit (CCB),
            and provincial equivalents. These benefits are calculated from your filed return.
          </p>
        </div>
      </section>

      {/* Can't pay */}
      <section id="cant-pay">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          If you can&apos;t pay
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            File your return on time regardless of your ability to pay. The late-filing penalty is separate from
            non-payment — filing stops the penalty even if you cannot pay the balance.
          </p>
          <p>
            After filing, contact CRA at <strong>1-888-863-8657</strong> to set up a payment arrangement.
            CRA will generally negotiate a schedule based on your financial situation and may defer collection
            action while an arrangement is in place.
          </p>
          <p>
            See the{' '}
            <a href="/tax-filing-2025/cant-pay" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-75">
              Can&apos;t Pay guide
            </a>{' '}
            for full details including Taxpayer Relief, voluntary disclosures, and what not to do.
          </p>
        </div>
      </section>
    </SubPageTemplate>
  );
}
