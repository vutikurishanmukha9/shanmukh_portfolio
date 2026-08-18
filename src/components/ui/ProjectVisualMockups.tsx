import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  FileText,
  Activity,
  ShieldCheck,
  Atom,
  Hand,
  Sparkles,
  Cpu,
  BarChart2,
  Eye,
  Database,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// 1. Context-Ly CLI / AST Terminal Sandbox
export const ContextLyMockup: React.FC<{ isHovered?: boolean }> = () => {
  const [activeTab, setActiveTab] = useState<'cli' | 'ast'>('cli');

  return (
    <div className="w-full h-full min-h-[170px] rounded-lg bg-[#0b0f19] border border-violet-500/20 p-3.5 flex flex-col justify-between font-mono text-[10px] text-violet-200 overflow-hidden shadow-inner select-none">
      {/* Window Controls & Mode Tabs */}
      <div className="flex items-center justify-between pb-2 border-b border-violet-500/20">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-rose-500/80" />
          <div className="w-2 h-2 rounded-full bg-amber-500/80" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-[9px] text-violet-400/60 font-semibold tracking-wider">
            contextly-cli // v0.4.2
          </span>
        </div>
        <div className="flex items-center gap-1 bg-violet-950/40 p-0.5 rounded border border-violet-500/20 text-[8px]">
          <button
            type="button"
            onClick={() => setActiveTab('cli')}
            className={cn('px-1.5 py-0.5 rounded transition-colors', activeTab === 'cli' ? 'bg-violet-600 text-white font-bold' : 'text-violet-400')}
          >
            EXEC
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ast')}
            className={cn('px-1.5 py-0.5 rounded transition-colors', activeTab === 'ast' ? 'bg-violet-600 text-white font-bold' : 'text-violet-400')}
          >
            AST GRAPH
          </button>
        </div>
      </div>

      {/* Content Area */}
      {activeTab === 'cli' ? (
        <div className="space-y-1.5 py-2">
          <div className="flex items-center gap-1 text-violet-300">
            <span className="text-emerald-400 font-bold">$</span>
            <span>contextly parse --target ./src --cache-ast</span>
          </div>
          <div className="text-[9px] text-violet-400/80 space-y-0.5 pl-2 border-l border-violet-500/30">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-2.5 h-2.5" />
              <span>Parsed 42 modules • 1,280 AST nodes indexed</span>
            </div>
            <div className="text-violet-300/60">Memory Cache: <span className="text-amber-300 font-bold">100% Hit Rate</span> (0.42ms)</div>
          </div>
        </div>
      ) : (
        <div className="py-2 flex items-center justify-around">
          <div className="flex flex-col items-center gap-1">
            <div className="p-1.5 rounded-md bg-violet-900/50 border border-violet-400/40 text-violet-200 text-[8px]">
              Root: AST_MODULE
            </div>
            <div className="w-[1px] h-3 bg-violet-500/40" />
            <div className="flex gap-2 text-[7px]">
              <span className="px-1.5 py-0.5 rounded bg-violet-950 border border-violet-500/30 text-emerald-300">FnDef: parse()</span>
              <span className="px-1.5 py-0.5 rounded bg-violet-950 border border-violet-500/30 text-cyan-300">Class: ContextTree</span>
            </div>
          </div>
        </div>
      )}

      {/* Telemetry Bar */}
      <div className="pt-2 border-t border-violet-500/15 flex items-center justify-between text-[8px] text-violet-400/60">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          PYPI RELEASE READY
        </span>
        <span className="text-violet-300 font-semibold">TESTS: 100% PASS</span>
      </div>
    </div>
  );
};

