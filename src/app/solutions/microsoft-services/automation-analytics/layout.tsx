import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Microsoft Automation & Analytics | MoreYeahs IT Technologies',
  description: 'Power Platform, Power BI, Power Automate, and Azure — eliminate manual work and deliver real-time intelligence across your organization.',
  keywords: ['Power Platform', 'Power BI', 'Power Automate', 'Power Apps', 'Microsoft automation', 'RPA', 'analytics'],
  openGraph: {
    title: 'Microsoft Automation & Analytics | MoreYeahs',
    description: 'Automate the routine. Illuminate the important.',
    url: 'https://moreyeahs.com/solutions/microsoft-services/automation-analytics',
  },
  alternates: { canonical: '/solutions/microsoft-services/automation-analytics' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
