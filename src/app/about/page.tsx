'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Heart, Award, ArrowRight, Users, Globe, Calendar, Layers } from 'lucide-react';
import Link from 'next/link';
import NoiseOverlay from '@/components/ui/NoiseOverlay';

const FV = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const FT = { duration: 0.6 };
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const VALUES = [
  {
    Icon: Lightbulb,
    title: 'Innovation First',
    desc: 'We challenge convention and embrace emerging technologies to build the future.',
  },
  {
    Icon: Heart,
    title: 'Client-Centric',
    desc: 'Our clients\' success is our success. Every project starts and ends with your goals.',
  },
  {
    Icon: Award,
    title: 'Deep Expertise',
    desc: 'We hire specialists, not generalists — ensuring unmatched quality in every engagement.',
  },
];

const STATS = [
  { Icon: Globe,    value: '100+',  label: 'Global Clients' },
  { Icon: Calendar, value: '11+',   label: 'Years of Expertise' },
  { Icon: Users,    value: '150+',  label: 'Team Members' },
  { Icon: Layers,   value: '20+',   label: 'Enterprise Projects' },
];

const LEADERS = [
  {
    initials: 'AR',
    name: 'Arjun Rao',
    title: 'Chief Executive Officer',
    bio: 'Visionary technologist with 15+ years scaling data-driven enterprises across APAC and North America.',
  },
  {
    initials: 'PS',
    name: 'Priya Sharma',
    title: 'Chief Technology Officer',
    bio: 'Former AI research lead turned product builder. Obsessed with turning cutting-edge models into business outcomes.',
  },
  {
    initials: 'MK',
    name: 'Michael Knoll',
    title: 'VP, Client Success',
    bio: 'Dedicated to translating complex technical capabilities into clear, measurable value for every client we serve.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 80 }}>
        <NoiseOverlay />
        <div className="blob" style={{ width: 600, height: 600, top: '-100px', right: '-8%', background: 'radial-gradient(circle, rgba(26,86,219,0.14), transparent 65%)' }} />
        <div className="blob" style={{ width: 360, height: 360, bottom: '-60px', left: '-5%', background: 'radial-gradient(circle, rgba(10,31,79,0.25), transparent 68%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div variants={stagger} initial="hidden" animate="visible" style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto' }}>
            <motion.div variants={FV} transition={FT}>
              <div className="section-badge" style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: 20 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4D86F5', display: 'inline-block', animation: 'pulseDot 2s ease-in-out infinite' }} />
                About MoreYeahs
              </div>
            </motion.div>
            <motion.h1 variants={FV} transition={FT} style={{ fontSize: 'clamp(34px,5.5vw,62px)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--fg)', lineHeight: 1.06, marginBottom: 22 }}>
              Built on Innovation,{' '}
              <span className="grad">Driven by Impact</span>
            </motion.h1>
            <motion.p variants={FV} transition={FT} style={{ fontSize: 17, color: 'var(--fg-3)', lineHeight: 1.8, maxWidth: 560, margin: '0 auto' }}>
              MoreYeahs is a global technology consultancy helping forward-thinking enterprises harness AI, cloud, and digital transformation to unlock growth, efficiency, and competitive advantage.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Company Story ─────────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="story-grid">

            {/* Left — text */}
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <div className="section-badge" style={{ marginBottom: 20 }}>Our Story</div>
              <h2 style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--fg)', marginBottom: 20, lineHeight: 1.15 }}>
                A decade of turning bold<br />ideas into <span className="grad">real results</span>
              </h2>
              <p style={{ fontSize: 15, color: 'var(--fg-3)', lineHeight: 1.85, marginBottom: 16 }}>
                Founded in 2014 as a lean startup with a singular focus on data intelligence, MoreYeahs has grown into a global technology partner trusted by enterprises across 9 industries. What started in Indore, India now spans two continents, with offices in the USA and a 150+ strong team of specialists.
              </p>
              <p style={{ fontSize: 15, color: 'var(--fg-3)', lineHeight: 1.85, marginBottom: 32 }}>
                Over 11 years, we have delivered more than 100 projects for clients ranging from ambitious scale-ups to Fortune-listed enterprises — always with a relentless focus on measurable outcomes. Our culture is one of craft, curiosity, and genuine partnership.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {[
                  { value: '100+', label: 'Clients worldwide' },
                  { value: '9',    label: 'Industries served' },
                  { value: '150+', label: 'In-house experts' },
                  { value: '11+',  label: 'Years of expertise' },
                ].map(s => (
                  <div key={s.label} style={{ padding: '20px 22px', borderRadius: 16, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(12px)' }}>
                    <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--fg)', marginBottom: 4 }}>{s.value}</div>
                    <div style={{ fontSize: 12, color: 'var(--fg-3)', fontWeight: 600 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — image placeholder */}
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <div className="glass" style={{ padding: 6, borderRadius: 24 }}>
                <div style={{ borderRadius: 18, overflow: 'hidden', background: 'linear-gradient(135deg, rgba(26,86,219,0.18) 0%, rgba(77,134,245,0.08) 100%)', aspectRatio: '4/3', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, position: 'relative' }}>
                  <div className="blob" style={{ width: 280, height: 280, top: '-40px', right: '-40px', background: 'radial-gradient(circle, rgba(77,134,245,0.22), transparent 65%)' }} />
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(26,86,219,0.15)', border: '1px solid rgba(77,134,245,0.30)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                    <Globe size={32} color="#4D86F5" strokeWidth={1.5} />
                  </div>
                  <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg)', marginBottom: 6 }}>Global Presence</div>
                    <div style={{ fontSize: 13, color: 'var(--fg-3)' }}>India · USA · Serving clients worldwide</div>
                  </div>
                  <div style={{ display: 'flex', gap: 12, position: 'relative', zIndex: 1 }}>
                    {['Indore, IN', 'Cedar Park, TX'].map(loc => (
                      <div key={loc} style={{ padding: '7px 14px', borderRadius: 999, background: 'rgba(26,86,219,0.12)', border: '1px solid rgba(77,134,245,0.25)', fontSize: 11, fontWeight: 700, color: '#4D86F5' }}>{loc}</div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Mission / Values ─────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-badge" style={{ display: 'inline-flex', marginBottom: 16 }}>Our Values</div>
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--fg)', lineHeight: 1.15 }}>
              What we stand for
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="values-grid">
            {VALUES.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="glass"
                style={{ padding: '36px 32px' }}
              >
                <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(26,86,219,0.10)', border: '1px solid rgba(77,134,245,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <Icon size={22} color="#4D86F5" strokeWidth={1.5} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--fg)', marginBottom: 10, letterSpacing: '-0.02em' }}>{title}</h3>
                <p style={{ fontSize: 14, color: 'var(--fg-3)', lineHeight: 1.75 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-badge" style={{ display: 'inline-flex', marginBottom: 16 }}>By the Numbers</div>
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--fg)', lineHeight: 1.15 }}>
              A track record that speaks
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 24, maxWidth: 720, margin: '0 auto' }} className="stats-grid">
            {STATS.map(({ Icon, value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass"
                style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' }}
              >
                <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(26,86,219,0.10)', border: '1px solid rgba(77,134,245,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={22} color="#4D86F5" strokeWidth={1.5} />
                </div>
                <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--fg)', lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: 14, color: 'var(--fg-3)', fontWeight: 600 }}>{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership ───────────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-badge" style={{ display: 'inline-flex', marginBottom: 16 }}>Leadership</div>
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--fg)', lineHeight: 1.15 }}>
              Meet the team behind MoreYeahs
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }} className="leaders-grid">
            {LEADERS.map(({ initials, name, title, bio }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="glass"
                style={{ padding: '36px 28px', textAlign: 'center' }}
              >
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #1A56DB, #4D86F5)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '0.02em' }}>
                  {initials}
                </div>
                <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--fg)', marginBottom: 5, letterSpacing: '-0.02em' }}>{name}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#4D86F5', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 14 }}>{title}</div>
                <p style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.75 }}>{bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass"
            style={{ maxWidth: 720, margin: '0 auto', padding: '64px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
          >
            <div className="blob" style={{ width: 360, height: 360, top: '-80px', right: '-80px', background: 'radial-gradient(circle, rgba(26,86,219,0.15), transparent 65%)' }} />
            <div className="section-badge" style={{ display: 'inline-flex', marginBottom: 20 }}>Let's Work Together</div>
            <h2 style={{ fontSize: 'clamp(24px,3.5vw,40px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--fg)', marginBottom: 16, lineHeight: 1.15, position: 'relative', zIndex: 1 }}>
              Ready to build something <span className="grad">extraordinary?</span>
            </h2>
            <p style={{ fontSize: 15, color: 'var(--fg-3)', lineHeight: 1.75, marginBottom: 32, maxWidth: 480, margin: '0 auto 32px', position: 'relative', zIndex: 1 }}>
              Whether you have a roadmap or just an idea, our team is ready to help you turn it into reality.
            </p>
            <Link
              href="/contact-us"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#1A56DB', color: '#fff', fontSize: 14, fontWeight: 700, borderRadius: 12, padding: '14px 28px', textDecoration: 'none', boxShadow: '0 6px 22px rgba(26,86,219,0.32)', transition: 'background 0.2s, transform 0.2s', position: 'relative', zIndex: 1 }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0E2E75'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1A56DB'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              Get in Touch <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media(max-width:1024px){
          .story-grid { grid-template-columns: 1fr !important; }
          .leaders-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media(max-width:768px){
          .values-grid { grid-template-columns: 1fr !important; }
          .leaders-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
