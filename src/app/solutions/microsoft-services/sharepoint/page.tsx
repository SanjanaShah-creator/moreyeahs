'use client';

import ServicePageTemplate, { ServicePageData } from '@/components/solutions/ServicePageTemplate';
import { Layers, Users, Search, Shield, RefreshCw, Zap, Database, Monitor } from 'lucide-react';

const data: ServicePageData = {
  solution: 'Microsoft Services',
  solutionHref: '/solutions/microsoft-services',
  name: 'SharePoint',
  tagline: 'Your intranet. Your knowledge base. Built to be used.',
  heroDesc: "SharePoint deployments fail when they are built for IT, not for the people who have to open them every day. We design and build SharePoint environments that employees genuinely use — modern intranet portals, structured document management, automated approval workflows, and knowledge bases that are actually searchable. People first, technology second.",
  stats: [
    { value: '85%', label: 'Adoption rate achieved' },
    { value: '50+', label: 'Intranets delivered' },
    { value: '3 wks', label: 'Average site launch time' },
  ],
  accent: '#038387',
  accentLight: 'rgba(3,131,135,0.08)',
  problemQuote: 'SharePoint fails when it is built for IT — not for the people who need to use it every single day.',
  problemPoints: [
    'Files scattered across Teams, email attachments, and personal OneDrive folders',
    'No single source of truth for policies, procedures, and company knowledge',
    'Approval processes still running as email chains with no audit trail',
    'An old intranet that nobody visits because finding anything is impossible',
    'Search returning completely irrelevant results across the organisation',
    'Permissions chaos — the wrong people have access to everything sensitive',
  ],
  capabilities: [
    {
      title: 'Modern Intranet Design & Build',
      desc: 'User-research-driven intranet portals with branded SharePoint sites, intuitive navigation, news hubs, and an employee directory — designed for adoption, not just deployment.',
      Icon: Monitor,
      tag: 'Intranet',
    },
    {
      title: 'Document Management Systems',
      desc: 'Structured document libraries, metadata taxonomy, retention policies, version control, and check-out workflows for regulated document environments that need compliance built in.',
      Icon: Database,
      tag: 'Core',
    },
    {
      title: 'Approval & Business Process Flows',
      desc: 'Power Automate-driven approval workflows, request forms, and automated notifications — replacing email chains with structured, auditable, trackable processes.',
      Icon: Zap,
    },
    {
      title: 'SharePoint Search Configuration',
      desc: 'Search schema optimisation, result sources, query rules, and Microsoft Search integration — making your organisation\'s knowledge actually findable when people need it.',
      Icon: Search,
    },
    {
      title: 'Permissions & Governance',
      desc: 'Site provisioning policies, permission inheritance design, external sharing controls, and sensitivity label integration — compliant collaboration without the permissions chaos.',
      Icon: Shield,
    },
    {
      title: 'Migration from Legacy Systems',
      desc: 'Content migration from file servers, legacy SharePoint versions, Confluence, and other knowledge bases — with metadata preservation, permissions mapping, and URL redirect handling.',
      Icon: RefreshCw,
    },
    {
      title: 'Teams + SharePoint Integration',
      desc: 'Aligned SharePoint site architecture and Teams channel structure — so files, tabs, and collaboration flow cohesively across the full Microsoft 365 layer your organisation uses.',
      Icon: Users,
    },
    {
      title: 'Custom SPFx Web Parts',
      desc: 'SharePoint Framework components extending standard capabilities — custom dashboards, People Finders, news aggregators, and integrated data visualisations your users actually want.',
      Icon: Layers,
    },
  ],
  process: [
    {
      number: '01',
      title: 'Discovery & User Research',
      desc: 'We interview stakeholder groups and end users — understanding content types, workflows, and the pain points that make people avoid the current system before designing anything new.',
    },
    {
      number: '02',
      title: 'Information Architecture Design',
      desc: 'We design the site hierarchy, navigation structure, metadata taxonomy, and permissions model — validated with real user testing before a single page is built.',
    },
    {
      number: '03',
      title: 'Build & Configure',
      desc: 'We implement sites, libraries, content types, workflows, and custom web parts in sprint cycles with regular stakeholder reviews — no big-bang delivery at the end.',
    },
    {
      number: '04',
      title: 'Content Migration',
      desc: 'We migrate existing content with metadata mapping, permissions preservation, and version history intact — validated for completeness before any legacy system is decommissioned.',
    },
    {
      number: '05',
      title: 'Launch & Adoption',
      desc: 'Communications plan, training sessions, an internal champion network, and 30-day adoption metrics tracking — because launch is where the adoption journey starts, not ends.',
    },
  ],
  caseStudies: [
    {
      industry: 'Professional Services',
      company: 'Law firm — document management overhaul',
      outcome: 'We replaced a decade-old file server with a structured SharePoint DMS — automated matter-based site provisioning, retention policies, and full-text search that actually returns relevant results.',
      accent: '#038387',
      metrics: [
        { value: '10TB', label: 'Content migrated' },
        { value: '92%', label: 'Search success rate' },
        { value: '30min→2min', label: 'Document retrieval time' },
      ],
    },
    {
      industry: 'Manufacturing',
      company: 'Global manufacturer — intranet for 8,000 staff',
      outcome: 'We built a multi-language intranet for 8,000 employees across 12 countries — unified news, policy library, and team collaboration hubs replacing 6 disconnected systems nobody was using.',
      accent: '#4D86F5',
      metrics: [
        { value: '8,000', label: 'Employees on new intranet' },
        { value: '12', label: 'Countries and languages' },
        { value: '78%', label: 'Weekly active usage' },
      ],
    },
  ],
  faq: [
    {
      q: 'SharePoint Online or SharePoint Server — which should we use?',
      a: 'SharePoint Online (part of Microsoft 365) is the right choice for almost every organisation today. SharePoint Server is only relevant for very specific compliance scenarios that require on-premises data residency and cannot be met any other way.',
    },
    {
      q: 'Can SharePoint fully replace our file server?',
      a: 'Yes — for most organisations. SharePoint and OneDrive for Business provide better search, version control, remote access, and collaboration than any traditional file server. We handle the migration planning and execution.',
    },
    {
      q: 'How do you ensure people actually use it after launch?',
      a: 'Adoption starts in the design phase, not on launch day. We involve real users from the start, design for their actual behaviour, and post-launch we deploy champion networks, embedded guidance, and track adoption metrics for 30 days with a remediation plan ready.',
    },
    {
      q: 'Can you migrate from Confluence to SharePoint?',
      a: 'Yes — we have a structured Confluence-to-SharePoint migration playbook that maps pages, spaces, attachments, and permissions to SharePoint equivalents with minimal content loss and proper redirect handling.',
    },
  ],
};

export default function SharePointPage() {
  return <ServicePageTemplate data={data} />;
}
