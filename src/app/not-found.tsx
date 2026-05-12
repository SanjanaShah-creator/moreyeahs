'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';

const EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

const LINKS = [
  { label: 'Home',          href: '/' },
  { label: 'Solutions',     href: '/solutions' },
  { label: 'Case Studies',  href: '/case-studies' },
  { label: 'Careers',       href: '/careers' },
  { label: 'Contact Us',    href: '/contact-us' },
];

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '40px 24px',
    }}>
      {/* Animated background blobs */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden',
      }}>
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '-10%', left: '-5%',
            width: 600, height: 600, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(26,86,219,0.22), transparent 65%)',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.14, 0.22, 0.14] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{
            position: 'absolute', bottom: '-15%', right: '-8%',
            width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(77,134,245,0.20), transparent 65%)',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          style={{
            position: 'absolute', top: '40%', right: '20%',
            width: 300, height: 300, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(26,86,219,0.18), transparent 65%)',
          }}
        />
        {/* Grid lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(77,134,245,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(77,134,245,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 680, textAlign: 'center' }}>

        {/* 404 giant number */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EXPO }}
          >
            <div style={{
              fontSize: 'clamp(100px, 20vw, 180px)',
              fontWeight: 900,
              letterSpacing: '-0.06em',
              lineHeight: 1,
              background: 'linear-gradient(135deg, rgba(26,86,219,0.15) 0%, rgba(77,134,245,0.08) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: -16,
              userSelect: 'none',
              filter: 'drop-shadow(0 0 40px rgba(77,134,245,0.12))',
            }}>
              404
            </div>
          </motion.div>
        )}

        {/* Glass card */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EXPO, delay: 0.15 }}
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderRadius: 28,
              padding: 'clamp(32px, 5vw, 56px)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.12), 0 0 0 1px rgba(77,134,245,0.06)',
            }}
          >
            {/* Icon */}
            <div style={{
              width: 64, height: 64, borderRadius: 18,
              background: 'rgba(26,86,219,0.10)',
              border: '1px solid rgba(77,134,245,0.22)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
            }}>
              <Search size={26} color="#4D86F5" strokeWidth={1.5} />
            </div>

            <h1 style={{
              fontSize: 'clamp(22px, 4vw, 32px)',
              fontWeight: 800,
              color: 'var(--fg)',
              letterSpacing: '-0.03em',
              marginBottom: 12,
            }}>
              Page not found
            </h1>
            <p style={{
              fontSize: 15,
              color: 'var(--fg-3)',
              lineHeight: 1.75,
              maxWidth: 400,
              margin: '0 auto 36px',
            }}>
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
              Let&apos;s get you back on track.
            </p>

            {/* Quick links */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: 8,
              justifyContent: 'center', marginBottom: 32,
            }}>
              {LINKS.map(({ label, href }) => (
                <Link key={href} href={href} style={{
                  fontSize: 12, fontWeight: 700,
                  color: 'var(--fg-2)',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 999,
                  padding: '7px 16px',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, color 0.2s, background 0.2s',
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(77,134,245,0.4)';
                    el.style.color = '#4D86F5';
                    el.style.background = 'rgba(77,134,245,0.06)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'var(--border)';
                    el.style.color = 'var(--fg-2)';
                    el.style.background = 'var(--surface)';
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#1A56DB', color: '#fff',
                fontSize: 14, fontWeight: 700,
                borderRadius: 12, padding: '13px 24px',
                textDecoration: 'none',
                boxShadow: '0 6px 20px rgba(26,86,219,0.32)',
                transition: 'background 0.2s, transform 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0E2E75'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1A56DB'; }}
              >
                <Home size={14} strokeWidth={2} /> Go Home
              </Link>
              <button
                onClick={() => history.back()}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  color: 'var(--fg-2)',
                  fontSize: 14, fontWeight: 700,
                  borderRadius: 12, padding: '13px 24px',
                  cursor: 'pointer', fontFamily: 'inherit',
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
                <ArrowLeft size={14} strokeWidth={2} /> Go Back
              </button>
            </div>
          </motion.div>
        )}

        {/* Footer note */}
        {mounted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 24 }}
          >
            Still lost?{' '}
            <Link href="/contact-us" style={{ color: '#4D86F5', textDecoration: 'none', fontWeight: 600 }}>
              Contact our team
            </Link>{' '}
            and we&apos;ll point you in the right direction.
          </motion.p>
        )}
      </div>
    </div>
  );
}
