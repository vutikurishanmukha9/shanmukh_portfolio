import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { ExternalLink, Copy, Check, BookOpen, Award, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { BlurFade } from '@/components/magicui/blur-fade';
import { BorderBeam } from '@/components/magicui/border-beam';
import { cn } from '@/lib/utils';

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
    <SectionWrapper id="publications" className="py-20 sm:py-28 md:py-32 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-muted/60 text-xs font-mono font-medium text-foreground mb-4 shadow-2xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>ACADEMIC RIGOR</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground font-display leading-[1.12]"
          >
            Research & Publications
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed max-w-[62ch]"
          >
            Peer-reviewed research exploring spatial edge sensing, distributed sensor arrays, and autonomous energy optimization published in IEEE Xplore.
          </motion.p>
        </div>

        {/* Publication Cards */}
        <div className="space-y-6">
          {publications.map((pub, idx) => (
            <BlurFade key={pub.title} delay={0.1 + idx * 0.1} inView>
              <div className="p-1.5 rounded-[1.5rem] border border-border/80 bg-muted/20 shadow-xs hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                <BorderBeam
                  size={100}
                  duration={14}
                  delay={0}
                  colorFrom="hsl(var(--primary))"
                  colorTo="#10b981"
                />
                <div className="p-6 sm:p-8 rounded-[1.375rem] border border-border/70 bg-card shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] relative z-10">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  
                  {/* Left Column: Badges, Title, Authors, DOI & Abstract */}
                  <div className="flex-1 min-w-0">
                    {/* Conference Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-3.5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-foreground text-background">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{pub.journal}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium">
                        <Award className="w-3.5 h-3.5" />
                        <span>First Author</span>
                      </span>
                      <span className="text-xs font-mono text-muted-foreground sm:pl-1">
                        {pub.conference} · {pub.year}
                      </span>
                    </div>

                    {/* Paper Title */}
                    <h3 className="text-xl sm:text-2xl lg:text-[1.75rem] font-bold tracking-tight text-foreground leading-snug">
                      {pub.title}
                    </h3>

                    {/* Authors */}
                    <p className="text-xs sm:text-sm font-mono leading-relaxed mt-3">
                      <span className="font-bold text-primary">{pub.firstAuthor} (First Author)</span>
                      <span className="text-muted-foreground">, {pub.coAuthors}</span>
                    </p>

                    {/* Metadata: Pages & DOI */}
                    <div className="text-xs font-mono text-muted-foreground mt-2 flex flex-wrap items-center gap-2">
                      <span>Pages: {pub.pages}</span>
                      <span>•</span>
                      <span>DOI: </span>
                      <a
                        href={pub.doiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-primary underline underline-offset-2 transition-colors break-all"
                      >
                        {pub.doi}
                      </a>
                    </div>

                    {/* Abstract / Summary Body */}
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-5 max-w-3xl">
                      {pub.description}
                    </p>
                  </div>

                  {/* Right Column: Actions Dock */}
                  <div className="flex flex-col items-stretch md:items-end gap-2.5 shrink-0 pt-1 border-t md:border-t-0 border-border/60 pt-4 md:pt-0">
                    {/* Primary Button */}
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn inline-flex items-center justify-center gap-2 pl-4 pr-1.5 py-2 rounded-full bg-foreground text-background text-xs font-medium hover:opacity-90 active:scale-[0.98] transition-all shadow-xs"
                    >
                      <span>Read on IEEE Xplore</span>
                      <span className="w-5 h-5 rounded-full bg-background/20 flex items-center justify-center transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 shrink-0">
                        <ExternalLink className="w-3 h-3 text-background" />
                      </span>
                    </a>

                    {/* Citation Format Buttons with Inline Feedback */}
                    <div className="flex items-center gap-2 justify-end w-full">
                      <button
                        type="button"
                        onClick={() => handleCopyCitation('BibTeX')}
                        className={cn(
                          "inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-mono transition-all cursor-pointer flex-1 md:flex-initial",
                          copiedFormat === 'BibTeX'
                            ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 font-semibold"
                            : "border-border bg-muted/40 hover:bg-muted text-foreground"
                        )}
                        title="Copy BibTeX Citation"
                      >
                        {copiedFormat === 'BibTeX' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Copied BibTeX!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                            <span>BibTeX</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCopyCitation('APA')}
                        className={cn(
                          "inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-mono transition-all cursor-pointer flex-1 md:flex-initial",
                          copiedFormat === 'APA'
                            ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 font-semibold"
                            : "border-border bg-muted/40 hover:bg-muted text-foreground"
                        )}
                        title="Copy APA Citation"
                      >
                        {copiedFormat === 'APA' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Copied APA!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                            <span>APA</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Direct DOI Resolver Link */}
                    <a
                      href={pub.doiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center justify-center md:justify-end gap-1 transition-colors pt-1"
                    >
                      <span>Direct DOI Resolver</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                </div>
              </div>
            </div>
          </BlurFade>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
};