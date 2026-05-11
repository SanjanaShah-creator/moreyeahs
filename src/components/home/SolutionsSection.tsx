'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue, AnimatePresence } from 'framer-motion';
import { Brain, Cloud, Monitor, Zap, Code2, ArrowRight, Cpu, Eye, Database, Wifi, Server, GitBranch, BarChart2, Share2, Settings, Layers, Smartphone, Palette } from 'lucide-react';
import Link from 'next/link';
import NoiseOverlay from '@/components/ui/NoiseOverlay';

const DOMAINS = [
  {
    Icon: Brain,
    tag: 'Data Science & AI',
    tagline: 'From raw data to decisions',
    href: '/solutions/data-science',
    desc: 'We help organizations harness AI, machine learning, and data engineering to uncover patterns, predict outcomes, and drive smarter decision-making at scale.',
    accent: '#4D86F5',
    serviceCards: [
      { Icon: Cpu,      name: 'AI & Machine Learning',   desc: 'Predictive models & intelligent automation.' },
      { Icon: Eye,      name: 'Computer Vision',          desc: 'Real-time image & video analysis.' },
      { Icon: Database, name: 'Data Infrastructure',      desc: 'Scalable pipelines & data warehousing.' },
      { Icon: Wifi,     name: 'IoT & Connected Systems',  desc: 'Device connectivity & edge analytics.' },
    ],
    mockup: (
      <div style={{ display: 'flex', gap: 20, alignItems: 'stretch' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { label: 'Model Accuracy', pct: 94, color: '#4D86F5' },
            { label: 'Data Processed', pct: 78, color: '#80A9FF' },
            { label: 'Cost Reduction', pct: 61, color: '#1A56DB' },
          ].map(m => (
            <div key={m.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--fg-3)', marginBottom: 6 }}>
                <span>{m.label}</span>
                <span style={{ color: m.color, fontWeight: 700 }}>{m.pct}%</span>
              </div>
              <div style={{ height: 6, background: 'var(--card-border)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${m.pct}%`, height: '100%', background: m.color, borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{
          width: 150,
          background: 'rgba(26,86,219,0.14)',
          border: '1px solid rgba(77,134,245,0.22)',
          borderRadius: 16,
          padding: '20px 16px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8,
        }}>
          <div style={{ fontSize: 12, color: 'var(--fg-3)' }}>Live accuracy</div>
          <div style={{ fontSize: 36, fontWeight: 900, color: '#4D86F5', lineHeight: 1 }}>94.2%</div>
          <div style={{ fontSize: 11, color: '#80A9FF', fontWeight: 600 }}>✦ Model deployed</div>
        </div>
      </div>
    ),
  },
  {
    Icon: Cloud,
    tag: 'Cloud & Infrastructure',
    tagline: 'Scalable, reliable, automated',
    href: '/solutions/cloud-infrastructure',
    desc: 'We engineer cloud-native platforms that form the backbone of modern digital products — fast, secure, and built for real-world demand.',
    accent: '#80A9FF',
    serviceCards: [
      { Icon: Server,    name: 'Cloud Platform Setup',  desc: 'AWS, GCP & Azure architecture.' },
      { Icon: GitBranch, name: 'DevOps & Automation',   desc: 'CI/CD pipelines & infrastructure as code.' },
    ],
    mockup: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
          {[
            { l: 'Uptime',      v: '99.99%', c: '#4D86F5' },
            { l: 'Deploy',      v: '< 3min',  c: '#80A9FF' },
            { l: 'Cost saved',  v: '42%',     c: '#4D86F5' },
            { l: 'Auto-scale',  v: 'Active',  c: '#22c55e' },
          ].map(s => (
            <div key={s.l} style={{
              padding: '18px 14px', borderRadius: 14,
              background: 'var(--bg-2)',
              border: '1px solid var(--card-border)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 12, color: 'var(--fg-3)', marginBottom: 8 }}>{s.l}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: s.c }}>{s.v}</div>
            </div>
          ))}
        </div>
        <div style={{
          padding: '10px 16px', borderRadius: 10,
          background: 'rgba(128,169,255,0.06)',
          border: '1px solid rgba(128,169,255,0.12)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: 'var(--fg-3)' }}>All systems operational</span>
          <span style={{ marginLeft: 'auto', fontSize: 12, color: '#22c55e', fontWeight: 600 }}>100% healthy</span>
        </div>
      </div>
    ),
  },
  {
    Icon: Monitor,
    tag: 'Microsoft Services',
    tagline: 'Connected Microsoft ecosystems',
    href: '/solutions/microsoft-services',
    desc: 'We design, implement, and optimize Microsoft-powered business ecosystems — CRM, ERP, analytics, automation, and cloud — all working as one unified environment.',
    accent: '#4D86F5',
    serviceCards: [
      { Icon: BarChart2, name: 'Microsoft CRM & ERP',     desc: 'Dynamics 365 & business process automation.' },
      { Icon: Settings,  name: 'Automation & Analytics',  desc: 'Power Platform & Power BI solutions.' },
      { Icon: Cloud,     name: 'Azure',                   desc: 'Cloud infrastructure & AI services.' },
      { Icon: Share2,    name: 'SharePoint',              desc: 'Collaboration & document management.' },
    ],
    mockup: (
      <div style={{ display: 'flex', gap: 12 }}>
        {[
          { label: 'CRM',      icon: '👥', value: '124', unit: 'leads',   color: '#4D86F5' },
          { label: 'ERP',      icon: '📦', value: '87',  unit: 'orders',  color: '#80A9FF' },
          { label: 'Power BI', icon: '📊', value: '43',  unit: 'reports', color: '#1A56DB' },
        ].map(col => (
          <div key={col.label} style={{
            flex: 1, borderRadius: 14,
            background: 'var(--bg-2)',
            border: '1px solid var(--card-border)',
            padding: '18px 14px',
            display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            <div style={{ fontSize: 22 }}>{col.icon}</div>
            <div style={{ fontSize: 12, color: 'var(--fg-3)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{col.label}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: col.color, lineHeight: 1 }}>{col.value}</div>
            <div style={{ fontSize: 12, color: 'var(--fg-3)' }}>{col.unit}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    Icon: Zap,
    tag: 'Salesforce Services',
    tagline: 'Salesforce built right',
    href: '/solutions/salesforce-services',
    desc: 'We design, implement, and optimize Salesforce ecosystems that help businesses manage customer relationships, automate operations, and scale engagement across channels.',
    accent: '#80A9FF',
    serviceCards: [
      { Icon: Settings, name: 'Managed Services',  desc: 'Ongoing support & platform optimization.' },
      { Icon: Layers,   name: 'Implementation',    desc: 'End-to-end Salesforce deployment.' },
    ],
    mockup: (
      <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {[
            { stage: 'Lead',      count: 124, pct: 100, color: '#555' },
            { stage: 'Qualified', count: 87,  pct: 70,  color: '#4D86F5' },
            { stage: 'Proposal',  count: 43,  pct: 35,  color: '#1A56DB' },
            { stage: 'Won',       count: 31,  pct: 25,  color: '#22c55e' },
          ].map(s => (
            <div key={s.stage} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '11px 0',
              borderBottom: '1px solid var(--card-border)',
            }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
              <span style={{ fontSize: 14, color: 'var(--fg-2)', flex: 1 }}>{s.stage}</span>
              <div style={{ width: 90, height: 5, background: 'var(--card-border)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: `${s.pct}%`, height: '100%', background: s.color, borderRadius: 2 }} />
              </div>
              <span style={{ fontSize: 15, fontWeight: 700, color: s.color, minWidth: 32, textAlign: 'right' }}>{s.count}</span>
            </div>
          ))}
        </div>
        <div style={{
          width: 110,
          background: 'rgba(128,169,255,0.08)',
          border: '1px solid rgba(128,169,255,0.18)',
          borderRadius: 16,
          padding: '16px 14px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 11, color: 'var(--fg-3)', marginBottom: 6 }}>Pipeline</div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#80A9FF', lineHeight: 1 }}>3×</div>
          <div style={{ fontSize: 11, color: '#80A9FF', marginTop: 4 }}>increase</div>
        </div>
      </div>
    ),
  },
  {
    Icon: Code2,
    tag: 'Web & App Development',
    tagline: 'Products built to scale',
    href: '/solutions/web-app-development',
    desc: 'From web applications to mobile apps — we build fast, scalable, and beautiful digital products using modern tech stacks tailored to your business needs.',
    accent: '#4D86F5',
    serviceCards: [
      { Icon: Code2,      name: 'Web Application Dev', desc: 'Next.js, React & full-stack solutions.' },
      { Icon: Smartphone, name: 'Mobile App Dev',       desc: 'iOS & Android native & cross-platform.' },
      { Icon: Palette,    name: 'Design & Quality',     desc: 'UI/UX design & QA testing.' },
    ],
    mockup: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
        </div>
        <div style={{ background: 'var(--bg-2)', borderRadius: 10, padding: '16px 18px' }}>
          {[
            { text: "export default function Hero() {",  color: '#4D86F5' },
            { text: "  const { data } = useAI();",       color: '#80A9FF' },
            { text: "  return (",                         color: 'var(--fg-3)' },
            { text: "    <Section motion animate>",       color: '#80A9FF' },
            { text: "      <Headline>{data.title}</Headline>", color: '#22c55e' },
            { text: "    </Section>",                    color: '#80A9FF' },
            { text: "  );",                              color: 'var(--fg-3)' },
            { text: "}",                                 color: '#4D86F5' },
          ].map((line, idx) => (
            <div key={idx} style={{ fontSize: 13, fontFamily: 'monospace', color: line.color, lineHeight: 1.8 }}>{line.text}</div>
          ))}
        </div>
      </div>
    ),
  },
];

const n = DOMAINS.length;
const VH_PER_CARD = 120;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── 3D rising mockup panel ── */
function MockupPanel({ domain, cardKey }: { domain: typeof DOMAINS[0]; cardKey: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={cardKey}
        initial={{ rotateX: 35, y: 60, opacity: 0, scale: 0.94 }}
        animate={{ rotateX: 6, y: 0, opacity: 1, scale: 1 }}
        exit={{ rotateX: -8, y: -16, opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.65, ease: EASE }}
        style={{ transformStyle: 'preserve-3d', transformOrigin: 'bottom center', width: '100%' }}
      >
        {/* Browser chrome */}
        <div style={{
          background: 'var(--bg-2)',
          borderRadius: '20px 20px 0 0',
          padding: '11px 18px',
          display: 'flex', alignItems: 'center', gap: 8,
          border: '1px solid var(--card-border)',
          borderBottom: '1px solid var(--card-border)',
        }}>
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
          <div style={{
            flex: 1, marginLeft: 10, height: 24, borderRadius: 6,
            background: 'var(--bg)', border: '1px solid var(--card-border)',
            display: 'flex', alignItems: 'center', paddingLeft: 12,
            fontSize: 12, color: 'var(--fg-3)',
          }}>
            moreyeahs.com/solutions/{domain.href.split('/').pop()}
          </div>
        </div>

        {/* Content — extra bottom padding so content stays visible above bottom navbar */}
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderTop: 'none',
          borderRadius: 0,
          padding: '24px 28px 200px',
          boxShadow: '0 -8px 40px rgba(26,86,219,0.08)',
        }}>
          {domain.mockup}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Individual domain card ── */
function DomainCard({
  domain,
  i,
  scrollYProgress,
}: {
  domain: typeof DOMAINS[0];
  i: number;
  scrollYProgress: MotionValue<number>;
}) {
  const segStart = i / n;
  const segEnd = (i + 1) / n;

  const yEntry = useTransform(
    scrollYProgress,
    [Math.max(0, segStart - 1 / n), segStart],
    i === 0 ? ['0%', '0%'] : ['100%', '0%'],
  );
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
  const cols = domain.serviceCards.length === 2 ? 2 : domain.serviceCards.length === 3 ? 3 : 2;

  return (
    <motion.div
      style={{
        position: 'absolute', inset: 0,
        zIndex: i + 1,
        y: yEntry, scale, opacity,
        transformOrigin: 'top center',
        background: 'var(--bg)',
        borderRadius: 0,
        overflow: 'hidden',
      }}
      transition={{ ease: EASE }}
    >
      <NoiseOverlay />

      {isAccent && (
        <>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: 'linear-gradient(to bottom, #4D86F5, #1A56DB 60%, #0E2E75)', zIndex: 2 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(26,86,219,0.08) 0%, rgba(77,134,245,0.04) 40%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />
        </>
      )}

      {/* Radial glow */}
      <div style={{
        position: 'absolute',
        top: '-30%', [isAccent ? 'right' : 'left']: '-15%',
        width: '60vw', height: '60vw',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${domain.accent}15 0%, transparent 60%)`,
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Watermark */}
      <div className="sol-watermark" style={{
        position: 'absolute', bottom: 0, right: 24,
        fontSize: 'clamp(120px,18vw,220px)', fontWeight: 900,
        letterSpacing: '-0.06em', lineHeight: 1,
        color: domain.accent, opacity: 0.05,
        userSelect: 'none', pointerEvents: 'none', zIndex: 0,
      }}>
        {String(i + 1).padStart(2, '0')}
      </div>

      {/* ── LAYOUT: left padding | content | right padding ── */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        padding: '0 clamp(16px,3vw,60px)',
        zIndex: 1,
      }}>

        {/* ── TOP: pill + heading + desc + service cards + CTA ── */}
        <div className="sol-text-area" style={{
          flex: '0 0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          paddingTop: 'clamp(72px,9vh,100px)',
        }}>
          {/* Pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '7px 20px', borderRadius: 999,
            background: `rgba(${domain.accent === '#4D86F5' ? '77,134,245' : '128,169,255'},0.10)`,
            border: `1px solid ${domain.accent}35`,
            marginBottom: 16,
          }}>
            <domain.Icon size={13} color={domain.accent} strokeWidth={2} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: domain.accent }}>
              {domain.tag}
            </span>
          </div>

          {/* Heading */}
          <h3 style={{
            fontSize: 'clamp(30px,4vw,58px)', fontWeight: 800,
            letterSpacing: '-0.03em', color: 'var(--fg)',
            marginBottom: 16, lineHeight: 1.1, maxWidth: 900,
          }}>
            {domain.tagline}
          </h3>

          {/* Desc */}
          <p style={{
            fontSize: 'clamp(14px,1.05vw,17px)', color: 'var(--fg-3)',
            lineHeight: 1.8, marginBottom: 16, maxWidth: 780,
          }}>
            {domain.desc}
          </p>

          {/* ── Glass service cards grid ── */}
          <div className="sol-services" style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: 12,
            width: '100%',
            maxWidth: 900,
            marginBottom: 28,
          }}>
            {domain.serviceCards.map(sc => (
              <div key={sc.name} style={{
                padding: '16px 18px',
                borderRadius: 14,
                background: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10), 0 4px 16px rgba(0,0,0,0.15)',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 8,
                    background: `${domain.accent}18`,
                    border: `1px solid ${domain.accent}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <sc.Icon size={14} color={domain.accent} strokeWidth={2} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)', lineHeight: 1.2 }}>{sc.name}</span>
                </div>
                <p className="sol-service-desc" style={{ fontSize: 12, color: 'var(--fg-3)', lineHeight: 1.5, margin: 0 }}>{sc.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA — bordered style */}
          <Link
            href={domain.href}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'transparent',
              border: `1px solid ${domain.accent}60`,
              color: domain.accent,
              fontSize: 'clamp(13px,0.95vw,15px)', fontWeight: 700,
              borderRadius: 12,
              padding: 'clamp(11px,1vw,13px) clamp(20px,1.5vw,28px)',
              textDecoration: 'none',
              transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = `${domain.accent}15`;
              el.style.borderColor = domain.accent;
              el.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'transparent';
              el.style.borderColor = `${domain.accent}60`;
              el.style.transform = 'none';
            }}
          >
            Explore {domain.tag} <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>

        {/* ── BOTTOM: 3D mockup — 48px gap from CTA ── */}
        <div className="sol-mockup-area" style={{
          flex: 1,
          display: 'flex',
          alignItems: 'flex-end',
          perspective: '1400px',
          perspectiveOrigin: '50% 80%',
          overflow: 'visible',
          paddingTop: 48,
        }}>
          <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto' }}>
            <MockupPanel domain={domain} cardKey={`mockup-${i}`} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main export ── */
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
          position: 'sticky', top: 0,
          height: '100vh',
          background: 'var(--bg)',
          overflow: 'hidden',
        }}>
          {DOMAINS.map((domain, i) => (
            <DomainCard key={domain.tag} domain={domain} i={i} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .sol-text-area {
            align-items: flex-start !important;
            text-align: left !important;
            padding-top: calc(76px + var(--ann-h,0px) + 12px) !important;
          }
          .sol-services { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
          .sol-services > div { padding: 12px 14px !important; }
          .sol-service-desc { display: none !important; }
          .sol-watermark { display: none !important; }
          .sol-sticky {
            top: calc(76px + var(--ann-h,0px)) !important;
            height: calc(100vh - 76px - var(--ann-h,0px)) !important;
            overflow-y: auto !important;
          }
          .sol-mockup-area { display: none !important; }
        }
        @media(max-width:480px){
          .sol-services { grid-template-columns: 1fr !important; }
          .sol-text-area {
            padding-top: calc(76px + var(--ann-h,0px) + 8px) !important;
          }
        }
      `}</style>
    </section>
  );
}
