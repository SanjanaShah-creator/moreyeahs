import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Data Infrastructure Services | MoreYeahs IT Technologies' },
  description: 'Modern data lakehouse, ETL pipelines, streaming infrastructure, data governance, and cloud warehouse optimization.',
  keywords: ['data infrastructure', 'data lakehouse', 'ETL pipelines', 'dbt', 'Snowflake', 'BigQuery', 'data governance'],
  openGraph: {
    title: 'Data Infrastructure | MoreYeahs',
    description: 'The foundation every data team deserves.',
    url: 'https://www.moreyeahs.com/solutions/data-science/data-infrastructure',
  },
  alternates: { canonical: 'https://www.moreyeahs.com/solutions/data-science/data-infrastructure' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
