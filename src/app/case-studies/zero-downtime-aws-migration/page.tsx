'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, TrendingUp, DollarSign, CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import { GradientBars } from '@/components/ui/gradient-bar-hero-section';

export default function AWSMigrationCaseStudy() {
  return (
    <>
      {/* ’€’€ Hero ’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€ */}
      <section style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 80 }}>
        <GradientBars count={16} />
        <NoiseOverlay />

        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            {/* Breadcrumb – site standard: → Parent > Current */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--fg-3)', marginBottom: 28, flexWrap: 'wrap' }}>
              <Link href="/case-studies" style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--fg-3)', textDecoration: 'none', fontWeight: 600 }}>
                <ArrowLeft size={12} strokeWidth={2} /> Case Studies
              </Link>
              <ChevronRight size={12} color="var(--fg-3)" strokeWidth={2} />
              <span style={{ color: '#4D86F5', fontWeight: 700 }}>Cloud &amp; Infrastructure</span>
            </div>

            <div style={{ maxWidth: 900 }}>
              <div style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
                color: '#4D86F5', background: 'rgba(77,134,245,0.10)', border: '1px solid rgba(77,134,245,0.25)',
                padding: '4px 10px', borderRadius: 999, display: 'inline-block', marginBottom: 16,
              }}>
                Cloud &amp; Infrastructure
              </div>

              <h1 style={{
                fontSize: 'clamp(32px,6vw,56px)', fontWeight: 800, letterSpacing: '-0.04em',
                color: 'var(--fg)', lineHeight: 1.1, marginBottom: 20,
              }}>
                Zero-Downtime AWS Migration: How We Saved a Fintech $420K Annually
              </h1>

              <p style={{ fontSize: 17, color: 'var(--fg-3)', lineHeight: 1.8, maxWidth: 700 }}>
                A complete lift-and-modernize migration for a high-volume payments processor, transitioning from on-premises monoliths to containerized microservices on AWS with zero customer impact.
              </p>

              <div style={{ display: 'flex', gap: 32, marginTop: 28, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--fg-3)' }}>
                  <Calendar size={16} strokeWidth={2} /> March 2, 2026
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--fg-3)' }}>
                  <TrendingUp size={16} strokeWidth={2} /> 4-month execution
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ’€’€ Key Metrics ’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€ */}
      <section style={{ background: 'var(--bg-2)', paddingTop: 60, paddingBottom: 60, borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
              {[
                { metric: '$420K', label: 'Annual Cost Savings', icon: 'ðŸ’°' },
                { metric: '99.99%', label: 'Uptime Achieved', icon: '✅' },
                { metric: '42%', label: 'Infrastructure Reduction', icon: 'ðŸ“‰' },
                { metric: '12→’34', label: 'Microservices Deployed', icon: 'ðŸš€' },
              ].map((item, idx) => (
                <div key={idx} style={{
                  background: 'var(--card-bg)', border: '1px solid var(--card-border)',
                  borderRadius: 12, padding: 24, textAlign: 'center',
                }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#0EA472', marginBottom: 8 }}>
                    {item.metric}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--fg-3)', fontWeight: 600 }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ’€’€ Content ’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€’€ */}
      <section style={{ background: 'var(--bg-2)', paddingTop: 80, paddingBottom: 120 }}>
        <div className="container">
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: 800, margin: '0 auto' }}
          >
            {/* Section 1 */}
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--fg)', marginBottom: 16, letterSpacing: '-0.02em' }}>
                The Challenge
              </h2>
              <p style={{ fontSize: 16, color: 'var(--fg-2)', lineHeight: 1.8, marginBottom: 16 }}>
                Our client, a Tier-1 fintech payments processor, was running on legacy infrastructure: 12 interconnected monolithic applications on bare-metal servers in a private data center. The system processed over 50 million transactions per month, averaging $2.3 billion in daily transaction volume.
              </p>
              <p style={{ fontSize: 16, color: 'var(--fg-2)', lineHeight: 1.8, marginBottom: 16 }}>
                The infrastructure was a critical constraint:
              </p>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: 16 }}>
                {[
                  'High capital expenditure: $1.2M/year in hardware, cooling, and co-location fees',
                  'Rigid scaling: Adding capacity required 8–12 week procurement cycles',
                  'Operational risk: Single points of failure could impact millions in daily transactions',
                  'Limited elasticity: Spikes in transaction volume required expensive over-provisioning',
                  'Compliance complexity: Distributed systems across multiple data centers, hard to audit',
                ].map((item, idx) => (
                  <li key={idx} style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.8, marginBottom: 12, paddingLeft: 20, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#0EA472' }}>→’</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: 16, color: 'var(--fg-2)', lineHeight: 1.8 }}>
                The client needed to migrate to the cloud without any downtime–every minute offline cost them $1.6M in transaction fees and potential reputational damage.
              </p>
            </div>

            {/* Section 2 */}
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--fg)', marginBottom: 16, letterSpacing: '-0.02em' }}>
                Our Approach: "The Canary Strategy"
              </h2>
              <p style={{ fontSize: 16, color: 'var(--fg-2)', lineHeight: 1.8, marginBottom: 16 }}>
                Zero-downtime migration required a sophisticated, phased approach. We designed a "canary deployment" strategy that shifted traffic gradually from legacy systems to AWS while maintaining complete redundancy and the ability to instant-rollback at any stage.
              </p>

              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 12, padding: 24, marginBottom: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)', marginBottom: 14 }}>Phase 1: Foundation (Weeks 1–3)</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {[
                    'Set up AWS infrastructure (VPCs, security groups, IAM roles, KMS encryption)',
                    'Deploy RDS Multi-AZ databases with cross-region replication to legacy data center',
                    'Build bi-directional data sync pipeline (legacy →” AWS) using AWS DMS and Kafka',
                    'Establish monitoring and alerting across both environments',
                  ].map((item, idx) => (
                    <li key={idx} style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.8, marginBottom: 10, paddingLeft: 20, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>→’</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 12, padding: 24, marginBottom: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)', marginBottom: 14 }}>Phase 2: Containerization (Weeks 4–6)</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {[
                    'Decompose monoliths into 34 microservices using domain-driven design',
                    'Containerize each service using Docker; push to Amazon ECR',
                    'Deploy on ECS Fargate (serverless containers) for automatic scaling',
                    'Implement service-to-service communication via API Gateway and gRPC',
                  ].map((item, idx) => (
                    <li key={idx} style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.8, marginBottom: 10, paddingLeft: 20, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>→’</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 12, padding: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)', marginBottom: 14 }}>Phase 3: Traffic Shift (Weeks 7–12)</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {[
                    'Week 7: Route 5% of transaction traffic to AWS via weighted ALB routing',
                    'Week 8: 20% traffic shift. Monitor 48 hours. Zero issues →’ proceed',
                    'Week 9: 50% traffic shift. Validate database consistency, latency, error rates',
                    'Week 10: 80% traffic shift. Conduct load testing to 100% capacity',
                    'Week 11: 95% traffic shift. Keep legacy systems as hot standby',
                    'Week 12: 100% traffic shift. Sunset legacy infrastructure over 2-week decommission window',
                  ].map((item, idx) => (
                    <li key={idx} style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.8, marginBottom: 10, paddingLeft: 20, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>→’</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 3 */}
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--fg)', marginBottom: 16, letterSpacing: '-0.02em' }}>
                Technical Highlights
              </h2>

              <div style={{ display: 'grid', gap: 16 }}>
                {[
                  { title: 'Data Consistency', desc: 'Used AWS DMS with bidirectional sync + application-level idempotency keys to ensure zero data loss during traffic shifts.' },
                  { title: 'Latency Optimization', desc: 'Deployed CloudFront CDN + ElastiCache for subsecond response times. P99 latency improved 34% over on-prem.' },
                  { title: 'Rollback Strategy', desc: 'Reverse traffic routing in <30 seconds if anomalies detected. Automated tests ran every 30 min during migration.' },
                  { title: 'Compliance & Audit', desc: 'AWS Config + CloudTrail captured every change. SOC 2 compliance verified before traffic shift each phase.' },
                  { title: 'Cost Monitoring', desc: 'Real-time billing alerts. AWS Cost Explorer tracked spending; reserved instances negotiated for consistent 40% discount.' },
                ].map((item, idx) => (
                  <div key={idx} style={{ background: 'linear-gradient(135deg, rgba(14, 164, 114, 0.05), rgba(14, 164, 114, 0.02))', border: '1px solid #0EA47220', borderRadius: 8, padding: 16 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)', marginBottom: 6 }}>{item.title}</div>
                    <div style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4 */}
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--fg)', marginBottom: 16, letterSpacing: '-0.02em' }}>
                Results & Business Impact
              </h2>

              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 12, padding: 24, marginBottom: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)', marginBottom: 12 }}>Infrastructure Costs</h3>
                <p style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.7, marginBottom: 12 }}>
                  <strong>Before:</strong> $1.2M/year (hardware, co-location, staff)
                </p>
                <p style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.7 }}>
                  <strong>After:</strong> $780K/year (AWS compute, storage, data transfer)
                </p>
                <p style={{ fontSize: 14, color: '#0EA472', lineHeight: 1.7, marginTop: 12, fontWeight: 700 }}>
                  ✓ $420K/year savings (~35% reduction)
                </p>
              </div>

              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 12, padding: 24, marginBottom: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)', marginBottom: 12 }}>Performance & Reliability</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {[
                    '99.99% uptime (vs. 99.85% on-prem)',
                    'P50 latency: 45ms (on-prem: 87ms)',
                    'P99 latency: 220ms (on-prem: 520ms)',
                    'Auto-scaling handled peak traffic (9pm EST holiday spike) with zero manual intervention',
                  ].map((item, idx) => (
                    <li key={idx} style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.8, marginBottom: 8, paddingLeft: 20, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 12, padding: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)', marginBottom: 12 }}>Operational Agility</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {[
                    'New features now deploy in minutes (vs. 1-2 week release cycles)',
                    'Provisioning new capacity: 10 minutes (vs. 8-12 weeks)',
                    'Debugging & root-cause analysis: 60% faster with centralized logging (CloudWatch)',
                  ].map((item, idx) => (
                    <li key={idx} style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.8, marginBottom: 8, paddingLeft: 20, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 5 */}
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--fg)', marginBottom: 16, letterSpacing: '-0.02em' }}>
                Lessons Learned
              </h2>

              <div style={{ display: 'grid', gap: 16 }}>
                {[
                  { title: '1. Test Your Rollback Plan', desc: 'We conducted 6 full rollback simulations before go-live. When traffic anomalies occurred in Week 9, rolling back took 28 seconds–faster than expected.' },
                  { title: '2. Idempotency is Non-Negotiable', desc: 'Network failures during migration could cause retries. Every payment transaction had a unique idempotency key; the system could safely replay requests without double-charging.' },
                  { title: '3. Communicate with Stakeholders', desc: 'Weekly status calls with C-suite, compliance, and ops teams built confidence. Transparency about risks and mitigations was critical.' },
                  { title: '4. Plan for the Unexpected', desc: 'We budgeted 2 extra weeks into the timeline "just in case." We used 1 week for additional performance testing when latency targets were nearly missed in Week 8.' },
                  { title: '5. Cost Monitoring From Day One', desc: 'AWS bills can spiral if not monitored closely. We set up billing alerts and forecasting immediately, catching unnecessary redundant resources early.' },
                ].map((item, idx) => (
                  <div key={idx} style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 8, padding: 16 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)', marginBottom: 6 }}>{item.title}</div>
                    <div style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--border)', textAlign: 'center' }}>
              <p style={{ fontSize: 15, color: 'var(--fg-2)', marginBottom: 20 }}>
                Planning a cloud migration? Let's talk zero-downtime strategies.
              </p>
              <Link
                href="/contact-us"
                style={{
                  display: 'inline-block', padding: '14px 32px', background: '#0EA472', color: '#fff',
                  borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none',
                  transition: 'background 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#047857'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0EA472'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                Schedule a Consultation
              </Link>
            </div>
          </motion.article>
        </div>
      </section>
    </>
  );
}
