import type { Metadata } from 'next';
import IncomeTaxCalculator from '@/components/IncomeTaxCalculator';
import FAQAccordion from '@/components/FAQAccordion';
import FAQSchema from '@/components/FAQSchema';
import { PROVINCES_2025, PROVINCE_CODES_2025 } from '@/lib/rates/2025';
import { getFAQs } from '@/lib/content/faqs';

const BASE = 'https://mapletaxcalculator.ca';

export const metadata: Metadata = {
  title: 'Canadian income tax calculator 2025 — federal and all provinces',
  description:
    'Free 2025 Canadian income tax calculator. See federal tax, provincial tax, CPP, EI, and take-home pay for every province. Useful for late filers and prior-year comparisons.',
  alternates: {
    canonical: `${BASE}/income-tax-calculator-2025`,
    languages: {
      en: `${BASE}/income-tax-calculator-2025`,
      fr: `${BASE}/fr/income-tax-calculator-2025`,
      'x-default': `${BASE}/income-tax-calculator-2025`,
    },
  },
  openGraph: {
    title: 'Canadian income tax calculator 2025',
    description:
      'Calculate your 2025 take-home pay after federal and provincial tax, CPP, and EI.',
    type: 'website',
  },
};

const FAQ_IDS = [
  'marginal-vs-average-rate',
  'taxable-income-calculation',
  'basic-personal-amount',
  'cpp-cpp2-2026',
  'ei-premiums',
  'quebec-tax-system',
  'rrsp-tax-reduction',
  'calculator-vs-cra-bill',
];

const pageFaqs = getFAQs(FAQ_IDS);

export default function IncomeTaxCalculator2025Page() {
  return (
    <main>
      <IncomeTaxCalculator defaultYear={2025} />

      <div className="mx-auto max-w-3xl px-6 py-12">
        <FAQSchema faqs={pageFaqs} />
        <FAQAccordion faqs={pageFaqs} />
      </div>

      <section className="mx-auto max-w-3xl px-6 pb-12">
        <h2 className="text-2xl font-medium">
          Province-specific 2025 calculators
        </h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Looking for 2026 rates instead?{' '}
          <a
            href="/income-tax-calculator"
            className="underline underline-offset-2 hover:opacity-70"
          >
            Use the 2026 calculator.
          </a>
        </p>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {PROVINCE_CODES_2025.map((code) => {
            const name = PROVINCES_2025[code].name;
            const slug = name.toLowerCase().replace(/ /g, '-');
            return (
              <li key={code}>
                <a
                  href={`/income-tax-calculator-2025/${slug}`}
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
                >
                  {name} income tax calculator →
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
