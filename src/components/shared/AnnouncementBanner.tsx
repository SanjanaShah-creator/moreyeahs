'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Zap } from 'lucide-react';

const DISMISS_KEY = 'ann_wahinn_v1';

export default function AnnouncementBanner() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(DISMISS_KEY)) {
      setVisible(true);
    } else {
      document.documentElement.style.setProperty('--ann-h', '0px');
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    setScrolledPast(false);
    document.documentElement.style.setProperty('--ann-h', '44px');
  }, [pathname, visible]);

  useEffect(() => {
    if (!visible) return;
    const getHeroThreshold = () => {
      const heroEl = document.querySelector<HTMLElement>('main > *:first-child');
      return heroEl
        ? Math.max(heroEl.offsetTop + heroEl.offsetHeight - 60, 150)
        : window.innerHeight * 0.88;
    };
    const update = () => {
      const past = window.scrollY > getHeroThreshold() && window.innerWidth > 900;
      setScrolledPast(past);
      document.documentElement.style.setProperty('--ann-h', past ? '0px' : '44px');
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [visible]);

  const dismiss = () => {
    document.documentElement.style.setProperty('--ann-h', '0px');
    localStorage.setItem(DISMISS_KEY, '1');
    setVisible(false);
  };

  const show = visible && !scrolledPast;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="ann"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: 'hidden', position: 'relative', zIndex: 1300 }}
        >
          <div style={{
            background: 'linear-gradient(92deg, #060D1F 0%, #0E2E75 45%, #060D1F 100%)',
            borderBottom: '1px solid rgba(77,134,245,0.22)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Shimmer sweep */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'linear-gradient(90deg, transparent 0%, rgba(77,134,245,0.12) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'annSweep 4s ease-in-out infinite',
            }} />

            <div style={{
              maxWidth: 1200, margin: '0 auto',
              padding: '10px 56px 10px 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap',
              position: 'relative', zIndex: 1,
            }}>

              {/* Badge */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '3px 10px', borderRadius: 999,
                background: 'rgba(26,86,219,0.30)', border: '1px solid rgba(77,134,245,0.40)',
                flexShrink: 0,
              }}>
                <Zap size={9} color="#80A9FF" fill="#80A9FF" />
                <span style={{ fontSize: 9, fontWeight: 800, color: '#80A9FF', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  News
                </span>
              </div>

              <p style={{ fontSize: 13, color: '#C0D2F5', margin: 0, fontWeight: 400, lineHeight: 1.5 }}>
                <span style={{ fontWeight: 700, color: '#fff' }}>WahInnovations</span>
                {' '}has merged into{' '}
                <span style={{ fontWeight: 700, color: '#80A9FF' }}>MoreYeahs IT Technologies</span>
                {', '}enhancing our Salesforce solutions with AI and Data Engineering.
              </p>

              <a
                href="/contact-us"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  fontSize: 11, fontWeight: 700, color: '#4D86F5',
                  background: 'rgba(77,134,245,0.12)', border: '1px solid rgba(77,134,245,0.30)',
                  borderRadius: 999, padding: '4px 12px', textDecoration: 'none',
                  whiteSpace: 'nowrap', flexShrink: 0, transition: 'background 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(77,134,245,0.22)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(77,134,245,0.12)'; }}
              >
                Get in touch →
              </a>
            </div>

            {/* Dismiss */}
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              style={{
                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                width: 26, height: 26, borderRadius: 7,
                background: 'rgba(77,134,245,0.12)', border: '1px solid rgba(77,134,245,0.22)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#80A9FF', zIndex: 2,
              }}
            >
              <X size={12} strokeWidth={2.5} />
            </button>
          </div>

          <style>{`
            @keyframes annSweep {
              0%   { background-position: 200% 0 }
              100% { background-position: -200% 0 }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
