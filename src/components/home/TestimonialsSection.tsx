'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import NoiseOverlay from '@/components/ui/NoiseOverlay';

const TESTIMONIALS = [
  {
    name: 'Saurabh Tripathi',
    role: 'Manager',
    company: 'Supersourcing',
    quote: 'MoreYeahs has been a dependable recruitment partner, delivering high-quality DevOps and AI/ML talent with speed and precision. Their strong understanding of technology needs and structured approach consistently ensures top-tier candidate delivery. We value them as a trusted partner and highly recommend their reliable, quality-driven talent solutions.',
    rating: 5, initial: 'ST', accent: '#4D86F5',
  },
  {
    name: 'Collin C.',
    role: 'Founder',
    company: 'Terrasecure',
    quote: 'We partnered with MoreYeahs on a complex project and had a very positive experience. The team showed strong technical expertise, clear communication, and a solid understanding of our objectives, while remaining responsive and proactive throughout. We would confidently recommend MoreYeahs and look forward to working with them again.',
    rating: 5, initial: 'CC', accent: '#80A9FF',
  },
  {
    name: 'Abhinav Reddy',
    role: 'Head of Account Management',
    company: 'Flyersoft',
    quote: 'MoreYeahs has been a dependable partner, consistently providing strong Microsoft Dynamics 365 support. Their proactive approach and seamless coordination ensured smooth delivery. We value the partnership and look forward to continuing in 2026.',
    rating: 5, initial: 'AR', accent: '#4D86F5',
  },
  {
    name: 'Andrew Davidson',
    role: 'Senior CRM Manager',
    company: 'Prometheus Agency',
    quote: 'MoreYeahs has consistently delivered exceptional results, successfully handling highly complex integrations involving large datasets and multiple relationships. Over the past two years, the team has demonstrated strong technical expertise, reliability, and a professional approach to development. Their positive attitude and commitment make them a valuable partner and a pleasure to work with.',
    rating: 5, initial: 'AD', accent: '#80A9FF',
  },
  {
    name: 'Pallavi Ojha',
    role: 'HR-Operations Manager',
    company: 'DevLabs Technology',
    quote: 'We at DevLabs Technology are pleased with our association with MoreYeahs. As an IT staffing partner, they have been consistently supporting us by providing quality bench resources aligned with our project requirements. The profiles shared are well-screened and technically competent, enabling us to deploy them smoothly into our ongoing projects.',
    rating: 5, initial: 'PO', accent: '#4D86F5',
  },
];

const LOOP = [...TESTIMONIALS, ...TESTIMONIALS];

const STATS = [
  { value: '200+', label: 'Projects Delivered' },
  { value: '94%',  label: 'Client Satisfaction' },
  { value: '10+',  label: 'Countries Served' },
];

export default function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pause  = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused'; };
  const resume = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running'; };

  return (
    <section style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden', padding: '100px 0' }}>
      <NoiseOverlay />
      <div className="blob" style={{ width: 480, height: 480, top: '5%', right: '-8%', background: 'radial-gradient(circle, rgba(26,86,219,0.10), transparent 68%)' }} />
      <div className="blob" style={{ width: 360, height: 360, bottom: '5%', left: '-6%', background: 'radial-gradient(circle, rgba(10,31,79,0.28), transparent 68%)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="test-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(40px, 6vw, 88px)',
          alignItems: 'center',
        }}>

          {/* â”€â”€ LEFT: sticky heading + stats â”€â”€ */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="section-badge" style={{ marginBottom: 18 }}>Client Stories</div>
            <h2 style={{
              fontSize: 'clamp(26px,3.2vw,42px)', fontWeight: 800,
              letterSpacing: '-0.03em', color: 'var(--fg)', lineHeight: 1.1, marginBottom: 18,
            }}>
              What Our<br />Clients <span className="grad">Say</span>
            </h2>
            <p style={{ fontSize: 15, color: 'var(--fg-3)', lineHeight: 1.72, maxWidth: 300, marginBottom: 36 }}>
              Real results from real partnerships â€” here&apos;s what the teams we&apos;ve worked with have to say.
            </p>

            {/* Stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '14px 20px',
                    background: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    borderRadius: 14,
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                  }}
                >
                  <span style={{
                    fontSize: 'clamp(22px,2.4vw,30px)', fontWeight: 800,
                    letterSpacing: '-0.03em', color: '#1A56DB', lineHeight: 1,
                  }}>
                    {s.value}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--fg-3)', fontWeight: 500 }}>{s.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* â”€â”€ RIGHT: vertical auto-scroll column â”€â”€ */}
          <div
            className="test-right"
            style={{
              height: 580,
              overflow: 'hidden',
              position: 'relative',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
            }}
          >
            <div
              ref={trackRef}
              onMouseEnter={pause}
              onMouseLeave={resume}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                animation: 'verticalTicker 38s linear infinite',
              }}
            >
              {LOOP.map((t, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderRadius: 16,
                    padding: '22px 22px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                    cursor: 'default',
                  }}
                >
                  {/* Top: quote icon + stars */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Quote size={18} color={t.accent} strokeWidth={1.5} style={{ opacity: 0.7 }} />
                    <div style={{ display: 'flex', gap: 2 }}>
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} size={11} fill={t.accent} color={t.accent} strokeWidth={0} />
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <p style={{ fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.72, flex: 1 }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                      background: `rgba(${t.accent === '#4D86F5' ? '77,134,245' : '128,169,255'}, 0.15)`,
                      border: `1px solid ${t.accent}44`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 800, color: t.accent,
                    }}>
                      {t.initial}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)' }}>{t.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--fg-3)' }}>{t.role}, {t.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes verticalTicker {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @media(max-width:900px){
          .test-grid  { grid-template-columns: 1fr !important; gap: 48px !important; }
          .test-right { height: 420px !important; }
        }
        @media(max-width:480px){
          .test-right { height: 360px !important; }
        }
      `}</style>
    </section>
  );
}