// 2. GetReport Polars & PDF Pipeline Mockup
export const GetReportMockup: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[170px] rounded-lg bg-[#071322] border border-sky-500/20 p-3.5 flex flex-col justify-between font-mono text-[10px] text-sky-200 select-none shadow-inner">
      <div className="flex items-center justify-between pb-2 border-b border-sky-500/20">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span className="text-[9px] font-bold text-sky-300 tracking-wider uppercase">
            POLARS ETL // RAG PDF PIPELINE
          </span>
        </div>
        <span className="text-[8px] text-sky-400/60 font-semibold">120K ROWS/SEC</span>
      </div>

      <div className="space-y-2 py-2">
        {/* Stream Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[8px] text-sky-300">
            <span>Ingest: raw_dataset.csv</span>
            <span className="text-emerald-400 font-bold">Processed 100%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-sky-950 overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="h-full w-full origin-left bg-gradient-to-r from-sky-500 to-emerald-400 rounded-full"
            />
          </div>
        </div>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 gap-2 text-[8px]">
          <div className="p-1.5 rounded bg-sky-950/60 border border-sky-500/20">
            <span className="text-sky-400/60 block">QUERY TIME</span>
            <span className="text-white font-bold">14.2ms (Polars)</span>
          </div>
          <div className="p-1.5 rounded bg-sky-950/60 border border-sky-500/20">
            <span className="text-sky-400/60 block">OUTPUT PDF</span>
            <span className="text-emerald-400 font-bold">Generated 2.4MB</span>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-sky-500/15 flex items-center justify-between text-[8px] text-sky-400/60">
        <span>REDIS CACHE: ACTIVE</span>
        <span className="text-sky-300 font-semibold">OPENAI EMBEDDINGS</span>
      </div>
    </div>
  );
};

// 3. Candle-Light AI Financial Signal Canvas
export const CandleLightMockup: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[170px] rounded-lg bg-[#140810] border border-rose-500/20 p-3.5 flex flex-col justify-between font-mono text-[10px] text-rose-200 select-none shadow-inner">
      <div className="flex items-center justify-between pb-2 border-b border-rose-500/20">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span className="text-[9px] font-bold text-rose-300 tracking-wider uppercase">
            CANDLE-LIGHT // AI PATTERN ENGINE
          </span>
        </div>
        <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
          CONFIDENCE: 94.2%
        </span>
      </div>

      {/* Interactive Candlestick Chart */}
      <div className="flex items-end justify-between h-14 px-2 py-1 bg-rose-950/20 rounded border border-rose-500/10 relative overflow-hidden">
        {/* Candlestick Bars */}
        {[
          { h: 28, isGreen: false },
          { h: 36, isGreen: true },
          { h: 22, isGreen: false },
          { h: 42, isGreen: true },
          { h: 48, isGreen: true },
          { h: 32, isGreen: false },
          { h: 54, isGreen: true },
        ].map((candle, idx) => (
          <div key={idx} className="flex flex-col items-center gap-0.5">
            <div className={cn('w-[1px] h-2', candle.isGreen ? 'bg-emerald-400' : 'bg-rose-400')} />
            <div
              style={{ height: `${candle.h}px` }}
              className={cn(
                'w-3 rounded-sm shadow-sm transition-all',
                candle.isGreen ? 'bg-emerald-500' : 'bg-rose-500'
              )}
            />
            <div className={cn('w-[1px] h-2', candle.isGreen ? 'bg-emerald-400' : 'bg-rose-400')} />
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-rose-500/15 flex items-center justify-between text-[8px] text-rose-400/60">
        <span>DETECTED: BULLISH DIVERGENCE</span>
        <span className="text-rose-300 font-semibold">LATENCY: 8MS</span>
      </div>
    </div>
  );
};

// 4. HeartOut Security & Story Authentication
export const HeartOutMockup: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[170px] rounded-lg bg-[#140a12] border border-rose-500/20 p-3.5 flex flex-col justify-between font-mono text-[10px] text-rose-200 select-none shadow-inner">
      <div className="flex items-center justify-between pb-2 border-b border-rose-500/20">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
          <span className="text-[9px] font-bold text-rose-300 tracking-wider uppercase">
            HEARTOUT // JWT & RBAC LAYER
          </span>
        </div>
        <span className="text-[8px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300">
          ENCRYPTED
        </span>
      </div>

      <div className="space-y-1.5 py-1">
        <div className="p-2 rounded bg-rose-950/40 border border-rose-500/20 space-y-1">
          <div className="flex items-center justify-between text-[8px] text-rose-400/80">
            <span>HEADER: &#123;&quot;alg&quot;: &quot;HS256&quot;&#125;</span>
            <span className="text-emerald-400">SIGNATURE VERIFIED</span>
          </div>
          <p className="text-[9px] text-rose-100 font-serif italic line-clamp-1">
            &quot;An anonymous voice finding solace in shared vulnerability...&quot;
          </p>
        </div>
      </div>

      <div className="pt-2 border-t border-rose-500/15 flex items-center justify-between text-[8px] text-rose-400/60">
        <span>ROLE: ANONYMOUS_AUTHOR</span>
        <span className="text-rose-300 font-semibold">MONGODB CLUSTER</span>
      </div>
    </div>
  );
};

// 5. Ele-Visualize 3D Molecule & MediaPipe Gesture
export const EleVisualizeMockup: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[170px] rounded-lg bg-[#061510] border border-emerald-500/20 p-3.5 flex flex-col justify-between font-mono text-[10px] text-emerald-200 select-none shadow-inner">
      <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
        <div className="flex items-center gap-2">
          <Atom className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
          <span className="text-[9px] font-bold text-emerald-300 tracking-wider uppercase">
            ELE-VISUALIZE // WEBGL + MEDIAPIPE
          </span>
        </div>
        <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
          TOUCHLESS 3D
        </span>
      </div>

      {/* 3D Node Topology Simulation */}
      <div className="relative h-14 flex items-center justify-center bg-emerald-950/20 rounded border border-emerald-500/10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="relative w-12 h-12 flex items-center justify-center"
        >
          <div className="w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
          <div className="absolute top-0 left-0 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-teal-300 shadow-sm" />
          <div className="absolute inset-0 rounded-full border border-emerald-500/40 border-dashed animate-pulse" />
        </motion.div>
        <span className="absolute right-3 bottom-1.5 text-[8px] text-emerald-400/80 flex items-center gap-1">
          <Hand className="w-2.5 h-2.5 text-emerald-400" />
          <span>HAND: PINCH ROTATE</span>
        </span>
      </div>

      <div className="pt-2 border-t border-emerald-500/15 flex items-center justify-between text-[8px] text-emerald-400/60">
        <span>60 FPS HARDWARE ACCEL</span>
        <span className="text-emerald-300 font-semibold">THREE.JS SHADERS</span>
      </div>
    </div>
  );
};

