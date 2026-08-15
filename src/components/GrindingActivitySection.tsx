import React, { useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { Github, Sparkles, Grid3X3, Calendar as CalendarIcon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { CommitsGrid } from '@/components/ui/commits-grid';
import { useSound } from '@/hooks/useSound';
import { cn } from '@/lib/utils';

export const GrindingActivitySection = () => {
    const { theme } = useTheme();
    const { playClick } = useSound();
    const GITHUB_USERNAME = 'vutikurishanmukha9';
    const [viewMode, setViewMode] = useState<'calendar' | 'matrix'>('calendar');

    return (
        <SectionWrapper id="activity" className="py-16 bg-background border-b-[0.5px] border-border/40">
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                
                <div className="text-center mb-16 max-w-2xl mx-auto">
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
                        Tracking continuous engineering output, open-source commits, and active code iteration.
                    </motion.p>
                </div>

                {/* GitHub Activity Card with Apple Specular Enclosure */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto mb-16"
                >
                    <div className="relative border-[0.5px] border-border/80 bg-card/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 md:p-10 shadow-none overflow-hidden group">
                        {/* Apple / VisionOS Specular Top Highlight Ray */}
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent transition-all duration-500 group-hover:via-primary/80 group-hover:h-[1.5px] z-20" />

                        {/* Ambient Directional Light Bloom */}
                        <div className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 w-3/4 h-14 bg-gradient-to-b from-primary/15 via-primary/5 to-transparent blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 pb-6 border-b-[0.5px] border-border/50">
                            <div className="flex items-center gap-3.5">
                                <div className="w-11 h-11 rounded-xl bg-background/80 border-[0.5px] border-border flex items-center justify-center shadow-xs">
                                    <Github className="w-5 h-5 text-foreground" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-serif-display font-medium text-foreground">GitHub Contributions</h3>
                                        <span className="px-2 py-0.5 rounded-full text-[8.5px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                                            ACTIVE
                                        </span>
                                    </div>
                                    <p className="text-xs font-mono text-muted-foreground mt-0.5">@{GITHUB_USERNAME}</p>
                                </div>
                            </div>

                            {/* View Mode Switcher & GitHub Button */}
                            <div className="flex flex-wrap items-center gap-2.5">
                                <div className="flex bg-muted/40 p-0.5 rounded-full border-[0.5px] border-border/80">
                                    <button
                                        onClick={() => {
                                            playClick(850, 0.02, 'sine');
                                            setViewMode('calendar');
                                        }}
                                        className={cn(
                                            "px-3 py-1 text-[9px] font-mono uppercase tracking-wider rounded-full transition-all flex items-center gap-1.5",
                                            viewMode === 'calendar'
                                                ? "bg-card text-foreground font-semibold shadow-xs"
                                                : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="w-3 h-3" />
                                        <span>Calendar</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            playClick(950, 0.02, 'sine');
                                            setViewMode('matrix');
                                        }}
                                        className={cn(
                                            "px-3 py-1 text-[9px] font-mono uppercase tracking-wider rounded-full transition-all flex items-center gap-1.5",
                                            viewMode === 'matrix'
                                                ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                                                : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        <Grid3X3 className="w-3 h-3" />
                                        <span>Pixel Matrix</span>
                                    </button>
                                </div>

                                <a
                                    href={`https://github.com/${GITHUB_USERNAME}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-1.5 bg-foreground text-background text-xs font-mono uppercase tracking-wider rounded-full hover:bg-foreground/90 transition-all shadow-xs active:scale-95"
                                >
                                    Profile
                                </a>
                            </div>
                        </div>
                        
                        <div className="relative z-10">
                            <AnimatePresence mode="wait">
                                {viewMode === 'calendar' ? (
                                    <motion.div
                                        key="calendar-view"
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-x-auto pb-4 hide-scrollbar"
                                    >
                                        <div className="min-w-[800px] text-foreground">
                                            <div className="flex flex-col items-center">
                                                <GitHubCalendar
                                                    username={GITHUB_USERNAME}
                                                    year="last"
                                                    colorScheme="light"
                                                    blockSize={12}
                                                    blockMargin={4}
                                                    fontSize={12}
                                                    renderBlock={(block, activity) => React.cloneElement(block, {
                                                        'data-tooltip-id': 'react-tooltip',
                                                        'data-tooltip-content': `${activity.count} contributions on ${new Date(activity.date).toLocaleDateString()}`,
                                                    })}
                                                />
                                                <Tooltip id="react-tooltip" />
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="matrix-view"
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex flex-col items-center justify-center py-4"
                                    >
                                        {/* Commits Grid Canvas exclusively for SHANMUKH */}
                                        <div className="w-full flex justify-center overflow-x-auto py-2">
                                            <CommitsGrid text="SHANMUKH" />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

            </div>
        </SectionWrapper>
    );
};

