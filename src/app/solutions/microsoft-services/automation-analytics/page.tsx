import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Microsoft Power Platform & Analytics',
  description: 'Power Automate workflows, Power BI dashboards, and Microsoft 365 analytics. Automate operations and surface actionable insights instantly.',
  keywords: ['Power Automate','Power BI','Microsoft 365 analytics','Power Platform','Microsoft automation','business intelligence India'],
  openGraph: {
    title: 'Microsoft Power Platform & Analytics | MoreYeahs',
    description: 'Power Automate workflows, Power BI dashboards, and Microsoft 365 analytics. Automate operations and surface actionable insights instantly.',
    url: 'https://www.moreyeahs.com/solutions/microsoft-services/automation-analytics',
    type: 'website',
    siteName: 'MoreYeahs IT Technologies',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Microsoft Power Platform & Analytics | MoreYeahs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Microsoft Power Platform & Analytics | MoreYeahs',
    description: 'Power Automate workflows, Power BI dashboards, and Microsoft 365 analytics. Automate operations and surface actionable insights instantly.',
    images: ['/images/og-image.png'],
  },
  alternates: { canonical: 'https://www.moreyeahs.com/solutions/microsoft-services/automation-analytics' },
};
export default function MicrosoftAutomationAnalyticsPage() {
  return <ServicePageTemplate data={data} />;
}
