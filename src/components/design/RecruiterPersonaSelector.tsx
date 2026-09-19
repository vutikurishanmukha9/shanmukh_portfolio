import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Layers, 
  Cpu, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight,
  ShieldCheck,
  Terminal,
  Activity
} from 'lucide-react';
import { useSound } from '@/hooks/useSound';

export type RecruiterPersonaKey = 'executive' | 'systems' | 'product' | 'ai-frontier';

export interface PersonaContent {
  id: RecruiterPersonaKey;
  label: string;
  roleTitle: string;
  badge: string;
  badgeColor: string;
  summary: string;
  jumpTarget: string;
  jumpLabel: string;
  metrics: { label: string; value: string; detail: string }[];
  recommendedProjects: { name: string; tag: string }[];
}

export const PERSONA_DATA: Record<RecruiterPersonaKey, PersonaContent> = {
  executive: {
    id: 'executive',
    label: 'VP Product / Founder',
    roleTitle: 'Executive Focus: Business Velocity & Conversion ROI',
    badge: 'BUSINESS IMPACT',
    badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    summary: 'Accelerating product delivery cycles by 35% through design-to-code pipelines, cutting customer acquisition friction, and shipping revenue-generating apps without technical debt.',
    jumpTarget: 'works',
    jumpLabel: 'Review Shipped Case Studies',
    metrics: [
      { label: 'Time-to-Production', value: '3.2 Wks', detail: 'From concept wireframe to production bundle' },
      { label: 'Self-Serve Conversion', value: '+81%', detail: 'Achieved via Prompt Buddy guided flows' },
      { label: 'Apps Shipped', value: '7 Apps', detail: '100% production code in React & TypeScript' }
    ],
    recommendedProjects: [
      { name: 'AI Royal Rumble', tag: 'High-Volume Voting Engine' },
      { name: 'CleanSlate Studio', tag: 'Privacy Metadata Scanner' },
      { name: 'Prompt Buddy', tag: 'Conversational Flow Platform' }
    ]
  },
  systems: {
    id: 'systems',
    label: 'Design Systems Lead',
    roleTitle: 'Systems Focus: Token Parity, Scalability & WCAG AAA',
    badge: 'DESIGN SYSTEMS',
    badgeColor: 'text-sky-400 border-sky-500/30 bg-sky-500/10',
    summary: 'Building unified design token architectures bridging Figma Variables directly with React 19 and Tailwind CSS v4. Enforcing 100% component reusability and zero layout shift.',
    jumpTarget: 'design-stash',
    jumpLabel: 'Inspect 125 Stash Components',
    metrics: [
      { label: 'Stash Components', value: '125 Items', detail: 'Production-ready TSX specimens' },
      { label: 'Figma Token Parity', value: '100%', detail: 'CSS variables mapped to Figma JSON' },
      { label: 'Contrast Ratio', value: 'WCAG AAA', detail: '7.4:1 contrast verified across themes' }
    ],
    recommendedProjects: [
      { name: 'Component Stash', tag: '125 Open Interactive Bits' },
      { name: 'Craft Lab Tokens', tag: 'Auto-Layout & Spring Physics' },
      { name: 'CleanSlate Architecture', tag: 'Atomic Design Hierarchy' }
    ]
  },
  product: {
    id: 'product',
    label: 'Product Design Lead',
    roleTitle: 'Craft Focus: Qualitative Research, Rigor & Usability',
    badge: 'INTERACTION DESIGN',
    badgeColor: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    summary: 'Synthesizing qualitative user feedback into intuitive interfaces, testing edge-case friction, eliminating cognitive overload, and documenting every critical decision fork.',
    jumpTarget: 'craft-lab',
    jumpLabel: 'Explore Interaction Lab',
    metrics: [
      { label: 'Usability Friction', value: '-64%', detail: 'Average task completion error reduction' },
      { label: 'User Study Rounds', value: '45+ Tests', detail: 'Qualitative prototype verification' },
      { label: 'Decision Forks', value: '100% Audited', detail: 'Shipped vs rejected variants documented' }
    ],
    recommendedProjects: [
      { name: 'HeartOut Platform', tag: 'Emotional Expression UX' },
      { name: 'Ele-Visualize', tag: 'Spatial Data Visualization' },
      { name: 'GetReport Studio', tag: 'Data Export Workflow' }
    ]
  },
  'ai-frontier': {
    id: 'ai-frontier',
    label: 'Frontier AI Specialist',
    roleTitle: 'AI UX Focus: Non-Deterministic Interfaces & Canvas Workstations',
    badge: 'FRONTIER AI UX',
    badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    summary: 'Mastery over 15 generative AI tools (Lovable, Bolt, v0, Claude Code, Codex). Designing resilient interfaces for non-deterministic model streams, real-time prompts, and agentic workflows.',
    jumpTarget: 'ai-process-matrix',
    jumpLabel: 'View 15 AI Tools Matrix',
    metrics: [
      { label: 'AI Stack Mastery', value: '15 Tools', detail: 'From ideation to coded prototypes' },
      { label: 'Prototyping Velocity', value: '4x Speed', detail: 'Functional coded sandboxes in hours' },
      { label: 'LLM Evaluators', value: '10+ Models', detail: 'Benchmarking UX in AI Royal Rumble' }
    ],
    recommendedProjects: [
      { name: 'AI Royal Rumble', tag: 'Multi-Model Blind Comparison' },
      { name: 'Prompt Buddy', tag: 'Structured Prompt Engineering' },
      { name: 'AI Pipeline Timeline', tag: 'Complete 5-Stage Methodology' }
    ]
  }
};

