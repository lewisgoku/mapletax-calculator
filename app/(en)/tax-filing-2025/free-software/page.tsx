import type { Metadata } from 'next';
import SubPageTemplate from '@/components/SubPageTemplate';
import { getFAQs } from '@/lib/content/faqs';

const BASE = 'https://mapletaxcalculator.ca';

export const metadata: Metadata = {
  title: 'Free NETFILE software for 2025 tax return | MapleTax Calculator',
  description:
    'Five free NETFILE-certified options for your 2025 T1 return: Wealthsimple Tax, GenuTax, StudioTax, and more. No income limit.',
  alternates: {
    canonical: `${BASE}/tax-filing-2025/free-software`,
    languages: {
      en: `${BASE}/tax-filing-2025/free-software`,
      fr: `${BASE}/fr/tax-filing-2025/free-software`,
      'x-default': `${BASE}/tax-filing-2025/free-software`,
    },
  },
};

const SOFTWARE = [
  {
    name: 'Wealthsimple Tax',
    cost: 'Free (pay-what-you-want)',
    quebec: 'Yes',
    platform: 'Web',
    notes: 'No income limit, supports all forms including T2125, T776, T1135. Best default choice.',
  },
  {
    name: 'GenuTax Standard',
    cost: 'Free (donations welcome)',
    quebec: 'No',
    platform: 'Windows / Mac desktop',
    notes: 'Good choice for privacy-focused users who prefer desktop software.',
  },
  {
    name: 'StudioTax',
    cost: 'Free (up to 20 returns/year)',
    quebec: 'Yes',
    platform: 'Windows / Mac / iOS / Android',
    notes: 'Long-standing free option; supports both T1 and Quebec TP-1.',
  },
  {
    name: 'TurboTax Free',
    cost: 'Free for simple returns',
    quebec: 'No',
    platform: 'Web',
    notes: 'Upsells to paid tiers for rental, self-employment, or complex situations.',
  },
  {
    name: 'H&R Block Free',
    cost: 'Free basic tier',
    quebec: 'No',
    platform: 'Web',
    notes: 'Limited to straightforward T1 returns with no investment or self-employment income.',
  },
];

const FAQS = getFAQs(['tf25-netfile-secure', 'tf25-switch-software', 'tf25-complex-return', 'tf25-netfile-closes']);

