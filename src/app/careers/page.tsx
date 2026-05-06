'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Globe2, TrendingUp, Heart, Coffee,
  MapPin, Clock, ArrowRight, Briefcase,
  ChevronRight, SlidersHorizontal, X,
} from 'lucide-react';
import Link from 'next/link';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import { GradientBars } from '@/components/ui/gradient-bar-hero-section';

const BLUE = '#4D86F5';
const BLUE_LIGHT = 'rgba(77,134,245,0.08)';
const EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Job data ──────────────────────────────────────────────────────── */
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

export const JOBS: Job[] = [
  {
    id: 'senior-ml-engineer',
    title: 'Senior ML Engineer',
    type: 'Full-time',
    location: 'Remote',
    workPreference: 'Remote',
    department: 'Data Science & AI',
    experience: 'Senior',
    desc: 'Design and deploy production-grade ML pipelines and model serving infrastructure for enterprise clients across healthcare and fintech.',
    overview: 'As a Senior ML Engineer at MoreYeahs, you will own end-to-end model development from data exploration to production deployment. You will collaborate closely with clients in regulated industries to build scalable, interpretable AI systems that solve real business problems.',
    responsibilities: [
      'Design, build, and maintain production ML pipelines using Python, PyTorch or TensorFlow, and cloud-native tooling',
      'Architect model serving infrastructure with sub-100ms inference latency',
      'Lead technical discovery sessions with enterprise clients to define model requirements',
      'Mentor junior engineers and conduct rigorous code reviews',
      'Drive MLOps maturity: feature stores, model registries, drift monitoring, and automated retraining',
      'Collaborate with data engineers to ensure high-quality, reliable training data',
    ],
    requirements: [
      '5+ years building and shipping ML systems to production',
      'Strong Python skills; proficiency in PyTorch or TensorFlow',
      'Experience with cloud ML platforms (SageMaker, Vertex AI, or Azure ML)',
      'Knowledge of MLOps tooling: MLflow, Kubeflow, or similar',
      'Excellent communication skills — you can explain models to non-technical stakeholders',
      'Bonus: experience in NLP, computer vision, or time-series forecasting',
    ],
    offer: [
      'Competitive salary benchmarked to top-tier tech companies',
      'Fully remote with optional co-working stipend',
      '₹60K annual learning & conference budget',
      'Health insurance for you and dependents',
      'Stock options and performance bonuses',
      'Quarterly team offsites',
    ],
  },
  {
    id: 'full-stack-developer',
    title: 'Full Stack Developer',
    type: 'Full-time',
    location: 'Remote',
    workPreference: 'Remote',
    department: 'Web & App',
    experience: 'Mid-level',
    desc: 'Build scalable web applications using Next.js, TypeScript, and Node.js. Work with designers and clients to ship polished, high-performance products.',
    overview: 'You will join our Web & App team to design and ship customer-facing products across a variety of industries. You will work in a collaborative squad with a product designer, PM, and backend specialist — owning features from Figma handoff to production deployment.',
    responsibilities: [
      'Build responsive, accessible web applications with Next.js, TypeScript, and Tailwind CSS',
      'Develop RESTful and GraphQL APIs using Node.js and PostgreSQL/MongoDB',
      'Optimise Core Web Vitals, SEO, and performance budgets',
      'Integrate third-party APIs and external services',
      'Write comprehensive unit and integration tests',
      'Participate in sprint planning, code reviews, and retrospectives',
    ],
    requirements: [
      '3+ years of professional full-stack development experience',
      'Expert-level Next.js, TypeScript, React — you understand RSC and the App Router',
      'Solid Node.js/Express backend skills',
      'Familiarity with CI/CD, Docker, and cloud deployments',
      'Eye for design — you care about pixel-perfect implementation',
      'Bonus: experience with animation libraries (Framer Motion) or design systems',
    ],
    offer: [
      'Competitive market salary',
      'Fully remote with flexible hours',
      'Annual learning budget',
      'Health and wellness allowance',
      'Latest MacBook Pro or equivalent',
      'Collaborative, low-ego team culture',
    ],
  },
  {
    id: 'salesforce-developer',
    title: 'Salesforce Developer',
    type: 'Full-time',
    location: 'Hybrid (Indore)',
    workPreference: 'Hybrid',
    department: 'Salesforce Services',
    experience: 'Mid-level',
    desc: 'Implement and customise Salesforce solutions including Sales Cloud, CPQ, and custom Lightning components for enterprise rollouts.',
    overview: 'You will be a core part of our Salesforce delivery team, working directly on enterprise implementation and managed-services engagements. You will configure, develop, and optimise Salesforce orgs to support complex business processes, and become a trusted advisor for our clients.',
    responsibilities: [
      'Develop custom Apex classes, triggers, and Lightning Web Components',
      'Configure Salesforce orgs: flows, process builder, validation rules, page layouts',
      'Implement CPQ and Revenue Cloud solutions',
      'Write and maintain comprehensive test coverage (85%+ required)',
      'Collaborate with business analysts to translate requirements into Salesforce solutions',
      'Support data migrations and integrations via REST/SOAP APIs',
    ],
    requirements: [
      '2+ years of hands-on Salesforce development experience',
      'Salesforce Platform Developer I certification (PD II preferred)',
      'Strong Apex, LWC, SOQL skills',
      'Experience with Salesforce CPQ or Sales Cloud',
      'Understanding of governor limits and performance best practices',
      'Bonus: Salesforce integrations with ERP/middleware systems',
    ],
    offer: [
      'Competitive salary',
      'Hybrid flexibility (Indore office)',
      'Paid Salesforce certifications and training',
      'Health insurance',
      'Performance bonuses',
      'Clear path to Salesforce Architect roles',
    ],
  },
  {
    id: 'devops-cloud-engineer',
    title: 'DevOps / Cloud Engineer',
    type: 'Full-time',
    location: 'Remote',
    workPreference: 'Remote',
    department: 'Cloud & Infrastructure',
    experience: 'Senior',
    desc: 'Architect and maintain cloud infrastructure on AWS and GCP. Drive IaC adoption, manage CI/CD pipelines, and enforce security and compliance best practices.',
    overview: 'You will design and operate the cloud backbone for our clients — ranging from fast-growing startups to regulated enterprises. You will have significant autonomy to modernise infrastructure, introduce best practices, and mentor clients on cloud-native architecture.',
    responsibilities: [
      'Design and provision cloud infrastructure using Terraform and Pulumi',
      'Build and maintain robust CI/CD pipelines with GitHub Actions, ArgoCD, and Jenkins',
      'Implement container orchestration using Kubernetes (EKS/GKE)',
      'Enforce security posture: IAM, secrets management, compliance scanning',
      'Set up observability stacks: Prometheus, Grafana, Datadog, or Elastic',
      'Lead cloud cost optimisation reviews for client accounts',
    ],
    requirements: [
      '4+ years in DevOps or Cloud Engineering roles',
      'Hands-on experience with AWS and/or GCP',
      'Strong Terraform skills; experience with Helm and Kubernetes',
      'Proficiency in scripting: Bash, Python',
      'AWS or GCP Professional certification preferred',
      'Experience working in SOC 2 or ISO 27001 environments is a plus',
    ],
    offer: [
      'Fully remote — work from anywhere',
      'Competitive salary with cloud certification bonuses',
      'Annual learning budget + certification reimbursement',
      'Health coverage',
      'Flexible hours across time zones',
      'Opportunity to build cloud practices from the ground up',
    ],
  },
  {
    id: 'business-development-manager',
    title: 'Business Development Manager',
    type: 'Full-time',
    location: 'Hybrid (Indore / Cedar Park)',
    workPreference: 'Hybrid',
    department: 'Growth',
    experience: 'Senior',
    desc: 'Identify and develop new business opportunities across North America and APAC. Partner with our solutions team to craft compelling proposals and close enterprise deals.',
    overview: 'You will drive MoreYeahs\'s growth by opening new accounts and expanding existing relationships across enterprise markets. You will work closely with our technical solutions team to scope deals, build compelling proposals, and guide prospects through the sales journey — from first conversation to signed contract.',
    responsibilities: [
      'Prospect and develop enterprise accounts across North America and APAC',
      'Run discovery calls and solution workshops with C-suite and VP-level stakeholders',
      'Collaborate with solutions architects to create technically accurate proposals',
      'Manage a healthy pipeline in Salesforce CRM with accurate forecasting',
      'Negotiate commercial terms and close contracts ($250K–$2M ACV range)',
      'Work with marketing on outbound campaigns, events, and partner channels',
    ],
    requirements: [
      '5+ years in B2B enterprise technology sales',
      'Track record of closing $1M+ annual deals',
      'Excellent presentation and storytelling skills',
      'Experience selling professional services, cloud, or software solutions',
      'Comfortable with technical concepts (AI, cloud, SaaS)',
      'Salesforce or equivalent CRM proficiency',
    ],
    offer: [
      'Base + uncapped commission structure',
      'Hybrid (Indore or Cedar Park, TX)',
      'Travel budget for client meetings and events',
      'Health and dental coverage',
      'Stock options',
      'Quarterly President\'s Club trips for top performers',
    ],
  },
];

