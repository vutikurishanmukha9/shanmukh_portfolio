import React, { useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { Github, FolderGit2, Grid3X3, Calendar as CalendarIcon, ArrowUpRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { CommitsGrid } from '@/components/ui/commits-grid';
import { RepoTelemetryGrid } from '@/components/ui/RepoTelemetryGrid';
import { useSound } from '@/hooks/useSound';
import { cn } from '@/lib/utils';

export const GrindingActivitySection = () => {
    const { theme } = useTheme();
    const { playClick } = useSound();
    const GITHUB_USERNAME = 'vutikurishanmukha9';
    const [commitViewMode, setCommitViewMode] = useState<'matrix' | 'calendar'>('matrix');

    return (
        <SectionWrapper id="activity" className="py-16 bg-background border-b-[0.5px] border-border/40">
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                
                {/* Section Header */}
                <div className="text-center mb-14 max-w-2xl mx-auto">
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
                        Daily Activity & Repositories
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-3 text-muted-foreground text-xs max-w-md mx-auto leading-relaxed"
                    >
                        Real-time GitHub commit matrices, persistent engineering output, and active repository velocity.
                    </motion.p>
                </div>

                {/* 1. SEPARATE TOP CARD: GitHub Contribution Activity */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto mb-10"
                >
                    <div className="relative border-[0.5px] border-border/80 bg-card/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 md:p-10 shadow-none overflow-hidden group">
                        {/* Apple Specular Top Highlight Ray */}
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent transition-all duration-500 group-hover:via-emerald-500/80 group-hover:h-[1.5px] z-20" />

                        {/* Ambient Light Bloom */}
                        <div className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 w-3/4 h-14 bg-gradient-to-b from-emerald-500/15 via-emerald-500/5 to-transparent blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                        {/* Card Header */}
                        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 pb-5 border-b-[0.5px] border-border/50">
                            <div className="flex items-center gap-3.5">
                                <div className="w-11 h-11 rounded-xl bg-background/80 border-[0.5px] border-border flex items-center justify-center shadow-xs">
                                    <Github className="w-5 h-5 text-foreground" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-serif-display font-medium text-foreground">GitHub Contributions</h3>
                                        <span className="px-2 py-0.5 rounded-full text-[8.5px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                                            LIVE
                                        </span>
                                    </div>
                                    <p className="text-xs font-mono text-muted-foreground mt-0.5">@{GITHUB_USERNAME}</p>
                                </div>
                            </div>

                            {/* View Switcher: Matrix vs Calendar */}
                            <div className="flex flex-wrap items-center gap-2.5">
                                <div className="flex bg-muted/40 p-0.5 rounded-full border-[0.5px] border-border/80">
                                    <button
                                        onClick={() => {
                                            playClick(850, 0.02, 'sine');
                                            setCommitViewMode('matrix');
                                        }}
                                        className={cn(
                                            "px-3 py-1 text-[9px] font-mono uppercase tracking-wider rounded-full transition-all flex items-center gap-1.5",
                                            commitViewMode === 'matrix'
                                                ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                                                : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        <Grid3X3 className="w-3 h-3" />
                                        <span>Commit Matrix</span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            playClick(950, 0.02, 'sine');
                                            setCommitViewMode('calendar');
                                        }}
                                        className={cn(
                                            "px-3 py-1 text-[9px] font-mono uppercase tracking-wider rounded-full transition-all flex items-center gap-1.5",
                                            commitViewMode === 'calendar'
                                                ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                                                : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="w-3 h-3" />
                                        <span>Yearly Heatmap</span>
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
                        
                        {/* Card Body */}
                        <div className="relative z-10">
                            <AnimatePresence mode="wait">
                                {commitViewMode === 'matrix' ? (
                                    <motion.div
                                        key="matrix-view"
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex flex-col items-center justify-center py-2"
                                    >
                                        <div className="w-full flex justify-center py-1">
                                            <CommitsGrid text="SHANMUKH" embedded={true} />
                                        </div>
                                    </motion.div>
                                ) : (
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
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                {/* 2. SEPARATE BOTTOM CARD: Active Repositories & Engineering Telemetry */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="relative border-[0.5px] border-border/80 bg-card/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 md:p-10 shadow-none overflow-hidden group">
                        {/* Apple Specular Top Highlight Ray */}
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent transition-all duration-500 group-hover:via-primary/80 group-hover:h-[1.5px] z-20" />

                        {/* Ambient Light Bloom */}
                        <div className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 w-3/4 h-14 bg-gradient-to-b from-primary/15 via-primary/5 to-transparent blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                        {/* Telemetry Header */}
                        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 pb-5 border-b-[0.5px] border-border/50">
                            <div className="flex items-center gap-3.5">
                                <div className="w-11 h-11 rounded-xl bg-background/80 border-[0.5px] border-border flex items-center justify-center shadow-xs">
                                    <FolderGit2 className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-serif-display font-medium text-foreground">Active Repositories & Commit Telemetry</h3>
                                        <span className="px-2 py-0.5 rounded-full text-[8.5px] font-mono bg-primary/10 text-primary border border-primary/20 font-semibold">
                                            TRACKED
                                        </span>
                                    </div>
                                    <p className="text-xs font-mono text-muted-foreground mt-0.5">Repo-wise code commits, active branches, and primary language stacks</p>
                                </div>
                            </div>

                            <a
                                href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-1.5 bg-background border-[0.5px] border-border text-foreground text-xs font-mono uppercase tracking-wider rounded-full hover:bg-muted/60 transition-all shadow-xs active:scale-95 flex items-center gap-1.5"
                            >
                                <span>All Repos</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                        </div>

                        {/* Telemetry Body */}
                        <div className="relative z-10">
                            <RepoTelemetryGrid />
                        </div>
                    </div>
                </motion.div>

            </div>
        </SectionWrapper>
    );
};
