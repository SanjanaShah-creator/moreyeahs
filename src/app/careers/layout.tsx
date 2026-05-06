import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers – Join Our AI-First Team',
  description: 'Explore career opportunities at MoreYeahs IT Technologies. Join our team of engineers, data scientists, cloud architects, and Salesforce specialists building the future of AI.',
  keywords: ['careers at MoreYeahs', 'IT jobs India', 'AI engineer jobs', 'data science jobs', 'Salesforce jobs', 'cloud engineer jobs', 'software developer jobs Indore', 'remote IT jobs'],
  openGraph: {
    title: 'Careers at MoreYeahs | Join Our AI-First Team',
    description: 'Open roles in AI, Data Science, Cloud, Salesforce, and Software Development at MoreYeahs IT Technologies.',
    url: 'https://www.moreyeahs.com/careers',
    type: 'website',
  },
  alternates: { canonical: 'https://www.moreyeahs.com/careers' },
};

const jobPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Open Positions at MoreYeahs IT Technologies',
  description: 'Current job openings at MoreYeahs IT Technologies across AI, Data Science, Cloud, Salesforce, and Software Development.',
  url: 'https://www.moreyeahs.com/careers',
  itemListElement: [
    {
      '@type': 'JobPosting',
      title: 'Senior ML Engineer',
      description: 'Design and deploy production-grade ML pipelines and model serving infrastructure for enterprise clients across healthcare and fintech.',
      hiringOrganization: {
        '@type': 'Organization',
        name: 'MoreYeahs IT Technologies',
        sameAs: 'https://www.moreyeahs.com',
        logo: 'https://www.moreyeahs.com/images/MoreYeahs White theme Logo.png',
      },
      jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressCountry: 'IN' } },
      jobLocationType: 'TELECOMMUTE',
      employmentType: 'FULL_TIME',
      url: 'https://www.moreyeahs.com/careers/senior-ml-engineer',
      datePosted: '2025-01-01',
    },
    {
      '@type': 'JobPosting',
      title: 'Full Stack Developer',
      description: 'Build scalable web applications using Next.js, TypeScript, and Node.js. Work with designers and clients to ship polished, high-performance products.',
      hiringOrganization: {
        '@type': 'Organization',
        name: 'MoreYeahs IT Technologies',
        sameAs: 'https://www.moreyeahs.com',
      },
      jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressCountry: 'IN' } },
      jobLocationType: 'TELECOMMUTE',
      employmentType: 'FULL_TIME',
      url: 'https://www.moreyeahs.com/careers/full-stack-developer',
      datePosted: '2025-01-01',
    },
    {
      '@type': 'JobPosting',
      title: 'Salesforce Developer',
      description: 'Implement and customise Salesforce solutions including Sales Cloud, CPQ, and custom Lightning components for enterprise rollouts.',
      hiringOrganization: {
        '@type': 'Organization',
        name: 'MoreYeahs IT Technologies',
        sameAs: 'https://www.moreyeahs.com',
      },
      jobLocation: {
        '@type': 'Place',
        address: { '@type': 'PostalAddress', addressLocality: 'Indore', addressRegion: 'MP', addressCountry: 'IN' },
      },
      employmentType: 'FULL_TIME',
      url: 'https://www.moreyeahs.com/careers/salesforce-developer',
      datePosted: '2025-01-01',
    },
    {
      '@type': 'JobPosting',
      title: 'DevOps / Cloud Engineer',
      description: 'Architect and maintain cloud infrastructure on AWS and GCP. Drive IaC adoption, manage CI/CD pipelines, and enforce security and compliance best practices.',
      hiringOrganization: {
        '@type': 'Organization',
        name: 'MoreYeahs IT Technologies',
        sameAs: 'https://www.moreyeahs.com',
      },
      jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressCountry: 'IN' } },
      jobLocationType: 'TELECOMMUTE',
      employmentType: 'FULL_TIME',
      url: 'https://www.moreyeahs.com/careers/devops-cloud-engineer',
      datePosted: '2025-01-01',
    },
  ],
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />
      {children}
    </>
  );
}
