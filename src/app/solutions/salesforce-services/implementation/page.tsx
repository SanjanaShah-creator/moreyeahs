import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Salesforce Implementation Services',
  description: 'End-to-end Salesforce Sales Cloud, Service Cloud, and custom implementation by a certified ISV partner. Set up right from day one.',
  keywords: ['Salesforce implementation','Sales Cloud','Service Cloud','Salesforce consulting','Salesforce partner India','CRM implementation'],
  openGraph: {
    title: 'Salesforce Implementation Services | MoreYeahs',
    description: 'End-to-end Salesforce Sales Cloud, Service Cloud, and custom implementation by a certified ISV partner. Set up right from day one.',
    url: 'https://www.moreyeahs.com/solutions/salesforce-services/implementation',
    type: 'website',
    siteName: 'MoreYeahs IT Technologies',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Salesforce Implementation Services | MoreYeahs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salesforce Implementation Services | MoreYeahs',
    description: 'End-to-end Salesforce Sales Cloud, Service Cloud, and custom implementation by a certified ISV partner. Set up right from day one.',
    images: ['/images/og-image.png'],
  },
  alternates: { canonical: 'https://www.moreyeahs.com/solutions/salesforce-services/implementation' },
};
export default function SalesforceImplementationPage() {
  return <ServicePageTemplate data={data} />;
}
