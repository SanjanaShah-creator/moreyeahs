'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Heart, ShoppingCart, Building2, Landmark, Globe2,
  Users, GraduationCap, Factory, CreditCard, ChevronDown,
} from 'lucide-react';
import Link from 'next/link';
import NoiseOverlay from '@/components/ui/NoiseOverlay';

const INDUSTRIES = [
  {
    Icon: Heart, slug: 'healthcare', label: 'Healthcare',
    points: ['Predictive patient analytics', 'Clinical decision support', 'AI diagnostics'],
    video: '/videos/Healthcare Industry.mp4',
  },
  {
    Icon: ShoppingCart, slug: 'ecommerce', label: 'E-Commerce',
    points: ['Personalized recommendations', 'Demand forecasting', 'Behaviour analytics'],
    video: '/videos/E-Commerce Industry.mp4',
  },
  {
    Icon: Building2, slug: 'real-estate', label: 'Real Estate',
    points: ['Property data intelligence', 'Automated workflows', 'Market trend analysis'],
    video: '/videos/Real E-State Industry.mp4',
  },
  {
    Icon: Landmark, slug: 'bfsi', label: 'BFSI',
    points: ['Risk & fraud detection', 'Customer intelligence', 'Process automation'],
    video: '/videos/BFSI Industry.mp4',
  },
  {
    Icon: Globe2, slug: 'public-sector', label: 'Public Sector',
    points: ['Digital citizen services', 'ERP modernization', 'Data governance'],
    video: '/videos/Public Sector Industry.mp4',
  },
  {
    Icon: Users, slug: 'non-profit', label: 'Non-Profit',
    points: ['Donor management platforms', 'Impact tracking', 'Community engagement'],
    video: '/videos/Non-Profit Sector Industry.mp4',
  },
  {
    Icon: GraduationCap, slug: 'edtech', label: 'EdTech',
    points: ['Adaptive learning systems', 'Student performance analytics', 'Secure platforms'],
    video: '/videos/Ed Tech Industry.mp4',
  },
  {
    Icon: Factory, slug: 'manufacturing', label: 'Manufacturing',
    points: ['Predictive maintenance', 'Supply chain intelligence', 'Process optimization'],
    video: '/videos/Manufacturing Industry.mp4',
  },
  {
    Icon: CreditCard, slug: 'fintech', label: 'Fintech',
    points: ['Smart payment automation', 'Risk & fraud detection', 'Real-time insights'],
    video: '/videos/Fintech Industry.mp4',
  },
];

const n = INDUSTRIES.length;

// Preload a video by fetching a small range so the browser caches it
function preloadVideo(src: string) {
  const video = document.createElement('video');
  video.preload = 'auto';
  video.muted = true;
  video.src = src;
  video.load();
}

