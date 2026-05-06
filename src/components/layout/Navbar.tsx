'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun, Moon, Menu, X, ChevronDown,
  Brain, Cloud, Monitor, Zap, Code2,
  BookOpen, Users, Headphones, ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

type SolItem = {
  label: string;
  href: string;
  Icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  desc: string;
  services: { label: string; href: string }[];
};

const SOLUTIONS: SolItem[] = [
  {
    label: 'Data Science & AI',
    href: '/solutions/data-science',
    Icon: Brain,
    desc: 'AI, ML & data infrastructure',
    services: [
      { label: 'AI & Machine Learning', href: '/solutions/data-science/ai-ml' },
      { label: 'Computer Vision', href: '/solutions/data-science/computer-vision' },
      { label: 'Data Infrastructure', href: '/solutions/data-science/data-infrastructure' },
      { label: 'IoT & Connected Systems', href: '/solutions/data-science/iot-connected-systems' },
    ],
  },
  {
    label: 'Cloud & Infrastructure',
    href: '/solutions/cloud-infrastructure',
    Icon: Cloud,
    desc: 'AWS, GCP, Azure & DevOps',
    services: [
      { label: 'Cloud Platform Setup (AWS/GCP/Azure)', href: '/solutions/cloud-infrastructure/cloud-platform-setup' },
      { label: 'DevOps & Automation', href: '/solutions/cloud-infrastructure/devops-automation' },
    ],
  },
  {
    label: 'Microsoft Services',
    href: '/solutions/microsoft-services',
    Icon: Monitor,
    desc: 'CRM, ERP, Azure & SharePoint',
    services: [
      { label: 'Microsoft CRM & ERP', href: '/solutions/microsoft-services/crm-erp' },
      { label: 'Microsoft Automation & Analytics', href: '/solutions/microsoft-services/automation-analytics' },
      { label: 'Azure', href: '/solutions/microsoft-services/azure' },
      { label: 'SharePoint', href: '/solutions/microsoft-services/sharepoint' },
    ],
  },
  {
    label: 'Salesforce Services',
    href: '/solutions/salesforce-services',
    Icon: Zap,
    desc: 'End-to-end Salesforce expertise',
    services: [
      { label: 'Salesforce Support & Managed Services', href: '/solutions/salesforce-services/managed-services' },
      { label: 'Salesforce Implementation', href: '/solutions/salesforce-services/implementation' },
    ],
  },
  {
    label: 'Web & App Development',
    href: '/solutions/web-app-development',
    Icon: Code2,
    desc: 'Web, mobile & design',
    services: [
      { label: 'Web Application Development', href: '/solutions/web-app-development/web-application' },
      { label: 'Mobile App Development', href: '/solutions/web-app-development/mobile-app' },
      { label: 'Design & Quality', href: '/solutions/web-app-development/design-quality' },
    ],
  },
];

const INSIGHTS = [
  { label: 'Blog',              href: '/blog',              Icon: BookOpen, desc: 'Insights & industry updates' },
  { label: 'About Us',          href: '/life-at-moreyeahs', Icon: Users,    desc: 'Culture, team & careers' },
];

type DDItem = {
  label: string; href: string;
  Icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  desc?: string;
};

