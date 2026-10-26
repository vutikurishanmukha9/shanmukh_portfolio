import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  Github,
  ArrowUpRight,
  TrendingUp,
  Terminal,
  Split,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataDiffSlider } from '@/components/ui/DataDiffSlider';

type CaseStudy = {
  id: string;
  title: string;
  subtitle: string;
  focus: string;
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
    title: 'Global Unicorn Startup Performance Analysis',
    subtitle: 'Power BI deep-dive mapping 1,074 unicorn companies across 6 continents and 16 industries, representing $3,711B in total valuation and $591.8B total funding raised. Uncovered the 2021 explosion (48.4% of all unicorns created in a single year), geographic capital-efficiency gaps, and sector concentration risk in Fintech.',
    focus: 'Business Intelligence / EDA',
    github: 'https://github.com/vutikurishanmukha9/Global-Unicorn-Startup',
    tech: ['Power BI', 'Power Query', 'DAX', 'Star Schema', 'ETL', 'Data Modeling'],
    metrics: [
      { label: 'Companies', value: '1,074' },
      { label: 'Total Valuation', value: '$3,711B' },
      { label: '2021 Surge', value: '48.4% (520)' },
      { label: 'Time to $1B', value: '7.0 Years' },
      { label: 'Total Funding', value: '$591.8B' },
      { label: 'Top Sector', value: 'Fintech (224)' },
    ],
    tabs: {
      bottleneck: 'The global startup ecosystem crossed 1,000 unicorns, but the structural distribution of value, funding efficiency, and time-to-unicorn across geographies and industries remained poorly understood. 520 of 1,074 unicorns (48.4%) were created in 2021 alone, representing a 5x increase over 2018-2019 baselines, and raising questions about whether this was structural or cyclical.',
      decision: 'Built a star-schema data model in Power BI with separate Funding and Investors dimension tables. Engineered DAX measures for valuation/funding efficiency ratios, average years-to-unicorn by sector, and investor count aggregations. Used Power Query ETL to clean valuation strings, parse date fields, and compute "Years to Unicorn" calculated columns across 6 continents.',
      outcome: 'North America holds 589 companies (54.8%) and $2,032B in valuation, but Asia\'s startups require 25% more funding ($632M avg vs $504M) for similar outcomes. AI has the highest avg valuation at $4.49B but lower capital efficiency (4.88x) than Fintech (6.15x). Fastest unicorns reached $1B in under 12 months. SHEIN achieved 50x return on capital ($2B raised → $100B valuation).',
    },
    previewType: 'unicorn',
  },
  {
    id: 'adidas',
    title: 'Adidas US Retail Sales Analysis',
    subtitle: 'Exploratory data analysis solving 15 structured business questions with spike anomaly detection, YoY growth tracking, and operating margin breakdowns.',
    focus: 'Exploratory Data Analysis',
    github: 'https://github.com/vutikurishanmukha9/Adidas_US_Sales',
    tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
    metrics: [
      { label: 'Total Revenue', value: '$899.9M' },
      { label: 'Operating Profit', value: '$332.1M' },
      { label: 'Online Margin', value: '46.4%' },
      { label: 'In-Store Margin', value: '35.6%' },
      { label: 'Overall Margin', value: '36.9%' },
      { label: 'YoY Growth', value: '+294.2%' },
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
    title: 'HR Employee Retention & Workforce Optimization',
    subtitle: 'Rigorous workforce analysis and exploratory data modeling diagnosing systemic early-lifecycle attrition failures, performance rating paradoxes, and leadership stability risks across 3,000 employee records.',
    focus: 'HR Analytics / EDA',
    github: 'https://github.com/vutikurishanmukha9/Employee_Data_Analysis',
    tech: ['Python', 'Pandas', 'NumPy', 'Seaborn', 'Data Modeling'],
    metrics: [
      { label: 'Workforce Size', value: '3,000 FTEs' },
      { label: 'Overall Exit Rate', value: '51.1%' },
      { label: 'Mapped Exits', value: '1,533 Staff' },
      { label: '1st Yr Exits', value: '47.3%' },
      { label: 'High Risk Role', value: 'Eng Manager' },
      { label: 'Exec Churn', value: '79.2%' },
    ],
    tabs: {
      bottleneck: 'HR leadership faced severe employee churn, losing over half of the workforce (51.1%) over the tracking period, with no visibility into early-career exits, performance linkages, or role-specific talent drain.',
      decision: 'Ingested 3,000 employee records to construct normalized tenure spans, exited indicators, and age cohorts. Coded dynamic seaborn visualization functions and programmatic cell manipulation layers in Python.',
      outcome: 'Isolated a critical year-one failure point (47.3% of exits). Exposed a major performance paradox where high performers leave at the same rate as PIP employees (52%), and discovered a 79.2% Executive Office turnover.',
    },
    previewType: 'sales',
  },
];

