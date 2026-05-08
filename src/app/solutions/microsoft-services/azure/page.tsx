'use client';

import ServicePageTemplate, { ServicePageData } from '@/components/solutions/ServicePageTemplate';
import { Cloud, Shield, Database, Zap, Layers, RefreshCw, BarChart3, Lock } from 'lucide-react';

const data: ServicePageData = {
  solution: 'Microsoft Services',
  solutionHref: '/solutions/microsoft-services',
  name: 'Azure',
  tagline: 'Enterprise-grade Azure. Built to last, not just to launch.',
  heroDesc: "Azure is vast, and without proper architecture guardrails it becomes an expensive, ungoverned sprawl that frustrates every team trying to use it. We design, deploy, and manage production-ready Azure environments — from enterprise landing zones and hybrid connectivity to AKS workloads and AI services — with governance and cost control built in from the start.",
  stats: [
    { value: '99.99%', label: 'Uptime SLA delivered' },
    { value: '45%', label: 'Average cost optimisation' },
    { value: '150+', label: 'Azure environments managed' },
  ],
  accent: '#0078D4',
  accentLight: 'rgba(0,120,212,0.08)',
  problemQuote: 'Azure is vast. Without architecture guardrails, it becomes expensive, ungoverned sprawl.',
  problemPoints: [
    'Subscription sprawl with no cost visibility across teams or projects',
    'Security misconfigurations sitting undetected until an incident surfaces them',
    'Hybrid connectivity to on-premises that is unreliable or simply not working',
    'No policy enforcement — every team provisions resources completely differently',
    'Azure DevOps and GitHub Actions not connected to deployment pipelines',
    'AI and ML services provisioned without any MLOps lifecycle around them',
  ],
  capabilities: [
    {
      title: 'Azure Landing Zone',
      desc: 'Enterprise-scale landing zones with management groups, RBAC, policy-as-code, hub-and-spoke networking, and centralised logging — aligned to the Azure Cloud Adoption Framework.',
      Icon: Layers,
      tag: 'Foundation',
    },
    {
      title: 'Azure Kubernetes Service (AKS)',
      desc: 'Production AKS clusters with node pool design, Ingress controllers, service mesh, KEDA autoscaling, GitOps via Flux, and a full observability stack — from cluster-zero to production.',
      Icon: Cloud,
      tag: 'Containers',
    },
    {
      title: 'Azure Security & Compliance',
      desc: 'Defender for Cloud, Microsoft Sentinel SIEM, Key Vault governance, Entra ID hardening, and compliance control mapping to ISO 27001, SOC 2, and GDPR.',
      Icon: Shield,
    },
    {
      title: 'Azure Data Services',
      desc: 'Synapse Analytics, Azure Data Factory, Azure Databricks, and Azure SQL — designed and integrated as a coherent analytics platform with proper security, lineage, and access controls.',
      Icon: Database,
    },
    {
      title: 'Hybrid & Multi-Cloud Connectivity',
      desc: 'ExpressRoute, VPN Gateway, Azure Arc for hybrid server management, and Azure Stack HCI for edge scenarios — seamless, reliable connectivity between cloud and on-premises.',
      Icon: Zap,
    },
    {
      title: 'Azure AI & OpenAI Services',
      desc: 'Azure OpenAI Service, Cognitive Services, Azure Machine Learning, and AI Search — integrated into your applications with proper access controls, quota management, and cost monitoring.',
      Icon: BarChart3,
    },
    {
      title: 'FinOps & Cost Management',
      desc: 'Azure Cost Management dashboards, budget alerts, tagging policies, Reserved Instance planning, and rightsizing recommendations — zero surprise bills, predictable spend.',
      Icon: RefreshCw,
    },
    {
      title: 'Azure DevOps & GitHub Actions',
      desc: 'CI/CD pipelines, artifact management, and infrastructure deployment automation using Azure DevOps Pipelines or GitHub Actions with Bicep and Terraform — everything deployed through code.',
      Icon: Lock,
    },
  ],
  process: [
    {
      number: '01',
      title: 'Azure Assessment',
      desc: 'We review your existing Azure environment — or plan a greenfield build — covering architecture, security posture, cost profile, and governance gaps that need addressing.',
    },
    {
      number: '02',
      title: 'Architecture Design',
      desc: 'We design your landing zone, subscription hierarchy, networking topology, identity model, and governance policies — fully aligned to the Azure Cloud Adoption Framework.',
    },
    {
      number: '03',
      title: 'Foundation Build',
      desc: 'We deploy the landing zone using Bicep or Terraform, establish Azure Policy guardrails, configure Defender for Cloud, and set up cost management — before any workload is migrated.',
    },
    {
      number: '04',
      title: 'Workload Migration & Deployment',
      desc: 'We migrate or deploy workloads in prioritised waves — validating performance, security posture, and integration at every stage before moving to the next.',
    },
    {
      number: '05',
      title: 'Operations & Governance',
      desc: 'We establish a FinOps practice, configure security monitoring, define patch management procedures, and hand over complete documentation for ongoing operations.',
    },
  ],
  caseStudies: [
    {
      industry: 'Government',
      company: 'Regional government authority — digital transformation',
      outcome: 'We designed and built an ISO 27001-aligned Azure landing zone replacing an on-premises data centre — enabling 23 citizen-facing digital services to migrate safely over 18 months.',
      accent: '#0078D4',
      metrics: [
        { value: '23', label: 'Services migrated' },
        { value: 'ISO 27001', label: 'Certified environment' },
        { value: '55%', label: 'Infrastructure cost reduction' },
      ],
    },
    {
      industry: 'Healthcare',
      company: 'Private hospital group — clinical analytics platform',
      outcome: 'We built a HIPAA-compliant Azure healthcare data platform using Synapse and Databricks — enabling clinical analytics at 6× the performance of the previous environment with automated audit reporting.',
      accent: '#10B981',
      metrics: [
        { value: 'HIPAA', label: 'Compliant environment' },
        { value: '6×', label: 'Analytics performance' },
        { value: '0', label: 'Audit findings' },
      ],
    },
  ],
  faq: [
    {
      q: 'Do you work with existing Azure environments or only greenfield?',
      a: 'Both. For existing environments, we start with an assessment and produce a prioritised remediation roadmap. For greenfield, we design from scratch using Azure Cloud Adoption Framework best practices.',
    },
    {
      q: 'Terraform or Bicep for Azure infrastructure?',
      a: 'Bicep for Azure-only environments where native Microsoft tooling is preferred and the team wants to avoid an additional abstraction layer. Terraform for multi-cloud setups or where existing Terraform practice is already established. We let your context drive the choice.',
    },
    {
      q: 'Can you help us use Azure OpenAI and AI services properly?',
      a: 'Yes — we design, deploy, and govern Azure AI services including Azure OpenAI, AI Search, and Cognitive Services with proper access controls, quota management, content filtering, and cost monitoring built in from day one.',
    },
    {
      q: 'How do you prevent Azure cost overruns?',
      a: 'We implement Azure Cost Management budgets, spending alerts, and resource tagging policies from the foundation build. Our FinOps reviews identify anomalies early — the goal is zero surprise bills, ever.',
    },
  ],
};

export default function AzurePage() {
  return <ServicePageTemplate data={data} />;
}
