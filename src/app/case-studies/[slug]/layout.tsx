import type { Metadata } from 'next';
import { fetchCaseStudyBySlug, stripHtmlTags, getCoverImage } from '@/lib/wordpress-api';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = await fetchCaseStudyBySlug(slug);
  if (!study) {
    return {
      title: 'Case Study Not Found',
      description: 'The requested case study could not be found.',
    };
  }

  const title = study.title.rendered.replace(/<[^>]+>/g, '');
  const description = stripHtmlTags(study.excerpt.rendered || study.content.rendered).slice(0, 155).trim();
  const coverImage = getCoverImage(study._embedded);
  const category = study._embedded?.['wp:term']?.[0]?.[0]?.name;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: study.date,
      section: category,
      images: coverImage ? [{ url: coverImage, alt: title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: coverImage ? [coverImage] : [],
    },
    alternates: { canonical: `https://www.moreyeahs.com/case-study/${slug}` },
  };
}

export default function CaseStudySlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
