import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, ChevronRight } from 'lucide-react';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import { GradientBars } from '@/components/ui/gradient-bar-hero-section';
import {
  fetchCaseStudyBySlug, fetchAllCaseStudies,
  stripHtmlTags, formatDate, getCoverImage, getLocalCaseStudyImage, rewriteWPUrls, CaseStudy,
  truncateText, CaseStudyAcfContentSection, CaseStudyAcfSidebarSection,
} from '@/lib/wordpress-api';
import CaseStudyActions from './CaseStudyActions';

interface WPTerm { id: number; name: string; slug: string; taxonomy: string }

const BLUE     = '#1A56DB';
const BLUE_MID = '#4D86F5';

const BRAND_GRADIENTS: [string, string][] = [
  ['#1A56DB', '#4D86F5'],
  ['#0E2E75', '#1A56DB'],
  ['#1A56DB', '#80A9FF'],
];

function brandGradient(id: number): [string, string] {
  return BRAND_GRADIENTS[Math.abs(id) % BRAND_GRADIENTS.length];
}

function transformStudy(study: CaseStudy) {
  const allTerms: WPTerm[] = (study._embedded?.['wp:term']?.flat() ?? []) as WPTerm[];
  const validTerms = allTerms.filter(t => t.id && t.name);
  const category = validTerms[0]?.name ?? 'Case Study';
  const tags = validTerms.filter(t => t.taxonomy !== 'category');
  const rawAuthor = study._embedded?.author?.[0]?.name;
  const author = rawAuthor && rawAuthor.toLowerCase() === 'shubham' ? 'MoreYeahs' : rawAuthor || 'MoreYeahs';

  const rawSections = study.acf_fields?.content_sections;
  const acfSections: CaseStudyAcfContentSection[] = Array.isArray(rawSections) ? rawSections : [];
  const classicContent = rewriteWPUrls(study.content?.rendered ?? '');
  const sidebarSections: CaseStudyAcfSidebarSection[] =
    study.acf_fields?.sidebar_section?.sidebar_sections ?? [];

  const acfSubtitle = study.acf_fields?.header_section?.subtitle ?? '';
  const excerpt = acfSubtitle || stripHtmlTags(study.excerpt?.rendered || '');

  const [gradientColor1, gradientColor2] = brandGradient(study.id);
  const coverImage = getCoverImage(study._embedded) ?? getLocalCaseStudyImage(study.slug);

  return {
    title: study.title.rendered,
    date: formatDate(study.date),
    acfSections,
    classicContent,
    sidebarSections,
    excerpt,
    category,
    tags,
    coverImage,
    gradientColor1,
    gradientColor2,
    author,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [raw, allRaw] = await Promise.all([
    fetchCaseStudyBySlug(slug),
    fetchAllCaseStudies({ perPage: 6 }),
  ]);

  if (!raw) notFound();

  const study = transformStudy(raw);

  const related = allRaw
    .filter(s => s.slug !== slug)
    .slice(0, 3)
    .map(s => {
      const terms: WPTerm[] = (s._embedded?.['wp:term']?.flat() ?? []) as WPTerm[];
      const cat = terms.find(t => t.id)?.name ?? 'Case Study';
      const [g1, g2] = brandGradient(s.id);
      return {
        slug: s.slug,
        title: s.title.rendered,
        category: cat,
        coverImage: getCoverImage(s._embedded) ?? getLocalCaseStudyImage(s.slug),
        gradientColor1: g1,
        gradientColor2: g2,
        summary: truncateText(stripHtmlTags(s.excerpt?.rendered || s.content.rendered), 80),
      };
    });

  const hasAcf = study.acfSections.length > 0;

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 64 }}>
        <GradientBars count={16} />
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>

            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--fg-3)', marginBottom: 20, flexWrap: 'wrap' }}>
              <Link href="/case-studies" style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--fg-3)', textDecoration: 'none', fontWeight: 600 }}>
                <ArrowLeft size={12} strokeWidth={2} /> Case Studies
              </Link>
              <ChevronRight size={12} strokeWidth={2} color="var(--fg-3)" />
              <span style={{ color: BLUE_MID, fontWeight: 700 }}>{study.category}</span>
            </div>

            <div style={{ marginBottom: 18 }}>
              <span style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                color: BLUE_MID, background: 'rgba(77,134,245,0.10)', border: '1px solid rgba(77,134,245,0.25)',
                padding: '4px 12px', borderRadius: 999, display: 'inline-block',
              }}>
                {study.category}
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(26px,4vw,52px)', fontWeight: 800,
              letterSpacing: '-0.03em', color: 'var(--fg)',
              lineHeight: 1.08, marginBottom: 18,
            }}>
              {study.title}
            </h1>

            {study.excerpt && (
              <p style={{ fontSize: 16, color: 'var(--fg-3)', lineHeight: 1.75, maxWidth: 620, marginBottom: 28 }}>
                {study.excerpt}
              </p>
            )}

            <div style={{
              display: 'flex', alignItems: 'center', gap: 16,
              paddingTop: 20, borderTop: '1px solid var(--border)', flexWrap: 'wrap',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--fg-3)', fontWeight: 600 }}>
                <Calendar size={11} strokeWidth={2} /> {study.date}
              </div>
              {study.author && (
                <span style={{ fontSize: 12, color: 'var(--fg-3)', fontWeight: 600 }}>
                  By {study.author}
                </span>
              )}
              {study.tags.length > 0 && (
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  {study.tags.slice(0, 4).map(t => (
                    <span key={t.id} style={{
                      fontSize: 11, fontWeight: 600, color: 'var(--fg-3)',
                      background: 'var(--bg-2)', border: '1px solid var(--border)',
                      padding: '2px 8px', borderRadius: 999,
                    }}>
                      {t.name}
                    </span>
                  ))}
                </div>
              )}
              <div style={{ marginLeft: 'auto' }}>
                <CaseStudyActions title={study.title} slug={slug} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <section style={{ background: 'var(--bg-2)', paddingTop: 56, paddingBottom: 80 }}>
        <div className="container">
          <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 40 }}>

            {/* Cover image */}
            {study.coverImage ? (
              <div style={{ borderRadius: 20, overflow: 'hidden', height: 420 }}>
                <img src={study.coverImage} alt={study.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            ) : null}

            {/* Details strip — horizontal metadata bar */}
            <div className="glass" style={{ padding: '20px 28px', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 4 }}>Category</p>
                <span style={{
                  fontSize: 11, fontWeight: 700, color: BLUE_MID,
                  background: 'rgba(77,134,245,0.10)', border: '1px solid rgba(77,134,245,0.25)',
                  padding: '3px 10px', borderRadius: 999,
                }}>
                  {study.category}
                </span>
              </div>
              <div style={{ width: 1, height: 36, background: 'var(--border)', flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 4 }}>Published</p>
                <p style={{ fontSize: 13, color: 'var(--fg-2)', fontWeight: 600 }}>{study.date}</p>
              </div>
              {study.author && (
                <>
                  <div style={{ width: 1, height: 36, background: 'var(--border)', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 4 }}>Author</p>
                    <p style={{ fontSize: 13, color: 'var(--fg-2)', fontWeight: 600 }}>{study.author}</p>
                  </div>
                </>
              )}
              {study.tags.length > 0 && (
                <>
                  <div style={{ width: 1, height: 36, background: 'var(--border)', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 6 }}>Tags</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                      {study.tags.map(t => (
                        <span key={t.id} style={{
                          fontSize: 10, fontWeight: 600, color: 'var(--fg-3)',
                          background: 'var(--bg)', border: '1px solid var(--border)',
                          padding: '3px 8px', borderRadius: 999,
                        }}>
                          {t.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* ACF sidebar sections as horizontal cards row */}
            {study.sidebarSections.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
                {study.sidebarSections.map((ss, si) => (
                  <div key={si} className="glass" style={{ padding: '20px 20px 18px', borderRadius: 16, position: 'relative', overflow: 'hidden' }}>
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                      background: `linear-gradient(90deg, ${BLUE}, ${BLUE_MID})`,
                      borderRadius: '16px 16px 0 0',
                    }} />
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 12, marginTop: 4 }}>
                      {ss.section_title}
                    </p>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                      {ss.section_items.map((item, ii) => (
                        <li key={ii} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.5 }}>
                          <span style={{ width: 5, height: 5, borderRadius: '50%', background: BLUE_MID, flexShrink: 0, marginTop: 7 }} />
                          {item.item_text}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Main content sections */}
            {hasAcf ? (
              <div id="cs-acf-content" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                {study.acfSections.map((sec, i) => (
                  <div key={i} style={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 16,
                    padding: '28px 32px 24px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                      background: `linear-gradient(90deg, ${BLUE}, ${BLUE_MID})`,
                      borderRadius: '16px 16px 0 0',
                    }} />

                    <h2 style={{
                      fontSize: 'clamp(17px,2vw,20px)', fontWeight: 800,
                      color: 'var(--fg)', letterSpacing: '-0.02em',
                      marginBottom: 14, marginTop: 4,
                    }}>
                      {sec.section_title}
                    </h2>

                    {sec.section_content && (
                      <article className="cs-prose">
                        <div dangerouslySetInnerHTML={{ __html: rewriteWPUrls(sec.section_content) }} />
                      </article>
                    )}

                    {Array.isArray(sec.section_quotes) && sec.section_quotes.map((q, qi) =>
                      q.quote_text ? (
                        <blockquote key={qi} style={{
                          borderLeft: `3px solid ${BLUE_MID}`,
                          paddingLeft: 16, margin: '16px 0 0',
                          fontStyle: 'italic', fontSize: 14,
                          color: 'var(--fg-3)', lineHeight: 1.7,
                        }}>
                          {q.quote_text}
                        </blockquote>
                      ) : null
                    )}

                    {Array.isArray(sec.section_bullet_points) && sec.section_bullet_points.length > 0 && (
                      <ul style={{ margin: '12px 0 0', paddingLeft: 20 }}>
                        {sec.section_bullet_points.map((b, bi) => (
                          <li key={bi} style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.75, marginBottom: 6 }}>
                            {b.bullet_text}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <article id="cs-content" className="cs-prose">
                <div dangerouslySetInnerHTML={{ __html: study.classicContent }} />
              </article>
            )}

            {/* ── Get in Touch — full-width CTA banner ── */}
            <div style={{
              borderRadius: 24,
              padding: 'clamp(40px,5vw,72px)',
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
                  Start a Project
                </div>
                <h2 style={{ fontSize: 'clamp(24px,3.5vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--fg)', lineHeight: 1.1, marginBottom: 16 }}>
                  Ready for similar <span className="grad">results?</span>
                </h2>
                <p style={{ fontSize: 16, color: 'var(--fg-3)', lineHeight: 1.75, maxWidth: 460, margin: '0 auto 32px' }}>
                  Let&apos;s map out a strategy tailored to your business goals and deliver outcomes that matter.
                </p>
                <Link href="/contact-us" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 9,
                  background: BLUE, color: '#fff', fontSize: 14, fontWeight: 700,
                  borderRadius: 10, padding: '14px 28px', textDecoration: 'none',
                  boxShadow: '0 8px 28px rgba(26,86,219,0.38)',
                }}>
                  Get in Touch <ArrowRight size={14} strokeWidth={2} />
                </Link>
              </div>
            </div>

            {/* ── Related Studies ── */}
            {related.length > 0 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>Related Studies</p>
                  <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
                  {related.map(r => (
                    <Link key={r.slug} href={`/case-study/${r.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                      <div className="glass cs-related-card" style={{ padding: '14px', borderRadius: 16, height: '100%', boxSizing: 'border-box' }}>
                        <div style={{ height: 140, borderRadius: 10, overflow: 'hidden', marginBottom: 14 }}>
                          {r.coverImage ? (
                            <img src={r.coverImage} alt={r.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <div style={{
                              width: '100%', height: '100%',
                              background: `linear-gradient(135deg, ${r.gradientColor1}, ${r.gradientColor2})`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                              <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{r.category}</span>
                            </div>
                          )}
                        </div>
                        <p style={{ fontSize: 10, fontWeight: 700, color: BLUE_MID, marginBottom: 5 }}>{r.category}</p>
                        <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)', lineHeight: 1.4, marginBottom: 6 }}>{r.title}</p>
                        <p style={{ fontSize: 12, color: 'var(--fg-3)', lineHeight: 1.55 }}>{r.summary}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      <style>{`
        .cs-prose { font-size: 15px; line-height: 1.85; color: var(--fg); }
        .cs-prose p  { margin: 0 0 16px; }
        .cs-prose h1 { font-size: 28px; font-weight: 800; color: var(--fg); margin: 36px 0 16px; letter-spacing: -0.03em; }
        .cs-prose h2 { font-size: 22px; font-weight: 800; color: var(--fg); margin: 32px 0 14px; letter-spacing: -0.02em; }
        .cs-prose h3 { font-size: 18px; font-weight: 700; color: var(--fg); margin: 24px 0 10px; }
        .cs-prose h4 { font-size: 15px; font-weight: 700; color: var(--fg); margin: 18px 0 8px; }
        .cs-prose a  { color: #4D86F5; text-decoration: none; }
        .cs-prose a:hover { color: #1A56DB; }
        .cs-prose ul, .cs-prose ol { margin: 14px 0; padding-left: 22px; }
        .cs-prose li { margin: 7px 0; line-height: 1.75; }
        .cs-prose img { max-width: 100%; height: auto; border-radius: 10px; margin: 20px 0; display: block; }
        .cs-prose blockquote { border-left: 3px solid #4D86F5; padding-left: 16px; margin: 20px 0; font-style: italic; color: var(--fg-3); }
        .cs-prose code { background: var(--bg-2); padding: 2px 6px; border-radius: 4px; font-size: 13px; font-family: monospace; }
        .cs-prose pre { background: var(--bg-2); padding: 16px; border-radius: 10px; overflow-x: auto; margin: 16px 0; }
        .cs-prose pre code { background: none; padding: 0; }
        .cs-prose strong { color: var(--fg-2); font-weight: 700; }
        .cs-prose hr { border: none; border-top: 1px solid var(--border); margin: 28px 0; }
        .cs-prose table { width: 100%; border-collapse: collapse; margin: 18px 0; font-size: 14px; }
        .cs-prose th { background: rgba(26,86,219,0.07); color: var(--fg); font-weight: 700; padding: 10px 14px; text-align: left; border-bottom: 2px solid rgba(26,86,219,0.18); }
        .cs-prose td { padding: 10px 14px; border-bottom: 1px solid var(--border); color: var(--fg-2); }
        .cs-prose .wp-block-image { margin: 20px 0; }
        .cs-prose .wp-block-image img { border-radius: 10px; max-width: 100%; height: auto; }
        .cs-prose .wp-block-quote { border-left: 3px solid #4D86F5; padding-left: 16px; margin: 20px 0; }
        .cs-prose .wp-block-quote p { font-style: italic; color: var(--fg-3); }
        .cs-prose .wp-block-separator { border: none; border-top: 1px solid var(--border); margin: 28px 0; }
        .cs-prose .wp-block-columns { display: flex; gap: 20px; margin: 20px 0; }
        .cs-prose .wp-block-column { flex: 1; min-width: 0; }
        .cs-related-card { transition: transform 0.2s; }
        .cs-related-card:hover { transform: translateY(-3px); }
        @media(max-width: 768px) {
          .cs-bottom-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
