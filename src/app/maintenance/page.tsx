'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Wrench, Mail, RefreshCw } from 'lucide-react';

const EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  const pad = (n: number) => String(n).padStart(2, '0');
  const h = pad(now.getHours());
  const m = pad(now.getMinutes());
  const s = pad(now.getSeconds());
  const date = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontVariantNumeric: 'tabular-nums',
        fontSize: 'clamp(36px, 7vw, 60px)',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        color: 'var(--fg)',
        lineHeight: 1,
        marginBottom: 6,
      }}>
        <span style={{ background: 'linear-gradient(135deg, #1A56DB, #4D86F5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          {h}:{m}
        </span>
        <span style={{ color: 'var(--fg-3)', fontSize: '0.6em', fontWeight: 400 }}>:{s}</span>
      </div>
      <div style={{ fontSize: 12, color: 'var(--fg-3)', fontWeight: 500 }}>{date}</div>
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <motion.div
      animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
      transition={{ duration: 1.4, repeat: Infinity, delay, ease: 'easeInOut' }}
      style={{ width: 8, height: 8, borderRadius: '50%', background: '#4D86F5' }}
    />
  );
}

export default function MaintenancePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '40px 24px',
    }}>
      {/* Background blobs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.16, 0.26, 0.16] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '-15%', left: '-8%',
            width: 700, height: 700, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(26,86,219,0.20), transparent 65%)',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.12, 0.20, 0.12] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          style={{
            position: 'absolute', bottom: '-20%', right: '-10%',
            width: 600, height: 600, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(77,134,245,0.18), transparent 65%)',
          }}
        />
        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(77,134,245,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(77,134,245,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 600 }}>

        {/* Logo */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EXPO }}
            style={{ textAlign: 'center', marginBottom: 40 }}
          >
            <img
              src="/images/MoreYeahs White theme Logo.png"
              alt="MoreYeahs"
              className="nav-logo-light"
              style={{ margin: '0 auto', height: 28 }}
            />
            <img
              src="/images/MoreYeahs Dark Theme Logo.png"
              alt="MoreYeahs"
              className="nav-logo-dark"
              style={{ margin: '0 auto', height: 28 }}
            />
          </motion.div>
        )}

        {/* Main glass card */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EXPO, delay: 0.12 }}
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderRadius: 28,
              padding: 'clamp(32px, 5vw, 56px)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.12), 0 0 0 1px rgba(77,134,245,0.06)',
              textAlign: 'center',
            }}
          >
            {/* Icon + status badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 28 }}>
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
                style={{
                  width: 64, height: 64, borderRadius: 18,
                  background: 'rgba(26,86,219,0.10)',
                  border: '1px solid rgba(77,134,245,0.22)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Wrench size={28} color="#4D86F5" strokeWidth={1.5} />
              </motion.div>
            </div>

            {/* Status dots */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 22 }}>
              <Dot delay={0} />
              <Dot delay={0.2} />
              <Dot delay={0.4} />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#4D86F5', letterSpacing: '0.1em', textTransform: 'uppercase', marginLeft: 6 }}>
                Maintenance in progress
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(24px, 4.5vw, 38px)',
              fontWeight: 800,
              color: 'var(--fg)',
              letterSpacing: '-0.035em',
              lineHeight: 1.1,
              marginBottom: 14,
            }}>
              We&apos;re tuning things up
            </h1>
            <p style={{
              fontSize: 15,
              color: 'var(--fg-3)',
              lineHeight: 1.8,
              maxWidth: 420,
              margin: '0 auto 36px',
            }}>
              Our team is working hard to bring you something even better.
              We&apos;ll be back online shortly — thank you for your patience.
            </p>

            {/* Live clock */}
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 18,
              padding: '24px 32px',
              marginBottom: 32,
            }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--fg-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
                Current Time
              </p>
              <LiveClock />
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#1A56DB', color: '#fff',
                  fontSize: 14, fontWeight: 700,
                  borderRadius: 12, padding: '13px 24px',
                  border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  boxShadow: '0 6px 20px rgba(26,86,219,0.32)',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0E2E75'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1A56DB'; }}
              >
                <RefreshCw size={14} strokeWidth={2} /> Try Again
              </button>
              <Link
                href="mailto:info@moreyeahs.com"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  color: 'var(--fg-2)',
                  fontSize: 14, fontWeight: 700,
                  borderRadius: 12, padding: '13px 24px',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(77,134,245,0.4)';
                  el.style.color = '#4D86F5';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'var(--border)';
                  el.style.color = 'var(--fg-2)';
                }}
              >
                <Mail size={14} strokeWidth={2} /> Contact Us
              </Link>
            </div>
          </motion.div>
        )}

        {/* Progress bar strip */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{ marginTop: 24, overflow: 'hidden', borderRadius: 999, height: 3, background: 'var(--border)' }}
          >
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                height: '100%', width: '40%',
                background: 'linear-gradient(90deg, transparent, #4D86F5, transparent)',
                borderRadius: 999,
              }}
            />
          </motion.div>
        )}

        {/* Footer */}
        {mounted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{ fontSize: 12, color: 'var(--fg-3)', textAlign: 'center', marginTop: 20 }}
          >
            Follow us for updates —{' '}
            <a href="https://www.linkedin.com/company/moreyeahs" target="_blank" rel="noopener noreferrer"
              style={{ color: '#4D86F5', textDecoration: 'none', fontWeight: 600 }}>
              LinkedIn
            </a>
          </motion.p>
        )}
      </div>
    </div>
  );
}
