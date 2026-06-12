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

// ─── Static Data Structures ───────────────────────────────────────────

const datasetStructure = [
  { col: 'EmpID', type: 'Integer', desc: 'Unique identifier for each employee' },
  { col: 'Name', type: 'Text', desc: 'Employee full name' },
  { col: 'Email', type: 'Text', desc: 'Employee corporate email' },
  { col: 'State', type: 'Text', desc: 'US State of residence (88.4% Massachusetts)' },
  { col: 'DOB', type: 'Date', desc: 'Date of Birth (used to derive age cohorts)' },
  { col: 'GenderCode', type: 'Text', desc: 'Gender identifier' },
  { col: 'RaceDesc', type: 'Text', desc: 'Race and ethnicity description' },
  { col: 'MaritalDesc', type: 'Text', desc: 'Marital status classification' },
  { col: 'StartDate', type: 'Date', desc: 'Date of hire' },
  { col: 'ExitDate', type: 'Date', desc: 'Date of exit (null if currently active)' },
  { col: 'Title', type: 'Text', desc: 'Specific job title (32 unique roles)' },
  { col: 'Supervisor', type: 'Text', desc: 'Assigned supervisor name' },
  { col: 'BusinessUnit', type: 'Text', desc: 'Corporate business unit (SVG, WBL, MSC, etc.)' },
  { col: 'DepartmentType', type: 'Text', desc: 'Department name' },
  { col: 'Division', type: 'Text', desc: 'Division name' },
  { col: 'JobFunctionDescription', type: 'Text', desc: 'General job function classification' },
  { col: 'PayZone', type: 'Text', desc: 'Compensation zone (Zone A, B, or C)' },
  { col: 'EmployeeType', type: 'Text', desc: 'Employment contract class (Contract, Full-Time, Part-Time)' },
  { col: 'EmployeeClassificationType', type: 'Text', desc: 'Classification tier (Full-Time, Part-Time, Temporary)' },
  { col: 'EmployeeStatus', type: 'Text', desc: 'Current employment status' },
  { col: 'TerminationType', type: 'Text', desc: 'Reason category for exit' },
  { col: 'TerminationDescription', type: 'Text', desc: 'Detailed explanation for termination' },
  { col: 'Performance Score', type: 'Text', desc: 'Qualitative score (Fully Meets, Exceeds, Needs Improvement, PIP)' },
  { col: 'Current Employee Rating', type: 'Integer', desc: 'Quantitative rating scale (1 to 5)' },
];

const earlyExits = [
  { cohort: 'Under 6 Months', count: '429 exits', pct: '28.0%', color: 'bg-primary' },
  { cohort: '6 to 12 Months', count: '290 exits', pct: '18.9%', color: 'bg-primary/80' },
  { cohort: '1 to 2 Years', count: '412 exits', pct: '26.9%', color: 'bg-amber-500' },
  { cohort: '2 to 3 Years', count: '241 exits', pct: '15.7%', color: 'bg-amber-500/70' },
  { cohort: '3 to 5 Years', count: '155 exits', pct: '10.1%', color: 'bg-emerald-500/80' },
];

const terminationTypes = [
  { type: 'Involuntary Terminations', count: '388', pct: '25.3%', color: 'bg-rose-500' },
  { type: 'Voluntary Resignations', count: '380', pct: '24.8%', color: 'bg-amber-500' },
  { type: 'Resignations (Alternate Class)', count: '380', pct: '24.8%', color: 'bg-amber-500/80' },
  { type: 'Retirements', count: '377', pct: '24.6%', color: 'bg-emerald-500' },
];

const departmentTurnover = [
  { dept: 'Executive Office', rate: '79.2%', exits: 'Executive stability risk', color: 'bg-rose-500' },
  { dept: 'Admin Offices', rate: '60.0%', exits: 'Support team churn', color: 'bg-amber-500' },
  { dept: 'Software Engineering', rate: '55.7%', exits: 'Technical talent mobility', color: 'bg-amber-500/80' },
  { dept: 'IT/IS', rate: '52.1%', exits: 'Infrastructure core leak', color: 'bg-emerald-500' },
  { dept: 'Production', rate: '50.2%', exits: 'Operational volume churn', color: 'bg-emerald-500/80' },
  { dept: 'Sales', rate: '49.5%', exits: 'Frontline volume exit', color: 'bg-emerald-500/60' },
];

const jobTitleTurnover = [
  { title: 'Software Engineering Manager', total: 10, exits: 7, rate: '70.0%' },
  { title: 'Senior BI Developer', total: 30, exits: 20, rate: '66.7%' },
  { title: 'BI Developer', total: 44, exits: 29, rate: '65.9%' },
  { title: 'Network Engineer', total: 55, exits: 34, rate: '61.8%' },
  { title: 'Accountant I', total: 33, exits: 20, rate: '60.6%' },
  { title: 'Sr. Network Engineer', total: 50, exits: 28, rate: '56.0%' },
  { title: 'Shared Services Manager', total: 20, exits: 11, rate: '55.0%' },
  { title: 'CIO', total: 11, exits: 6, rate: '54.5%' },
  { title: 'President & CEO', total: 11, exits: 6, rate: '54.5%' },
  { title: 'IT Manager - DB', total: 22, exits: 12, rate: '54.5%' },
];

