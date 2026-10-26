import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { ExternalLink, Copy, Check, BookOpen, Award, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Publication {
  title: string;
  authors: string;
  firstAuthor: string;
  coAuthors: string;
  journal: string;
  year: string;
  type: string;
  conference: string;
  pages: string;
  doi: string;
  doiUrl: string;
  description: string;
  url: string;
}

const publications: Publication[] = [
  {
    title: 'Optimizing Energy Efficiency in Smart Buildings Through IOT-Driven Occupancy Sensing',
    authors: 'Shanmukha Vutikuri (First Author), Rajyalakshmi Uppada, Tejaswini Panse, Dr. S. Saradha Rani, Abhishek Savarapu',
    firstAuthor: 'Shanmukha Vutikuri',
    coAuthors: 'Rajyalakshmi Uppada, Tejaswini Panse, Dr. S. Saradha Rani, Abhishek Savarapu',
    journal: 'IEEE EAIC 2025',
    year: '2025',
    type: 'Conference Proceedings',
    conference: 'NIT Jalandhar, Punjab, India',
    pages: 'pp. 1–7',
    doi: '10.1109/eaic66483.2025.11101373',
    doiUrl: 'https://doi.org/10.1109/eaic66483.2025.11101373',
    description: 'Investigates autonomous low-power edge sensing architectures using spatial sensor arrays to infer room occupancy patterns, minimizing HVAC and lighting energy waste by up to 34% with zero privacy encroachment.',
    url: 'https://ieeexplore.ieee.org/document/11101373',
  },
];

export const PublicationsSection = () => {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCopyCitation = (format: string) => {
    const text = format === 'BibTeX'
      ? `@inproceedings{vutikuri2025optimizing,
  author    = {Vutikuri, Shanmukha and Uppada, Rajyalakshmi and Panse, Tejaswini and Rani, S. Saradha and Savarapu, Abhishek},
  title     = {Optimizing Energy Efficiency in Smart Buildings Through IOT-Driven Occupancy Sensing},
  booktitle = {2025 International Conference on Electronics, AI and Computing (EAIC)},
  pages     = {1--7},
  year      = {2025},
  publisher = {IEEE},
  doi       = {10.1109/eaic66483.2025.11101373},
  url       = {https://ieeexplore.ieee.org/document/11101373}
}`
      : `Vutikuri, S., Uppada, R., Panse, T., Rani, S. S., & Savarapu, A. (2025). Optimizing Energy Efficiency in Smart Buildings Through IOT-Driven Occupancy Sensing. In 2025 International Conference on Electronics, AI and Computing (EAIC) (pp. 1–7). IEEE. https://doi.org/10.1109/eaic66483.2025.11101373`;

    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);

    toast({
      title: `${format} Citation Copied`,
      description: `Copied official IEEE publication ${format} citation to clipboard.`,
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
            Peer-reviewed research exploring embedded cognitive sensing, telemetry pipelines, and autonomous edge intelligence published in IEEE Xplore.
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
              className="p-1.5 rounded-[1.375rem] border border-border/80 bg-muted/20 shadow-xs hover:border-primary/40 transition-all duration-200"
            >
              <div className="p-6 sm:p-8 rounded-2xl border border-border/70 bg-card">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  
                  <div className="space-y-3 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-foreground text-background">
                        <BookOpen className="w-3 h-3" />
                        <span>{pub.journal}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium">
                        <Award className="w-3 h-3" />
                        <span>First Author</span>
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {pub.conference} · {pub.year}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-snug">
                      {pub.title}
                    </h3>

                    <div className="space-y-1">
                      <p className="text-xs font-mono text-foreground font-medium">
                        <span className="text-primary font-semibold">{pub.firstAuthor}</span> (First Author), {pub.coAuthors}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 pt-0.5 text-xs font-mono text-muted-foreground">
                        <span>Pages: {pub.pages}</span>
                        <span>•</span>
                        <a
                          href={pub.doiUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors underline underline-offset-2"
                        >
                          DOI: {pub.doi}
                        </a>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                      {pub.description}
                    </p>
                  </div>

                  {/* Citation & Direct Actions */}
                  <div className="flex flex-col gap-3 shrink-0 md:items-end">
                    {/* Primary Button-in-Button CTA */}
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn inline-flex items-center gap-2 pl-4 pr-1.5 py-2 rounded-full bg-foreground text-background text-xs font-medium hover:opacity-90 transition-all shadow-xs"
                    >
                      <span>Read on IEEE Xplore</span>
                      <span className="w-6 h-6 rounded-full bg-background/20 flex items-center justify-center transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 shrink-0">
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </a>

                    {/* Copy Citation Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopyCitation('BibTeX')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg border border-border bg-muted/40 hover:bg-muted text-foreground transition-colors cursor-pointer"
                        title="Copy BibTeX Citation"
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
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg border border-border bg-muted/40 hover:bg-muted text-foreground transition-colors cursor-pointer"
                        title="Copy APA Citation"
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
                      href={pub.doiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-muted-foreground hover:text-primary transition-colors"
                    >
                      <span>Direct DOI Resolver</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
};