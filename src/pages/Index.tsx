import { useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { GrindingActivitySection } from '@/components/GrindingActivitySection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { CaseStudiesSection } from '@/components/CaseStudiesSection';
import { SkillsSection } from '@/components/SkillsSection';
import { CareerJourneySection } from '@/components/CareerJourneySection';
import { CertificationsSection } from '@/components/CertificationsSection';
import { PublicationsSection } from '@/components/PublicationsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

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
        <GrindingActivitySection />
        <ProjectsSection />
        <CaseStudiesSection />
        <SkillsSection />
        <CareerJourneySection />
        <CertificationsSection />
        <PublicationsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
