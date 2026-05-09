'use client';

import ServicePageTemplate, { ServicePageData } from '@/components/solutions/ServicePageTemplate';
import { GitBranch, Zap, Shield, RefreshCw, Layers, BarChart3, Lock, Cpu } from 'lucide-react';

const data: ServicePageData = {
  solution: 'Cloud & Infrastructure',
  solutionHref: '/solutions/cloud-infrastructure',
  name: 'DevOps & Automation',
  tagline: 'Ship faster. Break less. Sleep better.',
  heroDesc: "Slow releases, environment drift, and on-call teams drowning in noise are not tools problems — they are culture and process problems that the right tools and practices can solve permanently. We build the CI/CD pipelines, infrastructure automation, and platform engineering practices that let your teams deploy with confidence multiple times a day.",
  stats: [
    { value: '80%', label: 'Deploy frequency increase' },
    { value: '90%', label: 'Mean time to recovery reduction' },
    { value: '10×', label: 'Faster release cycles' },
  ],
  accent: '#10B981',
  accentLight: 'rgba(16,185,129,0.08)',
  problemQuote: 'Slow deployments are not a tools problem. They are a culture and process problem that the right tools can solve.',
  problemPoints: [
    'Releases requiring days of manual coordination just to get to staging',
    'Dev, staging, and production environments that have drifted completely out of sync',
    'No automated testing gate — every deploy is a manual gamble',
    'Rollbacks taking longer to execute than simply pushing a forward fix',
    'Infrastructure changes bypassing review and breaking environments silently',
    'On-call team buried in alerts that have no clear owner or action',
  ],
  capabilities: [
    {
      title: 'CI/CD Pipeline Engineering',
      desc: 'GitHub Actions, GitLab CI, Jenkins, and CircleCI pipelines with multi-stage gates, automated test suites, and deployment approval workflows — built for the way your team actually ships.',
      Icon: GitBranch,
      tag: 'Core',
    },
    {
      title: 'Container & Kubernetes',
      desc: 'Docker containerisation, Kubernetes cluster setup on EKS, GKE, or AKS, Helm chart authoring, and progressive delivery with Argo Rollouts — from cluster-zero to production.',
      Icon: Layers,
    },
    {
      title: 'Infrastructure as Code',
      desc: 'Terraform and Pulumi IaC for all cloud resources — version-controlled, peer-reviewed, and deployed via the same CI/CD pipelines as your application code. No manual click-ops.',
      Icon: RefreshCw,
      tag: 'IaC',
    },
    {
      title: 'GitOps & Deployment Automation',
      desc: 'ArgoCD and Flux-based GitOps workflows for environment parity, automatic drift detection, and declarative deployment state management — what is in Git is what runs in production.',
      Icon: Zap,
    },
    {
      title: 'Observability Stack',
      desc: 'End-to-end observability with Prometheus, Grafana, and OpenTelemetry — turning alert noise into actionable signals your on-call team can actually respond to.',
      Icon: BarChart3,
    },
    {
      title: 'DevSecOps & Security Automation',
      desc: 'SAST, DAST, dependency scanning, secrets detection, and container vulnerability scanning — security checks embedded in every pipeline, not bolted on at the end.',
      Icon: Shield,
    },
    {
      title: 'Platform Engineering',
      desc: 'Internal developer platforms with self-service provisioning, golden paths, and paved roads — giving product teams the autonomy to move fast without creating infrastructure chaos.',
      Icon: Cpu,
    },
    {
      title: 'SRE & Reliability Engineering',
      desc: 'SLO and SLA definition, error budget policies, runbook automation, chaos engineering exercises, and incident response workflows that reduce MTTR when things go wrong.',
      Icon: Lock,
    },
  ],
  process: [
    {
      number: '01',
      title: 'DevOps Maturity Assessment',
      desc: 'We baseline your current DORA metrics, deployment workflows, testing coverage, and infrastructure practices — identifying the highest-leverage improvements to tackle first.',
    },
    {
      number: '02',
      title: 'Pipeline & Toolchain Design',
      desc: 'We design the target CI/CD architecture, branching strategy, environment topology, and toolchain — aligned to your team structure, tech stack, and delivery pace.',
    },
    {
      number: '03',
      title: 'Pipeline Implementation',
      desc: 'We build and test CI/CD pipelines, containerise workloads, set up Kubernetes clusters, and establish automated deployment gates — with your team reviewing and learning throughout.',
    },
    {
      number: '04',
      title: 'Observability & Alerting',
      desc: 'We deploy the full observability stack — metrics, logs, distributed traces — with dashboards and alerts tuned to signal, not noise. Your on-call team will thank you.',
    },
    {
      number: '05',
      title: 'Culture & Enablement',
      desc: 'We train your engineering teams, write runbooks, help establish on-call rotations, and run chaos engineering exercises — building genuine confidence in what you have built together.',
    },
  ],
  caseStudies: [
    {
      industry: 'SaaS',
      company: 'B2B SaaS platform — 200-person engineering org',
      outcome: 'We transformed a team shipping monthly manual releases into one deploying 15+ times per day — with automated testing, progressive rollouts, and SLO-based alerting replacing the old fire-fighting culture.',
      accent: '#10B981',
      metrics: [
        { value: '15×', label: 'Deploy frequency' },
        { value: '93%', label: 'MTTR reduction' },
        { value: '0', label: 'Production incidents in 6 months' },
      ],
    },
    {
      industry: 'E-Commerce',
      company: 'High-growth retailer — peak season reliability',
      outcome: 'We built a Kubernetes-based deployment platform with feature flags and canary deployments — enabling zero-downtime releases during peak shopping events that previously required freezing deployments entirely.',
      accent: '#4D86F5',
      metrics: [
        { value: '99.99%', label: 'Peak season uptime' },
        { value: '8hrs→12min', label: 'Deploy cycle time' },
        { value: '60%', label: 'On-call alert reduction' },
      ],
    },
    {
      industry: 'FinTech',
      company: 'Digital lending company — compliance requirements',
      outcome: 'We implemented a DevSecOps pipeline with automated compliance checks, secrets scanning, and full audit trails — meeting financial regulatory requirements without slowing delivery down.',
      accent: '#F59E0B',
      metrics: [
        { value: '100%', label: 'Pipeline security coverage' },
        { value: '0', label: 'Compliance exceptions' },
        { value: '5×', label: 'Release frequency increase' },
      ],
    },
  ],
  faq: [
    {
      q: 'Which CI/CD tool do you recommend?',
      a: 'GitHub Actions for most teams already on GitHub — it is powerful, well-supported, and free for public repos. GitLab CI for monorepo or self-hosted requirements. We work with your current setup and avoid forcing migrations for their own sake.',
    },
    {
      q: 'Do we need Kubernetes? We are a small team.',
      a: 'Probably not. Kubernetes adds real operational overhead. For smaller teams, ECS, Cloud Run, or Azure App Service often deliver 90% of the benefit with 10% of the complexity. We recommend based on your actual scale, not what sounds impressive.',
    },
    {
      q: 'How do you measure the improvement from a DevOps engagement?',
      a: 'We baseline DORA metrics — deployment frequency, lead time, MTTR, and change failure rate — before we start, then track them on a shared dashboard throughout the engagement. Progress is visible, not claimed.',
    },
    {
      q: 'Can you work with our existing Terraform codebase?',
      a: 'Yes. We audit, refactor, and extend existing IaC rather than rebuilding from scratch — focusing on modularity, state management, and CI/CD integration while respecting the investment you have already made.',
    },
  ],
};

export default function DevOpsAutomationPage() {
  return <ServicePageTemplate data={data} />;
}