/* ─── Filter options ────────────────────────────────────────────────── */
const DEPARTMENTS = ['All Departments', 'Data Science & AI', 'Web & App', 'Salesforce Services', 'Cloud & Infrastructure', 'Growth'];
const EXPERIENCE_LEVELS = ['All Levels', 'Junior', 'Mid-level', 'Senior', 'Lead'];
const JOB_TYPES = ['All Types', 'Full-time', 'Part-time', 'Contract'];
const WORK_PREFS = ['All Preferences', 'Remote', 'Hybrid', 'On-site'];

/* ─── Perks ─────────────────────────────────────────────────────────── */
const PERKS = [
  { Icon: Globe2,    title: 'Remote-Friendly',  desc: 'Work from anywhere. We hire across time zones with an async-first culture.' },
  { Icon: TrendingUp,title: 'Growth Path',       desc: 'Clear career ladders, mentorship programmes, and ₹60K annual learning budgets.' },
  { Icon: Heart,     title: 'Meaningful Work',   desc: 'Build AI, cloud, and enterprise systems that impact healthcare, fintech, and education.' },
  { Icon: Coffee,    title: 'Great Culture',      desc: 'Quarterly offsites, hackathons, flexible hours, and a team that ships and celebrates.' },
];

/* ─── FilterChip ─────────────────────────────────────────────────────── */
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

