import { notFound } from 'next/navigation';
import { ArrowLeft, User, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import { GradientBars } from '@/components/ui/gradient-bar-hero-section';
import {
  fetchPostBySlug, fetchAllPosts,
  stripHtmlTags, formatDate, rewriteWPUrls, WordPressPost,
} from '@/lib/wordpress-api';
import BlogPostActions from './BlogPostActions';

interface DisplayBlogPost {
  title: string;
  date: string;
  content: string;
  excerpt: string;
  author?: string;
  category?: string;
}

function transformPost(post: WordPressPost): DisplayBlogPost {
  const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Blog';
  const rawAuthor = post._embedded?.author?.[0]?.name;
  const author = rawAuthor && rawAuthor.toLowerCase() === 'shubham' ? 'MoreYeahs' : rawAuthor || 'MoreYeahs';
  return {
    title: post.title.rendered,
    date: formatDate(post.date),
    content: rewriteWPUrls(post.content.rendered),
    excerpt: stripHtmlTags(post.excerpt.rendered || ''),
    author,
    category,
  };
}

/* Pre-render all blog post slugs at build time */
export async function generateStaticParams() {
  try {
    const posts = await fetchAllPosts({ perPage: 100 });
    return posts.map(p => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const raw = await fetchPostBySlug(slug);
  if (!raw) notFound();

  const post = transformPost(raw);

  return (
    <>
      {/* ── Header ── */}
      <section style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 60 }}>
        <GradientBars count={16} />
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--fg-3)', marginBottom: 20, flexWrap: 'wrap' }}>
                <Link href="/blog" style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--fg-3)', textDecoration: 'none', fontWeight: 600 }}>
                  <ArrowLeft size={12} strokeWidth={2} /> Blog
                </Link>
                <ChevronRight size={12} strokeWidth={2} color="var(--fg-3)" />
                <span style={{ color: '#4D86F5', fontWeight: 700 }}>{post.category}</span>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              {post.category && (
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4D86F5', background: 'rgba(26,86,219,0.10)', border: '1px solid rgba(77,134,245,0.20)', padding: '4px 10px', borderRadius: 999, display: 'inline-block', marginBottom: 16 }}>
                  {post.category}
                </span>
              )}
              <h1 style={{ fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--fg)', lineHeight: 1.08, marginBottom: 16 }}>
                {post.title}
              </h1>
              <p style={{ fontSize: 15, color: 'var(--fg-3)', lineHeight: 1.75, maxWidth: 620 }}>
                {post.excerpt}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 20, paddingTop: 24, borderTop: '1px solid var(--border)', flexWrap: 'wrap' }}>
              {post.author && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <User size={12} strokeWidth={2} style={{ color: 'var(--fg-3)' }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--fg-3)' }}>{post.author}</span>
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Calendar size={12} strokeWidth={2} style={{ color: 'var(--fg-3)' }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--fg-3)' }}>{post.date}</span>
              </div>
              {/* Client component handles PDF download, share, and broken image fix */}
              <BlogPostActions title={post.title} slug={slug} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section style={{ background: 'var(--bg-2)', paddingTop: 60, paddingBottom: 80, position: 'relative' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <article
            id="blog-content"
            style={{ maxWidth: 820, margin: '0 auto', background: 'var(--bg)', padding: '48px 40px', borderRadius: 20, boxShadow: '0 20px 60px rgba(0,0,0,0.08)', position: 'relative', overflow: 'hidden' }}
            className="prose"
          >
            <div
              style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--fg)', position: 'relative', zIndex: 1 }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--bg)', padding: '80px 0 100px', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            borderRadius: 28, padding: 'clamp(48px,6vw,80px)',
            background: 'rgba(26,86,219,0.06)', border: '1px solid rgba(77,134,245,0.18)',
            backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
            position: 'relative', overflow: 'hidden', textAlign: 'center',
          }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div className="section-badge" style={{ justifyContent: 'center', marginBottom: 20, background: 'rgba(26,86,219,0.14)', border: '1px solid rgba(77,134,245,0.30)' }}>
                Ready to get started?
              </div>
              <h2 style={{ fontSize: 'clamp(26px,4vw,48px)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--fg)', lineHeight: 1.06, marginBottom: 18 }}>
                Ready to turn ideas into <span className="grad">results?</span>
              </h2>
              <p style={{ fontSize: 16, color: 'var(--fg-3)', lineHeight: 1.75, maxWidth: 460, margin: '0 auto 32px' }}>
                Whether you need product strategy, engineering excellence, or operational transformation — we&apos;re here to help.
              </p>
              <Link href="/contact-us" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#1A56DB', color: '#fff', fontSize: 14, fontWeight: 700, borderRadius: 10, padding: '14px 28px', textDecoration: 'none', boxShadow: '0 8px 28px rgba(26,86,219,0.38)' }}>
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .prose { word-break: break-word; overflow-wrap: break-word; }
        .prose p { margin: 0 0 20px 0; font-size: 16px; line-height: 1.85; }
        .prose h2, .prose h3, .prose h4 { margin: 40px 0 16px 0; font-weight: 700; color: var(--fg); }
        .prose h2 { font-size: 28px; letter-spacing: -0.02em; padding-bottom: 12px; border-bottom: 2px solid rgba(77,134,245,0.2); }
        .prose h3 { font-size: 22px; }
        .prose h4 { font-size: 18px; color: var(--fg-2); }
        .prose a { color: #4D86F5; text-decoration: none; font-weight: 500; }
        .prose a:hover { color: #1A56DB; text-decoration: underline; }
        .prose ul, .prose ol { margin: 20px 0; padding-left: 28px; }
        .prose li { margin: 10px 0; line-height: 1.75; }
        .prose img { max-width: 100%; height: auto; margin: 32px 0; border-radius: 16px; box-shadow: 0 12px 32px rgba(0,0,0,0.1); }
        .prose blockquote { border-left: 4px solid #4D86F5; padding: 20px 24px; margin: 32px 0; font-style: italic; color: var(--fg-2); background: rgba(77,134,245,0.05); border-radius: 0 12px 12px 0; }
        .prose code { background: rgba(77,134,245,0.1); padding: 3px 8px; border-radius: 6px; font-size: 13px; font-family: monospace; border: 1px solid rgba(77,134,245,0.15); }
        .prose pre { background: var(--bg); border: 1px solid var(--border); border-radius: 12px; padding: 24px; margin: 24px 0; overflow-x: auto; }
        .prose pre code { background: none; padding: 0; border: none; }
        .prose hr { border: none; height: 1px; background: linear-gradient(90deg, transparent, rgba(77,134,245,0.3), transparent); margin: 40px 0; }
        .prose strong { font-weight: 600; color: var(--fg); }
        @media(max-width:640px){ article { padding: 32px 20px !important; } }
      `}</style>
    </>
  );
}
