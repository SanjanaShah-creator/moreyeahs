'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, TrendingUp, Search, X, ChevronDown, ChevronLeft,
  ChevronRight, Check, SlidersHorizontal,
} from 'lucide-react';
import Link from 'next/link';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import { GradientBars } from '@/components/ui/gradient-bar-hero-section';
import {
  fetchAllCaseStudies, fetchCategories, stripHtmlTags, truncateText, formatDate,
  getCoverImage, getLocalCaseStudyImage, type CaseStudy, type WordPressCategory,
} from '@/lib/wordpress-api';

const PER_PAGE = 20;

const FV = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const FT = { duration: 0.6 };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

/* ── Always use primary blue shades only ── */
const PRIMARY = '#1A56DB';
const PRIMARY_LIGHT = '#4D86F5';

/* ── Site services from Navbar — used to classify WP categories ── */
const SITE_SERVICES = new Set([
  // Data Science & AI
  'ai', 'ai & machine learning', 'machine learning', 'computer vision',
  'data infrastructure', 'iot & connected systems', 'data engineering',
  // Cloud & Infrastructure
  'cloud platform setup', 'cloud platform setup (aws/gcp/azure)', 'devops', 'devops & automation',
  // Microsoft Services
  'microsoft crm & erp', 'dynamics 365', 'microsoft automation & analytics',
  'azure', 'sharepoint',
  // Salesforce Services
  'salesforce', 'salesforce support & managed services', 'salesforce implementation',
  // Web & App Development
  'web application development', 'mobile app development', 'design & quality',
]);

/* ── Smart term classification: split WP "category" into Industries / Services ── */
const INDUSTRY_TERMS = new Set([
  'healthcare', 'fintech', 'finance', 'retail', 'e-commerce', 'ecommerce',
  'manufacturing', 'education', 'edtech', 'agritech', 'agriculture',
  'insurance', 'real estate', 'logistics', 'legal', 'media', 'telecom',
  'government', 'energy', 'automotive', 'hospitality', 'professional services',
  'banking', 'pharma', 'pharmaceuticals', 'nonprofit', 'consumer goods', 'bfsi',
]);

function classifyTerm(name: string): string {
  const lower = name.toLowerCase().trim();
  if (SITE_SERVICES.has(lower)) return 'Services';
  if (INDUSTRY_TERMS.has(lower)) return 'Industries';
  return 'Services'; // default to Services for unknown terms
}


