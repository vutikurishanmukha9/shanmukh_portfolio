import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitCommit, 
  Search, 
  LayoutGrid, 
  Palette, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Clock,
  Wrench,
  Workflow,
  Check,
  ChevronRight,
  FileCode,
  Terminal,
  Activity,
  Compass,
  Bot,
  Cpu,
  Code2,
  MessageSquare,
  Lightbulb,
  Copy,
  Boxes
} from 'lucide-react';
import { useSound } from '@/hooks/useSound';
import { DecisionForkViewer } from './DecisionForkViewer';

export interface ProcessTool {
  name: string;
  category: string;
  role: string;
  why: string;
  isAi?: boolean;
  aiCategory?: 'builders' | 'generative-ui' | 'code-agents' | 'research' | 'visuals';
  aiPrompt?: string;
  aiImpact?: string;
}

export interface ProcessTactic {
  stepNumber: string;
  name: string;
  detail: string;
}

export interface ProcessStage {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  headline: string;
  timeShare: string;
  icon: React.ElementType;
  description: string;
  tactics: ProcessTactic[];
  tools: ProcessTool[];
  deliverables: string[];
  qualityGate: string[];
}

const PROCESS_STAGES: ProcessStage[] = [
  {
    id: 'research',
    step: 'STEP 01',
    title: 'User Research & Problem Discovery',
    subtitle: 'Finding the real problem before opening Figma',
    headline: 'Listen, gather evidence, and uncover what users actually struggle with',
    timeShare: '20% of project time • ~1–2 Weeks',
    icon: Search,
    description: 'Before drawing a single wireframe or choosing colors, I speak with users and stakeholders to understand their daily workflows, pinpoint friction points, and identify why existing tools fall short.',
    tactics: [
      {
        stepNumber: '01',
        name: 'User & Stakeholder Interviews',
        detail: 'Run 1-on-1 sessions to listen to user frustrations, note daily workarounds, and understand business goals.'
      },
      {
        stepNumber: '02',
        name: 'Pattern & Competitor Benchmarking',
        detail: 'Study proven design patterns from industry-leading apps on Mobbin to see what users already know and trust.'
      },
      {
        stepNumber: '03',
        name: 'Affinity Mapping & Problem Framing',
        detail: 'Group user interview quotes into clear themes to write a focused problem brief and prioritize features.'
      }
    ],
    tools: [
      {
        name: 'FigJam',
        category: 'Collaborative Mapping',
        role: 'Affinity diagramming, user journey maps, and live team brainstorming.',
        why: 'An open whiteboard where designers, engineers, and product managers can group user feedback and agree on problems together.'
      },
      {
        name: 'Dovetail',
        category: 'User Research',
        role: 'Tagging video interviews, organizing customer quotes, and finding recurring themes.',
        why: 'Connects real user quotes directly to design decisions, replacing personal guesswork with verifiable evidence.'
      },
      {
        name: 'Mobbin',
        category: 'Pattern Research',
        role: 'Benchmarking real-world iOS, Android, and web app user flows.',
        why: 'Provides thousands of screenshots from shipped apps so we use navigation patterns that users already understand.'
      },
      {
        name: 'Linear / Notion',
        category: 'Documentation',
        role: 'Writing problem briefs, defining scope boundaries, and tracking feature priorities.',
        why: 'Keeps research findings cleanly connected with engineering tasks and sprint milestones.'
      },
      {
        name: 'Claude 3.5 Sonnet',
        category: 'AI Research Copilot',
        isAi: true,
        aiCategory: 'research',
        role: 'Synthesizing interview transcripts, clustering pain points, and drafting interview questions.',
        why: 'Processes 50+ pages of user conversation transcripts in seconds, identifying recurring complaint patterns without bias.',
        aiPrompt: 'Extract recurring user friction points from these 10 interview transcripts. Group by frequency and impact on user task completion.',
        aiImpact: 'Saves 6+ hours of manual interview tagging'
      },
      {
        name: 'Perplexity / Deep Research',
        category: 'AI Discovery & Market Audit',
        isAi: true,
        aiCategory: 'research',
        role: 'Synthesizing market research, competitor feature teardowns, and user reviews from Reddit & G2.',
        why: 'Surfaces hidden competitor friction points and unmet customer needs across the web in minutes.',
        aiPrompt: 'Analyze the top 5 recurring user complaints for enterprise design system tools across Reddit, G2, and Capterra. Focus on token sync and developer handoff.',
        aiImpact: 'Compiles competitor benchmarks 10x faster'
      },
      {
        name: 'FigJam AI',
        category: 'AI Workshop Clustering',
        isAi: true,
        aiCategory: 'research',
        role: 'Auto-clustering sticky notes into affinity groups and generating workshop summaries.',
        why: 'Instantly categorizes 100+ messy user feedback sticky notes into actionable thematic pillars in one click.',
        aiPrompt: 'Cluster these user feedback sticky notes into themes: Navigation, Latency, Data Export, Pricing.',
        aiImpact: 'Instant affinity grouping in team workshops'
      }
    ],
    deliverables: [
      'User Persona Profiles',
      'Customer Journey Maps',
      'Problem Definition Brief',
      'Feature Priority Matrix'
    ],
    qualityGate: [
      'Problem brief approved by product manager and lead engineer',
      'At least 5 recurring user friction points identified and documented',
      'Clear project scope agreed upon with explicit non-goals'
    ]
  },
  {
    id: 'wireframing',
    step: 'STEP 02',
    title: 'Information Architecture & Wireframes',
    subtitle: 'Structuring navigation and layouts with zero distractions',
    headline: 'Define how information flows through every screen and user decision',
    timeShare: '25% of project time • ~1–2 Weeks',
    icon: LayoutGrid,
    description: 'I create clear screen layouts, navigation structures, and user pathways using grayscale wireframes. Keeping visual styling out of this phase ensures the entire team focuses on clarity, logical flow, and usability.',
    tactics: [
      {
        stepNumber: '01',
        name: 'Sitemaps & Decision Trees',
        detail: 'Map every screen, menu path, and popup dialog to make sure there are no dead-ends in the experience.'
      },
      {
        stepNumber: '02',
        name: 'Grayscale Layout Exploration',
        detail: 'Sketch 3 to 4 layout directions in Figma to compare information density and find the most readable layout.'
      },
      {
        stepNumber: '03',
        name: 'Quick Video Walkthroughs',
        detail: 'Record 2-minute Loom walkthroughs for engineers to confirm technical feasibility before touching visual UI.'
      }
    ],
    tools: [
      {
        name: 'Figma',
        category: 'UI Wireframing',
        role: 'Grayscale wireframes, layout grids, and responsive constraints.',
        why: 'Auto-layout lets me test how screens adapt across mobile and desktop within minutes, without visual friction.'
      },
      {
        name: 'Whimsical',
        category: 'User Flows',
        role: 'Creating sitemaps, branching decision trees, and step-by-step user journeys.',
        why: 'Simple flowcharts that make complex software logic immediately clear to engineers and stakeholders.'
      },
      {
        name: 'Maze',
        category: 'Early Testing',
        role: 'Unmoderated click-testing on low-fidelity wireframes.',
        why: 'Tests whether real users can find key buttons and navigate without assistance before spending time on visual design.'
      },
      {
        name: 'Loom',
        category: 'Async Communication',
        role: 'Recording 2-minute video walkthroughs explaining layout decisions.',
        why: 'Replaces unnecessary meetings and gives developers clear context on why screens are structured a certain way.'
      },
      {
        name: 'Relume AI',
        category: 'AI Site & Wireframe Scaffolder',
        isAi: true,
        aiCategory: 'generative-ui',
        role: 'Generating sitemaps, navigation hierarchies, and wireframe component skeletons.',
        why: 'Translates high-level product briefs into structured multi-page navigation hierarchies and Figma wireframe components in minutes.',
        aiPrompt: 'Generate a sitemap and screen architecture for an AI benchmark arena with side-by-side model comparison, voting, and leaderboards.',
        aiImpact: 'Generates wireframe scaffolding 4x faster'
      },
      {
        name: 'v0 by Vercel',
        category: 'Generative UI & Layout Explorer',
        isAi: true,
        aiCategory: 'generative-ui',
        role: 'Quickly testing responsive layout variations with real data density and Tailwind CSS components.',
        why: 'Lets me test 4 different sidebar and table layout concepts in 5 minutes to see how real data wraps and stacks.',
        aiPrompt: 'Create a responsive split-screen comparison table with sticky headers, mobile card fallback, and live status badges.',
        aiImpact: 'Rapid multi-layout exploration in minutes'
      },
      {
        name: 'Galileo AI / Uizard',
        category: 'Sketch-to-Digital UI',
        isAi: true,
        aiCategory: 'generative-ui',
        role: 'Converting rough whiteboard sketches and text descriptions into editable multi-screen wireframes.',
        why: 'Turns paper sketches and rough whiteboard notes from team discovery sessions into structured digital wireframes.',
        aiPrompt: 'Convert this rough mobile checkout flow sketch into clean wireframe screens with progress stepper, address form, and payment review.',
        aiImpact: 'Digitizes hand-drawn sketches in seconds'
      }
    ],
    deliverables: [
      'Sitemap & Hierarchy Charts',
      'Grayscale Screen Wireframes',
      'Clickable Navigation Flow',
      '2-Minute Loom Walkthrough'
    ],
    qualityGate: [
      'Zero dead-end screens in any user pathway',
      'Engineering confirms data fields and API endpoints are feasible',
      'Testing confirms users reach the main action in under 10 seconds'
    ]
  },
  {
    id: 'tokens',
    step: 'STEP 03',
    title: 'Design Systems, Tokens & Visual UI',
    subtitle: 'Creating a scalable, consistent system in Figma and Code',
    headline: 'Turn wireframes into high-polish, accessible, and reusable components',
    timeShare: '20% of project time • ~1–2 Weeks',
    icon: Palette,
    description: 'I build a modular design system with consistent colors, typography, spacing, and component variants in Figma. Every style is connected to design tokens so that design and production code stay 100% in sync.',
    tactics: [
      {
        stepNumber: '01',
        name: 'Color & Spacing Token Setup',
        detail: 'Define color palettes, dark/light themes, and strict 4px/8px spacing scales for predictable layouts.'
      },
      {
        stepNumber: '02',
        name: 'Component Sets & Variants',
        detail: 'Build reusable buttons, form inputs, cards, and modal dialogs with hover, active, and disabled states.'
      },
      {
        stepNumber: '03',
        name: 'Accessibility & Contrast Checks',
        detail: 'Test every text and background pairing for WCAG 2.2 AAA contrast to make sure reading is effortless.'
      }
    ],
    tools: [
      {
        name: 'Figma Variables',
        category: 'Design Tokens',
        role: 'Managing dark/light themes, spacing tokens, and component properties.',
        why: 'Allows switching entire screens between light and dark mode in one click with zero manual restyling.'
      },
      {
        name: 'Tokens Studio',
        category: 'Token Pipeline',
        role: 'Exporting Figma variables directly to JSON and TypeScript code.',
        why: 'Guarantees that colors and spacing in Figma match the frontend CSS variables with 100% precision.'
      },
      {
        name: 'Stark',
        category: 'Accessibility Checker',
        role: 'Automated contrast ratio audits and colorblind simulations.',
        why: 'Catches hard-to-read text early so every screen is accessible to users with visual impairments.'
      },
      {
        name: 'Apple HIG & Material 3',
        category: 'Design Standards',
        role: 'Referencing native mobile touch targets (44px/48px) and typography scales.',
        why: 'Ensures buttons are comfortable to tap on mobile and layouts feel natural on iOS and Android.'
      },
      {
        name: 'Figma AI',
        category: 'Native Canvas AI',
        isAi: true,
        aiCategory: 'visuals',
        role: 'First Draft wireframing, automated layer renaming, visual similarity search, and component variant synthesis.',
        why: 'Automates tedious design housekeeping like renaming 50 messy frame layers and finding icon variants across team libraries.',
        aiPrompt: 'Generate a 3-column pricing card variant with annual discount toggle, matching the existing typography and token library.',
        aiImpact: 'Automates layer renaming and variant drafting'
      },
      {
        name: 'Recraft AI',
        category: 'AI Vector Graphics',
        isAi: true,
        aiCategory: 'visuals',
        role: 'Generating consistent SVG vector icons, illustrations, and 3D icons.',
        why: 'Creates clean vector paths with consistent stroke weights that seamlessly match our design system iconography.',
        aiPrompt: 'Vector icon set for security & encryption in 1.5px stroke monoline style, square 24x24 grid, pure minimalist paths.',
        aiImpact: 'Generates pixel-matched custom SVG icons'
      },
      {
        name: 'Midjourney / Flux',
        category: 'AI Art Direction',
        isAi: true,
        aiCategory: 'visuals',
        role: 'Visual moodboarding, aesthetic references, and textural lighting exploration.',
        why: 'Explores lighting, atmospheric glass reflections, and editorial aesthetic palettes before creating final UI assets.',
        aiPrompt: 'Minimal dark mode UI moodboard, subtle titanium hairline borders, deep charcoal obsidian glass, ambient emerald telemetry glow.',
        aiImpact: 'Accelerates aesthetic & lighting direction'
      }
    ],
    deliverables: [
      'Figma Component Library',
      'Dark & Light Mode Variables',
      'High-Fidelity Screen Designs',
      'WCAG AAA Accessibility Report'
    ],
    qualityGate: [
      'All text meets or exceeds 7:1 WCAG contrast for AAA rating',
      'Every component uses strict 4px/8px spacing tokens',
      'Interactive components include default, hover, active, and disabled states'
    ]
  },
  {
    id: 'kinetics',
    step: 'STEP 04',
    title: 'Interactive Prototyping & Motion',
    subtitle: 'Bringing interfaces to life with responsive animations and haptics',
    headline: 'Make interactions feel natural, responsive, and tactile',
    timeShare: '20% of project time • ~1–2 Weeks',
    icon: Layers,
    description: 'Static pictures cannot tell the whole story. I design fluid screen transitions, spring-physics button clicks, and subtle haptic feedback so the software feels alive, responsive, and effortless to use.',
    tactics: [
      {
        stepNumber: '01',
        name: 'Spring Physics Tuning',
        detail: 'Calibrate animation bounce, stiffness, and speed so movements feel like real physical objects.'
      },
      {
        stepNumber: '02',
        name: 'Interactive Micro-Interactions',
        detail: 'Design hover states, sliding segmented pills, expanding drawers, and smooth dialog reveals.'
      },
      {
        stepNumber: '03',
        name: 'Realistic User Testing',
        detail: 'Put the clickable prototype on real phones to observe tap accuracy, screen transitions, and natural timing.'
      }
    ],
    tools: [
      {
        name: 'ProtoPie',
        category: 'Advanced Prototyping',
        role: 'Interactive prototypes with native phone sensors, camera input, and haptic feedback.',
        why: 'Allows testing realistic mobile interactions and gestures without having to code a full mobile app.'
      },
      {
        name: 'Framer Motion',
        category: 'Motion & Springs',
        role: 'Testing spring physics values (stiffness, damping, mass) and layout animations.',
        why: 'The exact motion library used in production React, ensuring prototype animations translate directly to code.'
      },
      {
        name: 'Spline',
        category: '3D Graphics',
        role: 'Creating lightweight, interactive 3D WebGL assets and cursor-tracking scenes.',
        why: 'Exports web-friendly 3D elements that run smoothly in modern browsers without heavy load times.'
      },
      {
        name: 'Screen Studio',
        category: 'Video Polish',
        role: 'Recording high-resolution 60fps interaction clips with smooth automatic zooms.',
        why: 'Creates clear, high-quality demonstration videos for developers, stakeholders, and design reviews.'
      },
      {
        name: 'Lovable',
        category: 'AI Full-Stack App Builder',
        isAi: true,
        aiCategory: 'builders',
        role: 'Generating live, clickable full-stack web applications with working Supabase backend data for user testing.',
        why: 'Replaces static click-through mockups with a live working app so users can test real authentication, database forms, and reactive logic.',
        aiPrompt: 'Build a customer onboarding wizard with 3 steps: workspace creation, team invites, and role selection. Store entries in Supabase and trigger toast feedback.',
        aiImpact: 'Turns static designs into working apps in minutes'
      },
      {
        name: 'Bolt.new (StackBlitz)',
        category: 'In-Browser Sandbox Prototyping',
        isAi: true,
        aiCategory: 'builders',
        role: 'Running full-stack Vite / React / Node.js prototypes inside browser WebContainers with instant URL sharing.',
        why: 'Enables rapid design spikes and sharing live interactive prototypes with clients without setting up local dev environments.',
        aiPrompt: 'Create an interactive multi-filter analytics dashboard using Tailwind and Lucide icons with instant client-side date-range filtering.',
        aiImpact: 'Zero-setup live browser prototype with instant URL share'
      },
      {
        name: 'Claude 3.5 (UX Copy & Edge Data)',
        category: 'AI Copy & Edge Data',
        isAi: true,
        aiCategory: 'research',
        role: 'Generating realistic edge-case sample data, error states, and localized microcopy.',
        why: 'Replaces fake "Lorem Ipsum" with realistic user data: extreme long names, foreign addresses, and helpful error validation messages.',
        aiPrompt: 'Generate 10 realistic edge-case user profiles: non-Latin names, longest character lengths, valid error state messages.',
        aiImpact: 'Eliminates dummy lorem-ipsum in prototypes'
      }
    ],
    deliverables: [
      'Clickable High-Fidelity Prototype',
      'Spring Motion Spec Sheet',
      '60fps Interaction Demo Videos',
      'User Usability Test Report'
    ],
    qualityGate: [
      'All animations run at smooth 60fps with zero frame stutter',
      'Full support for users who turn on prefers-reduced-motion',
      'Usability test task completion rate exceeds 85%'
    ]
  },
  {
    id: 'production',
    step: 'STEP 05',
    title: 'Design Engineering & Production Shipping',
    subtitle: 'Translating design into clean, pixel-perfect production code',
    headline: 'Deliver production software that matches the design pixel for pixel',
    timeShare: '15% of project time • ~1–2 Weeks',
    icon: CheckCircle2,
    description: 'The design process does not stop in Figma. I write and inspect production-ready React 19, TypeScript, and Tailwind CSS code to make sure the final live product matches the design pixel for pixel.',
    tactics: [
      {
        stepNumber: '01',
        name: 'Production Component Code',
        detail: 'Build accessible, type-safe React 19 components directly matching the Figma design tokens.'
      },
      {
        stepNumber: '02',
        name: 'Living Storybook Docs',
        detail: 'Document every component variant, prop combination, and edge case in an interactive catalog.'
      },
      {
        stepNumber: '03',
        name: 'Design QA & Performance Audit',
        detail: 'Inspect live builds in Chrome DevTools to eliminate sub-pixel alignment issues and layout shifts.'
      }
    ],
    tools: [
      {
        name: 'React 19 & TypeScript',
        category: 'Frontend Code',
        role: 'Writing clean, type-safe components that match design tokens 1-to-1.',
        why: 'Bridging design and code directly ensures what is designed is exactly what gets delivered to users.'
      },
      {
        name: 'Tailwind CSS',
        category: 'Utility Styling',
        role: 'Fast, responsive styling using design token classes with zero runtime CSS overhead.',
        why: 'Utility classes mirror Figma auto-layout padding and spacing scales with sub-pixel precision.'
      },
      {
        name: 'Storybook',
        category: 'Component Catalog',
        role: 'Interactive component catalog for testing states, edge cases, and visual regressions.',
        why: 'Lets engineers and designers test every component in isolation across all viewports and themes.'
      },
      {
        name: 'Chrome DevTools & Lighthouse',
        category: 'Performance QA',
        role: 'Auditing layout shifts (CLS), 60fps frame rates, and keyboard navigation.',
        why: 'Verifies fast load times, responsive behavior, and accessibility on real devices before launch.'
      },
      {
        name: 'Cursor',
        category: 'AI Code Editor & Composer',
        isAi: true,
        aiCategory: 'code-agents',
        role: 'Scaffolding accessible React 19 components from Figma design specs and checking TypeScript types.',
        why: 'Translates Figma auto-layout, spacing, and color tokens into clean Tailwind CSS classes with full ARIA accessibility.',
        aiPrompt: 'Convert this Figma component spec into an accessible React 19 component with Tailwind CSS, supporting keyboard navigation and hover states.',
        aiImpact: 'Speeds up component code scaffolding 3x'
      },
      {
        name: 'Claude Code',
        category: 'Agentic Terminal Engineer',
        isAi: true,
        aiCategory: 'code-agents',
        role: 'Autonomous CLI assistant that audits design systems, updates token variables, and refactors components across the repo.',
        why: 'Runs directly in the terminal to refactor component props, update design token variables across 20+ files, and verify zero build regressions.',
        aiPrompt: 'Audit all button and card components in /src/components, replace hardcoded hex colors with semantic CSS token variables, and verify with npm run build.',
        aiImpact: 'Automates multi-file design system token migrations'
      },
      {
        name: 'Codex / OpenAI Canvas',
        category: 'Automated Testing & Logic',
        isAi: true,
        aiCategory: 'code-agents',
        role: 'Generating comprehensive component unit tests, accessibility assertions, and edge-case rendering logic.',
        why: 'Automatically writes unit test suites for interactive UI components, verifying WCAG keyboard focus states and ARIA roles.',
        aiPrompt: 'Write Playwright integration tests for our modal dialog component: test Escape key dismissal, focus trap, and background scroll lock.',
        aiImpact: 'Automates 100% accessible component test coverage'
      }
    ],
    deliverables: [
      'Production React 19 Components',
      'Interactive Storybook Catalog',
      'Git Pull Requests & Commits',
      'Design QA Sign-Off Checklist'
    ],
    qualityGate: [
      'Cumulative Layout Shift (CLS) under 0.01 for rock-solid stability',
      '100% token consistency between Figma and production CSS',
      'Cross-browser verified across Chrome, Safari, and Firefox'
    ]
  }
];

