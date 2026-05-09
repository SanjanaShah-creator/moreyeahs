import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Application Development',
  description: 'Custom web applications built with React, Next.js, and modern stacks. Fast, scalable, and designed to grow with your business.',
  keywords: ['web application development','React development','Next.js','custom web app','full-stack development','web dev India'],
  openGraph: {
    title: 'Web Application Development | MoreYeahs',
    description: 'Custom web applications built with React, Next.js, and modern stacks. Fast, scalable, and designed to grow with your business.',
    url: 'https://www.moreyeahs.com/solutions/web-app-development/web-application',
    type: 'website',
    siteName: 'MoreYeahs IT Technologies',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Web Application Development | MoreYeahs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Application Development | MoreYeahs',
    description: 'Custom web applications built with React, Next.js, and modern stacks. Fast, scalable, and designed to grow with your business.',
    images: ['/images/og-image.png'],
  },
  alternates: { canonical: 'https://www.moreyeahs.com/solutions/web-app-development/web-application' },
};
export default function WebApplicationPage() {
  return <ServicePageTemplate data={data} />;
}
