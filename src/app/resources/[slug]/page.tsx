'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import { downloadAsPDF } from '@/lib/pdf-export';

const BLUE = '#4D86F5';
const BLUE_LIGHT = 'rgba(77,134,245,0.08)';

/* ─── Tag colours ────────────────────────────────────────────────── */
const TAG_COLORS: Record<string, string> = {
  Sales: '#4D86F5', Operations: '#1A56DB', B2B: '#80A9FF',
  Automation: '#0E2E75', Library: '#4D86F5',
};
function TagPill({ label }: { label: string }) {
  const c = TAG_COLORS[label] ?? BLUE;
  return (
    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: c, background: `${c}18`, border: `1px solid ${c}30`, padding: '3px 9px', borderRadius: 999 }}>
      {label}
    </span>
  );
}

/* ─── Playbook content ───────────────────────────────────────────── */
type Section = { heading: string; items?: string[]; body?: string };
type Playbook = {
  slug: string; title: string; tags: string[]; readTime: string;
  intro: string;
  sections: Section[];
  conclusion: string;
};

const PLAYBOOKS: Playbook[] = [
  {
    slug: 'connected-systems-playbook',
    title: 'The Connected Systems Playbook',
    tags: ['Operations', 'B2B'],
    readTime: '12 min read',
    intro: 'Most growing businesses already use multiple systems: A CRM to manage leads and deals, Spreadsheets or tools for operations, Finance systems for billing, Dashboards for reporting. Despite this, work still depends on manual coordination.',
    sections: [
      {
        heading: 'Section 1: Why Systems Break Even When Tools Exist?',
        items: [
          'A typical setup includes: CRM for sales, Operations tracking tools, Finance systems, Reporting dashboards.',
          'Common signs of breakdown: Data duplicated across tools, Manual follow-ups required, Reports don\'t match across teams, Work slows during handoffs.',
        ],
      },
      {
        heading: 'Section 2: Mapping Your Current System',
        items: [
          'Step 1: Identify Core Systems (CRM, Operations, Finance, Internal workflows, Reporting).',
          'Step 2: Define Source of Truth. Each data type must have one origin: Customer data → CRM, Financial records → Finance system.',
          'Step 3: Map One Complete Workflow (Lead → Deal, Order → Delivery, Task → Approval).',
          'Collaborative and supportive engineering culture.',
        ],
      },
      {
        heading: 'Section 3: Designing System Flow',
        items: [
          'Principle 1: Every Step Needs a Trigger (Status change, Completed action, Defined event).',
          'Principle 2: Reduce Tool Switching. Keep related actions in one system.',
          'Principle 3: Remove Invisible Work (Approvals, Assignments, Status updates).',
          'Principle 4: Define Ownership.',
        ],
      },
    ],
    conclusion: 'Improvement comes from designing how systems work together, not adding more tools.',
  },
  {
    slug: 'crm-implementation-playbook',
    title: 'CRM Implementation Playbook',
    tags: ['Sales', 'B2B'],
    readTime: '10 min read',
    intro: 'Most sales teams track deals in spreadsheets long after they\'ve outgrown them. A CRM implementation done right means your pipeline reflects reality — not just what reps remember to log.',
    sections: [
      {
        heading: 'Section 1: Choosing the Right CRM',
        items: [
          'Evaluate based on team size, deal complexity, and integration requirements.',
          'Common choices: Salesforce for enterprise, HubSpot for mid-market, Zoho for lean teams.',
          'Don\'t over-engineer: start with core pipeline and contact management.',
        ],
      },
      {
        heading: 'Section 2: Data Migration & Clean-Up',
        items: [
          'Step 1: Audit existing data — remove duplicates and stale contacts.',
          'Step 2: Standardise field formats before import (phone, region, deal stage).',
          'Step 3: Map legacy stages to new pipeline stages.',
          'Step 4: Validate with a sample batch before full migration.',
        ],
      },
      {
        heading: 'Section 3: Adoption & Process Alignment',
        items: [
          'Define what "done" means at each pipeline stage.',
          'Set mandatory fields to enforce data quality from day one.',
          'Run weekly pipeline reviews tied directly to CRM data.',
          'Build dashboards for reps, not just managers.',
        ],
      },
    ],
    conclusion: 'A CRM is only as good as the process it reflects. Design the process first, then configure the tool.',
  },
  {
    slug: 'sales-to-operations-handoff',
    title: 'Sales To Operations Handoff Playbook',
    tags: ['Sales', 'Operations', 'B2B'],
    readTime: '9 min read',
    intro: 'The moment a deal closes, the clock starts ticking. Delays in handoff cost you delivery speed, customer trust, and margin. This playbook closes the gap between "deal won" and "work started".',
    sections: [
      {
        heading: 'Section 1: Where Handoffs Break Down',
        items: [
          'Sales closes without capturing delivery requirements in a standard format.',
          'Operations learns about new clients through informal channels (Slack, email).',
          'Customer expectations set in sales differ from what ops can deliver.',
          'No single owner for the transition period.',
        ],
      },
      {
        heading: 'Section 2: Designing the Handoff Process',
        items: [
          'Step 1: Create a deal close checklist — scope, timeline, key contacts, commercials.',
          'Step 2: Require a 30-minute handoff call between sales and the delivery lead.',
          'Step 3: Use a project kickoff template that ops owns from day one.',
          'Step 4: Send a welcome email from ops to the client within 24 hours of close.',
        ],
      },
      {
        heading: 'Section 3: Tooling & Automation',
        items: [
          'Trigger a project creation in your PM tool when a deal reaches "Closed Won".',
          'Auto-assign an ops lead based on project type or region.',
          'Sync CRM deal data (value, contact, scope) to project fields automatically.',
          'Send internal Slack/Teams notification to ops when deal closes.',
        ],
      },
    ],
    conclusion: 'The best handoffs are invisible to the customer. Build a process so repeatable that every new client feels like your most important one.',
  },
  {
    slug: 'business-process-automation',
    title: 'Business Process Automation Playbook',
    tags: ['Operations', 'B2B'],
    readTime: '11 min read',
    intro: 'Most businesses automate after the pain is unbearable. The smarter approach: identify high-volume, rule-based work early and systematically replace it — before it becomes a bottleneck.',
    sections: [
      {
        heading: 'Section 1: Identifying Automation Candidates',
        items: [
          'Look for tasks done more than 10 times per week by the same person.',
          'Prioritise tasks with clear rules and no human judgement required.',
          'High-value targets: data entry, approval routing, report generation, status notifications.',
          'Map the full workflow before automating — don\'t automate broken processes.',
        ],
      },
      {
        heading: 'Section 2: Selecting the Right Automation Approach',
        items: [
          'Rule-based automation (Zapier, Make): for simple linear workflows between SaaS tools.',
          'RPA (UiPath, Automation Anywhere): for legacy system interaction without APIs.',
          'Custom code: for complex logic, bulk processing, or when cost matters at scale.',
          'AI-assisted: for classification, extraction, or decision support tasks.',
        ],
      },
      {
        heading: 'Section 3: Implementation & Governance',
        items: [
          'Start with one process end-to-end — don\'t automate in isolation.',
          'Build error handling and alerting from day one.',
          'Document every automation with owner, trigger, and fallback behaviour.',
          'Review automated workflows quarterly — business processes change.',
        ],
      },
    ],
    conclusion: 'Automation compounds. Start small, prove value, then expand. The goal is not to eliminate people — it\'s to free them for work that matters.',
  },
  {
    slug: 'real-time-dashboard-reports',
    title: 'Real-Time Dashboard & Reports Playbook',
    tags: ['Automation', 'Operations'],
    readTime: '8 min read',
    intro: 'Most dashboards are built for presentations, not decisions. They reflect what happened last month, not what\'s happening now. This playbook builds dashboards that drive action.',
    sections: [
      {
        heading: 'Section 1: Defining Metrics That Matter',
        items: [
          'Start with decisions, not data: What decisions does this dashboard support?',
          'Limit to 5-7 primary KPIs per dashboard — more creates noise.',
          'Distinguish lagging indicators (revenue) from leading indicators (pipeline velocity).',
          'Every metric should have an owner and an acceptable range.',
        ],
      },
      {
        heading: 'Section 2: Data Architecture for Real-Time Reporting',
        items: [
          'Step 1: Identify source systems and refresh frequency requirements.',
          'Step 2: Build a centralised data layer (warehouse or lakehouse) — avoid direct tool connections.',
          'Step 3: Define transformation logic in one place using dbt or similar.',
          'Step 4: Connect BI tool (Looker, Metabase, Power BI) to the clean data layer.',
        ],
      },
      {
        heading: 'Section 3: Dashboard Design Principles',
        items: [
          'One screen, one story — don\'t mix operational and strategic metrics.',
          'Use colour consistently: green = good, red = attention needed.',
          'Show trend context alongside current value (vs last week, vs target).',
          'Build for the end user — ops dashboards look different from exec dashboards.',
        ],
      },
    ],
    conclusion: 'A great dashboard changes behaviour. If nobody acts on what they see, the dashboard has failed — regardless of how beautiful it looks.',
  },
];

