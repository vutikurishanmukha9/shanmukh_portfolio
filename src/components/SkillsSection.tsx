import { useState, useEffect } from 'react';
import { Code, Database, Cloud, Brain, BarChart3, Cpu, Palette, Hammer, Shield, Layers, LineChart, PieChart, Play, RotateCcw, Activity, Zap } from 'lucide-react';
import { useSkillFilter } from '@/context/SkillFilterContext';
import { useSound } from '@/hooks/useSound';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { BorderBeam } from '@/components/ui/BorderBeam';
import { SpotlightBorderCard } from '@/components/ui/SpotlightBorderCard';
import { cn } from '@/lib/utils';

const pipelineStages = [
  { id: 'ingest', label: '01 // Ingest', sub: 'ETL & Stream', icon: Database, delay: 0 },
  { id: 'process', label: '02 // Process', sub: 'Compute & Clean', icon: Cpu, delay: 0.2 },
  { id: 'store', label: '03 // Store', sub: 'Warehouse & DB', icon: Cloud, delay: 0.4 },
  { id: 'analyze', label: '04 // Analyze', sub: 'ML & Statistics', icon: Brain, delay: 0.6 },
  { id: 'visualize', label: '05 // Visualize', sub: 'BI & Delivery', icon: Palette, delay: 0.8 },
];

