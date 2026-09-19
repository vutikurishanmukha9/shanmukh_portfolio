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
    <div className="w-full h-full min-h-[170px] border-2 border-black bg-[#0b0f19] rounded-none shadow-xs p-3.5 flex flex-col justify-between font-mono text-[10px] text-violet-200 overflow-hidden select-none">
      {/* Window Controls & Mode Tabs */}
      <div className="flex items-center justify-between pb-2 border-b-2 border-black">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full border border-black bg-rose-500" />
          <div className="w-2.5 h-2.5 rounded-full border border-black bg-amber-500" />
          <div className="w-2.5 h-2.5 rounded-full border border-black bg-emerald-500" />
          <span className="ml-2 text-[9px] text-violet-400 font-head font-bold uppercase tracking-wider">
            contextly-cli // v0.4.2
          </span>
        </div>
        <div className="flex items-center gap-1 bg-violet-950 p-0.5 border border-black text-[8px]">
          <button
            type="button"
            onClick={() => setActiveTab('cli')}
            className={cn('px-1.5 py-0.5 font-bold transition-colors cursor-pointer', activeTab === 'cli' ? 'bg-primary text-black' : 'text-violet-400')}
          >
            EXEC
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ast')}
            className={cn('px-1.5 py-0.5 font-bold transition-colors cursor-pointer', activeTab === 'ast' ? 'bg-primary text-black' : 'text-violet-400')}
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
          <div className="text-[9px] text-violet-400/80 space-y-0.5 pl-2 border-l-2 border-violet-500/50">
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
            <div className="p-1.5 border border-black bg-violet-900 text-violet-200 text-[8px] font-bold shadow-xs">
              Root: AST_MODULE
            </div>
            <div className="w-[2px] h-3 bg-violet-400" />
            <div className="flex gap-2 text-[7px]">
              <span className="px-1.5 py-0.5 border border-black bg-violet-950 text-emerald-300 font-bold">FnDef: parse()</span>
              <span className="px-1.5 py-0.5 border border-black bg-violet-950 text-cyan-300 font-bold">Class: ContextTree</span>
            </div>
          </div>
        </div>
      )}

      {/* Telemetry Bar */}
      <div className="pt-2 border-t-2 border-black flex items-center justify-between text-[8px] font-mono text-violet-300">
        <span className="flex items-center gap-1 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse border border-black" />
          PYPI RELEASE READY
        </span>
        <span className="text-black bg-primary px-1 border border-black font-bold">TESTS: 100% PASS</span>
      </div>
    </div>
  );
};

