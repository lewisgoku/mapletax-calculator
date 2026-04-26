'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function toggleLocale(target: 'en' | 'fr') {
    if (target === locale) return;
    let newPath: string;
    if (target === 'fr') {
      newPath = `/fr${pathname === '/' ? '' : pathname}`;
    } else {
      newPath = pathname.startsWith('/fr/') ? pathname.slice(3) : pathname === '/fr' ? '/' : pathname;
    }
    router.push(newPath);
  }

  return (
    <div
      className="inline-flex border border-zinc-300 dark:border-zinc-700"
      role="group"
      aria-label="Language / Langue"
    >
      {(['en', 'fr'] as const).map((l, i) => (
        <button
          key={l}
          onClick={() => toggleLocale(l)}
          aria-pressed={locale === l}
          className={[
            'px-3 py-1 font-bold uppercase text-xs tracking-tight transition-colors',
            i > 0 ? 'border-l border-zinc-300 dark:border-zinc-700' : '',
            locale === l
              ? 'bg-charcoal text-white dark:bg-white dark:text-charcoal'
              : 'bg-white text-zinc-600 hover:text-charcoal dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-white',
            compact ? 'py-0.5' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
