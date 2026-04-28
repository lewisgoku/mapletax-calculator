import type { Metadata } from 'next';
import SubPageTemplate from '@/components/SubPageTemplate';
import { getFAQs } from '@/lib/content/faqs';

const BASE = 'https://mapletaxcalculator.ca';

export const metadata: Metadata = {
  title: 'How to amend your 2025 Canadian tax return | MapleTax Calculator',
  description:
    'Amend your 2025 T1 return using ReFILE, T1-ADJ via My Account, or a paper form. Learn timelines and when to amend vs. wait.',
  alternates: {
    canonical: `${BASE}/tax-filing-2025/amend-a-return`,
    languages: {
      en: `${BASE}/tax-filing-2025/amend-a-return`,
      fr: `${BASE}/fr/tax-filing-2025/amend-a-return`,
      'x-default': `${BASE}/tax-filing-2025/amend-a-return`,
    },
  },
};

const FAQS = getFAQs([
  'tf25-amendment-timeline',
  'tf25-amend-5-years',
  'tf25-amend-audit',
  'tf25-amend-balance-owing',
]);

export default function AmendAReturnPage() {
  return (
    <SubPageTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Tax Filing 2025', href: '/tax-filing-2025' },
        { label: 'Amend a Return', href: '/tax-filing-2025/amend-a-return' },
      ]}
      h1="How to amend your 2025 tax return"
      intro="If you filed your 2025 T1 return and later discovered a mistake or missing slip, you can request an adjustment. Do not file a new return — use one of the three methods below."
      tableOfContents={[
        { id: 'when-to-amend', label: 'When to amend' },
        { id: 'refile', label: 'ReFILE — fastest' },
        { id: 'my-account', label: 'T1-ADJ via My Account' },
        { id: 'paper', label: 'Paper T1-ADJ' },
        { id: 'timelines', label: 'Timelines and limits' },
      ]}
      commonMistakes={[
        {
          title: 'Filing a completely new T1 return instead of an amendment',
          body: 'CRA will reject or ignore a duplicate T1 return. Use T1-ADJ or ReFILE to request changes to a specific filed return — never submit a second T1 for the same year.',
        },
        {
          title: 'Amending before receiving your Notice of Assessment',
          body: 'Wait until CRA has processed your original return and issued a Notice of Assessment (NOA). Amending before the NOA can cause processing delays and confusion.',
        },
      ]}
      quickWins={[
        {
          title: 'Use ReFILE inside your original software',
          body: 'ReFILE is the fastest method and requires no new forms. Open your 2025 return in the same software you filed with, make the change, and submit. Most software supports ReFILE in the same workflow as original filing.',
        },
        {
          title: 'Most common amendment: RRSP first-60-days contributions',
          body: 'If you contributed to an RRSP between January 1 and March 1, 2026 and forgot to claim it on your 2025 return, that\'s the most common amendment. ReFILE immediately — the deduction is worth recovering.',
        },
      ]}
      relatedSubPages={[
        { title: 'Slips Checklist', description: 'Find the slip you\'re missing', href: '/tax-filing-2025/slips-checklist' },
        { title: 'Credits & Deductions', description: 'Missed credit? Amend to claim it', href: '/tax-filing-2025/credits-and-deductions' },
        { title: "Can't Pay?", description: 'If amendment creates a balance', href: '/tax-filing-2025/cant-pay' },
      ]}
      faqs={FAQS}
      pageMetadata={{
        title: 'How to amend your 2025 tax return | MapleTax Calculator',
        description: 'ReFILE, T1-ADJ, or paper amendment — timelines and rules.',
        canonical: `${BASE}/tax-filing-2025/amend-a-return`,
      }}
    >
      {/* When to amend */}
      <section id="when-to-amend">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">When to amend</h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            Amend your return if: you received a T3 or T5008 after filing, you forgot an RRSP deduction, you missed a
            credit you were eligible for, you made a calculation error, or you want to dispute a CRA reassessment by
            providing additional information.
          </p>
          <p>
            Do not amend solely to change an election you already made (such as the timing of an RRSP deduction or
            pension income splitting) — CRA has specific rules about revoking elections that differ from ordinary
            amendments. Contact CRA if you need to change an election.
          </p>
        </div>
      </section>

      {/* ReFILE */}
      <section id="refile">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          ReFILE — the fastest method
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            ReFILE is available for 2022–2025 T1 returns through any NETFILE-certified software. Open your 2025 return
            in the same software you originally used, make the correction, and submit via ReFILE. CRA typically
            processes ReFILE amendments within <strong>2 weeks</strong>.
          </p>
          <p>
            ReFILE is the recommended path for most amendments — it requires no forms, no mailing, and produces the
            fastest result. Most NETFILE software products label this clearly as &quot;Adjust my return&quot; or &quot;ReFILE.&quot;
          </p>
        </div>
      </section>

      {/* T1-ADJ via My Account */}
      <section id="my-account">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          T1-ADJ via CRA My Account
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            Log in to{' '}
            <a
              href="https://www.canada.ca/en/revenue-agency/services/e-services/digital-services-individuals/account-individuals.html"
              className="underline underline-offset-2 hover:opacity-75"
              target="_blank"
              rel="noopener noreferrer"
            >
              CRA My Account
            </a>{' '}
            and navigate to &quot;Change my return&quot; to submit an online T1 Adjustment Request. You specify the line
            number you want changed and the new amount. CRA processes these in approximately <strong>4–8 weeks</strong>.
          </p>
          <p>
            This method works well if your software doesn&apos;t support ReFILE or if you&apos;re amending a prior year
            return on software you no longer have installed.
          </p>
        </div>
      </section>

      {/* Paper */}
      <section id="paper">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">Paper T1-ADJ form</h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            Download and complete Form T1-ADJ (T1 Adjustment Request) from the CRA website and mail it to your
            regional tax centre. Include supporting documents (slips, receipts) that support the change. Paper
            processing takes <strong>12+ weeks</strong> — significantly longer during the peak filing season from
            February through June.
          </p>
          <p>
            Use paper only if you cannot access CRA My Account and your software does not support ReFILE.
          </p>
        </div>
      </section>

      {/* Timelines */}
      <section id="timelines">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">Timelines and limits</h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            The <strong>normal reassessment period</strong> is 3 years from the date of your Notice of Assessment.
            Within this window, you can request amendments and CRA can reassess proactively. Most amendments are
            processed within this period.
          </p>
          <p>
            For amendments beyond 3 years — up to 10 years back — you can apply under the{' '}
            <strong>Taxpayer Relief Provisions</strong> by submitting Form RC4288. CRA has discretion on whether to
            accept older adjustments; genuine errors and overlooked credits are typically approved.
          </p>
          <p>
            If an amendment results in a <strong>larger refund</strong>, CRA pays interest on the overpayment from
            the later of the original filing date or the payment date. If it results in{' '}
            <strong>more tax owing</strong>, interest runs from the original due date (April 30, 2026) — not from
            the amendment date.
          </p>
        </div>
      </section>
    </SubPageTemplate>
  );
}
