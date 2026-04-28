import type { Metadata } from 'next';
import SubPageTemplate from '@/components/SubPageTemplate';
import { getFAQs } from '@/lib/content/faqs';

const BASE = 'https://mapletaxcalculator.ca';

export const metadata: Metadata = {
  title: "Can't pay your 2025 tax bill? File now, pay later | MapleTax Calculator",
  description:
    'File on time even if you can\'t pay — the late-filing penalty is separate from interest. Learn how to set up a CRA payment arrangement.',
  alternates: {
    canonical: `${BASE}/tax-filing-2025/cant-pay`,
    languages: {
      en: `${BASE}/tax-filing-2025/cant-pay`,
      fr: `${BASE}/fr/tax-filing-2025/cant-pay`,
      'x-default': `${BASE}/tax-filing-2025/cant-pay`,
    },
  },
};

const FAQS = getFAQs(['tf25-cra-court', 'tf25-arrangement-interest', 'tf25-credit-card', 'tf25-cant-pay-anything']);

export default function CantPayPage() {
  return (
    <SubPageTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Tax Filing 2025', href: '/tax-filing-2025' },
        { label: "Can't Pay?", href: '/tax-filing-2025/cant-pay' },
      ]}
      h1="Can't pay your 2025 tax balance? Here's what to do"
      intro="File your return on time even if you can't pay the full amount. Filing on time stops the 5% late-filing penalty. Interest accrues on unpaid balances regardless, but interest is far less expensive than combined penalty and interest."
      tableOfContents={[
        { id: 'file-first', label: 'File first, pay later' },
        { id: 'payment-options', label: 'Payment options' },
        { id: 'arrangements', label: 'Payment arrangements' },
        { id: 'cant-pay-anything', label: "If you can't pay anything" },
        { id: 'relief', label: 'Taxpayer Relief Program' },
      ]}
      commonMistakes={[
        {
          title: 'Not contacting CRA proactively',
          body: "CRA is significantly more cooperative with taxpayers who reach out before collections contact them. If you know you can't pay by April 30, call before the deadline — not after receiving a collections notice.",
        },
        {
          title: 'Setting a payment arrangement too small to cover daily interest',
          body: "If your monthly payment barely covers the interest accruing on the balance, the debt grows rather than shrinks. Ask CRA what the minimum payment is to actually reduce the balance, and aim above that.",
        },
      ]}
      quickWins={[
        {
          title: 'Set up direct debit from your chequing account',
          body: "The most reliable way to keep a payment arrangement current is pre-authorized debit set up through CRA My Account. It removes the risk of a missed payment restarting the collections process.",
        },
        {
          title: "If you're self-employed and always owe, start quarterly instalments now",
          body: "CRA requires quarterly tax instalments if your net tax owing exceeds $3,000 ($1,800 in Quebec) in the current and either of the two prior years. Setting them up voluntarily avoids instalment interest and eliminates the April lump-sum shock.",
        },
      ]}
      relatedSubPages={[
        { title: 'Filing Late?', description: 'Understand penalties on unpaid balances', href: '/tax-filing-2025/late-filing' },
        { title: 'Amend a Return', description: 'If your balance is wrong, fix it first', href: '/tax-filing-2025/amend-a-return' },
        { title: 'Credits & Deductions', description: 'Reduce what you owe with missed credits', href: '/tax-filing-2025/credits-and-deductions' },
      ]}
      faqs={FAQS}
      pageMetadata={{
        title: "Can't pay your 2025 tax bill? | MapleTax Calculator",
        description: 'File on time even without payment. CRA payment arrangement guide.',
        canonical: `${BASE}/tax-filing-2025/cant-pay`,
      }}
    >
      {/* File first */}
      <section id="file-first">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          File first, pay later — the core strategy
        </h2>
        <div className="mt-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            The most important thing you can do if you can&apos;t pay:
          </p>
          <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
            File your T1 return by <strong>April 30, 2026</strong> with the balance showing. You don&apos;t need to pay
            at the same time. Filing on time stops the 5% late-filing penalty. Interest on the unpaid balance starts
            May 1 — that&apos;s unavoidable — but interest alone is far less than penalty plus interest. A $5,000
            balance accrues roughly $350/year in interest at 7%. That same balance plus a 5% late-filing penalty
            immediately adds $250, and another $50 per month after that.
          </p>
        </div>
      </section>

      {/* Payment options */}
      <section id="payment-options">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">Payment options</h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            Pay what you can, when you can. Every dollar paid reduces the balance that interest accrues on.
          </p>
          <ul className="mt-2 space-y-2 text-sm">
            <li><strong>Online banking:</strong> Add &quot;Canada Revenue Agency — Personal Income Tax (T1)&quot; as a payee and use your SIN as the account number.</li>
            <li><strong>My Payment:</strong> CRA&apos;s portal at canada.ca accepts Interac and Visa/Mastercard debit.</li>
            <li><strong>Pre-authorized debit:</strong> Set up recurring payments via CRA My Account.</li>
            <li><strong>In person:</strong> Canada Post locations accept CRA payments for a small fee.</li>
            <li><strong>Cheque or money order:</strong> Mail to the Receiver General with your SIN and tax year on the front.</li>
          </ul>
        </div>
      </section>

      {/* Arrangements */}
      <section id="arrangements">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Setting up a payment arrangement
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            If you cannot pay the full balance by April 30, contact CRA to set up a <strong>Taxpayer Payment
            Arrangement (TPA)</strong>. CRA will negotiate a monthly payment schedule based on your ability to pay.
          </p>
          <ul className="mt-2 space-y-2 text-sm">
            <li><strong>By phone:</strong> Call CRA Collections at 1-888-863-8657 (individuals). Have your SIN, return information, and a realistic monthly payment figure ready.</li>
            <li><strong>Online:</strong> CRA My Account has a &quot;Payment arrangement&quot; feature where you can propose a plan without calling.</li>
          </ul>
          <p>
            Interest continues to accrue on the outstanding balance during an arrangement. CRA will not waive interest
            simply because an arrangement is in place — but meeting your arrangement terms prevents escalation to
            collections.
          </p>
        </div>
      </section>

      {/* Can't pay anything */}
      <section id="cant-pay-anything">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          If you genuinely cannot pay anything
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            File your return first — always. Then contact CRA and explain your situation honestly. CRA can accept
            very small monthly payments when financial hardship is genuine and documented.
          </p>
          <p>
            If CRA determines the debt is unrecoverable, they may write it off administratively — but this is rare
            and not guaranteed. In extreme cases, personal bankruptcy discharges most CRA debts (with exceptions for
            fraud). A Licensed Insolvency Trustee can advise on this path.
          </p>
        </div>
      </section>

      {/* Taxpayer Relief */}
      <section id="relief">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Taxpayer Relief Program
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            The <strong>Taxpayer Relief Program</strong> (Form RC4288) allows CRA to cancel or waive penalties and
            interest when extraordinary circumstances prevented payment. Qualifying situations include serious illness
            or accident, natural disaster, CRA processing error or unreasonable delay, or financial hardship
            demonstrably beyond your control.
          </p>
          <p>
            Submit Form RC4288 with supporting documentation. CRA has up to 10 years to grant relief from the date of
            the original assessment. Approval is at CRA&apos;s discretion — document your circumstances thoroughly and
            include any medical records, insurance claims, or employer letters that support your case.
          </p>
        </div>
      </section>
    </SubPageTemplate>
  );
}
