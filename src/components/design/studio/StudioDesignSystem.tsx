import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Layers, Check, Copy, Activity, Play, Box } from 'lucide-react';

export const StudioDesignSystem: React.FC = () => {
  const [headlineSize, setHeadlineSize] = useState<number>(44);
  const [headlineWeight, setHeadlineWeight] = useState<number>(700);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Motion physics playground state
  const [bouncePreset, setBouncePreset] = useState<'TACTILE' | 'BOUNCY' | 'SNAPPY'>('TACTILE');
  const [triggerBounce, setTriggerBounce] = useState<number>(0);

  const colorTokens = [
    { name: 'CONCRETE', hex: '#E3E6E8', desc: 'Cool Architectural Ground', isDark: false },
    { name: 'INK', hex: '#0A0A0A', desc: 'Primary Structural Anchor', isDark: true },
    { name: 'SIGNAL YELLOW', hex: '#FFD84D', desc: 'Identity & Focus Accent', isDark: false },
    { name: 'ELECTRIC BLUE', hex: '#5B8CFF', desc: 'Specimen Data Accent', isDark: false },
    { name: 'CORAL', hex: '#FF6B57', desc: 'Active Arena Accent', isDark: false },
    { name: 'MINT', hex: '#63D6A0', desc: 'Verified Status Token', isDark: false },
  ];

  const copyToken = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedToken(hex);
    setTimeout(() => setCopiedToken(null), 1800);
  };

  const getSpringConfig = () => {
    switch (bouncePreset) {
      case 'BOUNCY':
        return { type: 'spring' as const, stiffness: 280, damping: 12 };
      case 'SNAPPY':
        return { type: 'spring' as const, stiffness: 600, damping: 32 };
      case 'TACTILE':
      default:
        return { type: 'spring' as const, stiffness: 400, damping: 25 };
    }
  };

  return (
    <section id="studio-system" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-6 sm:py-10 select-none">
      
      {/* Section Header */}
      <div className="flex flex-wrap items-end justify-between border-b-3 border-[#0A0A0A] pb-4 mb-6 sm:mb-8 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#FFD84D] border border-[#0A0A0A]" />
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#0A0A0A]">
              05 / RECURSIVE ARCHITECTURE
            </span>
          </div>
          <h2 className="font-['Space_Grotesk'] text-4xl sm:text-6xl font-black text-[#0A0A0A] uppercase tracking-tight">
            DESIGN SYSTEM // LIVE
          </h2>
        </div>

        <div className="text-right">
          <span className="font-mono text-xs font-bold text-[#0A0A0A]/60 block uppercase">
            DESIGN TELEMETRY
          </span>
          <span className="font-mono text-sm font-bold text-[#0A0A0A]">
            LIVE RUNTIME SPECIFICATIONS
          </span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 1. DESIGN TELEMETRY LEDGER (Echoing Developer Telemetry) */}
      {/* ============================================================ */}
      <div className="bg-[#FFFFFF] border-3 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[6px_6px_0px_#0A0A0A] p-4 sm:p-6 mb-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between border-b-2 border-[#0A0A0A] pb-3 gap-2">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0A0A0A]">
            <Activity className="w-4 h-4 text-[#FFD84D]" />
            <span>DESIGN TELEMETRY & SYSTEM OPERATOR STATUS</span>
          </div>
          <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[#63D6A0] border border-[#0A0A0A] text-[#0A0A0A]">
            ALL SYSTEMS NOMINAL
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 font-mono">
          {[
            { label: 'TYPE SCALE', value: '08 LEVELS' },
            { label: 'COLOR TOKENS', value: '12 TOKENS' },
            { label: 'COMPONENTS', value: '42 ATOMS' },
            { label: 'INTERACTIONS', value: '17 MODELS' },
            { label: 'EXPERIMENTS', value: '09 ACTIVE' },
            { label: 'FRAME RATE', value: '60 FPS' },
          ].map((item) => (
            <div key={item.label} className="p-2.5 sm:p-3 bg-[#E3E6E8] border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]">
              <span className="text-[8px] sm:text-[9px] text-[#0A0A0A]/60 uppercase block truncate">
                {item.label}
              </span>
              <span className="font-['Space_Grotesk'] text-base sm:text-lg font-black text-[#0A0A0A] block truncate">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. INTERACTIVE TYPOGRAPHY SLIDER (The Recursive Specimen) */}
      {/* ============================================================ */}
      <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-8">
        
        {/* Left: Interactive Typography Playground (7 Columns) */}
        <div className="lg:col-span-7 bg-[#FFFFFF] border-3 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[6px_6px_0px_#0A0A0A] p-4 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b-2 border-[#0A0A0A] pb-3 mb-6">
              <span className="font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                TYPE SPECIMEN // SPACE GROTESK
              </span>
              <span className="text-xs font-mono font-bold text-[#0A0A0A]">
                {headlineSize}PX · W{headlineWeight}
              </span>
            </div>

            {/* Dynamic Headline Preview */}
            <div className="min-h-[120px] sm:min-h-[140px] flex items-center justify-center p-4 bg-[#E3E6E8] border-2 border-[#0A0A0A] overflow-hidden mb-6">
              <span
                style={{
                  fontSize: `${headlineSize}px`,
                  fontWeight: headlineWeight,
                }}
                className="font-['Space_Grotesk'] text-[#0A0A0A] tracking-tight leading-none uppercase text-center block break-words max-w-full transition-all duration-75"
              >
                TACTILE FORM
              </span>
            </div>
          </div>

          {/* Dual Sliders: Size & Weight */}
          <div className="space-y-4 pt-2 border-t-2 border-[#0A0A0A]">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="font-bold text-[#0A0A0A]">FONT SIZE</span>
                <span>{headlineSize}PX</span>
              </div>
              <input
                type="range"
                min={24}
                max={84}
                value={headlineSize}
                onChange={(e) => setHeadlineSize(Number(e.target.value))}
                className="w-full accent-[#0A0A0A] cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="font-bold text-[#0A0A0A]">FONT WEIGHT</span>
                <span>{headlineWeight}</span>
              </div>
              <input
                type="range"
                min={400}
                max={900}
                step={100}
                value={headlineWeight}
                onChange={(e) => setHeadlineWeight(Number(e.target.value))}
                className="w-full accent-[#0A0A0A] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right: Spring Physics Simulator (5 Columns) */}
        <div className="lg:col-span-5 bg-[#FFFFFF] border-3 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[6px_6px_0px_#0A0A0A] p-4 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b-2 border-[#0A0A0A] pb-3 mb-6">
              <span className="font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                MOTION // SPRING KINETICS
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-[#FFD84D] border border-[#0A0A0A] font-bold">
                {bouncePreset}
              </span>
            </div>

            {/* Kinetic Object Stage */}
            <div className="h-32 sm:h-36 bg-[#E3E6E8] border-2 border-[#0A0A0A] flex items-center justify-center relative overflow-hidden mb-6">
              <motion.div
                key={triggerBounce}
                animate={{
                  y: [0, -32, 0],
                  scale: [1, 1.15, 1],
                  rotate: [0, -6, 0],
                }}
                transition={getSpringConfig()}
                className="w-14 sm:w-16 h-14 sm:h-16 bg-[#FFD84D] border-3 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] flex items-center justify-center font-mono font-black text-xs text-[#0A0A0A]"
              >
                SPRING
              </motion.div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {(['TACTILE', 'BOUNCY', 'SNAPPY'] as const).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setBouncePreset(preset)}
                  className={`py-1.5 font-mono text-[10px] sm:text-[11px] font-bold uppercase border-2 transition-all cursor-pointer ${
                    bouncePreset === preset
                      ? 'bg-[#0A0A0A] text-[#E3E6E8] border-[#0A0A0A]'
                      : 'bg-[#E3E6E8] text-[#0A0A0A] border-[#0A0A0A]/40'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setTriggerBounce((p) => p + 1)}
              className="w-full py-2.5 sm:py-2 bg-[#FFD84D] hover:bg-[#F7CE38] border-2 border-[#0A0A0A] font-mono text-xs font-bold uppercase tracking-wider text-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>TEST SPRING IMPULSE</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. COLOR TOKENS SWATCH INSPECTOR */}
      {/* ============================================================ */}
      <div className="bg-[#FFFFFF] border-3 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[6px_6px_0px_#0A0A0A] p-4 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between border-b-2 border-[#0A0A0A] pb-3 gap-2">
          <span className="font-mono text-xs font-bold uppercase text-[#0A0A0A]">
            FOUNDATIONAL COLOR PALETTE // CLICK TO COPY HEX
          </span>
          <span className="font-mono text-[10px] text-[#0A0A0A]/60 uppercase">
            CALIBRATED PALETTE
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {colorTokens.map((token) => (
            <button
              key={token.name}
              type="button"
              onClick={() => copyToken(token.hex)}
              className="group p-3 bg-[#E3E6E8] border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] hover:bg-[#FFFFFF] hover:shadow-[4px_4px_0px_#FFD84D] transition-all text-left space-y-2 cursor-pointer"
            >
              <div
                className="w-full h-12 border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] flex items-center justify-center"
                style={{ backgroundColor: token.hex }}
              >
                {copiedToken === token.hex ? (
                  <span className="px-2 py-0.5 bg-[#FFFFFF] border border-[#0A0A0A] text-[9px] font-mono font-bold text-[#0A0A0A]">
                    COPIED
                  </span>
                ) : null}
              </div>

              <div>
                <span className="font-mono text-xs font-black text-[#0A0A0A] block">
                  {token.name}
                </span>
                <span className="font-mono text-[10px] text-[#0A0A0A]/70 block">
                  {token.hex}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