const UnicornPreview = () => (
  <div className="flex flex-col justify-between h-full font-mono text-[10px] text-muted-foreground p-3">
    <div className="flex items-center justify-between border-b border-border/80 pb-2">
      <span className="font-semibold text-foreground">Global Unicorn Distribution</span>
      <span className="text-primary font-semibold">$3,711B Val</span>
    </div>
    <div className="my-3 space-y-1.5">
      {[
        { region: 'N. America', count: 589, pct: 54.8, color: 'bg-foreground' },
        { region: 'Asia', count: 310, pct: 28.9, color: 'bg-primary' },
        { region: 'Europe', count: 143, pct: 13.3, color: 'bg-emerald-500' },
        { region: 'Other', count: 32, pct: 3.0, color: 'bg-muted-foreground/40' },
      ].map((d) => (
        <div key={d.region} className="flex items-center gap-2">
          <span className="w-16 text-[9px] text-right opacity-80 shrink-0">{d.region}</span>
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div className={cn('h-full rounded-full', d.color)} style={{ width: `${d.pct}%` }} />
          </div>
          <span className="w-16 text-[9px] text-foreground font-semibold tabular-nums">{d.count} ({d.pct}%)</span>
        </div>
      ))}
    </div>
    <div className="border border-border/80 bg-muted/40 rounded-xl px-2.5 py-1.5 my-1">
      <div className="flex justify-between items-center text-[9px]">
        <span className="text-primary font-semibold">2021 Capital Surge</span>
        <span className="text-foreground font-bold">520 / 1,074 (48.4%)</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden mt-1">
        <div className="h-full rounded-full bg-primary" style={{ width: '48.4%' }} />
      </div>
    </div>
    <div className="border-t border-border/80 pt-2 flex justify-between items-center text-[9px]">
      <span>Funding: <strong className="text-foreground">$591.8B</strong></span>
      <span>Star Schema · DAX</span>
    </div>
  </div>
);

const AdidasPreview = () => (
  <div className="flex flex-col justify-between h-full font-mono text-[10px] text-muted-foreground p-3">
    <div className="flex items-center justify-between border-b border-border/80 pb-2">
      <span className="font-semibold text-foreground">Channel Margin Performance</span>
      <span className="text-emerald-500 font-semibold">15 Questions</span>
    </div>
    <div className="my-3 space-y-2.5">
      {[
        { channel: 'Online Store', margin: 46.4, color: 'bg-emerald-500' },
        { channel: 'In-Store Retail', margin: 35.6, color: 'bg-primary' },
        { channel: 'Outlet Network', margin: 39.5, color: 'bg-muted-foreground/50' },
      ].map((d) => (
        <div key={d.channel} className="space-y-1">
          <div className="flex justify-between text-[9px]">
            <span className="opacity-80">{d.channel}</span>
            <span className="text-foreground font-semibold">{d.margin}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className={cn('h-full rounded-full', d.color)} style={{ width: `${d.margin * 2}%` }} />
          </div>
        </div>
      ))}
    </div>
    <div className="border-t border-border/80 pt-2 flex justify-between items-center text-[9px]">
      <span>Anomaly Detection: <strong className="text-primary">2σ Spikes</strong></span>
      <span>Pandas · Seaborn</span>
    </div>
  </div>
);

const SalesPreview = () => (
  <div className="flex flex-col justify-between h-full font-mono text-[10px] text-muted-foreground p-3">
    <div className="flex items-center justify-between border-b border-border/80 pb-2">
      <span className="font-semibold text-foreground">Attrition by Tenure Year</span>
      <span className="text-primary font-semibold">3,000 FTE</span>
    </div>
    <div className="my-3 flex items-end justify-between h-20 px-2 relative">
      {[
        { t: 'Y1', h: '85%', c: 'bg-primary' },
        { t: 'Y2', h: '65%', c: 'bg-primary/80' },
        { t: 'Y3', h: '45%', c: 'bg-foreground/80' },
        { t: 'Y4', h: '32%', c: 'bg-foreground/60' },
        { t: 'Y5', h: '22%', c: 'bg-emerald-500/80' },
        { t: 'Y6', h: '16%', c: 'bg-emerald-500/60' },
        { t: 'Y7', h: '10%', c: 'bg-emerald-500/40' },
        { t: 'Y8', h: '6%', c: 'bg-emerald-500/20' },
      ].map((bar) => (
        <div key={bar.t} className="flex flex-col items-center justify-end h-full gap-1 flex-1">
          <div
            className={cn('w-full max-w-[12px] rounded-t-sm transition-all', bar.c)}
            style={{ height: bar.h }}
          />
          <span className="text-[7px] text-muted-foreground font-semibold">{bar.t}</span>
        </div>
      ))}
    </div>
    <div className="border-t border-border/80 pt-2 flex justify-between items-center text-[9px]">
      <span>Early Exit Rate: <strong className="text-foreground">47.3% (Year 1)</strong></span>
      <span>Python EDA</span>
    </div>
  </div>
);

