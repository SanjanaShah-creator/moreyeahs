'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  ArrowRight, Zap, Users, ChevronRight,
  BarChart2, Send, TrendingUp, RefreshCw, Plus,
  HeartPulse, DollarSign, ShoppingCart, Factory, GraduationCap, Truck,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';
import SolutionCaseStudies from '@/components/solutions/SolutionCaseStudies';
import { EXPO, FU, FL, FR, SC, STAGGER } from '@/lib/anim';

/* ’€’€’€ Data ’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€ */
const SPECIALIZATIONS = [
  'Sales Cloud Implementation & Optimisation',
  'Service Cloud & Case Management',
  'Marketing Cloud & Journey Automation',
  'Salesforce Analytics & Revenue Intelligence',
];

const SERVICES = [
  {
    id: 'implementation', title: 'Salesforce Implementation', dark: false,
    tagline: 'Get Salesforce right from day one.',
    desc: 'End-to-end Salesforce implementation across Sales Cloud, Service Cloud, and Marketing Cloud – designed around your actual processes, not a generic template.',
    list: ['Full-lifecycle CRM implementation', 'Custom object and workflow design', 'Data migration and validation', 'Role-based training and adoption'],
    href: '/solutions/salesforce-services/implementation',
  },
  {
    id: 'managed-services', title: 'Salesforce Support & Managed Services', dark: true,
    tagline: 'Keep your Salesforce org healthy and growing.',
    desc: 'Ongoing support, optimisation, and development for your Salesforce org – so your team always has a trusted partner to call when things need to change.',
    list: ['Org health monitoring and audits', 'Feature development and enhancements', 'User support and troubleshooting', 'Release management and upgrades'],
    href: '/solutions/salesforce-services/managed-services',
  },
];

const STEPS = [
  { step: '01', label: 'Discovery',     sub: 'Process mapping and org health audit',    Icon: Zap },
  { step: '02', label: 'Configuration', sub: 'Object design, flows and field mapping',   Icon: RefreshCw },
  { step: '03', label: 'Integration',   sub: 'API connections and data migration',        Icon: Send },
  { step: '04', label: 'Training',      sub: 'Role-based enablement and adoption',       Icon: Users },
  { step: '05', label: 'Optimisation',  sub: 'Post-go-live tuning and expansion',        Icon: TrendingUp },
];

const INDUSTRIES = [
  {
    Icon: DollarSign, label: 'Financial Services',
    headline: 'Financial Services Cloud for Wealth & Banking',
    desc: 'Manage client relationships, automate compliance workflows, and provide advisors with a complete view of client portfolios using Financial Services Cloud.',
    tags: ['Wealth Management', 'Compliance Automation', 'Client 360'],
  },
  {
    Icon: HeartPulse, label: 'Healthcare',
    headline: 'Health Cloud for Patient Engagement',
    desc: 'Deploy Salesforce Health Cloud to connect patient data across care teams, automate appointment scheduling, and personalise patient communication throughout the care journey.',
    tags: ['Patient Journeys', 'Care Coordination', 'HIPAA Compliance'],
  },
  {
    Icon: ShoppingCart, label: 'Retail & E-Commerce',
    headline: 'Commerce Cloud & Personalised Retail',
    desc: 'Build connected retail experiences with Commerce Cloud and Marketing Cloud, delivering AI-driven product recommendations, abandoned cart recovery, and loyalty programme automation.',
    tags: ['Commerce Cloud', 'Loyalty Automation', 'Recommendation AI'],
  },
  {
    Icon: Factory, label: 'Manufacturing',
    headline: 'Manufacturing Cloud for Demand & Accounts',
    desc: 'Align sales forecasts with production planning using Manufacturing Cloud, giving account managers and operations teams a shared view of run-rate agreements and pipeline.',
    tags: ['Manufacturing Cloud', 'Account Planning', 'Forecast Alignment'],
  },
  {
    Icon: GraduationCap, label: 'Education',
    headline: 'Education Cloud for Student Engagement',
    desc: 'Implement Salesforce Education Cloud to manage prospective student journeys, automate enrolment workflows, and track alumni engagement across the institution lifecycle.',
    tags: ['Enrolment Automation', 'Student 360', 'Alumni Engagement'],
  },
  {
    Icon: Truck, label: 'Logistics & Supply Chain',
    headline: 'CRM for Freight & Distribution Networks',
    desc: 'Centralise shipper relationships, automate pricing and quoting workflows, and give your commercial team real-time visibility into account health and contract renewals.',
    tags: ['Quoting Automation', 'Account Health', 'Contract Renewals'],
  },
];

