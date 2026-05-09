'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Cloud, Code2, BarChart2, Zap, Globe } from 'lucide-react';
import Link from 'next/link';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import { EXPO, FU, SC, STAGGER } from '@/lib/anim';
import {
  fetchCaseStudies,
  type CaseStudy,
  stripHtmlTags,
  truncateText,
  formatDate,
  getLocalCaseStudyImage,
} from '@/lib/wordpress-api';

const ICONS = [Brain, Cloud, Code2, BarChart2, Zap, Globe];
const COLORS = ['#4D86F5', '#80A9FF', '#1A56DB'];

function getTermLabel(cs: CaseStudy): { domain: string; industry: string } {
  const terms = cs._embedded?.['wp:term']?.flat() ?? [];
  const domain =
    terms.find(t => (t as { taxonomy?: string }).taxonomy !== 'post_tag')?.name ??
    'Case Study';
  const industry =
    terms.filter(t => (t as { taxonomy?: string }).taxonomy !== 'post_tag')?.[1]?.name ?? '';
  return { domain, industry };
}

function getBroadCategory(cs: CaseStudy): string {
  const slug = cs.slug.toLowerCase();
  const terms = (cs._embedded?.['wp:term']?.flat() ?? []).map(t => `${t.name} ${t.slug}`).join(' ').toLowerCase();
  const text = slug + ' ' + terms;
  if (text.includes('salesforce')) return 'salesforce';
  if (text.includes('microsoft') || text.includes('azure') || text.includes('dynamics')) return 'microsoft';
  if (text.includes('cloud') || text.includes('devops')) return 'cloud';
  if (text.includes('web') || text.includes('mobile')) return 'web';
  if (text.includes('ai') || text.includes('data') || text.includes('machine') || text.includes('intelligence')) return 'ai';
  return 'other';
}

function pickDiverse(all: CaseStudy[], count: number): CaseStudy[] {
  const seen = new Set<string>();
  const result: CaseStudy[] = [];
  for (const cs of all) {
    const cat = getBroadCategory(cs);
    if (!seen.has(cat)) { seen.add(cat); result.push(cs); }
    if (result.length === count) return result;
  }
  // fill remaining if not enough diversity
  for (const cs of all) {
    if (!result.includes(cs)) result.push(cs);
    if (result.length === count) return result;
  }
  return result;
}

function SkeletonCard() {
  return (
    <div className="glass" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16, minHeight: 280 }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(77,134,245,0.08)' }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ height: 9, width: '55%', borderRadius: 4, background: 'rgba(77,134,245,0.08)' }} />
          <div style={{ height: 8, width: '35%', borderRadius: 4, background: 'rgba(77,134,245,0.06)' }} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        <div style={{ height: 13, borderRadius: 4, background: 'rgba(77,134,245,0.08)' }} />
        <div style={{ height: 13, width: '75%', borderRadius: 4, background: 'rgba(77,134,245,0.08)' }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ height: 9, borderRadius: 4, background: 'rgba(77,134,245,0.06)' }} />
        <div style={{ height: 9, borderRadius: 4, background: 'rgba(77,134,245,0.06)' }} />
        <div style={{ height: 9, width: '65%', borderRadius: 4, background: 'rgba(77,134,245,0.06)' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: 18 }}>
        <div style={{ height: 9, width: '30%', borderRadius: 4, background: 'rgba(77,134,245,0.06)' }} />
        <div style={{ height: 9, width: '35%', borderRadius: 4, background: 'rgba(77,134,245,0.08)' }} />
      </div>
    </div>
  );
}

