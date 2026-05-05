'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowRight, Globe, Sparkles } from 'lucide-react';
import { submitForm } from '@/lib/webhook';
import { GradientBars } from '@/components/ui/gradient-bar-hero-section';
import NoiseOverlay from '@/components/ui/NoiseOverlay';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SPRING = { type: 'spring' as const, stiffness: 380, damping: 30 };

const SERVICES = [
  'Data Science & AI',
  'Cloud & Infrastructure',
  'Microsoft Services',
  'Salesforce Services',
  'Web & App Development',
  'Other / Not sure yet',
];

const OFFICES = [
  {
    country: 'India',
    address: '4th Floor, B Zone Business Spaces, Nipania Main Rd, Indore, MP 452010',
    phone: '+91 93299 11531',
    email: 'info@moreyeahs.com',
  },
  {
    country: 'USA',
    address: '2105, 801 C-Bar Ranch Trl, Cedar Park, TX 78613',
    phone: '+1 2523492546',
    email: 'us@moreyeahs.com',
  },
];

/* stagger container */
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: EASE } },
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', message: '' });
  const [services, setServices] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (services.length === 0) { setFocused('service'); return; }
    setLoading(true);
    try {
      await submitForm({ formType: 'Contact', ...form, service: services.join(', ') });
      setSubmitted(true);
    } catch (err) {
      console.error('[contact] submit failed:', err);
      alert('Submission failed. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  const ROW1 = [
    { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Jane Smith', required: true },
    { label: 'Work Email', name: 'email', type: 'email', placeholder: 'jane@company.com', required: true },
  ];
  const ROW2 = [
    { label: 'Company', name: 'company', type: 'text', placeholder: 'Acme Corp' },
    { label: 'Phone', name: 'phone', type: 'tel', placeholder: '+1 (555) 000-0000' },
  ];

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.45;transform:scale(1.6)} }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        .service-dropdown-panel {
          background: rgba(255,255,255,0.94);
          color: var(--fg);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .dark .service-dropdown-panel {
          background: rgba(8,12,20,0.96);
          color: #F8FAFC;
          border-color: rgba(255,255,255,0.08);
        }

        /* ── inputs ─────────────────────────────────── */
        .ci {
          padding: 11px 14px;
          border-radius: 10px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          color: var(--fg);
          font-size: 13.5px;
          outline: none;
          transition: border-color .2s, box-shadow .2s, background .2s;
          font-family: inherit;
          width: 100%;
          box-sizing: border-box;
        }
        .ci::placeholder { color: var(--fg-3); opacity: 1; }
        .ci-focused {
          border-color: #1A56DB !important;
          box-shadow: 0 0 0 3px rgba(26,86,219,0.12);
          background: var(--bg) !important;
        }
        .ci option { background: var(--bg); color: var(--fg); }

        /* ── label ───────────────────────────────────── */
        .cl {
          display: flex; align-items: center; gap: 5px;
          font-size: 11px; font-weight: 700;
          color: var(--fg-3);
          letter-spacing: 0.07em;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        /* ── card accent glow (dark mode) ────────────── */
        @media(prefers-color-scheme:dark){
          .contact-card { box-shadow: 0 0 0 1px rgba(77,134,245,0.12), 0 32px 64px rgba(0,0,0,0.35), 0 0 80px rgba(26,86,219,0.06) !important; }
        }

        @media(max-width:640px){
          .cfrow { grid-template-columns: 1fr 1fr !important; }
          .cfrow2 { grid-template-columns: 1fr !important; }
          .cistrip { grid-template-columns: 1fr !important; }
        }
        @media(max-width:420px){
          .cfrow { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section style={{
        background: 'var(--bg)', position: 'relative', overflow: 'hidden',
        minHeight: '100vh', paddingTop: 96, paddingBottom: 40,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <GradientBars count={24} />
        <NoiseOverlay />

        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: 880 }}>

          {/* ── Hero text ── */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>

            {/* Badge — spring pop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 420, damping: 22, delay: 0.05 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '5px 14px', borderRadius: 999,
                background: 'rgba(26,86,219,0.08)', border: '1px solid rgba(77,134,245,0.24)',
                marginBottom: 18,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4D86F5', display: 'inline-block', animation: 'pulseDot 2s ease-in-out infinite', flexShrink: 0 }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: '#4D86F5', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Free Consultation Available</span>
            </motion.div>

            {/* Heading line 1 — clip wipe up */}
            <div style={{ overflow: 'hidden', marginBottom: 4, paddingBottom: 10 }}>
              <motion.div
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ type: 'spring', stiffness: 260, damping: 28, delay: 0.18 }}
                style={{ fontSize: 'clamp(28px,4.5vw,50px)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--fg)', lineHeight: 1.18 }}
              >
                Let&apos;s Build Something
              </motion.div>
            </div>

            {/* Heading line 2 — clip wipe up, offset delay */}
            <div style={{ overflow: 'hidden', marginBottom: 16, paddingBottom: 10 }}>
              <motion.div
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ type: 'spring', stiffness: 260, damping: 28, delay: 0.27 }}
                style={{ fontSize: 'clamp(28px,4.5vw,50px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.18 }}
              >
                <span style={{
                  background: 'linear-gradient(120deg, #1A56DB 0%, #4D86F5 50%, #1A56DB 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  animation: 'shimmer 4s linear infinite',
                }}>
                  Remarkable
                </span>
              </motion.div>
            </div>

            {/* Subtitle — fade + drift */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.42 }}
              style={{ fontSize: 15, color: 'var(--fg-3)', lineHeight: 1.65, maxWidth: 460, margin: '0 auto' }}
            >
              Tell us about your project — we&apos;ll respond within 24 hours with a clear roadmap.
            </motion.p>
          </div>

          {/* ── Card — 3D tilt spring entrance ── */}
          <motion.div
            initial={{ opacity: 0, y: 48, rotateX: 7, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 26, delay: 0.36 }}
            style={{ transformPerspective: 1100 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                /* ── Success ── */
                <motion.div
                  key="success"
                  className="glass contact-card"
                  style={{ borderRadius: 22, padding: '64px 40px', textAlign: 'center', overflow: 'hidden', position: 'relative' }}
                  initial={{ opacity: 0, scale: 0.92, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -8 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  {/* top accent */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #1A56DB, #4D86F5, #1A56DB)', backgroundSize: '200% 100%', animation: 'shimmer 3s linear infinite' }} />

                  <motion.div
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ ...SPRING, delay: 0.08 }}
                    style={{
                      width: 72, height: 72, borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(26,86,219,0.18), rgba(77,134,245,0.10))',
                      border: '1.5px solid rgba(77,134,245,0.35)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
                      boxShadow: '0 0 32px rgba(26,86,219,0.20)',
                    }}
                  >
                    <CheckCircle size={30} color="#4D86F5" strokeWidth={1.6} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22, duration: 0.4, ease: EASE }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(26,86,219,0.08)', border: '1px solid rgba(77,134,245,0.20)', borderRadius: 999, padding: '3px 12px', marginBottom: 14 }}
                  >
                    <Sparkles size={10} color="#4D86F5" />
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#4D86F5', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Message received</span>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28, duration: 0.4 }}
                    style={{ fontSize: 26, fontWeight: 800, color: 'var(--fg)', marginBottom: 10, letterSpacing: '-0.02em' }}
                  >
                    You&apos;re all set!
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.34, duration: 0.4 }}
                    style={{ fontSize: 14.5, color: 'var(--fg-3)', lineHeight: 1.7, maxWidth: 360, margin: '0 auto 28px' }}
                  >
                    Thanks for reaching out. Our team typically gets back within one business day with a tailored plan.
                  </motion.p>
                  <motion.button
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.42, duration: 0.4 }}
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', company: '', phone: '', message: '' }); setServices([]); }}
                    style={{ background: 'rgba(77,134,245,0.10)', border: '1.5px solid rgba(77,134,245,0.28)', color: '#4D86F5', fontSize: 13, fontWeight: 700, borderRadius: 10, padding: '11px 26px', cursor: 'pointer', fontFamily: 'inherit', transition: 'background .2s' }}
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>

              ) : (
                /* ── Form ── */
                <motion.form
                  key="form"
                  className="glass contact-card"
                  onSubmit={submit}
                  style={{ borderRadius: 22, overflow: 'hidden', position: 'relative' }}
                  exit={{ opacity: 0, scale: 0.97, y: -6 }}
                  transition={{ duration: 0.28 }}
                >
                  {/* top accent stripe */}
                  <div style={{ height: 3, borderTopLeftRadius: 22, borderTopRightRadius: 22, background: 'linear-gradient(90deg, #0E2E75, #1A56DB, #4D86F5, #1A56DB, #0E2E75)', backgroundSize: '200% 100%', animation: 'shimmer 4s linear infinite' }} />

                  <div style={{ padding: '28px 30px 26px' }}>
                    {/* card header */}
                    <motion.div
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: EASE, delay: 0.25 }}
                    >
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--fg)', letterSpacing: '-0.02em', marginBottom: 2 }}>Start a Conversation</div>
                        <div style={{ fontSize: 12, color: 'var(--fg-3)' }}>All fields marked <span style={{ color: '#4D86F5' }}>*</span> are required</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, background: 'rgba(26,86,219,0.07)', border: '1px solid rgba(77,134,245,0.18)' }}>
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#4D86F5', animation: 'pulseDot 2s ease-in-out infinite' }} />
                        <span style={{ fontSize: 10.5, fontWeight: 700, color: '#4D86F5', letterSpacing: '0.04em' }}>Response in ≤ 24h</span>
                      </div>
                    </motion.div>

                    {/* divider */}
                    <div style={{ height: 1, background: 'var(--border)', marginBottom: 22, opacity: 0.6 }} />

                    {/* staggered fields */}
                    <motion.div variants={staggerContainer} initial="hidden" animate="show">

                      {/* Row 1: Name | Email */}
                      <motion.div variants={staggerItem} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                        {ROW1.map(f => (
                          <div key={f.name}>
                            <label className="cl">{f.label}<span style={{ color: '#4D86F5', marginLeft: 2 }}>*</span></label>
                            <input name={f.name} type={f.type} placeholder={f.placeholder} required
                              value={form[f.name as keyof typeof form]} onChange={handle}
                              onFocus={() => setFocused(f.name)} onBlur={() => setFocused(null)}
                              className={`ci${focused === f.name ? ' ci-focused' : ''}`} />
                          </div>
                        ))}
                      </motion.div>

                      {/* Row 2: Company | Phone | Service */}
                      <motion.div variants={staggerItem} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 14 }} className="cfrow">
                        {ROW2.map(f => (
                          <div key={f.name}>
                            <label className="cl">{f.label}</label>
                            <input name={f.name} type={f.type} placeholder={f.placeholder}
                              value={form[f.name as keyof typeof form]} onChange={handle}
                              onFocus={() => setFocused(f.name)} onBlur={() => setFocused(null)}
                              className={`ci${focused === f.name ? ' ci-focused' : ''}`} />
                          </div>
                        ))}
                        <div>
                          <label className="cl">Service <span style={{ color: '#4D86F5' }}>*</span></label>
                          <ServiceDropdown
                            values={services}
                            onChange={setServices}
                            hasError={focused === 'service' && services.length === 0}
                            onBlur={() => setFocused(null)}
                          />
                        </div>
                      </motion.div>

                      {/* Row 3: Message full width */}
                      <motion.div variants={staggerItem} style={{ marginBottom: 20 }}>
                        <label className="cl">Project Details <span style={{ color: '#4D86F5' }}>*</span></label>
                        <textarea name="message" required rows={3}
                          placeholder="Describe your project, goals, timeline, or any questions you have…"
                          value={form.message} onChange={handle}
                          onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                          className={`ci${focused === 'message' ? ' ci-focused' : ''}`}
                          style={{ resize: 'none', lineHeight: 1.65 }} />
                      </motion.div>

                      {/* submit row */}
                      <motion.div variants={staggerItem} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, paddingTop: 4 }}>
                        <p style={{ fontSize: 11, color: 'var(--fg-3)', lineHeight: 1.5 }}>
                          By submitting you agree to our{' '}
                          <a href="/privacy-policy" style={{ color: '#4D86F5', textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</a>.
                        </p>
                        <motion.button
                          type="submit"
                          disabled={loading}
                          whileHover={!loading ? { scale: 1.02, y: -1 } : {}}
                          whileTap={!loading ? { scale: 0.97 } : {}}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: 9,
                            background: loading
                              ? 'rgba(26,86,219,0.50)'
                              : 'linear-gradient(135deg, #1A56DB 0%, #2563EB 100%)',
                            color: '#fff', fontSize: 13.5, fontWeight: 700, borderRadius: 11,
                            padding: '13px 28px', border: 'none',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            boxShadow: loading ? 'none' : '0 6px 24px rgba(26,86,219,0.35), inset 0 1px 0 rgba(255,255,255,0.12)',
                            transition: 'background .2s, box-shadow .2s',
                            fontFamily: 'inherit', letterSpacing: '0.01em',
                          }}
                        >
                          {loading ? (
                            <>
                              <span style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                              Sending…
                            </>
                          ) : (
                            <>
                              <Send size={13} strokeWidth={1.8} />
                              Send Message
                              <ArrowRight size={13} strokeWidth={2.2} />
                            </>
                          )}
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Info strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 14, position: 'relative', zIndex: 1 }}
            className="cistrip"
          >
            <OfficeCard office={OFFICES[0]} />
            <OfficeCard office={OFFICES[1]} />
          </motion.div>
        </div>
      </section>
    </>
  );
}

