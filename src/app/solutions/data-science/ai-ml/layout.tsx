import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI & Machine Learning Services | MoreYeahs IT Technologies',
  description: 'Production-grade AI and ML systems — predictive models, LLMs, MLOps, and recommendation engines built for your data and scale.',
  keywords: ['AI consulting', 'machine learning', 'predictive modeling', 'LLM', 'MLOps', 'deep learning'],
  openGraph: {
    title: 'AI & Machine Learning | MoreYeahs',
    description: 'Machines that learn. Outcomes that matter.',
    url: 'https://moreyeahs.com/solutions/data-science/ai-ml',
  },
  alternates: { canonical: '/solutions/data-science/ai-ml' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
