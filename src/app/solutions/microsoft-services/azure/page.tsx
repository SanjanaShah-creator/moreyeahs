import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Microsoft Azure Cloud Solutions',
  description: 'Azure cloud architecture, migration, and managed services. Enterprise-grade Azure environments built for reliability, security, and scale.',
  keywords: ['Azure cloud','Azure migration','Azure managed services','Microsoft Azure consulting','Azure architecture','cloud India'],
  openGraph: {
    title: 'Microsoft Azure Cloud Solutions | MoreYeahs',
    description: 'Azure cloud architecture, migration, and managed services. Enterprise-grade Azure environments built for reliability, security, and scale.',
    url: 'https://www.moreyeahs.com/solutions/microsoft-services/azure',
    type: 'website',
    siteName: 'MoreYeahs IT Technologies',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Microsoft Azure Cloud Solutions | MoreYeahs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Microsoft Azure Cloud Solutions | MoreYeahs',
    description: 'Azure cloud architecture, migration, and managed services. Enterprise-grade Azure environments built for reliability, security, and scale.',
    images: ['/images/og-image.png'],
  },
  alternates: { canonical: 'https://www.moreyeahs.com/solutions/microsoft-services/azure' },
};
export default function AzurePage() {
  return <ServicePageTemplate data={data} />;
}
