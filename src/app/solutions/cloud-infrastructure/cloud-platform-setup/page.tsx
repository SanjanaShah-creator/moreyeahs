'use client';

import ServicePageTemplate, { ServicePageData } from '@/components/solutions/ServicePageTemplate';
import { Cloud, Shield, Layers, GitBranch, Database, Zap, Lock, BarChart3 } from 'lucide-react';

const data: ServicePageData = {
  solution: 'Cloud & Infrastructure',
  solutionHref: '/solutions/cloud-infrastructure',
  name: 'Cloud Platform Setup',
  tagline: 'Built right from day one. Scalable by design.',
  heroDesc: "Cloud platforms are powerful by default. Secure, cost-efficient, and well-governed — that takes deliberate architecture. We design and provision enterprise-grade cloud environments on AWS, GCP, and Azure with security controls, networking, and cost governance built into the foundation — not bolted on after your first audit finding.",
  stats: [
    { value: '99.99%', label: 'Uptime SLA delivered' },
    { value: '40%', label: 'Average cost reduction' },
    { value: 'Multi-cloud', label: 'AWS · GCP · Azure' },
  ],
  accent: '#4D86F5',
  accentLight: 'rgba(77,134,245,0.08)',
  problemQuote: 'Cloud infrastructure is powerful by default. Secure, cost-controlled, and compliant — that takes expertise.',
  problemPoints: [
    'Cloud bills growing 3× faster than the business value they deliver',
    'Security misconfigurations discovered only after an incident — not before',
    'No consistent networking or identity patterns across accounts and teams',
    'Engineers provisioning resources without guardrails or cost visibility',
    'Compliance audits failing because controls were never implemented',
    'Lift-and-shift migrations that deliver zero cloud benefit over on-premises',
  ],
  capabilities: [
    {
      title: 'Landing Zone Design',
      desc: 'Multi-account and multi-project landing zones with hub-and-spoke networking, IAM policies, and centralised logging — aligned to AWS Control Tower, GCP Landing Zone, or Azure Landing Zones.',
      Icon: Layers,
      tag: 'Foundation',
    },
    {
      title: 'Security & Compliance Baseline',
      desc: 'Guardrails, SCPs, WAF, secrets management, and compliance controls mapped to SOC 2, ISO 27001, HIPAA, or PCI-DSS — implemented before workloads ever land in the environment.',
      Icon: Shield,
      tag: 'Security',
    },
    {
      title: 'Cloud Migration',
      desc: 'Lift-and-shift, re-platform, and re-architect migrations — with dependency mapping, cutover planning, and rollback strategies for zero-surprise transitions to the cloud.',
      Icon: Cloud,
    },
    {
      title: 'Networking Architecture',
      desc: 'VPC and VNet design, Transit Gateway, Direct Connect, ExpressRoute, private endpoints, and zero-trust network segmentation for enterprise-grade workload isolation.',
      Icon: GitBranch,
    },
    {
      title: 'Infrastructure as Code',
      desc: 'All infrastructure defined in Terraform or Pulumi — version-controlled, peer-reviewed, and deployed via CI/CD. No manual click-ops, ever. No configuration drift.',
      Icon: Database,
    },
    {
      title: 'Cost Optimisation',
      desc: 'Reserved instance planning, Savings Plans, auto-scaling policies, rightsizing recommendations, and FinOps dashboards that keep cloud spend aligned with business value.',
      Icon: BarChart3,
    },
    {
      title: 'Disaster Recovery',
      desc: 'RPO/RTO-aligned DR architectures with cross-region replication, automated failover testing, and documented runbooks for every critical production workload.',
      Icon: Zap,
    },
    {
      title: 'Identity & Access Management',
      desc: 'Centralised IAM with least-privilege roles, federated SSO, MFA enforcement, and privileged access management — across every cloud environment and every team.',
      Icon: Lock,
    },
  ],
  process: [
    {
      number: '01',
      title: 'Cloud Readiness Assessment',
      desc: 'We evaluate your existing workloads, security posture, cost profile, and compliance requirements — then define the target architecture and migration wave plan together.',
    },
    {
      number: '02',
      title: 'Architecture & Design',
      desc: 'We design the landing zone, networking topology, security controls, and naming conventions — reviewed with your security and platform teams before a single resource is provisioned.',
    },
    {
      number: '03',
      title: 'Foundation Build',
      desc: 'We provision core infrastructure with Terraform — accounts, VPCs, IAM, logging, monitoring, and security baselines — tested via automated compliance scans before any workload touches it.',
    },
    {
      number: '04',
      title: 'Workload Migration',
      desc: 'We migrate workloads in prioritised waves with parallel testing, DNS cutover, and rollback procedures documented. Performance is validated before each wave closes.',
    },
    {
      number: '05',
      title: 'Governance & Handover',
      desc: 'We deploy FinOps dashboards, security monitoring, and on-call runbooks — then transfer full knowledge to your team so they can operate and evolve the platform independently.',
    },
  ],
  caseStudies: [
    {
      industry: 'FinTech',
      company: 'Payment processing platform — Series C',
      outcome: 'We designed and built a PCI-DSS compliant AWS landing zone replacing a co-located data centre — enabling 10× throughput growth without proportional infrastructure cost increases.',
      accent: '#4D86F5',
      metrics: [
        { value: '10×', label: 'Throughput capacity' },
        { value: '52%', label: 'Infrastructure cost reduction' },
        { value: 'PCI-DSS', label: 'Fully compliant' },
      ],
    },
    {
      industry: 'Healthcare',
      company: 'Health tech SaaS — HIPAA environment',
      outcome: 'We rebuilt their Azure environment with a HIPAA-compliant landing zone, centralised security monitoring, and automated compliance reporting — achieving zero audit findings on first review.',
      accent: '#0EA472',
      metrics: [
        { value: '0', label: 'Audit findings' },
        { value: '99.99%', label: 'Uptime SLA' },
        { value: '6 wks', label: 'Full build time' },
      ],
    },
    {
      industry: 'E-Commerce',
      company: 'Global retail brand — multi-region setup',
      outcome: 'We built a multi-cloud GCP + AWS environment with global load balancing and auto-scaling policies that handled 40× traffic spikes during peak sales events with zero outages.',
      accent: '#F59E0B',
      metrics: [
        { value: '40×', label: 'Peak traffic handled' },
        { value: '0', label: 'Outages during peak' },
        { value: '38%', label: 'Cloud cost reduction' },
      ],
    },
  ],
  faq: [
    {
      q: 'Which cloud provider do you recommend?',
      a: 'We give vendor-neutral recommendations based on your existing ecosystem, workload requirements, team expertise, and commercial arrangements — and support multi-cloud setups when the use case genuinely justifies it.',
    },
    {
      q: 'Do you use Terraform or another IaC tool?',
      a: 'Terraform is our default across all cloud providers. We also support Pulumi, AWS CDK, and Azure Bicep depending on your team\'s preference. All infrastructure is version-controlled and deployed via CI/CD.',
    },
    {
      q: 'How do you handle compliance requirements like SOC 2 or HIPAA?',
      a: 'We map security controls directly to your compliance framework and automate compliance checks using native tools — AWS Config, Azure Policy, GCP Security Command Center — so audits become a report, not a scramble.',
    },
    {
      q: 'Can you reduce our cloud costs without a full rebuild?',
      a: 'Yes. We offer standalone cloud cost optimisation engagements — rightsizing analysis, reserved capacity planning, and governance improvements — that deliver savings without requiring architectural changes.',
    },
  ],
};

export default function CloudPlatformSetupPage() {
  return <ServicePageTemplate data={data} />;
}