export default function FreeSoftwarePage() {
  return (
    <SubPageTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Tax Filing 2025', href: '/tax-filing-2025' },
        { label: 'Free NETFILE Software', href: '/tax-filing-2025/free-software' },
      ]}
      h1="Free NETFILE-certified software for your 2025 tax return"
      intro="All five options below are certified by CRA for NETFILE filing of 2025 T1 returns. You can file your complete return at no cost — no income limit applies to most of these options."
      tableOfContents={[
        { id: 'comparison', label: 'Comparison table' },
        { id: 'what-is-netfile', label: 'What is NETFILE?' },
        { id: 'cra-list', label: 'Full CRA list' },
      ]}
      commonMistakes={[
        {
          title: 'Starting in TurboTax Free and hitting a paid wall mid-return',
          body: 'TurboTax will prompt you to upgrade if your situation involves rental income, self-employment, or investments. Switching platforms means re-entering all your data from scratch. Check your situation against the free tier before starting.',
        },
        {
          title: 'Using last year\'s software for this year\'s return',
          body: 'CRA certifies software annually. Software certified for 2024 returns will not submit a 2025 return via NETFILE. Always ensure you\'re using the 2025-certified version of your chosen software.',
        },
        {
          title: 'Quebec residents filing only one return',
          body: 'Quebec residents must file two separate returns: a T1 to CRA and a TP-1 to Revenu Québec. Only Wealthsimple Tax and StudioTax support both returns in their free tier. GenuTax and TurboTax Free do not support the Quebec TP-1.',
        },
      ]}
      quickWins={[
        {
          title: 'Wealthsimple Tax covers all situations free',
          body: 'For nearly all T1 situations — employment, self-employment, rentals, investments — Wealthsimple Tax is fully free with no income cap. It\'s the default recommendation for uncomplicated and complex returns alike.',
        },
        {
          title: 'Use Auto-fill My Return to save 20+ minutes',
          body: 'Any of these platforms support Auto-fill My Return. Log in with your CRA credentials and the software imports your T4, T5, T3, RRSP slips, and more directly from CRA — saving significant manual entry and reducing errors.',
        },
      ]}
      relatedSubPages={[
        { title: 'Slips Checklist', description: 'Documents to gather before you start', href: '/tax-filing-2025/slips-checklist' },
        { title: 'Credits & Deductions', description: 'What to claim on your 2025 return', href: '/tax-filing-2025/credits-and-deductions' },
        { title: 'Filing Late?', description: 'Still time — file now', href: '/tax-filing-2025/late-filing' },
      ]}
      faqs={FAQS}
      pageMetadata={{
        title: 'Free NETFILE software for 2025 | MapleTax Calculator',
        description: 'Five free NETFILE-certified options for your 2025 T1.',
        canonical: `${BASE}/tax-filing-2025/free-software`,
      }}
    >
      {/* Comparison table */}
      <section id="comparison">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Free NETFILE software comparison
        </h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-left dark:border-neutral-800 dark:bg-neutral-900">
                <th className="px-4 py-3 font-medium text-neutral-700 dark:text-neutral-300">Software</th>
                <th className="px-4 py-3 font-medium text-neutral-700 dark:text-neutral-300">Cost</th>
                <th className="px-4 py-3 font-medium text-neutral-700 dark:text-neutral-300">Quebec TP-1</th>
                <th className="px-4 py-3 font-medium text-neutral-700 dark:text-neutral-300">Platform</th>
                <th className="px-4 py-3 font-medium text-neutral-700 dark:text-neutral-300">Notes</th>
              </tr>
            </thead>
            <tbody>
              {SOFTWARE.map((row, i) => (
                <tr
                  key={row.name}
                  className={`border-b border-neutral-100 dark:border-neutral-800 ${
                    i % 2 === 0 ? 'bg-white dark:bg-neutral-950' : 'bg-neutral-50 dark:bg-neutral-900'
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-neutral-900 dark:text-neutral-100">{row.name}</td>
                  <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">{row.cost}</td>
                  <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">{row.quebec}</td>
                  <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">{row.platform}</td>
                  <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            <strong className="font-medium text-neutral-700 dark:text-neutral-300">Note on free tier restrictions:</strong>{' '}
            If your return involves rental income, self-employment, or T1135 foreign asset reporting, verify that the
            specific plan covers your situation before you start.{' '}
            <a
              href="https://www.canada.ca/en/revenue-agency/services/tax/individuals/e-services/netfile-overview/certified-software-netfile-program.html"
              className="underline underline-offset-2 text-neutral-700 dark:text-neutral-300 hover:opacity-75"
              target="_blank"
              rel="noopener noreferrer"
            >
              CRA&apos;s official certified software list
            </a>{' '}
            is the authoritative source for the most current options.
          </p>
        </div>
      </section>

      {/* What is NETFILE */}
      <section id="what-is-netfile">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">What is NETFILE?</h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            NETFILE is CRA&apos;s electronic filing service for individual tax returns. When you file through any
            NETFILE-certified software, your completed return is transmitted directly and securely to CRA — typically
            resulting in a refund within 8 business days via direct deposit. There is no paper to mail, no separate
            submission step.
          </p>
          <p>
            Not everyone can use NETFILE. First-year filers who have never filed a Canadian return, certain
            non-residents, and returns requiring specific forms (like deceased taxpayers) may need to paper-file or
            use EFILE through a tax professional. NETFILE is open for 2025 returns until{' '}
            <strong>January 29, 2027</strong>.
          </p>
        </div>
      </section>

      {/* CRA list */}
      <section id="cra-list">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">Full CRA certified software list</h2>
        <p className="mt-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          The table above covers the major free options. CRA maintains a complete list of all certified software —
          including paid products — on their website. This list is updated annually as new products are certified.
        </p>
        <a
          href="https://www.canada.ca/en/revenue-agency/services/tax/individuals/e-services/netfile-overview/certified-software-netfile-program.html"
          className="mt-3 inline-block text-sm underline underline-offset-2 text-neutral-700 dark:text-neutral-300 hover:opacity-75"
          target="_blank"
          rel="noopener noreferrer"
        >
          View CRA&apos;s complete certified software list →
        </a>
      </section>
    </SubPageTemplate>
  );
}
