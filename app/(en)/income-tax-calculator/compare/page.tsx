import { Suspense } from 'react';
import type { Metadata } from 'next';
import ProvinceCompare from '@/components/ProvinceCompare';

export const metadata: Metadata = {
  title: 'Compare province taxes 2026 — side-by-side calculator',
  description:
    'Compare income tax, take-home pay, and tax rates between any two Canadian provinces for 2026. Pick two provinces and an income — results update instantly.',
  alternates: {
    canonical: 'https://mapletaxcalculator.ca/income-tax-calculator/compare',
    languages: {
      en: 'https://mapletaxcalculator.ca/income-tax-calculator/compare',
      'x-default': 'https://mapletaxcalculator.ca/income-tax-calculator/compare',
    },
  },
  openGraph: {
    title: 'Compare province taxes 2026',
    description:
      'Side-by-side 2026 Canadian provincial tax comparison. See the take-home difference between any two provinces instantly.',
    type: 'website',
    url: 'https://mapletaxcalculator.ca/income-tax-calculator/compare',
  },
};

export default function ComparePage() {
  return (
    <main>
      <Suspense fallback={<div className="p-10 text-sm text-neutral-500">Loading…</div>}>
        <ProvinceCompare />
      </Suspense>
    </main>
  );
}
