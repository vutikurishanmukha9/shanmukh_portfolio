import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Move, Layers, Sliders, Maximize2, Compass, Box } from 'lucide-react';

export const StudioFloatingArtifact: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'SPEC' | 'GRID' | 'TOKENS'>('SPEC');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  
  // Motion values for smooth physical mouse tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [12, -12]);
  const rotateY = useTransform(x, [-100, 100], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const cycleMode = () => {
    if (activeMode === 'SPEC') setActiveMode('GRID');
    else if (activeMode === 'GRID') setActiveMode('TOKENS');
    else setActiveMode('SPEC');
  };

  return (
    <div className="relative w-full max-w-[290px] xs:max-w-[320px] sm:max-w-sm mx-auto select-none perspective-[1000px]">
      {/* Interactive Helper Callout */}
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-[10px] font-mono tracking-widest uppercase text-[#0A0A0A]/60 flex items-center gap-1">
          <Move className="w-3 h-3 text-[#0A0A0A]" />
          <span>DRAGGABLE ARTIFACT</span>
        </span>
        <button
          type="button"
          onClick={cycleMode}
          className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-[#FFD84D] hover:bg-[#F7CE38] border border-[#0A0A0A] shadow-[1px_1px_0px_#0A0A0A] transition-all cursor-pointer"
        >
          MODE: {activeMode}
        </button>
      </div>

      {/* Draggable Physical Card Body */}
      <motion.div
        drag
        dragConstraints={{ left: -30, right: 30, top: -25, bottom: 25 }}
        dragElastic={0.15}
        whileDrag={{ scale: 1.03, cursor: 'grabbing', zIndex: 40 }}
        style={{ rotateX, rotateY }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative bg-[#FFFFFF] border-3 border-[#0A0A0A] shadow-[5px_5px_0px_#0A0A0A] sm:shadow-[8px_8px_0px_#0A0A0A] p-4 sm:p-5 cursor-grab transition-shadow duration-200"
      >
        {/* Top Header Strip */}
        <div className="flex items-center justify-between border-b-2 border-[#0A0A0A] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#FFD84D] border border-[#0A0A0A]" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#0A0A0A]">
              INTERFACE / 001
            </span>
          </div>
          <span className="text-[10px] font-mono bg-[#0A0A0A] text-[#E3E6E8] px-1.5 py-0.5 uppercase font-bold tracking-wider">
            CANVAS OBJECT
          </span>
        </div>

        {/* Dynamic Mode Content Body */}
        {activeMode === 'SPEC' && (
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#0A0A0A]/60 tracking-wider">
                SIGNATURE SPECIMEN
              </span>
              <h3 className="font-['Space_Grotesk'] text-2xl font-bold tracking-tight text-[#0A0A0A] leading-tight">
                SHANMUKH
              </h3>
              <p className="text-xs font-['Inter'] text-[#0A0A0A]/80 leading-relaxed">
                Physical interaction model bridging tactile brutalism with digital product clarity.
              </p>
            </div>

            {/* Pattern Strip */}
            <div className="flex items-center justify-between py-2 border-y border-[#0A0A0A]/20 font-mono text-[11px] text-[#0A0A0A]/70">
              <span>/ / / / / / / / /</span>
              <span className="font-bold text-[#0A0A0A]">FORM × MOTION</span>
              <span>/ / / / / / / / /</span>
            </div>

            {/* Micro Coordinates Ledger */}
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono bg-[#E3E6E8] p-2.5 border border-[#0A0A0A]">
              <div>
                <span className="text-[#0A0A0A]/60 block">COORDINATE</span>
                <span className="font-bold text-[#0A0A0A]">X: 1440 · Y: 900</span>
              </div>
              <div>
                <span className="text-[#0A0A0A]/60 block">SURFACE</span>
                <span className="font-bold text-[#0A0A0A]">PHYSICAL MESH</span>
              </div>
            </div>
          </div>
        )}

        {activeMode === 'GRID' && (
          <div className="space-y-3 py-1">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-[#0A0A0A]">
              <span>12-COLUMN SUBGRID</span>
              <span className="text-[#5B8CFF]">ACTIVE</span>
            </div>
            {/* Visual Grid Lines Preview */}
            <div className="grid grid-cols-6 gap-1 h-20 bg-[#E3E6E8] border border-[#0A0A0A] p-1.5">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-full border border-dashed border-[#0A0A0A]/40 bg-[#FFFFFF]/60 flex items-center justify-center text-[9px] font-mono font-bold text-[#0A0A0A]/60"
                >
                  C{i + 1}
                </div>
              ))}
            </div>
            <p className="text-[10px] font-mono text-[#0A0A0A]/70">
              Modular 8px baseline spatial rhythm aligning typography with tactile bounds.
            </p>
          </div>
        )}

        {activeMode === 'TOKENS' && (
          <div className="space-y-3 py-1">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-[#0A0A0A]">
              <span>CORE SWATCHES</span>
              <span className="text-[#63D6A0]">HEX LIVE</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="p-1.5 bg-[#E3E6E8] border border-[#0A0A0A] text-center">
                <div className="w-full h-6 bg-[#E3E6E8] border border-[#0A0A0A] mb-1" />
                <span className="text-[8px] font-mono font-bold block">#E3E6E8</span>
              </div>
              <div className="p-1.5 bg-[#E3E6E8] border border-[#0A0A0A] text-center">
                <div className="w-full h-6 bg-[#0A0A0A] border border-[#0A0A0A] mb-1" />
                <span className="text-[8px] font-mono font-bold block">#0A0A0A</span>
              </div>
              <div className="p-1.5 bg-[#E3E6E8] border border-[#0A0A0A] text-center">
                <div className="w-full h-6 bg-[#FFD84D] border border-[#0A0A0A] mb-1" />
                <span className="text-[8px] font-mono font-bold block">#FFD84D</span>
              </div>
              <div className="p-1.5 bg-[#E3E6E8] border border-[#0A0A0A] text-center">
                <div className="w-full h-6 bg-[#5B8CFF] border border-[#0A0A0A] mb-1" />
                <span className="text-[8px] font-mono font-bold block">#5B8CFF</span>
              </div>
            </div>
            <p className="text-[10px] font-mono text-[#0A0A0A]/70">
              Calibrated high-contrast palette verified for WCAG AAA legibility.
            </p>
          </div>
        )}

        {/* Bottom Interactive Stamp */}
        <div className="mt-4 pt-3 border-t-2 border-[#0A0A0A] flex items-center justify-between text-[10px] font-mono">
          <span className="font-bold text-[#0A0A0A]">TOUCH / DRAG / ROTATE</span>
          <span className="px-1.5 py-0.5 bg-[#FFD84D] text-[#0A0A0A] font-bold border border-[#0A0A0A]">
            PHYSICS ON
          </span>
        </div>

        {/* Decorative corner markers */}
        <span className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#0A0A0A]" />
        <span className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#0A0A0A]" />
        <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#0A0A0A]" />
        <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#0A0A0A]" />
      </motion.div>
    </div>
  );
};
