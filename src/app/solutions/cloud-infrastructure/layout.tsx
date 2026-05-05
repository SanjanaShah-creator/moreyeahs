import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cloud & Infrastructure Solutions | MoreYeahs',
  description: 'Build resilient, scalable cloud infrastructure with MoreYeahs. Expert AWS, GCP, Azure architecture, DevOps automation, cloud migration, and Infrastructure as Code for enterprise.',
  keywords: ['cloud infrastructure', 'AWS solutions', 'GCP', 'Azure', 'DevOps automation', 'cloud migration', 'infrastructure as code', 'CI/CD pipelines', 'cloud consulting'],
  openGraph: {
    title: 'Cloud & Infrastructure Solutions | MoreYeahs',
    description: 'Build resilient, scalable cloud infrastructure. Expert AWS, GCP, Azure architecture and DevOps automation for enterprise.',
    type: 'website',
    url: 'https://moreyeahs.com/solutions/cloud-infrastructure',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cloud & Infrastructure Solutions | MoreYeahs',
    description: 'Expert AWS, GCP, Azure architecture and DevOps for enterprise cloud scale.',
  },
  alternates: { canonical: 'https://moreyeahs.com/solutions/cloud-infrastructure' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
