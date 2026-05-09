'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, User, Calendar, Download, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import { GradientBars } from '@/components/ui/gradient-bar-hero-section';
import { fetchPostBySlug, stripHtmlTags, formatDate, rewriteWPUrls, WordPressPost } from '@/lib/wordpress-api';
import { downloadAsPDF } from '@/lib/pdf-export';

const FV = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const FT = { duration: 0.6 };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

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

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<DisplayBlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);
        const fetchedPost = await fetchPostBySlug(slug);
        if (!fetchedPost) { setError('Post not found.'); return; }
        setPost(transformPost(fetchedPost));
      } catch (err) {
        console.error('Failed to load blog post:', err);
        setError('Failed to load this blog post. It may have been removed.');
      } finally {
        setLoading(false);
      }
    }
    if (slug) loadPost();
  }, [slug]);

  // Hide images that fail to load (broken src from WP)
  useEffect(() => {
    if (!post) return;
    const article = document.getElementById('blog-content');
    if (!article) return;
    const imgs = Array.from(article.querySelectorAll('img')) as HTMLImageElement[];
    imgs.forEach(img => {
      const hide = () => {
        img.style.display = 'none';
        // Also hide the parent figure/wp-block-image if it becomes empty
        const parent = img.closest('figure, .wp-block-image');
        if (parent) (parent as HTMLElement).style.display = 'none';
      };
      if (!img.src || img.naturalWidth === 0) hide();
      else img.addEventListener('error', hide);
    });
  }, [post]);
  const handlePDF = useCallback(async () => {
    if (!post) return;
    setExporting(true);
    await downloadAsPDF({ contentElementId: 'blog-content', title: post.title, filename: slug });
    setExporting(false);
  }, [post, slug]);

  if (loading) {
    return (
      <>
        <section style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 60 }}>
          <GradientBars count={16} />
          <NoiseOverlay />
          <div className="container" style={{ position: 'relative', zIndex: 3 }}>
            <div style={{ maxWidth: 820, margin: '0 auto' }}>
              {/* Back + breadcrumb skeleton */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
                <div className="skeleton" style={{ width: 90, height: 13, borderRadius: 999 }} />
                <div className="skeleton" style={{ width: 1, height: 13, borderRadius: 999 }} />
                <div className="skeleton" style={{ width: 60, height: 13, borderRadius: 999 }} />
                <div className="skeleton" style={{ width: 12, height: 13, borderRadius: 999 }} />
                <div className="skeleton" style={{ width: 120, height: 13, borderRadius: 999 }} />
              </div>
              {/* Category badge */}
              <div className="skeleton" style={{ width: 80, height: 22, borderRadius: 999, marginBottom: 16 }} />
              {/* Title */}
              <div className="skeleton" style={{ width: '92%', height: 44, borderRadius: 12, marginBottom: 12 }} />
              <div className="skeleton" style={{ width: '70%', height: 44, borderRadius: 12, marginBottom: 20 }} />
              {/* Excerpt */}
              <div className="skeleton" style={{ width: '100%', height: 18, borderRadius: 999, marginBottom: 8 }} />
              <div className="skeleton" style={{ width: '85%', height: 18, borderRadius: 999, marginBottom: 28 }} />
              {/* Meta row */}
              <div style={{ display: 'flex', gap: 20, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
                <div className="skeleton" style={{ width: 100, height: 13, borderRadius: 999 }} />
                <div className="skeleton" style={{ width: 90, height: 13, borderRadius: 999 }} />
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
                  <div className="skeleton" style={{ width: 110, height: 13, borderRadius: 999 }} />
                  <div className="skeleton" style={{ width: 60, height: 13, borderRadius: 999 }} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section style={{ background: 'var(--bg-2)', paddingTop: 60, paddingBottom: 80 }}>
          <div className="container">
            <div style={{ maxWidth: 820, margin: '0 auto', background: 'var(--bg)', padding: '48px 40px', borderRadius: 20 }}>
              {/* Article skeleton — matches actual prose layout */}
              <div className="skeleton" style={{ width: '100%', height: 22, borderRadius: 8, marginBottom: 14 }} />
              <div className="skeleton" style={{ width: '95%', height: 16, borderRadius: 999, marginBottom: 10 }} />
              <div className="skeleton" style={{ width: '100%', height: 16, borderRadius: 999, marginBottom: 10 }} />
              <div className="skeleton" style={{ width: '88%', height: 16, borderRadius: 999, marginBottom: 28 }} />
              {/* Image placeholder */}
              <div className="skeleton" style={{ width: '100%', height: 240, borderRadius: 12, marginBottom: 28 }} />
              <div className="skeleton" style={{ width: '100%', height: 20, borderRadius: 8, marginBottom: 14 }} />
              <div className="skeleton" style={{ width: '100%', height: 16, borderRadius: 999, marginBottom: 10 }} />
              <div className="skeleton" style={{ width: '92%', height: 16, borderRadius: 999, marginBottom: 10 }} />
              <div className="skeleton" style={{ width: '85%', height: 16, borderRadius: 999, marginBottom: 28 }} />
              <div className="skeleton" style={{ width: '100%', height: 18, borderRadius: 8, marginBottom: 14 }} />
              <div className="skeleton" style={{ width: '96%', height: 16, borderRadius: 999, marginBottom: 10 }} />
              <div className="skeleton" style={{ width: '78%', height: 16, borderRadius: 999 }} />
            </div>
          </div>
        </section>
      </>
    );
  }

  if (error || !post) {
    return (
      <section style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 80, minHeight: '80vh' }}>
        <GradientBars count={16} />
        <NoiseOverlay />

        <div className="container" style={{ position: 'relative', zIndex: 3, textAlign: 'center' }}>
          <div style={{ maxWidth: 480, margin: '0 auto' }}>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--fg)', marginBottom: 16, letterSpacing: '-0.02em' }}>
              Blog Post Not Found
            </h1>
            <p style={{ fontSize: 15, color: 'var(--fg-3)', lineHeight: 1.75, marginBottom: 32 }}>
              {error || 'The blog post you are looking for does not exist or has been removed.'}
            </p>
            <Link
              href="/blog"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#4D86F5', textDecoration: 'none', fontWeight: 700, fontSize: 14, transition: 'color 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#1A56DB'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#4D86F5'; }}
            >
              <ArrowLeft size={14} strokeWidth={2} />
              Back to Blog
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* ── Header ────────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 60 }}>
        <GradientBars count={16} />
        <NoiseOverlay />

        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <motion.div variants={stagger} initial="hidden" animate="visible"
            style={{ maxWidth: 860, margin: '0 auto' }}>

            <motion.div variants={FV} transition={FT}>
              {/* Breadcrumb — left aligned */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--fg-3)', marginBottom: 20, flexWrap: 'wrap' }}>
                <Link
                  href="/blog"
                  style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--fg-3)', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--fg)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--fg-3)'; }}
                >
                  <ArrowLeft size={12} strokeWidth={2} />
                  Blog
                </Link>
                <ChevronRight size={12} strokeWidth={2} color="var(--fg-3)" />
                <span style={{ color: '#4D86F5', fontWeight: 700 }}>{post.category}</span>
              </div>
            </motion.div>

            <motion.div variants={FV} transition={FT} style={{ marginBottom: 24 }}>
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
            </motion.div>

            <motion.div variants={FV} transition={FT} style={{ display: 'flex', alignItems: 'center', gap: 20, paddingTop: 24, borderTop: '1px solid var(--border)', flexWrap: 'wrap' }}>
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
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
                <button
                  onClick={handlePDF}
                  disabled={exporting}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: exporting ? 'var(--fg-3)' : '#4D86F5', background: 'none', border: 'none', cursor: exporting ? 'not-allowed' : 'pointer', transition: 'color 0.2s', fontFamily: 'inherit' }}
                  onMouseEnter={e => { if (!exporting) (e.currentTarget as HTMLElement).style.color = '#1A56DB'; }}
                  onMouseLeave={e => { if (!exporting) (e.currentTarget as HTMLElement).style.color = '#4D86F5'; }}
                >
                  <Download size={12} strokeWidth={2} />
                  {exporting ? 'Exporting…' : 'Download PDF'}
                </button>
                <button
                  onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#4D86F5', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s', fontFamily: 'inherit' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#1A56DB'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#4D86F5'; }}
                >
                  <Share2 size={12} strokeWidth={2} /> Share
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-2)', paddingTop: 60, paddingBottom: 80, position: 'relative' }}>
        <div className="blob" style={{ width: 400, height: 400, top: '10%', left: '-10%', background: 'radial-gradient(circle, rgba(26,86,219,0.05), transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.article
            id="blog-content"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: 820, margin: '0 auto', background: 'var(--bg)', padding: '48px 40px', borderRadius: 20, boxShadow: '0 20px 60px rgba(0,0,0,0.08)', position: 'relative', overflow: 'hidden' }}
            className="prose"
          >
            <div className="blob" style={{ width: 200, height: 200, top: '-50px', right: '-50px', background: 'radial-gradient(circle, rgba(26,86,219,0.08), transparent 70%)', pointerEvents: 'none' }} />
            <div
              style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--fg)', position: 'relative', zIndex: 1 }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.article>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg)', padding: '80px 0 100px', position: 'relative', overflow: 'hidden' }}>
        <div className="blob" style={{ width: 560, height: 560, top: '-80px', right: '5%', background: 'radial-gradient(circle, rgba(26,86,219,0.14) 0%, transparent 65%)', position: 'absolute', pointerEvents: 'none' }} />
        <div className="blob" style={{ width: 480, height: 480, bottom: '-60px', left: '5%', background: 'radial-gradient(circle, rgba(26,86,219,0.08) 0%, transparent 65%)', position: 'absolute', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            borderRadius: 28,
            padding: 'clamp(48px,6vw,80px)',
            background: 'rgba(26,86,219,0.06)',
            border: '1px solid rgba(77,134,245,0.18)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            position: 'relative', overflow: 'hidden',
            textAlign: 'center',
          }}>
            <div style={{ position: 'absolute', top: -80, right: -80, width: 280, height: 280, borderRadius: '50%', background: 'rgba(26,86,219,0.10)', border: '1px solid rgba(77,134,245,0.12)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -60, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(26,86,219,0.08)', border: '1px solid rgba(77,134,245,0.10)', pointerEvents: 'none' }} />
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
              <Link
                href="/contact-us"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#1A56DB', color: '#fff', fontSize: 14, fontWeight: 700, borderRadius: 10, padding: '14px 28px', textDecoration: 'none', boxShadow: '0 8px 28px rgba(26,86,219,0.38)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0E2E75'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1A56DB'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .prose {
          word-break: break-word;
          overflow-wrap: break-word;
        }
        .prose p {
          margin: 0 0 20px 0;
          font-size: 16px;
          line-height: 1.85;
        }
        .prose h2,
        .prose h3,
        .prose h4 {
          margin: 40px 0 16px 0;
          font-weight: 700;
          color: var(--fg);
          position: relative;
        }
        .prose h2 {
          font-size: 28px;
          letter-spacing: -0.02em;
          padding-bottom: 12px;
          border-bottom: 2px solid rgba(77,134,245,0.2);
        }
        .prose h2::before {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, #4D86F5, #1A56DB);
        }
        .prose h3 {
          font-size: 22px;
          color: var(--fg);
        }
        .prose h4 {
          font-size: 18px;
          color: var(--fg-2);
        }
        .prose a {
          color: #4D86F5;
          text-decoration: none;
          transition: color 0.2s;
          font-weight: 500;
        }
        .prose a:hover {
          color: #1A56DB;
          text-decoration: underline;
        }
        .prose ul,
        .prose ol {
          margin: 20px 0;
          padding-left: 28px;
        }
        .prose li {
          margin: 10px 0;
          line-height: 1.75;
        }
        .prose img {
          max-width: 100%;
          height: auto;
          margin: 32px 0;
          border-radius: 16px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
        }
        .prose img:hover {
          transform: scale(1.02);
        }
        /* Hide image containers when the image fails to load or has no src */
        .prose img[src=""],
        .prose img:not([src]) {
          display: none;
        }
        .prose figure:has(img[src=""]),
        .prose figure:has(img:not([src])),
        .prose .wp-block-image:has(img[src=""]),
        .prose .wp-block-image:has(img:not([src])) {
          display: none;
        }
        .prose blockquote {
          border-left: 4px solid #4D86F5;
          padding-left: 20px;
          margin: 32px 0;
          font-style: italic;
          color: var(--fg-2);
          background: rgba(77,134,245,0.05);
          padding: 20px 24px;
          border-radius: 0 12px 12px 0;
          position: relative;
        }
        .prose blockquote::before {
          content: '"';
          font-size: 60px;
          color: rgba(77,134,245,0.2);
          position: absolute;
          top: -10px;
          left: 8px;
          font-family: serif;
        }
        .prose code {
          background: linear-gradient(135deg, rgba(77,134,245,0.1), rgba(26,86,219,0.05));
          padding: 3px 8px;
          border-radius: 6px;
          font-size: 13px;
          font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
          border: 1px solid rgba(77,134,245,0.15);
        }
        .prose pre {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 24px;
          margin: 24px 0;
          overflow-x: auto;
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.05);
        }
        .prose pre code {
          background: none;
          padding: 0;
          border: none;
          font-size: 14px;
          line-height: 1.6;
        }
        .prose hr {
          border: none;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(77,134,245,0.3), transparent);
          margin: 40px 0;
        }
        .prose strong {
          font-weight: 600;
          color: var(--fg);
        }
        .prose em {
          font-style: italic;
          color: var(--fg-2);
        }
      `}</style>

    </>
  );
}