function taxonomyLabel(slug: string): string {
  const map: Record<string, string> = {
    industry: 'Industries', industries: 'Industries',
    service: 'Services', services: 'Services',
    category: 'Services', technology: 'Technologies',
  };
  return map[slug.toLowerCase()] ?? slug.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

interface WPTerm { id: number; name: string; slug: string; taxonomy: string }
interface CS {
  slug: string; title: string; summary: string; date: string;
  category: string; terms: WPTerm[]; coverImage: string | null;
  gradientColor1: string; gradientColor2: string;
}

function transform(s: CaseStudy): CS {
  const terms = (s._embedded?.['wp:term']?.flat() as WPTerm[] ?? []).filter(t => t.id && t.name);
  const idx = Math.abs(s.id % 3);
  const BRAND_GRADIENTS: [string, string][] = [
    ['#1A56DB', '#4D86F5'],
    ['#0E2E75', '#1A56DB'],
    ['#1A56DB', '#80A9FF'],
  ];
  const [gradientColor1, gradientColor2] = BRAND_GRADIENTS[idx];
  // Use WP featured image, then local fallback, then gradient
  const coverImage = getCoverImage(s._embedded) ?? getLocalCaseStudyImage(s.slug);
  return {
    slug: s.slug,
    title: stripHtmlTags(s.title.rendered),
    summary: truncateText(stripHtmlTags(s.excerpt.rendered || s.content.rendered), 140),
    date: formatDate(s.date),
    category: terms[0]?.name ?? 'Case Study',
    terms,
    coverImage,
    gradientColor1,
    gradientColor2,
  };
}

const TAX_ORDER = ['Industries', 'Services', 'Categories', 'Technologies'];

function buildGroups(studies: CS[], allCategories: WordPressCategory[]) {
  const map = new Map<string, Map<number, { id: number; name: string; count: number }>>();

  // Pre-populate ALL WP categories at count 0, classified as Services or Industries
  for (const cat of allCategories) {
    if (!cat.name || cat.slug === 'uncategorized') continue;
    const groupKey = classifyTerm(cat.name);
    if (!map.has(groupKey)) map.set(groupKey, new Map());
    map.get(groupKey)!.set(cat.id, { id: cat.id, name: cat.name, count: 0 });
  }

  // Count actual case studies per term
  for (const s of studies)
    for (const t of s.terms) {
      const groupKey = t.taxonomy === 'category' ? classifyTerm(t.name) : taxonomyLabel(t.taxonomy);
      if (!map.has(groupKey)) map.set(groupKey, new Map());
      const g = map.get(groupKey)!;
      if (!g.has(t.id)) g.set(t.id, { id: t.id, name: t.name, count: 0 });
      g.get(t.id)!.count++;
    }

  return [...map.entries()].map(([label, m]) => ({
    taxonomy: label,
    label,
    terms: [...m.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)),
  })).sort((a, b) => {
    const ai = TAX_ORDER.indexOf(a.label);
    const bi = TAX_ORDER.indexOf(b.label);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
}

/* ─── Sidebar filter ─────────────────────────────────────────────── */
interface SidebarProps {
  groups: ReturnType<typeof buildGroups>;
  selected: Set<number>;
  onToggle: (id: number) => void;
  search: string;
  onSearch: (v: string) => void;
  onClear: () => void;
  hasFilters: boolean;
}

function FilterSidebar({ groups, selected, onToggle, search, onSearch, onClear, hasFilters }: SidebarProps) {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const toggleGroup = (t: string) => setCollapsed(p => { const n = new Set(p); n.has(t) ? n.delete(t) : n.add(t); return n; });

  return (
    <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
      {/* Search */}
      <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ position: 'relative' }}>
          <Search size={13} color="var(--fg-3)" style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input
            type="text" placeholder="Search case studies..." value={search}
            onChange={e => onSearch(e.target.value)}
            style={{ width: '100%', boxSizing: 'border-box', padding: '9px 32px 9px 32px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg-2)', color: 'var(--fg)', fontSize: 12.5, outline: 'none', fontFamily: 'inherit' }}
          />
          {search && (
            <button onClick={() => onSearch('')} style={{ position: 'absolute', right: 9, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 2, display: 'flex', color: 'var(--fg-3)' }}>
              <X size={11} />
            </button>
          )}
        </div>
      </div>

      {/* Groups */}
      <div style={{ maxHeight: 520, overflowY: 'auto' }}>
        {groups.length === 0 ? (
          <p style={{ fontSize: 12, color: 'var(--fg-3)', textAlign: 'center', padding: 20 }}>No filters available</p>
        ) : groups.map((g, gi) => {
          const isOpen = !collapsed.has(g.taxonomy);
          const activeCount = g.terms.filter(t => selected.has(t.id)).length;
          return (
            <div key={g.taxonomy} style={{ borderTop: gi > 0 ? '1px solid var(--border)' : 'none' }}>
              <button onClick={() => toggleGroup(g.taxonomy)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '13px 16px', background: 'none', border: 'none', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)', letterSpacing: '-0.01em' }}>{g.label}</span>
                  {activeCount > 0 && (
                    <span style={{ fontSize: 9.5, fontWeight: 700, padding: '1px 6px', borderRadius: 999, background: `rgba(26,86,219,0.12)`, color: PRIMARY, border: `1px solid rgba(26,86,219,0.22)` }}>{activeCount}</span>
                  )}
                </div>
                <ChevronDown size={14} color="var(--fg-3)" style={{ transform: isOpen ? 'none' : 'rotate(-90deg)', transition: 'transform 0.2s' }} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} style={{ overflow: 'hidden' }}>
                    <div style={{ paddingBottom: 10 }}>
                      {g.terms.filter(term => term.count > 0 || selected.has(term.id)).map(term => {
                        const checked = selected.has(term.id);
                        return (
                          <label key={term.id}
                            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 16px', cursor: 'pointer', background: checked ? `rgba(26,86,219,0.05)` : 'transparent', transition: 'background 0.15s' }}
                            onMouseEnter={e => { if (!checked) (e.currentTarget as HTMLElement).style.background = 'var(--bg-2)'; }}
                            onMouseLeave={e => { if (!checked) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                          >
                            <div onClick={() => onToggle(term.id)} style={{ width: 16, height: 16, borderRadius: 4, flexShrink: 0, border: checked ? 'none' : '1.5px solid var(--border)', background: checked ? PRIMARY : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
                              {checked && <Check size={10} color="#fff" strokeWidth={2.5} />}
                            </div>
                            <span onClick={() => onToggle(term.id)} style={{ flex: 1, fontSize: 13, lineHeight: 1.4, color: checked ? 'var(--fg)' : 'var(--fg-2)', fontWeight: checked ? 600 : 400 }}>
                              {term.name}
                            </span>
                            <span style={{ fontSize: 12, color: 'var(--fg-3)', flexShrink: 0 }}>({term.count})</span>
                          </label>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {hasFilters && (
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)' }}>
          <button onClick={onClear} style={{ width: '100%', padding: 9, borderRadius: 10, border: `1px solid rgba(26,86,219,0.25)`, background: `rgba(26,86,219,0.06)`, color: PRIMARY, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(26,86,219,0.12)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(26,86,219,0.06)'; }}
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function CaseStudiesPage() {
  const [studies, setStudies]         = useState<CS[]>([]);
  const [allCategories, setAllCats]   = useState<WordPressCategory[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);
  const [search, setSearch]           = useState('');
  const [selected, setSelected]       = useState<Set<number>>(new Set());
  const [page, setPage]               = useState(1);
  const [mobileFilter, setMobile]     = useState(false);

  useEffect(() => {
    Promise.all([
      fetchAllCaseStudies({ perPage: 100 }),
      fetchCategories(),
    ])
      .then(([raw, cats]) => {
        setStudies(raw.map(transform));
        setAllCats(cats);
      })
      .catch(e => { console.error(e); setError('Failed to load case studies'); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (page > 1) setTimeout(() => document.querySelector('.cs-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }, [page]);

  const groups = useMemo(() => buildGroups(studies, allCategories), [studies, allCategories]);

  const selectedByTax = useMemo(() => {
    const m = new Map<string, Set<number>>();
    for (const g of groups) {
      const ids = g.terms.map(t => t.id).filter(id => selected.has(id));
      if (ids.length) m.set(g.taxonomy, new Set(ids));
    }
    return m;
  }, [selected, groups]);

  const filtered = useMemo(() => {
    let r = studies;
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(s => s.title.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q) || s.terms.some(t => t.name.toLowerCase().includes(q)));
    }
    if (selectedByTax.size > 0)
      r = r.filter(s => {
        const ids = new Set(s.terms.map(t => t.id));
        for (const [, taxIds] of selectedByTax)
          if (![...taxIds].some(id => ids.has(id))) return false;
        return true;
      });
    return r;
  }, [studies, search, selectedByTax]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated  = useMemo(() => filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE), [filtered, page]);

  const toggleTerm = (id: number) => { setPage(1); setSelected(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; }); };
  const clearFilters = () => { setSelected(new Set()); setSearch(''); setPage(1); };
  const hasFilters   = selected.size > 0 || search.trim().length > 0;

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 80 }}>
        <GradientBars count={16} />
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          {/* Breadcrumb — site standard: ← Solutions > Current */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--fg-3)', marginBottom: 32, flexWrap: 'wrap' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--fg-3)', textDecoration: 'none', fontWeight: 600 }}>
              <ArrowLeft size={12} strokeWidth={2} /> Home
            </Link>
            <ChevronRight size={12} strokeWidth={2} color="var(--fg-3)" />
            <span style={{ color: PRIMARY_LIGHT, fontWeight: 700 }}>Case Studies</span>
          </div>
          <motion.div variants={stagger} initial="hidden" animate="visible" style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto' }}>
            <motion.div variants={FV} transition={FT}>
              <div className="section-badge" style={{ display: 'inline-flex', marginBottom: 20 }}>
                <TrendingUp size={11} strokeWidth={2} /> Case Studies
              </div>
            </motion.div>
            <motion.h1 variants={FV} transition={FT} style={{ fontSize: 'clamp(34px,5.5vw,62px)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--fg)', lineHeight: 1.06, marginBottom: 22 }}>
              Proof in <span className="grad">Real Results</span>
            </motion.h1>
            <motion.p variants={FV} transition={FT} style={{ fontSize: 17, color: 'var(--fg-3)', lineHeight: 1.8, maxWidth: 520, margin: '0 auto' }}>
              Each engagement is a partnership. Here is how we have helped clients across industries solve hard problems and scale with confidence.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main */}
      <section className="section" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          {loading ? (
            /* ── Skeleton matching actual layout: sidebar + 2-col grid ── */
            <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 32, alignItems: 'start' }} className="cs-layout">
              {/* Sidebar skeleton */}
              <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
                  <div className="skeleton" style={{ height: 36, borderRadius: 10 }} />
                </div>
                <div style={{ padding: '13px 16px', borderBottom: '1px solid var(--border)' }}>
                  <div className="skeleton" style={{ width: '50%', height: 14, borderRadius: 999 }} />
                </div>
                {[80, 60, 70, 55, 65, 75].map((w, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 16px' }}>
                    <div className="skeleton" style={{ width: 16, height: 16, borderRadius: 4, flexShrink: 0 }} />
                    <div className="skeleton" style={{ flex: 1, height: 13, borderRadius: 999, maxWidth: `${w}%` }} />
                    <div className="skeleton" style={{ width: 24, height: 13, borderRadius: 999 }} />
                  </div>
                ))}
              </div>
              {/* Cards skeleton */}
              <div>
                <div className="skeleton" style={{ width: 120, height: 13, borderRadius: 999, marginBottom: 22 }} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 24 }} className="cs-grid">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="glass" style={{ padding: 0, overflow: 'hidden' }}>
                      <div className="skeleton" style={{ height: 172, borderRadius: 0 }} />
                      <div style={{ padding: '20px 22px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div className="skeleton" style={{ width: '38%', height: 20, borderRadius: 999 }} />
                        <div className="skeleton" style={{ height: 20, borderRadius: 8 }} />
                        <div className="skeleton" style={{ width: '75%', height: 20, borderRadius: 8 }} />
                        <div className="skeleton" style={{ height: 14, borderRadius: 999 }} />
                        <div className="skeleton" style={{ width: '85%', height: 14, borderRadius: 999 }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: 13, marginTop: 4 }}>
                          <div className="skeleton" style={{ width: 70, height: 12, borderRadius: 999 }} />
                          <div className="skeleton" style={{ width: 100, height: 12, borderRadius: 999 }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '64px 20px', color: '#EF4444', fontSize: 15 }}>{error}</div>
          ) : (
            <div>
              {/* Mobile filter toggle */}
              <div className="mobile-filter-toggle" style={{ display: 'none', marginBottom: 16 }}>
                <button onClick={() => setMobile(v => !v)}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 10, fontSize: 13, fontWeight: 700, background: hasFilters ? `rgba(26,86,219,0.10)` : 'var(--bg)', border: `1px solid ${hasFilters ? 'rgba(26,86,219,0.30)' : 'var(--border)'}`, color: hasFilters ? PRIMARY : 'var(--fg)', cursor: 'pointer', fontFamily: 'inherit' }}>
                  <SlidersHorizontal size={14} strokeWidth={1.8} />
                  Filters{selected.size > 0 ? ` (${selected.size})` : ''}
                  {hasFilters && <X size={12} onClick={e => { e.stopPropagation(); clearFilters(); }} />}
                </button>
              </div>

              {/* Count + active pills — above the grid so sidebar aligns with first card */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10, paddingLeft: 292 }}>
                <p style={{ fontSize: 13, color: 'var(--fg-3)', margin: 0 }}>
                  {filtered.length === studies.length
                    ? `${studies.length} case ${studies.length === 1 ? 'study' : 'studies'}`
                    : `${filtered.length} of ${studies.length} case ${studies.length === 1 ? 'study' : 'studies'}`}
                </p>
                {selected.size > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {[...selected].map(id => {
                      const t = groups.flatMap(g => g.terms).find(t => t.id === id);
                      if (!t) return null;
                      return (
                        <button key={id} onClick={() => toggleTerm(id)} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: PRIMARY, background: `rgba(26,86,219,0.08)`, border: `1px solid rgba(26,86,219,0.22)`, borderRadius: 999, padding: '4px 10px', cursor: 'pointer' }}>
                          {t.name} <X size={9} />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 32, alignItems: 'start' }} className="cs-layout">
                <aside style={{ position: 'sticky', top: 30 }} className={`cs-sidebar${mobileFilter ? ' mobile-open' : ''}`}>
                  <FilterSidebar groups={groups} selected={selected} onToggle={toggleTerm} search={search} onSearch={v => { setSearch(v); setPage(1); }} onClear={clearFilters} hasFilters={hasFilters} />
                </aside>

                <div>
                  {filtered.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '64px 20px', color: 'var(--fg-3)', fontSize: 15 }}>
                      No case studies match your filters.{' '}
                      <button onClick={clearFilters} style={{ color: PRIMARY_LIGHT, background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 600 }}>Clear filters</button>
                    </div>
                  ) : (
                    <>
                      {/* Cards — use animate (not whileInView) so they always render visible */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 24 }} className="cs-grid">
                        {paginated.map(({ slug, title, summary, date, category, coverImage, gradientColor1, gradientColor2 }, i) => (
                          <motion.div
                            key={`${slug}-${page}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            whileHover={{ y: -5 }}
                            className="glass"
                            style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                          >
                            {/* Cover image or gradient banner */}
                            <div style={{ height: 172, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                              {coverImage ? (
                                <img src={coverImage} alt={title} loading="lazy"
                                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                                  onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'; }}
                                  onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                                />
                              ) : (
                                <div style={{
                                  width: '100%', height: '100%',
                                  background: `linear-gradient(135deg, ${gradientColor1}, ${gradientColor2})`,
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                  <span style={{
                                    fontSize: 11, fontWeight: 800, letterSpacing: '0.08em',
                                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)',
                                    background: 'rgba(0,0,0,0.18)', padding: '6px 14px',
                                    borderRadius: 999, border: '1px solid rgba(255,255,255,0.25)',
                                  }}>
                                    {category}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div style={{ padding: '20px 22px 18px', display: 'flex', flexDirection: 'column', flex: 1, gap: 10 }}>
                              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: PRIMARY_LIGHT, background: 'rgba(77,134,245,0.10)', border: '1px solid rgba(77,134,245,0.22)', padding: '4px 10px', borderRadius: 999, width: 'fit-content' }}>
                                {category}
                              </span>
                              <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--fg)', lineHeight: 1.45, letterSpacing: '-0.02em', margin: 0 }}>
                                {title}
                              </h3>
                              <p style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.75, flex: 1, margin: 0 }}>
                                {summary}
                              </p>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: 13, marginTop: 4 }}>
                                <span style={{ fontSize: 12, color: 'var(--fg-3)', fontWeight: 600 }}>{date}</span>
                                <Link href={`/case-study/${slug}`}
                                  style={{ fontSize: 12, fontWeight: 700, color: PRIMARY_LIGHT, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
                                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = PRIMARY; }}
                                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = PRIMARY_LIGHT; }}
                                >
                                  Read Case Study <ArrowRight size={11} strokeWidth={2.5} />
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.2 }}
                          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 52, flexWrap: 'wrap' }}>
                          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}
                            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 10, fontSize: 13, fontWeight: 700, background: page <= 1 ? 'var(--bg)' : PRIMARY, color: page <= 1 ? 'var(--fg-3)' : '#fff', border: `1px solid ${page <= 1 ? 'var(--border)' : 'transparent'}`, cursor: page <= 1 ? 'not-allowed' : 'pointer', opacity: page <= 1 ? 0.5 : 1, fontFamily: 'inherit' }}>
                            <ChevronLeft size={15} strokeWidth={2} /> Previous
                          </button>
                          <div style={{ display: 'flex', gap: 4 }}>
                            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                              let p: number;
                              if (totalPages <= 7) p = i + 1;
                              else if (page <= 4) { p = i + 1; if (i === 6) p = totalPages; }
                              else if (page >= totalPages - 3) p = totalPages - 6 + i;
                              else { if (i === 0) p = 1; else if (i === 6) p = totalPages; else p = page - 2 + i; }
                              const isCurrent = p === page;
                              return (
                                <button key={`${p}-${i}`} onClick={() => setPage(p)}
                                  style={{ width: 36, height: 36, borderRadius: 8, fontSize: 13, fontWeight: isCurrent ? 800 : 600, background: isCurrent ? PRIMARY : 'var(--bg)', color: isCurrent ? '#fff' : 'var(--fg-2)', border: `1px solid ${isCurrent ? 'transparent' : 'var(--border)'}`, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}>
                                  {p}
                                </button>
                              );
                            })}
                          </div>
                          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages}
                            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 10, fontSize: 13, fontWeight: 700, background: page >= totalPages ? 'var(--bg)' : PRIMARY, color: page >= totalPages ? 'var(--fg-3)' : '#fff', border: `1px solid ${page >= totalPages ? 'var(--border)' : 'transparent'}`, cursor: page >= totalPages ? 'not-allowed' : 'pointer', opacity: page >= totalPages ? 0.5 : 1, fontFamily: 'inherit' }}>
                            Next <ChevronRight size={15} strokeWidth={2} />
                          </button>
                        </motion.div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="glass" style={{ maxWidth: 720, margin: '0 auto', padding: '64px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div className="blob" style={{ width: 340, height: 340, top: '-80px', right: '-60px', background: 'radial-gradient(circle, rgba(26,86,219,0.15), transparent 65%)' }} />
            <div className="section-badge" style={{ display: 'inline-flex', marginBottom: 20, position: 'relative', zIndex: 1 }}>Start Your Project</div>
            <h2 style={{ fontSize: 'clamp(24px,3.5vw,40px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--fg)', marginBottom: 16, lineHeight: 1.15, position: 'relative', zIndex: 1 }}>
              Ready to become our next <span className="grad">success story?</span>
            </h2>
            <p style={{ fontSize: 15, color: 'var(--fg-3)', lineHeight: 1.75, maxWidth: 460, margin: '0 auto 32px', position: 'relative', zIndex: 1 }}>
              Tell us about your challenge. We&apos;ll map out a clear, practical path to results.
            </p>
            <Link href="/contact-us"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: PRIMARY, color: '#fff', fontSize: 14, fontWeight: 700, borderRadius: 12, padding: '14px 28px', textDecoration: 'none', boxShadow: '0 6px 22px rgba(26,86,219,0.32)', transition: 'background 0.2s, transform 0.2s', position: 'relative', zIndex: 1 }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0E2E75'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = PRIMARY; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
              Let&apos;s Talk <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media(max-width:1100px){ .cs-layout{grid-template-columns:1fr!important} .cs-sidebar{display:none!important} .cs-sidebar.mobile-open{display:block!important} .mobile-filter-toggle{display:flex!important} .cs-grid{grid-template-columns:repeat(2,1fr)!important} }
        @media(max-width:640px){ .cs-grid{grid-template-columns:1fr!important} }
      `}</style>
    </>
  );
}
