import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Design & Quality Assurance | MoreYeahs IT Technologies',
  description: 'UX research, product design, design systems, automated testing, accessibility engineering, and QA strategy — design and quality as a discipline.',
  keywords: ['UX design', 'design system', 'QA automation', 'WCAG accessibility', 'Playwright', 'UI design', 'quality assurance'],
  openGraph: {
    title: 'Design & Quality | MoreYeahs',
    description: 'Beautiful by design. Reliable by test.',
    url: 'https://moreyeahs.com/solutions/web-app-development/design-quality',
  },
  alternates: { canonical: '/solutions/web-app-development/design-quality' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