const skillCategories = [
  {
    title: 'Programming',
    skills: ['Python', 'SQL', 'OOP'],
    icon: Code,
    stage: 'process',
  },
  {
    title: 'Cloud & DevOps',
    skills: ['AWS S3', 'AWS EC2', 'AWS RDS', 'AWS Lambda', 'Docker', 'GitHub Actions', 'CI/CD'],
    icon: Cloud,
    stage: 'store',
  },
  {
    title: 'Data & AI',
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-learn', 'PySpark', 'NLP', 'Computer Vision', 'RAG Systems'],
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

const skillCounts: Record<string, number> = {
  Python: 6,
  SQL: 5,
  'AWS S3': 4,
  'AWS EC2': 3,
  'AWS RDS': 3,
  Docker: 4,
  Pandas: 4,
  'Scikit-learn': 3,
  PostgreSQL: 3,
  'ETL/ELT Pipelines': 4,
  'Data Modeling': 3,
  'System Design': 3,
  'Power BI': 2,
};

export const SkillsSection = () => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simActiveStageIndex, setSimActiveStageIndex] = useState<number | null>(null);
  const { selectedSkill, setSelectedSkill } = useSkillFilter();
  const { playFilter, playClick } = useSound();

  const handleSkillClick = (skill: string) => {
    playFilter();
    setSelectedSkill(selectedSkill === skill ? null : skill);
    if (selectedSkill !== skill) {
      setTimeout(() => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  const handleRunSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    playClick(1050, 0.05, 'triangle');
    
    // Step through each stage
    const stages = ['ingest', 'process', 'store', 'analyze', 'visualize'];
    stages.forEach((stage, idx) => {
      setTimeout(() => {
        setSimActiveStageIndex(idx);
        setSelectedStage(stage);
        playClick(800 + idx * 120, 0.03, 'sine');
      }, idx * 750);
    });

    setTimeout(() => {
      setIsSimulating(false);
      setSimActiveStageIndex(null);
      setSelectedStage(null);
      playClick(1400, 0.06, 'sine');
    }, stages.length * 750 + 400);
  };

  const activeHighlightedStage = isSimulating && simActiveStageIndex !== null 
    ? pipelineStages[simActiveStageIndex]?.id 
    : selectedStage;

  const filteredCategories = activeHighlightedStage
    ? skillCategories.filter(cat => cat.stage === activeHighlightedStage)
    : skillCategories;

  return (
    <SectionWrapper id="skills" className="py-16 bg-background border-b-[0.5px] border-border/40">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
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
            Select a skill or run the pipeline simulator to trace end-to-end data processing from extraction to production delivery.
          </motion.p>
        </div>

        {/* Interactive End-to-End Pipeline Bus Simulator */}
        <div className="max-w-5xl mx-auto mb-12 p-4 md:p-6 rounded-xl border-[0.5px] border-border/80 bg-card/40 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b-[0.5px] border-border/40">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-mono tracking-widest uppercase text-foreground font-semibold">
                End-to-End Systems Pipeline
              </span>
              <span className="text-[9px] font-mono text-muted-foreground hidden sm:inline">// 5 STAGE ACTIVE TRACE</span>
            </div>
            
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 shadow-sm active:scale-95",
                isSimulating
                  ? "bg-primary/20 text-primary border border-primary/40 cursor-wait animate-pulse"
                  : "bg-foreground text-background hover:bg-foreground/90"
              )}
            >
              {isSimulating ? (
                <>
                  <Activity className="w-3.5 h-3.5 animate-spin" />
                  <span>Tracing Pipeline...</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-current" />
                  <span>Simulate Pipeline Flow</span>
                </>
              )}
            </button>
          </div>

          {/* Interactive Pipeline Stages Map */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 relative">
            {pipelineStages.map((stage, i) => {
              const Icon = stage.icon;
              const isCurrent = activeHighlightedStage === stage.id;
              
              return (
                <button
                  key={stage.id}
                  onClick={() => {
                    if (isSimulating) return;
                    playClick(900 + i * 80, 0.02, 'sine');
                    setSelectedStage(selectedStage === stage.id ? null : stage.id);
                  }}
                  className={cn(
                    "group relative p-3.5 rounded-lg border text-left transition-all duration-200 flex flex-col justify-between min-h-[90px] overflow-hidden",
                    isCurrent
                      ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(204,120,92,0.15)] ring-1 ring-primary/40"
                      : "border-border/60 bg-background/50 hover:border-border hover:bg-background/80"
                  )}
                >
                  {/* Active traveling top progress line */}
                  {isCurrent && (
                    <motion.div
                      layoutId="active-stage-line"
                      className="absolute top-0 inset-x-0 h-0.5 bg-primary"
                      transition={{ duration: 0.2 }}
                    />
                  )}

                  <div className="flex items-center justify-between mb-2">
                    <Icon className={cn("w-4 h-4 transition-colors", isCurrent ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                    {isCurrent && (
                      <span className="text-[8px] font-mono font-bold text-primary px-1.5 py-0.5 rounded bg-primary/15 uppercase">
                        ACTIVE
                      </span>
                    )}
                  </div>

                  <div>
                    <div className={cn("text-xs font-mono font-semibold transition-colors", isCurrent ? "text-foreground" : "text-muted-foreground group-hover:text-foreground")}>
                      {stage.label}
                    </div>
                    <div className="text-[9px] font-mono text-muted-foreground/70 mt-0.5">
                      {stage.sub}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Reset / All Categories toggle */}
          {selectedStage && !isSimulating && (
            <div className="mt-4 pt-3 border-t-[0.5px] border-border/30 flex justify-end">
              <button
                onClick={() => setSelectedStage(null)}
                className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase text-muted-foreground hover:text-foreground tracking-wider transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Pipeline View
              </button>
            </div>
          )}
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
                  className="h-full"
                >
                  <SpotlightBorderCard
                    spotlightColor="rgba(204, 120, 92, 0.4)"
                    spotlightRadius={130}
                    className="h-full hover-lift-minimal"
                  >
                    <div className="p-6 flex flex-col h-full justify-between">
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
                            const count = skillCounts[skill];
                            return (
                              <motion.button
                                key={skill}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                onClick={() => handleSkillClick(skill)}
                                className={cn(
                                  "px-3 py-1 rounded-md text-[10px] font-mono border transition-all duration-200 flex items-center gap-1.5",
                                  isSkillSelected
                                    ? "bg-primary/10 text-primary border-primary/30 font-semibold"
                                    : "bg-background/40 text-muted-foreground border-border/40 hover:border-primary/20 hover:text-foreground"
                                )}
                              >
                                <span>{skill}</span>
                                {count && (
                                  <span className="text-[8px] opacity-70 px-1 py-0.2 bg-muted/60 rounded border-[0.5px] border-border/40">
                                    {count}
                                  </span>
                                )}
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </SpotlightBorderCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </SectionWrapper>
  );
};