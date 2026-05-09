'use client';

import ServicePageTemplate, { ServicePageData } from '@/components/solutions/ServicePageTemplate';
import { Headphones, Shield, RefreshCw, BarChart3, Zap, Users, Settings, AlertTriangle } from 'lucide-react';

const data: ServicePageData = {
  solution: 'Salesforce Services',
  solutionHref: '/solutions/salesforce-services',
  name: 'Salesforce Managed Services',
  tagline: 'Your Salesforce org, expertly managed. Always on.',
  heroDesc: "A Salesforce org without dedicated expertise slowly accumulates debt, frustrates users, and turns from your most valuable sales tool into your most expensive liability. We become the expert Salesforce team your business deserves — proactive administration, continuous enhancements, rapid user support, and org health management so your team focuses on selling.",
  stats: [
    { value: '4hr', label: 'Average response SLA' },
    { value: '99%', label: 'Client retention rate' },
    { value: '20+', label: 'Global Clients' },
  ],
  accent: '#F59E0B',
  accentLight: 'rgba(245,158,11,0.08)',
  problemQuote: 'A Salesforce org without dedicated expertise slowly becomes a liability, not an asset.',
  problemPoints: [
    'Admin bottlenecks delaying every business change request by weeks',
    'Users bypassing CRM entirely because adoption never happened properly',
    'Technical debt accumulating in Flows, Process Builder, and Apex triggers',
    'No visibility into org health, governor limits, or performance trends',
    'Security review failures appearing at audit time — not caught beforehand',
    'Institutional knowledge disappearing every time an admin leaves',
  ],
  capabilities: [
    {
      title: 'Dedicated Salesforce Administration',
      desc: 'Named admin resources handling users, profiles, permissions, layouts, fields, workflows, and all day-to-day change requests — on defined SLAs with predictable capacity.',
      Icon: Settings,
      tag: 'Core',
    },
    {
      title: 'Proactive Org Health Monitoring',
      desc: 'Automated governor limit tracking, API usage analysis, data quality audits, and quarterly org health reports with prioritised recommendations — before issues become incidents.',
      Icon: BarChart3,
    },
    {
      title: 'Release Management',
      desc: 'Structured Salesforce change management with sandbox testing, deployment via SFDX or change sets, and documented rollback procedures for every release.',
      Icon: RefreshCw,
    },
    {
      title: 'User Support & Training',
      desc: 'Helpdesk for end-user issues, onboarding training for new hires, and adoption programmes that drive genuine CRM engagement — not just licence usage.',
      Icon: Users,
    },
    {
      title: 'Security & Compliance Reviews',
      desc: 'Regular security health checks, field-level security audits, sharing rule reviews, and compliance documentation for SOC 2, GDPR, and sector-specific requirements.',
      Icon: Shield,
    },
    {
      title: 'Automation Maintenance & Optimisation',
      desc: 'Ongoing maintenance of Flows, Process Builder migration to Flow, Apex triggers, and validation rules — keeping automation clean, fast, and free of technical debt.',
      Icon: Zap,
    },
    {
      title: 'Incident Management',
      desc: 'Priority incident handling for org outages, data integrity issues, and integration failures — with documented root cause analysis and prevention plans to stop recurrence.',
      Icon: AlertTriangle,
    },
    {
      title: '24/7 Monitoring & Alerting',
      desc: 'Round-the-clock monitoring of critical integrations, scheduled Apex jobs, and data sync pipelines — with immediate alerting so problems are caught before users are affected.',
      Icon: Headphones,
    },
  ],
  process: [
    {
      number: '01',
      title: 'Org Assessment & Onboarding',
      desc: 'We audit your full Salesforce environment — metadata, integrations, automations, user setup, and accumulated tech debt. We establish baseline metrics and agree SLA terms.',
    },
    {
      number: '02',
      title: 'Stabilisation Sprint',
      desc: 'We address critical issues, reduce technical debt, and establish monitoring. The goal is to put the org in a stable, auditable state before ongoing management formally begins.',
    },
    {
      number: '03',
      title: 'Ongoing Management',
      desc: 'All change requests, enhancements, user support, and proactive maintenance handled on defined SLAs by dedicated named resources — predictable, transparent, and responsive.',
    },
    {
      number: '04',
      title: 'Quarterly Strategic Reviews',
      desc: 'Regular reviews covering org health metrics, backlog prioritisation, roadmap alignment, and forward-looking recommendations — keeping your Salesforce investment on track.',
    },
  ],
  caseStudies: [
    {
      industry: 'Professional Services',
      company: '500-person consulting firm — Sales & Service Cloud',
      outcome: 'We took over Salesforce management after their internal admin departed — stabilised the org, cleared a 6-month backlog in 3 weeks, and implemented automated health monitoring they had never had.',
      accent: '#F59E0B',
      metrics: [
        { value: '3 wks', label: '6-month backlog cleared' },
        { value: '94%', label: 'User satisfaction score' },
        { value: '40%', label: 'Support ticket reduction' },
      ],
    },
    {
      industry: 'Insurance',
      company: 'Insurance brokerage — multi-cloud Salesforce org',
      outcome: 'We provide ongoing managed services across Sales, Service, and Financial Services Cloud — including quarterly security and compliance reviews that have delivered a clean record over two years.',
      accent: '#4D86F5',
      metrics: [
        { value: '0', label: 'Compliance issues in 2 years' },
        { value: '4hr', label: 'Avg. incident response time' },
        { value: '99%', label: 'Annual renewal rate' },
      ],
    },
  ],
  faq: [
    {
      q: 'Do you replace our existing admin or work alongside them?',
      a: 'Either works. We offer fully managed services as your primary admin team, or an augmentation model where we work alongside your internal admin to provide specialist expertise and additional bandwidth.',
    },
    {
      q: 'What are your response time SLAs?',
      a: 'Critical incidents: 2 hours. High priority requests: 4 hours. Standard change requests: next business day. SLAs are customised based on your business requirements and are contractually committed.',
    },
    {
      q: 'How do you handle knowledge transfer if we bring management in-house?',
      a: 'All work is documented in your preferred tools throughout the engagement. We maintain detailed runbooks, change logs, and org documentation — so any transition is smooth whenever you choose to make it.',
    },
    {
      q: 'What Salesforce certifications does your team hold?',
      a: 'Our managed services team holds Administrator, Advanced Administrator, Platform App Builder, and Architect-level certifications. Specific credentials are shared and verified at the start of every engagement.',
    },
  ],
};

export default function ManagedServicesPage() {
  return <ServicePageTemplate data={data} />;
}
