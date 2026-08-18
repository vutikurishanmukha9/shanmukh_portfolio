import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { ExternalLink, Copy, Check, Cpu } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSound } from '@/hooks/useSound';
import { CitationKnowledgeGraph } from '@/components/ui/CitationKnowledgeGraph';
import { CircuitBlueprintModal } from '@/components/ui/CircuitBlueprintModal';
import { cn } from '@/lib/utils';

const LaTeXPaperPreview = ({ url }: { url: string }) => {
  const paperRef = useRef<HTMLAnchorElement>(null);
  const [lensPos, setLensPos] = useState<{ x: number; y: number } | null>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!paperRef.current) return;
    const rect = paperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLensPos({ x, y });

    // Calculate subtle 3D tilt angles
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = -((y - centerY) / centerY) * 7;
    const tiltY = ((x - centerX) / centerX) * 7;
    setRotX(tiltX);
    setRotY(tiltY);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setLensPos(null);
    setRotX(0);
    setRotY(0);
  };

  return (
    <div className="relative py-2 select-none" style={{ perspective: 1200 }}>
      <motion.a 
        ref={paperRef}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: rotX,
          rotateY: rotY,
          scale: isHovered ? 1.04 : 1,
          boxShadow: isHovered
            ? '0 24px 48px -12px rgba(20, 20, 19, 0.12), 0 4px 16px rgba(20, 20, 19, 0.04)'
            : '0 4px 12px rgba(20, 20, 19, 0.02)',
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="group relative block aspect-[1/1.41] w-full max-w-[215px] mx-auto bg-card border-[0.5px] border-border/80 p-4 rounded-md overflow-hidden transform-gpu"
      >
        {/* Specular Ambient Sheen */}
        {isHovered && (
          <div 
            className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300 opacity-60"
            style={{
              background: lensPos
                ? `radial-gradient(180px circle at ${lensPos.x}px ${lensPos.y}px, rgba(255,255,255,0.4), transparent 80%)`
                : 'none',
            }}
          />
        )}

        {/* LaTeX Document Body */}
        <div className="h-full flex flex-col justify-between text-[6px] text-foreground font-serif leading-tight relative z-10">
          
          {/* Header Block */}
          <div className="text-center space-y-1 border-b-[0.3px] border-foreground/25 pb-2">
            <p className="font-mono text-[4px] uppercase tracking-widest text-muted-foreground">IEEE CONFERENCE REPRINT</p>
            <h5 className="font-serif font-bold text-[7.2px] tracking-tight leading-none px-1">
              Optimizing Energy Efficiency in Smart Buildings Through IoT Occupancy Sensing
            </h5>
            <p className="text-[4.5px] text-muted-foreground">V. Shanmukha, et al. • NIT Jalandhar</p>
          </div>

          {/* Double-Column Abstract Content */}
          <div className="flex-1 grid grid-cols-2 gap-2 mt-2 select-none pointer-events-none opacity-85">
            
            {/* Column 1: Abstract Text blocks */}
            <div className="space-y-1.5 border-r-[0.3px] border-foreground/15 pr-1.5">
              <span className="font-bold text-[5.2px] block font-mono">ABSTRACT:</span>
              <div className="space-y-1">
                <div className="h-1 bg-muted-foreground/35 rounded-sm w-full" />
                <div className="h-1 bg-muted-foreground/35 rounded-sm w-full" />
                <div className="h-1 bg-muted-foreground/35 rounded-sm w-[90%]" />
                <div className="h-1 bg-muted-foreground/35 rounded-sm w-[95%]" />
                <div className="h-1 bg-muted-foreground/35 rounded-sm w-[80%]" />
              </div>
              <span className="font-bold text-[5.2px] block font-mono mt-1.5">I. INTRODUCTION</span>
              <div className="space-y-1">
                <div className="h-1 bg-muted-foreground/20 rounded-sm w-full" />
                <div className="h-1 bg-muted-foreground/20 rounded-sm w-[85%]" />
                <div className="h-1 bg-muted-foreground/20 rounded-sm w-full" />
              </div>
            </div>

            {/* Column 2: SVG Diagram with Live Traveling Circuit Pulses */}
            <div className="flex flex-col justify-between pl-0.5 space-y-1.5">
              <span className="font-bold text-[5.2px] block font-mono flex items-center justify-between">
                <span>II. TELEMETRY</span>
                <span className="text-[3px] text-emerald-500 font-mono">96%_ACC</span>
              </span>
              
              {/* SVG Schematic Block */}
              <div className="flex-1 border-[0.3px] border-foreground/20 bg-muted/20 rounded p-1 flex items-center justify-center relative overflow-hidden">
                <svg className="w-full h-11 text-primary/70" viewBox="0 0 60 40" role="img" aria-label="Fig 1. Decoupled IoT Sensor telemetry dataflow block diagram linking MCU with DHT22 sensors to CLOUD telemetry base">
                  {/* MCU module */}
                  <rect x="2" y="13" width="16" height="14" rx="1" fill="none" stroke="currentColor" strokeWidth="0.3" />
                  <text x="10" y="21" textAnchor="middle" fontSize="3" fontFamily="monospace" fill="currentColor">MCU</text>
                  
                  {/* Sensors link */}
                  <path d="M 10 5 L 10 13" stroke="currentColor" strokeWidth="0.3" strokeDasharray="0.5 0.5" />
                  <rect x="6" y="2" width="8" height="3" rx="0.5" fill="none" stroke="currentColor" strokeWidth="0.3" />
                  <text x="10" y="4.2" textAnchor="middle" fontSize="2" fontFamily="monospace" fill="currentColor">DHT22</text>
                  
                  {/* Link line to cloud gateway */}
                  <path d="M 18 20 L 32 20" stroke="currentColor" strokeWidth="0.3" strokeDasharray="0.5 0.5" />
                  
                  {/* Animated circuit pulse packet traveling MCU -> Cloud */}
                  <motion.circle
                    r="0.8"
                    fill="hsl(var(--primary))"
                    animate={{
                      cx: [18, 32],
                      cy: [20, 20],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                  />

                  {/* Cloud telemetry base */}
                  <rect x="32" y="11" width="24" height="18" rx="1" fill="none" stroke="currentColor" strokeWidth="0.3" />
                  <text x="44" y="18" textAnchor="middle" fontSize="3.2" fontFamily="monospace" fill="currentColor">CLOUD</text>
                  <text x="44" y="24" textAnchor="middle" fontSize="2.8" fontFamily="monospace" fill="currentColor" className="fill-emerald-500 font-bold">96%_ACC</text>
                </svg>
              </div>
              
              <p className="text-[3.8px] text-muted-foreground/75 leading-none italic text-center font-serif">
                Fig 1. Decoupled IoT Sensor telemetry dataflow.
              </p>
            </div>

          </div>

          {/* LaTeX Page Footer */}
          <div className="border-t-[0.3px] border-foreground/25 pt-1 flex justify-between text-[4px] font-mono text-muted-foreground">
            <span>IEEE EAIC 2025</span>
            <span>PAGE 4 OF 6</span>
          </div>

        </div>

        {/* Optical Glass Magnifying Reticle Following Cursor */}
        {isHovered && lensPos && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute pointer-events-none z-30 w-14 h-14 rounded-full border border-primary/50 bg-primary/5 backdrop-blur-[2px] shadow-[0_8px_20px_rgba(0,0,0,0.15)] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
            style={{
              left: lensPos.x,
              top: lensPos.y,
            }}
          >
            {/* Optical Crosshair Reticle */}
            <div className="w-full h-[0.5px] bg-primary/40 absolute" />
            <div className="h-full w-[0.5px] bg-primary/40 absolute" />
            <div className="w-2 h-2 rounded-full border border-primary/60 bg-primary/20" />
          </motion.div>
        )}

        {/* Hover blur overlay [READ ARTICLE] badge */}
        <div className="absolute inset-0 bg-background/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[1px] z-40">
          <div className="border-[0.5px] border-primary/50 bg-primary/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[10px] sm:text-[9px] font-mono uppercase tracking-widest text-primary font-bold shadow-sm">
            READ ARTICLE
            <ExternalLink className="h-3 w-3" />
          </div>
        </div>
      </motion.a>
    </div>
  );
};

