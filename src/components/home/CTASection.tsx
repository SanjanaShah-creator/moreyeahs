'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Calendar } from 'lucide-react';
import Link from 'next/link';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import { EXPO, SC } from '@/lib/anim';

const PERKS = ['No commitment required', 'Free 30-minute session', 'Actionable AI roadmap'];

export default function CTASection() {
  return (
    <section style={{ padding: '80px 0 100px', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <NoiseOverlay />

      <div className="blob" style={{ width: 560, height: 560, top: '-80px', right: '5%', background: 'radial-gradient(circle, rgba(26,86,219,0.14) 0%, transparent 65%)' }} />
      <div className="blob" style={{ width: 480, height: 480, bottom: '-60px', left: '5%', background: 'radial-gradient(circle, rgba(26,86,219,0.08) 0%, transparent 65%)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          variants={SC(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{
            borderRadius: 28,
            padding: 'clamp(52px,7vw,88px)',
            background: 'rgba(26,86,219,0.06)',
            border: '1px solid rgba(77,134,245,0.18)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            position: 'relative', overflow: 'hidden',
            textAlign: 'center',
          }}
        >
          {/* Decorative corner circles */}
          <div style={{ position: 'absolute', top: -80, right: -80, width: 280, height: 280, borderRadius: '50%', background: 'rgba(26,86,219,0.10)', border: '1px solid rgba(77,134,245,0.12)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -60, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(26,86,219,0.08)', border: '1px solid rgba(77,134,245,0.10)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EXPO, delay: 0.15 }}
            >
              <div className="section-badge" style={{ justifyContent: 'center', marginBottom: 24, background: 'rgba(26,86,219,0.14)', border: '1px solid rgba(77,134,245,0.30)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4D86F5', display: 'inline-block', animation: 'pulseDot 2s ease-in-out infinite' }} />
                Free Consultation Available
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EXPO, delay: 0.25 }}
              style={{ fontSize: 'clamp(30px,5vw,58px)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--fg)', lineHeight: 1.06, marginBottom: 20 }}
            >
              Ready to build something{' '}
              <span className="grad">remarkable?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EXPO, delay: 0.35 }}
              style={{ fontSize: 17, color: 'var(--fg-3)', maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.74 }}
            >
              Let&apos;s talk about your next project. Book a free consultation with our team and walk away with a clear AI roadmap.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EXPO, delay: 0.45 }}
              style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}
            >
              <Link href="/contact-us" style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                background: '#1A56DB', color: '#fff',
                fontSize: 14, fontWeight: 700, borderRadius: 10,
                padding: '14px 28px', textDecoration: 'none',
                boxShadow: '0 8px 28px rgba(26,86,219,0.38)',
                transition: 'background 0.2s, transform 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0E2E75'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1A56DB'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}>
                <Calendar size={15} strokeWidth={1.5} />
                Book a Free Consultation
                <ArrowRight size={14} strokeWidth={2} />
              </Link>
              <Link href="/solutions" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'var(--surface)', border: '1px solid var(--border)',
                color: 'var(--fg-2)', fontSize: 14, fontWeight: 600, borderRadius: 10,
                padding: '14px 28px', textDecoration: 'none',
                backdropFilter: 'blur(12px)',
                transition: 'background 0.2s, border-color 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(26,86,219,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(77,134,245,0.3)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--surface)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}>
                Explore Our Solutions
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EXPO, delay: 0.55 }}
              style={{ display: 'flex', gap: 28, justifyContent: 'center', flexWrap: 'wrap' }}
            >
              {PERKS.map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: 'var(--fg-3)' }}>
                  <CheckCircle size={13} color="#1A56DB" strokeWidth={1.5} />
                  {t}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
