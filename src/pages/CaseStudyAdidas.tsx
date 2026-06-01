import { useEffect, useState } from 'react';
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
  BookOpen,
  MapPin,
  Building2,
  Calendar,
  Layers,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── Static Datasets from In-Depth Content ───────────────────────────

const datasetStructure = [
  { col: 'Retailer', type: 'Text', desc: 'Name of retail partner (Foot Locker, Walmart, etc.)' },
  { col: 'Retailer ID', type: 'Integer', desc: 'Unique identifier for each retailer' },
  { col: 'Invoice Date', type: 'Date', desc: 'Transaction date' },
  { col: 'Region', type: 'Text', desc: 'US region (West, Northeast, Southeast, South, Midwest)' },
  { col: 'State', type: 'Text', desc: 'US state' },
  { col: 'City', type: 'Text', desc: 'City of sale' },
  { col: 'Product', type: 'Text', desc: 'Product category name' },
  { col: 'Price per Unit', type: 'Float', desc: 'Selling price per unit ($)' },
  { col: 'Units Sold', type: 'Integer', desc: 'Number of units in transaction' },
  { col: 'Total Sales', type: 'Float', desc: 'Revenue for the transaction' },
  { col: 'Operating Profit', type: 'Float', desc: 'Profit after operating costs' },
  { col: 'Operating Margin', type: 'Float', desc: 'Profit as % of sales (decimal)' },
  { col: 'Sales Method', type: 'Text', desc: 'In-store, Online, or Outlet' },
  { col: 'Product Category', type: 'Text', desc: 'Derived from Product column' },
];

const categoryRevenue = [
  { rank: 1, name: "Men's Street Footwear", sales: "$208,826,244", share: "23.2%", margin: "44.6%", units: "1,630" },
  { rank: 2, name: "Women's Apparel", sales: "$179,038,860", share: "19.9%", margin: "44.1%", units: "1,222" },
  { rank: 3, name: "Men's Athletic Footwear", sales: "$153,673,680", share: "17.1%", margin: "40.3%", units: "1,223" },
  { rank: 4, name: "Women's Street Footwear", sales: "$128,002,813", share: "14.2%", margin: "41.0%", units: "1,081" },
  { rank: 5, name: "Men's Apparel", sales: "$123,728,632", share: "13.7%", margin: "41.3%", units: "843" },
  { rank: 6, name: "Women's Athletic Footwear", sales: "$106,631,896", share: "11.9%", margin: "42.4%", units: "891" },
];

const channelData = [
  { method: 'In-store', sales: '$356,643,750', share: 39.6, margin: '35.6%', color: 'bg-primary' },
  { method: 'Outlet', sales: '$295,585,493', share: 32.8, margin: '39.5%', color: 'bg-amber-500' },
  { method: 'Online', sales: '$247,672,882', share: 27.5, margin: '46.4%', color: 'bg-emerald-500' },
];

const channelProductTop10 = [
  { category: "Men's Street Footwear", method: 'In-store', profit: '$34,867,100' },
  { category: "Women's Apparel", method: 'In-store', profit: '$26,285,125' },
  { category: "Men's Street Footwear", method: 'Outlet', profit: '$24,977,139' },
  { category: "Men's Street Footwear", method: 'Online', profit: '$22,958,022' },
  { category: "Women's Apparel", method: 'Outlet', profit: '$21,522,246' },
  { category: "Women's Apparel", method: 'Online', profit: '$20,843,599' },
  { category: "Men's Athletic Footwear", method: 'In-store', profit: '$19,702,375' },
  { category: "Men's Apparel", method: 'In-store', profit: '$17,474,500' },
  { category: "Women's Street Footwear", method: 'Outlet', profit: '$16,690,954' },
  { category: "Men's Athletic Footwear", method: 'Outlet', profit: '$16,470,335' },
];

const regionalPerformance = [
  { region: 'West', sales: '$269,943,182', profit: '$89,609,407', margin: '33.2%', share: '30.0%' },
  { region: 'Northeast', sales: '$186,324,067', profit: '$68,020,588', margin: '36.5%', share: '20.7%' },
  { region: 'Southeast', sales: '$163,171,236', profit: '$60,555,417', margin: '37.1%', share: '18.1%' },
  { region: 'South', sales: '$144,663,181', profit: '$61,138,004', margin: '42.3%', share: '16.1%' },
  { region: 'Midwest', sales: '$135,800,459', profit: '$52,811,346', margin: '38.9%', share: '15.1%' },
];

