'use client';

import { useState, useRef } from 'react';
import {
  motion, AnimatePresence,
  useScroll, useTransform, useSpring,
} from 'framer-motion';
import {
  ArrowRight, BarChart2, Cpu, ChevronRight,
  CloudUpload, Settings, BarChart, Send, Plus, Minus,
  HeartPulse, DollarSign, ShoppingCart, Factory, GraduationCap, Truck, Brain,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';

/* ─── Animation constants ───────────────────────────────────────────── */
const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const FU = (delay = 0, distance = 56) => ({
  hidden: { opacity: 0, y: distance, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EXPO, delay } },
});
const FL = (delay = 0) => ({
  hidden: { opacity: 0, x: -80, filter: 'blur(6px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EXPO, delay } },
});
const FR = (delay = 0) => ({
  hidden: { opacity: 0, x: 80, filter: 'blur(6px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EXPO, delay } },
});
const SC = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.88, filter: 'blur(4px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: EXPO, delay } },
});
const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

/* ─── Word-by-word title component ─────────────────────────────────── */
function WordReveal({ text, className, style, delay = 0 }: {
  text: string; className?: string; style?: React.CSSProperties; delay?: number;
}) {
  return (
    <span className={className} style={{ ...style, display: 'inline' }}>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.75, ease: EXPO, delay: delay + i * 0.07 }}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Data ──────────────────────────────────────────────────────────── */
const SPECIALIZATIONS = [
  'Predictive Modeling',
  'Intelligent Automation',
  'Visual Intelligence Apps',
  'End to end AI Solution Design',
];

const SERVICES = [
  {
    id: 'aiml',
    href: '/solutions/data-science/ai-ml', title: 'AI/ML & Intelligence', dark: false,
    tagline: 'Smarter systems. Better decisions.',
    desc: 'Turn data into intelligence that actually drives action.',
    list: ['Predictions replace assumptions', 'Models improve with every interaction', 'Decisions become data-driven', 'Intelligence scales across the business'],
  },
  {
    id: 'cv',
    href: '/solutions/data-science/computer-vision', title: 'Computer Vision', dark: true,
    tagline: 'Machines that can see and understand.',
    desc: 'Transform images and video into usable insights.',
    list: ['Visual data becomes searchable', 'Detection happens in real time', 'Accuracy improves over manual review', 'New automation opportunities emerge'],
  },
  {
    id: 'de',
    href: '/solutions/data-science/data-infrastructure', title: 'Data Engineering', dark: false,
    tagline: 'Data, structured for impact.',
    desc: 'Build pipelines that make data reliable and ready.',
    list: ['Clean, trusted data at every step', 'Faster access to critical insights', 'Systems scale without breaking', 'Silos turn into unified pipelines'],
  },
  {
    id: 'iot',
    href: '/solutions/data-science/iot-connected-systems', title: 'IOT', dark: true,
    tagline: 'Connected devices. Connected intelligence.',
    desc: 'Bridge the physical and digital worlds seamlessly.',
    list: ['Real-time monitoring of assets', 'Predictive maintenance replaces downtime', 'Operations become proactive', 'Data flows from devices to decisions'],
  },
];

const STEPS = [
  { step: '01', label: 'Data Capture',  sub: 'Raw ingestion from IoT and ERPs',    Icon: CloudUpload },
  { step: '02', label: 'Processing',    sub: 'Normalization and quality filtering', Icon: Settings },
  { step: '03', label: 'Analysis',      sub: 'Statistical discovery and mapping',  Icon: BarChart },
  { step: '04', label: 'Learning',      sub: 'Neural network training and tuning', Icon: Cpu },
  { step: '05', label: 'Outputs',       sub: 'Automated actions and insights',     Icon: Send },
];

