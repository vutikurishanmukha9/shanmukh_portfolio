import { useState } from 'react';
import { Code, Database, Cloud, Brain, BarChart3, Cpu, Palette, Hammer, Shield, Layers, LineChart, PieChart } from 'lucide-react';
import { useSkillFilter } from '@/context/SkillFilterContext';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { cn } from '@/lib/utils';

const pipelineStages = [
  { id: 'ingest', label: 'Ingest', icon: Database },
  { id: 'process', label: 'Process', icon: Cpu },
  { id: 'store', label: 'Store', icon: Cloud },
  { id: 'analyze', label: 'Analyze', icon: Brain },
  { id: 'visualize', label: 'Visualize', icon: Palette },
];

const skillCategories = [
  {
    title: 'Programming',
    skills: ['Python', 'SQL', 'C', 'C++', 'Java', 'TypeScript', 'OOP'],
    icon: Code,
    stage: 'process',
  },
  {
    title: 'Cloud & DevOps',
    skills: ['AWS S3', 'AWS EC2', 'AWS RDS', 'AWS Lambda', 'Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD'],
    icon: Cloud,
    stage: 'store',
  },
  {
    title: 'Data & AI',
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'PySpark', 'NLP', 'Computer Vision', 'RAG Systems'],
    icon: Brain,
    stage: 'analyze',
  },
  {
    title: 'Data Engineering',
    skills: ['ETL/ELT Pipelines', 'Data Modeling', 'Data Validation', 'Batch Processing', 'Schema Design', 'Data Cleaning', 'Query Optimization'],
    icon: Layers,
    stage: 'ingest',
  },
  {
    title: 'Databases & Warehousing',
    skills: ['PostgreSQL', 'MySQL', 'Snowflake', 'Databricks', 'Star Schema', 'Snowflake Schema', 'Fact & Dimension Tables'],
    icon: Database,
    stage: 'store',
  },
  {
    title: 'Analytics',
    skills: ['EDA', 'Descriptive Statistics', 'Hypothesis Testing', 'Regression Analysis', 'Forecasting', 'Trend Analysis', 'Root Cause Analysis', 'KPI Reporting'],
    icon: LineChart,
    stage: 'analyze',
  },
  {
    title: 'Business Intelligence',
    skills: ['Power BI', 'DAX', 'KPI Dashboards', 'Amazon QuickSight', 'Excel', 'Pivot Tables', 'Power Query', 'VLOOKUP', 'XLOOKUP'],
    icon: PieChart,
    stage: 'visualize',
  },
  {
    title: 'Core Engineering',
    skills: ['System Design', 'Algorithms', 'Data Structures', 'IoT', 'Embedded Systems'],
    icon: Hammer,
    stage: 'ingest',
  },
  {
    title: 'Tools & Ecosystem',
    skills: ['Git', 'GitHub', 'Jupyter Notebook', 'Linux', 'Vite', 'Postman', 'Figma'],
    icon: Shield,
    stage: 'process',
  },
];

export const SkillsSection = () => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const { selectedSkill, setSelectedSkill } = useSkillFilter();

  const handleSkillClick = (skill: string) => {
    setSelectedSkill(selectedSkill === skill ? null : skill);
    if (selectedSkill !== skill) {
      setTimeout(() => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  const filteredCategories = selectedStage
    ? skillCategories.filter(cat => cat.stage === selectedStage)
    : skillCategories;

  return (
    <SectionWrapper id="skills" className="py-16 bg-background border-b-[0.5px] border-border/40">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border-[0.5px] border-border/80 shadow-none mb-4"
          >
            <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">Expertise</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-serif-display font-medium tracking-tight text-foreground select-none"
          >
            Technical Arsenal
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-muted-foreground text-sm max-w-xl mx-auto leading-relaxed"
          >
            Select a skill to filter projects. Clicking will dynamically highlight matching engineering outcomes.
          </motion.p>
        </div>

        {/* Cal.com Pill Filters */}
        <div className="flex justify-center mb-16 select-none">
          <div className="inline-flex p-1 bg-muted/65 border-[0.5px] border-border/60 rounded-full items-center relative flex-wrap gap-y-1 justify-center max-w-full">
            <button
              onClick={() => setSelectedStage(null)}
              className={cn(
                "relative px-4 py-1.5 text-[9px] font-mono tracking-widest uppercase transition-colors duration-200 z-10",
                selectedStage === null ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {selectedStage === null && (
                <motion.div
                  layoutId="skills-filter-pill"
                  className="absolute inset-0 rounded-full bg-card border-[0.5px] border-border/50 shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
                  transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.2 }}
                />
              )}
              <span className="relative z-20">All Categories</span>
            </button>
            {pipelineStages.map((stage) => {
              const isSelected = selectedStage === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStage(stage.id)}
                  className={cn(
                    "relative px-4 py-1.5 text-[9px] font-mono tracking-widest uppercase transition-colors duration-200 z-10",
                    isSelected ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="skills-filter-pill"
                      className="absolute inset-0 rounded-full bg-card border-[0.5px] border-border/50 shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
                      transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.2 }}
                    />
                  )}
                  <span className="relative z-20">{stage.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  key={category.title}
                  className="glass-panel p-6 hover-lift-minimal flex flex-col h-full justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3.5 mb-6 border-b-[0.5px] border-border/40 pb-4">
                      <div className="w-9 h-9 rounded bg-primary/5 border-[0.5px] border-primary/15 flex items-center justify-center">
                        <Icon className="w-4.5 h-4.5 text-primary" />
                      </div>
                      <h3 className="text-base font-serif-display font-medium text-foreground">{category.title}</h3>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {category.skills.map((skill) => {
                        const isSkillSelected = selectedSkill === skill;
                        return (
                          <button
                            key={skill}
                            onClick={() => handleSkillClick(skill)}
                            className={cn(
                              "px-3 py-1 rounded-md text-[10px] font-mono border transition-all duration-200",
                              isSkillSelected
                                ? "bg-primary/10 text-primary border-primary/30"
                                : "bg-background/40 text-muted-foreground border-border/40 hover:border-primary/20 hover:text-foreground"
                            )}
                          >
                            {skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </SectionWrapper>
  );
};