'use client';

import { useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, MotionValue, useMotionValue, useSpring } from 'framer-motion';
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
    services: ['Cloud Platform Setup (AWS/GCP)', 'DevOps & Automation', 'Security & Compliance', 'Infrastructure as Code'],
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
    services: ['Microsoft CRM & ERP', 'Microsoft Automation & Analytics', 'Microsoft Cloud & Collaboration', 'Power Platform'],
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
    services: ['Salesforce Implementation', 'Salesforce Support & Managed Services', 'Salesforce CPQ', 'AppExchange Solutions'],
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
    services: ['Web Application Development', 'Mobile App Development', 'Design & Quality Assurance', 'API & Backend Engineering'],
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

/* ─────────────────────────────────────────────────────────────────────
   MeshGradient
   • A 200%×200% background with 4 radial colour stops
   • Auto-animates via CSS keyframes (slow drift)
   • Cursor nudges the background-position via spring motion values
   ───────────────────────────────────────────────────────────────────── */
function MeshGradient({ idx }: { idx: number }) {
  /* Cursor position as 0-1 fractions */
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);

  /* Gentle spring — feels like the gradient is floating */
  const springX = useSpring(rawX, { stiffness: 40, damping: 25, mass: 1.5 });
  const springY = useSpring(rawY, { stiffness: 40, damping: 25, mass: 1.5 });

  /* Map 0-1 → a small nudge range: -8% to +8% around 50% */
  const bgX = useTransform(springX, [0, 1], ['42%', '58%']);
  const bgY = useTransform(springY, [0, 1], ['42%', '58%']);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width);
    rawY.set((e.clientY - r.top)  / r.height);
  }, [rawX, rawY]);

  return (
    <motion.div
      onMouseMove={onMouseMove}
      className={`sol-mesh-grad sol-mesh-grad-${idx}`}
      style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundSize: '200% 200%',
        backgroundPositionX: bgX,
        backgroundPositionY: bgY,
      }}
    />
  );
}

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

  const yEntry = useTransform(
    scrollYProgress,
    [Math.max(0, segStart - 1 / n), segStart],
    i === 0 ? ['0%', '0%'] : ['100%', '0%'],
  );
  const scale = useTransform(
    scrollYProgress,
    [segEnd, Math.min(1, segEnd + 1 / n)],
    i < n - 1 ? [1, 0.94] : [1, 1],
  );
  const opacity = useTransform(
    scrollYProgress,
    [segEnd, Math.min(1, segEnd + 1 / n)],
    i < n - 1 ? [1, 0.85] : [1, 1],
  );

  return (
    <motion.div
      style={{
        position: 'absolute', inset: 0,
        zIndex: i + 1,
        y: yEntry, scale, opacity,
        transformOrigin: 'top center',
        background: 'var(--bg)',
        borderRadius: i === 0 ? 0 : 16,
        overflow: 'hidden',
      }}
    >
      {/* Mesh gradient — auto-animates + cursor-reactive */}
      <MeshGradient idx={i} />
      <NoiseOverlay />

      {/* Content */}
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ position: 'absolute', top: 24, left: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="section-badge" style={{ marginBottom: 0 }}>Our Solutions</div>
          <span style={{ fontSize: 12, color: 'var(--fg-3)', fontWeight: 500 }}>
            {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
          </span>
        </div>

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
    <section style={{ background: 'var(--bg)', position: 'relative' }}>
      <div ref={scrollRef} style={{ height: `${n * VH_PER_CARD}vh`, position: 'relative' }}>
        <div className="sol-sticky" style={{
          position: 'sticky', top: 88,
          height: 'calc(100vh - 88px)',
          overflow: 'hidden',
        }}>
          {DOMAINS.map((domain, i) => (
            <DomainCard key={domain.tag} domain={domain} i={i} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>

      <style>{`
        /* ── Mesh gradient: 4 radial stops on a 200×200% canvas ──
           Light theme: soft blue-to-white tones, not too dark
           Dark theme:  richer blues
           Auto-drifts via keyframe; cursor nudges via motion value
        ── */

        .sol-mesh-grad {
          pointer-events: none;
          background-image:
            radial-gradient(ellipse 40% 35% at 20% 20%, #c8d9ff 0%, transparent 100%),
            radial-gradient(ellipse 35% 40% at 80% 80%, #b3c9ff 0%, transparent 100%),
            radial-gradient(ellipse 30% 30% at 60% 10%, #dce8ff 0%, transparent 100%),
            radial-gradient(ellipse 28% 32% at 10% 80%, #e8f0ff 0%, transparent 100%);
          animation: meshDrift 18s ease-in-out infinite;
        }

        /* Each card: slightly different colour mix + animation phase */
        .sol-mesh-grad-0 {
          background-image:
            radial-gradient(ellipse 38% 32% at 15% 25%, #b8d0ff 0%, transparent 100%),
            radial-gradient(ellipse 32% 38% at 85% 75%, #c5daff 0%, transparent 100%),
            radial-gradient(ellipse 28% 25% at 55% 5%,  #dce8ff 0%, transparent 100%),
            radial-gradient(ellipse 24% 28% at 5%  85%, #e4eeff 0%, transparent 100%);
          animation-delay: 0s;
        }
        .sol-mesh-grad-1 {
          background-image:
            radial-gradient(ellipse 35% 38% at 80% 20%, #c0d5ff 0%, transparent 100%),
            radial-gradient(ellipse 38% 30% at 10% 80%, #b0c8ff 0%, transparent 100%),
            radial-gradient(ellipse 28% 32% at 50% 90%, #d8e6ff 0%, transparent 100%),
            radial-gradient(ellipse 26% 26% at 90% 50%, #e0ebff 0%, transparent 100%);
          animation-delay: -4s;
        }
        .sol-mesh-grad-2 {
          background-image:
            radial-gradient(ellipse 32% 35% at 50% 10%, #bdd3ff 0%, transparent 100%),
            radial-gradient(ellipse 35% 32% at 5%  60%, #cad9ff 0%, transparent 100%),
            radial-gradient(ellipse 30% 28% at 90% 85%, #b8ccff 0%, transparent 100%),
            radial-gradient(ellipse 26% 30% at 60% 50%, #e2ecff 0%, transparent 100%);
          animation-delay: -8s;
        }
        .sol-mesh-grad-3 {
          background-image:
            radial-gradient(ellipse 38% 30% at 10% 10%, #c2d6ff 0%, transparent 100%),
            radial-gradient(ellipse 30% 38% at 90% 90%, #b5caff 0%, transparent 100%),
            radial-gradient(ellipse 32% 28% at 70% 30%, #d5e4ff 0%, transparent 100%),
            radial-gradient(ellipse 26% 32% at 20% 70%, #e0eaff 0%, transparent 100%);
          animation-delay: -12s;
        }
        .sol-mesh-grad-4 {
          background-image:
            radial-gradient(ellipse 35% 32% at 30% 80%, #bfd4ff 0%, transparent 100%),
            radial-gradient(ellipse 32% 35% at 75% 15%, #c8daff 0%, transparent 100%),
            radial-gradient(ellipse 28% 30% at 5%  30%, #d0e0ff 0%, transparent 100%),
            radial-gradient(ellipse 26% 28% at 85% 60%, #e4eeff 0%, transparent 100%);
          animation-delay: -16s;
        }

        /* Dark theme — same positions, richer blues */
        .dark .sol-mesh-grad-0 {
          background-image:
            radial-gradient(ellipse 38% 32% at 15% 25%, #1A56DB 0%, transparent 100%),
            radial-gradient(ellipse 32% 38% at 85% 75%, #0E2E75 0%, transparent 100%),
            radial-gradient(ellipse 28% 25% at 55% 5%,  #4D86F5 0%, transparent 100%),
            radial-gradient(ellipse 24% 28% at 5%  85%, #0A1F4F 0%, transparent 100%);
        }
        .dark .sol-mesh-grad-1 {
          background-image:
            radial-gradient(ellipse 35% 38% at 80% 20%, #4D86F5 0%, transparent 100%),
            radial-gradient(ellipse 38% 30% at 10% 80%, #1A56DB 0%, transparent 100%),
            radial-gradient(ellipse 28% 32% at 50% 90%, #0E2E75 0%, transparent 100%),
            radial-gradient(ellipse 26% 26% at 90% 50%, #80A9FF 0%, transparent 100%);
        }
        .dark .sol-mesh-grad-2 {
          background-image:
            radial-gradient(ellipse 32% 35% at 50% 10%, #1A56DB 0%, transparent 100%),
            radial-gradient(ellipse 35% 32% at 5%  60%, #4D86F5 0%, transparent 100%),
            radial-gradient(ellipse 30% 28% at 90% 85%, #0E2E75 0%, transparent 100%),
            radial-gradient(ellipse 26% 30% at 60% 50%, #80A9FF 0%, transparent 100%);
        }
        .dark .sol-mesh-grad-3 {
          background-image:
            radial-gradient(ellipse 38% 30% at 10% 10%, #0E2E75 0%, transparent 100%),
            radial-gradient(ellipse 30% 38% at 90% 90%, #1A56DB 0%, transparent 100%),
            radial-gradient(ellipse 32% 28% at 70% 30%, #4D86F5 0%, transparent 100%),
            radial-gradient(ellipse 26% 32% at 20% 70%, #80A9FF 0%, transparent 100%);
        }
        .dark .sol-mesh-grad-4 {
          background-image:
            radial-gradient(ellipse 35% 32% at 30% 80%, #4D86F5 0%, transparent 100%),
            radial-gradient(ellipse 32% 35% at 75% 15%, #1A56DB 0%, transparent 100%),
            radial-gradient(ellipse 28% 30% at 5%  30%, #0E2E75 0%, transparent 100%),
            radial-gradient(ellipse 26% 28% at 85% 60%, #80A9FF 0%, transparent 100%);
        }

        /* Auto-drift: slowly shifts the 200×200% canvas */
        @keyframes meshDrift {
          0%   { background-position: 20% 20%, 80% 80%, 55% 5%,  5%  85%; }
          25%  { background-position: 35% 10%, 65% 90%, 70% 20%, 20% 70%; }
          50%  { background-position: 60% 40%, 40% 60%, 30% 70%, 75% 30%; }
          75%  { background-position: 25% 70%, 75% 30%, 80% 40%, 40% 60%; }
          100% { background-position: 20% 20%, 80% 80%, 55% 5%,  5%  85%; }
        }

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
