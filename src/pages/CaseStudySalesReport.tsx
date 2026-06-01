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
  ShieldAlert,
  Search,
  BookOpen,
  Layers,
  Activity,
  Users,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── Static Data ──────────────────────────────────────────────────────

const datasetStructure = [
  { col: 'EmployeeID', type: 'Integer', desc: 'Unique identifier for each employee' },
  { col: 'Attrition', type: 'Text', desc: 'Voluntary departure status (Yes or No)' },
  { col: 'Age', type: 'Integer', desc: 'Employee age' },
  { col: 'Gender', type: 'Text', desc: 'Employee gender' },
  { col: 'Department', type: 'Text', desc: 'Department of employment (Sales, R&D, HR)' },
  { col: 'JobRole', type: 'Text', desc: 'Specific job role (Sales Rep, Lab Tech, etc.)' },
  { col: 'BusinessTravel', type: 'Text', desc: 'Business travel frequency' },
  { col: 'OverTime', type: 'Text', desc: 'Overtime hours status (Yes or No)' },
  { col: 'MonthlyIncome', type: 'Float', desc: 'Gross monthly earnings ($)' },
  { col: 'JobSatisfaction', type: 'Integer', desc: 'Job satisfaction rating (1 to 4)' },
  { col: 'WorkLifeBalance', type: 'Integer', desc: 'Work-life balance rating (1 to 4)' },
  { col: 'YearsAtCompany', type: 'Integer', desc: 'Number of years at the company' },
  { col: 'YearsInCurrentRole', type: 'Integer', desc: 'Years in the current specific job role' },
  { col: 'YearsSinceLastPromotion', type: 'Integer', desc: 'Years since last career promotion' },
];

const overtimeAttrition = [
  { ot: 'Overtime Assigned (Yes)', count: '416 FTE', attrition: '30.5%', color: 'bg-primary' },
  { ot: 'No Overtime (No)', count: '1,054 FTE', attrition: '10.4%', color: 'bg-emerald-500' },
];

const travelAttrition = [
  { travel: 'Travels Frequently', attrition: '24.9%', rate: 'HIGH_RISK' },
  { travel: 'Travels Rarely', attrition: '15.0%', rate: 'AVERAGE' },
  { travel: 'Non-Traveler', attrition: '8.0%', rate: 'LOW_RISK' },
];

const departmentRisk = [
  { dpt: 'Sales', headcount: '446 FTE', departures: '92', rate: '20.6%', color: 'bg-amber-500' },
  { dpt: 'Human Resources', headcount: '63 FTE', departures: '12', rate: '19.0%', color: 'bg-rose-500' },
  { dpt: 'Research & Development', headcount: '961 FTE', departures: '133', rate: '13.8%', color: 'bg-emerald-500' },
];

const roleRisk = [
  { role: 'Sales Representative', attrition: '39.8%', risk: 'CRITICAL' },
  { role: 'Laboratory Technician', attrition: '23.9%', risk: 'HIGH' },
  { role: 'Human Resources Specialist', attrition: '23.1%', risk: 'HIGH' },
  { role: 'Sales Executive', attrition: '17.5%', risk: 'MODERATE' },
  { role: 'Research Scientist', attrition: '16.1%', risk: 'MODERATE' },
];

const incomeTiers = [
  { tier: '< $3,000 / month', rate: '29.7%', count: '293 FTE', color: 'bg-primary' },
  { tier: '$3,000 – $5,000 / month', rate: '17.2%', count: '368 FTE', color: 'bg-amber-500' },
  { tier: '$5,000 – $10,000 / month', rate: '9.8%', count: '512 FTE', color: 'bg-emerald-500' },
  { tier: '> $10,000 / month', rate: '4.3%', count: '297 FTE', color: 'bg-emerald-600' },
];

const satisfactionLevels = [
  { level: '1 - Low Satisfaction', rate: '22.8%' },
  { level: '2 - Medium Satisfaction', rate: '16.4%' },
  { level: '3 - High Satisfaction', rate: '15.1%' },
  { level: '4 - Very High Satisfaction', rate: '11.3%' },
];

const tenureAttrition = [
  { tenure: '0 – 1 Year (New Hires)', rate: '35.5%', volume: '84 FTE' },
  { tenure: '1 – 2 Years', rate: '23.2%', volume: '55 FTE' },
  { tenure: '2 – 5 Years', rate: '12.0%', volume: '62 FTE' },
  { tenure: '5 – 10 Years', rate: '8.5%', volume: '27 FTE' },
  { tenure: '10+ Years (Tenured)', rate: '4.8%', volume: '9 FTE' },
];

