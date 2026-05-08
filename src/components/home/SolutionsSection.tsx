'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Brain, Cloud, Monitor, Zap, Code2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import NoiseOverlay from '@/components/ui/NoiseOverlay';

const DOMAINS = [
  {
    Icon: Brain,
    tag: 'Data Science & AI',
    tagline: 'From raw data to decisions',
    href: '/solutions/data-science',
    desc: 'We help organizations harness AI, machine learning, and data engineering to uncover patterns, predict outcomes, and drive smarter decision-making at scale.',
    services: ['AI & Machine Learning', 'Computer Vision', 'Data Infrastructure', 'IoT & Connected Systems'],
    accent: '#4D86F5',
    mockup: (
      <div style={{ padding: 24, borderRadius: 16, background: 'rgba(26,86,219,0.06)', border: '1px solid rgba(77,134,245,0.15)' }}>
        <div style={{ marginBottom: 16 }}>
          {[{ label: 'Model Accuracy', pct: 94, color: '#4D86F5' }, { label: 'Data Processed', pct: 78, color: '#80A9FF' }, { label: 'Cost Reduction', pct: 61, color: '#1A56DB' }].map(m => (
            <div key={m.label} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#7A7A7A', marginBottom: 4 }}>
                <span>{m.label}</span><span style={{ color: m.color, fontWeight: 700 }}>{m.pct}%</span>
              </div>
              <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${m.pct}%`, height: '100%', background: m.color, borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(26,86,219,0.10)', border: '1px solid rgba(77,134,245,0.18)', fontSize: 11, color: '#80A9FF', fontWeight: 600 }}>✦ Predictive model deployed · 94.2% accuracy</div>
      </div>
    ),
  },
  {
    Icon: Cloud,
    tag: 'Cloud & Infrastructure',
    tagline: 'Scalable, reliable, automated',
    href: '/solutions/cloud-infrastructure',
    desc: 'We engineer cloud-native platforms that form the backbone of modern digital products — fast, secure, and built for real-world demand.',
    services: ['Cloud Platform Setup (AWS/GCP/Azure)', 'DevOps & Automation'],
    accent: '#80A9FF',
    mockup: (
      <div style={{ padding: 24, borderRadius: 16, background: 'rgba(26,86,219,0.06)', border: '1px solid rgba(77,134,245,0.15)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
          {[{ l: 'Uptime', v: '99.99%', c: '#4D86F5' }, { l: 'Deploy time', v: '< 3min', c: '#80A9FF' }, { l: 'Cost saved', v: '42%', c: '#4D86F5' }, { l: 'Auto-scale', v: 'Active', c: '#80A9FF' }].map(s => (
            <div key={s.l} style={{ padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: 10, color: '#7A7A7A', marginBottom: 3 }}>{s.l}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: s.c }}>{s.v}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: '#4D86F5', fontWeight: 600, padding: '8px 12px', background: 'rgba(26,86,219,0.08)', borderRadius: 8 }}>⬡ Infrastructure provisioned · 2m 47s</div>
      </div>
    ),
  },
  {
    Icon: Monitor,
    tag: 'Microsoft Services',
    tagline: 'Connected Microsoft ecosystems',
    href: '/solutions/microsoft-services',
    desc: 'We design, implement, and optimize Microsoft-powered business ecosystems — CRM, ERP, analytics, automation, and cloud — all working as one unified environment.',
    services: ['Microsoft CRM & ERP', 'Microsoft Automation & Analytics', 'Azure', 'SharePoint'],
    accent: '#4D86F5',
    mockup: (
      <div style={{ padding: 24, borderRadius: 16, background: 'rgba(26,86,219,0.06)', border: '1px solid rgba(77,134,245,0.15)' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
          {['CRM', 'ERP', 'Power BI', 'Azure', 'Teams'].map(t => (
            <span key={t} style={{ padding: '4px 10px', borderRadius: 6, background: 'rgba(26,86,219,0.12)', border: '1px solid rgba(77,134,245,0.2)', fontSize: 11, fontWeight: 600, color: '#80A9FF' }}>{t}</span>
          ))}
        </div>
        <div style={{ fontSize: 11, color: '#7A7A7A', lineHeight: 1.7 }}>Unified platform connecting CRM leads → ERP orders → Power BI dashboards. 360° visibility across the entire business lifecycle.</div>
      </div>
    ),
  },
  {
    Icon: Zap,
    tag: 'Salesforce Services',
    tagline: 'Salesforce built right',
    href: '/solutions/salesforce-services',
    desc: 'We design, implement, and optimize Salesforce ecosystems that help businesses manage customer relationships, automate operations, and scale engagement across channels.',
    services: ['Salesforce Support & Managed Services', 'Salesforce Implementation'],
    accent: '#80A9FF',
    mockup: (
      <div style={{ padding: 24, borderRadius: 16, background: 'rgba(26,86,219,0.06)', border: '1px solid rgba(77,134,245,0.15)' }}>
        {[{ stage: 'Lead', count: 124, color: '#7A7A7A' }, { stage: 'Qualified', count: 87, color: '#4D86F5' }, { stage: 'Proposal', count: 43, color: '#1A56DB' }, { stage: 'Won', count: 31, color: '#22c55e' }].map(s => (
          <div key={s.stage} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, display: 'inline-block' }} />
              <span style={{ fontSize: 12, color: '#A3A3A3' }}>{s.stage}</span>
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: s.color }}>{s.count}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    Icon: Code2,
    tag: 'Web & App Development',
    tagline: 'Products built to scale',
    href: '/solutions/web-app-development',
    desc: 'From web applications to mobile apps — we build fast, scalable, and beautiful digital products using modern tech stacks tailored to your business needs.',
    services: ['Web Application Development', 'Mobile App Development', 'Design & Quality'],
    accent: '#4D86F5',
    mockup: (
      <div style={{ padding: 24, borderRadius: 16, background: 'rgba(26,86,219,0.06)', border: '1px solid rgba(77,134,245,0.15)' }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57' }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e' }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840' }} />
        </div>
        {["const hero = buildHero({", "  ai: true, motion: true,", "  stack: ['Next.js','Tailwind'],", "});"].map((line, idx) => (
          <div key={idx} style={{ fontSize: 11, fontFamily: 'monospace', color: idx === 0 ? '#4D86F5' : idx === 3 ? '#22c55e' : '#80A9FF', lineHeight: 1.8 }}>{line}</div>
        ))}
      </div>
    ),
  },
];

const n = DOMAINS.length;
const VH_PER_CARD = 80;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function DomainCard({
  domain,
  i,
  scrollYProgress,
}: {
  domain: (typeof DOMAINS)[0];
  i: number;
  scrollYProgress: MotionValue<number>;
}) {
  const isEven = i % 2 === 0;
  const segStart = i / n;
  const segEnd   = (i + 1) / n;

  /* Smooth entry — card slides up from bottom */
  const yEntry = useTransform(
    scrollYProgress,
    [Math.max(0, segStart - 1 / n), segStart],
    i === 0 ? ['0%', '0%'] : ['100%', '0%'],
  );

  /* Previous card gently scales down and fades — no harsh cut */
  const scale = useTransform(
    scrollYProgress,
    [segEnd, Math.min(1, segEnd + 1 / n)],
    i < n - 1 ? [1, 0.96] : [1, 1],
  );
  const opacity = useTransform(
    scrollYProgress,
    [segEnd, Math.min(1, segEnd + 1 / n)],
    i < n - 1 ? [1, 0.92] : [1, 1],
  );

  const isAccent = i % 2 !== 0;

  return (
    <motion.div
      style={{
        position: 'absolute', inset: 0,
        zIndex: i + 1,
        y: yEntry, scale, opacity,
        transformOrigin: 'top center',
        background: 'var(--bg)',
        borderRadius: i === 0 ? 0 : 20,
        overflow: 'hidden',
      }}
      transition={{ ease: EASE }}
    >
      <NoiseOverlay />

      {/* Subtle left accent stripe for 2nd and 4th cards */}
      {isAccent && (
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
          background: 'linear-gradient(to bottom, #4D86F5, #1A56DB 60%, #0E2E75)',
          zIndex: 2,
        }} />
      )}

      {/* Blue gradient overlay for accent cards (2nd and 4th) */}
      {isAccent && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(26,86,219,0.10) 0%, rgba(77,134,245,0.06) 40%, transparent 75%)',
          zIndex: 0, pointerEvents: 'none',
        }} />
      )}

      {/* Large faded card number — bottom corner watermark */}
      <div style={{
        position: 'absolute',
        bottom: 12, right: 32,
        fontSize: 'clamp(140px,20vw,260px)',
        fontWeight: 900,
        letterSpacing: '-0.06em',
        lineHeight: 1,
        color: domain.accent,
        opacity: 0.13,
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 0,
      }}>
        {String(i + 1).padStart(2, '0')}
      </div>

      {/* Content */}
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: 'clamp(40px,8vh,96px)', position: 'relative', zIndex: 1 }}>

        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="sol-row">
            <div style={{ order: isEven ? 1 : 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(26,86,219,0.14)', border: '1px solid rgba(77,134,245,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <domain.Icon size={19} color={domain.accent} strokeWidth={1.5} />
                </div>
                <span style={{
                  fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: domain.accent,
                  background: `rgba(${domain.accent === '#4D86F5' ? '77,134,245' : '128,169,255'},0.12)`,
                  border: `1px solid ${domain.accent}40`,
                  padding: '5px 14px', borderRadius: 999,
                }}>
                  {domain.tag}
                </span>
              </div>
              <h3 style={{ fontSize: 'clamp(24px,3vw,40px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--fg)', marginBottom: 12, lineHeight: 1.1 }}>
                {domain.tagline}
              </h3>
              <p style={{ fontSize: 15, color: 'var(--fg-3)', lineHeight: 1.75, marginBottom: 22, maxWidth: 440 }}>
                {domain.desc}
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
                {domain.services.map(s => (
                  <li key={s} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--fg-2)' }}>
                    <span style={{ width: 17, height: 17, borderRadius: '50%', background: 'rgba(26,86,219,0.12)', border: '1px solid rgba(77,134,245,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: domain.accent, flexShrink: 0 }}>✓</span>
                    {s}
                  </li>
                ))}
              </ul>
              <Link href={domain.href} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#1A56DB', color: '#fff', fontSize: 13, fontWeight: 700, borderRadius: 10,
                padding: '11px 20px', textDecoration: 'none', boxShadow: '0 4px 18px rgba(26,86,219,0.32)',
                transition: 'background 0.2s, transform 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0E2E75'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1A56DB'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}>
                Learn More <ArrowRight size={13} strokeWidth={2} />
              </Link>
            </div>
            <div style={{ order: isEven ? 2 : 1 }}>
              <div className="sol-mockup" style={{ padding: 28, borderRadius: 20, boxShadow: '0 20px 56px rgba(26,86,219,0.12)', border: '1px solid var(--card-border)' }}>
                {domain.mockup}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SolutionsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });

  return (
    /* Outer section bg matches card bg — no black gaps ever */
    <section style={{ background: 'var(--bg)', position: 'relative' }}>

      {/* Static header — sits above the sticky scroll */}
      <div style={{ paddingTop: 88, paddingBottom: 56, textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div className="section-badge" style={{ display: 'inline-flex', marginBottom: 16 }}>Our Solutions</div>
          <h2 style={{ fontSize: 'clamp(32px,4vw,56px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, color: 'var(--fg)', marginBottom: 14 }}>
            Everything your business{' '}
            <span style={{ background: 'linear-gradient(120deg,#4D86F5 0%,#80A9FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              needs to grow.
            </span>
          </h2>
          <p style={{ fontSize: 16, color: 'var(--fg-3)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>
            Five specialized practices — data, cloud, Microsoft, Salesforce, and custom development — delivered by one unified team.
          </p>
        </div>
      </div>

      <div ref={scrollRef} style={{ height: `${n * VH_PER_CARD}vh`, position: 'relative' }}>
        <div className="sol-sticky" style={{
          position: 'sticky', top: 88,
          height: 'calc(100vh - 88px)',
          /* bg matches cards so nothing shows through */
          background: 'var(--bg)',
          overflow: 'hidden',
        }}>
          {DOMAINS.map((domain, i) => (
            <DomainCard key={domain.tag} domain={domain} i={i} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>

      <style>{`
        .sol-mockup { background: rgba(255,255,255,0.92); border: 1px solid rgba(0,0,0,0.08) !important; }
        .dark .sol-mockup { background: rgba(17,24,40,0.85); border-color: rgba(77,134,245,0.14) !important; }
        @media(max-width:768px){
          .sol-row{grid-template-columns:1fr!important;gap:28px!important}
          .sol-row>div{order:unset!important}
          .sol-sticky{top:76px!important;height:calc(100vh - 76px)!important}
        }
        @media(max-width:480px){
          .sol-row{gap:20px!important}
        }
      `}</style>
    </section>
  );
}
