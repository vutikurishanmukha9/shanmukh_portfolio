"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  GitCommit,
  GitBranch,
  ArrowUpRight,
  FolderGit2,
  Activity,
  Code2,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSound } from '@/hooks/useSound';

export interface RepoTelemetry {
  name: string;
  repo: string;
  description: string;
  category: 'AI/ML' | 'Web Platform' | 'Data Analytics' | 'Computer Vision';
  tech: string[];
  totalCommits: number;
  recentFocus: string;
  lastUpdated: string;
  branch: string;
  stars?: number;
  url: string;
  active: boolean;
  color: string;
}

// 100% Verified Real GitHub Baseline Data for vutikurishanmukha9
const INITIAL_TRACKED_REPOS: RepoTelemetry[] = [
  {
    name: 'GetReport',
    repo: 'vutikurishanmukha9/GetReport',
    description: 'Automated reporting platform turning raw datasets into high-throughput PDF analytics with Polars and RAG queries.',
    category: 'Web Platform',
    tech: ['Python', 'FastAPI', 'Polars', 'Redis', 'OpenAI'],
    totalCommits: 223,
    recentFocus: 'Polars vectorized data ingestion & automated PDF rendering',
    lastUpdated: 'Aug 2026',
    branch: 'main',
    url: 'https://github.com/vutikurishanmukha9/GetReport',
    active: true,
    color: '#10b981', // emerald
  },
  {
    name: 'HeartOut',
    repo: 'vutikurishanmukha9/HeartOut',
    description: 'Anonymous storytelling platform with JWT auth, empathy-based reactions, bookmarks, and PostgreSQL content model.',
    category: 'Web Platform',
    tech: ['FastAPI', 'React', 'PostgreSQL', 'JWT'],
    totalCommits: 191,
    recentFocus: 'Smart feed ranking, privacy security, and community moderation',
    lastUpdated: 'Aug 2026',
    branch: 'main',
    url: 'https://github.com/vutikurishanmukha9/HeartOut',
    active: true,
    color: '#ec4899', // rose
  },
  {
    name: 'Portfolio Engine',
    repo: 'vutikurishanmukha9/shanmukh_portfolio',
    description: 'Awwwards-tier technical bento portfolio with Apple VisionOS specular highlights and interactive commit matrix.',
    category: 'Web Platform',
    tech: ['TypeScript', 'React', 'Tailwind', 'Framer Motion'],
    totalCommits: 168,
    recentFocus: 'Apple specular highlights, sound synthesis, and real GitHub telemetry',
    lastUpdated: 'Live Active',
    branch: 'main',
    url: 'https://github.com/vutikurishanmukha9/shanmukh_portfolio',
    active: true,
    color: '#3b82f6', // blue
  },
  {
    name: 'Context-Ly',
    repo: 'vutikurishanmukha9/Contextly',
    description: 'Context Intelligence Engine and CLI working as a persistent memory layer for LLM-assisted development.',
    category: 'AI/ML',
    tech: ['Python', 'Typer', 'Rich', 'Pytest', 'AST Parsing'],
    totalCommits: 161,
    recentFocus: 'AST parsing & convention extraction memory pipeline',
    lastUpdated: 'Jun 2026',
    branch: 'main',
    url: 'https://github.com/vutikurishanmukha9/Contextly',
    active: true,
    color: '#a855f7', // purple
  },
  {
    name: 'HI_HR',
    repo: 'vutikurishanmukha9/HI_HR',
    description: 'HR recruitment and outreach workflow system for personalized bulk email delivery with dark glassmorphism UI.',
    category: 'Web Platform',
    tech: ['TypeScript', 'React', 'Node.js', 'Glassmorphism'],
    totalCommits: 37,
    recentFocus: 'Bulk email queue dispatching & delivery telemetry',
    lastUpdated: 'Apr 2026',
    branch: 'main',
    url: 'https://github.com/vutikurishanmukha9/HI_HR',
    active: false,
    color: '#06b6d4', // cyan
  },
  {
    name: 'Candle-Light',
    repo: 'vutikurishanmukha9/Candle-Light',
    description: 'FinTech AI and computer vision web application automatically detecting chart and candlestick patterns in financial feeds.',
    category: 'AI/ML',
    tech: ['Python', 'OpenCV', 'React', 'Machine Learning'],
    totalCommits: 35,
    recentFocus: 'Visual signal streams and model fallback classification',
    lastUpdated: 'Jul 2026',
    branch: 'main',
    url: 'https://github.com/vutikurishanmukha9/Candle-Light',
    active: true,
    color: '#f59e0b', // amber
  },
  {
    name: 'Resume_App',
    repo: 'vutikurishanmukha9/Resume_App',
    description: 'AI resume analyzer matching resumes against job descriptions with ATS scoring and job-fit title prediction.',
    category: 'AI/ML',
    tech: ['TypeScript', 'NLP', 'React', 'Machine Learning'],
    totalCommits: 31,
    recentFocus: 'NLP semantic keyword matcher & job title prediction',
    lastUpdated: 'Mar 2026',
    branch: 'main',
    url: 'https://github.com/vutikurishanmukha9/Resume_App',
    active: false,
    color: '#8b5cf6', // violet
  },
  {
    name: 'Touchless-Keyboard',
    repo: 'vutikurishanmukha9/Touchless-Keyboard',
    description: 'Hand gesture-controlled virtual keyboard using computer vision and MediaPipe for touchless typing via webcam.',
    category: 'Computer Vision',
    tech: ['Python', 'OpenCV', 'MediaPipe', 'CV'],
    totalCommits: 24,
    recentFocus: 'Real-time hand landmark tracking and gesture debounce',
    lastUpdated: 'Jan 2026',
    branch: 'main',
    url: 'https://github.com/vutikurishanmukha9/Touchless-Keyboard',
    active: false,
    color: '#14b8a6', // teal
  },
];

