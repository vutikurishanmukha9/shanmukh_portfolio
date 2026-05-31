import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  Github,
  ArrowUpRight,
  TrendingUp,
  Database,
  Layers3,
  CheckCircle2,
  Terminal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── Case Study Data ──────────────────────────────────────────────────

type CaseStudy = {
  id: string;
  title: string;
  subtitle: string;
  focus: string;
  ownership: string;
  github: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  tabs: {
    bottleneck: string;
    decision: string;
    outcome: string;
  };
  previewType: 'unicorn' | 'adidas' | 'sales';
};

const caseStudies: CaseStudy[] = [
  {
    id: 'unicorn',
    title: 'Global Unicorn Startup Analysis',
    subtitle: 'Power BI deep-dive mapping 1,074 unicorn startups across 6 continents and 16 industries to uncover valuation divergence, funding efficiency gaps, and investor concentration patterns.',
    focus: 'Business Intelligence',
    ownership: 'Solo Build',
    github: 'https://github.com/vutikurishanmukha9/Global-Unicorn-Startup-Analysis',
    tech: ['Power BI', 'SQL', 'Data Modeling', 'DAX', 'ETL'],
    metrics: [
      { label: 'Companies', value: '1,074' },
      { label: 'N. America Share', value: '54.8%' },
      { label: 'Avg Valuation', value: '$3.48B' },
      { label: 'Industries', value: '16' },
    ],
    tabs: {
      bottleneck: 'The global startup ecosystem crossed 1,000 unicorns, but the distribution of value, funding efficiency, and time-to-unicorn across geographies and industries was poorly understood.',
      decision: 'Built a star-schema data model in Power BI with DAX measures to segment unicorns by continent, industry, and funding stage. Applied ETL pipelines to normalize investor and valuation data across 6 continents.',
      outcome: 'Revealed that North America holds 54.8% of all unicorns yet Asia leads in median time-to-unicorn (5.8 years), exposing a structural capital-efficiency gap. Fintech dominates at 18.2% of the total count.',
    },
    previewType: 'unicorn',
  },
  {
    id: 'adidas',
    title: 'Adidas US Retail Sales Analysis',
    subtitle: 'Highly rigorous exploratory data analysis solving 15 structured business questions with spike anomaly detection, YoY growth tracking, and operating margin breakdowns.',
    focus: 'Exploratory Data Analysis',
    ownership: 'Solo Build',
    github: 'https://github.com/vutikurishanmukha9/Adidas-US-Sales-Analysis',
    tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
    metrics: [
      { label: 'Online Margin', value: '46.4%' },
      { label: 'In-Store Margin', value: '35.6%' },
      { label: 'Questions Solved', value: '15' },
      { label: 'Spike Anomalies', value: 'Detected' },
    ],
    tabs: {
      bottleneck: 'Adidas lacked a unified analytical view of how sales channels, product categories, and regional markets compare on profitability and growth trends across their US retail footprint.',
      decision: 'Structured 15 precise business questions covering revenue splits, margin comparison, anomaly detection on daily sales spikes, and YoY growth. Used Pandas + NumPy for statistical computation and Seaborn for visualization.',
      outcome: 'Online sales deliver 46.4% operating margin vs. 35.6% in-store. Identified daily sales spikes exceeding 2 standard deviations as anomalies. West region outperforms at 30% revenue share.',
    },
    previewType: 'adidas',
  },
  {
    id: 'sales',
    title: 'Complete Sales Report',
    subtitle: 'Comprehensive Power BI retail transaction dashboard analyzing 3 years of temporal sales trends, shipment mode distributions, and product category performance.',
    focus: 'Retail Dashboard',
    ownership: 'Solo Build',
    github: 'https://github.com/vutikurishanmukha9/Complete-Sales-Report',
    tech: ['Power BI', 'DAX', 'Excel', 'ETL', 'Data Modeling'],
    metrics: [
      { label: 'Time Span', value: '3 Years' },
      { label: 'Ship Modes', value: '4 Tracked' },
      { label: 'Categories', value: '3 Segments' },
      { label: 'Regions', value: '4 Mapped' },
    ],
    tabs: {
      bottleneck: 'Retail leadership needed a single-pane dashboard to monitor how sales volume distributes across time periods, shipping methods, and product categories without querying raw transaction logs.',
      decision: 'Modeled a star-schema warehouse in Power BI connecting fact tables (transactions) to dimension tables (dates, products, regions, ship modes). Built DAX time-intelligence measures for MoM and YoY comparison.',
      outcome: 'Standard Class shipping accounts for 60% of all orders. Technology category drives the highest revenue. Q4 consistently shows 35% seasonal uplift across all three years tracked.',
    },
    previewType: 'sales',
  },
];

