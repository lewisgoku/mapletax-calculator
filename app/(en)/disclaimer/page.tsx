import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description:
    'MapleTax Calculator is an estimation tool only. Read our disclaimer on accuracy, data sources, and the limitations of our tax calculations.',
  alternates: {
    canonical: 'https://mapletaxcalculator.ca/disclaimer',
  },
};

export default function DisclaimerPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
        Disclaimer
      </h1>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
        Last updated: April 28, 2026
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
        <section>
          <h2 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Estimates, not guarantees
          </h2>
          <p>
            MapleTax Calculator provides estimates of Canadian federal and provincial income tax,
            CPP contributions, and EI premiums based on CRA-published rates and bracket schedules.
            These estimates are a starting point — your actual tax liability will depend on
            circumstances the calculator does not capture, including additional credits, deductions,
            and income sources specific to your situation.
          </p>
          <p className="mt-3">
            The only authoritative figure is the Notice of Assessment issued by the Canada Revenue
            Agency after your return is processed.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Not professional tax advice
          </h2>
          <p>
            Nothing on this site constitutes tax, legal, or financial advice. Using this calculator
            does not create an accountant-client, advisor-client, or any other professional
            relationship. We strongly recommend consulting a Chartered Professional Accountant (CPA)
            or a qualified tax professional before making financial decisions based on any output
            from this tool.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Data sources
          </h2>
          <p>
            Federal tax brackets, the Basic Personal Amount, and CPP/EI rates are sourced from the
            Canada Revenue Agency. Provincial and territorial rates are sourced from each
            jurisdiction&apos;s finance ministry, budget documents, and official tax legislation.
            Rates are reviewed and updated each November or December when CRA publishes the
            following year&apos;s indexation figures.
          </p>
          <p className="mt-3">
            Between annual updates, mid-year legislative changes — such as budget amendments —
            may not be reflected immediately. We note known uncertainties (such as the 2026 capital
            gains inclusion rate) with editorial disclaimers on affected pages.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Known limitations
          </h2>
          <p>This calculator does not model:</p>
          <ul className="mt-3 space-y-1.5 pl-4 list-disc">
            <li>Alternative Minimum Tax (AMT)</li>
            <li>Trust income, estate income, or corporate income</li>
            <li>Foreign income and foreign tax credits</li>
            <li>Instalment interest and late-filing penalties</li>
            <li>Ontario surtax in full complexity</li>
            <li>Quebec abatement edge cases and Revenu Québec-specific credits</li>
            <li>
              Benefit phase-outs such as OAS clawback, CCB income testing, and GST/HST credit
              reduction
            </li>
            <li>Provincial refundable credits beyond the standard calculation</li>
          </ul>
          <p className="mt-3">
            For complex situations — multiple income sources, self-employment with significant
            expenses, non-resident status, or large capital gains — please consult a tax
            professional.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
            No liability
          </h2>
          <p>
            MapleTax Calculator and its operators make no warranties, express or implied, regarding
            the accuracy, completeness, or fitness for purpose of any information on this site. To
            the maximum extent permitted by applicable law, we accept no liability for any loss,
            damage, or expense arising directly or indirectly from reliance on the
            calculator&apos;s output.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Third-party links
          </h2>
          <p>
            This site links to government websites (canada.ca, provincial finance ministries, and
            Revenu Québec) for reference. These links are provided for convenience only. We are not
            responsible for the content, accuracy, or availability of external sites, and linking
            to them does not imply endorsement.
          </p>
        </section>
      </div>
    </main>
  );
}
