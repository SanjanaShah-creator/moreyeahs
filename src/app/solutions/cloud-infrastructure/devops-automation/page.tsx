import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DevOps & Automation Solutions',
  description: 'CI/CD pipelines, infrastructure as code, Kubernetes, and full DevOps transformation. Deploy faster, reduce errors, and scale with confidence.',
  keywords: ['DevOps consulting','CI/CD pipelines','Kubernetes','Terraform','infrastructure as code','DevOps automation','SRE services'],
  openGraph: {
    title: 'DevOps & Automation Solutions | MoreYeahs',
    description: 'CI/CD pipelines, infrastructure as code, Kubernetes, and full DevOps transformation. Deploy faster, reduce errors, and scale with confidence.',
    url: 'https://www.moreyeahs.com/solutions/cloud-infrastructure/devops-automation',
    type: 'website',
    siteName: 'MoreYeahs IT Technologies',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'DevOps & Automation Solutions | MoreYeahs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevOps & Automation Solutions | MoreYeahs',
    description: 'CI/CD pipelines, infrastructure as code, Kubernetes, and full DevOps transformation. Deploy faster, reduce errors, and scale with confidence.',
    images: ['/images/og-image.png'],
  },
  alternates: { canonical: 'https://www.moreyeahs.com/solutions/cloud-infrastructure/devops-automation' },
};
export default function DevOpsAutomationPage() {
  return <ServicePageTemplate data={data} />;
}