// ─── Preview Panels ───────────────────────────────────────────────────

const UnicornPreview = () => (
  <div className="flex flex-col justify-between h-full font-mono text-[9px] text-muted-foreground">
    <div className="flex items-center justify-between border-b-[0.5px] border-border/60 pb-2">
      <span className="font-semibold text-foreground">UNICORN_CONTINENT_DISTRIBUTION</span>
      <span className="text-amber-500 font-semibold text-[8px]">1,074 CO.</span>
    </div>
    <div className="my-2 space-y-1.5">
      {[
        { region: 'N. America', pct: 54.8, color: 'bg-primary' },
        { region: 'Asia', pct: 28.9, color: 'bg-amber-500' },
        { region: 'Europe', pct: 11.4, color: 'bg-sky-500' },
        { region: 'Other', pct: 4.9, color: 'bg-muted-foreground/50' },
      ].map((d) => (
        <div key={d.region} className="flex items-center gap-2">
          <span className="w-16 text-[8px] text-right opacity-80 shrink-0">{d.region}</span>
          <div className="flex-1 h-2.5 bg-background/60 border-[0.5px] border-border/30 rounded-sm overflow-hidden">
            <div className={cn('h-full rounded-sm', d.color)} style={{ width: `${d.pct}%` }} />
          </div>
          <span className="w-10 text-[8px] text-foreground font-semibold tabular-nums">{d.pct}%</span>
        </div>
      ))}
    </div>
    <div className="border-t-[0.5px] border-border/60 pt-2 flex justify-between items-center">
      <div className="flex gap-3 text-[8px] opacity-70">
        <span>AVG_VAL: <span className="text-foreground font-semibold">$3.48B</span></span>
        <span>MEDIAN: <span className="text-foreground font-semibold">$2.0B</span></span>
      </div>
      <span className="text-[7px] opacity-50">POWER_BI // DAX</span>
    </div>
  </div>
);

const AdidasPreview = () => (
  <div className="flex flex-col justify-between h-full font-mono text-[9px] text-muted-foreground">
    <div className="flex items-center justify-between border-b-[0.5px] border-border/60 pb-2">
      <span className="font-semibold text-foreground">MARGIN_COMPARISON_ENGINE</span>
      <span className="text-emerald-500 font-semibold text-[8px]">15 Q&A</span>
    </div>
    <div className="my-2 space-y-2">
      {[
        { channel: 'Online', margin: 46.4, color: 'bg-emerald-500' },
        { channel: 'In-Store', margin: 35.6, color: 'bg-primary' },
        { channel: 'Outlet', margin: 28.1, color: 'bg-muted-foreground/50' },
      ].map((d) => (
        <div key={d.channel} className="space-y-0.5">
          <div className="flex justify-between text-[8px]">
            <span className="opacity-80">{d.channel}</span>
            <span className="text-foreground font-semibold">{d.margin}%</span>
          </div>
          <div className="h-2 bg-background/60 border-[0.5px] border-border/30 rounded-sm overflow-hidden">
            <div className={cn('h-full rounded-sm', d.color)} style={{ width: `${d.margin * 2}%` }} />
          </div>
        </div>
      ))}
    </div>
    <div className="border-t-[0.5px] border-border/60 pt-2 flex justify-between items-center text-[8px]">
      <span className="opacity-70">ANOMALY_DETECT: <span className="text-amber-500 font-semibold">2σ SPIKES</span></span>
      <span className="opacity-50">PANDAS // SEABORN</span>
    </div>
  </div>
);