const PROBLEMS = [
  {
    problem: 'Our Salesforce org has become messy and nobody trusts the data',
    solution: 'We run a structured org health assessment covering data quality, field usage, automation conflicts, and duplicate records. Then we deliver a prioritised remediation plan and clean data foundation that restores confidence so your team starts using the system properly.',
  },
  {
    problem: 'We implemented Salesforce but adoption is still low',
    solution: 'Low adoption almost always traces back to a system that does not match how your team actually sells or works. We audit your current setup, redesign key workflows around your real processes, and run role-based training sessions that make the system feel intuitive rather than enforced.',
  },
  {
    problem: 'We cannot get accurate pipeline forecasts out of Salesforce',
    solution: 'Forecast accuracy depends on consistent data entry and the right stage definitions. We redesign your sales process in Salesforce, implement forecast categories correctly, add validation rules that enforce data quality at entry, and build Revenue Intelligence dashboards that give leadership a reliable view of pipeline.',
  },
  {
    problem: 'Our marketing and sales teams work in separate systems with no visibility',
    solution: 'We integrate Marketing Cloud and Sales Cloud so that lead source, campaign touchpoints, and engagement history flow directly into the Sales rep view. Your teams work from the same data, and marketing attribution becomes transparent rather than disputed.',
  },
  {
    problem: 'Integrating Salesforce with our ERP or finance system is proving too complex',
    solution: 'We have built dozens of Salesforce integrations with SAP, NetSuite, Dynamics 365, and custom systems. We design the right integration pattern for your use case whether real-time via API, near-real-time via middleware, or batched overnight, and handle the data mapping, error handling, and monitoring that makes integrations reliable.',
  },
];

const FAQS = [
  {
    q: 'Are you a certified Salesforce partner?',
    a: 'Yes. MoreYeahs is a certified Salesforce ISV and implementation partner with credentials across Sales Cloud, Service Cloud, Marketing Cloud, Platform Developer, and CPQ. Our consultants hold 15+ active Salesforce certifications.',
  },
  {
    q: 'How long does a typical Salesforce implementation take?',
    a: 'A focused Sales Cloud or Service Cloud implementation takes 8-16 weeks depending on complexity. Multi-cloud implementations covering Sales, Service, and Marketing Cloud typically run 4-8 months. We always phase delivery to get core functionality live early while building out the full solution.',
  },
  {
    q: 'Do you work with existing Salesforce orgs or only greenfield?',
    a: 'Both. About half our engagements are with organisations that already have Salesforce deployed but are not getting full value from it. We run org health assessments, clean up technical debt, redesign key workflows, and drive adoption without requiring a full re-implementation.',
  },
  {
    q: 'Can you migrate our data from our current CRM to Salesforce?',
    a: 'Yes. We handle data migration from HubSpot, Dynamics 365, Pipedrive, Zoho, and custom databases into Salesforce. Our migration process includes field mapping, data cleansing, deduplication, validation in a sandbox environment, and a controlled cutover so no records are lost.',
  },
  {
    q: 'What is Salesforce CPQ and do you implement it?',
    a: 'CPQ (Configure, Price, Quote) is a Salesforce product that automates complex quoting, pricing rules, discounting approvals, and contract generation. We implement CPQ for companies with configurable products, tiered pricing, or sales cycles that require formal proposals and approvals.',
  },
  {
    q: 'How do you ensure our Salesforce implementation stays maintained after go-live?',
    a: 'We offer post-go-live managed services covering ongoing administration, Salesforce releases (three per year), user support, automation maintenance, and continuous improvement sprints. Clients can choose a dedicated admin retainer or a flexible hours model based on their internal capacity.',
  },
];

