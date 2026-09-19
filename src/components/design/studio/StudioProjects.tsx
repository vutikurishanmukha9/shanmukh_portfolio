import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Layers, Sliders, Eye } from 'lucide-react';
import { StudioCaseStudyDrawer, StudioProjectItem } from './StudioCaseStudyDrawer';

const STUDIO_PROJECTS: StudioProjectItem[] = [
  {
    id: 'get-report',
    number: '01',
    title: 'GETREPORT',
    subtitle: 'Making messy data understandable.',
    disciplines: ['PRODUCT DESIGN', 'UI / UX', 'DATA VISUALIZATION', 'FRONTEND'],
    imageSrc: '/ui/GetReport.png',
    accentColor: '#FFD84D',
    problem: "Data isn't difficult because there is too much of it. It's difficult because the important part is buried under thoughtless hierarchies.",
    solution: 'Designed an active processing log showing real-time Polars data ingest, automated collinearity checks, and RAG synthesis with Grade-A data health certification.',
    impactMetrics: [
      { label: 'PDF GENERATION', value: '4 SEC' },
      { label: 'AUDIT INTEGRITY', value: 'GRADE A' },
      { label: 'WORKFLOW REDUCTION', value: '92%' }
    ],
    systemTokens: {
      typography: 'Space Grotesk (700/600) + JetBrains Mono',
      colors: ['#0A0A0A', '#E3E6E8', '#FFD84D', '#881337'],
      grid: '8px Baseline / 12-Column Flexible Grid',
      motion: '180ms Spring (damping 26, stiffness 340)'
    },
    experienceHighlights: [
      {
        step: '01',
        title: 'Instant Drag & Ingest',
        detail: 'CSV or XLSX ingested with real-time Polars telemetry verifying column schema without page reloads.'
      },
      {
        step: '02',
        title: 'Collinearity & VIF Scanner',
        detail: 'Automated statistical verification rating data cleanliness and flagging redundant variables.'
      },
      {
        step: '03',
        title: 'One-Click Executive PDF',
        detail: 'Publication-grade PDF compiled with cryptographic audit hash and executive summaries.'
      }
    ]
  },
  {
    id: 'ai-royal-rumble',
    number: '02',
    title: 'AI ROYAL RUMBLE',
    subtitle: 'Every AI claims superiority. Tonight they prove it.',
    disciplines: ['ARENA UI', 'EDITORIAL TYPOGRAPHY', 'TOKEN STREAMING', 'INTERACTION'],
    imageSrc: '/ui/AI-Royal Rumble.png',
    accentColor: '#FF6B57',
    problem: 'AI model evaluation benchmarks are overwhelmingly dry, static, and disconnected from human comprehension.',
    solution: 'Engineered an event-driven live battle arena interface where LLM models defend arguments under a 60-second live token clock with crowd voting ledger.',
    impactMetrics: [
      { label: 'STREAMING LATENCY', value: '<45MS' },
      { label: 'TASK COMPLETION', value: '94%' },
      { label: 'ENGAGEMENT', value: '3.8X' }
    ],
    systemTokens: {
      typography: 'Space Grotesk Black + IBM Plex Mono',
      colors: ['#0A0A0A', '#E3E6E8', '#FF6B57', '#5B8CFF'],
      grid: 'Split-Pane 16px Spacing Matrix',
      motion: '120ms Dynamic Token Streaming Spring'
    },
    experienceHighlights: [
      {
        step: '01',
        title: 'Task Arena Submission',
        detail: 'Users submit complex coding or philosophy prompts with real-time token rate monitoring.'
      },
      {
        step: '02',
        title: 'Split-Pane Jam Round',
        detail: 'GPT-4o, Claude, and Gemini generate simultaneously with live sub-100ms reaction times.'
      },
      {
        step: '03',
        title: 'Blind Crowd Ledger',
        detail: 'Unbiased voting interface preventing brand favoritism with live ELO updates.'
      }
    ]
  },
  {
    id: 'clean-slate',
    number: '03',
    title: 'CLEAN-SLATE',
    subtitle: 'Know what your files are carrying.',
    disciplines: ['FILE INTELLIGENCE', 'PRIVACY UX', 'METADATA INSPECTOR', 'EDITORIAL'],
    imageSrc: '/ui/Clean Slate.png',
    accentColor: '#5B8CFF',
    problem: 'File metadata tools are either confusing CLI commands or clumsy enterprise software nightmares.',
    solution: 'Engineered a dual-column forensic inspector transforming sensitive EXIF coordinates and hardware serials into glanceable privacy decisions.',
    impactMetrics: [
      { label: 'DETECTION FIELDS', value: '23 TYPES' },
      { label: 'STORAGE RETENTION', value: '0 SEC' },
      { label: 'SCRUB EFFICIENCY', value: '100%' }
    ],
    systemTokens: {
      typography: 'Space Grotesk + Precision Mono',
      colors: ['#0A0A0A', '#E3E6E8', '#5B8CFF', '#EA580C'],
      grid: 'Dual-Column 8px Spatial System',
      motion: '150ms Spring with Tactile Snap'
    },
    experienceHighlights: [
      {
        step: '01',
        title: 'Forensic File Drop',
        detail: 'Instant local file analysis extracting EXIF, GPS coordinates, and camera fingerprints.'
      },
      {
        step: '02',
        title: 'Privacy Grade Risk Scoring',
        detail: 'Automated privacy assessment grading risk level from Green (Safe) to Red (Critical).'
      },
      {
        step: '03',
        title: 'Sanitize & Export',
        detail: 'One-click scrubbing of all metadata fields while preserving 100% image visual fidelity.'
      }
    ]
  },
  {
    id: 'problems-ap',
    number: '04',
    title: 'PROBLEMS@AP',
    subtitle: 'Civic intelligence and geospatial issue tracking across 175 seats.',
    disciplines: ['CIVIC UX', 'GEOSPATIAL MAPS', 'PUBLIC TELEMETRY', 'SYSTEMS DESIGN'],
    imageSrc: '/ui/AP@Problems.png',
    accentColor: '#63D6A0',
    problem: 'Citizens face opaque bureaucratic silos with zero transparency into local constituency infrastructure issues.',
    solution: 'Designed an open geospatial visualizer with 100% anonymous reporting and real-time statewide civic aggregation.',
    impactMetrics: [
      { label: 'CONSTITUENCIES', value: '175 SEATS' },
      { label: 'MINISTRIES MAPPED', value: '57 DEPT' },
      { label: 'USER AUTH', value: '0 FRICTION' }
    ],
    systemTokens: {
      typography: 'Space Grotesk + Civic Mono',
      colors: ['#0A0A0A', '#E3E6E8', '#63D6A0', '#EA580C'],
      grid: '12-Column Responsive Blueprint',
      motion: '200ms Smooth Geospatial Ease'
    },
    experienceHighlights: [
      {
        step: '01',
        title: 'OpenStreetMap Density Clusters',
        detail: 'Geospatial visualization clustering civic infrastructure issues by district severity.'
      },
      {
        step: '02',
        title: 'Zero-Friction Anonymous Report',
        detail: 'Citizens report issues in under 30 seconds with photo proof and GPS tagging.'
      },
      {
        step: '03',
        title: 'Public Resolution Ledger',
        detail: 'Live status tracking showing ministry acknowledgement and completion progress.'
      }
    ]
  }
];

