import type { MetadataRoute } from 'next';
import { PROVINCE_SLUGS } from '@/lib/rates/2026';

export const dynamic = 'force-static';

const BASE = 'https://mapletaxcalculator.ca';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const slugs = Object.keys(PROVINCE_SLUGS);

  const province2026Pages: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE}/income-tax-calculator/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const province2025Pages: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE}/income-tax-calculator-2025/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${BASE}/income-tax-calculator`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/income-tax-calculator-2025`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...province2026Pages,
    ...province2025Pages,
  ];
}
