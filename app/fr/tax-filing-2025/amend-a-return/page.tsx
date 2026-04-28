import type { Metadata } from 'next';

const BASE = 'https://mapletaxcalculator.ca';

export const metadata: Metadata = {
  title: 'Modifier votre déclaration 2025 | Calculateur MapleTax',
  description: 'Comment corriger votre déclaration T1 de 2025 via ReFILE ou T1-ADJ. Version française à venir.',
  alternates: {
    canonical: `${BASE}/fr/tax-filing-2025/amend-a-return`,
    languages: {
      en: `${BASE}/tax-filing-2025/amend-a-return`,
      fr: `${BASE}/fr/tax-filing-2025/amend-a-return`,
      'x-default': `${BASE}/tax-filing-2025/amend-a-return`,
    },
  },
};

export default function AmendReturnFrPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-6 py-12">
      <nav aria-label="Fil d'Ariane" className="mb-6 text-sm text-neutral-500 dark:text-neutral-400">
        <ol className="flex flex-wrap items-center gap-1">
          <li><a href="/fr" className="hover:text-neutral-700 dark:hover:text-neutral-200">Accueil</a></li>
          <li aria-hidden="true">/</li>
          <li><a href="/fr/tax-filing-2025" className="hover:text-neutral-700 dark:hover:text-neutral-200">Déclaration 2025</a></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-neutral-900 dark:text-neutral-100">Modifier une déclaration</li>
        </ol>
      </nav>
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        Comment modifier votre déclaration de revenus 2025
      </h1>
      <p className="mt-4 max-w-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
        Cette page sera bientôt disponible en français. Consultez la version anglaise en attendant.
      </p>
      <a
        href="/tax-filing-2025/amend-a-return"
        className="mt-6 inline-block rounded-lg border border-neutral-300 px-4 py-2 text-sm text-neutral-700 hover:border-neutral-500 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-500"
      >
        View in English
      </a>
    </main>
  );
}