export const StudioProjects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<StudioProjectItem | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  return (
    <section id="studio-work" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-6 sm:py-10 select-none">
      
      {/* Section Header */}
      <div className="flex flex-wrap items-end justify-between border-b-3 border-[#0A0A0A] pb-4 mb-6 sm:mb-8 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#FFD84D] border border-[#0A0A0A]" />
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#0A0A0A]">
              01 / SELECTED WORK
            </span>
          </div>
          <h2 className="font-['Space_Grotesk'] text-4xl sm:text-6xl font-black text-[#0A0A0A] uppercase tracking-tight">
            CRAFTED OBJECTS
          </h2>
        </div>

        <div className="text-right">
          <span className="font-mono text-xs font-bold text-[#0A0A0A]/60 block uppercase">
            FLAGSHIP PORTFOLIO
          </span>
          <span className="font-mono text-sm font-bold text-[#0A0A0A]">
            04 PRODUCTION CASE STUDIES
          </span>
        </div>
      </div>

      {/* Projects Stack / Grid */}
      <div className="space-y-6 sm:space-y-8">
        {STUDIO_PROJECTS.map((project, index) => {
          const isFlagship = index === 0;
          const isHovered = hoveredProjectId === project.id;

          return (
            <motion.article
              key={project.id}
              onMouseEnter={() => setHoveredProjectId(project.id)}
              onMouseLeave={() => setHoveredProjectId(null)}
              onClick={() => setSelectedProject(project)}
              className={`group relative bg-[#FFFFFF] border-3 border-[#0A0A0A] transition-all duration-300 cursor-pointer ${
                isFlagship
                  ? 'p-4 sm:p-8 lg:p-10 shadow-[5px_5px_0px_#0A0A0A] sm:shadow-[8px_8px_0px_#0A0A0A] hover:shadow-[7px_7px_0px_#FFD84D] sm:hover:shadow-[12px_12px_0px_#FFD84D]'
                  : 'p-4 sm:p-8 shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[6px_6px_0px_#0A0A0A] hover:shadow-[6px_6px_0px_#0A0A0A] sm:hover:shadow-[10px_10px_0px_#0A0A0A]'
              }`}
            >
              {/* Flagship Highlight Banner */}
              {isFlagship && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFD84D] border-2 border-[#0A0A0A] text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider mb-6 shadow-[2px_2px_0px_#0A0A0A]">
                  <span className="w-2 h-2 bg-[#0A0A0A]" />
                  <span>FLAGSHIP CASE STUDY — GETREPORT</span>
                </div>
              )}

              {/* Asymmetrical Grid: Visual vs Meta Story */}
              <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                
                {/* Visual Preview Side (7 Columns) */}
                <div className="lg:col-span-7 relative overflow-hidden border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] sm:shadow-[4px_4px_0px_#0A0A0A] bg-[#E3E6E8] group">
                  <div className="overflow-hidden">
                    <img
                      src={project.imageSrc}
                      alt={project.title}
                      className="w-full h-52 sm:h-80 lg:h-96 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Subtle Interactive Hover Marker */}
                  <div
                    className={`absolute bottom-3 right-3 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-[#FFFFFF] border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] flex items-center gap-1.5 font-mono text-[10px] sm:text-xs font-bold text-[#0A0A0A] transition-all duration-200 ${
                      isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-90'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5 text-[#0A0A0A]" />
                    <span>OPEN SPECIFICATION</span>
                  </div>
                </div>

                {/* Narrative & Specification Side (5 Columns) */}
                <div className="lg:col-span-5 space-y-4 sm:space-y-5 text-left">
                  <div className="flex items-center justify-between border-b-2 border-[#0A0A0A] pb-2 sm:pb-3">
                    <span className="font-mono text-xl sm:text-2xl font-black text-[#0A0A0A]">
                      {project.number}
                    </span>
                    <span className="font-mono text-[10px] sm:text-xs font-bold text-[#0A0A0A]/70 uppercase">
                      CASE STUDY SPEC
                    </span>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl lg:text-4xl font-black text-[#0A0A0A] uppercase tracking-tight group-hover:text-[#0A0A0A] transition-colors flex items-center justify-between gap-2 break-words">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#0A0A0A] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
                    </h3>
                    <p className="font-['Inter'] text-sm sm:text-base font-semibold text-[#0A0A0A]/85">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Problem Statement Summary */}
                  <div className="p-3 bg-[#E3E6E8] border border-[#0A0A0A]">
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-[#0A0A0A]/60 block mb-1">
                      CORE CHALLENGE
                    </span>
                    <p className="font-['Inter'] text-xs text-[#0A0A0A]/90 leading-relaxed font-medium">
                      {project.problem}
                    </p>
                  </div>

                  {/* Disciplines Chips */}
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {project.disciplines.map((d) => (
                      <span
                        key={d}
                        className="text-[9px] sm:text-[10px] font-mono font-bold px-1.5 sm:px-2 py-0.5 bg-[#FFFFFF] border border-[#0A0A0A] uppercase text-[#0A0A0A]"
                      >
                        {d}
                      </span>
                    ))}
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-2 border-t-2 border-[#0A0A0A]/20">
                    {project.impactMetrics.map((m) => (
                      <div key={m.label} className="p-1.5 sm:p-2 bg-[#E3E6E8] border border-[#0A0A0A] min-w-0">
                        <span className="text-[7px] sm:text-[8px] font-mono text-[#0A0A0A]/60 uppercase block truncate">
                          {m.label}
                        </span>
                        <span className="font-mono text-[11px] sm:text-xs font-black text-[#0A0A0A] block truncate">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Physical Button Trigger */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                      className="w-full py-2.5 bg-[#0A0A0A] text-[#E3E6E8] group-hover:bg-[#FFD84D] group-hover:text-[#0A0A0A] font-mono font-bold text-xs uppercase tracking-widest border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>VIEW FULL CASE STUDY</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Slide-out Editorial Case Study Drawer */}
      <StudioCaseStudyDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
