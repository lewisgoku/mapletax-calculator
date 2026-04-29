import { Suspense } from 'react';
import type { Metadata } from 'next';
import ProvinceCompare from '@/components/ProvinceCompare';

export const metadata: Metadata = {
  title: 'Comparer les impôts provinciaux 2026 — calculateur côte à côte',
  description:
    "Comparez l'impôt sur le revenu, le salaire net et les taux d'imposition entre deux provinces canadiennes pour 2026. Choisissez deux provinces et un revenu — résultats instantanés.",
  alternates: {
    canonical: 'https://mapletaxcalculator.ca/fr/income-tax-calculator/compare',
    languages: {
      en: 'https://mapletaxcalculator.ca/income-tax-calculator/compare',
      fr: 'https://mapletaxcalculator.ca/fr/income-tax-calculator/compare',
      'x-default': 'https://mapletaxcalculator.ca/income-tax-calculator/compare',
    },
  },
  openGraph: {
    title: 'Comparer les impôts provinciaux 2026',
    description:
      "Comparaison côte à côte des impôts provinciaux canadiens 2026. Voyez la différence de salaire net entre deux provinces.",
    type: 'website',
    url: 'https://mapletaxcalculator.ca/fr/income-tax-calculator/compare',
  },
};

export default function ComparePageFr() {
  return (
    <main>
      <Suspense fallback={<div className="p-10 text-sm text-neutral-500">Chargement…</div>}>
        <ProvinceCompare />
      </Suspense>
    </main>
  );
}
