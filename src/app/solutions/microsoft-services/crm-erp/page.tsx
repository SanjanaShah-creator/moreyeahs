import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Microsoft Dynamics 365 CRM & ERP',
  description: 'Dynamics 365 implementation, customisation, and support for sales, service, and operations. Microsoft CRM and ERP built exactly for your business.',
  keywords: ['Dynamics 365','Microsoft CRM','Microsoft ERP','Dynamics 365 implementation','D365 consulting','Microsoft partner India'],
  openGraph: {
    title: 'Microsoft Dynamics 365 CRM & ERP | MoreYeahs',
    description: 'Dynamics 365 implementation, customisation, and support for sales, service, and operations. Microsoft CRM and ERP built exactly for your business.',
    url: 'https://www.moreyeahs.com/solutions/microsoft-services/crm-erp',
    type: 'website',
    siteName: 'MoreYeahs IT Technologies',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Microsoft Dynamics 365 CRM & ERP | MoreYeahs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Microsoft Dynamics 365 CRM & ERP | MoreYeahs',
    description: 'Dynamics 365 implementation, customisation, and support for sales, service, and operations. Microsoft CRM and ERP built exactly for your business.',
    images: ['/images/og-image.png'],
  },
  alternates: { canonical: 'https://www.moreyeahs.com/solutions/microsoft-services/crm-erp' },
};
export default function MicrosoftCRMERPPage() {
  return <ServicePageTemplate data={data} />;
}
