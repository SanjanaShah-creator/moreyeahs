import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies – Real Results',
  description: 'See how MoreYeahs has helped businesses across industries solve complex challenges in AI, Cloud Infrastructure, Salesforce, Microsoft, and Digital Transformation.',
  keywords: ['MoreYeahs case studies', 'AI case studies', 'Salesforce implementation results', 'cloud migration case study', 'digital transformation examples', 'IT project results'],
  openGraph: {
    title: 'Case Studies – Real Results | MoreYeahs IT Technologies',
    description: 'Proof-driven results: see how MoreYeahs solved hard problems for clients across industries.',
    url: 'https://www.moreyeahs.com/case-studies',
    type: 'website',
  },
  alternates: { canonical: 'https://www.moreyeahs.com/case-studies' },
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
