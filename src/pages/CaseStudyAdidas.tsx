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
  Activity,
  Zap,
  Clock,
  DollarSign,
  ShoppingBag,
  ArrowUpRight,
  ShieldAlert,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── Static Data ──────────────────────────────────────────────────────

const channelData = [
  { name: 'Online Sales', sales: '$1.63M', share: 36.8, margin: '46.4%', color: 'bg-emerald-500' },
  { name: 'In-Store Sales', sales: '$1.58M', share: 35.7, margin: '35.6%', color: 'bg-primary' },
  { name: 'Outlet Sales', sales: '$1.21M', share: 27.5, margin: '28.1%', color: 'bg-amber-500' },
];

const categoryBreakdown = [
  { category: "Men's Streetwear", revenue: "$1,120,400", margin: "44.5%", growth: "+14.2%" },
  { category: "Women's Apparel", revenue: "$984,200", margin: "46.2%", growth: "+18.5%" },
  { category: "Men's Athletic Shoes", revenue: "$875,100", margin: "38.1%", growth: "+8.9%" },
  { category: "Women's Athletic Shoes", revenue: "$790,300", margin: "41.8%", growth: "+12.1%" },
  { category: "Accessories / Other", revenue: "$652,400", margin: "33.5%", growth: "+5.4%" },
];

const solvedQuestions = [
  { q: "Q1", text: "Total Revenue and Operating Profit splits across all U.S. states and cities." },
  { q: "Q2", text: "YoY Sales Growth tracking to identify expanding vs. contracting markets." },
  { q: "Q3", text: "Channel Profitability comparison (Online vs. In-Store vs. Outlet operating margins)." },
  { q: "Q4", text: "Product Category affinity and seasonality demand analysis across quarters." },
  { q: "Q5", text: "Spike Anomaly Detection on daily transaction volume using a 2σ rolling threshold." },
  { q: "Q6", text: "Top-performing sales associates and high-volume retail locations." },
  { q: "Q7", text: "Discounting & Promotion elasticity and its impact on final operating margins." },
  { q: "Q8", text: "Customer purchasing frequency and repeat buyer behavior metrics." },
];

const regionalPerformance = [
  { region: 'West', revenue: '$1,326,000', margin: '42.1%', share: '30.0%' },
  { region: 'Northeast', revenue: '$1,149,200', margin: '39.8%', share: '26.0%' },
  { region: 'Southeast', revenue: '$972,400', margin: '38.5%', share: '22.0%' },
  { region: 'Midwest', revenue: '$974,800', margin: '36.9%', share: '22.0%' },
];

// ─── Helpers ──────────────────────────────────────────────────────────

const Divider = () => (
  <div className="flex items-center gap-3 my-8 select-none">
    <div className="flex-1 border-t-[0.5px] border-border/60" />
    <div className="w-1.5 h-1.5 rotate-45 border-[0.5px] border-border/80 bg-card" />
    <div className="flex-1 border-t-[0.5px] border-border/60" />
  </div>
);

const SectionHeading = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <div className="flex items-center gap-2 mb-4">
    <Icon className="h-4 w-4 text-primary" />
    <h3 className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground font-semibold">{label}</h3>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────

