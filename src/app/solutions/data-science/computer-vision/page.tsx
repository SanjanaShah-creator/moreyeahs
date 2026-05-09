import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Computer Vision Solutions',
  description: 'Real-time object detection, image classification, and visual inspection for industrial and enterprise use. Computer vision built to ship to production.',
  keywords: ['computer vision','object detection','image classification','visual inspection','deep learning','OpenCV','AI vision solutions'],
  openGraph: {
    title: 'Computer Vision Solutions | MoreYeahs',
    description: 'Real-time object detection, image classification, and visual inspection for industrial and enterprise use. Computer vision built to ship to production.',
    url: 'https://www.moreyeahs.com/solutions/data-science/computer-vision',
    type: 'website',
    siteName: 'MoreYeahs IT Technologies',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Computer Vision Solutions | MoreYeahs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Computer Vision Solutions | MoreYeahs',
    description: 'Real-time object detection, image classification, and visual inspection for industrial and enterprise use. Computer vision built to ship to production.',
    images: ['/images/og-image.png'],
  },
  alternates: { canonical: 'https://www.moreyeahs.com/solutions/data-science/computer-vision' },
};
export default function ComputerVisionPage() {
  return <ServicePageTemplate data={data} />;
}
