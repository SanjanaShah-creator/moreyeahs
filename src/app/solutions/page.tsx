'use client';

import { motion } from 'framer-motion';
import { Brain, Cloud, Monitor, Zap, Code2, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import NoiseOverlay from '@/components/ui/NoiseOverlay';

const FV = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const FT = { duration: 0.6 };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const SOLUTIONS = [
  {
    Icon: Brain,
    tag: 'Data Science & AI',
    tagline: 'From raw data to decisions',
    href: '/solutions/data-science',
    desc: 'We help organizations harness AI, machine learning, and data engineering to uncover patterns, predict outcomes, and drive smarter decision-making at scale.',
    services: [
      { label: 'AI & Machine Learning',    href: '/solutions/data-science/ai-ml' },
      { label: 'Computer Vision',           href: '/solutions/data-science/computer-vision' },
      { label: 'Data Infrastructure',       href: '/solutions/data-science/data-infrastructure' },
      { label: 'IoT & Connected Systems',   href: '/solutions/data-science/iot-connected-systems' },
    ],
    accent: '#4D86F5',
    stat: { value: '94.2%', label: 'Avg. model accuracy' },
  },
  {
    Icon: Cloud,
    tag: 'Cloud & Infrastructure',
    tagline: 'Scalable, reliable, automated',
    href: '/solutions/cloud-infrastructure',
    desc: 'We engineer cloud-native platforms that form the backbone of modern digital products – fast, secure, and built for real-world demand.',
    services: [
      { label: 'Cloud Platform Setup (AWS/GCP/Azure)', href: '/solutions/cloud-infrastructure/cloud-platform-setup' },
      { label: 'DevOps & Automation',                  href: '/solutions/cloud-infrastructure/devops-automation' },
    ],
    accent: '#80A9FF',
    stat: { value: '99.99%', label: 'Uptime SLA delivered' },
  },
  {
    Icon: Monitor,
    tag: 'Microsoft Services',
    tagline: 'Connected Microsoft ecosystems',
    href: '/solutions/microsoft-services',
    desc: 'We design, implement, and optimize Microsoft-powered business ecosystems – CRM, ERP, analytics, automation, and cloud – all working as one unified environment.',
    services: [
      { label: 'Microsoft CRM & ERP',                href: '/solutions/microsoft-services/crm-erp' },
      { label: 'Microsoft Automation & Analytics',   href: '/solutions/microsoft-services/automation-analytics' },
      { label: 'Azure',                              href: '/solutions/microsoft-services/azure' },
      { label: 'SharePoint',                         href: '/solutions/microsoft-services/sharepoint' },
    ],
    accent: '#4D86F5',
    stat: { value: '60%', label: 'Faster deployments' },
  },
  {
    Icon: Zap,
    tag: 'Salesforce Services',
    tagline: 'Salesforce built right',
    href: '/solutions/salesforce-services',
    desc: 'We design, implement, and optimize Salesforce ecosystems that help businesses manage customer relationships, automate operations, and scale engagement across channels.',
    services: [
      { label: 'Salesforce Support & Managed Services', href: '/solutions/salesforce-services/managed-services' },
      { label: 'Salesforce Implementation',             href: '/solutions/salesforce-services/implementation' },
    ],
    accent: '#80A9FF',
    stat: { value: '3Ã—', label: 'Pipeline increase' },
  },
  {
    Icon: Code2,
    tag: 'Web & App Development',
    tagline: 'Products built to scale',
    href: '/solutions/web-app-development',
    desc: 'From web applications to mobile apps – we build fast, scalable, and beautiful digital products using modern tech stacks tailored to your business needs.',
    services: [
      { label: 'Web Application Development', href: '/solutions/web-app-development/web-application' },
      { label: 'Mobile App Development',       href: '/solutions/web-app-development/mobile-app' },
      { label: 'Design & Quality',             href: '/solutions/web-app-development/design-quality' },
    ],
    accent: '#4D86F5',
    stat: { value: '50K+', label: 'DAUs powered' },
  },
];

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="sol-hero-section" style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 80 }}>
        <NoiseOverlay />
        <div className="blob" style={{ width: 560, height: 560, top: '-100px', right: '-5%', background: 'radial-gradient(circle, rgba(26,86,219,0.14), transparent 65%)' }} />
        <div className="blob" style={{ width: 400, height: 400, bottom: '-60px', left: '-8%', background: 'radial-gradient(circle, rgba(10,31,79,0.30), transparent 68%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div variants={stagger} initial="hidden" animate="visible" className="sol-hero-inner" style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 80px' }}>
            <motion.div variants={FV} transition={FT}>
              <div className="section-badge" style={{ justifyContent: 'center', marginBottom: 20 }}>Our Solutions</div>
            </motion.div>
            <motion.h1 variants={FV} transition={FT} style={{ fontSize: 'clamp(32px,5vw,58px)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--fg)', lineHeight: 1.06, marginBottom: 18 }}>
              Five Solutions.<br /><span style={{ background: 'linear-gradient(120deg,#4D86F5 0%,#80A9FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>One Trusted Partner.</span>
            </motion.h1>
            <motion.p variants={FV} transition={FT} style={{ fontSize: 16, color: 'var(--fg-3)', lineHeight: 1.75, marginBottom: 36 }}>
              From data science to cloud infrastructure, from Microsoft ecosystems to custom-built products – MoreYeahs brings end-to-end engineering capability under one roof.
            </motion.p>
            <motion.div variants={FV} transition={FT}>
              <Link href="/contact-us" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1A56DB', color: '#fff', fontSize: 14, fontWeight: 700, borderRadius: 10, padding: '13px 26px', textDecoration: 'none', boxShadow: '0 6px 22px rgba(26,86,219,0.35)', transition: 'background 0.2s, transform 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0E2E75'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1A56DB'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}>
                Book a Free Consultation <ArrowRight size={14} strokeWidth={2} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Solution cards */}
      <section style={{ background: 'var(--bg-2)', position: 'relative', padding: '80px 0' }}>
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {SOLUTIONS.map((sol, i) => (
              <motion.div
                key={sol.tag}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
              >
                <div className="glass sol-card-grid" style={{ padding: '40px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }} data-odd={i % 2 !== 0}>
                  {/* Text */}
                  <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(26,86,219,0.12)', border: '1px solid rgba(77,134,245,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <sol.Icon size={20} color={sol.accent} strokeWidth={1.5} />
                      </div>
                      <div>
                        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: sol.accent }}>{sol.tag}</span>
                        <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 1 }}>{sol.tagline}</div>
                      </div>
                    </div>
                    <p style={{ fontSize: 15, color: 'var(--fg-3)', lineHeight: 1.78, marginBottom: 24, maxWidth: 460 }}>{sol.desc}</p>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 28 }}>
                      {sol.services.map(s => (
                        <li key={s.label}>
                          <Link href={s.href} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--fg-2)', textDecoration: 'none', transition: 'color 0.15s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = sol.accent; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--fg-2)'; }}>
                            <span style={{ width: 20, height: 20, borderRadius: 6, background: 'rgba(26,86,219,0.10)', border: '1px solid rgba(77,134,245,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <sol.Icon size={11} color={sol.accent} strokeWidth={2} />
                            </span>
                            {s.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link href={sol.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1A56DB', color: '#fff', fontSize: 13, fontWeight: 700, borderRadius: 10, padding: '11px 20px', textDecoration: 'none', boxShadow: '0 4px 18px rgba(26,86,219,0.30)', transition: 'background 0.2s, transform 0.2s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0E2E75'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1A56DB'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}>
                      Explore {sol.tag} <ArrowRight size={13} strokeWidth={2} />
                    </Link>
                  </div>

                  {/* Stat card */}
                  <div style={{ order: i % 2 === 0 ? 2 : 1 }}>
                    <div style={{ padding: 32, borderRadius: 20, background: 'rgba(26,86,219,0.06)', border: '1px solid rgba(77,134,245,0.14)', textAlign: 'center' }}>
                      <div style={{ fontSize: 'clamp(40px,6vw,72px)', fontWeight: 800, letterSpacing: '-0.04em', color: sol.accent, lineHeight: 1, marginBottom: 8 }}>
                        {sol.stat.value}
                      </div>
                      <div style={{ fontSize: 14, color: 'var(--fg-3)', fontWeight: 500 }}>{sol.stat.label}</div>
                      <div style={{ height: 1, background: 'var(--border)', margin: '24px 0' }} />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {sol.services.slice(0, 3).map(s => (
                          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--fg-3)' }}>
                            <CheckCircle size={12} color={sol.accent} strokeWidth={1.5} />
                            {s.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      <section style={{ background: 'var(--bg-2)', padding: '80px 0', position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--border)' }}>
        <NoiseOverlay />
        <div className="blob" style={{ width: 500, height: 500, top: '-80px', left: '-8%', background: 'radial-gradient(circle, rgba(26,86,219,0.10), transparent 68%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ marginBottom: 48 }}>
            <div className="section-badge" style={{ justifyContent: 'center', marginBottom: 16 }}>Case Studies</div>
            <h2 style={{ fontSize: 'clamp(26px,3.8vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--fg)', lineHeight: 1.1, textAlign: 'center', marginBottom: 12 }}>
              Proof in <span style={{ background: 'linear-gradient(120deg,#4D86F5 0%,#80A9FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Real Results</span>
            </h2>
            <p style={{ fontSize: 15, color: 'var(--fg-3)', lineHeight: 1.75, textAlign: 'center', maxWidth: 520, margin: '0 auto' }}>
              Browse case studies by solution area – see exactly how we have delivered outcomes for clients like yours.
            </p>
          </div>

          {/* Solution filter chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 48 }}>
            {[
              { label: 'All Case Studies',        href: '/case-studies',                                    accent: '#4D86F5' },
              { label: 'Data Science & AI',        href: '/case-studies?filter=data-science',                accent: '#4D86F5' },
              { label: 'Cloud & Infrastructure',   href: '/case-studies?filter=cloud',                       accent: '#80A9FF' },
              { label: 'Microsoft Services',       href: '/case-studies?filter=microsoft',                   accent: '#4D86F5' },
              { label: 'Salesforce',               href: '/case-studies?filter=salesforce',                  accent: '#80A9FF' },
              { label: 'Web & App Development',    href: '/case-studies?filter=web-application-development',  accent: '#4D86F5' },
            ].map((chip) => (
              <Link
                key={chip.label}
                href={chip.href}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '9px 18px', borderRadius: 999,
                  fontSize: 13, fontWeight: 600,
                  color: chip.accent,
                  background: `rgba(${chip.accent === '#4D86F5' ? '77,134,245' : '128,169,255'},0.10)`,
                  border: `1px solid ${chip.accent}35`,
                  textDecoration: 'none',
                  transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = `rgba(${chip.accent === '#4D86F5' ? '77,134,245' : '128,169,255'},0.20)`;
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 20px ${chip.accent}22`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = `rgba(${chip.accent === '#4D86F5' ? '77,134,245' : '128,169,255'},0.10)`;
                  (e.currentTarget as HTMLElement).style.transform = 'none';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {chip.label} <ArrowRight size={11} strokeWidth={2.5} />
              </Link>
            ))}
          </div>

          {/* View all CTA */}
          <div style={{ textAlign: 'center' }}>
            <Link href="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1A56DB', color: '#fff', fontSize: 14, fontWeight: 700, borderRadius: 10, padding: '13px 26px', textDecoration: 'none', boxShadow: '0 6px 22px rgba(26,86,219,0.32)', transition: 'background 0.2s, transform 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0E2E75'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1A56DB'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}>
              View All Case Studies <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--bg-2)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <NoiseOverlay />
        <div className="blob" style={{ width: 440, height: 440, top: '-60px', right: '-5%', background: 'radial-gradient(circle, rgba(26,86,219,0.12), transparent 68%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6 }}>
            <div className="section-badge" style={{ justifyContent: 'center', marginBottom: 20 }}>Ready to Start?</div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--fg)', lineHeight: 1.1, marginBottom: 16 }}>
              Not sure which solution fits? <span style={{ background: 'linear-gradient(120deg,#4D86F5 0%,#80A9FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Let&apos;s talk.</span>
            </h2>
            <p style={{ fontSize: 16, color: 'var(--fg-3)', maxWidth: 460, margin: '0 auto 32px', lineHeight: 1.7 }}>
              Our solution architects will help you identify the right approach for your business goals and budget.
            </p>
            <Link href="/contact-us" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#1A56DB', color: '#fff', fontSize: 14, fontWeight: 700, borderRadius: 10, padding: '14px 28px', textDecoration: 'none', boxShadow: '0 8px 28px rgba(26,86,219,0.35)', transition: 'background 0.2s, transform 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0E2E75'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1A56DB'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}>
              Book a Free Consultation <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media(max-width:900px){
          .glass[data-odd]{direction:ltr}
          .glass > div[style*="order: 2"]{order:unset!important}
          .glass > div[style*="order: 1"]{order:unset!important}
        }
        @media(max-width:768px){
          .sol-card-grid{grid-template-columns:1fr!important;gap:28px!important;padding:28px 20px!important}
          .sol-card-grid>div{order:unset!important}
          .sol-hero-inner{margin-bottom:36px!important}
        }
        @media(max-width:640px){
          .sol-hero-section{padding-top:88px!important;padding-bottom:36px!important}
        }
      `}</style>
    </>
  );
}