export default function CaseStudiesSection() {
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetchCaseStudies({ perPage: 20 })
      .then(data => {
        if (data.length === 0) setFailed(true);
        else setCases(pickDiverse(data, 3));
      })
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section" style={{ background: 'var(--bg-2)' }}>
      <NoiseOverlay />
      <div className="blob" style={{ width: 520, height: 520, bottom: '-60px', right: '-10%', background: 'radial-gradient(circle, rgba(26,86,219,0.10), transparent 68%)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        {/* Heading row */}
        <motion.div
          variants={FU(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-80px' }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 20 }}
        >
          <div>
            <div className="section-badge" style={{ marginBottom: 16 }}>Case Studies</div>
            <h2 style={{ fontSize: 'clamp(26px,3.8vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--fg)', lineHeight: 1.1 }}>
              Proof in <span className="grad">Real Results</span>
            </h2>
          </div>
          <Link
            href="/case-studies"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: 'rgba(26,86,219,0.08)', border: '1px solid rgba(77,134,245,0.22)',
              color: '#4D86F5', fontSize: 13, fontWeight: 700, borderRadius: 10,
              padding: '11px 18px', textDecoration: 'none',
              backdropFilter: 'blur(12px)', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(128,169,255,0.14)'; (e.currentTarget as HTMLElement).style.color = '#80A9FF'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(26,86,219,0.08)'; (e.currentTarget as HTMLElement).style.color = '#4D86F5'; }}
          >
            View all case studies <ArrowRight size={13} strokeWidth={2} />
          </Link>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={STAGGER(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-80px' }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22, alignItems: 'stretch' }}
          className="cs-grid"
        >
          {loading
            ? [0, 1, 2].map(i => (
                <motion.div key={i} variants={SC(0)} style={{ display: 'flex' }}>
                  <div style={{ width: '100%' }}><SkeletonCard /></div>
                </motion.div>
              ))
            : failed
              ? null
              : cases.map((cs, i) => {
                  const color = COLORS[i % COLORS.length];
                  const Icon = ICONS[i % ICONS.length];
                  const { domain, industry } = getTermLabel(cs);
                  const desc = truncateText(stripHtmlTags(cs.excerpt.rendered), 140);
                  const title = stripHtmlTags(cs.title.rendered);
                  const imgSrc = getLocalCaseStudyImage(cs.slug);

                  return (
                    <motion.div
                      key={cs.id}
                      variants={SC(0)}
                      whileHover={{ y: -7, boxShadow: `0 24px 56px ${color}22`, transition: { duration: 0.3, ease: EXPO } }}
                      style={{ display: 'flex' }}
                    >
                      <Link href={`/case-study/${cs.slug}`} style={{ textDecoration: 'none', display: 'flex', width: '100%' }}>
                        <div className="glass" style={{ padding: 0, width: '100%', cursor: 'pointer', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                          {/* Cover image or gradient fallback */}
                          {imgSrc ? (
                            <div style={{ height: 160, overflow: 'hidden', flexShrink: 0 }}>
                              <img src={imgSrc} alt={title} loading="lazy"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                            </div>
                          ) : (
                            <div style={{
                              height: 160, flexShrink: 0,
                              background: `linear-gradient(135deg, #1A56DB 0%, #4D86F5 50%, #80A9FF 100%)`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', background: 'rgba(0,0,0,0.18)', padding: '6px 14px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.25)' }}>
                                {domain}
                              </span>
                            </div>
                          )}
                          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', flex: 1 }}>
                          {/* Domain tag */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(26,86,219,0.10)', border: '1px solid rgba(77,134,245,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Icon size={14} color={color} strokeWidth={1.5} />
                            </div>
                            <div>
                              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color }}>{domain}</div>
                              {industry && <div style={{ fontSize: 11, color: 'var(--fg-3)' }}>{industry}</div>}
                            </div>
                          </div>

                          <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)', lineHeight: 1.35, marginBottom: 12, letterSpacing: '-0.01em' }}>
                              {title}
                            </h3>
                            <p style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.7, marginBottom: 24 }}>
                              {desc}
                            </p>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: 18 }}>
                            <span style={{ fontSize: 11, color: 'var(--fg-3)' }}>{formatDate(cs.date)}</span>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color }}>
                              Read case study <ArrowRight size={11} strokeWidth={2.5} />
                            </span>
                          </div>
                        </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
        </motion.div>

        {!loading && failed && (
          <motion.div
            variants={FU(0.1)} initial="hidden" whileInView="visible" viewport={{ once: false, margin: '-60px' }}
            style={{ textAlign: 'center', padding: '48px 24px 16px' }}
          >
            <p style={{ fontSize: 14, color: 'var(--fg-3)', marginBottom: 20 }}>
              Explore our full portfolio of client engagements.
            </p>
            <Link href="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1A56DB', color: '#fff', fontSize: 13, fontWeight: 700, borderRadius: 10, padding: '12px 24px', textDecoration: 'none', boxShadow: '0 4px 18px rgba(26,86,219,0.32)' }}>
              View all case studies <ArrowRight size={13} strokeWidth={2} />
            </Link>
          </motion.div>
        )}
      </div>

      <style>{`
        @media(max-width:1024px){ .cs-grid{grid-template-columns:repeat(2,1fr)!important} }
        @media(max-width:640px){ .cs-grid{grid-template-columns:1fr!important} }
      `}</style>
    </section>
  );
}
