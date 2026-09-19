import React from 'react';
import { motion } from 'framer-motion';
import { Compass, ArrowRight, Layers, Cpu, Code2 } from 'lucide-react';

export const StudioAbout: React.FC = () => {
  const evolutionSteps = [
    { code: 'ECE', label: 'HARDWARE & CIRCUITS', desc: 'Ground-level physics, signal processing, and silicon thinking.' },
    { code: 'CLOUD', label: 'DISTRIBUTED ARCHITECTURE', desc: 'AWS infrastructure, server resilience, and scalable backends.' },
    { code: 'DATA', label: 'INFORMATION DESIGN', desc: 'Polars, statistical pipelines, and turning raw telemetry into insight.' },
    { code: 'AI', label: 'INTELLIGENT SYSTEMS', desc: 'RAG retrieval, latency-optimized token streaming, and LLM evaluation.' },
    { code: 'PRODUCT', label: 'SYSTEM ARCHITECTURE', desc: 'Information architecture, user flows, and ergonomics.' },
    { code: 'DESIGN', label: 'INTERACTION & TACTILE UI', desc: 'Where software feels physical, obvious, and human.' },
  ];

  return (
    <section id="studio-about" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-6 sm:py-10 select-none">
      
      {/* Section Header */}
      <div className="flex flex-wrap items-end justify-between border-b-3 border-[#0A0A0A] pb-4 mb-6 sm:mb-8 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#FFD84D] border border-[#0A0A0A]" />
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#0A0A0A]">
              07 / THE HUMAN EQUATION
            </span>
          </div>
          <h2 className="font-['Space_Grotesk'] text-4xl sm:text-6xl font-black text-[#0A0A0A] uppercase tracking-tight">
            ABOUT SHANMUKH
          </h2>
        </div>

        <div className="text-right">
          <span className="font-mono text-xs font-bold text-[#0A0A0A]/60 block uppercase">
            DISCIPLINE PHILOSOPHY
          </span>
          <span className="font-mono text-sm font-bold text-[#0A0A0A]">
            DESIGNER · BUILDER · PROBLEM SOLVER
          </span>
        </div>
      </div>

      {/* Main Editorial Statement Card */}
      <div className="bg-[#FFFFFF] border-3 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[8px_8px_0px_#0A0A0A] p-4 sm:p-10 lg:p-12 mb-8 sm:mb-12 space-y-6">
        <div className="max-w-4xl space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0A0A0A]/60 block">
            STATEMENT OF PURPOSE
          </span>
          <h3 className="font-['Space_Grotesk'] text-2xl sm:text-4xl lg:text-5xl font-bold text-[#0A0A0A] tracking-tight leading-[1.1] break-words">
            I work where design and technology stop behaving like separate disciplines.
          </h3>
          <p className="font-['Inter'] text-base sm:text-lg text-[#0A0A0A]/85 leading-relaxed pt-2">
            Most digital products fail not from lack of features, but from lack of empathy for human perception. My foundation in engineering allows me to respect the reality of distributed systems, while my obsession with typography and interaction turns complex mechanics into clear, tactile software.
          </p>
        </div>
      </div>

      {/* Visual Timeline Evolution: ECE -> CLOUD -> DATA -> AI -> PRODUCT -> DESIGN */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-[#0A0A0A] pb-2">
          <span className="font-mono text-xs font-bold uppercase text-[#0A0A0A]">
            DISCIPLINARY EVOLUTION // TIMELINE
          </span>
          <span className="font-mono text-[10px] text-[#0A0A0A]/60 uppercase">
            CONNECTING THE ROOTS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {evolutionSteps.map((step, idx) => (
            <div
              key={step.code}
              className="p-3.5 sm:p-4 bg-[#FFFFFF] border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] sm:shadow-[3px_3px_0px_#0A0A0A] space-y-2 hover:bg-[#FFD84D] transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-black text-[#0A0A0A]">
                  {step.code}
                </span>
                <span className="text-[10px] font-mono font-bold text-[#0A0A0A]/40">
                  0{idx + 1}
                </span>
              </div>
              <h4 className="font-['Space_Grotesk'] text-xs font-bold text-[#0A0A0A] uppercase">
                {step.label}
              </h4>
              <p className="font-['Inter'] text-[11px] text-[#0A0A0A]/80 leading-snug">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3 Core Tenets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-10">
        {[
          {
            num: '01',
            title: 'FUNCTION OVER DECORATION',
            body: 'Aesthetic pleasure without usability is vanity. Every shadow, line weight, and color token serves to communicate hierarchy.',
          },
          {
            num: '02',
            title: 'SYSTEMS THINKING, HUMAN FEELINGS',
            body: 'Design systems must be rigorously modular for developers while feeling effortlessly intuitive and emotional for users.',
          },
          {
            num: '03',
            title: 'CODE AS THE ULTIMATE PROTOTYPE',
            body: 'Static mockups lie. True product interaction requires physics, sub-16ms frame timing, and actual production DOM states.',
          },
        ].map((t) => (
          <div
            key={t.num}
            className="p-4 sm:p-6 bg-[#FFFFFF] border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] sm:shadow-[4px_4px_0px_#0A0A0A] space-y-2"
          >
            <span className="text-xs font-mono font-black px-2 py-0.5 bg-[#FFD84D] border border-[#0A0A0A] inline-block mb-1">
              TENET {t.num}
            </span>
            <h4 className="font-['Space_Grotesk'] text-base sm:text-lg font-bold text-[#0A0A0A] uppercase">
              {t.title}
            </h4>
            <p className="font-['Inter'] text-xs sm:text-sm text-[#0A0A0A]/80 leading-relaxed">
              {t.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
