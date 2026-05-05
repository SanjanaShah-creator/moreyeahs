'use client';

import ServicePageTemplate, { ServicePageData } from '@/components/solutions/ServicePageTemplate';
import { Layers, Eye, Shield, Zap, BarChart3, RefreshCw, Users, Search } from 'lucide-react';

const data: ServicePageData = {
  solution: 'Web & App Development',
  solutionHref: '/solutions/web-app-development',
  name: 'Design & Quality Engineering',
  tagline: 'Beautiful on screen. Bulletproof in production.',
  heroDesc: "Design and quality are not finishing touches — they are what separates software people trust from software people tolerate. When UX research, interface design, automated testing, and accessibility are treated as afterthoughts, users notice immediately. We embed design and engineering quality into your product from day one: research-grounded UX, consistent design systems, automated test coverage, and accessibility compliance that holds up to scrutiny.",
  stats: [
    { value: '95%', label: 'Automated test coverage target' },
    { value: 'WCAG AA', label: 'Accessibility standard delivered' },
    { value: '4.8/5', label: 'Design satisfaction score' },
  ],
  accent: '#1A56DB',
  accentLight: 'rgba(26,86,219,0.08)',
  problemQuote: 'Treating design and QA as afterthoughts is the fastest way to ship something users cannot trust — and will not come back to.',
  problemPoints: [
    'Bugs caught by real users in production rather than your own QA process',
    'No design system — every screen looks slightly different and the inconsistency shows',
    'Accessibility audits returning 50+ violations and blocking public sector contracts',
    'Regression testing done manually by developers the day before every release',
    'Designers and engineers working from different sources of truth, creating constant rework',
    'Performance regressions going undetected until a user complains or a Lighthouse score tanks',
  ],
  capabilities: [
    {
      title: 'UX Research & Strategy',
      desc: 'User interviews, usability testing, journey mapping, competitive analysis, and rapid design sprints — grounding every product decision in how real users actually think and behave.',
      Icon: Search,
      tag: 'Research',
    },
    {
      title: 'Product & Interface Design',
      desc: 'High-fidelity Figma designs covering responsive layouts, interaction states, motion design, empty states, and component-level specifications ready for a clean engineering handoff.',
      Icon: Layers,
      tag: 'Core',
    },
    {
      title: 'Design Systems',
      desc: 'A complete component library with design tokens, typography scale, colour system, spacing, and documentation — built once in Figma and code, used consistently everywhere.',
      Icon: Eye,
    },
    {
      title: 'Accessibility Engineering (WCAG)',
      desc: 'WCAG 2.1 AA and AAA compliance — semantic HTML structure, ARIA implementation, full keyboard navigation, screen reader testing across NVDA and VoiceOver, and colour contrast auditing.',
      Icon: Users,
    },
    {
      title: 'Automated Testing Suites',
      desc: 'Unit tests with Jest or Vitest, integration tests, and end-to-end tests with Playwright or Cypress — fully automated, running on every commit, with coverage reports your team can act on.',
      Icon: Shield,
      tag: 'QA',
    },
    {
      title: 'Visual Regression Testing',
      desc: 'Automated screenshot comparison with Percy or Chromatic — catching unexpected UI changes across every component and page before they reach users, not after.',
      Icon: BarChart3,
    },
    {
      title: 'Performance Auditing & Budgets',
      desc: 'Lighthouse CI, WebPageTest integration, and custom performance budgets — measuring Core Web Vitals on every build and blocking deploys that regress your performance score.',
      Icon: Zap,
    },
    {
      title: 'QA Strategy & Test Architecture',
      desc: 'Test pyramid design, coverage strategy, flaky test diagnosis, and CI/CD integration — building a QA practice and toolchain that genuinely scales as your team and product grow.',
      Icon: RefreshCw,
    },
  ],
  process: [
    {
      number: '01',
      title: 'Research & Discovery',
      desc: 'User research, a heuristic audit of any existing product, and design brief alignment — understanding who we are designing for, what they struggle with, and what good looks like for them.',
    },
    {
      number: '02',
      title: 'Wireframes & Flow Validation',
      desc: 'Low-fidelity wireframes and user flow validation before any polished UI is created — making sure the structure and logic are right before we invest effort in the aesthetics.',
    },
    {
      number: '03',
      title: 'High-Fidelity Design & Design System',
      desc: 'Production-ready Figma designs with a full component library, interaction specifications, responsive breakpoints, and developer handoff documentation aligned to your engineering stack.',
    },
    {
      number: '04',
      title: 'QA Strategy & Automation Build',
      desc: 'Test strategy definition, automated test suite build, CI/CD integration, and quality gates established — so no feature merges to main without passing the bar we have set together.',
    },
    {
      number: '05',
      title: 'Ongoing Design & Quality Support',
      desc: 'Design system evolution, regression test maintenance, accessibility re-audits, and quality coaching embedded into your in-house engineering team for sustainable long-term quality.',
    },
  ],
  caseStudies: [
    {
      industry: 'FinTech',
      company: 'Investment platform — design system and accessibility',
      outcome: 'We built a complete design system and automated accessibility testing suite — reducing the product from 200+ WCAG violations to zero, and cutting design-to-engineering handoff time by 70%.',
      accent: '#1A56DB',
      metrics: [
        { value: '0', label: 'Accessibility violations remaining' },
        { value: '70%', label: 'Design handoff time reduction' },
        { value: '1 system', label: 'Replacing 3 inconsistent libraries' },
      ],
    },
    {
      industry: 'E-Commerce',
      company: 'High-growth retailer — QA transformation',
      outcome: 'We introduced automated end-to-end testing with Playwright — taking a product from zero automated coverage to 87% in 12 weeks and eliminating a three-day manual regression cycle before every release.',
      accent: '#DB2777',
      metrics: [
        { value: '87%', label: 'Test coverage in 12 weeks' },
        { value: '3 days→0', label: 'Manual regression cycle removed' },
        { value: '65%', label: 'Post-deploy incident reduction' },
      ],
    },
    {
      industry: 'Healthcare',
      company: 'NHS-connected patient portal — UX redesign',
      outcome: 'We ran full UX research and redesigned a patient-facing portal — improving task completion rates by 42%, meeting NHS and WCAG AA accessibility requirements, and reducing support volume by 38%.',
      accent: '#10B981',
      metrics: [
        { value: '42%', label: 'Task completion improvement' },
        { value: 'WCAG AA', label: 'NHS accessibility compliance' },
        { value: '38%', label: 'Support ticket reduction' },
      ],
    },
  ],
  faq: [
    {
      q: 'Do we own the design files at the end of the engagement?',
      a: 'Yes — all Figma files are yours in full. We organise them as a proper design system with shared component libraries so your team can continue iterating independently without needing us in the room.',
    },
    {
      q: 'Can you audit our existing product rather than starting from scratch?',
      a: 'Absolutely. We offer standalone design audits covering heuristic evaluation, UX review, and accessibility scanning — as well as QA audits covering test coverage gaps, automation maturity, and pipeline integration. Both are available as short-form fixed-scope engagements.',
    },
    {
      q: 'Which testing frameworks and tools do you use?',
      a: 'Playwright for end-to-end testing — it is faster, more reliable, and better maintained than older alternatives. Vitest or Jest for unit and integration tests. Chromatic or Percy for visual regression. We align to your existing stack wherever possible rather than forcing a wholesale change.',
    },
    {
      q: 'How do you work alongside an existing in-house design or QA team?',
      a: 'We embed as a specialist resource — handling QA automation, design system build, or accessibility compliance work that your team does not have the bandwidth or specialisation for. We complement your team rather than replace it, and we leave knowledge behind when we hand over.',
    },
  ],
};

export default function DesignQualityPage() {
  return <ServicePageTemplate data={data} />;
}
