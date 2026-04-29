import type { Metadata } from 'next';
import SubPageTemplate from '@/components/SubPageTemplate';
import LatePenaltyCalculator from '@/components/LatePenaltyCalculator';
import { getFAQs } from '@/lib/content/faqs';

const BASE = 'https://mapletaxcalculator.ca';

export const metadata: Metadata = {
  title: 'Filing your 2025 tax return late — penalties and what to do | MapleTax Calculator',
  description:
    "Missed the April 30 deadline? Estimate your late-filing penalty and learn how to minimize damage. No penalty if you owe nothing.",
  alternates: {
    canonical: `${BASE}/tax-filing-2025/late-filing`,
    languages: {
      en: `${BASE}/tax-filing-2025/late-filing`,
      fr: `${BASE}/fr/tax-filing-2025/late-filing`,
      'x-default': `${BASE}/tax-filing-2025/late-filing`,
    },
  },
};

const FAQS = getFAQs([
  'tf25-no-penalty-refund',
  'tf25-penalty-calc',
  'tf25-repeat-offender',
  'tf25-waiver',
  'tf25-netfile-late',
]);

export default function LateFilingPage() {
  return (
    <SubPageTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Tax Filing 2025', href: '/tax-filing-2025' },
        { label: 'Filing Late?', href: '/tax-filing-2025/late-filing' },
      ]}
      h1="Filing your 2025 return late — penalties, interest, and what to do now"
      intro="If you owe nothing, there is no late-filing penalty — just file as soon as possible. If you have a balance owing, file now: every complete month you wait adds to the penalty."
      tableOfContents={[
        { id: 'no-balance', label: 'If you owe nothing' },
        { id: 'how-calculated', label: 'How the penalty is calculated' },
        { id: 'cant-pay', label: "If you can't pay" },
        { id: 'repeat', label: 'Repeat offenders' },
        { id: 'interest', label: 'Interest on unpaid taxes' },
        { id: 'relief', label: 'Taxpayer Relief' },
        { id: 'file-now', label: 'How to file now' },
      ]}
      miniTool={
        <div>
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
            Estimate your penalty below. If you owe nothing, there&apos;s no penalty at all — just file.
          </p>
          <LatePenaltyCalculator />
        </div>
      }
      commonMistakes={[
        {
          title: '"I can\'t pay, so what\'s the point of filing?"',
          body: "The point is the penalty. Filing on time stops the 5% late-filing penalty even if you don't pay a cent. Only interest accrues on an unpaid balance — and interest is far cheaper than penalty plus interest. File immediately.",
        },
        {
          title: 'Assuming the late-filing penalty applies when you have a refund',
          body: "The late-filing penalty is calculated on your balance owing. If you owe nothing — or are getting a refund — the penalty is exactly $0. Late filing with a refund only delays your money.",
        },
        {
          title: 'Confusing interest and penalty as the same thing',
          body: "They are separate. The penalty is assessed on your filed return and added to the amount owing. Interest then accrues on both the unpaid balance AND on the assessed penalty. Both compound daily from May 1, 2026.",
        },
      ]}
      quickWins={[
        {
          title: 'File immediately — every complete month costs 1% (or 2%)',
          body: "Each complete month after April 30 adds 1% of your balance in penalty (2% for repeat offenders). A return filed June 29 is 1 month late. A return filed July 1 is 2 months late. Filing today stops the clock.",
        },
        {
          title: 'Pay whatever you can now',
          body: "Interest accrues only on the remaining unpaid balance. Even a partial payment made now reduces the base that daily interest compounds on.",
        },
        {
          title: 'Disputing the balance? File your best estimate and amend later',
          body: "If you believe CRA's assessment is wrong or you're missing slips, file a return with your best estimate of income and pay that amount. You can amend once you have accurate information. This stops the late-filing penalty clock.",
        },
      ]}
      relatedSubPages={[
        { title: "Can't Pay?", description: 'Set up a CRA payment arrangement', href: '/tax-filing-2025/cant-pay' },
        { title: 'Amend a Return', description: 'Fix the return after you file', href: '/tax-filing-2025/amend-a-return' },
        { title: 'Key Dates 2026', description: 'Instalment and filing deadlines', href: '/tax-planning-2026/key-dates' },
      ]}
      faqs={FAQS}
      pageMetadata={{
        title: 'Filing your 2025 return late | MapleTax Calculator',
        description: 'Penalties, interest, and damage control for late filers.',
        canonical: `${BASE}/tax-filing-2025/late-filing`,
      }}
    >
      {/* If you owe nothing */}
      <section id="no-balance">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          If you owe nothing — no penalty
        </h2>
        <div className="mt-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 dark:border-emerald-900 dark:bg-emerald-950">
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
            Zero balance owing = zero late-filing penalty
          </p>
          <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-300 leading-relaxed">
            If your 2025 return shows a refund or a nil balance, there is no financial penalty for filing late — ever.
            File as soon as you can to receive your refund and prevent benefit disruption (CCB, GST/HST credit).
          </p>
        </div>
      </section>

      {/* How calculated */}
      <section id="how-calculated">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          How the penalty is calculated
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            The standard late-filing penalty is <strong>5% of your balance owing on April 30, 2026</strong>, plus{' '}
            <strong>1% for each complete month late</strong>, up to a maximum of 12 months. The maximum standard
            penalty is therefore 17% of the balance owing.
          </p>
          <p>
            Complete months are counted from May 1. A return filed on June 29 is 1 complete month late. A return
            filed on July 1 is 2 complete months late.
          </p>
          <p>
            The penalty is assessed on the balance owing at the <strong>original filing deadline</strong> — not on
            total tax, not on the amount calculated at the time of filing.
          </p>
        </div>
      </section>

      {/* Can't pay */}
      <section id="cant-pay">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">If you can&apos;t pay</h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            <strong>File your return immediately regardless of whether you can pay.</strong> Filing stops the
            late-filing penalty. Only interest accrues on unpaid balances — and interest, while compounding daily, is
            far less expensive than the penalty.
          </p>
          <p>
            After filing, contact CRA at <strong>1-888-863-8657</strong> or through{' '}
            <strong>CRA My Account</strong> to arrange a payment schedule. CRA is generally cooperative with
            taxpayers who reach out proactively.
          </p>
        </div>
      </section>

      {/* Repeat offenders */}
      <section id="repeat">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">Repeat offenders</h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            If CRA assessed a late-filing penalty on your return in <strong>any of the three prior tax years
            (2022, 2023, or 2024)</strong> AND issued a formal demand to file the current return, the higher penalty
            applies: <strong>10% of the balance owing plus 2% per complete month late</strong>, up to a maximum of
            20 months. The maximum repeat-offender penalty is <strong>50%</strong> of the balance.
          </p>
          <p>
            Both conditions must be met — a prior penalty alone, without a formal CRA demand, still results in the
            standard 5% rate.
          </p>
        </div>
      </section>

      {/* Interest */}
      <section id="interest">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Interest on unpaid taxes
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            CRA&apos;s prescribed interest rate on overdue taxes is set quarterly. Interest compounds <strong>daily</strong> from
            May 1, 2026 on both the unpaid balance and on any late-filing penalty assessed. There is no grace period.
          </p>
          <p>
            Interest accrues even on balances in a payment arrangement — it does not pause. Each payment you make
            reduces the balance that future interest compounds on, so paying more sooner always reduces total
            interest cost.
          </p>
        </div>
      </section>

      {/* Relief */}
      <section id="relief">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Taxpayer Relief Program
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            If extraordinary circumstances caused your late filing — serious illness, natural disaster, CRA
            processing error — apply for relief using <strong>Form RC4288</strong>. CRA can cancel or waive
            penalties and interest when circumstances were genuinely beyond your control.
          </p>
          <p>
            Provide documentation (medical records, disaster declarations, correspondence showing CRA delays).
            Applications can go back up to 10 years from the original assessment date. CRA has discretion —
            approval is not guaranteed but worth pursuing in qualifying situations.
          </p>
          <p className="font-medium text-neutral-900 dark:text-neutral-100">
            Action: file your return first, then apply for relief. Relief will not be granted if the return is
            still outstanding.
          </p>
        </div>
      </section>

      {/* File now */}
      <section id="file-now">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">How to file now</h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            NETFILE is open for 2025 returns until <strong>January 29, 2027</strong>. Any NETFILE-certified software
            works — see the{' '}
            <a href="/tax-filing-2025/free-software" className="underline underline-offset-2 hover:opacity-75">
              free software guide
            </a>{' '}
            for options that cost nothing. Wealthsimple Tax is the fastest path for most situations.
          </p>
          <p>
            If it&apos;s after January 29, 2027, you must file a paper T1 return or use a tax professional with EFILE
            access. The 10-year voluntary disclosure window still applies regardless.
          </p>
        </div>
      </section>
    </SubPageTemplate>
  );
}
