import { getTranslations } from 'next-intl/server';
import IncomeTaxCalculator from '@/components/IncomeTaxCalculator';
import BracketTable from '@/components/BracketTable';
import RelatedProvinces from '@/components/RelatedProvinces';
import FAQAccordion from '@/components/FAQAccordion';
import FAQSchema from '@/components/FAQSchema';
import { RATES_BY_YEAR, type TaxYear } from '@/lib/rates';
import { getProvinceContent } from '@/lib/content/provinces';
import { getFAQs, getProvinceFAQs } from '@/lib/content/faqs';
import type { Locale } from '@/i18n/config';

const GENERAL_FAQ_IDS = [
  'marginal-vs-average-rate',
  'taxable-income-calculation',
  'basic-personal-amount',
  'cpp-cpp2-2026',
  'ei-premiums',
  'rrsp-tax-reduction',
  'calculator-vs-cra-bill',
];

interface Props {
  provinceCode: string;
  year: TaxYear;
  locale?: Locale;
}

function Prose({ text }: { text: string }) {
  return (
    <>
      {text.split('\n\n').map((para, i) => (
        <p key={i} className="mt-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          {para}
        </p>
      ))}
    </>
  );
}

export default async function ProvincePage({ provinceCode, year, locale = 'en' }: Props) {
  const t = await getTranslations({ locale, namespace: 'Province' });
  const rates = RATES_BY_YEAR[year];
  const provinceData = rates.provinces[provinceCode];
  const content = getProvinceContent(provinceCode, year);

  const generalFaqs = getFAQs(GENERAL_FAQ_IDS);
  const provinceFaqs = getProvinceFAQs(provinceCode);
  const allFaqs = [...provinceFaqs, ...generalFaqs];

  const isQC = provinceCode === 'QC';
  const isON = provinceCode === 'ON';
  const isFr = locale === 'fr';
  const prefix = isFr ? '/fr' : '';

  const calcBase = year === 2026
    ? `${prefix}/income-tax-calculator`
    : `${prefix}/income-tax-calculator-2025`;

  const breadcrumbCalc = year === 2026
    ? t('breadcrumbCalc2026')
    : t('breadcrumbCalc2025');

  return (
    <main>
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-3xl px-6 pt-6 pb-2 text-sm text-neutral-500 dark:text-neutral-400"
      >
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <a href={prefix || '/'} className="hover:text-neutral-700 dark:hover:text-neutral-200">
              {t('breadcrumbHome')}
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <a href={calcBase} className="hover:text-neutral-700 dark:hover:text-neutral-200">
              {breadcrumbCalc}
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-neutral-900 dark:text-neutral-100">
            {provinceData.name}
          </li>
        </ol>
      </nav>

      {/* H1 */}
      <div className="mx-auto max-w-3xl px-6 pt-4 pb-2">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {isFr
            ? `${provinceData.name} — calculateur d'impôt sur le revenu ${year}`
            : `${provinceData.name} income tax calculator ${year}`}
        </h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">{content.intro}</p>
      </div>

      {/* Calculator */}
      <IncomeTaxCalculator defaultProvince={provinceCode} defaultYear={year} />

      {/* Provincial bracket table */}
      <section className="mx-auto max-w-3xl px-6 py-10">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          {year} {provinceData.name} {isFr ? "tranches d'imposition provinciales" : 'provincial tax brackets'}
        </h2>
        <p className="mt-1 mb-4 text-sm text-neutral-500 dark:text-neutral-400">
          {isFr
            ? "Ces taux s'appliquent à votre revenu imposable provincial. L'impôt fédéral est calculé séparément."
            : 'These rates apply to your provincial taxable income. Federal tax is calculated separately using federal brackets.'}
        </p>
        <BracketTable brackets={provinceData.brackets} />
      </section>

      {/* Prose content */}
      {isFr ? (
        <section className="mx-auto max-w-3xl px-6 pb-10">
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {t('frComingSoonNote')}
            </p>
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-3xl px-6 pb-10 space-y-8">
          {/* How it works */}
          <div>
            <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
              How {provinceData.name} income tax works in {year}
            </h2>
            <Prose text={content.howItWorks} />
          </div>

          {/* QC abatement callout */}
          {isQC && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-900 dark:bg-amber-950">
              <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
                Note on federal tax for Quebec residents
              </p>
              <p className="mt-1 text-sm text-amber-800 dark:text-amber-300">
                This calculator shows gross federal tax before the 16.5% Quebec abatement.
                Quebec residents receive a federal tax reduction to account for the province
                administering its own tax system. Your actual federal tax owing will be
                noticeably lower than the figure shown here.
              </p>
            </div>
          )}

          {/* ON surtax callout */}
          {isON && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-900 dark:bg-amber-950">
              <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
                Note on Ontario surtax
              </p>
              <p className="mt-1 text-sm text-amber-800 dark:text-amber-300">
                Ontario levies a surtax on provincial income tax exceeding ~$5,710. This
                calculator applies the published bracket rates but does not include the
                surtax. For higher incomes, your actual Ontario tax bill will be larger
                than shown here.
              </p>
            </div>
          )}

          {/* Recent changes */}
          {content.recentChanges && (
            <div>
              <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
                What changed for {year} in {provinceData.name}
              </h2>
              <Prose text={content.recentChanges} />
            </div>
          )}

          {/* Provincial quirks */}
          <div>
            <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
              What makes {provinceData.name}&apos;s tax system distinctive
            </h2>
            <Prose text={content.provincialQuirks} />
          </div>

          {/* Credits and deductions */}
          <div>
            <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
              {provinceData.name} tax credits and deductions
            </h2>
            <Prose text={content.creditsAndDeductions} />
          </div>
        </section>
      )}

      {/* FAQ */}
      <div className="mx-auto max-w-3xl px-6 pb-12">
        <FAQSchema faqs={allFaqs} />
        <FAQAccordion faqs={allFaqs} />
      </div>

      {/* Related provinces */}
      <section className="mx-auto max-w-3xl px-6 pb-12">
        <RelatedProvinces currentCode={provinceCode} year={year} locale={locale} />
      </section>

      {/* Disclaimer */}
      <footer className="mx-auto max-w-3xl px-6 pb-10">
        <p className="text-xs text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800 pt-6">
          {isFr
            ? `Estimations basées sur les taux publiés par l'ARC pour ${year}. Votre impôt réel peut différer. Ce n'est pas un conseil fiscal — consultez un professionnel.`
            : `Estimates based on ${year} CRA-published rates. Your actual tax may differ based on additional deductions and credits. Not tax advice — consult a professional before making financial decisions.`}
        </p>
      </footer>
    </main>
  );
}
