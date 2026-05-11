'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import { GradientBars } from '@/components/ui/gradient-bar-hero-section';

/* ── line-reveal variant (each heading line slides up from behind a clip mask) */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const lineReveal = {
  hidden: { y: '115%' },
  visible: { y: '0%', transition: { duration: 0.82, ease: EASE } },
};
const stagger = { visible: { transition: { staggerChildren: 0.11 } } };
const FV = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } };

const PARTNERS: Array<{ name: string; lightSrc: string; darkSrc: string; medium?: boolean }> = [
  {
    name: 'Google Cloud',
    lightSrc: '/images/Google Cloud Light Theme Logo.png',
    darkSrc:  '/images/Google Cloud Dark Theme Logo.png',
  },
  {
    name: 'Microsoft',
    lightSrc: '/images/Microsoft Solutions Light Theme Logo.png',
    darkSrc:  '/images/Microsoft Google Cloud Dark Theme Logo.png',
  },
  {
    name: 'AWS',
    lightSrc: '/images/AWS Light Theme Logo.png',
    darkSrc:  '/images/AWS Dark Theme Logo.png',
    medium: true,
  },
  {
    name: 'Salesforce',
    lightSrc: '/images/Salesforce ISV Partner Light Theme Logo.png',
    darkSrc:  '/images/Salesforce Google Cloud Dark Theme Logo.png',
  },
  {
    name: 'Zoho',
    lightSrc: '/images/Zoho Authorized Light Theme Logo.png',
    darkSrc:  '/images/Zoho Google Cloud Dark Theme Logo.png',
  },
];
const TICKER = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];

