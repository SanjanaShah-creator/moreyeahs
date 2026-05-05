import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DevOps & Automation Services | MoreYeahs IT Technologies',
  description: 'CI/CD pipelines, Kubernetes, GitOps, DevSecOps, SRE, and platform engineering — ship faster with confidence.',
  keywords: ['DevOps', 'CI/CD', 'Kubernetes', 'GitOps', 'Terraform', 'platform engineering', 'SRE', 'automation'],
  openGraph: {
    title: 'DevOps & Automation | MoreYeahs',
    description: 'Ship faster. Break less. Sleep better.',
    url: 'https://moreyeahs.com/solutions/cloud-infrastructure/devops-automation',
  },
  alternates: { canonical: '/solutions/cloud-infrastructure/devops-automation' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