// 2. GetReport Polars & PDF Pipeline Mockup
export const GetReportMockup: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[170px] border-2 border-black bg-[#071322] rounded-none shadow-xs p-3.5 flex flex-col justify-between font-mono text-[10px] text-sky-200 select-none">
      <div className="flex items-center justify-between pb-2 border-b-2 border-black">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse border border-black" />
          <span className="text-[9px] font-head font-bold text-sky-300 tracking-wider uppercase">
            POLARS ETL // RAG PDF PIPELINE
          </span>
        </div>
        <span className="text-[8px] text-black bg-sky-300 px-1 border border-black font-bold">120K ROWS/SEC</span>
      </div>

      <div className="space-y-2 py-2">
        {/* Stream Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[8px] text-sky-300">
            <span>Ingest: raw_dataset.csv</span>
            <span className="text-emerald-400 font-bold">Processed 100%</span>
          </div>
          <div className="w-full h-2 border border-black bg-sky-950 overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="h-full w-full origin-left bg-emerald-400"
            />
          </div>
        </div>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 gap-2 text-[8px]">
          <div className="p-1.5 border border-black bg-sky-950/60 shadow-xs">
            <span className="text-sky-400 block font-bold">QUERY TIME</span>
            <span className="text-white font-bold">14.2ms (Polars)</span>
          </div>
          <div className="p-1.5 border border-black bg-sky-950/60 shadow-xs">
            <span className="text-sky-400 block font-bold">OUTPUT PDF</span>
            <span className="text-emerald-400 font-bold">Generated 2.4MB</span>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t-2 border-black flex items-center justify-between text-[8px] font-mono text-sky-300">
        <span className="font-bold">REDIS CACHE: ACTIVE</span>
        <span className="text-black bg-primary px-1 border border-black font-bold">OPENAI EMBEDDINGS</span>
      </div>
    </div>
  );
};

// 3. Candle-Light AI Financial Signal Canvas
export const CandleLightMockup: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[170px] border-2 border-black bg-[#140810] rounded-none shadow-xs p-3.5 flex flex-col justify-between font-mono text-[10px] text-rose-200 select-none">
      <div className="flex items-center justify-between pb-2 border-b-2 border-black">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-rose-400 animate-pulse stroke-[2.5]" />
          <span className="text-[9px] font-head font-bold text-rose-300 tracking-wider uppercase">
            CANDLE-LIGHT // AI PATTERN ENGINE
          </span>
        </div>
        <span className="text-[8px] px-1.5 py-0.5 border border-black bg-emerald-400 text-black font-bold">
          CONFIDENCE: 94.2%
        </span>
      </div>

      {/* Interactive Candlestick Chart */}
      <div className="flex items-end justify-between h-14 px-2 py-1 bg-rose-950/40 border border-black relative overflow-hidden">
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
                'w-3 border border-black transition-all',
                candle.isGreen ? 'bg-emerald-400' : 'bg-rose-500'
              )}
            />
            <div className={cn('w-[1px] h-2', candle.isGreen ? 'bg-emerald-400' : 'bg-rose-400')} />
          </div>
        ))}
      </div>

      <div className="pt-2 border-t-2 border-black flex items-center justify-between text-[8px] font-mono text-rose-300">
        <span className="font-bold">DETECTED: BULLISH DIVERGENCE</span>
        <span className="text-black bg-primary px-1 border border-black font-bold">LATENCY: 8MS</span>
      </div>
    </div>
  );
};

// 4. HeartOut Security & Story Authentication
export const HeartOutMockup: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[170px] border-2 border-black bg-[#140a12] rounded-none shadow-xs p-3.5 flex flex-col justify-between font-mono text-[10px] text-rose-200 select-none">
      <div className="flex items-center justify-between pb-2 border-b-2 border-black">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-rose-400 stroke-[2.5]" />
          <span className="text-[9px] font-head font-bold text-rose-300 tracking-wider uppercase">
            HEARTOUT // JWT & RBAC LAYER
          </span>
        </div>
        <span className="text-[8px] px-1.5 py-0.5 border border-black bg-primary text-black font-bold">
          ENCRYPTED
        </span>
      </div>

      <div className="space-y-1.5 py-1">
        <div className="p-2 border border-black bg-rose-950/40 space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-[8px] text-rose-300 font-bold">
            <span>HEADER: &#123;&quot;alg&quot;: &quot;HS256&quot;&#125;</span>
            <span className="text-emerald-400">SIGNATURE VERIFIED</span>
          </div>
          <p className="text-[9px] text-rose-100 italic line-clamp-1">
            &quot;An anonymous voice finding solace in shared vulnerability...&quot;
          </p>
        </div>
      </div>

      <div className="pt-2 border-t-2 border-black flex items-center justify-between text-[8px] font-mono text-rose-300">
        <span className="font-bold">ROLE: ANONYMOUS_AUTHOR</span>
        <span className="text-black bg-white px-1 border border-black font-bold">MONGODB CLUSTER</span>
      </div>
    </div>
  );
};

