import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Microsoft Solutions | Dynamics 365, Azure & Power Platform | MoreYeahs',
  description: 'Transform your business with MoreYeahs Microsoft expertise. Dynamics 365 CRM & ERP, Power Platform automation, Azure cloud, and Microsoft 365 collaboration solutions for enterprise.',
  keywords: ['Microsoft solutions', 'Dynamics 365', 'Power Platform', 'Azure cloud', 'Microsoft 365', 'SharePoint', 'Power BI', 'Microsoft consulting', 'enterprise Microsoft'],
  openGraph: {
    title: 'Microsoft Solutions | Dynamics 365, Azure & Power Platform | MoreYeahs',
    description: 'Expert Dynamics 365, Power Platform, Azure and Microsoft 365 solutions for enterprise digital transformation.',
    type: 'website',
    url: 'https://moreyeahs.com/solutions/microsoft-services',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Microsoft Solutions | MoreYeahs',
    description: 'Dynamics 365, Power Platform, Azure and Microsoft 365 for enterprise.',
  },
  alternates: { canonical: 'https://moreyeahs.com/solutions/microsoft-services' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
