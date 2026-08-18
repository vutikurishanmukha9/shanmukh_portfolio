import React, { useState, useRef, useCallback } from 'react';
import { FileSpreadsheet, CheckCircle2, Split } from 'lucide-react';

interface DataDiffSliderProps {
  caseStudyId: 'unicorn' | 'adidas' | 'sales';
}

const diffData = {
  unicorn: {
    rawTitle: "RAW UNPROCESSED INPUT (CSV / WEBSCRAPE)",
    rawSnippet: [
      `"Company","Valuation ($B)","Date Joined","Country","City","Industry","Select Investors"`,
      `"ByteDance","$140","4/7/2017","China","Beijing","Artificial intelligence","Sequoia Capital China, SIG Asia Investments..."`,
      `"SpaceX","$100","12/1/2012","United States","Hawthorne","Other","Founders Fund, Draper Fisher Jurvetson..."`,
      `"SHEIN","$100","7/3/2018","China","Shenzhen","E-commerce & direct-to-consumer","Tiger Global Management, Sequoia Capital..."`,
      `"Stripe","$95","1/23/2014","United States","San Francisco","Fintech","Khosla Ventures, Lowercase Capital..."`,
    ],
    cleanTitle: "STAR-SCHEMA MODEL & DAX AGGREGATES",
    cleanSnippet: [
      `[DIM_COMPANY]: ID, Name, HQ_Region (North America / Asia / Europe)`,
      `[FACT_FUNDING]: Total_Valuation = $3,711B | Capital_Raised = $591.8B`,
      `[DAX_MEASURE]: Capital_Efficiency = DIVIDE([Total_Valuation], [Total_Funding], 0) => 6.27x`,
      `[DAX_MEASURE]: Years_To_Unicorn = DATEDIFF(Joined_Date, Founded_Date, YEAR) => Avg 7.0 Yrs`,
      `[INSIGHT]: 520 Unicorns (48.4%) formed during 2021 surge with 5x capital velocity`,
    ],
  },
  adidas: {
    rawTitle: "RAW TRANSACTION LOGS (15 UNSTRUCTURED COLS)",
    rawSnippet: [
      `Retailer,Retailer ID,Invoice Date,Region,State,City,Product,Price per Unit,Units Sold,Total Sales,Operating Profit`,
      `Foot Locker,1185732,1/1/2020,Northeast,New York,New York,Men's Street Footwear,$50,1200,$600000,$300000`,
      `Foot Locker,1185732,1/2/2020,Northeast,New York,New York,Men's Athletic Footwear,$50,1000,$500000,$150000`,
      `Sports Direct,1197831,1/3/2020,South,Texas,Houston,Women's Apparel,$40,850,$340000,$136000`,
    ],
    cleanTitle: "EXECUTIVE PROFITABILITY & CHANNEL BI",
    cleanSnippet: [
      `[REVENUE]: Total $899.9M Gross Sales | $332.1M Net Operating Profit`,
      `[MARGIN BREAKDOWN]: Online Channel (46.4% Margin) vs In-Store (35.6% Margin)`,
      `[STATISTICAL ANOMALY]: Daily spikes > 2 Standard Deviations isolated via NumPy`,
      `[REGIONAL BI]: West Region dominates at 30% Market Share with +294.2% YoY Growth`,
    ],
  },
  sales: {
    rawTitle: "RAW REGIONAL INVOICES (UNINDEXED CSV)",
    rawSnippet: [
      `InvoiceID,CustID,Region,ProductGroup,GrossAmt,DiscountPct,TaxAmt,NetTotal,ReturnFlag`,
      `INV-8821,C-901,EMEA,Hardware,$12400.00,0.15,$1054.00,$11594.00,0`,
      `INV-8822,C-402,APAC,Enterprise SaaS,$45000.00,0.05,$3825.00,$46575.00,0`,
    ],
    cleanTitle: "CLEANED ANALYTICS CUBE & RETENTION BI",
    cleanSnippet: [
      `[CUBE_METRICS]: Gross Revenue: $14.2M | Net Realized: $12.8M`,
      `[RETENTION DAX]: Cohort NRR: 118% | Churn Probability: < 2.4%`,
      `[DIMENSION HIERARCHY]: Enterprise Tier accounts for 68% of Net Expansion`,
    ],
  }
} as const;

