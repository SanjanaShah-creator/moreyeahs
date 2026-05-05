import CaseStudyPage from '@/app/case-studies/[slug]/page';

export default async function Page({ params }: { params: { slug: string } }) {
  return await CaseStudyPage({ params: Promise.resolve(params) });
}
