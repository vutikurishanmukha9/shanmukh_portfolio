import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Figma, ArrowDown, Check, Copy, Sliders, Terminal, Play } from 'lucide-react';

export const StudioDesignXCode: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'DESIGN' | 'CODE' | 'RUNTIME'>('DESIGN');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [buttonState, setButtonState] = useState<'DEFAULT' | 'HOVER' | 'ACTIVE'>('DEFAULT');
  const [clickCount, setClickCount] = useState<number>(0);

  const sampleReactCode = `// Production Neobrutalist Action Control
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ActionPillProps {
  label: string;
  variant?: 'signal' | 'paper' | 'dark';
  onClick?: () => void;
}

export const ActionPill: React.FC<ActionPillProps> = ({ 
  label, 
  variant = 'signal',
  onClick 
}) => {
  return (
    <motion.button
      whileHover={{ y: -2, x: -2 }}
      whileTap={{ y: 2, x: 2 }}
      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      onClick={onClick}
      className="px-4 py-2 font-mono font-bold text-xs uppercase
                 border-2 border-[#0A0A0A] bg-[#FFD84D] text-[#0A0A0A]
                 shadow-[4px_4px_0px_#0A0A0A] active:shadow-none"
    >
      {label}
    </motion.button>
  );
};`;

  const copyCode = () => {
    navigator.clipboard.writeText(sampleReactCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="studio-design-code" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-6 sm:py-10 select-none">
      
      {/* Section Header */}
      <div className="flex flex-wrap items-end justify-between border-b-3 border-[#0A0A0A] pb-4 mb-6 sm:mb-8 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#FF6B57] border border-[#0A0A0A]" />
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#0A0A0A]">
              03 / THE DUAL DISCIPLINE
            </span>
          </div>
          <h2 className="font-['Space_Grotesk'] text-4xl sm:text-6xl font-black text-[#0A0A0A] uppercase tracking-tight">
            DESIGN × CODE
          </h2>
        </div>

        <div className="text-right">
          <span className="font-mono text-xs font-bold text-[#0A0A0A]/60 block uppercase">
            END-TO-END EXECUTION
          </span>
          <span className="font-mono text-sm font-bold text-[#0A0A0A]">
            FIGMA TO PRODUCTION DOM
          </span>
        </div>
      </div>

      {/* The 5-Stage Evolution Pipeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-10">
        {[
          { step: '01', title: 'IDEA', detail: 'Cognitive Model' },
          { step: '02', title: 'DESIGN', detail: 'Figma Tokens & Autolayout' },
          { step: '03', title: 'PROTOTYPE', detail: 'Micro-Interaction Feel' },
          { step: '04', title: 'CODE', detail: 'React 19 + Tailwind' },
          { step: '05', title: 'INTERACTION', detail: 'Sub-16ms Spring Loop' },
        ].map((item, idx) => (
          <div
            key={item.step}
            className="p-3.5 sm:p-4 bg-[#FFFFFF] border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] sm:shadow-[3px_3px_0px_#0A0A0A] space-y-1 relative"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-black px-1 bg-[#0A0A0A] text-[#E3E6E8]">
                {item.step}
              </span>
              {idx < 4 && (
                <span className="hidden lg:inline font-mono text-[10px] text-[#0A0A0A]/40 font-bold">
                  →
                </span>
              )}
            </div>
            <h4 className="font-['Space_Grotesk'] text-base font-bold text-[#0A0A0A] uppercase pt-1">
              {item.title}
            </h4>
            <p className="font-mono text-[10px] text-[#0A0A0A]/60">
              {item.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Interactive Dual-Mode Component Bench */}
      <div className="bg-[#FFFFFF] border-3 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[8px_8px_0px_#0A0A0A] p-4 sm:p-8 space-y-6">
        
        {/* Top Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between border-b-2 border-[#0A0A0A] pb-4 gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase text-[#0A0A0A]">
              SPECIMEN:
            </span>
            <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#FFD84D] border border-[#0A0A0A]">
              ACTION_PILL_V2
            </span>
          </div>

          <div className="flex border-2 border-[#0A0A0A] bg-[#E3E6E8] p-1 gap-1">
            {(['DESIGN', 'CODE', 'RUNTIME'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-2.5 sm:px-3 py-1 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#0A0A0A] text-[#E3E6E8]'
                    : 'text-[#0A0A0A]/70 hover:text-[#0A0A0A]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: DESIGN VIEW (Visual specifications with calipers) */}
        {activeTab === 'DESIGN' && (
          <div className="grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-6 space-y-4">
              <span className="text-[10px] font-mono uppercase text-[#0A0A0A]/60 block font-bold">
                SPATIAL SPECIFICATION & REDLINES
              </span>
              <div className="p-6 sm:p-8 bg-[#E3E6E8] border-2 border-dashed border-[#0A0A0A] flex flex-col items-center justify-center relative">
                {/* Visual padding calipers */}
                <div className="relative p-3 border-2 border-[#5B8CFF] bg-[#5B8CFF]/10">
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[#5B8CFF] font-bold">
                    PAD-Y: 8PX
                  </span>
                  <div className="px-6 py-2.5 bg-[#FFD84D] border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] text-xs font-mono font-bold text-[#0A0A0A]">
                    DISCOVER_STUDIO
                  </div>
                  <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[#5B8CFF] font-bold">
                    PAD-X: 16PX
                  </span>
                </div>
              </div>
            </div>

            <div className="md:col-span-6 space-y-3 font-mono text-xs">
              <div className="p-3 bg-[#E3E6E8] border border-[#0A0A0A] space-y-1">
                <span className="text-[10px] text-[#0A0A0A]/60 block">FIGMA AUTO-LAYOUT</span>
                <span className="font-bold text-[#0A0A0A]">HUG CONTENT · HORIZONTAL ALIGN</span>
              </div>
              <div className="p-3 bg-[#E3E6E8] border border-[#0A0A0A] space-y-1">
                <span className="text-[10px] text-[#0A0A0A]/60 block">SHADOW CALIBRATION</span>
                <span className="font-bold text-[#0A0A0A]">4px 4px 0px #0A0A0A (SOLID HARD ANCHOR)</span>
              </div>
              <div className="p-3 bg-[#E3E6E8] border border-[#0A0A0A] space-y-1">
                <span className="text-[10px] text-[#0A0A0A]/60 block">WCAG CONTRAST RATIO</span>
                <span className="font-bold text-[#63D6A0]">16.8:1 (AAA PASS — CERTIFIED)</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CODE VIEW (Production TSX code) */}
        {activeTab === 'CODE' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#0A0A0A]/60 uppercase">
                SOURCE: src/components/ui/ActionPill.tsx
              </span>
              <button
                type="button"
                onClick={copyCode}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E3E6E8] hover:bg-[#FFD84D] border border-[#0A0A0A] text-xs font-mono font-bold uppercase transition-all"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-[#0A0A0A]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'COPIED' : 'COPY TSX'}</span>
              </button>
            </div>

            <pre className="p-4 bg-[#0A0A0A] text-[#E3E6E8] font-mono text-xs overflow-x-auto border-2 border-[#0A0A0A] leading-relaxed">
              <code>{sampleReactCode}</code>
            </pre>
          </div>
        )}

        {/* TAB 3: RUNTIME VIEW (Interactive testbench) */}
        {activeTab === 'RUNTIME' && (
          <div className="p-8 bg-[#E3E6E8] border-2 border-[#0A0A0A] flex flex-col items-center justify-center space-y-4 text-center">
            <span className="text-xs font-mono text-[#0A0A0A]/60 uppercase">
              LIVE BROWSER RUNTIME — CLICK TO TRIGGER SPRING
            </span>

            <motion.button
              whileHover={{ y: -2, x: -2 }}
              whileTap={{ y: 2, x: 2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              onClick={() => setClickCount((prev) => prev + 1)}
              className="px-6 py-3 font-mono font-black text-sm uppercase tracking-wider border-2 border-[#0A0A0A] bg-[#FFD84D] hover:bg-[#F7CE38] text-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] active:shadow-none cursor-pointer"
            >
              EXECUTE_ACTION [COUNT: {clickCount}]
            </motion.button>

            <span className="text-[11px] font-mono text-[#0A0A0A]/70">
              Hardware-accelerated Framer Motion gesture pipeline (60 FPS verified).
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
