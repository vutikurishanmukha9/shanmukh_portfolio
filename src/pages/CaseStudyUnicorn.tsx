import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  ArrowLeft,
  Github,
  BarChart3,
  TrendingUp,
  Globe,
  Zap,
  Clock,
  DollarSign,
  Building2,
  ArrowUpRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── Static Data ──────────────────────────────────────────────────────

const topCompanies = [
  { rank: 1, name: 'Bytedance', valuation: '$180B', country: 'China', sector: 'AI' },
  { rank: 2, name: 'SpaceX', valuation: '$100B', country: 'USA', sector: 'Other' },
  { rank: 3, name: 'SHEIN', valuation: '$100B', country: 'China', sector: 'E-commerce' },
  { rank: 4, name: 'Stripe', valuation: '$95B', country: 'USA', sector: 'Fintech' },
  { rank: 5, name: 'Klarna', valuation: '$46B', country: 'Sweden', sector: 'Fintech' },
];

const sectorBreakdown = [
  { sector: 'Fintech', count: 224, totalVal: '$882B', avgVal: '$3.94B', efficiency: '6.15x' },
  { sector: 'AI', count: 84, totalVal: '$377B', avgVal: '$4.49B', efficiency: '4.88x' },
  { sector: 'Internet Software', count: 119, totalVal: '$340B', avgVal: '$2.86B', efficiency: '6.35x' },
  { sector: 'E-commerce', count: 88, totalVal: '$290B', avgVal: '$3.30B', efficiency: '5.42x' },
  { sector: 'Supply Chain', count: 42, totalVal: '$120B', avgVal: '$2.86B', efficiency: '3.48x' },
  { sector: 'Health', count: 56, totalVal: '$168B', avgVal: '$3.00B', efficiency: '5.10x' },
];

const continentData = [
  { name: 'North America', count: 589, pct: 54.8, val: '$2,032B', avgFunding: '$504M', color: 'bg-primary' },
  { name: 'Asia', count: 310, pct: 28.9, val: '$1,180B', avgFunding: '$632M', color: 'bg-amber-500' },
  { name: 'Europe', count: 143, pct: 13.3, val: '$503B', avgFunding: '$380M', color: 'bg-sky-500' },
  { name: 'Oceania', count: 8, pct: 0.7, val: '$56B', avgFunding: '$210M', color: 'bg-emerald-500' },
  { name: 'South America', count: 18, pct: 1.7, val: '$36B', avgFunding: '$290M', color: 'bg-violet-500' },
  { name: 'Africa', count: 7, pct: 0.7, val: '$10B', avgFunding: '$180M', color: 'bg-rose-500' },
];

const timeToUnicorn = [
  { sector: 'Auto & Transportation', years: 5.0 },
  { sector: 'AI', years: 5.9 },
  { sector: 'E-commerce', years: 6.4 },
  { sector: 'Fintech', years: 6.8 },
  { sector: 'Internet Software', years: 7.2 },
  { sector: 'Health', years: 8.2 },
];

// ─── Helpers ──────────────────────────────────────────────────────────

const Divider = () => (
  <div className="flex items-center gap-3 my-8 select-none">
    <div className="flex-1 border-t-[0.5px] border-border/60" />
    <div className="w-1.5 h-1.5 rotate-45 border-[0.5px] border-border/80 bg-card" />
    <div className="flex-1 border-t-[0.5px] border-border/60" />
  </div>
);

