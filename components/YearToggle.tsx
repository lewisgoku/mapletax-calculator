'use client';

import { SUPPORTED_YEARS, type TaxYear } from '@/lib/rates';

interface Props {
  year: TaxYear;
  onChange: (y: TaxYear) => void;
  className?: string;
  ariaLabel?: string;
}

export default function YearToggle({ year, onChange, className = '', ariaLabel = 'Tax year' }: Props) {
  return (
    <div
      className={`inline-flex rounded-lg border border-neutral-200 dark:border-neutral-700 ${className}`}
      role="group"
      aria-label={ariaLabel}
    >
      {SUPPORTED_YEARS.map((y, i) => (
        <button
          key={y}
          onClick={() => onChange(y)}
          aria-pressed={year === y}
          className={[
            'px-4 py-1.5 text-sm font-medium transition-colors',
            i === 0 ? 'rounded-l-lg' : '',
            i === SUPPORTED_YEARS.length - 1 ? 'rounded-r-lg' : '',
            i > 0 ? 'border-l border-neutral-200 dark:border-neutral-700' : '',
            year === y
              ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
              : 'bg-white text-neutral-600 hover:text-neutral-900 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:text-white',
          ].join(' ')}
        >
          {y}
        </button>
      ))}
    </div>
  );
}
