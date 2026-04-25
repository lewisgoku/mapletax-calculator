import type { Metadata } from 'next';
import ProvincePage from '@/components/ProvincePage';
import { PROVINCE_SLUGS_2025, PROVINCES_2025 } from '@/lib/rates/2025';

export function generateStaticParams() {
  return Object.keys(PROVINCE_SLUGS_2025).map((slug) => ({ province: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ province: string }>;
}): Promise<Metadata> {
  const { province: slug } = await params;
  const code = PROVINCE_SLUGS_2025[slug];
  const prov = PROVINCES_2025[code];

  if (!prov) {
    return { title: 'Province not found' };
  }

  const title = `${prov.name} income tax calculator 2025 — take-home pay`;
  const description = `Calculate your 2025 ${prov.name} take-home pay after federal and provincial income tax, CPP, and EI. See ${prov.name}'s 2025 tax brackets, rates, and credits.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://mapletaxcalculator.ca/income-tax-calculator-2025/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

export default async function ProvincePageRoute({
  params,
}: {
  params: Promise<{ province: string }>;
}) {
  const { province: slug } = await params;
  const code = PROVINCE_SLUGS_2025[slug];

  return <ProvincePage provinceCode={code} year={2025} />;
}