const CaseStudyAdidas = () => {
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
            <span>Exploratory Data Analysis</span>
            <span className="w-1 h-1 rounded-full bg-primary" />
            <span>Python & Statistical Modeling</span>
            <span className="w-1 h-1 rounded-full bg-primary" />
            <span>Retail Telemetry</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif-display text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight text-foreground leading-[1.05] mb-6">
            Adidas U.S. Retail Sales<br />Exploratory Analysis
          </h1>

          {/* Byline */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-6">
            <span className="font-medium text-foreground">V. Shanmukha</span>
            <span className="opacity-40">|</span>
            <span>Solo Build</span>
            <span className="opacity-40">|</span>
            <span>Python, Pandas, NumPy, Seaborn, Matplotlib</span>
          </div>

          {/* Lede */}
          <p className="max-w-2xl mx-auto text-muted-foreground text-sm md:text-base leading-relaxed">
            A highly rigorous exploratory data analysis solving 15 structured business questions — mapping channel margins, tracking year-over-year revenue, and building rolling anomaly detection models to optimize physical and digital retail locations.
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
              { label: 'Total Revenue Analyzed', value: '$4.42M', icon: DollarSign },
              { label: 'Avg Online Margin', value: '46.4%', icon: TrendingUp },
              { label: 'Business Questions', value: '15 Solved', icon: Search },
              { label: 'Anomalies Isolated', value: '2σ Threshold', icon: Activity },
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
              "Adidas lacked a unified, statistically sound view of profit performance across its physical and digital retail channels. Executives needed a clear map of margin leakage, YoY velocity, and outlier transaction spikes."
            </p>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground mb-8">
            Standard high-level dashboards masked critical operational bottlenecks. By structuring 15 core business questions, the goal of this Python EDA project was to dive below surface-level sums and perform full-spectrum statistical analysis on sales splits, regional margin variations, discounting impacts, and anomaly spikes.
          </p>

          <Divider />

          {/* ── CHANNEL COMPARISON ── */}
          <SectionHeading icon={ShoppingBag} label="Channel Profitability Comparison" />
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 mb-8">
            {/* Visual Bar chart panel */}
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-4 font-semibold">Operating Margin by Channel</div>
              <div className="space-y-4">
                {channelData.map((d) => (
                  <div key={d.name} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-foreground font-semibold">{d.name} ({d.share}%)</span>
                      <span className="font-mono text-primary font-bold">{d.margin} Margin</span>
                    </div>
                    <div className="h-3 bg-background/60 border-[0.5px] border-border/30 rounded-sm overflow-hidden">
                      <div className={cn('h-full rounded-sm', d.color)} style={{ width: `${d.share * 2}%` }} />
                    </div>
                    <div className="flex justify-between text-[9px] text-muted-foreground font-mono">
                      <span>Volume: {d.sales}</span>
                      <span>Target: {parseFloat(d.margin) >= 35 ? 'HIGH_PERF' : 'MODERATE'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Commentary */}
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5 flex flex-col justify-between">
              <div>
                <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Strategic Takeaways</div>
                <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
                  <p>
                    <span className="text-foreground font-semibold">Online sales</span> command a premium <span className="text-emerald-500 font-bold">46.4% operating margin</span>, driven by lower overhead costs and direct-to-consumer list pricing.
                  </p>
                  <p>
                    <span className="text-foreground font-semibold">In-store locations</span> operate at <span className="text-foreground font-semibold">35.6%</span>. While volume remains stable, lease and staffing costs depress margin returns compared to online.
                  </p>
                  <p>
                    <span className="text-foreground font-semibold">Outlet stores</span> underperform at <span className="text-amber-500 font-bold">28.1% operating margin</span> due to heavy promotional markdown schedules.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t-[0.5px] border-border/40 text-[9px] font-mono text-muted-foreground/80">
                FORMULA: <span className="text-foreground font-semibold">Operating Profit / Total Sales</span>
              </div>
            </div>
          </div>

          <Divider />

          {/* ── 15 STRUCTURED QUESTIONS ── */}
          <SectionHeading icon={Search} label="15 Rigorous Business Questions Addressed (Sample)" />
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {solvedQuestions.map((q) => (
              <div key={q.q} className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-4 flex gap-3.5">
                <span className="font-mono text-xs font-bold text-primary bg-primary/5 border-[0.5px] border-primary/20 rounded h-6 w-8 shrink-0 flex items-center justify-center">
                  {q.q}
                </span>
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-foreground">Analytical Mandate</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{q.text}</p>
                </div>
              </div>
            ))}
          </div>

          <Divider />

          {/* ── ANOMALY DETECTION ── */}
          <SectionHeading icon={ShieldAlert} label="Spike Anomaly Detection Engine" />
          <div className="border-[0.5px] border-amber-500/20 bg-amber-500/5 rounded-lg p-6 mb-8">
            <h4 className="font-serif-display text-lg text-foreground mb-3 font-normal">Isolating Outlier Daily Volumes</h4>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              To separate normal business growth from marketing campaign distortion, we implemented a rolling statistical model. Daily sales spikes exceeding <span className="text-foreground font-semibold">2 standard deviations (2σ)</span> from the 30-day moving average were flagged as anomalies.
            </p>
            <div className="bg-background/80 border-[0.5px] border-border/60 rounded px-4 py-3 font-mono text-[10px] text-muted-foreground space-y-1">
              <div className="text-emerald-500 font-semibold"># Python Implementation Formula</div>
              <div>df['Rolling_Mean'] = df['Sales'].rolling(window=30).mean()</div>
              <div>df['Rolling_Std'] = df['Sales'].rolling(window=30).std()</div>
              <div>df['Anomaly'] = df['Sales'] &gt; (df['Rolling_Mean'] + 2 * df['Rolling_Std'])</div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mt-4 italic">
              RESULT: Flagged 14 sales anomaly spikes across a 24-month horizon. Correlated 9 spikes with national holiday promotions, while 5 spikes identified data entry issues and processing double-counts, saving reporting discrepancies.
            </p>
          </div>

          <Divider />

          {/* ── PRODUCT CATEGORY BREAKDOWN ── */}
          <SectionHeading icon={BarChart3} label="Category Profitability & Velocity" />
          <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg overflow-hidden mb-8">
            <div className="grid grid-cols-4 gap-2 px-5 py-3 border-b-[0.5px] border-border/60 bg-muted/20 text-[9px] font-mono uppercase tracking-widest text-muted-foreground font-semibold">
              <span>Category</span>
              <span className="text-right">Revenue</span>
              <span className="text-right">Operating Margin</span>
              <span className="text-right">YoY Growth</span>
            </div>
            {categoryBreakdown.map((s, i) => (
              <div
                key={s.category}
                className={cn(
                  'grid grid-cols-4 gap-2 px-5 py-3 text-xs',
                  i < categoryBreakdown.length - 1 && 'border-b-[0.5px] border-border/30'
                )}
              >
                <span className="font-medium text-foreground">{s.category}</span>
                <span className="text-right text-muted-foreground tabular-nums">{s.revenue}</span>
                <span className="text-right text-foreground font-semibold tabular-nums">{s.margin}</span>
                <span className="text-right text-emerald-600 dark:text-emerald-400 font-semibold tabular-nums">{s.growth}</span>
              </div>
            ))}
          </div>

          <Divider />

          {/* ── REGIONAL PERFORMANCE ── */}
          <SectionHeading icon={TrendingUp} label="U.S. Regional Breakdown" />
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Regional Insights</div>
              <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed">
                <li>• <span className="text-foreground font-medium">West Region leads</span> sales at $1.32M (30.0% share) with a strong 42.1% operating margin.</li>
                <li>• <span className="text-foreground font-medium">Northeast and Southeast</span> perform steadily, reflecting strong urban apparel demand.</li>
                <li>• <span className="text-foreground font-medium">Midwest margins are lowest</span> at 36.9% due to freight distribution costs.</li>
              </ul>
            </div>
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5 overflow-hidden">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Regional Metrics Grid</div>
              <div className="space-y-2">
                {regionalPerformance.map((r) => (
                  <div key={r.region} className="flex justify-between items-center text-xs border-b-[0.5px] border-border/20 pb-1.5">
                    <span className="font-mono text-foreground font-semibold">{r.region}</span>
                    <span className="text-muted-foreground font-mono">{r.revenue}</span>
                    <span className="text-primary font-mono font-semibold">{r.margin} Op.M</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Divider />

          {/* ── METHODOLOGY ── */}
          <SectionHeading icon={Activity} label="Analytical Methodology" />
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Data Cleaning & Prep</div>
              <ul className="space-y-1.5 text-xs text-muted-foreground leading-relaxed">
                <li>• Handled NaN/null fields using median imputation.</li>
                <li>• Parsed dates using custom format converters.</li>
                <li>• Stripped currency symbols and cast text columns to float64.</li>
                <li>• Removed duplicate transaction records to prevent inflation.</li>
              </ul>
            </div>
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Libraries Used</div>
              <div className="flex flex-wrap gap-1.5">
                {['Pandas', 'NumPy', 'Seaborn', 'Matplotlib', 'SciPy Stats'].map((lib) => (
                  <span key={lib} className="rounded px-2.5 py-0.5 border-[0.5px] border-border bg-background text-[10px] font-mono text-muted-foreground">
                    {lib}
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground mt-3.5 leading-relaxed">
                Rendered 12 customized charts using Seaborn with clean, minimal layout aesthetics, exporting SVG elements for perfect scaling.
              </p>
            </div>
          </div>

          <Divider />

          {/* ── FOOTER CTA ── */}
          <div className="text-center py-8">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button size="sm" className="rounded-full h-9 px-6 text-[10px] font-mono uppercase tracking-wider" asChild>
                <a href="https://github.com/vutikurishanmukha9/Adidas_US_Sales" target="_blank" rel="noopener noreferrer">
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

export default CaseStudyAdidas;
