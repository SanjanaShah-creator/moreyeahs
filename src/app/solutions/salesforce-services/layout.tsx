import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Salesforce Solutions | CRM Implementation & Automation | MoreYeahs' },
  description: 'Maximise Salesforce ROI with MoreYeahs. Expert CRM implementation, Sales Cloud, Service Cloud, Marketing Automation, and Salesforce Analytics for enterprise growth.',
  keywords: ['Salesforce solutions', 'CRM implementation', 'Sales Cloud', 'Service Cloud', 'Marketing Cloud', 'Salesforce consulting', 'Salesforce integration', 'Salesforce automation'],
  openGraph: {
    title: 'Salesforce Solutions | CRM Implementation & Automation | MoreYeahs',
    description: 'Expert Salesforce CRM implementation, Sales Cloud, Service Cloud and Marketing Automation for enterprise.',
    type: 'website',
    url: 'https://www.moreyeahs.com/solutions/salesforce-services',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salesforce Solutions | MoreYeahs',
    description: 'CRM implementation, Sales Cloud, Service Cloud and Marketing Automation.',
  },
  alternates: { canonical: 'https://www.moreyeahs.com/solutions/salesforce-services' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
