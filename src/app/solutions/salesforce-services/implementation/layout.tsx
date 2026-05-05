import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Salesforce Implementation Services | MoreYeahs IT Technologies',
  description: 'End-to-end Salesforce implementation — Sales Cloud, Service Cloud, data migration, integrations, custom development, and user adoption.',
  keywords: ['Salesforce implementation', 'Sales Cloud', 'Service Cloud', 'Salesforce partner', 'CRM implementation', 'Apex', 'LWC'],
  openGraph: {
    title: 'Salesforce Implementation | MoreYeahs',
    description: 'Done right once. Built to grow with you.',
    url: 'https://moreyeahs.com/solutions/salesforce-services/implementation',
  },
  alternates: { canonical: '/solutions/salesforce-services/implementation' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
