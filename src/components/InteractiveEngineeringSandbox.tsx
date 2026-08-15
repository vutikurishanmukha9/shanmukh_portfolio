"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Cpu,
  BarChart3,
  Play,
  CheckCircle2,
  Sparkles,
  Sliders,
  Code2,
  Database,
  ArrowRight,
  Zap,
  Terminal,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSound } from '@/hooks/useSound';
import { SectionWrapper } from '@/components/ui/section-wrapper';

type SandboxTab = 'rag' | 'ast' | 'dax';

export const InteractiveEngineeringSandbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SandboxTab>('rag');
  const { playClick, playGlassChime, playSuccessChord } = useSound();

  // --- 1. RAG Vector State ---
  const [selectedQuery, setSelectedQuery] = useState(
    'High-throughput automated PDF reporting with Polars & Redis caching'
  );
  const [similarityThreshold, setSimilarityThreshold] = useState<number>(0.75);
  const [isSearchingVectors, setIsSearchingVectors] = useState(false);

  const RAG_PRESETS = [
    'High-throughput automated PDF reporting with Polars & Redis caching',
    'Persistent CLI context intelligence engine for LLM token reduction',
    'Anonymous storytelling platform with JWT authentication & empathy ranking',
    'FinTech computer vision candlestick pattern recognition model',
  ];

  const VECTOR_CHUNKS = [
    {
      id: 'chunk-1',
      source: 'GetReport::engine.py',
      text: 'Vectorized dataset ingestion using Polars lazy frames and streaming chunk aggregator.',
      similarity: 0.94,
      category: 'Data Platform',
    },
    {
      id: 'chunk-2',
      source: 'GetReport::cache.py',
      text: 'Redis key-value TTL caching for pre-rendered PDF report sections and chart assets.',
      similarity: 0.88,
      category: 'Data Platform',
    },
    {
      id: 'chunk-3',
      source: 'ContextLy::parser.py',
      text: 'Python AST visitor extracting function docstrings, type annotations, and module schemas.',
      similarity: 0.81,
      category: 'Developer Tools',
    },
    {
      id: 'chunk-4',
      source: 'HeartOut::auth.py',
      text: 'JWT token generation with bcrypt salted hashing and RBAC permission middleware.',
      similarity: 0.68,
      category: 'Backend Systems',
    },
    {
      id: 'chunk-5',
      source: 'CandleLight::cv_model.py',
      text: 'OpenCV contour analysis detecting engulfing patterns and harmonic Fibonacci levels.',
      similarity: 0.54,
      category: 'AI/ML',
    },
  ];

  const handleRunRAG = () => {
    setIsSearchingVectors(true);
    playClick(1100, 0.03, 'sine');
    setTimeout(() => {
      setIsSearchingVectors(false);
      playSuccessChord();
    }, 450);
  };

  // --- 2. AST Token Compactor State ---
  const [inputCode, setInputCode] = useState(`def analyze_market_regime(ticks: list[float], threshold: float = 0.05) -> dict:
    \"\"\"Extract volatility regime using moving standard deviation.\"\"\"
    mean_val = sum(ticks) / len(ticks)
    variance = sum((x - mean_val) ** 2 for x in ticks) / len(ticks)
    std_dev = variance ** 0.5
    return {"regime": "HIGH_VOL" if std_dev > threshold else "LOW_VOL", "sigma": std_dev}`);

  const [isCompacting, setIsCompacting] = useState(false);
  const [astOutput, setAstOutput] = useState<{ originalTokens: number; compactedTokens: number; ratio: string } | null>({
    originalTokens: 420,
    compactedTokens: 68,
    ratio: '-83.8%',
  });

  const handleRunAST = () => {
    setIsCompacting(true);
    playClick(1200, 0.03, 'triangle');
    setTimeout(() => {
      setIsCompacting(false);
      setAstOutput({
        originalTokens: 420,
        compactedTokens: 68,
        ratio: '-83.8%',
      });
      playSuccessChord();
    }, 500);
  };

  // --- 3. DAX Valuation Calculator State ---
  const [valuation, setValuation] = useState<number>(4.2); // $B
  const [funding, setFunding] = useState<number>(650); // $M
  const [headcount, setHeadcount] = useState<number>(420);
  const [continent, setContinent] = useState<'North America' | 'Asia' | 'Europe'>('North America');

  const efficiencyRatio = funding > 0 ? (valuation * 1000) / funding : 0;
  const valuationPerEmployee = headcount > 0 ? (valuation * 1000) / headcount : 0;

  return (
    <SectionWrapper id="sandbox" className="py-20 bg-background border-b-[0.5px] border-border/40">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border-[0.5px] border-border/80 shadow-none mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
              Interactive Lab
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-serif-display font-medium tracking-tight text-foreground select-none"
          >
            Live Engineering Sandbox
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-muted-foreground text-xs max-w-md mx-auto leading-relaxed"
          >
            Directly test and inspect algorithmic mechanisms in real time: Neural RAG retrieval, AST token compaction, and DAX calculations.
          </motion.p>
        </div>

        {/* Master Double-Bezel Interactive Enclosure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          {/* Outer Shell */}
          <div className="relative rounded-[2rem] border-[0.5px] border-border/80 bg-card/60 backdrop-blur-xl p-3 sm:p-4 md:p-6 shadow-sm overflow-hidden group">
            {/* Specular Highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent transition-all duration-500 group-hover:via-primary/80 group-hover:h-[1.5px] z-20" />

            {/* Inner Core */}
            <div className="rounded-[calc(2rem-0.5rem)] border-[0.5px] border-border/60 bg-background/50 p-5 sm:p-7 md:p-8">
              
              {/* Tab Navigation Pill Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b-[0.5px] border-border/60 mb-6">
                <div className="flex bg-muted/40 p-1 rounded-full border-[0.5px] border-border/80">
                  <button
                    onClick={() => {
                      playGlassChime();
                      setActiveTab('rag');
                    }}
                    className={cn(
                      'px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full transition-all flex items-center gap-2',
                      activeTab === 'rag'
                        ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Brain className="w-3.5 h-3.5" />
                    <span>Neural RAG Engine</span>
                  </button>

                  <button
                    onClick={() => {
                      playGlassChime();
                      setActiveTab('ast');
                    }}
                    className={cn(
                      'px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full transition-all flex items-center gap-2',
                      activeTab === 'ast'
                        ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    <span>AST Compactor</span>
                  </button>

                  <button
                    onClick={() => {
                      playGlassChime();
                      setActiveTab('dax');
                    }}
                    className={cn(
                      'px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full transition-all flex items-center gap-2',
                      activeTab === 'dax'
                        ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>DAX Analytics</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Interactive Real-Time Engine</span>
                </div>
              </div>

              {/* TAB 1: NEURAL RAG VECTOR DISTANCE EXPLORER */}
              <AnimatePresence mode="wait">
                {activeTab === 'rag' && (
                  <motion.div
                    key="rag-panel"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* Query Selection */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <Database className="w-3.5 h-3.5 text-primary" />
                        <span>Select Sample Semantic Query:</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {RAG_PRESETS.map((preset) => (
                          <button
                            key={preset}
                            onClick={() => {
                              playClick(900, 0.02, 'sine');
                              setSelectedQuery(preset);
                            }}
                            className={cn(
                              'p-3 rounded-xl text-left text-xs font-mono border-[0.5px] transition-all line-clamp-2',
                              selectedQuery === preset
                                ? 'bg-primary/10 border-primary text-foreground font-medium shadow-xs'
                                : 'bg-card/60 border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
                            )}
                          >
                            "{preset}"
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Threshold Slider & Execute */}
                    <div className="p-4 rounded-xl border-[0.5px] border-border/80 bg-card/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="w-full sm:w-2/3 space-y-1.5">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-muted-foreground">Cosine Similarity Cutoff:</span>
                          <span className="font-semibold text-primary">
                            {(similarityThreshold * 100).toFixed(0)}% ({similarityThreshold.toFixed(2)})
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0.5"
                          max="0.95"
                          step="0.05"
                          value={similarityThreshold}
                          onChange={(e) => setSimilarityThreshold(parseFloat(e.target.value))}
                          className="w-full accent-primary cursor-pointer h-1.5 bg-muted rounded-lg"
                        />
                      </div>

                      <button
                        onClick={handleRunRAG}
                        disabled={isSearchingVectors}
                        className="px-5 py-2.5 rounded-full bg-foreground text-background text-xs font-mono uppercase tracking-wider hover:bg-foreground/90 transition-all shadow-xs active:scale-95 flex items-center gap-2 shrink-0 font-medium disabled:opacity-50"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{isSearchingVectors ? 'Querying FAISS...' : 'Run Vector Search'}</span>
                      </button>
                    </div>

                    {/* Vector Distance Chunks Matrix */}
                    <div className="space-y-2.5">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                        FAISS Nearest Neighbors (Ranked by Cosine Proximity)
                      </div>
                      <div className="space-y-2">
                        {VECTOR_CHUNKS.map((chunk) => {
                          const isMatch = chunk.similarity >= similarityThreshold;

                          return (
                            <motion.div
                              key={chunk.id}
                              animate={{
                                opacity: isMatch ? 1 : 0.45,
                                scale: isMatch ? 1 : 0.99,
                              }}
                              className={cn(
                                'p-3.5 rounded-xl border-[0.5px] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3',
                                isMatch
                                  ? 'bg-card/90 border-emerald-500/40 shadow-xs'
                                  : 'bg-background/40 border-border/60'
                              )}
                            >
                              <div className="space-y-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="px-1.5 py-0.5 rounded text-[8.5px] font-mono bg-muted text-muted-foreground border-[0.5px] border-border">
                                    {chunk.source}
                                  </span>
                                  <span className="text-[9px] font-mono text-muted-foreground">
                                    {chunk.category}
                                  </span>
                                </div>
                                <p className="text-xs text-foreground font-mono leading-relaxed truncate">
                                  {chunk.text}
                                </p>
                              </div>

                              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                                <div className="text-right font-mono">
                                  <div
                                    className={cn(
                                      'text-xs font-bold',
                                      isMatch
                                        ? 'text-emerald-600 dark:text-emerald-400'
                                        : 'text-muted-foreground'
                                    )}
                                  >
                                    {(chunk.similarity * 100).toFixed(0)}% Match
                                  </div>
                                  <div className="text-[8px] text-muted-foreground">
                                    dist: {(1 - chunk.similarity).toFixed(2)}
                                  </div>
                                </div>

                                <span
                                  className={cn(
                                    'px-2 py-0.5 rounded-full text-[8px] font-mono font-semibold uppercase border',
                                    isMatch
                                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                                      : 'bg-muted text-muted-foreground border-border'
                                  )}
                                >
                                  {isMatch ? 'PASSED' : 'FILTERED'}
                                </span>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 2: AST TOKEN COMPACTOR SIMULATOR */}
                {activeTab === 'ast' && (
                  <motion.div
                    key="ast-panel"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-mono text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Code2 className="w-3.5 h-3.5 text-primary" />
                          <span>Input Python Source Code:</span>
                        </span>
                        <span>Context-Ly AST Engine</span>
                      </div>
                      <textarea
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        rows={5}
                        className="w-full rounded-xl border-[0.5px] border-border bg-background/80 p-3 font-mono text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed resize-none"
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-xs font-mono text-muted-foreground">
                        Compresses raw AST tokens into permanent LLM memory schemas.
                      </div>
                      <button
                        onClick={handleRunAST}
                        disabled={isCompacting}
                        className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-mono uppercase tracking-wider hover:bg-primary/90 transition-all shadow-xs active:scale-95 flex items-center gap-2 font-medium disabled:opacity-50"
                      >
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        <span>{isCompacting ? 'Compacting AST...' : 'Extract & Compact'}</span>
                      </button>
                    </div>

                    {/* Compression Telemetry Metrics */}
                    {astOutput && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
                        <div className="p-4 rounded-xl border-[0.5px] border-border bg-card/60 text-center">
                          <div className="text-2xl font-serif-display font-medium text-foreground">
                            {astOutput.originalTokens}
                          </div>
                          <div className="text-[9px] uppercase tracking-wider text-muted-foreground mt-0.5">
                            Raw Token Bloat
                          </div>
                        </div>

                        <div className="p-4 rounded-xl border-[0.5px] border-border bg-card/60 text-center">
                          <div className="text-2xl font-serif-display font-medium text-emerald-600 dark:text-emerald-400">
                            {astOutput.compactedTokens}
                          </div>
                          <div className="text-[9px] uppercase tracking-wider text-muted-foreground mt-0.5">
                            AST Compacted Memory
                          </div>
                        </div>

                        <div className="p-4 rounded-xl border-[0.5px] border-border bg-card/60 text-center">
                          <div className="text-2xl font-serif-display font-medium text-primary">
                            {astOutput.ratio}
                          </div>
                          <div className="text-[9px] uppercase tracking-wider text-muted-foreground mt-0.5">
                            LLM Token Savings
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* TAB 3: DAX VALUATION CALCULATOR */}
                {activeTab === 'dax' && (
                  <motion.div
                    key="dax-panel"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* Interactive Parameter Sliders */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Valuation Slider */}
                      <div className="p-4 rounded-xl border-[0.5px] border-border bg-card/40 space-y-2 font-mono">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Valuation:</span>
                          <span className="font-bold text-foreground">${valuation.toFixed(1)}B</span>
                        </div>
                        <input
                          type="range"
                          min="1.0"
                          max="20.0"
                          step="0.5"
                          value={valuation}
                          onChange={(e) => setValuation(parseFloat(e.target.value))}
                          className="w-full accent-primary cursor-pointer h-1.5 bg-muted rounded-lg"
                        />
                      </div>

                      {/* Funding Raised Slider */}
                      <div className="p-4 rounded-xl border-[0.5px] border-border bg-card/40 space-y-2 font-mono">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Funding Raised:</span>
                          <span className="font-bold text-foreground">${funding}M</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="2000"
                          step="50"
                          value={funding}
                          onChange={(e) => setFunding(parseInt(e.target.value, 10))}
                          className="w-full accent-primary cursor-pointer h-1.5 bg-muted rounded-lg"
                        />
                      </div>

                      {/* Headcount Slider */}
                      <div className="p-4 rounded-xl border-[0.5px] border-border bg-card/40 space-y-2 font-mono">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Headcount:</span>
                          <span className="font-bold text-foreground">{headcount} FTE</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="2500"
                          step="50"
                          value={headcount}
                          onChange={(e) => setHeadcount(parseInt(e.target.value, 10))}
                          className="w-full accent-primary cursor-pointer h-1.5 bg-muted rounded-lg"
                        />
                      </div>
                    </div>

                    {/* Live DAX Formula & Output Breakdown */}
                    <div className="p-4 rounded-xl border-[0.5px] border-border/80 bg-background/80 font-mono space-y-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground border-b-[0.5px] border-border/60 pb-2">
                        <span>Dynamic Power BI DAX Calculation</span>
                        <span className="text-emerald-600 font-semibold">1,074 Unicorn Star Schema</span>
                      </div>

                      <div className="bg-card p-3 rounded-lg text-xs text-foreground font-mono space-y-1 overflow-x-auto">
                        <div className="text-primary font-semibold">
                          Valuation_Efficiency_Ratio =
                        </div>
                        <div className="text-muted-foreground pl-4">
                          DIVIDE( [Total Valuation ($M)], [Total Funding ($M)], 0 )
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="p-3 rounded-lg bg-card/60 text-center font-mono">
                          <div className="text-2xl font-serif-display font-medium text-emerald-600 dark:text-emerald-400">
                            {efficiencyRatio.toFixed(2)}x
                          </div>
                          <div className="text-[8.5px] uppercase tracking-wider text-muted-foreground mt-0.5">
                            Capital Efficiency Multiple
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-card/60 text-center font-mono">
                          <div className="text-2xl font-serif-display font-medium text-primary">
                            ${valuationPerEmployee.toFixed(2)}M
                          </div>
                          <div className="text-[8.5px] uppercase tracking-wider text-muted-foreground mt-0.5">
                            Valuation Per Employee
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </motion.div>

      </div>
    </SectionWrapper>
  );
};