const SectionHeading = ({ icon: Icon, label }: { icon: typeof BarChart3; label: string }) => (
  <div className="flex items-center gap-2 mb-4">
    <Icon className="h-4 w-4 text-primary" />
    <h3 className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground font-semibold">{label}</h3>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────

const UnicornCaseStudy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 border-b-[0.5px] border-border/60 bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4 lg:px-8 h-12 flex items-center justify-between">
          <Link
            to="/#case-studies"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Portfolio
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">

        {/* ═══ NEWSPAPER MASTHEAD ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto text-center mb-12"
        >
          {/* Dateline */}
          <div className="flex items-center justify-center gap-3 mb-6 text-[9px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
            <span>Business Intelligence</span>
            <span className="w-1 h-1 rounded-full bg-primary" />
            <span>Exploratory Data Analysis</span>
            <span className="w-1 h-1 rounded-full bg-primary" />
            <span>2007 - 2022</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif-display text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight text-foreground leading-[1.05] mb-6">
            Global Unicorn Startup<br />Performance Analysis
          </h1>

          {/* Byline */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-6">
            <span className="font-medium text-foreground">V. Shanmukha</span>
            <span className="opacity-40">|</span>
            <span>Solo Build</span>
            <span className="opacity-40">|</span>
            <span>Power BI, Power Query, DAX, Star Schema</span>
          </div>

          {/* Lede */}
          <p className="max-w-2xl mx-auto text-muted-foreground text-sm md:text-base leading-relaxed">
            A comprehensive analysis of 1,074 unicorn companies across 6 continents and 16 industries — mapping $3,711B in total valuation and $591.8B in aggregate funding to uncover the structural mechanics of how billion-dollar startups are created.
          </p>
        </motion.div>

        {/* ═══ HEADLINE KPI TICKER ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Total Companies', value: '1,074', icon: Building2 },
              { label: 'Total Valuation', value: '$3,711B', icon: DollarSign },
              { label: 'Total Funding', value: '$591.8B', icon: TrendingUp },
              { label: 'Avg Time to $1B', value: '7.0 Years', icon: Clock },
            ].map((kpi) => (
              <div key={kpi.label} className="border-[0.5px] border-border/80 bg-card/45 backdrop-blur-md rounded-lg p-4 text-center">
                <kpi.icon className="h-4 w-4 text-primary mx-auto mb-2" />
                <div className="text-2xl font-serif-display text-foreground font-normal">{kpi.value}</div>
                <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mt-1">{kpi.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <Divider />

        {/* ═══ BODY: NEWSPAPER COLUMNS ═══ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >

          {/* ── PROBLEM STATEMENT ── */}
          <SectionHeading icon={BarChart3} label="Problem Statement" />
          <div className="border-l-2 border-primary/30 pl-5 mb-8">
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground italic font-serif-display text-lg md:text-xl">
              "The global startup ecosystem crossed a historic threshold with over 1,000 unicorn companies, but the distribution of value, funding efficiency, and time-to-unicorn was poorly understood across geographies and industries."
            </p>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground mb-8">
            The goal was to map the structural patterns in how unicorns are created — where, in which sectors, how quickly, and at what capital cost. With 1,074 companies tracked from 2007 to 2022, the dataset spans founding dates, valuations, funding amounts, industries, geographies, and investor networks.
          </p>

          <Divider />

          {/* ── GEOGRAPHIC CONCENTRATION ── */}
          <SectionHeading icon={Globe} label="Geographic Concentration" />
          <div className="grid lg:grid-cols-[1fr_1fr] gap-8 mb-8">
            {/* Distribution Chart */}
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-4 font-semibold">Continent Distribution</div>
              <div className="space-y-2.5">
                {continentData.map((c) => (
                  <div key={c.name} className="flex items-center gap-2.5">
                    <span className="w-24 text-[10px] font-mono text-right opacity-80 shrink-0">{c.name}</span>
                    <div className="flex-1 h-3 bg-background/60 border-[0.5px] border-border/30 rounded-sm overflow-hidden">
                      <div className={cn('h-full rounded-sm', c.color)} style={{ width: `${c.pct}%` }} />
                    </div>
                    <span className="w-14 text-[10px] font-mono text-foreground font-semibold tabular-nums">{c.count}</span>
                    <span className="w-10 text-[10px] font-mono text-muted-foreground tabular-nums">{c.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Stats */}
            <div className="space-y-4">
              <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
                <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Capital Efficiency by Region</div>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p><span className="text-foreground font-medium">North America</span> dominates with <span className="text-foreground font-semibold">589 companies</span> and <span className="text-foreground font-semibold">$2,032B</span> in valuation, with avg funding of $504M per company.</p>
                  <p><span className="text-foreground font-medium">Asia</span> is second with <span className="text-foreground font-semibold">310 companies</span> but requires <span className="text-primary font-semibold">25% more capital</span> — avg funding $632M vs $504M for North America.</p>
                  <p><span className="text-foreground font-medium">Europe</span> has 143 companies with the highest avg valuation per company at <span className="text-foreground font-semibold">$3.52B</span>.</p>
                  <p><span className="text-foreground font-medium">Oceania</span> produces the most capital-efficient unicorns at avg <span className="text-foreground font-semibold">$7B valuation</span>, driven by Canva at $40B.</p>
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* ── THE 2021 EXPLOSION ── */}
          <SectionHeading icon={Zap} label="The 2021 Explosion — The Single Most Important Finding" />
          <div className="border-[0.5px] border-amber-500/20 bg-amber-500/5 rounded-lg p-6 mb-8">
            <div className="grid md:grid-cols-[auto_1fr] gap-6 items-center">
              <div className="text-center md:text-left">
                <div className="text-5xl md:text-6xl font-serif-display text-foreground font-normal">520</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 mt-1">Unicorns in 2021</div>
                <div className="text-[10px] font-mono text-muted-foreground mt-0.5">48.4% of all time</div>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p><span className="text-foreground font-semibold">520 of 1,074 unicorns (48.4%)</span> were created in a single year — 2021. This represents a <span className="text-foreground font-semibold">5x increase</span> over the 2018-2019 baseline of ~104/year.</p>
                <p>North America led the 2021 surge with <span className="text-foreground font-semibold">324 new unicorns</span>, Asia added 116. Fintech (138) and Internet Software (119) drove the majority of 2021 additions.</p>
                <p className="text-xs opacity-80 italic">This surge was fueled by low interest rates, post-COVID digital acceleration, and the SPAC boom — compressing the unicorn creation timeline artificially. Understanding this anomaly is critical for benchmarking.</p>
              </div>
            </div>
            {/* Progress bar */}
            <div className="mt-4 h-3 bg-background/60 border-[0.5px] border-border/30 rounded-sm overflow-hidden">
              <div className="h-full rounded-sm bg-amber-500/80 relative" style={{ width: '48.4%' }}>
                <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[7px] font-mono font-bold text-amber-950 dark:text-amber-100">48.4%</span>
              </div>
            </div>
            <div className="flex justify-between text-[8px] font-mono text-muted-foreground mt-1">
              <span>2007</span>
              <span>2021 PEAK</span>
              <span>2022</span>
            </div>
          </div>

          <Divider />

          {/* ── INDUSTRY BREAKDOWN ── */}
          <SectionHeading icon={BarChart3} label="Industry Breakdown" />
          <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg overflow-hidden mb-8">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-2 px-5 py-3 border-b-[0.5px] border-border/60 bg-muted/20 text-[9px] font-mono uppercase tracking-widest text-muted-foreground font-semibold">
              <span>Sector</span>
              <span className="text-right">Companies</span>
              <span className="text-right">Total Val.</span>
              <span className="text-right">Avg Val.</span>
              <span className="text-right">Efficiency</span>
            </div>
            {/* Table Rows */}
            {sectorBreakdown.map((s, i) => (
              <div
                key={s.sector}
                className={cn(
                  'grid grid-cols-5 gap-2 px-5 py-3 text-xs',
                  i < sectorBreakdown.length - 1 && 'border-b-[0.5px] border-border/30'
                )}
              >
                <span className="font-medium text-foreground">{s.sector}</span>
                <span className="text-right text-muted-foreground tabular-nums">{s.count}</span>
                <span className="text-right text-muted-foreground tabular-nums">{s.totalVal}</span>
                <span className="text-right text-foreground font-semibold tabular-nums">{s.avgVal}</span>
                <span className={cn(
                  'text-right font-semibold tabular-nums',
                  parseFloat(s.efficiency) >= 6 ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'
                )}>
                  {s.efficiency}
                </span>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Key Industry Insights</div>
              <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                <li><span className="text-foreground font-medium">Fintech is the largest sector</span> — 224 companies, $882B total valuation, avg $3.94B per company.</li>
                <li><span className="text-foreground font-medium">AI has the highest avg valuation</span> — 84 companies, avg $4.49B, anchored by Bytedance at $180B.</li>
                <li><span className="text-foreground font-medium">Supply Chain & Logistics</span> requires the most funding per company at avg $793M with the lowest efficiency of 3.48x.</li>
                <li><span className="text-foreground font-medium">Internet Software</span> is most capital-efficient — median valuation/funding ratio of 6.35x.</li>
              </ul>
            </div>
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">20.9% Concentration Risk</div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Fintech accounts for <span className="text-foreground font-semibold">20.9% of all unicorns</span> in one sector — meaning the entire ecosystem is exposed to fintech regulatory changes globally.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                AI unicorns are faster (5.9yr avg) but riskier — shorter time-to-unicorn combined with large funding rounds suggests investors are pricing in future value heavily, with Bytedance being a massive outlier skewing the sector numbers.
              </p>
            </div>
          </div>

          <Divider />

          {/* ── TIME TO UNICORN ── */}
          <SectionHeading icon={Clock} label="Time to Unicorn" />
          <div className="grid md:grid-cols-[1fr_1fr] gap-8 mb-8">
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-4 font-semibold">Avg Years to $1B by Sector</div>
              <div className="space-y-2.5">
                {timeToUnicorn.map((t) => (
                  <div key={t.sector} className="flex items-center gap-2.5">
                    <span className="w-36 text-[10px] font-mono text-right opacity-80 shrink-0 truncate">{t.sector}</span>
                    <div className="flex-1 h-3 bg-background/60 border-[0.5px] border-border/30 rounded-sm overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-sm',
                          t.years <= 6 ? 'bg-emerald-500' : t.years <= 7 ? 'bg-primary' : 'bg-muted-foreground/50'
                        )}
                        style={{ width: `${(t.years / 10) * 100}%` }}
                      />
                    </div>
                    <span className="w-12 text-[10px] font-mono text-foreground font-semibold tabular-nums">{t.years} yr</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
                <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Speed Records</div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  Global average: <span className="text-foreground font-semibold">7.0 years</span> from founding to $1B valuation.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  Fastest individual companies reached unicorn in <span className="text-foreground font-semibold">under 12 months</span> — Brex, Scale AI, Wiz, and Hopin.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The 1-year unicorn phenomenon signals that late-stage venture capital was actively hunting for deployment targets in 2018-2021.
                </p>
              </div>
            </div>
          </div>

          <Divider />

          {/* ── CAPITAL EFFICIENCY ── */}
          <SectionHeading icon={DollarSign} label="Capital Efficiency" />
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              { company: 'SHEIN', raised: '$2B', valuation: '$100B', ratio: '50x', note: 'Most capital-efficient mega-unicorn' },
              { company: 'Stripe', raised: '$2B', valuation: '$95B', ratio: '47.5x', note: 'Premier fintech efficiency' },
              { company: 'Canva', raised: '$572M', valuation: '$40B', ratio: '70x', note: 'Oceania outlier driver' },
            ].map((c) => (
              <div key={c.company} className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
                <div className="text-lg font-serif-display text-foreground mb-1">{c.company}</div>
                <div className="text-3xl font-serif-display text-primary font-normal mb-2">{c.ratio}</div>
                <div className="text-[10px] font-mono text-muted-foreground space-y-0.5">
                  <div>Raised: <span className="text-foreground font-semibold">{c.raised}</span></div>
                  <div>Valuation: <span className="text-foreground font-semibold">{c.valuation}</span></div>
                </div>
                <div className="mt-2 text-[9px] font-mono text-muted-foreground/80 italic">{c.note}</div>
              </div>
            ))}
          </div>

          <Divider />

          {/* ── TOP 5 COMPANIES ── */}
          <SectionHeading icon={TrendingUp} label="Top Companies by Valuation" />
          <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg overflow-hidden mb-8">
            <div className="grid grid-cols-4 gap-2 px-5 py-3 border-b-[0.5px] border-border/60 bg-muted/20 text-[9px] font-mono uppercase tracking-widest text-muted-foreground font-semibold">
              <span>Rank / Company</span>
              <span className="text-right">Valuation</span>
              <span className="text-right">Country</span>
              <span className="text-right">Sector</span>
            </div>
            {topCompanies.map((c, i) => (
              <div
                key={c.name}
                className={cn(
                  'grid grid-cols-4 gap-2 px-5 py-3 text-xs',
                  i < topCompanies.length - 1 && 'border-b-[0.5px] border-border/30'
                )}
              >
                <span className="text-foreground">
                  <span className="text-primary font-semibold font-mono mr-1.5">#{c.rank}</span>
                  <span className="font-medium">{c.name}</span>
                </span>
                <span className="text-right text-foreground font-semibold tabular-nums">{c.valuation}</span>
                <span className="text-right text-muted-foreground">{c.country}</span>
                <span className="text-right text-muted-foreground">{c.sector}</span>
              </div>
            ))}
          </div>

          <Divider />

          {/* ── ANALYTICAL APPROACH ── */}
          <SectionHeading icon={BarChart3} label="Analytical Approach" />
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Data Preparation (Power Query)</div>
              <ul className="space-y-1.5 text-xs text-muted-foreground leading-relaxed">
                <li>• Cleaned valuation and funding strings (removed $, converted B/M to numeric)</li>
                <li>• Parsed date fields, engineered "Years to Unicorn" calculated column</li>
                <li>• Normalized investor data into a separate dimension table</li>
                <li>• Built star schema: fact table (companies) + Funding + Investors dimensions</li>
              </ul>
            </div>
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">DAX Measures Built</div>
              <ul className="space-y-1.5 text-xs text-muted-foreground leading-relaxed">
                <li>• Sum of Total Valuation with dynamic slicer context</li>
                <li>• Average of Years to Unicorn (by industry, continent)</li>
                <li>• Count of Investors by Industry</li>
                <li>• Average Funding with cross-filter measures</li>
                <li>• Valuation / Funding efficiency ratio</li>
              </ul>
            </div>
          </div>

          <Divider />

          {/* ── SKILLS DEMONSTRATED ── */}
          <SectionHeading icon={BarChart3} label="Skills Demonstrated" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
            {[
              { skill: 'Data Modeling', detail: 'Star schema design' },
              { skill: 'DAX Proficiency', detail: 'Custom measures & calculated columns' },
              { skill: 'Business Framing', detail: 'Strategy-level insights' },
              { skill: 'Analytical Depth', detail: '2021 anomaly, efficiency ratios' },
              { skill: 'Power BI', detail: 'Multi-visual dashboard' },
            ].map((s) => (
              <div key={s.skill} className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-4 text-center">
                <div className="text-xs font-semibold text-foreground mb-1">{s.skill}</div>
                <div className="text-[9px] font-mono text-muted-foreground">{s.detail}</div>
              </div>
            ))}
          </div>

          <Divider />

          {/* ── FOOTER CTA ── */}
          <div className="text-center py-8">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button size="sm" className="rounded-full h-9 px-6 text-[10px] font-mono uppercase tracking-wider" asChild>
                <a href="https://github.com/vutikurishanmukha9/Global-Unicorn-Startup" target="_blank" rel="noopener noreferrer">
                  <Github className="h-3.5 w-3.5 mr-1.5" />
                  View Source Code
                  <ArrowUpRight className="h-3 w-3 ml-1" />
                </a>
              </Button>
              <Button variant="outline" size="sm" className="rounded-full h-9 px-6 text-[10px] font-mono uppercase tracking-wider bg-background" asChild>
                <Link to="/#case-studies">
                  <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
                  Back to Portfolio
                </Link>
              </Button>
            </div>
          </div>

        </motion.div>
      </main>
    </div>
  );
};

export default UnicornCaseStudy;