const SalesPreview = () => (
  <div className="flex flex-col justify-between h-full font-mono text-[9px] text-muted-foreground">
    <div className="flex items-center justify-between border-b-[0.5px] border-border/60 pb-2">
      <span className="font-semibold text-foreground">RETAIL_QUARTERLY_TRENDS</span>
      <span className="text-sky-500 font-semibold text-[8px]">3-YR SPAN</span>
    </div>
    <div className="my-2 flex items-end justify-between h-14 px-1 relative">
      {/* Grid lines */}
      <div className="absolute inset-0 grid grid-rows-3 pointer-events-none opacity-[0.06]">
        <div className="border-b border-foreground" />
        <div className="border-b border-foreground" />
        <div className="border-b border-foreground" />
      </div>
      {/* Quarterly bars */}
      {[
        { q: 'Q1', h: '30%', c: 'bg-muted-foreground/30' },
        { q: 'Q2', h: '45%', c: 'bg-muted-foreground/40' },
        { q: 'Q3', h: '55%', c: 'bg-sky-500/60' },
        { q: 'Q4', h: '90%', c: 'bg-primary' },
        { q: 'Q1', h: '35%', c: 'bg-muted-foreground/30' },
        { q: 'Q2', h: '50%', c: 'bg-muted-foreground/40' },
        { q: 'Q3', h: '60%', c: 'bg-sky-500/60' },
        { q: 'Q4', h: '95%', c: 'bg-primary' },
      ].map((bar, i) => (
        <div key={i} className="flex flex-col items-center gap-0.5 flex-1">
          <div
            className={cn('w-full max-w-[14px] rounded-t-sm border-[0.5px] border-border/40', bar.c)}
            style={{ height: bar.h }}
          />
          <span className="text-[6px] opacity-50">{bar.q}</span>
        </div>
      ))}
    </div>
    <div className="border-t-[0.5px] border-border/60 pt-2 flex justify-between items-center text-[8px]">
      <span className="opacity-70">Q4_UPLIFT: <span className="text-foreground font-semibold">+35%</span></span>
      <span className="opacity-50">POWER_BI // DAX</span>
    </div>
  </div>
);

const previewComponents: Record<CaseStudy['previewType'], React.ReactNode> = {
  unicorn: <UnicornPreview />,
  adidas: <AdidasPreview />,
  sales: <SalesPreview />,
};

// ─── Case Study Card ──────────────────────────────────────────────────

type TabKey = 'bottleneck' | 'decision' | 'outcome';
const tabLabels: { key: TabKey; label: string }[] = [
  { key: 'bottleneck', label: 'Problem' },
  { key: 'decision', label: 'Approach' },
  { key: 'outcome', label: 'Outcome' },
];

