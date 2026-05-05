'use client';

import ServicePageTemplate, { ServicePageData } from '@/components/solutions/ServicePageTemplate';
import { Database, GitBranch, Layers, Zap, Shield, BarChart3, RefreshCw, Cloud } from 'lucide-react';

const data: ServicePageData = {
  solution: 'Data Science & AI',
  solutionHref: '/solutions/data-science',
  name: 'Data Infrastructure',
  tagline: 'The foundation your data team actually deserves.',
  heroDesc: "Stale dashboards, silent pipeline failures, and conflicting numbers across teams — these are symptoms of a broken data foundation, not individual tool problems. We architect and build modern data platforms — lakehouse architectures, streaming pipelines, governed data meshes — so every team has reliable, fast, trusted data exactly when they need it.",
  stats: [
    { value: '10×', label: 'Query speed improvement' },
    { value: '99.9%', label: 'Pipeline uptime' },
    { value: 'TB+', label: 'Data processed daily' },
  ],
  accent: '#0EA472',
  accentLight: 'rgba(14,164,114,0.08)',
  problemQuote: 'Broken pipelines, stale dashboards, and data nobody trusts are symptoms of a foundation problem.',
  problemPoints: [
    'Pipelines failing silently — nobody knows until a dashboard breaks',
    'Analysts waiting days for data that should arrive in minutes',
    'Three systems claiming to be the source of truth — all showing different numbers',
    'No data lineage — impossible to explain where a figure came from',
    'Storage costs growing faster than any business value being delivered',
    'Every new analyst rebuilds the same pipeline from scratch',
  ],
  capabilities: [
    {
      title: 'Data Lakehouse Architecture',
      desc: 'Unified lakehouse platforms on Delta Lake, Apache Iceberg, or Hudi — giving you the flexibility of a data lake with the reliability and governance of a warehouse.',
      Icon: Database,
      tag: 'Architecture',
    },
    {
      title: 'ETL/ELT Pipeline Engineering',
      desc: 'Production-grade transformation pipelines with dbt, Airbyte, Fivetran, or custom Spark/Flink — fully tested, documented, monitored, and ready for your team to own.',
      Icon: GitBranch,
      tag: 'Core',
    },
    {
      title: 'Real-Time Streaming',
      desc: 'Event-driven data architectures using Kafka, Kinesis, and Flink — delivering sub-second data availability to every downstream system that needs it.',
      Icon: Zap,
    },
    {
      title: 'Data Catalog & Governance',
      desc: 'Automated lineage tracking, schema management, access controls, and data quality scoring using DataHub, Atlan, or Great Expectations — so your data is trustworthy, not just available.',
      Icon: Shield,
    },
    {
      title: 'Cloud Warehouse Optimisation',
      desc: 'Snowflake, BigQuery, and Redshift — architecture reviews, clustering strategies, materialisation policies, and cost optimisation that can halve your warehouse bill.',
      Icon: Cloud,
    },
    {
      title: 'Data Mesh Implementation',
      desc: 'Federated ownership with domain-oriented data products, self-serve infrastructure, and federated governance — eliminating the central data team bottleneck at scale.',
      Icon: Layers,
    },
    {
      title: 'Observability & Monitoring',
      desc: 'End-to-end pipeline monitoring, freshness SLAs, anomaly detection on data quality metrics, and automated incident alerting — so broken data never reaches a dashboard.',
      Icon: BarChart3,
    },
    {
      title: 'Migration & Modernisation',
      desc: 'Legacy warehouse migrations from Oracle, Teradata, and Hadoop to Snowflake, Databricks, or BigQuery — structured, validated, and delivered with zero business disruption.',
      Icon: RefreshCw,
    },
  ],
  process: [
    {
      number: '01',
      title: 'Data Landscape Assessment',
      desc: 'We audit all your data sources, volumes, quality metrics, and downstream consumers — identifying the bottlenecks, gaps, and technical debt in your current architecture.',
    },
    {
      number: '02',
      title: 'Architecture Design',
      desc: 'We design the target state — storage layers, ingestion patterns, transformation logic, and governance model — aligned to your team size, data volume, and growth trajectory.',
    },
    {
      number: '03',
      title: 'Pipeline Build & Testing',
      desc: 'We develop every pipeline with unit tests, contract tests, and integration tests built in. Data quality is validated at every transformation stage — not checked once at the end.',
    },
    {
      number: '04',
      title: 'Migration & Cutover',
      desc: 'We run new pipelines in parallel against your legacy systems, validate parity across every metric, and cut over with documented rollback procedures in place.',
    },
    {
      number: '05',
      title: 'Observability & Handover',
      desc: 'We deploy monitoring dashboards, write runbooks, establish on-call procedures, and train your team — so they own and operate the platform with full confidence.',
    },
  ],
  caseStudies: [
    {
      industry: 'Media & Entertainment',
      company: 'Streaming platform — 20M+ subscribers',
      outcome: 'We migrated a 5-year-old Hadoop cluster to a Databricks lakehouse with real-time streaming ingestion — reducing pipeline failures from 40 per month to near-zero while cutting infrastructure costs.',
      accent: '#0EA472',
      metrics: [
        { value: '94%', label: 'Fewer pipeline failures' },
        { value: '8×', label: 'Query performance uplift' },
        { value: '40%', label: 'Infrastructure cost reduction' },
      ],
    },
    {
      industry: 'Logistics',
      company: 'Last-mile delivery company — operations team',
      outcome: 'We built a real-time streaming platform ingesting 50M+ GPS events per day — enabling live route optimisation and SLA monitoring that was previously impossible on batch pipelines.',
      accent: '#F59E0B',
      metrics: [
        { value: '<1s', label: 'Event latency end-to-end' },
        { value: '50M+', label: 'Events processed daily' },
        { value: '18%', label: 'SLA compliance improvement' },
      ],
    },
    {
      industry: 'Healthcare',
      company: 'Hospital network — analytics team',
      outcome: 'We implemented a governed data mesh across 12 hospital systems — enabling unified patient analytics with full HIPAA-compliant lineage for the first time across the network.',
      accent: '#1A56DB',
      metrics: [
        { value: '12', label: 'Hospital domains unified' },
        { value: '100%', label: 'HIPAA compliant' },
        { value: '5 days→4hrs', label: 'Report cycle time' },
      ],
    },
  ],
  faq: [
    {
      q: 'Which cloud platforms do you support?',
      a: 'We work across AWS (S3, Glue, Redshift, Kinesis), GCP (BigQuery, Dataflow, Pub/Sub), and Azure (Synapse, ADLS, Event Hubs) — as well as multi-cloud and on-premises hybrid setups.',
    },
    {
      q: 'Do you work with dbt?',
      a: 'Yes — dbt is our preferred transformation tool for SQL-centric pipelines. We handle project setup, testing framework design, documentation, and full CI/CD integration for dbt projects.',
    },
    {
      q: 'How do you enforce data quality at scale?',
      a: 'We implement automated data quality checks using Great Expectations or dbt tests at every pipeline stage — with quality scoring dashboards, alerting, and SLA tracking baked in from day one.',
    },
    {
      q: 'Can you migrate our on-premises data warehouse?',
      a: 'Yes. We handle end-to-end migrations from Oracle, Teradata, SQL Server, and Hadoop — including schema translation, data validation, and parallel-run verification before any cutover.',
    },
  ],
};

export default function DataInfrastructurePage() {
  return <ServicePageTemplate data={data} />;
}
