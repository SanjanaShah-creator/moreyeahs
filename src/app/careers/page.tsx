'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Globe2, TrendingUp, Heart, Coffee,
  MapPin, Clock, ArrowRight, Briefcase,
  SlidersHorizontal, X, Telescope,
} from 'lucide-react';
import Link from 'next/link';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import { GradientBars } from '@/components/ui/gradient-bar-hero-section';

const BLUE = '#4D86F5';
const BLUE_LIGHT = 'rgba(77,134,245,0.08)';
const EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Job type ──────────────────────────────────────────────────── */
export type Job = {
  id: string;
  title: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  location: string;
  workPreference: 'Remote' | 'Hybrid' | 'On-site';
  department: string;
  experience: 'Junior' | 'Mid-level' | 'Senior' | 'Lead';
  desc: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  offer: string[];
};

/* ─── No open roles right now ───────────────────────────────────── */
export const JOBS: Job[] = [];

/* ─── Filter options ────────────────────────────────────────────── */
const EXPERIENCE_LEVELS = ['All Levels', 'Junior', 'Mid-level', 'Senior', 'Lead'];
const JOB_TYPES = ['All Types', 'Full-time', 'Part-time', 'Contract'];
const WORK_PREFS = ['All Preferences', 'Remote', 'Hybrid', 'On-site'];

/* ─── Perks ─────────────────────────────────────────────────────── */
const PERKS = [
  { Icon: Globe2,     title: 'Remote-Friendly', desc: 'Work from anywhere. We hire across time zones with an async-first culture.' },
  { Icon: TrendingUp, title: 'Growth Path',      desc: 'Clear career ladders, mentorship programmes, and dedicated learning time to grow every year.' },
  { Icon: Heart,      title: 'Meaningful Work',  desc: 'Build AI, cloud, and enterprise systems that impact healthcare, fintech, and education.' },
  { Icon: Coffee,     title: 'Great Culture',    desc: 'Quarterly offsites, hackathons, flexible hours, and a team that ships and celebrates.' },
];

