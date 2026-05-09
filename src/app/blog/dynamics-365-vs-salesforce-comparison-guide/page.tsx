'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Check, X, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import { GradientBars } from '@/components/ui/gradient-bar-hero-section';

export default function DynamicsBlogPage() {
  return (
    <>
      {/* â”€â”€ Hero â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 80 }}>
        <GradientBars count={16} />
        <NoiseOverlay />

        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            {/* Breadcrumb â€” site standard: â† Parent > Current */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--fg-3)', marginBottom: 28, flexWrap: 'wrap' }}>
              <Link href="/blog" style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--fg-3)', textDecoration: 'none', fontWeight: 600 }}>
                <ArrowLeft size={12} strokeWidth={2} /> Blog
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
                Dynamics 365 vs Salesforce: A Comprehensive Comparison Guide
              </h1>

              <p style={{ fontSize: 17, color: 'var(--fg-3)', lineHeight: 1.8, maxWidth: 700 }}>
                Making the choice between Microsoft Dynamics 365 and Salesforce? We break down pricing, features, integrations, and implementation timelines to help you make the right decision for your organization.
              </p>

              <div style={{ display: 'flex', gap: 32, marginTop: 28, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--fg-3)' }}>
                  <Calendar size={16} strokeWidth={2} /> April 28, 2026
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--fg-3)' }}>
                  <Clock size={16} strokeWidth={2} /> 12 min read
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* â”€â”€ Content â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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
                Introduction
              </h2>
              <p style={{ fontSize: 16, color: 'var(--fg-2)', lineHeight: 1.8, marginBottom: 16 }}>
                Choosing a Customer Relationship Management (CRM) platform is one of the most critical decisions your organization will make. The wrong choice can lead to missed revenue opportunities, integration headaches, and unnecessary costs. The two largest enterprise CRM platforms are Salesforce and Microsoft Dynamics 365â€”both powerful, but fundamentally different in approach, pricing, and ecosystem.
              </p>
              <p style={{ fontSize: 16, color: 'var(--fg-2)', lineHeight: 1.8 }}>
                After helping 25+ organizations navigate this decision, we've developed a framework to evaluate these platforms based on real-world implementation scenarios. This guide will help you cut through the marketing and focus on what matters: total cost of ownership, integration capability, speed to value, and long-term scalability.
              </p>
            </div>

            {/* Section 2 */}
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--fg)', marginBottom: 16, letterSpacing: '-0.02em' }}>
                1. Core Positioning & Philosophy
              </h2>
              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 12, padding: 24, marginBottom: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)', marginBottom: 12 }}>Salesforce</h3>
                <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.7, marginBottom: 12 }}>
                  <strong>Philosophy:</strong> "The number one cloud CRM." Salesforce is built as a standalone, best-in-class CRM platform with a massive ecosystem of third-party integrations. It's designed to be the single source of truth for sales, service, and marketing.
                </p>
                <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.7 }}>
                  <strong>Strength:</strong> Unmatched user adoption rates in sales teams. Sales reps prefer it. The UI is intuitive, mobile-first, and designed around sales workflows.
                </p>
              </div>
              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 12, padding: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)', marginBottom: 12 }}>Dynamics 365</h3>
                <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.7, marginBottom: 12 }}>
                  <strong>Philosophy:</strong> "CRM as part of an integrated Microsoft ecosystem." Dynamics 365 is built to work seamlessly with Office 365, Power BI, Power Apps, and the broader Azure stack. It's designed for organizations already invested in Microsoft.
                </p>
                <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.7 }}>
                  <strong>Strength:</strong> Exceptional integration with Microsoft tools. If your organization runs on Office 365, Outlook, and Teams, Dynamics 365 will feel native. Less friction with data silos.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--fg)', marginBottom: 16, letterSpacing: '-0.02em' }}>
                2. Pricing Comparison
              </h2>
              <p style={{ fontSize: 16, color: 'var(--fg-2)', lineHeight: 1.8, marginBottom: 24 }}>
                This is where the decision often tilts. Pricing models are fundamentally different:
              </p>

              <div style={{ overflowX: 'auto', marginBottom: 24 }}>
                <table style={{
                  width: '100%', borderCollapse: 'collapse', fontSize: 14,
                  border: '1px solid var(--border)',
                }}>
                  <thead>
                    <tr style={{ background: 'var(--card-bg)', borderBottom: '2px solid var(--border)' }}>
                      <th style={{ padding: 14, textAlign: 'left', fontWeight: 700, color: 'var(--fg)' }}>Metric</th>
                      <th style={{ padding: 14, textAlign: 'left', fontWeight: 700, color: 'var(--fg)' }}>Salesforce</th>
                      <th style={{ padding: 14, textAlign: 'left', fontWeight: 700, color: 'var(--fg)' }}>Dynamics 365</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: 14, color: 'var(--fg-2)', fontWeight: 600 }}>Base License</td>
                      <td style={{ padding: 14, color: 'var(--fg-2)' }}><strong>$165/user/month</strong> (Pro)</td>
                      <td style={{ padding: 14, color: 'var(--fg-2)' }}><strong>$50â€“$120/user/month</strong></td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: 14, color: 'var(--fg-2)', fontWeight: 600 }}>Platform Fee</td>
                      <td style={{ padding: 14, color: 'var(--fg-2)' }}>None</td>
                      <td style={{ padding: 14, color: 'var(--fg-2)' }}><strong>$100/tenant/month</strong> (can add up)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: 14, color: 'var(--fg-2)', fontWeight: 600 }}>Microsoft 365 Integration</td>
                      <td style={{ padding: 14, color: 'var(--fg-2)' }}>Additional cost for integration</td>
                      <td style={{ padding: 14, color: 'var(--fg-2)' }}><strong>Often included</strong> in Microsoft bundles</td>
                    </tr>
                    <tr>
                      <td style={{ padding: 14, color: 'var(--fg-2)', fontWeight: 600 }}>Customization</td>
                      <td style={{ padding: 14, color: 'var(--fg-2)' }}>Flows, Apex dev (extra cost)</td>
                      <td style={{ padding: 14, color: 'var(--fg-2)' }}>Power Apps, Power Automate (often included)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.8, background: 'rgba(251, 191, 36, 0.1)', padding: 16, borderRadius: 8, borderLeft: '4px solid #F59E0B' }}>
                <strong>Real-world scenario:</strong> A 100-person sales team with Salesforce costs ~$165k/year (base licenses). The same team on Dynamics 365 might run $80k/year in CRM licenses alone, but add Microsoft 365 bundles, Power Apps licensing, and customization feesâ€”and the gap narrows to 15â€“30% savings, depending on your Microsoft footprint.
              </p>
            </div>

            {/* Section 4 */}
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--fg)', marginBottom: 16, letterSpacing: '-0.02em' }}>
                3. Feature Comparison: Head-to-Head
              </h2>

              <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
                {[
                  { feature: 'Sales Force Automation', sf: 5, d365: 5 },
                  { feature: 'Service Cloud (Ticketing)', sf: 5, d365: 4 },
                  { feature: 'Marketing Automation', sf: 5, d365: 3 },
                  { feature: 'Customization (Low-Code)', sf: 4, d365: 5 },
                  { feature: 'Microsoft 365 Integration', sf: 2, d365: 5 },
                  { feature: 'Third-Party Ecosystem', sf: 5, d365: 3 },
                  { feature: 'AI Capabilities (Einstein/Copilot)', sf: 5, d365: 4 },
                  { feature: 'Analytics & Reporting', sf: 4, d365: 5 },
                ].map((row, idx) => (
                  <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 16, alignItems: 'center', padding: 16, background: 'var(--card-bg)', borderRadius: 8 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg)' }}>{row.feature}</div>
                    <div style={{ fontSize: 13, color: 'var(--fg-2)' }}>
                      {'â˜…'.repeat(row.sf)}<span style={{ opacity: 0.3 }}>{'â˜…'.repeat(5 - row.sf)}</span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--fg-2)' }}>
                      {'â˜…'.repeat(row.d365)}<span style={{ opacity: 0.3 }}>{'â˜…'.repeat(5 - row.d365)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.8 }}>
                <strong>Key takeaway:</strong> Salesforce wins on specialized use cases (marketing automation, service cloud maturity). Dynamics 365 wins on integrated business operations and low-code customization. For pure sales CRM, both are excellentâ€”the difference is often integration and ecosystem.
              </p>
            </div>

            {/* Section 5 */}
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--fg)', marginBottom: 16, letterSpacing: '-0.02em' }}>
                4. Implementation Timeline & Complexity
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
                {[
                  {
                    name: 'Salesforce',
                    time: '4â€“9 months',
                    details: ['Sales Cloud only: 4-6 months', 'Multi-cloud deployment: 6-9+ months', 'Requires Apex/SOQL expertise for advanced customization', 'Strong partner ecosystem increases costs but speeds delivery'],
                  },
                  {
                    name: 'Dynamics 365',
                    time: '3â€“7 months',
                    details: ['Sales & Service modules: 3-6 months', 'Heavy Power Apps customization: 6-7+ months', 'Shorter learning curve if org uses Office 365', 'More IT-friendly for organizations with strong Azure teams'],
                  },
                ].map((impl, idx) => (
                  <div key={idx} style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 12, padding: 24 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--fg)', marginBottom: 8 }}>{impl.name}</h3>
                    <div style={{ fontSize: 16, fontWeight: 600, color: '#4D86F5', marginBottom: 16 }}>{impl.time}</div>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {impl.details.map((detail, i) => (
                        <li key={i} style={{ fontSize: 14, color: 'var(--fg-2)', marginBottom: 8, paddingLeft: 20, position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, color: '#4D86F5' }}>â†’</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 6 */}
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--fg)', marginBottom: 16, letterSpacing: '-0.02em' }}>
                5. Choose Salesforce If...
              </h2>
              <div style={{ display: 'grid', gap: 12 }}>
                {[
                  'Your organization needs best-in-class marketing automation',
                  'You have a large, geographically distributed sales team (strong mobile-first UX is critical)',
                  'You need deep integrations with Slack, Stripe, Workday, or other non-Microsoft ecosystems',
                  'You require highly specialized industry solutions (Financial Services Cloud, Manufacturing Cloud, etc.)',
                  'Your org has limited Microsoft 365 investment',
                  'You want the largest partner/consulting ecosystem for support',
                ].map((reason, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 15, color: 'var(--fg-2)' }}>
                    <Check size={18} strokeWidth={2.5} style={{ color: '#10B981', flexShrink: 0, marginTop: 2 }} />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 7 */}
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--fg)', marginBottom: 16, letterSpacing: '-0.02em' }}>
                6. Choose Dynamics 365 If...
              </h2>
              <div style={{ display: 'grid', gap: 12 }}>
                {[
                  'Your organization is deeply invested in Microsoft 365 (Office, Teams, Outlook, SharePoint)',
                  'You need low-code, rapid customization capabilities (Power Apps, Power Automate)',
                  'You require tight integration with business operations (ERP-like features via Dynamics 365 Supply Chain)',
                  'Your IT team has strong Azure/Microsoft development expertise',
                  'Total cost of ownership is the primary driver, and you\'re already paying for Microsoft licenses',
                  'You want to leverage AI/Copilot for productivity across your organization',
                ].map((reason, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 15, color: 'var(--fg-2)' }}>
                    <Check size={18} strokeWidth={2.5} style={{ color: '#7C3AED', flexShrink: 0, marginTop: 2 }} />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 8 */}
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--fg)', marginBottom: 16, letterSpacing: '-0.02em' }}>
                7. Hidden Costs & Gotchas
              </h2>

              <div style={{ display: 'grid', gap: 16 }}>
                {[
                  { title: 'Salesforce', cost: 'AppExchange add-ons', note: 'Essential plugins (CPQ, Service Cloud bundles, Slack integration) add 20â€“40% to license costs' },
                  { title: 'Salesforce', cost: 'Apex development', note: 'Custom code requires Salesforce-certified developers. Expensive. Vendor lock-in.' },
                  { title: 'Dynamics 365', cost: 'Power Apps/Automate licensing', note: 'Each Power Apps per-user license can be $10-15/month on top of CRM licenses' },
                  { title: 'Dynamics 365', cost: 'ISV extensions', note: 'Independent software vendors charge separately; not always bundled like Salesforce' },
                  { title: 'Both', cost: 'Data migration & training', note: '$50kâ€“$150k depending on org size and data quality. Expect 8â€“12 weeks.' },
                  { title: 'Both', cost: 'User adoption initiatives', note: 'Budget for change management, training, and potential support for 6+ months post-launch.' },
                ].map((item, idx) => (
                  <div key={idx} style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8, padding: 16 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <X size={18} strokeWidth={2.5} style={{ color: '#EF4444', flexShrink: 0, marginTop: 2 }} />
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)' }}>
                          {item.title}: {item.cost}
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--fg-2)', marginTop: 4 }}>{item.note}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 9 */}
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--fg)', marginBottom: 16, letterSpacing: '-0.02em' }}>
                Conclusion: The Decision Matrix
              </h2>
              <p style={{ fontSize: 16, color: 'var(--fg-2)', lineHeight: 1.8, marginBottom: 16 }}>
                Both platforms are mature, powerful, and capable of delivering significant ROI. The choice often comes down to ecosystem alignment and total cost of ownership:
              </p>

              <div style={{ background: 'linear-gradient(135deg, rgba(26,86,219,0.1), rgba(123,58,237,0.1))', border: '1px solid var(--border)', borderRadius: 12, padding: 28 }}>
                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 16 }}>
                  {[
                    '<strong>Salesforce wins if:</strong> You need best-in-class CRM features, deep non-Microsoft integrations, or industry-specific solutions. Expect 3â€“5 year ROI.',
                    '<strong>Dynamics 365 wins if:</strong> You\'re Microsoft-first, need rapid customization, and want lower licensing costs. Expect 2â€“3 year ROI if already on M365.',
                    '<strong>Hybrid approach:</strong> Some organizations run bothâ€”Salesforce for sales, Dynamics 365 for service + operations. Complex to manage but maximizes each platform\'s strengths.',
                  ].map((item, idx) => (
                    <li key={idx} style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--border)', textAlign: 'center' }}>
              <p style={{ fontSize: 15, color: 'var(--fg-2)', marginBottom: 20 }}>
                Need help evaluating these platforms for your organization?
              </p>
              <Link
                href="/contact-us"
                style={{
                  display: 'inline-block', padding: '14px 32px', background: '#4D86F5', color: '#fff',
                  borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none',
                  transition: 'background 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1A56DB'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#4D86F5'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                Let's Talk Strategy
              </Link>
            </div>
          </motion.article>
        </div>
      </section>

      <style>{`
        @media(max-width:768px){
          table { font-size: 12px !important; }
          th, td { padding: 10px !important; }
        }
      `}</style>
    </>
  );
}
