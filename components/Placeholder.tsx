interface Props {
  locale?: 'en' | 'fr';
}

export default function Placeholder({ locale = 'en' }: Props) {
  const isFr = locale === 'fr';
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <p className="text-4xl font-medium text-neutral-300 dark:text-neutral-700">—</p>
      <h1 className="mt-4 text-2xl font-medium text-neutral-900 dark:text-neutral-100">
        {isFr ? "Cette page n'existe pas encore." : 'This page does not exist yet.'}
      </h1>
      <p className="mt-3 text-neutral-500 dark:text-neutral-400">
        {isFr ? "Revenez bientôt — nous y travaillons." : "Check back soon — it's in progress."}
      </p>
      <a
        href={isFr ? '/fr' : '/'}
        className="mt-8 inline-block text-sm text-maple-red underline underline-offset-2 hover:opacity-70"
      >
        {isFr ? '← Accueil' : '← Back to calculator'}
      </a>
    </div>
  );
}
