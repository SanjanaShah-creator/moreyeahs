import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Data Science & AI Solutions | Machine Learning & Analytics | MoreYeahs' },
  description: 'Transform your business with MoreYeahs data science expertise. AI/ML engineering, predictive analytics, computer vision, data engineering, and IoT solutions for enterprise at scale.',
  keywords: ['data science', 'AI solutions', 'machine learning', 'predictive analytics', 'computer vision', 'data engineering', 'IoT analytics', 'AI consulting', 'enterprise AI'],
  openGraph: {
    title: 'Data Science & AI Solutions | Machine Learning & Analytics | MoreYeahs',
    description: 'AI/ML engineering, predictive analytics, computer vision and data engineering for enterprise digital transformation.',
    type: 'website',
    url: 'https://www.moreyeahs.com/solutions/data-science',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Science & AI Solutions | MoreYeahs',
    description: 'AI/ML, predictive analytics, computer vision and data engineering for enterprise.',
  },
  alternates: { canonical: 'https://www.moreyeahs.com/solutions/data-science' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
