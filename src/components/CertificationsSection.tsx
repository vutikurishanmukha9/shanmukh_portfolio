import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { ShieldCheck, CheckCircle2, Award } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

interface CredentialBadgeProps {
  id: string;
  issuer: string;
  year: string;
  isParentHovered: boolean;
}

const CredentialFlipBadge = ({ id, issuer, year, isParentHovered }: CredentialBadgeProps) => {
  return (
    <div className="relative w-32 h-7 select-none" style={{ perspective: 600 }}>
      <motion.div
        animate={{ rotateY: isParentHovered ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Face: [ VERIFIED ] */}
        <div
          className="absolute inset-0 rounded-full bg-background/80 border-[0.5px] border-border/80 px-2.5 py-0.5 flex items-center justify-center gap-1.5 shadow-xs"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground font-medium">
            VERIFIED
          </span>
        </div>

        {/* Back Face: [ ID: CODE ] with metallic sheen */}
        <div
          className="absolute inset-0 rounded-full bg-primary/10 border-[0.5px] border-primary/30 px-2.5 py-0.5 flex items-center justify-center gap-1 text-primary shadow-xs"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <ShieldCheck className="w-3 h-3 text-primary shrink-0" />
          <span className="text-[8.5px] font-mono uppercase tracking-wider font-semibold truncate">
            {id}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export const CertificationsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { playClick } = useSound();

  const certifications = [
    {
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      description: 'Foundational understanding of AWS Cloud concepts, services, security, architecture, and pricing models.',
      category: 'Cloud Computing',
      credentialId: 'AWS-CCP-9842',
      year: '2024',
    },
    {
      title: 'Oracle Certified AI Foundations Associate',
      issuer: 'Oracle',
      description: 'Foundational knowledge of machine learning algorithms, deep learning architectures, and generative AI concepts.',
      category: 'Artificial Intelligence',
      credentialId: 'ORA-AI-7721',
      year: '2024',
    },
    {
      title: 'Oracle Certified Foundations Associate',
      issuer: 'Oracle',
      description: 'Comprehensive knowledge of Oracle Cloud Infrastructure (OCI) core services, tenancy management, and security.',
      category: 'Cloud & Database',
      credentialId: 'ORA-FND-4389',
      year: '2024',
    },
    {
      title: 'IBM Data Analysis with Python',
      issuer: 'IBM',
      description: 'End-to-end data analysis techniques using Python, Pandas dataframes, NumPy arrays, and Scikit-learn models.',
      category: 'Data Analysis',
      credentialId: 'IBM-DA-5541',
      year: '2024',
    },
    {
      title: 'IBM SQL for Data Science',
      issuer: 'IBM',
      description: 'Relational database querying, multi-table joins, subqueries, aggregations, and performance optimization.',
      category: 'Data Science',
      credentialId: 'IBM-SQL-3219',
      year: '2024',
    },
    {
      title: 'IBM Python for Data Science',
      issuer: 'IBM',
      description: 'Core Python programming fundamentals, data structures, functional paradigms, and computational pipelines.',
      category: 'Programming',
      credentialId: 'IBM-PY-8802',
      year: '2024',
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
            <Award className="w-3.5 h-3.5 text-primary" />
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
            Continuously advancing technical expertise through industry-recognized certifications and verified accreditations.
          </motion.p>
        </div>

        {/* Apple-Grade Specular Hardware Enclosure with 3D Flip Badges */}
        <div className="relative max-w-4xl mx-auto border-[0.5px] border-border/80 bg-card/60 backdrop-blur-md rounded-xl overflow-hidden shadow-none group">
          {/* Apple / VisionOS Specular Top Highlight Ray */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent transition-all duration-500 group-hover:via-primary/80 group-hover:h-[1.5px] z-20" />

          {/* Ambient Directional Light Bloom */}
          <div className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 w-3/4 h-14 bg-gradient-to-b from-primary/15 via-primary/5 to-transparent blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

          <div className="relative z-10 divide-y divide-border/60">
            {certifications.map((cert, index) => {
              const isHovered = hoveredIdx === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ x: 4 }}
                  onMouseEnter={() => {
                    setHoveredIdx(index);
                    playClick(980, 0.02, 'sine');
                  }}
                  onMouseLeave={() => setHoveredIdx(null)}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 md:p-8 flex flex-col md:grid md:grid-cols-[1.25fr_2.5fr_1.25fr] gap-6 items-start hover:bg-background/25 transition-colors duration-200"
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

                  {/* Right: 3D Credential Flip Badge */}
                  <div className="flex flex-wrap gap-1 md:justify-end w-full">
                    <CredentialFlipBadge
                      id={cert.credentialId}
                      issuer={cert.issuer}
                      year={cert.year}
                      isParentHovered={isHovered}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};