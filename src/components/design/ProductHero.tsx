import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck, Layers, Terminal, Activity, Box } from 'lucide-react';
import { useSound } from '@/hooks/useSound';
import FluidOrb from '@/components/ui/fluid-orb';
import { DesignWorkstationCanvas } from './DesignWorkstationCanvas';
import { RecruiterPersonaSelector } from './RecruiterPersonaSelector';

export const ProductHero: React.FC = () => {
  const { playClick } = useSound();
  const [isExecutiveMode, setIsExecutiveMode] = useState(false);
  const [orbColor, setOrbColor] = useState('#1A73F2');

  const scrollToSection = (id: string) => {
    playClick(800, 0.03, 'sine');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleExecutiveMode = () => {
    playClick(isExecutiveMode ? 650 : 900, 0.03, 'triangle');
    setIsExecutiveMode(!isExecutiveMode);
  };

  return (
    <section id="hero" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-20 sm:pt-24 pb-8 select-none overflow-hidden">
      
      {/* Background Technical Hairline Matrix Grid (Linear & Raycast Aesthetic) */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '3rem 3rem'
        }}
      />

      {/* Ambient WebGL Fluid Orb Backdrop (Rare UI swamimalode07/rare-ui/fluid-orb) */}
      <div className="pointer-events-none absolute -top-12 sm:-top-6 right-[-20px] sm:right-4 lg:right-12 z-0 opacity-45 sm:opacity-60 transition-opacity duration-700 select-none">
        <div className="relative">
          <FluidOrb 
            size={340} 
            color={orbColor} 
            className="scale-75 sm:scale-95 lg:scale-110 filter drop-shadow-[0_0_50px_rgba(0,0,0,0.6)]" 
          />
          {/* Ethereal atmospheric diffuse illumination */}
          <div 
            className="absolute inset-0 rounded-full blur-[100px] opacity-25 -z-10 transition-colors duration-700"
            style={{ backgroundColor: orbColor }}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* HERO STAGE: LEFT TYPOGRAPHY & BIO  vs  RIGHT INTERACTIVE WORKSTATION */}
      {/* ========================================================================= */}
      <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-8 items-center">
        
        {/* Left Column: Headline, Pill, Discipline Strip & Bio (7 Columns) */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Top Control Strip: Disciplinary Pill Badge + 60s Executive Dossier + Fluid Orb Controller */}
          <div className="flex flex-wrap items-center gap-2.5">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111218] border border-white/10 text-[10.5px] font-mono tracking-widest text-white/90 uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
              <span>STAFF PRODUCT DESIGNER</span>
            </motion.div>

            {/* Fast-Track 60s Recruiter / Executive Dossier Switcher */}
            <button
              type="button"
              onClick={toggleExecutiveMode}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer border ${
                isExecutiveMode
                  ? 'bg-white text-black border-white font-semibold shadow-sm'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white border-white/10'
              }`}
            >
              <Terminal className="w-3 h-3" />
              <span>{isExecutiveMode ? 'Persona Dossier [Open]' : 'Tailor Dossier [4 Personas]'}</span>
            </button>

            {/* Interactive Ambient Fluid Orb Shader Palette Switcher */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#111218]/90 border border-white/10 text-[10px] font-mono text-white/70">
              <span className="flex items-center gap-1 text-white/50 uppercase tracking-widest text-[9.5px]">
                <Box className="w-2.5 h-2.5 text-cyan-400" />
                <span>FLUID ORB</span>
              </span>
              <div className="flex items-center gap-1.5 pl-1.5 border-l border-white/10">
                {[
                  { name: 'Azure', hex: '#1A73F2' },
                  { name: 'Flame', hex: '#F75001' },
                  { name: 'Emerald', hex: '#10B981' },
                  { name: 'Violet', hex: '#8B5CF6' }
                ].map((palette) => (
                  <button
                    key={palette.hex}
                    type="button"
                    title={`Fluid Orb: ${palette.name}`}
                    onClick={() => {
                      playClick(880, 0.02, 'sine');
                      setOrbColor(palette.hex);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                      orbColor === palette.hex
                        ? 'scale-125 ring-2 ring-white ring-offset-1 ring-offset-[#111218]'
                        : 'opacity-50 hover:opacity-100 hover:scale-110'
                    }`}
                    style={{ backgroundColor: palette.hex }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Main Giant Headline: Crisp Negative-Tracking Typography (Linear & Apple Style) */}
          {/* Main Giant Headline: 3 Distinct Typographies for the 3 Lines */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-1 sm:space-y-1.5 text-left"
          >
            {/* Line 1: Modern Swiss Grotesk Sans (Plus Jakarta Sans) */}
            <span 
              className="block font-jakarta text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-medium tracking-tight text-white/80 leading-[1.15]"
              style={{ fontFamily: "'Plus Jakarta Sans', var(--font-primary), sans-serif" }}
            >
              Designing digital
            </span>

            {/* Line 2: Editorial Luxury Italic Serif (Instrument Serif) */}
            <span 
              className="block font-instrument italic text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-normal text-white tracking-normal leading-[1.08] my-0.5"
              style={{ fontFamily: "'Instrument Serif', var(--font-display), Georgia, serif" }}
            >
              products with clean systems
            </span>

            {/* Line 3: Architectural Geometric Display Grotesk (Space Grotesk) */}
            <span 
              className="block font-grotesk text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold tracking-[-0.035em] text-[#f7f8f8] leading-[1.15]"
              style={{ fontFamily: "'Space Grotesk', var(--font-primary), sans-serif" }}
            >
              thoughtful details <span className="text-white/40 font-normal">&amp;</span> craft.
            </span>
          </motion.h1>

          {/* Subtext Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed font-sans"
          >
            Building clean user interfaces, reliable design systems, and fast, smooth interactions for real-world products.
          </motion.p>

          {/* Executive Mode Drawer (When Toggled) */}
          <AnimatePresence>
            {isExecutiveMode && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <RecruiterPersonaSelector />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Horizontal Discipline Telemetry Strip (Linear Monospaced Badges) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-1 text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-white/60"
          >
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
              <span className="text-white font-medium">PRODUCT DESIGN</span>
            </div>
            <span className="text-white/20">/</span>
            <span className="hover:text-white transition-colors">DESIGN SYSTEMS</span>
            <span className="text-white/20">/</span>
            <span className="hover:text-white transition-colors">INTERACTION DESIGN</span>
            <span className="text-white/20">/</span>
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium font-mono tabular-nums">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span>125 OPEN COMPONENTS</span>
            </div>
          </motion.div>

          {/* Bio Row & Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-3"
          >
            {/* Avatar Profile with Precision Hairline Ring */}
            <div className="flex items-center gap-3.5">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full p-0.5 bg-white/10 shrink-0">
                <div className="w-full h-full rounded-full bg-[#0d0e12] overflow-hidden flex items-center justify-center text-white font-mono text-xs sm:text-sm font-semibold border border-white/10">
                  SV
                </div>
              </div>
              
              <div>
                <span className="text-xs font-jakarta text-white font-semibold tracking-tight block">Vutikuri Shanmukha</span>
                <span className="text-[11px] text-white/50 font-mono block">Product &amp; Interaction Designer</span>
              </div>
            </div>

            {/* Action Buttons: View Projects + Browse 125 Components */}
            <div className="sm:ml-auto flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => scrollToSection('works')}
                className="w-full sm:w-auto group inline-flex items-center justify-between sm:justify-center gap-3 px-5 py-2.5 rounded-full bg-white text-black hover:bg-white/90 font-mono text-xs tracking-wider transition-all duration-200 active:scale-95 cursor-pointer shadow-lg font-semibold"
              >
                <span>View Projects</span>
                <div className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center transition-all duration-200 group-hover:translate-x-0.5">
                  <ArrowRight className="w-3 h-3 text-black" />
                </div>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('design-stash')}
                className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:border-emerald-400 font-mono text-xs tracking-wider transition-all duration-200 active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(52,211,153,0.15)] font-semibold"
              >
                <Box className="w-3.5 h-3.5 text-emerald-400" />
                <span>Browse 125 Components</span>
              </button>
            </div>

          </motion.div>

        </div>

        {/* Right Column: Live Interactive Design Workstation (Replaces Fake 3D SVG Vectors) */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[340px] sm:min-h-[380px] lg:min-h-[440px]">
          <DesignWorkstationCanvas onNavigateToWorks={() => scrollToSection('works')} />
        </div>

      </div>

    </section>
  );
};