// 6. PromptBuddy SaaS Template Slot Workspace
export const PromptBuddyMockup: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[170px] rounded-lg bg-[#081220] border border-sky-500/20 p-3.5 flex flex-col justify-between font-mono text-[10px] text-sky-200 select-none shadow-inner">
      <div className="flex items-center justify-between pb-2 border-b border-sky-500/20">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-[9px] font-bold text-sky-300 tracking-wider uppercase">
            PROMPTBUDDY // SLOT OPTIMIZER
          </span>
        </div>
        <span className="text-[8px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300">
          -38% TOKENS
        </span>
      </div>

      <div className="space-y-1.5 py-1">
        <div className="p-2 rounded bg-sky-950/40 border border-sky-500/20 space-y-1 text-[8px]">
          <span className="text-sky-400/80 block uppercase">DYNAMIC PROMPT INJECTION:</span>
          <p className="text-sky-100 font-mono leading-relaxed">
            &quot;Act as <span className="px-1 py-0.2 rounded bg-sky-500/30 text-sky-300 font-bold">&#123;&#123;role&#125;&#125;</span>. Apply constraints <span className="px-1 py-0.2 rounded bg-emerald-500/30 text-emerald-300 font-bold">&#123;&#123;strict_mode&#125;&#125;</span>...&quot;
          </p>
        </div>
      </div>

      <div className="pt-2 border-t border-sky-500/15 flex items-center justify-between text-[8px] text-sky-400/60">
        <span>TEMPLATE SAVED: 12 SLOTS</span>
        <span className="text-sky-300 font-semibold">VITE + TAILWIND</span>
      </div>
    </div>
  );
};

