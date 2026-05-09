import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Azure Cloud Services | MoreYeahs IT Technologies' },
  description: 'Enterprise Azure environments — landing zones, AKS, Azure security, data services, hybrid connectivity, and FinOps.',
  keywords: ['Azure', 'Microsoft Azure', 'Azure landing zone', 'AKS', 'Azure security', 'Azure migration', 'cloud governance'],
  openGraph: {
    title: 'Azure | MoreYeahs',
    description: 'Microsoft cloud, built to enterprise grade.',
    url: 'https://www.moreyeahs.com/solutions/microsoft-services/azure',
  },
  alternates: { canonical: 'https://www.moreyeahs.com/solutions/microsoft-services/azure' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
