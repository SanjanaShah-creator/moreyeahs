import dynamic from 'next/dynamic';
import HeroSection from '@/components/home/HeroSection';

const SolutionsSection    = dynamic(() => import('@/components/home/SolutionsSection'));
const IndustriesSection   = dynamic(() => import('@/components/home/IndustriesSection'));
const CompanyStory        = dynamic(() => import('@/components/home/CompanyStory'));
const CaseStudiesSection  = dynamic(() => import('@/components/home/CaseStudiesSection'));
const ClientLogosSection  = dynamic(() => import('@/components/home/ClientLogosSection'));
const TestimonialsSection = dynamic(() => import('@/components/home/TestimonialsSection'));
const CTASection          = dynamic(() => import('@/components/home/CTASection'));

export default function Home() {
  return (
    <>
      <HeroSection />
      <SolutionsSection />
      <IndustriesSection />
      <CompanyStory />
      <CaseStudiesSection />
      <ClientLogosSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
