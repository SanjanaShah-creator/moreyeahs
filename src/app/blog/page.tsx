'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Mail, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import { GradientBars } from '@/components/ui/gradient-bar-hero-section';
import { fetchAllPosts, stripHtmlTags, truncateText, formatDate, getCoverImage, WordPressPost } from '@/lib/wordpress-api';
import { submitForm } from '@/lib/webhook';

const FV = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const FT = { duration: 0.6 };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };



interface DisplayPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  authorInitials: string;
  coverImage: string | null;
}

function transformPost(post: WordPressPost): DisplayPost {
  const categories = post._embedded?.['wp:term']?.[0] || [];
  const category = categories.length > 0 ? categories[0].name : 'General';
  const author = post._embedded?.author?.[0];
  const authorName = author?.name || 'Author';
  const authorInitials = authorName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  const plainText = stripHtmlTags(post.content.rendered);
  const readTime = `${Math.max(1, Math.ceil(plainText.split(/\s+/).length / 200))} min read`;
  return {
    slug: post.slug,
    category,
    title: post.title.rendered,
    excerpt: truncateText(stripHtmlTags(post.excerpt.rendered || post.content.rendered), 150),
    date: formatDate(post.date),
    readTime,
    authorInitials,
    coverImage: getCoverImage(post._embedded),
  };
}

function CategoryBadge({ label }: { label: string }) {
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
      color: '#4D86F5', background: 'rgba(77,134,245,0.10)', border: '1px solid rgba(77,134,245,0.22)',
      padding: '4px 10px', borderRadius: 999, display: 'inline-block',
    }}>
      {label}
    </span>
  );
}

