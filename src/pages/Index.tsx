import { lazy, Suspense, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { Footer } from '@/components/Footer';

const ProjectsSection = lazy(() =>
  import('@/components/ProjectsSection').then((module) => ({ default: module.ProjectsSection }))
);
const CaseStudiesSection = lazy(() =>
  import('@/components/CaseStudiesSection').then((module) => ({ default: module.CaseStudiesSection }))
);
const SkillsSection = lazy(() =>
  import('@/components/SkillsSection').then((module) => ({ default: module.SkillsSection }))
);
const CareerJourneySection = lazy(() =>
  import('@/components/CareerJourneySection').then((module) => ({ default: module.CareerJourneySection }))
);
const CertificationsSection = lazy(() =>
  import('@/components/CertificationsSection').then((module) => ({ default: module.CertificationsSection }))
);
const PublicationsSection = lazy(() =>
  import('@/components/PublicationsSection').then((module) => ({ default: module.PublicationsSection }))
);
const GrindingActivitySection = lazy(() =>
  import('@/components/GrindingActivitySection').then((module) => ({ default: module.GrindingActivitySection }))
);
const ContactSection = lazy(() =>
  import('@/components/ContactSection').then((module) => ({ default: module.ContactSection }))
);

const SectionFallback = () => (
  <div className="container mx-auto px-4 py-16 lg:px-8">
    <div className="h-48 animate-pulse rounded-2xl border border-border bg-card/60" />
  </div>
);

const Index = () => {
  useEffect(() => {
    document.title = 'Shanmukh Vutikuri - All You Need to Know';
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden">
      {/* Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full">
        <Navigation />
      </header>

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <Suspense fallback={<SectionFallback />}>
          <GrindingActivitySection />
          <ProjectsSection />
          <CaseStudiesSection />
          <SkillsSection />
          <CareerJourneySection />
          <CertificationsSection />
          <PublicationsSection />
          <ContactSection />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
