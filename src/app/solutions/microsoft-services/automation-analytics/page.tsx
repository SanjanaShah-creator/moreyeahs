'use client';

import ServicePageTemplate, { ServicePageData } from '@/components/solutions/ServicePageTemplate';
import { Zap, BarChart3, RefreshCw, Database, Brain, Layers, GitBranch, Monitor } from 'lucide-react';

const data: ServicePageData = {
  solution: 'Microsoft Services',
  solutionHref: '/solutions/microsoft-services',
  name: 'Microsoft Automation & Analytics',
  tagline: 'Automate the routine. Illuminate what matters.',
  heroDesc: "Every hour your team spends on manual data entry, copying between systems, and building the same Excel report every Monday morning is an hour not spent on decisions that move the business. We use Power Platform, Power BI, and Azure to eliminate that manual work, connect your siloed tools, and give every decision-maker real-time intelligence they can actually act on.",
  stats: [
    { value: '60%', label: 'Average manual task reduction' },
    { value: '500+', label: 'Automations built' },
    { value: '2 wks', label: 'First automation live' },
  ],
  accent: '#1A56DB',
  accentLight: 'rgba(26,86,219,0.08)',
  problemQuote: 'Every hour your team spends on manual reporting and data entry is an hour not spent on decisions.',
  problemPoints: [
    'Approval workflows living in email chains with no visibility or audit trail',
    'The same report rebuilt manually in Excel every Monday morning',
    'Business data scattered across 20+ SaaS tools with no unified view',
    'Repetitive processes nobody has time to automate — but everyone complains about',
    'Power BI deployed but never adopted beyond the IT team',
    'Citizen developers blocked by licensing confusion and governance gaps',
  ],
  capabilities: [
    {
      title: 'Power Automate — Process Automation',
      desc: 'Cloud flows and desktop flows for approvals, notifications, data sync, and RPA across Microsoft and third-party systems — eliminating the manual steps that slow your team down.',
      Icon: Zap,
      tag: 'Power Platform',
    },
    {
      title: 'Power BI — Analytics & Reporting',
      desc: 'Enterprise Power BI deployment — data model design, DAX measures, interactive report development, row-level security, and embedding — replacing static Excel reports with live intelligence.',
      Icon: BarChart3,
      tag: 'Core',
    },
    {
      title: 'Power Apps — Low-Code Applications',
      desc: 'Canvas and model-driven apps replacing paper forms, legacy web tools, and Excel databases — built in weeks, not months, with your own team able to maintain them.',
      Icon: Monitor,
    },
    {
      title: 'Azure Logic Apps & Functions',
      desc: 'Enterprise-grade integration and serverless automation for multi-system orchestration scenarios that are too complex for Power Automate alone — built to scale.',
      Icon: GitBranch,
    },
    {
      title: 'Dataverse & Data Architecture',
      desc: 'Microsoft Dataverse design, Power BI dataflows, and Azure Synapse integration — building the governed data foundation that makes automation and analytics reliable and trustworthy.',
      Icon: Database,
    },
    {
      title: 'AI Builder & Copilot Studio',
      desc: 'Form processing, object detection, sentiment analysis, and custom AI Builder models embedded directly in Power Platform automations — intelligence without needing a data science team.',
      Icon: Brain,
    },
    {
      title: 'Power Platform Governance',
      desc: 'Center of Excellence toolkit, environment strategy, DLP policies, licensing optimisation, and citizen developer enablement — so growth does not create unmanageable sprawl.',
      Icon: Layers,
    },
    {
      title: 'Legacy Report Migration',
      desc: 'Migration from SSRS, Crystal Reports, and Excel to governed Power BI semantic models with scheduled refresh — replacing the spreadsheet dependency your organisation has outgrown.',
      Icon: RefreshCw,
    },
  ],
  process: [
    {
      number: '01',
      title: 'Process Discovery & Prioritisation',
      desc: 'We map candidate processes for automation and analytics, score each by ROI potential, effort, and complexity, and agree a phased delivery roadmap with your team.',
    },
    {
      number: '02',
      title: 'Architecture & Governance Design',
      desc: 'We design the environment strategy, data model, security model, and governance framework before any build starts — ensuring what we create scales without becoming ungovernable.',
    },
    {
      number: '03',
      title: 'Rapid Build & Iteration',
      desc: 'Sprint-based delivery with working automations and live reports shipped every two weeks. Stakeholder feedback is incorporated continuously — not saved for the end.',
    },
    {
      number: '04',
      title: 'Testing & Deployment',
      desc: 'Functional testing, performance validation, and user acceptance testing before any deployment to production environments — no surprises on go-live day.',
    },
    {
      number: '05',
      title: 'Enablement & Handover',
      desc: 'Training for both end users and citizen developers, full documentation, and ongoing support options — so the capability we build together continues to grow after we hand it over.',
    },
  ],
  caseStudies: [
    {
      industry: 'Financial Services',
      company: 'Wealth management firm — compliance reporting',
      outcome: 'We automated 14 manual compliance reporting workflows using Power Automate — eliminating 120 person-hours of weekly data collection, formatting, and distribution that had occupied the operations team for years.',
      accent: '#1A56DB',
      metrics: [
        { value: '120hrs', label: 'Saved per week' },
        { value: '14', label: 'Workflows automated' },
        { value: '3 wks', label: 'Full delivery timeline' },
      ],
    },
    {
      industry: 'Retail',
      company: 'Multi-brand retailer — executive analytics',
      outcome: 'We built a Power BI enterprise analytics platform pulling data from 8 systems — replacing 23 separate Excel dashboards with one live self-service environment that the whole leadership team uses daily.',
      accent: '#4D86F5',
      metrics: [
        { value: '23', label: 'Excel reports replaced' },
        { value: '8', label: 'Systems connected' },
        { value: '85%', label: 'Report turnaround improvement' },
      ],
    },
    {
      industry: 'Construction',
      company: 'Commercial construction company — field operations',
      outcome: 'We replaced paper-based site inspection and incident reporting with Power Apps — enabling real-time capture, automated approval routing, and live Power BI compliance tracking from the field.',
      accent: '#0EA472',
      metrics: [
        { value: '0', label: 'Paper forms remaining' },
        { value: '95%', label: 'Adoption in 30 days' },
        { value: '70%', label: 'Incident report cycle reduction' },
      ],
    },
  ],
  faq: [
    {
      q: 'Do we need Microsoft 365 licences to use Power Platform?',
      a: 'Some basic Power Automate flows are included in existing M365 licences. Full Power Apps capability and premium connectors require additional Power Platform licensing. We help you understand exactly what you need before any purchase.',
    },
    {
      q: 'How is Power BI different from Dynamics 365 built-in reports?',
      a: 'Dynamics built-in reports are designed for operational day-to-day use. Power BI provides richer visualisation, cross-system data modelling, self-service analytics, and embedded report capabilities. They complement each other — they do not compete.',
    },
    {
      q: 'Can you automate processes that involve non-Microsoft systems?',
      a: 'Yes — Power Automate has 1,000+ connectors including Salesforce, SAP, Jira, Slack, Google Workspace, and custom APIs. Azure Logic Apps handles complex enterprise integration scenarios that go beyond Power Automate\'s capabilities.',
    },
    {
      q: 'What is the Power Platform Center of Excellence and do we need it?',
      a: 'The CoE Toolkit provides governance analytics, usage visibility, and enablement tooling. It becomes genuinely valuable once you have 20+ active Power Platform makers. We help you assess your readiness and deploy it incrementally.',
    },
  ],
};

export default function MicrosoftAutomationAnalyticsPage() {
  return <ServicePageTemplate data={data} />;
}
