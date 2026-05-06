'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Mail, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { submitForm } from '@/lib/webhook';

const STORAGE_KEY = 'my_lead_popup_ts';
const SUPPRESS_DAYS = 7;
const TRIGGER_MS = 35000; // 35 seconds idle / on-page

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* pages where we never show the popup */
const EXCLUDED = ['/contact-us', '/privacy-policy', '/terms-and-conditions'];

export default function LeadCapturePopup() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activityRef = useRef(false);

  const shouldShow = () => {
    if (EXCLUDED.some(p => pathname.startsWith(p))) return false;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return true;
    const daysSince = (Date.now() - Number(stored)) / (1000 * 60 * 60 * 24);
    return daysSince > SUPPRESS_DAYS;
  };

  const schedulePopup = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (shouldShow()) setVisible(true);
    }, TRIGGER_MS);
  };

  useEffect(() => {
    if (!shouldShow()) return;

    /* start timer on first activity */
    const onActivity = () => {
      if (!activityRef.current) {
        activityRef.current = true;
        schedulePopup();
      }
    };

    /* also start timer if no activity after 5 seconds (user landed and is reading) */
    const passiveTimer = setTimeout(() => {
      if (!activityRef.current) schedulePopup();
    }, 5000);

    window.addEventListener('scroll', onActivity, { passive: true, once: true });
    window.addEventListener('mousemove', onActivity, { passive: true, once: true });
    window.addEventListener('click', onActivity, { passive: true, once: true });

    return () => {
      clearTimeout(passiveTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener('scroll', onActivity);
      window.removeEventListener('mousemove', onActivity);
      window.removeEventListener('click', onActivity);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await submitForm({ formType: 'Lead Capture', email, name });
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setLoading(false);
    setSent(true);
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* backdrop — subtle */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={dismiss}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.18)', zIndex: 1200, backdropFilter: 'blur(2px)' }}
          />

          {/* popup card — bottom-right */}
          <motion.div
            key="popup"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            style={{
              position: 'fixed', bottom: 28, right: 28, zIndex: 1201,
              width: 360, maxWidth: 'calc(100vw - 32px)',
              background: 'var(--card-bg)',
              border: '1px solid rgba(77,134,245,0.22)',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 24px 64px rgba(0,0,0,0.22), 0 0 0 1px rgba(26,86,219,0.08)',
            }}
          >
            {/* blue accent stripe */}
            <div style={{ height: 3, background: 'linear-gradient(90deg, #0E2E75, #1A56DB, #4D86F5)', backgroundSize: '200% 100%' }} />

            <div style={{ padding: '22px 24px 24px', position: 'relative' }}>
              {/* close */}
              <button
                onClick={dismiss}
                style={{ position: 'absolute', top: 14, right: 14, width: 28, height: 28, borderRadius: 8, background: 'var(--bg-2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--fg-3)' }}
              >
                <X size={13} strokeWidth={2} />
              </button>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  style={{ textAlign: 'center', padding: '16px 0 8px' }}
                >
                  <motion.div
                    initial={{ scale: 0.4 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 22, delay: 0.05 }}
                    style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(26,86,219,0.10)', border: '1px solid rgba(77,134,245,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}
                  >
                    <CheckCircle size={24} color="#4D86F5" strokeWidth={1.6} />
                  </motion.div>
                  <p style={{ fontSize: 16, fontWeight: 800, color: 'var(--fg)', marginBottom: 6 }}>You&apos;re in!</p>
                  <p style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.6 }}>We&apos;ll be in touch with insights and updates soon.</p>
                </motion.div>
              ) : (
                <>
                  {/* icon + badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(26,86,219,0.10)', border: '1px solid rgba(77,134,245,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Mail size={16} color="#4D86F5" strokeWidth={1.5} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '3px 9px', borderRadius: 999, background: 'rgba(26,86,219,0.07)', border: '1px solid rgba(77,134,245,0.18)' }}>
                      <Sparkles size={9} color="#4D86F5" />
                      <span style={{ fontSize: 9.5, fontWeight: 700, color: '#4D86F5', letterSpacing: '0.08em', textTransform: 'uppercase' }}>AI Strategy Session</span>
                    </div>
                  </div>

                  <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--fg)', letterSpacing: '-0.02em', marginBottom: 6, lineHeight: 1.25 }}>
                    Still Exploring AI?<br />Let&apos;s Make It Real.
                  </h3>
                  <p style={{ fontSize: 12.5, color: 'var(--fg-3)', lineHeight: 1.65, marginBottom: 18 }}>
                    We&apos;ll show you exactly how AI can fit into your business—what to automate, what to build, and where the ROI is. No generic advice. Just a clear plan.
                  </p>

                  <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      style={{ padding: '10px 13px', borderRadius: 9, border: '1.5px solid var(--border)', background: 'var(--bg)', color: 'var(--fg)', fontSize: 13, fontFamily: 'inherit', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                    />
                    <input
                      type="email"
                      required
                      placeholder="Work email *"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      style={{ padding: '10px 13px', borderRadius: 9, border: '1.5px solid var(--border)', background: 'var(--bg)', color: 'var(--fg)', fontSize: 13, fontFamily: 'inherit', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                    />
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={!loading ? { scale: 1.02 } : {}}
                      whileTap={!loading ? { scale: 0.97 } : {}}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 20px', borderRadius: 10, background: loading ? 'rgba(26,86,219,0.5)' : '#1A56DB', color: '#fff', fontSize: 13, fontWeight: 700, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: '0 6px 20px rgba(26,86,219,0.30)', transition: 'background .2s' }}
                    >
                      {loading ? 'Subscribing…' : <><span>Get free insights</span><ArrowRight size={13} strokeWidth={2} /></>}
                    </motion.button>
                  </form>

                  <p style={{ fontSize: 10.5, color: 'var(--fg-3)', marginTop: 10, textAlign: 'center' }}>
                    No spam. Unsubscribe anytime.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
