import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UI/UX Design & Quality Assurance',
  description: 'End-to-end UX design, QA testing, and performance optimisation. Products that look excellent and function flawlessly across every device.',
  keywords: ['UI UX design','quality assurance','QA testing','usability testing','UX consulting','design systems','QA services India'],
  openGraph: {
    title: 'UI/UX Design & Quality Assurance | MoreYeahs',
    description: 'End-to-end UX design, QA testing, and performance optimisation. Products that look excellent and function flawlessly across every device.',
    url: 'https://www.moreyeahs.com/solutions/web-app-development/design-quality',
    type: 'website',
    siteName: 'MoreYeahs IT Technologies',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'UI/UX Design & Quality Assurance | MoreYeahs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UI/UX Design & Quality Assurance | MoreYeahs',
    description: 'End-to-end UX design, QA testing, and performance optimisation. Products that look excellent and function flawlessly across every device.',
    images: ['/images/og-image.png'],
  },
  alternates: { canonical: 'https://www.moreyeahs.com/solutions/web-app-development/design-quality' },
};
export default function DesignQualityPage() {
  return <ServicePageTemplate data={data} />;
}