export default function HeroSection() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  /* ── cursor-follow spring glow ── */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const glowX = useSpring(rawX, { stiffness: 55, damping: 22 });
  const glowY = useSpring(rawY, { stiffness: 55, damping: 22 });

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set(e.clientX - r.left);
    rawY.set(e.clientY - r.top);
  };

  const pause  = () => { if (tickerRef.current) tickerRef.current.style.animationPlayState = 'paused'; };
  const resume = () => { if (tickerRef.current) tickerRef.current.style.animationPlayState = 'running'; };

  return (
    <>
      <style>{`
        @keyframes pulseDot {
          0%,100%{opacity:1;transform:scale(1)}
          50%{opacity:0.5;transform:scale(1.45)}
        }
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .dark .hero-section { background: #0A0D14 !important; }
        .hero-trusted-wrap  { background: transparent; }
        .dark .hero-trusted-wrap {
          background: linear-gradient(to top, rgba(10,13,20,0.97) 0%, rgba(10,13,20,0.72) 55%, transparent 100%);
        }
        /* No background in any theme — just the logos floating */
        .hero-ticker-item {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
        /* Logo theme switching handled in globals.css */
        @media(max-width:768px){
          .hero-h1 { font-size: clamp(28px,7.8vw,46px) !important; letter-spacing:-0.03em !important; }
          .hero-cta-row { flex-direction:column !important; align-items:center !important; gap:10px !important; }
          .hero-cta-link { width:100% !important; max-width:300px !important; justify-content:center !important; }
          .hero-sub { font-size:14px !important; padding:0 8px; }
          .hero-badge { font-size:10px !important; padding:5px 12px !important; }
          .hero-trusted-label { font-size:9px !important; }
          .hero-ticker-logo-lg { height:44px !important; }
          .hero-ticker-logo-md { height:36px !important; }
          .hero-ticker-item { padding:0 10px !important; min-width:unset !important; }
        }
        @media(max-width:480px){
          .hero-h1 { font-size: clamp(24px,8.5vw,34px) !important; }
          .hero-ticker-logo-lg { height:36px !important; }
          .hero-ticker-logo-md { height:30px !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="hero-section"
        onMouseMove={onMouseMove}
        style={{
          position: 'relative', minHeight: '100vh', overflow: 'hidden',
          background: 'var(--bg)',
          display: 'flex', flexDirection: 'column',
        }}
      >
        {/* ── gradient bar bg ── */}
        <GradientBars />

        {/* ── cursor-follow glow spotlight ── */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: 300, height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(26,86,219,0.20) 0%, rgba(77,134,245,0.08) 45%, transparent 72%)',
            x: glowX, y: glowY,
            translateX: '-50%', translateY: '-50%',
            pointerEvents: 'none', zIndex: 1,
          }}
        />

        <NoiseOverlay />

        {/* ── centred hero content ── */}
        <div style={{
          flex: 1, position: 'relative', zIndex: 3,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center',
          padding: 'clamp(108px,13vh,150px) 24px clamp(60px,8vh,100px)',
        }}>
          <motion.div
            variants={stagger} initial="hidden" animate={mounted ? 'visible' : 'hidden'}
            style={{ maxWidth: 1000, width: '100%' }}
          >
            {/* Badge */}
            <motion.div variants={FV} transition={{ duration: 0.5 }}>
              <span className="hero-badge" style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                color: '#4D86F5', background: 'rgba(26,86,219,0.12)',
                border: '1px solid rgba(77,134,245,0.28)',
                padding: '6px 16px', borderRadius: 999, marginBottom: 32,
              }}>
                AI-Native Digital Operations
              </span>
            </motion.div>

            {/* ── 3-line heading — each line clip-reveals upward ── */}
            <motion.h1
              className="hero-h1"
              variants={stagger}
              style={{
                fontSize: 'clamp(34px,5.2vw,70px)',
                fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.09,
                color: 'var(--fg)', marginBottom: 32,
              }}
            >
              <span className="hero-line-wrap">
                <motion.span variants={lineReveal} style={{ display: 'block' }}>Build AI-Powered</motion.span>
              </span>
              <span className="hero-line-wrap">
                <motion.span variants={lineReveal} style={{ display: 'block' }}>Digital Operations</motion.span>
              </span>
              <span className="hero-line-wrap">
                <motion.span variants={lineReveal} className="hero-grad-text" style={{ display: 'block' }}>That Scale.</motion.span>
              </span>
            </motion.h1>

            {/* Sub line */}
            <motion.p
              className="hero-sub"
              variants={FV} transition={{ duration: 0.6 }}
              style={{
                fontSize: 'clamp(15px,1.1vw,18px)', color: 'var(--fg-3)', lineHeight: 1.75,
                marginBottom: 38, maxWidth: 720, margin: '0 auto 38px',
              }}
            >
              We help businesses build AI-powered products, automate operations, and launch scalable digital platforms — faster than traditional software companies.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="hero-cta-row"
              variants={FV} transition={{ duration: 0.55 }}
              style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <Link href="/solutions" className="hero-cta-link" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#1A56DB', color: '#fff',
                fontSize: 13, fontWeight: 700, borderRadius: 10,
                padding: '13px 26px', textDecoration: 'none',
                boxShadow: '0 4px 24px rgba(26,86,219,0.44)',
                transition: 'background 0.2s, transform 0.18s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0E2E75'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1A56DB'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}>
                Explore Our Solutions <ArrowRight size={14} strokeWidth={2} />
              </Link>

              <Link href="/case-studies" className="hero-cta-link glass" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 13, fontWeight: 600, borderRadius: 10,
                padding: '13px 26px', textDecoration: 'none',
                color: 'var(--fg-2)',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#4D86F5'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--fg-2)'; }}>
                View Case Studies <ChevronRight size={14} strokeWidth={2} />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Trusted by — logo pill strip ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={mounted ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="hero-trusted-wrap"
          style={{ paddingBottom: 14 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '0 24px', marginBottom: 12 }}>
            <span className="hero-trusted-label" style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-3)', whiteSpace: 'nowrap' }}>
              Trusted by
            </span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          <div style={{
            overflow: 'hidden',
            maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          }}>
            <div
              ref={tickerRef}
              onMouseEnter={pause}
              onMouseLeave={resume}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                width: 'max-content',
                animation: 'ticker 36s linear infinite',
                padding: '4px 0',
              }}
            >
              {TICKER.map((p, i) => (
                <div key={i} className="hero-ticker-item" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: p.medium ? '8px 20px' : '8px 26px',
                  flexShrink: 0,
                  minWidth: p.medium ? 150 : 170,
                }}>
                  <img
                    src={p.lightSrc} alt={p.name}
                    className={`logo-light ${p.medium ? 'hero-ticker-logo-md' : 'hero-ticker-logo-lg'}`}
                    style={{ height: p.medium ? 80 : 108, maxWidth: 260, width: 'auto', objectFit: 'contain' }}
                  />
                  <img
                    src={p.darkSrc} alt={p.name}
                    className={`logo-dark ${p.medium ? 'hero-ticker-logo-md' : 'hero-ticker-logo-lg'}`}
                    style={{ height: p.medium ? 80 : 108, maxWidth: 260, width: 'auto', objectFit: 'contain' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
