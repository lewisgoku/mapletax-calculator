import type { Metadata } from 'next';
import IncomeTaxCalculator from '@/components/IncomeTaxCalculator';
import FAQAccordion from '@/components/FAQAccordion';
import FAQSchema from '@/components/FAQSchema';
import { PROVINCES_2026, PROVINCE_CODES } from '@/lib/rates/2026';
import { getFAQs } from '@/lib/content/faqs';

const BASE = 'https://mapletaxcalculator.ca';

export const metadata: Metadata = {
  title: "Calculateur d'impôt sur le revenu canadien 2026 — fédéral et toutes les provinces",
  description:
    "Calculateur d'impôt canadien gratuit pour 2026. Calculez votre impôt fédéral et provincial, le RPC, l'AE et votre salaire net. Calcul en temps réel, sans inscription.",
  alternates: {
    canonical: `${BASE}/fr/income-tax-calculator`,
    languages: {
      en: `${BASE}/income-tax-calculator`,
      fr: `${BASE}/fr/income-tax-calculator`,
      'x-default': `${BASE}/income-tax-calculator`,
    },
  },
  openGraph: {
    title: "Calculateur d'impôt sur le revenu canadien 2026",
    description:
      "Calculez votre salaire net 2026 après impôt fédéral et provincial, RPC et AE.",
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

export default function IncomeTaxCalculatorFrPage() {
  return (
    <main>
      <IncomeTaxCalculator />

      <div className="mx-auto max-w-3xl px-6 py-12">
        <FAQSchema faqs={pageFaqs} />
        <FAQAccordion faqs={pageFaqs} />
      </div>

      <section className="mx-auto max-w-3xl px-6 pb-12">
        <h2 className="text-2xl font-medium">
          Calculateurs par province
        </h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Vous préférez une page propre à votre province ?
        </p>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {PROVINCE_CODES.map((code) => {
            const name = PROVINCES_2026[code].name;
            const slug = name.toLowerCase().replace(/ /g, '-');
            return (
              <li key={code}>
                <a
                  href={`/fr/income-tax-calculator/${slug}`}
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
                >
                  {name} — calculateur d'impôt →
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
