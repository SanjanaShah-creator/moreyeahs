'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  ArrowRight, Cloud, Server, ChevronRight,
  GitBranch, Settings, Activity, Shield, Plus,
  HeartPulse, DollarSign, ShoppingCart, Factory, GraduationCap, Truck,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';
import { EXPO, FU, FL, FR, SC, STAGGER } from '@/lib/anim';

/* ─── Data ─────────────────────────────────────────────────────────── */
const SPECIALIZATIONS = [
  'Multi-Cloud Architecture Design',
  'DevOps & CI/CD Automation',
  'Cloud Migration & Modernisation',
  'Infrastructure as Code',
];

const SERVICES = [
  {
    id: 'aws', title: 'AWS & Cloud Architecture', dark: false,
    tagline: 'Infrastructure built for enterprise scale.',
    desc: 'Design and deploy cloud-native platforms across AWS, GCP, and Azure that are resilient, cost-optimised, and ready for real-world demand.',
    list: ['High-availability architectures', 'Cost optimisation frameworks', 'Security and compliance by design', 'Multi-region deployment strategies'],
  },
  {
    id: 'devops', title: 'DevOps & CI/CD Pipelines', dark: true,
    tagline: 'Ship faster. Break less. Sleep better.',
    desc: 'Automate your software delivery lifecycle with battle-tested CI/CD pipelines, container orchestration, and zero-downtime deployment workflows.',
    list: ['Pipeline automation end to end', 'Container orchestration with Kubernetes', 'Zero-downtime blue-green deployments', 'Monitoring and alerting integrated'],
  },
  {
    id: 'migration', title: 'Cloud Migration', dark: false,
    tagline: 'Move to the cloud without the chaos.',
    desc: 'From lift-and-shift to full re-architecture, we migrate your systems to the cloud with rigorous planning that eliminates risk and minimises downtime.',
    list: ['Workload assessment and planning', 'Data migration with zero loss', 'Legacy system modernisation', 'Post-migration optimisation'],
  },
  {
    id: 'iac', title: 'Infrastructure as Code & Security', dark: true,
    tagline: 'Consistent, auditable, reproducible infrastructure.',
    desc: 'Manage your entire cloud estate through version-controlled code using Terraform, Pulumi, and CloudFormation with built-in security guardrails.',
    list: ['Repeatable environment provisioning', 'Policy-as-code enforcement', 'Secrets management and rotation', 'Compliance reporting automated'],
  },
];

const STEPS = [
  { step: '01', label: 'Assessment',    sub: 'Workload analysis and readiness scoring', Icon: Cloud },
  { step: '02', label: 'Architecture',  sub: 'Blueprint design and cost modelling',     Icon: Server },
  { step: '03', label: 'Provisioning',  sub: 'IaC templates and environment setup',     Icon: Settings },
  { step: '04', label: 'Deployment',    sub: 'Pipeline automation and go-live',          Icon: GitBranch },
  { step: '05', label: 'Operations',    sub: 'Monitoring, scaling, and optimisation',    Icon: Activity },
];

