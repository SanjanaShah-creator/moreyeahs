import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web & App Development | Full-Stack Engineering | MoreYeahs',
  description: 'Build fast, scalable digital products with MoreYeahs. Expert web application development, mobile apps, UI/UX design, API engineering, and QA for modern enterprises.',
  keywords: ['web app development', 'full-stack development', 'mobile app development', 'UI/UX design', 'API engineering', 'React development', 'Next.js', 'software development company'],
  openGraph: {
    title: 'Web & App Development | Full-Stack Engineering | MoreYeahs',
    description: 'Fast, scalable web and mobile apps. Full-stack engineering, UI/UX design, and API development for modern enterprises.',
    type: 'website',
    url: 'https://moreyeahs.com/solutions/web-app-development',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web & App Development | MoreYeahs',
    description: 'Full-stack web, mobile, UI/UX and API engineering for enterprise.',
  },
  alternates: { canonical: 'https://moreyeahs.com/solutions/web-app-development' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
