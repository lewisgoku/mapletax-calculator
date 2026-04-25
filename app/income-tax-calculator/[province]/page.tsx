import type { Metadata } from 'next';
import ProvincePage from '@/components/ProvincePage';
import { PROVINCE_SLUGS, PROVINCES_2026 } from '@/lib/rates/2026';

export function generateStaticParams() {
  return Object.keys(PROVINCE_SLUGS).map((slug) => ({ province: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ province: string }>;
}): Promise<Metadata> {
  const { province: slug } = await params;
  const code = PROVINCE_SLUGS[slug];
  const prov = PROVINCES_2026[code];

  if (!prov) {
    return { title: 'Province not found' };
  }

  const title = `${prov.name} income tax calculator 2026 — take-home pay`;
  const description = `Calculate your 2026 ${prov.name} take-home pay after federal and provincial income tax, CPP, and EI. See ${prov.name}'s tax brackets, rates, and credits.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://mapletaxcalculator.ca/income-tax-calculator/${slug}`,
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
  const code = PROVINCE_SLUGS[slug];

  return <ProvincePage provinceCode={code} year={2026} />;
}