const INDUSTRIES = [
  {
    Icon: HeartPulse, label: 'Healthcare',
    headline: 'Predictive Patient Outcomes',
    desc: 'Reduce readmissions by up to 35% with ML-driven risk stratification, diagnostic support models, and real-time clinical decision intelligence.',
    tags: ['Predictive Diagnostics', 'Patient Risk Scoring', 'Clinical NLP'],
  },
  {
    Icon: DollarSign, label: 'Financial Services',
    headline: 'Fraud Detection & Risk Analytics',
    desc: 'Detect fraud in milliseconds, automate credit scoring, and build compliant risk models that scale with transaction volume.',
    tags: ['Fraud Intelligence', 'Credit Scoring', 'Regulatory Reporting'],
  },
  {
    Icon: ShoppingCart, label: 'Retail & E-Commerce',
    headline: 'Demand Forecasting & Personalisation',
    desc: 'Drive 20–40% revenue uplift through AI-powered recommendation engines, dynamic pricing, and inventory demand forecasting.',
    tags: ['Recommendation Engines', 'Dynamic Pricing', 'Churn Prevention'],
  },
  {
    Icon: Factory, label: 'Manufacturing',
    headline: 'Predictive Maintenance & Quality Control',
    desc: 'Cut unplanned downtime by 44% with IoT sensor analytics, computer vision inspection, and real-time OEE monitoring.',
    tags: ['Predictive Maintenance', 'Vision Inspection', 'OEE Analytics'],
  },
  {
    Icon: GraduationCap, label: 'Education',
    headline: 'Adaptive Learning & Outcome Prediction',
    desc: 'Personalise learning paths, predict at-risk students before dropout, and measure institutional performance at scale.',
    tags: ['Adaptive Learning', 'Dropout Prediction', 'Performance Analytics'],
  },
  {
    Icon: Truck, label: 'Logistics & Supply Chain',
    headline: 'Route Optimisation & Inventory Intelligence',
    desc: 'Reduce logistics costs by 18–25% through AI-powered route planning, real-time supply chain visibility, and demand-driven inventory.',
    tags: ['Route Optimisation', 'Supply Visibility', 'Demand Sensing'],
  },
];

const PROBLEMS = [
  {
    problem: 'We have data everywhere but no clear insights',
    solution: 'We unify disparate data sources into a single governed pipeline, then build dashboards and models that surface the metrics that actually drive your decisions, not just data dumps.',
  },
  {
    problem: 'Our ML models work in the lab but fail in production',
    solution: 'We engineer production-grade ML systems with proper feature stores, model monitoring, drift detection, and automated retraining pipelines so models stay accurate over time.',
  },
  {
    problem: 'Manual processes slow down our operations',
    solution: 'We identify automation opportunities using process mining, then deploy intelligent document processing, computer vision, and NLP workflows that free your teams from repetitive work.',
  },
  {
    problem: "We can't predict demand or customer behaviour accurately",
    solution: 'We build time-series forecasting and propensity models trained on your historical data, delivering predictions that teams can act on, not just correlations in a report.',
  },
  {
    problem: 'Our infrastructure costs keep rising as data grows',
    solution: 'We architect cloud-native data platforms on AWS, GCP, or Azure with auto-scaling pipelines and intelligent data tiering that reduce storage and compute costs as volume increases.',
  },
];

