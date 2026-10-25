import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  FileText,
  Activity,
  ShieldCheck,
  Atom,
  Hand,
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
    <div className="w-full h-full min-h-[170px] rounded-xl border border-border bg-zinc-950 p-3.5 flex flex-col justify-between font-mono text-[10px] text-zinc-300 overflow-hidden select-none shadow-xs">
      {/* Window Controls & Mode Tabs */}
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="ml-2 text-[10px] text-zinc-400 font-mono">
            contextly-cli v0.4.2
          </span>
        </div>
        <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded-md border border-zinc-800 text-[9px]">
          <button
            type="button"
            onClick={() => setActiveTab('cli')}
            className={cn('px-2 py-0.5 rounded transition-colors cursor-pointer', activeTab === 'cli' ? 'bg-zinc-800 text-zinc-100 font-medium' : 'text-zinc-500 hover:text-zinc-300')}
          >
            EXEC
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ast')}
            className={cn('px-2 py-0.5 rounded transition-colors cursor-pointer', activeTab === 'ast' ? 'bg-zinc-800 text-zinc-100 font-medium' : 'text-zinc-500 hover:text-zinc-300')}
          >
            AST GRAPH
          </button>
        </div>
      </div>

      {/* Content Area */}
      {activeTab === 'cli' ? (
        <div className="space-y-1.5 py-2">
          <div className="flex items-center gap-1.5 text-zinc-200">
            <span className="text-emerald-400 font-bold">$</span>
            <span>contextly parse --target ./src --cache-ast</span>
          </div>
          <div className="text-[10px] text-zinc-400 space-y-0.5 pl-2 border-l border-zinc-800">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3 h-3" />
              <span>Parsed 42 modules • 1,280 AST nodes indexed</span>
            </div>
            <div className="text-zinc-400">Memory Cache: <span className="text-amber-400 font-semibold">100% Hit Rate</span> (0.42ms)</div>
          </div>
        </div>
      ) : (
        <div className="py-2 flex items-center justify-around">
          <div className="flex flex-col items-center gap-1">
            <div className="p-1.5 rounded-md border border-zinc-800 bg-zinc-900 text-zinc-200 text-[9px] font-mono">
              Root: AST_MODULE
            </div>
            <div className="w-[1px] h-3 bg-zinc-700" />
            <div className="flex gap-2 text-[8px]">
              <span className="px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono">FnDef: parse()</span>
              <span className="px-2 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 text-amber-400 font-mono">Class: ContextTree</span>
            </div>
          </div>
        </div>
      )}

      {/* Telemetry Bar */}
      <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[9px] font-mono text-zinc-400">
        <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          PYPI RELEASE READY
        </span>
        <span className="text-zinc-300 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">TESTS: 100% PASS</span>
      </div>
    </div>
  );
};

// 2. GetReport Polars & PDF Pipeline Mockup
export const GetReportMockup: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[170px] rounded-xl border border-border bg-zinc-950 p-3.5 flex flex-col justify-between font-mono text-[10px] text-zinc-300 select-none shadow-xs">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono text-zinc-200 font-medium">
            POLARS ETL // RAG PDF PIPELINE
          </span>
        </div>
        <span className="text-[9px] text-zinc-300 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">120K ROWS/SEC</span>
      </div>

      <div className="space-y-2 py-2">
        {/* Stream Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[9px] text-zinc-400">
            <span>Ingest: raw_dataset.csv</span>
            <span className="text-emerald-400 font-medium">Processed 100%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="h-full w-full origin-left bg-emerald-500"
            />
          </div>
        </div>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 gap-2 text-[9px]">
          <div className="p-2 rounded-lg border border-zinc-800 bg-zinc-900/60">
            <span className="text-zinc-400 block">QUERY TIME</span>
            <span className="text-zinc-100 font-semibold">14.2ms (Polars)</span>
          </div>
          <div className="p-2 rounded-lg border border-zinc-800 bg-zinc-900/60">
            <span className="text-zinc-400 block">OUTPUT PDF</span>
            <span className="text-emerald-400 font-semibold">Generated 2.4MB</span>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[9px] font-mono text-zinc-400">
        <span>REDIS CACHE: ACTIVE</span>
        <span className="text-zinc-300 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">OPENAI EMBEDDINGS</span>
      </div>
    </div>
  );
};

// 3. Candle-Light AI Financial Signal Canvas
export const CandleLightMockup: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[170px] rounded-xl border border-border bg-zinc-950 p-3.5 flex flex-col justify-between font-mono text-[10px] text-zinc-300 select-none shadow-xs">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span className="text-[10px] font-mono text-zinc-200 font-medium">
            CANDLE-LIGHT // AI PATTERN ENGINE
          </span>
        </div>
        <span className="text-[9px] px-1.5 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono">
          CONFIDENCE: 94.2%
        </span>
      </div>

      {/* Interactive Candlestick Chart */}
      <div className="flex items-end justify-between h-14 px-3 py-1 bg-zinc-900/40 rounded-lg border border-zinc-800/80 relative overflow-hidden">
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
            <div className={cn('w-[1px] h-2', candle.isGreen ? 'bg-emerald-500' : 'bg-red-400')} />
            <div
              style={{ height: `${candle.h}px` }}
              className={cn(
                'w-3 rounded-xs transition-all',
                candle.isGreen ? 'bg-emerald-500' : 'bg-red-500'
              )}
            />
            <div className={cn('w-[1px] h-2', candle.isGreen ? 'bg-emerald-500' : 'bg-red-400')} />
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[9px] font-mono text-zinc-400">
        <span>DETECTED: BULLISH DIVERGENCE</span>
        <span className="text-zinc-300 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">LATENCY: 8MS</span>
      </div>
    </div>
  );
};

