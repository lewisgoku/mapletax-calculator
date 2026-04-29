'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import LanguageToggle from './LanguageToggle';

export default function Nav() {
  const t = useTranslations('Nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);

  const prefix = locale === 'fr' ? '/fr' : '';

  const NAV_LINKS = [
    { label: t('incomeTax'),        href: `${prefix}/income-tax-calculator` },
    { label: t('compareProvinces'), href: `${prefix}/income-tax-calculator/compare` },
    { label: t('taxFiling2025'),    href: `${prefix}/tax-filing-2025` },
    { label: t('taxPlanning2026'),  href: `${prefix}/tax-planning-2026` },
    { label: t('guides'),           href: `${prefix}/guides` },
  ];

  function isActive(href: string) {
    // Exact match always wins
    if (pathname === href) return true;
    // Another nav item is an exact match — only that item should be active
    if (NAV_LINKS.some((l) => l.href !== href && l.href === pathname)) return false;
    // Fall back to prefix match for sub-pages not in the nav (e.g. province pages)
    return pathname.startsWith(href + '/');
  }

  function closeSheet() {
    setSheetOpen(false);
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
          {/* Wordmark */}
          <Link
            href={prefix || '/'}
            className="text-xl font-black tracking-tighter text-maple-red"
          >
            {t('wordmark')}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={[
                  'font-bold text-xs tracking-tight transition-colors',
                  isActive(href)
                    ? 'border-b-2 border-maple-red pb-0.5 text-maple-red'
                    : 'text-zinc-600 hover:text-maple-red dark:text-zinc-400 dark:hover:text-maple-red',
                ].join(' ')}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop right: language toggle */}
          <div className="hidden md:flex items-center">
            <LanguageToggle />
          </div>

          {/* Mobile: hamburger */}
          <button
            className="flex md:hidden items-center justify-center p-2 text-zinc-600 dark:text-zinc-400"
            aria-label={sheetOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={sheetOpen}
            onClick={() => setSheetOpen((o) => !o)}
          >
            {sheetOpen ? (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
              </svg>
            ) : (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile sheet — full-height overlay */}
      {sheetOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            aria-hidden="true"
            onClick={closeSheet}
          />

          {/* Sheet panel */}
          <nav
            className="fixed inset-y-0 right-0 z-50 flex w-80 max-w-full flex-col overflow-y-auto bg-white dark:bg-zinc-950 md:hidden"
            aria-label="Mobile navigation"
          >
            {/* Sheet header */}
            <div className="flex h-16 items-center justify-between border-b border-zinc-200 px-6 dark:border-zinc-800">
              <Link
                href={prefix || '/'}
                className="text-xl font-black tracking-tighter text-maple-red"
                onClick={closeSheet}
              >
                {t('wordmarkShort')}
              </Link>
              <button
                onClick={closeSheet}
                aria-label={t('closeMenu')}
                className="p-2 text-zinc-600 dark:text-zinc-400"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                </svg>
              </button>
            </div>

            {/* Sheet links */}
            <ul className="flex-1 px-6 py-8 space-y-1">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={closeSheet}
                    className={[
                      'block py-3 font-bold uppercase text-sm tracking-tight transition-colors border-b border-zinc-100 dark:border-zinc-800',
                      isActive(href)
                        ? 'text-maple-red'
                        : 'text-zinc-700 hover:text-maple-red dark:text-zinc-300',
                    ].join(' ')}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Sheet footer: language toggle */}
            <div className="border-t border-zinc-200 px-6 py-6 dark:border-zinc-800">
              <LanguageToggle />
            </div>
          </nav>
        </>
      )}
    </>
  );
}
