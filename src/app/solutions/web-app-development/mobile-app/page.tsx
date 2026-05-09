import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mobile App Development (iOS & Android)',
  description: 'Native and cross-platform mobile apps for iOS and Android. Beautiful, performant products designed and built for real users.',
  keywords: ['mobile app development','iOS app','Android app','React Native','Flutter','cross-platform mobile','app development India'],
  openGraph: {
    title: 'Mobile App Development | MoreYeahs',
    description: 'Native and cross-platform mobile apps for iOS and Android. Beautiful, performant products designed and built for real users.',
    url: 'https://www.moreyeahs.com/solutions/web-app-development/mobile-app',
    type: 'website',
    siteName: 'MoreYeahs IT Technologies',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Mobile App Development | MoreYeahs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mobile App Development | MoreYeahs',
    description: 'Native and cross-platform mobile apps for iOS and Android. Beautiful, performant products designed and built for real users.',
    images: ['/images/og-image.png'],
  },
  alternates: { canonical: 'https://www.moreyeahs.com/solutions/web-app-development/mobile-app' },
};
export default function MobileAppPage() {
  return <ServicePageTemplate data={data} />;
}
