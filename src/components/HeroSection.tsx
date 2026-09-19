import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { NumberTicker } from '@/components/ui/NumberTicker';
import { WaveText } from '@/components/ui/WaveText';
import { useSound } from '@/hooks/useSound';
import { ArrowUpRight, Github, Linkedin, Mail, FileText, Play, Activity, Terminal, Check, Copy } from 'lucide-react';
import { ResumeModal } from '@/components/ResumeModal';

import { Input } from '@/components/ui/input';

interface SimToken {
  id: string;
  text: string;
}

const heroSocialLinks = [
  { url: 'https://github.com/vutikurishanmukha9', icon: Github, label: 'GitHub' },
  { url: 'https://linkedin.com/in/shanmukha-vutikuri', icon: Linkedin, label: 'LinkedIn' },
  { url: 'mailto:vutikurishanmukh17@gmail.com', icon: Mail, label: 'Email' },
];

const TelemetryDashboard = () => {
  const [activeTab, setActiveTab] = useState('runtime');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simTokens, setSimTokens] = useState<SimToken[]>([]);
  const [queryInput, setQueryInput] = useState('Search protein folding FAISS embeddings');
  const [isCopied, setIsCopied] = useState(false);
  const [liveStreamActive, setLiveStreamActive] = useState(true);

  const copyCommand = () => {
    navigator.clipboard.writeText('curl -s https://api.vutikuri.dev/v1/telemetry | jq .status');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const runSimulation = () => {
    setIsSimulating(true);
    setSimTokens([]);
    const tokens: SimToken[] = [
      { id: 'prompt', text: `[QUERY: "${queryInput.slice(0, 18)}..."]` },
      { id: 'retrieve', text: 'retrieve_chunks()' },
      { id: 'arrow-1', text: '->' },
      { id: 'faiss', text: 'FAISS: 12ms' },
      { id: 'arrow-2', text: '->' },
      { id: 'rerank', text: 'Re-rank (0.94)' },
      { id: 'arrow-3', text: '->' },
      { id: 'llm', text: 'LLM_Inference' },
      { id: 'arrow-4', text: '->' },
      { id: 'ok', text: '200 OK (58ms)' },
    ];
    tokens.forEach((token, idx) => {
      setTimeout(() => {
        setSimTokens((prev) => [...prev, token]);
        if (idx === tokens.length - 1) {
          setIsSimulating(false);
        }
      }, (idx + 1) * 200);
    });
  };

  return (
    <div className="relative w-full max-w-md lg:max-w-lg mx-auto">
      {/* Signature Retro Mascot Bobbing atop the Specimen (from neobrutalism.com) */}
      <div
        aria-hidden="true"
        className="select-none pointer-events-none absolute -end-2 -top-11 z-20 hidden size-16 object-contain sm:block animate-bounce"
        style={{ animationDuration: '3.5s' }}
      >
        <svg viewBox="0 0 88 88" className="w-full h-full drop-shadow-[2px_2px_0_#000]">
          <g transform="rotate(-6 44 44)" stroke="#000" strokeWidth="3.5" strokeLinejoin="round">
            <path d="M44 16v12" strokeLinecap="round" />
            <circle cx="44" cy="12" r="5" fill="#ffdc58" stroke="#000" strokeWidth="3" />
            <rect x="18" y="26" width="52" height="36" rx="4" fill="#ffdc58" stroke="#000" strokeWidth="3" />
            <circle cx="34" cy="42" r="5" fill="#fff" stroke="#000" strokeWidth="2.5" />
            <circle cx="54" cy="42" r="5" fill="#fff" stroke="#000" strokeWidth="2.5" />
            <circle cx="34" cy="42" r="2.5" fill="#000" />
            <circle cx="54" cy="42" r="2.5" fill="#000" />
            <rect x="26" y="64" width="36" height="14" rx="3" fill="#fff" stroke="#000" strokeWidth="3" />
          </g>
        </svg>
      </div>

      {/* Signature Neobrutalism Offset Under-Layer */}
      <div className="absolute border-2 border-black -bottom-2.5 -right-2.5 left-2.5 top-2.5 bg-primary pointer-events-none" />

      {/* Main Specimen Window */}
      <Card className="relative border-2 border-black bg-card shadow-none rounded-none overflow-hidden select-none flex flex-col justify-between">
        {/* Specimen Header with Window Controls */}
        <div className="flex shrink-0 items-center justify-between border-b-2 border-black bg-muted px-3.5 py-2.5">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full border border-black bg-[#ff5f56]" />
              <span className="size-2.5 rounded-full border border-black bg-[#ffbd2e]" />
              <span className="size-2.5 rounded-full border border-black bg-[#27c93f]" />
            </span>
            <span className="h-4 w-px shrink-0 bg-black/40" aria-hidden="true" />
            <span className="flex min-w-0 items-center gap-1.5 font-head text-[0.7rem] font-bold tracking-[0.14em] text-foreground uppercase">
              <Terminal className="size-3.5 shrink-0" />
              <span className="truncate">SYSTEM // TELEMETRY_SPECIMEN</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Badge variant="default" className="text-[10px] py-0 px-2 bg-primary text-black border-2 border-black font-head font-bold shadow-none">
              <span className="size-1.5 rounded-full bg-black mr-1 animate-pulse" />
              LIVE
            </Badge>
          </div>
        </div>

        <CardContent className="p-3.5 sm:p-5 flex flex-col justify-between gap-4">
          {/* Neobrutalism Tabs: 3 Views */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-3 bg-muted p-1 border-2 border-black shadow-xs">
              <TabsTrigger value="runtime" className="text-[10px] sm:text-xs font-head font-bold uppercase">
                RUNTIME
              </TabsTrigger>
              <TabsTrigger value="rag" className="text-[10px] sm:text-xs font-head font-bold uppercase">
                RAG QUERY
              </TabsTrigger>
              <TabsTrigger value="ui" className="text-[10px] sm:text-xs font-head font-bold uppercase">
                PRIMITIVES
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: RUNTIME TELEMETRY */}
            <TabsContent value="runtime" className="mt-0 space-y-3 font-mono text-xs">
              {/* 4 Stat Tiles */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 border-2 border-black bg-card shadow-xs">
                  <span className="font-head text-[9px] uppercase tracking-wider text-muted-foreground block">p99 LATENCY</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-base font-head font-bold text-foreground">42ms</span>
                    <Badge variant="emerald" className="text-[9px] py-0 px-1 font-mono">NORMAL</Badge>
                  </div>
                </div>

                <div className="p-2 border-2 border-black bg-card shadow-xs">
                  <span className="font-head text-[9px] uppercase tracking-wider text-muted-foreground block">VECTORS INDEXED</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-base font-head font-bold text-foreground">
                      <NumberTicker value={1248512} delay={0.2} />
                    </span>
                    <span className="text-[9px] font-bold bg-primary px-1 border border-black">FAISS</span>
                  </div>
                </div>

                <div className="p-2 border-2 border-black bg-card shadow-xs">
                  <span className="font-head text-[9px] uppercase tracking-wider text-muted-foreground block">RAG ACCURACY</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-base font-head font-bold text-foreground">99.1%</span>
                    <span className="text-[9px] font-bold text-emerald-700">RRF_RANK</span>
                  </div>
                </div>

                <div className="p-2 border-2 border-black bg-card shadow-xs">
                  <span className="font-head text-[9px] uppercase tracking-wider text-muted-foreground block">AWS DEPLOYMENT</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-head font-bold text-foreground truncate">ap-south-1</span>
                    <Badge variant="default" className="text-[9px] py-0 px-1 font-mono">ONLINE</Badge>
                  </div>
                </div>
              </div>

              {/* Stepped Digital Telemetry Histogram / Oscilloscope */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] font-head font-bold uppercase tracking-wide">
                  <span className="leading-tight">Stepped Digital Telemetry</span>
                  <span className="text-black bg-primary px-1.5 py-0.2 border border-black text-[9px] font-bold font-mono">
                    SAMPLE: 100Hz
                  </span>
                </div>
                <div className="w-full h-16 border-2 border-black bg-white relative overflow-hidden flex items-end justify-between p-2 shadow-xs">
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
                      backgroundSize: '0.65rem 0.65rem'
                    }}
                  />
                  {/* Stepped 8-column digital bar waveform */}
                  {[
                    { h: '45%', peak: false },
                    { h: '70%', peak: false },
                    { h: '35%', peak: false },
                    { h: '85%', peak: true },
                    { h: '60%', peak: false },
                    { h: '95%', peak: true },
                    { h: '50%', peak: false },
                    { h: '75%', peak: false },
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 mx-0.5 flex flex-col justify-end items-center h-full relative z-10">
                      <motion.div
                        className={`w-full border-2 border-black ${bar.peak ? 'bg-primary' : 'bg-foreground'
                          }`}
                        animate={{ height: [bar.h, `${Math.max(25, (parseInt(bar.h) + (i % 2 === 0 ? 20 : -15)) % 100)}%`, bar.h] }}
                        transition={{ repeat: Infinity, duration: 2.2 + (i * 0.2), ease: 'easeInOut' }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Micro Services Status Table */}
              <div className="border-2 border-black bg-muted/40 p-2 shadow-xs">
                <div className="grid grid-cols-[1.5fr_0.7fr_0.8fr] text-[10px] font-head font-bold uppercase tracking-wider text-muted-foreground mb-1 pb-1 border-b border-black/20">
                  <span>SERVICE</span>
                  <span className="text-center">PORT</span>
                  <span className="text-right">STATUS</span>
                </div>
                <div className="space-y-1 font-mono text-[11px] sm:text-xs">
                  <div className="grid grid-cols-[1.5fr_0.7fr_0.8fr] items-center">
                    <span className="font-bold truncate">FastAPI_Telemetry</span>
                    <span className="text-center opacity-70">8000</span>
                    <span className="text-right text-emerald-700 font-bold">ONLINE</span>
                  </div>
                  <div className="grid grid-cols-[1.5fr_0.7fr_0.8fr] items-center">
                    <span className="font-bold truncate">FAISS_VectorDB</span>
                    <span className="text-center opacity-70">2375</span>
                    <span className="text-right text-emerald-700 font-bold">ONLINE</span>
                  </div>
                  <div className="grid grid-cols-[1.5fr_0.7fr_0.8fr] items-center">
                    <span className="font-bold truncate">Vite_Frontend</span>
                    <span className="text-center opacity-70">5173</span>
                    <span className="text-right text-emerald-700 font-bold">ONLINE</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* TAB 2: INTERACTIVE RAG SIMULATION */}
            <TabsContent value="rag" className="mt-0 space-y-3">
              <div className="space-y-1.5">
                <label className="text-[11px] font-head font-bold uppercase tracking-wide text-foreground block">
                  Simulate Semantic Vector Query
                </label>
                <div className="flex gap-2">
                  <Input
                    value={queryInput}
                    onChange={(e) => setQueryInput(e.target.value)}
                    placeholder="Enter query..."
                    className="h-8 text-xs font-mono border-2 border-black bg-card shadow-xs"
                  />
                  <Button
                    size="xs"
                    variant="default"
                    onClick={runSimulation}
                    disabled={isSimulating}
                    className="font-head text-[10px] whitespace-nowrap px-3 shadow-xs"
                  >
                    <Play className="h-3 w-3 mr-1" />
                    {isSimulating ? 'STREAMING...' : 'RUN'}
                  </Button>
                </div>
              </div>

              {/* Preset prompt buttons */}
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-[9px] font-mono text-muted-foreground uppercase font-bold">Presets:</span>
                {[
                  'FAISS Embeddings',
                  'IEEE Sensor Telemetry',
                  'AWS Pipeline Latency'
                ].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      setQueryInput(preset);
                    }}
                    className="text-[9px] font-mono font-semibold bg-muted hover:bg-primary border border-black px-1.5 py-0.5 cursor-pointer transition-colors"
                  >
                    {preset}
                  </button>
                ))}
              </div>

              {/* Streaming token box */}
              <div className="p-3 bg-muted/30 border-2 border-black min-h-[105px] text-xs font-mono flex flex-col justify-between relative shadow-xs">
                <div className="flex flex-wrap gap-1.5 items-center relative z-10">
                  {simTokens.length > 0 ? (
                    simTokens.map((tok) => (
                      <motion.span
                        key={tok.id}
                        initial={{ opacity: 0, scale: 0.8, y: 4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className={
                          tok.text.includes('OK')
                            ? 'bg-emerald-400 text-black font-bold px-2 py-0.5 border-2 border-black shadow-xs text-[10px]'
                            : tok.text.includes('FAISS')
                              ? 'bg-primary text-black font-bold px-2 py-0.5 border-2 border-black shadow-xs text-[10px]'
                              : 'bg-card text-black font-bold px-1.5 py-0.5 border border-black text-[10px]'
                        }
                      >
                        {tok.text}
                      </motion.span>
                    ))
                  ) : (
                    <span className="text-muted-foreground italic text-xs py-2">
                      Click [RUN] to execute vector search & retrieval stream...
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-2 border-t border-black/20 font-mono mt-2">
                  <span>FAISS_STORE // 1.2M VECTORS</span>
                  <span className="text-black font-bold bg-primary px-1 border border-black">COSINE_SIM: 0.942</span>
                </div>
              </div>
            </TabsContent>

            {/* TAB 3: NEOBRUTALISM UI PRIMITIVES SPECIMEN */}
            <TabsContent value="ui" className="mt-0 space-y-3 font-mono text-xs">
              <div className="p-3 border-2 border-black bg-card shadow-xs space-y-3">
                <span className="font-head text-[10px] uppercase font-bold tracking-wider text-muted-foreground block">
                  System UI & Component Primitives
                </span>

                {/* Button Primitives */}
                <div className="flex items-center gap-2">
                  <Button size="xs" variant="default" className="font-head text-[10px]">
                    Ship It
                  </Button>
                  <Button size="xs" variant="outline" className="font-head text-[10px]">
                    Undo
                  </Button>
                  <Button size="xs" variant="secondary" className="font-head text-[10px]">
                    Secondary
                  </Button>
                </div>

                {/* Badges Primitives */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge variant="default" className="text-[10px]">New</Badge>
                  <Badge variant="secondary" className="text-[10px]">Beta</Badge>
                  <Badge variant="outline" className="text-[10px]">Radix</Badge>
                  <Badge variant="destructive" className="text-[10px]">Loud</Badge>
                </div>

                {/* Interactive Stream Switch */}
                <div className="flex items-center justify-between pt-2 border-t border-black/20">
                  <span className="font-head text-[11px] font-bold uppercase text-foreground">
                    Live Telemetry Stream
                  </span>
                  <button
                    type="button"
                    onClick={() => setLiveStreamActive(!liveStreamActive)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center border-2 border-black transition-colors ${liveStreamActive ? 'bg-primary' : 'bg-muted'
                      }`}
                  >
                    <span
                      className={`inline-block size-4 border-2 border-black bg-card transition-transform ${liveStreamActive ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                    />
                  </button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        {/* Signature Neobrutalism CLI Command Bar */}
        <div className="flex shrink-0 items-center justify-between gap-2 border-t-2 border-black bg-card px-3.5 py-2 font-mono text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="flex size-5 shrink-0 items-center justify-center border-2 border-black bg-primary font-bold text-black text-xs shadow-none">
              $
            </span>
            <code className="min-w-0 truncate text-foreground font-semibold text-[10px] sm:text-[11px]">
              curl -s https://api.vutikuri.dev/v1/telemetry | jq .status
            </code>
          </div>
          <button
            type="button"
            onClick={copyCommand}
            className="shrink-0 p-1 border border-black bg-muted hover:bg-primary transition-colors cursor-pointer text-foreground"
            title="Copy command"
            aria-label="Copy telemetry command"
          >
            {isCopied ? <Check className="size-3.5 text-black" /> : <Copy className="size-3.5" />}
          </button>
        </div>

        {/* Specimen Footer Specification Strip */}
        <div className="flex shrink-0 items-center justify-between gap-2 border-t-2 border-black bg-muted px-3.5 py-2">
          <span className="truncate font-head text-[10px] font-bold tracking-[0.12em] text-foreground uppercase">
            TELEMETRY BUS · BASE UI · RADIX
          </span>
          <span className="shrink-0 font-mono text-[10px] text-muted-foreground font-semibold">
            STATUS: 100% OK
          </span>
        </div>
      </Card>
    </div>
  );
};

export const HeroSection = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const { playClick } = useSound();

  return (
    <section id="home" className="relative overflow-hidden pt-24 sm:pt-28 pb-12 sm:pb-16 bg-background">
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* Background Subtle Technical Grid */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none opacity-25"
        style={{
          backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
          backgroundSize: '2.5rem 2.5rem'
        }}
      />

      <div className="container mx-auto px-4 relative z-10 w-full">
        <div className="grid items-center gap-8 lg:gap-10 lg:grid-cols-[1.1fr_0.9fr] min-h-[calc(100svh-6rem)] lg:min-h-[calc(100vh-8rem)]">
          <div className="max-w-3xl space-y-5 sm:space-y-6 text-center lg:text-left flex flex-col justify-center">

            {/* Status Sticker Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex self-center lg:self-start"
            >
              <Badge variant="default" className="text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 shadow-sm flex items-center gap-1.5 sm:gap-2 max-w-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse border border-black shrink-0" />
                <span className="truncate">AVAILABLE FOR ROLES • SDE | AI | CLOUD</span>
              </Badge>
            </motion.div>

            {/* Giant Punchy Neobrutalist Heading */}
            <div className="overflow-visible pt-1">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="font-head text-3xl sm:text-5xl md:text-6xl lg:text-[5.2rem] lg:leading-[1.0] select-none tracking-tight text-foreground uppercase break-words"
              >
                <span className="block">
                  <WaveText
                    text="VUTIKURI"
                    className="text-foreground"
                    jumpHeight={-14}
                    staggerDuration={0.04}
                    onHoverStart={() => playClick(950, 0.02, 'sine')}
                  />
                </span>
                <span className="block text-primary drop-shadow-[2px_2px_0px_#000] [-webkit-text-stroke:1px_#000]">
                  <WaveText
                    text="SHANMUKHA"
                    className="text-primary"
                    jumpHeight={-14}
                    staggerDuration={0.04}
                    onHoverStart={() => playClick(1100, 0.02, 'sine')}
                  />
                </span>
              </motion.h1>
            </div>

            {/* Subheading / Bio */}
            <p className="mx-auto max-w-2xl text-base sm:text-lg leading-relaxed text-foreground md:text-xl lg:mx-0 font-sans font-medium">
              I build production-grade AI systems, scalable cloud infrastructure, and analytics products with clean interfaces and measurable user value.
            </p>

            {/* Neobrutalist Metrics Box */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="grid grid-cols-3 border-2 border-black bg-card divide-x-2 divide-black shadow-[4px_4px_0px_#000] rounded-none max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto lg:mx-0 select-none"
            >
              <div className="px-2 sm:px-3 py-2.5 sm:py-3 text-center">
                <div className="text-lg sm:text-2xl font-head text-foreground font-bold">
                  <NumberTicker value={10} suffix="+" />
                </div>
                <div className="mt-0.5 text-[8.5px] sm:text-[10px] font-head tracking-wider uppercase text-muted-foreground font-medium">Products Built</div>
              </div>
              <div className="px-2 sm:px-3 py-2.5 sm:py-3 text-center bg-primary/20">
                <div className="text-lg sm:text-2xl font-head text-foreground font-bold">
                  <NumberTicker value={6} />
                </div>
                <div className="mt-0.5 text-[8.5px] sm:text-[10px] font-head tracking-wider uppercase text-muted-foreground font-medium">Live Demos</div>
              </div>
              <div className="px-2 sm:px-3 py-2.5 sm:py-3 text-center">
                <div className="text-lg sm:text-2xl font-head text-foreground font-bold">IEEE</div>
                <div className="mt-0.5 text-[8.5px] sm:text-[10px] font-head tracking-wider uppercase text-muted-foreground font-medium">Published</div>
              </div>
            </motion.div>

            {/* Tactile Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex w-full flex-col sm:flex-row flex-wrap items-center gap-3 pt-2 lg:items-start justify-center lg:justify-start"
            >
              <div className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="default"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto flex items-center justify-between gap-3 text-sm px-6"
                >
                  <span>EXPLORE WORK</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsResumeOpen(true)}
                  className="w-full sm:w-auto text-sm px-6"
                >
                  <FileText className="h-4 w-4 mr-1.5" />
                  RESUME
                </Button>
              </div>
              <div className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto text-sm px-6"
                >
                  GET IN TOUCH
                </Button>
              </div>

              {/* Social Icon Buttons */}
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                {heroSocialLinks.map(({ url, icon: Icon, label }) => (
                  <motion.a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -2, x: -2 }}
                    whileTap={{ y: 2, x: 2 }}
                    className="p-2.5 border-2 border-black bg-card text-foreground shadow-xs hover:bg-primary hover:shadow-sm transition-all"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Pure Neobrutalism Telemetry Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto"
          >
            <TelemetryDashboard />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

