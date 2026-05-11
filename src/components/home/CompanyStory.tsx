'use client';

import { motion } from 'framer-motion';
import { Globe, Award, Users, Layers, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import { EXPO, FL, FR, SC, STAGGER } from '@/lib/anim';

const STATS = [
  { Icon: Globe,  value: '20+',  label: 'Global Clients',        sub: 'Empowering industry software experts worldwide' },
  { Icon: Award,  value: '12+',  label: 'Years of Expertise',    sub: 'Driving high-impact solutions since 2014' },
  { Icon: Users,  value: '150+', label: 'In-House Team Members', sub: 'Expert team built to deliver any project' },
  { Icon: Layers, value: '20+',  label: 'Enterprise Projects',   sub: 'Complex builds, delivered on time' },
];

export default function CompanyStory() {
  return (
    <section className="section" style={{ background: 'var(--bg)' }}>
      <NoiseOverlay />
      <div className="blob" style={{ width: 480, height: 480, top: '50%', right: '-10%', transform: 'translateY(-50%)', background: 'radial-gradient(circle, rgba(26,86,219,0.10), transparent 68%)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }} className="story-grid">

          {/* Left – slides in from left */}
          <motion.div
            variants={FL(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-80px' }}
          >
            <div className="section-badge" style={{ marginBottom: 20 }}>About MoreYeahs</div>

            <h2 style={{ fontSize: 'clamp(26px,3.8vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--fg)', lineHeight: 1.1, marginBottom: 20 }}>
              A global leader in{' '}
              <span className="grad">next-generation digital services</span>
            </h2>

            <p style={{ fontSize: 15, color: 'var(--fg-3)', lineHeight: 1.78, marginBottom: 16 }}>
              MoreYeahs came into existence as a startup venture in 2014 and is now one of the world&apos;s leading software development companies. We offer a range of IT services to mid-sized companies and startups across the globe.
            </p>
            <p style={{ fontSize: 15, color: 'var(--fg-3)', lineHeight: 1.78, marginBottom: 36 }}>
              Our technology products and services are built on innovation, based on world-renowned management philosophy, a culture of creativity and risk-taking, and a relentless dedication to customer relations.
            </p>

            <Link href="/life-at-moreyeahs" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#1A56DB', color: '#fff',
              fontSize: 13, fontWeight: 700, borderRadius: 10,
              padding: '12px 22px', textDecoration: 'none',
              boxShadow: '0 4px 18px rgba(26,86,219,0.30)',
              transition: 'background 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0E2E75'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1A56DB'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}>
              Meet the Team <ArrowRight size={13} strokeWidth={2} />
            </Link>
          </motion.div>

          {/* Right – stat cards stagger from right */}
          <motion.div
            variants={STAGGER()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-80px' }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
          >
            {STATS.map(({ Icon, value, label, sub }, i) => (
              <motion.div
                key={label}
                variants={SC(0)}
                whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(26,86,219,0.14)', transition: { duration: 0.3, ease: EXPO } }}
                className="glass"
                style={{ padding: '28px 24px' }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 11, background: 'rgba(26,86,219,0.12)', border: '1px solid rgba(77,134,245,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Icon size={17} color="#4D86F5" strokeWidth={1.5} />
                </div>
                <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--fg)', lineHeight: 1, marginBottom: 6 }}>{value}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg-2)', marginBottom: 6 }}>{label}</div>
                <div style={{ fontSize: 12, color: 'var(--fg-3)', lineHeight: 1.6 }}>{sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){ .story-grid{grid-template-columns:1fr!important;gap:48px!important} }
      `}</style>
    </section>
  );
}
