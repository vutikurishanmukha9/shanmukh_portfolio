import { useRef } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { ExternalLink, FileText } from 'lucide-react';

interface LaTeXPaperPreviewProps {
  url: string;
}

const LaTeXPaperPreview = ({ url }: { url: string }) => {
  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-[1/1.41] w-full max-w-[210px] mx-auto bg-card border-[0.5px] border-border/80 shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 p-4 rounded-md select-none overflow-hidden"
    >
      {/* LaTeX Document Body */}
      <div className="h-full flex flex-col justify-between text-[6px] text-foreground font-serif leading-tight">
        
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

          {/* Column 2: SVG Diagram and figures */}
          <div className="flex flex-col justify-between pl-0.5 space-y-1.5">
            <span className="font-bold text-[5.2px] block font-mono">II. TELEMETRY</span>
            
            {/* SVG Schematic Block */}
            <div className="flex-1 border-[0.3px] border-foreground/20 bg-muted/20 rounded p-1 flex items-center justify-center">
              <svg className="w-full h-11 text-primary/70" viewBox="0 0 60 40">
                {/* MCU module */}
                <rect x="2" y="13" width="16" height="14" rx="1" fill="none" stroke="currentColor" strokeWidth="0.3" />
                <text x="10" y="21" textAnchor="middle" fontSize="3" fontFamily="monospace" fill="currentColor">MCU</text>
                
                {/* Sensors link */}
                <path d="M 10 5 L 10 13" stroke="currentColor" strokeWidth="0.3" strokeDasharray="0.5 0.5" />
                <rect x="6" y="2" width="8" height="3" rx="0.5" fill="none" stroke="currentColor" strokeWidth="0.3" />
                <text x="10" y="4.2" textAnchor="middle" fontSize="2" fontFamily="monospace" fill="currentColor">DHT22</text>
                
                {/* Link line to cloud gateway */}
                <path d="M 18 20 L 32 20" stroke="currentColor" strokeWidth="0.3" strokeDasharray="0.5 0.5" />
                
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

      {/* Hover blur overlay [READ ARTICLE] */}
      <div className="absolute inset-0 bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[1px]">
        <div className="border-[0.5px] border-primary/45 bg-primary/5 px-3 py-1.5 rounded flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest text-primary font-bold shadow-none animate-pulse">
          READ ARTICLE
          <ExternalLink className="h-3 w-3" />
        </div>
      </div>
    </a>
  );
};

export const PublicationsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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
            className="mt-3 text-muted-foreground text-xs max-w-md mx-auto leading-relaxed"
          >
            Academic research contributions specializing in IoT integrations, cloud telemetry, and automation.
          </motion.p>
        </div>

        {/* Tabular Publication View */}
        <div className="max-w-6xl mx-auto border-[0.5px] border-border bg-card/60 backdrop-blur-md rounded-lg overflow-hidden shadow-none">
          <div className="divide-y divide-border/60">
            {publications.map((pub, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-8 flex flex-col gap-6 hover:bg-background/20 transition-colors duration-200"
              >
                {/* Meta Row (Type, Journal, Year) */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b-[0.5px] border-border/40 pb-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-background border-[0.5px] border-border text-[9px] font-mono text-muted-foreground uppercase tracking-wider">
                      <FileText className="h-3 w-3 text-primary" />
                      {pub.type}
                    </span>
                    {pub.featured && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-primary/10 border-[0.5px] border-primary/20 text-[9px] font-mono text-primary uppercase tracking-wider">
                        FEATURED
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    <span>{pub.journal}</span>
                    <span>•</span>
                    <span>{pub.year}</span>
                  </div>
                </div>
 
                {/* Main Content Details Grid - Expanded 3-Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column: Title, Authors, Description (5 Columns) */}
                  <div className="space-y-4 lg:col-span-5">
                    <div className="space-y-2">
                      <h3 className="text-lg md:text-xl font-serif-display font-medium text-foreground leading-snug">
                        {pub.title}
                      </h3>
                      <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                        BY {pub.authors}
                      </p>
                    </div>
                    
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {pub.description}
                    </p>

                    <div className="pt-2">
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
                      >
                        [ VIEW ON IEEE XPLORE ]
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>

                  {/* Middle Column: LaTeX PDF reprint Abstract Card (4 Columns) */}
                  <div className="lg:col-span-4 flex items-center justify-center">
                    <LaTeXPaperPreview url={pub.link} />
                  </div>

                  {/* Right Column: Telemetry Performance Metrics Grid (3 Columns) */}
                  <div className="lg:col-span-3 flex flex-col justify-between border-[0.5px] border-border rounded bg-background/40 p-4 h-full min-h-[180px]">
                    <div>
                      <div className="text-[9px] font-mono tracking-widest uppercase text-muted-foreground border-b-[0.5px] border-border/40 pb-2 mb-3">
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
        </div>
      </div>
    </SectionWrapper>
  );
};