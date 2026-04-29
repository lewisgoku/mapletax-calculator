import type { Metadata } from 'next';
import SubPageTemplate from '@/components/SubPageTemplate';
import YearEndChecklist from '@/components/YearEndChecklist';
import { getFAQs } from '@/lib/content/faqs';

const BASE = 'https://mapletaxcalculator.ca';

export const metadata: Metadata = {
  title: '2026 year-end tax checklist — actions before December 31 | MapleTax Calculator',
  description:
    'Checklist of tax actions to complete before December 31, 2026: TFSA, FHSA, RESP contributions, charitable donations, tax-loss selling, and year-end business moves.',
  alternates: {
    canonical: `${BASE}/tax-planning-2026/year-end-checklist`,
    languages: {
      en: `${BASE}/tax-planning-2026/year-end-checklist`,
      fr: `${BASE}/fr/tax-planning-2026/year-end-checklist`,
      'x-default': `${BASE}/tax-planning-2026/year-end-checklist`,
    },
  },
  openGraph: {
    title: '2026 year-end tax checklist | MapleTax Calculator',
    description: 'Actions before December 31, 2026: TFSA, FHSA, donations, tax-loss selling.',
    url: `${BASE}/tax-planning-2026/year-end-checklist`,
  },
};

const FAQS = getFAQs([
  'tp26-charitable-last-day',
  'tp26-tax-loss-rebuy',
  'tp26-rrsp-2027-deadline',
  'tp26-tfsa-unused-room',
]);

