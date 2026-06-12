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
  Globe,
  Zap,
  Clock,
  DollarSign,
  Building2,
  ArrowUpRight,
  Database,
  Award,
  Search,
  BookOpen,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── Static Datasets from Deep Dive Content ──────────────────────────

const continentalBreakdown = [
  { name: 'North America', count: 589, val: '$2,032B', avgVal: '$3.44B', avgFunding: '$507M', years: '6.8 yrs', color: 'bg-primary' },
  { name: 'Asia', count: 310, val: '$696B', avgVal: '$4.02B', avgFunding: '$661M', years: '5.8 yrs', color: 'bg-amber-500' },
  { name: 'Europe', count: 143, val: '$195B', avgVal: '$3.52B', avgFunding: '$563M', years: '7.9 yrs', color: 'bg-sky-500' },
  { name: 'South America', count: 19, val: '$37B', avgVal: '$1.95B', avgFunding: '$604M', years: '7.9 yrs', color: 'bg-violet-500' },
  { name: 'Oceania', count: 6, val: '$56B', avgVal: '$7.00B', avgFunding: '$338M', years: '7.9 yrs', color: 'bg-emerald-500' },
  { name: 'Africa', count: 3, val: 'N/A', avgVal: 'N/A', avgFunding: 'N/A', years: 'N/A', color: 'bg-rose-500' },
];

const topCountries = [
  { country: 'United States', count: 562, totalVal: '$1,933B', avgVal: '$3.44B', avgFunding: '$507M', years: '6.8' },
  { country: 'China', count: 173, totalVal: '$696B', avgVal: '$4.02B', avgFunding: '$661M', years: '5.8' },
  { country: 'India', count: 65, totalVal: '$196B', avgVal: '$3.02B', avgFunding: '$733M', years: '7.7' },
  { country: 'United Kingdom', count: 43, totalVal: '$195B', avgVal: '$4.53B', avgFunding: '$701M', years: '7.9' },
  { country: 'Germany', count: 26, totalVal: '$72B', avgVal: '$2.77B', avgFunding: '$631M', years: '9.2' },
  { country: 'France', count: 24, totalVal: '$55B', avgVal: '$2.29B', avgFunding: '$563M', years: '7.4' },
  { country: 'Israel', count: 20, totalVal: '$39B', avgVal: '$1.95B', avgFunding: '$302M', years: '7.4' },
  { country: 'Canada', count: 19, totalVal: '$49B', avgVal: '$2.58B', avgFunding: '$346M', years: '10.0' },
  { country: 'Brazil', count: 16, totalVal: '$37B', avgVal: '$2.31B', avgFunding: '$604M', years: '7.9' },
  { country: 'South Korea', count: 12, totalVal: '$41B', avgVal: '$3.42B', avgFunding: '$444M', years: '10.3' },
  { country: 'Singapore', count: 12, totalVal: '$21B', avgVal: '$1.75B', avgFunding: '$466M', years: '6.9' },
  { country: 'Australia', count: 8, totalVal: '$56B', avgVal: '$7.00B', avgFunding: '$338M', years: '7.9' },
  { country: 'Indonesia', count: 6, totalVal: '$28B', avgVal: '$4.67B', avgFunding: '$1,205M', years: '5.5' },
  { country: 'Mexico', count: 6, totalVal: '$16B', avgVal: '$2.67B', avgFunding: '$598M', years: '5.0' },
  { country: 'Hong Kong', count: 6, totalVal: '$18B', avgVal: '$3.00B', avgFunding: '$710M', years: '5.7' },
];

const cityHubs = [
  { city: 'San Francisco', country: 'USA', count: 152, val: '$724B' },
  { city: 'New York', country: 'USA', count: 103, val: '$233B' },
  { city: 'Beijing', country: 'China', count: 63, val: '$348B' },
  { city: 'Shanghai', country: 'China', count: 44, val: '$99B' },
  { city: 'London', country: 'UK', count: 34, val: '$178B' },
  { city: 'Bengaluru', country: 'India', count: 29, val: '$107B' },
  { city: 'Shenzhen', country: 'China', count: 19, val: '$141B' },
  { city: 'Paris', country: 'France', count: 19, val: '$49B' },
  { city: 'Palo Alto', country: 'USA', count: 18, val: '$53B' },
  { city: 'Berlin', country: 'Germany', count: 17, val: '$41B' },
];

const industryAnalysis = [
  { industry: 'Fintech', count: 224, totalVal: '$882B', avgVal: '$3.94B', medianVal: '$2.0B', funding: '$486M', years: '6.5' },
  { industry: 'Internet Software & Services', count: 205, totalVal: '$595B', avgVal: '$2.90B', medianVal: '$2.0B', funding: '$359M', years: '7.9' },
  { industry: 'E-commerce & DTC', count: 111, totalVal: '$426B', avgVal: '$3.84B', medianVal: '$2.0B', funding: '$683M', years: '6.4' },
  { industry: 'Health', count: 74, totalVal: '$198B', avgVal: '$2.68B', medianVal: '$2.0B', funding: '$459M', years: '8.2' },
  { industry: 'Artificial Intelligence', count: 73, totalVal: '$361B', avgVal: '$4.95B', medianVal: '$2.0B', funding: '$602M', years: '6.0' },
  { industry: 'Other', count: 58, totalVal: '$252B', avgVal: '$4.34B', medianVal: '$2.0B', funding: '$715M', years: '7.8' },
  { industry: 'Supply Chain, Logistics & Delivery', count: 57, totalVal: '$177B', avgVal: '$3.11B', medianVal: '$1.0B', funding: '$793M', years: '6.9' },
  { industry: 'Cybersecurity', count: 50, totalVal: '$129B', avgVal: '$2.58B', medianVal: '$2.0B', funding: '$439M', years: '6.8' },
  { industry: 'Data Management & Analytics', count: 41, totalVal: '$136B', avgVal: '$3.32B', medianVal: '$2.0B', funding: '$450M', years: '8.1' },
  { industry: 'Mobile & Telecommunications', count: 38, totalVal: '$89B', avgVal: '$2.34B', medianVal: '$1.5B', funding: '$402M', years: '6.3' },
  { industry: 'Hardware', count: 34, totalVal: '$99B', avgVal: '$2.91B', medianVal: '$2.0B', funding: '$629M', years: '5.9' },
  { industry: 'Auto & Transportation', count: 31, totalVal: '$99B', avgVal: '$3.19B', medianVal: '$2.0B', funding: '$1,131M', years: '5.0' },
  { industry: 'Edtech', count: 28, totalVal: '$100B', avgVal: '$3.57B', medianVal: '$2.0B', funding: '$781M', years: '7.7' },
  { industry: 'Consumer & Retail', count: 25, totalVal: '$106B', avgVal: '$4.24B', medianVal: '$2.0B', funding: '$1,062M', years: '8.1' },
  { industry: 'Travel', count: 14, totalVal: '$46B', avgVal: '$3.29B', medianVal: '$2.0B', funding: '$902M', years: '6.6' },
];