const INDUSTRIES = [
  {
    Icon: DollarSign, label: 'Financial Services',
    headline: 'Secure, Compliant Cloud Platforms',
    desc: 'Build PCI-DSS and SOC 2-compliant cloud environments with zero-trust networking, automated compliance reporting, and disaster recovery built in from day one.',
    tags: ['PCI-DSS Compliance', 'Zero-Trust Networking', 'Disaster Recovery'],
  },
  {
    Icon: HeartPulse, label: 'Healthcare',
    headline: 'HIPAA-Ready Healthcare Infrastructure',
    desc: 'Deploy HIPAA-compliant cloud architectures that protect patient data, enable real-time clinical system integration, and scale with growing workloads.',
    tags: ['HIPAA Compliance', 'Clinical Integration', 'HL7 & FHIR APIs'],
  },
  {
    Icon: ShoppingCart, label: 'Retail & E-Commerce',
    headline: 'Elastic Infrastructure for Peak Demand',
    desc: 'Handle Black Friday traffic spikes and flash sales without breaking a sweat. Auto-scaling cloud platforms that flex with demand and cut idle costs by up to 40%.',
    tags: ['Auto-Scaling', 'CDN Optimisation', 'Inventory Sync'],
  },
  {
    Icon: Factory, label: 'Manufacturing',
    headline: 'IoT & Edge Computing Platforms',
    desc: 'Connect factory floor devices to cloud analytics through purpose-built IoT ingestion pipelines, real-time dashboards, and edge computing nodes.',
    tags: ['IoT Ingestion', 'Edge Computing', 'OPC-UA Integration'],
  },
  {
    Icon: GraduationCap, label: 'Education',
    headline: 'Scalable Learning Infrastructure',
    desc: 'Support thousands of concurrent learners with cloud platforms engineered for high availability, global content delivery, and seamless LMS integration.',
    tags: ['LMS Integration', 'Global CDN', 'Video Streaming'],
  },
  {
    Icon: Truck, label: 'Logistics & Supply Chain',
    headline: 'Real-Time Visibility Platforms',
    desc: 'Power supply chain visibility with event-driven cloud architectures that process millions of shipment events per day with sub-second latency.',
    tags: ['Event-Driven Architecture', 'Real-Time Tracking', 'API Gateways'],
  },
];

const PROBLEMS = [
  {
    problem: 'Our infrastructure costs keep rising but performance stays flat',
    solution: 'We conduct a full cloud cost audit, identify over-provisioned resources, and implement auto-scaling policies, reserved instance strategies, and data tiering that typically reduce cloud spend by 25-40% without sacrificing performance.',
  },
  {
    problem: 'Deployments take too long and break production too often',
    solution: 'We build automated CI/CD pipelines with staged deployments, automated testing gates, and rollback mechanisms so your teams can ship multiple times per day with confidence rather than dread.',
  },
  {
    problem: 'We are not confident our cloud environment is secure',
    solution: 'We implement a zero-trust security model with network segmentation, secrets management, policy-as-code enforcement, and continuous vulnerability scanning so your cloud environment meets enterprise security standards.',
  },
  {
    problem: 'Our team cannot reproduce environments consistently across dev, staging and production',
    solution: 'We migrate your infrastructure to fully version-controlled Terraform or Pulumi code, enabling one-command environment creation that is identical across every stage of your pipeline.',
  },
  {
    problem: 'Migrating to cloud feels too risky with our current legacy systems',
    solution: 'We follow a proven phased migration methodology: workload assessment, pilot migration, parallel running, and cutover. Every migration includes automated rollback points so there is always a safe path back.',
  },
];

const FAQS = [
  {
    q: 'Which cloud platforms do you work with?',
    a: 'We work across AWS, Google Cloud Platform, and Microsoft Azure, as well as hybrid and multi-cloud setups. Our architects hold certifications across all three major platforms and will recommend the right fit based on your workloads, existing contracts, and technical requirements.',
  },
  {
    q: 'How long does a typical cloud migration take?',
    a: 'Scope drives timeline. A focused workload migration (one application and its data) typically takes 4-8 weeks. A full enterprise data centre migration with dozens of applications runs 3-9 months. We always phase work to deliver value early while managing risk.',
  },
  {
    q: 'Can you work with our existing DevOps tooling?',
    a: 'Yes. We integrate with GitHub Actions, GitLab CI, Jenkins, CircleCI, ArgoCD, and most common DevOps platforms. We extend and improve your existing pipelines rather than forcing a rip-and-replace if your current tooling is sound.',
  },
  {
    q: 'How do you handle security and compliance requirements?',
    a: 'Security is built into every architecture from the start, not bolted on at the end. We implement IAM least-privilege access, network segmentation, encryption at rest and in transit, secrets management via Vault or AWS Secrets Manager, and policy-as-code guardrails. We support PCI-DSS, HIPAA, SOC 2, and ISO 27001 requirements.',
  },
  {
    q: 'Do you offer ongoing managed services after the initial build?',
    a: 'Yes. We offer post-delivery managed services covering monitoring, alerting, incident response, cost optimisation, and continuous improvement. Engagements can be structured as a dedicated retainer or a flexible hours model depending on your team capacity.',
  },
  {
    q: 'How do you reduce risk during a migration?',
    a: 'Every migration follows our proven four-stage methodology: assess, pilot, execute, and optimise. We run parallel environments during cutover, implement automated rollback triggers, and conduct pre-migration dry runs so go-live is a non-event rather than a crisis.',
  },
];

