import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ArrowRight, Layers, Sliders, CheckCircle2, BarChart2, ShieldCheck, Cpu } from 'lucide-react';

export interface StudioProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  disciplines: string[];
  imageSrc: string;
  accentColor: string;
  problem: string;
  solution: string;
  impactMetrics: { label: string; value: string }[];
  systemTokens: {
    typography: string;
    colors: string[];
    grid: string;
    motion: string;
  };
  experienceHighlights: {
    step: string;
    title: string;
    detail: string;
  }[];
  interactiveSample?: React.ReactNode;
}

interface StudioCaseStudyDrawerProps {
  project: StudioProjectItem | null;
  onClose: () => void;
}

export const StudioCaseStudyDrawer: React.FC<StudioCaseStudyDrawerProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'THE SYSTEM' | 'THE EXPERIENCE'>('OVERVIEW');

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0A0A0A]/70 backdrop-blur-sm flex justify-end">
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* The Slide-In Editorial Case Study Canvas */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="relative w-full max-w-4xl min-h-screen bg-[#E3E6E8] border-l-4 border-[#0A0A0A] shadow-2xl p-4 sm:p-8 lg:p-10 z-10 flex flex-col justify-between"
        >
          {/* Top Bar */}
          <div>
            <div className="flex items-center justify-between border-b-2 border-[#0A0A0A] pb-4 mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="px-2 py-0.5 bg-[#FFD84D] text-[#0A0A0A] font-mono font-bold text-xs border border-[#0A0A0A]">
                  CASE STUDY {project.number}
                </span>
                <span className="text-[10px] sm:text-xs font-mono uppercase font-bold text-[#0A0A0A]/60">
                  EDITORIAL SPECIFICATION
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 bg-[#FFFFFF] hover:bg-[#FFD84D] border-2 border-[#0A0A0A] text-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                title="Close Case Study"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Case Study Header & Title */}
            <div className="space-y-3 mb-6">
              <span className="text-xs font-mono font-bold text-[#0A0A0A]/60 uppercase tracking-widest">
                {project.number} / {activeTab}
              </span>
              <h2 className="font-['Space_Grotesk'] text-3xl sm:text-5xl font-black text-[#0A0A0A] uppercase tracking-tight leading-none break-words">
                {project.title}
              </h2>
              <p className="font-['Inter'] text-base sm:text-lg text-[#0A0A0A]/80 font-medium">
                {project.subtitle}
              </p>

              {/* Disciplines Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.disciplines.map((d) => (
                  <span
                    key={d}
                    className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#FFFFFF] border border-[#0A0A0A] shadow-[1px_1px_0px_#0A0A0A] uppercase text-[#0A0A0A]"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Section Tab Switcher (Editorial Navigation) */}
            <div className="flex border-2 border-[#0A0A0A] bg-[#FFFFFF] p-1 gap-1 mb-8 shadow-[3px_3px_0px_#0A0A0A]">
              {(['OVERVIEW', 'THE SYSTEM', 'THE EXPERIENCE'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-1.5 px-1 sm:px-3 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-center transition-all ${
                    activeTab === tab
                      ? 'bg-[#FFD84D] text-[#0A0A0A] border border-[#0A0A0A] shadow-[1px_1px_0px_#0A0A0A]'
                      : 'text-[#0A0A0A]/70 hover:text-[#0A0A0A]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* TAB CONTENT: 01 OVERVIEW */}
            {activeTab === 'OVERVIEW' && (
              <div className="space-y-8">
                {/* Large Hero Visual Representation */}
                <div className="relative border-3 border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] bg-[#FFFFFF] overflow-hidden group">
                  <img
                    src={project.imageSrc}
                    alt={project.title}
                    className="w-full h-72 sm:h-96 object-cover object-top border-b-2 border-[#0A0A0A]"
                  />
                  <div className="p-4 bg-[#FFFFFF] flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-[#0A0A0A]">FIGURE 1.0 — PRIMARY SYSTEM INTERFACE</span>
                    <span className="text-[#0A0A0A]/60">PRODUCTION ASSET</span>
                  </div>
                </div>

                {/* THE PROBLEM Narrative */}
                <div className="p-6 bg-[#FFFFFF] border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#FF6B57]" />
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                      THE PROBLEM
                    </h3>
                  </div>
                  <p className="font-['Space_Grotesk'] text-xl font-bold text-[#0A0A0A] leading-snug">
                    {project.problem}
                  </p>
                </div>

                {/* THE SOLUTION Narrative */}
                <div className="p-6 bg-[#FFFFFF] border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#63D6A0]" />
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                      THE SOLUTION
                    </h3>
                  </div>
                  <p className="font-['Inter'] text-sm sm:text-base text-[#0A0A0A]/85 leading-relaxed">
                    {project.solution}
                  </p>
                </div>

                {/* Impact Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.impactMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="p-3 bg-[#FFFFFF] border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]"
                    >
                      <span className="text-[10px] font-mono text-[#0A0A0A]/60 uppercase block">
                        {metric.label}
                      </span>
                      <span className="font-['Space_Grotesk'] text-2xl font-black text-[#0A0A0A]">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: 02 THE SYSTEM */}
            {activeTab === 'THE SYSTEM' && (
              <div className="space-y-6">
                <div className="p-5 bg-[#FFFFFF] border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] space-y-4">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#0A0A0A]">
                    FOUNDATIONAL TOKENS & ATOMS
                  </h3>
                  
                  {/* Typography Spec */}
                  <div className="p-3 bg-[#E3E6E8] border border-[#0A0A0A]">
                    <span className="text-[10px] font-mono font-bold text-[#0A0A0A]/70 uppercase block">
                      TYPOGRAPHY ARCHITECTURE
                    </span>
                    <span className="font-['Space_Grotesk'] text-lg font-bold text-[#0A0A0A]">
                      {project.systemTokens.typography}
                    </span>
                  </div>

                  {/* Colors Spec */}
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#0A0A0A]/70 uppercase block mb-2">
                      SYSTEM COLOR PALETTE
                    </span>
                    <div className="flex flex-wrap gap-3">
                      {project.systemTokens.colors.map((c) => (
                        <div key={c} className="flex items-center gap-2 p-2 bg-[#E3E6E8] border border-[#0A0A0A]">
                          <div className="w-5 h-5 border border-[#0A0A0A]" style={{ backgroundColor: c }} />
                          <span className="text-xs font-mono font-bold text-[#0A0A0A]">{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Grid & Motion Specs */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-[#E3E6E8] border border-[#0A0A0A]">
                      <span className="text-[10px] font-mono text-[#0A0A0A]/60 block uppercase">SPATIAL GRID</span>
                      <span className="font-mono text-xs font-bold text-[#0A0A0A]">{project.systemTokens.grid}</span>
                    </div>
                    <div className="p-3 bg-[#E3E6E8] border border-[#0A0A0A]">
                      <span className="text-[10px] font-mono text-[#0A0A0A]/60 block uppercase">MOTION SPRING</span>
                      <span className="font-mono text-xs font-bold text-[#0A0A0A]">{project.systemTokens.motion}</span>
                    </div>
                  </div>
                </div>

                {/* System Interactive Sample (if available) */}
                {project.interactiveSample && (
                  <div className="p-5 bg-[#FFFFFF] border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] space-y-3">
                    <span className="text-xs font-mono font-bold uppercase text-[#0A0A0A] block">
                      INTERACTIVE COMPONENT DEMO
                    </span>
                    {project.interactiveSample}
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: 03 THE EXPERIENCE */}
            {activeTab === 'THE EXPERIENCE' && (
              <div className="space-y-6">
                <div className="p-5 bg-[#FFFFFF] border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] space-y-4">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#0A0A0A]">
                    USER WORKFLOW & INTERACTION CHOREOGRAPHY
                  </h3>
                  
                  <div className="space-y-4">
                    {project.experienceHighlights.map((exp, idx) => (
                      <div
                        key={exp.step}
                        className="p-4 bg-[#E3E6E8] border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] flex gap-4 items-start"
                      >
                        <span className="text-xs font-mono font-black px-2 py-1 bg-[#0A0A0A] text-[#E3E6E8]">
                          {exp.step}
                        </span>
                        <div className="space-y-1">
                          <h4 className="font-['Space_Grotesk'] text-base font-bold text-[#0A0A0A]">
                            {exp.title}
                          </h4>
                          <p className="font-['Inter'] text-xs sm:text-sm text-[#0A0A0A]/80 leading-relaxed">
                            {exp.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Bar: Action Trigger */}
          <div className="mt-8 pt-4 border-t-2 border-[#0A0A0A] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <span className="text-xs font-mono font-bold text-[#0A0A0A]">
              END OF CASE STUDY {project.number}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#0A0A0A] text-[#E3E6E8] hover:bg-[#FFD84D] hover:text-[#0A0A0A] font-mono text-xs font-bold uppercase tracking-wider border-2 border-[#0A0A0A] transition-colors cursor-pointer text-center"
            >
              CLOSE SPECIFICATION
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