const previewComponents = {
  unicorn: <UnicornPreview />,
  adidas: <AdidasPreview />,
  sales: <SalesPreview />,
} satisfies Record<CaseStudy['previewType'], React.ReactNode>;

type TabKey = 'bottleneck' | 'decision' | 'outcome';
const tabLabels: { key: TabKey; label: string }[] = [
  { key: 'bottleneck', label: 'Problem' },
  { key: 'decision', label: 'Approach' },
  { key: 'outcome', label: 'Outcome' },
];

const CaseStudyCard = ({ study, index }: { study: CaseStudy; index: number }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('bottleneck');
  const [viewMode, setViewMode] = useState<'dashboard' | 'diff'>('dashboard');

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="p-1.5 rounded-[1.375rem] border border-border/80 bg-muted/20 shadow-xs hover:border-primary/40 hover:shadow-md transition-all duration-300"
    >
      <div className="rounded-2xl border border-border/70 bg-card overflow-hidden shadow-xs">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-0">
        
        {/* Left Preview Panel */}
        <div className="border-b lg:border-b-0 lg:border-r border-border p-5 sm:p-6 flex flex-col justify-between bg-muted/20">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/80">
            <span className="text-xs font-mono font-semibold text-foreground">Interactive Metrics</span>
            <div className="flex rounded-lg border border-border bg-card p-0.5">
              <button
                type="button"
                onClick={() => setViewMode('dashboard')}
                className={cn(
                  "px-2.5 py-1 text-xs font-medium rounded-md transition-colors",
                  viewMode === 'dashboard' ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Telemetry
              </button>
              <button
                type="button"
                onClick={() => setViewMode('diff')}
                className={cn(
                  "px-2.5 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1",
                  viewMode === 'diff' ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Split className="w-3 h-3" />
                Data Diff
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            {viewMode === 'dashboard' ? (
              <div className="w-full">
                {previewComponents[study.previewType]}
              </div>
            ) : (
              <div className="w-full">
                <DataDiffSlider caseStudyId={study.previewType} />
              </div>
            )}
          </div>
        </div>

        {/* Right Content Panel */}
        <div className="p-5 sm:p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="mb-2.5 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border border-border bg-muted/60 text-foreground whitespace-nowrap shrink-0">
                <BarChart3 className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>{study.focus}</span>
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {study.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mt-1.5">
              {study.subtitle}
            </p>
          </div>

          {/* Narrative Tabs */}
          <div className="space-y-2">
            <div className="flex gap-1 p-0.5 rounded-lg border border-border bg-muted/40 w-fit">
              {tabLabels.map((tab) => (
                <button
                  type="button"
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    'px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap',
                    activeTab === tab.key ? 'bg-card text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="p-3.5 rounded-xl border border-border/80 bg-muted/20 min-h-[70px]">
              <p className="text-xs sm:text-sm leading-relaxed text-foreground">{study.tabs[activeTab]}</p>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {study.metrics.map((m) => (
              <div key={m.label} className="p-2 rounded-xl border border-border bg-card/60 text-center flex flex-col justify-center min-h-[58px] shadow-2xs">
                <div className="text-xs font-bold text-foreground tabular-nums whitespace-nowrap overflow-hidden text-ellipsis">{m.value}</div>
                <div className="text-[10px] text-muted-foreground font-medium mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Footer Stack & Code Link */}
          <div className="border-t border-border pt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {study.tech.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-muted/60 text-foreground border border-border/60">
                  {t}
                </span>
              ))}
            </div>

            <a
              href={study.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center gap-2 pl-3.5 pr-1.5 py-1 text-xs font-medium rounded-full border border-border bg-card hover:bg-muted text-foreground transition-all shadow-2xs"
            >
              <Github className="w-3.5 h-3.5 text-muted-foreground group-hover/btn:text-foreground" />
              <span>Inspect Repository</span>
              <span className="w-5 h-5 rounded-full bg-muted border border-border/80 flex items-center justify-center transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 shrink-0">
                <ArrowUpRight className="h-3 w-3 text-muted-foreground group-hover/btn:text-foreground" />
              </span>
            </a>
          </div>

        </div>

      </div>
      </div>
    </motion.article>
  );
};

export const CaseStudiesSection = () => {
  return (
    <SectionWrapper id="case-studies" className="py-10 sm:py-12 border-t border-border bg-muted/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-medium text-foreground mb-3 whitespace-nowrap shrink-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            <span>Deep Dive Analysis</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
          >
            Engineering Case Studies
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-muted-foreground text-base leading-relaxed"
          >
            Real data transformations, statistical root-cause analyses, and production BI models with verified outcomes.
          </motion.p>
        </div>

        {/* Case Studies Stack */}
        <div className="space-y-8">
          {caseStudies.map((study, idx) => (
            <CaseStudyCard key={study.id} study={study} index={idx} />
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
};
