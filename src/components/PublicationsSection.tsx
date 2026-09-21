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
    <div className="relative py-2 select-none w-full max-w-[240px] mx-auto" style={{ perspective: 1200 }}>
      {/* Neobrutalist yellow offset layer */}
      <div className="absolute border-2 border-black -bottom-2 -right-2 left-2 top-2 bg-primary pointer-events-none" />

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
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="group relative block aspect-[1/1.41] w-full bg-card border-2 border-black p-4 rounded-none overflow-hidden transform-gpu shadow-none"
      >
        {/* Specular Ambient Sheen */}
        {isHovered && (
          <div 
            className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300 opacity-60"
            style={{
              background: lensPos
                ? `radial-gradient(180px circle at ${lensPos.x}px ${lensPos.y}px, rgba(255,220,88,0.35), transparent 80%)`
                : 'none',
            }}
          />
        )}

        {/* LaTeX Document Body */}
        <div className="h-full flex flex-col justify-between text-[6px] text-foreground font-mono leading-tight relative z-10">
          
          {/* Header Block */}
          <div className="text-center space-y-1 border-b-2 border-black pb-2">
            <p className="font-head text-[5px] uppercase tracking-widest bg-primary text-black font-bold py-0.5 border border-black">IEEE CONFERENCE REPRINT</p>
            <h5 className="font-head font-bold text-[7.5px] tracking-tight leading-none px-0.5 pt-1 uppercase">
              Optimizing Energy Efficiency in Smart Buildings
            </h5>
            <p className="text-[5px] text-muted-foreground font-mono">V. Shanmukha, et al. • NIT Jalandhar</p>
          </div>

          {/* Double-Column Abstract Content */}
          <div className="flex-1 grid grid-cols-2 gap-2 mt-2 select-none pointer-events-none">
            
            {/* Column 1: Abstract Text blocks */}
            <div className="space-y-1.5 border-r border-black pr-1.5 font-mono">
              <span className="font-bold text-[5.5px] block font-head uppercase">ABSTRACT:</span>
              <div className="space-y-1">
                <div className="h-1 bg-black/40 w-full" />
                <div className="h-1 bg-black/40 w-full" />
                <div className="h-1 bg-black/40 w-[90%]" />
                <div className="h-1 bg-black/40 w-[95%]" />
                <div className="h-1 bg-black/40 w-[80%]" />
              </div>
              <span className="font-bold text-[5.5px] block font-head uppercase mt-1.5">I. INTRODUCTION</span>
              <div className="space-y-1">
                <div className="h-1 bg-black/25 w-full" />
                <div className="h-1 bg-black/25 w-[85%]" />
                <div className="h-1 bg-black/25 w-full" />
              </div>
            </div>

            {/* Column 2: SVG Diagram with Live Traveling Circuit Pulses */}
            <div className="flex flex-col justify-between pl-0.5 space-y-1.5">
              <span className="font-bold text-[5.5px] block font-head uppercase flex items-center justify-between">
                <span>II. TELEMETRY</span>
                <span className="text-[4px] bg-emerald-400 text-black px-1 border border-black font-bold">96%_ACC</span>
              </span>
              
              {/* SVG Schematic Block */}
              <div className="flex-1 border-2 border-black bg-white rounded-none p-1 flex items-center justify-center relative overflow-hidden">
                <svg className="w-full h-11 text-black" viewBox="0 0 60 40" role="img" aria-label="Fig 1. Decoupled IoT Sensor telemetry dataflow block diagram linking MCU with DHT22 sensors to CLOUD telemetry base">
                  {/* MCU module */}
                  <rect x="2" y="13" width="16" height="14" fill="#fff7e8" stroke="currentColor" strokeWidth="1" />
                  <text x="10" y="21" textAnchor="middle" fontSize="3" fontFamily="monospace" fontWeight="bold" fill="currentColor">MCU</text>
                  
                  {/* Sensors link */}
                  <path d="M 10 5 L 10 13" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />
                  <rect x="6" y="2" width="8" height="4" fill="#ffdc58" stroke="currentColor" strokeWidth="1" />
                  <text x="10" y="4.8" textAnchor="middle" fontSize="2" fontFamily="monospace" fontWeight="bold" fill="currentColor">DHT22</text>
                  
                  {/* Link line to cloud gateway */}
                  <path d="M 18 20 L 32 20" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />
                  
                  {/* Animated circuit pulse packet traveling MCU -> Cloud */}
                  <motion.circle
                    r="1.2"
                    fill="#000"
                    animate={{
                      cx: [18, 32],
                      cy: [20, 20],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                  />

                  {/* Cloud telemetry base */}
                  <rect x="32" y="11" width="24" height="18" fill="#ffdc58" stroke="currentColor" strokeWidth="1" />
                  <text x="44" y="18" textAnchor="middle" fontSize="3.2" fontFamily="monospace" fontWeight="bold" fill="currentColor">CLOUD</text>
                  <text x="44" y="24" textAnchor="middle" fontSize="2.8" fontFamily="monospace" fontWeight="bold" fill="#000">96%_ACC</text>
                </svg>
              </div>
              
              <p className="text-[4px] text-muted-foreground leading-none font-mono text-center">
                Fig 1. IoT Sensor telemetry bus.
              </p>
            </div>

          </div>

          {/* LaTeX Page Footer */}
          <div className="border-t-2 border-black pt-1 flex justify-between text-[4.5px] font-mono text-foreground font-bold">
            <span>IEEE EAIC 2025</span>
            <span>PAGE 4 OF 6</span>
          </div>
        </div>

        {/* Hover overlay [READ ARTICLE] badge */}
        <div className="absolute inset-0 bg-black/75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-40">
          <div className="border-2 border-black bg-primary text-black px-3.5 py-1.5 font-head font-bold text-[10px] uppercase shadow-[3px_3px_0px_#fff] flex items-center gap-1.5">
            <span>READ ARTICLE</span>
            <ExternalLink className="h-3.5 w-3.5 stroke-[2.5]" />
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
    <SectionWrapper id="publications" className="py-16 bg-background border-b-2 border-black">
      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={containerRef}>
        
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <span className="text-xs font-head font-bold uppercase tracking-wider bg-primary text-black border-2 border-black px-3 py-1 shadow-xs">
              RESEARCH & DISCOVERIES
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-head font-bold tracking-tight text-foreground uppercase select-none"
          >
            Publications
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-foreground mt-3 text-sm sm:text-base font-sans font-medium max-w-lg mx-auto leading-relaxed"
          >
            Peer-reviewed research exploring embedded cognitive sensing, ambient RF telemetry, and autonomous intelligent edge architectures.
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
                className="group relative rounded-none border-2 border-black bg-card p-4 sm:p-6 md:p-8 shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] transition-all duration-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* Left Column: Metadata and Abstract details (5 Columns) */}
                  <div className="md:col-span-5 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-none text-[10px] font-head font-bold uppercase tracking-wider bg-primary text-black border-2 border-black shadow-xs">
                        {pub.journal}
                      </span>
                      <span className="text-xs font-mono font-bold text-muted-foreground">
                        {pub.year} • {pub.type}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-head font-bold tracking-tight text-foreground uppercase leading-snug">
                      {pub.title}
                    </h3>

                    <p className="text-xs font-mono font-semibold text-foreground">
                      {pub.authors}
                    </p>

                    <p className="text-xs sm:text-sm font-sans text-muted-foreground leading-relaxed">
                      {pub.description}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-2.5">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          playClick(800, 0.04, 'sine');
                          setIsBlueprintOpen(true);
                        }}
                        className="w-full sm:w-auto justify-center inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-head font-bold uppercase tracking-wider px-3 py-2 rounded-none border-2 border-black bg-primary text-black hover:bg-primary-hover transition-colors shadow-xs cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                      >
                        <Cpu className="h-3.5 w-3.5 text-black" />
                        <span>INSPECT CAD BLUEPRINT</span>
                      </motion.button>

                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-initial justify-center inline-flex items-center gap-1 text-[10px] font-head font-bold uppercase tracking-wider text-black bg-card hover:bg-muted transition-colors px-2.5 py-1.5 border-2 border-black shadow-xs active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                      >
                        <span>IEEE XPLORE</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleCopyCitation('BibTeX')}
                        className={cn(
                          "flex-1 sm:flex-initial justify-center inline-flex items-center gap-1 text-[10px] font-head font-bold uppercase tracking-wider transition-colors px-2.5 py-1.5 rounded-none border-2 border-black shadow-xs cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
                          copiedFormat === 'BibTeX'
                            ? "bg-emerald-400 text-black"
                            : "text-foreground bg-card hover:bg-muted"
                        )}
                      >
                        {copiedFormat === 'BibTeX' ? (
                          <Check className="h-3 w-3 text-black animate-in zoom-in-50" />
                        ) : (
                          <Copy className="h-3 w-3 text-black" />
                        )}
                        <span>{copiedFormat === 'BibTeX' ? 'COPIED' : 'BibTeX'}</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleCopyCitation('APA')}
                        className={cn(
                          "flex-1 sm:flex-initial justify-center inline-flex items-center gap-1 text-[10px] font-head font-bold uppercase tracking-wider transition-colors px-2.5 py-1.5 rounded-none border-2 border-black shadow-xs cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
                          copiedFormat === 'APA'
                            ? "bg-emerald-400 text-black"
                            : "text-foreground bg-card hover:bg-muted"
                        )}
                      >
                        {copiedFormat === 'APA' ? (
                          <Check className="h-3 w-3 text-black animate-in zoom-in-50" />
                        ) : (
                          <Copy className="h-3 w-3 text-black" />
                        )}
                        <span>{copiedFormat === 'APA' ? 'COPIED' : 'APA'}</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Middle Column: LaTeX PDF reprint Abstract Card (4 Columns) */}
                  <div className="md:col-span-4 flex items-center justify-center">
                    <LaTeXPaperPreview url={pub.link} />
                  </div>

                  {/* Right Column: Telemetry Performance Metrics Grid (3 Columns) */}
                  <div className="md:col-span-3 flex flex-col justify-between border-2 border-black bg-muted/40 p-4 h-full min-h-[190px] shadow-xs rounded-none">
                    <div>
                      <div className="text-xs font-head font-bold tracking-wider uppercase text-foreground border-b-2 border-black pb-2 mb-3 flex items-center justify-between">
                        <span>SYSTEM TELEMETRY</span>
                        <span className="size-2 rounded-full bg-emerald-500 animate-pulse border border-black" />
                      </div>
                      <div className="space-y-2 font-mono">
                        <div className="flex items-center justify-between text-xs p-1.5 border border-black bg-card shadow-xs">
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">ACCURACY:</span>
                          <span className="font-bold text-foreground bg-primary px-1.5 py-0.5 border border-black">{pub.metrics.accuracy}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs p-1.5 border border-black bg-card shadow-xs">
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">LATENCY:</span>
                          <span className="font-bold text-foreground">{pub.metrics.responseTime}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs p-1.5 border border-black bg-card shadow-xs">
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">EFFICIENCY:</span>
                          <span className="font-bold text-emerald-700">+{pub.metrics.energySavings}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-2 border-t border-black/30 text-[9px] font-mono tracking-wide text-muted-foreground text-right uppercase font-bold">
                      VERIFIED IEEE R&D DATA
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