import React, { useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Move, BarChart2, MousePointer, Sliders, ToggleLeft, ToggleRight, Layers } from 'lucide-react';

export const StudioLab: React.FC = () => {
  // Experiment 001: Magnetic Type
  const magX = useMotionValue(0);
  const magY = useMotionValue(0);
  const springMagX = useSpring(magX, { stiffness: 200, damping: 15 });
  const springMagY = useSpring(magY, { stiffness: 200, damping: 15 });

  const handleMagneticMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.35;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.35;
    magX.set(x);
    magY.set(y);
  };

  const handleMagneticLeave = () => {
    magX.set(0);
    magY.set(0);
  };

  // Experiment 003: Data Morph
  const [dataMorphMode, setDataMorphMode] = useState<'RAW' | 'CHART'>('RAW');
  const sampleData = [
    { label: 'Q1', val: 42, col: '#FFD84D' },
    { label: 'Q2', val: 86, col: '#5B8CFF' },
    { label: 'Q3', val: 65, col: '#FF6B57' },
    { label: 'Q4', val: 98, col: '#63D6A0' },
  ];

  // Experiment 004: Cursor Studio
  const [cursorMode, setCursorMode] = useState<'DEFAULT' | 'INSPECT' | 'CROSSHAIR' | 'MAGNIFY'>('DEFAULT');

  // Experiment 005: Responsive Type
  const [typeScale, setTypeScale] = useState<number>(36);

  // Experiment 006: Interface Playground
  const [tactileToggles, setTactileToggles] = useState<{ [key: string]: boolean }>({
    haptic: true,
    grid: false,
    sound: true,
    dark: false,
  });

  const toggleSwitch = (key: string) => {
    setTactileToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section id="studio-lab" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-6 sm:py-10 select-none">
      
      {/* Section Header */}
      <div className="flex flex-wrap items-end justify-between border-b-3 border-[#0A0A0A] pb-4 mb-6 sm:mb-8 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#5B8CFF] border border-[#0A0A0A]" />
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#0A0A0A]">
              02 / THE EXPERIMENTAL PLAYGROUND
            </span>
          </div>
          <h2 className="font-['Space_Grotesk'] text-4xl sm:text-6xl font-black text-[#0A0A0A] uppercase tracking-tight">
            LAB // 001
          </h2>
        </div>

        <div className="text-right">
          <span className="font-mono text-xs font-bold text-[#0A0A0A]/60 block uppercase">
            ACTIVE EXPERIMENTS
          </span>
          <span className="font-mono text-sm font-bold text-[#0A0A0A]">
            06 INTERACTIVE CANVASES
          </span>
        </div>
      </div>

      {/* Experimental Asymmetrical Bento Grid */}
      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        
        {/* ============================================================ */}
        {/* EXPERIMENT 001: MAGNETIC TYPE (6 Columns) */}
        {/* ============================================================ */}
        <div
          onMouseMove={handleMagneticMove}
          onMouseLeave={handleMagneticLeave}
          className="md:col-span-6 bg-[#FFFFFF] border-3 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[6px_6px_0px_#0A0A0A] p-4 sm:p-6 flex flex-col justify-between group cursor-pointer"
        >
          <div className="flex items-center justify-between border-b-2 border-[#0A0A0A] pb-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-[#0A0A0A] text-[#E3E6E8]">
                001
              </span>
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#0A0A0A]">
                MAGNETIC TYPE
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#0A0A0A]/60 uppercase">
              PHYSICAL OFFSET
            </span>
          </div>

          <div className="py-6 sm:py-8 text-center overflow-hidden">
            <motion.div style={{ x: springMagX, y: springMagY }}>
              <span className="text-[11px] font-mono text-[#0A0A0A]/60 uppercase block mb-1">
                HOVER TO ATTRACT
              </span>
              <h3 className="font-['Space_Grotesk'] text-3xl sm:text-5xl font-black text-[#0A0A0A] tracking-tighter uppercase leading-none">
                TACTILE
                <br />
                <span className="text-[#5B8CFF]">GRAVITY</span>
              </h3>
            </motion.div>
          </div>

          <div className="pt-3 border-t-2 border-[#0A0A0A] flex items-center justify-between text-[10px] font-mono text-[#0A0A0A]/70">
            <span>SPRING: DAMPING 15</span>
            <span className="font-bold text-[#0A0A0A]">CURSORS PULL TYPE</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* EXPERIMENT 002: DRAG INTERFACE (6 Columns) */}
        {/* ============================================================ */}
        <div className="md:col-span-6 bg-[#FFFFFF] border-3 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[6px_6px_0px_#0A0A0A] p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between border-b-2 border-[#0A0A0A] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-[#0A0A0A] text-[#E3E6E8]">
                002
              </span>
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#0A0A0A]">
                DRAG INTERFACE
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#0A0A0A]/60 uppercase flex items-center gap-1">
              <Move className="w-3 h-3" />
              <span>FREE ARTIFACTS</span>
            </span>
          </div>

          {/* Canvas area for dragging */}
          <div className="relative h-44 bg-[#E3E6E8] border border-[#0A0A0A] p-4 flex items-center justify-center gap-2 sm:gap-4 overflow-hidden">
            <motion.div
              drag
              dragConstraints={{ left: -45, right: 45, top: -25, bottom: 25 }}
              whileDrag={{ scale: 1.06, zIndex: 30 }}
              className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-[#FFD84D] border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] font-mono text-[10px] sm:text-xs font-bold text-[#0A0A0A] cursor-grab active:cursor-grabbing select-none"
            >
              TOKEN_A
            </motion.div>

            <motion.div
              drag
              dragConstraints={{ left: -45, right: 45, top: -25, bottom: 25 }}
              whileDrag={{ scale: 1.06, zIndex: 30 }}
              className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-[#5B8CFF] text-[#FFFFFF] border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] font-mono text-[10px] sm:text-xs font-bold cursor-grab active:cursor-grabbing select-none"
            >
              SPRING_B
            </motion.div>

            <motion.div
              drag
              dragConstraints={{ left: -45, right: 45, top: -25, bottom: 25 }}
              whileDrag={{ scale: 1.06, zIndex: 30 }}
              className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-[#FF6B57] text-[#FFFFFF] border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] font-mono text-[10px] sm:text-xs font-bold cursor-grab active:cursor-grabbing select-none"
            >
              PHYSICS_C
            </motion.div>
          </div>

          <div className="pt-3 border-t-2 border-[#0A0A0A] flex items-center justify-between text-[10px] font-mono text-[#0A0A0A]/70">
            <span>ELASTIC CONSTRAINTS</span>
            <span className="font-bold text-[#0A0A0A]">GRAB & REPOSITION</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* EXPERIMENT 003: DATA MORPH (4 Columns) */}
        {/* ============================================================ */}
        <div className="md:col-span-4 bg-[#FFFFFF] border-3 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[6px_6px_0px_#0A0A0A] p-4 sm:p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b-2 border-[#0A0A0A] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-[#0A0A0A] text-[#E3E6E8]">
                003
              </span>
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#0A0A0A]">
                DATA MORPH
              </span>
            </div>
            <button
              type="button"
              onClick={() => setDataMorphMode(dataMorphMode === 'RAW' ? 'CHART' : 'RAW')}
              className="px-2 py-0.5 bg-[#FFD84D] border border-[#0A0A0A] text-[9px] font-mono font-bold uppercase tracking-wider shadow-[1px_1px_0px_#0A0A0A] cursor-pointer"
            >
              TOGGLE: {dataMorphMode}
            </button>
          </div>

          <div className="h-40 bg-[#E3E6E8] border border-[#0A0A0A] p-3 flex flex-col justify-center">
            {dataMorphMode === 'RAW' ? (
              <div className="font-mono text-[11px] text-[#0A0A0A] space-y-1.5">
                <div className="text-[9px] text-[#0A0A0A]/50">CSV_STREAM_LOG:</div>
                {sampleData.map((d) => (
                  <div key={d.label} className="flex justify-between border-b border-[#0A0A0A]/10 pb-0.5">
                    <span>{d.label}_METRIC</span>
                    <span className="font-bold">{d.val}.000_PTS</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-end justify-between h-28 gap-2 pt-2">
                {sampleData.map((d) => (
                  <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${d.val}%` }}
                      transition={{ type: 'spring', damping: 18 }}
                      className="w-full border border-[#0A0A0A]"
                      style={{ backgroundColor: d.col }}
                    />
                    <span className="text-[9px] font-mono font-bold text-[#0A0A0A]">{d.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-3 border-t-2 border-[#0A0A0A] text-[10px] font-mono text-[#0A0A0A]/70 flex justify-between">
            <span>POLARS INGEST</span>
            <span className="font-bold text-[#0A0A0A]">CSV → BARS</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* EXPERIMENT 004: CURSOR STUDIO (4 Columns) */}
        {/* ============================================================ */}
        <div className="md:col-span-4 bg-[#FFFFFF] border-3 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[6px_6px_0px_#0A0A0A] p-4 sm:p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b-2 border-[#0A0A0A] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-[#0A0A0A] text-[#E3E6E8]">
                004
              </span>
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#0A0A0A]">
                CURSOR STUDIO
              </span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#EAE3D2] border border-[#0A0A0A] font-bold">
              {cursorMode}
            </span>
          </div>

          <div className="h-40 bg-[#E3E6E8] border border-[#0A0A0A] p-3 flex flex-col justify-center space-y-2">
            {(['DEFAULT', 'INSPECT', 'CROSSHAIR', 'MAGNIFY'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onMouseEnter={() => setCursorMode(mode)}
                className={`w-full py-1 px-2.5 text-xs font-mono font-bold uppercase tracking-wider border text-left flex items-center justify-between transition-all cursor-pointer ${
                  cursorMode === mode
                    ? 'bg-[#0A0A0A] text-[#E3E6E8] border-[#0A0A0A]'
                    : 'bg-[#FFFFFF] text-[#0A0A0A] border-[#0A0A0A]/30 hover:border-[#0A0A0A]'
                }`}
              >
                <span>{mode} FEEDBACK</span>
                <MousePointer className="w-3 h-3" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t-2 border-[#0A0A0A] text-[10px] font-mono text-[#0A0A0A]/70 flex justify-between">
            <span>STATE DISPATCH</span>
            <span className="font-bold text-[#0A0A0A]">TACTILE HOVER</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* EXPERIMENT 005: RESPONSIVE TYPE (4 Columns) */}
        {/* ============================================================ */}
        <div className="md:col-span-4 bg-[#FFFFFF] border-3 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[6px_6px_0px_#0A0A0A] p-4 sm:p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b-2 border-[#0A0A0A] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-[#0A0A0A] text-[#E3E6E8]">
                005
              </span>
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#0A0A0A]">
                RESPONSIVE TYPE
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#0A0A0A]">
              {typeScale}PX
            </span>
          </div>

          <div className="h-40 bg-[#E3E6E8] border border-[#0A0A0A] p-3 flex flex-col justify-between overflow-hidden">
            <div className="flex-1 flex items-center justify-center">
              <span
                style={{ fontSize: `${typeScale}px` }}
                className="font-['Space_Grotesk'] font-black text-[#0A0A0A] tracking-tighter leading-none block uppercase truncate transition-all duration-75"
              >
                SCALE
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[9px] font-mono text-[#0A0A0A]/60">
                <span>MIN 18PX</span>
                <span>MAX 64PX</span>
              </div>
              <input
                type="range"
                min={18}
                max={64}
                value={typeScale}
                onChange={(e) => setTypeScale(Number(e.target.value))}
                className="w-full accent-[#0A0A0A] cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-3 border-t-2 border-[#0A0A0A] text-[10px] font-mono text-[#0A0A0A]/70 flex justify-between">
            <span>SPACE GROTESK</span>
            <span className="font-bold text-[#0A0A0A]">DYNAMIC INTERPOLATION</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* EXPERIMENT 006: INTERFACE PLAYGROUND (Full 12 Columns) */}
        {/* ============================================================ */}
        <div className="md:col-span-12 bg-[#FFFFFF] border-3 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[6px_6px_0px_#0A0A0A] p-4 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between border-b-2 border-[#0A0A0A] pb-3 gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-[#0A0A0A] text-[#E3E6E8]">
                006
              </span>
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-tight sm:tracking-wider uppercase text-[#0A0A0A]">
                INTERFACE PLAYGROUND — TACTILE SWITCHES
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#63D6A0] border border-[#0A0A0A] text-[#0A0A0A]">
              HARDWARE EMULATION
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { id: 'haptic', label: 'HAPTIC_ENGINE', desc: 'Synthesized click audio' },
              { id: 'grid', label: '12COL_GRID', desc: 'Global spatial overlay' },
              { id: 'sound', label: 'TACTILE_SOUND', desc: 'Analog relay click' },
              { id: 'dark', label: 'HIGH_CONTRAST', desc: 'AAA accessibility clamp' },
            ].map((sw) => {
              const isOn = tactileToggles[sw.id];
              return (
                <div
                  key={sw.id}
                  onClick={() => toggleSwitch(sw.id)}
                  className={`p-3.5 sm:p-4 border-2 border-[#0A0A0A] transition-all cursor-pointer select-none ${
                    isOn
                      ? 'bg-[#FFD84D] shadow-[3px_3px_0px_#0A0A0A] sm:shadow-[4px_4px_0px_#0A0A0A]'
                      : 'bg-[#E3E6E8] shadow-[2px_2px_0px_#0A0A0A] hover:bg-[#D7DBDF]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-[#0A0A0A]">
                      {sw.label}
                    </span>
                    <span
                      className={`text-[9px] font-mono font-black px-1.5 py-0.5 border border-[#0A0A0A] ${
                        isOn ? 'bg-[#0A0A0A] text-[#E3E6E8]' : 'bg-[#FFFFFF] text-[#0A0A0A]'
                      }`}
                    >
                      {isOn ? 'ON' : 'OFF'}
                    </span>
                  </div>
                  <p className="text-[11px] font-['Inter'] text-[#0A0A0A]/70">
                    {sw.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