export const RecruiterPersonaSelector: React.FC = () => {
  const { playClick } = useSound();
  const [activePersona, setActivePersona] = useState<RecruiterPersonaKey>('executive');
  const current = PERSONA_DATA[activePersona];

  const handleSelect = (key: RecruiterPersonaKey) => {
    playClick(850, 0.02, 'sine');
    setActivePersona(key);
  };

  const scrollToTarget = (targetId: string) => {
    playClick(950, 0.03, 'sine');
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full rounded-2xl bg-[#0b0c11] border border-white/10 p-5 sm:p-6 space-y-5 select-none shadow-2xl">
      {/* Top Selector Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span className="font-mono text-xs font-semibold tracking-wider text-white/90 uppercase">
            TAILOR DOSSIER TO YOUR HIRING NEED:
          </span>
        </div>
        <span className="text-[10px] font-mono text-white/40">
          SELECT YOUR REVIEW PERSPECTIVE
        </span>
      </div>

      {/* 4 Persona Tab Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {(Object.keys(PERSONA_DATA) as RecruiterPersonaKey[]).map((key) => {
          const item = PERSONA_DATA[key];
          const isSelected = activePersona === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => handleSelect(key)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer font-mono text-xs flex flex-col justify-between gap-1.5 ${
                isSelected
                  ? 'bg-white text-black border-white font-semibold shadow-lg scale-[1.02]'
                  : 'bg-white/[0.03] hover:bg-white/[0.07] text-white/70 hover:text-white border-white/10'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[9.5px] uppercase tracking-wider opacity-70">
                  {key === 'executive' ? 'EXEC' : key === 'systems' ? 'SYSTEMS' : key === 'product' ? 'CRAFT' : 'AI'}
                </span>
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-black' : 'bg-white/30'}`} />
              </div>
              <span className="font-sans font-medium text-xs truncate w-full">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Persona Dossier Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePersona}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 pt-1"
        >
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-0.5">
              <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider border ${current.badgeColor}`}>
                {current.badge}
              </span>
              <h4 className="font-jakarta text-base sm:text-lg font-bold text-white tracking-tight">
                {current.roleTitle}
              </h4>
            </div>
            <button
              type="button"
              onClick={() => scrollToTarget(current.jumpTarget)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black font-mono text-xs font-semibold transition-all cursor-pointer self-start sm:self-center"
            >
              <span>{current.jumpLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed max-w-3xl">
            {current.summary}
          </p>

          {/* 3 Metric Scorecard Cards */}
          <div className="grid sm:grid-cols-3 gap-3 pt-1">
            {current.metrics.map((metric, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-white/50 uppercase block">
                  {metric.label}
                </span>
                <span className="text-xl font-bold font-jakarta text-white tracking-tight block">
                  {metric.value}
                </span>
                <p className="text-[11px] font-sans text-white/60 leading-relaxed">
                  {metric.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Curated Recommendations Row */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10 text-xs font-mono">
            <span className="text-white/40 text-[11px]">RECOMMENDED ARTIFACTS:</span>
            {current.recommendedProjects.map((proj, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80"
              >
                <span className="text-white font-medium">{proj.name}</span>
                <span className="text-white/30 text-[10px]">({proj.tag})</span>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