/* ’€’€’€ Word Reveal ’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€ */
function WordReveal({ text, delay = 0, className, style }: { text: string; delay?: number; className?: string; style?: React.CSSProperties }) {
  const words = text.split(' ');
  return (
    <span className={className} style={{ ...style, display: 'inline' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EXPO, delay: delay + i * 0.07 }}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ’€’€’€ Page ’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€ */
export default function SalesforceServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openProb, setOpenProb] = useState<number | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const rawVideoY = useTransform(heroScroll, [0, 1], ['0%', '28%']);
  const rawHeroFade = useTransform(heroScroll, [0, 0.65], [1, 0]);
  const rawHeroY = useTransform(heroScroll, [0, 1], ['0%', '-14%']);
  const videoY = useSpring(rawVideoY, { stiffness: 80, damping: 20, mass: 0.5 });
  const heroFade = useSpring(rawHeroFade, { stiffness: 80, damping: 20 });
  const heroTextY = useSpring(rawHeroY, { stiffness: 80, damping: 20 });

  return (
    <>
      {/* ••••••••••••••••••••••••••••••••••••••••••••••••••
          HERO
      •••••••••••••••••••••••••••••••••••••••••••••••••• */}
      <section ref={heroRef} style={{ background: 'var(--bg)', paddingTop: 100, paddingBottom: 64, position: 'relative', overflow: 'hidden' }}>
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div style={{ y: heroTextY, opacity: heroFade, marginBottom: 36 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EXPO }}
            >
              <div className="section-badge" style={{ marginBottom: 20 }}>
                <Zap size={12} color="#4D86F5" strokeWidth={2} />
                Salesforce Services
              </div>
            </motion.div>
            <h1 style={{ fontSize: 'clamp(36px,4.5vw,68px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--fg)' }}>
              <WordReveal text="Strengthen Relationships." delay={0.1} /><br />
              <WordReveal text="Drive Growth." delay={0.3} />{' '}
              <motion.span initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: EXPO, delay: 0.45 }} style={{ display: 'inline-block', background: 'linear-gradient(120deg,#4D86F5 0%,#80A9FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>With Salesforce.</motion.span>
            </h1>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 24, alignItems: 'stretch' }} className="ds-hero-split">
            {/* LEFT – video */}
            <motion.div
              className="ds-hero-video-wrap"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: EXPO, delay: 0.15 }}
              style={{ borderRadius: 24, overflow: 'hidden', minHeight: 480, position: 'relative', background: 'var(--bg-2)' }}
            >
              <motion.div style={{ y: videoY, position: 'absolute', inset: 0 }}>
                <video autoPlay muted loop playsInline preload="metadata" aria-label="Salesforce CRM solutions and implementation overview" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
                  <source src="/videos/Salesforce Solution Hero Section.webm" type="video/webm" />
                  <source src="/videos/Salesforce Solution Hero Section.mp4" type="video/mp4" />
                </video>
              </motion.div>
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.35)', zIndex: 1 }} />
            </motion.div>

            {/* RIGHT – expertise card */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: EXPO, delay: 0.25 }}
              style={{ borderRadius: 24, background: 'linear-gradient(160deg, #1A56DB 0%, #0E2E75 60%, #0A1F4F 100%)', padding: '36px 32px', display: 'flex', flexDirection: 'column', minHeight: 480, position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 14, lineHeight: 1.3, letterSpacing: '-0.01em' }}>Our Salesforce Expertise</h3>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', marginBottom: 16 }} />
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.80)', lineHeight: 1.75, marginBottom: 28 }}>
                  From CRM implementation to marketing automation and analytics, we design and deliver Salesforce solutions that increase pipeline, reduce churn, and give teams the tools to move faster.
                </p>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>Highlights</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
                  {['Sales Cloud and Service Cloud delivery', 'Marketing automation and journeys', 'CPQ and Revenue Intelligence', 'Org clean-up and adoption recovery'].map((h, i) => (
                    <motion.div
                      key={h}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, ease: EXPO, delay: 0.4 + i * 0.08 }}
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

      {/* ••••••••••••••••••••••••••••••••••••••••••••••••••
          OUR APPROACH – 2×2 bento
      •••••••••••••••••••••••••••••••••••••••••••••••••• */}
      <section style={{ background: 'var(--bg)', padding: '100px 0', position: 'relative' }}>
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            variants={FU(0)} initial="hidden" whileInView="visible" viewport={{ once: false, margin: '-80px' }}
            style={{ marginBottom: 48 }}
          >
            <div className="section-badge" style={{ marginBottom: 16 }}>Our Approach</div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, color: 'var(--fg)', maxWidth: 600 }}>
              Approach to <span className="grad">CRM-Driven Growth</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridTemplateAreas: '"tl tl tl tl tr tr tr" "bl bl bl br br br br"', gap: 16 }} className="ds-bento">

            {/* TL */}
            <motion.div
              variants={FL(0)} initial="hidden" whileInView="visible" viewport={{ once: false, margin: '-80px' }}
              className="glass" style={{ padding: '40px', display: 'flex', flexDirection: 'column', minHeight: 360, gridArea: 'tl', boxShadow: '0 4px 24px rgba(26,86,219,0.07)' }}
            >
              <div className="ds-bento-icon" style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(26,86,219,0.10)', border: '1px solid rgba(77,134,245,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <BarChart2 size={22} color="currentColor" strokeWidth={1.5} />
              </div>
              <h3 style={{ fontSize: 'clamp(22px,2.5vw,36px)', fontWeight: 700, color: 'var(--fg)', lineHeight: 1.2, marginBottom: 20, letterSpacing: '-0.02em' }}>
                CRM That <span className="grad">Drives Revenue</span>
              </h3>
              <div style={{ background: 'rgba(26,86,219,0.06)', border: '1px solid rgba(26,86,219,0.10)', borderRadius: 16, padding: '20px 22px', flex: 1 }}>
                <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.80 }}>
                  A CRM is only valuable when your teams use it consistently and trust what they see. Most Salesforce implementations are built around the platform&apos;s default structure rather than how the business actually operates. We configure Salesforce around your sales motion, service model, and reporting needs so adoption happens naturally, not through enforcement.
                </p>
              </div>
            </motion.div>

            {/* TR */}
            <motion.div
              variants={FR(0.1)} initial="hidden" whileInView="visible" viewport={{ once: false, margin: '-80px' }}
              className="glass" style={{ padding: '40px', position: 'relative', overflow: 'hidden', minHeight: 360, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gridArea: 'tr', boxShadow: '0 4px 24px rgba(26,86,219,0.07)' }}
            >
              <div className="ds-tr-deco" style={{ position: 'absolute', bottom: 24, right: 24, width: 160, height: 160, pointerEvents: 'none' }}>
                <Image src="/images/Dispersed_glass_3d_illustrations_vol_2_3_6b652c20f7 1.png" alt="3D glass illustration" width={160} height={160} style={{ objectFit: 'contain', width: '100%', height: 'auto' }} />
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontSize: 'clamp(18px,1.8vw,26px)', fontWeight: 700, color: 'var(--fg)', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                  Data without action<br /><span className="grad">is wasted potential.</span>
                </h3>
              </div>
              <p style={{ fontSize: 18, fontWeight: 400, color: 'var(--fg-3)', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>
                We design for outcomes,<br />not configuration.
              </p>
            </motion.div>

            {/* BL – Explore Blogs */}
            <motion.div
              variants={FL(0.15)} initial="hidden" whileInView="visible" viewport={{ once: false, margin: '-80px' }}
              className="glass" style={{ padding: '40px', display: 'flex', gap: 24, minHeight: 380, gridArea: 'bl', boxShadow: '0 4px 24px rgba(26,86,219,0.07)' }}
            >
              <div className="ds-blog-bento-inner" style={{ display: 'flex', gap: 24, flex: 1, minHeight: 0 }}>
              <div className="ds-blog-header-col" style={{ flex: '0 0 150px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 150 }}>
                <h3 style={{ fontSize: 'clamp(22px,2.5vw,36px)', fontWeight: 700, color: 'var(--fg)', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                  Explore<br />More<br /><span className="grad">Blogs</span>
                </h3>
                <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 700, color: '#fff', background: '#1A56DB', padding: '11px 20px', borderRadius: 10, textDecoration: 'none', boxShadow: '0 4px 16px rgba(26,86,219,0.32)', width: 'fit-content' }}>
                  Explore Blogs <ArrowRight size={12} strokeWidth={2} />
                </Link>
              </div>
              <Link href="/blog/salesforce-marketing-cloud-implementation-guide" className="ds-blog-card" style={{ flex: 1, borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', textDecoration: 'none', minHeight: 0 }}>
                <div className="ds-blog-card-img" style={{ height: 160, flexShrink: 0, position: 'relative', overflow: 'hidden' }}><img src="https://dev.moreyeahs.com/wp-content/uploads/2025/11/Salesforce-Service-Cloud-Implementation_-A-Complete-Guide-2025.png" alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => { const el = e.currentTarget as HTMLImageElement; el.style.display = 'none'; const p = el.parentElement; if (p) { p.style.background = 'linear-gradient(135deg, #1A56DB 0%, #4D86F5 50%, #80A9FF 100%)'; } }} /></div>
                <div style={{ padding: '14px 16px 16px', background: 'var(--bg)', display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#4D86F5', background: 'rgba(77,134,245,0.10)', border: '1px solid rgba(77,134,245,0.22)', padding: '3px 10px', borderRadius: 100, alignSelf: 'flex-start' }}>Salesforce</span>
                  <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--fg)', lineHeight: 1.4, margin: 0 }}>Salesforce Marketing Cloud Implementation Guide</p>
                  <p style={{ fontSize: 11, color: 'var(--fg-3)', lineHeight: 1.55, margin: 0 }}>A complete guide to implementing Salesforce Marketing Cloud for your business...</p>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#4D86F5', display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                    Read More <ArrowRight size={11} strokeWidth={2.5} />
                  </span>
                </div>
              </Link>
              </div>{/* /ds-blog-bento-inner */}
            </motion.div>

            {/* BR – Specializations */}
            <motion.div
              variants={FR(0.2)} initial="hidden" whileInView="visible" viewport={{ once: false, margin: '-80px' }}
              style={{ background: 'linear-gradient(135deg, #1A56DB 0%, #0E2E75 55%, #0A1F4F 100%)', borderRadius: 20, padding: '40px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 300, gridArea: 'br' }}
            >
              <div className="ds-br-content" style={{ position: 'relative', zIndex: 1, maxWidth: 'calc(100% - 300px)' }}>
                <h3 style={{ fontSize: 'clamp(22px,2.5vw,36px)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 18, letterSpacing: '-0.02em' }}>Our Specializations</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                  {SPECIALIZATIONS.map((s, i) => (
                    <motion.div
                      key={s}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.5, ease: EXPO, delay: 0.3 + i * 0.08 }}
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
              <div className="ds-br-robot-wrap" style={{ position: 'absolute', bottom: 0, right: 0, zIndex: 1, width: 280, height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image src="/images/robot-with-tick-symbol 3.png" alt="Salesforce solutions robot illustration" width={280} height={280} style={{ objectFit: 'contain', width: '100%', height: 'auto' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ••••••••••••••••••••••••••••••••••••••••••••••••••
          OUR SERVICES – sticky stacking
      •••••••••••••••••••••••••••••••••••••••••••••••••• */}
      <section style={{ background: 'var(--bg-2)', paddingTop: 80, paddingBottom: 0, position: 'relative' }}>
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            variants={FU(0)} initial="hidden" whileInView="visible" viewport={{ once: false, margin: '-80px' }}
            style={{ marginBottom: 48 }}
          >
            <div className="section-badge" style={{ marginBottom: 16 }}>What We Offer</div>
            <h2 style={{ fontSize: 'clamp(32px,4vw,56px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, color: 'var(--fg)' }}>
              Our <span className="grad">Services</span>
            </h2>
            <p style={{ fontSize: 16, color: 'var(--fg-3)', lineHeight: 1.7, maxWidth: 600, marginTop: 12 }}>
              Salesforce solutions that increase pipeline velocity, reduce customer churn and put actionable data in front of the people who need it most.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column' }} className="ds-svc-stack">
            {SERVICES.map((svc, i) => (
              <div key={svc.id} style={{
                position: 'sticky', top: `${80 + i * 20}px`, zIndex: i + 2,
                borderRadius: 24, overflow: 'hidden',
                backgroundImage: `url('/images/${svc.dark ? 'Services Card Slide 2.png' : 'White Service card New.png'}')`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                backgroundColor: svc.dark ? '#0A1F4F' : '#FFFFFF',
                border: svc.dark ? '1px solid rgba(77,134,245,0.15)' : '1px solid rgba(77,134,245,0.28)',
                boxShadow: svc.dark ? 'none' : '0 4px 24px rgba(77,134,245,0.10)',
                padding: 'clamp(40px,5vw,72px)', marginBottom: 16,
              }}>
                <div className={`svc-overlay ${svc.dark ? 'svc-overlay-dark' : 'svc-overlay-light'}`} style={{ position: 'absolute', inset: 0, background: svc.dark ? 'rgba(10,20,60,0.45)' : 'rgba(255,255,255,0.55)', backdropFilter: 'blur(4px)', boxShadow: svc.dark ? 'none' : '0 8px 40px rgba(0,0,0,0.10)' }} />
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
                  <div style={{ flex: '1 1 0', minWidth: 0 }}>
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
              </div>
            ))}
          </div>
          <div style={{ height: 120 }} />
        </div>
      </section>

      {/* ••••••••••••••••••••••••••••••••••••••••••••••••••
          HOW IT FITS TOGETHER
      •••••••••••••••••••••••••••••••••••••••••••••••••• */}
      <section style={{ background: 'linear-gradient(160deg, #050d1e 0%, #0a1f4f 30%, #0e2e75 65%, #1a56db 100%)', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            variants={FU(0)} initial="hidden" whileInView="visible" viewport={{ once: false, margin: '-80px' }}
            style={{ marginBottom: 64 }}
          >
            <div className="section-badge" style={{ marginBottom: 16, background: 'rgba(77,134,245,0.18)', border: '1px solid rgba(77,134,245,0.30)' }}>Pipeline</div>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,52px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.15 }}>
              How It Fits Together
            </h2>
          </motion.div>

          <div className="pipeline-wrap" style={{ display: 'flex', alignItems: 'flex-start', overflowX: 'auto', gap: 0, paddingBottom: 8, paddingTop: 4 }}>
            {STEPS.map((s, i) => (
              <motion.div key={s.step}
                className="pipeline-step"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7, ease: EXPO, delay: i * 0.12 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                style={{ display: 'flex', alignItems: 'flex-start', flexShrink: 0 }}
              >
                <div className="pipeline-step-inner" style={{ textAlign: 'center', width: 'clamp(140px,18vw,210px)', padding: '0 16px' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(77,134,245,0.18)', border: '1px solid rgba(77,134,245,0.32)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <s.Icon size={26} color="#80A9FF" strokeWidth={1.5} />
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', marginBottom: 8 }}>{s.step}</div>
                  <p style={{ fontSize: 16, fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: 10 }}>{s.label}</p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.58)', lineHeight: 1.6 }}>{s.sub}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="pipeline-connector" style={{ paddingTop: 24, flexShrink: 0, color: 'rgba(255,255,255,0.28)' }}>
                    <ChevronRight size={20} strokeWidth={1.5} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ••••••••••••••••••••••••••••••••••••••••••••••••••
          INDUSTRY USE CASES
      •••••••••••••••••••••••••••••••••••••••••••••••••• */}
      <section style={{ background: 'var(--bg)', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            variants={FU(0)} initial="hidden" whileInView="visible" viewport={{ once: false, margin: '-80px' }}
            style={{ marginBottom: 56 }}
          >
            <div className="section-badge" style={{ marginBottom: 16 }}>Industry Use Cases</div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, color: 'var(--fg)', maxWidth: 640 }}>
              Salesforce Solutions <span className="grad">Across Industries</span>
            </h2>
            <p style={{ fontSize: 16, color: 'var(--fg-3)', lineHeight: 1.7, maxWidth: 560, marginTop: 14 }}>
              We implement and configure Salesforce products to match the specific customer relationships, sales cycles, and compliance requirements of your industry.
            </p>
          </motion.div>

          <motion.div
            variants={STAGGER(0.09)} initial="hidden" whileInView="visible" viewport={{ once: false, margin: '-80px' }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="ds-ind-grid"
          >
            {INDUSTRIES.map(ind => (
              <motion.div key={ind.label}
                variants={SC(0)}
                whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(26,86,219,0.16)', transition: { duration: 0.3, ease: EXPO } }}
                className="glass" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: 0 }}
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

      {/* ••••••••••••••••••••••••••••••••••••••••••••••••••
          PROBLEMS & SOLUTIONS
      •••••••••••••••••••••••••••••••••••••••••••••••••• */}
      <section style={{ background: 'var(--bg-2)', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 80, alignItems: 'flex-start' }} className="ds-prob-row">

            <div style={{ position: 'sticky', top: 100 }}>
              <motion.div variants={FL(0)} initial="hidden" whileInView="visible" viewport={{ once: false, margin: '-80px' }}>
                <div className="section-badge" style={{ marginBottom: 16, background: 'rgba(26,86,219,0.12)', border: '1px solid rgba(26,86,219,0.25)' }}>Common Challenges</div>
                <h2 style={{ fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, color: 'var(--fg)', marginBottom: 16 }}>
                  Problems We <span className="grad">Solve</span>
                </h2>
                <p style={{ fontSize: 15, color: 'var(--fg-3)', lineHeight: 1.72 }}>
                  Real Salesforce challenges that prevent organisations from realising the platform&apos;s full value, and exactly how we address them.
                </p>
              </motion.div>
            </div>

            <motion.div
              variants={STAGGER(0.07)} initial="hidden" whileInView="visible" viewport={{ once: false, margin: '-80px' }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              {PROBLEMS.map((item, i) => (
                <motion.div key={i} variants={FR(0)}>
                  <button
                    onClick={() => setOpenProb(openProb === i ? null : i)}
                    style={{ width: '100%', textAlign: 'left', background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 16, padding: '20px 24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, backdropFilter: 'blur(16px)' }}
                  >
                    <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--fg)', lineHeight: 1.4 }}>{item.problem}</span>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: openProb === i ? '#1A56DB' : 'rgba(26,86,219,0.10)', border: `1px solid ${openProb === i ? '#1A56DB' : 'rgba(77,134,245,0.22)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s, border-color 0.2s' }}>
                      <motion.div animate={{ rotate: openProb === i ? 45 : 0 }} transition={{ duration: 0.2 }}>
                        <Plus size={13} color={openProb === i ? '#fff' : '#1A56DB'} strokeWidth={2} />
                      </motion.div>
                    </div>
                  </button>
                  <AnimatePresence>
                    {openProb === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: 'hidden' }}>
                        <div style={{ padding: '16px 24px 20px', background: 'rgba(26,86,219,0.06)', borderRadius: '0 0 16px 16px', borderLeft: '1px solid rgba(77,134,245,0.15)', borderRight: '1px solid rgba(77,134,245,0.15)', borderBottom: '1px solid rgba(77,134,245,0.15)' }}>
                          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
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

      {/* ••••••••••••••••••••••••••••••••••••••••••••••••••
          TESTIMONIALS
      •••••••••••••••••••••••••••••••••••••••••••••••••• */}
      <SolutionCaseStudies filter="salesforce" solutionName="Salesforce" />

      {/* ••••••••••••••••••••••••••••••••••••••••••••••••••
          FAQs
      •••••••••••••••••••••••••••••••••••••••••••••••••• */}
      <section style={{ background: 'var(--bg)', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 'clamp(40px,6vw,88px)', alignItems: 'start' }} className="ds-faq-layout">

            <motion.div
              variants={FL(0)} initial="hidden" whileInView="visible" viewport={{ once: false, margin: '-80px' }}
              style={{ position: 'sticky', top: 100 }}
            >
              <div className="section-badge" style={{ marginBottom: 16 }}>FAQ</div>
              <h2 style={{ fontSize: 'clamp(26px,3vw,42px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.12, color: 'var(--fg)', marginBottom: 16 }}>
                Frequently Asked <span className="grad">Questions</span>
              </h2>
              <p style={{ fontSize: 14, color: 'var(--fg-3)', lineHeight: 1.72 }}>
                Common questions about our Salesforce implementation and managed services.
              </p>
            </motion.div>

            <motion.div
              variants={STAGGER(0.07)} initial="hidden" whileInView="visible" viewport={{ once: false, margin: '-80px' }}
              style={{ display: 'flex', flexDirection: 'column', gap: 10 }} className="ds-faq-grid"
            >
              {FAQS.map((item, i) => (
                <motion.div key={i} variants={FR(0)}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: '100%', textAlign: 'left', background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: openFaq === i ? '16px 16px 0 0' : 16, padding: '18px 22px', cursor: 'pointer', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', transition: 'border-radius 0.2s' }}
                  >
                    <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg)', lineHeight: 1.45 }}>{item.q}</span>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: openFaq === i ? '#1A56DB' : 'rgba(26,86,219,0.08)', border: `1px solid ${openFaq === i ? '#1A56DB' : 'rgba(77,134,245,0.20)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2, transition: 'background 0.2s, border-color 0.2s' }}>
                      <motion.div animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.2 }}>
                        <Plus size={12} color={openFaq === i ? '#fff' : '#1A56DB'} strokeWidth={2} />
                      </motion.div>
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: 'hidden' }}>
                        <div style={{ padding: '16px 22px 20px', background: 'rgba(26,86,219,0.05)', borderRadius: '0 0 16px 16px', border: '1px solid rgba(77,134,245,0.12)', borderTop: 'none' }}>
                          <p style={{ fontSize: 14, color: 'var(--fg-3)', lineHeight: 1.78 }}>{item.a}</p>
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

      {/* ••••••••••••••••••••••••••••••••••••••••••••••••••
          CTA
      •••••••••••••••••••••••••••••••••••••••••••••••••• */}
      <TestimonialsSection />

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
        }
        @media(max-width:768px){
          .ds-hero-video-wrap{min-height:220px!important;max-height:260px!important}
          .ds-tr-deco{display:none!important}
          .ds-br-robot-wrap{display:none!important}
          .ds-br-content{max-width:100%!important}
          .pipeline-wrap{flex-direction:column!important;overflow-x:visible!important;align-items:center!important;gap:0!important}
          .pipeline-step{flex-direction:column!important;align-items:center!important;width:100%!important}
          .pipeline-step-inner{width:100%!important;max-width:280px!important}
          .pipeline-connector{padding:0 0 4px!important;transform:rotate(90deg);display:flex;justify-content:center}
          .ds-blog-bento-inner{flex-direction:column!important}
          .ds-blog-header-col{flex:none!important;min-width:0!important;flex-direction:row!important;align-items:center!important;justify-content:space-between!important;margin-bottom:16px!important;gap:12px!important}
          .ds-blog-card-img{display:none!important}
          .ds-blog-card{flex:none!important}
          .svc-overlay-light{background:rgba(255,255,255,0.97)!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
          .svc-overlay-dark{background:rgba(10,20,60,0.92)!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
          .ds-svc-stack>*{padding:28px!important;position:relative!important;top:auto!important;z-index:auto!important}
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