/* ─── JobCard ────────────────────────────────────────────────────────── */
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
      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
        <span style={{
          fontSize: 10, fontWeight: 600, color: 'var(--fg-3)',
          background: 'var(--bg-2)', border: '1px solid var(--border)',
          padding: '4px 10px', borderRadius: 999,
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <Clock size={9} strokeWidth={2} /> {job.type}
        </span>
        <span style={{
          fontSize: 10, fontWeight: 600, color: 'var(--fg-3)',
          background: 'var(--bg-2)', border: '1px solid var(--border)',
          padding: '4px 10px', borderRadius: 999,
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <MapPin size={9} strokeWidth={2} /> {job.location}
        </span>
        <span style={{
          fontSize: 10, fontWeight: 700,
          color: prefColors[job.workPreference] ?? BLUE,
          background: `${prefColors[job.workPreference] ?? BLUE}12`,
          border: `1px solid ${prefColors[job.workPreference] ?? BLUE}25`,
          padding: '4px 10px', borderRadius: 999,
        }}>
          {job.workPreference}
        </span>
        <span style={{
          fontSize: 10, fontWeight: 600, color: 'var(--fg-3)',
          background: 'var(--bg-2)', border: '1px solid var(--border)',
          padding: '4px 10px', borderRadius: 999,
        }}>
          {job.experience}
        </span>
      </div>

      {/* Title + desc */}
      <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--fg)', letterSpacing: '-0.02em', marginBottom: 8, lineHeight: 1.3 }}>
        {job.title}
      </h3>
      <p style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.7, marginBottom: 18 }}>
        {job.desc}
      </p>

      {/* CTA */}
      <Link
        href={`/careers/${job.id}`}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, fontWeight: 700, color: BLUE,
          textDecoration: 'none',
          padding: '8px 16px', borderRadius: 8,
          background: BLUE_LIGHT, border: `1px solid ${BLUE}30`,
          transition: 'background 0.2s',
        }}
      >
        View Details <ArrowRight size={12} strokeWidth={2.5} />
      </Link>
    </motion.div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */
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

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section style={{
        background: 'var(--bg)',
        position: 'relative', overflow: 'hidden',
        paddingTop: 120, paddingBottom: 80,
        minHeight: '52vh', display: 'flex', alignItems: 'center',
      }}>
        <GradientBars count={18} />
        <NoiseOverlay />

        <div className="container" style={{ position: 'relative', zIndex: 3, width: '100%' }}>
          <motion.div
            initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto' }}
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5 }}
            >
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                color: BLUE, background: BLUE_LIGHT,
                border: `1px solid ${BLUE}28`,
                padding: '6px 16px', borderRadius: 999, marginBottom: 26,
              }}>
                <Briefcase size={11} strokeWidth={2} />
                Careers at MoreYeahs
              </span>
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: EXPO }}
              style={{
                fontSize: 'clamp(34px,5.5vw,62px)', fontWeight: 800,
                letterSpacing: '-0.04em', color: 'var(--fg)',
                lineHeight: 1.06, marginBottom: 20,
              }}
            >
              Build the Future.{' '}
              <span style={{
                background: `linear-gradient(120deg, ${BLUE} 0%, #80A9FF 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Grow With Us.
              </span>
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6 }}
              style={{ fontSize: 17, color: 'var(--fg-3)', lineHeight: 1.78, maxWidth: 560, margin: '0 auto 36px' }}
            >
              Join a team of specialists who care deeply about craft, outcomes, and each other. Do the most meaningful work of your career — and have fun doing it.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
            >
              {[
                { label: `${JOBS.length} Open Roles` },
                { label: '4.8★ Glassdoor' },
                { label: '92% Retention' },
              ].map(({ label }) => (
                <span key={label} style={{
                  fontSize: 13, fontWeight: 600, color: 'var(--fg-3)',
                  background: 'var(--card-bg)', border: '1px solid var(--border)',
                  padding: '7px 16px', borderRadius: 999,
                }}>
                  {label}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Why MoreYeahs ─────────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-2)', padding: '72px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }} className="careers-perks-grid">
            {PERKS.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EXPO }}
                style={{
                  padding: '28px 24px', borderRadius: 18,
                  background: 'var(--card-bg)', border: '1px solid var(--border)',
                }}
              >
                <div style={{
                  width: 46, height: 46, borderRadius: 12,
                  background: BLUE_LIGHT, border: `1px solid ${BLUE}22`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                }}>
                  <Icon size={20} color={BLUE} strokeWidth={1.5} />
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: 'var(--fg)', marginBottom: 8, letterSpacing: '-0.02em' }}>{title}</h3>
                <p style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.72 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Roles (filters + listings) ───────────────────────────── */}
      <section style={{ background: 'var(--bg)', padding: '80px 0 120px' }}>
        <div className="container">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            style={{ marginBottom: 48 }}
          >
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: BLUE, marginBottom: 12 }}>
              Open Roles
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--fg)', lineHeight: 1.15 }}>
                Find your next opportunity
              </h2>
              {/* Mobile filter toggle */}
              <button
                className="careers-filter-toggle"
                onClick={() => setFiltersOpen(!filtersOpen)}
                style={{
                  display: 'none', alignItems: 'center', gap: 8,
                  fontSize: 13, fontWeight: 700, color: BLUE,
                  background: BLUE_LIGHT, border: `1px solid ${BLUE}30`,
                  padding: '9px 16px', borderRadius: 10, cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                <SlidersHorizontal size={14} strokeWidth={2} />
                Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>
            </div>
          </motion.div>

          {/* Two-column layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 40, alignItems: 'start' }} className="careers-layout">

            {/* ── Left filter panel ── */}
            <div
              className={`careers-filter-panel ${filtersOpen ? 'open' : ''}`}
              style={{
                position: 'sticky', top: 100,
                background: 'var(--card-bg)', border: '1px solid var(--border)',
                borderRadius: 18, padding: '24px 20px',
                display: 'flex', flexDirection: 'column', gap: 28,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--fg)', letterSpacing: '-0.01em' }}>
                  Filters
                </span>
                {activeFilterCount > 0 && (
                  <button
                    onClick={() => {
                      setExperience('All Levels');
                      setJobType('All Types');
                      setWorkPref('All Preferences');
                    }}
                    style={{
                      fontSize: 11, fontWeight: 700, color: BLUE,
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 4,
                    }}
                  >
                    <X size={10} strokeWidth={2.5} /> Clear all
                  </button>
                )}
              </div>

              <FilterSelect label="Experience" value={experience} options={EXPERIENCE_LEVELS} onChange={setExperience} />
              <FilterSelect label="Job Type" value={jobType} options={JOB_TYPES} onChange={setJobType} />
              <FilterSelect label="Work Preference" value={workPref} options={WORK_PREFS} onChange={setWorkPref} />
            </div>

            {/* ── Right listings ── */}
            <div>
              {/* Result count */}
              <div style={{ fontSize: 13, color: 'var(--fg-3)', marginBottom: 20 }}>
                <span style={{ fontWeight: 700, color: 'var(--fg)' }}>{filtered.length}</span>{' '}
                {filtered.length === 1 ? 'role' : 'roles'} found
              </div>

              {filtered.length === 0 ? (
                <div style={{
                  padding: '56px 32px', textAlign: 'center',
                  background: 'var(--card-bg)', border: '1px solid var(--border)',
                  borderRadius: 18,
                }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)', marginBottom: 8 }}>No matching roles</h3>
                  <p style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.7 }}>
                    Try adjusting your filters or{' '}
                    <a href="mailto:careers@moreyeahs.com" style={{ color: BLUE, textDecoration: 'none' }}>
                      send an open application
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {filtered.map((job, i) => (
                    <JobCard key={job.id} job={job} index={i} />
                  ))}
                </div>
              )}

              {/* Open application banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                  marginTop: 32, borderRadius: 18, padding: '28px 32px',
                  background: BLUE_LIGHT, border: `1px solid ${BLUE}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: 20, flexWrap: 'wrap',
                }}
              >
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--fg)', marginBottom: 5, letterSpacing: '-0.02em' }}>
                    Don't see your role?
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.7 }}>
                    We are always looking for exceptional talent. Send us an open application.
                  </p>
                </div>
                <a
                  href="mailto:careers@moreyeahs.com?subject=Open Application — MoreYeahs"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    fontSize: 13, fontWeight: 700, color: BLUE,
                    background: 'transparent', border: `1px solid ${BLUE}40`,
                    padding: '10px 18px', borderRadius: 10, textDecoration: 'none',
                    whiteSpace: 'nowrap', transition: 'background 0.2s',
                  }}
                >
                  Send Application <ArrowRight size={12} strokeWidth={2} />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media(max-width:1024px){
          .careers-perks-grid{ grid-template-columns: 1fr 1fr !important; }
        }
        @media(max-width:860px){
          .careers-layout{ grid-template-columns: 1fr !important; }
          .careers-filter-toggle{ display:inline-flex !important; }
          .careers-filter-panel{
            position:static !important;
            display:none;
          }
          .careers-filter-panel.open{
            display:flex !important;
          }
        }
        @media(max-width:600px){
          .careers-perks-grid{ grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