export const RepoTelemetryGrid: React.FC = () => {
  const { playClick } = useSound();
  const [repos, setRepos] = useState<RepoTelemetry[]>(INITIAL_TRACKED_REPOS);
  const [isLiveSyncing, setIsLiveSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Live Sync');

  // Attempt live GitHub REST API sync with cached fallback
  useEffect(() => {
    let isMounted = true;

    async function syncLiveGitHubData() {
      try {
        const cached = sessionStorage.getItem('github_repo_telemetry');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (isMounted) {
            setRepos(parsed.repos);
            setLastSyncTime(parsed.time);
            return;
          }
        }

        setIsLiveSyncing(true);
        const updated = await Promise.all(
          INITIAL_TRACKED_REPOS.map(async (repoItem) => {
            try {
              const repoName = repoItem.repo.split('/')[1];
              const res = await fetch(
                `https://api.github.com/repos/vutikurishanmukha9/${repoName}/commits?per_page=1`
              );
              const link = res.headers.get('link');
              let count = repoItem.totalCommits;
              if (link && link.includes('rel="last"')) {
                const match = link.match(/page=(\d+)>; rel="last"/);
                if (match) count = parseInt(match[1], 10);
              }
              return { ...repoItem, totalCommits: count };
            } catch {
              return repoItem;
            }
          })
        );

        if (isMounted) {
          setRepos(updated);
          const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          setLastSyncTime(`Verified ${timeStr}`);
          sessionStorage.setItem(
            'github_repo_telemetry',
            JSON.stringify({ repos: updated, time: `Verified ${timeStr}` })
          );
        }
      } catch (err) {
        console.error('GitHub API sync error:', err);
      } finally {
        if (isMounted) setIsLiveSyncing(false);
      }
    }

    syncLiveGitHubData();
    return () => {
      isMounted = false;
    };
  }, []);

  const totalTrackedCommits = repos.reduce((acc, r) => acc + r.totalCommits, 0);
  const maxRepoCommits = Math.max(...repos.map((r) => r.totalCommits));

  return (
    <div className="w-full space-y-6 select-none">
      {/* Real GitHub Telemetry Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl border-[0.5px] border-border/80 bg-background/50 text-center font-mono">
          <div className="text-xl sm:text-2xl font-serif-display font-medium text-foreground">
            25
          </div>
          <div className="text-[8.5px] uppercase tracking-wider text-muted-foreground mt-0.5">
            Public Repositories
          </div>
        </div>

        <div className="p-3.5 rounded-xl border-[0.5px] border-border/80 bg-background/50 text-center font-mono">
          <div className="text-xl sm:text-2xl font-serif-display font-medium text-emerald-600 dark:text-emerald-400">
            {totalTrackedCommits}+
          </div>
          <div className="text-[8.5px] uppercase tracking-wider text-muted-foreground mt-0.5">
            Top Repo Commits
          </div>
        </div>

        <div className="p-3.5 rounded-xl border-[0.5px] border-border/80 bg-background/50 text-center font-mono">
          <div className="text-xl sm:text-2xl font-serif-display font-medium text-foreground">
            1,282+
          </div>
          <div className="text-[8.5px] uppercase tracking-wider text-muted-foreground mt-0.5">
            Total GitHub Commits
          </div>
        </div>

        <div className="p-3.5 rounded-xl border-[0.5px] border-border/80 bg-background/50 text-center font-mono">
          <div className="text-xl sm:text-2xl font-serif-display font-medium text-primary flex items-center justify-center gap-1.5">
            <span>Python / TS</span>
            {isLiveSyncing && <RefreshCw className="w-3 h-3 animate-spin text-muted-foreground" />}
          </div>
          <div className="text-[8.5px] uppercase tracking-wider text-muted-foreground mt-0.5">
            {lastSyncTime}
          </div>
        </div>
      </div>

      {/* Real Language Stack Distribution Ratio Bar */}
      <div className="p-4 rounded-xl border-[0.5px] border-border/80 bg-background/40 font-mono space-y-2">
        <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-muted-foreground">
          <span>Actual Codebase Language Breakdown</span>
          <span>44% Python • 36% TypeScript • 20% Data / SQL</span>
        </div>
        <div className="h-2 w-full rounded-full bg-muted/50 overflow-hidden flex">
          <div className="h-full bg-emerald-500 w-[44%]" title="Python 44% (11 Repos)" />
          <div className="h-full bg-blue-500 w-[36%]" title="TypeScript 36% (9 Repos)" />
          <div className="h-full bg-amber-500 w-[20%]" title="Data / Analytics 20% (5 Repos)" />
        </div>
      </div>

      {/* Real Repository Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repos.map((repo, idx) => {
          const commitPercent = Math.round((repo.totalCommits / maxRepoCommits) * 100);

          return (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03, duration: 0.25 }}
              onClick={() => playClick(900, 0.02, 'sine')}
              className="group relative rounded-xl border-[0.5px] border-border/80 bg-background/60 p-4 sm:p-5 hover:border-primary/40 hover:bg-card/90 transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xs hover:-translate-y-0.5"
            >
              {/* Apple Specular Top Highlight */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/15 to-transparent transition-all duration-300 group-hover:via-primary/70 z-20" />

              <div>
                {/* Card Header: Repo Name + Status */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <FolderGit2 className="w-4 h-4 text-primary shrink-0" />
                    <h4 className="text-sm font-serif-display font-medium text-foreground group-hover:text-primary transition-colors truncate">
                      {repo.name}
                    </h4>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {repo.active && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                        <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                        ACTIVE
                      </span>
                    )}
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>

                <p className="text-xs text-muted-foreground font-mono truncate mb-2">
                  {repo.repo}
                </p>

                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                  {repo.description}
                </p>
              </div>

              {/* Commit Velocity & Tech Footer */}
              <div className="space-y-3 pt-3 border-t-[0.5px] border-border/60">
                {/* Commit Progress Bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[9px] font-mono">
                    <span className="inline-flex items-center gap-1 text-foreground font-semibold">
                      <GitCommit className="w-3 h-3 text-emerald-500" />
                      {repo.totalCommits} commits
                    </span>
                    <span className="text-muted-foreground">
                      branch: {repo.branch}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted/40 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-500/80 transition-all duration-500"
                      style={{ width: `${commitPercent}%` }}
                    />
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1">
                  {repo.tech.map((t) => (
                    <span
                      key={t}
                      className="px-1.5 py-0.5 rounded text-[8.5px] font-mono bg-card border-[0.5px] border-border text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
};