const yearlyCreation = [
  { year: 2007, count: 1, val: '$1B', avgVal: '$1.0B' },
  { year: 2011, count: 2, val: '$52B', avgVal: '$26.0B' },
  { year: 2012, count: 4, val: '$131B', avgVal: '$32.8B' },
  { year: 2013, count: 3, val: '$6B', avgVal: '$2.0B' },
  { year: 2014, count: 13, val: '$166B', avgVal: '$12.8B' },
  { year: 2015, count: 35, val: '$84B', avgVal: '$2.4B' },
  { year: 2016, count: 21, val: '$86B', avgVal: '$4.1B' },
  { year: 2017, count: 44, val: '$348B', avgVal: '$7.9B' },
  { year: 2018, count: 103, val: '$589B', avgVal: '$5.7B' },
  { year: 2019, count: 104, val: '$457B', avgVal: '$4.4B' },
  { year: 2020, count: 108, val: '$402B', avgVal: '$3.7B' },
  { year: 2021, count: 520, val: '$1,189B', avgVal: '$2.3B', highlight: true },
  { year: 2022, count: 116, val: '$200B', avgVal: '$1.7B' },
];

const valuationTiers = [
  { tier: 'Unicorn', range: '$1B – $2B', count: 471, value: '$471B', years: '6.9 yrs' },
  { tier: 'High Unicorn', range: '$2B – $5B', count: 435, value: '$1,129B', years: '7.1 yrs' },
  { tier: 'Super Unicorn', range: '$5B – $10B', count: 107, value: '$676B', years: '7.1 yrs' },
  { tier: 'Decacorn', range: '$10B+', count: 61, value: '$1,435B', years: '6.9 yrs' },
];

const decacornList = [
  { company: 'Bytedance', country: 'China', industry: 'AI', val: '$180B', funding: '$8B', years: 5 },
  { company: 'SpaceX', country: 'USA', industry: 'Other', val: '$100B', funding: '$7B', years: 10 },
  { company: 'SHEIN', country: 'China', industry: 'E-commerce', val: '$100B', funding: '$2B', years: 10 },
  { company: 'Stripe', country: 'USA', industry: 'Fintech', val: '$95B', funding: '$2B', years: 4 },
  { company: 'Klarna', country: 'Sweden', industry: 'Fintech', val: '$46B', funding: '$4B', years: 6 },
  { company: 'Canva', country: 'Australia', industry: 'Internet Software', val: '$40B', funding: '$572M', years: 6 },
  { company: 'Checkout.com', country: 'UK', industry: 'Fintech', val: '$40B', funding: '$2B', years: 7 },
  { company: 'Instacart', country: 'USA', industry: 'Supply Chain', val: '$39B', funding: '$3B', years: 2 },
  { company: 'JUUL Labs', country: 'USA', industry: 'Consumer & Retail', val: '$38B', funding: '$14B', years: 2 },
  { company: 'Databricks', country: 'USA', industry: 'Data Management', val: '$38B', funding: '$3B', years: 6 },
  { company: 'Revolut', country: 'UK', industry: 'Fintech', val: '$33B', funding: '$2B', years: 3 },
  { company: 'Epic Games', country: 'USA', industry: 'Other', val: '$32B', funding: '$7B', years: 27 },
  { company: 'FTX', country: 'Bahamas', industry: 'Fintech', val: '$32B', funding: '$2B', years: 3 },
  { company: 'Fanatics', country: 'USA', industry: 'E-commerce', val: '$27B', funding: '$4B', years: 10 },
  { company: 'Chime', country: 'USA', industry: 'Fintech', val: '$25B', funding: '$2B', years: 6 },
  { company: 'BYJU\'s', country: 'India', industry: 'Edtech', val: '$22B', funding: '$4B', years: 9 },
  { company: 'J&T Express', country: 'Indonesia', industry: 'Supply Chain', val: '$20B', funding: '$5B', years: 6 },
  { company: 'Xiaohongshu', country: 'China', industry: 'E-commerce', val: '$20B', funding: '$918M', years: 3 },
  { company: 'Miro', country: 'USA', industry: 'Internet Software', val: '$18B', funding: '$476M', years: 11 },
  { company: 'Yuanfudao', country: 'China', industry: 'Edtech', val: '$17B', funding: '$4B', years: 5 },
  { company: 'Rapyd', country: 'UK', industry: 'Fintech', val: '$15B', funding: '$770M', years: 3 },
  { company: 'Discord', country: 'USA', industry: 'Internet Software', val: '$15B', funding: '$979M', years: 6 },
  { company: 'Genki Forest', country: 'China', industry: 'Consumer & Retail', val: '$15B', funding: '$721M', years: 4 },
  { company: 'goPuff', country: 'USA', industry: 'E-commerce', val: '$15B', funding: '$3B', years: 7 },
  { company: 'Blockchain.com', country: 'UK', industry: 'Fintech', val: '$14B', funding: '$490M', years: 10 },
  { company: 'Plaid', country: 'USA', industry: 'Fintech', val: '$13B', funding: '$734M', years: 6 },
  { company: 'Devoted Health', country: 'USA', industry: 'Health', val: '$13B', funding: '$2B', years: 1 },
  { company: 'OpenSea', country: 'USA', industry: 'E-commerce', val: '$13B', funding: '$427M', years: 4 },
  { company: 'Grammarly', country: 'USA', industry: 'Internet Software', val: '$13B', funding: '$400M', years: 10 },
  { company: 'Argo AI', country: 'USA', industry: 'AI', val: '$12B', funding: '$4B', years: 3 },
  { company: 'Northvolt', country: 'Sweden', industry: 'Other', val: '$12B', funding: '$4B', years: 3 },
  { company: 'Faire', country: 'USA', industry: 'AI', val: '$12B', funding: '$1B', years: 2 },
  { company: 'Airtable', country: 'USA', industry: 'Internet Software', val: '$12B', funding: '$1B', years: 5 },
  { company: 'Brex', country: 'USA', industry: 'Fintech', val: '$12B', funding: '$1B', years: 1 },
  { company: 'Getir', country: 'Turkey', industry: 'E-commerce', val: '$12B', funding: '$2B', years: 6 },
  { company: 'Biosplice Therapeutics', country: 'USA', industry: 'Health', val: '$12B', funding: '$799M', years: 10 },
  { company: 'Bitmain', country: 'China', industry: 'Hardware', val: '$12B', funding: '$765M', years: 3 },
  { company: 'GoodLeap', country: 'USA', industry: 'Internet Software', val: '$12B', funding: '$800M', years: 18 },
  { company: 'Xingsheng Selected', country: 'China', industry: 'E-commerce', val: '$12B', funding: '$5B', years: 11 },
  { company: 'ZongMu Technology', country: 'China', industry: 'Auto', val: '$11B', funding: '$376M', years: 8 },
  { company: 'Bolt', country: 'Estonia', industry: 'Auto', val: '$11B', funding: '$1B', years: 5 },
  { company: 'Swiggy', country: 'India', industry: 'Supply Chain', val: '$11B', funding: '$5B', years: 4 },
  { company: 'Weilong Foods', country: 'China', industry: 'Consumer & Retail', val: '$11B', funding: '$558M', years: 22 },
  { company: 'Global Switch', country: 'UK', industry: 'Hardware', val: '$11B', funding: '$5B', years: 18 },
  { company: 'Bolt', country: 'USA', industry: 'Fintech', val: '$11B', funding: '$1B', years: 7 },
  { company: 'Celonis', country: 'Germany', industry: 'Data Management', val: '$11B', funding: '$1B', years: 7 },
  { company: 'Zuoyebang', country: 'China', industry: 'Edtech', val: '$10B', funding: '$3B', years: 4 },
  { company: 'Ripple', country: 'USA', industry: 'Fintech', val: '$10B', funding: '$294M', years: 7 },
  { company: 'OYO Rooms', country: 'India', industry: 'Travel', val: '$10B', funding: '$3B', years: 6 },
  { company: 'OutSystems', country: 'USA', industry: 'Internet Software', val: '$10B', funding: '$572M', years: 17 },
  { company: 'ServiceTitan', country: 'USA', industry: 'Internet Software', val: '$10B', funding: '$1B', years: 6 },
  { company: 'Alchemy', country: 'USA', industry: 'Fintech', val: '$10B', funding: '$564M', years: 4 },
  { company: 'Chehaoduo', country: 'China', industry: 'E-commerce', val: '$10B', funding: '$4B', years: 1 },
  { company: 'Digital Currency Group', country: 'USA', industry: 'Fintech', val: '$10B', funding: '$1B', years: 6 },
  { company: 'Figma', country: 'USA', industry: 'Internet Software', val: '$10B', funding: '$333M', years: 8 },
  { company: 'Gusto', country: 'USA', industry: 'Fintech', val: '$10B', funding: '$691M', years: 4 },
  { company: 'Lalamove', country: 'Hong Kong', industry: 'Supply Chain', val: '$10B', funding: '$2B', years: 6 },
  { company: 'Notion Labs', country: 'USA', industry: 'Internet Software', val: '$10B', funding: '$343M', years: 4 },
  { company: 'Reddit', country: 'USA', industry: 'Internet Software', val: '$10B', funding: '$1B', years: 12 },
  { company: 'Talkdesk', country: 'USA', industry: 'Internet Software', val: '$10B', funding: '$497M', years: 7 },
  { company: 'Thrasio', country: 'USA', industry: 'Other', val: '$10B', funding: '$2B', years: 2 },
];