export default function IndustriesSection() {
  const [active, setActive] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const preloadedRef = useRef<Set<string>>(new Set());

  // Only activate scroll tracking when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Preload next/prev videos when active changes
  useEffect(() => {
    if (!isVisible) return;
    const toPreload = [
      INDUSTRIES[(active + 1) % n].video,
      INDUSTRIES[(active - 1 + n) % n].video,
    ];
    toPreload.forEach(src => {
      if (!preloadedRef.current.has(src)) {
        preloadedRef.current.add(src);
        preloadVideo(src);
      }
    });
  }, [active, isVisible]);

  const handleScroll = useCallback(() => {
    if (!containerRef.current || !isVisible) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrolled = -rect.top;
    if (scrolled < 0) return;
    const usableHeight = containerRef.current.offsetHeight - window.innerHeight;
    if (usableHeight <= 0) return;
    const sectionH = usableHeight / n;
    const idx = Math.min(Math.floor(scrolled / sectionH), n - 1);
    if (idx >= 0) setActive(idx);
  }, [isVisible]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Play video without forcing a full reload
  const playVideo = useCallback((ref: React.RefObject<HTMLVideoElement | null>, src: string) => {
    const el = ref.current;
    if (!el) return;
    if (el.src !== window.location.origin + src && el.getAttribute('src') !== src) {
      el.src = src;
    }
    el.play().catch(() => {});
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const src = INDUSTRIES[active].video;
    playVideo(desktopVideoRef, src);
    playVideo(mobileVideoRef, src);
  }, [active, isVisible, playVideo]);

  const ind = INDUSTRIES[active];

  const InfoCard = (
    <AnimatePresence mode="wait">
      <motion.div
        key={`info-${active}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.3 }}
        className="ind-glass-card"
        style={{
          position: 'absolute', bottom: 0, right: 0,
          width: 360, zIndex: 2,
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          borderRadius: '24px 0 0 0',
          padding: '26px 28px 30px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--fg)', letterSpacing: '-0.02em' }}>
            About {ind.label}
          </div>
          <div className="ind-glass-icon-bg" style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {(() => { const I = ind.Icon; return <I size={16} color="#4D86F5" strokeWidth={1.8} />; })()}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {ind.points.map(p => (
            <div key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4D86F5', flexShrink: 0, marginTop: 5 }} />
              <span style={{ fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.55 }}>{p}</span>
            </div>
          ))}
        </div>
        <Link href={`/case-studies?industry=${ind.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#4D86F5', textDecoration: 'none', letterSpacing: '0.01em' }}>
          View Case Studies →
        </Link>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <section style={{ background: 'var(--bg-2)', position: 'relative' }}>
      <NoiseOverlay />

      <div ref={containerRef} style={{ position: 'relative', height: `${n * 30}vh`, zIndex: 2 }}>

        {/* ══ DESKTOP ══ */}
        <div className="ind-desktop-sticky" style={{ position: 'sticky', top: 0, height: '100vh', display: 'grid', gridTemplateColumns: '38% 62%', overflow: 'hidden' }}>

          <div className="ind-left-panel" style={{
            display: 'flex', flexDirection: 'column',
            padding: '88px 44px 28px',
            position: 'relative', overflow: 'hidden',
            background: 'linear-gradient(160deg, #0E2E75 0%, #1A56DB 45%, #4D86F5 100%)',
          }}>
            <div style={{ position: 'absolute', top: '25%', left: '10%', width: 340, height: 340, borderRadius: '50%', background: 'radial-gradient(circle, rgba(77,134,245,0.20) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)', marginBottom: 12 }}>
                Industries We Serve
              </div>
              <h2 style={{ fontSize: 'clamp(20px, 2.2vw, 30px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.15 }}>
                Deep Expertise<br />Across Nine Sectors
              </h2>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 0, position: 'relative', zIndex: 1 }}>
              {[-2, -1, 0, 1, 2].map(offset => {
                const idx = (active + offset + n) % n;
                const isAct = offset === 0;
                const dist = Math.abs(offset);
                return (
                  <button
                    key={`${idx}-${offset}`}
                    onClick={() => setActive(idx)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      textAlign: 'center',
                      padding: isAct ? '10px 0' : '5px 0',
                      fontFamily: 'inherit',
                      fontWeight: isAct ? 800 : 400,
                      color: '#fff',
                      letterSpacing: isAct ? '-0.02em' : '0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      width: '100%',
                      opacity: isAct ? 1 : Math.max(0.12, 0.38 - dist * 0.12),
                      fontSize: isAct ? 26 : Math.max(14, 21 - dist * 3),
                      transition: 'opacity 0.4s ease, font-size 0.4s ease',
                    }}
                  >
                    {isAct && <span style={{ width: 4, height: 26, borderRadius: 2, background: '#fff', flexShrink: 0 }} />}
                    {INDUSTRIES[idx].label}
                  </button>
                );
              })}
            </div>

            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, marginBottom: 16 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.16)',
                backdropFilter: 'blur(12px)',
                animation: 'indBounce 1.8s ease-in-out infinite',
              }}>
                <ChevronDown size={16} color="rgba(255,255,255,0.65)" strokeWidth={2} />
              </div>
            </div>
          </div>

          {/* RIGHT: single persistent video element — src swapped, no reload */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <video
              ref={desktopVideoRef}
              src={INDUSTRIES[0].video}
              autoPlay muted loop playsInline
              preload="auto"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,8,16,0.55) 0%, transparent 50%)', pointerEvents: 'none', zIndex: 1 }} />
            {InfoCard}
          </div>
        </div>

        {/* ══ MOBILE ══ */}
        <div className="ind-mobile-sticky" style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'none' }}>
          <video
            ref={mobileVideoRef}
            src={INDUSTRIES[0].video}
            autoPlay muted loop playsInline
            preload="auto"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
          />

          <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, rgba(5,8,20,0.65) 0%, rgba(5,8,20,0.22) 40%, rgba(5,8,20,0.22) 55%, rgba(5,8,20,0.80) 100%)', pointerEvents: 'none' }} />

          <div style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', flexDirection: 'column', padding: '0 20px' }}>
            <div style={{ paddingTop: 72 }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 8 }}>Industries We Serve</div>
              <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.12 }}>
                Deep Expertise<br />Across Nine Sectors
              </h2>
            </div>

            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', width: '100%' }}>
                {[-2, -1, 0, 1, 2].map(offset => {
                  const idx = (active + offset + n) % n;
                  const isAct = offset === 0;
                  const dist = Math.abs(offset);
                  return (
                    <button key={`mob-${idx}-${offset}`} onClick={() => setActive(idx)}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                        padding: isAct ? '0 18px' : '0 10px',
                        color: '#fff',
                        fontWeight: isAct ? 800 : 400,
                        opacity: isAct ? 1 : Math.max(0.12, 0.42 - dist * 0.14),
                        fontSize: isAct ? 22 : dist === 1 ? 14 : 10,
                        transition: 'opacity 0.4s ease, font-size 0.4s ease, padding 0.4s ease',
                        whiteSpace: 'nowrap', flexShrink: 0, lineHeight: 1.1,
                      }}>
                      {INDUSTRIES[idx].label}
                      {isAct && <span style={{ display: 'block', width: 28, height: 3, borderRadius: 2, background: '#4D86F5' }} />}
                    </button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={`mob-info-${active}`}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                  background: 'rgba(8,12,24,0.55)', border: '1px solid rgba(77,134,245,0.18)',
                  borderRadius: '16px 16px 0 0', padding: '18px 18px 24px', marginBottom: 0,
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(77,134,245,0.15)', border: '1px solid rgba(77,134,245,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {(() => { const I = ind.Icon; return <I size={13} color="#4D86F5" strokeWidth={1.8} />; })()}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>{ind.label}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 14 }}>
                  {ind.points.map(p => (
                    <div key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#4D86F5', flexShrink: 0, marginTop: 5 }} />
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.80)', lineHeight: 1.5 }}>{p}</span>
                    </div>
                  ))}
                </div>
                <Link href={`/case-studies?industry=${ind.slug}`} style={{ fontSize: 11, fontWeight: 700, color: '#4D86F5', textDecoration: 'none' }}>
                  View Case Studies →
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 3, display: 'flex', gap: 5 }}>
            {INDUSTRIES.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? 16 : 5, height: 5, borderRadius: 3, background: i === active ? '#4D86F5' : 'rgba(255,255,255,0.30)', border: 'none', cursor: 'pointer', padding: 0, transition: 'width 0.35s ease', flexShrink: 0 }} />
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes indBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }
        .ind-desktop-sticky { display: grid !important; }
        .ind-mobile-sticky  { display: none !important; }
        @media(max-width:768px){
          .ind-desktop-sticky { display: none !important; }
          .ind-mobile-sticky  { display: block !important; }
        }
      `}</style>
    </section>
  );
}
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrolled = -rect.top;
      if (scrolled < 0) return;
      const usableHeight = containerRef.current.offsetHeight - window.innerHeight;
      if (usableHeight <= 0) return;
      const sectionH = usableHeight / n;
      const idx = Math.min(Math.floor(scrolled / sectionH), n - 1);
      if (idx >= 0) setActive(idx);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [active]);

  const ind = INDUSTRIES[active];

  /* shared info card used by both desktop and mobile layouts */
  const InfoCard = (
    <AnimatePresence mode="wait">
      <motion.div
        key={`info-${active}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.3 }}
        className="ind-glass-card"
        style={{
          position: 'absolute', bottom: 0, right: 0,
          width: 360, zIndex: 2,
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          borderRadius: '24px 0 0 0',
          padding: '26px 28px 30px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--fg)', letterSpacing: '-0.02em' }}>
            About {ind.label}
          </div>
          <div className="ind-glass-icon-bg" style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {(() => { const I = ind.Icon; return <I size={16} color="#4D86F5" strokeWidth={1.8} />; })()}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {ind.points.map(p => (
            <div key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4D86F5', flexShrink: 0, marginTop: 5 }} />
              <span style={{ fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.55 }}>{p}</span>
            </div>
          ))}
        </div>
        <Link href={`/case-studies?industry=${ind.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#4D86F5', textDecoration: 'none', letterSpacing: '0.01em' }}>
          View Case Studies →
        </Link>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <section style={{ background: 'var(--bg-2)', position: 'relative' }}>
      <NoiseOverlay />

      <div ref={containerRef} style={{ position: 'relative', height: `${n * 30}vh`, zIndex: 2 }}>

        {/* ══════════════════════════════════════════════════════════
            DESKTOP LAYOUT (>768px): Original 38% left + 62% right
            ══════════════════════════════════════════════════════════ */}
        <div className="ind-desktop-sticky" style={{ position: 'sticky', top: 0, height: '100vh', display: 'grid', gridTemplateColumns: '38% 62%', overflow: 'hidden' }}>

          {/* ── LEFT: blue gradient panel ── */}
          <div className="ind-left-panel" style={{
            display: 'flex', flexDirection: 'column',
            padding: '88px 44px 28px',
            position: 'relative', overflow: 'hidden',
            background: 'linear-gradient(160deg, #0E2E75 0%, #1A56DB 45%, #4D86F5 100%)',
          }}>
            <div style={{ position: 'absolute', top: '25%', left: '10%', width: 340, height: 340, borderRadius: '50%', background: 'radial-gradient(circle, rgba(77,134,245,0.20) 0%, transparent 70%)', pointerEvents: 'none' }} />

            {/* Top: label + heading */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)', marginBottom: 12 }}>
                Industries We Serve
              </div>
              <h2 style={{ fontSize: 'clamp(20px, 2.2vw, 30px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.15 }}>
                Deep Expertise<br />Across Nine Sectors
              </h2>
            </div>

            {/* Center: vertical industry picker */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 0, position: 'relative', zIndex: 1 }}>
              {[-2, -1, 0, 1, 2].map(offset => {
                const idx = (active + offset + n) % n;
                const isActive = offset === 0;
                const dist = Math.abs(offset);
                return (
                  <button
                    key={`${idx}-${offset}`}
                    onClick={() => setActive(idx)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      textAlign: 'center',
                      padding: isActive ? '10px 0' : '5px 0',
                      fontFamily: 'inherit',
                      fontWeight: isActive ? 800 : 400,
                      color: '#fff',
                      letterSpacing: isActive ? '-0.02em' : '0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      width: '100%',
                      opacity: isActive ? 1 : Math.max(0.12, 0.38 - dist * 0.12),
                      fontSize: isActive ? 26 : Math.max(14, 21 - dist * 3),
                      transition: 'opacity 0.4s ease, font-size 0.4s ease',
                    }}
                  >
                    {isActive && (
                      <span style={{ width: 4, height: 26, borderRadius: 2, background: '#fff', flexShrink: 0 }} />
                    )}
                    {INDUSTRIES[idx].label}
                  </button>
                );
              })}
            </div>

            {/* Scroll hint */}
            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, marginBottom: 16 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.16)',
                backdropFilter: 'blur(12px)',
                animation: 'indBounce 1.8s ease-in-out infinite',
              }}>
                <ChevronDown size={16} color="rgba(255,255,255,0.65)" strokeWidth={2} />
              </div>
            </div>
          </div>

          {/* ── RIGHT: full-coverage video ── */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              <motion.video
                key={ind.slug}
                ref={videoRef}
                src={ind.video}
                autoPlay muted loop playsInline
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </AnimatePresence>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,8,16,0.55) 0%, transparent 50%)', pointerEvents: 'none', zIndex: 1 }} />
            {InfoCard}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            MOBILE LAYOUT (≤768px): Full-bleed video + horizontal
            ══════════════════════════════════════════════════════════ */}
        <div className="ind-mobile-sticky" style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'none' }}>

          {/* Full-bleed video */}
          <AnimatePresence mode="wait">
            <motion.video
              key={`mob-${ind.slug}`}
              src={ind.video}
              autoPlay muted loop playsInline
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
            />
          </AnimatePresence>

          {/* Gradient overlays */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, rgba(5,8,20,0.65) 0%, rgba(5,8,20,0.22) 40%, rgba(5,8,20,0.22) 55%, rgba(5,8,20,0.80) 100%)', pointerEvents: 'none' }} />

          {/* Content overlay */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', flexDirection: 'column', padding: '0 20px' }}>

            {/* Top: label + heading */}
            <div style={{ paddingTop: 72 }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 8 }}>Industries We Serve</div>
              <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.12 }}>
                Deep Expertise<br />Across Nine Sectors
              </h2>
            </div>

            {/* Center: horizontal industry strip */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', width: '100%' }}>
                {[-2, -1, 0, 1, 2].map(offset => {
                  const idx = (active + offset + n) % n;
                  const isActive = offset === 0;
                  const dist = Math.abs(offset);
                  return (
                    <button key={`mob-${idx}-${offset}`} onClick={() => setActive(idx)}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                        padding: isActive ? '0 18px' : '0 10px',
                        color: '#fff',
                        fontWeight: isActive ? 800 : 400,
                        opacity: isActive ? 1 : Math.max(0.12, 0.42 - dist * 0.14),
                        fontSize: isActive ? 22 : dist === 1 ? 14 : 10,
                        transition: 'opacity 0.4s ease, font-size 0.4s ease, padding 0.4s ease',
                        whiteSpace: 'nowrap', flexShrink: 0, lineHeight: 1.1,
                      }}>
                      {INDUSTRIES[idx].label}
                      {isActive && <span style={{ display: 'block', width: 28, height: 3, borderRadius: 2, background: '#4D86F5' }} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom: minimal info card */}
            <AnimatePresence mode="wait">
              <motion.div key={`mob-info-${active}`}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                  background: 'rgba(8,12,24,0.55)', border: '1px solid rgba(77,134,245,0.18)',
                  borderRadius: '16px 16px 0 0', padding: '18px 18px 24px', marginBottom: 0,
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(77,134,245,0.15)', border: '1px solid rgba(77,134,245,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {(() => { const I = ind.Icon; return <I size={13} color="#4D86F5" strokeWidth={1.8} />; })()}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>{ind.label}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 14 }}>
                  {ind.points.map(p => (
                    <div key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#4D86F5', flexShrink: 0, marginTop: 5 }} />
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.80)', lineHeight: 1.5 }}>{p}</span>
                    </div>
                  ))}
                </div>
                <Link href={`/case-studies?industry=${ind.slug}`} style={{ fontSize: 11, fontWeight: 700, color: '#4D86F5', textDecoration: 'none' }}>
                  View Case Studies →
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 3, display: 'flex', gap: 5 }}>
            {INDUSTRIES.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? 16 : 5, height: 5, borderRadius: 3, background: i === active ? '#4D86F5' : 'rgba(255,255,255,0.30)', border: 'none', cursor: 'pointer', padding: 0, transition: 'width 0.35s ease', flexShrink: 0 }} />
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes indBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }
        /* Desktop shows desktop sticky, mobile hidden */
        .ind-desktop-sticky { display: grid !important; }
        .ind-mobile-sticky  { display: none !important; }
        @media(max-width:768px){
          .ind-desktop-sticky { display: none !important; }
          .ind-mobile-sticky  { display: block !important; }
        }
      `}</style>
    </section>
  );
}
