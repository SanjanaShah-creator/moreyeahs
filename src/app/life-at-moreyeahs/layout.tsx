import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Life at MoreYeahs – Culture, Values & Team',
  description: 'Discover what it\'s like to work at MoreYeahs IT Technologies. Our culture, values, team events, perks, and the people who make MoreYeahs a great place to build your career.',
  keywords: ['life at MoreYeahs', 'MoreYeahs culture', 'IT company culture India', 'work at MoreYeahs', 'team culture', 'company values'],
  openGraph: {
    title: 'Life at MoreYeahs – Culture, Values & Team',
    description: 'Our culture, values, team events, and perks. See what makes MoreYeahs a great place to grow your career.',
    url: 'https://www.moreyeahs.com/life-at-moreyeahs',
    type: 'website',
  },
  alternates: { canonical: 'https://www.moreyeahs.com/life-at-moreyeahs' },
};

export default function LifeAtMoreYeahsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
