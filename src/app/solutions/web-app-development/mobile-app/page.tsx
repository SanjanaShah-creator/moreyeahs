'use client';

import ServicePageTemplate, { ServicePageData } from '@/components/solutions/ServicePageTemplate';
import { Cpu, Zap, Shield, Layers, BarChart3, RefreshCw, Monitor, Database } from 'lucide-react';

const data: ServicePageData = {
  solution: 'Web & App Development',
  solutionHref: '/solutions/web-app-development',
  name: 'Mobile App Development',
  tagline: 'Apps people open every day. Not just once.',
  heroDesc: "Most mobile apps get downloaded and forgotten. The ones that stick are the ones that load fast, work offline, and feel like they were made for the person using them — not for a product roadmap. We build iOS and Android applications your users actually keep: from React Native and Flutter cross-platform apps to native Swift and Kotlin for performance-critical experiences. From the first wireframe to live in the app store.",
  stats: [
    { value: '50+', label: 'Apps live on app stores' },
    { value: '4.7★', label: 'Average store rating' },
    { value: '12 wks', label: 'MVP to app store submission' },
  ],
  accent: '#4D86F5',
  accentLight: 'rgba(77,134,245,0.08)',
  problemQuote: 'Most mobile apps are downloaded once and never opened again. The difference between a habit and a delete is how well the app was built.',
  problemPoints: [
    'App crashes on specific devices in production with no way to reproduce it locally',
    'Push notifications being ignored because the messaging and timing are completely wrong',
    'Screens that lag, stutter, or freeze — making users feel the app is broken',
    'Offline functionality missing, making the app completely useless without a signal',
    'App store review rejections delaying releases because guidelines were not followed from the start',
    'No analytics on which features users actually use — so every roadmap decision is a guess',
  ],
  capabilities: [
    {
      title: 'React Native Development',
      desc: 'Cross-platform iOS and Android apps sharing 90%+ of the codebase — with native module bridges for device-specific capabilities where the platform demands it. Fast to ship, easy to maintain.',
      Icon: Layers,
      tag: 'Cross-Platform',
    },
    {
      title: 'Flutter Development',
      desc: 'Pixel-perfect cross-platform apps with Flutter — ideal for demanding custom UI/UX requirements, consistent 60fps animations, and teams already investing in the Dart ecosystem.',
      Icon: Monitor,
      tag: 'Cross-Platform',
    },
    {
      title: 'Native iOS (Swift)',
      desc: 'Swift-based iOS development for performance-critical applications — AR experiences, Core ML on-device intelligence, HealthKit integration, and apps that need deep access to Apple platform APIs.',
      Icon: Cpu,
      tag: 'Native',
    },
    {
      title: 'Native Android (Kotlin)',
      desc: 'Kotlin-first Android development with Jetpack Compose, Material You design, Android-specific APIs, and Play Store optimisation — built to perform across the full range of Android devices.',
      Icon: Cpu,
      tag: 'Native',
    },
    {
      title: 'Offline-First Architecture',
      desc: 'Local SQLite and Realm databases, background sync engines, and conflict resolution — so your app works reliably in the field, on the tube, or anywhere connectivity cannot be guaranteed.',
      Icon: Database,
    },
    {
      title: 'Push Notifications & Re-Engagement',
      desc: 'FCM and APNs integration, audience segmentation, deep linking, A/B tested notification copy, and re-engagement campaign infrastructure — notifications that actually get opened.',
      Icon: Zap,
    },
    {
      title: 'App Performance Optimisation',
      desc: 'Frame rate profiling, bundle size reduction, lazy loading, image optimisation, and memory management — eliminating the jank, lag, and crashes that quietly drive uninstalls.',
      Icon: BarChart3,
    },
    {
      title: 'App Security & Compliance',
      desc: 'Certificate pinning, root and jailbreak detection, secure storage via Keychain and Keystore, OWASP Mobile Top 10 hardening, and GDPR-compliant data handling — built in, not bolted on.',
      Icon: Shield,
    },
  ],
  process: [
    {
      number: '01',
      title: 'Product Definition & User Research',
      desc: 'We define user personas, core journeys, MVP feature set, and success metrics — and prototype the key flows in Figma before a single line of development code is written.',
    },
    {
      number: '02',
      title: 'UX Design & Technical Architecture',
      desc: 'High-fidelity designs for every screen, navigation architecture, API contract design, and third-party SDK evaluation — agreed with your team before development begins.',
    },
    {
      number: '03',
      title: 'Agile Development Sprints',
      desc: 'Feature-complete sprints with TestFlight and Firebase App Distribution builds every two weeks — so you can see, test, and give feedback on working software continuously.',
    },
    {
      number: '04',
      title: 'Testing, QA & Store Compliance',
      desc: 'Device farm testing, performance profiling, accessibility audit, security scan, and App Store and Play Store compliance review — completed before any store submission.',
    },
    {
      number: '05',
      title: 'Launch, Monitoring & Growth',
      desc: 'Store asset preparation, staged rollout, crash monitoring setup, and post-launch analytics review — with an ongoing support option or a clean handover to your in-house team.',
    },
  ],
  caseStudies: [
    {
      industry: 'Logistics',
      company: 'Last-mile delivery company — field driver app',
      outcome: 'We built a React Native driver companion app for 3,000+ delivery drivers — offline-first routing, digital proof-of-delivery, and real-time fleet visibility for dispatch — shipped in 14 weeks.',
      accent: '#4D86F5',
      metrics: [
        { value: '3,000+', label: 'Active drivers' },
        { value: '4.8★', label: 'App store rating' },
        { value: '99.9%', label: 'Offline reliability rate' },
      ],
    },
    {
      industry: 'Health & Wellness',
      company: 'Mental health startup — consumer wellness app',
      outcome: 'We launched an iOS and Android mental wellness app — daily habit tracking, guided audio sessions, and progress visualisation — growing to 200,000 users in 8 months with 62% day-30 retention.',
      accent: '#10B981',
      metrics: [
        { value: '200K', label: 'Users in 8 months' },
        { value: '4.7★', label: 'App store rating' },
        { value: '62%', label: 'Day-30 retention' },
      ],
    },
    {
      industry: 'Retail',
      company: 'Fashion brand — loyalty and shopping app',
      outcome: 'We built a Flutter loyalty and shopping app replacing a costly third-party white-label solution — with AR try-on integration and personalised push campaigns that tripled open rates.',
      accent: '#DB2777',
      metrics: [
        { value: '3×', label: 'Push notification open rate' },
        { value: '28%', label: 'In-app purchase conversion' },
        { value: '6mo', label: 'Full ROI payback period' },
      ],
    },
  ],
  faq: [
    {
      q: 'React Native, Flutter, or native — which should we choose?',
      a: 'React Native is the right call if your team knows JavaScript and you need cost-effective cross-platform delivery. Flutter excels when you need polished custom UI with consistent cross-platform behaviour. Native Swift or Kotlin is only worth the additional cost when you need deep platform access — ARKit, performance-critical audio/video, or tight OS integrations. We help you decide based on your specific requirements, not based on what is fashionable.',
    },
    {
      q: 'How do you handle App Store and Play Store submissions?',
      a: 'We manage the full store submission process — screenshots, metadata, App Store Connect and Play Console configuration, and review process management. We have built up a thorough understanding of the most common rejection reasons and we design to avoid them from the start.',
    },
    {
      q: 'Can you take over and extend an existing app?',
      a: 'Yes. We do a code and architecture audit first, assess the state of the codebase, and then propose a clear approach. We can add new features, refactor problematic areas, or upgrade dependencies — without recommending a full rewrite unless one is genuinely necessary.',
    },
    {
      q: 'What does a realistic MVP timeline look like?',
      a: 'A focused consumer MVP — core features, one platform — is typically 10 to 14 weeks from kickoff to store submission. Cross-platform apps or enterprise apps with their own backend APIs range from 14 to 24 weeks depending on complexity. We give you a detailed estimate after the product definition phase.',
    },
  ],
};

export default function MobileAppPage() {
  return <ServicePageTemplate data={data} />;
}
