import type { MetadataRoute } from 'next';

const BASE = 'https://www.moreyeahs.com';

const WP_API = 'https://dev.moreyeahs.com/wp-json/wp/v2';

async function fetchSlugs(endpoint: string): Promise<string[]> {
  try {
    const res = await fetch(`${WP_API}/${endpoint}?per_page=100&_fields=slug`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const items: { slug: string }[] = await res.json();
    return items.map(i => i.slug).filter(Boolean);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                          lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/about`,               lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/solutions`,           lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/solutions/data-science-ai`,        lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/solutions/cloud-infrastructure`,   lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/solutions/salesforce-services`,    lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/solutions/microsoft-services`,     lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/solutions/web-app-development`,    lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/case-studies`,        lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/blog`,                lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/careers`,             lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/contact-us`,          lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/life-at-moreyeahs`,   lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/privacy-policy`,      lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/terms-and-conditions`,lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ];

  const [blogSlugs, csSlugs] = await Promise.all([
    fetchSlugs('posts'),
    fetchSlugs('case_study'),
  ]);

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map(slug => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const csRoutes: MetadataRoute.Sitemap = csSlugs.map(slug => ({
    url: `${BASE}/case-study/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes, ...csRoutes];
}
