import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { Github, ArrowUpRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { motion } from 'framer-motion';

const GITHUB_USERNAME = 'vutikurishanmukha9';

const calendarTheme = {
  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  dark: ['#18181b', '#0e4429', '#006d32', '#26a641', '#39d353'],
};

export const GrindingActivitySection = () => {
  const { theme } = useTheme();

  return (
    <SectionWrapper id="activity" className="py-10 sm:py-12 bg-muted/10 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-medium text-foreground mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>Open Source Velocity</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
          >
            Engineering Activity
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-muted-foreground text-base leading-relaxed"
          >
            Live tracking of continuous engineering commits, open-source repositories, and code contributions.
          </motion.p>
        </div>

        {/* GitHub Calendar Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-1.5 rounded-[1.375rem] border border-border/80 bg-muted/20 shadow-xs hover:border-primary/40 transition-all duration-200"
        >
          <div className="rounded-2xl border border-border/70 bg-card p-6 sm:p-8 shadow-xs">
            {/* Card Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-4 border-b border-border gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl border border-border bg-muted/60 text-foreground">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-foreground">GitHub Contributions</h3>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Sync
                    </span>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">@{GITHUB_USERNAME}</p>
                </div>
              </div>

              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-2 pl-3.5 pr-1.5 py-1.5 rounded-full border border-border bg-muted/40 hover:bg-muted text-xs font-medium text-foreground transition-all shadow-2xs"
              >
                <span>Inspect GitHub Profile</span>
                <span className="w-5 h-5 rounded-full bg-background border border-border/70 flex items-center justify-center transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 shrink-0">
                  <ArrowUpRight className="w-3 h-3 text-muted-foreground group-hover/btn:text-foreground" />
                </span>
              </a>
            </div>
            
            {/* Live GitHub Calendar Tracker */}
            <div className="overflow-x-auto pb-2 pt-1 no-scrollbar">
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
        </motion.div>

      </div>
    </SectionWrapper>
  );
};