const publications = [
  {
    title: 'Optimizing Energy Efficiency in Smart Buildings Through IoT-Driven Occupancy Sensing',
    authors: 'Vutikuri Shanmukha, et al.',
    journal: 'IEEE Xplore',
    year: '2025',
    description: 'Published a research paper on an IoT-driven occupancy detection system for smart buildings, integrating Arduino, IR, and DHT sensors with cloud connectivity. The framework achieved 96% accuracy, 60ms response time, and significant energy savings through real-time automation and intelligent control.',
    link: 'https://ieeexplore.ieee.org/document/11101373',
    type: 'Conference Paper',
    featured: true,
    metrics: {
      accuracy: '96%',
      responseTime: '60ms',
      energySavings: '30%',
    },
  },
];

export const PublicationsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [isBlueprintOpen, setIsBlueprintOpen] = useState(false);
  const { playClick } = useSound();
  const { toast } = useToast();

  const handleCopyCitation = (format: string) => {
    const text = format === 'BibTeX'
      ? `@article{shanmukha2025iot,\n  author = {Shanmukha, Vutikuri},\n  title = {Optimizing Energy Efficiency in Smart Buildings Through IoT-Driven Occupancy Sensing},\n  journal = {IEEE},\n  year = {2025}\n}`
      : `Shanmukha, V. (2025). Optimizing Energy Efficiency in Smart Buildings Through IoT-Driven Occupancy Sensing. IEEE Conference Proceedings.`;

    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);

    toast({
      title: `${format} Citation Copied!`,
      description: `Copied IEEE publication ${format} citation to clipboard.`,
    });
  };

  return (
    <SectionWrapper id="publications" className="py-16 bg-muted/10 border-b-[0.5px] border-border/40">
      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={containerRef}>
        
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border-[0.5px] border-border/80 shadow-none mb-4"
          >
            <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">Research</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-serif-display font-medium tracking-tight text-foreground select-none"
          >
            Publications
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mt-3 text-sm font-normal max-w-lg mx-auto leading-relaxed"
          >
            Peer-reviewed research exploring embedded systems, ambient RF energy harvesting, and autonomous intelligent edge architectures.
          </motion.p>
        </div>

        {/* Publications Dossier Grid */}
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {publications.map((pub, idx) => (
              <motion.div
                key={pub.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="group relative rounded-xl border-[0.5px] border-border/80 bg-card p-6 md:p-8 transition-colors duration-200 hover:border-border"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  
                  {/* Left Column: Metadata and Abstract details (5 Columns) */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-primary/10 text-primary border-[0.5px] border-primary/20">
                        {pub.journal}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {pub.year} • {pub.type}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-serif-display font-medium tracking-tight text-foreground leading-snug">
                      {pub.title}
                    </h3>

                    <p className="text-xs font-mono text-muted-foreground/80">
                      {pub.authors}
                    </p>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {pub.description}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-2.5">
                      <motion.button
                        whileHover={{ scale: 1.04, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        onClick={() => {
                          playClick(800, 0.04, 'sine');
                          setIsBlueprintOpen(true);
                        }}
                        className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/20 transition-colors shadow-sm font-semibold"
                      >
                        <Cpu className="h-3 w-3 text-cyan-500" />
                        <span>INSPECT CAD BLUEPRINT</span>
                      </motion.button>

                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-primary hover:text-primary/80 transition-colors px-2 py-0.5"
                      >
                        [ IEEE XPLORE ]
                        <ExternalLink className="h-3 w-3" />
                      </a>

                      <motion.button
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        onClick={() => handleCopyCitation('BibTeX')}
                        className={cn(
                          "inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider transition-colors px-2 py-0.5 rounded border-[0.5px]",
                          copiedFormat === 'BibTeX'
                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                            : "text-muted-foreground hover:text-foreground bg-background border-border"
                        )}
                      >
                        {copiedFormat === 'BibTeX' ? (
                          <Check className="h-3 w-3 text-emerald-600 animate-in zoom-in-50" />
                        ) : (
                          <Copy className="h-3 w-3 text-primary" />
                        )}
                        <span>{copiedFormat === 'BibTeX' ? 'COPIED' : 'BibTeX'}</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        onClick={() => handleCopyCitation('APA')}
                        className={cn(
                          "inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider transition-colors px-2 py-0.5 rounded border-[0.5px]",
                          copiedFormat === 'APA'
                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                            : "text-muted-foreground hover:text-foreground bg-background border-border"
                        )}
                      >
                        {copiedFormat === 'APA' ? (
                          <Check className="h-3 w-3 text-emerald-600 animate-in zoom-in-50" />
                        ) : (
                          <Copy className="h-3 w-3 text-primary" />
                        )}
                        <span>{copiedFormat === 'APA' ? 'COPIED' : 'APA'}</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Middle Column: LaTeX PDF reprint Abstract Card (4 Columns) */}
                  <div className="lg:col-span-4 flex items-center justify-center">
                    <LaTeXPaperPreview url={pub.link} />
                  </div>

                  {/* Right Column: Telemetry Performance Metrics Grid (3 Columns) */}
                  <div className="lg:col-span-3 flex flex-col justify-between border-[0.5px] border-border rounded bg-background/40 p-4 h-full min-h-[180px]">
                    <div>
                      <div className="text-[10px] sm:text-[9px] font-mono tracking-widest uppercase text-muted-foreground border-b-[0.5px] border-border/40 pb-2 mb-3">
                        SYSTEM TELEMETRY
                      </div>
                      <div className="space-y-3 font-mono">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">ACCURACY:</span>
                          <span className="font-semibold text-primary">{pub.metrics.accuracy}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">LATENCY:</span>
                          <span className="font-semibold text-primary">{pub.metrics.responseTime}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">EFFICIENCY:</span>
                          <span className="font-semibold text-emerald-500">+{pub.metrics.energySavings}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t-[0.5px] border-border/40 text-[8px] font-mono tracking-wide text-muted-foreground/60 text-right uppercase">
                      VERIFIED R&D DATA
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

          {/* Interactive Citation & Research Domain Knowledge Graph */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-8"
          >
            <CitationKnowledgeGraph />
          </motion.div>

        </div>
      </div>

      {/* A4 CAD Circuit & Intelligence Layer Blueprint Modal */}
      <CircuitBlueprintModal
        isOpen={isBlueprintOpen}
        onClose={() => setIsBlueprintOpen(false)}
      />
    </SectionWrapper>
  );
};