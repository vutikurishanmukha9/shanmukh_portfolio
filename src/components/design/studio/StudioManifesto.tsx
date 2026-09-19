import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Layers } from 'lucide-react';

export const StudioManifesto: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-6 sm:py-10 border-t-3 border-b-3 border-[#0A0A0A] bg-[#FFFFFF] shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[6px_6px_0px_#0A0A0A] select-none my-3 sm:my-5">
      
      {/* Decorative Technical Label Header */}
      <div className="flex items-center justify-between border-b-2 border-[#0A0A0A] pb-3 mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#FFD84D] border border-[#0A0A0A]" />
          <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#0A0A0A]">
            00 / THE STUDIO MANIFESTO
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase font-bold text-[#0A0A0A]/60">
          CORE PHILOSOPHY
        </span>
      </div>

      {/* The Giant Statement */}
      <div className="max-w-5xl space-y-4 sm:space-y-6">
        <h2 className="font-['Space_Grotesk'] text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0A0A0A] tracking-tight leading-[1.1] sm:leading-[1.05] uppercase break-words">
          I TURN <span className="bg-[#FFD84D] px-2 py-0.5 border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] sm:shadow-[3px_3px_0px_#0A0A0A] inline-block">COMPLICATED IDEAS</span> INTO INTERFACES PEOPLE CAN UNDERSTAND.
        </h2>

        <div className="grid md:grid-cols-12 gap-6 pt-2 sm:pt-4 items-start">
          <div className="md:col-span-8">
            <p className="font-['Inter'] text-base sm:text-lg text-[#0A0A0A]/85 leading-relaxed">
              Software is not difficult because there is too much data. It is difficult because the critical insight is buried under thoughtless hierarchies. In this studio, every component is sculpted with physical weight, clear contrast, and deliberate tactile motion — transforming chaotic backend engineering into interfaces that feel immediately obvious.
            </p>
          </div>

          <div className="md:col-span-4 p-4 bg-[#E3E6E8] border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0A0A0A] block">
              THE DESIGN RULE
            </span>
            <p className="text-xs font-mono text-[#0A0A0A]/80 leading-normal">
              30% Text / 70% Visual Evidence. Never describe an interface when you can let the user touch it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
