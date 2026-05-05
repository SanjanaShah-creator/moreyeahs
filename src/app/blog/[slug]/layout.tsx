import type { Metadata } from 'next';
import { fetchPostBySlug, stripHtmlTags, getCoverImage } from '@/lib/wordpress-api';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const title = post.title.rendered.replace(/<[^>]+>/g, '');
  const description = stripHtmlTags(post.excerpt.rendered || post.content.rendered).slice(0, 155).trim();
  const coverImage = getCoverImage(post._embedded);
  const category = post._embedded?.['wp:term']?.[0]?.[0]?.name;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.date,
      section: category,
      images: coverImage ? [{ url: coverImage, alt: title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: coverImage ? [coverImage] : [],
    },
    alternates: { canonical: `https://www.moreyeahs.com/blog/${slug}` },
  };
}

export default function BlogSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
