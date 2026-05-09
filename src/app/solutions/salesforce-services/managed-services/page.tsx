import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Salesforce Support & Managed Services',
  description: 'Ongoing Salesforce administration, optimisation, and support. Keep your Salesforce org healthy, current, and aligned with your business goals.',
  keywords: ['Salesforce managed services','Salesforce support','Salesforce admin','Salesforce optimisation','ISV partner India'],
  openGraph: {
    title: 'Salesforce Support & Managed Services | MoreYeahs',
    description: 'Ongoing Salesforce administration, optimisation, and support. Keep your Salesforce org healthy, current, and aligned with your business goals.',
    url: 'https://www.moreyeahs.com/solutions/salesforce-services/managed-services',
    type: 'website',
    siteName: 'MoreYeahs IT Technologies',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Salesforce Support & Managed Services | MoreYeahs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salesforce Support & Managed Services | MoreYeahs',
    description: 'Ongoing Salesforce administration, optimisation, and support. Keep your Salesforce org healthy, current, and aligned with your business goals.',
    images: ['/images/og-image.png'],
  },
  alternates: { canonical: 'https://www.moreyeahs.com/solutions/salesforce-services/managed-services' },
};
export default function ManagedServicesPage() {
  return <ServicePageTemplate data={data} />;
}
