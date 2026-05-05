'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, ArrowLeft, ChevronRight, Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import { GridBeam } from '@/components/ui/background-grid-beam';
import { EXPO, FU, FL, FR, SC, STAGGER } from '@/lib/anim';
import {
  fetchCaseStudies, type CaseStudy as WPCaseStudy,
  stripHtmlTags, truncateText, formatDate, getCoverImage, getLocalCaseStudyImage,
} from '@/lib/wordpress-api';

/* ── Brand-consistent blue palette (all service pages use blue only) ── */
const BLUE = '#4D86F5';
const BLUE_LIGHT = 'rgba(77,134,245,0.08)';

/* ── Solution → Services map for the switcher nav ─────────────────── */
const SOLUTION_SERVICES: Record<string, Array<{ name: string; href: string }>> = {
  '/solutions/data-science': [
    { name: 'AI & ML Engineering',     href: '/solutions/data-science/ai-ml' },
    { name: 'Computer Vision',          href: '/solutions/data-science/computer-vision' },
    { name: 'Data Infrastructure',      href: '/solutions/data-science/data-infrastructure' },
    { name: 'IoT & Connected Systems',  href: '/solutions/data-science/iot-connected-systems' },
  ],
  '/solutions/cloud-infrastructure': [
    { name: 'Cloud Platform Setup', href: '/solutions/cloud-infrastructure/cloud-platform-setup' },
    { name: 'DevOps & Automation',  href: '/solutions/cloud-infrastructure/devops-automation' },
  ],
  '/solutions/microsoft-services': [
    { name: 'Azure Solutions',        href: '/solutions/microsoft-services/azure' },
    { name: 'CRM & ERP',             href: '/solutions/microsoft-services/crm-erp' },
    { name: 'SharePoint & Intranet', href: '/solutions/microsoft-services/sharepoint' },
    { name: 'Automation & Analytics',href: '/solutions/microsoft-services/automation-analytics' },
  ],
  '/solutions/salesforce-services': [
    { name: 'Implementation',    href: '/solutions/salesforce-services/implementation' },
    { name: 'Managed Services',  href: '/solutions/salesforce-services/managed-services' },
  ],
  '/solutions/web-app-development': [
    { name: 'Web Application',   href: '/solutions/web-app-development/web-application' },
    { name: 'Mobile App',        href: '/solutions/web-app-development/mobile-app' },
    { name: 'Design & Quality',  href: '/solutions/web-app-development/design-quality' },
  ],
};

export type CapabilityItem = {
  title: string;
  desc: string;
  Icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  tag?: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  desc: string;
};

export type CaseStudy = {
  industry: string;
  company: string;
  outcome: string;
  metrics: Array<{ value: string; label: string }>;
  accent: string;
};

export type FAQItem = {
  q: string;
  a: string;
};

export type ServicePageData = {
  solution: string;
  solutionHref: string;
  name: string;
  tagline: string;
  heroDesc: string;
  stats: Array<{ value: string; label: string }>;
  problemQuote: string;
  problemPoints: string[];
  capabilities: CapabilityItem[];
  process: ProcessStep[];
  caseStudies: CaseStudy[];
  faq: FAQItem[];
  accent: string;      /* kept for compatibility — not used for UI colour */
  accentLight: string; /* kept for compatibility — not used for UI colour */
};

/* ── SiblingServiceTabs — inline tabs rendered inside hero ─────────────── */
function SiblingServiceTabs({ solutionHref, centered }: { solutionHref: string; centered?: boolean }) {
  const pathname = usePathname();
  const services = SOLUTION_SERVICES[solutionHref];
  if (!services || services.length < 2) return null;
  return (
    <div
      className="svc-sibling-tabs"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 4,
        marginBottom: 20,
        justifyContent: centered ? 'center' : 'flex-start',
      }}
    >
      {services.map((svc) => {
        const isActive = pathname === svc.href;
        return (
          <Link
            key={svc.href}
            href={svc.href}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '5px 13px',
              borderRadius: 7,
              whiteSpace: 'nowrap',
              fontSize: 12,
              fontWeight: isActive ? 700 : 500,
              color: isActive ? BLUE : 'var(--fg-3)',
              background: isActive ? BLUE_LIGHT : 'transparent',
              border: isActive ? `1px solid ${BLUE}30` : `1px solid ${BLUE}15`,
              textDecoration: 'none',
              transition: 'all 0.18s',
            }}
            onMouseEnter={e => {
              if (!isActive) {
                (e.currentTarget as HTMLElement).style.color = BLUE;
                (e.currentTarget as HTMLElement).style.borderColor = `${BLUE}35`;
              }
            }}
            onMouseLeave={e => {
              if (!isActive) {
                (e.currentTarget as HTMLElement).style.color = 'var(--fg-3)';
                (e.currentTarget as HTMLElement).style.borderColor = `${BLUE}15`;
              }
            }}
          >
            {svc.name}
          </Link>
        );
      })}
    </div>
  );
}

