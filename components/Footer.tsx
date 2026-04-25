import Link from 'next/link';
import LanguageToggle from './LanguageToggle';

const COLUMNS = [
  {
    heading: 'Calculators',
    links: [
      { label: 'Income Tax 2026', href: '/income-tax-calculator' },
      { label: 'Income Tax 2025', href: '/income-tax-calculator-2025' },
      { label: 'Compare Provinces', href: '/compare-provinces' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Guides', href: '/guides' },
      { label: "What's New 2026", href: '/whats-new-2026' },
      { label: 'Tax Filing 2025', href: '/tax-filing-2025' },
      { label: 'Tax Planning 2026', href: '/tax-planning-2026' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Disclaimer', href: '/disclaimer' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="mb-3 font-black text-base tracking-tighter text-zinc-900 dark:text-zinc-100">
              MapleTax Calculator
            </div>
            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              © {new Date().getFullYear()} MapleTax Calculator. For informational purposes only.
            </p>
          </div>

          {/* Link columns */}
          {COLUMNS.map(({ heading, links }) => (
            <div key={heading} className="flex flex-col gap-2">
              <span className="mb-1 text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">
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
          <p className="max-w-2xl text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            Estimates based on CRA-published rates. Your actual tax may differ based on additional
            deductions and credits. Not tax advice — consult a professional before making financial
            decisions.
          </p>
          <div className="shrink-0">
            <LanguageToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
