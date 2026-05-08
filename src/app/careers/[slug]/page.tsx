'use client';

import { useState, use } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, MapPin, Clock, Briefcase, ChevronRight,
  CheckCircle2, Upload, Send, User, Mail, Phone, FileText,
} from 'lucide-react';
import { submitForm } from '@/lib/webhook';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import { GradientBars } from '@/components/ui/gradient-bar-hero-section';
import { JOBS } from '../page';

const BLUE = '#4D86F5';
const BLUE_LIGHT = 'rgba(77,134,245,0.08)';
const EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PREF_COLORS: Record<string, string> = {
  Remote: '#4D86F5',
  Hybrid: '#1A56DB',
  'On-site': '#80A9FF',
};

/* ─── Apply Form ─────────────────────────────────────────────────────── */
function ApplyForm({ jobTitle }: { jobTitle: string }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', fileName: '' });
  const [fileData, setFileData] = useState<{ base64: string; name: string; mime: string } | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((f) => ({ ...f, fileName: file.name }));
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // result is "data:application/pdf;base64,XXXX" — strip the prefix
      const base64 = result.split(',')[1];
      setFileData({ base64, name: file.name, mime: file.type });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await submitForm({
        formType: 'Careers',
        name: form.name,
        email: form.email,
        phone: form.phone,
        role: jobTitle,
        coverNote: form.message,
        extra: form.fileName || 'No resume attached',
        ...(fileData && {
          resumeBase64: fileData.base64,
          resumeFileName: fileData.name,
          resumeMimeType: fileData.mime,
        }),
      });
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong sending your application. Please try again or email us directly at digitalmoreyeahs@gmail.com');
      console.error('[ApplyForm]', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '32px 0' }}>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: EXPO }}
        >
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'rgba(34,197,94,0.12)', border: '2px solid rgba(34,197,94,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <CheckCircle2 size={28} color="#22c55e" strokeWidth={2} />
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--fg)', marginBottom: 8 }}>Application sent!</h3>
          <p style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.7 }}>
            We'll review your application and get back to you within 5 business days.
          </p>
        </motion.div>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px',
    background: 'var(--bg)', border: '1px solid var(--border)',
    borderRadius: 10, fontSize: 13, color: 'var(--fg)',
    fontFamily: 'inherit', outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 6,
    fontSize: 12, fontWeight: 700, color: 'var(--fg-3)',
    marginBottom: 7, letterSpacing: '0.04em',
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <label style={labelStyle}><User size={11} strokeWidth={2} /> Full Name</label>
        <input required value={form.name} onChange={set('name')} placeholder="Jane Smith" style={inputStyle}
          onFocus={e => (e.currentTarget.style.borderColor = BLUE)}
          onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')} />
      </div>
      <div>
        <label style={labelStyle}><Mail size={11} strokeWidth={2} /> Email Address</label>
        <input required type="email" value={form.email} onChange={set('email')} placeholder="jane@company.com" style={inputStyle}
          onFocus={e => (e.currentTarget.style.borderColor = BLUE)}
          onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')} />
      </div>
      <div>
        <label style={labelStyle}><Phone size={11} strokeWidth={2} /> Phone Number</label>
        <input value={form.phone} onChange={set('phone')} placeholder="+1 (555) 000-0000" style={inputStyle}
          onFocus={e => (e.currentTarget.style.borderColor = BLUE)}
          onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')} />
      </div>
      <div>
        <label style={labelStyle}><FileText size={11} strokeWidth={2} /> Why MoreYeahs?</label>
        <textarea required value={form.message} onChange={set('message')}
          placeholder="Tell us what excites you about this role and what you'd bring to the team..."
          rows={4}
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
          onFocus={e => (e.currentTarget.style.borderColor = BLUE)}
          onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')} />
      </div>
      <div>
        <label style={labelStyle}><Upload size={11} strokeWidth={2} /> Resume / Portfolio</label>
        <label style={{
          display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
          padding: '11px 14px', borderRadius: 10,
          border: `1px dashed ${BLUE}40`, background: BLUE_LIGHT,
          fontSize: 13, color: BLUE, fontWeight: 600,
          transition: 'border-color 0.2s',
        }}>
          <Upload size={14} strokeWidth={2} />
          {form.fileName || 'Attach PDF (Max 5 MB)'}
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFile} style={{ display: 'none' }} />
        </label>
      </div>
      {error && (
        <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#ef4444', lineHeight: 1.6 }}>
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={submitting}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          background: submitting ? 'var(--fg-3)' : BLUE, color: '#fff', fontSize: 14, fontWeight: 700,
          borderRadius: 12, padding: '14px 24px', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer',
          fontFamily: 'inherit', boxShadow: `0 6px 24px ${BLUE}40`,
          transition: 'filter 0.2s, transform 0.2s',
          marginTop: 4,
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.filter = 'brightness(1.1)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = 'none'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
      >
        Apply Now <Send size={14} strokeWidth={2} />
      </button>
      <p style={{ fontSize: 11, color: 'var(--fg-3)', textAlign: 'center', lineHeight: 1.6 }}>
        We&apos;ll respond within 5 business days.
      </p>
    </form>
  );
}

