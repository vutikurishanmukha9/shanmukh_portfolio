import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { Github, ArrowUpRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { BlurFade } from '@/components/magicui/blur-fade';
import { GridPattern } from '@/components/magicui/grid-pattern';

const GITHUB_USERNAME = 'vutikurishanmukha9';

const calendarTheme = {
  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  dark: ['#18181b', '#0e4429', '#006d32', '#26a641', '#39d353'],
};

export const GrindingActivitySection = () => {
  const { theme } = useTheme();

  return (
    <SectionWrapper id="activity" className="py-20 sm:py-28 md:py-32 bg-muted/10 border-t border-border relative overflow-hidden">
      {/* Background Architectural Grid Pattern */}
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        strokeDasharray="2 4"
        squares={[
          [2, 2],
          [5, 4],
          [8, 1],
          [12, 3],
        ]}
        className="opacity-25 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_75%)]"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
        
        {/* Section Header */}
        <BlurFade delay={0.05} inView>
          <div className="max-w-2xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-card text-xs font-mono font-medium text-foreground mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>OPEN SOURCE ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground font-display leading-[1.12]">
              Public Code & Systems Cadence
            </h2>
            <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-[1.7] max-w-[62ch]">
              Writing production architectures, developer tools, and reproducible benchmarks in public view.
            </p>
          </div>
        </BlurFade>

        {/* GitHub Calendar Card (Double-Bezel Hardware Architecture) */}
        <BlurFade delay={0.15} inView>
          <div className="p-1.5 rounded-[1.5rem] border border-border/80 bg-muted/20 shadow-xs hover:border-primary/40 transition-all duration-200">
            <div className="rounded-[1.375rem] border border-border/70 bg-card p-6 sm:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-4 border-b border-border gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl border border-border bg-muted/60 text-foreground">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-foreground">GitHub Contributions</h3>
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live Feed
                      </span>
                    </div>
                    <p className="text-xs font-mono text-muted-foreground mt-0.5">@{GITHUB_USERNAME}</p>
                  </div>
                </div>

                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-2 pl-3.5 pr-1.5 py-1.5 rounded-full border border-border bg-muted/40 hover:bg-muted active:scale-[0.98] text-xs font-medium text-foreground transition-all shadow-2xs self-stretch sm:self-auto justify-center"
                >
                  <span>Inspect GitHub Repositories</span>
                  <span className="w-5 h-5 rounded-full bg-background border border-border/70 flex items-center justify-center transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 shrink-0">
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground group-hover/btn:text-foreground" />
                  </span>
                </a>
              </div>

              {/* High-Signal Metrics Strip with Magic UI NumberTicker */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-6">
                <div className="p-3.5 rounded-xl border border-border/70 bg-muted/20 text-center">
                  <div className="text-lg sm:text-2xl font-bold font-display text-foreground">
                    <NumberTicker value={1500} suffix="+" />
                  </div>
                  <div className="text-[11px] sm:text-xs font-mono text-muted-foreground mt-1">Public Contributions</div>
                </div>
                <div className="p-3.5 rounded-xl border border-border/70 bg-muted/20 text-center">
                  <div className="text-lg sm:text-2xl font-bold font-display text-foreground">
                    <NumberTicker value={10} suffix="+" />
                  </div>
                  <div className="text-[11px] sm:text-xs font-mono text-muted-foreground mt-1">Open Repositories</div>
                </div>
                <div className="p-3.5 rounded-xl border border-border/70 bg-muted/20 text-center">
                  <div className="text-lg sm:text-2xl font-bold font-display text-emerald-600 dark:text-emerald-400">Continuous</div>
                  <div className="text-[11px] sm:text-xs font-mono text-muted-foreground mt-1">Commit Cadence</div>
                </div>
              </div>
              
              {/* Live GitHub Calendar Tracker */}
              <div className="relative overflow-x-auto pb-2 pt-1 no-scrollbar touch-pan-x">
                <div className="min-w-[720px] text-foreground flex justify-center">
                  <GitHubCalendar
                    username={GITHUB_USERNAME}
                    year="last"
                    colorScheme={theme === 'dark' ? 'dark' : 'light'}
                    theme={calendarTheme}
                    blockSize={13}
                    blockMargin={4}
                    fontSize={12}
                    renderBlock={(block, activity) => React.cloneElement(block, {
                      'data-tooltip-id': 'github-calendar-tooltip',
                      'data-tooltip-content': `${activity.count} contributions on ${new Date(activity.date).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}`,
                    })}
                  />
                  <Tooltip 
                    id="github-calendar-tooltip" 
                    className="!text-xs !rounded-lg !border !border-border !bg-popover !text-popover-foreground !px-2.5 !py-1 !shadow-md !z-50"
                  />
                </div>
              </div>

              <div className="sm:hidden text-center text-xs font-mono text-muted-foreground mt-3">
                ← Scroll horizontally for full timeline →
              </div>
            </div>
          </div>
        </BlurFade>

      </div>
    </SectionWrapper>
  );
};