/* ── ServiceSwitcherSection — grid of all services in this solution ── */
function ServiceSwitcherSection({ solutionHref, solutionName }: { solutionHref: string; solutionName: string }) {
  const pathname = usePathname();
  const services = SOLUTION_SERVICES[solutionHref];
  if (!services || services.length < 2) return null;
  return (
    <section style={{ background: 'var(--bg)', padding: '60px 0', position: 'relative' }}>
      <NoiseOverlay />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div className="section-badge" style={{ justifyContent: 'center', marginBottom: 14 }}>Explore More</div>
          <h3 style={{ fontSize: 'clamp(22px,2.8vw,34px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--fg)', lineHeight: 1.15 }}>
            Other <span className="grad">{solutionName}</span> Services
          </h3>
        </div>
        <div className="svc-switcher-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(services.length, 4)}, 1fr)`, gap: 14 }}>
          {services.map((svc) => {
            const isActive = pathname === svc.href;
            return (
              <Link
                key={svc.href}
                href={svc.href}
                style={{
                  display: 'flex', flexDirection: 'column', gap: 10,
                  padding: '22px 22px',
                  borderRadius: 16,
                  background: isActive ? `${BLUE}0E` : 'var(--card-bg)',
                  border: isActive ? `1px solid ${BLUE}45` : '1px solid var(--card-border)',
                  backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
                  boxShadow: isActive ? `0 4px 20px ${BLUE}12` : 'none',
                  cursor: isActive ? 'default' : 'pointer',
                  position: 'relative', overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.borderColor = `${BLUE}40`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 28px ${BLUE}10`;
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--card-border)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }
                }}
              >
                {isActive && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                    background: `linear-gradient(90deg, ${BLUE}, ${BLUE}80)`,
                    borderRadius: '16px 16px 0 0',
                  }} />
                )}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{
                    fontSize: 14, fontWeight: 700,
                    color: isActive ? BLUE : 'var(--fg)',
                    lineHeight: 1.3,
                  }}>
                    {svc.name}
                  </span>
                  {!isActive && (
                    <ArrowRight size={13} color={BLUE} strokeWidth={2} style={{ flexShrink: 0, opacity: 0.5 }} />
                  )}
                </div>
                {isActive && (
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase',
                    color: BLUE, background: `${BLUE}12`, border: `1px solid ${BLUE}25`,
                    padding: '3px 8px', borderRadius: 999, display: 'inline-block', width: 'fit-content',
                  }}>
                    Current
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
      <style>{`
        @media(max-width:640px){ .svc-switcher-grid{ grid-template-columns: 1fr 1fr !important; } }
        @media(max-width:380px){ .svc-switcher-grid{ grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ── TiltCard ──────────────────────────────────────────────────────────── */
function TiltCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateZ(2px)`;
    el.style.boxShadow = `0 16px 48px rgba(77,134,245,0.14)`;
  };
  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
    ref.current.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
  };
  return (
    <div
      ref={ref}
      style={{ transition: 'transform 0.24s ease, box-shadow 0.24s ease', willChange: 'transform', ...style }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}

/* ── FAQAccordion ──────────────────────────────────────────────────────── */
function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <motion.div
      variants={STAGGER(0.07)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
    >
      {items.map((item, i) => (
        <motion.div
          key={i}
          variants={FR(0)}
          style={{
            borderRadius: 16,
            overflow: 'hidden',
            border: `1px solid ${open === i ? `${BLUE}30` : 'var(--border)'}`,
            background: 'var(--card-bg)',
            transition: 'border-color 0.2s',
          }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%',
              background: open === i ? `${BLUE}05` : 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              padding: '18px 22px',
              fontFamily: 'inherit',
              textAlign: 'left',
              gap: 12,
              transition: 'background 0.2s',
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg)', lineHeight: 1.45 }}>
              {item.q}
            </span>
            <motion.div
              animate={{ rotate: open === i ? 45 : 0 }}
              transition={{ duration: 0.28, ease: EXPO }}
              style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                border: `1px solid ${open === i ? BLUE : `${BLUE}28`}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: 2,
                background: open === i ? BLUE : `${BLUE}0e`,
                transition: 'background 0.2s, border-color 0.2s',
              }}
            >
              <Plus size={12} color={open === i ? '#fff' : BLUE} strokeWidth={2.5} />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: EXPO }}
                style={{ overflow: 'hidden' }}
              >
                <div
                  style={{
                    padding: '0 22px 20px 22px',
                    borderTop: `1px solid ${BLUE}18`,
                    background: `${BLUE}06`,
                  }}
                >
                  <p style={{ fontSize: 14, color: 'var(--fg-3)', lineHeight: 1.78, paddingTop: 16 }}>
                    {item.a}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ── ProcessSection — left step list + right content, auto-advances ──────── */
const STEP_DELAY = 4500;

function ProcessSection({ steps }: { steps: ProcessStep[] }) {
  const [active, setActive]   = useState(0);
  const [timerKey, setTimerKey] = useState(0); // bumped on manual click to restart interval
  const sectionRef = useRef<HTMLDivElement>(null);

  /* Reset to step 0 whenever the section scrolls into view */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(0);
          setTimerKey(k => k + 1);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Auto-advance: loops back to step 0 after the last step */
  useEffect(() => {
    const id = setInterval(() => {
      setActive(a => (a + 1 >= steps.length ? 0 : a + 1));
    }, STEP_DELAY);
    return () => clearInterval(id);
  }, [timerKey, steps.length]);

  const go = (i: number) => {
    setActive(i);
    setTimerKey(k => k + 1); // reset countdown from this step
  };

  return (
    <div ref={sectionRef} className="process-grid" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20, alignItems: 'start' }}>

      {/* ── Left: step selector ── */}
      <div style={{ position: 'sticky', top: 100, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {steps.map((step, i) => {
          const done     = i < active;
          const isActive = i === active;
          return (
            <button
              key={i}
              onClick={() => go(i)}
              style={{
                position: 'relative', overflow: 'hidden',
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '13px 16px', borderRadius: 14,
                background: isActive ? BLUE_LIGHT : 'transparent',
                border: `1px solid ${isActive ? BLUE + '30' : 'transparent'}`,
                cursor: 'pointer', textAlign: 'left',
                fontFamily: 'inherit', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = `${BLUE}06`; }}
              onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              {/* Number circle */}
              <div style={{
                width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                background: i <= active ? BLUE : 'var(--bg-2)',
                border: `2px solid ${i <= active ? BLUE : BLUE + '20'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 900, color: i <= active ? '#fff' : `${BLUE}55`,
                boxShadow: isActive ? `0 0 0 6px ${BLUE}18` : 'none',
                transition: 'all 0.3s',
              }}>
                {done ? '✓' : step.number}
              </div>
              <span style={{
                fontSize: 13, fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--fg)' : 'var(--fg-3)',
                lineHeight: 1.35, transition: 'color 0.2s',
              }}>
                {step.title}
              </span>

              {/* Timer bar — fills across active button over STEP_DELAY ms */}
              {isActive && (
                <motion.div
                  key={`timer-${timerKey}-${i}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: STEP_DELAY / 1000, ease: 'linear' }}
                  style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: 2, background: BLUE, borderRadius: '0 0 14px 14px',
                    transformOrigin: 'left',
                  }}
                />
              )}
            </button>
          );
        })}

        {/* Progress */}
        <div style={{ padding: '12px 16px 0' }}>
          <div style={{ height: 3, borderRadius: 999, background: `${BLUE}14`, overflow: 'hidden', marginBottom: 8 }}>
            <motion.div
              animate={{ width: `${((active + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5, ease: EXPO }}
              style={{ height: '100%', background: BLUE, borderRadius: 999 }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, color: 'var(--fg-3)' }}>Step {active + 1} of {steps.length}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: BLUE }}>{Math.round(((active + 1) / steps.length) * 100)}%</span>
          </div>
        </div>
      </div>

      {/* ── Right: content panel ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 24, filter: 'blur(6px)' }}
          animate={{ opacity: 1, x: 0,  filter: 'blur(0px)' }}
          exit={  { opacity: 0, x: -16, filter: 'blur(4px)' }}
          transition={{ duration: 0.38, ease: EXPO }}
          style={{
            borderRadius: 24,
            background: 'var(--card-bg)',
            border: `1px solid ${BLUE}22`,
            position: 'relative', overflow: 'hidden',
            boxShadow: `0 20px 60px ${BLUE}0c`,
            minHeight: 320,
          }}
        >
          {/* Ambient top bar */}
          <div style={{ height: 3, background: `linear-gradient(90deg, ${BLUE}, ${BLUE}55)`, borderRadius: '24px 24px 0 0' }} />

          <div style={{ padding: 'clamp(28px,3.5vw,48px)' }}>
            {/* Watermark */}
            <div style={{
              position: 'absolute', right: -12, bottom: -44,
              fontSize: 200, fontWeight: 900, lineHeight: 1,
              color: `${BLUE}05`, pointerEvents: 'none', userSelect: 'none',
              letterSpacing: '-0.07em',
            }}>
              {steps[active]?.number}
            </div>

            {/* Corner glow */}
            <div style={{
              position: 'absolute', top: -60, right: -60, width: 260, height: 260,
              background: `radial-gradient(circle, ${BLUE_LIGHT}, transparent 65%)`,
              opacity: 0.7, pointerEvents: 'none',
            }} />

            {/* Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22, position: 'relative', zIndex: 1 }}>
              <motion.span
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.2, repeat: Infinity }}
                style={{ width: 7, height: 7, borderRadius: '50%', background: BLUE, display: 'inline-block' }}
              />
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: BLUE }}>
                Step {steps[active]?.number} of {steps.length}
              </span>
            </div>

            {/* Title */}
            <h3 style={{
              fontSize: 'clamp(24px,2.8vw,38px)', fontWeight: 800,
              color: 'var(--fg)', letterSpacing: '-0.03em', lineHeight: 1.12,
              marginBottom: 18, position: 'relative', zIndex: 1,
            }}>
              {steps[active]?.title}
            </h3>

            {/* Description */}
            <p style={{
              fontSize: 15, color: 'var(--fg-3)', lineHeight: 1.85,
              position: 'relative', zIndex: 1, maxWidth: 540, marginBottom: 36,
            }}>
              {steps[active]?.desc}
            </p>

            {/* Prev / Next */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative', zIndex: 1 }}>
              <button
                onClick={() => setActive(a => Math.max(0, a - 1))}
                disabled={active === 0}
                style={{
                  width: 40, height: 40, borderRadius: '50%', border: `1px solid ${BLUE}30`,
                  background: active === 0 ? 'var(--bg-2)' : BLUE_LIGHT,
                  color: active === 0 ? 'var(--fg-3)' : BLUE,
                  cursor: active === 0 ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: active === 0 ? 0.35 : 1, transition: 'all 0.2s', fontSize: 16,
                }}
              >←</button>
              <button
                onClick={() => setActive(a => Math.min(steps.length - 1, a + 1))}
                disabled={active === steps.length - 1}
                style={{
                  width: 40, height: 40, borderRadius: '50%', border: 'none',
                  background: active === steps.length - 1 ? 'var(--bg-2)' : BLUE,
                  color: active === steps.length - 1 ? 'var(--fg-3)' : '#fff',
                  cursor: active === steps.length - 1 ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: active === steps.length - 1 ? 0.35 : 1, transition: 'all 0.2s', fontSize: 16,
                }}
              >→</button>
              <span style={{ fontSize: 12, color: 'var(--fg-3)', marginLeft: 4 }}>
                {active < steps.length - 1 ? 'Next: ' + steps[active + 1]?.title : 'All steps complete ✓'}
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ── ServicePageTemplate ───────────────────────────────────────────────── */
export default function ServicePageTemplate({ data }: { data: ServicePageData }) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const rawY = useTransform(heroScroll, [0, 1], ['0%', '-18%']);
  const rawOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);
  const heroY = useSpring(rawY, { stiffness: 80, damping: 20 });
  const heroOpacity = useSpring(rawOpacity, { stiffness: 80, damping: 20 });

  const [wpCases, setWpCases] = useState<WPCaseStudy[]>([]);
  const [wpLoading, setWpLoading] = useState(true);

  useEffect(() => {
    fetchCaseStudies({ perPage: 3 })
      .then(d => setWpCases(d.slice(0, 3)))
      .catch(() => {})
      .finally(() => setWpLoading(false));
  }, []);

  return (
    <>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        style={{
          background: 'var(--bg)',
          minHeight: '100svh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          paddingTop: 90,
        }}
      >
        {/* GridBeam as full section background */}
        <div
          aria-hidden
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        >
          <GridBeam
            style={{ borderRadius: 0, height: '100%', width: '100%' }}
            beams={3}
          />
        </div>

        <NoiseOverlay />

        <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <motion.div style={{ y: heroY, opacity: heroOpacity }}>
            <motion.div
              initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.0, ease: EXPO, delay: 0.1 }}
              style={{
                textAlign: 'center',
                maxWidth: 760,
                margin: '0 auto',
                paddingTop: 40,
                paddingBottom: 80,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* Breadcrumb */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
                <Link href="/solutions" style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: 'var(--fg-3)', textDecoration: 'none' }}>
                  <ArrowLeft size={12} strokeWidth={2} /> Solutions
                </Link>
                <ChevronRight size={12} color="var(--fg-3)" strokeWidth={2} />
                <Link href={data.solutionHref} style={{ fontSize: 12, fontWeight: 600, color: 'var(--fg-3)', textDecoration: 'none' }}>
                  {data.solution}
                </Link>
                <ChevronRight size={12} color="var(--fg-3)" strokeWidth={2} />
                <span style={{ fontSize: 12, fontWeight: 700, color: BLUE }}>{data.name}</span>
              </div>

              {/* Heading */}
              <h1
                style={{
                  fontSize: 'clamp(36px,5.5vw,72px)', fontWeight: 800,
                  letterSpacing: '-0.04em', color: 'var(--fg)',
                  lineHeight: 1.02, marginBottom: 20, textAlign: 'center',
                }}
              >
                {data.name.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 36, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.75, ease: EXPO, delay: 0.25 + i * 0.07 }}
                    style={{ display: 'inline-block', marginRight: '0.22em' }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, ease: EXPO, delay: 0.5 }}
                style={{
                  fontSize: 'clamp(15px,1.4vw,19px)', color: BLUE, fontWeight: 600,
                  letterSpacing: '-0.01em', marginBottom: 14, lineHeight: 1.4,
                  textAlign: 'center',
                }}
              >
                {data.tagline}
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EXPO, delay: 0.6 }}
                style={{
                  fontSize: 15, color: 'var(--fg-3)', lineHeight: 1.8,
                  marginBottom: 36, maxWidth: 560, textAlign: 'center',
                }}
              >
                {data.heroDesc}
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EXPO, delay: 0.7 }}
                style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 52 }}
              >
                <Link
                  href="/contact-us"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: BLUE, color: '#fff', fontSize: 14, fontWeight: 700,
                    borderRadius: 10, padding: '13px 24px', textDecoration: 'none',
                    boxShadow: `0 6px 24px ${BLUE}45`,
                    transition: 'transform 0.2s, filter 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                    (e.currentTarget as HTMLElement).style.filter = 'brightness(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'none';
                    (e.currentTarget as HTMLElement).style.filter = 'none';
                  }}
                >
                  Start a Project <ArrowRight size={14} strokeWidth={2} />
                </Link>
                <Link
                  href="/case-studies"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: 'transparent', color: 'var(--fg-2)', fontSize: 14, fontWeight: 600,
                    borderRadius: 10, padding: '13px 24px', textDecoration: 'none',
                    border: '1px solid var(--border)',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = BLUE;
                    (e.currentTarget as HTMLElement).style.color = BLUE;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--fg-2)';
                  }}
                >
                  View Case Studies
                </Link>
              </motion.div>

              {/* Stats — centered row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: EXPO, delay: 0.85 }}
                className="svc-hero-stats"
              style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}
              >
                {data.stats.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EXPO, delay: 0.9 + i * 0.08 }}
                    style={{
                      padding: '14px 24px',
                      borderRadius: 14,
                      background: 'var(--card-bg)',
                      border: `1px solid var(--card-border)`,
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      textAlign: 'center',
                      minWidth: 100,
                    }}
                  >
                    <div style={{ fontSize: 'clamp(20px,2.2vw,28px)', fontWeight: 800, color: BLUE, letterSpacing: '-0.03em', lineHeight: 1 }}>
                      {s.value}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 5, fontWeight: 500 }}>
                      {s.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section
        className="svc-section-pad"
        style={{ background: 'var(--bg-dark, #07101F)', padding: '120px 0', position: 'relative', overflow: 'hidden' }}
      >
        <div
          className="blob"
          style={{
            width: 600, height: 600,
            top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            background: `radial-gradient(circle, ${BLUE_LIGHT} 0%, transparent 60%)`,
            opacity: 0.25,
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div variants={FU(0, 48)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: BLUE, marginBottom: 32, textAlign: 'center' }}>
              The Challenge
            </div>

            <blockquote
              style={{
                fontSize: 'clamp(28px,4vw,52px)', fontWeight: 800, letterSpacing: '-0.03em',
                lineHeight: 1.12, color: '#F0F4FF', textAlign: 'center',
                maxWidth: 860, margin: '0 auto 56px', fontStyle: 'italic',
              }}
            >
              &ldquo;{data.problemQuote}&rdquo;
            </blockquote>

            <motion.div
              variants={STAGGER(0.05)} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}
            >
              {data.problemPoints.map((p, i) => (
                <motion.div
                  key={i}
                  variants={SC(0)}
                  style={{
                    padding: '9px 18px', borderRadius: 999,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    fontSize: 13, color: 'rgba(255,255,255,0.70)', fontWeight: 500,
                  }}
                >
                  {p}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section className="svc-section-pad" style={{ background: 'var(--bg-2)', padding: '120px 0', position: 'relative' }}>
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            variants={FU(0)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <div className="section-badge" style={{ justifyContent: 'center', marginBottom: 16 }}>
              What We Deliver
            </div>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--fg)', lineHeight: 1.1 }}>
              End-to-End {data.name} Capabilities
            </h2>
          </motion.div>

          <motion.div
            variants={STAGGER(0.07)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}
          >
            {data.capabilities.map((cap, i) => (
              <motion.div key={i} variants={SC(0)} style={{ height: '100%' }}>
                <TiltCard
                  style={{
                    height: '100%', padding: 28, borderRadius: 20,
                    background: 'var(--card-bg)', border: '1px solid var(--border)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    display: 'flex', flexDirection: 'column', gap: 16,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div
                      style={{
                        width: 44, height: 44, borderRadius: 12,
                        background: BLUE_LIGHT, border: `1px solid ${BLUE}25`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}
                    >
                      <cap.Icon size={20} color={BLUE} strokeWidth={1.5} />
                    </div>
                    {cap.tag && (
                      <span
                        style={{
                          fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                          color: BLUE, padding: '4px 10px', borderRadius: 999,
                          background: BLUE_LIGHT, border: `1px solid ${BLUE}25`,
                        }}
                      >
                        {cap.tag}
                      </span>
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)', marginBottom: 8, lineHeight: 1.3 }}>
                      {cap.title}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.7 }}>{cap.desc}</div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      {/* NOTE: overflow must NOT be hidden here — it would break position:sticky */}
      <section className="svc-section-pad" style={{ background: 'var(--bg)', padding: '80px 0 60px', position: 'relative' }}>
        <NoiseOverlay />
        <div
          className="blob"
          style={{
            width: 440, height: 440, top: '5%', right: '2%',
            background: `radial-gradient(circle, ${BLUE_LIGHT} 0%, transparent 60%)`, opacity: 0.35,
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            variants={FU(0)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <div className="section-badge" style={{ justifyContent: 'center', marginBottom: 16 }}>
              How We Work
            </div>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--fg)', lineHeight: 1.1 }}>
              Our Proven Process
            </h2>
            <p style={{ fontSize: 15, color: 'var(--fg-3)', maxWidth: 480, margin: '14px auto 0', lineHeight: 1.7 }}>
              A structured approach that delivers reliable results — from first conversation to production.
            </p>
          </motion.div>

          <ProcessSection steps={data.process} />
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section style={{ background: 'var(--bg-2)', padding: '120px 0', position: 'relative' }}>
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            variants={FU(0)} initial="hidden" whileInView="visible" viewport={{ once: false, margin: '-60px' }}
            style={{ marginBottom: 48 }}
          >
            <div className="section-badge" style={{ marginBottom: 16 }}>Case Studies</div>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--fg)', lineHeight: 1.1, maxWidth: 560 }}>
              Real Impact, Measurable Results
            </h2>
          </motion.div>

          <motion.div
            variants={STAGGER(0.1)} initial="hidden" whileInView="visible" viewport={{ once: false, margin: '-60px' }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}
          >
            {wpLoading
              ? [0, 1, 2].map(i => (
                  <motion.div key={i} variants={SC(0)}>
                    <div style={{ borderRadius: 22, border: '1px solid var(--border)', background: 'var(--card-bg)', overflow: 'hidden', height: 260, display: 'flex', flexDirection: 'column', gap: 14, padding: '26px' }}>
                      <div style={{ height: 5, borderRadius: 2, background: 'rgba(77,134,245,0.10)', marginBottom: 6 }} />
                      <div style={{ height: 9, width: '45%', borderRadius: 4, background: 'rgba(77,134,245,0.08)' }} />
                      <div style={{ height: 14, borderRadius: 4, background: 'rgba(77,134,245,0.08)' }} />
                      <div style={{ height: 14, width: '80%', borderRadius: 4, background: 'rgba(77,134,245,0.06)' }} />
                      <div style={{ flex: 1 }} />
                      <div style={{ display: 'flex', gap: 10 }}>
                        {[1,2,3].map(j => <div key={j} style={{ flex: 1, height: 52, borderRadius: 10, background: 'rgba(77,134,245,0.06)' }} />)}
                      </div>
                    </div>
                  </motion.div>
                ))
              : wpCases.length > 0
                ? wpCases.map((cs, i) => {
                    const terms = cs._embedded?.['wp:term']?.flat() as Array<{ name: string; taxonomy: string }> ?? [];
                    const industry = terms[0]?.name ?? 'Case Study';
                    const title    = stripHtmlTags(cs.title.rendered);
                    const summary  = truncateText(stripHtmlTags(cs.excerpt.rendered || cs.content.rendered), 150);
                    const imgSrc   = getCoverImage(cs._embedded) ?? getLocalCaseStudyImage(cs.slug);
                    return (
                      <motion.div
                        key={cs.id}
                        variants={SC(0)}
                        whileHover={{ y: -6, boxShadow: `0 24px 60px ${BLUE}22`, transition: { duration: 0.3, ease: EXPO } }}
                      >
                        <Link href={`/case-study/${cs.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                          <div style={{ border: '1px solid var(--border)', background: 'var(--card-bg)', display: 'flex', flexDirection: 'column', height: '100%', borderRadius: 22, overflow: 'hidden' }}>
                            <div style={{ height: 5, flexShrink: 0, background: `linear-gradient(90deg, ${BLUE}, ${BLUE}70)` }} />
                            {imgSrc && (
                              <div style={{ height: 160, overflow: 'hidden', flexShrink: 0 }}>
                                <img src={imgSrc} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                              </div>
                            )}
                            <div style={{ padding: '22px 24px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.10em', textTransform: 'uppercase', color: BLUE, padding: '4px 10px', borderRadius: 999, background: `${BLUE}12`, border: `1px solid ${BLUE}25`, width: 'fit-content', marginBottom: 12 }}>
                                {industry}
                              </span>
                              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg)', lineHeight: 1.4, marginBottom: 10 }}>
                                {title}
                              </div>
                              <div style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.7, flex: 1, marginBottom: 18 }}>
                                {summary}
                              </div>
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
                : data.caseStudies.map((cs, i) => (
                    <motion.div
                      key={i}
                      variants={SC(0)}
                      style={{ borderRadius: 22, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}
                      whileHover={{ y: -6, boxShadow: `0 24px 60px ${BLUE}22`, transition: { duration: 0.3, ease: EXPO } }}
                    >
                      <div style={{ border: '1px solid var(--border)', background: 'var(--card-bg)', display: 'flex', flexDirection: 'column', height: '100%', borderRadius: 22, overflow: 'hidden' }}>
                        <div style={{ height: 5, flexShrink: 0, background: `linear-gradient(90deg, ${cs.accent}, ${cs.accent}70)` }} />
                        <div style={{ padding: '26px 26px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.10em', textTransform: 'uppercase', color: cs.accent, padding: '4px 10px', borderRadius: 999, background: `${cs.accent}12`, border: `1px solid ${cs.accent}25` }}>
                              {cs.industry}
                            </span>
                          </div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg)', lineHeight: 1.4, marginBottom: 10 }}>{cs.company}</div>
                          <div style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.7, flex: 1, marginBottom: 22 }}>{cs.outcome}</div>
                          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cs.metrics.length}, 1fr)`, gap: 10 }}>
                            {cs.metrics.map((m, j) => (
                              <div key={j} style={{ padding: '11px 10px', borderRadius: 12, background: `${cs.accent}08`, border: `1px solid ${cs.accent}16`, textAlign: 'center' }}>
                                <div style={{ fontSize: 'clamp(16px,1.9vw,22px)', fontWeight: 800, color: cs.accent, letterSpacing: '-0.02em', lineHeight: 1, wordBreak: 'break-word' }}>{m.value}</div>
                                <div style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 4, lineHeight: 1.35 }}>{m.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
            }
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: 'var(--bg)', padding: '120px 0', position: 'relative' }}>
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 56, alignItems: 'start' }} className="svc-faq-grid">
            <motion.div
              variants={FL(0)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
              style={{ position: 'sticky', top: 100 }}
            >
              <div className="section-badge" style={{ marginBottom: 16 }}>FAQ</div>
              <h2 style={{ fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--fg)', lineHeight: 1.15, marginBottom: 16 }}>
                Frequently Asked Questions
              </h2>
              <p style={{ fontSize: 14, color: 'var(--fg-3)', lineHeight: 1.7 }}>
                Everything you need to know about our {data.name} services.
              </p>
            </motion.div>
            <FAQAccordion items={data.faq} />
          </div>
        </div>
      </section>

      {/* ── SERVICE SWITCHER ── */}
      <ServiceSwitcherSection solutionHref={data.solutionHref} solutionName={data.solution} />

      {/* ── CTA ── */}
      <section style={{ background: 'var(--bg-2)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <NoiseOverlay />
        <div
          className="blob"
          style={{
            width: 600, height: 600,
            top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            background: `radial-gradient(circle, ${BLUE_LIGHT} 0%, transparent 65%)`, opacity: 0.5,
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 640 }}>
          <motion.div variants={SC(0)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <div
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24,
                padding: '6px 14px', borderRadius: 999,
                background: BLUE_LIGHT, border: `1px solid ${BLUE}30`,
                fontSize: 11, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: BLUE,
              }}
            >
              Ready to Build?
            </div>
            <h2
              style={{
                fontSize: 'clamp(30px,4vw,52px)', fontWeight: 800, letterSpacing: '-0.04em',
                color: 'var(--fg)', lineHeight: 1.06, marginBottom: 18,
              }}
            >
              Let&apos;s Build Something{' '}
              <span style={{ color: BLUE }}>Extraordinary</span>
            </h2>
            <p style={{ fontSize: 16, color: 'var(--fg-3)', lineHeight: 1.75, marginBottom: 36 }}>
              Our team is ready to help you design, build, and scale your {data.name} initiative. No fluff — just outcomes.
            </p>
            <div className="svc-cta-row" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/contact-us"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 9,
                  background: BLUE, color: '#fff', fontSize: 15, fontWeight: 700,
                  borderRadius: 12, padding: '14px 28px', textDecoration: 'none',
                  boxShadow: `0 8px 28px ${BLUE}40`, transition: 'transform 0.2s, filter 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLElement).style.filter = 'brightness(1.1)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'none';
                  (e.currentTarget as HTMLElement).style.filter = 'none';
                }}
              >
                Book a Free Discovery Call <ArrowRight size={15} strokeWidth={2} />
              </Link>
              <Link
                href={data.solutionHref}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 9,
                  background: 'transparent', color: 'var(--fg-2)', fontSize: 15, fontWeight: 600,
                  borderRadius: 12, padding: '14px 28px', textDecoration: 'none',
                  border: '1px solid var(--border)', transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = BLUE;
                  (e.currentTarget as HTMLElement).style.color = BLUE;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--fg-2)';
                }}
              >
                Explore {data.solution}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media(max-width:860px){
          .process-grid{ grid-template-columns: 1fr !important; }
          .process-grid > div:first-child{ position: static !important; }
        }
        /* ── Tablet ── */
        @media(max-width:960px){
          .svc-faq-grid{grid-template-columns:1fr!important}
          .svc-faq-grid>div:first-child{position:static!important}
          .svc-step-content{grid-template-columns:1fr!important;gap:20px!important}
          .svc-process-container{min-height:auto!important}
        }
        /* ── Mobile ── */
        @media(max-width:680px){
          .svc-prevnext{flex-direction:column!important}
          .svc-step-labels span{font-size:9px!important}
        }
        @media(max-width:540px){
          /* hero stats wrap to 2-col */
          .svc-hero-stats{gap:10px!important}
          .svc-hero-stats>div{min-width:calc(50% - 5px)!important;padding:12px 14px!important}
          /* process: hide step labels, show only circles */
          .svc-step-label{display:none!important}
          /* problem section */
          .svc-problem-pills{gap:6px!important}
          /* capabilities: full width cards */
          .svc-caps-grid{grid-template-columns:1fr!important}
          /* case studies */
          .svc-cases-grid{grid-template-columns:1fr!important}
          /* faq */
          .svc-faq-grid{gap:24px!important}
          /* cta buttons stack */
          .svc-cta-row{flex-direction:column!important;align-items:center!important}
          .svc-cta-row a{width:100%!important;max-width:320px!important;justify-content:center!important}
        }
        /* ── Shared section padding on mobile ── */
        @media(max-width:680px){
          .svc-section-pad{padding:72px 0!important}
        }
        @media(max-width:420px){
          .svc-section-pad{padding:56px 0!important}
        }
      `}</style>
    </>
  );
}