// 5. Ele-Visualize 3D Molecule & MediaPipe Gesture
export const EleVisualizeMockup: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[170px] border-2 border-black bg-[#061510] rounded-none shadow-xs p-3.5 flex flex-col justify-between font-mono text-[10px] text-emerald-200 select-none">
      <div className="flex items-center justify-between pb-2 border-b-2 border-black">
        <div className="flex items-center gap-2">
          <Atom className="w-3.5 h-3.5 text-emerald-400 animate-spin stroke-[2.5]" />
          <span className="text-[9px] font-head font-bold text-emerald-300 tracking-wider uppercase">
            ELE-VISUALIZE // WEBGL + MEDIAPIPE
          </span>
        </div>
        <span className="text-[8px] px-1.5 py-0.5 border border-black bg-primary text-black font-bold">
          TOUCHLESS 3D
        </span>
      </div>

      {/* 3D Node Topology Simulation */}
      <div className="relative h-14 flex items-center justify-center bg-emerald-950/40 border border-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="relative w-12 h-12 flex items-center justify-center"
        >
          <div className="w-4 h-4 rounded-full border border-black bg-emerald-400 shadow-xs" />
          <div className="absolute top-0 left-0 w-2.5 h-2.5 rounded-full border border-black bg-cyan-400 shadow-xs" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-black bg-teal-300 shadow-xs" />
          <div className="absolute inset-0 rounded-full border-2 border-emerald-500/40 border-dashed animate-pulse" />
        </motion.div>
        <span className="absolute right-3 bottom-1.5 text-[8px] text-emerald-300 font-bold flex items-center gap-1">
          <Hand className="w-2.5 h-2.5 text-emerald-400" />
          <span>HAND: PINCH ROTATE</span>
        </span>
      </div>

      <div className="pt-2 border-t-2 border-black flex items-center justify-between text-[8px] font-mono text-emerald-300">
        <span className="font-bold">60 FPS HARDWARE ACCEL</span>
        <span className="text-black bg-white px-1 border border-black font-bold">THREE.JS SHADERS</span>
      </div>
    </div>
  );
};

// 6. PromptBuddy SaaS Template Slot Workspace
export const PromptBuddyMockup: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[170px] border-2 border-black bg-[#081220] rounded-none shadow-xs p-3.5 flex flex-col justify-between font-mono text-[10px] text-sky-200 select-none">
      <div className="flex items-center justify-between pb-2 border-b-2 border-black">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-sky-400 border border-black" />
          <span className="text-[9px] font-head font-bold text-sky-300 tracking-wider uppercase">
            PROMPTBUDDY // SLOT OPTIMIZER
          </span>
        </div>
        <span className="text-[8px] px-1.5 py-0.5 border border-black bg-emerald-400 text-black font-bold">
          -38% TOKENS
        </span>
      </div>

      <div className="space-y-1.5 py-1">
        <div className="p-2 border border-black bg-sky-950/40 space-y-1 text-[8px]">
          <span className="text-sky-300 font-bold block uppercase">DYNAMIC PROMPT INJECTION:</span>
          <p className="text-sky-100 font-mono leading-relaxed">
            &quot;Act as <span className="px-1 py-0.2 border border-black bg-primary text-black font-bold">&#123;&#123;role&#125;&#125;</span>. Apply constraints <span className="px-1 py-0.2 border border-black bg-emerald-400 text-black font-bold">&#123;&#123;strict_mode&#125;&#125;</span>...&quot;
          </p>
        </div>
      </div>

      <div className="pt-2 border-t-2 border-black flex items-center justify-between text-[8px] font-mono text-sky-300">
        <span className="font-bold">TEMPLATE SAVED: 12 SLOTS</span>
        <span className="text-black bg-primary px-1 border border-black font-bold">VITE + TAILWIND</span>
      </div>
    </div>
  );
};

