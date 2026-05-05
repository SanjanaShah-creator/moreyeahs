import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Application Development | MoreYeahs IT Technologies',
  description: 'Full-stack web development — SaaS, APIs, PWAs, e-commerce, legacy modernization, and performance engineering built to last.',
  keywords: ['web application development', 'full-stack development', 'Next.js', 'React', 'SaaS development', 'API development'],
  openGraph: {
    title: 'Web Application Development | MoreYeahs',
    description: 'Fast, scalable, and built to last.',
    url: 'https://moreyeahs.com/solutions/web-app-development/web-application',
  },
  alternates: { canonical: '/solutions/web-app-development/web-application' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