// 7. Computer Vision Bounding Box Mockup (Attendance / Touchless)
export const ComputerVisionMockup: React.FC<{ label?: string }> = ({ label = 'FACIAL DETECTION' }) => {
  return (
    <div className="w-full h-full min-h-[170px] rounded-lg bg-[#061510] border border-emerald-500/20 p-3.5 flex flex-col justify-between font-mono text-[10px] text-emerald-200 select-none shadow-inner">
      <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
        <div className="flex items-center gap-2">
          <Eye className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[9px] font-bold text-emerald-300 tracking-wider uppercase">
            OPENCV // {label}
          </span>
        </div>
        <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
          98.6% MATCH
        </span>
      </div>

      {/* Camera Viewport Simulation */}
      <div className="relative h-14 bg-emerald-950/20 rounded border border-emerald-500/20 flex items-center justify-center overflow-hidden">
        {/* Target Bounding Box */}
        <div className="w-16 h-10 border-2 border-emerald-400 border-dashed rounded relative flex items-center justify-center animate-pulse">
          <span className="absolute -top-3 left-0 text-[7px] bg-emerald-500 text-black px-1 rounded font-bold">
            CONF: 0.98
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </div>
      </div>

      <div className="pt-2 border-t border-emerald-500/15 flex items-center justify-between text-[8px] text-emerald-400/60">
        <span>FRAME TIME: 16MS</span>
        <span className="text-emerald-300 font-semibold">AWS MYSQL SYNC</span>
      </div>
    </div>
  );
};

// 8. Data Insights / HR EDA Mockup
export const AnalyticsChartMockup: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[170px] rounded-lg bg-[#141006] border border-amber-500/20 p-3.5 flex flex-col justify-between font-mono text-[10px] text-amber-200 select-none shadow-inner">
      <div className="flex items-center justify-between pb-2 border-b border-amber-500/20">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[9px] font-bold text-amber-300 tracking-wider uppercase">
            PANDAS // WORKFORCE RETENTION EDA
          </span>
        </div>
        <span className="text-[8px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
          N=15,000
        </span>
      </div>

      {/* Retention Curve Bars */}
      <div className="flex items-end justify-around h-14 px-2 bg-amber-950/20 rounded border border-amber-500/10">
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-8 rounded bg-amber-500/40" />
          <span className="text-[7px] text-amber-400">Q1</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-11 rounded bg-amber-500/70" />
          <span className="text-[7px] text-amber-400">Q2</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-9 rounded bg-amber-500/50" />
          <span className="text-[7px] text-amber-400">Q3</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-13 rounded bg-amber-400" />
          <span className="text-[7px] text-amber-400">Q4</span>
        </div>
      </div>

      <div className="pt-2 border-t border-amber-500/15 flex items-center justify-between text-[8px] text-amber-400/60">
        <span>CORRELATION MATRIX: 0.84</span>
        <span className="text-amber-300 font-semibold">SEABORN EDA</span>
      </div>
    </div>
  );
};

