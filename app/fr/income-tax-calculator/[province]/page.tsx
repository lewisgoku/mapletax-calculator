import type { Metadata } from 'next';
import ProvincePage from '@/components/ProvincePage';
import { PROVINCE_SLUGS, PROVINCES_2026 } from '@/lib/rates/2026';

const BASE = 'https://mapletaxcalculator.ca';

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
    return { title: 'Province non trouvée' };
  }

  const title = `${prov.name} — calculateur d'impôt sur le revenu 2026`;
  const description = `Calculez votre salaire net 2026 pour ${prov.name} après impôt fédéral et provincial, RPC et AE. Consultez les tranches d'imposition et les taux 2026 de ${prov.name}.`;
  const canonical = `${BASE}/fr/income-tax-calculator/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${BASE}/income-tax-calculator/${slug}`,
        fr: canonical,
        'x-default': `${BASE}/income-tax-calculator/${slug}`,
      },
    },
    openGraph: { title, description, type: 'website' },
  };
}

export default async function ProvincePageFrRoute({
  params,
}: {
  params: Promise<{ province: string }>;
}) {
  const { province: slug } = await params;
  const code = PROVINCE_SLUGS[slug];
  return <ProvincePage provinceCode={code} year={2026} locale="fr" />;
}
