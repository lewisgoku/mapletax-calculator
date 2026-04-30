import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of service for MapleTax Calculator. Free to use, provided as-is, for informational purposes only.',
  alternates: {
    canonical: 'https://mapletaxcalculator.ca/terms',
    languages: {
      'en': 'https://mapletaxcalculator.ca/terms',
      'fr': 'https://mapletaxcalculator.ca/fr/terms',
      'x-default': 'https://mapletaxcalculator.ca/terms',
    },
  },
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
        Last updated: April 28, 2026
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
        <section>
          <h2 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Service description
          </h2>
          <p>
            MapleTax Calculator is a free, browser-based tool that estimates Canadian federal and
            provincial income tax, CPP contributions, and EI premiums. It is provided for
            informational purposes only. No registration, payment, or account is required to use
            it.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
            No warranty
          </h2>
          <p>
            This site and its content are provided &ldquo;as is&rdquo; without warranty of any
            kind, express or implied. We make no warranty that the calculator is accurate, complete,
            up to date, or fit for any particular purpose. Tax law changes frequently; estimates
            may not reflect the most recent amendments.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Not professional advice
          </h2>
          <p>
            Calculator output is an estimate only. It does not constitute tax, legal, or financial
            advice and should not be relied upon as such. Consult a qualified tax professional
            before making decisions based on the results shown. See our{' '}
            <a
              href="/disclaimer"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              Disclaimer
            </a>{' '}
            for a full description of known limitations.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Limitation of liability
          </h2>
          <p>
            To the maximum extent permitted by applicable law, MapleTax Calculator and its
            operators shall not be liable for any direct, indirect, incidental, consequential, or
            special damages arising out of or in any way connected with use of this site or its
            content, even if advised of the possibility of such damages.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Intellectual property
          </h2>
          <p>
            The content, design, and code of this site are owned by the operator. CRA rate data
            reproduced here is Crown copyright and is used for informational, non-commercial
            purposes in accordance with the Government of Canada&apos;s reproduction policy.
            Provincial rate data is reproduced from publicly available government sources for the
            same purpose.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Acceptable use
          </h2>
          <p>You agree not to:</p>
          <ul className="mt-3 space-y-1.5 pl-4 list-disc">
            <li>
              Scrape, crawl, or systematically extract content from this site beyond normal
              browser use
            </li>
            <li>
              Submit automated or high-volume requests that place unreasonable load on our
              infrastructure
            </li>
            <li>
              Redistribute, resell, or repackage the rate data on this site as part of a competing
              product without attribution
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Governing law
          </h2>
          <p>
            These terms are governed by the laws of the Province of Ontario and the federal laws
            of Canada applicable therein. Any disputes shall be subject to the exclusive
            jurisdiction of the courts of Ontario.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Changes to these terms
          </h2>
          <p>
            We may update these terms at any time. The updated date at the top of this page
            reflects the most recent revision. Continued use of the site after changes are posted
            constitutes your acceptance of the revised terms.
          </p>
        </section>
      </div>
    </main>
  );
}
