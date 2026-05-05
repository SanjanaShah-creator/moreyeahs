import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IoT & Connected Systems | MoreYeahs IT Technologies',
  description: 'End-to-end IoT solutions — edge computing, predictive maintenance, real-time analytics, and device management at scale.',
  keywords: ['IoT', 'connected systems', 'edge computing', 'predictive maintenance', 'industrial IoT', 'smart buildings'],
  openGraph: {
    title: 'IoT & Connected Systems | MoreYeahs',
    description: 'Connect the physical world. Extract its intelligence.',
    url: 'https://moreyeahs.com/solutions/data-science/iot-connected-systems',
  },
  alternates: { canonical: '/solutions/data-science/iot-connected-systems' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
