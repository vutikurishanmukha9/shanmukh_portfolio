import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Terminal, CheckCircle2, Zap, Brain, Layers, Cpu } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const commands = [
  {
    cmd: 'contextly init',
    desc: 'Bootstraps the application by creating the .contextly local state directory in the repository.',
    icon: Layers,
  },
  {
    cmd: 'contextly analyze',
    desc: 'The ultimate context generator. Scans the README, structure, dependencies, and memory to build the final PROJECT_CONTEXT.md file.',
    icon: Brain,
  },
  {
    cmd: 'contextly discover',
    desc: 'Runs the Pattern Discovery Engine. Statically analyzes the codebase using heuristics to identify unwritten team conventions.',
    icon: Zap,
  },
  {
    cmd: 'contextly learn --auto',
    desc: 'The interactive gatekeeper. Triggers the Discovery Engine and prompts the developer to approve or reject conventions.',
    icon: CheckCircle2,
  },
  {
    cmd: 'contextly memory',
    desc: 'Displays all the conventions, architectural preferences, and rules currently saved in the project\'s memory bank.',
    icon: Cpu,
  },
  {
    cmd: 'contextly pack <dir>',
    desc: 'Bundles a specific directory into an LLM-ready Context Pack and calculates its token size to prevent context bloat.',
    icon: Terminal,
  },
  {
    cmd: 'contextly inspect',
    desc: 'Performs a deep dive on repository complexity, identifying massive files and warning about "Token Hogs".',
    icon: Brain,
  },
];

export default function ProjectContextLy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 border-b-[0.5px] border-border/60 bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4 lg:px-8 h-12 flex items-center justify-between">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Portfolio
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-[0.5px] border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono uppercase tracking-widest mb-6">
              <Terminal className="w-3.5 h-3.5" />
              Live on PyPI
            </div>
            <h1 className="font-serif-display text-4xl md:text-6xl font-normal tracking-tight text-foreground mb-6">
              Context-Ly CLI
            </h1>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              An open-source Context Intelligence Engine built to solve one of the most frustrating problems in modern AI-assisted development: Token Waste and Context Loss.
            </p>
          </div>

          {/* Installation Box */}
          <div className="mb-16">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3 font-semibold ml-1">Installation</div>
            <div className="relative group border-[0.5px] border-border/80 bg-card/60 backdrop-blur-sm rounded-lg p-6 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center justify-between">
                <code className="font-mono text-sm md:text-base text-foreground relative z-10 flex items-center gap-3">
                  <span className="text-emerald-500 select-none">$</span>
                  <span className="font-semibold">pip install contextly</span>
                </code>
                <div className="hidden sm:block text-[9px] font-mono uppercase tracking-widest text-muted-foreground/60 border border-border/50 rounded px-2 py-1 select-none">
                  Python 3.9+ Required
                </div>
              </div>
            </div>
          </div>

          {/* Commands Grid */}
          <div className="mb-16">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-6 font-semibold ml-1">Core CLI Commands</div>
            <div className="grid gap-4 md:grid-cols-2">
              {commands.map((cmd, i) => (
                <motion.div
                  key={cmd.cmd}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="group relative border-[0.5px] border-border/60 bg-background/50 hover:bg-card/80 transition-colors duration-300 rounded-lg p-5 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors duration-300" />
                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-background border-[0.5px] border-border/80 p-1.5 rounded text-primary/80 group-hover:text-primary transition-colors">
                      <cmd.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-mono text-sm font-semibold text-foreground mb-2">
                        {cmd.cmd}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {cmd.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Architectural Overview */}
          <div className="border-t-[0.5px] border-border/60 pt-12">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-6 font-semibold ml-1">Architectural Engine</div>
            <div className="border-[0.5px] border-border/80 bg-card/45 rounded-lg p-6 md:p-8">
              <h3 className="font-serif-display text-xl md:text-2xl font-medium tracking-tight text-foreground mb-4">
                The Controller-Engine Decoupling
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-6">
                Context-Ly is built on strict separation of concerns. CLI routing (Controllers) via Typer are decoupled from the core business logic (Engines). Domain isolation prevents the .contextly state directory from polluting version control, centralizing all file-system I/O operations into the memory engine. 
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {['Python', 'Typer', 'Rich', 'Pytest', 'PyYAML'].map(tech => (
                  <span key={tech} className="px-2.5 py-1 rounded bg-background border-[0.5px] border-border/80 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </motion.div>
      </main>
    </div>
  );
}
