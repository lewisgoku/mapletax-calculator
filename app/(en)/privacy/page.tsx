import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'MapleTax Calculator collects no personal data. All tax calculations happen in your browser. Learn what we do and do not collect.',
  alternates: {
    canonical: 'https://mapletaxcalculator.ca/privacy',
    languages: {
      'en': 'https://mapletaxcalculator.ca/privacy',
      'fr': 'https://mapletaxcalculator.ca/fr/privacy',
      'x-default': 'https://mapletaxcalculator.ca/privacy',
    },
  },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
        Last updated: April 28, 2026
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
        <section>
          <h2 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
            The short version
          </h2>
          <p>
            All tax calculations happen entirely in your browser — no financial data you enter is
            ever sent to a server. We use one privacy-first analytics tool that sets no cookies and
            collects no personal information. We do not sell data, run ads, or share anything with
            third parties for commercial purposes.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Analytics — what we collect
          </h2>
          <p>
            We use{' '}
            <a
              href="https://plausible.io"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              Plausible Analytics
            </a>
            , a privacy-first service that collects only anonymous, aggregate data: page views,
            referrer URLs, browser type, and country-level location. Plausible is GDPR-compliant by
            design, sets no cookies, and never tracks individuals across sessions or sites. No IP
            addresses are stored. No personal data of any kind leaves your device as a result of
            analytics.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
            What we do not collect
          </h2>
          <ul className="space-y-1.5 pl-4 list-disc">
            <li>Your name, email address, or any account information (there are no accounts)</li>
            <li>
              Your income, RRSP, or any financial inputs — these are computed locally in your
              browser and never transmitted
            </li>
            <li>Advertising or retargeting cookies of any kind</li>
            <li>Google Analytics, Meta Pixel, or any other third-party tracking scripts</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Geolocation
          </h2>
          <p>
            To suggest your province automatically, we query{' '}
            <a
              href="https://ipapi.co"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              ipapi.co
            </a>{' '}
            using your IP address on first visit. This lookup returns a province code (e.g.
            &ldquo;BC&rdquo;) — we do not store or log the result on our end. The result is cached
            in your browser&apos;s localStorage for 30 days so repeat visits do not trigger a new
            lookup. You can override the suggested province at any time using the province selector.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
            localStorage — browser storage
          </h2>
          <p>
            We store three small values in your browser&apos;s localStorage to remember your
            preferences between visits:
          </p>
          <ul className="mt-3 space-y-1.5 pl-4 list-disc">
            <li>
              <strong className="font-medium text-neutral-900 dark:text-neutral-100">
                mapletax:user-province
              </strong>{' '}
              — the province you selected
            </li>
            <li>
              <strong className="font-medium text-neutral-900 dark:text-neutral-100">
                mapletax:tax-year
              </strong>{' '}
              — the tax year you last used (2025 or 2026)
            </li>
            <li>
              <strong className="font-medium text-neutral-900 dark:text-neutral-100">
                mapletax_yearend_2026
              </strong>{' '}
              — your year-end checklist progress
            </li>
          </ul>
          <p className="mt-3">
            These values live only in your browser and are never transmitted to us. You can clear
            them at any time by clearing your browser&apos;s site data for mapletaxcalculator.ca.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Cookies
          </h2>
          <p>
            This site sets no cookies. Plausible Analytics operates without cookies. No consent
            banner is required or displayed.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Children
          </h2>
          <p>
            This site is not directed at children under 13. We do not knowingly collect any
            information from children.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Changes to this policy
          </h2>
          <p>
            If we make material changes to this policy, we will update the date at the top of this
            page. Continued use of the site after any change constitutes acceptance of the updated
            policy.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Contact
          </h2>
          <p>
            Questions about this policy can be sent to{' '}
            <a
              href="mailto:privacy@mapletaxcalculator.ca"
              className="underline underline-offset-2 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              privacy@mapletaxcalculator.ca
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