const capitalEfficiency = [
  { company: 'Zapier', country: 'USA', industry: 'Internet Software', val: '$4B', funding: '$1M', ratio: '4,000x' },
  { company: 'Dunamu', country: 'S. Korea', industry: 'Fintech', val: '$9B', funding: '$71M', ratio: '126.8x' },
  { company: 'Workhuman', country: 'Ireland', industry: 'Internet Software', val: '$1B', funding: '$9M', ratio: '111.1x' },
  { company: 'CFGI', country: 'USA', industry: 'Fintech', val: '$2B', funding: '$19M', ratio: '105.3x' },
  { company: 'Manner', country: 'China', industry: 'Other', val: '$1B', funding: '$10M', ratio: '100.0x' },
  { company: 'DJI Innovations', country: 'China', industry: 'Hardware', val: '$8B', funding: '$105M', ratio: '76.2x' },
  { company: 'Canva', country: 'Australia', industry: 'Internet Software', val: '$40B', funding: '$572M', ratio: '69.9x' },
  { company: 'Il Makiage', country: 'USA', industry: 'E-commerce', val: '$2B', funding: '$29M', ratio: '69.0x' },
  { company: 'Upstox', country: 'India', industry: 'Fintech', val: '$3B', funding: '$54M', ratio: '55.6x' },
  { company: 'SHEIN', country: 'China', industry: 'E-commerce', val: '$100B', funding: '$2B', ratio: '50.0x' },
  { company: 'Stripe', country: 'USA', industry: 'Fintech', val: '$95B', funding: '$2B', ratio: '47.5x' },
];

const activeInvestors = [
  { investor: 'Accel', count: 60 },
  { investor: 'Tiger Global Management', count: 53 },
  { investor: 'Andreessen Horowitz (a16z)', count: 53 },
  { investor: 'Sequoia Capital China', count: 48 },
  { investor: 'Sequoia Capital', count: 47 },
  { investor: 'Insight Partners', count: 47 },
  { investor: 'SoftBank Group', count: 34 },
  { investor: 'General Catalyst', count: 34 },
  { investor: 'Lightspeed Venture Partners', count: 34 },
  { investor: 'Index Ventures', count: 32 },
  { investor: 'Tencent Holdings', count: 29 },
  { investor: 'General Atlantic', count: 28 },
  { investor: 'Sequoia Capital India', count: 25 },
  { investor: 'Google Ventures (GV)', count: 25 },
  { investor: 'New Enterprise Associates', count: 23 },
  { investor: 'IDG Capital', count: 23 },
  { investor: 'DST Global', count: 22 },
  { investor: 'Coatue Management', count: 22 },
  { investor: 'Bessemer Venture Partners', count: 22 },
  { investor: 'Khosla Ventures', count: 21 },
];

const foundingEra = [
  { era: '1990s', count: 23, avgVal: '$4.91B', years: '21.4 yrs' },
  { era: '2000s', count: 154, avgVal: '$4.40B', years: '12.8 yrs' },
  { era: '2010s', count: 858, avgVal: '$3.32B', years: '5.7 yrs' },
  { era: '2020s', count: 36, avgVal: '$1.83B', years: '0.8 yrs' },
];

