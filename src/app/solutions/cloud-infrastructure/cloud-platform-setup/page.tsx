import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cloud Platform Setup – AWS, GCP & Azure',
  description: 'Expert cloud migration, multi-cloud architecture, and platform setup on AWS, Google Cloud, and Azure. Zero-downtime transitions built for scale.',
  keywords: ['AWS setup','GCP cloud','Azure migration','cloud platform','multi-cloud architecture','cloud consulting India','cloud setup services'],
  openGraph: {
    title: 'Cloud Platform Setup – AWS, GCP & Azure | MoreYeahs',
    description: 'Expert cloud migration, multi-cloud architecture, and platform setup on AWS, Google Cloud, and Azure. Zero-downtime transitions built for scale.',
    url: 'https://www.moreyeahs.com/solutions/cloud-infrastructure/cloud-platform-setup',
    type: 'website',
    siteName: 'MoreYeahs IT Technologies',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Cloud Platform Setup – AWS, GCP & Azure | MoreYeahs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cloud Platform Setup – AWS, GCP & Azure | MoreYeahs',
    description: 'Expert cloud migration, multi-cloud architecture, and platform setup on AWS, Google Cloud, and Azure. Zero-downtime transitions built for scale.',
    images: ['/images/og-image.png'],
  },
  alternates: { canonical: 'https://www.moreyeahs.com/solutions/cloud-infrastructure/cloud-platform-setup' },
};
export default function CloudPlatformSetupPage() {
  return <ServicePageTemplate data={data} />;
}
