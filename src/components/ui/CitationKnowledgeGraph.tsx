import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Radio, Cpu, Layers, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Node {
  id: string;
  label: string;
  category: string;
  x: number; // percentage
  y: number; // percentage
  icon: React.ElementType;
  description: string;
  metric: string;
}

const nodes: Node[] = [
  {
    id: 'core',
    label: 'IEEE Paper: WPT Resonant Coupling',
    category: 'Core Publication',
    x: 50,
    y: 50,
    icon: FileText,
    description: 'Investigation into strongly coupled magnetic resonance for mid-range power transmission and efficiency optimization.',
    metric: 'IEEE Published // 2024',
  },
  {
    id: 'resonance',
    label: 'Resonant Magnetic Coupling',
    category: 'Physics & Electromagnetics',
    x: 20,
    y: 26,
    icon: Radio,
    description: 'Mathematical modeling of high Q-factor LC resonators operating at resonant frequencies to minimize radiation losses.',
    metric: 'Q-Factor: > 450',
  },
  {
    id: 'impedance',
    label: 'Dynamic Impedance Matching',
    category: 'Circuit Architecture',
    x: 80,
    y: 26,
    icon: Zap,
    description: 'Auto-tuning LC network topologies compensating for varying coupling coefficients under spatial displacement.',
    metric: 'Eff: 88.4% Peak',
  },
  {
    id: 'iot',
    label: 'Autonomous IoT Sensor Nodes',
    category: 'Embedded Deployment',
    x: 18,
    y: 74,
    icon: Cpu,
    description: 'Self-sustaining remote micro-sensor nodes powered entirely via ambient RF and resonant magnetic fields.',
    metric: 'Power Draw: 12mW',
  },
  {
    id: 'simulation',
    label: 'FEM Electromagnetic Modeling',
    category: 'Simulation & Rigor',
    x: 82,
    y: 74,
    icon: Layers,
    description: 'Full-wave 3D electromagnetic simulations evaluating near-field magnetic flux distribution and specific absorption rates.',
    metric: 'Mesh: 120k elements',
  },
];

const edges = [
  { from: 'core', to: 'resonance' },
  { from: 'core', to: 'impedance' },
  { from: 'core', to: 'iot' },
  { from: 'core', to: 'simulation' },
  { from: 'resonance', to: 'impedance' },
  { from: 'iot', to: 'simulation' },
];

export const CitationKnowledgeGraph: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>('core');

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];

  return (
    <div className="w-full rounded-xl border-[0.5px] border-border/80 bg-card/40 backdrop-blur-md p-5 md:p-6 space-y-4 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b-[0.5px] border-border/40">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-mono tracking-widest uppercase font-semibold text-foreground">
            Citation & Research Knowledge Graph
          </span>
        </div>
        <span className="text-[9px] font-mono text-muted-foreground">
          INTERACTIVE 2D CITATION TOPOLOGY // 5 NODES
        </span>
      </div>

      {/* 2D Interactive SVG Graph Canvas */}
      <div className="relative h-64 sm:h-72 w-full rounded-lg border-[0.5px] border-border/60 bg-background/60 overflow-hidden">
        {/* Subtle dot grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#cc785c_0.75px,transparent_0.75px)] [background-size:16px_16px] opacity-[0.12]" />

        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Render Connections */}
          {edges.map((edge) => {
            const fromNode = nodes.find((n) => n.id === edge.from)!;
            const toNode = nodes.find((n) => n.id === edge.to)!;
            const isConnectedToActive = activeNodeId === edge.from || activeNodeId === edge.to;

            return (
              <g key={`${edge.from}-${edge.to}`}>
                <line
                  x1={`${fromNode.x}%`}
                  y1={`${fromNode.y}%`}
                  x2={`${toNode.x}%`}
                  y2={`${toNode.y}%`}
                  stroke={isConnectedToActive ? 'hsl(var(--primary))' : 'hsl(var(--border))'}
                  strokeWidth={isConnectedToActive ? 1.8 : 0.75}
                  strokeDasharray={isConnectedToActive ? '4 2' : 'none'}
                  className={cn('transition-all duration-300', isConnectedToActive && 'animate-pulse')}
                />
              </g>
            );
          })}
        </svg>

        {/* Render Interactive Nodes */}
        {nodes.map((node) => {
          const Icon = node.icon;
          const isActive = activeNodeId === node.id;
          const isCore = node.id === 'core';

          return (
            <motion.button
              key={node.id}
              onClick={() => setActiveNodeId(node.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className={cn(
                'absolute -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-full border transition-all duration-200 shadow-sm flex items-center justify-center cursor-pointer group',
                isActive
                  ? 'bg-primary text-primary-foreground border-primary ring-4 ring-primary/20 scale-110 z-20'
                  : isCore
                  ? 'bg-card text-foreground border-primary/50 ring-2 ring-primary/10 z-10'
                  : 'bg-card text-muted-foreground hover:text-foreground border-border hover:border-primary/40 z-10'
              )}
            >
              <Icon className={cn('w-4 h-4', isActive ? 'text-primary-foreground' : isCore ? 'text-primary' : 'text-muted-foreground')} />

              {/* Floating Node Label */}
              <span
                className={cn(
                  'hidden sm:block absolute whitespace-nowrap px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider transition-all pointer-events-none shadow-sm',
                  node.y > 50 ? '-bottom-6' : '-top-6',
                  isActive
                    ? 'bg-foreground text-background font-bold !block z-30'
                    : 'bg-card/90 text-muted-foreground border-[0.5px] border-border opacity-75 group-hover:opacity-100'
                )}
              >
                {node.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Selected Node Telemetry Readout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className="p-3.5 rounded-lg border-[0.5px] border-border/80 bg-background/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold">{activeNode.label}</span>
              <span className="text-[8px] px-1.5 py-0.2 rounded bg-muted text-muted-foreground uppercase">
                {activeNode.category}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed max-w-xl">
              {activeNode.description}
            </p>
          </div>

          <div className="text-right shrink-0">
            <div className="text-[9px] text-muted-foreground uppercase">RESEARCH SPEC</div>
            <div className="text-foreground font-semibold font-mono text-[11px]">{activeNode.metric}</div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
