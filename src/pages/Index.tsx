import { lazy, Suspense } from 'react';
import { Navigation } from '@/components/Navigation';
import { NewsTicker, defaultStatusItems } from '@/components/NewsTicker';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { Footer } from '@/components/Footer';

import { PageLoader } from '@/components/PageLoader';

const GrindingActivitySection = lazy(() =>
  import('@/components/GrindingActivitySection').then((module) => ({ default: module.GrindingActivitySection }))
);
const SkillsSection = lazy(() =>
  import('@/components/SkillsSection').then((module) => ({ default: module.SkillsSection }))
);
const CareerJourneySection = lazy(() =>
  import('@/components/CareerJourneySection').then((module) => ({ default: module.CareerJourneySection }))
);
const ProjectsSection = lazy(() =>
  import('@/components/ProjectsSection').then((module) => ({ default: module.ProjectsSection }))
);
const CaseStudiesSection = lazy(() =>
  import('@/components/CaseStudiesSection').then((module) => ({ default: module.CaseStudiesSection }))
);
const CertificationsSection = lazy(() =>
  import('@/components/CertificationsSection').then((module) => ({ default: module.CertificationsSection }))
);
const PublicationsSection = lazy(() =>
  import('@/components/PublicationsSection').then((module) => ({ default: module.PublicationsSection }))
);
const ContactSection = lazy(() =>
  import('@/components/ContactSection').then((module) => ({ default: module.ContactSection }))
);

const SectionFallback = () => (
  <div className="container mx-auto px-4 py-16 lg:px-8">
    <div className="h-48 animate-pulse rounded-3xl border border-border bg-card/70" />
  </div>
);

const Index = () => {

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageLoader />

      {/* Sticky Header Container */}
      <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center w-full">
        {/* News Ticker at Top */}
        <div className="w-full relative z-50">
          <NewsTicker items={defaultStatusItems} speed={20} />
        </div>

        {/* Navigation Wrapper - Pushed down slightly */}
        <div className="w-full mt-1 flex justify-center relative z-40">
          <Navigation />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <Suspense fallback={<SectionFallback />}>
          <GrindingActivitySection />
          <SkillsSection />
          <CareerJourneySection />
          <ProjectsSection />
          <CaseStudiesSection />
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