export const DataDiffSlider: React.FC<DataDiffSliderProps> = ({ caseStudyId }) => {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const isDraggingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clamped = Math.max(10, Math.min(90, (x / rect.width) * 100));
    setSliderPos(clamped);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current || e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPos((prev) => Math.max(10, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPos((prev) => Math.min(90, prev + 5));
    }
  };

  const current = diffData[caseStudyId] || diffData.unicorn;

  return (
    <div className="space-y-3 select-none">
      <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground uppercase tracking-widest px-1">
        <span className="flex items-center gap-1.5 text-amber-500 font-semibold">
          <FileSpreadsheet className="w-3.5 h-3.5" />
          Raw Uncleaned (Left)
        </span>
        <span className="text-[9px] opacity-60">Drag Divider // Compare Data Pipeline</span>
        <span className="flex items-center gap-1.5 text-primary font-semibold">
          Cleaned BI Model (Right)
          <CheckCircle2 className="w-3.5 h-3.5" />
        </span>
      </div>

      <div
        ref={containerRef}
        role="slider"
        tabIndex={0}
        aria-label="Data comparison slider"
        aria-valuenow={Math.round(sliderPos)}
        aria-valuemin={10}
        aria-valuemax={90}
        onKeyDown={handleKeyDown}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={() => { isDraggingRef.current = true; }}
        onMouseUp={() => { isDraggingRef.current = false; }}
        className="relative h-64 sm:h-56 w-full rounded-lg border-[0.5px] border-border/80 overflow-hidden bg-muted/20 font-mono text-[10px] sm:text-[11px] cursor-ew-resize shadow-none focus:outline-hidden focus:ring-1 focus:ring-primary"
      >
        {/* Right Side: Cleaned Transformed BI (Full Width Background) */}
        <div className="absolute inset-0 p-4 bg-primary/5 text-foreground flex flex-col justify-between overflow-hidden">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b-[0.5px] border-primary/20 text-primary font-semibold text-[9px] tracking-wider uppercase">
              <span>{current.cleanTitle}</span>
              <span className="px-1.5 py-0.5 rounded bg-primary/15 text-primary text-[8px]">PROCESSED</span>
            </div>
            <div className="space-y-1.5 text-foreground/90 font-mono leading-relaxed">
              {current.cleanSnippet.map((line) => (
                <div key={line} className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="truncate">{line}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[8px] text-muted-foreground/60 flex justify-between">
            <span>SCHEMA // STAR_DIM_FACT</span>
            <span>VERIFIED METRICS</span>
          </div>
        </div>

        {/* Left Side: Raw Messy CSV (Clipped based on slider position) */}
        <div
          className="absolute inset-y-0 left-0 p-4 bg-background/95 backdrop-blur-md border-r-[0.5px] border-border text-muted-foreground flex flex-col justify-between overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="min-w-[320px] sm:min-w-[480px]">
            <div className="flex items-center justify-between pb-2 mb-2 border-b-[0.5px] border-border/40 text-amber-600 font-semibold text-[9px] tracking-wider uppercase">
              <span>{current.rawTitle}</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-600 text-[8px]">RAW CSV</span>
            </div>
            <div className="space-y-1 text-muted-foreground/80 font-mono text-[9px] leading-relaxed overflow-x-hidden">
              {current.rawSnippet.map((line) => (
                <div key={line} className="truncate opacity-75 font-mono">
                  {line}
                </div>
              ))}
            </div>
          </div>
          <div className="text-[8px] text-muted-foreground/40 flex justify-between min-w-[320px]">
            <span>UNVALIDATED RAW STREAM</span>
            <span>SPLIT_POS: {Math.round(sliderPos)}%</span>
          </div>
        </div>

        {/* Dynamic Center Drag Handle */}
        <div
          className="absolute inset-y-0 w-0.5 bg-primary pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-background border border-primary text-primary flex items-center justify-center shadow-md">
            <Split className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
};
