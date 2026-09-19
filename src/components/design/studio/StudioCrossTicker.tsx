import React from 'react';

export const StudioCrossTicker: React.FC = () => {
  const tickerItemsTrack1 = [
    'SHANMUKH DESIGN STUDIO',
    'PRODUCT DESIGN',
    'INTERACTION ARCHITECTURE',
    'TACTILE HARDWARE FEEL',
    '60 FPS TACTILE MOTION',
    'FIGMA TO PRODUCTION DOM',
    'HIGH CONTRAST AAA',
    'EDITORIAL BRUTALISM',
    'ZERO DECORATIVE SLOP',
    'TACTILE DIGITAL EXPERIENCES',
  ];

  const tickerItemsTrack2 = [
    '// LAB 001 EXPERIMENTS //',
    'SYSTEM SPECIFICATIONS',
    'RECURSIVE ARCHITECTURE',
    'PHYSICAL CANVAS MESH',
    '30% TEXT / 70% EVIDENCE',
    'POLARS TELEMETRY INGEST',
    'RUNTIME PROTOTYPES',
    'INDEX 2026.01',
    'DESIGN × CODE DUAL DISCIPLINE',
  ];

  return (
    <div className="relative w-full overflow-hidden py-6 sm:py-8 my-2 sm:my-4 select-none pointer-events-none">
      {/* Background Track 2: Ink Ribbon tilted +1.5deg */}
      <div className="relative w-full -rotate-1 sm:-rotate-1.5 origin-center z-10 my-[-6px]">
        <div className="bg-[#0A0A0A] text-[#E3E6E8] border-y-3 border-[#0A0A0A] py-2 sm:py-2.5 shadow-[4px_4px_0px_rgba(10,10,10,0.3)]">
          <div className="flex w-max animate-studio-ticker-reverse">
            {[...Array(3)].map((_, groupIdx) => (
              <div key={groupIdx} className="flex items-center gap-6 sm:gap-8 shrink-0 pr-6 sm:pr-8">
                {tickerItemsTrack2.map((item, i) => (
                  <div key={i} className="flex items-center gap-6 sm:gap-8 font-mono text-[11px] sm:text-xs font-black uppercase tracking-widest">
                    <span>{item}</span>
                    <span className="w-1.5 h-1.5 bg-[#FFD84D] rotate-45 shrink-0" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Foreground Track 1: Signal Yellow Ribbon tilted -1.5deg crossing over Track 2 */}
      <div className="relative w-full rotate-1 sm:rotate-1.5 origin-center z-20 my-[-6px]">
        <div className="bg-[#FFD84D] text-[#0A0A0A] border-y-3 border-[#0A0A0A] py-2.5 sm:py-3 shadow-[6px_6px_0px_#0A0A0A]">
          <div className="flex w-max animate-studio-ticker">
            {[...Array(3)].map((_, groupIdx) => (
              <div key={groupIdx} className="flex items-center gap-6 sm:gap-8 shrink-0 pr-6 sm:pr-8">
                {tickerItemsTrack1.map((item, i) => (
                  <div key={i} className="flex items-center gap-6 sm:gap-8 font-mono text-xs sm:text-sm font-black uppercase tracking-widest text-[#0A0A0A]">
                    <span>{item}</span>
                    <span className="w-2 h-2 bg-[#0A0A0A] shrink-0" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
