import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/shared/Providers';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingChat from '@/components/shared/FloatingChat';
import CursorGlow from '@/components/shared/CursorGlow';
import LeadCapturePopup from '@/components/shared/LeadCapturePopup';
import AnnouncementBanner from '@/components/shared/AnnouncementBanner';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.moreyeahs.com'),
  title: {
    default: 'MoreYeahs IT Technologies – AI-First Digital Engineering',
    template: '%s | MoreYeahs',
  },
  description: 'MoreYeahs is an AI-first IT services company specialising in Data Science & AI, Cloud Infrastructure, Salesforce, Microsoft, and Web Development. Offices in India and the USA.',
  keywords: [
    'AI consulting', 'data science', 'machine learning', 'cloud infrastructure',
    'Salesforce consulting', 'Microsoft services', 'Dynamics 365', 'Power Platform',
    'software development', 'digital transformation', 'IT services Indore',
    'IT company India', 'MoreYeahs', 'web app development',
  ],
  authors: [{ name: 'MoreYeahs IT Technologies', url: 'https://www.moreyeahs.com' }],
  creator: 'MoreYeahs IT Technologies',
  publisher: 'MoreYeahs IT Technologies',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'MoreYeahs IT Technologies',
    title: 'MoreYeahs IT Technologies – AI-First Digital Engineering',
    description: 'Building intelligent, scalable, and future-ready digital ecosystems through AI, Data, and Cloud-native engineering.',
    url: 'https://www.moreyeahs.com',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MoreYeahs IT Technologies – AI-First Digital Engineering',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@moreyeahs',
    title: 'MoreYeahs IT Technologies – AI-First Digital Engineering',
    description: 'Building intelligent, scalable, and future-ready digital ecosystems through AI, Data, and Cloud-native engineering.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: {
    canonical: 'https://www.moreyeahs.com',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MoreYeahs IT Technologies',
  url: 'https://www.moreyeahs.com',
  logo: 'https://www.moreyeahs.com/images/MoreYeahs White theme Logo.png',
  description: 'AI-first IT services company specialising in Data Science, Cloud, Salesforce, Microsoft, and Web Development.',
  foundingDate: '2020',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-93299-11531',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: 'English',
    },
    {
      '@type': 'ContactPoint',
      telephone: '+1-252-349-2546',
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: 'English',
    },
  ],
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: '4th Floor, B Zone Business Spaces, Nipania Main Rd',
      addressLocality: 'Indore',
      addressRegion: 'MP',
      postalCode: '452010',
      addressCountry: 'IN',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: '2105, 801 C-Bar Ranch Trl',
      addressLocality: 'Cedar Park',
      addressRegion: 'TX',
      postalCode: '78613',
      addressCountry: 'US',
    },
  ],
  sameAs: [
    'https://www.linkedin.com/company/moreyeahs',
    'https://twitter.com/moreyeahs',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}try{document.documentElement.style.setProperty('--ann-h',localStorage.getItem('ann_wahinn_v1')?'0px':'44px')}catch(e){}})()`,
        }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={manrope.variable}>
        <Providers>
          <CursorGlow />
          <AnnouncementBanner />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatingChat />
          <LeadCapturePopup />
        </Providers>
      </body>
    </html>
  );
}
