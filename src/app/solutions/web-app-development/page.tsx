'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  ArrowRight, Monitor, Smartphone, ChevronRight,
  Layers, Code2, TestTube, Rocket, Plus,
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
  'Full-Stack Web Application Development',
  'Mobile App Development (iOS & Android)',
  'UI/UX Design & Design Systems',
  'API Engineering & Backend Architecture',
];

const SERVICES = [
  {
    id: 'web',
    href: '/solutions/web-app-development/web-application', title: 'Web Application Development', dark: false,
    tagline: 'Fast, scalable web products built to perform.',
    desc: 'We design and engineer full-stack web applications using modern frameworks that are performant, maintainable, and built to handle real enterprise traffic without breaking a sweat.',
    list: ['Next.js, React and Node.js delivery', 'SEO-optimised server-side rendering', 'Progressive web app capabilities', 'Component library and design system builds'],
  },
  {
    id: 'mobile',
    href: '/solutions/web-app-development/mobile-app', title: 'Mobile App Development', dark: true,
    tagline: 'Native-quality apps for iOS and Android.',
    desc: 'Build cross-platform mobile applications with React Native or native Swift and Kotlin that deliver the performance and UX your users expect without the cost of two separate codebases.',
    list: ['React Native cross-platform development', 'Native iOS and Android engineering', 'Push notifications and offline support', 'App Store and Play Store deployment'],
  },
  {
    id: 'design',
    href: '/solutions/web-app-development/design-quality', title: 'UI/UX Design', dark: false,
    tagline: 'Design that converts, not just impresses.',
    desc: 'From user research and wireframes to high-fidelity Figma prototypes and production-ready design systems, we create digital experiences that are intuitive, accessible, and beautiful.',
    list: ['User research and journey mapping', 'Wireframes and interactive prototypes', 'Design system and component library', 'WCAG accessibility compliance'],
  },
  {
    id: 'api',
    href: '/solutions/web-app-development/web-application', title: 'API & Backend Engineering', dark: true,
    tagline: 'Robust backends that power everything.',
    desc: 'Architect and build the APIs, microservices, and data layers that connect your frontend experiences to your business systems with the reliability and speed your product demands.',
    list: ['RESTful and GraphQL API design', 'Microservices and serverless architecture', 'Third-party integration and webhooks', 'Database design and query optimisation'],
  },
];

const STEPS = [
  { step: '01', label: 'Discovery',    sub: 'Requirements, user stories and scope',     Icon: Monitor },
  { step: '02', label: 'Design',       sub: 'Wireframes, prototypes and design system', Icon: Layers },
  { step: '03', label: 'Development',  sub: 'Agile sprints with continuous delivery',   Icon: Code2 },
  { step: '04', label: 'Testing',      sub: 'QA, performance and accessibility audit',  Icon: TestTube },
  { step: '05', label: 'Launch',       sub: 'Deployment, monitoring and support',       Icon: Rocket },
];

const INDUSTRIES = [
  {
    Icon: DollarSign, label: 'Financial Services',
    headline: 'Secure Fintech & Banking Applications',
    desc: 'Build PCI-DSS-compliant financial applications, investment platforms, and banking portals with enterprise-grade security, real-time data integration, and multi-factor authentication built in from day one.',
    tags: ['PCI-DSS Compliance', 'Real-Time Data', 'Secure Authentication'],
  },
  {
    Icon: HeartPulse, label: 'Healthcare',
    headline: 'HIPAA-Compliant Digital Health Platforms',
    desc: 'Develop patient portals, telemedicine applications, and clinical workflow tools that meet HIPAA requirements, integrate with EHR systems, and deliver accessible experiences across all devices.',
    tags: ['HIPAA Compliance', 'EHR Integration', 'Telemedicine'],
  },
  {
    Icon: ShoppingCart, label: 'Retail & E-Commerce',
    headline: 'High-Performance Commerce Experiences',
    desc: 'Engineer e-commerce platforms that handle peak traffic without slowdowns, personalise the shopping experience with real-time product data, and convert browsers into buyers at every touchpoint.',
    tags: ['Headless Commerce', 'Performance Optimisation', 'Personalisation'],
  },
  {
    Icon: Factory, label: 'Manufacturing',
    headline: 'Industrial Operations & MES Portals',
    desc: 'Build manufacturing execution systems, quality management portals, and supplier collaboration tools that connect factory floor operations to management dashboards in real time.',
    tags: ['MES Integration', 'Supplier Portals', 'Real-Time Dashboards'],
  },
  {
    Icon: GraduationCap, label: 'Education',
    headline: 'Learning Platforms & EdTech Applications',
    desc: 'Develop custom LMS platforms, student engagement applications, and institutional portals that are accessible, mobile-first, and built to support thousands of concurrent learners.',
    tags: ['LMS Development', 'Mobile Learning', 'Accessibility'],
  },
  {
    Icon: Truck, label: 'Logistics & Supply Chain',
    headline: 'Tracking & Operations Management Tools',
    desc: 'Build real-time shipment tracking applications, driver dispatch tools, and logistics operations dashboards that give your teams and customers live visibility across the supply network.',
    tags: ['Real-Time Tracking', 'Dispatch Management', 'Customer Portals'],
  },
];

