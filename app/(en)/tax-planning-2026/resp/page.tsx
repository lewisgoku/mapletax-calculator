import type { Metadata } from 'next';
import SubPageTemplate from '@/components/SubPageTemplate';
import CesgCalculator from '@/components/CesgCalculator';
import { getFAQs } from '@/lib/content/faqs';

const BASE = 'https://mapletaxcalculator.ca';

export const metadata: Metadata = {
  title: 'RESP and CESG in 2026 — how to maximize the education grant | MapleTax Calculator',
  description:
    'The government adds 20% on the first $2,500 RESP contribution per year (max $500). Calculate your CESG projection and understand the age-17 rules.',
  alternates: {
    canonical: `${BASE}/tax-planning-2026/resp`,
    languages: {
      en: `${BASE}/tax-planning-2026/resp`,
      fr: `${BASE}/fr/tax-planning-2026/resp`,
      'x-default': `${BASE}/tax-planning-2026/resp`,
    },
  },
  openGraph: {
    title: 'RESP and CESG in 2026 | MapleTax Calculator',
    description:
      'Maximize the 20% Canada Education Savings Grant. Calculate your CESG projection.',
    url: `${BASE}/tax-planning-2026/resp`,
  },
};

const FAQS = getFAQs([
  'resp-annual-deadline',
  'resp-no-postsec',
  'resp-cesg-catchup',
  'resp-withdrawal-tax',
  'resp-fhsa-same-child',
]);

