'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import { SC, STAGGER } from '@/lib/anim';
import {
  fetchCaseStudies, type CaseStudy,
  stripHtmlTags, truncateText, formatDate, getCoverImage, getLocalCaseStudyImage,
} from '@/lib/wordpress-api';

const BLUE = '#4D86F5';

const FILTER_KEYWORDS: Record<string, string[]> = {
  'salesforce':                  ['salesforce'],
  'data-science':                ['ai', 'data', 'machine-learning', 'artificial-intelligence', 'computer-vision', 'iot', 'intelligence', 'seed', 'surveillance', 'healthcare', 'clinical'],
  'microsoft':                   ['microsoft', 'azure', 'dynamics', 'sharepoint', 'power-platform', 'm365', 'teams'],
  'cloud':                       ['cloud', 'infrastructure', 'devops', 'kubernetes', 'aws', 'gcp', 'cicd'],
  'web-application-development': ['web', 'mobile', 'app', 'application', 'react', 'flutter', 'ecommerce'],
};

function matchesFilter(cs: CaseStudy, filter: string): boolean {
  const keywords = FILTER_KEYWORDS[filter] ?? [filter];
  const terms = cs._embedded?.['wp:term']?.flat() ?? [];
  const termText = terms.map(t => `${t.name} ${t.slug}`).join(' ').toLowerCase();
  const slugText = cs.slug.toLowerCase();
  return keywords.some(kw => termText.includes(kw) || slugText.includes(kw));
}

interface Props {
  filter: string;       // URL param value e.g. "data-science"
  solutionName: string; // e.g. "Data Science & AI"
}

export default function SolutionCaseStudies({ filter, solutionName }: Props) {
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaseStudies({ perPage: 50 })
      .then(all => {
        const filtered = all.filter(cs => matchesFilter(cs, filter));
        setCases((filtered.length > 0 ? filtered : all).slice(0, 3));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <section style={{ background: 'var(--bg-2)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
      <NoiseOverlay />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div className="section-badge" style={{ marginBottom: 14 }}>Case Studies</div>
            <h2 style={{ fontSize: 'clamp(24px,3.5vw,40px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--fg)', lineHeight: 1.1 }}>
              Real Impact, <span className="grad">Measurable Results</span>
            </h2>
          </div>
          <Link
            href={`/case-studies?filter=${filter}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(26,86,219,0.08)', border: '1px solid rgba(77,134,245,0.22)', color: BLUE, fontSize: 13, fontWeight: 700, borderRadius: 10, padding: '11px 18px', textDecoration: 'none', transition: 'all 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(128,169,255,0.14)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(26,86,219,0.08)'; }}
          >
            View all {solutionName} case studies <ArrowRight size={13} strokeWidth={2} />
          </Link>
        </div>

        {/* Cards */}
        <motion.div
          variants={STAGGER(0.1)} initial="hidden" whileInView="visible" viewport={{ once: false, margin: '-60px' }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}
        >
          {loading
            ? [0, 1, 2].map(i => (
                <motion.div key={i} variants={SC(0)}>
                  <div style={{ borderRadius: 22, border: '1px solid var(--border)', background: 'var(--card-bg)', overflow: 'hidden', height: 280, display: 'flex', flexDirection: 'column', padding: 26, gap: 12 }}>
                    <div style={{ height: 5, borderRadius: 2, background: 'rgba(77,134,245,0.10)' }} />
                    <div style={{ height: 9, width: '45%', borderRadius: 4, background: 'rgba(77,134,245,0.08)' }} />
                    <div style={{ height: 14, borderRadius: 4, background: 'rgba(77,134,245,0.08)' }} />
                    <div style={{ height: 14, width: '80%', borderRadius: 4, background: 'rgba(77,134,245,0.06)' }} />
                    <div style={{ flex: 1 }} />
                    <div style={{ height: 12, width: '40%', borderRadius: 4, background: 'rgba(77,134,245,0.06)' }} />
                  </div>
                </motion.div>
              ))
            : cases.map((cs) => {
                const terms = cs._embedded?.['wp:term']?.flat() as Array<{ name: string }> ?? [];
                const industry = terms[0]?.name ?? 'Case Study';
                const title = stripHtmlTags(cs.title.rendered);
                const summary = truncateText(stripHtmlTags(cs.excerpt.rendered || cs.content.rendered), 150);
                const imgSrc = getCoverImage(cs._embedded) ?? getLocalCaseStudyImage(cs.slug);
                return (
                  <motion.div
                    key={cs.id}
                    variants={SC(0)}
                    whileHover={{ y: -6, boxShadow: `0 24px 60px ${BLUE}22`, transition: { duration: 0.3 } }}
                  >
                    <Link href={`/case-study/${cs.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                      <div style={{ border: '1px solid var(--border)', background: 'var(--card-bg)', display: 'flex', flexDirection: 'column', height: '100%', borderRadius: 22, overflow: 'hidden' }}>
                        <div style={{ height: 5, flexShrink: 0, background: `linear-gradient(90deg, ${BLUE}, ${BLUE}70)` }} />
                        {imgSrc ? (
                          <div style={{ height: 160, overflow: 'hidden', flexShrink: 0 }}>
                            <img src={imgSrc} alt={title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                          </div>
                        ) : (
                          <div style={{ height: 160, flexShrink: 0, background: 'linear-gradient(135deg, #1A56DB 0%, #4D86F5 50%, #80A9FF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', background: 'rgba(0,0,0,0.18)', padding: '6px 14px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.25)' }}>{industry}</span>
                          </div>
                        )}
                        <div style={{ padding: '22px 24px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.10em', textTransform: 'uppercase', color: BLUE, padding: '4px 10px', borderRadius: 999, background: `${BLUE}12`, border: `1px solid ${BLUE}25`, width: 'fit-content', marginBottom: 12 }}>
                            {industry}
                          </span>
                          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg)', lineHeight: 1.4, marginBottom: 10 }}>{title}</div>
                          <div style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.7, flex: 1, marginBottom: 18 }}>{summary}</div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: 14 }}>
                            <span style={{ fontSize: 11, color: 'var(--fg-3)' }}>{formatDate(cs.date)}</span>
                            <span style={{ fontSize: 12, fontWeight: 700, color: BLUE, display: 'flex', alignItems: 'center', gap: 4 }}>
                              Read case study <ArrowRight size={11} strokeWidth={2.5} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })
          }
        </motion.div>
      </div>
    </section>
  );
}
