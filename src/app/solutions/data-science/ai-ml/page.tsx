'use client';

import ServicePageTemplate, { ServicePageData } from '@/components/solutions/ServicePageTemplate';
import { Brain, Layers, Cpu, BarChart3, Sparkles, RefreshCw, Search, ShieldCheck } from 'lucide-react';

const data: ServicePageData = {
  solution: 'Data Science & AI',
  solutionHref: '/solutions/data-science',
  name: 'AI & Machine Learning',
  tagline: 'Machines that learn. Outcomes that matter.',
  heroDesc: "Your data already contains the answers. We build the AI and ML systems that surface them — predictive models that reduce churn, recommendation engines that lift revenue, and automation that frees your team from repetitive decisions. Production-grade, explainable, and built around your actual business goals.",
  stats: [
    { value: '94%', label: 'Avg. model accuracy' },
    { value: '10×', label: 'Faster time to insight' },
    { value: '200+', label: 'ML models in production' },
  ],
  accent: '#4D86F5',
  accentLight: 'rgba(77,134,245,0.08)',
  problemQuote: 'Most companies drown in data but starve for actionable intelligence.',
  problemPoints: [
    'No clear path from raw data to confident business decisions',
    'ML models trained in isolation that never reach production',
    'Black-box outputs that stakeholders refuse to trust or act on',
    'Model drift eroding accuracy silently after deployment',
    'Talent gaps slowing every experiment to a crawl',
    'Infrastructure costs spiralling as data volume grows',
  ],
  capabilities: [
    {
      title: 'Predictive Modeling',
      desc: 'End-to-end ML pipelines — demand forecasting, churn prediction, lead scoring, fraud detection — engineered for real production environments, not just notebooks.',
      Icon: BarChart3,
      tag: 'Core',
    },
    {
      title: 'Generative AI & LLMs',
      desc: 'Fine-tuned large language models, RAG architectures, and agentic workflows that integrate with your data, your tools, and your users — not just a wrapper around GPT.',
      Icon: Sparkles,
      tag: 'Cutting Edge',
    },
    {
      title: 'MLOps & Model Lifecycle',
      desc: 'CI/CD for machine learning — experiment tracking, model registry, automated retraining on data drift, canary deployments, and rollback capability built in.',
      Icon: RefreshCw,
    },
    {
      title: 'NLP & Text Intelligence',
      desc: 'Document classification, entity extraction, sentiment analysis, and semantic search using transformer models tuned on your domain-specific language.',
      Icon: Search,
    },
    {
      title: 'Model Explainability',
      desc: 'SHAP values, LIME, and custom interpretability tooling that make model decisions auditable — essential for regulated industries and stakeholder buy-in.',
      Icon: ShieldCheck,
    },
    {
      title: 'Custom Neural Architectures',
      desc: 'Purpose-built deep learning models for tabular, text, image, and time-series data — when off-the-shelf architectures simply do not fit your domain.',
      Icon: Cpu,
    },
    {
      title: 'Recommendation Engines',
      desc: 'Collaborative filtering, content-based, and hybrid recommender systems that personalise user experiences at scale and measurably improve engagement.',
      Icon: Layers,
    },
    {
      title: 'AI Strategy & Roadmap',
      desc: 'Use-case prioritisation, ROI modelling, build-vs-buy analysis, and a phased AI roadmap that aligns with your actual team capacity and data maturity.',
      Icon: Brain,
    },
  ],
  process: [
    {
      number: '01',
      title: 'Discovery & Use Case Scoping',
      desc: 'We audit your data assets, map your business goals to specific ML opportunities, and rank initiatives by expected ROI and feasibility — so we build the right things first.',
    },
    {
      number: '02',
      title: 'Data Assessment & Preparation',
      desc: 'We profile, clean, and engineer features from your raw data. No model is better than its inputs — we make sure the inputs are consistent, accurate, and complete.',
    },
    {
      number: '03',
      title: 'Model Development & Experimentation',
      desc: 'Rapid experimentation across algorithms and architectures, with rigorous evaluation metrics aligned to your business KPIs — not just academic benchmarks.',
    },
    {
      number: '04',
      title: 'Deployment & Integration',
      desc: 'We package models as REST APIs, batch jobs, or embedded features and integrate them directly into your existing product stack — with zero-downtime go-live.',
    },
    {
      number: '05',
      title: 'Monitoring & Continuous Improvement',
      desc: 'Real-time drift detection, performance dashboards, and automated retraining pipelines keep your models accurate and your business outcomes protected over time.',
    },
  ],
  caseStudies: [
    {
      industry: 'E-Commerce',
      company: 'Online retail platform — 5M+ active users',
      outcome: 'We deployed a real-time product recommendation engine using collaborative filtering and deep learning — integrated directly into the product discovery flow and personalised for every user.',
      accent: '#4D86F5',
      metrics: [
        { value: '38%', label: 'Increase in avg. order value' },
        { value: '2.1×', label: 'Click-through lift' },
        { value: '4 wks', label: 'Discovery to production' },
      ],
    },
    {
      industry: 'Financial Services',
      company: 'Regional bank — credit underwriting',
      outcome: 'We replaced manual rule-based credit approvals with a gradient-boosted risk model — with full SHAP explainability built in for regulatory compliance and faster decisions.',
      accent: '#10B981',
      metrics: [
        { value: '22%', label: 'Default rate reduction' },
        { value: '91%', label: 'Model AUC-ROC score' },
        { value: '60%', label: 'Faster credit decisions' },
      ],
    },
    {
      industry: 'SaaS',
      company: 'B2B SaaS — customer success team',
      outcome: 'We built a churn prediction system with a 90-day lookahead that feeds automated playbooks into CSM workflows — turning early warning signals into retention actions.',
      accent: '#F59E0B',
      metrics: [
        { value: '45%', label: 'Churn reduction' },
        { value: '$2.8M', label: 'ARR protected' },
        { value: '89%', label: 'Precision score' },
      ],
    },
  ],
  faq: [
    {
      q: 'Do we need clean data before you can start?',
      a: 'No. Our data assessment phase is specifically designed to handle messy, real-world data. We profile, clean, and prepare your data as part of the engagement — not as a prerequisite.',
    },
    {
      q: 'How long does a typical AI/ML project take?',
      a: 'A focused MVP — from proof-of-concept to production — typically takes 6–10 weeks. More complex enterprise deployments with custom infrastructure range from 3–5 months. We always scope transparently upfront.',
    },
    {
      q: 'Can you integrate ML into our existing product?',
      a: 'Yes — we build models as containerised APIs or lightweight SDKs that plug into any backend. We handle the integration engineering, not just the model.',
    },
    {
      q: 'How do you handle model performance degrading over time?',
      a: 'Every production deployment we build includes drift monitoring, automated alerting, and retraining pipelines. Model performance does not degrade silently on our watch.',
    },
    {
      q: 'What about data privacy and compliance?',
      a: 'We follow data minimisation principles from day one, support federated learning where needed, and ensure all infrastructure is designed to meet your specific compliance requirements — GDPR, HIPAA, SOC 2, and beyond.',
    },
  ],
};

export default function AIMLPage() {
  return <ServicePageTemplate data={data} />;
}
