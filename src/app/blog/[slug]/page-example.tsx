// Example implementation for a dynamic blog post page
// Place this at: src/app/blog/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { fetchPostBySlug, stripHtmlTags, formatDate } from '@/lib/wordpress-api';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await fetchPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title.rendered,
    description: stripHtmlTags(post.excerpt.rendered),
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await fetchPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Get category name from embedded data
  const categories = post._embedded?.['wp:term']?.[0] || [];
  const categoryName = categories.length > 0 ? categories[0].name : 'General';

  // Get author info
  const author = post._embedded?.author?.[0];
  const authorName = author?.name || 'MoreYeahs Team';
  const authorInitials = authorName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <article style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px' }}>
      {/* Meta info */}
      <div style={{ marginBottom: 24, color: '#666', fontSize: 14 }}>
        <span style={{ color: '#4D86F5', fontWeight: 600 }}>{categoryName}</span>
        {' '} • {' '}
        <span>{formatDate(post.date)}</span>
      </div>

      {/* Title */}
      <h1 style={{ fontSize: '2.5em', fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>
        {post.title.rendered}
      </h1>

      {/* Author info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 32, borderBottom: '1px solid #eee' }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1A56DB, #4D86F5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 800,
            fontSize: 12,
          }}
        >
          {authorInitials}
        </div>
        <div>
          <div style={{ fontWeight: 600 }}>{authorName}</div>
          <div style={{ fontSize: 12, color: '#999' }}>{formatDate(post.date)}</div>
        </div>
      </div>

      {/* Content */}
      <div
        style={{ marginTop: 32, fontSize: 16, lineHeight: 1.8, color: '#333' }}
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
  );
}
