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
  Clock,
  DollarSign,
  ArrowUpRight,
  Database,
  Truck,
  Activity,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── Static Data ──────────────────────────────────────────────────────

const shippingData = [
  { mode: 'Standard Class', share: 60.0, orders: '1,840 Orders', color: 'bg-primary', note: 'Bulk shipping economy base' },
  { mode: 'Second Class', share: 20.0, orders: '612 Orders', color: 'bg-amber-500', note: 'Mid-tier express delivery' },
  { mode: 'First Class', share: 15.0, orders: '460 Orders', color: 'bg-sky-500', note: 'Priority next-day service' },
  { mode: 'Same Day', share: 5.0, orders: '154 Orders', color: 'bg-rose-500', note: 'Instant local delivery pilot' },
];

const quarterlyRevenues = [
  { quarter: 'Q1 Sales', pct: '15.0%', val: '$324K', growth: '+4.2%' },
  { quarter: 'Q2 Sales', pct: '22.0%', val: '$475K', growth: '+6.8%' },
  { quarter: 'Q3 Sales', pct: '28.0%', val: '$605K', growth: '+10.5%' },
  { quarter: 'Q4 Peak', pct: '35.0%', val: '$756K', growth: '+35.0%' },
];

const categoryTable = [
  { category: 'Technology', sales: '$820,400', share: '38.0%', margin: '42.5%', metric: 'High Profit Driver' },
  { category: 'Furniture', sales: '$740,200', share: '34.2%', margin: '22.8%', metric: 'High Shipping Cost' },
  { category: 'Office Supplies', sales: '$599,400', share: '27.8%', margin: '38.1%', metric: 'High Volume Transactions' },
];

