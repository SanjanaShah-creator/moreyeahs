'use client';

import ServicePageTemplate, { ServicePageData } from '@/components/solutions/ServicePageTemplate';
import { Wifi, Cpu, BarChart3, Shield, Zap, RefreshCw, Database, AlertTriangle } from 'lucide-react';

const data: ServicePageData = {
  solution: 'Data Science & AI',
  solutionHref: '/solutions/data-science',
  name: 'IoT & Connected Systems',
  tagline: 'Connect the physical world. Extract its intelligence.',
  heroDesc: "Your machines, sensors, and devices are already generating data — most of it going nowhere. We design and deploy end-to-end IoT solutions that change that: sensor networks, edge computing, real-time dashboards, and predictive maintenance systems that turn connected devices into measurable competitive advantage.",
  stats: [
    { value: '50M+', label: 'Events processed daily' },
    { value: '<5ms', label: 'Edge inference latency' },
    { value: '99.7%', label: 'Device fleet uptime' },
  ],
  accent: '#F59E0B',
  accentLight: 'rgba(245,158,11,0.08)',
  problemQuote: 'Sensors are everywhere. The intelligence to act on them in real time is not.',
  problemPoints: [
    'Device data siloed in OT systems and never reaching analytics tools',
    'Cloud-only architectures too slow for real-time operational decisions',
    'No scalable approach to device provisioning and fleet management',
    'Security vulnerabilities across device-to-cloud communication layers',
    'Physical and digital events impossible to correlate in real time',
    'Predictive maintenance attempted — but never accurate enough to trust',
  ],
  capabilities: [
    {
      title: 'IoT Architecture Design',
      desc: 'End-to-end reference architecture covering device connectivity, edge processing, ingestion pipelines, and analytics layers — built for your specific scale and latency requirements.',
      Icon: Wifi,
      tag: 'Foundation',
    },
    {
      title: 'Edge Computing & Intelligence',
      desc: 'ML models and business logic deployed at the edge — reducing latency, cloud costs, and bandwidth while enabling local decisions that cannot wait for a cloud round-trip.',
      Icon: Cpu,
      tag: 'Edge',
    },
    {
      title: 'Predictive Maintenance',
      desc: 'Sensor fusion and anomaly detection models that predict equipment failure before it happens — eliminating unplanned downtime that costs far more than any maintenance program.',
      Icon: AlertTriangle,
    },
    {
      title: 'Real-Time Analytics & Dashboards',
      desc: 'Streaming analytics pipelines feeding live operational dashboards — OEE, energy consumption, asset utilisation, and custom KPIs updated in real time.',
      Icon: BarChart3,
    },
    {
      title: 'Device Management & OTA',
      desc: 'Fleet management platforms for provisioning, configuration, monitoring, and over-the-air firmware updates across thousands of devices — without manual intervention.',
      Icon: RefreshCw,
    },
    {
      title: 'IoT Data Platform',
      desc: 'Time-series storage (InfluxDB, TimescaleDB, Azure TSI), ingestion pipelines (Kafka, MQTT, AMQP), and queryable APIs for all your device data — unified in one place.',
      Icon: Database,
    },
    {
      title: 'Security & Compliance',
      desc: 'Device authentication, TLS encryption, certificate lifecycle management, and OT/IT network segmentation — securing every layer of your IoT stack from device to cloud.',
      Icon: Shield,
    },
    {
      title: 'Protocol Integration',
      desc: 'Support for Modbus, OPC-UA, MQTT, AMQP, CoAP, and proprietary vendor protocols — bridging legacy OT machinery with modern cloud and analytics platforms.',
      Icon: Zap,
    },
  ],
  process: [
    {
      number: '01',
      title: 'Connected System Discovery',
      desc: 'We audit your existing devices, protocols, and data flows — identifying the connectivity gaps and prioritising use cases by operational impact and implementation feasibility.',
    },
    {
      number: '02',
      title: 'Architecture & Protocol Design',
      desc: 'We design the full connectivity layer — protocol bridges, edge nodes, ingestion endpoints — aligned to your OT/IT environment, latency needs, and security policies.',
    },
    {
      number: '03',
      title: 'Edge & Cloud Build',
      desc: 'We develop edge firmware and containers alongside cloud ingestion pipelines — deploying device management infrastructure and establishing full-stack observability from day one.',
    },
    {
      number: '04',
      title: 'Analytics & Intelligence Layer',
      desc: 'We build streaming analytics, predictive models, and operational dashboards on top of the data platform — validated against real sensor data before any production rollout.',
    },
    {
      number: '05',
      title: 'Scale & Operationalise',
      desc: 'We roll out to your full device fleet, establish SLAs, document on-call runbooks, and hand over to your operations team with everything they need to own it confidently.',
    },
  ],
  caseStudies: [
    {
      industry: 'Manufacturing',
      company: 'Industrial equipment manufacturer — 300 CNC machines',
      outcome: 'We deployed a predictive maintenance solution monitoring vibration, temperature, and pressure across 300 CNC machines — eliminating surprise failures that previously shut production lines down for days.',
      accent: '#F59E0B',
      metrics: [
        { value: '73%', label: 'Unplanned downtime reduction' },
        { value: '300', label: 'Machines connected' },
        { value: '$1.4M', label: 'Annual savings realised' },
      ],
    },
    {
      industry: 'Smart Buildings',
      company: 'Commercial real estate — 8-building portfolio',
      outcome: 'We built an energy management IoT platform connecting HVAC, lighting, and occupancy sensors across 8 buildings — enabling intelligent energy scheduling that cut consumption by nearly a third.',
      accent: '#0EA472',
      metrics: [
        { value: '31%', label: 'Energy cost reduction' },
        { value: '8', label: 'Buildings connected' },
        { value: '6 mo', label: 'Full ROI payback' },
      ],
    },
    {
      industry: 'Agriculture',
      company: 'Precision farming company — 40,000 acres',
      outcome: 'We engineered a soil sensing and irrigation IoT network with edge analytics — enabling autonomous field-level water management decisions that improved yield while reducing consumption.',
      accent: '#4D86F5',
      metrics: [
        { value: '22%', label: 'Water usage reduction' },
        { value: '40K', label: 'Acres monitored' },
        { value: '18%', label: 'Crop yield improvement' },
      ],
    },
  ],
  faq: [
    {
      q: 'Can you work with our existing legacy OT equipment?',
      a: 'Yes. We support Modbus, OPC-UA, and other industrial protocols — building protocol bridges that connect legacy machinery to modern cloud platforms without replacing hardware you have already invested in.',
    },
    {
      q: 'How do you handle areas with unreliable or no internet connectivity?',
      a: 'We design edge-first architectures for intermittent connectivity — devices continue operating and making decisions locally, then sync to the cloud when connectivity resumes.',
    },
    {
      q: 'Which IoT cloud platforms do you work with?',
      a: 'We work with AWS IoT Core, Azure IoT Hub, and GCP IoT Core — as well as on-premises alternatives for organisations with strict data residency or air-gap requirements.',
    },
    {
      q: 'How long does a predictive maintenance deployment take?',
      a: 'A focused deployment covering an initial set of machines typically takes 8–12 weeks from discovery to first model in production. Full fleet rollout follows in subsequent phases.',
    },
  ],
};

export default function IoTConnectedSystemsPage() {
  return <ServicePageTemplate data={data} />;
}
