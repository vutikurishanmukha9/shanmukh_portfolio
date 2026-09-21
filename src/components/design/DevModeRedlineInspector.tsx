import React, { useState, useEffect } from 'react';
import { Code2, Eye, Sliders, Box, Layers, Copy, Check, Terminal } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

export interface DevModeSpecimenConfig {
  id: string;
  name: string;
  category: string;
  dimensions: { width: string; height: string };
  layout: {
    display: 'flex';
    direction: 'row' | 'column';
    padding: { top: number; right: number; bottom: number; left: number };
    gap: number;
    align: string;
    justify: string;
  };
  tokens: {
    surface: string;
    border: string;
    radius: string;
    fontFamily: string;
    typographySize: string;
  };
  component: React.ReactNode;
}

export const DevModeRedlineInspector: React.FC = () => {
  const { playClick } = useSound();
  const [isDevModeActive, setIsDevModeActive] = useState<boolean>(true);
  const [selectedElement, setSelectedElement] = useState<'card' | 'badge' | 'title' | 'cta'>('card');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Keyboard shortcut listener for Option/Alt key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Alt') {
        setIsDevModeActive((prev) => !prev);
        playClick(850, 0.02, 'sine');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playClick]);

  const handleCopy = (tokenValue: string, tokenKey: string) => {
    playClick(1000, 0.03, 'sine');
    navigator.clipboard.writeText(tokenValue);
    setCopiedToken(tokenKey);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0a0b10] p-5 sm:p-7 space-y-6 select-none shadow-2xl">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            <span className="text-[10.5px] font-mono tracking-widest text-sky-400 uppercase font-semibold">
              DEV MODE ENGINE // AUTO-LAYOUT &amp; REDLINE INSPECTOR
            </span>
          </div>
          <h3 className="font-jakarta text-xl font-bold tracking-tight text-white">
            Sub-Pixel Auto-Layout Visualizer
          </h3>
          <p className="text-xs font-sans text-white/60 leading-relaxed max-w-xl">
            Inspect real-time spatial geometry, padding zones, auto-layout flex dynamics, and design token variable bindings as seen in Figma Dev Mode.
          </p>
        </div>

        {/* Mode Toggle Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              playClick(isDevModeActive ? 700 : 900, 0.02, 'triangle');
              setIsDevModeActive(!isDevModeActive);
            }}
            className={`px-3.5 py-1.5 rounded-xl font-mono text-xs border transition-all cursor-pointer flex items-center gap-2 ${
              isDevModeActive
                ? 'bg-sky-500/20 text-sky-300 border-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.25)] font-semibold'
                : 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border-white/10'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Dev Mode: {isDevModeActive ? 'ON' : 'OFF'}</span>
            <kbd className="px-1.5 py-0.5 rounded text-[9px] bg-black/40 border border-white/10 text-white/50">
              Alt
            </kbd>
          </button>
        </div>
      </div>

      {/* Main Inspector Stage */}
      <div className="grid md:grid-cols-12 gap-6 items-start">
        
        {/* Left Stage (7 Cols): Interactive Specimen with Overlaid Redline Metrics */}
        <div className="md:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-white/50 px-1">
            <span>SPECIMEN: HIGH-CONVERSION TELEMETRY CARD</span>
            <span className="text-sky-400">CLICK ELEMENT TO TARGET</span>
          </div>

          <div className="relative p-3.5 sm:p-6 md:p-8 rounded-2xl bg-[#050608] border border-white/15 overflow-hidden flex items-center justify-center min-h-[320px] sm:min-h-[380px]">
            {/* Background Measurement Grid */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage: 'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
                backgroundSize: '16px 16px'
              }}
            />

            {/* Target Card Specimen */}
            <div
              onClick={() => {
                playClick(800, 0.02, 'sine');
                setSelectedElement('card');
              }}
              className={`relative w-full max-w-[320px] sm:max-w-sm rounded-2xl p-4 sm:p-6 transition-all cursor-pointer ${
                isDevModeActive
                  ? selectedElement === 'card'
                    ? 'bg-[#0f1015] ring-2 ring-sky-400 shadow-[0_0_30px_rgba(56,189,248,0.2)]'
                    : 'bg-[#0f1015] ring-1 ring-sky-500/40'
                  : 'bg-[#0f1015] border border-white/10 shadow-xl'
              }`}
            >
              {/* Dev Mode Bounding Box Annotations */}
              {isDevModeActive && (
                <>
                  {/* Outer Dimension Tags */}
                  <div className="absolute -top-3 left-4 px-2 py-0.5 rounded bg-sky-500 text-black font-mono text-[9px] font-bold tracking-wider z-20">
                    WIDTH: 384px
                  </div>
                  <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 rotate-90 px-2 py-0.5 rounded bg-sky-500 text-black font-mono text-[9px] font-bold tracking-wider z-20">
                    HEIGHT: 246px
                  </div>

                  {/* Padding Visualizers (Top, Right, Bottom, Left) */}
                  <div className="absolute top-0 inset-x-0 h-6 bg-rose-500/15 border-b border-rose-400/30 flex items-center justify-center font-mono text-[8.5px] text-rose-300 pointer-events-none">
                    pt-6 (24px)
                  </div>
                  <div className="absolute bottom-0 inset-x-0 h-6 bg-rose-500/15 border-t border-rose-400/30 flex items-center justify-center font-mono text-[8.5px] text-rose-300 pointer-events-none">
                    pb-6 (24px)
                  </div>
                  <div className="absolute left-0 inset-y-0 w-6 bg-rose-500/15 border-r border-rose-400/30 flex items-center justify-center font-mono text-[8.5px] text-rose-300 pointer-events-none [writing-mode:vertical-lr]">
                    pl-6 (24px)
                  </div>
                  <div className="absolute right-0 inset-y-0 w-6 bg-rose-500/15 border-l border-rose-400/30 flex items-center justify-center font-mono text-[8.5px] text-rose-300 pointer-events-none [writing-mode:vertical-lr]">
                    pr-6 (24px)
                  </div>
                </>
              )}

              {/* Card Inner Content Flow */}
              <div className="space-y-4 relative z-10 pt-2 pb-2">
                {/* Top Badge Target */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    playClick(900, 0.02, 'sine');
                    setSelectedElement('badge');
                  }}
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all ${
                    isDevModeActive && selectedElement === 'badge'
                      ? 'bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.4)]'
                      : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                  <span>SHIPPED TO PRODUCTION</span>
                  {isDevModeActive && selectedElement === 'badge' && (
                    <span className="ml-1 text-[8px] text-emerald-400 font-bold">[162 x 26px]</span>
                  )}
                </div>

                {/* Title Target */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    playClick(850, 0.02, 'sine');
                    setSelectedElement('title');
                  }}
                  className={`space-y-1 p-2 rounded-lg transition-all ${
                    isDevModeActive && selectedElement === 'title'
                      ? 'bg-purple-500/10 ring-2 ring-purple-400'
                      : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <h4 className="font-jakarta text-lg font-bold text-white tracking-tight">
                    Linear Sync Architecture
                  </h4>
                  <p className="font-sans text-xs text-white/60 leading-relaxed">
                    Zero layout shift tokens with 100% Figma variable synchronization.
                  </p>
                  {isDevModeActive && selectedElement === 'title' && (
                    <span className="block font-mono text-[9px] text-purple-300 pt-0.5">
                      gap: 4px // line-height: 1.4 // Plus Jakarta Sans
                    </span>
                  )}
                </div>

                {/* Metric & CTA Target */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    playClick(950, 0.02, 'sine');
                    setSelectedElement('cta');
                  }}
                  className={`flex items-center justify-between pt-2 border-t border-white/10 p-2 rounded-lg transition-all ${
                    isDevModeActive && selectedElement === 'cta'
                      ? 'bg-amber-500/10 ring-2 ring-amber-400'
                      : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="font-mono">
                    <span className="text-[10px] text-white/40 block">LATENCY</span>
                    <span className="text-sm font-semibold text-white tabular-nums">14.2ms</span>
                  </div>
                  <button
                    type="button"
                    className="px-3.5 py-1.5 rounded-lg bg-white text-black font-mono text-xs font-semibold hover:bg-white/90 shadow-md transition-transform active:scale-95"
                  >
                    Inspect Tokens
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Telemetry Column (5 Cols): Computed CSS & Figma Token Inspector */}
        <div className="md:col-span-5 space-y-4">
          
          {/* Target Element Summary Pill */}
          <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 flex items-center gap-1.5">
                <Box className="w-3.5 h-3.5 text-sky-400" />
                TARGET ELEMENT
              </span>
              <span className="px-2 py-0.5 rounded bg-white/10 font-mono text-[10px] text-white font-semibold uppercase">
                {selectedElement.toUpperCase()}
              </span>
            </div>

            {/* Geometry Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-[#07080b] border border-white/5 space-y-0.5">
                <span className="text-[10px] text-white/40 block">AUTO-LAYOUT</span>
                <span className="text-white font-medium">Flex Column (Vertical)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#07080b] border border-white/5 space-y-0.5">
                <span className="text-[10px] text-white/40 block">PADDING</span>
                <span className="text-white font-medium tabular-nums">24px (1.5rem)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#07080b] border border-white/5 space-y-0.5">
                <span className="text-[10px] text-white/40 block">GAP SPACING</span>
                <span className="text-white font-medium tabular-nums">16px (1.0rem)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#07080b] border border-white/5 space-y-0.5">
                <span className="text-[10px] text-white/40 block">BORDER RADIUS</span>
                <span className="text-white font-medium tabular-nums">16px (rounded-2xl)</span>
              </div>
            </div>
          </div>

          {/* Bound Design Tokens Card */}
          <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                BOUND FIGMA VARIABLES // TOKENS
              </span>
              <span className="text-[10px] font-mono text-white/40">WCAG AAA</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              {[
                { label: '--surface-elevated', value: '#0f1015', desc: 'Floating Card Surface' },
                { label: '--border-subtle', value: 'rgba(255, 255, 255, 0.1)', desc: '1px Sub-pixel Border' },
                { label: '--accent-status', value: '#34d399', desc: 'Emerald AAA Success' },
                { label: '--font-heading', value: "'Plus Jakarta Sans'", desc: 'Tight Grotesk Hierarchy' },
                { label: '--font-telemetry', value: "'JetBrains Mono'", desc: 'Tabular Numeric Readout' },
              ].map((token) => (
                <div
                  key={token.label}
                  onClick={() => handleCopy(token.value, token.label)}
                  className="p-2 rounded-lg bg-[#07080b] border border-white/5 hover:border-white/20 transition-all flex items-center justify-between gap-2 cursor-pointer group"
                >
                  <div className="space-y-0.5">
                    <span className="text-purple-400 font-semibold block">{token.label}</span>
                    <span className="text-[10px] text-white/50 block font-sans">{token.desc}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-white/80 font-semibold">{token.value}</span>
                    <div className="p-1 rounded bg-white/5 text-white/40 group-hover:text-white">
                      {copiedToken === token.label ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Copy Snippet */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-sky-950/20 via-black to-purple-950/20 border border-sky-500/20 flex items-center justify-between text-xs font-mono">
            <span className="text-white/70">Export component as React 19 / TSX</span>
            <button
              type="button"
              onClick={() => handleCopy(`<div className="w-96 p-6 rounded-2xl bg-[#0f1015] border border-white/10 flex flex-col gap-4 shadow-xl">...</div>`, 'snippet')}
              className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white text-white hover:text-black transition-colors cursor-pointer text-[11px] font-semibold flex items-center gap-1.5"
            >
              {copiedToken === 'snippet' ? 'Copied TSX!' : 'Copy TSX'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
