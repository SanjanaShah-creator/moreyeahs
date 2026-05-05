import HeroSection         from '@/components/home/HeroSection';
import SolutionsSection    from '@/components/home/SolutionsSection';
import IndustriesSection   from '@/components/home/IndustriesSection';
import CompanyStory        from '@/components/home/CompanyStory';
import CaseStudiesSection  from '@/components/home/CaseStudiesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection          from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <SolutionsSection />
      <IndustriesSection />
      <CompanyStory />
      <CaseStudiesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