function Dropdown({ items, isOpen, openUp = false, onMouseEnter, onMouseLeave }: { items: DDItem[]; isOpen: boolean; openUp?: boolean; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: openUp ? 6 : -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: openUp ? 6 : -6 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{
            position: 'absolute',
            ...(openUp ? { bottom: 'calc(100% + 10px)', top: 'auto' } : { top: 'calc(100% + 10px)', bottom: 'auto' }),
            left: '50%', transform: 'translateX(-50%)',
            minWidth: 240, zIndex: 300,
            background: 'var(--nav-bg)',
            backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid var(--border)',
            borderRadius: 16, padding: '8px',
            boxShadow: '0 16px 48px rgba(0,0,0,0.20)',
          }}
        >
          {items.map(item => (
            <Link key={item.href} href={item.href}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 11, padding: '10px 12px', borderRadius: 10, textDecoration: 'none', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(26,86,219,0.07)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(26,86,219,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                <item.Icon size={15} color="#4D86F5" strokeWidth={1.5} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)', lineHeight: 1.3 }}>{item.label}</div>
                {item.desc && <div style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 2 }}>{item.desc}</div>}
              </div>
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MegaMenu({ items, isOpen, openUp = false, onMouseEnter, onMouseLeave }: { items: SolItem[]; isOpen: boolean; openUp?: boolean; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  const [hovered, setHovered] = useState(0);
  const active = items[hovered];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: openUp ? 8 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: openUp ? 8 : -8 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{
            position: 'absolute',
            ...(openUp ? { bottom: 'calc(100% + 12px)', top: 'auto' } : { top: 'calc(100% + 12px)', bottom: 'auto' }),
            left: '50%', transform: 'translateX(-50%)',
            width: 760, zIndex: 300,
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: 20,
            boxShadow: '0 24px 64px rgba(0,0,0,0.28), 0 4px 16px rgba(0,0,0,0.10)',
            overflow: 'hidden',
          }}
        >
          {/* ── TOP: full-width chip header ── */}
          <div style={{
            padding: '11px 18px',
            borderBottom: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--fg-3)',
            }}>
              All Solutions
            </span>
            <Link href="/solutions" style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontSize: 12, fontWeight: 600, color: '#1A56DB',
              textDecoration: 'none',
              padding: '4px 12px', borderRadius: 999,
              background: 'rgba(26,86,219,0.08)', border: '1px solid rgba(77,134,245,0.20)',
              transition: 'background 0.15s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(26,86,219,0.14)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(26,86,219,0.08)'; }}
            >
              See all <ArrowRight size={11} strokeWidth={2.5} />
            </Link>
          </div>

          {/* ── BODY: 3 columns ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '175px 1fr 260px' }}>

            {/* LEFT: solutions list */}
            <div style={{ padding: '10px 8px', borderRight: '1px solid var(--border)' }}>
              {items.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHovered(i)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 9,
                    padding: '9px 10px', borderRadius: 8, textDecoration: 'none',
                    background: hovered === i ? 'rgba(26,86,219,0.07)' : 'transparent',
                    transition: 'background 0.15s',
                  }}
                >
                  <div style={{
                    width: 26, height: 26, borderRadius: 6, flexShrink: 0,
                    background: hovered === i ? 'rgba(26,86,219,0.12)' : 'rgba(26,86,219,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.15s',
                  }}>
                    <item.Icon size={13} color={hovered === i ? '#1A56DB' : 'var(--fg-3)'} strokeWidth={1.5} />
                  </div>
                  <span style={{
                    fontSize: 12, fontWeight: hovered === i ? 700 : 500,
                    color: hovered === i ? 'var(--fg)' : 'var(--fg-2)',
                    lineHeight: 1.3, transition: 'color 0.12s',
                  }}>
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* MIDDLE: services for hovered solution */}
            <div style={{ padding: '14px 16px', borderRight: '1px solid var(--border)' }}>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.10em',
                textTransform: 'uppercase', color: '#4D86F5', marginBottom: 10,
              }}>
                {active.label}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={hovered}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                >
                  {active.services.map(s => (
                    <Link key={s.href} href={s.href}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 9,
                        padding: '7px 8px', borderRadius: 6,
                        textDecoration: 'none', fontSize: 12, color: 'var(--fg-2)',
                        transition: 'background 0.12s, color 0.12s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(26,86,219,0.07)'; (e.currentTarget as HTMLElement).style.color = 'var(--fg)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--fg-2)'; }}
                    >
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#4D86F5', flexShrink: 0, opacity: 0.6 }} />
                      {s.label}
                    </Link>
                  ))}
                </motion.div>
              </AnimatePresence>
              <Link href={active.href} style={{
                display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 14,
                fontSize: 11, fontWeight: 700, color: '#1A56DB', textDecoration: 'none',
                transition: 'opacity 0.15s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.65'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
              >
                Learn more <ArrowRight size={10} strokeWidth={2.5} />
              </Link>
            </div>

            {/* RIGHT: Contact Us — always fixed */}
            <div style={{ padding: '14px', display: 'flex', flexDirection: 'column' }}>
              <div style={{
                flex: 1,
                borderRadius: 12,
                background: 'rgba(26,86,219,0.06)',
                border: '1px solid rgba(77,134,245,0.18)',
                padding: '18px 16px',
                display: 'flex', flexDirection: 'column',
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: 'rgba(26,86,219,0.10)', border: '1px solid rgba(77,134,245,0.22)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 14, flexShrink: 0,
                }}>
                  <Headphones size={15} color="#4D86F5" strokeWidth={1.5} />
                </div>
                <div style={{
                  fontSize: 13, fontWeight: 800, color: 'var(--fg)',
                  lineHeight: 1.3, letterSpacing: '-0.01em', marginBottom: 8,
                }}>
                  Ready to transform your business?
                </div>
                <p style={{
                  fontSize: 12, color: 'var(--fg-3)', lineHeight: 1.65,
                  margin: '0 0 auto',
                }}>
                  Talk to our experts and get a tailored roadmap for your digital journey.
                </p>
                <Link href="/contact-us" style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  background: '#1A56DB', color: '#fff',
                  fontSize: 12, fontWeight: 700, borderRadius: 8,
                  padding: '9px 14px', textDecoration: 'none', marginTop: 16,
                  transition: 'background 0.15s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0E2E75'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1A56DB'; }}
                >
                  Contact Us <ArrowRight size={11} strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const NAV_LINK: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 4,
  padding: '7px 14px', borderRadius: 999,
  fontSize: 13, fontWeight: 500,
  color: 'var(--fg-2)', textDecoration: 'none',
  transition: 'color 0.15s, background 0.15s',
  cursor: 'pointer', background: 'none', border: 'none',
  fontFamily: 'inherit', whiteSpace: 'nowrap',
};

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [pastHero, setPastHero] = useState(false);
  const [screenWide, setScreenWide] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [solOpen, setSolOpen] = useState(false);
  const [insOpen, setInsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const tSol = useRef<HTMLDivElement>(null);
  const tIns = useRef<HTMLDivElement>(null);
  const bSol = useRef<HTMLDivElement>(null);
  const bIns = useRef<HTMLDivElement>(null);
  const solTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const insTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => { setPastHero(false); }, [pathname]);

  useEffect(() => {
    const getHeroThreshold = () => {
      const heroEl = document.querySelector<HTMLElement>('main > *:first-child');
      return heroEl
        ? Math.max(heroEl.offsetTop + heroEl.offsetHeight - 60, 150)
        : window.innerHeight * 0.88;
    };
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 80) { setPastHero(false); return; }
      setPastHero(y > getHeroThreshold());
    };
    const onResize = () => setScreenWide(window.innerWidth > 900);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    onScroll(); onResize();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const openSol = () => { clearTimeout(solTimer.current); clearTimeout(insTimer.current); setSolOpen(true); setInsOpen(false); };
  const closeSol = () => { solTimer.current = setTimeout(() => setSolOpen(false), 180); };
  const openIns = () => { clearTimeout(insTimer.current); clearTimeout(solTimer.current); setInsOpen(true); setSolOpen(false); };
  const closeIns = () => { insTimer.current = setTimeout(() => setInsOpen(false), 180); };

  const isDark = mounted ? theme === 'dark' : true;
  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  const showTopNav    = !pastHero || !screenWide;
  const showBottomPill = pastHero && screenWide;

  const closeMobile = () => { setMobileOpen(false); setMobileExpanded(null); };

  const ThemeBtn = ({ compact }: { compact?: boolean }) => (
    <button onClick={toggleTheme} style={{
      width: compact ? 32 : 36, height: compact ? 32 : 36, borderRadius: 999,
      border: '1px solid var(--border)', background: 'var(--surface)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', color: 'var(--fg-2)', transition: 'all 0.2s', flexShrink: 0,
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(128,169,255,0.12)'; (e.currentTarget as HTMLElement).style.color = '#80A9FF'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--surface)'; (e.currentTarget as HTMLElement).style.color = 'var(--fg-2)'; }}
    >
      {isDark ? <Sun size={compact ? 13 : 15} strokeWidth={1.5} /> : <Moon size={compact ? 13 : 15} strokeWidth={1.5} />}
    </button>
  );

  const pillSpring = { type: 'spring', stiffness: 280, damping: 24 } as const;

  return (
    <>
      {/* ── TOP NAV ── */}
      <AnimatePresence>
        {showTopNav && (
          <motion.nav
            key="top-nav"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', top: 'var(--ann-h, 0px)', left: 0, right: 0, zIndex: 150, padding: '20px 0',
              background: (solOpen || insOpen) ? 'var(--nav-bg)' : 'transparent',
              backdropFilter: (solOpen || insOpen) ? 'blur(20px)' : 'none',
              WebkitBackdropFilter: (solOpen || insOpen) ? 'blur(20px)' : 'none',
              borderBottom: (solOpen || insOpen) ? '1px solid var(--nav-border)' : '1px solid transparent',
              transition: 'background 0.25s, backdrop-filter 0.25s, border-color 0.25s, top 0.35s ease',
            }}
          >
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>

              <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
                <img src="/images/MoreYeahs White theme Logo.png" alt="MoreYeahs" className="nav-logo-light" />
                <img src="/images/MoreYeahs Dark Theme Logo.png"  alt="MoreYeahs" className="nav-logo-dark" />
              </Link>

              {/* Desktop pill nav */}
              <div className="desktop-nav" style={{
                display: 'flex', alignItems: 'center',
                background: 'var(--nav-bg)',
                backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid var(--nav-border)',
                borderRadius: 999, padding: '7px 10px', gap: 2,
              }}>
                <Link href="/" style={NAV_LINK}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(26,86,219,0.08)'; (e.currentTarget as HTMLElement).style.color = 'var(--fg)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--fg-2)'; }}>Home</Link>

                <div ref={tSol} style={{ position: 'relative' }} onMouseEnter={openSol} onMouseLeave={closeSol}>
                  <Link href="/solutions" style={NAV_LINK}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(26,86,219,0.08)'; (e.currentTarget as HTMLElement).style.color = 'var(--fg)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--fg-2)'; }}>
                    Solutions <ChevronDown size={12} strokeWidth={2} style={{ transition: 'transform 0.2s', transform: solOpen ? 'rotate(180deg)' : 'none' }} />
                  </Link>
                  <MegaMenu items={SOLUTIONS} isOpen={solOpen} onMouseEnter={openSol} onMouseLeave={closeSol} />
                </div>

                <div ref={tIns} style={{ position: 'relative' }} onMouseEnter={openIns} onMouseLeave={closeIns}>
                  <button style={NAV_LINK}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(26,86,219,0.08)'; (e.currentTarget as HTMLElement).style.color = 'var(--fg)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--fg-2)'; }}>
                    Insights <ChevronDown size={12} strokeWidth={2} style={{ transition: 'transform 0.2s', transform: insOpen ? 'rotate(180deg)' : 'none' }} />
                  </button>
                  <Dropdown items={INSIGHTS} isOpen={insOpen} onMouseEnter={openIns} onMouseLeave={closeIns} />
                </div>

                {[['Case Studies', '/case-studies'], ['Careers', '/careers'], ['Resources', '/resources']].map(([l, h]) => (
                  <Link key={l} href={h} style={NAV_LINK}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(26,86,219,0.08)'; (e.currentTarget as HTMLElement).style.color = 'var(--fg)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--fg-2)'; }}>{l}</Link>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                {mounted && <ThemeBtn />}
                <Link href="/contact-us" className="desktop-nav" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#1A56DB', color: '#fff',
                  fontSize: 13, fontWeight: 700, borderRadius: 10,
                  padding: '10px 20px', textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(26,86,219,0.38)',
                  transition: 'background 0.2s, transform 0.2s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0E2E75'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1A56DB'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}>
                  <Headphones size={14} strokeWidth={1.5} /> Contact Us
                </Link>
                <button className="mobile-only" onClick={() => setMobileOpen(o => !o)} style={{
                  width: 36, height: 36, borderRadius: 9,
                  border: '1px solid var(--nav-border)', background: 'var(--surface)',
                  display: 'none', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'var(--fg)',
                }}>
                  {mobileOpen ? <X size={16} strokeWidth={1.5} /> : <Menu size={16} strokeWidth={1.5} />}
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── BOTTOM STICKY PILL (desktop only) ── */}
      <AnimatePresence>
        {showBottomPill && (
          <motion.div
            key="bottom-nav"
            initial={{ y: 80, opacity: 0, scaleX: 0.15 }}
            animate={{ y: 0, opacity: 1, scaleX: 1 }}
            exit={{ y: 80, opacity: 0, scaleX: 0.15 }}
            transition={pillSpring}
            style={{
              position: 'fixed', bottom: 28, left: 0, right: 0,
              display: 'flex', justifyContent: 'center',
              zIndex: 150, pointerEvents: 'none',
              transformOrigin: 'center bottom',
            }}
          >
            <div className="bottom-pill" style={{
              pointerEvents: 'auto',
              display: 'flex', alignItems: 'center',
              background: 'var(--nav-bg)',
              backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
              border: '1px solid var(--border)',
              borderRadius: 999, padding: '8px 12px', gap: 2,
              boxShadow: '0 12px 48px rgba(0,0,0,0.28), 0 0 0 1px rgba(77,134,245,0.07)',
            }}>
              <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', padding: '2px 12px 2px 4px', marginRight: 2, borderRight: '1px solid var(--border)', flexShrink: 0 }}>
                <img src="/images/MoreYeahs White theme Logo.png" alt="MoreYeahs" className="nav-logo-light nav-logo-pill" />
                <img src="/images/MoreYeahs Dark Theme Logo.png"  alt="MoreYeahs" className="nav-logo-dark  nav-logo-pill" />
              </Link>

              <Link href="/" style={NAV_LINK}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(26,86,219,0.08)'; (e.currentTarget as HTMLElement).style.color = 'var(--fg)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--fg-2)'; }}>Home</Link>

              <div ref={bSol} style={{ position: 'relative' }} onMouseEnter={openSol} onMouseLeave={closeSol}>
                <Link href="/solutions" style={NAV_LINK}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(26,86,219,0.08)'; (e.currentTarget as HTMLElement).style.color = 'var(--fg)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--fg-2)'; }}>
                  Solutions <ChevronDown size={12} strokeWidth={2} style={{ transition: 'transform 0.2s', transform: solOpen ? 'rotate(180deg)' : 'none' }} />
                </Link>
                <MegaMenu items={SOLUTIONS} isOpen={solOpen} openUp onMouseEnter={openSol} onMouseLeave={closeSol} />
              </div>

              <div ref={bIns} style={{ position: 'relative' }} onMouseEnter={openIns} onMouseLeave={closeIns}>
                <button style={NAV_LINK}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(26,86,219,0.08)'; (e.currentTarget as HTMLElement).style.color = 'var(--fg)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--fg-2)'; }}>
                  Insights <ChevronDown size={12} strokeWidth={2} style={{ transition: 'transform 0.2s', transform: insOpen ? 'rotate(180deg)' : 'none' }} />
                </button>
                <Dropdown items={INSIGHTS} isOpen={insOpen} openUp onMouseEnter={openIns} onMouseLeave={closeIns} />
              </div>

              {[['Case Studies', '/case-studies'], ['Careers', '/careers'], ['Resources', '/resources']].map(([l, h]) => (
                <Link key={l} href={h} style={NAV_LINK}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(26,86,219,0.08)'; (e.currentTarget as HTMLElement).style.color = 'var(--fg)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--fg-2)'; }}>{l}</Link>
              ))}

              <div style={{ width: 1, height: 20, background: 'var(--border)', margin: '0 8px', flexShrink: 0 }} />
              {mounted && <ThemeBtn compact />}
              <Link href="/contact-us" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: '#1A56DB', color: '#fff',
                fontSize: 12, fontWeight: 700, borderRadius: 999,
                padding: '8px 18px', textDecoration: 'none', marginLeft: 4, flexShrink: 0,
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#0E2E75')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#1A56DB')}>
                <Headphones size={12} strokeWidth={1.5} /> Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MOBILE OVERLAY ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', inset: 0, top: 'calc(76px + var(--ann-h, 0px))', zIndex: 140,
              background: 'var(--nav-bg)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
              padding: '12px 16px 40px',
              display: 'flex', flexDirection: 'column', gap: 2,
              borderTop: '1px solid var(--border)', overflowY: 'auto',
            }}
          >
            <Link href="/" onClick={closeMobile} style={{
              padding: '13px 14px', fontSize: 15, fontWeight: 600, color: 'var(--fg)',
              textDecoration: 'none', borderRadius: 10, display: 'block', transition: 'background 0.15s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(26,86,219,0.06)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              Home
            </Link>

            {/* Solutions accordion */}
            <div>
              <button
                onClick={() => setMobileExpanded(v => v === 'solutions' ? null : 'solutions')}
                style={{
                  width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '13px 14px', fontSize: 15, fontWeight: 600, color: 'var(--fg)',
                  borderRadius: 10, textAlign: 'left', fontFamily: 'inherit', transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(26,86,219,0.06)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                Solutions
                <ChevronDown size={14} strokeWidth={2} style={{
                  transition: 'transform 0.2s', flexShrink: 0,
                  transform: mobileExpanded === 'solutions' ? 'rotate(180deg)' : 'none',
                }} />
              </button>
              <AnimatePresence>
                {mobileExpanded === 'solutions' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ padding: '4px 8px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {SOLUTIONS.map(s => (
                        <Link key={s.href} href={s.href} onClick={closeMobile}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            padding: '10px 12px', borderRadius: 8, textDecoration: 'none', transition: 'background 0.15s',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(26,86,219,0.06)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >
                          <div style={{
                            width: 30, height: 30, borderRadius: 8, background: 'rgba(26,86,219,0.08)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          }}>
                            <s.Icon size={14} color="#4D86F5" strokeWidth={1.5} />
                          </div>
                          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg-2)' }}>{s.label}</span>
                        </Link>
                      ))}
                      <Link href="/solutions" onClick={closeMobile}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 6,
                          padding: '9px 12px', borderRadius: 8, textDecoration: 'none',
                          fontSize: 12, fontWeight: 700, color: '#4D86F5', transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(26,86,219,0.06)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        View all solutions <ArrowRight size={11} strokeWidth={2} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Insights accordion */}
            <div>
              <button
                onClick={() => setMobileExpanded(v => v === 'insights' ? null : 'insights')}
                style={{
                  width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '13px 14px', fontSize: 15, fontWeight: 600, color: 'var(--fg)',
                  borderRadius: 10, textAlign: 'left', fontFamily: 'inherit', transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(26,86,219,0.06)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                Insights
                <ChevronDown size={14} strokeWidth={2} style={{
                  transition: 'transform 0.2s', flexShrink: 0,
                  transform: mobileExpanded === 'insights' ? 'rotate(180deg)' : 'none',
                }} />
              </button>
              <AnimatePresence>
                {mobileExpanded === 'insights' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ padding: '4px 8px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {INSIGHTS.map(item => (
                        <Link key={item.href} href={item.href} onClick={closeMobile}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            padding: '10px 12px', borderRadius: 8, textDecoration: 'none', transition: 'background 0.15s',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(26,86,219,0.06)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >
                          <div style={{
                            width: 30, height: 30, borderRadius: 8, background: 'rgba(26,86,219,0.08)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          }}>
                            <item.Icon size={14} color="#4D86F5" strokeWidth={1.5} />
                          </div>
                          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg-2)' }}>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {[['Case Studies', '/case-studies'], ['Careers', '/careers'], ['Resources', '/resources']].map(([l, h]) => (
              <Link key={l} href={h} onClick={closeMobile}
                style={{
                  padding: '13px 14px', fontSize: 15, fontWeight: 600, color: 'var(--fg)',
                  textDecoration: 'none', borderRadius: 10, display: 'block', transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(26,86,219,0.06)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                {l}
              </Link>
            ))}

            <div style={{ height: 1, background: 'var(--border)', margin: '8px 0 6px' }} />

            {mounted && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px', borderRadius: 10 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--fg-2)' }}>
                  {isDark ? 'Dark mode' : 'Light mode'}
                </span>
                <ThemeBtn />
              </div>
            )}

            <Link href="/contact-us" onClick={closeMobile} style={{
              marginTop: 8, background: '#1A56DB', color: '#fff', textAlign: 'center',
              padding: '15px 24px', borderRadius: 12, fontWeight: 700, fontSize: 15,
              textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: '0 4px 20px rgba(26,86,219,0.38)',
            }}>
              <Headphones size={15} strokeWidth={1.5} /> Contact Us
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media(max-width:900px){ .desktop-nav{display:none!important} .mobile-only{display:flex!important} }
      `}</style>
    </>
  );
}
