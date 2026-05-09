'use client';

import ServicePageTemplate, { ServicePageData } from '@/components/solutions/ServicePageTemplate';
import { Code2, Zap, Shield, Layers, BarChart3, RefreshCw, Database, Monitor } from 'lucide-react';

const data: ServicePageData = {
  solution: 'Web & App Development',
  solutionHref: '/solutions/web-app-development',
  name: 'Web Application Development',
  tagline: 'Engineered to perform. Built to scale. Designed to last.',
  heroDesc: "Most web applications fail not at launch — but six months later when the architecture cannot handle what the business actually needs. We design and engineer web applications that hold up under real production loads: modern frontend stacks, robust APIs, cloud-native architecture, and codebases your team can understand, maintain, and grow.",
  stats: [
    { value: '<2s', label: 'Target page load time' },
    { value: '99.9%', label: 'Uptime delivered' },
    { value: '300+', label: 'Applications shipped' },
  ],
  accent: '#DB2777',
  accentLight: 'rgba(219,39,119,0.08)',
  problemQuote: 'Most web apps fail not at launch — but six months later when the architecture cannot handle what the business needs.',
  problemPoints: [
    'A legacy codebase slowing every new feature to a week-long slog',
    'No test coverage — every deployment is a gamble you hope works',
    'Performance degrading noticeably as user numbers grow',
    'Frontend and backend so tightly coupled that changing one breaks the other',
    'Security vulnerabilities accumulating in dependencies nobody has reviewed',
    'No documentation — only the person who wrote it knows how it works',
  ],
  capabilities: [
    {
      title: 'Full-Stack Web Development',
      desc: 'React, Next.js, Vue, and Angular frontends with Node.js, Python, Go, and .NET backends — production-hardened, well-tested, and built for the long term, not just the demo.',
      Icon: Code2,
      tag: 'Core',
    },
    {
      title: 'SaaS Product Engineering',
      desc: 'Multi-tenant SaaS architecture, subscription billing, feature flagging, onboarding flows, and usage analytics — engineered to scale from your first 10 customers to your first 10,000.',
      Icon: Layers,
      tag: 'SaaS',
    },
    {
      title: 'API Design & Development',
      desc: 'RESTful and GraphQL APIs with proper versioning, documentation, rate limiting, and authentication — designed to serve both your own frontend and external integrators reliably.',
      Icon: Database,
    },
    {
      title: 'Performance Engineering',
      desc: 'Core Web Vitals optimisation, intelligent caching, CDN configuration, database query tuning, and load testing — so your application performs under the traffic that matters most.',
      Icon: Zap,
    },
    {
      title: 'Progressive Web Apps',
      desc: 'Offline-capable, installable PWAs with service workers and background sync — delivering native-like experiences through the browser without app store dependency.',
      Icon: Monitor,
    },
    {
      title: 'E-Commerce Development',
      desc: 'Custom e-commerce platforms and Shopify or Commercetools extensions — optimised checkout flows, headless architecture, and inventory system integration for serious retail operations.',
      Icon: BarChart3,
    },
    {
      title: 'Application Security',
      desc: 'OWASP Top 10 hardening, dependency audits, security headers, CSP implementation, penetration test readiness, and GDPR-compliant data handling baked into every engagement.',
      Icon: Shield,
    },
    {
      title: 'Legacy Modernisation',
      desc: 'Strangler-fig migrations from monoliths to microservices, PHP and jQuery rewrites to modern stacks, and database migrations — risk-managed, incremental, and never a big-bang rewrite.',
      Icon: RefreshCw,
    },
  ],
  process: [
    {
      number: '01',
      title: 'Discovery & Technical Scoping',
      desc: 'We define user stories, system architecture, data models, third-party integrations, and non-functional requirements — with transparent effort estimates before any commitment is made.',
    },
    {
      number: '02',
      title: 'Architecture & Design',
      desc: 'We produce the system design, API contracts, database schema, and component architecture — reviewed and agreed with your team before a single line of production code is written.',
    },
    {
      number: '03',
      title: 'Agile Development Sprints',
      desc: 'Two-week sprints delivering working software each cycle — with automated testing, code review on every PR, and continuous deployment to a staging environment you can see and test.',
    },
    {
      number: '04',
      title: 'QA & Performance Testing',
      desc: 'End-to-end test coverage, load testing against production-scale traffic, a security vulnerability scan, and an accessibility audit — completed before any production launch decision.',
    },
    {
      number: '05',
      title: 'Launch & Handover',
      desc: 'Production deployment, monitoring setup, full documentation, and your choice of an ongoing support retainer or a clean handover to your in-house engineering team.',
    },
  ],
  caseStudies: [
    {
      industry: 'FinTech',
      company: 'Digital lending platform — greenfield build',
      outcome: 'We built a full-stack digital lending platform from scratch in 5 months — loan origination, a custom decisioning engine, a borrower portal, and an admin dashboard — with zero critical security findings on audit.',
      accent: '#DB2777',
      metrics: [
        { value: '5 mo', label: 'MVP to production' },
        { value: '<1.8s', label: 'Page load at P95' },
        { value: '0', label: 'Critical security findings' },
      ],
    },
    {
      industry: 'Media',
      company: 'News publisher — platform modernisation',
      outcome: 'We migrated a 12-year-old Drupal monolith to a headless Next.js and Contentful architecture — improving page speed 4× and cutting the publishing cycle from hours to minutes.',
      accent: '#4D86F5',
      metrics: [
        { value: '4×', label: 'Page speed improvement' },
        { value: '35%', label: 'Bounce rate reduction' },
        { value: '6 mo', label: 'Full migration timeline' },
      ],
    },
    {
      industry: 'Healthcare',
      company: 'Health management SaaS — multi-tenant rebuild',
      outcome: 'We rebuilt a single-tenant PHP application as a fully multi-tenant SaaS — enabling the company to go from 5 managed enterprise clients to 200+ self-serve customers on one platform.',
      accent: '#10B981',
      metrics: [
        { value: '200+', label: 'Tenants on one platform' },
        { value: '99.97%', label: 'Uptime post-launch' },
        { value: '8×', label: 'Revenue per engineering hour' },
      ],
    },
  ],
  faq: [
    {
      q: 'Which technology stack do you use?',
      a: 'We use the right tool for the job — typically Next.js or React for frontend, Node.js or Python for backend APIs, and PostgreSQL or MongoDB for persistence. We also work within your existing stack if it is already established.',
    },
    {
      q: 'Do you offer fixed-price engagements?',
      a: 'Yes — for well-scoped projects. We require a paid discovery and scoping phase first that produces a detailed specification. That makes fixed pricing genuinely fair to both sides rather than a guessing game.',
    },
    {
      q: 'Can you take over an existing codebase?',
      a: 'Yes. We do a code audit first, then propose a modernisation roadmap. We can take over maintenance, add new features, or refactor incrementally — without recommending a full rewrite unless one is genuinely necessary.',
    },
    {
      q: 'Who owns the intellectual property?',
      a: 'All code written during your engagement is assigned to you at project completion. We use clean-room development and never re-use client code across other projects.',
    },
  ],
};

export default function WebApplicationPage() {
  return <ServicePageTemplate data={data} />;
}
