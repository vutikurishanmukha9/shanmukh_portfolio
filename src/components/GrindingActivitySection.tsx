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
        <SectionWrapper id="activity" className="py-16 bg-background border-b-[0.5px] border-border/40">
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                
                {/* Section Header */}
                <div className="text-center mb-12 max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border-[0.5px] border-border/80 shadow-none mb-4"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">Consistency & Output</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 }}
                        className="text-4xl md:text-5xl font-serif-display font-medium tracking-tight text-foreground select-none"
                    >
                        Daily Activity
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-3 text-muted-foreground text-xs max-w-md mx-auto leading-relaxed"
                    >
                        Live tracking of continuous engineering output, open-source commits, and active codebase contributions.
                    </motion.p>
                </div>

                {/* GitHub Contribution Calendar Card with Apple Specular Enclosure */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="relative border-[0.5px] border-border/80 bg-card/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 md:p-10 shadow-none overflow-hidden group">
                        {/* Apple / VisionOS Specular Top Highlight Ray */}
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent transition-opacity duration-500 group-hover:via-emerald-500/80 group-hover:h-[1.5px] z-20" />

                        {/* Ambient Directional Light Bloom */}
                        <div className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 w-3/4 h-14 bg-gradient-to-b from-emerald-500/15 via-emerald-500/5 to-transparent blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                        {/* Card Header */}
                        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 pb-6 border-b-[0.5px] border-border/50">
                            <div className="flex items-center gap-3.5">
                                <div className="w-11 h-11 rounded-xl bg-background/80 border-[0.5px] border-border flex items-center justify-center shadow-xs">
                                    <Github className="w-5 h-5 text-foreground" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-serif-display font-medium text-foreground">GitHub Contributions</h3>
                                        <span className="px-2 py-0.5 rounded-full text-[8.5px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1">
                                            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                            LIVE
                                        </span>
                                    </div>
                                    <p className="text-xs font-mono text-muted-foreground mt-0.5">@{GITHUB_USERNAME}</p>
                                </div>
                            </div>

                            {/* GitHub Profile Button */}
                            <a
                                href={`https://github.com/${GITHUB_USERNAME}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-foreground text-background text-xs font-mono uppercase tracking-wider rounded-full hover:bg-foreground/90 transition-colors shadow-xs active:scale-95 flex items-center gap-1.5"
                            >
                                <span>GitHub Profile</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                        </div>
                        
                        {/* Live GitHub Calendar Tracker */}
                        <div className="relative z-10 overflow-x-auto pb-4 pt-2 hide-scrollbar">
                            <div className="min-w-[780px] text-foreground flex justify-center">
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
                                    className="!text-[10px] !font-mono !bg-card !text-foreground !border !border-border !rounded-md !px-2.5 !py-1 !shadow-lg !z-50"
                                />
                            </div>
                        </div>

                    </div>
                </motion.div>

            </div>
        </SectionWrapper>
    );
};
