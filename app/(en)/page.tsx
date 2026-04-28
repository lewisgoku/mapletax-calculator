import type { Metadata } from 'next';
import IncomeTaxCalculator from '@/components/IncomeTaxCalculator';
import { PROVINCES_2026, PROVINCE_CODES } from '@/lib/rates/2026';

const BASE = 'https://mapletaxcalculator.ca';

export const metadata: Metadata = {
  title: 'Canadian income tax calculator 2026 — federal and all provinces',
  description:
    'Free 2026 Canadian income tax calculator. See federal tax, provincial tax, CPP, EI, and take-home pay for every province. Live calculation, no sign-up.',
  alternates: {
    canonical: BASE,
    languages: {
      en: BASE,
      fr: `${BASE}/fr`,
      'x-default': BASE,
    },
  },
  openGraph: {
    title: 'Canadian income tax calculator 2026',
    description:
      'Calculate your 2026 take-home pay after federal and provincial tax, CPP, and EI.',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      <IncomeTaxCalculator />

      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="text-2xl font-medium">Calculators for each province</h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Prefer a province-specific page? Jump straight to the one you need.
        </p>
        <ul className="mt-6 grid gap-2 grid-cols-2">
          {PROVINCE_CODES.map((code) => {
            const name = PROVINCES_2026[code].name;
            const slug = name.toLowerCase().replace(/ /g, '-');
            return (
              <li key={code}>
                <a
                  href={`/income-tax-calculator/${slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
                >
                  {name} income tax calculator →
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