const PROBLEMS = [
  {
    problem: 'Our existing web application is slow and losing us customers',
    solution: 'We run a performance audit covering Core Web Vitals, server response times, database queries, and front-end bundle sizes. Then we implement targeted optimisations, typically reducing load times by 50-70%, and set up monitoring so performance regressions are caught before they reach users.',
  },
  {
    problem: 'We need to build a product but do not have an in-house engineering team',
    solution: 'We act as your full engineering team from day one: product scoping, architecture design, UI/UX, development, QA, and deployment. We run in agile two-week sprints with weekly demos so you stay in control without needing to manage engineers directly.',
  },
  {
    problem: 'Our mobile app has poor reviews and users are churning',
    solution: 'We start with a UX audit and user research to identify the specific friction points driving negative reviews. Then we redesign the key flows, rebuild the problem screens, and set up analytics to measure retention improvements so every change is validated against real user behaviour.',
  },
  {
    problem: 'We have technical debt accumulating and new features are getting harder to ship',
    solution: 'We run a codebase audit to identify the highest-impact debt areas, then plan a phased modernisation strategy that reduces complexity while keeping the product live. We prioritise refactoring the parts of the codebase that slow your team down the most, rather than rewriting everything at once.',
  },
  {
    problem: 'Our APIs are unreliable and third-party integrations keep breaking',
    solution: 'We redesign your API architecture with proper versioning, error handling, retry logic, and webhook validation so integrations degrade gracefully rather than silently failing. We also implement API monitoring and alerting so integration failures are caught in seconds, not discovered by customers.',
  },
];

