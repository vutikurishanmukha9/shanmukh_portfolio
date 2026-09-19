import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { ShieldCheck, Award } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

interface CredentialBadgeProps {
  id: string;
  isParentHovered: boolean;
}

const CredentialFlipBadge = ({ id, isParentHovered }: CredentialBadgeProps) => {
  return (
    <div className="relative w-36 h-8 select-none" style={{ perspective: 600 }}>
      <motion.div
        animate={{ rotateY: isParentHovered ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Face: [ VERIFIED ] */}
        <div
          className="absolute inset-0 rounded-none bg-card border-2 border-black px-2.5 py-1 flex items-center justify-center gap-1.5 shadow-xs"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 border border-black animate-pulse" />
          <span className="text-[10px] font-head uppercase tracking-wider text-foreground font-bold">
            VERIFIED
          </span>
        </div>

        {/* Back Face: [ ID: CODE ] */}
        <div
          className="absolute inset-0 rounded-none bg-primary border-2 border-black px-2.5 py-1 flex items-center justify-center gap-1.5 text-black shadow-xs"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-black shrink-0" />
          <span className="text-[9px] font-mono uppercase tracking-wider font-bold truncate">
            {id}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

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

export const CertificationsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { playClick } = useSound();

  return (
    <SectionWrapper id="certifications" className="py-16 bg-background border-b-2 border-black">
      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={containerRef}>
        
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <span className="text-xs font-head font-bold uppercase tracking-wider bg-primary text-black border-2 border-black px-3 py-1 shadow-xs flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-black" />
              <span>VERIFIED ACCREDITATIONS</span>
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-head font-bold tracking-tight text-foreground uppercase select-none"
          >
            Certifications
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-foreground font-sans font-medium text-sm sm:text-base max-w-md mx-auto leading-relaxed"
          >
            Continuously advancing technical expertise through industry-recognized certifications and verified accreditations.
          </motion.p>
        </div>

        {/* Neobrutalism Hardware Enclosure with 3D Flip Badges */}
        <div className="relative max-w-4xl mx-auto border-2 border-black bg-card rounded-none overflow-hidden shadow-[6px_6px_0px_#000]">
          <div className="relative z-10 divide-y-2 divide-black">
            {certifications.map((cert, index) => {
              const isHovered = hoveredIdx === index;
              return (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  onMouseEnter={() => {
                    setHoveredIdx(index);
                    playClick(980, 0.02, 'sine');
                  }}
                  onMouseLeave={() => setHoveredIdx(null)}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className="p-4 sm:p-6 md:p-8 flex flex-col md:grid md:grid-cols-[1.25fr_2.5fr_1.25fr] gap-6 items-start hover:bg-muted/40 transition-colors duration-200"
                >
                  {/* Left: Issuer & Category */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-head font-bold tracking-wider text-foreground uppercase">
                      {cert.issuer}
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase bg-primary text-black px-1.5 py-0.5 border border-black inline-block w-fit">
                      {cert.category}
                    </span>
                  </div>

                  {/* Middle: Title & Description */}
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-head font-bold text-foreground uppercase leading-tight">
                      {cert.title}
                    </h3>
                    <p className="text-muted-foreground font-sans text-xs sm:text-sm leading-relaxed max-w-xl">
                      {cert.description}
                    </p>
                  </div>

                  {/* Right: 3D Credential Flip Badge */}
                  <div className="flex flex-wrap gap-1 md:justify-end w-full">
                    <CredentialFlipBadge
                      id={cert.credentialId}
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