/* ─── Section block ──────────────────────────────────────────────────── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: EXPO }}
      style={{ marginBottom: 48 }}
    >
      <h2 style={{
        fontSize: 20, fontWeight: 800, color: 'var(--fg)',
        letterSpacing: '-0.025em', marginBottom: 20,
        paddingBottom: 14, borderBottom: '1px solid var(--border)',
      }}>
        {title}
      </h2>
      {children}
    </motion.div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const job = JOBS.find((j) => j.id === slug);
  if (!job) notFound();

  return (
    <>
      {/* ── Hero bar ────────────────────────────────────────────────── */}
      <section style={{
        background: 'var(--bg)', position: 'relative', overflow: 'hidden',
        paddingTop: 100, paddingBottom: 56,
      }}>
        <GradientBars count={14} />
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 28, flexWrap: 'wrap' }}
          >
            <Link href="/careers" style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--fg-3)', textDecoration: 'none', fontWeight: 600 }}>
              <ArrowLeft size={12} strokeWidth={2} /> Careers
            </Link>
            <ChevronRight size={12} color="var(--fg-3)" strokeWidth={2} />
            <span style={{ fontSize: 12, color: BLUE, fontWeight: 700 }}>{job.title}</span>
          </motion.div>

          {/* Title + tags */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EXPO, delay: 0.1 }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
              <span style={{
                fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
                color: BLUE, background: BLUE_LIGHT, border: `1px solid ${BLUE}25`,
                padding: '4px 12px', borderRadius: 999,
              }}>
                {job.department}
              </span>
              <span style={{
                fontSize: 10, fontWeight: 700,
                color: PREF_COLORS[job.workPreference] ?? BLUE,
                background: `${PREF_COLORS[job.workPreference] ?? BLUE}12`,
                border: `1px solid ${PREF_COLORS[job.workPreference] ?? BLUE}25`,
                padding: '4px 12px', borderRadius: 999,
              }}>
                {job.workPreference}
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800,
              letterSpacing: '-0.035em', color: 'var(--fg)',
              lineHeight: 1.1, marginBottom: 20,
            }}>
              {job.title}
            </h1>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              {[
                { Icon: Briefcase, text: job.type },
                { Icon: MapPin,    text: job.location },
                { Icon: Clock,     text: job.experience },
              ].map(({ Icon, text }) => (
                <span key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--fg-3)', fontWeight: 500 }}>
                  <Icon size={13} strokeWidth={2} color={BLUE} /> {text}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Main content + sticky sidebar ────────────────────────────── */}
      <section style={{ background: 'var(--bg)', padding: '64px 0 120px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 56, alignItems: 'start' }} className="job-detail-grid">

            {/* ── Left: job content ── */}
            <div>
              <Section title="Overview">
                <p style={{ fontSize: 15, color: 'var(--fg-3)', lineHeight: 1.82 }}>{job.overview}</p>
              </Section>

              <Section title="Responsibilities">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {job.responsibilities.map((r, i) => (
                    <li key={i} style={{ display: 'flex', gap: 12, fontSize: 14, color: 'var(--fg-3)', lineHeight: 1.7 }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: '50%',
                        background: BLUE_LIGHT, border: `1px solid ${BLUE}30`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, marginTop: 2,
                      }}>
                        <CheckCircle2 size={10} color={BLUE} strokeWidth={2.5} />
                      </div>
                      {r}
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title="What We're Looking For">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {job.requirements.map((r, i) => (
                    <li key={i} style={{ display: 'flex', gap: 12, fontSize: 14, color: 'var(--fg-3)', lineHeight: 1.7 }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: '50%',
                        background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.25)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, marginTop: 2,
                      }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', display: 'block' }} />
                      </div>
                      {r}
                    </li>
                  ))}
                </ul>
              </Section>

            </div>

            {/* ── Right: sticky apply form ── */}
            <div style={{ position: 'sticky', top: 100 }}>
              <div style={{
                background: 'var(--card-bg)', border: `1px solid ${BLUE}25`,
                borderRadius: 22, padding: '28px 24px',
                boxShadow: `0 16px 48px ${BLUE}10`,
              }}>
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--fg)', letterSpacing: '-0.02em', marginBottom: 6 }}>
                    Apply for this role
                  </h3>
                  <p style={{ fontSize: 12, color: 'var(--fg-3)', lineHeight: 1.6 }}>
                    Fill in your details and we'll be in touch within 5 business days.
                  </p>
                </div>
                <ApplyForm jobTitle={job.title} />
              </div>

              {/* Share / refer */}
              <div style={{
                marginTop: 16, padding: '16px 20px', borderRadius: 14,
                background: 'var(--card-bg)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
              }}>
                <span style={{ fontSize: 12, color: 'var(--fg-3)', fontWeight: 500 }}>Know someone great?</span>
                <button
                  onClick={() => { navigator.clipboard.writeText(window.location.href); }}
                  style={{
                    fontSize: 12, fontWeight: 700, color: BLUE,
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 5,
                  }}
                >
                  Copy link
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        @media(max-width:900px){
          .job-detail-grid{ grid-template-columns: 1fr !important; }
          .job-detail-grid > div:last-child { position: static !important; }
        }
      `}</style>
    </>
  );
}
