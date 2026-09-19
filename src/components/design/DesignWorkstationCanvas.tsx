import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  Ruler, 
  Code2, 
  ShieldCheck, 
  Maximize2,
  Activity,
  Copy,
  Check
} from 'lucide-react';
import { useSound } from '@/hooks/useSound';
import FluidOrb from '@/components/ui/fluid-orb';

type WorkstationMode = 'specimen' | 'redlines' | 'tokens' | 'fluid-orb';

interface DesignWorkstationCanvasProps {
  onNavigateToWorks?: () => void;
}

export const DesignWorkstationCanvas: React.FC<DesignWorkstationCanvasProps> = ({ 
  onNavigateToWorks 
}) => {
  const { playClick } = useSound();
  const [activeMode, setActiveMode] = useState<WorkstationMode>('specimen');
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [auditProgress, setAuditProgress] = useState<number>(100);
  const [activeCategory, setActiveCategory] = useState<'privacy' | 'performance'>('privacy');
  const [orbColor, setOrbColor] = useState<string>('#1A73F2');
  const [orbSize, setOrbSize] = useState<number>(200);
  const [copiedCommand, setCopiedCommand] = useState<boolean>(false);

  const switchMode = (mode: WorkstationMode) => {
    playClick(800, 0.02, 'sine');
    setActiveMode(mode);
  };

  const handleTriggerAudit = () => {
    playClick(950, 0.03, 'triangle');
    setIsAuditing(true);
    setAuditProgress(12);

    const interval = setInterval(() => {
      setAuditProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAuditing(false);
          playClick(1100, 0.04, 'sine');
          return 100;
        }
        return prev + 22;
      });
    }, 90);
  };

  return (
    <div className="relative w-full select-none">
      {/* Machined Outer Frame (Linear & Raycast Hardware Chassis) */}
      <div className="relative rounded-2xl p-1 sm:p-1.5 bg-white/[0.04] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        
        {/* Top macOS & Linear Studio Window Header */}
        <div className="px-3.5 py-2.5 bg-[#0e1015] rounded-t-xl border-b border-white/10 flex flex-wrap items-center justify-between gap-2">
          
          {/* Window Traffic Lights & Breadcrumb */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80" />
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-white/50 pl-2 border-l border-white/10">
              <span className="text-white/30">sys</span>
              <span className="text-white/20">/</span>
              <span className="text-white/70">vutikuri</span>
              <span className="text-white/20">/</span>
              <span className="text-amber-400/90 font-medium">design-workstation.canvas</span>
            </div>
          </div>

          {/* Mode Switcher Tabs (Specimen | Redlines | Tokens) */}
          <div className="flex items-center gap-0.5 sm:gap-1 bg-black/60 p-0.5 rounded-lg border border-white/10">
            <button
              type="button"
              onClick={() => switchMode('specimen')}
              className={`px-2 sm:px-2.5 py-1 rounded-md text-[9.5px] sm:text-[10.5px] font-mono tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
                activeMode === 'specimen'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
              title="Interactive Live Specimen"
            >
              <Layers className="w-3 h-3" />
              <span>Specimen</span>
            </button>

            <button
              type="button"
              onClick={() => switchMode('redlines')}
              className={`px-2 sm:px-2.5 py-1 rounded-md text-[9.5px] sm:text-[10.5px] font-mono tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
                activeMode === 'redlines'
                  ? 'bg-amber-400 text-black font-semibold shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
              title="Figma Redline Dimensions"
            >
              <Ruler className="w-3 h-3" />
              <span>Redlines</span>
            </button>

            <button
              type="button"
              onClick={() => switchMode('tokens')}
              className={`px-2 sm:px-2.5 py-1 rounded-md text-[9.5px] sm:text-[10.5px] font-mono tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
                activeMode === 'tokens'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
              title="Design System Variables"
            >
              <Code2 className="w-3 h-3" />
              <span>Tokens</span>
            </button>

            <button
              type="button"
              onClick={() => switchMode('fluid-orb')}
              className={`px-2 sm:px-2.5 py-1 rounded-md text-[9.5px] sm:text-[10.5px] font-mono tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
                activeMode === 'fluid-orb'
                  ? 'bg-cyan-400 text-black font-semibold shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
              title="Rare UI WebGL Fluid Orb"
            >
              <Activity className="w-3 h-3" />
              <span>Fluid Orb</span>
            </button>
          </div>

        </div>

        {/* Interior Canvas Stage */}
        <div className="relative p-3.5 sm:p-6 bg-[#07080b] rounded-b-xl overflow-hidden min-h-[320px] sm:min-h-[380px] flex flex-col justify-between">
          
          {/* Architectural Background Grid Matrix */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
              backgroundSize: '1.5rem 1.5rem'
            }}
          />

          {/* Top Status Strip */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pb-2.5 sm:pb-3 border-b border-white/5 text-[9.5px] sm:text-[10px] font-mono text-white/50">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-white/80">LATENCY: 12.4ms <span className="hidden sm:inline">(LOCKED 60FPS)</span></span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <span className="hidden xs:inline">SCALE: 100%</span>
              <span className="hidden xs:inline text-white/20">|</span>
              <span className="text-amber-400">WCAG 2.2 AAA <span className="hidden sm:inline">(18.4:1)</span></span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* MODE 1: LIVE INTERACTIVE SPECIMEN */}
          {/* ========================================================================= */}
          {activeMode === 'specimen' && (
            <motion.div
              key="specimen"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 my-auto py-2 space-y-3"
            >
              {/* Interactive Telemetry Node Card */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#0e1017] border border-white/10 space-y-3.5 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">
                      FORENSIC SECURITY SPEC // DS-01
                    </span>
                    <h4 className="text-sm sm:text-base font-medium font-sans text-white">
                      Zero-Telemetry Privacy Engine
                    </h4>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-white/70">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Active Guard</span>
                  </div>
                </div>

                {/* Segmented Category Pill Switcher */}
                <div className="grid grid-cols-2 gap-1 p-1 rounded-lg bg-black/60 border border-white/5 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => {
                      playClick(750, 0.02, 'sine');
                      setActiveCategory('privacy');
                    }}
                    className={`py-1.5 px-3 rounded-md transition-colors cursor-pointer text-center ${
                      activeCategory === 'privacy'
                        ? 'bg-white/15 text-white font-medium'
                        : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    EXIF Metadata Filter
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playClick(850, 0.02, 'sine');
                      setActiveCategory('performance');
                    }}
                    className={`py-1.5 px-3 rounded-md transition-colors cursor-pointer text-center ${
                      activeCategory === 'performance'
                        ? 'bg-white/15 text-white font-medium'
                        : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    Token Stripper (Local)
                  </button>
                </div>

                {/* Audit Progress & Stats */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-white/60">
                    <span>{isAuditing ? 'Executing Deep Scan...' : '23 Trackers Stripped'}</span>
                    <span className="text-white font-semibold">{auditProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-amber-500 to-emerald-400"
                      style={{ width: `${auditProgress}%` }}
                      transition={{ ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Interactive Action Trigger */}
                <div className="flex items-center justify-between pt-1">
                  <div className="text-[10px] font-mono text-white/40">
                    STATUS: <span className="text-emerald-400">0 BYTES EXPOSED</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleTriggerAudit}
                    disabled={isAuditing}
                    className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-white/90 active:scale-95 text-black font-mono text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer shadow-md disabled:opacity-50"
                  >
                    {isAuditing ? 'Scanning...' : 'Simulate Scan'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* MODE 2: FIGMA-STYLE REDLINES & SPATIAL DIMENSIONS */}
          {/* ========================================================================= */}
          {activeMode === 'redlines' && (
            <motion.div
              key="redlines"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 my-auto py-2 space-y-3"
            >
              {/* Bounded Redline Specimen Card with Real Measurement Overlays */}
              <div className="relative p-4 sm:p-5 rounded-xl bg-[#0e1017] border-2 border-dashed border-amber-400/40 space-y-3">
                
                {/* Redline Dimension Badges */}
                <div className="absolute -top-3 left-4 px-2 py-0.5 rounded bg-amber-400 text-black text-[9px] font-mono font-bold tracking-widest uppercase">
                  W: 100% | H: 184px
                </div>

                <div className="absolute -top-3 right-4 px-2 py-0.5 rounded bg-sky-400 text-black text-[9px] font-mono font-bold tracking-widest uppercase">
                  P_INSET: 20px
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-mono text-amber-400">
                    &bull; RADIUS: 12px (calc: 0.75rem)
                  </span>
                  <span className="text-[11px] font-mono text-cyan-400">
                    &bull; BASELINE GRID: 4px / 8px
                  </span>
                </div>

                {/* Internal Structural Guide Lines */}
                <div className="p-3 rounded-lg bg-black/40 border border-amber-400/20 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-white/80">
                    <span className="text-white/50">Header Tier:</span>
                    <span>font: 14px / weight: 600 / track: -0.02em</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono text-white/80">
                    <span className="text-white/50">Body Tier:</span>
                    <span>font: 13px / weight: 400 / line-height: 1.45</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono text-white/80">
                    <span className="text-white/50">Affordance Ring:</span>
                    <span>1px solid rgba(255, 255, 255, 0.12)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10.5px] font-mono text-white/50 pt-1">
                  <span>SPECIMEN TYPE: LIVING ATOMIC NODE</span>
                  <span className="text-emerald-400">0% LAYOUT SHIFT</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* MODE 3: LINEAR & RAYCAST 3-TIER TOKEN SPEC */}
          {/* ========================================================================= */}
          {activeMode === 'tokens' && (
            <motion.div
              key="tokens"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 my-auto py-2 space-y-2"
            >
              {/* Micro-Code Token Inspector Panel */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-black/90 border border-white/10 font-mono text-[11px] space-y-2 text-white/80">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px] text-white/40">
                  <span>TOKEN VARIABLE ARCHITECTURE</span>
                  <span className="text-amber-400">TYPESCRIPT SYNCHRONIZED</span>
                </div>

                <div className="space-y-1 text-[10.5px] leading-relaxed">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400">--surface-canvas:</span>
                    <span className="text-white">#010102</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400">--surface-panel:</span>
                    <span className="text-white">#0f1011</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400">--border-hairline:</span>
                    <span className="text-white">#23252a</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400">--accent-primary:</span>
                    <span className="text-white">#5e6ad2 (Linear Indigo)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400">--font-display:</span>
                    <span className="text-white">&quot;SF Pro Display&quot;, -apple-system</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400">--contrast-body:</span>
                    <span className="text-emerald-400">18.4:1 (AAA Pass)</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* MODE 4: RARE UI WEBGL FLUID ORB SPECIMEN */}
          {/* ========================================================================= */}
          {activeMode === 'fluid-orb' && (
            <motion.div
              key="fluid-orb"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 my-auto py-2 flex flex-col items-center justify-center space-y-3.5"
            >
              {/* Centered Fluid Orb with Diffuse Atmospheric Aura */}
              <div className="relative flex items-center justify-center p-1">
                <div 
                  className="absolute inset-0 rounded-full blur-3xl opacity-35 pointer-events-none transition-colors duration-500"
                  style={{ backgroundColor: orbColor }}
                />
                <FluidOrb 
                  size={orbSize} 
                  color={orbColor} 
                  className="shadow-[0_0_40px_rgba(0,0,0,0.9)] border border-white/10"
                />
              </div>

              {/* Interactive Orb Controls (Size, Swatches & CLI Command) */}
              <div className="w-full max-w-sm p-3 rounded-xl bg-black/80 border border-white/10 backdrop-blur-md space-y-2.5">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-white/50 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    FLUID SHADER PALETTE
                  </span>
                  <span className="text-cyan-400 font-semibold">{orbColor}</span>
                </div>

                {/* Color Swatch Row */}
                <div className="flex items-center justify-between gap-1.5">
                  {[
                    { label: 'Azure', hex: '#1A73F2' },
                    { label: 'Flame', hex: '#F75001' },
                    { label: 'Cyan', hex: '#00E5FF' },
                    { label: 'Emerald', hex: '#10B981' },
                    { label: 'Violet', hex: '#8B5CF6' },
                    { label: 'Rose', hex: '#F43F5E' }
                  ].map((palette) => (
                    <button
                      key={palette.hex}
                      type="button"
                      onClick={() => {
                        playClick(900, 0.02, 'sine');
                        setOrbColor(palette.hex);
                      }}
                      className={`flex-1 py-1.5 rounded-md flex items-center justify-center transition-all cursor-pointer border ${
                        orbColor === palette.hex
                          ? 'border-white scale-105 shadow-[0_0_10px_rgba(255,255,255,0.35)]'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: `${palette.hex}22` }}
                      title={palette.label}
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: palette.hex }} />
                    </button>
                  ))}
                </div>

                {/* Size Presets & CLI Quick-Copy Trigger */}
                <div className="flex items-center justify-between pt-1.5 border-t border-white/5 text-[10px] font-mono">
                  <div className="flex items-center gap-1">
                    <span className="text-white/40 mr-1">SIZE:</span>
                    {[160, 200, 240].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          playClick(780, 0.02, 'triangle');
                          setOrbSize(s);
                        }}
                        className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                          orbSize === s ? 'bg-white text-black font-semibold' : 'text-white/50 hover:text-white'
                        }`}
                      >
                        {s}px
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      playClick(1050, 0.03, 'sine');
                      navigator.clipboard.writeText('npx shadcn@latest add swamimalode07/rare-ui/fluid-orb');
                      setCopiedCommand(true);
                      setTimeout(() => setCopiedCommand(false), 2000);
                    }}
                    className="inline-flex items-center gap-1 text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedCommand ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-white/50" />}
                    <span>{copiedCommand ? 'Copied CLI' : 'Copy CLI'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Bottom Bar: Actionable Dossier Route */}
          <div className="relative z-10 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
            <span className="text-white/40">
              7 PRODUCTION CASE STUDIES
            </span>

            {onNavigateToWorks && (
              <button
                type="button"
                onClick={onNavigateToWorks}
                className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Jump to Work</span>
                <Maximize2 className="w-3 h-3" />
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
