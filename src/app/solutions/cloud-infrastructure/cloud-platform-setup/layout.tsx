import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cloud Platform Setup (AWS/GCP/Azure) | MoreYeahs IT Technologies',
  description: 'Enterprise cloud environments on AWS, GCP, and Azure — landing zones, security baselines, migration, and FinOps from day one.',
  keywords: ['cloud setup', 'AWS', 'GCP', 'Azure', 'landing zone', 'cloud migration', 'Infrastructure as Code', 'Terraform'],
  openGraph: {
    title: 'Cloud Platform Setup | MoreYeahs',
    description: 'Built right from day one. Scalable by design.',
    url: 'https://moreyeahs.com/solutions/cloud-infrastructure/cloud-platform-setup',
  },
  alternates: { canonical: '/solutions/cloud-infrastructure/cloud-platform-setup' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