/* ─── Sidebar download card ──────────────────────────────────────── */
function DownloadCard({ onDownload, exporting }: { onDownload: () => void; exporting: boolean }) {
  return (
    <div style={{ background: 'var(--card-bg)', border: `1px solid ${BLUE}20`, borderRadius: 22, overflow: 'hidden', boxShadow: `0 16px 48px ${BLUE}0C` }}>
      <div style={{ background: BLUE_LIGHT, borderBottom: `1px solid ${BLUE}20`, padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src="/images/MoreYeahs White theme Logo.png" alt="MoreYeahs" className="nav-logo-light nav-logo-pill" />
        <img src="/images/MoreYeahs Dark Theme Logo.png"  alt="MoreYeahs" className="nav-logo-dark  nav-logo-pill" />
      </div>
      <div style={{ padding: '28px 24px' }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: BLUE_LIGHT, border: `1px solid ${BLUE}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
          <Download size={20} color={BLUE} strokeWidth={1.5} />
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--fg)', letterSpacing: '-0.02em', marginBottom: 8 }}>Download Playbook</h3>
        <p style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.65, marginBottom: 22 }}>
          Get the complete PDF — including implementation frameworks, diagrams, and action steps.
        </p>
        <button
          onClick={onDownload}
          disabled={exporting}
          style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', gap: 8, background: exporting ? 'rgba(26,86,219,0.5)' : BLUE, color: '#fff', fontSize: 13, fontWeight: 700, borderRadius: 10, padding: '12px 20px', border: 'none', cursor: exporting ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: `0 6px 20px ${BLUE}38`, transition: 'filter 0.2s' }}
          onMouseEnter={e => { if (!exporting) (e.currentTarget as HTMLElement).style.filter = 'brightness(1.1)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = 'none'; }}
        >
          <Download size={14} strokeWidth={2} />
          {exporting ? 'Generating…' : 'Download PDF'}
        </button>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function PlaybookPage() {
  const { slug } = useParams<{ slug: string }>();
  const playbook = PLAYBOOKS.find(p => p.slug === slug);
  const [exporting, setExporting] = useState(false);

  const handlePDF = useCallback(async () => {
    if (!playbook) return;
    setExporting(true);
    await downloadAsPDF({ contentElementId: 'playbook-content', title: playbook.title, filename: playbook.slug });
    setExporting(false);
  }, [playbook]);

  if (!playbook) return null;

  return (
    <>
      <section style={{ background: 'var(--bg)', padding: '100px 0 80px', position: 'relative' }}>
        <NoiseOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>

          {/* Breadcrumb row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--fg-3)', marginBottom: 32 }}>
            <Link href="/resources" style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--fg-3)', textDecoration: 'none', fontWeight: 600 }}>
              <ArrowLeft size={12} strokeWidth={2} /> Resources
            </Link>
            <ChevronRight size={12} strokeWidth={2} />
            <span style={{ color: BLUE, fontWeight: 700 }}>{playbook.title}</span>
          </div>

          <div className="playbook-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 56, alignItems: 'start' }}>

            {/* ── Left: content ── */}
            <motion.div id="playbook-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              {/* Title + tags */}
              <h1 style={{ fontSize: 'clamp(26px,3.5vw,46px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--fg)', lineHeight: 1.12, marginBottom: 16 }}>
                {playbook.title}
              </h1>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 36 }}>
                {playbook.tags.map(t => <TagPill key={t} label={t} />)}
              </div>

              {/* Content */}
              <div style={{ maxWidth: 680 }}>
                {/* Introduction */}
                <div style={{ marginBottom: 40 }}>
                  <h2 style={{ fontSize: 18, fontWeight: 800, color: BLUE, letterSpacing: '-0.02em', marginBottom: 14, borderLeft: `3px solid ${BLUE}`, paddingLeft: 12 }}>
                    Introduction
                  </h2>
                  <p style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.82 }}>{playbook.intro}</p>
                </div>

                {/* Sections */}
                {playbook.sections.map((sec, i) => (
                  <div key={i} style={{ marginBottom: 40 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--fg)', letterSpacing: '-0.02em', marginBottom: 14 }}>
                      <span style={{ color: BLUE }}>Section {i + 1}:</span>{' '}
                      {sec.heading.replace(/^Section \d+:\s*/, '')}
                    </h2>
                    {sec.body && <p style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.82, marginBottom: 14 }}>{sec.body}</p>}
                    {sec.items && (
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {sec.items.map((item, j) => (
                          <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.7 }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: BLUE, flexShrink: 0, marginTop: 8 }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                {/* Key Conclusion */}
                <div style={{ background: `${BLUE}06`, border: `1px solid ${BLUE}18`, borderRadius: 16, padding: '28px 28px', marginTop: 8 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--fg)', letterSpacing: '-0.02em', marginBottom: 14 }}>Key Conclusion</h3>
                  <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.75, fontStyle: 'italic' }}>
                    &ldquo;{playbook.conclusion}&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ── Right: sticky sidebar ── */}
            <div style={{ position: 'sticky', top: 100 }}>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <DownloadCard onDownload={handlePDF} exporting={exporting} />

                {/* Back to all */}
                <Link
                  href="/resources"
                  style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 16, fontSize: 12, fontWeight: 600, color: 'var(--fg-3)', textDecoration: 'none', padding: '12px 16px', borderRadius: 10, background: 'var(--card-bg)', border: '1px solid var(--border)', transition: 'color 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = BLUE; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--fg-3)'; }}
                >
                  ← All Playbooks
                </Link>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        @media(max-width:860px){
          .playbook-layout{ grid-template-columns: 1fr !important; }
          .playbook-layout > div:last-child { position: static !important; }
        }
        @media(max-width:480px){
          .playbook-layout{ gap: 32px !important; }
        }
      `}</style>
    </>
  );
}