export default function YearEndChecklistPage() {
  return (
    <SubPageTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Tax Planning 2026', href: '/tax-planning-2026' },
        { label: 'Year-End Checklist', href: '/tax-planning-2026/year-end-checklist' },
      ]}
      h1="2026 year-end tax checklist — actions before December 31"
      intro={
        "December 31 is the hard deadline for most 2026 tax actions. TFSA and FHSA contributions, charitable donations, tax-loss selling, and business expense timing all require action before midnight. The RRSP deadline is the exception — contributions made in the first 60 days of 2027 (by March 2, 2027) count for the 2026 tax year.\n\n" +
        "Use the interactive checklist below to track what you've done. Progress is saved in your browser and persists between visits."
      }
      tableOfContents={[
        { id: 'checklist', label: 'Interactive checklist' },
        { id: 'tax-loss-selling', label: 'Tax-loss selling detail' },
        { id: 'registered-account-deadlines', label: 'Registered account deadlines' },
        { id: 'charitable-donations', label: 'Charitable donations' },
        { id: 'self-employed-moves', label: 'Self-employed year-end moves' },
      ]}
      commonMistakes={[
        {
          title: 'Assuming the RRSP deadline is December 31',
          body: 'RRSP contributions made in the first 60 days of 2027 (by March 2, 2027) can be deducted on your 2026 return. There is no RRSP emergency on December 31 — TFSA and FHSA are the December 31 deadlines for registered accounts.',
        },
        {
          title: 'Selling a losing position after the settlement cutoff',
          body: 'Canadian equities settle T+1. A sale on December 30 settles December 31 — the last valid day. A sale on December 31 settles in 2027 and does not offset 2026 capital gains. Verify your brokerage\'s specific cutoff.',
        },
        {
          title: 'Violating the superficial loss rule by repurchasing within 30 days',
          body: 'If you sell a security at a loss and repurchase the same security (or an affiliated person does) within 30 days before or after the sale, the capital loss is denied. Wait 30+ days, or immediately buy a similar-but-not-identical security to maintain exposure.',
        },
      ]}
      quickWins={[
        {
          title: 'Schedule your year-end review in early December, not late December',
          body: 'Decisions made December 1 give you a month of flexibility. Decisions made December 29 run into brokerage cutoffs, slow banking, and year-end processing delays. Start early.',
        },
        {
          title: 'Donate appreciated securities instead of cash',
          body: 'Donating publicly-listed securities with unrealized gains directly to a registered charity eliminates the capital gains tax entirely — and you still receive a receipt for the full fair market value. This is consistently one of the highest-leverage tax moves available.',
        },
        {
          title: 'Confirm your province of residence on December 31',
          body: 'Your province of residence on December 31 determines which provincial tax rates apply to your entire 2026 income. If you moved provinces in 2026, confirm you know which province to use — and that your address in CRA My Account reflects the correct province.',
        },
      ]}
      relatedSubPages={[
        { title: 'Credits & Deductions', description: 'Charitable donations and capital gains strategy', href: '/tax-planning-2026/credits-and-deductions' },
        { title: 'Key Dates 2026', description: 'All 2026 deadlines in one place', href: '/tax-planning-2026/key-dates' },
        { title: 'Self-Employed', description: 'Business expense and instalment timing', href: '/tax-planning-2026/self-employed' },
      ]}
      faqs={FAQS}
      pageMetadata={{
        title: '2026 year-end tax checklist | MapleTax Calculator',
        description: 'Actions before December 31, 2026: TFSA, FHSA, donations, tax-loss selling.',
        canonical: `${BASE}/tax-planning-2026/year-end-checklist`,
      }}
    >
      {/* Interactive checklist */}
      <section id="checklist">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Interactive checklist
        </h2>
        <div className="mt-4">
          <YearEndChecklist />
        </div>
      </section>

      {/* Tax-loss selling */}
      <section id="tax-loss-selling">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Tax-loss selling detail
        </h2>
        <div className="mt-3 space-y-3 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>Tax-loss selling means deliberately realizing capital losses in non-registered accounts before December 31 to offset capital gains you realized earlier in 2026. The net loss reduces the amount subject to the capital gains inclusion rate.</p>
          <p><strong>Settlement timing:</strong> Canadian equities settle T+1. To ensure a sale settles on or before December 31, you must execute the trade on or before December 30. Check with your broker for the exact last day — some brokers publish year-end cutoffs in December.</p>
          <p><strong>Superficial loss rule:</strong> if you (or an affiliated person — spouse, corporation you control) buy back the same security within 30 calendar days before or after the sale, the capital loss is deemed a "superficial loss" and is denied. The denied loss is added to the adjusted cost base of the repurchased security.</p>
          <p><strong>What you can immediately buy instead:</strong> a similar-but-not-identical security. For example, sell one Canadian bank ETF and immediately buy a different Canadian bank ETF — you maintain your sector exposure without triggering the superficial loss rule.</p>
          <p><strong>Net capital losses:</strong> if your total capital losses in 2026 exceed your capital gains, the net loss cannot be applied against other income in 2026. It can be carried back up to 3 years (to offset prior-year capital gains) or carried forward indefinitely.</p>
          <p>For 2026, the inclusion rates are <strong>1/2 on the first $250,000</strong> of annual net capital gains per individual, and <strong>2/3 on net gains above $250,000</strong>. Tax-loss selling reduces net gains subject to these rates. <em>Verify the legislative status of the 2/3 rate at canada.ca before relying on it for large transactions.</em></p>
        </div>
      </section>

      {/* Registered account deadlines */}
      <section id="registered-account-deadlines">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Registered account deadlines
        </h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-700">
                <th className="py-2 pr-4 text-left font-medium text-neutral-900 dark:text-neutral-100">Account</th>
                <th className="py-2 pr-4 text-left font-medium text-neutral-900 dark:text-neutral-100">2026 limit</th>
                <th className="py-2 text-left font-medium text-neutral-900 dark:text-neutral-100">Deadline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {[
                ['TFSA', '$7,000 (plus any unused carry-forward)', 'December 31, 2026'],
                ['FHSA', '$8,000 (plus unused carry-forward up to $16,000 max)', 'December 31, 2026'],
                ['RESP', 'No annual limit (lifetime $50,000/beneficiary)', 'December 31 to earn 2026 CESG'],
                ['RRSP', '$33,810 (or 18% of 2025 earned income)', 'March 2, 2027'],
              ].map(([account, limit, deadline]) => (
                <tr key={account}>
                  <td className="py-2 pr-4 font-medium text-neutral-800 dark:text-neutral-200 align-top">{account}</td>
                  <td className="py-2 pr-4 text-neutral-600 dark:text-neutral-400 align-top">{limit}</td>
                  <td className="py-2 text-neutral-600 dark:text-neutral-400 align-top whitespace-nowrap">{deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
          TFSA over-contributions are penalized at 1%/month on the excess. Verify your available room in CRA My Account before contributing — the room shown reflects contributions and withdrawals reported to CRA, which may lag the current year.
        </p>
      </section>

      {/* Charitable donations */}
      <section id="charitable-donations">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Charitable donations
        </h2>
        <div className="mt-3 space-y-3 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>Donations must be made to a <strong>registered charity</strong> (CRA-registered, with a valid BN ending in RR0001 or similar) by December 31 to qualify for a 2026 tax credit. Unlike RRSP contributions, there is no 60-day grace period for donations.</p>
          <p>Federal credit: <strong>15% on the first $200</strong> donated in a year, <strong>29% on amounts above $200</strong>. Most provinces add a parallel two-tier structure on top.</p>
          <p>Carrying forward donations: unused donations can be carried forward up to 5 years. If your income is unusually high in 2026, it may be worth donating more than you'd planned — the credit value is the same regardless of income level, but your marginal rate affects how valuable the credit is relative to other deductions.</p>
          <p><strong>Donating appreciated securities</strong> is the highest-leverage version: the capital gain on publicly-listed securities donated directly to a registered charity is <em>fully exempt from tax</em>, and you receive a donation receipt for the fair market value. Cash giving from a non-registered account with embedded gains is the least efficient approach — you pay capital gains tax first, then donate the after-tax cash.</p>
        </div>
      </section>

      {/* Self-employed */}
      <section id="self-employed-moves">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Self-employed year-end moves
        </h2>
        <div className="mt-3 space-y-3 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p><strong>Q4 instalment (December 15):</strong> the fourth and final quarterly instalment for 2026 is due December 15, not December 31. Paying late triggers daily compound interest from the due date.</p>
          <p><strong>Accelerate deductible expenses before December 31:</strong> if you have business expenses planned for early 2027, pulling them forward to December can reduce 2026 net self-employment income — particularly valuable if your income is unusually high this year. Common candidates: prepaid software subscriptions, advertising commitments, professional development, equipment purchases.</p>
          <p><strong>Defer December invoices to January</strong> if your income is unusually high and you expect lower income in 2027. The tax on deferred income is deferred one year — a real but time-limited benefit. Do not defer income to a year when you expect higher income.</p>
          <p>For the instalment calculator and full deductible expense breakdown, see the{' '}
            <a href="/tax-planning-2026/self-employed" className="underline underline-offset-2 hover:opacity-75">Self-Employed guide</a>.
          </p>
        </div>
      </section>
    </SubPageTemplate>
  );
}
