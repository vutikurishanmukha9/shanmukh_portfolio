import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDownRight, Layers, Sliders, Eye } from 'lucide-react';
import { StudioFloatingArtifact } from './StudioFloatingArtifact';

export const StudioHero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Motion values for subtle cursor-reactive typography distortion
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normalizedX = (e.clientX / innerWidth - 0.5) * 20;
      const normalizedY = (e.clientY / innerHeight - 0.5) * 20;
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
      setMousePos({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      id="studio-hero"
      className="relative pt-24 sm:pt-28 pb-4 sm:pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between select-none"
    >
      {/* Top Studio Metadata Ticker */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#0A0A0A] pb-3 text-[10px] sm:text-xs font-mono">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-bold text-[#0A0A0A] tracking-wider uppercase">
            SHANMUKH DESIGN / 01
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#FFD84D] border border-[#0A0A0A] text-[9px] sm:text-[10px] font-bold text-[#0A0A0A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A] animate-ping" />
            LIVE EXPERIENCES
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 text-[#0A0A0A]/70 text-[10px] sm:text-[11px]">
          <span className="hidden sm:inline">DISCIPLINE: PRODUCT & INTERACTION</span>
          <span className="hidden md:inline font-mono">CUR: [{mousePos.x}px, {mousePos.y}px]</span>
          <span className="font-bold text-[#0A0A0A]">INDEX: 2026.01</span>
        </div>
      </div>

      {/* Main Asymmetrical Hero Grid */}
      <div className="py-4 sm:py-6 grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        
        {/* Left Column: Typographic Contrast Title & Disciplines */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Main Giant Typographic Headline with Visual Contrast */}
          <div className="space-y-1">
            <motion.h1
              style={{ x: springX, y: springY }}
              className="font-['Space_Grotesk'] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#0A0A0A] tracking-tighter leading-[0.92] uppercase break-words"
            >
              I DESIGN
              <br />
              <span className="relative inline-block font-['Space_Grotesk'] font-light italic tracking-normal text-[#0A0A0A]/90">
                DIGITAL
                <span className="absolute -bottom-1 left-0 right-0 h-2 bg-[#FFD84D] -z-10 -rotate-1" />
              </span>
              <br />
              <span className="font-['Space_Grotesk'] font-black text-[#0A0A0A] underline decoration-[#FFD84D] decoration-8 underline-offset-4">
                EXPERIENCES.
              </span>
            </motion.h1>
          </div>

          {/* Typographic Contrast Sentence (The Designer Manifesto Trick) */}
          <div className="pt-2 max-w-xl">
            <p className="font-['Inter'] text-base sm:text-xl text-[#0A0A0A] leading-snug">
              I design <span className="font-bold text-[#0A0A0A] underline decoration-[#0A0A0A] decoration-2">things that move</span>.{' '}
              <span className="font-mono text-xs sm:text-sm tracking-tight px-1.5 py-0.5 bg-[#EAE3D2] border border-[#0A0A0A] text-[#0A0A0A]">
                interfaces that explain.
              </span>{' '}
              <span className="font-['Space_Grotesk'] font-medium italic text-[#0A0A0A]">
                products that feel obvious.
              </span>
            </p>
          </div>

          {/* Core Pillars: [01] PRODUCT, [02] INTERACTION, [03] VISUAL */}
          <div className="pt-4 flex flex-wrap gap-2.5">
            {[
              { num: '01', title: 'PRODUCT DESIGN', desc: 'Complex Systems' },
              { num: '02', title: 'INTERACTION ARCHITECTURE', desc: 'Tactile Motion' },
              { num: '03', title: 'VISUAL COMPOSITION', desc: 'Editorial Brutalism' },
            ].map((pillar) => (
              <div
                key={pillar.num}
                className="group px-3 py-2 bg-[#FFFFFF] border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] hover:bg-[#FFD84D] hover:shadow-[4px_4px_0px_#0A0A0A] transition-all cursor-default w-full sm:w-auto"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-1 bg-[#0A0A0A] text-[#E3E6E8]">
                    [{pillar.num}]
                  </span>
                  <span className="text-xs font-mono font-bold tracking-wider text-[#0A0A0A]">
                    {pillar.title}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#0A0A0A]/70 pl-6 block pt-0.5">
                  {pillar.desc}
                </span>
              </div>
            ))}
          </div>

          {/* Direct CTA Link */}
          <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <a
              href="#studio-work"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 bg-[#0A0A0A] text-[#E3E6E8] hover:bg-[#FFD84D] hover:text-[#0A0A0A] font-mono font-bold text-xs uppercase tracking-widest border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#FFD84D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              <span>EXPLORE SELECTED WORK</span>
              <ArrowDownRight className="w-4 h-4" />
            </a>

            <a
              href="#studio-lab"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-3 sm:py-2.5 bg-[#FFFFFF] text-[#0A0A0A] hover:bg-[#EAE3D2] font-mono font-semibold text-xs uppercase tracking-wider border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] transition-all"
            >
              <span className="w-2 h-2 bg-[#5B8CFF] border border-[#0A0A0A]" />
              <span>LAB // 001</span>
            </a>
          </div>
        </div>

        {/* Right Column: Signature Interactive Floating Artifact */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <StudioFloatingArtifact />
        </div>
      </div>

      {/* Bottom Editorial Meta Bar */}
      <div className="border-t-2 border-[#0A0A0A] pt-3 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#0A0A0A]/70">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#FFD84D] border border-[#0A0A0A]" />
          <span className="font-bold text-[#0A0A0A]">ESTABLISHED 2026</span>
          <span className="hidden sm:inline">· DIGITAL DESIGN STUDIO</span>
        </div>
        <div className="flex items-center gap-3">
          <span>SCROLL TO PROCEED</span>
          <span className="animate-bounce">↓</span>
        </div>
      </div>
    </section>
  );
};
