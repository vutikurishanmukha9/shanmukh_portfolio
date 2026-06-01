import { useRef } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';

export const CertificationsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const certifications = [
    {
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      description: 'Foundational understanding of AWS Cloud concepts, services, and terminology.',
      category: 'Cloud Computing',
    },
    {
      title: 'Oracle Certified AI Foundations Associate',
      issuer: 'Oracle',
      description: 'Foundational knowledge of AI and machine learning concepts.',
      category: 'Artificial Intelligence',
    },
    {
      title: 'Oracle Certified Foundations Associate',
      issuer: 'Oracle',
      description: 'Comprehensive knowledge of Oracle Cloud Infrastructure fundamentals.',
      category: 'Cloud & Database',
    },
    {
      title: 'IBM Data Analysis with Python',
      issuer: 'IBM',
      description: 'Data analysis techniques using Python, pandas, and NumPy.',
      category: 'Data Analysis',
    },
    {
      title: 'IBM SQL for Data Science',
      issuer: 'IBM',
      description: 'SQL fundamentals for data science and database querying.',
      category: 'Data Science',
    },
    {
      title: 'IBM Python for Data Science',
      issuer: 'IBM',
      description: 'Python programming fundamentals for data science.',
      category: 'Programming',
    },
  ];

  return (
    <SectionWrapper id="certifications" className="py-16 bg-background border-b-[0.5px] border-border/40">
      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={containerRef}>
        
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border-[0.5px] border-border/80 shadow-none mb-4"
          >
            <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">Credentials</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-serif-display font-medium tracking-tight text-foreground select-none"
          >
            Certifications
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-muted-foreground text-xs max-w-md mx-auto leading-relaxed"
          >
            Continuously advancing my technical expertise through industry-recognized certifications.
          </motion.p>
        </div>

        {/* Cohere-Inspired Tabular Rows */}
        <div className="max-w-4xl mx-auto border-[0.5px] border-border bg-card/60 backdrop-blur-md rounded-lg overflow-hidden shadow-none">
          <div className="divide-y divide-border/60">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-8 flex flex-col md:grid md:grid-cols-[1.25fr_2.5fr_1.25fr] gap-6 items-start hover:bg-background/20 transition-colors duration-200"
              >
                {/* Left: Issuer & Category */}
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-mono font-medium tracking-wider text-primary uppercase">
                    {cert.issuer}
                  </span>
                  <span className="text-[9px] font-mono tracking-widest uppercase text-muted-foreground">
                    {cert.category}
                  </span>
                </div>

                {/* Middle: Title & Description */}
                <div className="space-y-1.5">
                  <h3 className="text-base font-serif-display font-medium text-foreground leading-tight">
                    {cert.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed max-w-xl">
                    {cert.description}
                  </p>
                </div>

                {/* Right: Status Tag */}
                <div className="flex flex-wrap gap-1 md:justify-end w-full">
                  <span className="px-2 py-0.5 rounded bg-background/50 border-[0.5px] border-border/80 text-[9px] font-mono text-muted-foreground select-none uppercase tracking-wider">
                    [ VERIFIED ]
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};