const FAQS = [
  {
    q: 'How long does it take to see ROI from a data science engagement?',
    a: 'Most clients see measurable impact within 8–12 weeks for targeted use cases like churn prediction or demand forecasting. Larger platform builds typically deliver ROI at the 4–6 month mark. We always prioritise quick wins alongside long-term infrastructure.',
  },
  {
    q: 'Do you work with our existing data infrastructure or replace it?',
    a: 'We build on and around your existing stack wherever possible. We integrate with Snowflake, Databricks, BigQuery, Redshift, and most major databases. We only recommend replacing legacy systems when the technical debt makes it more cost-effective to migrate.',
  },
  {
    q: 'What data do you need to get started on an AI/ML project?',
    a: 'We start with a data audit in week one. For predictive models, 12–24 months of historical transaction or operational data is ideal. We can also work with smaller datasets using transfer learning and synthetic data augmentation where appropriate.',
  },
  {
    q: 'How do you ensure data security and regulatory compliance?',
    a: 'We follow security-by-design principles. Data is processed in your own cloud environment with no third-party data transfer unless explicitly agreed. We support GDPR, HIPAA, and SOC 2 requirements and can sign BAAs and DPAs as needed.',
  },
  {
    q: 'Can you integrate AI/ML models into our existing software products?',
    a: 'Yes. We deliver models as REST APIs or embedded SDKs that integrate directly into your web apps, mobile apps, ERP systems, and Salesforce/Microsoft platforms. Our engineering team handles both the model and the integration.',
  },
  {
    q: 'What makes MoreYeahs different from an in-house data science team?',
    a: "We bring a full stack: data engineers, ML engineers, domain specialists, and MLOps architects working together. You get senior expertise across the entire pipeline without the 6–12 month hiring cycle, and you can scale the engagement up or down as your needs evolve.",
  },
];

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function DataSciencePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openProb, setOpenProb] = useState<number | null>(null);

  /* Parallax — hero */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const rawVideoY   = useTransform(heroScroll, [0, 1], ['0%', '28%']);
  const rawHeroFade = useTransform(heroScroll, [0, 0.65], [1, 0]);
  const rawHeroY    = useTransform(heroScroll, [0, 1], ['0%', '-14%']);
  const videoY   = useSpring(rawVideoY,   { stiffness: 80, damping: 20, mass: 0.5 });
  const heroFade = useSpring(rawHeroFade, { stiffness: 80, damping: 20 });
  const heroTextY = useSpring(rawHeroY,  { stiffness: 80, damping: 20 });

  return (
    <>
      {/* ══════════════════════════════════════════════════
          HERO — parallax video + word reveal title
      ══════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{ background: 'var(--bg)', paddingTop: 100, paddingBottom: 64, position: 'relative', overflow: 'hidden' }}
      >
        <NoiseOverlay />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Heading */}
          <motion.div style={{ y: heroTextY, opacity: heroFade, marginBottom: 36 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EXPO }}
            >
              <div className="section-badge" style={{ marginBottom: 20 }}>
                <Brain size={12} color="#4D86F5" strokeWidth={2} />
                Data Science
              </div>
            </motion.div>

            <h1 style={{ fontSize: 'clamp(36px,4.5vw,68px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--fg)' }}>
              <WordReveal text="Build Smarter. Scale Faster." delay={0.1} /><br />
              <WordReveal text="With" delay={0.45} />{' '}
              <motion.span
                initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.75, ease: EXPO, delay: 0.52 }}
                style={{ display: 'inline-block', background: 'linear-gradient(120deg,#4D86F5 0%,#80A9FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                Data Science.
              </motion.span>
            </h1>
          </motion.div>

          {/* Hero split */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 24, alignItems: 'stretch' }} className="ds-hero-split">

            {/* LEFT — video with parallax */}
            <motion.div
              initial={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.0, ease: EXPO, delay: 0.3 }}
              style={{ borderRadius: 24, overflow: 'hidden', minHeight: 480, position: 'relative', background: 'var(--bg-2)' }}
            >
              <motion.div style={{ y: videoY, position: 'absolute', inset: '-20% 0', height: '140%' }}>
                <video
                  autoPlay muted loop playsInline preload="none"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                >
                  <source src="/videos/Data Science Solution Hero Section.mp4" type="video/mp4" />
                </video>
              </motion.div>
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.30)', zIndex: 1 }} />
            </motion.div>

            {/* RIGHT — expertise card slides in */}
            <motion.div
              initial={{ opacity: 0, x: 60, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.0, ease: EXPO, delay: 0.45 }}
              style={{ borderRadius: 24, background: 'linear-gradient(160deg,#1A56DB 0%,#0E2E75 60%,#0A1F4F 100%)', padding: '36px 32px', display: 'flex', flexDirection: 'column', minHeight: 480, position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 14, lineHeight: 1.3, letterSpacing: '-0.01em' }}>Our Analytics Expertise</h3>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', marginBottom: 16 }} />
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.80)', lineHeight: 1.75, marginBottom: 28 }}>
                  From data engineering to AI-driven insights, we help you harness the full power of your data to innovate, optimize and scale.
                </p>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>Highlights</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
                  {['Predictive and statistical modeling', 'Advanced analytics systems', 'Forecasting and trend analysis', 'Decision intelligence frameworks'].map((h, i) => (
                    <motion.div
                      key={h}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, ease: EXPO, delay: 0.7 + i * 0.08 }}
                      style={{ display: 'flex', alignItems: 'center', gap: 12 }}
                    >
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(77,134,245,0.25)', border: '1px solid rgba(77,134,245,0.40)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <ArrowRight size={10} color="#80A9FF" strokeWidth={2} />
                      </div>
                      <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>{h}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          OUR APPROACH — 2×2 bento, directional reveals
      ══════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg)', padding: '120px 0', position: 'relative' }}>
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>

          {/* Heading slides up */}
          <motion.div
            variants={FU(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            style={{ marginBottom: 56 }}
          >
            <div className="section-badge" style={{ marginBottom: 16 }}>Our Approach</div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, color: 'var(--fg)', maxWidth: 600 }}>
              Approach to <span className="grad">Data-Driven Decisions</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridTemplateAreas: '"tl tl tl tl tr tr tr" "bl bl bl br br br br"', gap: 16 }} className="ds-bento">

            {/* TL — slides from left */}
            <motion.div
              variants={FL(0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="glass"
              style={{ padding: '40px', display: 'flex', flexDirection: 'column', minHeight: 360, gridArea: 'tl', boxShadow: '0 4px 24px rgba(26,86,219,0.07)' }}
            >
              <div className="ds-bento-icon" style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(26,86,219,0.10)', border: '1px solid rgba(77,134,245,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <BarChart2 size={22} color="currentColor" strokeWidth={1.5} />
              </div>
              <h3 style={{ fontSize: 'clamp(22px,2.5vw,36px)', fontWeight: 700, color: 'var(--fg)', lineHeight: 1.2, marginBottom: 20, letterSpacing: '-0.02em' }}>
                Clarity That <span className="grad">Drives Decisions</span>
              </h3>
              <div style={{ background: 'rgba(26,86,219,0.06)', border: '1px solid rgba(26,86,219,0.10)', borderRadius: 16, padding: '20px 22px', flex: 1 }}>
                <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.80 }}>
                  Data alone doesn&apos;t drive decisions. Clarity does. While most teams are surrounded by information, only a few truly understand what matters. By cutting through complexity, we transform scattered data into a clear, focused direction that enables confident decision-making at every level.
                </p>
              </div>
            </motion.div>

            {/* TR — slides from right */}
            <motion.div
              variants={FR(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="glass"
              style={{ padding: '40px', position: 'relative', overflow: 'hidden', minHeight: 360, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gridArea: 'tr', boxShadow: '0 4px 24px rgba(26,86,219,0.07)' }}
            >
              <div style={{ position: 'absolute', bottom: 24, right: 24, width: 160, height: 160, pointerEvents: 'none' }}>
                <Image src="/images/Dispersed_glass_3d_illustrations_vol_2_3_6b652c20f7 1.png" alt="3D glass" width={160} height={160} style={{ objectFit: 'contain' }} />
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontSize: 'clamp(18px,1.8vw,26px)', fontWeight: 700, color: 'var(--fg)', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                  Visibility without action<br /><span className="grad">creates noise.</span>
                </h3>
              </div>
              <p style={{ fontSize: 18, fontWeight: 400, color: 'var(--fg-3)', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>
                We design for outcomes,<br />not observation.
              </p>
            </motion.div>

            {/* BL — Explore Blogs */}
            <motion.div
              variants={FL(0.15)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="glass"
              style={{ padding: '40px', display: 'flex', gap: 24, minHeight: 380, gridArea: 'bl', boxShadow: '0 4px 24px rgba(26,86,219,0.07)' }}
            >
              <div style={{ flex: '0 0 150px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 150 }}>
                <h3 style={{ fontSize: 'clamp(22px,2.5vw,36px)', fontWeight: 700, color: 'var(--fg)', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                  Explore<br />More<br /><span className="grad">Blogs</span>
                </h3>
                <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 700, color: '#fff', background: '#1A56DB', padding: '11px 20px', borderRadius: 10, textDecoration: 'none', boxShadow: '0 4px 16px rgba(26,86,219,0.32)', width: 'fit-content' }}>
                  Explore Blogs <ArrowRight size={12} strokeWidth={2} />
                </Link>
              </div>
              <Link href="/blog/how-will-ai-take-over-jobs" style={{ flex: 1, borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', textDecoration: 'none', minHeight: 0 }}>
                <div style={{ height: 160, flexShrink: 0, backgroundImage: 'url(https://dev.moreyeahs.com/wp-content/uploads/2025/12/How-Will-Artificial-Intelligence-Affect-Jobs-in-2026.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ padding: '14px 16px 16px', background: 'var(--bg)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#4D86F5', background: 'rgba(77,134,245,0.10)', border: '1px solid rgba(77,134,245,0.22)', padding: '3px 10px', borderRadius: 100, alignSelf: 'flex-start' }}>AI</span>
                  <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--fg)', lineHeight: 1.4, margin: 0 }}>How Will AI Affect Jobs in 2026?</p>
                  <p style={{ fontSize: 11, color: 'var(--fg-3)', lineHeight: 1.55, margin: 0 }}>AI is reshaping industries faster than any previous technology shift...</p>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#4D86F5', display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                    Read More <ArrowRight size={11} strokeWidth={2.5} />
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* BR — slides from right */}
            <motion.div
              variants={FR(0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              style={{ background: 'linear-gradient(135deg,#1A56DB 0%,#0E2E75 55%,#0A1F4F 100%)', borderRadius: 20, padding: '40px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 300, gridArea: 'br' }}
            >
              <div style={{ position: 'relative', zIndex: 1, maxWidth: 'calc(100% - 300px)' }}>
                <h3 style={{ fontSize: 'clamp(22px,2.5vw,36px)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 18, letterSpacing: '-0.02em' }}>Our Specializations</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                  {SPECIALIZATIONS.map((s, si) => (
                    <motion.div
                      key={s}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55, ease: EXPO, delay: 0.35 + si * 0.08 }}
                      style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                    >
                      <ArrowRight size={13} color="rgba(255,255,255,0.65)" strokeWidth={1.5} />
                      <span style={{ fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.90)' }}>{s}</span>
                    </motion.div>
                  ))}
                </div>
                <Link href="/contact-us" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#fff', color: '#1A56DB', fontSize: 13, fontWeight: 700, borderRadius: 10, padding: '11px 20px', textDecoration: 'none', width: 'fit-content' }}>
                  Contact Us <ArrowRight size={12} strokeWidth={2} />
                </Link>
              </div>
              <div style={{ position: 'absolute', bottom: 0, right: 0, zIndex: 1, width: 280, height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image src="/images/robot-with-tick-symbol 3.png" alt="Robot" width={280} height={280} style={{ objectFit: 'contain' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          OUR SERVICES — sticky stacking
      ══════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg)', paddingTop: 80, paddingBottom: 0, position: 'relative' }}>
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            variants={FU(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{ marginBottom: 48 }}
          >
            <div className="section-badge" style={{ marginBottom: 16 }}>What We Offer</div>
            <h2 style={{ fontSize: 'clamp(32px,4vw,56px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, color: 'var(--fg)' }}>
              Our <span className="grad">Services</span>
            </h2>
            <p style={{ fontSize: 16, color: 'var(--fg-3)', lineHeight: 1.7, maxWidth: 600, marginTop: 12 }}>
              Solutions that simplify operations, unlock insights and drive measurable results at scale.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column' }} className="ds-svc-stack">
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 60, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.85, ease: EXPO, delay: i * 0.06 }}
                style={{
                  position: 'sticky', top: `${80 + i * 20}px`, zIndex: i + 2,
                  borderRadius: 24, overflow: 'hidden',
                  backgroundImage: `url('/images/${svc.dark ? 'Services Card Slide 2.png' : 'White Service card New.png'}')`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  border: svc.dark ? '1px solid rgba(77,134,245,0.15)' : '1px solid var(--card-border)',
                  padding: 'clamp(40px,5vw,72px)', marginBottom: 16,
                }}
              >
                <div style={{ position: 'absolute', inset: 0, background: svc.dark ? 'rgba(10,20,60,0.38)' : 'rgba(255,255,255,0.82)', backdropFilter: 'blur(4px)', boxShadow: svc.dark ? 'none' : '0 8px 40px rgba(0,0,0,0.10)' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 60, position: 'relative', zIndex: 1 }} className="svc-card-inner">
                  <div style={{ flex: '0 0 auto', maxWidth: 280 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 12, marginBottom: 20, background: svc.dark ? 'rgba(77,134,245,0.25)' : 'rgba(26,86,219,0.10)', border: svc.dark ? '1px solid rgba(77,134,245,0.40)' : '1px solid rgba(77,134,245,0.25)', fontSize: 13, fontWeight: 800, color: svc.dark ? '#80A9FF' : '#1A56DB' }}>
                      {`0${i + 1}`}
                    </div>
                    <h3 style={{ fontSize: 'clamp(24px,2.8vw,42px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: svc.dark ? '#fff' : '#1A56DB', marginBottom: 20 }}>{svc.title}</h3>
                    <Link href={svc.href ?? '/contact-us'} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 600, color: svc.dark ? 'rgba(255,255,255,0.80)' : '#1A56DB', textDecoration: 'none' }}>
                      Learn More <ArrowRight size={13} strokeWidth={1.5} />
                    </Link>
                  </div>
                  <div style={{ flex: '0 0 520px' }}>
                    <p style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: svc.dark ? '#fff' : '#0A1F4F', lineHeight: 1.3, marginBottom: 10 }}>{svc.tagline}</p>
                    <p style={{ fontSize: 15, color: svc.dark ? 'rgba(255,255,255,0.80)' : '#3D3D3D', lineHeight: 1.75, marginBottom: 28 }}>{svc.desc}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 24px' }}>
                      {svc.list.map(item => (
                        <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                          <span style={{ width: 17, height: 17, borderRadius: '50%', background: svc.dark ? 'rgba(77,134,245,0.25)' : 'rgba(26,86,219,0.12)', border: svc.dark ? '1px solid rgba(77,134,245,0.40)' : '1px solid rgba(77,134,245,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: svc.dark ? '#80A9FF' : '#1A56DB', flexShrink: 0, marginTop: 2 }}>✓</span>
                          <span style={{ fontSize: 14, color: svc.dark ? 'rgba(255,255,255,0.85)' : '#262626', lineHeight: 1.55 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{ height: 120 }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          HOW IT FITS TOGETHER — flow steps
      ══════════════════════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(160deg,#050d1e 0%,#0a1f4f 30%,#0e2e75 65%,#1a56db 100%)', padding: '120px 0', position: 'relative' }}>
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>

          <motion.div
            variants={FU(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{ marginBottom: 72 }}
          >
            <div className="section-badge" style={{ marginBottom: 16, background: 'rgba(77,134,245,0.18)', border: '1px solid rgba(77,134,245,0.30)' }}>Pipeline</div>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,52px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.15 }}>
              How It Fits Together
            </h2>
          </motion.div>

          <div style={{ display: 'flex', alignItems: 'flex-start', overflowX: 'auto', gap: 0, paddingBottom: 8 }}>
            {STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, ease: EXPO, delay: i * 0.12 }}
                style={{ display: 'flex', alignItems: 'flex-start', flexShrink: 0 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.25, ease: EXPO }}
                  style={{ textAlign: 'center', width: 'clamp(140px,18vw,210px)', padding: '0 16px' }}
                >
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(77,134,245,0.18)', border: '1px solid rgba(77,134,245,0.32)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <s.Icon size={26} color="#80A9FF" strokeWidth={1.5} />
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', marginBottom: 8 }}>{s.step}</div>
                  <p style={{ fontSize: 16, fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: 10 }}>{s.label}</p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.58)', lineHeight: 1.6 }}>{s.sub}</p>
                </motion.div>
                {i < STEPS.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.4, duration: 0.4 }}
                    style={{ paddingTop: 24, flexShrink: 0, color: 'rgba(255,255,255,0.28)' }}
                  >
                    <ChevronRight size={20} strokeWidth={1.5} />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          INDUSTRY USE CASES — staggered scale cards
      ══════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg)', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>

          <motion.div
            variants={FU(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{ marginBottom: 64 }}
          >
            <div className="section-badge" style={{ marginBottom: 16 }}>Industry Use Cases</div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, color: 'var(--fg)', maxWidth: 640 }}>
              Data Science Solutions <span className="grad">Across Industries</span>
            </h2>
            <p style={{ fontSize: 16, color: 'var(--fg-3)', lineHeight: 1.7, maxWidth: 560, marginTop: 14 }}>
              We deliver domain-specific AI and analytics solutions that understand the nuances of your industry.
            </p>
          </motion.div>

          <motion.div
            variants={STAGGER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}
            className="ds-ind-grid"
          >
            {INDUSTRIES.map((ind) => (
              <motion.div
                key={ind.label}
                variants={SC(0)}
                whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(26,86,219,0.15)', transition: { duration: 0.3, ease: EXPO } }}
                className="glass"
                style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: 0, cursor: 'default' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div className="ds-ind-icon-wrap" style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(26,86,219,0.10)', border: '1px solid rgba(77,134,245,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ind.Icon size={20} color="currentColor" strokeWidth={1.5} />
                  </div>
                  <span className="ds-ind-label" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{ind.label}</span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--fg)', lineHeight: 1.3, marginBottom: 12, letterSpacing: '-0.01em' }}>{ind.headline}</h3>
                <p style={{ fontSize: 14, color: 'var(--fg-3)', lineHeight: 1.72, marginBottom: 20, flex: 1 }}>{ind.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {ind.tags.map(tag => (
                    <span key={tag} className="ds-ind-tag" style={{ fontSize: 11, fontWeight: 600, background: 'rgba(26,86,219,0.08)', border: '1px solid rgba(77,134,245,0.20)', padding: '4px 10px', borderRadius: 100 }}>{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROBLEMS & SOLUTIONS — opposing slide
      ══════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-2)', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 80, alignItems: 'flex-start' }} className="ds-prob-row">

            {/* Left — slides from left, stays sticky */}
            <motion.div
              variants={FL(0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              style={{ position: 'sticky', top: 100 }}
            >
              <div className="section-badge" style={{ marginBottom: 16 }}>Common Challenges</div>
              <h2 style={{ fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, color: 'var(--fg)', marginBottom: 16 }}>
                Problems We <span className="grad">Solve</span>
              </h2>
              <p style={{ fontSize: 15, color: 'var(--fg-3)', lineHeight: 1.72 }}>
                Real obstacles that prevent organisations from unlocking the value of their data, and exactly how we address them.
              </p>
            </motion.div>

            {/* Right — items slide from right with stagger */}
            <motion.div
              variants={STAGGER}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              {PROBLEMS.map((item, i) => (
                <motion.div
                  key={i}
                  variants={FR(0)}
                  style={{
                    borderRadius: 16,
                    overflow: 'hidden',
                    border: `1px solid ${openProb === i ? 'rgba(77,134,245,0.28)' : 'var(--card-border)'}`,
                    background: 'var(--card-bg)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <button
                    onClick={() => setOpenProb(openProb === i ? null : i)}
                    style={{ width: '100%', textAlign: 'left', background: openProb === i ? 'rgba(26,86,219,0.05)' : 'none', border: 'none', padding: '20px 24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, fontFamily: 'inherit', transition: 'background 0.2s' }}
                  >
                    <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--fg)', lineHeight: 1.4 }}>{item.problem}</span>
                    <motion.div
                      animate={{ rotate: openProb === i ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: EXPO }}
                      style={{ width: 28, height: 28, borderRadius: '50%', background: openProb === i ? '#1A56DB' : 'rgba(26,86,219,0.10)', border: `1px solid ${openProb === i ? '#1A56DB' : 'rgba(77,134,245,0.22)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s, border-color 0.2s' }}
                    >
                      <Plus size={13} color={openProb === i ? '#fff' : '#1A56DB'} strokeWidth={2} />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {openProb === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EXPO }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ padding: '0 24px 20px 24px', borderTop: '1px solid rgba(77,134,245,0.14)', background: 'rgba(26,86,219,0.05)' }}>
                          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', paddingTop: 16 }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1A56DB', marginTop: 8, flexShrink: 0 }} />
                            <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.72 }}>{item.solution}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════ */}
      <TestimonialsSection />

      {/* ══════════════════════════════════════════════════
          FAQs — opposing slide
      ══════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg)', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 'clamp(40px,6vw,88px)', alignItems: 'start' }} className="ds-faq-layout">

            {/* Left — slides from left, sticky */}
            <motion.div
              variants={FL(0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              style={{ position: 'sticky', top: 100 }}
            >
              <div className="section-badge" style={{ marginBottom: 16 }}>FAQ</div>
              <h2 style={{ fontSize: 'clamp(26px,3vw,42px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.12, color: 'var(--fg)', marginBottom: 16 }}>
                Frequently Asked <span className="grad">Questions</span>
              </h2>
              <p style={{ fontSize: 14, color: 'var(--fg-3)', lineHeight: 1.72 }}>
                Common questions about our data science and AI services.
              </p>
            </motion.div>

            {/* Right — staggered from right */}
            <motion.div
              variants={STAGGER}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              className="ds-faq-grid"
            >
              {FAQS.map((item, i) => (
                <motion.div
                  key={i}
                  variants={FR(0)}
                  style={{
                    borderRadius: 16,
                    overflow: 'hidden',
                    border: `1px solid ${openFaq === i ? 'rgba(77,134,245,0.30)' : 'var(--card-border)'}`,
                    background: 'var(--card-bg)',
                    transition: 'border-color 0.2s',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: '100%', textAlign: 'left', background: openFaq === i ? 'rgba(26,86,219,0.05)' : 'none', border: 'none', padding: '18px 22px', cursor: 'pointer', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, fontFamily: 'inherit', transition: 'background 0.2s' }}
                  >
                    <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg)', lineHeight: 1.45 }}>{item.q}</span>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: EXPO }}
                      style={{ width: 26, height: 26, borderRadius: '50%', background: openFaq === i ? '#1A56DB' : 'rgba(26,86,219,0.08)', border: `1px solid ${openFaq === i ? '#1A56DB' : 'rgba(77,134,245,0.20)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2, transition: 'background 0.2s, border-color 0.2s' }}
                    >
                      <Plus size={12} color={openFaq === i ? '#fff' : '#1A56DB'} strokeWidth={2} />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EXPO }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ padding: '0 22px 20px 22px', borderTop: '1px solid rgba(77,134,245,0.15)', background: 'rgba(26,86,219,0.05)' }}>
                          <p style={{ fontSize: 14, color: 'var(--fg-3)', lineHeight: 1.78, paddingTop: 16 }}>{item.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════ */}
      <CTASection />

      <style>{`
        .ds-ind-icon-wrap { color: #1A56DB; }
        .dark .ds-ind-icon-wrap { color: #4D86F5; background: rgba(77,134,245,0.14)!important; border-color: rgba(77,134,245,0.32)!important; }
        .ds-ind-label { color: var(--fg-3); }
        .dark .ds-ind-label { color: var(--fg-2); }
        .ds-ind-tag { color: #1A56DB; }
        .dark .ds-ind-tag { color: #80A9FF; background: rgba(77,134,245,0.12)!important; border-color: rgba(128,169,255,0.28)!important; }
        .ds-bento-icon { color: #1A56DB; }
        .dark .ds-bento-icon { color: #4D86F5; }
        .dark .ds-blog-pill { color: #80A9FF!important; background: rgba(77,134,245,0.12)!important; border-color: rgba(128,169,255,0.28)!important; }
        .ds-svc-stack>div { transition: box-shadow 0.3s ease; }
        .ds-svc-stack>div:hover { box-shadow: 0 12px 48px rgba(26,86,219,0.22); }

        @media(max-width:1024px){
          .ds-hero-split{grid-template-columns:1fr!important}
          .ds-bento{display:flex!important;flex-direction:column!important}
          .ds-ind-grid{grid-template-columns:1fr 1fr!important}
          .ds-prob-row{grid-template-columns:1fr!important}
          .ds-prob-row>div:first-child{position:static!important}
          .ds-faq-layout{grid-template-columns:1fr!important}
          .ds-faq-layout>div:first-child{position:static!important}
          .ds-svc-stack>*{position:static!important}
        }
        @media(max-width:640px){
          .ds-ind-grid{grid-template-columns:1fr!important}
          .svc-card-inner{flex-direction:column!important;align-items:flex-start!important;gap:24px!important}
          .svc-card-inner>div:last-child{flex:auto!important;width:100%!important}
        }
      `}</style>
    </>
  );
}
