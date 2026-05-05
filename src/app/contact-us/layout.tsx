import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with MoreYeahs IT Technologies. Book a free 30-minute consultation, reach our Indore (India) or Cedar Park (USA) offices, and map your AI-first roadmap.',
  openGraph: {
    title: 'Contact Us | MoreYeahs IT Technologies',
    description: 'Book a free consultation or reach MoreYeahs offices in India and the USA.',
    url: 'https://www.moreyeahs.com/contact-us',
    type: 'website',
  },
  alternates: { canonical: 'https://www.moreyeahs.com/contact-us' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
