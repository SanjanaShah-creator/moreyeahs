import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Infrastructure & Engineering',
  description: 'Scalable data pipelines, lakehouse architecture, and real-time streaming. Build the data foundation your business needs to grow with confidence.',
  keywords: ['data infrastructure','data pipelines','data lakehouse','real-time streaming','dbt','Spark','data engineering India'],
  openGraph: {
    title: 'Data Infrastructure & Engineering | MoreYeahs',
    description: 'Scalable data pipelines, lakehouse architecture, and real-time streaming. Build the data foundation your business needs to grow with confidence.',
    url: 'https://www.moreyeahs.com/solutions/data-science/data-infrastructure',
    type: 'website',
    siteName: 'MoreYeahs IT Technologies',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Data Infrastructure & Engineering | MoreYeahs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Infrastructure & Engineering | MoreYeahs',
    description: 'Scalable data pipelines, lakehouse architecture, and real-time streaming. Build the data foundation your business needs to grow with confidence.',
    images: ['/images/og-image.png'],
  },
  alternates: { canonical: 'https://www.moreyeahs.com/solutions/data-science/data-infrastructure' },
};
export default function DataInfrastructurePage() {
  return <ServicePageTemplate data={data} />;
}