// 4. HeartOut Security & Story Authentication
export const HeartOutMockup: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[170px] rounded-xl border border-border bg-zinc-950 p-3.5 flex flex-col justify-between font-mono text-[10px] text-zinc-300 select-none shadow-xs">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-[10px] font-mono text-zinc-200 font-medium">
            HEARTOUT // JWT & RBAC LAYER
          </span>
        </div>
        <span className="text-[9px] px-1.5 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
          541+ TESTS PASS
        </span>
      </div>

      <div className="space-y-1.5 py-1">
        <div className="p-2.5 rounded-lg border border-zinc-800 bg-zinc-900/50 space-y-1">
          <div className="flex items-center justify-between text-[9px] text-zinc-400">
            <span>HEADER: &#123;&quot;alg&quot;: &quot;HS256&quot;&#125;</span>
            <span className="text-emerald-400 font-medium">SIGNATURE VERIFIED</span>
          </div>
          <p className="text-[10px] text-zinc-300 italic line-clamp-1">
            &quot;An anonymous voice finding solace in shared vulnerability...&quot;
          </p>
        </div>
      </div>

      <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[9px] font-mono text-zinc-400">
        <span>ROLE: ANONYMOUS_AUTHOR</span>
        <span className="text-zinc-300 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">MONGODB CLUSTER</span>
      </div>
    </div>
  );
};

// 5. Ele-Visualize 3D Molecule & MediaPipe Gesture
export const EleVisualizeMockup: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[170px] rounded-xl border border-border bg-zinc-950 p-3.5 flex flex-col justify-between font-mono text-[10px] text-zinc-300 select-none shadow-xs">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Atom className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
          <span className="text-[10px] font-mono text-zinc-200 font-medium">
            ELE-VISUALIZE // WEBGL + MEDIAPIPE
          </span>
        </div>
        <span className="text-[9px] px-1.5 py-0.5 rounded border border-zinc-800 bg-zinc-900 text-zinc-300">
          TOUCHLESS 3D
        </span>
      </div>

      {/* 3D Node Topology Simulation */}
      <div className="relative h-14 flex items-center justify-center bg-zinc-900/40 rounded-lg border border-zinc-800/80">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="relative w-12 h-12 flex items-center justify-center"
        >
          <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-xs" />
          <div className="absolute top-0 left-0 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-xs" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-zinc-400 shadow-xs" />
          <div className="absolute inset-0 rounded-full border border-emerald-500/40 border-dashed animate-pulse" />
        </motion.div>
        <span className="absolute right-3 bottom-1.5 text-[8px] text-zinc-400 flex items-center gap-1">
          <Hand className="w-2.5 h-2.5 text-emerald-400" />
          <span>HAND: PINCH ROTATE</span>
        </span>
      </div>

      <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[9px] font-mono text-zinc-400">
        <span>60 FPS HARDWARE ACCEL</span>
        <span className="text-zinc-300 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">THREE.JS SHADERS</span>
      </div>
    </div>
  );
};