export const DesignProcessTimeline: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string>(PROCESS_STAGES[0].id);
  const [selectedToolName, setSelectedToolName] = useState<string>(PROCESS_STAGES[0].tools[0].name);
  const [toolFilter, setToolFilter] = useState<'all' | 'core' | 'ai'>('all');
  const [viewMode, setViewMode] = useState<'deep-dive' | 'ai-stack' | 'pipeline'>('deep-dive');
  const [aiCategoryFilter, setAiCategoryFilter] = useState<'all' | 'builders' | 'generative-ui' | 'code-agents' | 'research' | 'visuals'>('all');
  const [copiedPromptTool, setCopiedPromptTool] = useState<string | null>(null);
  const { playClick } = useSound();

  const currentStage = PROCESS_STAGES.find(s => s.id === activeStageId) || PROCESS_STAGES[0];
  const CurrentIcon = currentStage.icon;

  const filteredTools = currentStage.tools.filter(tool => {
    if (toolFilter === 'core') return !tool.isAi;
    if (toolFilter === 'ai') return tool.isAi;
    return true;
  });

  const handleStageChange = (id: string, idx: number) => {
    playClick(750 + idx * 35, 0.02, 'sine');
    setActiveStageId(id);
    const stage = PROCESS_STAGES.find(s => s.id === id);
    if (stage && stage.tools.length > 0) {
      setSelectedToolName(stage.tools[0].name);
    }
  };

  const handleToolClick = (toolName: string) => {
    playClick(920, 0.03, 'triangle');
    setSelectedToolName(toolName);
  };

  const handleViewModeToggle = (mode: 'deep-dive' | 'ai-stack' | 'pipeline') => {
    playClick(850, 0.03, 'sine');
    setViewMode(mode);
  };

  const handleAiCategoryFilter = (cat: 'all' | 'builders' | 'generative-ui' | 'code-agents' | 'research' | 'visuals') => {
    playClick(900, 0.02, 'sine');
    setAiCategoryFilter(cat);
  };

  const handleCopyPrompt = (toolName: string, promptText: string) => {
    navigator.clipboard.writeText(promptText);
    playClick(1000, 0.03, 'sine');
    setCopiedPromptTool(toolName);
    setTimeout(() => setCopiedPromptTool(null), 2000);
  };

  // Collect all AI tools across all 5 stages for the dedicated AI view
  const allAiTools = PROCESS_STAGES.flatMap(stage => 
    stage.tools.filter(t => t.isAi).map(t => ({ ...t, stageName: stage.title, stageStep: stage.step }))
  );

  const displayedAiTools = allAiTools.filter(t => {
    if (aiCategoryFilter === 'all') return true;
    return t.aiCategory === aiCategoryFilter;
  });

  return (
    <section id="process-timeline" className="relative scroll-mt-24 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8 border-b border-white/5 pb-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest text-white/80 uppercase">
            <GitCommit className="w-3.5 h-3.5 text-primary" />
            <span>HOW I WORK // 5 PHASES FROM DISCOVERY TO CODE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-semibold tracking-[-0.035em] text-[#f7f8f8] font-jakarta">
            My Design <span className="font-instrument italic font-normal tracking-normal text-white/95">Process</span> &amp; Systems
          </h2>
          <p className="text-xs sm:text-sm text-white/60 max-w-2xl leading-relaxed font-sans">
            A clear, step-by-step breakdown of how I research, wireframe, design, and ship production-ready software — including the essential tools and AI copilots used at every stage.
          </p>
        </div>

        {/* 3 View Mode Toggles: Deep-Dive vs AI Tool Stack vs End-to-End Pipeline */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10 shrink-0 self-start md:self-end overflow-x-auto no-scrollbar max-w-full">
          <button
            type="button"
            onClick={() => handleViewModeToggle('deep-dive')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
              viewMode === 'deep-dive'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Stage Deep-Dive</span>
          </button>

          <button
            type="button"
            onClick={() => handleViewModeToggle('ai-stack')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
              viewMode === 'ai-stack'
                ? 'bg-indigo-400 text-black font-semibold shadow-sm'
                : 'text-indigo-300/80 hover:text-indigo-200'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Design Stack ({allAiTools.length})</span>
          </button>

          <button
            type="button"
            onClick={() => handleViewModeToggle('pipeline')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
              viewMode === 'pipeline'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Workflow className="w-3.5 h-3.5" />
            <span>Full Pipeline View</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: STEP-BY-STEP STAGE DEEP-DIVE */}
      {/* ========================================================================= */}
      {viewMode === 'deep-dive' && (
        <div className="grid md:grid-cols-12 gap-5 items-start">
          
          {/* Left Column: Stage Selector Tabs (4 Columns) */}
          <div className="md:col-span-4 space-y-2.5">
            {PROCESS_STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = stage.id === activeStageId;
              const aiCount = stage.tools.filter(t => t.isAi).length;

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => handleStageChange(stage.id, idx)}
                  className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer group relative overflow-hidden ${
                    isActive
                      ? 'bg-white/10 border-white/30 text-white shadow-lg shadow-black/40'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04] text-white/70'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 transition-colors ${
                      isActive ? 'bg-white text-black border-white shadow-sm' : 'bg-white/5 border-white/10 text-white/60 group-hover:text-white'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[9.5px] font-mono tracking-widest text-white/40 block uppercase">
                          {stage.step}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                            +{aiCount} AI
                          </span>
                          <span className="text-[9px] font-mono text-white/40 block truncate">
                            {stage.timeShare.split('•')[0].trim()}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xs sm:text-sm font-semibold tracking-tight text-white group-hover:text-primary transition-colors truncate">
                        {stage.title}
                      </h3>

                      {/* Tools Summary Strip on Left Button */}
                      <div className="flex items-center gap-1.5 pt-0.5 overflow-hidden text-[10px] font-mono text-white/45">
                        <Wrench className="w-2.5 h-2.5 shrink-0 text-white/30" />
                        <span className="truncate">
                          {stage.tools.slice(0, 3).map(t => t.name).join(' • ')}...
                        </span>
                      </div>
                    </div>

                    <ArrowRight className={`w-4 h-4 mt-2.5 shrink-0 transition-transform duration-200 ${
                      isActive ? 'translate-x-0.5 text-white' : 'text-white/20 group-hover:text-white/50'
                    }`} />
                  </div>

                  {isActive && (
                    <motion.div 
                      layoutId="active-stage-indicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-white/80 to-transparent" 
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Stage Comprehensive Deep-Dive (8 Columns) */}
          <div className="md:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl bg-[#0c0d12] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden"
              >
                
                {/* Header Banner */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-white/10">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white text-black border border-white shrink-0 shadow-md">
                      <CurrentIcon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-white/50">
                          {currentStage.step} // PHASE METHODOLOGY
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                        {currentStage.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/60 font-sans">
                        {currentStage.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Time Share Pill */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10.5px] font-mono text-emerald-400 shrink-0 self-start">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{currentStage.timeShare}</span>
                  </div>
                </div>

                {/* Stage Headline Quote */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <p className="text-sm sm:text-base text-white/95 font-instrument italic leading-relaxed tracking-normal">
                    "{currentStage.headline}"
                  </p>
                </div>

                {/* Main Description */}
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                  {currentStage.description}
                </p>

                {/* ================================================================= */}
                {/* PART 1: HOW I DO IT // 3 TACTICAL ACTIONS */}
                {/* ================================================================= */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10.5px] font-mono tracking-widest uppercase text-white/50 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-primary" />
                      HOW I WORK // 3 TACTICAL STEPS
                    </span>
                    <span className="text-[10px] font-mono text-white/40">STEP BY STEP</span>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3">
                    {currentStage.tactics.map((tactic) => (
                      <div
                        key={tactic.stepNumber}
                        className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors space-y-1.5"
                      >
                        <span className="text-[10px] font-mono font-bold text-white/40 block">
                          STEP {tactic.stepNumber}
                        </span>
                        <h4 className="text-xs font-semibold text-white font-mono">
                          {tactic.name}
                        </h4>
                        <p className="text-[11px] text-white/60 font-sans leading-relaxed">
                          {tactic.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ================================================================= */}
                {/* PART 2: ESSENTIAL TOOLS & AI ACCELERATION */}
                {/* ================================================================= */}
                <div className="space-y-3 pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-[10.5px] font-mono tracking-widest uppercase text-white/50 flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-amber-400" />
                      TOOLS USED IN THIS STEP (CLICK TO INSPECT)
                    </span>

                    {/* Filter Pills for Tools */}
                    <div className="flex items-center gap-1 p-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono">
                      {[
                        { key: 'all', label: `All (${currentStage.tools.length})` },
                        { key: 'core', label: `Core Tools (${currentStage.tools.filter(t => !t.isAi).length})` },
                        { key: 'ai', label: `AI Tools (${currentStage.tools.filter(t => t.isAi).length})` },
                      ].map(f => (
                        <button
                          key={f.key}
                          type="button"
                          onClick={() => setToolFilter(f.key as any)}
                          className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                            toolFilter === f.key
                              ? 'bg-white text-black font-semibold'
                              : 'text-white/60 hover:text-white'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tool Cards Grid */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    {filteredTools.map((tool) => {
                      const isSelected = selectedToolName === tool.name;
                      return (
                        <div
                          key={tool.name}
                          onClick={() => handleToolClick(tool.name)}
                          className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer text-left space-y-2 relative overflow-hidden ${
                            isSelected
                              ? tool.isAi
                                ? 'bg-indigo-500/10 border-indigo-500/40 shadow-md shadow-indigo-950/20'
                                : 'bg-amber-400/10 border-amber-400/30 shadow-md shadow-amber-950/20'
                              : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/5 text-white/70'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {tool.isAi ? (
                                <Bot className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-400' : 'text-indigo-400/80'}`} />
                              ) : (
                                <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-amber-400 animate-pulse' : 'bg-white/40'}`} />
                              )}
                              <h4 className="text-xs font-bold text-white font-mono">
                                {tool.name}
                              </h4>
                            </div>
                            <span className={`text-[9.5px] font-mono px-2 py-0.5 rounded-full border ${
                              tool.isAi 
                                ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
                                : 'bg-white/5 text-white/50 border border-white/10'
                            }`}>
                              {tool.category}
                            </span>
                          </div>

                          <p className="text-[11.5px] text-white/75 font-sans leading-relaxed">
                            <strong className="text-white font-medium">Role:</strong> {tool.role}
                          </p>

                          <div className="p-2 rounded-lg bg-black/40 border border-white/5 text-[10.5px] font-mono text-white/60 space-y-0.5">
                            <span className={`${tool.isAi ? 'text-indigo-400' : 'text-amber-400'} text-[9px] uppercase tracking-wider block font-semibold`}>
                              WHY I USE IT:
                            </span>
                            <span className="text-white/80 font-sans block leading-normal">
                              {tool.why}
                            </span>
                          </div>

                          {/* AI Prompt / Impact Callout if AI tool */}
                          {tool.isAi && tool.aiPrompt && (
                            <div className="p-2 rounded-lg bg-indigo-950/30 border border-indigo-500/20 space-y-1.5 text-[10px] font-mono">
                              <div className="flex items-center justify-between text-indigo-300">
                                <span className="flex items-center gap-1 font-semibold">
                                  <MessageSquare className="w-2.5 h-2.5" />
                                  WORKFLOW PROMPT:
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCopyPrompt(tool.name, tool.aiPrompt!);
                                  }}
                                  className="text-[9px] text-indigo-400 hover:text-white flex items-center gap-0.5 cursor-pointer"
                                >
                                  <Copy className="w-2.5 h-2.5" />
                                  <span>{copiedPromptTool === tool.name ? 'Copied' : 'Copy'}</span>
                                </button>
                              </div>
                              <p className="text-white/80 font-mono text-[10px] leading-relaxed italic select-text">
                                "{tool.aiPrompt}"
                              </p>
                              {tool.aiImpact && (
                                <span className="text-emerald-400 text-[9px] block pt-0.5 font-sans font-medium">
                                  ✓ {tool.aiImpact}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ================================================================= */}
                {/* PART 3: DELIVERABLES & QUALITY GATE */}
                {/* ================================================================= */}
                <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-white/5">
                  
                  {/* Left: What Gets Created (Deliverables) */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-white/50 block">
                      WHAT GETS CREATED // 4 DELIVERABLES
                    </span>
                    <div className="space-y-1.5">
                      {currentStage.deliverables.map((item) => (
                        <div
                          key={item}
                          className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center gap-2.5 text-xs font-mono text-white/85"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Quality Gate (Definition of Done) */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-white/50 block flex items-center gap-1.5">
                      <ShieldCheck className="w-3 h-3 text-sky-400" />
                      QUALITY GATE // DEFINITION OF DONE
                    </span>
                    <div className="space-y-1.5">
                      {currentStage.qualityGate.map((criterion) => (
                        <div
                          key={criterion}
                          className="p-2.5 rounded-lg bg-sky-500/5 border border-sky-500/15 flex items-start gap-2 text-xs font-sans text-white/80 leading-normal"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                          <span>{criterion}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Bottom Verification Footer */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-white/50">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>VERIFIED ACROSS 7 SHIPPED PRODUCTION APPS</span>
                  </div>
                  <span className="text-white font-medium">FULL LIFECYCLE REPEATABLE</span>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: DEDICATED AI TOOLS FOR PRODUCT DESIGN MATRIX */}
      {/* ========================================================================= */}
      {viewMode === 'ai-stack' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0c0d12] border border-white/10 space-y-6 shadow-2xl">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-[10px] font-mono text-indigo-300">
                  <Bot className="w-3 h-3" />
                  <span>AI IN PRODUCT DESIGN // {allAiTools.length} SPECIALIZED COPILOTS</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight font-jakarta">
                  How I Use <span className="font-instrument italic font-normal text-indigo-300">AI</span> in Product Design
                </h3>
              </div>
              <p className="text-xs text-white/60 max-w-md font-sans leading-relaxed">
                AI does not replace taste or user empathy — it is a speed multiplier. Here is the exact stack of AI copilots I use across discovery, layout exploration, vector generation, and design engineering.
              </p>
            </div>

            {/* AI Principles Strip */}
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-indigo-300 font-semibold">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Human Taste First</span>
                </div>
                <p className="text-[11px] text-white/60 font-sans leading-relaxed">
                  AI generates variations fast, but humans curate typography, color harmony, and accessibility.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-indigo-300 font-semibold">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Real Data over Lorem Ipsum</span>
                </div>
                <p className="text-[11px] text-white/60 font-sans leading-relaxed">
                  Used to generate real customer edge-case data (long names, error states) to stress-test designs.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-indigo-300 font-semibold">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Token-Accurate Code</span>
                </div>
                <p className="text-[11px] text-white/60 font-sans leading-relaxed">
                  Translates Figma auto-layout and variable tokens directly into production React 19 code 3x faster.
                </p>
              </div>
            </div>

            {/* Category Filter Pills for AI Tools */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 pt-1">
              {[
                { id: 'all', label: `All Copilots (${allAiTools.length})` },
                { id: 'builders', label: 'App Builders (Lovable, Bolt)' },
                { id: 'generative-ui', label: 'Generative UI & Wireframes' },
                { id: 'code-agents', label: 'Design-to-Code & CLI (Cursor, Claude Code, Codex)' },
                { id: 'research', label: 'Research & Intelligence' },
                { id: 'visuals', label: 'Visuals & Design Systems' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleAiCategoryFilter(cat.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono shrink-0 transition-colors cursor-pointer border ${
                    aiCategoryFilter === cat.id
                      ? 'bg-indigo-500/20 text-indigo-200 border-indigo-500/50 shadow-sm font-semibold'
                      : 'bg-white/[0.03] text-white/60 border-white/10 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Grid of All AI Tools by Phase */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {displayedAiTools.map((aiTool) => (
                <div
                  key={aiTool.name}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-indigo-500/30 transition-all duration-200 flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-1 flex-wrap">
                      <span className="text-[9.5px] font-mono tracking-widest text-indigo-400 uppercase">
                        {aiTool.stageStep}
                      </span>
                      <span className="text-[9.5px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        {aiTool.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-300 group-hover:bg-indigo-500/20 transition-colors">
                        {aiTool.name.includes('Claude Code') ? (
                          <Terminal className="w-4 h-4 text-emerald-400" />
                        ) : aiTool.name.includes('Lovable') || aiTool.name.includes('Bolt') ? (
                          <Boxes className="w-4 h-4 text-sky-400" />
                        ) : aiTool.name.includes('Cursor') || aiTool.name.includes('Codex') ? (
                          <Code2 className="w-4 h-4 text-amber-400" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                      </div>
                      <h4 className="text-sm font-semibold text-white font-mono">
                        {aiTool.name}
                      </h4>
                    </div>

                    <p className="text-xs text-white/70 font-sans leading-relaxed">
                      <strong className="text-white font-medium">Role:</strong> {aiTool.role}
                    </p>
                  </div>

                  {/* Why I use it */}
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1 text-[11px]">
                    <span className="text-amber-400 text-[9px] font-mono uppercase tracking-wider block font-semibold">
                      WHY IT'S ESSENTIAL:
                    </span>
                    <p className="text-white/75 font-sans leading-normal">
                      {aiTool.why}
                    </p>
                  </div>

                  {/* Prompt Box */}
                  {aiTool.aiPrompt && (
                    <div className="p-2.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 space-y-1.5 text-[10.5px]">
                      <div className="flex items-center justify-between text-indigo-300 font-mono text-[9.5px]">
                        <span>PROMPT PATTERN:</span>
                        <button
                          type="button"
                          onClick={() => handleCopyPrompt(aiTool.name, aiTool.aiPrompt!)}
                          className="hover:text-white flex items-center gap-0.5 cursor-pointer"
                        >
                          <Copy className="w-2.5 h-2.5" />
                          <span>{copiedPromptTool === aiTool.name ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="text-white/80 font-mono text-[10px] leading-relaxed italic select-text">
                        "{aiTool.aiPrompt}"
                      </p>
                    </div>
                  )}

                  {aiTool.aiImpact && (
                    <span className="text-[10px] font-mono text-emerald-400 block pt-1">
                      ✓ {aiTool.aiImpact}
                    </span>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: END-TO-END WORKFLOW PIPELINE VIEW */}
      {/* ========================================================================= */}
      {viewMode === 'pipeline' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0c0d12] border border-white/10 space-y-6 shadow-2xl">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-primary uppercase block">
                  END-TO-END LIFECYCLE MAP
                </span>
                <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight font-jakarta">
                  The Complete Product Design <span className="font-instrument italic font-normal text-white/95">Pipeline</span>
                </h3>
              </div>
              <p className="text-xs text-white/50 max-w-md font-sans leading-relaxed">
                How an ambiguous problem statement flows through research, wireframing, design tokens, and prototypes into shipped production code.
              </p>
            </div>

            {/* Pipeline Stage Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
              {PROCESS_STAGES.map((stage, idx) => {
                const Icon = stage.icon;
                return (
                  <div
                    key={stage.id}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-200 flex flex-col justify-between space-y-4 group"
                  >
                    {/* Top Step & Icon */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-white/40">
                          {stage.step}
                        </span>
                        <div className="p-1.5 rounded-lg bg-white/5 text-white/70 group-hover:text-white group-hover:bg-white/10 transition-colors">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <h4 className="text-xs font-semibold text-white tracking-tight">
                        {stage.title}
                      </h4>

                      <span className="text-[10px] font-mono text-emerald-400/80 block">
                        {stage.timeShare.split('•')[0].trim()}
                      </span>
                    </div>

                    {/* Core Essential Tools in this phase */}
                    <div className="space-y-1 pt-2 border-t border-white/5">
                      <span className="text-[9px] font-mono text-amber-400 block uppercase">
                        ESSENTIAL TOOLS:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {stage.tools.map(t => (
                          <span
                            key={t.name}
                            className={`px-1.5 py-0.5 rounded text-[9.5px] font-mono border ${
                              t.isAi 
                                ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/25'
                                : 'bg-white/5 text-white/80 border-white/10'
                            }`}
                          >
                            {t.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Outcome */}
                    <div className="space-y-1 pt-2 border-t border-white/5">
                      <span className="text-[9px] font-mono text-white/40 block uppercase">
                        PRIMARY OUTPUT:
                      </span>
                      <p className="text-[11px] text-white/70 font-sans leading-normal">
                        {stage.deliverables[0]}
                      </p>
                    </div>

                    {/* Quick Jump to Deep-Dive */}
                    <button
                      type="button"
                      onClick={() => {
                        handleStageChange(stage.id, idx);
                        setViewMode('deep-dive');
                      }}
                      className="w-full py-1.5 rounded-lg bg-white/5 hover:bg-white hover:text-black text-[10px] font-mono text-white/70 transition-colors cursor-pointer text-center"
                    >
                      Inspect Details →
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Pipeline Summary Bar */}
            <div className="p-4 rounded-xl bg-[#07080b] border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-white/60">
              <div className="flex items-center gap-2">
                <Workflow className="w-4 h-4 text-emerald-400" />
                <span className="text-white font-medium">5 Sequential Quality Gates</span>
              </div>
              <div className="flex items-center gap-4 text-[11px]">
                <span>20+ ESSENTIAL &amp; AI DESIGN TOOLS</span>
                <span className="text-white/20">•</span>
                <span>ZERO DESIGN-ENGINEERING DRIFT</span>
                <span className="text-white/20">•</span>
                <span className="text-emerald-400 font-semibold">100% PRODUCTION TESTED</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STRATEGIC DESIGN DECISION AUDIT // A/B FORK INSPECTOR */}
      {/* ========================================================================= */}
      <div className="pt-8">
        <DecisionForkViewer />
      </div>

    </section>
  );
};
