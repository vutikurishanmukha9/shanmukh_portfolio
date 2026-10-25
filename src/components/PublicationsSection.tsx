import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { ExternalLink, Copy, Check, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Publication {
  title: string;
  authors: string;
  journal: string;
  year: string;
  type: string;
  conference: string;
  description: string;
  url: string;
}

const publications: Publication[] = [
  {
    title: 'Optimizing Energy Efficiency in Smart Buildings Through IoT-Driven Occupancy Sensing',
    authors: 'Vutikuri Shanmukha, et al.',
    journal: 'IEEE EAIC 2025',
    year: '2025',
    type: 'Conference Proceedings',
    conference: 'NIT Jalandhar, Punjab, India',
    description: 'Investigates autonomous low-power edge architectures using spatial sensor arrays to infer room occupancy patterns, minimizing HVAC and lighting energy waste by up to 34% with zero privacy encroachment.',
    url: 'https://ieee.org',
  },
];

export const PublicationsSection = () => {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCopyCitation = (format: string) => {
    const text = format === 'BibTeX'
      ? `@article{shanmukha2025iot,\n  author = {Shanmukha, Vutikuri},\n  title = {Optimizing Energy Efficiency in Smart Buildings Through IoT-Driven Occupancy Sensing},\n  journal = {IEEE},\n  year = {2025}\n}`
      : `Shanmukha, V. (2025). Optimizing Energy Efficiency in Smart Buildings Through IoT-Driven Occupancy Sensing. IEEE Conference Proceedings.`;

    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);

    toast({
      title: `${format} Citation Copied`,
      description: `Copied IEEE publication ${format} citation to clipboard.`,
    });
  };

  return (
    <SectionWrapper id="publications" className="py-10 sm:py-12 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/60 text-xs font-medium text-foreground mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>Academic Rigor</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
          >
            Research & Publications
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-muted-foreground text-base leading-relaxed"
          >
            Peer-reviewed research exploring embedded cognitive sensing, telemetry pipelines, and autonomous edge intelligence.
          </motion.p>
        </div>

        {/* Publication Cards */}
        <div className="space-y-6">
          {publications.map((pub, idx) => (
            <motion.div
              key={pub.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-xs hover:border-primary/50 transition-all duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                
                <div className="space-y-3 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-foreground text-background">
                      {pub.journal}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {pub.conference} · {pub.year}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-snug">
                    {pub.title}
                  </h3>

                  <p className="text-xs font-mono text-primary font-medium">
                    {pub.authors}
                  </p>

                  <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                    {pub.description}
                  </p>
                </div>

                {/* Citation Actions */}
                <div className="flex flex-col gap-2 shrink-0 md:items-end">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyCitation('BibTeX')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border hover:bg-muted text-foreground transition-colors"
                    >
                      {copiedFormat === 'BibTeX' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                      )}
                      <span>BibTeX</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopyCitation('APA')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border hover:bg-muted text-foreground transition-colors"
                    >
                      {copiedFormat === 'APA' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                      )}
                      <span>APA</span>
                    </button>
                  </div>

                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground hover:text-primary transition-colors mt-2"
                  >
                    <span>View Conference Record</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
};