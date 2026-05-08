'use client';

import ServicePageTemplate, { ServicePageData } from '@/components/solutions/ServicePageTemplate';
import { Monitor, Database, GitBranch, Users, BarChart3, Settings, Layers, RefreshCw } from 'lucide-react';

const data: ServicePageData = {
  solution: 'Microsoft Services',
  solutionHref: '/solutions/microsoft-services',
  name: 'Microsoft CRM & ERP',
  tagline: 'Dynamics done the way your business actually runs.',
  heroDesc: "Out-of-the-box Dynamics 365 is powerful. Misconfigured Dynamics 365 is an expensive spreadsheet that everyone resents. We implement and customise Dynamics 365 CRM and ERP solutions that actually fit your real processes — with the integrations completed, the data migrated properly, and users who adopt it from day one.",
  stats: [
    { value: '80+', label: 'D365 implementations' },
    { value: '30%', label: 'Average efficiency gain' },
    { value: '6 wks', label: 'Avg. SMB go-live time' },
  ],
  accent: '#0078D4',
  accentLight: 'rgba(0,120,212,0.08)',
  problemQuote: 'Out-of-the-box Dynamics is powerful. Misconfigured Dynamics is an expensive spreadsheet.',
  problemPoints: [
    'ERP and CRM data living in completely separate systems with no connection',
    'Customisations built without architecture — fragile and hard to upgrade',
    'Integration gaps between Dynamics and every line-of-business application',
    'Reporting that still requires manual Excel extracts to answer basic questions',
    'Users working around the system because it does not match how they work',
    'Upgrade blockers created by unsupported customisation approaches',
  ],
  capabilities: [
    {
      title: 'Dynamics 365 Sales & Customer Service',
      desc: 'Full CRM implementation — lead and opportunity management, case routing, SLA configuration, and customer journey automation aligned to how your teams actually work.',
      Icon: Monitor,
      tag: 'CRM',
    },
    {
      title: 'Dynamics 365 Finance & Operations',
      desc: 'ERP configuration for financial management, supply chain, inventory, procurement, and manufacturing operations — at enterprise scale with the process depth your organisation needs.',
      Icon: Database,
      tag: 'ERP',
    },
    {
      title: 'Dynamics 365 Business Central',
      desc: 'SMB-focused ERP for financials, inventory, sales, and purchasing with full Microsoft 365 integration — purpose-built for mid-market organisations that have outgrown basic accounting tools.',
      Icon: Layers,
    },
    {
      title: 'Data Model & Process Design',
      desc: 'Entity design, relationship mapping, business process flows, and customisation architecture built for long-term maintainability — not just solving today\'s requirement.',
      Icon: Settings,
    },
    {
      title: 'Integration Engineering',
      desc: 'Dynamics integration with Microsoft 365, Teams, SharePoint, Azure, and third-party systems using Power Automate, Logic Apps, and custom connectors — data flowing where it needs to go.',
      Icon: GitBranch,
    },
    {
      title: 'Data Migration',
      desc: 'Structured migration from any legacy ERP or CRM — full field mapping, transformation, reconciliation, and historical data preservation validated before any cutover.',
      Icon: RefreshCw,
    },
    {
      title: 'Power BI & Analytics',
      desc: 'Native Dynamics dashboards plus embedded Power BI analytics — real-time operational reporting that eliminates the manual Excel extracts your team produces every week.',
      Icon: BarChart3,
    },
    {
      title: 'Training & User Adoption',
      desc: 'Role-based training, in-product guidance, and adoption monitoring to drive CRM and ERP engagement across all user groups — because a system nobody uses delivers no ROI.',
      Icon: Users,
    },
  ],
  process: [
    {
      number: '01',
      title: 'Business Process Discovery',
      desc: 'We map current processes across finance, sales, operations, and service — identifying exactly what requires Dynamics configuration versus custom development, before any build begins.',
    },
    {
      number: '02',
      title: 'Solution Architecture',
      desc: 'We design the Dynamics data model, security model, customisation approach, and integration architecture — reviewed with all stakeholders and signed off before any code is written.',
    },
    {
      number: '03',
      title: 'Agile Build & Configuration',
      desc: 'Sprint-based implementation with bi-weekly demos. Declarative configuration comes first; X++ or plug-in development only where configuration genuinely reaches its limits.',
    },
    {
      number: '04',
      title: 'Data Migration & Integration',
      desc: 'Parallel data migration runs with full reconciliation. Integration testing in staging with rollback capability in place — no cutover happens until validation is complete.',
    },
    {
      number: '05',
      title: 'Go-Live & Hypercare',
      desc: 'A supported go-live with a dedicated hypercare period, rapid issue resolution, and performance tuning in the first 30 days of production to catch anything the UAT missed.',
    },
  ],
  caseStudies: [
    {
      industry: 'Distribution',
      company: 'Industrial distributor — D365 F&O + CRM',
      outcome: 'We replaced a 15-year-old Navision ERP with Dynamics 365 Finance & Operations and Sales — with full warehouse management and e-commerce integration. Zero data issues post-migration.',
      accent: '#0078D4',
      metrics: [
        { value: '40%', label: 'Order processing time reduction' },
        { value: '100%', label: 'Inventory accuracy' },
        { value: '0', label: 'Post-migration data issues' },
      ],
    },
    {
      industry: 'Professional Services',
      company: 'Management consulting firm — 300 staff',
      outcome: 'We implemented Dynamics 365 Customer Service and Project Operations replacing five separate tools — with full Microsoft 365 integration and a 90% adoption rate achieved within 60 days.',
      accent: '#10B981',
      metrics: [
        { value: '5 tools→1', label: 'System consolidation' },
        { value: '28%', label: 'Utilisation rate improvement' },
        { value: '90%', label: 'Adoption at 60 days' },
      ],
    },
  ],
  faq: [
    {
      q: 'Dynamics 365 or Business Central — which is right for us?',
      a: 'Business Central fits most SMBs (under £200M revenue) needing solid core ERP. Dynamics 365 Finance & Operations is designed for larger enterprises with complex global operations, multi-entity accounting, and advanced supply chain needs. We help you choose based on your actual requirements, not what generates the biggest licence deal.',
    },
    {
      q: 'Can you integrate Dynamics with our existing Microsoft 365 environment?',
      a: 'Yes — native Dynamics 365 and Microsoft 365 integration is one of the platform\'s core strengths. We configure Teams, Outlook, SharePoint, and OneDrive integrations as part of every implementation.',
    },
    {
      q: 'How do you build customisations that survive Dynamics upgrades?',
      a: 'We follow Microsoft\'s solution layering approach, never modify the base application directly, and maintain an automated upgrade test suite to catch breaking changes before they reach production.',
    },
    {
      q: 'Do you offer fixed-scope implementations?',
      a: 'Yes. After a scoping discovery phase, we provide fixed-price delivery for well-defined scope. Any change requests outside scope are priced transparently before proceeding — no hidden extras.',
    },
  ],
};

export default function MicrosoftCRMERPPage() {
  return <ServicePageTemplate data={data} />;
}