// 6. PromptBuddy SaaS Template Slot Workspace
export const PromptBuddyMockup: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[170px] rounded-xl border border-border bg-zinc-950 p-3.5 flex flex-col justify-between font-mono text-[10px] text-zinc-300 select-none shadow-xs">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="text-[10px] font-mono text-zinc-200 font-medium">
            PROMPTBUDDY // SLOT OPTIMIZER
          </span>
        </div>
        <span className="text-[9px] px-1.5 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
          -38% TOKENS
        </span>
      </div>

      <div className="space-y-1.5 py-1">
        <div className="p-2.5 rounded-lg border border-zinc-800 bg-zinc-900/50 space-y-1 text-[9px]">
          <span className="text-zinc-400 font-medium block">DYNAMIC PROMPT INJECTION:</span>
          <p className="text-zinc-200 font-mono leading-relaxed">
            &quot;Act as <span className="px-1 py-0.2 rounded border border-amber-500/40 bg-amber-500/10 text-amber-300">&#123;&#123;role&#125;&#125;</span>. Apply constraints <span className="px-1 py-0.2 rounded border border-emerald-500/40 bg-emerald-500/10 text-emerald-300">&#123;&#123;strict_mode&#125;&#125;</span>...&quot;
          </p>
        </div>
      </div>

      <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[9px] font-mono text-zinc-400">
        <span>TEMPLATE SAVED: 12 SLOTS</span>
        <span className="text-zinc-300 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">VITE + TAILWIND</span>
      </div>
    </div>
  );
};

// 7. Computer Vision Bounding Box Mockup
export const ComputerVisionMockup: React.FC<{ label?: string }> = ({ label = 'FACIAL DETECTION' }) => {
  return (
    <div className="w-full h-full min-h-[170px] rounded-xl border border-border bg-zinc-950 p-3.5 flex flex-col justify-between font-mono text-[10px] text-zinc-300 select-none shadow-xs">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Eye className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[10px] font-mono text-zinc-200 font-medium">
            OPENCV // {label}
          </span>
        </div>
        <span className="text-[9px] px-1.5 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
          98.6% MATCH
        </span>
      </div>

      {/* Camera Viewport Simulation */}
      <div className="relative h-14 bg-zinc-900/40 rounded-lg border border-zinc-800/80 flex items-center justify-center overflow-hidden">
        <div className="w-16 h-10 border border-emerald-400 border-dashed relative flex items-center justify-center">
          <span className="absolute -top-3 left-0 text-[7px] bg-emerald-500 text-black px-1 rounded-xs font-bold">
            CONF: 0.98
          </span>
          <div className="w-1.5 h-1.5 bg-emerald-400" />
        </div>
      </div>

      <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[9px] font-mono text-zinc-400">
        <span>FRAME TIME: 16MS</span>
        <span className="text-zinc-300 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">AWS MYSQL SYNC</span>
      </div>
    </div>
  );
};

// 8. Data Insights / HR EDA Mockup
export const AnalyticsChartMockup: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[170px] rounded-xl border border-border bg-zinc-950 p-3.5 flex flex-col justify-between font-mono text-[10px] text-zinc-300 select-none shadow-xs">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-[10px] font-mono text-zinc-200 font-medium">
            PANDAS // WORKFORCE RETENTION EDA
          </span>
        </div>
        <span className="text-[9px] px-1.5 py-0.5 rounded border border-zinc-800 bg-zinc-900 text-zinc-300">
          N=15,000
        </span>
      </div>

      {/* Retention Curve Bars */}
      <div className="flex items-end justify-around h-14 px-2 bg-zinc-900/40 rounded-lg border border-zinc-800/80">
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-8 rounded-t bg-zinc-700" />
          <span className="text-[8px] text-zinc-400 font-mono">Q1</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-11 rounded-t bg-zinc-600" />
          <span className="text-[8px] text-zinc-400 font-mono">Q2</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-9 rounded-t bg-zinc-700" />
          <span className="text-[8px] text-zinc-400 font-mono">Q3</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-13 rounded-t bg-primary" />
          <span className="text-[8px] text-primary font-mono font-semibold">Q4</span>
        </div>
      </div>

      <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[9px] font-mono text-zinc-400">
        <span>CORRELATION: 0.84</span>
        <span className="text-zinc-300 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">SEABORN EDA</span>
      </div>
    </div>
  );
};

