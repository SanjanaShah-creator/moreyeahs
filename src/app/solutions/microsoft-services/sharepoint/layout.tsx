import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'SharePoint Services | MoreYeahs IT Technologies' },
  description: 'Modern SharePoint intranets, document management systems, migrations, SPFx development, and governance built for real adoption.',
  keywords: ['SharePoint', 'SharePoint intranet', 'SharePoint Online', 'document management', 'SharePoint migration', 'SPFx'],
  openGraph: {
    title: 'SharePoint | MoreYeahs',
    description: 'Your intranet. Your knowledge base. Built to be used.',
    url: 'https://www.moreyeahs.com/solutions/microsoft-services/sharepoint',
  },
  alternates: { canonical: 'https://www.moreyeahs.com/solutions/microsoft-services/sharepoint' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
