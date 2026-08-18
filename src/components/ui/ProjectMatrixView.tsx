import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Github,
  Network,
  ExternalLink,
  CheckCircle2,
  Search,
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

export const ProjectMatrixView: React.FC<ProjectMatrixViewProps> = ({
  projects,
  onInspectBlueprint,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.tech.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="w-full space-y-4 select-none">
      {/* Table Search & Metrics Count */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search projects by tech, title..."
            aria-label="Search projects by tech, title, or keywords"
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border-[0.5px] border-border bg-card/80 text-xs font-mono placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 text-foreground"
          />
        </div>
        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider self-end sm:self-center">
          SHOWING {filtered.length} OF {projects.length} SYSTEM REPOSITORIES
        </div>
      </div>

      {/* Engineering Table Matrix */}
      <div className="relative w-full rounded-xl border-[0.5px] border-border/80 bg-card/40 backdrop-blur-md overflow-x-auto shadow-sm">
        {/* Specular Top Edge */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 dark:via-white/15 to-transparent z-20" />
        <table className="w-full text-left text-xs font-mono border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-border/60 bg-muted/20 text-[9px] uppercase tracking-widest text-muted-foreground">
              <th className="py-3 px-4 font-semibold">PROJECT NAME</th>
              <th className="py-3 px-3 font-semibold">DOMAIN</th>
              <th className="py-3 px-3 font-semibold">PRIMARY STACK</th>
              <th className="py-3 px-3 font-semibold">CORE METRIC</th>
              <th className="py-3 px-3 font-semibold">SOLO SPEC</th>
              <th className="py-3 px-4 font-semibold text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 text-foreground">
            {filtered.map((project, idx) => (
              <motion.tr
                key={project.title}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18, delay: idx * 0.02 }}
                className="hover:bg-card transition-colors group"
              >
                {/* Title & Focus */}
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/80 group-hover:bg-primary transition-colors" />
                    <span>{project.title}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground/80 block mt-0.5">
                    {project.focus}
                  </span>
                </td>

                {/* Category Chip */}
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded-full text-[9px] bg-background border-[0.5px] border-border text-muted-foreground whitespace-nowrap">
                    {project.category}
                  </span>
                </td>

                {/* Tech Pills */}
                <td className="py-3.5 px-3">
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {project.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="px-1.5 py-0.5 rounded bg-muted/40 text-[9px] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-[9px] text-muted-foreground/60">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </td>

                {/* Core Metric */}
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <span className="text-primary font-semibold text-[11px]">
                    {project.metrics[0]}
                  </span>
                </td>

                {/* Solo Scope */}
                <td className="py-3.5 px-3 whitespace-nowrap text-emerald-600 dark:text-emerald-400 text-[10px]">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span>Solo Verified</span>
                  </div>
                </td>

                {/* Actions */}
                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1.5">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onInspectBlueprint(project)}
                      className="h-7 px-2 text-[9px] font-mono uppercase tracking-wider rounded-md border-primary/30 text-primary hover:bg-primary/10 gap-1"
                    >
                      <Network className="w-3 h-3" />
                      Blueprint
                    </Button>

                    {project.caseStudy && (
                      <Button
                        size="sm"
                        className="h-7 px-2 text-[9px] font-mono uppercase tracking-wider rounded-md"
                        asChild
                      >
                        <Link to={project.caseStudy}>
                          Details
                          <ArrowUpRight className="w-3 h-3 ml-0.5" />
                        </Link>
                      </Button>
                    )}

                    {project.demo && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 px-2 text-[9px] font-mono uppercase tracking-wider rounded-md"
                        asChild
                      >
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          Demo
                          <ExternalLink className="w-3 h-3 ml-0.5" />
                        </a>
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-[9px] font-mono uppercase tracking-wider rounded-md"
                      asChild
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span className="sr-only">GitHub</span>
                      </a>
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