const anomalyRecords = [
  { record: 'Highest Valuation', company: 'Bytedance', value: '$180B' },
  { record: 'Most Capital Raised', company: 'JUUL Labs', value: '$14B' },
  { record: 'Most Capital Efficient', company: 'Zapier', value: '4,000x ratio' },
  { record: 'Fastest to Unicorn', company: '4 companies tied', value: '1 year' },
  { record: 'Slowest to Unicorn', company: 'Otto Bock HealthCare', value: '98 years' },
  { record: 'Highest Single City Concentration', company: 'San Francisco', value: '152 unicorns, $724B' },
  { record: 'Most Unicorns in One Year', company: '2021', value: '520 companies' },
  { record: 'Largest Single-Year Valuation', company: '2021', value: '$1,189B created' },
  { record: 'Lowest Avg Funding per Unicorn', company: 'Internet Software', value: '$359M' },
  { record: 'Highest Avg Funding per Unicorn', company: 'Auto & Transportation', value: '$1,131M' },
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

const CaseStudyUnicorn = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter state for Decacorns list to make it fully interactive!
  const [decacornFilter, setDecacornFilter] = useState<string>('All');
  const uniqueIndustries = ['All', ...Array.from(new Set(decacornList.map((d) => d.industry)))];
  const filteredDecacorns = decacornFilter === 'All' 
    ? decacornList 
    : decacornList.filter((d) => d.industry === decacornFilter);

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
            <span>Power BI, Power Query, DAX, Star Schema</span>
          </div>

          {/* Lede */}
          <p className="max-w-3xl mx-auto text-muted-foreground text-sm md:text-base leading-relaxed">
            A comprehensive structural analysis of 1,074 unicorn companies across 6 continents and 16 industries, mapping $3,711B in total valuation and $591.8B in aggregate funding to uncover the capital efficiency, timing vectors, and geographic concentration of billion-dollar private enterprises.
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
              { label: 'Unicorn Companies', value: '1,074', icon: Building2 },
              { label: 'Combined Valuation', value: '$3,711B', icon: DollarSign },
              { label: 'Combined Funding', value: '$591.8B', icon: TrendingUp },
              { label: 'Global Avg Time', value: '7.0 Years', icon: Clock },
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

          {/* ── 1. PROBLEM STATEMENT ── */}
          <SectionHeading icon={Search} label="1. Problem Statement" />
          <div className="border-l-2 border-primary/30 pl-5 mb-8">
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground italic font-serif-display text-lg md:text-xl">
              "The global startup ecosystem crossed a historic milestone with over 1,000 companies achieving $1 billion+ valuations. But raw counts tell almost nothing. The real questions were structural: Where is unicorn wealth concentrated? Which industries produce the fastest path to $1B? How efficiently are they converting capital? And what happened in 2021 that broke every historical benchmark?"
            </p>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground mb-8">
            This analysis was built to answer those questions with absolute precision, replacing high-level generalities with exact, structured dimensions. Through rigorous star schema modeling, clean ETL pipeline staging, and dynamic dashboard metrics, the analysis exposes the mechanical realities of late-stage venture capital.
          </p>

          <Divider />

          {/* ── 2. GEOGRAPHIC ANALYSIS ── */}
          <SectionHeading icon={Globe} label="2. Geographic Concentration Analysis" />
          
          {/* Continental Breakdown Table */}
          <div className="border-[0.5px] border-border/85 bg-card/30 rounded-lg overflow-hidden mb-8">
            <div className="p-4 border-b-[0.5px] border-border/60 bg-muted/10">
              <h4 className="font-serif-display text-sm font-medium text-foreground">Continental Breakdown Metrics</h4>
              <p className="text-[10px] font-mono text-muted-foreground">Comprehensive global telemetry of unicorn density, value, and speed by continent</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b-[0.5px] border-border/60 bg-muted/20 text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                    <th className="py-2.5 px-4">Continent</th>
                    <th className="py-2.5 px-4 text-right">Unicorns</th>
                    <th className="py-2.5 px-4 text-right">Total Valuation</th>
                    <th className="py-2.5 px-4 text-right">Avg Valuation</th>
                    <th className="py-2.5 px-4 text-right">Avg Funding</th>
                    <th className="py-2.5 px-4 text-right">Avg Years to Unicorn</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30 text-xs">
                  {continentalBreakdown.map((c) => (
                    <tr key={c.name} className="hover:bg-muted/10 transition-colors">
                      <td className="py-2.5 px-4 font-medium text-foreground">
                        <div className="flex items-center gap-2">
                          <span className={cn('w-2 h-2 rounded-full', c.color)} />
                          {c.name}
                        </div>
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono text-muted-foreground">{c.count}</td>
                      <td className="py-2.5 px-4 text-right font-mono font-semibold text-foreground">{c.val}</td>
                      <td className="py-2.5 px-4 text-right font-mono text-muted-foreground">{c.avgVal}</td>
                      <td className="py-2.5 px-4 text-right font-mono text-muted-foreground">{c.avgFunding}</td>
                      <td className="py-2.5 px-4 text-right font-mono text-primary font-medium">{c.years}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Key Regional Vectors</div>
              <ul className="space-y-3.5 text-xs text-muted-foreground leading-relaxed">
                <li>
                  <span className="text-foreground font-semibold">North America Dominates counts; Asia leads speeds.</span> North America represents <span className="text-foreground font-medium">54.8%</span> of all unicorns. However, Asian startups reach $1B status in just <span className="text-foreground font-medium">5.8 years</span> on average vs. 6.8 for North America. Yet, Asian startups require 30% more capital ($661M vs $507M).
                </li>
                <li>
                  <span className="text-foreground font-semibold">Oceania as the Outlier.</span> Only 6 unicorns, but a massive <span className="text-foreground font-medium">$7.0B average valuation</span>, heavily driven by Canva ($40B valuation on only $572M raised), a legendary example of capital efficiency.
                </li>
                <li>
                  <span className="text-foreground font-semibold">European Leverage.</span> 143 companies averaging $3.52B. Sweden produces Klarna ($46B) and Northvolt ($12B). The UK alone holds 43 unicorns worth $195B, surpassing all of South America and Africa combined.
                </li>
              </ul>
            </div>
            
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">US vs. China Deep Comparison</div>
              <div className="space-y-2">
                {[
                  { m: 'Unicorn Count', u: '562', c: '173' },
                  { m: 'Total Valuation', u: '$1,933B', c: '$696B' },
                  { m: 'Avg Valuation', u: '$3.44B', c: '$4.02B' },
                  { m: 'Avg Funding', u: '$507M', c: '$661M' },
                  { m: 'Avg Years to Unicorn', u: '6.8 yrs', c: '5.8 yrs' },
                  { m: 'Top Industry', u: 'Internet Software (149)', c: 'E-commerce (29)' },
                ].map((item) => (
                  <div key={item.m} className="flex justify-between items-center text-xs border-b-[0.5px] border-border/20 pb-1.5">
                    <span className="text-muted-foreground font-mono text-[10px]">{item.m}</span>
                    <div className="flex gap-4 font-mono">
                      <span><span className="text-[9px] text-muted-foreground/60 mr-0.5">US:</span><span className="text-foreground font-semibold">{item.u}</span></span>
                      <span><span className="text-[9px] text-muted-foreground/60 mr-0.5">CN:</span><span className="text-primary font-semibold">{item.c}</span></span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground/80 leading-relaxed mt-4 italic">
                • Strategic Synthesis: Chinese unicorns scale a full year faster and command higher average valuations but exhibit heavier capital dependencies.
              </p>
            </div>
          </div>

          {/* India Spotlight Panel */}
          <div className="border-[0.5px] border-border bg-card/60 backdrop-blur-md rounded-lg p-6 mb-8 relative overflow-hidden shadow-none">
            {/* Top accented border line */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-amber-500/80" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-[0.5px] border-border/40 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <Award className="h-4.5 w-4.5 text-amber-500 shrink-0" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-foreground font-bold">EXECUTIVE SPOTLIGHT // GEOGRAPHIC INDEX: IN</span>
              </div>
              <span className="text-[9px] font-mono text-amber-600 dark:text-amber-400 font-bold bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded uppercase tracking-wider">
                India Startup Hub
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr] gap-6">
              <div className="space-y-3">
                <h3 className="font-serif-display text-lg font-medium text-foreground tracking-tight leading-snug">
                  High-Capital Dependency in the Third-Largest Global Hub
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed text-justify">
                  India ranks as the <strong className="text-foreground font-semibold">third-largest</strong> unicorn hub globally with 65 companies and a combined $196B valuation. However, Indian unicorns require exceptionally heavy capital to scale, posting an average funding of <span className="text-foreground font-semibold">$733M</span>, among the highest averages globally. They take <span className="text-foreground font-semibold">7.7 years</span> to cross $1B, slower than China (5.8) and the USA (6.8). E-commerce (16) and Fintech (15) account for 47.7% of all Indian unicorns. Edtech is disproportionately strong in India, represented by 6 unicorns including BYJU's at $22B, the country's highest-valued private company.
                </p>
              </div>

              {/* Stats & Top 5 Grid */}
              <div className="flex flex-col justify-between border-[0.5px] border-border/60 bg-muted/20 rounded p-4 font-mono text-[10px] h-full justify-start gap-4">
                <div className="border-b-[0.5px] border-border/40 pb-2">
                  <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">TOP INDIAN UNICORNS</span>
                </div>
                <div className="space-y-2.5">
                  {[
                    { name: "BYJU's", val: "$22B" },
                    { name: "Swiggy", val: "$11B" },
                    { name: "OYO Rooms", val: "$10B" },
                    { name: "Dream11", val: "$8B" },
                    { name: "Razorpay", val: "$8B" }
                  ].map((unicorn, i) => (
                    <div key={unicorn.name} className="flex justify-between items-center text-xs border-b-[0.5px] border-border/10 pb-1.5 last:border-0 last:pb-0">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <span className="text-[9px] opacity-40 font-semibold">0{i+1}.</span>
                        <span className="text-foreground font-semibold">{unicorn.name}</span>
                      </div>
                      <span className="text-amber-600 dark:text-amber-400 font-bold">{unicorn.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Top 15 Countries Table */}
          <div className="border-[0.5px] border-border/85 bg-card/30 rounded-lg overflow-hidden mb-8">
            <div className="p-4 border-b-[0.5px] border-border/60 bg-muted/10">
              <h4 className="font-serif-display text-sm font-medium text-foreground">Top 15 Unicorn Nations</h4>
              <p className="text-[10px] font-mono text-muted-foreground font-semibold">Ranked by unicorn volume</p>
            </div>
            <div className="overflow-x-auto max-h-[350px]">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b-[0.5px] border-border/60 bg-muted/20 text-[9px] font-mono uppercase tracking-widest text-muted-foreground sticky top-0 z-20">
                    <th className="py-2.5 px-4 bg-card/95">Country</th>
                    <th className="py-2.5 px-4 text-right bg-card/95">Unicorn Count</th>
                    <th className="py-2.5 px-4 text-right bg-card/95">Total Valuation</th>
                    <th className="py-2.5 px-4 text-right bg-card/95">Avg Valuation</th>
                    <th className="py-2.5 px-4 text-right bg-card/95">Avg Funding</th>
                    <th className="py-2.5 px-4 text-right bg-card/95">Avg Years</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30 text-xs">
                  {topCountries.map((tc, idx) => (
                    <tr key={tc.country} className="hover:bg-muted/10 transition-colors">
                      <td className="py-2 px-4 font-medium text-foreground">
                        <span className="text-muted-foreground/50 font-mono text-[10px] mr-2">#{idx + 1}</span>
                        {tc.country}
                      </td>
                      <td className="py-2 px-4 text-right font-mono text-muted-foreground font-semibold">{tc.count}</td>
                      <td className="py-2 px-4 text-right font-mono text-foreground font-semibold">{tc.totalVal}</td>
                      <td className="py-2 px-4 text-right font-mono text-muted-foreground">{tc.avgVal}</td>
                      <td className="py-2 px-4 text-right font-mono text-muted-foreground">{tc.avgFunding}</td>
                      <td className="py-2 px-4 text-right font-mono text-primary">{tc.years} yrs</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* City Innovation Hubs Grid */}
          <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5 mb-8">
            <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-4 font-semibold">City Innovation Hubs (Top 10)</div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {cityHubs.map((city, idx) => (
                <div key={city.city} className="border-[0.5px] border-border/60 bg-background/50 rounded p-3 text-center">
                  <div className="text-[10px] font-mono text-muted-foreground/60">RANK {idx + 1}</div>
                  <div className="text-sm font-serif-display text-foreground font-semibold truncate mt-1">{city.city}</div>
                  <div className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground/80 mt-0.5">{city.country}</div>
                  <div className="text-lg font-serif-display text-primary mt-1.5 font-bold">{city.count}</div>
                  <div className="text-[9px] font-mono text-muted-foreground/85 mt-0.5">{city.val} Combined</div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground mt-4 leading-relaxed italic">
              • The San Francisco outlier concentration ($724B combined) is worth more than China's second-largest city Shanghai ($99B) by a factor of 7x. Combined Bay Area cities represent over $830B, exceeding the unicorn wealth of all Asian nations combined.
            </p>
          </div>

          <Divider />

          {/* ── 3. INDUSTRY ANALYSIS ── */}
          <SectionHeading icon={BarChart3} label="3. Complete Industry Breakdown" />
          
          <div className="border-[0.5px] border-border/85 bg-card/30 rounded-lg overflow-hidden mb-8">
            <div className="p-4 border-b-[0.5px] border-border/60 bg-muted/10">
              <h4 className="font-serif-display text-sm font-medium text-foreground">Sectorial Performance Matrix</h4>
              <p className="text-[10px] font-mono text-muted-foreground">Analysis across 15 high-volume startup industries</p>
            </div>
            <div className="overflow-x-auto max-h-[400px]">
              <table className="w-full text-left border-collapse min-w-[850px]">
                <thead>
                  <tr className="border-b-[0.5px] border-border/60 bg-muted/20 text-[9px] font-mono uppercase tracking-widest text-muted-foreground sticky top-0 z-20">
                    <th className="py-2.5 px-4 bg-card/95">Industry Sector</th>
                    <th className="py-2.5 px-4 text-right bg-card/95">Unicorn Count</th>
                    <th className="py-2.5 px-4 text-right bg-card/95">Total Val.</th>
                    <th className="py-2.5 px-4 text-right bg-card/95">Avg Val.</th>
                    <th className="py-2.5 px-4 text-right bg-card/95">Median Val.</th>
                    <th className="py-2.5 px-4 text-right bg-card/95">Avg Funding</th>
                    <th className="py-2.5 px-4 text-right bg-card/95">Avg Years</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30 text-xs">
                  {industryAnalysis.map((ind) => (
                    <tr key={ind.industry} className="hover:bg-muted/10 transition-colors">
                      <td className="py-2.5 px-4 font-medium text-foreground truncate max-w-[200px]">{ind.industry}</td>
                      <td className="py-2.5 px-4 text-right font-mono text-muted-foreground">{ind.count}</td>
                      <td className="py-2.5 px-4 text-right font-mono font-semibold text-foreground">{ind.totalVal}</td>
                      <td className="py-2.5 px-4 text-right font-mono text-muted-foreground">{ind.avgVal}</td>
                      <td className="py-2.5 px-4 text-right font-mono text-muted-foreground">{ind.medianVal}</td>
                      <td className="py-2.5 px-4 text-right font-mono text-muted-foreground">{ind.funding}</td>
                      <td className="py-2.5 px-4 text-right font-mono text-primary font-medium">{ind.years} yrs</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5 space-y-4">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground font-semibold">Major Industry Vectors</div>
              <div className="text-xs text-muted-foreground leading-relaxed space-y-3.5">
                <p>
                  <span className="text-foreground font-semibold">Fintech Concentration:</span> The single largest sector (224 companies, $882B total value). However, median value is exactly $2.0B, meaning Stripe ($95B), Klarna ($46B), and Checkout.com ($40B) heavily skew the average upward.
                </p>
                <p>
                  <span className="text-foreground font-semibold">AI Speed Dynamics:</span> Promoted by Bytedance ($180B), the sector boasts the highest average valuation ($4.95B) and a rapid 6.0 years average timeline to unicorn status.
                </p>
                <p>
                  <span className="text-foreground font-semibold">Supply Chain Logistics Cap:</span> The most capital-hungry segment (average funding of $793M), yet exhibits the lowest median valuation ($1.0B), signaling extreme capital burn rates.
                </p>
              </div>
            </div>

            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5 space-y-4">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground font-semibold">Friction, Timelines, & Capital Efficiency</div>
              <div className="text-xs text-muted-foreground leading-relaxed space-y-3.5">
                <p>
                  <span className="text-foreground font-semibold">Auto & Transportation:</span> Reaches $1B quickest at 5.0 years average, but carries the heaviest launch costs (avg funding $1,131M) to fund heavy industrial infrastructure.
                </p>
                <p>
                  <span className="text-foreground font-semibold">Regulatory Friction in Health:</span> The slowest sector to scale alongside Consumer & Retail, averaging 8.2 years due to intensive clinical validation pipelines.
                </p>
                <p>
                  <span className="text-foreground font-semibold">Internet Software Efficiency:</span> Outstanding software economics (avg funding of only $359M vs. $2.90B valuation). Renders outliers like Zapier ($4B valuation on just $1M raised).
                </p>
              </div>
            </div>
          </div>

          <Divider />

          {/* ── 4. THE 2021 SURGE ANOMALY ── */}
          <SectionHeading icon={Zap} label="4. The 2021 Explosion Anomaly" />
          
          <div className="border-[0.5px] border-amber-500/20 bg-amber-500/5 rounded-lg p-6 mb-8">
            <h4 className="font-serif-display text-xl text-foreground font-normal mb-3">520 Unicorns Created in a Single Calendar Year</h4>
            <p className="text-xs text-muted-foreground leading-relaxed mb-6">
              The single most significant finding in the entire historical ledger: <strong className="text-foreground font-semibold">520 out of 1,074 unicorns (48.4%)</strong> were created in 2021. This represents a staggering <strong className="text-foreground font-semibold">4.8x single-year acceleration</strong> over the historical pre-2020 baseline of ~104/year.
            </p>

            <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-6">
              {/* Year list */}
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {yearlyCreation.slice(6).map((yr) => (
                  <div 
                    key={yr.year} 
                    className={cn(
                      'border-[0.5px] rounded p-2 text-center flex flex-col justify-between min-h-[75px]',
                      yr.highlight 
                        ? 'border-amber-500 bg-amber-500/10 shadow-[0_0_10px_rgba(245,158,11,0.1)]' 
                        : 'border-border bg-background/50'
                    )}
                  >
                    <span className="text-[10px] font-mono text-muted-foreground">{yr.year}</span>
                    <span className={cn('text-lg font-serif-display font-bold', yr.highlight ? 'text-amber-500' : 'text-foreground')}>
                      {yr.count}
                    </span>
                    <span className="text-[8px] font-mono text-muted-foreground/60">{yr.val} Val</span>
                  </div>
                ))}
              </div>

              {/* Drivers info */}
              <div className="text-xs text-muted-foreground leading-relaxed space-y-2 border-l-[0.5px] border-border/40 pl-5">
                <div className="text-[9px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold mb-1">Macroeconomic Drivers</div>
                <p>• <strong className="text-foreground font-semibold">Zero Interest Rates:</strong> Pushed private capital aggressively into risk assets.</p>
                <p>• <strong className="text-foreground font-semibold">Post-COVID Digital Surge:</strong> Software validation timelines collapsed overnight.</p>
                <p>• <strong className="text-foreground font-semibold">SPAC Liquidity:</strong> Lowered listing barriers to artificially secure private valuations.</p>
                <p className="text-[10px] mt-2 italic text-muted-foreground/80">
                  • Post-peak Correction: 2022 collapse reverted new counts down to 116, marking a 77.7% drop and sliding average valuations to historical lows.
                </p>
              </div>
            </div>
          </div>

          <Divider />

          {/* ── 5. VALUATION TIERS & ALL DECACORNS ── */}
          <SectionHeading icon={Building2} label="5. Valuation Tiers & Decacorns ($10B+)" />

          <div className="grid md:grid-cols-4 gap-3.5 mb-8">
            {valuationTiers.map((t) => (
              <div key={t.tier} className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-4 text-center">
                <div className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">{t.tier}</div>
                <div className="text-2xl font-serif-display text-foreground font-semibold mt-1">{t.count}</div>
                <div className="text-[10px] font-mono text-primary font-bold mt-1">{t.range}</div>
                <div className="text-[9px] font-mono text-muted-foreground/80 mt-1">Combined Val: {t.value}</div>
                <div className="text-[8px] font-mono text-muted-foreground/50 mt-0.5">Speed: {t.years}</div>
              </div>
            ))}
          </div>

          {/* Interactive Decacorns Census */}
          <div className="border-[0.5px] border-border/85 bg-card/30 rounded-lg overflow-hidden mb-8">
            <div className="p-4 border-b-[0.5px] border-border/60 bg-muted/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-serif-display text-sm font-medium text-foreground">Decacorn Registry ($10B+)</h4>
                <p className="text-[10px] font-mono text-muted-foreground">Census data mapping the most valuable outliers in private technology</p>
              </div>

              {/* Interactive Slicer Filter */}
              <div className="flex items-center gap-1.5 self-start">
                <Filter className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <select
                  value={decacornFilter}
                  onChange={(e) => setDecacornFilter(e.target.value)}
                  className="bg-background border-[0.5px] border-border text-[9px] font-mono rounded px-2 py-1 text-foreground focus:outline-none focus:border-primary"
                >
                  {uniqueIndustries.map((ind) => (
                    <option key={ind} value={ind}>{ind === 'All' ? 'Filter by Sector' : ind}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-auto max-h-[300px]">
              <table className="w-full text-left border-collapse min-w-[650px]">
                <thead>
                  <tr className="border-b-[0.5px] border-border/60 bg-muted/20 text-[9px] font-mono uppercase tracking-widest text-muted-foreground sticky top-0 z-20">
                    <th className="py-2 px-4 bg-card/95">Company</th>
                    <th className="py-2 px-4 bg-card/95">Country</th>
                    <th className="py-2 px-4 bg-card/95">Industry Sector</th>
                    <th className="py-2 px-4 text-right bg-card/95">Valuation</th>
                    <th className="py-2 px-4 text-right bg-card/95">Total Funding</th>
                    <th className="py-2 px-4 text-right bg-card/95">Time to $1B</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30 text-xs font-mono">
                  {filteredDecacorns.map((d) => (
                    <tr key={d.company} className="hover:bg-muted/10 transition-colors">
                      <td className="py-1.5 px-4 font-serif-display font-semibold text-foreground">{d.company}</td>
                      <td className="py-1.5 px-4 text-muted-foreground">{d.country}</td>
                      <td className="py-1.5 px-4 text-muted-foreground text-[10px]">{d.industry}</td>
                      <td className="py-1.5 px-4 text-right font-bold text-primary">{d.val}</td>
                      <td className="py-1.5 px-4 text-right text-muted-foreground">{d.funding}</td>
                      <td className="py-1.5 px-4 text-right text-muted-foreground">{d.years} yrs</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredDecacorns.length === 0 && (
                <div className="p-8 text-center text-xs text-muted-foreground font-mono">No companies found matching the filter.</div>
              )}
            </div>
          </div>

          <Divider />

          {/* ── 6. CAPITAL EFFICIENCY & SPEED ── */}
          <SectionHeading icon={DollarSign} label="6. Capital Efficiency Analysis" />
          
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Efficiency Table */}
            <div className="border-[0.5px] border-border/85 bg-card/30 rounded-lg overflow-hidden">
              <div className="p-4 border-b-[0.5px] border-border/60 bg-muted/10">
                <h4 className="font-serif-display text-xs font-medium text-foreground">Most Capital-Efficient Vectors</h4>
                <p className="text-[10px] font-mono text-muted-foreground">Ranked by Valuation to Funding multiples</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b-[0.5px] border-border/60 bg-muted/20 text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                      <th className="py-2 px-3">Company</th>
                      <th className="py-2 px-3">Sector</th>
                      <th className="py-2 px-3 text-right">Valuation</th>
                      <th className="py-2 px-3 text-right">Funding</th>
                      <th className="py-2 px-3 text-right">Multiple</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30 font-mono text-[11px]">
                    {capitalEfficiency.map((ce) => (
                      <tr key={ce.company} className="hover:bg-muted/10 transition-colors">
                        <td className="py-2 px-3 font-serif-display font-bold text-foreground">{ce.company}</td>
                        <td className="py-2 px-3 text-muted-foreground text-[10px] truncate max-w-[100px]">{ce.industry}</td>
                        <td className="py-2 px-3 text-right text-foreground font-semibold">{ce.val}</td>
                        <td className="py-2 px-3 text-right text-muted-foreground">{ce.funding}</td>
                        <td className="py-2 px-3 text-right text-primary font-bold">{ce.ratio}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Timelines and Speed */}
            <div className="space-y-4">
              <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
                <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground font-semibold mb-3">The Bootstrapping Outlier</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-semibold">Zapier is the ultimate outlier in global data.</span> Reaching a <span className="text-foreground font-semibold">$4B valuation on just $1M in total funding</span>, yielding a legendary <strong className="text-foreground font-semibold">4,000x efficiency ratio</strong>. Zapier achieved this by maintaining strict bootstrapping discipline for 10 years, avoiding venture capital dilution entirely.
                </p>
                <div className="border-[0.5px] border-primary/20 bg-primary/5 rounded p-3 font-mono text-[10px] text-muted-foreground mt-3">
                  <div className="text-primary font-semibold">Zapier capital profile:</div>
                  <div className="flex justify-between mt-1"><span>Valuation:</span> <span className="text-foreground">$4,000,000,000</span></div>
                  <div className="flex justify-between"><span>VC Capital Raised:</span> <span className="text-foreground">$1,000,000</span></div>
                  <div className="flex justify-between border-t-[0.5px] border-border/30 mt-1 pt-1"><span>Efficiency ratio:</span> <span className="text-foreground font-bold">4000.0x</span></div>
                </div>
              </div>

              <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
                <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground font-semibold mb-2">TIMELINE ANOMALIES: 1-YEAR vs 98-YEARS</div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  • <strong className="text-foreground font-semibold">Fastest (1 Year):</strong> Brex, Devoted Health, candy.com, and Chehaoduo reached unicorn status within 12 months. These were heavily backed by serial founders and VC teams rather than standard organic product paths.
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  • <strong className="text-foreground font-semibold">Slowest (98 Years):</strong> Otto Bock HealthCare (Germany, founded 1919) joined the registry in 2017. This showcases a definitional quirk: unicorn status is about valuation at a point in time, not standard venture-backed startups.
                </p>
              </div>
            </div>
          </div>

          <Divider />

          {/* ── 7. INVESTOR ECOSYSTEM & FOUNDING ERA ── */}
          <SectionHeading icon={Database} label="7. Investor Ecosystem & Eras" />
          
          <div className="grid lg:grid-cols-12 gap-8 mb-8">
            {/* Top 20 active investors */}
            <div className="lg:col-span-6 border-[0.5px] border-border/85 bg-card/30 rounded-lg overflow-hidden">
              <div className="p-4 border-b-[0.5px] border-border/60 bg-muted/10">
                <h4 className="font-serif-display text-xs font-medium text-foreground">Top 20 Most Active Venture Investors</h4>
                <p className="text-[10px] font-mono text-muted-foreground">Portfolio densities of the global venture landscape</p>
              </div>
              <div className="overflow-y-auto max-h-[300px]">
                <table className="w-full text-left border-collapse text-xs font-mono">
                  <thead>
                    <tr className="border-b-[0.5px] border-border/60 bg-muted/20 text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                      <th className="py-2 px-4">Investor Franchise</th>
                      <th className="py-2 px-4 text-right">Portfolio Unicorns</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {activeInvestors.map((i, idx) => (
                      <tr key={i.investor} className="hover:bg-muted/10 transition-colors">
                        <td className="py-1.5 px-4 font-serif-display font-medium text-foreground">
                          <span className="text-muted-foreground/40 text-[10px] mr-2">#{idx+1}</span>
                          {i.investor}
                        </td>
                        <td className="py-1.5 px-4 text-right text-primary font-bold">{i.count} companies</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Era dynamics */}
            <div className="lg:col-span-6 space-y-6">
              <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
                <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground font-semibold mb-3">Founding Era compression</div>
                <div className="space-y-3.5">
                  {foundingEra.map((fe) => (
                    <div key={fe.era} className="flex justify-between items-center text-xs border-b-[0.5px] border-border/20 pb-2 last:border-0 last:pb-0">
                      <div>
                        <span className="font-mono text-foreground font-semibold">{fe.era} Founders</span>
                        <div className="text-[9px] text-muted-foreground font-mono mt-0.5">{fe.count} startups registered</div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-foreground font-semibold">{fe.avgVal} Avg Val</div>
                        <div className="text-primary text-[10px]">{fe.years} avg path</div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[9.5px] text-muted-foreground/80 mt-4 leading-relaxed italic">
                  • Compression Signal: Timeline to become a unicorn dropped from 21.4 years in the 1990s down to 5.7 years in the 2010s. Startups scale at unprecedented pacing. (Note: Excludes 3 outlier companies founded prior to 1990, such as Otto Bock HealthCare founded in 1919).
                </p>
              </div>

              <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
                <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground font-semibold mb-2">Venture Franchise Takeaways</div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                  • <strong className="text-foreground font-semibold">Accel Leads Solo:</strong> Portfolio count of 60 unicorn investments, typically backing startups at the early-stage layers.
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  • <strong className="text-foreground font-semibold">Sequoia Family Power:</strong> Sequoia Capital (47) + Sequoia China (48) + Sequoia India (25) aggregate to <strong className="text-foreground font-semibold">120 portfolio unicorns</strong> across regional franchises.
                </p>
              </div>
            </div>
          </div>

          <Divider />

          {/* ── 8. ANOMALY RECORDS ── */}
          <SectionHeading icon={TrendingUp} label="8. Extreme Anomaly Records" />
          <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg overflow-hidden mb-8">
            <div className="grid grid-cols-3 gap-2 px-5 py-3 border-b-[0.5px] border-border/60 bg-muted/20 text-[9px] font-mono uppercase tracking-widest text-muted-foreground font-semibold">
              <span>Extreme Record Descriptor</span>
              <span>Outlier Entity</span>
              <span className="text-right">Observed Value</span>
            </div>
            {anomalyRecords.map((ar, i) => (
              <div 
                key={ar.record} 
                className={cn(
                  'grid grid-cols-3 gap-2 px-5 py-3 text-xs',
                  i < anomalyRecords.length - 1 && 'border-b-[0.5px] border-border/30'
                )}
              >
                <span className="text-muted-foreground font-mono text-[10px]">{ar.record}</span>
                <span className="font-serif-display font-medium text-foreground">{ar.company}</span>
                <span className="text-right text-primary font-mono font-semibold">{ar.value}</span>
              </div>
            ))}
          </div>

          <Divider />

          {/* ── 9. TECHNICAL WORK ── */}
          <SectionHeading icon={Database} label="9. Power BI ETL & Modeling Specifications" />
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">1. Relational Modeling</div>
              <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed">
                <li>• Engineered highly optimized <strong className="text-foreground font-semibold">Star Schema</strong> relational database.</li>
                <li>• Separated high-volume transaction fact dimensions (`Unicorn_Companies`) from dimension sets (`Funding` and `Investors`).</li>
                <li>• Managed dynamic cross-filtering paths across separate XLSX/CSV files.</li>
              </ul>
            </div>

            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">2. Power Query Pipelines</div>
              <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed">
                <li>• Parsed text columns to numeric float layers (stripping '$', scaling B/M units).</li>
                <li>• Handled string transformations to generate calculated "Years to Unicorn" dimensions.</li>
                <li>• Normalized messy comma-delimited investor columns into analytical dimensions.</li>
              </ul>
            </div>

            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-5">
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold">3. DAX Script Metrics</div>
              <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed">
                <li>• Written robust dynamic filter measures tracking Sum of Valuation under slicer criteria.</li>
                <li>• Built Time-Intelligence measures mapping growth percentages YoY.</li>
                <li>• Engineered complex Valuation to Funding Efficiency DAX ratio models.</li>
              </ul>
            </div>
          </div>

          <Divider />

          {/* ── 10. COMPETENCIES DEMONSTRATED ── */}
          <SectionHeading icon={BookOpen} label="10. Strategic Competencies Demonstrated" />
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 mb-8">
            {[
              { title: 'Data Warehousing', desc: 'Star schema ETL pipelines' },
              { title: 'DAX Proficiency', desc: 'Custom calculations & ratios' },
              { title: 'Business Framing', desc: 'Corporate scaling dynamics' },
              { title: 'Outlier Mining', desc: 'Isolating macro market anomalies' },
              { title: 'Statistical Depth', desc: 'Mean vs Median distribution' },
            ].map((skill) => (
              <div key={skill.title} className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-4 text-center">
                <div className="text-xs font-semibold text-foreground mb-1 leading-snug">{skill.title}</div>
                <div className="text-[9px] font-mono text-muted-foreground mt-1 leading-normal">{skill.desc}</div>
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

export default CaseStudyUnicorn;