/* ─── Word Reveal ───────────────────────────────────────────────────── */
function WordReveal({ text, delay = 0, className, style }: { text: string; delay?: number; className?: string; style?: React.CSSProperties }) {
  const words = text.split(' ');
  return (
    <span className={className} style={{ ...style, display: 'inline' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, ease: EXPO, delay: delay + i * 0.07 }}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function CloudInfrastructurePage() {
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
      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section ref={heroRef} style={{ background: 'var(--bg)', paddingTop: 100, paddingBottom: 64, position: 'relative', overflow: 'hidden' }}>
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div style={{ y: heroTextY, opacity: heroFade, marginBottom: 36 }}>
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, ease: EXPO }}
            >
              <div className="section-badge" style={{ marginBottom: 20 }}>
                <Cloud size={12} color="#4D86F5" strokeWidth={2} />
                Cloud &amp; Infrastructure
              </div>
            </motion.div>
            <h1 style={{ fontSize: 'clamp(36px,4.5vw,68px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--fg)' }}>
              <WordReveal text="Infrastructure That Scales." delay={0.1} /><br />
              <WordReveal text="Platforms That" delay={0.3} />{' '}
              <motion.span initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.75, ease: EXPO, delay: 0.45 }} style={{ display: 'inline-block', background: 'linear-gradient(120deg,#4D86F5 0%,#80A9FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Never Break.</motion.span>
            </h1>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 24, alignItems: 'stretch' }} className="ds-hero-split">
            {/* LEFT — video */}
            <motion.div
              initial={{ opacity: 0, x: -60, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: EXPO, delay: 0.15 }}
              style={{ borderRadius: 24, overflow: 'hidden', minHeight: 480, position: 'relative', background: 'var(--bg-2)' }}
            >
              <motion.div style={{ y: videoY, position: 'absolute', inset: 0 }}>
                <video autoPlay muted loop playsInline aria-label="Cloud and infrastructure solutions overview" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
                  <source src="/videos/Cloud and Infrastructure Solution  Hero Section.mp4" type="video/mp4" />
                </video>
              </motion.div>
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.35)', zIndex: 1 }} />
            </motion.div>

            {/* RIGHT — expertise card */}
            <motion.div
              initial={{ opacity: 0, x: 60, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: EXPO, delay: 0.25 }}
              style={{ borderRadius: 24, background: 'linear-gradient(160deg, #1A56DB 0%, #0E2E75 60%, #0A1F4F 100%)', padding: '36px 32px', display: 'flex', flexDirection: 'column', minHeight: 480, position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 14, lineHeight: 1.3, letterSpacing: '-0.01em' }}>Our Cloud Expertise</h3>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', marginBottom: 16 }} />
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.80)', lineHeight: 1.75, marginBottom: 28 }}>
                  From architecture design to live operations, we build cloud platforms that are resilient, cost-efficient, and engineered for the demands of modern enterprise.
                </p>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>Highlights</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
                  {['AWS, GCP and Azure certified architects', 'Multi-cloud and hybrid deployments', 'Zero-downtime CI/CD pipelines', 'Security and compliance by design'].map((h, i) => (
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

      {/* ══════════════════════════════════════════════════
          OUR APPROACH — 2×2 bento
      ══════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg)', padding: '100px 0', position: 'relative' }}>
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            variants={FU(0)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            style={{ marginBottom: 48 }}
          >
            <div className="section-badge" style={{ marginBottom: 16 }}>Our Approach</div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, color: 'var(--fg)', maxWidth: 600 }}>
              Approach to <span className="grad">Cloud-First Engineering</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridTemplateAreas: '"tl tl tl tl tr tr tr" "bl bl bl br br br br"', gap: 16 }} className="ds-bento">

            {/* TL — Reliability */}
            <motion.div
              variants={FL(0)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
              className="glass" style={{ padding: '40px', display: 'flex', flexDirection: 'column', minHeight: 360, gridArea: 'tl', boxShadow: '0 4px 24px rgba(26,86,219,0.07)', minWidth: '760px' }}
            >
              <div className="ds-bento-icon" style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(26,86,219,0.10)', border: '1px solid rgba(77,134,245,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <Shield size={22} color="currentColor" strokeWidth={1.5} />
              </div>
              <h3 style={{ fontSize: 'clamp(22px,2.5vw,36px)', fontWeight: 700, color: 'var(--fg)', lineHeight: 1.2, marginBottom: 20, letterSpacing: '-0.02em' }}>
                Infrastructure That <span className="grad">Enables Growth</span>
              </h3>
              <div style={{ background: 'rgba(26,86,219,0.06)', border: '1px solid rgba(26,86,219,0.10)', borderRadius: 16, padding: '20px 22px', flex: 1 }}>
                <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.80 }}>
                  Great products are only as good as the infrastructure running them. Most teams treat cloud as an afterthought, then scramble when things break at scale. We engineer cloud platforms as a strategic foundation, not a utility bill, so your systems scale confidently as your business grows.
                </p>
              </div>
            </motion.div>

            {/* TR — Complexity quote */}
            <motion.div
              variants={FR(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
              className="glass" style={{ padding: '40px', position: 'relative', overflow: 'hidden', minHeight: 360, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gridArea: 'tr', boxShadow: '0 4px 24px rgba(26,86,219,0.07)' }}
            >
              <div style={{ position: 'absolute', bottom: 24, right: 24, width: 160, height: 160, pointerEvents: 'none' }}>
                <Image src="/images/Dispersed_glass_3d_illustrations_vol_2_3_6b652c20f7 1.png" alt="3D glass illustration" width={160} height={160} style={{ objectFit: 'contain' }} />
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontSize: 'clamp(18px,1.8vw,26px)', fontWeight: 700, color: 'var(--fg)', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                  Complexity without clarity<br /><span className="grad">creates risk.</span>
                </h3>
              </div>
              <p style={{ fontSize: 18, fontWeight: 400, color: 'var(--fg-3)', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>
                We design for reliability,<br />not just deployment.
              </p>
            </motion.div>

            {/* BL — Explore Blogs */}
            <motion.div
              variants={FL(0.15)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
              className="glass" style={{ padding: '40px', display: 'flex', gap: 24, minHeight: 380, gridArea: 'bl', boxShadow: '0 4px 24px rgba(26,86,219,0.07)' }}
            >
              <div style={{ flex: '0 0 150px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 150 }}>
                <h3 style={{ fontSize: 'clamp(22px,2.5vw,36px)', fontWeight: 700, color: 'var(--fg)', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                  Explore<br />More<br /><span className="grad">Blogs</span>
                </h3>
                <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 700, color: '#fff', background: '#1A56DB', padding: '11px 20px', borderRadius: 10, textDecoration: 'none', boxShadow: '0 4px 16px rgba(26,86,219,0.32)', width: 'fit-content' }}>
                  Explore Blogs <ArrowRight size={12} strokeWidth={2} />
                </Link>
              </div>
              <Link href="/blog/the-evolution-of-devops-in-cloud-computing-trends-shaping-the-future" style={{ flex: 1, borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', textDecoration: 'none', minHeight: 0 }}>
                <div style={{ height: 160, flexShrink: 0, backgroundImage: 'url(https://dev.moreyeahs.com/wp-content/uploads/2024/10/The-Evolution-of-DevOps-in-Cloud-Computing_-Trends-Shaping-the-Future.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ padding: '14px 16px 16px', background: 'var(--card-bg)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#4D86F5', background: 'rgba(77,134,245,0.10)', border: '1px solid rgba(77,134,245,0.22)', padding: '3px 10px', borderRadius: 100, alignSelf: 'flex-start' }}>Cloud</span>
                  <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--fg)', lineHeight: 1.4, margin: 0 }}>The Evolution of DevOps in Cloud Computing</p>
                  <p style={{ fontSize: 11, color: 'var(--fg-3)', lineHeight: 1.55, margin: 0 }}>Trends shaping the future of cloud-native development and operations...</p>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#4D86F5', display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                    Read More <ArrowRight size={11} strokeWidth={2.5} />
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* BR — Specializations */}
            <motion.div
              variants={FR(0.2)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
              style={{ background: 'linear-gradient(135deg, #1A56DB 0%, #0E2E75 55%, #0A1F4F 100%)', borderRadius: 20, padding: '40px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 300, gridArea: 'br' }}
            >
              <div style={{ position: 'relative', zIndex: 1, maxWidth: 'calc(100% - 300px)' }}>
                <h3 style={{ fontSize: 'clamp(22px,2.5vw,36px)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 18, letterSpacing: '-0.02em' }}>Our Specializations</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                  {SPECIALIZATIONS.map((s, i) => (
                    <motion.div
                      key={s}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
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
              <div style={{ position: 'absolute', bottom: 0, right: 0, zIndex: 1, width: 280, height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image src="/images/robot-with-tick-symbol 3.png" alt="Cloud engineering robot illustration" width={280} height={280} style={{ objectFit: 'contain' }} />
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
            variants={FU(0)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            style={{ marginBottom: 48 }}
          >
            <div className="section-badge" style={{ marginBottom: 16 }}>What We Offer</div>
            <h2 style={{ fontSize: 'clamp(32px,4vw,56px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, color: 'var(--fg)' }}>
              Our <span className="grad">Services</span>
            </h2>
            <p style={{ fontSize: 16, color: 'var(--fg-3)', lineHeight: 1.7, maxWidth: 600, marginTop: 12 }}>
              Cloud solutions that reduce cost, eliminate downtime and give your engineering teams the infrastructure they deserve.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column' }} className="ds-svc-stack">
            {SERVICES.map((svc, i) => (
              <div key={svc.id} style={{
                position: 'sticky', top: `${80 + i * 20}px`, zIndex: i + 2,
                borderRadius: 24, overflow: 'hidden',
                backgroundImage: `url('/images/${svc.dark ? 'Services Card Slide 2.png' : 'White Service card New.png'}')`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                border: svc.dark ? '1px solid rgba(77,134,245,0.15)' : '1px solid var(--card-border)',
                padding: 'clamp(40px,5vw,72px)', marginBottom: 16,
              }}>
                <div style={{ position: 'absolute', inset: 0, background: svc.dark ? 'rgba(10,20,60,0.38)' : 'rgba(255,255,255,0.06)', backdropFilter: 'blur(3px)' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 60, position: 'relative', zIndex: 1 }} className="svc-card-inner">
                  <div style={{ flex: '0 0 auto', maxWidth: 280 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 12, marginBottom: 20, background: svc.dark ? 'rgba(77,134,245,0.25)' : 'rgba(26,86,219,0.10)', border: svc.dark ? '1px solid rgba(77,134,245,0.40)' : '1px solid rgba(77,134,245,0.25)', fontSize: 13, fontWeight: 800, color: svc.dark ? '#80A9FF' : '#1A56DB' }}>
                      {`0${i + 1}`}
                    </div>
                    <h3 style={{ fontSize: 'clamp(24px,2.8vw,42px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: svc.dark ? '#fff' : '#1A56DB', marginBottom: 20 }}>{svc.title}</h3>
                    <Link href="/contact-us" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 600, color: svc.dark ? 'rgba(255,255,255,0.80)' : '#1A56DB', textDecoration: 'none' }}>
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
              </div>
            ))}
          </div>
          <div style={{ height: 120 }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          HOW IT FITS TOGETHER — pipeline steps
      ══════════════════════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(160deg, #050d1e 0%, #0a1f4f 30%, #0e2e75 65%, #1a56db 100%)', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            variants={FU(0)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            style={{ marginBottom: 64 }}
          >
            <div className="section-badge" style={{ marginBottom: 16, background: 'rgba(77,134,245,0.18)', border: '1px solid rgba(77,134,245,0.30)' }}>Pipeline</div>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,52px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.15 }}>
              How It Fits Together
            </h2>
          </motion.div>

          <div style={{ display: 'flex', alignItems: 'flex-start', overflowX: 'auto', gap: 0, paddingBottom: 8, paddingTop: 4 }}>
            {STEPS.map((s, i) => (
              <motion.div key={s.step}
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EXPO, delay: i * 0.12 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                style={{ display: 'flex', alignItems: 'flex-start', flexShrink: 0 }}
              >
                <div style={{ textAlign: 'center', width: 'clamp(140px,18vw,210px)', padding: '0 16px' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(77,134,245,0.18)', border: '1px solid rgba(77,134,245,0.32)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <s.Icon size={26} color="#80A9FF" strokeWidth={1.5} />
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', marginBottom: 8 }}>{s.step}</div>
                  <p style={{ fontSize: 16, fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: 10 }}>{s.label}</p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.58)', lineHeight: 1.6 }}>{s.sub}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ paddingTop: 24, flexShrink: 0, color: 'rgba(255,255,255,0.28)' }}>
                    <ChevronRight size={20} strokeWidth={1.5} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          INDUSTRY USE CASES
      ══════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg)', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            variants={FU(0)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            style={{ marginBottom: 56 }}
          >
            <div className="section-badge" style={{ marginBottom: 16 }}>Industry Use Cases</div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, color: 'var(--fg)', maxWidth: 640 }}>
              Cloud Solutions <span className="grad">Across Industries</span>
            </h2>
            <p style={{ fontSize: 16, color: 'var(--fg-3)', lineHeight: 1.7, maxWidth: 560, marginTop: 14 }}>
              We design cloud architectures that understand the specific compliance, performance, and scale requirements of your industry, not generic blueprints.
            </p>
          </motion.div>

          <motion.div
            variants={STAGGER(0.09)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
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

      {/* ══════════════════════════════════════════════════
          PROBLEMS & SOLUTIONS
      ══════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-2)', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 80, alignItems: 'flex-start' }} className="ds-prob-row">

            <div style={{ position: 'sticky', top: 100 }}>
              <motion.div variants={FL(0)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
                <div className="section-badge" style={{ marginBottom: 16, background: 'rgba(26,86,219,0.12)', border: '1px solid rgba(26,86,219,0.25)' }}>Common Challenges</div>
                <h2 style={{ fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, color: 'var(--fg)', marginBottom: 16 }}>
                  Problems We <span className="grad">Solve</span>
                </h2>
                <p style={{ fontSize: 15, color: 'var(--fg-3)', lineHeight: 1.72 }}>
                  Real infrastructure challenges that prevent organisations from scaling reliably, and exactly how we address them.
                </p>
              </motion.div>
            </div>

            <motion.div
              variants={STAGGER(0.07)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
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

      {/* ══════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════ */}
      <TestimonialsSection />

      {/* ══════════════════════════════════════════════════
          FAQs
      ══════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg)', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 'clamp(40px,6vw,88px)', alignItems: 'start' }} className="ds-faq-layout">

            <motion.div
              variants={FL(0)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
              style={{ position: 'sticky', top: 100 }}
            >
              <div className="section-badge" style={{ marginBottom: 16 }}>FAQ</div>
              <h2 style={{ fontSize: 'clamp(26px,3vw,42px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.12, color: 'var(--fg)', marginBottom: 16 }}>
                Frequently Asked <span className="grad">Questions</span>
              </h2>
              <p style={{ fontSize: 14, color: 'var(--fg-3)', lineHeight: 1.72 }}>
                Common questions about our cloud and infrastructure services.
              </p>
            </motion.div>

            <motion.div
              variants={STAGGER(0.07)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
              style={{ display: 'flex', flexDirection: 'column', gap: 10 }} className="ds-faq-grid"
            >
              {FAQS.map((item, i) => (
                <motion.div key={i} variants={FR(0)}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: '100%', textAlign: 'left', background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: openFaq === i ? '16px 16px 0 0' : 16, padding: '18px 22px', cursor: 'pointer', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', transition: 'border-radius 0.2s' }}
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
