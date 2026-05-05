import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about MoreYeahs IT Technologies — an AI-first IT services company with offices in Indore, India and Cedar Park, USA. Our mission, values, and team.',
  openGraph: {
    title: 'About Us | MoreYeahs IT Technologies',
    description: 'AI-first IT services company with offices in India and the USA. Our mission, values, and the team behind MoreYeahs.',
    url: 'https://www.moreyeahs.com/about',
    type: 'website',
  },
  alternates: { canonical: 'https://www.moreyeahs.com/about' },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