const payZoneTurnover = [
  { zone: 'Zone B', rate: '52.7%', desc: 'Mid compensation bracket' },
  { zone: 'Zone A', rate: '50.5%', desc: 'Highest compensation bracket' },
  { zone: 'Zone C', rate: '50.2%', desc: 'Entry compensation bracket' },
];

const businessUnitTurnover = [
  { bu: 'SVG', rate: '54.9%' },
  { bu: 'WBL', rate: '53.1%' },
  { bu: 'MSC', rate: '53.0%' },
  { bu: 'PYZ', rate: '52.5%' },
  { bu: 'EW', rate: '51.0%' },
  { bu: 'NEL', rate: '50.7%' },
  { bu: 'TNS', rate: '50.5%' },
  { bu: 'BPC', rate: '49.5%' },
  { bu: 'CCDR', rate: '48.3%' },
  { bu: 'PL', rate: '47.5%' },
];

const performanceTurnover = [
  { score: 'PIP', rate: '53.0%', tenure: '2.11 yrs' },
  { score: 'Exceeds', rate: '52.0%', tenure: '2.20 yrs' },
  { score: 'Fully Meets', rate: '51.0%', tenure: '2.06 yrs' },
  { score: 'Needs Improvement', rate: '51.0%', tenure: '2.22 yrs' },
];

const demographicTurnover = {
  gender: [
    { cat: 'Female', rate: '51.4%' },
    { cat: 'Male', rate: '50.7%' },
  ],
  race: [
    { cat: 'Asian', rate: '52.9%' },
    { cat: 'Other', rate: '51.2%' },
    { cat: 'Hispanic', rate: '51.0%' },
    { cat: 'Black', rate: '50.3%' },
    { cat: 'White', rate: '49.9%' },
  ],
  age: [
    { cat: 'Under 30', rate: '52.9%' },
    { cat: '60+', rate: '52.3%' },
    { cat: '40–49', rate: '52.1%' },
    { cat: '30–39', rate: '49.2%' },
    { cat: '50–59', rate: '47.2%' },
  ],
  marital: [
    { cat: 'Married', rate: '52.4%' },
    { cat: 'Divorced', rate: '51.4%' },
    { cat: 'Widowed', rate: '51.3%' },
    { cat: 'Single', rate: '49.4%' },
  ]
};

const divisionTurnover = [
  { div: 'Catv', total: 58, exits: 33, rate: '56.9%' },
  { div: 'Finance & Accounting', total: 70, exits: 39, rate: '55.7%' },
  { div: 'Yard (Material Handling)', total: 59, exits: 32, rate: '54.2%' },
  { div: 'Executive', total: 43, exits: 23, rate: '53.5%' },
  { div: 'General - Eng', total: 86, exits: 46, rate: '53.5%' },
  { div: 'Wireline Construction', total: 180, exits: 96, rate: '53.3%' },
  { div: 'General - Con', total: 509, exits: 269, rate: '52.8%' },
  { div: 'Underground', total: 33, exits: 17, rate: '51.5%' },
  { div: 'Engineers', total: 275, exits: 141, rate: '51.3%' },
  { div: 'Shop (Fleet)', total: 57, exits: 29, rate: '50.9%' },
];

const functionTurnover = [
  { func: 'Clerk', total: 37, exits: 24, rate: '64.9%' },
  { func: 'Administrative', total: 56, exits: 34, rate: '60.7%' },
  { func: 'Driver', total: 36, exits: 21, rate: '58.3%' },
  { func: 'Vp', total: 37, exits: 21, rate: '56.8%' },
  { func: 'Manager', total: 124, exits: 69, rate: '55.6%' },
  { func: 'Coordinator', total: 96, exits: 51, rate: '53.1%' },
  { func: 'Engineer', total: 313, exits: 164, rate: '52.4%' },
  { func: 'Locator', total: 23, exits: 12, rate: '52.2%' },
  { func: 'Administration', total: 23, exits: 12, rate: '52.2%' },
  { func: 'Mechanic', total: 29, exits: 15, rate: '51.7%' },
];

// ─── Helpers ──────────────────────────────────────────────────────────

const Divider = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="flex items-center gap-3 my-8 select-none">
    <div className="flex-1 border-t-[0.5px] border-border/60" />
    <div className="w-1.5 h-1.5 rotate-45 border-[0.5px] border-border/80 bg-card" />
    <div className="flex-1 border-t-[0.5px] border-border/60" />
  </div>
);