const dimensionTables = [
  { name: 'Dim_Employee', fields: 'EmployeeKey, EmployeeID, Age, Gender, Education, MaritalStatus' },
  { name: 'Dim_JobProfile', fields: 'JobProfileKey, Department, JobRole, JobLevel, JobSatisfaction' },
  { name: 'Dim_Compensation', fields: 'CompensationKey, MonthlyIncome, HourlyRate, StockOptionLevel' },
  { name: 'Dim_Evaluation', fields: 'EvaluationKey, PerformanceRating, WorkLifeBalance, TrainingTimesLastYear' },
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
            <span>People Analytics</span>
            <span className="w-1 h-1 rounded-full bg-primary" />
            <span>HR Business Intelligence</span>
            <span className="w-1 h-1 rounded-full bg-primary" />
            <span>Workforce Optimization</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif-display text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight text-foreground leading-[1.05] mb-6">
            HR Employee Retention &<br />Workforce Optimization
          </h1>

          {/* Byline */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-6">
            <span className="font-medium text-foreground">Vutikuri Shanmukha</span>
            <span className="opacity-40">|</span>
            <span>Solo Build</span>
            <span className="opacity-40">|</span>
            <span>Power BI, Power Query, DAX, Star Schema Data Modeling</span>
          </div>

          {/* Lede */}
          <p className="max-w-3xl mx-auto text-muted-foreground text-sm md:text-base leading-relaxed">
            A comprehensive Power BI business intelligence suite analyzing voluntary employee attrition across 1,470 personnel records, establishing a high-performance Star-Schema data warehouse to identify turnover drivers and formulate targeted retention strategies.
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
              { label: 'Workforce Size', value: '1,470 FTEs', icon: Users },
              { label: 'Attrition Rate', value: '16.1%', icon: ShieldAlert },
              { label: 'Departures Mapped', value: '237 employees', icon: Activity },
              { label: 'Avg Monthly Income', value: '$6,503', icon: DollarSign },
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
          <SectionHeading icon={Search} label="1. Problem Statement & Business Context" />
          <div className="border-l-2 border-primary/30 pl-5 mb-8">
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground italic font-serif-display text-lg md:text-xl">
              "Voluntary employee turnover imposes massive replacement costs, dampens team morale, and drains institutional knowledge. HR leadership faced high attrition rates (16.1%) but lacked a unified, analytical view of what specific factors, such as overtime, role characteristics, and compensation structures, were driving employee departures."
            </p>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground mb-8">
            This project engineered an end-to-end People Analytics business intelligence solution using Power BI. By creating a fully normalized Star-Schema database model and writing custom DAX metrics, the dashboard exposes high-risk attrition clusters, quantifies turnover correlations, and equips leadership with data-driven retention plays.
          </p>

          <Divider />

          {/* ── 2. DATASET STRUCTURE ── */}
          <SectionHeading icon={Layers} label="2. Fact Table & Data Quality Schema" />
          <div className="border-[0.5px] border-border/85 bg-card/30 rounded-lg overflow-hidden mb-8">
            <div className="p-4 border-b-[0.5px] border-border/60 bg-muted/10">
              <h4 className="font-serif-display text-sm font-medium text-foreground">Workforce Fact Table Mapping</h4>
              <p className="text-[10px] font-mono text-muted-foreground">Detailed schema of employee metrics and transactional dimensions</p>
            </div>
            <div className="overflow-x-auto max-h-[350px]">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b-[0.5px] border-border/60 bg-muted/20 text-[9px] font-mono uppercase tracking-widest text-muted-foreground sticky top-0 z-20">
                    <th className="py-2.5 px-4 bg-card/95">Column Name</th>
                    <th className="py-2.5 px-4 bg-card/95">Data Type</th>
                    <th className="py-2.5 px-4 bg-card/95">Field Description</th>
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

          <Divider />

          {/* ── 3. OVERTIME & TRAVEL CORRELATIONS ── */}
          <SectionHeading icon={TrendingUp} label="3. Overtime & Business Travel Correlations" />
          
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 mb-8">
            {/* Visual Bar chart panel */}
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-4 font-semibold">Attrition Rate by Overtime Status</div>
              <div className="space-y-4">
                {overtimeAttrition.map((d) => (
                  <div key={d.ot} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-foreground font-semibold">{d.ot}</span>
                      <span className="font-mono text-primary font-bold">{d.attrition} Attrition</span>
                    </div>
                    <div className="h-3 bg-background/60 border-[0.5px] border-border/30 rounded-sm overflow-hidden">
                      <div className={cn('h-full rounded-sm', d.color)} style={{ width: parseFloat(d.attrition) * 2.5 + '%' }} />
                    </div>
                    <div className="flex justify-between text-[9px] text-muted-foreground font-mono">
                      <span>Volume: {d.count}</span>
                      <span>Risk: {parseFloat(d.attrition) >= 20 ? 'CRITICAL RISK' : 'LOW RISK'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Commentary */}
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5 flex flex-col justify-between">
              <div>
                <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">The Overtime Burnout Driver</div>
                <div className="space-y-3.5 text-xs text-muted-foreground leading-relaxed">
                  <p>
                    <span className="text-foreground font-semibold">Overtime Burnout:</span> Employees working overtime exhibit an alarmingly high voluntary attrition rate of <strong className="text-primary font-bold">30.5%</strong>. This is nearly three times the rate of non-overtime employees (10.4%).
                  </p>
                  <p>
                    <span className="text-foreground font-semibold">Business Travel Vector:</span> Frequent business travelers show a high attrition rate of <span className="text-foreground font-semibold">24.9%</span>, compared to 15.0% for rare travelers and just 8.0% for non-travelers.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t-[0.5px] border-border/40 text-[9px] font-mono text-muted-foreground/80">
                ATTRITION AT OVERTIME: <span className="text-foreground font-semibold">30.5% vs 10.4%</span>
              </div>
            </div>
          </div>

          {/* Travel Attrition Table */}
          <div className="border-[0.5px] border-border/85 bg-card/30 rounded-lg overflow-hidden mb-8">
            <div className="p-4 border-b-[0.5px] border-border/60 bg-muted/10">
              <h4 className="font-serif-display text-sm font-medium text-foreground">Travel Frequency Attrition Rates</h4>
              <p className="text-[10px] font-mono text-muted-foreground">Attrition breakdown based on job travel requirements</p>
            </div>
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b-[0.5px] border-border/60 bg-muted/20 text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                  <th className="py-2.5 px-4">Business Travel Frequency</th>
                  <th className="py-2.5 px-4 text-right">Attrition Rate</th>
                  <th className="py-2.5 px-4 text-right">Risk Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {travelAttrition.map((t) => (
                  <tr key={t.travel} className="hover:bg-muted/10 transition-colors">
                    <td className="py-2.5 px-4 font-serif-display font-semibold text-foreground">{t.travel}</td>
                    <td className="py-2.5 px-4 text-right font-bold text-primary">{t.attrition}</td>
                    <td className="py-2.5 px-4 text-right text-muted-foreground">{t.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Divider />

          {/* ── 4. DEPARTMENT & ROLE RISK ── */}
          <SectionHeading icon={Users} label="4. Department & Role Risk Profiles" />
          
          <div className="border-[0.5px] border-border/85 bg-card/30 rounded-lg overflow-hidden mb-8">
            <div className="p-4 border-b-[0.5px] border-border/60 bg-muted/10">
              <h4 className="font-serif-display text-sm font-medium text-foreground">Departmental Turnover Splits</h4>
              <p className="text-[10px] font-mono text-muted-foreground">Attrition rates and departures across corporate departments</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b-[0.5px] border-border/60 bg-muted/20 text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                    <th className="py-2.5 px-4">Department</th>
                    <th className="py-2.5 px-4 text-right">Active Headcount</th>
                    <th className="py-2.5 px-4 text-right">Total Departures</th>
                    <th className="py-2.5 px-4 text-right">Operating Attrition Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30 text-xs font-mono">
                  {departmentRisk.map((d) => (
                    <tr key={d.dpt} className="hover:bg-muted/10 transition-colors">
                      <td className="py-2.5 px-4 font-serif-display font-bold text-foreground">
                        <div className="flex items-center gap-2">
                          <span className={cn('w-2 h-2 rounded-full', d.color)} />
                          {d.dpt}
                        </div>
                      </td>
                      <td className="py-2.5 px-4 text-right text-muted-foreground">{d.headcount}</td>
                      <td className="py-2.5 px-4 text-right text-muted-foreground">{d.departures}</td>
                      <td className="py-2.5 px-4 text-right text-primary font-bold">{d.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold font-bold">Top 5 High-Risk Job Roles</div>
              <div className="space-y-2">
                {roleRisk.map((r) => (
                  <div key={r.role} className="flex justify-between items-center text-xs border-b-[0.5px] border-border/20 pb-1.5 last:border-0 last:pb-0">
                    <span className="font-serif-display text-foreground font-bold">{r.role}</span>
                    <div className="flex gap-4 font-mono">
                      <span>Attrition: <span className="text-primary font-bold">{r.attrition}</span></span>
                      <span>Tier: <span className="text-muted-foreground">{r.risk}</span></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold font-bold">The Sales Representative Vulnerability</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The role exhibiting the most critical turnover is the <strong className="text-foreground font-semibold">Sales Representative</strong>, showing an extreme voluntary attrition rate of <strong className="text-primary font-bold">39.8%</strong>. This is heavily driven by commission-based compensation structures and low job security. In contrast, R&D roles exhibit the lowest overall attrition rate (13.8%), acting as a stable core.
              </p>
            </div>
          </div>

          <Divider />

          {/* ── 5. SATISFACTION & COMPENSATION ── */}
          <SectionHeading icon={DollarSign} label="5. Compensation Tiers & Satisfaction Indices" />
          
          <div className="border-[0.5px] border-border/85 bg-card/30 rounded-lg overflow-hidden mb-8">
            <div className="p-4 border-b-[0.5px] border-border/60 bg-muted/10">
              <h4 className="font-serif-display text-sm font-medium text-foreground">Attrition Rates by Compensation Tiers</h4>
              <p className="text-[10px] font-mono text-muted-foreground">Voluntary attrition rates categorized by monthly gross salary brackets</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px] text-xs font-mono">
                <thead>
                  <tr className="border-b-[0.5px] border-border/60 bg-muted/20 text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                    <th className="py-2.5 px-4">Monthly Income Bracket</th>
                    <th className="py-2.5 px-4 text-right">Workforce Count</th>
                    <th className="py-2.5 px-4 text-right">Voluntary Attrition Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {incomeTiers.map((tier) => (
                    <tr key={tier.tier} className="hover:bg-muted/10 transition-colors">
                      <td className="py-2.5 px-4 font-serif-display font-semibold text-foreground">
                        <div className="flex items-center gap-2">
                          <span className={cn('w-2 h-2 rounded-full', tier.color)} />
                          {tier.tier}
                        </div>
                      </td>
                      <td className="py-2.5 px-4 text-right text-muted-foreground">{tier.count}</td>
                      <td className="py-2.5 px-4 text-right text-primary font-bold">{tier.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5 flex flex-col justify-between">
              <div>
                <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold font-bold font- technical-mono">Low-Income Retention Leaks</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Voluntary departures are highly concentrated at the lower-income levels. Employees earning <span className="text-foreground font-semibold">under $3,000 / month</span> exhibit a high voluntary attrition rate of <strong className="text-primary font-bold">29.7%</strong>. This drops progressively to just <span className="text-foreground font-semibold">4.3%</span> for employees earning above $10,000 / month, showing an inverse correlation between compensation and voluntary turnover.
                </p>
              </div>
            </div>

            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold font-bold">Job Satisfaction Index</div>
              <div className="space-y-2">
                {satisfactionLevels.map((s) => (
                  <div key={s.level} className="flex justify-between items-center text-xs border-b-[0.5px] border-border/20 pb-1.5 last:border-0 last:pb-0">
                    <span className="font-serif-display text-foreground font-bold">{s.level}</span>
                    <span className="text-primary font-mono font-bold">{s.rate} Attrition</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Divider />

          {/* ── 6. TENURE ANALYSIS ── */}
          <SectionHeading icon={Clock} label="6. Early-Tenure Attrition & Retention Bottlenecks" />
          
          <div className="border-[0.5px] border-border/85 bg-card/30 rounded-lg overflow-hidden mb-8">
            <div className="p-4 border-b-[0.5px] border-border/60 bg-muted/10">
              <h4 className="font-serif-display text-sm font-medium text-foreground">Voluntary Attrition by Tenure Cohorts</h4>
              <p className="text-[10px] font-mono text-muted-foreground">Identifies voluntary departures based on years of tenure at the firm</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px] text-xs font-mono">
                <thead>
                  <tr className="border-b-[0.5px] border-border/60 bg-muted/20 text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                    <th className="py-2.5 px-4">Tenure Bracket</th>
                    <th className="py-2.5 px-4 text-right">Departures Volume</th>
                    <th className="py-2.5 px-4 text-right">Voluntary Attrition Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {tenureAttrition.map((t) => (
                    <tr key={t.tenure} className="hover:bg-muted/10 transition-colors">
                      <td className="py-2.5 px-4 font-serif-display font-semibold text-foreground">{t.tenure}</td>
                      <td className="py-2.5 px-4 text-right text-muted-foreground">{t.volume}</td>
                      <td className="py-2.5 px-4 text-right text-primary font-bold">{t.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-[0.5px] border-amber-500/20 bg-amber-500/5 rounded-lg p-5 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert className="h-4 w-4 text-amber-500 shrink-0" />
              <span className="text-[9px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold">Retention Alert: The First 2 Years</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Voluntary attrition is heavily front-loaded. <strong className="text-foreground font-semibold">58.6% of all voluntary departures</strong> (139 out of 237 total) occur within the first **two years** of tenure. Attrition among new hires (under 1 year of tenure) reaches a peak of <strong className="text-primary font-bold">35.5%</strong>. This indicates severe onboarding and early-stage engagement bottlenecks.
            </p>
          </div>

          <Divider />

          {/* ── 7. TECHNICAL SPECIFICATIONS ── */}
          <SectionHeading icon={Database} label="7. Power BI ETL & Modeling Specifications" />
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Star-Schema Dimensional Architecture</div>
              <div className="space-y-3">
                {dimensionTables.map((d) => (
                  <div key={d.name} className="border-b-[0.5px] border-border/20 pb-2 last:border-0 last:pb-0">
                    <span className="font-mono text-foreground text-xs font-semibold">{d.name}</span>
                    <div className="text-[9.5px] text-muted-foreground font-mono mt-0.5 leading-normal">{d.fields}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5 flex flex-col justify-between">
              <div>
                <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">DAX People Analytics Measures</div>
                <div className="space-y-3 font-mono text-[9px] text-muted-foreground bg-background/50 p-4 rounded border-[0.5px] border-border/30">
                  <div className="space-y-1">
                    <div className="text-primary font-semibold">// Attrition Rate formula</div>
                    <div>Attrition Rate = DIVIDE(</div>
                    <div className="pl-3">CALCULATE(COUNT(Employee[EmployeeID]), Employee[Attrition] = "Yes"),</div>
                    <div className="pl-3">COUNT(Employee[EmployeeID])</div>
                    <div>)</div>
                  </div>
                  <div className="space-y-1 pt-2 border-t-[0.5px] border-border/20">
                    <div className="text-primary font-semibold">// Retention Index formula</div>
                    <div>Retention Index = 1 - [Attrition Rate]</div>
                  </div>
                </div>
              </div>
              <p className="text-[9.5px] text-muted-foreground leading-relaxed mt-4 italic">
                • Built robust data connection pipelines utilizing Power Query ETL to clean marital status sets, parse overtime logic, and normalise salary columns.
              </p>
            </div>
          </div>

          <Divider />

          {/* ── 8. RECOMMENDATIONS ── */}
          <SectionHeading icon={Award} label="8. Retention Recommendations Summary" />
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold font-bold">R1: Overtime Overhaul</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                With a 30.5% attrition rate on overtime employees, company policy should restrict mandatory overtime. Target: cap weekly overtime to under 5 hours per FTE to reduce voluntary burnout departures.
              </p>
            </div>

            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold font-bold">R2: Early Tenure Onboarding</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Establish high-touch onboarding checkpoints during the first 12 months to address early-tenure attrition leaks (35.5% under Year 1). Introduce mentorship channels and job rotations.
              </p>
            </div>

            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold font-bold">R3: Base Pay Reviews</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Conduct salary benchmarks for employees earning under $3,000/month, transitioning entry-level commission roles to competitive base salaries to reduce high low-income turnover.
              </p>
            </div>
          </div>

          <Divider />

          {/* ── FOOTER CTA ── */}
          <div className="text-center py-8">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button size="sm" className="rounded-full h-9 px-6 text-[10px] font-mono uppercase tracking-wider" asChild>
                <a href="https://github.com/vutikurishanmukha9/HR-Employee-Retention" target="_blank" rel="noopener noreferrer">
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
