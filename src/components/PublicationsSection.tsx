import { useRef } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { ExternalLink, FileText } from 'lucide-react';

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
    <SectionWrapper id="publications" className="py-24 bg-muted/10 border-b-[0.5px] border-border/40">
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
        <div className="max-w-4xl mx-auto border-[0.5px] border-border bg-card/60 backdrop-blur-md rounded-lg overflow-hidden shadow-none">
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

                {/* Main Content Details Grid */}
                <div className="grid md:grid-cols-[2.2fr_1fr] gap-8">
                  {/* Left Column: Title, Authors, Description */}
                  <div className="space-y-4">
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

                  {/* Right Column: Telemetry Performance Metrics Grid */}
                  <div className="flex flex-col justify-between border-[0.5px] border-border rounded bg-background/40 p-4">
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