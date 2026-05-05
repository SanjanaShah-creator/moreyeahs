'use client';

import ServicePageTemplate, { ServicePageData } from '@/components/solutions/ServicePageTemplate';
import { Zap, Database, GitBranch, Users, BarChart3, Settings, Shield, Layers } from 'lucide-react';

const data: ServicePageData = {
  solution: 'Salesforce Services',
  solutionHref: '/solutions/salesforce-services',
  name: 'Salesforce Implementation',
  tagline: 'Done right once. Built to grow with you.',
  heroDesc: "Most CRM projects fail not because of the technology — but because of poor requirements, generic configuration, and zero focus on adoption. We implement Salesforce end-to-end with the discipline to get it right: real process discovery, a data model built around your business, integrations that actually work, and users who genuinely want to use it.",
  stats: [
    { value: '100+', label: 'Implementations delivered' },
    { value: '97%', label: 'On-time go-live rate' },
    { value: '4.9/5', label: 'Client satisfaction' },
  ],
  accent: '#F59E0B',
  accentLight: 'rgba(245,158,11,0.08)',
  problemQuote: 'Most CRM failures are not technology problems. They are requirements, adoption, and design problems.',
  problemPoints: [
    'Out-of-the-box Salesforce that mirrors no real workflow your team follows',
    'Data migrations leaving duplicates, broken history, and missing records',
    'ERP and marketing integrations scoped but never actually completed',
    'Users abandoning the CRM within 60 days of go-live — reverting to email',
    'Customisations that made sense at launch now blocking every new requirement',
    'No training, no champions program — just a PDF on go-live day',
  ],
  capabilities: [
    {
      title: 'Sales Cloud Implementation',
      desc: 'Lead-to-close process design, territory management, forecasting, CPQ configuration, and sales productivity tooling — built around how your sales team actually sells.',
      Icon: Zap,
      tag: 'Core',
    },
    {
      title: 'Service Cloud Implementation',
      desc: 'Case management, omni-channel routing, knowledge base, SLA management, and field service configuration — designed around your support team\'s real workflow, not a generic template.',
      Icon: Settings,
    },
    {
      title: 'Data Model Design',
      desc: 'Custom object and field architecture, record type strategy, relationship design, and data validation rules — built to reflect your actual business model, not Salesforce\'s default one.',
      Icon: Database,
      tag: 'Architecture',
    },
    {
      title: 'Data Migration',
      desc: 'Full extraction, transformation, deduplication, and load from any legacy system — validated with reconciliation reports before every cutover so nothing gets lost in transit.',
      Icon: GitBranch,
    },
    {
      title: 'Integration Engineering',
      desc: 'API-based integrations with ERP systems (SAP, NetSuite), marketing automation (HubSpot, Marketo), finance tools, and custom applications — via MuleSoft or direct REST APIs.',
      Icon: Layers,
    },
    {
      title: 'Custom Development — Apex & LWC',
      desc: 'Purpose-built Apex classes, triggers, and Lightning Web Components for requirements that declarative tools cannot handle — all fully tested and documented.',
      Icon: Settings,
    },
    {
      title: 'Reports, Dashboards & Analytics',
      desc: 'Metric-driven reporting frameworks, executive dashboards, pipeline analytics, and CRM Analytics (Tableau CRM) implementations that replace manual spreadsheet reporting.',
      Icon: BarChart3,
    },
    {
      title: 'Training & Change Management',
      desc: 'Role-based training, in-app guidance, a champions programme, and adoption monitoring — ensuring your Salesforce investment delivers real ROI, not just a go-live ceremony.',
      Icon: Users,
    },
  ],
  process: [
    {
      number: '01',
      title: 'Discovery & Requirements',
      desc: 'Structured workshops with every stakeholder group — sales, service, operations, IT — to map business processes, identify customisation needs, and define what success actually looks like.',
    },
    {
      number: '02',
      title: 'Solution Design',
      desc: 'Data model, integration architecture, security model, automation design, and phased rollout plan — all reviewed and signed off by your team before any build work begins.',
    },
    {
      number: '03',
      title: 'Build & Configure',
      desc: 'Agile build sprints with working demos every week — declarative configuration first, custom development where necessary, integrations built in parallel with the core build.',
    },
    {
      number: '04',
      title: 'Data Migration & Testing',
      desc: 'UAT cycles with real users on migrated data. Performance testing, security review, and integration validation complete — before the go-live decision is ever made.',
    },
    {
      number: '05',
      title: 'Go-Live & Adoption',
      desc: 'Four weeks of dedicated hypercare post go-live, adoption metrics tracking, rapid issue resolution, and structured handover to either your internal team or our managed services.',
    },
  ],
  caseStudies: [
    {
      industry: 'Technology',
      company: 'Series B SaaS company — first CRM deployment',
      outcome: 'We replaced spreadsheet-based pipeline management with a full Sales Cloud implementation — including custom CPQ configuration and HubSpot integration — that their team adopted immediately.',
      accent: '#F59E0B',
      metrics: [
        { value: '3×', label: 'Pipeline visibility improvement' },
        { value: '8 wks', label: 'Discovery to go-live' },
        { value: '95%', label: 'User adoption at 30 days' },
      ],
    },
    {
      industry: 'Manufacturing',
      company: 'Industrial equipment distributor — ERP migration',
      outcome: 'We implemented Sales Cloud and Service Cloud with full SAP integration — replacing 3 legacy systems and migrating 8 years of customer and order history with zero data loss.',
      accent: '#10B981',
      metrics: [
        { value: '8 sys', label: 'Consolidated to 1' },
        { value: '0', label: 'Records lost in migration' },
        { value: '35%', label: 'Sales cycle reduction' },
      ],
    },
    {
      industry: 'Non-Profit',
      company: 'National charity — donor management',
      outcome: 'We delivered a Nonprofit Success Pack implementation with custom grant management flows, automated donor journeys, and executive fundraising dashboards — on time and on budget.',
      accent: '#4D86F5',
      metrics: [
        { value: '42%', label: 'Donor retention increase' },
        { value: '100%', label: 'On-time go-live' },
        { value: '20hrs/wk', label: 'Admin time saved' },
      ],
    },
  ],
  faq: [
    {
      q: 'How long does a Salesforce implementation take?',
      a: 'A focused Sales Cloud implementation for a 50-person team typically takes 8–12 weeks. Multi-cloud implementations with complex integrations and data migrations range from 4–9 months. We scope transparently after discovery.',
    },
    {
      q: 'Do you offer fixed-price implementations?',
      a: 'Yes — for well-defined scopes. We require a paid discovery phase first that produces a detailed specification. That protects both parties and makes fixed pricing genuinely fair rather than a gamble.',
    },
    {
      q: 'Can you migrate our data from an existing CRM?',
      a: 'Yes. We have handled migrations from Dynamics, HubSpot, Pipedrive, Zoho, and fully bespoke systems — including deduplication, field mapping, and full reconciliation validation before every cutover.',
    },
    {
      q: 'What happens after go-live?',
      a: 'Every implementation includes four weeks of hypercare support. After that, you can transition management to your own team or into our Salesforce Managed Services engagement — whichever fits your needs.',
    },
    {
      q: 'Are you a registered Salesforce partner?',
      a: 'Yes. We are a registered Salesforce consulting partner. All implementation work is delivered by our certified in-house team — no subcontracting, no offshore hand-offs mid-project.',
    },
  ],
};

export default function SalesforceImplementationPage() {
  return <ServicePageTemplate data={data} />;
}
