import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { Terminal, Cpu, Server, Database, Code2, Layers, Check } from 'lucide-react';

interface TechCategory {
  title: string;
  description: string;
  icon: React.ElementType;
  primarySkills: string[];
  toolsAndFrameworks: string[];
}

const techCategories: TechCategory[] = [
  {
    title: 'Languages & Core Systems',
    description: 'Object-oriented programming, data structures, and algorithmic foundations.',
    icon: Code2,
    primarySkills: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'C++'],
    toolsAndFrameworks: ['System Design', 'Algorithms', 'Data Structures', 'REST APIs', 'AsyncIO'],
  },
  {
    title: 'AI, RAG & Machine Learning',
    description: 'Information retrieval, vector search indexing, and neural pipelines.',
    icon: Cpu,
    primarySkills: ['Hybrid RAG Systems', 'FAISS Vector Index', 'Reciprocal Rank Fusion (RRF)', 'LangChain'],
    toolsAndFrameworks: ['Scikit-learn', 'PyTorch / NLP', 'Cross-Encoder Re-ranking', 'Prompt Engineering', 'Vector Embeddings'],
  },
  {
    title: 'Cloud & Distributed Backend',
    description: 'Scalable cloud infrastructure, asynchronous workers, and containerization.',
    icon: Server,
    primarySkills: ['AWS (Certified Cloud Practitioner)', 'FastAPI', 'Docker', 'PostgreSQL', 'Redis'],
    toolsAndFrameworks: ['Celery Task Queues', 'AWS S3 & EC2', 'GitHub Actions CI/CD', 'Linux Administration', 'Microservices'],
  },
  {
    title: 'Data Engineering & Analytics',
    description: 'High-throughput ETL pipelines, database modeling, and analytical reporting.',
    icon: Database,
    primarySkills: ['ETL / ELT Pipelines', 'Data Modeling', 'PySpark', 'Power BI'],
    toolsAndFrameworks: ['Schema Design (Star/Snowflake)', 'Batch Processing', 'Query Optimization', 'Data Validation', 'DAX'],
  },
];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <SectionWrapper id="skills" className="py-10 sm:py-12 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/60 text-xs font-medium text-foreground mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>Technical Capabilities</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
          >
            Architecture & Tech Stack
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-muted-foreground text-base leading-relaxed"
          >
            A disciplined stack designed for high throughput, production reliability, and scalable machine intelligence.
          </motion.p>
        </div>

        {/* 4-Pillar Modern Bento Matrix */}
        <div className="grid md:grid-cols-2 gap-6">
          {techCategories.map((category, idx) => {
            const Icon = category.icon;
            const isHovered = activeCategory === category.title;

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                onMouseEnter={() => setActiveCategory(category.title)}
                onMouseLeave={() => setActiveCategory(null)}
                className={`p-1.5 rounded-[1.375rem] border transition-all duration-300 min-w-0 flex flex-col justify-between h-full ${
                  isHovered ? 'border-primary/50 shadow-md bg-muted/40' : 'border-border/80 shadow-2xs bg-muted/20'
                }`}
              >
                <div className="p-4 sm:p-5 lg:p-6 rounded-2xl border border-border/70 bg-card flex flex-col justify-between h-full min-w-0">
                <div className="min-w-0">
                  {/* Card Header */}
                  <div className="flex items-start gap-3 sm:gap-4 mb-4">
                    <div className="p-2 sm:p-2.5 rounded-xl border border-border bg-muted/60 text-primary shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-foreground">
                        {category.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Core Stack Highlights */}
                  <div className="space-y-3 pt-2">
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
                        Core Technologies
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {category.primarySkills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg border border-border bg-card text-foreground shadow-2xs leading-snug"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2 pt-2">
                        Tools & Methodologies
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {category.toolsAndFrameworks.map((item) => (
                          <span
                            key={item}
                            className="px-2.5 py-1 text-xs font-sans rounded-lg border border-border/70 bg-muted/40 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors leading-snug"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Engineering Philosophy Strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 p-5 sm:p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">Full Codebase Quality Commitment</div>
              <div className="text-xs text-muted-foreground">Every project includes automated CI/CD unit testing, reproducible Docker builds, and documentation.</div>
            </div>
          </div>
          <div className="font-mono text-xs text-muted-foreground shrink-0">
            Status: <span className="text-emerald-600 dark:text-emerald-400 font-medium">Production Verified</span>
          </div>
        </motion.div>

      </div>
    </SectionWrapper>
  );
};