// 9. Jarvis PDF Chatbot — RAG / Document Intelligence Mockup
export const JarvisMockup: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[170px] rounded-lg bg-[#0d0a18] border border-violet-500/20 p-3.5 flex flex-col justify-between font-mono text-[10px] text-violet-200 select-none shadow-inner">
      <div className="flex items-center justify-between pb-2 border-b border-violet-500/20">
        <div className="flex items-center gap-2">
          <FileText className="w-3.5 h-3.5 text-violet-400" />
          <span className="text-[9px] font-bold text-violet-300 tracking-wider uppercase">
            JARVIS // PDF RAG PIPELINE
          </span>
        </div>
        <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
          FAISS READY
        </span>
      </div>

      {/* Chat-like Q&A */}
      <div className="flex-1 flex flex-col gap-1.5 py-2 overflow-hidden">
        <div className="flex items-start gap-1.5">
          <span className="text-[8px] text-violet-400 font-bold mt-0.5">Q</span>
          <div className="px-2 py-1 rounded bg-violet-500/10 border border-violet-500/15 text-[8px] text-violet-300">
            What does section 4.2 say about data retention?
          </div>
        </div>
        <div className="flex items-start gap-1.5">
          <Sparkles className="w-3 h-3 text-emerald-400 mt-0.5 shrink-0" />
          <div className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/15 text-[8px] text-emerald-300">
            § 4.2 — "Records shall be retained for 7 years…"
          </div>
        </div>
        <div className="flex items-center gap-2 text-[7px] text-violet-400/60 px-1">
          <span>Source: policy_v3.pdf</span>
          <span>•</span>
          <span>Chunk #42</span>
          <span>•</span>
          <span className="text-emerald-400">Score: 0.94</span>
        </div>
      </div>

      <div className="pt-2 border-t border-violet-500/15 flex items-center justify-between text-[8px] text-violet-400/60">
        <div className="flex items-center gap-1.5">
          <Database className="w-3 h-3" />
          <span>FAISS INDEX: 2,847 chunks</span>
        </div>
        <span className="text-violet-300 font-semibold">LangChain + OpenAI</span>
      </div>
    </div>
  );
};

// 10. AI Health ChatBot — Diagnostic Assistant Mockup
export const HealthBotMockup: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[170px] rounded-lg bg-[#0a1210] border border-teal-500/20 p-3.5 flex flex-col justify-between font-mono text-[10px] text-teal-200 select-none shadow-inner">
      <div className="flex items-center justify-between pb-2 border-b border-teal-500/20">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-teal-400" />
          <span className="text-[9px] font-bold text-teal-300 tracking-wider uppercase">
            HEALTH-AI // DIAGNOSTIC ASSISTANT
          </span>
        </div>
        <span className="text-[8px] px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold">
          NLP ENGINE
        </span>
      </div>

      {/* Symptom Flow */}
      <div className="flex-1 flex flex-col gap-1.5 py-2 overflow-hidden">
        <div className="flex items-start gap-1.5">
          <span className="text-[8px] text-teal-400 font-bold mt-0.5">›</span>
          <div className="px-2 py-1 rounded bg-teal-500/10 border border-teal-500/15 text-[8px] text-teal-300">
            Symptoms: headache, fever, fatigue for 3 days
          </div>
        </div>
        <div className="flex items-start gap-1.5">
          <ShieldCheck className="w-3 h-3 text-cyan-400 mt-0.5 shrink-0" />
          <div className="px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/15 text-[8px] text-cyan-300">
            Assessment: Possible viral infection — Confidence: 87%
          </div>
        </div>
        <div className="flex gap-1.5 px-1">
          <span className="text-[7px] px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/15">Hydration</span>
          <span className="text-[7px] px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/15">Rest</span>
          <span className="text-[7px] px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/15">See Doctor</span>
        </div>
      </div>

      <div className="pt-2 border-t border-teal-500/15 flex items-center justify-between text-[8px] text-teal-400/60">
        <div className="flex items-center gap-1.5">
          <Cpu className="w-3 h-3" />
          <span>TensorFlow NLP Model</span>
        </div>
        <span className="text-teal-300 font-semibold">Flask + React</span>
      </div>
    </div>
  );
};

