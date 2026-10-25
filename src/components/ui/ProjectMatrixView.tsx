import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Github,
  Network,
  ExternalLink,
  CheckCircle2,
  Search,
  Brain,
  Globe,
  Eye,
  BarChart3,
  Cloud,
  Layers3,
  Activity,
  X,
  FileText,
  SlidersHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export interface MatrixProject {
  title: string;
  description: string;
  category: 'AI/ML' | 'Cloud' | 'Web App' | 'Computer Vision' | 'Data Analysis' | 'Other';
  focus: string;
  soloBuild: string;
  metrics: string[];
  tech: string[];
  github: string;
  demo?: string;
  demoLabel?: string;
  caseStudy?: string;
  tone: 'blue' | 'violet' | 'rose' | 'emerald' | 'amber' | 'slate';
}

interface ProjectMatrixViewProps {
  projects: MatrixProject[];
  onInspectBlueprint: (project: MatrixProject) => void;
}

const categoryIcons: Record<string, React.ElementType> = {
  'AI/ML': Brain,
  'Web App': Globe,
  'Computer Vision': Eye,
  'Data Analysis': BarChart3,
  'Cloud': Cloud,
  'Other': Layers3,
};

export const ProjectMatrixView: React.FC<ProjectMatrixViewProps> = ({
  projects,
  onInspectBlueprint,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');

  const domains = useMemo(() => {
    const list = Array.from(new Set(projects.map((p) => p.category)));
    return ['All', ...list];
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.focus.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tech.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesDomain =
        selectedDomain === 'All' || p.category === selectedDomain;

      return matchesSearch && matchesDomain;
    });
  }, [projects, searchTerm, selectedDomain]);

  return (
    <div className="w-full space-y-4 select-none">
      {/* Matrix Controls & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3.5 rounded-2xl border border-border bg-card/70 backdrop-blur-xs shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter by title, stack, or keywords..."
            aria-label="Filter matrix projects"
            className="w-full h-9 pl-9 pr-8 rounded-xl border border-border bg-background text-xs font-sans placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-foreground transition-colors"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick Domain Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto py-1">
          <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-muted-foreground mr-1 shrink-0">
            <SlidersHorizontal className="w-3 h-3" />
            <span>DOMAIN:</span>
          </div>
          {domains.map((dom) => (
            <button
              type="button"
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                selectedDomain === dom
                  ? 'bg-foreground text-background shadow-xs'
                  : 'bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/60'
              }`}
            >
              {dom}
            </button>
          ))}
        </div>

        {/* Repositories Counter */}
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground shrink-0 self-end md:self-center">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            {filtered.length} of {projects.length} systems
          </span>
        </div>
      </div>

      {/* Engineering Table Matrix */}
      <div className="relative w-full rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1020px]">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-[11px] uppercase tracking-wider text-muted-foreground font-mono">
                <th className="py-3.5 px-4 font-semibold w-[240px]">Project Architecture</th>
                <th className="py-3.5 px-3 font-semibold w-[150px]">Domain</th>
                <th className="py-3.5 px-3 font-semibold w-[220px]">Primary Stack</th>
                <th className="py-3.5 px-3 font-semibold w-[170px]">Core Metric</th>
                <th className="py-3.5 px-3 font-semibold w-[160px]">Verification</th>
                <th className="py-3.5 px-4 font-semibold text-right w-[180px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/70 text-foreground">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, idx) => {
                  const CategoryIcon = categoryIcons[project.category] || Layers3;

                  return (
                    <motion.tr
                      key={project.title}
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15, delay: idx * 0.015 }}
                      className="hover:bg-muted/25 transition-colors group"
                    >
                      {/* Project Name & Focus Subtitle */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="size-2 rounded-full bg-primary shrink-0" />
                          <span className="font-head font-bold text-sm text-foreground tracking-tight whitespace-nowrap">
                            {project.title}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground font-sans block mt-0.5 pl-4 truncate max-w-[200px]">
                          {project.focus}
                        </span>
                      </td>

                      {/* Domain Badge */}
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium border border-border bg-muted/40 text-foreground whitespace-nowrap">
                          <CategoryIcon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          <span>{project.category}</span>
                        </span>
                      </td>

                      {/* Tech Stack Pills (Strictly Single Row) */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5 whitespace-nowrap">
                          {project.tech.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-md text-[11px] font-mono border border-border/80 bg-muted/20 text-muted-foreground whitespace-nowrap"
                            >
                              {t}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono text-muted-foreground bg-muted/40 border border-border/60">
                              +{project.tech.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Core Metric Specimen */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-muted/50 border border-border text-foreground whitespace-nowrap">
                          <Activity className="w-3 h-3 text-primary shrink-0" />
                          <span>{project.metrics[0]}</span>
                        </span>
                      </td>

                      {/* Scope & Verification Badge */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 whitespace-nowrap">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{project.soloBuild}</span>
                        </div>
                      </td>

                      {/* Unified Action Buttons */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Blueprint Trigger */}
                          <button
                            type="button"
                            onClick={() => onInspectBlueprint(project)}
                            className="h-7 px-2.5 rounded-lg border border-border bg-card hover:bg-muted text-foreground text-xs font-medium inline-flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                            title="Inspect Architecture Blueprint"
                          >
                            <Network className="w-3 h-3 text-primary" />
                            <span>Blueprint</span>
                          </button>

                          {/* Case Study Details Link */}
                          {project.caseStudy && (
                            <Link
                              to={project.caseStudy}
                              className="h-7 px-2.5 rounded-lg border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-medium inline-flex items-center gap-1 transition-colors shadow-2xs"
                              title="Read Engineering Case Study"
                            >
                              <FileText className="w-3 h-3" />
                              <span>Study</span>
                            </Link>
                          )}

                          {/* Live Demo Link */}
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="h-7 px-2.5 rounded-lg border border-border bg-card hover:bg-muted text-foreground text-xs font-medium inline-flex items-center gap-1 transition-colors shadow-2xs"
                              title={project.demoLabel || 'Launch Demo'}
                            >
                              <span>Demo</span>
                              <ExternalLink className="w-3 h-3 text-muted-foreground" />
                            </a>
                          )}

                          {/* Source Code Link */}
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-7 w-7 rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground inline-flex items-center justify-center transition-colors shadow-2xs"
                            title="Inspect GitHub Repository"
                            aria-label={`View ${project.title} on GitHub`}
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Empty Search State */}
        {filtered.length === 0 && (
          <div className="py-12 px-4 text-center space-y-2">
            <p className="text-sm font-semibold text-foreground">
              No repositories match "{searchTerm}" in {selectedDomain}.
            </p>
            <p className="text-xs text-muted-foreground font-sans">
              Try adjusting your search keywords or reset the domain filter.
            </p>
            <Button
              variant="outline"
              size="xs"
              onClick={() => {
                setSearchTerm('');
                setSelectedDomain('All');
              }}
              className="mt-2"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* Horizontal Scroll Prompt for Smaller Screens */}
      <div className="text-[11px] font-mono text-muted-foreground/80 flex items-center justify-between px-1">
        <span>← Scroll horizontally to inspect full architecture matrix →</span>
        <span>Type-safe schema · Verified builds</span>
      </div>
    </div>
  );
};
