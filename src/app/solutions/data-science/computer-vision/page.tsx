'use client';

import ServicePageTemplate, { ServicePageData } from '@/components/solutions/ServicePageTemplate';
import { Eye, ScanLine, Camera, Layers, Cpu, ShieldCheck, Zap, BarChart3 } from 'lucide-react';

const data: ServicePageData = {
  solution: 'Data Science & AI',
  solutionHref: '/solutions/data-science',
  name: 'Computer Vision',
  tagline: 'Teach your systems to see — and act.',
  heroDesc: "Every production line, retail floor, and camera feed generates visual data your business cannot currently read. We build computer vision systems that change that — detecting defects at line speed, tracking objects in real time, and turning raw imagery into decisions. From NVIDIA Jetson edge deployment to cloud GPU inference, we handle the full pipeline.",
  stats: [
    { value: '99.1%', label: 'Detection accuracy' },
    { value: '30fps+', label: 'Real-time inference' },
    { value: '50+', label: 'CV systems deployed' },
  ],
  accent: '#1A56DB',
  accentLight: 'rgba(26,86,219,0.08)',
  problemQuote: 'Visual data is everywhere. The ability to act on it in real time is rare.',
  problemPoints: [
    'Manual QA inspectors cannot keep pace with production throughput',
    'Off-the-shelf CV models fail on your specific domain and lighting conditions',
    'Edge deployment constraints make cloud-only inference impossible',
    'Annotation bottlenecks stall model development for months',
    'High latency requirements cannot be met with cloud round-trips',
    'No pipeline connecting camera output to downstream business actions',
  ],
  capabilities: [
    {
      title: 'Object Detection & Tracking',
      desc: 'Real-time multi-object detection and tracking using YOLO, DETR, and custom architectures — optimised specifically for your hardware constraints and accuracy targets.',
      Icon: ScanLine,
      tag: 'Core',
    },
    {
      title: 'Image Classification',
      desc: 'High-accuracy classification pipelines for product sorting, document routing, and medical imaging — leveraging transfer learning to minimise annotation costs.',
      Icon: Layers,
    },
    {
      title: 'Defect & Anomaly Detection',
      desc: 'Automated visual inspection for manufacturing — catching surface defects, assembly errors, and dimensional irregularities at line speed without manual review.',
      Icon: Eye,
      tag: 'Industrial',
    },
    {
      title: 'Video Analytics',
      desc: 'Real-time video understanding for activity recognition, crowd density, dwell time, zone compliance, and behavioural pattern detection across any camera source.',
      Icon: Camera,
    },
    {
      title: 'Edge CV Deployment',
      desc: 'Model optimisation and on-device deployment using TensorRT and ONNX — running inference on NVIDIA Jetson, Raspberry Pi, and custom edge hardware without cloud dependency.',
      Icon: Cpu,
      tag: 'Edge',
    },
    {
      title: 'OCR & Document Intelligence',
      desc: 'Accurate text extraction from structured forms, handwritten documents, invoices, and receipts — processing documents that manual data entry simply cannot scale to handle.',
      Icon: ScanLine,
    },
    {
      title: 'Facial & Biometric Analysis',
      desc: 'Privacy-compliant facial recognition, emotion detection, and biometric verification for access control and retail analytics — built to your jurisdiction\'s legal requirements.',
      Icon: ShieldCheck,
    },
    {
      title: 'CV Pipeline Optimisation',
      desc: 'Latency profiling, model quantisation, batching strategies, and throughput tuning — squeezing maximum performance out of your existing camera and compute infrastructure.',
      Icon: Zap,
    },
  ],
  process: [
    {
      number: '01',
      title: 'Use Case & Hardware Assessment',
      desc: 'We map your visual inspection goals to specific CV approaches, assess your camera hardware and lighting conditions, and identify constraints from your inference environment upfront.',
    },
    {
      number: '02',
      title: 'Data Collection & Annotation',
      desc: 'We design labelling workflows, manage annotation pipelines at scale, and apply active learning to minimise the annotation effort needed to reach your target accuracy.',
    },
    {
      number: '03',
      title: 'Model Training & Validation',
      desc: 'We train on your labelled dataset with domain-specific augmentation strategies and validate against real-world held-out samples — measured against your precision and recall targets.',
    },
    {
      number: '04',
      title: 'Optimisation & Deployment',
      desc: 'We quantise and prune models for your target hardware, then deploy via stream processors, REST APIs, or directly on-device — eliminating unnecessary cloud round-trips.',
    },
    {
      number: '05',
      title: 'Integration & Monitoring',
      desc: 'We connect CV outputs to your downstream systems — ERP, MES, alerting dashboards — and monitor accuracy continuously, alerting on distribution shifts before they become problems.',
    },
  ],
  caseStudies: [
    {
      industry: 'Manufacturing',
      company: 'Automotive parts manufacturer — QA line',
      outcome: 'We replaced an 8-person manual inspection team with a real-time CV system that detects surface defects at 95+ parts per minute — with higher recall than any human inspector achieved.',
      accent: '#1A56DB',
      metrics: [
        { value: '99.3%', label: 'Defect recall rate' },
        { value: '8×', label: 'Throughput increase' },
        { value: '14 mo', label: 'Full ROI payback' },
      ],
    },
    {
      industry: 'Retail',
      company: 'Multi-location fashion retailer',
      outcome: 'We deployed in-store video analytics measuring dwell time, product zone heatmaps, and conversion rates — giving merchandising teams real data to act on for the first time.',
      accent: '#DB2777',
      metrics: [
        { value: '23%', label: 'Conversion lift' },
        { value: '40+', label: 'Stores deployed' },
        { value: '3 wks', label: 'Per-store install time' },
      ],
    },
    {
      industry: 'Healthcare',
      company: 'Diagnostic imaging centre',
      outcome: 'We built a medical image pre-screening model that flags high-priority scans and routes them to radiologists first — cutting triage time and reducing the risk of delayed diagnoses.',
      accent: '#0EA472',
      metrics: [
        { value: '67%', label: 'Faster triage time' },
        { value: '94.8%', label: 'Sensitivity rate' },
        { value: '0', label: 'False negatives in trial' },
      ],
    },
  ],
  faq: [
    {
      q: 'Do we need labelled image data before you can start?',
      a: 'Not necessarily. We help design data collection protocols, manage annotation pipelines, and use synthetic data and active learning to dramatically reduce the labelling effort needed to reach production accuracy.',
    },
    {
      q: 'Can you deploy on our existing cameras and hardware?',
      a: 'Yes. We optimise models specifically for your hardware — industrial cameras, IP cameras, edge devices, or cloud GPUs — and deploy using native SDKs and runtimes.',
    },
    {
      q: 'How do you handle privacy requirements for video analytics?',
      a: 'We offer fully on-premises deployment, real-time anonymisation (face blurring, silhouette-only processing), and local processing pipelines that never send footage to the cloud.',
    },
    {
      q: 'What accuracy should we realistically expect?',
      a: 'Accuracy depends on data quality and problem complexity. For industrial defect inspection, we typically achieve 98%+ recall. We provide held-out validation benchmarks before any production commitment — no surprises.',
    },
  ],
};

export default function ComputerVisionPage() {
  return <ServicePageTemplate data={data} />;
}
