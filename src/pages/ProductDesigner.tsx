import React, { useEffect } from 'react';
import { StudioNavigation } from '@/components/design/studio/StudioNavigation';
import { StudioHero } from '@/components/design/studio/StudioHero';
import { StudioCrossTicker } from '@/components/design/studio/StudioCrossTicker';
import { StudioManifesto } from '@/components/design/studio/StudioManifesto';
import { StudioProjects } from '@/components/design/studio/StudioProjects';
import { StudioLab } from '@/components/design/studio/StudioLab';
import { StudioDesignXCode } from '@/components/design/studio/StudioDesignXCode';
import { DesignSystemStash } from '@/components/design/DesignSystemStash';
import { StudioDesignSystem } from '@/components/design/studio/StudioDesignSystem';
import { StudioDesignDesk } from '@/components/design/studio/StudioDesignDesk';
import { StudioAbout } from '@/components/design/studio/StudioAbout';
import { StudioFooter } from '@/components/design/studio/StudioFooter';

const ProductDesigner: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Shanmukh World';
  }, []);

  return (
    <div className="relative min-h-screen bg-[#E3E6E8] text-[#0A0A0A] selection:bg-[#FFD84D] selection:text-[#0A0A0A] font-['Inter'] antialiased overflow-x-hidden">
      
      {/* Editorial Graph Paper Subtle Matrix Backdrop */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #0A0A0A 1px, transparent 1px), linear-gradient(to bottom, #0A0A0A 1px, transparent 1px)',
          backgroundSize: '2.5rem 2.5rem',
        }}
      />

      {/* Floating Editorial Navigation Dock */}
      <StudioNavigation />

      {/* Main Studio Composition Flow with Tight Editorial Rhythm */}
      <main className="relative z-10">
        <StudioHero />
        <StudioCrossTicker />
        <StudioManifesto />
        <StudioProjects />
        <StudioLab />
        <StudioDesignXCode />
        <DesignSystemStash />
        <StudioDesignSystem />
        <StudioDesignDesk />
        <StudioAbout />
      </main>

      {/* Studio Signoff Footer */}
      <div className="relative z-10 mt-6 sm:mt-8">
        <StudioFooter />
      </div>
    </div>
  );
};

export default ProductDesigner;