const FAQS = [
  {
    q: 'What tech stack do you build with?',
    a: 'Our primary stack is Next.js, React, TypeScript, and Node.js for web applications, with React Native for cross-platform mobile. We use PostgreSQL, Redis, and Supabase or AWS/GCP managed services for data and infrastructure. For clients with existing stacks, we adapt rather than force a rewrite.',
  },
  {
    q: 'How do you handle projects where we already have a partial codebase?',
    a: 'We start with a codebase review to understand quality, architecture, and technical debt. We then scope the work honestly: what to keep, what to refactor, and what needs to be rebuilt. We never recommend a full rewrite unless the existing code is genuinely unsalvageable, as incremental improvement is almost always faster and cheaper.',
  },
  {
    q: 'Do you offer UI/UX design as a standalone service?',
    a: 'Yes. We offer design as a standalone engagement covering user research, wireframes, high-fidelity Figma prototypes, and design system creation. Many clients use this to validate their product direction before committing to full engineering, or to improve an existing product where the engineering is sound but the UX needs work.',
  },
  {
    q: 'How do you manage projects and what does client involvement look like?',
    a: 'We run two-week agile sprints with a kickoff, daily standups, mid-sprint check-ins, and an end-of-sprint demo. You review and approve work at each sprint boundary. We use Linear for task tracking and Figma for design reviews. Most clients find they need to invest 2-4 hours per week to keep the project moving well.',
  },
  {
    q: 'What does your QA process look like?',
    a: 'Every feature goes through functional testing, cross-browser and cross-device testing, and regression testing against our test suite before it reaches staging. We also run Lighthouse performance audits, accessibility checks (WCAG 2.1 AA), and security scanning as part of our standard delivery process.',
  },
  {
    q: 'Do you provide ongoing support after the product launches?',
    a: 'Yes. We offer post-launch support in two forms: a retainer for ongoing feature development and improvements, or a maintenance-only package covering bug fixes, dependency updates, and security patches. We also provide a 30-day hypercare period after every major launch at no extra cost.',
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
export default function WebAppDevelopmentPage() {
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
                <Code2 size={12} color="#4D86F5" strokeWidth={2} />
                Web &amp; App Development
              </div>
            </motion.div>
            <h1 style={{ fontSize: 'clamp(36px,4.5vw,68px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--fg)' }}>
              <WordReveal text="Build Faster. Deliver Smarter." delay={0.1} /><br />
              <motion.span initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.75, ease: EXPO, delay: 0.35 }} style={{ display: 'inline-block', background: 'linear-gradient(120deg,#4D86F5 0%,#80A9FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Power Your Growth.</motion.span>
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
                <video autoPlay muted loop playsInline preload="none" aria-label="Web and app development solutions overview" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
                  <source src="/videos/Web App Development Solution Hero Section.mp4" type="video/mp4" />
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
                <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 14, lineHeight: 1.3, letterSpacing: '-0.01em' }}>Our Engineering Expertise</h3>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', marginBottom: 16 }} />
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.80)', lineHeight: 1.75, marginBottom: 28 }}>
                  From first wireframe to production launch, we build digital products that perform, convert, and scale with your business without accumulating the technical debt that slows most teams down.
                </p>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>Highlights</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
                  {['Next.js, React and TypeScript engineering', 'React Native cross-platform mobile', 'Research-led UI/UX and design systems', 'API architecture and backend services'].map((h, i) => (
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
              Approach to <span className="grad">Product Engineering</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridTemplateAreas: '"tl tl tl tl tr tr tr" "bl bl bl br br br br"', gap: 16 }} className="ds-bento">

            {/* TL */}
            <motion.div
              variants={FL(0)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
              className="glass" style={{ padding: '40px', display: 'flex', flexDirection: 'column', minHeight: 360, gridArea: 'tl', boxShadow: '0 4px 24px rgba(26,86,219,0.07)' }}
            >
              <div className="ds-bento-icon" style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(26,86,219,0.10)', border: '1px solid rgba(77,134,245,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <Code2 size={22} color="currentColor" strokeWidth={1.5} />
              </div>
              <h3 style={{ fontSize: 'clamp(22px,2.5vw,36px)', fontWeight: 700, color: 'var(--fg)', lineHeight: 1.2, marginBottom: 20, letterSpacing: '-0.02em' }}>
                Engineering <span className="grad">Built to Last</span>
              </h3>
              <div style={{ background: 'rgba(26,86,219,0.06)', border: '1px solid rgba(26,86,219,0.10)', borderRadius: 16, padding: '20px 22px', flex: 1 }}>
                <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.80 }}>
                  Most digital products fail not because of bad ideas, but because of poor engineering decisions made early. We design systems for maintainability from the start: clear architecture, typed code, automated tests, and CI/CD pipelines that keep your team shipping fast without breaking things. The goal is a codebase your team is proud to work in 18 months from now.
                </p>
              </div>
            </motion.div>

            {/* TR */}
            <motion.div
              variants={FR(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
              className="glass" style={{ padding: '40px', position: 'relative', overflow: 'hidden', minHeight: 360, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gridArea: 'tr', boxShadow: '0 4px 24px rgba(26,86,219,0.07)' }}
            >
              <div style={{ position: 'absolute', bottom: 24, right: 24, width: 160, height: 160, pointerEvents: 'none' }}>
                <Image src="/images/Dispersed_glass_3d_illustrations_vol_2_3_6b652c20f7 1.png" alt="3D glass illustration" width={160} height={160} style={{ objectFit: 'contain' }} />
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontSize: 'clamp(18px,1.8vw,26px)', fontWeight: 700, color: 'var(--fg)', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                  Great ideas need<br /><span className="grad">great execution.</span>
                </h3>
              </div>
              <p style={{ fontSize: 18, fontWeight: 400, color: 'var(--fg-3)', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>
                We design for outcomes,<br />not just delivery.
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
              <Link href="/blog/react-vs-angular" style={{ flex: 1, borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', textDecoration: 'none', minHeight: 0 }}>
                <div style={{ height: 160, flexShrink: 0, position: 'relative', overflow: 'hidden' }}><img src="https://dev.moreyeahs.com/wp-content/uploads/2025/09/React-vs-Angular-–-Which-Framework-Fits-Your-Project-Best.jpg" alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => { const el = e.currentTarget as HTMLImageElement; el.style.display = 'none'; const p = el.parentElement; if (p) { p.style.background = 'linear-gradient(135deg, #1A56DB 0%, #4D86F5 50%, #80A9FF 100%)'; } }} /></div>
                <div style={{ padding: '14px 16px 16px', background: 'var(--bg)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#4D86F5', background: 'rgba(77,134,245,0.10)', border: '1px solid rgba(77,134,245,0.22)', padding: '3px 10px', borderRadius: 100, alignSelf: 'flex-start' }}>Web Dev</span>
                  <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--fg)', lineHeight: 1.4, margin: 0 }}>React vs Angular: Which Framework Fits Your Project?</p>
                  <p style={{ fontSize: 11, color: 'var(--fg-3)', lineHeight: 1.55, margin: 0 }}>Choosing the right framework shapes your entire development experience...</p>
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
                <Image src="/images/robot-with-tick-symbol 3.png" alt="Web and app development robot illustration" width={280} height={280} style={{ objectFit: 'contain' }} />
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
              Engineering services that ship products your users will love, on time and without the technical debt that creates problems later.
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
                }}>
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
          HOW IT FITS TOGETHER
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
              Web &amp; App Solutions <span className="grad">Across Industries</span>
            </h2>
            <p style={{ fontSize: 16, color: 'var(--fg-3)', lineHeight: 1.7, maxWidth: 560, marginTop: 14 }}>
              We build digital products that understand the specific compliance, performance, and user experience requirements of your industry, not generic templates.
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
                  Real engineering challenges that slow teams down and prevent products from reaching their potential, and exactly how we address them.
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
                Common questions about our web and mobile app development services.
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
