import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI & Machine Learning Solutions',
  description: 'Production-grade AI and ML — predictive models, LLM/RAG architectures, MLOps, and recommendation engines built around your actual business goals.',
  keywords: ['AI consulting','machine learning','LLM','RAG architecture','MLOps','predictive modeling','generative AI','AI solutions India'],
  openGraph: {
    title: 'AI & Machine Learning Solutions | MoreYeahs',
    description: 'Production-grade AI and ML — predictive models, LLM/RAG architectures, MLOps, and recommendation engines built around your actual business goals.',
    url: 'https://www.moreyeahs.com/solutions/data-science/ai-ml',
    type: 'website',
    siteName: 'MoreYeahs IT Technologies',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'AI & Machine Learning Solutions | MoreYeahs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI & Machine Learning Solutions | MoreYeahs',
    description: 'Production-grade AI and ML — predictive models, LLM/RAG architectures, MLOps, and recommendation engines built around your actual business goals.',
    images: ['/images/og-image.png'],
  },
  alternates: { canonical: 'https://www.moreyeahs.com/solutions/data-science/ai-ml' },
};
export default function AIMLPage() {
  return <ServicePageTemplate data={data} />;
}