/* ─── FilterSelect ──────────────────────────────────────────────── */
function FilterSelect({
  label, value, options, onChange,
}: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              style={{
                background: active ? BLUE_LIGHT : 'transparent',
                border: active ? `1px solid ${BLUE}30` : '1px solid transparent',
                borderRadius: 8, padding: '7px 12px',
                cursor: 'pointer', textAlign: 'left',
                fontSize: 13, fontWeight: active ? 700 : 400,
                color: active ? BLUE : 'var(--fg-3)',
                transition: 'all 0.15s',
                fontFamily: 'inherit',
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── JobCard ───────────────────────────────────────────────────── */
function JobCard({ job, index }: { job: Job; index: number }) {
  const prefColors: Record<string, string> = {
    Remote: '#4D86F5',
    Hybrid: '#1A56DB',
    'On-site': '#80A9FF',
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EXPO, delay: index * 0.06 }}
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border)',
        borderRadius: 18, padding: '24px 28px',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
      }}
      whileHover={{ y: -3, boxShadow: `0 16px 48px ${BLUE}14`, transition: { duration: 0.25, ease: EXPO } }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--fg-3)', background: 'var(--bg-2)', border: '1px solid var(--border)', padding: '4px 10px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 4 }}>
          <Clock size={9} strokeWidth={2} /> {job.type}
        </span>
        <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--fg-3)', background: 'var(--bg-2)', border: '1px solid var(--border)', padding: '4px 10px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 4 }}>
          <MapPin size={9} strokeWidth={2} /> {job.location}
        </span>
        <span style={{ fontSize: 10, fontWeight: 700, color: prefColors[job.workPreference] ?? BLUE, background: `${prefColors[job.workPreference] ?? BLUE}12`, border: `1px solid ${prefColors[job.workPreference] ?? BLUE}25`, padding: '4px 10px', borderRadius: 999 }}>
          {job.workPreference}
        </span>
        <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--fg-3)', background: 'var(--bg-2)', border: '1px solid var(--border)', padding: '4px 10px', borderRadius: 999 }}>
          {job.experience}
        </span>
      </div>
      <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--fg)', letterSpacing: '-0.02em', marginBottom: 8, lineHeight: 1.3 }}>{job.title}</h3>
      <p style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.7, marginBottom: 18 }}>{job.desc}</p>
      <Link href={`/careers/${job.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: BLUE, textDecoration: 'none', padding: '8px 16px', borderRadius: 8, background: BLUE_LIGHT, border: `1px solid ${BLUE}30`, transition: 'background 0.2s' }}>
        View Details <ArrowRight size={12} strokeWidth={2.5} />
      </Link>
    </motion.div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function CareersPage() {
  const [experience, setExperience] = useState('All Levels');
  const [jobType, setJobType] = useState('All Types');
  const [workPref, setWorkPref] = useState('All Preferences');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => JOBS.filter((j) => {
    if (experience !== 'All Levels' && j.experience !== experience) return false;
    if (jobType !== 'All Types' && j.type !== jobType) return false;
    if (workPref !== 'All Preferences' && j.workPreference !== workPref) return false;
    return true;
  }), [experience, jobType, workPref]);

  const activeFilterCount = [
    experience !== 'All Levels',
    jobType !== 'All Types',
    workPref !== 'All Preferences',
  ].filter(Boolean).length;

  const hasJobs = JOBS.length > 0;

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 80, minHeight: '52vh', display: 'flex', alignItems: 'center' }}>
        <GradientBars count={18} />
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 3, width: '100%' }}>
          <motion.div
            initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto' }}
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: BLUE, background: BLUE_LIGHT, border: `1px solid ${BLUE}28`, padding: '6px 16px', borderRadius: 999, marginBottom: 26 }}>
                <Briefcase size={11} strokeWidth={2} />
                Careers at MoreYeahs
              </span>
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: EXPO }}
              style={{ fontSize: 'clamp(34px,5.5vw,62px)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--fg)', lineHeight: 1.06, marginBottom: 20 }}
            >
              Build the Future.{' '}
              <span style={{ background: `linear-gradient(120deg, ${BLUE} 0%, #80A9FF 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Grow With Us.
              </span>
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6 }}
              style={{ fontSize: 17, color: 'var(--fg-3)', lineHeight: 1.78, maxWidth: 560, margin: '0 auto 36px' }}
            >
              Join a team of specialists who care deeply about craft, outcomes, and each other. Do the most meaningful work of your career – and have fun doing it.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
            >
              {[
                { label: hasJobs ? `${JOBS.length} Open Roles` : 'Hiring Soon' },
                { label: '4.8★ Glassdoor' },
                { label: '92% Retention' },
              ].map(({ label }) => (
                <span key={label} style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg-3)', background: 'var(--card-bg)', border: '1px solid var(--border)', padding: '7px 16px', borderRadius: 999 }}>
                  {label}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Why MoreYeahs ── */}
      <section style={{ background: 'var(--bg-2)', padding: '72px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }} className="careers-perks-grid">
            {PERKS.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EXPO }}
                style={{ padding: '28px 24px', borderRadius: 18, background: 'var(--card-bg)', border: '1px solid var(--border)' }}
              >
                <div style={{ width: 46, height: 46, borderRadius: 12, background: BLUE_LIGHT, border: `1px solid ${BLUE}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Icon size={20} color={BLUE} strokeWidth={1.5} />
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: 'var(--fg)', marginBottom: 8, letterSpacing: '-0.02em' }}>{title}</h3>
                <p style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.72 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Roles ── */}
      <section style={{ background: 'var(--bg)', padding: '80px 0 120px' }}>
        <div className="container">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }} transition={{ duration: 0.55 }}
            style={{ marginBottom: 48 }}
          >
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: BLUE, marginBottom: 12 }}>
              Open Roles
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--fg)', lineHeight: 1.15 }}>
                Find your next opportunity
              </h2>
              {hasJobs && (
                <button
                  className="careers-filter-toggle"
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  style={{ display: 'none', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700, color: BLUE, background: BLUE_LIGHT, border: `1px solid ${BLUE}30`, padding: '9px 16px', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  <SlidersHorizontal size={14} strokeWidth={2} />
                  Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                </button>
              )}
            </div>
          </motion.div>

          {hasJobs ? (
            /* ── Two-column layout when jobs exist ── */
            <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 40, alignItems: 'start' }} className="careers-layout">
              {/* Left filter panel */}
              <div
                className={`careers-filter-panel ${filtersOpen ? 'open' : ''}`}
                style={{ position: 'sticky', top: 100, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 18, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 28 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--fg)', letterSpacing: '-0.01em' }}>Filters</span>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={() => { setExperience('All Levels'); setJobType('All Types'); setWorkPref('All Preferences'); }}
                      style={{ fontSize: 11, fontWeight: 700, color: BLUE, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 4 }}
                    >
                      <X size={10} strokeWidth={2.5} /> Clear all
                    </button>
                  )}
                </div>
                <FilterSelect label="Experience" value={experience} options={EXPERIENCE_LEVELS} onChange={setExperience} />
                <FilterSelect label="Job Type" value={jobType} options={JOB_TYPES} onChange={setJobType} />
                <FilterSelect label="Work Preference" value={workPref} options={WORK_PREFS} onChange={setWorkPref} />
              </div>

              {/* Right listings */}
              <div>
                <div style={{ fontSize: 13, color: 'var(--fg-3)', marginBottom: 20 }}>
                  <span style={{ fontWeight: 700, color: 'var(--fg)' }}>{filtered.length}</span>{' '}
                  {filtered.length === 1 ? 'role' : 'roles'} found
                </div>

                {filtered.length === 0 ? (
                  <div style={{ padding: '56px 32px', textAlign: 'center', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 18 }}>
                    <div style={{ width: 64, height: 64, borderRadius: 18, background: BLUE_LIGHT, border: `1px solid ${BLUE}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                      <Telescope size={28} color={BLUE} strokeWidth={1.5} />
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)', marginBottom: 8 }}>No matching roles</h3>
                    <p style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.7 }}>
                      Try adjusting your filters or{' '}
                      <a href="mailto:careers@moreyeahs.com" style={{ color: BLUE, textDecoration: 'none' }}>send an open application</a>.
                    </p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {filtered.map((job, i) => <JobCard key={job.id} job={job} index={i} />)}
                  </div>
                )}

                {/* Open application banner */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }} transition={{ duration: 0.5, delay: 0.2 }}
                  style={{ marginTop: 32, borderRadius: 18, padding: '28px 32px', background: BLUE_LIGHT, border: `1px solid ${BLUE}25`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}
                >
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--fg)', marginBottom: 5, letterSpacing: '-0.02em' }}>Don&apos;t see your role?</h3>
                    <p style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.7 }}>We are always looking for exceptional talent. Send us an open application.</p>
                  </div>
                  <a href="mailto:careers@moreyeahs.com?subject=Open Application – MoreYeahs" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 700, color: BLUE, background: 'transparent', border: `1px solid ${BLUE}40`, padding: '10px 18px', borderRadius: 10, textDecoration: 'none', whiteSpace: 'nowrap', transition: 'background 0.2s' }}>
                    Send Application <ArrowRight size={12} strokeWidth={2} />
                  </a>
                </motion.div>
              </div>
            </div>
          ) : (
            /* ── Full-width empty state when no jobs at all ── */
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, ease: EXPO }}
            >
              {/* Empty state card */}
              <div style={{
                borderRadius: 24,
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                padding: 'clamp(56px,8vw,96px) clamp(24px,6vw,80px)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Subtle background glow */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 480, height: 480, borderRadius: '50%', background: `radial-gradient(circle, ${BLUE_LIGHT} 0%, transparent 65%)`, pointerEvents: 'none' }} />

                {/* Icon */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: 96, height: 96, borderRadius: 28,
                    background: BLUE_LIGHT,
                    border: `1px solid ${BLUE}28`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 32px',
                    boxShadow: `0 8px 32px ${BLUE}18`,
                  }}>
                    <Telescope size={44} color={BLUE} strokeWidth={1.4} />
                  </div>

                  {/* Heading */}
                  <h3 style={{
                    fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800,
                    color: 'var(--fg)', letterSpacing: '-0.03em',
                    lineHeight: 1.2, marginBottom: 16,
                  }}>
                    No open positions right now
                  </h3>

                  {/* Body */}
                  <p style={{
                    fontSize: 16, color: 'var(--fg-3)', lineHeight: 1.78,
                    maxWidth: 480, margin: '0 auto 12px',
                  }}>
                    We&apos;re not actively hiring at the moment, but we&apos;re always interested in hearing from talented people.
                  </p>
                  <p style={{
                    fontSize: 15, color: 'var(--fg-3)', lineHeight: 1.78,
                    maxWidth: 440, margin: '0 auto 40px',
                  }}>
                    Drop us your CV and a note about what you do — we&apos;ll reach out when the right opportunity opens up.
                  </p>

                  {/* CTAs */}
                  <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a
                      href="mailto:careers@moreyeahs.com?subject=Open Application – MoreYeahs"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        background: BLUE, color: '#fff',
                        fontSize: 14, fontWeight: 700, borderRadius: 12,
                        padding: '13px 26px', textDecoration: 'none',
                        boxShadow: `0 6px 24px ${BLUE}40`,
                        transition: 'filter 0.2s, transform 0.2s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.filter = 'brightness(1.1)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = 'none'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
                    >
                      Send Open Application <ArrowRight size={14} strokeWidth={2} />
                    </a>
                    <Link
                      href="/contact-us"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        background: 'transparent', color: 'var(--fg-2)',
                        fontSize: 14, fontWeight: 600, borderRadius: 12,
                        padding: '13px 26px', textDecoration: 'none',
                        border: '1px solid var(--border)',
                        transition: 'border-color 0.2s, color 0.2s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = BLUE; (e.currentTarget as HTMLElement).style.color = BLUE; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--fg-2)'; }}
                    >
                      Get in Touch
                    </Link>
                  </div>
                </div>
              </div>

              {/* Notify me strip */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                  marginTop: 20, borderRadius: 18, padding: '24px 32px',
                  background: BLUE_LIGHT, border: `1px solid ${BLUE}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: 20, flexWrap: 'wrap',
                }}
              >
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--fg)', marginBottom: 4, letterSpacing: '-0.02em' }}>
                    Want to be the first to know?
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.6 }}>
                    Follow us on LinkedIn — we post new openings there first.
                  </p>
                </div>
                <a
                  href="https://in.linkedin.com/company/moreyeahs-inc-"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    fontSize: 13, fontWeight: 700, color: BLUE,
                    background: 'transparent', border: `1px solid ${BLUE}40`,
                    padding: '10px 18px', borderRadius: 10, textDecoration: 'none',
                    whiteSpace: 'nowrap', transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = BLUE_LIGHT; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  Follow on LinkedIn <ArrowRight size={12} strokeWidth={2} />
                </a>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      <style>{`
        @media(max-width:1024px){
          .careers-perks-grid{ grid-template-columns: 1fr 1fr !important; }
        }
        @media(max-width:860px){
          .careers-layout{ grid-template-columns: 1fr !important; }
          .careers-filter-toggle{ display:inline-flex !important; }
          .careers-filter-panel{ position:static !important; display:none !important; }
          .careers-filter-panel.open{ display:flex !important; }
        }
        @media(max-width:600px){
          .careers-perks-grid{ grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