// 9. Jarvis PDF Chatbot — RAG / Document Intelligence Mockup
export const JarvisMockup: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[170px] rounded-xl border border-border bg-zinc-950 p-3.5 flex flex-col justify-between font-mono text-[10px] text-zinc-300 select-none shadow-xs">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <FileText className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-[10px] font-mono text-zinc-200 font-medium">
            JARVIS // PDF RAG PIPELINE
          </span>
        </div>
        <span className="text-[9px] px-1.5 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
          FAISS READY
        </span>
      </div>

      {/* Chat-like Q&A */}
      <div className="flex-1 flex flex-col gap-1.5 py-2 overflow-hidden">
        <div className="flex items-start gap-1.5">
          <span className="text-[8px] text-zinc-500 font-semibold mt-0.5">Q</span>
          <div className="px-2 py-1 rounded border border-zinc-800 bg-zinc-900 text-[9px] text-zinc-300">
            What does section 4.2 say about data retention?
          </div>
        </div>
        <div className="flex items-start gap-1.5">
          <span className="text-[8px] text-emerald-400 font-semibold mt-0.5">A</span>
          <div className="px-2 py-1 rounded border border-emerald-500/20 bg-emerald-500/10 text-[9px] text-emerald-300">
            § 4.2 — "Records shall be retained for 7 years…"
          </div>
        </div>
        <div className="flex items-center gap-2 text-[8px] text-zinc-500 px-1">
          <span>Source: policy_v3.pdf</span>
          <span>•</span>
          <span>Chunk #42</span>
          <span>•</span>
          <span className="text-emerald-400 font-medium">Score: 0.94</span>
        </div>
      </div>

      <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[9px] font-mono text-zinc-400">
        <div className="flex items-center gap-1.5">
          <Database className="w-3 h-3 text-zinc-400" />
          <span>FAISS INDEX: 2,847 chunks</span>
        </div>
        <span className="text-zinc-300 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">LangChain + OpenAI</span>
      </div>
    </div>
  );
};

// 10. AI Health ChatBot — Diagnostic Assistant Mockup
export const HealthBotMockup: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[170px] rounded-xl border border-border bg-zinc-950 p-3.5 flex flex-col justify-between font-mono text-[10px] text-zinc-300 select-none shadow-xs">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[10px] font-mono text-zinc-200 font-medium">
            HEALTH-AI // DIAGNOSTIC ASSISTANT
          </span>
        </div>
        <span className="text-[9px] px-1.5 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
          NLP ENGINE
        </span>
      </div>

      {/* Symptom Flow */}
      <div className="flex-1 flex flex-col gap-1.5 py-2 overflow-hidden">
        <div className="flex items-start gap-1.5">
          <span className="text-[8px] text-zinc-500 font-medium mt-0.5">›</span>
          <div className="px-2 py-1 rounded border border-zinc-800 bg-zinc-900 text-[9px] text-zinc-300">
            Symptoms: headache, fever, fatigue for 3 days
          </div>
        </div>
        <div className="flex items-start gap-1.5">
          <ShieldCheck className="w-3 h-3 text-emerald-400 mt-0.5 shrink-0" />
          <div className="px-2 py-1 rounded border border-zinc-800 bg-zinc-900 text-[9px] text-zinc-200">
            Assessment: Possible viral infection — Confidence: 87%
          </div>
        </div>
        <div className="flex gap-1.5 px-1">
          <span className="text-[8px] px-2 py-0.5 rounded border border-zinc-800 bg-zinc-900 text-zinc-400">Hydration</span>
          <span className="text-[8px] px-2 py-0.5 rounded border border-zinc-800 bg-zinc-900 text-zinc-400">Rest</span>
          <span className="text-[8px] px-2 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 text-amber-400">Consult Physician</span>
        </div>
      </div>

      <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[9px] font-mono text-zinc-400">
        <div className="flex items-center gap-1.5">
          <Cpu className="w-3 h-3 text-zinc-400" />
          <span>TensorFlow NLP Model</span>
        </div>
        <span className="text-zinc-300 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">Flask + React</span>
      </div>
    </div>
  );
};
