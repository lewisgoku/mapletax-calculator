'use client';

import { useState } from 'react';

// TODO: Wire up actual i18n routing with next-intl in a later session.
// Currently this is a visual stub — selecting FR shows state change but
// does not redirect to /fr/* routes.

export default function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const [lang, setLang] = useState<'EN' | 'FR'>('EN');

  return (
    <div
      className="inline-flex border border-zinc-300 dark:border-zinc-700"
      role="group"
      aria-label="Language selection"
    >
      {(['EN', 'FR'] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={[
            'px-3 py-1 font-bold uppercase text-xs tracking-tight transition-colors',
            lang === l
              ? 'bg-charcoal text-white dark:bg-white dark:text-charcoal'
              : 'bg-white text-zinc-600 hover:text-charcoal dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-white',
            compact ? 'py-0.5' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
