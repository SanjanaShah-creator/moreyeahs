import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Microsoft CRM & ERP (Dynamics 365) | MoreYeahs IT Technologies',
  description: 'Dynamics 365 CRM and ERP implementation — Sales, Service, Finance & Operations, and Business Central, fully tailored to your business.',
  keywords: ['Dynamics 365', 'Microsoft CRM', 'Microsoft ERP', 'D365 implementation', 'Business Central', 'Finance and Operations'],
  openGraph: {
    title: 'Microsoft CRM & ERP | MoreYeahs',
    description: 'Dynamics 365 done the way your business actually runs.',
    url: 'https://moreyeahs.com/solutions/microsoft-services/crm-erp',
  },
  alternates: { canonical: '/solutions/microsoft-services/crm-erp' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}