export default function RespPage() {
  return (
    <SubPageTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Tax Planning 2026', href: '/tax-planning-2026' },
        { label: 'RESP', href: '/tax-planning-2026/resp' },
      ]}
      h1="RESP: saving for education with the CESG in 2026"
      intro={
        "An RESP is a registered account that lets your contributions grow tax-sheltered until your child withdraws the money for post-secondary education. The government adds a 20% Canada Education Savings Grant (CESG) on up to $2,500 contributed per year — a guaranteed $500 in free money annually that compounds over 18 years.\n\n" +
        "There is no annual contribution deadline for an RESP — contributions count toward the CESG for whatever calendar year they are made in. But because the grant is only earned during the beneficiary's eligible years (up to and including December 31 of the year they turn 17), starting early means more years of compounding. A grant contributed at birth and left invested for 18 years does far more work than the same grant received at age 15."
      }
      tableOfContents={[
        { id: 'how-cesg-works', label: 'The CESG: how the grant works' },
        { id: 'how-much-to-contribute', label: 'How much to contribute' },
        { id: 'additional-cesg', label: 'Additional CESG for lower-income families' },
        { id: 'clb', label: 'Canada Learning Bond (CLB)' },
        { id: 'individual-vs-family', label: 'Individual vs. family RESP' },
        { id: 'no-postsec', label: 'What happens if no post-secondary' },
        { id: 'age17-rules', label: 'Age-17 special rules' },
      ]}
      miniTool={
        <div>
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
            Project your CESG. Enter your child&apos;s birth year and planned contribution — the calculator shows what the government will add.
          </p>
          <CesgCalculator />
        </div>
      }
      commonMistakes={[
        {
          title: 'Waiting until high school to open an RESP',
          body: 'Every year you delay is a year of compounding lost — and the age-17 eligibility rule may already exclude the final years if prior contribution conditions are not met. Opening at birth and contributing even $500/year captures all 18 eligible CESG years.',
        },
        {
          title: 'Contributing more than $2,500 expecting a larger grant',
          body: 'The CESG is capped at 20% × $2,500 = $500 per beneficiary per year regardless of how much more you contribute. Extra contributions above $2,500 still grow tax-sheltered but generate no additional grant. Use the extra room strategically to catch up prior missed years instead.',
        },
        {
          title: 'Opening an individual RESP when a family plan would be better',
          body: 'A family RESP lets siblings share one account and one grant-tracking record. If one child does not attend post-secondary, the other can use the entire balance including grants. Individual plans name a single beneficiary — changing beneficiaries is possible but requires paperwork and there are restrictions.',
        },
      ]}
      quickWins={[
        {
          title: 'The CESG is a 16% guaranteed return on the first $45,000 contributed',
          body: "A $7,200 lifetime grant on $45,000 of contributions (18 years × $2,500) is a 16% guaranteed return on that slice before any market growth. No TFSA or RRSP delivers a grant — the RESP is unique. Start contributing at birth.",
        },
        {
          title: 'Catch up one missed year by contributing $5,000',
          body: 'Contributing $5,000 in a single year recovers one prior missed year: $500 grant for the current year + $500 for one prior missed year = $1,000 in CESG. Only one missed year can be recovered per calendar year, so if you are behind by several years, catch up annually until current.',
        },
        {
          title: 'Family RESP simplifies management across siblings',
          body: 'One account, one statement, and siblings share the grant tracking. If the family plan is opened before the first child turns 18, subsequent children can be added as beneficiaries without opening new accounts.',
        },
      ]}
      relatedSubPages={[
        { title: 'RRSP', description: 'Contribution and deduction strategy', href: '/tax-planning-2026/rrsp' },
        { title: 'TFSA', description: 'Tax-free savings room', href: '/tax-planning-2026/tfsa' },
        { title: 'FHSA', description: 'First Home Savings Account', href: '/tax-planning-2026/fhsa' },
      ]}
      faqs={FAQS}
      pageMetadata={{
        title: 'RESP and CESG in 2026 | MapleTax Calculator',
        description: 'Maximize the 20% Canada Education Savings Grant. CESG projection calculator and age-17 rules explained.',
        canonical: `${BASE}/tax-planning-2026/resp`,
      }}
    >
      {/* How the CESG works */}
      <section id="how-cesg-works">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          The CESG: how the grant works
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            The <strong>Canada Education Savings Grant (CESG)</strong> adds 20% to the first $2,500
            contributed per year to an RESP, up to a maximum of <strong>$500 per beneficiary per year</strong>.
            The lifetime CESG cap per beneficiary is <strong>$7,200</strong>.
          </p>
          <p>
            CESG is earned from the year of birth until December 31 of the year the beneficiary turns
            17. That is a maximum of 18 eligible years — but only the years where you actually contribute
            generate a grant. There is no carry-forward: a year where you contribute nothing is simply lost.
          </p>
          <p>
            The RESP itself has no annual contribution limit. The <strong>lifetime contribution limit is
            $50,000 per beneficiary</strong>. Contributions above $50,000 attract a 1%/month penalty on
            the excess until the over-contribution is withdrawn.
          </p>
        </div>
      </section>

      {/* How much to contribute */}
      <section id="how-much-to-contribute">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          How much to contribute
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            Contributing exactly <strong>$2,500 per year</strong> maximizes the basic CESG. Contributing
            more does not increase the grant but does increase the tax-sheltered growth pool — which is
            valuable if you have room within the $50,000 lifetime cap.
          </p>
          <p>
            If you missed prior years, contribute <strong>$5,000 in a single year</strong> to catch up
            one missed year: $2,500 earns the current year&apos;s $500 grant, and the next $2,500 recovers
            $500 from one prior missed year. Only one missed year can be recovered per calendar year.
          </p>
          <p>
            Investment growth inside an RESP is tax-sheltered — dividends, interest, and capital gains
            are not taxed annually. When the student eventually withdraws as an Educational Assistance
            Payment (EAP), the growth and grants are taxed at the student&apos;s rate, which is typically
            very low.
          </p>
        </div>
      </section>

      {/* Additional CESG */}
      <section id="additional-cesg">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Additional CESG for lower-income families
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            Lower-income families may qualify for the <strong>Additional CESG</strong>, which layers on
            top of the basic 20% grant:
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <strong>20% Additional CESG</strong> on the first $500 contributed (up to $100/year extra)
              — for families with prior-year net income at or below <strong>$55,867</strong>
            </li>
            <li>
              <strong>10% Additional CESG</strong> on the first $500 contributed (up to $50/year extra)
              — for families with prior-year net income between $55,867 and <strong>$111,733</strong>
            </li>
          </ul>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Thresholds are based on 2025 family net income and are indexed annually. ESDC publishes updated
            thresholds each year.
          </p>
          <p>
            The Additional CESG is applied automatically by your RESP provider based on the family income
            CRA has on file from the prior tax return. Both parents must file their returns for the
            Additional CESG to be correctly calculated.
          </p>
        </div>
      </section>

      {/* CLB */}
      <section id="clb">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Canada Learning Bond (CLB)
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            The <strong>Canada Learning Bond (CLB)</strong> provides additional government money to
            qualifying low-income families, with no RESP contribution required to receive it:
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            <li><strong>$500</strong> at account opening (for children born after January 1, 2004 in qualifying families)</li>
            <li><strong>$100 per year</strong> for each subsequent eligible year, up to age 15</li>
            <li><strong>Lifetime maximum: $2,000</strong> per beneficiary</li>
          </ul>
          <p>
            CLB eligibility is determined by family income and the number of children. You must open an
            RESP to receive the CLB — even though no contribution is required — because the government
            deposits the bond directly into the account. CLB amounts must be repaid to the government if
            the account is closed without the beneficiary attending post-secondary.
          </p>
        </div>
      </section>

      {/* Individual vs. family */}
      <section id="individual-vs-family">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Individual vs. family RESP
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            An <strong>individual RESP</strong> names one beneficiary. Any subscriber can open one for any
            child — grandparents, aunts, uncles, or parents. There is no blood-relation requirement.
          </p>
          <p>
            A <strong>family RESP</strong> allows multiple siblings to share one account, provided all
            beneficiaries are related to the subscriber by blood or adoption. The advantage: if one
            sibling does not attend post-secondary, the other siblings can access the entire balance
            including grants, without any repayment. With individual plans, unused grants would need
            to be repaid to the government.
          </p>
          <p>
            Each beneficiary still has their own $50,000 lifetime contribution limit and $7,200 CESG
            lifetime cap — these are per-beneficiary, not per-account.
          </p>
        </div>
      </section>

      {/* No post-secondary */}
      <section id="no-postsec">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          What happens if no post-secondary
        </h2>
        <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>Options when the beneficiary does not attend qualifying post-secondary:</p>
          <ul className="mt-2 space-y-2 text-sm">
            <li>
              <strong>Transfer to another beneficiary:</strong> Substitute a sibling or other eligible
              relative. Grants stay in the account for the new beneficiary&apos;s use.
            </li>
            <li>
              <strong>Keep the account open:</strong> RESPs can stay open for up to 35 years. The
              beneficiary may change their mind, or go back to school later in life.
            </li>
            <li>
              <strong>Withdraw as an AIP:</strong> If the account is closed, grants (CESG, CLB) must be
              repaid to the government. The investment growth is returned to the subscriber as an
              <strong> Accumulated Income Payment (AIP)</strong>, taxed as ordinary income <em>plus</em> a
              20% penalty tax. Up to $50,000 of an AIP can be rolled into your RRSP (if you have unused
              room), avoiding the 20% penalty. Original contributions are returned tax-free.
            </li>
          </ul>
        </div>
      </section>

      {/* Age-17 special rules */}
      <section id="age17-rules">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Age-17 special rules
        </h2>
        <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-800 dark:bg-amber-950">
          <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
            Most common reason CESG stops unexpectedly
          </p>
          <div className="mt-2 space-y-2 text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
            <p>
              In the calendar years when the beneficiary is age 15, 16, or 17, the CESG is only paid if
              at least one of the following was true in a <em>prior</em> calendar year:
            </p>
            <ul className="mt-1 space-y-1 pl-4 list-disc">
              <li>At least <strong>$2,000</strong> was contributed to any RESP for this beneficiary in a single prior year, <em>or</em></li>
              <li>At least <strong>$100</strong> was contributed in at least <strong>four different prior calendar years</strong></li>
            </ul>
            <p className="mt-2">
              If neither condition is met, no CESG is paid in the final years regardless of how much you
              contribute. This catches families who open an RESP late — even contributing $10,000 when the
              child is 16 does not generate a grant if the prior-contribution conditions were not met.
            </p>
            <p>
              Verify your eligibility with your RESP provider before making large contributions in the
              final years.
            </p>
          </div>
        </div>
      </section>
    </SubPageTemplate>
  );
}