const dimensionTables = [
  { name: 'Dim_Date', fields: 'DateKey, FullDate, Year, Quarter, MonthName, DayOfWeek, IsHoliday' },
  { name: 'Dim_Product', fields: 'ProductKey, ProductID, Category, SubCategory, ProductName, UnitCost, ListPrice' },
  { name: 'Dim_Region', fields: 'RegionKey, Country, RegionName, State, City, ZipCode, Manager' },
  { name: 'Dim_ShipMode', fields: 'ShipModeKey, ShipModeName, CarrierCode, ServiceTier, AvgTransitDays' },
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

const CaseStudySalesReport = () => {
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
            <span>Power BI & Star Schema Modeling</span>
            <span className="w-1 h-1 rounded-full bg-primary" />
            <span>Time-Intelligence</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif-display text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight text-foreground leading-[1.05] mb-6">
            Complete Retail Sales<br />Warehouse Dashboard
          </h1>

          {/* Byline */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-6">
            <span className="font-medium text-foreground">V. Shanmukha</span>
            <span className="opacity-40">|</span>
            <span>Solo Build</span>
            <span className="opacity-40">|</span>
            <span>Power BI, DAX, Excel, Star-Schema ETL</span>
          </div>

          {/* Lede */}
          <p className="max-w-2xl mx-auto text-muted-foreground text-sm md:text-base leading-relaxed">
            A comprehensive Power BI business intelligence suite analyzing 3 years of retail operations by establishing a high-performance Star-Schema relational model and mapping shipping velocities, category margins, and temporal trends.
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
              { label: 'Temporal Scope', value: '3 Full Years', icon: Clock },
              { label: 'Standard Ship Share', value: '60.0% Volume', icon: Truck },
              { label: 'Q4 Seasonal Uplift', value: '+35.0%', icon: TrendingUp },
              { label: 'Dimensional Tables', value: 'Star Schema', icon: Database },
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
              "Retail executives struggled to isolate volume spikes, channel friction, and geographical trends across three separate legacy reporting feeds. They required a single-pane transaction dashboard built on standard dimensional principles."
            </p>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground mb-8">
            The target was to merge disjointed spreadsheet logs into an interactive, enterprise-grade business intelligence dashboard. By modeling a clean star schema in Power BI and writing powerful DAX metrics, this system unlocks self-service filtering on shipment efficiency, temporal seasonality, and category gross sales without technical bottlenecks.
          </p>

          <Divider />

          {/* ── STAR-SCHEMA WAREHOUSE ARCHITECTURE ── */}
          <SectionHeading icon={Database} label="Star-Schema Relational Model" />
          <p className="text-sm leading-relaxed text-muted-foreground mb-6">
            Instead of flat-file denormalized models that lag under large transaction sets, this database implements a high-performance <strong className="text-foreground font-semibold">Star Schema</strong>. The center Fact table connects to optimized Dimension tables via 1-to-many relationship keys.
          </p>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 mb-8">
            {/* Dimension Table Grid */}
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-4 font-semibold">Dimensional Schema Definitions</div>
              <div className="space-y-3.5">
                {dimensionTables.map((d) => (
                  <div key={d.name} className="border-b-[0.5px] border-border/30 pb-2.5 last:border-b-0 last:pb-0">
                    <span className="font-mono text-xs font-semibold text-foreground bg-primary/5 px-2 py-0.5 border-[0.5px] border-primary/20 rounded mr-2 inline-block">
                      {d.name}
                    </span>
                    <p className="text-[10px] font-mono text-muted-foreground mt-1.5 leading-relaxed">{d.fields}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Fact table commentary */}
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5 flex flex-col justify-between">
              <div>
                <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Central Fact Table</div>
                <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
                  <p>
                    <span className="text-foreground font-semibold">Fact_Sales</span> houses 30,000+ distinct transaction rows containing foreign keys to dimensions and direct numerical fields: `SalesAmount`, `OrderQuantity`, `Discount`, `ShippingCost`, and `ProfitMargin`.
                  </p>
                  <p>
                    By enforcing reference integrity at the database layer and disabling auto-date/time hierarchies in Power BI, model size was compressed by <strong className="text-foreground font-semibold">70%</strong>, enabling sub-second visual refresh rates under active filtering.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t-[0.5px] border-border/40 text-[9px] font-mono text-muted-foreground/80">
                RELATIONSHIPS: <span className="text-foreground font-semibold">1:N Active directional filtering</span>
              </div>
            </div>
          </div>

          <Divider />

          {/* ── SHIPPING CHANNELS ── */}
          <SectionHeading icon={Truck} label="Shipping Performance Breakdown" />
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 mb-8">
            {/* Chart Grid */}
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-4 font-semibold">Order Volume Share by Shipping Class</div>
              <div className="space-y-4">
                {shippingData.map((d) => (
                  <div key={d.mode} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-foreground font-semibold">{d.mode} ({d.share}%)</span>
                      <span className="font-mono text-muted-foreground">{d.orders}</span>
                    </div>
                    <div className="h-3 bg-background/60 border-[0.5px] border-border/30 rounded-sm overflow-hidden">
                      <div className={cn('h-full rounded-sm', d.color)} style={{ width: `${d.share}%` }} />
                    </div>
                    <span className="text-[8px] text-muted-foreground font-mono block italic">{d.note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping insights */}
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Distribution Efficiencies</div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                <span className="text-foreground font-semibold">Standard Class shipping</span> handles <strong className="text-foreground font-semibold">60.0%</strong> of all customer transactions. Model indicates it yields the highest absolute profit despite slow transit (5-day avg).
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                <span className="text-foreground font-semibold">First Class and Same Day</span> express models account for 20% aggregate volume, but show <strong className="text-foreground font-semibold">12% higher profit erosion</strong> due to fuel surcharges and rush courier fees.
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Recommendation engine flags regions where Priority shipping is selected by default, suggesting opportunities to transition accounts to Standard hubs and save shipping expenses.
              </p>
            </div>
          </div>

          <Divider />

          {/* ── THE Q4 SEASONAL UPLIFT ── */}
          <SectionHeading icon={TrendingUp} label="The Q4 Seasonal Spike" />
          <div className="border-[0.5px] border-amber-500/20 bg-amber-500/5 rounded-lg p-6 mb-8">
            <h4 className="font-serif-display text-lg text-foreground mb-2 font-normal">Steady +35% Year-End Uplift</h4>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Across all three tracking cycles, quarterly retail volume exhibits a recurring upward trajectory. Q4 consistently captures <strong className="text-foreground font-semibold">35%</strong> of yearly transaction value.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quarterlyRevenues.map((q) => (
                <div key={q.quarter} className="bg-background/80 border-[0.5px] border-border/60 rounded p-4 text-center">
                  <div className="text-xs font-mono text-muted-foreground">{q.quarter}</div>
                  <div className="text-lg font-serif-display text-foreground font-bold my-1">{q.val}</div>
                  <div className="text-[9px] font-mono text-emerald-500 font-semibold">{q.growth} Growth</div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed mt-4 italic">
              * Time-intelligence analysis suggests stocking cycles in Technology categories must accelerate by September 15 to capitalize fully on Q4 demand, avoiding localized fulfillment stockouts.
            </p>
          </div>

          <Divider />

          {/* ── PRODUCT CATEGORY MATRIX ── */}
          <SectionHeading icon={BarChart3} label="Category Distribution & Operating Margin" />
          <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg overflow-hidden mb-8">
            <div className="grid grid-cols-5 gap-2 px-5 py-3 border-b-[0.5px] border-border/60 bg-muted/20 text-[9px] font-mono uppercase tracking-widest text-muted-foreground font-semibold">
              <span>Category Segment</span>
              <span className="text-right">Total Revenue</span>
              <span className="text-right">Share</span>
              <span className="text-right">Operating Margin</span>
              <span className="text-right">Sales Indicator</span>
            </div>
            {categoryTable.map((s, i) => (
              <div
                key={s.category}
                className={cn(
                  'grid grid-cols-5 gap-2 px-5 py-3 text-xs',
                  i < categoryTable.length - 1 && 'border-b-[0.5px] border-border/30'
                )}
              >
                <span className="font-medium text-foreground">{s.category}</span>
                <span className="text-right text-muted-foreground tabular-nums">{s.sales}</span>
                <span className="text-right text-muted-foreground tabular-nums">{s.share}</span>
                <span className="text-right text-foreground font-semibold tabular-nums">{s.margin}</span>
                <span className="text-right text-primary font-mono text-[10px] tracking-wider font-semibold">{s.metric}</span>
              </div>
            ))}
          </div>

          <Divider />

          {/* ── DAX ENGINE DETAILS ── */}
          <SectionHeading icon={Layers} label="DAX Measure Formulas Engineered" />
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">YoY Revenue Growth %</div>
              <div className="bg-background/80 border-[0.5px] border-border/60 rounded p-3 font-mono text-[9px] text-muted-foreground leading-relaxed">
                <span className="text-amber-500">YoY Sales Growth =</span><br />
                VAR PriorYearSales = CALCULATE([Total Sales], SAMEPERIODLASTYEAR('Dim_Date'[FullDate]))<br />
                RETURN<br />
                DIVIDE([Total Sales] - PriorYearSales, PriorYearSales, 0)
              </div>
            </div>
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">YTD Dynamic Sales</div>
              <div className="bg-background/80 border-[0.5px] border-border/60 rounded p-3 font-mono text-[9px] text-muted-foreground leading-relaxed">
                <span className="text-amber-500">Sales YTD =</span><br />
                TOTALYTD(<br />
                &nbsp;&nbsp;SUM(Fact_Sales[SalesAmount]),<br />
                &nbsp;&nbsp;'Dim_Date'[FullDate]<br />
                )
              </div>
            </div>
          </div>

          <Divider />

          {/* ── SKILLS DEMONSTRATED ── */}
          <SectionHeading icon={Activity} label="Core Skills Mapped" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
            {[
              { skill: 'Data Warehousing', detail: 'Star-schema modeling' },
              { skill: 'DAX Scripting', detail: 'Time-intelligence queries' },
              { skill: 'ETL Processing', detail: 'Power Query pipelines' },
              { skill: 'Self-Service BI', detail: 'Dynamic report filters' },
              { skill: 'Retail Operations', detail: 'Shipping & demand insights' },
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
                <a href="https://github.com/vutikurishanmukha9/Complete-Sales-Report" target="_blank" rel="noopener noreferrer">
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

export default CaseStudySalesReport;
