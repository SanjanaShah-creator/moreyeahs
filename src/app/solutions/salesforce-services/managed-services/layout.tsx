import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Salesforce Support & Managed Services | MoreYeahs IT Technologies',
  description: 'Dedicated Salesforce administration, proactive org health management, user support, and 24/7 monitoring for your Salesforce environment.',
  keywords: ['Salesforce managed services', 'Salesforce admin', 'Salesforce support', 'org management', 'Salesforce consulting'],
  openGraph: {
    title: 'Salesforce Support & Managed Services | MoreYeahs',
    description: 'Your Salesforce org, expertly managed. Always on.',
    url: 'https://moreyeahs.com/solutions/salesforce-services/managed-services',
  },
  alternates: { canonical: '/solutions/salesforce-services/managed-services' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