const CaseStudyCard = ({ study, index }: { study: CaseStudy; index: number }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('bottleneck');

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group border-[0.5px] border-border/80 bg-card/45 backdrop-blur-md rounded-lg overflow-hidden hover-lift-minimal"
    >
      {/* Top: Preview + Content side-by-side on lg */}
      <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-0">
        {/* Preview Panel */}
        <div className="border-b-[0.5px] lg:border-b-0 lg:border-r-[0.5px] border-border/60 p-5 flex flex-col justify-between min-h-[220px]">
          {previewComponents[study.previewType]}
        </div>

        {/* Content Panel */}
        <div className="p-5 flex flex-col justify-between">
          {/* Header */}
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded border-[0.5px] border-border bg-background text-[9px] font-mono uppercase tracking-wider text-muted-foreground">
                <BarChart3 className="h-3 w-3 text-amber-500" />
                {study.focus}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded border-[0.5px] border-emerald-500/20 bg-emerald-500/5 text-[9px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
                <CheckCircle2 className="h-3 w-3" />
                {study.ownership}
              </span>
            </div>

            <h3 className="font-serif-display text-xl md:text-2xl font-medium tracking-tight text-foreground mb-2">
              {study.title}
            </h3>
            <p className="text-muted-foreground text-xs leading-relaxed mb-4">
              {study.subtitle}
            </p>
          </div>

          {/* Tabbed Narrative */}
          <div className="mb-4">
            <div className="flex gap-0.5 mb-3 border-[0.5px] border-border/60 bg-muted/40 rounded-full p-0.5 w-fit">
              {tabLabels.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={cn(
                      'relative px-3 py-1 text-[9px] font-mono tracking-widest uppercase transition-colors duration-200 z-10',
                      isActive ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId={`case-tab-${study.id}`}
                        className="absolute inset-0 rounded-full bg-card border-[0.5px] border-border/60 shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
                        transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.2 }}
                      />
                    )}
                    <span className="relative z-20">{tab.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="bg-muted/10 border-[0.5px] border-border/60 rounded-lg p-3.5 min-h-[72px]">
              <p className="text-xs leading-relaxed text-muted-foreground">{study.tabs[activeTab]}</p>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-4">
            {study.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded border-[0.5px] border-border/80 bg-background/50 px-2 py-2 text-center"
              >
                <div className="text-[10px] font-mono font-semibold text-foreground tabular-nums">{m.value}</div>
                <div className="text-[8px] font-mono uppercase tracking-wider text-muted-foreground mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Tech + Links */}
          <div className="border-t-[0.5px] border-border/60 pt-4 flex flex-col gap-3">
            <div>
              <h4 className="mb-2 flex items-center gap-1 text-[9px] font-mono uppercase tracking-widest text-muted-foreground/80">
                <Terminal className="h-2.5 w-2.5" />
                Primary Stack
              </h4>
              <div className="flex flex-wrap gap-1">
                {study.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded px-2 py-0.5 border border-border/80 bg-background text-[10px] font-mono text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full h-8 px-4 text-[10px] font-mono uppercase tracking-wider bg-background"
                asChild
              >
                <a href={study.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-3.5 w-3.5 mr-1" />
                  View Code
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

// ─── Section ──────────────────────────────────────────────────────────

export const CaseStudiesSection = () => {
  return (
    <SectionWrapper id="case-studies" className="relative overflow-hidden bg-background py-24 border-b-[0.5px] border-border/40">
      <div className="container relative z-10 mx-auto px-4 lg:px-8">

        {/* Section Header */}
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border-[0.5px] border-border/80 bg-card px-3 py-1 shadow-none"
            >
              <Database className="h-3 w-3 text-amber-500" />
              <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">Data Analysis</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="font-serif-display text-4xl font-normal tracking-tight text-foreground md:text-5xl select-none"
            >
              Case Studies
            </motion.h2>
            <p className="mt-4 max-w-xl text-muted-foreground text-sm leading-relaxed">
              Deep-dive analyses on real-world datasets — structured problem solving, statistical rigor, and actionable business intelligence.
            </p>
          </div>

          {/* Summary Stats */}
          <div className="border-[0.5px] border-border/85 bg-card/60 backdrop-blur-md p-4 rounded-lg shadow-none">
            <div className="grid grid-cols-3 gap-6 text-center divide-x divide-border/60">
              <div className="px-3">
                <div className="text-xl font-serif-display text-foreground font-normal">3</div>
                <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">Studies</div>
              </div>
              <div className="px-3">
                <div className="text-xl font-serif-display text-foreground font-normal">
                  <TrendingUp className="h-5 w-5 inline-block text-primary" />
                </div>
                <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">BI + EDA</div>
              </div>
              <div className="px-3">
                <div className="text-xl font-serif-display text-foreground font-normal">2</div>
                <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">Tools</div>
              </div>
            </div>
          </div>
        </div>

        {/* Case Study Cards */}
        <div className="space-y-6">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.id} study={study} index={i} />
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
};
