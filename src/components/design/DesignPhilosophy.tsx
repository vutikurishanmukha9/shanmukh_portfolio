import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Activity, Layers, ShieldCheck } from 'lucide-react';

const PRINCIPLES = [
  {
    number: '01',
    title: 'Clarity and Clean Layouts',
    description: 'Every screen should be easy to understand at a glance. Information is grouped logically, clutter is removed, and key actions are immediately obvious.',
    icon: Compass,
    tag: 'CLEAN LAYOUTS',
    accent: '#6366f1'
  },
  {
    number: '02',
    title: 'Consistent Design Systems',
    description: 'Styles, colors, and components in Figma connect directly with React and TypeScript code, ensuring design and development always stay in sync.',
    icon: Layers,
    tag: 'DESIGN SYSTEMS',
    accent: '#10b981'
  },
  {
    number: '03',
    title: 'Fast and Responsive Feel',
    description: 'A great app must feel instant. Smooth animations, immediate button feedback, and quick loading make using the product feel effortless.',
    icon: Activity,
    tag: 'SPEED & MOTION',
    accent: '#f59e0b'
  },
  {
    number: '04',
    title: 'Accessible for Everyone',
    description: 'High contrast text, clear keyboard shortcuts, and screen-reader support ensure the product is comfortable and easy for everyone to use.',
    icon: ShieldCheck,
    tag: 'ACCESSIBILITY',
    accent: '#06b6d4'
  }
];

export const DesignPhilosophy: React.FC = () => {
  return (
    <section id="philosophy" className="relative scroll-mt-24 py-3 sm:py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-3 sm:mb-4 border-b border-white/5 pb-3">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest text-primary uppercase">
            <Compass className="w-3.5 h-3.5" />
            <span>CORE VALUES // 4 PRINCIPLES</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-semibold tracking-[-0.035em] text-[#f7f8f8] font-jakarta">
            Core Design <span className="font-instrument italic font-normal tracking-normal text-white/95">Principles</span>
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-white/60 max-w-md leading-relaxed font-sans">
          Foundational engineering principles that guide how I build fast, accessible, and user-friendly software.
        </p>
      </div>

      {/* 4-Column Principles Matrix */}
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {PRINCIPLES.map((principle, index) => {
          const Icon = principle.icon;
          return (
            <motion.div
              key={principle.number}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative rounded-2xl p-1.5 bg-white/[0.03] border border-white/10 hover:border-white/20 transition-[border-color,background-color] duration-500 overflow-hidden flex flex-col"
            >
              <div className="relative rounded-[calc(1rem-0.125rem)] bg-[#0d0e12] border border-white/5 p-5 sm:p-6 flex flex-col justify-between h-full space-y-4">
                
                {/* Top Number & Icon */}
                <div className="flex items-center justify-between">
                  <span className="text-xl sm:text-2xl font-mono font-bold text-white/30 group-hover:text-white transition-colors">
                    {principle.number}
                  </span>
                  <div className="p-2 rounded-full bg-white/5 border border-white/10 text-white/80 group-hover:text-white transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-1.5 flex-1">
                  <h3 className="text-base font-semibold text-white tracking-tight font-jakarta">
                    {principle.title}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed font-sans pt-1">
                    {principle.description}
                  </p>
                </div>

                {/* Bottom Indicator */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[9.5px] font-mono text-white/40">
                  <span>{principle.tag}</span>
                  <span className="text-emerald-400">VERIFIED</span>
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
