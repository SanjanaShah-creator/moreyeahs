'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import { GradientBars } from '@/components/ui/gradient-bar-hero-section';

const BLUE = '#4D86F5';

/* ─── Playbook data ─────────────────────────────────────────────── */
const PLAYBOOKS = [
  {
    slug: 'connected-systems-playbook',
    title: 'The Connected Systems Playbook',
    desc: 'How to design CRM, operations, and internal tools that work together.',
    tags: ['Operations', 'B2B'],
    readTime: '12 min read',
  },
  {
    slug: 'crm-implementation-playbook',
    title: 'CRM Implementation Playbook',
    desc: 'From scattered leads to a structured sales pipeline.',
    tags: ['Sales', 'B2B'],
    readTime: '10 min read',
  },
  {
    slug: 'sales-to-operations-handoff',
    title: 'Sales To Operations Handoff Playbook',
    desc: 'Eliminate delays between closing a deal and starting execution.',
    tags: ['Sales', 'Operations', 'B2B'],
    readTime: '9 min read',
  },
  {
    slug: 'business-process-automation',
    title: 'Business Process Automation Playbook',
    desc: 'Automate high-impact workflows and reduce manual overhead across your business.',
    tags: ['Operations', 'B2B'],
    readTime: '11 min read',
  },
  {
    slug: 'real-time-dashboard-reports',
    title: 'Real-Time Dashboard & Reports Playbook',
    desc: 'Build dashboards that reflect actual business activity.',
    tags: ['Automation', 'Operations'],
    readTime: '8 min read',
  },
];

const ALL_TAGS = ['All', 'Sales', 'Operations', 'B2B', 'Automation'];

const TAG_COLORS: Record<string, string> = {
  Sales: '#4D86F5',
  Operations: '#1A56DB',
  B2B: '#80A9FF',
  Automation: '#0E2E75',
  Library: '#4D86F5',
};

function TagPill({ label }: { label: string }) {
  const color = TAG_COLORS[label] ?? '#4D86F5';
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
      color, background: `${color}18`, border: `1px solid ${color}30`,
      padding: '3px 9px', borderRadius: 999, display: 'inline-block',
    }}>
      {label}
    </span>
  );
}

export default function ResourcesPage() {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  const filtered = PLAYBOOKS.filter(p => {
    const matchTag = activeTag === 'All' || p.tags.includes(activeTag);
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
    return matchTag && matchSearch;
  });

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 80 }}>
        <GradientBars count={16} />
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 3, textAlign: 'center', maxWidth: 680 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="section-badge" style={{ display: 'inline-flex', marginBottom: 20 }}>
              <BookOpen size={11} strokeWidth={2} style={{ marginRight: 5 }} />
              Playbooks & Resources
            </div>
            <h1 style={{ fontSize: 'clamp(32px,5vw,60px)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--fg)', lineHeight: 1.06, marginBottom: 18 }}>
              Practical Guides to<br /><span className="grad">Build Smarter</span>
            </h1>
            <p style={{ fontSize: 16, color: 'var(--fg-3)', lineHeight: 1.75 }}>
              Actionable playbooks and frameworks from MoreYeahs — built for teams that move fast and build to last.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Listing ── */}
      <section style={{ background: 'var(--bg-2)', padding: '80px 0 120px', position: 'relative' }}>
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>

          {/* Search + filters */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 40, flexWrap: 'wrap' }}
            className="res-search-row"
          >
            {/* Search */}
            <div style={{
              flex: 1, minWidth: 240,
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'var(--card-bg)', border: '1px solid var(--card-border)',
              borderRadius: 12, padding: '0 16px',
              backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
            }}>
              <Search size={14} color="var(--fg-3)" strokeWidth={2} style={{ flexShrink: 0 }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search Playbooks"
                style={{
                  flex: 1, border: 'none', background: 'transparent',
                  fontSize: 13, color: 'var(--fg)', padding: '13px 0',
                  outline: 'none', fontFamily: 'inherit',
                }}
              />
            </div>
            {/* Filter pills */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--fg-3)', marginRight: 4 }}>Filters:</span>
              {ALL_TAGS.map(tag => {
                const active = activeTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    style={{
                      padding: '7px 16px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                      cursor: 'pointer', fontFamily: 'inherit',
                      background: active ? BLUE : 'var(--card-bg)',
                      color: active ? '#fff' : 'var(--fg-3)',
                      border: active ? 'none' : '1px solid var(--card-border)',
                      transition: 'all 0.18s',
                    } as React.CSSProperties}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--fg-3)', fontSize: 15 }}>
              No playbooks match your search.
            </div>
          ) : (
            <div className="res-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
              {filtered.map((p, i) => (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                >
                  <Link
                    href={`/resources/${p.slug}`}
                    style={{
                      display: 'flex', flexDirection: 'column', gap: 0,
                      background: 'var(--card-bg)', border: '1px solid var(--card-border)',
                      borderRadius: 18, overflow: 'hidden', textDecoration: 'none',
                      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                      transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
                      height: '100%',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = `${BLUE}40`;
                      el.style.boxShadow = `0 12px 40px ${BLUE}12`;
                      el.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = 'var(--card-border)';
                      el.style.boxShadow = 'none';
                      el.style.transform = 'none';
                    }}
                  >
                    {/* Top accent */}
                    <div style={{ height: 4, background: `linear-gradient(90deg, ${BLUE}, ${BLUE}60)`, flexShrink: 0 }} />

                    <div style={{ padding: '24px 24px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      {/* Tags */}
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                        {p.tags.map(t => <TagPill key={t} label={t} />)}
                      </div>

                      {/* Title */}
                      <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--fg)', lineHeight: 1.45, letterSpacing: '-0.02em', marginBottom: 10, flex: 1 }}>
                        {p.title}
                      </h3>

                      {/* Desc */}
                      <p style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.7, marginBottom: 20 }}>
                        {p.desc}
                      </p>

                      {/* Footer */}
                      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 11, color: 'var(--fg-3)', fontWeight: 500 }}>{p.readTime}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: BLUE, display: 'flex', alignItems: 'center', gap: 4 }}>
                          View Details <ArrowRight size={11} strokeWidth={2.5} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`
        @media(max-width:640px){
          .res-search-row{ flex-direction: column; align-items: stretch !important; }
          .res-grid{ grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