const cityIntelligence = [
  { city: 'Charleston', sales: '$39,974,797', margin: '39.0%', status: 'HIGH_VOLUME' },
  { city: 'New York', sales: '$39,801,235', margin: '34.9%', status: 'HIGH_VOLUME' },
  { city: 'San Francisco', sales: '$34,539,220', margin: '29.7%', status: 'EXPENSIVE' },
  { city: 'Miami', sales: '$31,600,863', margin: '38.5%', status: 'HIGH_VOLUME' },
  { city: 'Portland', sales: '$30,545,652', margin: '35.2%', status: 'STABLE' },
  { city: 'Birmingham', sales: '$17,624,102', margin: '51.9%', status: 'HIDDEN_GEM' },
  { city: 'Knoxville', sales: '$12,410,230', margin: '47.0%', status: 'HIDDEN_GEM' },
  { city: 'Boise', sales: '$11,540,891', margin: '45.8%', status: 'HIDDEN_GEM' },
];

const retailerPerformance = [
  { retailer: 'West Gear', sales: '$242,964,333', aov: '$102,344', share: '27.0%' },
  { retailer: 'Foot Locker', sales: '$220,094,720', aov: '$83,464', share: '24.5%' },
  { retailer: 'Sports Direct', sales: '$182,470,997', aov: '$89,799', share: '20.3%' },
  { retailer: 'Kohl\'s', sales: '$102,114,753', aov: '$99,141', share: '11.3%' },
  { retailer: 'Amazon', sales: '$77,698,912', aov: '$81,875', share: '8.6%' },
  { retailer: 'Walmart', sales: '$74,558,410', aov: '$119,103', share: '8.3%' },
];

const monthlyRevenueTrend = [
  { month: 'January', rev2020: '$16,253,746', rev2021: '$55,225,396', yoy: '+239.7%' },
  { month: 'February', rev2020: '$14,997,988', rev2021: '$46,102,165', yoy: '+207.4%' },
  { month: 'March', rev2020: '$17,660,577', rev2021: '$39,148,532', yoy: '+121.7%' },
  { month: 'April', rev2020: '$24,607,006', rev2021: '$47,732,964', yoy: '+94.0%' },
  { month: 'May', rev2020: '$16,918,014', rev2021: '$63,589,681', yoy: '+275.9%' },
  { month: 'June', rev2020: '$8,829,819', rev2021: '$65,917,553', yoy: '+646.8%' },
  { month: 'July', rev2020: '$17,146,013', rev2021: '$78,334,681', yoy: '+356.8%' },
  { month: 'August', rev2020: '$19,877,980', rev2021: '$72,288,221', yoy: '+263.7%' },
  { month: 'September', rev2020: '$18,304,436', rev2021: '$59,357,023', yoy: '+224.3%' },
  { month: 'October', rev2020: '$10,836,269', rev2021: '$53,074,764', yoy: '+389.8%' },
  { month: 'November', rev2020: '$8,622,300', rev2021: '$59,235,040', yoy: '+587.2%' },
  { month: 'December', rev2020: '$8,026,527', rev2021: '$77,815,430', yoy: '+869.5%' },
];

const topSpikes = [
  { date: '2021-06-17', sales: '$10,239,903', change: '+8,955%', note: 'Promo Launch Spike' },
  { date: '2021-12-19', sales: '$3,859,805', change: '+7,217%', note: 'Holiday Peak' },
  { date: '2021-12-02', sales: '$4,579,102', change: '+3,241%', note: 'December Promo' },
  { date: '2021-07-05', sales: '$4,594,907', change: '+2,576%', note: 'July 4th Spike' },
  { date: '2021-11-03', sales: '$3,353,526', change: '+2,414%', note: 'Pre-Black Friday' },
];

const topDrops = [
  { date: '2021-12-18', sales: '$52,752', change: '-98.7%', note: 'Operational Closure' },
  { date: '2021-11-25', sales: '$102,264', change: '-97.4%', note: 'Thanksgiving Day' },
  { date: '2021-12-24', sales: '$190,885', change: '-96.8%', note: 'Christmas Eve' },
];

const womensComparison = [
  { category: "Women's Street Footwear", sales: "$128,002,813", profit: "$45,095,827", margin: "35.2%" },
  { category: "Women's Athletic Footwear", sales: "$106,631,896", profit: "$38,975,785", margin: "36.6%" },
];

const mensDeepDive = [
  { product: "Men's Street Footwear", sales: "$208,826,244", share: "43.1%" },
  { product: "Men's Athletic Footwear", sales: "$153,673,680", share: "31.7%" },
  { product: "Men's Apparel", sales: "$123,728,632", share: "25.5%" },
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
  <div className="flex items-center gap-2 mb-5">
    <Icon className="h-4 w-4 text-primary shrink-0" />
    <h3 className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground font-semibold leading-none">{label}</h3>
  </div>
);

