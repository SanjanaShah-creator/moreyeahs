import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IT Solutions & Services',
  description: 'End-to-end IT solutions from MoreYeahs: AI & Data Science, Cloud Infrastructure, Salesforce, Microsoft (Dynamics 365, Power Platform), and Web & App Development.',
  openGraph: {
    title: 'IT Solutions & Services | MoreYeahs IT Technologies',
    description: 'AI & Data Science, Cloud, Salesforce, Microsoft, and Web Development solutions for forward-thinking businesses.',
    url: 'https://www.moreyeahs.com/solutions',
    type: 'website',
  },
  alternates: { canonical: 'https://www.moreyeahs.com/solutions' },
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
