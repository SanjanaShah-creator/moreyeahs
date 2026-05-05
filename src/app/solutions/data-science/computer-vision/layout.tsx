import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Computer Vision Services | MoreYeahs IT Technologies',
  description: 'Real-time object detection, defect inspection, video analytics, and edge CV deployment — computer vision systems built for production.',
  keywords: ['computer vision', 'object detection', 'image classification', 'edge AI', 'visual inspection'],
  openGraph: {
    title: 'Computer Vision | MoreYeahs',
    description: 'Teach your systems to see — and understand.',
    url: 'https://moreyeahs.com/solutions/data-science/computer-vision',
  },
  alternates: { canonical: '/solutions/data-science/computer-vision' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
