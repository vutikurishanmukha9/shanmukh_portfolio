import { useState } from 'react';
import { Code, Database, Cloud, Brain, Cpu, Palette, Hammer, Shield, Layers, LineChart, PieChart, Play, RotateCcw, Activity } from 'lucide-react';
import { useSkillFilter } from '@/context/SkillFilterContext';
import { useSound } from '@/hooks/useSound';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
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

const skillCounts = {
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
} satisfies Record<string, number>;

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
    <SectionWrapper id="skills" className="py-16 bg-background border-b-2 border-black">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 border-2 border-black bg-primary text-black font-head text-xs font-bold uppercase shadow-xs mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
            <span>Technical Arsenal</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-head font-bold tracking-tight text-foreground uppercase select-none"
          >
            Engineered Skills
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-foreground text-sm font-medium max-w-xl mx-auto leading-relaxed"
          >
            Select a skill or run the pipeline simulator to trace end-to-end data processing from extraction to production delivery.
          </motion.p>
        </div>

        {/* Interactive End-to-End Pipeline Bus Simulator */}
        <div className="relative max-w-5xl mx-auto mb-12 p-4 md:p-6 rounded-none border-2 border-black bg-card shadow-[6px_6px_0px_#000] overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-black">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary border border-black animate-pulse" />
              <span className="text-xs font-head tracking-wider uppercase text-foreground font-bold">
                End-to-End Systems Pipeline
              </span>
              <span className="text-[10px] font-mono text-muted-foreground font-semibold hidden sm:inline">// 5 STAGE ACTIVE TRACE</span>
            </div>
            
            <button
              type="button"
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className={cn(
                "w-full sm:w-auto justify-center inline-flex items-center gap-2 px-4 py-2 border-2 border-black font-head text-xs uppercase tracking-wider transition-all shadow-xs active:translate-x-0.5 active:translate-y-0.5 cursor-pointer",
                isSimulating
                  ? "bg-primary text-black animate-pulse"
                  : "bg-primary text-black hover:bg-primary-hover"
              )}
            >
              {isSimulating ? (
                <>
                  <Activity className="w-3.5 h-3.5 animate-spin" />
                  <span>Tracing Pipeline...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Simulate Pipeline Flow</span>
                </>
              )}
            </button>
          </div>

          {/* Interactive Pipeline Stages Map */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 relative">
            {pipelineStages.map((stage, i) => {
              const Icon = stage.icon;
              const isCurrent = activeHighlightedStage === stage.id;
              
              return (
                <button
                  type="button"
                  key={stage.id}
                  onClick={() => {
                    if (isSimulating) return;
                    playClick(900 + i * 80, 0.02, 'sine');
                    setSelectedStage(selectedStage === stage.id ? null : stage.id);
                  }}
                  className={cn(
                    "group relative p-3 sm:p-3.5 rounded-none border-2 border-black text-left transition-all duration-150 flex flex-col justify-between min-h-[85px] sm:min-h-[90px] shadow-xs cursor-pointer active:translate-x-0.5 active:translate-y-0.5",
                    i === 4 && "col-span-2 sm:col-span-1",
                    isCurrent
                      ? "bg-primary text-black shadow-none font-bold"
                      : "bg-muted/40 hover:bg-primary/20 text-foreground"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-4 h-4 text-black stroke-[2.2]" />
                    {isCurrent && (
                      <span className="text-[9px] font-head font-bold text-black px-1.5 py-0.2 bg-white border border-black uppercase shadow-none">
                        ACTIVE
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="text-xs font-head font-bold uppercase">
                      {stage.label}
                    </div>
                    <div className="text-[10px] font-mono text-muted-foreground font-semibold mt-0.5">
                      {stage.sub}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Reset / All Categories toggle */}
          {selectedStage && !isSimulating && (
            <div className="mt-4 pt-3 border-t-2 border-black flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedStage(null)}
                className="inline-flex items-center gap-1.5 text-xs font-head uppercase text-foreground hover:text-black font-bold tracking-wider transition-colors cursor-pointer bg-primary/20 hover:bg-primary px-2.5 py-1 border border-black"
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
            {filteredCategories.map((category) => {
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
                  <div className="h-full border-2 border-black bg-card rounded-none shadow-[4px_4px_0px_#000] p-4 sm:p-6 flex flex-col justify-between hover:shadow-[6px_6px_0px_#000] transition-shadow duration-200">
                    <div>
                      <div className="flex items-center gap-3 mb-5 border-b-2 border-black pb-3">
                        <div className="w-9 h-9 rounded-none bg-primary border-2 border-black flex items-center justify-center shadow-xs">
                          <Icon className="w-4.5 h-4.5 text-black stroke-[2.2]" />
                        </div>
                        <h3 className="text-sm font-head font-bold uppercase tracking-wide text-foreground">{category.title}</h3>
                      </div>

                      <div className="flex flex-wrap gap-2">
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
                                "px-2.5 py-1 rounded-none text-xs font-head font-medium border-2 border-black transition-all flex items-center gap-1.5 cursor-pointer shadow-xs",
                                isSkillSelected
                                  ? "bg-primary text-black font-bold shadow-none"
                                  : "bg-muted/40 text-foreground hover:bg-primary/20 hover:text-black"
                              )}
                            >
                              <span>{skill}</span>
                              {count > 0 ? (
                                <span className="text-[9px] font-mono font-bold px-1 bg-black text-white border border-black">
                                  {count}
                                </span>
                              ) : null}
                            </motion.button>
                          );
                        })}
                      </div>
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