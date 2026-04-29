import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Planification fiscale 2026 pour travailleurs autonomes | Calculateur MapleTax',
  description:
    'Acomptes provisionnels, double cotisation RPC, TPS/TVH, bureau à domicile et déductions de véhicule pour travailleurs autonomes en 2026. Version française à venir.',
  alternates: {
    canonical: 'https://mapletaxcalculator.ca/fr/tax-planning-2026/self-employed',
    languages: {
      en: 'https://mapletaxcalculator.ca/tax-planning-2026/self-employed',
      fr: 'https://mapletaxcalculator.ca/fr/tax-planning-2026/self-employed',
      'x-default': 'https://mapletaxcalculator.ca/tax-planning-2026/self-employed',
    },
  },
};

export default function SelfEmployedFrPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-6 py-12">
      <nav aria-label="Fil d'Ariane" className="mb-6 text-sm text-neutral-500 dark:text-neutral-400">
        <ol className="flex flex-wrap items-center gap-1">
          <li><a href="/fr" className="hover:text-neutral-700 dark:hover:text-neutral-200">Accueil</a></li>
          <li aria-hidden="true">/</li>
          <li><a href="/fr/tax-planning-2026" className="hover:text-neutral-700 dark:hover:text-neutral-200">Planification fiscale 2026</a></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-neutral-900 dark:text-neutral-100">Travailleur autonome</li>
        </ol>
      </nav>
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        Planification fiscale 2026 pour travailleurs autonomes
      </h1>
      <p className="mt-4 max-w-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
        Cette page sera bientôt disponible en français. En attendant, consultez la version anglaise.
      </p>
      <a
        href="/tax-planning-2026/self-employed"
        className="mt-6 inline-block rounded-lg border border-neutral-300 px-4 py-2 text-sm text-neutral-700 hover:border-neutral-500 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-500"
      >
        View in English
      </a>
    </main>
  );
}
