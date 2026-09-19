import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { Github, ArrowUpRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { motion } from 'framer-motion';

const GITHUB_USERNAME = 'vutikurishanmukha9';

// Authentic GitHub Commit Color Grading
const calendarTheme = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
};

export const GrindingActivitySection = () => {
    const { theme } = useTheme();

    return (
        <SectionWrapper id="activity" className="py-16 bg-background border-b-2 border-black">
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                
                {/* Section Header */}
                <div className="text-center mb-12 max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 border-2 border-black bg-primary text-black font-head text-xs font-bold uppercase shadow-xs mb-4"
                    >
                        <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                        <span>Consistency & Output</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 }}
                        className="text-4xl md:text-5xl font-head font-bold tracking-tight text-foreground uppercase select-none"
                    >
                        Daily Activity
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-3 text-foreground text-sm font-medium max-w-md mx-auto leading-relaxed"
                    >
                        Live tracking of continuous engineering output, open-source commits, and active codebase contributions.
                    </motion.p>
                </div>

                {/* GitHub Contribution Calendar Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="relative border-2 border-black bg-card rounded-none p-4 sm:p-6 md:p-10 shadow-[6px_6px_0px_#000] overflow-hidden">
                        {/* Card Header */}
                        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4 pb-4 sm:pb-6 border-b-2 border-black">
                            <div className="flex items-center gap-3.5">
                                <div className="w-12 h-12 rounded-none bg-primary border-2 border-black flex items-center justify-center shadow-xs">
                                    <Github className="w-6 h-6 text-black" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-xl font-head font-bold text-foreground uppercase">GitHub Contributions</h3>
                                        <span className="px-2 py-0.5 rounded-none text-[10px] font-head bg-emerald-400 text-black border border-black font-bold flex items-center gap-1 shadow-none">
                                            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                                            LIVE
                                        </span>
                                    </div>
                                    <p className="text-xs font-mono text-muted-foreground font-semibold mt-0.5">@{GITHUB_USERNAME}</p>
                                </div>
                            </div>

                            {/* GitHub Profile Button */}
                            <a
                                href={`https://github.com/${GITHUB_USERNAME}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto justify-center px-4 py-2 bg-primary text-black border-2 border-black text-xs font-head font-bold uppercase tracking-wider hover:bg-primary-hover transition-all shadow-xs active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1.5"
                            >
                                <span>GitHub Profile</span>
                                <ArrowUpRight className="w-4 h-4" />
                            </a>
                        </div>
                        
                        {/* Live GitHub Calendar Tracker */}
                        <div className="relative z-10 -mx-4 sm:mx-0 overflow-x-auto pb-3 pt-2 hide-scrollbar">
                            <div className="min-w-[680px] sm:min-w-[780px] px-4 sm:px-0 text-foreground flex justify-center">
                                <GitHubCalendar
                                    username={GITHUB_USERNAME}
                                    year="last"
                                    colorScheme={(theme as string) === 'dark' ? 'dark' : 'light'}
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
                                    className="!text-xs !font-head !bg-primary !text-black !border-2 !border-black !rounded-none !px-2.5 !py-1 !shadow-[2px_2px_0px_#000] !z-50 !opacity-100"
                                />
                            </div>
                        </div>

                        {/* Mobile Horizontal Scroll Indicator */}
                        <div className="sm:hidden text-center text-[10px] font-mono font-bold text-muted-foreground mt-2 uppercase tracking-wider">
                            ← Swipe horizontally to explore full commit history →
                        </div>

                    </div>
                </motion.div>

            </div>
        </SectionWrapper>
    );
};