// 7. Computer Vision Bounding Box Mockup (Attendance / Touchless)
export const ComputerVisionMockup: React.FC<{ label?: string }> = ({ label = 'FACIAL DETECTION' }) => {
  return (
    <div className="w-full h-full min-h-[170px] border-2 border-black bg-[#061510] rounded-none shadow-xs p-3.5 flex flex-col justify-between font-mono text-[10px] text-emerald-200 select-none">
      <div className="flex items-center justify-between pb-2 border-b-2 border-black">
        <div className="flex items-center gap-2">
          <Eye className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
          <span className="text-[9px] font-head font-bold text-emerald-300 tracking-wider uppercase">
            OPENCV // {label}
          </span>
        </div>
        <span className="text-[8px] px-1.5 py-0.5 border border-black bg-emerald-400 text-black font-bold">
          98.6% MATCH
        </span>
      </div>

      {/* Camera Viewport Simulation */}
      <div className="relative h-14 bg-emerald-950/40 border border-black flex items-center justify-center overflow-hidden">
        {/* Target Bounding Box */}
        <div className="w-16 h-10 border-2 border-emerald-400 border-dashed relative flex items-center justify-center animate-pulse">
          <span className="absolute -top-3 left-0 text-[7px] bg-emerald-400 text-black px-1 border border-black font-bold">
            CONF: 0.98
          </span>
          <div className="w-1.5 h-1.5 bg-emerald-400" />
        </div>
      </div>

      <div className="pt-2 border-t-2 border-black flex items-center justify-between text-[8px] font-mono text-emerald-300">
        <span className="font-bold">FRAME TIME: 16MS</span>
        <span className="text-black bg-white px-1 border border-black font-bold">AWS MYSQL SYNC</span>
      </div>
    </div>
  );
};

// 8. Data Insights / HR EDA Mockup
export const AnalyticsChartMockup: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[170px] border-2 border-black bg-[#141006] rounded-none shadow-xs p-3.5 flex flex-col justify-between font-mono text-[10px] text-amber-200 select-none">
      <div className="flex items-center justify-between pb-2 border-b-2 border-black">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-3.5 h-3.5 text-amber-400 stroke-[2.5]" />
          <span className="text-[9px] font-head font-bold text-amber-300 tracking-wider uppercase">
            PANDAS // WORKFORCE RETENTION EDA
          </span>
        </div>
        <span className="text-[8px] px-1.5 py-0.5 border border-black bg-primary text-black font-bold">
          N=15,000
        </span>
      </div>

      {/* Retention Curve Bars */}
      <div className="flex items-end justify-around h-14 px-2 bg-amber-950/40 border border-black">
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-8 border border-black bg-amber-500/60" />
          <span className="text-[7px] text-amber-400 font-bold">Q1</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-11 border border-black bg-amber-500/80" />
          <span className="text-[7px] text-amber-400 font-bold">Q2</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-9 border border-black bg-amber-500/60" />
          <span className="text-[7px] text-amber-400 font-bold">Q3</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-13 border border-black bg-primary" />
          <span className="text-[7px] text-amber-400 font-bold">Q4</span>
        </div>
      </div>

      <div className="pt-2 border-t-2 border-black flex items-center justify-between text-[8px] font-mono text-amber-300">
        <span className="font-bold">CORRELATION: 0.84</span>
        <span className="text-black bg-white px-1 border border-black font-bold">SEABORN EDA</span>
      </div>
    </div>
  );
};

