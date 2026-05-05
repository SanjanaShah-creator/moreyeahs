'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, TrendingUp, Zap, CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import { GradientBars } from '@/components/ui/gradient-bar-hero-section';

export default function Dynamics365CaseStudy() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 80 }}>
        <GradientBars count={16} />
        <NoiseOverlay />

        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            {/* Breadcrumb — site standard: ← Parent > Parent > Current */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--fg-3)', marginBottom: 28, flexWrap: 'wrap' }}>
              <Link href="/case-studies" style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--fg-3)', textDecoration: 'none', fontWeight: 600 }}>
                <ArrowLeft size={12} strokeWidth={2} /> Case Studies
              </Link>
              <ChevronRight size={12} color="var(--fg-3)" strokeWidth={2} />
              <span style={{ color: '#4D86F5', fontWeight: 700 }}>Microsoft Services</span>
            </div>

            <div style={{ maxWidth: 900 }}>
              <div style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
                color: '#4D86F5', background: 'rgba(77,134,245,0.10)', border: '1px solid rgba(77,134,245,0.25)',
                padding: '4px 10px', borderRadius: 999, display: 'inline-block', marginBottom: 16,
              }}>
                Microsoft Services
              </div>

              <h1 style={{
                fontSize: 'clamp(32px,6vw,56px)', fontWeight: 800, letterSpacing: '-0.04em',
                color: 'var(--fg)', lineHeight: 1.1, marginBottom: 20,
              }}>
                Legacy ERP to Dynamics 365: Cutting Procurement Time by 55% Across Government
              </h1>

              <p style={{ fontSize: 17, color: 'var(--fg-3)', lineHeight: 1.8, maxWidth: 700 }}>
                We replaced a decade-old ERP system with Dynamics 365 across 12 government departments, enforcing end-to-end audit compliance and eliminating manual procurement bottlenecks.
              </p>

              <div style={{ display: 'flex', gap: 32, marginTop: 28, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--fg-3)' }}>
                  <Calendar size={16} strokeWidth={2} /> January 10, 2026
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--fg-3)' }}>
                  <Zap size={16} strokeWidth={2} /> 14-week delivery
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Key Metrics ──────────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-2)', paddingTop: 60, paddingBottom: 60, borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
              {[
                { metric: '55%', label: 'Faster Procurement', icon: '⚡' },
                { metric: '100%', label: 'Compliance Achieved', icon: '✓' },
                { metric: '12', label: 'Departments Unified', icon: '🏛️' },
                { metric: '8 wks', label: 'Implementation', icon: '🚀' },
              ].map((item, idx) => (
                <div key={idx} style={{
                  background: 'var(--card-bg)', border: '1px solid var(--card-border)',
                  borderRadius: 12, padding: 24, textAlign: 'center',
                }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#7C3AED', marginBottom: 8 }}>
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

      {/* ── Content ──────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-2)', paddingTop: 80, paddingBottom: 120 }}>
        <div className="container">
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: 800, margin: '0 auto' }}
          >
            {/* Section 1 */}
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--fg)', marginBottom: 16, letterSpacing: '-0.02em' }}>
                The Challenge: Fragmented Procurement Across 12 Departments
              </h2>
              <p style={{ fontSize: 16, color: 'var(--fg-2)', lineHeight: 1.8, marginBottom: 16 }}>
                Our client was a large regional government entity managing procurement for 12 autonomous departments (transportation, health, environment, etc.). The organization's ERP system was 10+ years old—a patchwork of legacy applications, manual workflows, and Excel-based reconciliation.
              </p>
              <p style={{ fontSize: 16, color: 'var(--fg-2)', lineHeight: 1.8, marginBottom: 16 }}>
                The results were predictable chaos:
              </p>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: 16 }}>
                {[
                  'Average procurement cycle: 47 days (quote to payment)',
                  'Departments used different vendors, no centralized negotiation power',
                  'Manual invoice reconciliation; 12% error rate required re-processing',
                  'Zero audit trail; compliance officers spent months recreating paper records',
                  'Decentralized payments; no visibility into government spending',
                ].map((item, idx) => (
                  <li key={idx} style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.8, marginBottom: 12, paddingLeft: 20, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#7C3AED' }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.8, background: 'rgba(124, 58, 237, 0.1)', padding: 16, borderRadius: 8, borderLeft: '4px solid #7C3AED' }}>
                <strong>The ask:</strong> Consolidate onto a single ERP system, enforce compliance across all 12 departments, and streamline procurement workflows—all while maintaining operational continuity.
              </p>
            </div>

            {/* Section 2 */}
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--fg)', marginBottom: 16, letterSpacing: '-0.02em' }}>
                Why Dynamics 365?
              </h2>
              <p style={{ fontSize: 16, color: 'var(--fg-2)', lineHeight: 1.8, marginBottom: 16 }}>
                The client was already on Office 365 with Outlook, Teams, and SharePoint across the organization. Dynamics 365 was the natural fit:
              </p>

              <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
                {[
                  { benefit: 'Native Office 365 Integration', detail: 'Users already in Outlook and Teams. No new login, familiar interface. 40% faster adoption.' },
                  { benefit: 'Rapid Customization', detail: 'Power Apps and Power Automate allowed us to build custom workflows without heavy coding.' },
                  { benefit: 'Compliance Built-In', detail: 'Azure Government Cloud support for GovCloud deployment; automatic audit logging.' },
                  { benefit: 'Cost Efficiency', detail: 'Microsoft bundled licensing: D365 + Power Apps + Automate reduced TCO vs. separate point solutions.' },
                ].map((item, idx) => (
                  <div key={idx} style={{ background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.05), rgba(124, 58, 237, 0.02))', border: '1px solid #7C3AED20', borderRadius: 8, padding: 16 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)', marginBottom: 6 }}>{item.benefit}</div>
                    <div style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.6 }}>{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3 */}
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--fg)', marginBottom: 16, letterSpacing: '-0.02em' }}>
                Implementation Strategy: "Federated Hub-and-Spoke"
              </h2>
              <p style={{ fontSize: 16, color: 'var(--fg-2)', lineHeight: 1.8, marginBottom: 16 }}>
                We designed a hub-and-spoke model: a centralized Dynamics 365 instance for enterprise-wide procurement, with department-specific Power Apps portals for localized request intake.
              </p>

              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 12, padding: 24, marginBottom: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)', marginBottom: 14 }}>Core Modules Implemented</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {[
                    '<strong>Procurement:</strong> Purchase requisitions, PO creation, vendor management, spend analysis',
                    '<strong>Accounts Payable:</strong> Invoice receipt & matching, three-way reconciliation, payment processing',
                    '<strong>Analytics:</strong> Real-time dashboards showing spend by department, vendor, commodity',
                    '<strong>Compliance:</strong> Audit trails, approval workflows, policy enforcement, segregation of duties',
                    '<strong>Integrations:</strong> Legacy ERP (data migration), banking system (payment exports), email (order notifications)',
                  ].map((item, idx) => (
                    <li key={idx} style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.8, marginBottom: 10, paddingLeft: 20, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>→</span>
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 12, padding: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)', marginBottom: 14 }}>Implementation Timeline</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {[
                    '<strong>Week 1–2:</strong> Requirements gathering across all 12 departments',
                    '<strong>Week 3–4:</strong> Dynamics 365 core configuration; Power Apps UI design',
                    '<strong>Week 5–6:</strong> Workflow automation (Power Automate); legacy data extraction',
                    '<strong>Week 7–8:</strong> Testing with pilot department (Transportation); feedback iteration',
                    '<strong>Week 9–11:</strong> Rollout to remaining 11 departments (phased weekly)',
                    '<strong>Week 12–14:</strong> Training, hypercare support, go-live stabilization',
                  ].map((item, idx) => (
                    <li key={idx} style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.8, marginBottom: 10, paddingLeft: 20, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>→</span>
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 4 */}
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--fg)', marginBottom: 16, letterSpacing: '-0.02em' }}>
                Results: Transforming Government Procurement
              </h2>

              <div style={{ display: 'grid', gap: 16 }}>
                {[
                  {
                    title: 'Procurement Speed',
                    before: '47 days',
                    after: '21 days',
                    detail: '55% reduction. Automated approvals, instant requisition intake, centralized vendor management cut cycle time dramatically.',
                  },
                  {
                    title: 'Error Rates',
                    before: '12% invoice mismatch',
                    after: '0.8% mismatch',
                    detail: '93% reduction in manual rework. Three-way matching and automated reconciliation virtually eliminated discrepancies.',
                  },
                  {
                    title: 'Cost Savings',
                    before: 'N/A',
                    after: '$2.4M Year 1',
                    detail: 'Centralized purchasing enabled bulk discounts. Reduced tail spend (small, unmanaged purchases) by 31%.',
                  },
                  {
                    title: 'Compliance',
                    before: 'Manual audit (3 months)',
                    after: 'Automated (1 week)',
                    detail: 'Full audit trail captured automatically. Year-end compliance verification reduced from 3 months to 1 week.',
                  },
                  {
                    title: 'User Adoption',
                    before: 'N/A',
                    after: '92% within 90 days',
                    detail: 'Office 365 integration + intuitive UI meant users were productive on day 1. Minimal training required.',
                  },
                ].map((item, idx) => (
                  <div key={idx} style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 8, padding: 16 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 16, alignItems: 'center', marginBottom: 8 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)' }}>{item.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--fg-3)', textAlign: 'right' }}>
                        <div>Before: {item.before}</div>
                        <div style={{ color: '#7C3AED', fontWeight: 700 }}>After: {item.after}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.6 }}>{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5 */}
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--fg)', marginBottom: 16, letterSpacing: '-0.02em' }}>
                Government & Compliance Considerations
              </h2>
              <p style={{ fontSize: 16, color: 'var(--fg-2)', lineHeight: 1.8, marginBottom: 16 }}>
                Working in government required careful navigation of compliance and security requirements:
              </p>

              <div style={{ display: 'grid', gap: 16 }}>
                {[
                  { title: 'GovCloud Deployment', detail: 'Deployed on Microsoft Azure Government (FedRAMP authorized). Ensures data residency and compliance with DFARS requirements.' },
                  { title: 'Audit & Accountability', detail: 'Full immutable audit logs capture every action (create, modify, delete) with timestamp and user context. COSO-compliant.' },
                  { title: 'Segregation of Duties', detail: 'Workflows enforced separation between requisitioner, approver, receiver, and accountant roles. Prevents fraud.' },
                  { title: 'Data Governance', detail: 'Established master data governance for vendors, cost centers, GL accounts. Single source of truth for reporting.' },
                ].map((item, idx) => (
                  <div key={idx} style={{ background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.05), rgba(124, 58, 237, 0.02))', border: '1px solid #7C3AED20', borderRadius: 8, padding: 16 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)', marginBottom: 6 }}>{item.title}</div>
                    <div style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.6 }}>{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 6 */}
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--fg)', marginBottom: 16, letterSpacing: '-0.02em' }}>
                Key Takeaways
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 12 }}>
                {[
                  'Large organizations benefit from centralized ERP, but federated UX (Power Apps) preserves departmental autonomy.',
                  'Office 365 integration dramatically accelerates adoption—users get a familiar tool, not a foreign system.',
                  'Government procurement is uniquely suited to Dynamics 365 + Power Platform: compliance, audit, and customization out-of-the-box.',
                  'Process redesign is critical—the new system can\'t fix broken workflows. We spent 25% of effort on process optimization.',
                  'Change management matters: without executive buy-in and user training, no system succeeds.',
                ].map((item, idx) => (
                  <li key={idx} style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.8, paddingLeft: 20, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#7C3AED' }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--border)', textAlign: 'center' }}>
              <p style={{ fontSize: 15, color: 'var(--fg-2)', marginBottom: 20 }}>
                Need help modernizing your procurement or ERP system?
              </p>
              <Link
                href="/contact-us"
                style={{
                  display: 'inline-block', padding: '14px 32px', background: '#7C3AED', color: '#fff',
                  borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none',
                  transition: 'background 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#6D28D9'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#7C3AED'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                Get a Free Assessment
              </Link>
            </div>
          </motion.article>
        </div>
      </section>
    </>
  );
}