export default function BlogPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const currentPage = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);
  const POSTS_PER_PAGE = 20;

  const [posts, setPosts] = useState<DisplayPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterState, setNewsletterState] = useState<'idle' | 'loading' | 'done'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterState('loading');
    await submitForm({ formType: 'Newsletter Subscription', email: newsletterEmail });
    setNewsletterState('done');
  };
  useEffect(() => {
    fetchAllPosts({ perPage: 100 })
      .then(fetched => setPosts(fetched.map(transformPost)))
      .catch(err => { console.error('Failed to load posts:', err); setError('Failed to load blog posts'); })
      .finally(() => setLoading(false));
  }, []);

  // Scroll to Latest Posts section on page change
  useEffect(() => {
    if (currentPage > 1) {
      setTimeout(() => {
        const latestPostsSection = document.querySelector('.blog-grid');
        if (latestPostsSection) {
          latestPostsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [currentPage]);

  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const pagePosts = useMemo(
    () => posts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE),
    [posts, currentPage]
  );
  const featuredPost = pagePosts.length > 0 ? pagePosts[0] : null;
  const gridPosts = pagePosts.slice(1);


  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 80 }}>
        <GradientBars count={16} />
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <motion.div variants={stagger} initial="hidden" animate="visible" style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
            <motion.div variants={FV} transition={FT}>
              <div className="section-badge" style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: 20 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4D86F5', display: 'inline-block', animation: 'pulseDot 2s ease-in-out infinite' }} />
                Blog &amp; Insights
              </div>
            </motion.div>
            <motion.h1 variants={FV} transition={FT} style={{ fontSize: 'clamp(34px,5.5vw,62px)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--fg)', lineHeight: 1.06, marginBottom: 22 }}>
              Expert Insights on{' '}
              <span className="grad">AI, Data &amp; Cloud</span>
            </motion.h1>
            <motion.p variants={FV} transition={FT} style={{ fontSize: 17, color: 'var(--fg-3)', lineHeight: 1.8, maxWidth: 560, margin: '0 auto' }}>
              Technical deep-dives, lessons from the field, and forward-looking perspectives — written by the engineers and architects who build the systems.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Post ─────────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-2)', paddingBottom: 0 }}>
        <div className="container">
          {loading ? (
            <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <div style={{ marginBottom: 24 }}>
                <div className="skeleton" style={{ width: 120, height: 16, borderRadius: 999, marginBottom: 20 }} />
              </div>
              <div className="glass" style={{ padding: '48px 52px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}>
                  <div>
                    <div className="skeleton" style={{ width: '60%', height: 32, borderRadius: 14, marginBottom: 20 }} />
                    <div className="skeleton" style={{ width: '100%', height: 20, borderRadius: 12, marginBottom: 10 }} />
                    <div className="skeleton" style={{ width: '95%', height: 20, borderRadius: 12, marginBottom: 28 }} />
                    <div style={{ display: 'flex', gap: 20 }}>
                      <div className="skeleton" style={{ width: 120, height: 14, borderRadius: 999 }} />
                      <div className="skeleton" style={{ width: 100, height: 14, borderRadius: 999 }} />
                    </div>
                  </div>
                  <div className="skeleton" style={{ width: 120, height: 48, borderRadius: 12, flexShrink: 0 }} />
                </div>
              </div>
            </motion.div>
          ) : featuredPost ? (
            <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <div className="section-badge" style={{ display: 'inline-flex', marginBottom: 24 }}>Featured Article</div>
              <div className="glass" style={{ padding: 0, position: 'relative', overflow: 'hidden', width: '100%', margin: 0 }}>
                <div className="blob" style={{ width: 320, height: 320, top: '-50px', right: '-30px', background: 'radial-gradient(circle, rgba(26,86,219,0.11), transparent 65%)' }} />
                <div style={{ display: 'grid', gridTemplateColumns: featuredPost.coverImage ? '360px 1fr' : '1fr', gap: 0, alignItems: 'stretch', minHeight: 260 }} className="featured-grid">
                  {/* Featured image or gradient */}
                  {featuredPost.coverImage ? (
                    <div style={{ position: 'relative', overflow: 'hidden', minHeight: 260 }}>
                      <img
                        src={featuredPost.coverImage} alt={featuredPost.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                  ) : (
                    <div style={{ height: 8, background: 'linear-gradient(90deg, #1A56DB, #4D86F5, #80A9FF)', flexShrink: 0, gridColumn: '1 / -1' }} />
                  )}
                  {/* Featured content */}
                  <div style={{ padding: '30px 30px 26px', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ marginBottom: 12 }}>
                        <CategoryBadge label={featuredPost.category} />
                      </div>
                      <h2 style={{ fontSize: 'clamp(20px,2.4vw,28px)', fontWeight: 800, color: 'var(--fg)', letterSpacing: '-0.03em', lineHeight: 1.25, marginBottom: 14 }}>
                        {featuredPost.title}
                      </h2>
                      <p style={{ fontSize: 14, color: 'var(--fg-3)', lineHeight: 1.75, marginBottom: 22 }}>
                        {featuredPost.excerpt}
                      </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--fg-3)', fontWeight: 600 }}>
                          <Calendar size={12} strokeWidth={2} /> {featuredPost.date}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--fg-3)', fontWeight: 600 }}>
                          <Clock size={12} strokeWidth={2} /> {featuredPost.readTime}
                        </div>
                      </div>
                      <Link href={`/blog/${featuredPost.slug}`}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1A56DB', color: '#fff', fontSize: 13, fontWeight: 700, borderRadius: 12, padding: '12px 22px', textDecoration: 'none', boxShadow: '0 4px 18px rgba(26,86,219,0.24)', transition: 'background 0.2s, transform 0.2s', width: 'fit-content' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0E2E75'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1A56DB'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
                        Read Article <ArrowRight size={13} strokeWidth={2} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </div>
      </section>

      {/* ── Blog Grid ─────────────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 44 }}>
            <div className="section-badge" style={{ display: 'inline-flex', marginBottom: 16 }}>Latest Posts</div>
            <h2 style={{ fontSize: 'clamp(24px,3vw,38px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--fg)', lineHeight: 1.15 }}>
              More from the team
            </h2>
          </motion.div>

          {loading ? (
            /* Skeleton matching blog grid: 3-col cards with image + content */
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="blog-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass" style={{ padding: 0, overflow: 'hidden' }}>
                  <div className="skeleton" style={{ height: 160, borderRadius: 0 }} />
                  <div style={{ padding: '18px 20px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div className="skeleton" style={{ width: '40%', height: 20, borderRadius: 999 }} />
                    <div className="skeleton" style={{ height: 18, borderRadius: 8 }} />
                    <div className="skeleton" style={{ width: '80%', height: 18, borderRadius: 8 }} />
                    <div className="skeleton" style={{ height: 13, borderRadius: 999 }} />
                    <div className="skeleton" style={{ width: '90%', height: 13, borderRadius: 999 }} />
                    <div className="skeleton" style={{ width: '70%', height: 13, borderRadius: 999 }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: 13, marginTop: 4 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="skeleton" style={{ width: 26, height: 26, borderRadius: '50%' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                          <div className="skeleton" style={{ width: 70, height: 11, borderRadius: 999 }} />
                          <div className="skeleton" style={{ width: 55, height: 11, borderRadius: 999 }} />
                        </div>
                      </div>
                      <div className="skeleton" style={{ width: 40, height: 13, borderRadius: 999 }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <p style={{ color: '#EF4444', fontSize: 16 }}>{error}</p>
            </div>
          ) : posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <p style={{ color: 'var(--fg-3)', fontSize: 16 }}>No blog posts found.</p>
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="blog-grid">
                {gridPosts.map(({ slug, category, title, excerpt, date, readTime, authorInitials, coverImage }, i) => (
                <motion.div
                  key={`${slug}-${currentPage}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="glass"
                  style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                >
                  {/* Cover image or gradient fallback */}
                  {coverImage ? (
                    <div style={{ height: 160, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                      <img
                        src={coverImage} alt={title} loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                        onError={e => {
                          const img = e.currentTarget as HTMLImageElement;
                          const parent = img.parentElement;
                          if (parent) {
                            parent.style.background = 'linear-gradient(135deg, #1A56DB 0%, #4D86F5 50%, #80A9FF 100%)';
                            parent.style.display = 'flex';
                            parent.style.alignItems = 'center';
                            parent.style.justifyContent = 'center';
                            img.style.display = 'none';
                            const label = document.createElement('span');
                            label.style.cssText = 'font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.85);background:rgba(0,0,0,0.18);padding:6px 14px;border-radius:999px;border:1px solid rgba(255,255,255,0.25)';
                            label.textContent = category;
                            parent.appendChild(label);
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div style={{
                      height: 160, flexShrink: 0,
                      background: 'linear-gradient(135deg, #1A56DB 0%, #4D86F5 50%, #80A9FF 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', background: 'rgba(0,0,0,0.18)', padding: '6px 14px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.25)' }}>
                        {category}
                      </span>
                    </div>
                  )}

                  {/* Body */}
                  <div style={{ padding: '18px 20px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    {/* Category badge — below the image */}
                    <div style={{ marginBottom: 10 }}>
                      <CategoryBadge label={category} />
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--fg)', lineHeight: 1.45, letterSpacing: '-0.02em', marginBottom: 10 }}>
                      {title}
                    </h3>
                    <p style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.75, marginBottom: 16, flex: 1 }}>
                      {excerpt}
                    </p>
                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: 13 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg, #1A56DB, #4D86F5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: '#fff', flexShrink: 0 }}>
                          {authorInitials}
                        </div>
                        <div>
                          <div style={{ fontSize: 11, color: 'var(--fg-3)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Calendar size={10} strokeWidth={2} /> {date}
                          </div>
                          <div style={{ fontSize: 11, color: 'var(--fg-3)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                            <Clock size={10} strokeWidth={2} /> {readTime}
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`/blog/${slug}`}
                        style={{ fontSize: 12, fontWeight: 700, color: '#4D86F5', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, transition: 'color 0.2s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#1A56DB'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#4D86F5'; }}
                      >
                        Read <ArrowRight size={11} strokeWidth={2.5} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
              
              {/* ── Pagination ─────────────────────────────────────────── */}
              {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 56 }}
              >
                <button
                  onClick={() => {
                    if (currentPage > 1) {
                      router.push(currentPage - 1 === 1 ? '/blog' : `/blog?page=${currentPage - 1}`);
                    }
                  }}
                  disabled={currentPage <= 1}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '12px 20px',
                    borderRadius: 12,
                    fontSize: 14,
                    fontWeight: 700,
                    background: currentPage <= 1 ? 'var(--bg-2)' : '#1A56DB',
                    color: currentPage <= 1 ? 'var(--fg-3)' : '#fff',
                    border: 'none',
                    cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
                    opacity: currentPage <= 1 ? 0.5 : 1,
                    transition: 'background 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={e => {
                    if (currentPage > 1) {
                      (e.currentTarget as HTMLElement).style.background = '#0E2E75';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (currentPage > 1) {
                      (e.currentTarget as HTMLElement).style.background = '#1A56DB';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <ChevronLeft size={16} strokeWidth={2} />
                  Previous
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: 'var(--fg)' }}>
                  Page <span style={{ fontWeight: 800, fontSize: 16 }}>{Math.min(currentPage, totalPages)}</span> of <span style={{ fontWeight: 800, fontSize: 16 }}>{totalPages}</span>
                </div>

                <button
                  onClick={() => {
                    if (currentPage < totalPages) {
                      router.push(`/blog?page=${currentPage + 1}`);
                    }
                  }}
                  disabled={currentPage >= totalPages}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '12px 20px',
                    borderRadius: 12,
                    fontSize: 14,
                    fontWeight: 700,
                    background: currentPage >= totalPages ? 'var(--bg-2)' : '#1A56DB',
                    color: currentPage >= totalPages ? 'var(--fg-3)' : '#fff',
                    border: 'none',
                    cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
                    opacity: currentPage >= totalPages ? 0.5 : 1,
                    transition: 'background 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={e => {
                    if (currentPage < totalPages) {
                      (e.currentTarget as HTMLElement).style.background = '#0E2E75';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (currentPage < totalPages) {
                      (e.currentTarget as HTMLElement).style.background = '#1A56DB';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    }
                  }}
                >
                  Next
                  <ChevronRight size={16} strokeWidth={2} />
                </button>
              </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="glass"
            style={{ maxWidth: 640, margin: '0 auto', padding: '56px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div className="blob" style={{ width: 360, height: 360, top: '-80px', right: '-80px', background: 'radial-gradient(circle, rgba(26,86,219,0.13), transparent 65%)' }} />
            <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(26,86,219,0.10)', border: '1px solid rgba(77,134,245,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', position: 'relative', zIndex: 1 }}>
              <Mail size={22} color="#4D86F5" strokeWidth={1.5} />
            </div>
            <h2 style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--fg)', marginBottom: 10, lineHeight: 1.2, position: 'relative', zIndex: 1 }}>
              Stay up to date
            </h2>
            <p style={{ fontSize: 14, color: 'var(--fg-3)', lineHeight: 1.75, maxWidth: 420, margin: '0 auto 28px', position: 'relative', zIndex: 1 }}>
              Get our latest articles, case studies, and engineering insights delivered to your inbox — no noise, unsubscribe any time.
            </p>
            <div style={{ display: 'flex', gap: 10, maxWidth: 420, margin: '0 auto', position: 'relative', zIndex: 1 }} className="newsletter-form">
              {newsletterState === 'done' ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', width: '100%', padding: '13px 0', color: '#22c55e', fontWeight: 700, fontSize: 14 }}>
                  <CheckCircle size={18} strokeWidth={2} /> You&apos;re subscribed — thanks!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 10, width: '100%' }}>
                  <input
                    type="email" required placeholder="you@company.com"
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    style={{ flex: 1, padding: '13px 16px', borderRadius: 12, fontSize: 14, background: 'var(--card-bg)', border: '1px solid var(--card-border)', color: 'var(--fg)', outline: 'none', fontFamily: 'inherit', backdropFilter: 'blur(12px)' }}
                  />
                  <button
                    type="submit"
                    disabled={newsletterState === 'loading'}
                    style={{ padding: '13px 22px', borderRadius: 12, fontSize: 14, fontWeight: 700, background: newsletterState === 'loading' ? 'rgba(26,86,219,0.5)' : '#1A56DB', color: '#fff', border: 'none', cursor: newsletterState === 'loading' ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', boxShadow: '0 4px 14px rgba(26,86,219,0.28)', transition: 'background 0.2s, transform 0.2s', fontFamily: 'inherit' }}
                    onMouseEnter={e => { if (newsletterState !== 'loading') { (e.currentTarget as HTMLElement).style.background = '#0E2E75'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; } }}
                    onMouseLeave={e => { if (newsletterState !== 'loading') { (e.currentTarget as HTMLElement).style.background = '#1A56DB'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; } }}>
                    {newsletterState === 'loading' ? 'Subscribing…' : 'Subscribe'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media(max-width:1024px){
          .blog-grid { grid-template-columns: 1fr 1fr !important; }
          .featured-grid { grid-template-columns: 1fr !important; }
          .featured-grid > div:first-child { min-height: 220px !important; }
        }
        @media(max-width:640px){
          .blog-grid { grid-template-columns: 1fr !important; }
          .newsletter-form { flex-direction: column !important; }
        }
      `}</style>
    </>
  );
}
