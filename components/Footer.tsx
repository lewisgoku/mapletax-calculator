'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import LanguageToggle from './LanguageToggle';

export default function Footer() {
  const t = useTranslations('Footer');
  const locale = useLocale();
  const prefix = locale === 'fr' ? '/fr' : '';

  const COLUMNS = [
    {
      heading: t('calculators'),
      links: [
        { label: t('incomeTax2026'),     href: `${prefix}/income-tax-calculator` },
        { label: t('incomeTax2025'),     href: `${prefix}/income-tax-calculator-2025` },
        { label: t('compareProvinces'), href: `${prefix}/income-tax-calculator/compare` },
      ],
    },
    {
      heading: t('resources'),
      links: [
        { label: t('guides'),          href: `${prefix}/guides` },
        { label: t('whatsNew2026'),    href: `${prefix}/whats-new-2026` },
        { label: t('taxFiling2025'),   href: `${prefix}/tax-filing-2025` },
        { label: t('taxPlanning2026'), href: `${prefix}/tax-planning-2026` },
      ],
    },
    {
      heading: t('legal'),
      links: [
        { label: t('disclaimerLink'), href: `${prefix}/disclaimer` },
        { label: t('privacy'),        href: `${prefix}/privacy` },
        { label: t('terms'),          href: `${prefix}/terms` },
      ],
    },
  ];

  return (
    <footer className="w-full border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="mb-3 font-black text-base tracking-tighter text-zinc-900 dark:text-zinc-100">
              {t('wordmark')}
            </div>
            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              {t('copyright', { year: new Date().getFullYear() })}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-400 dark:text-zinc-500">
              Developed and managed by{' '}
              <a
                href="mailto:tech@nzmgroup.ca"
                className="underline hover:text-zinc-600 dark:hover:text-zinc-300"
              >
                NZM Tech
              </a>
            </p>
          </div>

          {/* Link columns */}
          {COLUMNS.map(({ heading, links }) => (
            <div key={heading} className="flex flex-col gap-2">
              <span className="mb-1 text-xs font-bold tracking-widest text-zinc-900 dark:text-zinc-100">
                {heading}
              </span>
              {links.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-xs text-zinc-500 underline hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom row: disclaimer + language toggle */}
        <div className="mt-10 flex flex-col gap-4 border-t border-zinc-200 pt-6 dark:border-zinc-800 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              {t('disclaimerFull')}
            </p>
            <p className="text-xs leading-relaxed text-zinc-400 dark:text-zinc-600">
              {t.rich('geoNotice', {
                link: (chunks) => (
                  <a
                    href="https://ipapi.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-zinc-600 dark:hover:text-zinc-400"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </div>
          <div className="shrink-0">
            <LanguageToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