const SectionHeading = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <div className="flex items-center gap-2 mb-5">
    <Icon className="h-4 w-4 text-primary shrink-0" />
    <h3 className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground font-semibold leading-none">{label}</h3>
  </div>
);

// ─── Component ────────────────────────────────────────────────────────

const CaseStudySalesReport = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">

      {/* Navigation Header */}
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

        {/* NEWSPAPER MASTHEAD */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6 text-[9px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
            <span>People Analytics</span>
            <span className="w-1 h-1 rounded-full bg-primary" />
            <span>HR Business Intelligence</span>
            <span className="w-1 h-1 rounded-full bg-primary" />
            <span>Workforce Optimization</span>
          </div>

          <h1 className="font-serif-display text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight text-foreground leading-[1.05] mb-6">
            HR Employee Retention &<br />Workforce Optimization
          </h1>

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-6">
            <span className="font-medium text-foreground">Vutikuri Shanmukha</span>
            <span className="opacity-40">|</span>
            <span>Python, Pandas, Power BI, DAX, Star Schema Data Modeling</span>
          </div>

          <p className="max-w-3xl mx-auto text-muted-foreground text-sm md:text-base leading-relaxed">
            An in-depth corporate case study analyzing voluntary employee attrition across 3,000 personnel records. Explores early-tenure churn patterns, departmental instabilities, and the analytical systems built to diagnose organizational retention risks.
          </p>
        </motion.div>

        {/* CORE TELEMETRY METRICS TICKER */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Workforce Size', value: '3,000 records', icon: Users },
              { label: 'Overall Exit Rate', value: '51.1%', icon: ShieldAlert },
              { label: 'Total Exits Mapped', value: '1,533 FTEs', icon: Activity },
              { label: 'Avg Tenure (Exits)', value: '1.34 Years', icon: Clock },
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

        {/* NARRATIVE CONTENT */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-5xl mx-auto text-foreground"
        >

          {/* SECTION 1: BACKGROUND & BUSINESS PROBLEM */}
          <SectionHeading icon={Search} label="1. Project Background & Business Problem" />
          <div className="border-l-2 border-primary/30 pl-5 mb-8">
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground italic font-serif-display text-lg md:text-xl">
              A mid-sized organization with operations primarily concentrated in Massachusetts was experiencing what appeared to be a routine attrition challenge. HR leadership needed to move beyond gut-feel retention strategies and into evidence-based decision making.
            </p>
          </div>
          <p className="text-xs md:text-sm leading-relaxed text-muted-foreground mb-8">
            The core mandate of this project was to analyze 3,000 employee records spanning hiring dates, exit dates, job titles, pay zones, performance scores, supervisors, departments, business units, demographics, and termination types, and then surface the patterns driving people out the door.
          </p>
          <div className="bg-muted/10 border-[0.5px] border-border/60 rounded-lg p-5 mb-8">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-foreground mb-3 font-semibold">Critical Operational Inquiries</h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold font-mono">1.</span>
                <span>Which corporate roles are bleeding talent at the fastest rates?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold font-mono">2.</span>
                <span>Are certain supervisors quietly causing structural team instability?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold font-mono">3.</span>
                <span>Does pay zone classification actually predict voluntary employee departures?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold font-mono">4.</span>
                <span>Are we losing personnel in their first year before their recruiting investment breakeven?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold font-mono">5.</span>
                <span>Do high performers remain with the firm longer, or does that assumption not hold?</span>
              </li>
            </ul>
          </div>

          <Divider />

          {/* SECTION 2: DATASET OVERVIEW */}
          <SectionHeading icon={Layers} label="2. Fact Table & Data Quality Schema" />
          <p className="text-xs md:text-sm leading-relaxed text-muted-foreground mb-8">
            The raw data warehouse contains 3,000 detailed records spanning 26 dimensions. Clean data pipelines verified key properties: <span className="text-foreground font-semibold">ExitDate</span> was null for 1,467 records (active population), enabling accurate exit flag calculations. Demographic, compensation, and performance dimensions were completely populated, with 88.4% of the workforce located in Massachusetts, representing a highly localized single-geography workforce.
          </p>

          <div className="border-[0.5px] border-border/85 bg-card/30 rounded-lg overflow-hidden mb-8">
            <div className="p-4 border-b-[0.5px] border-border/60 bg-muted/10">
              <h4 className="font-serif-display text-sm font-medium text-foreground">Personnel Fact Table Mapping</h4>
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
                      <td className="py-2.5 px-4 font-mono font-semibold text-primary">{col.col}</td>
                      <td className="py-2.5 px-4 font-mono text-muted-foreground text-[11px]">{col.type}</td>
                      <td className="py-2.5 px-4 text-muted-foreground">{col.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Divider />

          {/* SECTION 3 & 4: FEATURE ENGINEERING & THE HEADLINE NUMBER */}
          <SectionHeading icon={Activity} label="3. Feature Engineering & The Core Headline" />
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <h4 className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-4 font-semibold">Derived Analytical Columns</h4>
              <div className="space-y-4 text-xs text-muted-foreground">
                <div>
                  <span className="text-foreground font-semibold font-mono block">Tenure in Years</span>
                  <span>Calculated dynamically as <code className="text-primary bg-muted/20 px-1 py-0.5 rounded font-mono text-[10px]">(ExitDate or Today) - StartDate</code> in days divided by 365.25, giving a continuous tenure index.</span>
                </div>
                <div className="pt-3 border-t-[0.5px] border-border/20">
                  <span className="text-foreground font-semibold font-mono block">Exited Flag</span>
                  <span>A clean boolean column derived from whether the <code className="text-primary bg-muted/20 px-1 py-0.5 rounded font-mono text-[10px]">ExitDate</code> field was populated, cross-validated against employee status codes.</span>
                </div>
                <div className="pt-3 border-t-[0.5px] border-border/20">
                  <span className="text-foreground font-semibold font-mono block">Age Cohort</span>
                  <span>Derived from <code className="text-primary bg-muted/20 px-1 py-0.5 rounded font-mono text-[10px]">DOB</code> and bucketed into five core cohorts: Under 30, 30 to 39, 40 to 49, 50 to 59, and 60+.</span>
                </div>
              </div>
            </div>

            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5 flex flex-col justify-between">
              <div>
                <h4 className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-4 font-semibold">The Headline Shock Statistic</h4>
                <div className="text-4xl md:text-5xl font-serif-display text-primary mb-3">51.1% Attrition</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Of the 3,000 employees analyzed, 1,533 left the organization over the tracking period. This is not a typical attrition dataset studying marginal 10% annual churn. This organization lost more than half its total workforce, highlighting deep structural instability.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs border-t-[0.5px] border-border/20 pt-3">
                  <div>
                    <span className="text-foreground font-semibold block font-mono">1.34 Years</span>
                    <span className="text-[9px] text-muted-foreground uppercase">Exited Avg Tenure</span>
                  </div>
                  <div>
                    <span className="text-foreground font-semibold block font-mono">2.88 Years</span>
                    <span className="text-[9px] text-muted-foreground uppercase">Active Avg Tenure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* SECTION 5: EARLY EXIT CRISIS */}
          <SectionHeading icon={Clock} label="4. The Early Exit Crisis: Timing of Departures" />
          <p className="text-xs md:text-sm leading-relaxed text-muted-foreground mb-8">
            An extremely critical discovery was that voluntary and involuntary employee departures are heavily front-loaded in their lifecycles. New hires are walking out the door before the firm can break even on onboarding costs.
          </p>

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 mb-8">
            {/* Visual chart */}
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <h4 className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-4 font-semibold">Exit Cohort Distribution</h4>
              <div className="space-y-4">
                {earlyExits.map((cohort) => (
                  <div key={cohort.cohort} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-foreground font-semibold">{cohort.cohort}</span>
                      <span className="font-mono text-primary font-bold">{cohort.pct} ({cohort.count})</span>
                    </div>
                    <div className="h-2.5 bg-background/60 border-[0.5px] border-border/30 rounded-sm overflow-hidden">
                      <div className={cn('h-full rounded-sm', cohort.color)} style={{ width: cohort.pct }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Insight block */}
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5 flex flex-col justify-between">
              <div>
                <h4 className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Early-Lifecycle Churn Metrics</h4>
                <div className="space-y-4 text-xs text-muted-foreground">
                  <p>
                    <span className="text-foreground font-semibold block">47.3% First-Year Failure:</span> Almost half of all employee exits occurred within their very first year (under 12 months) of employment.
                  </p>
                  <p>
                    <span className="text-foreground font-semibold block">74.2% Two-Year Threshold:</span> Nearly three-quarters of all departures happen before the two-year mark. Zero exits occurred beyond 5 years in this dataset scope.
                  </p>
                  <p className="text-[11px] italic bg-muted/20 border-l-2 border-primary/50 p-2 text-muted-foreground">
                    Action Target: The data dictates that interventions must target the 90-day, 6-month, and 1-year milestones.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* SECTION 6 & 7: TERMINATION TYPES & DEPARTMENTAL TURNOVER */}
          <SectionHeading icon={TrendingUp} label="5. Termination Classifications & Department Splits" />
          <p className="text-xs md:text-sm leading-relaxed text-muted-foreground mb-8">
            Exits split almost perfectly down the middle between voluntary departures and involuntary actions. Meanwhile, departmental calculations exposed massive structural turnover in leadership and supportive offices.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Term Type */}
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <h4 className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-4 font-semibold">Exit Classification Breakdown</h4>
              <div className="space-y-4">
                {terminationTypes.map((t) => (
                  <div key={t.type} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-foreground font-semibold truncate max-w-[200px]">{t.type}</span>
                      <span className="font-mono text-foreground font-bold">{t.pct} ({t.count})</span>
                    </div>
                    <div className="h-2.5 bg-background/60 border-[0.5px] border-border/30 rounded-sm overflow-hidden">
                      <div className={cn('h-full rounded-sm', t.color)} style={{ width: t.pct }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground mt-4 leading-relaxed font-mono">
                The near-perfect split highlights that HR must dual-track retention strategies: fixing why employees choose to resign, and refining why management terminates them.
              </p>
            </div>

            {/* Department Turnover */}
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <h4 className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-4 font-semibold">Departmental Attrition Rates</h4>
              <div className="space-y-3">
                {departmentTurnover.map((d) => (
                  <div key={d.dept} className="flex justify-between items-center text-xs border-b-[0.5px] border-border/20 pb-1.5 last:border-0 last:pb-0">
                    <span className="font-serif-display font-medium text-foreground flex items-center gap-2">
                      <span className={cn('w-2 h-2 rounded-full', d.color)} />
                      {d.dept}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-primary font-mono font-bold">{d.rate}</span>
                      <span className="text-[9px] text-muted-foreground font-mono uppercase shrink-0">{d.exits}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Divider />

          {/* SECTION 8: JOB TITLES AT HIGHEST RISK */}
          <SectionHeading icon={Award} label="6. High-Risk Job Titles Turnover" />
          <p className="text-xs md:text-sm leading-relaxed text-muted-foreground mb-8">
            An analysis of job titles (restricted to cohorts with a headcount of at least 10 to filter out statistical noise) exposed critical retention failure points across key development, infrastructure, and leadership titles.
          </p>

          <div className="border-[0.5px] border-border/85 bg-card/30 rounded-lg overflow-hidden mb-8">
            <div className="p-4 border-b-[0.5px] border-border/60 bg-muted/10">
              <h4 className="font-serif-display text-sm font-medium text-foreground">Top 10 High-Turnover Job Titles</h4>
              <p className="text-[10px] font-mono text-muted-foreground">Titles sorted by voluntary and involuntary exit percentage rate</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="border-b-[0.5px] border-border/60 bg-muted/20 text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                    <th className="py-2.5 px-4">Job Title</th>
                    <th className="py-2.5 px-4 text-center">Total Headcount</th>
                    <th className="py-2.5 px-4 text-center">Mapped Exits</th>
                    <th className="py-2.5 px-4 text-right">Turnover Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {jobTitleTurnover.map((role) => (
                    <tr key={role.title} className="hover:bg-muted/10 transition-colors">
                      <td className="py-2.5 px-4 font-serif-display font-semibold text-foreground">{role.title}</td>
                      <td className="py-2.5 px-4 text-center text-muted-foreground">{role.total}</td>
                      <td className="py-2.5 px-4 text-center text-muted-foreground">{role.exits}</td>
                      <td className="py-2.5 px-4 text-right font-bold text-primary">{role.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8 text-xs text-muted-foreground">
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-4">
              <span className="font-semibold text-foreground font-mono block mb-2">1. Analytics Drain</span>
              <p>Senior BI Developer (66.7%) and BI Developer (65.9%) show staggering turnover rates, indicating a failure to retain critical business intelligence and data infrastructure developers.</p>
            </div>
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-4">
              <span className="font-semibold text-foreground font-mono block mb-2">2. Network Risks</span>
              <p>Network Engineer (61.8%) and Sr. Network Engineer (56.0%) together recorded 62 exits out of 105 personnel, presenting a major risk to core physical business operations continuity.</p>
            </div>
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-4">
              <span className="font-semibold text-foreground font-mono block mb-2">3. Leadership Churn</span>
              <p>Engineering Managers (70.0%), CIOs (54.5%), and CEOs (54.5%) are leaving at massive rates, indicating that stability issues exist from the front lines all the way to the executive suite.</p>
            </div>
          </div>

          <Divider />

          {/* SECTION 9 & 10 & 11: COMPENSATION, BUSINESS UNITS & CLASSIFICATION */}
          <SectionHeading icon={DollarSign} label="7. Pay Zone Neutrality, Business Units & Classification" />
          <p className="text-xs md:text-sm leading-relaxed text-muted-foreground mb-8">
            The data yielded a crucial, highly actionable negative finding: compensation, business travel zones, and employment contracts do not play a major role in driving turnover, contradicting common HR assumptions.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Pay Zone table */}
            <div className="border-[0.5px] border-border/85 bg-card/30 rounded-lg p-4 font-mono text-xs">
              <h4 className="font-serif-display font-medium text-foreground text-sm mb-3">Pay Zone Turnover</h4>
              <div className="space-y-3">
                {payZoneTurnover.map((z) => (
                  <div key={z.zone} className="flex justify-between items-center border-b-[0.5px] border-border/20 pb-1.5 last:border-0 last:pb-0">
                    <span className="font-bold text-foreground">{z.zone}</span>
                    <span className="text-primary font-bold">{z.rate}</span>
                    <span className="text-[8.5px] text-muted-foreground truncate max-w-[100px]">{z.desc}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground mt-4 leading-relaxed font-sans">
                A tiny 2.5% spread across pay zones proves that salary alone is not the retention lever. Throwing money at the problem will not fix structural issues.
              </p>
            </div>

            {/* Business Unit table */}
            <div className="border-[0.5px] border-border/85 bg-card/30 rounded-lg p-4 font-mono text-xs">
              <h4 className="font-serif-display font-medium text-foreground text-sm mb-3">Business Unit Rates</h4>
              <div className="grid grid-cols-2 gap-2">
                {businessUnitTurnover.map((b) => (
                  <div key={b.bu} className="flex justify-between border-[0.5px] border-border/40 bg-background/50 p-1.5 rounded">
                    <span className="text-muted-foreground">{b.bu}:</span>
                    <span className="text-primary font-bold">{b.rate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Classification Card */}
            <div className="border-[0.5px] border-border/85 bg-card/30 rounded-lg p-4 text-xs text-muted-foreground flex flex-col justify-between">
              <div>
                <h4 className="font-serif-display font-medium text-foreground text-sm mb-3">Contract & Classification splits</h4>
                <p className="leading-relaxed">
                  Full-Time workers turn over at 49.8%, Part-Time at 50.0%, and Temporary at 53.4%. Contract types (Contract: 51.0%, Full-Time: 51.4%, Part-Time: 50.8%) show similarly uniform ratios. This highlights that employment status is not a primary driver of who leaves.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t-[0.5px] border-border/20 text-[9px] font-mono">
                TEMPORARY VS FT GAP: <span className="text-foreground font-semibold">3.6%</span>
              </div>
            </div>
          </div>

          <Divider />

          {/* SECTION 12 & 13: PERFORMANCE SCORE & DEMOGRAPHICS */}
          <SectionHeading icon={Users} label="8. Performance Paradox & Demographic Diagnostics" />
          
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 mb-8">
            {/* Performance table */}
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <h4 className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-4 font-semibold">Performance Score Attrition Analysis</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b-[0.5px] border-border/60 text-[9px] uppercase tracking-wider text-muted-foreground">
                      <th className="py-2 pb-2">Performance rating</th>
                      <th className="text-center pb-2">Exit Rate</th>
                      <th className="text-right pb-2">Avg Tenure</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20">
                    {performanceTurnover.map((p) => (
                      <tr key={p.score} className="hover:bg-muted/10">
                        <td className="py-2.5 font-serif-display font-semibold text-foreground">{p.score}</td>
                        <td className="text-center font-bold text-primary">{p.rate}</td>
                        <td className="text-right text-muted-foreground">{p.tenure}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 bg-primary/5 border-[0.5px] border-primary/20 p-3 rounded text-xs leading-relaxed text-muted-foreground">
                <span className="text-primary font-bold block mb-1">The Retention Paradox Alert</span>
                High performers (Exceeds) are leaving at essentially the same rate as those on PIP performance plans (52% vs 53%). This highlights a severe failure to protect and incentivize top talent.
              </div>
            </div>

            {/* Demographics checklist */}
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5 flex flex-col justify-between font-mono text-xs">
              <div>
                <h4 className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-4 font-semibold">Demographic Splits Checklist</h4>
                <div className="space-y-3.5">
                  <div>
                    <span className="text-foreground font-semibold block uppercase text-[10px] tracking-wider mb-1">Gender Turnover</span>
                    <div className="flex gap-4">
                      {demographicTurnover.gender.map(g => (
                        <span key={g.cat}>{g.cat}: <strong className="text-primary">{g.rate}</strong></span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2.5 border-t-[0.5px] border-border/20">
                    <span className="text-foreground font-semibold block uppercase text-[10px] tracking-wider mb-1">Race & Ethnicity</span>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {demographicTurnover.race.map(r => (
                        <span key={r.cat} className="text-[11px]">{r.cat}: <strong className="text-foreground">{r.rate}</strong></span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2.5 border-t-[0.5px] border-border/20">
                    <span className="text-foreground font-semibold block uppercase text-[10px] tracking-wider mb-1">Age Bracket</span>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {demographicTurnover.age.map(a => (
                        <span key={a.cat} className="text-[11px]">{a.cat}: <strong className="text-foreground">{a.rate}</strong></span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2.5 border-t-[0.5px] border-border/20">
                    <span className="text-foreground font-semibold block uppercase text-[10px] tracking-wider mb-1">Marital Status</span>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {demographicTurnover.marital.map(m => (
                        <span key={m.cat} className="text-[11px]">{m.cat}: <strong className="text-foreground">{m.rate}</strong></span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* SECTION 14 & 15: DIVISIONS & JOB FUNCTIONS */}
          <SectionHeading icon={Layers} label="9. Structural Division & Job Function Splits" />
          <p className="text-xs md:text-sm leading-relaxed text-muted-foreground mb-8">
            Drilling down to operations revealed key areas of talent drain. General Construction acts as the high-volume core of the company, while Administrative and Clerical roles suffer from severe invisible attrition.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Divisions Table */}
            <div className="border-[0.5px] border-border/85 bg-card/30 rounded-lg overflow-hidden">
              <div className="p-3.5 border-b-[0.5px] border-border/60 bg-muted/10 flex justify-between items-center">
                <span className="font-serif-display font-medium text-foreground text-sm">Top 10 Divisions Turnover</span>
                <span className="text-[9px] font-mono text-muted-foreground">Min. 30 Employees</span>
              </div>
              <div className="max-h-[300px] overflow-y-auto font-mono text-xs">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-muted/20 text-[8.5px] uppercase tracking-wider text-muted-foreground sticky top-0 bg-card">
                    <tr className="border-b-[0.5px] border-border/40">
                      <th className="p-2 px-3">Division</th>
                      <th className="text-center p-2">Total</th>
                      <th className="text-center p-2">Exits</th>
                      <th className="text-right p-2 px-3">Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20">
                    {divisionTurnover.map((d) => (
                      <tr key={d.div} className="hover:bg-muted/10">
                        <td className="p-2 px-3 font-serif-display font-semibold text-foreground">{d.div}</td>
                        <td className="text-center p-2 text-muted-foreground">{d.total}</td>
                        <td className="text-center p-2 text-muted-foreground">{d.exits}</td>
                        <td className="text-right p-2 px-3 font-bold text-primary">{d.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Job Functions Table */}
            <div className="border-[0.5px] border-border/85 bg-card/30 rounded-lg overflow-hidden">
              <div className="p-3.5 border-b-[0.5px] border-border/60 bg-muted/10 flex justify-between items-center">
                <span className="font-serif-display font-medium text-foreground text-sm">Job Function Turnover</span>
                <span className="text-[9px] font-mono text-muted-foreground">Primary business roles</span>
              </div>
              <div className="max-h-[300px] overflow-y-auto font-mono text-xs">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-muted/20 text-[8.5px] uppercase tracking-wider text-muted-foreground sticky top-0 bg-card">
                    <tr className="border-b-[0.5px] border-border/40">
                      <th className="p-2 px-3">Function</th>
                      <th className="text-center p-2">Total</th>
                      <th className="text-center p-2">Exits</th>
                      <th className="text-right p-2 px-3">Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20">
                    {functionTurnover.map((f) => (
                      <tr key={f.func} className="hover:bg-muted/10">
                        <td className="p-2 px-3 font-serif-display font-semibold text-foreground">{f.func}</td>
                        <td className="text-center p-2 text-muted-foreground">{f.total}</td>
                        <td className="text-center p-2 text-muted-foreground">{f.exits}</td>
                        <td className="text-right p-2 px-3 font-bold text-primary">{f.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <Divider />

          {/* SECTION 16: SUPERVISOR ANALYSIS METHODOLOGICAL NOTE */}
          <SectionHeading icon={ShieldAlert} label="10. Methodological Note: Supervisor Noise Filtering" />
          <div className="border-[0.5px] border-amber-500/20 bg-amber-500/5 rounded-lg p-5 mb-8">
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold mb-2">Avoiding Small-Sample Size Bias</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Standard corporate queries returned several supervisors exhibiting trivially computed 100% exit rates. Upon detailed review, this was a statistical noise artifact — these supervisors managed exactly one direct report who happened to leave. 
              To surface actual organizational signals, our model filtered out teams with a headcount of under 5 employees. This enabled the notebook to isolate managers with structurally high exit rates, ensuring HR resources target real leadership issues rather than statistical noise.
            </p>
          </div>

          <Divider />

          {/* SECTION 17: TECHNICAL & ANALYTICAL ARCHITECTURE */}
          <SectionHeading icon={Database} label="11. The Technical & Analytical Architecture" />
          <p className="text-xs md:text-sm leading-relaxed text-muted-foreground mb-8">
            The project implemented a robust, reproducible analytical framework constructed in Python utilizing a pipeline configured with pandas, numpy, and openpyxl, designed for rapid processing and data model cleanliness.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8 text-xs font-mono">
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <span className="text-foreground font-semibold uppercase tracking-wider block mb-3 text-[10px]">Data Engineering & ETL Pipelines</span>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div>
                  <span className="text-primary font-bold block mb-0.5">// Schema Normalization Layer</span>
                  <span>Configured a mapping dictionary that translates dynamic field variants (e.g. payzone, performance) into standardized dimensions, avoiding hardcoded indexing failures.</span>
                </div>
                <div className="pt-3.5 border-t-[0.5px] border-border/20">
                  <span className="text-primary font-bold block mb-0.5">// Calendar Time Calculations</span>
                  <span>Coded dynamic tenure formulas handling leap years cleanly: <code className="text-foreground bg-muted/40 px-1 py-0.5 rounded font-mono">dt.days / 365.25</code>, with correct boundary checks for active staff.</span>
                </div>
              </div>
            </div>

            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5 flex flex-col justify-between">
              <div>
                <span className="text-foreground font-semibold uppercase tracking-wider block mb-3 text-[10px]">Automated Manipulation & Visualization Helpers</span>
                <div className="space-y-3 font-mono text-[9px] text-muted-foreground bg-background/50 p-4 rounded border-[0.5px] border-border/30">
                  <div className="space-y-1">
                    <span className="text-primary font-semibold">// Modular Category Plotter</span>
                    <div>def plot_turnover_by_category(df, col, threshold=10):</div>
                    <div className="pl-3">filtered_df = df[df[col].map(df[col].value_counts()) &gt;= threshold]</div>
                    <div className="pl-3"># Computes normalized turnover rates dynamically</div>
                    <div className="pl-3">return sns.barplot(data=filtered_df, y=col, x='exited')</div>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed italic mt-4">
                Designed helper scripts to programmatically construct, edit, and optimize notebook cells, ensuring full reproduction of data structures.
              </p>
            </div>
          </div>

          <Divider />

          {/* SECTION 18 & 19: FINDINGS & RECOMMENDATIONS */}
          <SectionHeading icon={Award} label="12. Key Findings & Actionable Recommendations" />
          <div className="grid md:grid-cols-2 gap-6 mb-8 text-xs text-muted-foreground leading-relaxed">
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <h4 className="text-[11px] font-serif-display font-medium text-foreground mb-3">Key Analytical Discoveries</h4>
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <span className="text-primary font-bold font-mono">•</span>
                  <span><strong>Systemic instability:</strong> Churn is uniform across pay zones, demographics, and contracts, indicating organization-wide issues rather than isolated pockets.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold font-mono">•</span>
                  <span><strong>The First-Year Leak:</strong> 47.3% of exits occur within month one to twelve, representing a severe early-lifecycle onboarding failure.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold font-mono">•</span>
                  <span><strong>Compensation neutral:</strong> Merely raising base salary without resolving management or career pathway limits will not stop talent drain.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold font-mono">•</span>
                  <span><strong>The High-Performance leak:</strong> Exceeds-rated personnel leave at the same rate as PIP employees (52%), signaling broken pathways or recognition failure.</span>
                </li>
              </ul>
            </div>

            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5 bg-primary/[0.02]">
              <h4 className="text-[11px] font-serif-display font-medium text-foreground mb-3">Strategic Action Recommendations</h4>
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <span className="text-primary font-bold font-mono">1.</span>
                  <span><strong>90-Day Interventions:</strong> Construct structured check-ins during the first 6 months to secure early-lifecycle engagement.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold font-mono">2.</span>
                  <span><strong>Revamp BI & Network Career Paths:</strong> Audit the extreme 65% loss of analytical and systems infrastructure staff immediately.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold font-mono">3.</span>
                  <span><strong>Link Performance to Rewards:</strong> Redesign the flat promotion structure to prevent top talent from walking out the door.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold font-mono">4.</span>
                  <span><strong>Internal Benchmarking:</strong> Study low-churn divisions (PL, CCDR) to scale their management practices across the firm.</span>
                </li>
              </ul>
            </div>
          </div>

          <Divider />

          {/* SECTION 20: PORTFOLIO SHOWCASE */}
          <SectionHeading icon={BookOpen} label="13. Portfolio Piece Demonstration Value" />
          <div className="bg-muted/10 border-[0.5px] border-border/60 rounded-lg p-5 mb-8 text-xs text-muted-foreground leading-relaxed">
            <p className="mb-3">
              This workforce optimization analysis demonstrates high-level professional competence in several core analytics domains:
            </p>
            <div className="grid md:grid-cols-3 gap-4 font-mono text-[11px]">
              <div>
                <span className="text-foreground font-semibold block mb-1">Pipeline Ownership</span>
                Ingesting raw Excel, engineering derived timelines, handling state-specific constraints, and writing reusable visual scripts.
              </div>
              <div>
                <span className="text-foreground font-semibold block mb-1">Analytical Skepticism</span>
                Refusing to present trivially calculated team exit rates, setting proper sample sizes to uncover real signal.
              </div>
              <div>
                <span className="text-foreground font-semibold block mb-1">Strategic Framing</span>
                Connecting abstract metrics back to financial realities (recruitment payback periods, replacement costs).
              </div>
            </div>
          </div>

          <Divider />

          {/* FOOTER CTA */}
          <div className="text-center py-8">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button size="sm" className="rounded-full h-9 px-6 text-[10px] font-mono uppercase tracking-wider" asChild>
                <a href="https://github.com/vutikurishanmukha9/Employee_Data_Analysis" target="_blank" rel="noopener noreferrer">
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
