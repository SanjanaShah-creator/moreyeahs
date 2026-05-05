import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Insights',
  description: 'Technical deep-dives, field lessons, and expert perspectives on AI, Data Science, Cloud Infrastructure, Salesforce, and Microsoft — written by MoreYeahs engineers.',
  openGraph: {
    title: 'Blog & Insights | MoreYeahs IT Technologies',
    description: 'Expert perspectives on AI, Data Science, Cloud, Salesforce, and Microsoft from MoreYeahs engineers.',
    url: 'https://www.moreyeahs.com/blog',
    type: 'website',
  },
  alternates: { canonical: 'https://www.moreyeahs.com/blog' },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
