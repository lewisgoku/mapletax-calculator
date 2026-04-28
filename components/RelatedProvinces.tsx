import { PROVINCES_2026 } from '@/lib/rates/2026';
import type { TaxYear } from '@/lib/rates';
import type { Locale } from '@/i18n/config';

/** Hardcoded geographic/comparable neighbors — 3 per province. */
export const NEIGHBORS: Record<string, [string, string, string]> = {
  BC:  ['AB', 'YT', 'ON'],
  AB:  ['BC', 'SK', 'ON'],
  SK:  ['AB', 'MB', 'ON'],
  MB:  ['SK', 'ON', 'AB'],
  ON:  ['QC', 'MB', 'AB'],
  QC:  ['ON', 'NB', 'NS'],
  NB:  ['QC', 'NS', 'PE'],
  NS:  ['NB', 'PE', 'NL'],
  PE:  ['NS', 'NB', 'NL'],
  NL:  ['NS', 'NB', 'PE'],
  YT:  ['BC', 'NT', 'NU'],
  NT:  ['YT', 'NU', 'BC'],
  NU:  ['NT', 'YT', 'NL'],
};

interface Props {
  currentCode: string;
  year: TaxYear;
  locale?: Locale;
}

function provinceSlug(name: string): string {
  return name.toLowerCase().replace(/ /g, '-');
}

export default function RelatedProvinces({ currentCode, year, locale = 'en' }: Props) {
  const codes = NEIGHBORS[currentCode] ?? [];
  const prefix = locale === 'fr' ? '/fr' : '';
  const base = year === 2026
    ? `${prefix}/income-tax-calculator`
    : `${prefix}/income-tax-calculator-2025`;

  const heading = locale === 'fr' ? "Comparer d'autres provinces" : 'Compare other provinces';
  const subtitle = locale === 'fr'
    ? `Calculateur d'impôt ${year} →`
    : `${year} income tax calculator →`;

  return (
    <section>
      <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
        {heading}
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-3">
        {codes.map((code) => {
          const prov = PROVINCES_2026[code];
          if (!prov) return null;
          const slug = provinceSlug(prov.name);
          const href = `${base}/${slug}`;
          return (
            <li key={code}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm transition-colors hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-600 dark:hover:bg-neutral-900"
              >
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  {prov.name}
                </span>
                <span className="mt-0.5 block text-xs text-neutral-500">
                  {subtitle}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
