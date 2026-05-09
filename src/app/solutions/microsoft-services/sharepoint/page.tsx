import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SharePoint Solutions & Development',
  description: 'SharePoint intranets, document management, and team collaboration portals. Modern SharePoint built around how your organisation actually works.',
  keywords: ['SharePoint development','SharePoint intranet','SharePoint Online','document management','SharePoint consulting India'],
  openGraph: {
    title: 'SharePoint Solutions & Development | MoreYeahs',
    description: 'SharePoint intranets, document management, and team collaboration portals. Modern SharePoint built around how your organisation actually works.',
    url: 'https://www.moreyeahs.com/solutions/microsoft-services/sharepoint',
    type: 'website',
    siteName: 'MoreYeahs IT Technologies',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'SharePoint Solutions & Development | MoreYeahs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SharePoint Solutions & Development | MoreYeahs',
    description: 'SharePoint intranets, document management, and team collaboration portals. Modern SharePoint built around how your organisation actually works.',
    images: ['/images/og-image.png'],
  },
  alternates: { canonical: 'https://www.moreyeahs.com/solutions/microsoft-services/sharepoint' },
};
export default function SharePointPage() {
  return <ServicePageTemplate data={data} />;
}
