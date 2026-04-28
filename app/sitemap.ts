import type { MetadataRoute } from 'next';
import { PROVINCE_SLUGS } from '@/lib/rates/2026';

export const dynamic = 'force-static';

const BASE = 'https://mapletaxcalculator.ca';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const slugs = Object.keys(PROVINCE_SLUGS);

  const en2026Pages: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE}/income-tax-calculator/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const en2025Pages: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE}/income-tax-calculator-2025/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const fr2026Pages: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE}/fr/income-tax-calculator/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const fr2025Pages: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE}/fr/income-tax-calculator-2025/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    { url: BASE,                                        lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE}/fr`,                               lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/income-tax-calculator`,            lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/income-tax-calculator-2025`,       lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/fr/income-tax-calculator`,         lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/fr/income-tax-calculator-2025`,    lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    // Tax Planning 2026
    { url: `${BASE}/tax-planning-2026`,                lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/tax-planning-2026/rrsp`,           lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/tax-planning-2026/tfsa`,           lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/tax-planning-2026/fhsa`,           lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/fr/tax-planning-2026`,             lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/fr/tax-planning-2026/rrsp`,        lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/fr/tax-planning-2026/tfsa`,        lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/fr/tax-planning-2026/fhsa`,        lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    // Tax Filing 2025
    { url: `${BASE}/tax-filing-2025`,                          lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/tax-filing-2025/slips-checklist`,          lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/tax-filing-2025/free-software`,            lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/tax-filing-2025/credits-and-deductions`,   lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/tax-filing-2025/life-events`,              lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/tax-filing-2025/amend-a-return`,           lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/tax-filing-2025/cant-pay`,                 lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/tax-filing-2025/late-filing`,              lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/fr/tax-filing-2025`,                       lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/fr/tax-filing-2025/slips-checklist`,       lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/fr/tax-filing-2025/free-software`,         lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/fr/tax-filing-2025/credits-and-deductions`,lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/fr/tax-filing-2025/life-events`,           lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/fr/tax-filing-2025/amend-a-return`,        lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/fr/tax-filing-2025/cant-pay`,              lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/fr/tax-filing-2025/late-filing`,           lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    ...en2026Pages,
    ...en2025Pages,
    ...fr2026Pages,
    ...fr2025Pages,
  ];
}
