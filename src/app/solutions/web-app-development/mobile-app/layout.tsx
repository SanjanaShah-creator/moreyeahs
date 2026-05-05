import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mobile App Development | MoreYeahs IT Technologies',
  description: 'iOS and Android app development — React Native, Flutter, native Swift and Kotlin, with full store submission and post-launch support.',
  keywords: ['mobile app development', 'React Native', 'Flutter', 'iOS development', 'Android development', 'app store'],
  openGraph: {
    title: 'Mobile App Development | MoreYeahs',
    description: 'Experiences people open every day.',
    url: 'https://moreyeahs.com/solutions/web-app-development/mobile-app',
  },
  alternates: { canonical: '/solutions/web-app-development/mobile-app' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
