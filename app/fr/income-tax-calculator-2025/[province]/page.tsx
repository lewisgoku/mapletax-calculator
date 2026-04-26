import type { Metadata } from 'next';
import ProvincePage from '@/components/ProvincePage';
import { PROVINCE_SLUGS_2025, PROVINCES_2025 } from '@/lib/rates/2025';

const BASE = 'https://mapletaxcalculator.ca';

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
    return { title: 'Province non trouvée' };
  }

  const title = `${prov.name} — calculateur d'impôt sur le revenu 2025`;
  const description = `Calculez votre salaire net 2025 pour ${prov.name} après impôt fédéral et provincial, RPC et AE.`;
  const canonical = `${BASE}/fr/income-tax-calculator-2025/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${BASE}/income-tax-calculator-2025/${slug}`,
        fr: canonical,
        'x-default': `${BASE}/income-tax-calculator-2025/${slug}`,
      },
    },
    openGraph: { title, description, type: 'website' },
  };
}

export default async function ProvincePageFr2025Route({
  params,
}: {
  params: Promise<{ province: string }>;
}) {
  const { province: slug } = await params;
  const code = PROVINCE_SLUGS_2025[slug];
  return <ProvincePage provinceCode={code} year={2025} locale="fr" />;
}