function OfficeCard({ office }: { office: typeof OFFICES[number] }) {
  return (
    <div className="glass" style={{ padding: '16px 18px', borderRadius: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
        <Globe size={11} color="#4D86F5" strokeWidth={1.5} />
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4D86F5' }}>{office.country} Office</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        <InfoRow icon={<MapPin size={10} />}><span style={{ fontSize: 11.5, color: 'var(--fg-2)', lineHeight: 1.5 }}>{office.address}</span></InfoRow>
        <InfoRow icon={<Phone size={10} />}><a href={`tel:${office.phone.replace(/\s/g, '')}`} style={{ fontSize: 11.5, color: 'var(--fg-2)', textDecoration: 'none' }}>{office.phone}</a></InfoRow>
        <InfoRow icon={<Mail size={10} />}><a href={`mailto:${office.email}`} style={{ fontSize: 11.5, color: '#4D86F5', textDecoration: 'none' }}>{office.email}</a></InfoRow>
      </div>
    </div>
  );
}

function InfoRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
      <span style={{ color: 'var(--fg-3)', flexShrink: 0, marginTop: 1 }}>{icon}</span>
      {children}
    </div>
  );
}

function ServiceDropdown({ values, onChange, hasError, onBlur }: {
  values: string[];
  onChange: (v: string[]) => void;
  hasError: boolean;
  onBlur: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target as Node) &&
        panelRef.current && !panelRef.current.contains(e.target as Node)
      ) { setOpen(false); onBlur(); }
    };
    const close = () => { setOpen(false); onBlur(); };
    document.addEventListener('mousedown', handler);
    window.addEventListener('scroll', close, { passive: true });
    window.addEventListener('resize', close);
    return () => {
      document.removeEventListener('mousedown', handler);
      window.removeEventListener('scroll', close);
      window.removeEventListener('resize', close);
    };
  }, [open, onBlur]);

  const toggle = () => {
    if (triggerRef.current) setRect(triggerRef.current.getBoundingClientRect());
    setOpen(o => !o);
  };

  const toggleItem = (s: string) =>
    onChange(values.includes(s) ? values.filter(v => v !== s) : [...values, s]);

  const label = values.length === 0
    ? 'Select services…'
    : values.length === 1 ? values[0] : `${values.length} services selected`;

  const isFocused = open;
  const borderColor = hasError ? '#EF4444' : isFocused ? '#1A56DB' : 'var(--border)';
  const shadow = hasError ? '0 0 0 3px rgba(239,68,68,0.12)' : isFocused ? '0 0 0 3px rgba(26,86,219,0.12)' : 'none';

  const panelStyle: React.CSSProperties = rect ? {
    position: 'fixed',
    left: rect.left,
    width: rect.width,
    zIndex: 9999,
    ...(window.innerHeight - rect.bottom < 240
      ? { bottom: window.innerHeight - rect.top + 4 }
      : { top: rect.bottom + 4 }),
  } : { position: 'fixed', zIndex: 9999 };

  const panel = (
    <AnimatePresence>
      {open && rect && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, scaleY: 0.96, transformOrigin: 'top' }}
          animate={{ opacity: 1, scaleY: 1 }}
          exit={{ opacity: 0, scaleY: 0.98 }}
          transition={{ duration: 0.16, ease: EASE }}
          style={{
            ...panelStyle,
            background: 'var(--bg)',
            border: '1.5px solid rgba(26,86,219,0.22)',
            borderRadius: 13,
            overflow: 'hidden',
            boxShadow: '0 12px 40px rgba(0,0,0,0.22)',
          }}
        >
          <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--fg-3)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Select all that apply</span>
            {values.length > 0 && (
              <button type="button" onClick={() => onChange([])} style={{ marginLeft: 'auto', fontSize: 10, color: '#4D86F5', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, padding: '2px 6px' }}>Clear</button>
            )}
          </div>
          <div style={{ maxHeight: 220, overflowY: 'auto' }}>
            {SERVICES.map((s, i) => {
              const checked = values.includes(s);
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleItem(s)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 14px',
                    background: checked ? 'rgba(26,86,219,0.07)' : 'transparent',
                    color: checked ? '#1A56DB' : 'var(--fg)',
                    fontSize: 13.5, fontFamily: 'inherit', fontWeight: checked ? 600 : 400,
                    cursor: 'pointer', textAlign: 'left',
                    borderBottom: i < SERVICES.length - 1 ? '1px solid var(--border)' : 'none',
                    transition: 'background .12s',
                  }}
                  onMouseEnter={e => { if (!checked) (e.currentTarget as HTMLElement).style.background = 'rgba(26,86,219,0.04)'; }}
                  onMouseLeave={e => { if (!checked) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  <span style={{ width: 15, height: 15, borderRadius: 4, border: `1.5px solid ${checked ? '#1A56DB' : 'var(--border)'}`, background: checked ? '#1A56DB' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background .12s, border-color .12s' }}>
                    {checked && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                  </span>
                  {s}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '11px 14px', borderRadius: 10, cursor: 'pointer',
          border: `1.5px solid ${borderColor}`,
          background: 'var(--bg)',
          color: values.length > 0 ? 'var(--fg)' : 'var(--fg-3)',
          fontSize: 13.5, fontFamily: 'inherit', textAlign: 'left',
          boxShadow: shadow,
          transition: 'border-color .2s, box-shadow .2s',
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{label}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease: EASE }}
          style={{ display: 'flex', flexShrink: 0, marginLeft: 8 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isFocused ? '#1A56DB' : 'var(--fg-3)'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.span>
      </button>
      {hasError && <p style={{ fontSize: 11, color: '#EF4444', marginTop: 4 }}>Please select at least one service</p>}
      {mounted && createPortal(panel, document.body)}
    </>
  );
}