// 9. Jarvis PDF Chatbot — RAG / Document Intelligence Mockup
export const JarvisMockup: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[170px] border-2 border-black bg-[#0d0a18] rounded-none shadow-xs p-3.5 flex flex-col justify-between font-mono text-[10px] text-violet-200 select-none">
      <div className="flex items-center justify-between pb-2 border-b-2 border-black">
        <div className="flex items-center gap-2">
          <FileText className="w-3.5 h-3.5 text-violet-400 stroke-[2.5]" />
          <span className="text-[9px] font-head font-bold text-violet-300 tracking-wider uppercase">
            JARVIS // PDF RAG PIPELINE
          </span>
        </div>
        <span className="text-[8px] px-1.5 py-0.5 border border-black bg-emerald-400 text-black font-bold">
          FAISS READY
        </span>
      </div>

      {/* Chat-like Q&A */}
      <div className="flex-1 flex flex-col gap-1.5 py-2 overflow-hidden">
        <div className="flex items-start gap-1.5">
          <span className="text-[8px] text-violet-400 font-bold mt-0.5">Q</span>
          <div className="px-2 py-1 border border-black bg-violet-950/80 text-[8px] text-violet-200 font-bold">
            What does section 4.2 say about data retention?
          </div>
        </div>
        <div className="flex items-start gap-1.5">
          <span className="text-[8px] text-emerald-400 font-bold mt-0.5">A</span>
          <div className="px-2 py-1 border border-black bg-emerald-950/80 text-[8px] text-emerald-300 font-bold">
            § 4.2 — "Records shall be retained for 7 years…"
          </div>
        </div>
        <div className="flex items-center gap-2 text-[7px] text-violet-300 px-1 font-bold">
          <span>Source: policy_v3.pdf</span>
          <span>•</span>
          <span>Chunk #42</span>
          <span>•</span>
          <span className="text-emerald-400">Score: 0.94</span>
        </div>
      </div>

      <div className="pt-2 border-t-2 border-black flex items-center justify-between text-[8px] font-mono text-violet-300">
        <div className="flex items-center gap-1.5">
          <Database className="w-3 h-3" />
          <span className="font-bold">FAISS INDEX: 2,847 chunks</span>
        </div>
        <span className="text-black bg-primary px-1 border border-black font-bold">LangChain + OpenAI</span>
      </div>
    </div>
  );
};

// 10. AI Health ChatBot — Diagnostic Assistant Mockup
export const HealthBotMockup: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[170px] border-2 border-black bg-[#0a1210] rounded-none shadow-xs p-3.5 flex flex-col justify-between font-mono text-[10px] text-teal-200 select-none">
      <div className="flex items-center justify-between pb-2 border-b-2 border-black">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-teal-400 stroke-[2.5]" />
          <span className="text-[9px] font-head font-bold text-teal-300 tracking-wider uppercase">
            HEALTH-AI // DIAGNOSTIC ASSISTANT
          </span>
        </div>
        <span className="text-[8px] px-1.5 py-0.5 border border-black bg-emerald-400 text-black font-bold">
          NLP ENGINE
        </span>
      </div>

      {/* Symptom Flow */}
      <div className="flex-1 flex flex-col gap-1.5 py-2 overflow-hidden">
        <div className="flex items-start gap-1.5">
          <span className="text-[8px] text-teal-400 font-bold mt-0.5">›</span>
          <div className="px-2 py-1 border border-black bg-teal-950/80 text-[8px] text-teal-200 font-bold">
            Symptoms: headache, fever, fatigue for 3 days
          </div>
        </div>
        <div className="flex items-start gap-1.5">
          <ShieldCheck className="w-3 h-3 text-cyan-400 mt-0.5 shrink-0" />
          <div className="px-2 py-1 border border-black bg-cyan-950/80 text-[8px] text-cyan-300 font-bold">
            Assessment: Possible viral infection — Confidence: 87%
          </div>
        </div>
        <div className="flex gap-1.5 px-1">
          <span className="text-[7px] px-1.5 py-0.5 border border-black bg-teal-950 text-teal-300 font-bold">Hydration</span>
          <span className="text-[7px] px-1.5 py-0.5 border border-black bg-teal-950 text-teal-300 font-bold">Rest</span>
          <span className="text-[7px] px-1.5 py-0.5 border border-black bg-rose-950 text-rose-300 font-bold">See Doctor</span>
        </div>
      </div>

      <div className="pt-2 border-t-2 border-black flex items-center justify-between text-[8px] font-mono text-teal-300">
        <div className="flex items-center gap-1.5">
          <Cpu className="w-3 h-3" />
          <span className="font-bold">TensorFlow NLP Model</span>
        </div>
        <span className="text-black bg-primary px-1 border border-black font-bold">Flask + React</span>
      </div>
    </div>
  );
};

