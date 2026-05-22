import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

const TelemetryDashboard = () => {
  return (
    <div className="relative border-[0.5px] border-border bg-card/60 backdrop-blur-md rounded-lg p-5 font-mono text-[11px] text-muted-foreground select-none overflow-hidden h-[420px] flex flex-col justify-between shadow-none">
      {/* Top Header Bar */}
      <div>
        <div className="flex items-center justify-between border-b-[0.5px] border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold tracking-widest text-foreground text-[9px] uppercase">
              CONSOLE_SESSION // ACTIVE
            </span>
          </div>
          <span className="text-[9px] opacity-60 tracking-widest">SHANMUKHA.SYS</span>
        </div>

        {/* Console Log Lines */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center py-1 border-b-[0.5px] border-border/20">
            <span className="opacity-70">AWS_DEPLOY_STATE</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">READY (ap-south-1)</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b-[0.5px] border-border/20">
            <span className="opacity-70">ML_MODEL_TRAIN</span>
            <span className="text-foreground">LOSS: 0.0082 // ACC: 99.14%</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b-[0.5px] border-border/20">
            <span className="opacity-70">VECTORS_INDEXED</span>
            <span className="text-foreground">1,248,512 (FAISS_STORE)</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b-[0.5px] border-border/20">
            <span className="opacity-70">LAST_COMMIT_HASH</span>
            <span className="text-foreground opacity-60">9af8b2c [revamp]</span>
          </div>
        </div>
      </div>

      {/* SVG Loss Curve / Convergence Visualizer */}
      <div className="my-3 flex-1 flex flex-col justify-center">
        <span className="text-[9px] uppercase tracking-widest text-muted-foreground/60 mb-2 block font-semibold">
          Convergence Telemetry Log
        </span>
        <div className="w-full h-24 border-[0.5px] border-border/40 rounded bg-background/40 relative overflow-hidden flex items-end p-1">
          {/* Micro Grid Lines */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-3 pointer-events-none opacity-5">
            <div className="border-r border-b border-foreground" />
            <div className="border-r border-b border-foreground" />
            <div className="border-r border-b border-foreground" />
            <div className="border-r border-b border-foreground" />
            <div className="border-r border-b border-foreground" />
            <div className="border-r border-b border-foreground" />
          </div>
          <svg className="w-full h-full text-primary/80" viewBox="0 0 100 30" preserveAspectRatio="none">
            <path
              d="M0,28 C10,25 20,12 35,10 C50,8 70,3 100,2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle cx="0" cy="28" r="1" fill="currentColor" />
            <circle cx="35" cy="10" r="1" fill="currentColor" />
            <circle cx="100" cy="2" r="1" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Database/Cohere Table Rows */}
      <div className="border-t-[0.5px] border-border/60 pt-3">
        <div className="grid grid-cols-3 text-[9px] uppercase tracking-widest text-muted-foreground/60 mb-1 font-semibold">
          <span>service</span>
          <span className="text-center">port</span>
          <span className="text-right">status</span>
        </div>
        <div className="space-y-1 text-foreground text-[10px]">
          <div className="grid grid-cols-3">
            <span className="opacity-80">FastAPI_Server</span>
            <span className="text-center opacity-50">8000</span>
            <span className="text-right text-emerald-600 dark:text-emerald-400 font-semibold">ONLINE</span>
          </div>
          <div className="grid grid-cols-3">
            <span className="opacity-80">React_Vite</span>
            <span className="text-center opacity-50">5173</span>
            <span className="text-right text-emerald-600 dark:text-emerald-400 font-semibold">ONLINE</span>
          </div>
          <div className="grid grid-cols-3">
            <span className="opacity-80">Docker_Env</span>
            <span className="text-center opacity-50">2375</span>
            <span className="text-right text-emerald-600 dark:text-emerald-400 font-semibold">RUNNING</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-32 pb-14">
      {/* Remove glowing gradient colors. Retain very high restraint clean backgrounds */}
      <div className="absolute inset-0 -z-10 bg-background" />

      <div className="container mx-auto px-4 relative z-10 w-full">
        <div className="grid min-h-[calc(100vh-10rem)] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-4xl space-y-6 text-center lg:text-left flex flex-col justify-center">
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex self-center lg:self-start items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-600 dark:text-emerald-400 font-semibold">
                Available for roles • SDE | AI | Cloud
              </span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif-display text-5xl font-normal tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem] lg:leading-[0.98] select-none"
              >
                Vutikuri <br />
                <span className="text-primary">Shanmukha</span>
              </motion.h1>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg lg:mx-0 font-normal"
            >
              I build production-minded AI, cloud, and data products with clean interfaces, scalable backends, and measurable user value.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-3 border-[0.5px] border-border bg-card/40 divide-x divide-border/60 shadow-none rounded-lg overflow-hidden sm:max-w-xl lg:max-w-2xl mx-auto lg:mx-0 select-none"
            >
              {[
                ['10+', 'Products Built'],
                ['6', 'Live Demos'],
                ['IEEE', 'Published'],
              ].map(([value, label]) => (
                <div key={label} className="px-5 py-3 text-center">
                  <div className="text-xl font-serif-display text-foreground md:text-2xl font-normal">{value}</div>
                  <div className="mt-1 text-[9px] font-mono tracking-widest uppercase text-muted-foreground font-medium">{label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex w-full flex-col items-center gap-4 pt-2 sm:w-auto sm:flex-row lg:items-start justify-center lg:justify-start"
            >
              <div className="w-full sm:w-auto">
                <Button
                  size="lg"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="h-11 w-full rounded-full bg-foreground px-6 text-xs font-mono tracking-wider uppercase text-background hover:bg-foreground/90 sm:w-auto"
                >
                  View Product Work
                  <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
              <div className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="h-11 w-full rounded-full bg-background border-[0.5px] border-border/80 px-6 text-xs font-mono tracking-wider uppercase sm:w-auto hover:bg-muted"
                >
                  Contact Me
                </Button>
              </div>
              
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                {[
                  ['https://github.com/vutikurishanmukha9', Github, 'GitHub'],
                  ['https://linkedin.com/in/shanmukha-vutikuri', Linkedin, 'LinkedIn'],
                  ['mailto:vutikurishanmukh17@gmail.com', Mail, 'Email']
                ].map(([url, Icon, label]) => (
                  <a 
                    key={url as string}
                    href={url as string} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-2.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground border-[0.5px] border-transparent hover:border-border/60 transition-all duration-200"
                  >
                    <Icon className="h-4.5 w-4.5" />
                    <span className="sr-only">{label as string}</span>
                  </a>
                ))}
              </div>
            </motion.div>

          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md lg:max-w-lg mx-auto"
          >
            <TelemetryDashboard />
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.6, duration: 0.6 }}
           className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer z-20 text-muted-foreground hover:text-foreground transition-colors"
           onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-[9px] font-mono tracking-[0.25em] uppercase">Scroll to explore</span>
          <ChevronDown className="animate-bounce w-4 h-4 text-primary/80 mt-0.5" />
        </motion.div>
      </div>
    </section>
  );
};

