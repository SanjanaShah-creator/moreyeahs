import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IoT & Connected Systems',
  description: 'End-to-end IoT platforms, edge computing, and real-time sensor integration. Connect your physical and digital worlds at enterprise scale.',
  keywords: ['IoT solutions','connected systems','edge computing','sensor integration','industrial IoT','IoT platform','smart systems'],
  openGraph: {
    title: 'IoT & Connected Systems | MoreYeahs',
    description: 'End-to-end IoT platforms, edge computing, and real-time sensor integration. Connect your physical and digital worlds at enterprise scale.',
    url: 'https://www.moreyeahs.com/solutions/data-science/iot-connected-systems',
    type: 'website',
    siteName: 'MoreYeahs IT Technologies',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'IoT & Connected Systems | MoreYeahs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IoT & Connected Systems | MoreYeahs',
    description: 'End-to-end IoT platforms, edge computing, and real-time sensor integration. Connect your physical and digital worlds at enterprise scale.',
    images: ['/images/og-image.png'],
  },
  alternates: { canonical: 'https://www.moreyeahs.com/solutions/data-science/iot-connected-systems' },
};
export default function IoTConnectedSystemsPage() {
  return <ServicePageTemplate data={data} />;
}
