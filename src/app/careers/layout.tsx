import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers – Join Our AI-First Team',
  description: 'Explore career opportunities at MoreYeahs IT Technologies. Join our team of engineers, data scientists, cloud architects, and Salesforce specialists building the future of AI.',
  openGraph: {
    title: 'Careers at MoreYeahs | Join Our AI-First Team',
    description: 'Open roles in AI, Data Science, Cloud, Salesforce, and Software Development at MoreYeahs IT Technologies.',
    url: 'https://www.moreyeahs.com/careers',
    type: 'website',
  },
  alternates: { canonical: 'https://www.moreyeahs.com/careers' },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
