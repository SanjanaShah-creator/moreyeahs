// Example implementation for a dynamic resource page
// Place this at: src/app/resources/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { fetchPages, stripHtmlTags, formatDate } from '@/lib/wordpress-api';

async function getPageBySlug(slug: string) {
  const pages = await fetchPages();
  return pages.find(p => p.slug === slug) || null;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug);
  if (!page) return {};

  return {
    title: page.title.rendered,
    description: stripHtmlTags(page.content.rendered).substring(0, 160),
  };
}

export default async function ResourcePage({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <article style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px' }}>
      {/* Title */}
      <h1 style={{ fontSize: '2.5em', fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>
        {page.title.rendered}
      </h1>

      {/* Date */}
      <div style={{ color: '#999', fontSize: 14, marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid #eee' }}>
        Last updated: {formatDate(page.date)}
      </div>

      {/* Content */}
      <div
        style={{ fontSize: 16, lineHeight: 1.8, color: '#333' }}
        dangerouslySetInnerHTML={{ __html: page.content.rendered }}
      />
    </article>
  );
}