// ─── Page Component ───────────────────────────────────────────────────

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
            <span>Retail Analytics</span>
            <span className="w-1 h-1 rounded-full bg-primary" />
            <span>Exploratory Data Analysis</span>
            <span className="w-1 h-1 rounded-full bg-primary" />
            <span>2020 - 2021</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif-display text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight text-foreground leading-[1.05] mb-6">
            Adidas U.S. Sales<br />Performance Analysis
          </h1>

          {/* Byline */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-6">
            <span className="font-medium text-foreground">Vutikuri Shanmukha</span>
            <span className="opacity-40">|</span>
            <span>Solo Build</span>
            <span className="opacity-40">|</span>
            <span>Python, Pandas, NumPy, Seaborn, Matplotlib, Power BI</span>
          </div>

          {/* Lede */}
          <p className="max-w-3xl mx-auto text-muted-foreground text-sm md:text-base leading-relaxed">
            A highly rigorous exploratory data analysis solving 15 structured business questions, mapping channel margins, tracking year-over-year revenue, and building rolling anomaly detection models to optimize physical and digital retail locations.
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
              { label: 'Total Revenue', value: '$899.9M', icon: DollarSign },
              { label: 'Operating Profit', value: '$332.1M', icon: DollarSign },
              { label: 'Profit Margin', value: '36.91%', icon: TrendingUp },
              { label: 'Transactions', value: '9,648', icon: Activity },
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

          {/* ── 1. BUSINESS CONTEXT ── */}
          <SectionHeading icon={Search} label="1. Business Context & Strategic Questions" />
          <div className="border-l-2 border-primary/30 pl-5 mb-8">
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground italic font-serif-display text-lg md:text-xl">
              "Adidas operates through multiple retail partners across the United States. This analysis was conducted to understand how sales performance varied across product categories, regions, retailers, and sales channels, and to identify where the company should focus investment to maximize profitability."
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Core Inquiries Handled</div>
              <ul className="space-y-2.5 text-xs text-muted-foreground leading-relaxed">
                <li>• <strong className="text-foreground font-semibold">Product & Region Drivers:</strong> Which categories and regional sectors are driving the highest revenue?</li>
                <li>• <strong className="text-foreground font-semibold">Channel Dynamics:</strong> Is the Online channel truly more profitable despite lower volume?</li>
                <li>• <strong className="text-foreground font-semibold">Seasonal Vectors:</strong> Where are the seasonal peaks and troughs, and are they predictable?</li>
                <li>• <strong className="text-foreground font-semibold">Retailer Value:</strong> Which retailers deliver the most value per transaction?</li>
                <li>• <strong className="text-foreground font-semibold">Margin Risk:</strong> Which product categories have the highest margin risk?</li>
              </ul>
            </div>
            
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Exploratory Scale Summary</div>
              <div className="space-y-2">
                {[
                  { m: 'Total Transactions', val: '9,648 records' },
                  { m: 'Unique Products', val: '6 major categories' },
                  { m: 'Unique Retailers', val: '6 strategic partners' },
                  { m: 'Unique Cities Covered', val: '52 retail hubs' },
                  { m: 'Date Range Scope', val: 'Jan 2020 – Dec 2021' },
                ].map((item) => (
                  <div key={item.m} className="flex justify-between items-center text-xs border-b-[0.5px] border-border/20 pb-1.5">
                    <span className="text-muted-foreground font-mono text-[10px]">{item.m}</span>
                    <span className="text-foreground font-semibold font-mono">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Divider />

          {/* ── 2. DATASET STRUCTURE & QUALITY ── */}
          <SectionHeading icon={Layers} label="2. Relational Schema & Data Quality" />
          <div className="border-[0.5px] border-border/85 bg-card/30 rounded-lg overflow-hidden mb-8">
            <div className="p-4 border-b-[0.5px] border-border/60 bg-muted/10">
              <h4 className="font-serif-display text-sm font-medium text-foreground">Relational Fact Table Mapping</h4>
              <p className="text-[10px] font-mono text-muted-foreground">Comprehensive transactional schema and field specifications</p>
            </div>
            <div className="overflow-x-auto max-h-[350px]">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b-[0.5px] border-border/60 bg-muted/20 text-[9px] font-mono uppercase tracking-widest text-muted-foreground sticky top-0 z-20">
                    <th className="py-2.5 px-4 bg-card/95">Column Name</th>
                    <th className="py-2.5 px-4 bg-card/95">Data Type</th>
                    <th className="py-2.5 px-4 bg-card/95">Column Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30 text-xs">
                  {datasetStructure.map((col) => (
                    <tr key={col.col} className="hover:bg-muted/10 transition-colors">
                      <td className="py-2 px-4 font-mono font-semibold text-primary">{col.col}</td>
                      <td className="py-2 px-4 font-mono text-muted-foreground text-[11px]">{col.type}</td>
                      <td className="py-2 px-4 text-muted-foreground">{col.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5 mb-8">
            <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Data Quality Assessment</div>
            <ul className="grid md:grid-cols-2 gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <li>• <strong className="text-foreground font-semibold">Zero Nulls:</strong> Zero null values remained after initial pipeline staging.</li>
              <li>• <strong className="text-foreground font-semibold">Datetime Parsing:</strong> Invoice Date coerced cleanly with zero date corruptions.</li>
              <li>• <strong className="text-foreground font-semibold">Float Conversion:</strong> Numeric columns converted cleanly with no precision loss.</li>
              <li>• <strong className="text-foreground font-semibold">Calculated Fields:</strong> Product Category cleanly derived from Product string sets.</li>
              <li>• <strong className="text-foreground font-semibold">Zero Duplicates:</strong> Transactional duplicates completely eliminated.</li>
              <li>• <strong className="text-foreground font-semibold">Logical Constraints:</strong> Operating Margin range (0.27 to 0.50) is realistic.</li>
            </ul>
          </div>

          <Divider />

          {/* ── 3. FINDING 1: PRODUCT BREAKDOWN ── */}
          <SectionHeading icon={BarChart3} label="3. Product Category Revenue Breakdown" />
          
          <div className="border-[0.5px] border-border/85 bg-card/30 rounded-lg overflow-hidden mb-8">
            <div className="p-4 border-b-[0.5px] border-border/60 bg-muted/10">
              <h4 className="font-serif-display text-sm font-medium text-foreground">Sectorial Performance Matrix</h4>
              <p className="text-[10px] font-mono text-muted-foreground">Comparative product breakdown by sales share, margin, and velocity</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b-[0.5px] border-border/60 bg-muted/20 text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                    <th className="py-2.5 px-4">Category Name</th>
                    <th className="py-2.5 px-4 text-right">Total Revenue</th>
                    <th className="py-2.5 px-4 text-right">Revenue Share</th>
                    <th className="py-2.5 px-4 text-right">Avg Operating Margin</th>
                    <th className="py-2.5 px-4 text-right">Avg Units Sold / Day</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30 text-xs">
                  {categoryRevenue.map((c) => (
                    <tr key={c.name} className="hover:bg-muted/10 transition-colors">
                      <td className="py-2.5 px-4 font-medium text-foreground">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground font-mono">#{c.rank}</span>
                          {c.name}
                        </div>
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono font-semibold text-foreground">{c.sales}</td>
                      <td className="py-2.5 px-4 text-right font-mono text-muted-foreground">{c.share}</td>
                      <td className="py-2.5 px-4 text-right font-mono text-primary font-bold">{c.margin}</td>
                      <td className="py-2.5 px-4 text-right font-mono text-muted-foreground">{c.units}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Street Footwear Dominance</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground font-semibold">Men's Street Footwear</strong> is the ultimate double-winner of the portfolio. It commands the highest total sales volume (<span className="text-foreground font-semibold">$208.8M / 23.2% share</span>) and simultaneously posts the highest operating margin (<span className="text-foreground font-semibold">44.6%</span>) and daily units velocity (<span className="text-foreground font-semibold">1,630 units/day</span>).
              </p>
            </div>
            
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Margin spreads</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The spread between the highest and lowest margin is only <span className="text-foreground font-semibold">4.3 percentage points</span>, indicating healthy pricing discipline. However, at $900M scale, even a 1% margin difference translates to <span className="text-foreground font-semibold">~$9M in annual profit impact</span>, emphasizing category-mix optimizations.
              </p>
            </div>
          </div>

          <Divider />

          {/* ── 4. FINDING 2: SALES CHANNEL ── */}
          <SectionHeading icon={ShoppingBag} label="4. Sales Method & Channel Analytics" />
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 mb-8">
            {/* Visual Bar chart panel */}
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-4 font-semibold">Operating Margin by Sales Channel</div>
              <div className="space-y-4">
                {channelData.map((d) => (
                  <div key={d.method} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-foreground font-semibold">{d.method} ({d.share}%)</span>
                      <span className="font-mono text-primary font-bold">{d.margin} Margin</span>
                    </div>
                    <div className="h-3 bg-background/60 border-[0.5px] border-border/30 rounded-sm overflow-hidden">
                      <div className={cn('h-full rounded-sm', d.color)} style={{ width: `${d.share * 2}%` }} />
                    </div>
                    <div className="flex justify-between text-[9px] text-muted-foreground font-mono">
                      <span>Volume: {d.sales}</span>
                      <span>Target: {parseFloat(d.margin) >= 40 ? 'EXCEPTIONAL' : 'STANDARD'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Commentary */}
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5 flex flex-col justify-between">
              <div>
                <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">The Counterintuitive Channel Paradox</div>
                <div className="space-y-3.5 text-xs text-muted-foreground leading-relaxed">
                  <p>
                    <span className="text-foreground font-semibold">Online sales</span> represent the smallest volume share (27.5%), yet command an outstanding <strong className="text-emerald-500 font-bold">46.4% profit margin</strong> due to minimal overhead.
                  </p>
                  <p>
                    <span className="text-foreground font-semibold">Online vs In-store Gap:</span> Online delivers a staggering <span className="text-foreground font-semibold">10.8 percentage point margin premium</span> over In-store. Shifting volume to this direct digital channel yields immediate bottom-line returns.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t-[0.5px] border-border/40 text-[9px] font-mono text-muted-foreground/80">
                FORMULA: <span className="text-foreground font-semibold">Operating Profit / Total Sales</span>
              </div>
            </div>
          </div>

          {/* Top 10 Product x Channel Profit table */}
          <div className="border-[0.5px] border-border/85 bg-card/30 rounded-lg overflow-hidden mb-8">
            <div className="p-4 border-b-[0.5px] border-border/60 bg-muted/10">
              <h4 className="font-serif-display text-sm font-medium text-foreground">Top 10 Product × Channel Profit Drivers</h4>
              <p className="text-[10px] font-mono text-muted-foreground">Specific channel and category intersections driving the highest gross profit</p>
            </div>
            <div className="overflow-x-auto max-h-[300px]">
              <table className="w-full text-left border-collapse min-w-[650px]">
                <thead>
                  <tr className="border-b-[0.5px] border-border/60 bg-muted/20 text-[9px] font-mono uppercase tracking-widest text-muted-foreground sticky top-0 z-20">
                    <th className="py-2 px-4 bg-card/95">Product Category</th>
                    <th className="py-2 px-4 bg-card/95">Sales Method</th>
                    <th className="py-2 px-4 text-right bg-card/95">Operating Profit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30 text-xs font-mono">
                  {channelProductTop10.map((d, idx) => (
                    <tr key={`${d.category}-${d.method}-${idx}`} className="hover:bg-muted/10 transition-colors">
                      <td className="py-2 px-4 font-serif-display font-semibold text-foreground">{d.category}</td>
                      <td className="py-2 px-4 text-muted-foreground">{d.method}</td>
                      <td className="py-2 px-4 text-right text-primary font-bold">{d.profit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Divider />

          {/* ── 5. REGIONAL PERFORMANCE ── */}
          <SectionHeading icon={MapPin} label="5. Geographic Intelligence & City Outliers" />
          <div className="border-[0.5px] border-border/85 bg-card/30 rounded-lg overflow-hidden mb-8">
            <div className="p-4 border-b-[0.5px] border-border/60 bg-muted/10">
              <h4 className="font-serif-display text-sm font-medium text-foreground">US Regional Sales Splits</h4>
              <p className="text-[10px] font-mono text-muted-foreground">Geographic distribution of sales share, profit, and margin efficiency</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b-[0.5px] border-border/60 bg-muted/20 text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                    <th className="py-2.5 px-4">Region Name</th>
                    <th className="py-2.5 px-4 text-right">Total Revenue</th>
                    <th className="py-2.5 px-4 text-right">Operating Profit</th>
                    <th className="py-2.5 px-4 text-right">Profit Margin</th>
                    <th className="py-2.5 px-4 text-right">Revenue share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30 text-xs font-mono">
                  {regionalPerformance.map((r) => (
                    <tr key={r.region} className="hover:bg-muted/10 transition-colors">
                      <td className="py-2.5 px-4 font-serif-display font-bold text-foreground">{r.region}</td>
                      <td className="py-2.5 px-4 text-right text-muted-foreground">{r.sales}</td>
                      <td className="py-2.5 px-4 text-right text-muted-foreground">{r.profit}</td>
                      <td className="py-2.5 px-4 text-right text-primary font-bold">{r.margin}</td>
                      <td className="py-2.5 px-4 text-right text-muted-foreground">{r.share}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold font-bold">The West vs South Tension</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The <strong className="text-foreground font-semibold">West is the revenue king but the margin laggard</strong> (30% revenue share, 33.2% margin). Conversely, the <strong className="text-foreground font-semibold">South</strong> delivers a staggering <strong className="text-primary font-bold">42.3% operating margin</strong> (highest in the country) but holds only a 16.1% revenue share. Increasing expansion budgets in the South region will optimize bottom-line returns.
              </p>
            </div>

            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold font-bold">High-Margin Cities</div>
              <div className="space-y-2">
                {cityIntelligence.map((c) => (
                  <div key={c.city} className="flex justify-between items-center text-xs border-b-[0.5px] border-border/20 pb-1.5 last:border-0">
                    <span className="font-serif-display text-foreground font-bold">{c.city}</span>
                    <div className="flex gap-4 font-mono">
                      <span>Sales: <span className="text-muted-foreground font-semibold">{c.sales}</span></span>
                      <span>Margin: <span className="text-primary font-semibold">{c.margin}</span></span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[9px] text-muted-foreground/80 leading-relaxed mt-4 italic">
                • Note: Birmingham stands out as a high-margin gem at 51.9% operating margin, while San Francisco remains expensive to operate in at 29.7% margin.
              </p>
            </div>
          </div>

          <Divider />

          {/* ── 6. RETAILER PERFORMANCE ── */}
          <SectionHeading icon={Building2} label="6. Retailer Concentration & Order Values" />
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 mb-8">
            <div className="border-[0.5px] border-border/85 bg-card/30 rounded-lg overflow-hidden">
              <div className="p-4 border-b-[0.5px] border-border/60 bg-muted/10">
                <h4 className="font-serif-display text-xs font-medium text-foreground">Retail Franchise Breakdown</h4>
                <p className="text-[10px] font-mono text-muted-foreground">Volume concentration and Average Order Value (AOV)</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-mono">
                  <thead>
                    <tr className="border-b-[0.5px] border-border/60 bg-muted/20 text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                      <th className="py-2 px-3">Retailer Partner</th>
                      <th className="py-2 px-3 text-right">Total Sales</th>
                      <th className="py-2 px-3 text-right">Avg Order Value</th>
                      <th className="py-2 px-3 text-right">Share</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {retailerPerformance.map((rp) => (
                      <tr key={rp.retailer} className="hover:bg-muted/10 transition-colors">
                        <td className="py-2 px-3 font-serif-display font-bold text-foreground">{rp.retailer}</td>
                        <td className="py-2 px-3 text-right text-muted-foreground">{rp.sales}</td>
                        <td className="py-2 px-3 text-right text-primary font-bold">{rp.aov}</td>
                        <td className="py-2 px-3 text-right text-muted-foreground">{rp.share}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
                <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground font-semibold mb-3">Concentration Risks</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The top three retailer partners (<span className="text-foreground font-semibold">West Gear, Foot Locker, Sports Direct</span>) account for a massive <strong className="text-foreground font-semibold">72% of total revenue</strong>. This represents a heavy corporate dependency. Diversifying channels and pushing direct direct-to-consumer Online sales mitigates this concentration risk.
                </p>
              </div>

              <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
                <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground font-semibold mb-3">Walmart Bulk Ordering</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  While <strong className="text-foreground font-semibold">Walmart</strong> has lower aggregate sales contribution ($74.5M), it boasts the highest Average Order Value (<span className="text-foreground font-semibold">$119,103</span>), indicating bulk inventory-loading characteristics.
                </p>
              </div>
            </div>
          </div>

          <Divider />

          {/* ── 7. TEMPORAL TRENDS ── */}
          <SectionHeading icon={Calendar} label="7. Temporal Trends & YoY Recovery Growth" />
          
          <div className="border-[0.5px] border-border/85 bg-card/30 rounded-lg overflow-hidden mb-8">
            <div className="p-4 border-b-[0.5px] border-border/60 bg-muted/10">
              <h4 className="font-serif-display text-sm font-medium text-foreground">Monthly Sales & Growth Tracking</h4>
              <p className="text-[10px] font-mono text-muted-foreground">Side-by-side temporal metrics across the 24-month horizon</p>
            </div>
            <div className="overflow-x-auto max-h-[350px]">
              <table className="w-full text-left border-collapse min-w-[700px] text-xs font-mono">
                <thead>
                  <tr className="border-b-[0.5px] border-border/60 bg-muted/20 text-[9px] font-mono uppercase tracking-widest text-muted-foreground sticky top-0 z-20">
                    <th className="py-2.5 px-4 bg-card/95">Reporting Month</th>
                    <th className="py-2.5 px-4 text-right bg-card/95">2020 Sales Volume</th>
                    <th className="py-2.5 px-4 text-right bg-card/95">2021 Sales Volume</th>
                    <th className="py-2.5 px-4 text-right bg-card/95">YoY Revenue Growth</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {monthlyRevenueTrend.map((m) => (
                    <tr key={m.month} className="hover:bg-muted/10 transition-colors">
                      <td className="py-2 px-4 font-serif-display font-bold text-foreground">{m.month}</td>
                      <td className="py-2 px-4 text-right text-muted-foreground">{m.rev2020}</td>
                      <td className="py-2 px-4 text-right text-foreground font-semibold">{m.rev2021}</td>
                      <td className="py-2 px-4 text-right text-emerald-600 dark:text-emerald-400 font-bold">{m.yoy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-[0.5px] border-primary/20 bg-primary/5 rounded-lg p-5 mb-8">
            <h4 className="font-serif-display text-base text-foreground font-semibold mb-2">Year-over-Year Growth: +294.2%</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              2021 sales volume (<span className="text-foreground font-semibold">$717,821,450</span>) completely outstripped 2020 revenue (<span className="text-foreground font-semibold">$182,080,675</span>). This sharp expansion represents a post-COVID rebound from retail disruptions in 2020, showing peak surges in Summer (July 2021: $78.3M) and Holidays (December 2021: $77.8M).
            </p>
          </div>

          <Divider />

          {/* ── 8. ANOMALY DETECTION ── */}
          <SectionHeading icon={ShieldAlert} label="8. Rolling Anomaly Detection Analytics" />
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            
            {/* Spikes Card */}
            <div className="border-[0.5px] border-emerald-500/20 bg-emerald-500/5 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold mb-3">Top Sales Daily Spikes</div>
              <div className="space-y-3">
                {topSpikes.map((s) => (
                  <div key={s.date} className="flex justify-between items-center text-xs border-b-[0.5px] border-emerald-500/10 pb-1.5 last:border-0 last:pb-0">
                    <div>
                      <span className="font-mono text-foreground font-semibold">{s.date}</span>
                      <div className="text-[9px] text-muted-foreground font-mono">{s.note}</div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-foreground font-semibold">{s.sales}</div>
                      <div className="text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">{s.change}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Drops Card */}
            <div className="border-[0.5px] border-rose-500/20 bg-rose-500/5 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-rose-600 dark:text-rose-400 font-bold mb-3">Top Sales Daily Drops</div>
              <div className="space-y-3">
                {topDrops.map((d) => (
                  <div key={d.date} className="flex justify-between items-center text-xs border-b-[0.5px] border-rose-500/10 pb-1.5 last:border-0 last:pb-0">
                    <div>
                      <span className="font-mono text-foreground font-semibold">{d.date}</span>
                      <div className="text-[9px] text-muted-foreground font-mono">{d.note}</div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-foreground font-semibold">{d.sales}</div>
                      <div className="text-rose-600 dark:text-rose-400 text-[10px] font-bold">{d.change}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed mb-8 italic">
            • Insight: June 17, 2021 shows the most anomalous spike (+8,955%), driven by promotional campaign launches. Conversely, near-zero drops coincide with national holiday operational closures (e.g. Thanksgiving and Christmas).
          </p>

          <Divider />

          {/* ── 9. GENDER & CATEGORY DEEP DIVES ── */}
          <SectionHeading icon={Layers} label="9. Footwear Segmentation Deep Dives" />
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            
            {/* Women's Footwear Comparison */}
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground font-semibold mb-3">Women's Footwear Breakdown</div>
              <div className="space-y-4">
                {womensComparison.map((w) => (
                  <div key={w.category} className="border-b-[0.5px] border-border/20 pb-3 last:border-0 last:pb-0">
                    <div className="font-serif-display text-sm font-semibold text-foreground mb-1">{w.category}</div>
                    <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                      <div>
                        <span className="text-[9px] text-muted-foreground/60 block">Sales Volume</span>
                        <span className="text-foreground font-medium">{w.sales}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-muted-foreground/60 block">Operating Profit</span>
                        <span className="text-foreground font-medium">{w.profit}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-muted-foreground/60 block">Profit Margin</span>
                        <span className="text-primary font-bold">{w.margin}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Men's Footwear Deep Dive */}
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground font-semibold mb-3">Men's Apparel & Footwear Splits</div>
              <div className="space-y-4">
                {mensDeepDive.map((m) => (
                  <div key={m.product} className="flex justify-between items-center text-xs border-b-[0.5px] border-border/20 pb-2 last:border-0 last:pb-0">
                    <div>
                      <span className="font-serif-display text-foreground font-bold">{m.product}</span>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-foreground font-semibold">{m.sales}</div>
                      <div className="text-primary text-[10px] font-bold">{m.share} share</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Divider />

          {/* ── 10. KEY INSIGHTS ── */}
          <SectionHeading icon={BookOpen} label="10. Strategic Insights Summarized" />
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5 space-y-4">
              <div className="text-[9px] font-mono uppercase tracking-widest text-primary font-bold">Key Insight Observations (1-4)</div>
              <div className="text-xs text-muted-foreground leading-relaxed space-y-3.5">
                <p>
                  <strong className="text-foreground font-semibold">1. Men's Street Footwear is the Crown Jewel:</strong> Delivers the highest revenue ($208.8M), highest margin (44.6%), and fastest inventory velocity (1,630 units sold/day).
                </p>
                <p>
                  <strong className="text-foreground font-semibold">2. Online Direct Premium:</strong> At 46.4% margin vs 35.6% In-store, direct-to-consumer Online sales generate disproportionately high quality profits.
                </p>
                <p>
                  <strong className="text-foreground font-semibold">3. Southern Efficiency:</strong> The South holds only a 16.1% sales share but produces a 42.3% operating margin. Rebalancing regional budgets toward the South will maximize profits.
                </p>
                <p>
                  <strong className="text-foreground font-semibold">4. COVID Baseline Distortion:</strong> The 294.2% YoY growth rate represents a swift post-pandemic recovery rather than standard recurring growth patterns.
                </p>
              </div>
            </div>

            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5 space-y-4">
              <div className="text-[9px] font-mono uppercase tracking-widest text-primary font-bold">Key Insight Observations (5-8)</div>
              <div className="text-xs text-muted-foreground leading-relaxed space-y-3.5">
                <p>
                  <strong className="text-foreground font-semibold">5. Retail Concentration Risk:</strong> 72% of total sales volume depends heavily on three key retail franchises, making DTC channels a crucial strategic hedge.
                </p>
                <p>
                  <strong className="text-foreground font-semibold">6. Seasonal Profit Engines:</strong> Twin yearly demand peaks occur in Summer (July: $78.3M) and Holidays (December: $77.8M).
                </p>
                <p>
                  <strong className="text-foreground font-semibold">7. Hidden High-Margin Gems:</strong> Cities like Birmingham (51.9% margin) and Knoxville (47.0% margin) exhibit extremely favorable local cost profiles.
                </p>
                <p>
                  <strong className="text-foreground font-semibold">8. Men's Athletic Shoes Optimization:</strong> Posting a low 40.3% margin, this high-volume footwear category requires immediate cost restructuring.
                </p>
              </div>
            </div>
          </div>

          <Divider />

          {/* ── 11. RECOMMENDATIONS ── */}
          <SectionHeading icon={Award} label="11. Executive Action Recommendations" />
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold font-bold">R1 - R2: Channel & Supply</div>
              <ul className="space-y-3 text-xs text-muted-foreground leading-relaxed">
                <li>• <strong className="text-foreground font-semibold">Accelerate Online Channels:</strong> Target growing direct Online sales to 35% of total mix within two years to capture the +10.8% margin premium.</li>
                <li>• <strong className="text-foreground font-semibold">Protect Street Footwear:</strong> Prioritize supplier allocation and safety stock for Men's Street Footwear ($208.8M).</li>
              </ul>
            </div>

            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold font-bold">R3 - R4: Geography & Promos</div>
              <ul className="space-y-3 text-xs text-muted-foreground leading-relaxed">
                <li>• <strong className="text-foreground font-semibold">South Region Expansion:</strong> Direct marketing and distribution budgets toward high-performing Southern cities (Houston, Dallas, Miami) to leverage the 42.3% margin benchmark.</li>
                <li>• <strong className="text-foreground font-semibold">Plan Campaign Calendar:</strong> Structure repeatable product launch calendars around isolated seasonal peak dates.</li>
              </ul>
            </div>

            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold font-bold">R5 - R7: Pricing & Inventory</div>
              <ul className="space-y-3 text-xs text-muted-semibold leading-relaxed">
                <li>• <strong className="text-foreground font-semibold">Men's Athletic Restructuring:</strong> Review manufacturing costs and push higher direct-to-consumer mix for Men's Athletic Footwear to elevate its 40.3% margin.</li>
                <li>• <strong className="text-foreground font-semibold">Walmart/Kohl's AOV:</strong> Capture wholesale bulk growth via high AOV accounts ($119K AOV Walmart).</li>
                <li>• <strong className="text-foreground font-semibold">Seasonal Stock Model:</strong> Front-load inventory to prevent stockouts in July and December.</li>
              </ul>
            </div>
          </div>

          <Divider />

          {/* ── 12. METHODOLOGY & TECH ── */}
          <SectionHeading icon={Activity} label="12. Technical Methodology & Staging" />
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Data Cleaning & Pipelines</div>
              <ul className="space-y-1.5 text-xs text-muted-foreground leading-relaxed">
                <li>• <strong className="text-foreground font-semibold">Whitespace Stripping:</strong> Column labels stripped of empty trailing bytes.</li>
                <li>• <strong className="text-foreground font-semibold">Datetime Parsing:</strong> `pd.to_datetime()` coerced to timestamp indexes.</li>
                <li>• <strong className="text-foreground font-semibold">Numeric Coercion:</strong> Stripped currency characters ($) and cast to Float64 format.</li>
                <li>• <strong className="text-foreground font-semibold">String Derivations:</strong> Derived Product Category column from text data.</li>
                <li>• <strong className="text-foreground font-semibold">Imputations:</strong> Managed and backfilled missing category tags.</li>
              </ul>
            </div>
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5 flex flex-col justify-between">
              <div>
                <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Analytics Stack</div>
                <div className="flex flex-wrap gap-1.5">
                  {['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'OpenPyXL', 'Excel', 'Power BI'].map((lib) => (
                    <span key={lib} className="rounded px-2.5 py-0.5 border-[0.5px] border-border bg-background text-[10px] font-mono text-muted-foreground">
                      {lib}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t-[0.5px] border-border/40 text-[10px] text-muted-foreground leading-relaxed">
                Aggregations were built across six dimensions using rolling 30-day window standard deviations (2σ threshold) to trace sales spikes, drops, and discount elasticities.
              </div>
            </div>
          </div>

          <Divider />

          {/* ── 13. METRICS REFERENCE CARD ── */}
          <SectionHeading icon={BookOpen} label="13. Key Metrics Reference Card" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 mb-8">
            {[
              { title: 'Revenue', val: '$899,902,125' },
              { title: 'Operating Profit', val: '$332,134,761' },
              { title: 'Profit Margin', val: '36.91%' },
              { title: 'YoY Growth', val: '+294.2%' },
              { title: 'Top Category', val: "Men's Streetwear" },
            ].map((metric) => (
              <div key={metric.title} className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-4 text-center">
                <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-1">{metric.title}</div>
                <div className="text-sm font-serif-display text-primary font-bold">{metric.val}</div>
              </div>
            ))}
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
