import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Home, 
  User, 
  Cpu, 
  Briefcase, 
  FolderGit2, 
  BarChart3, 
  Award, 
  Mail 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SoundToggle } from "@/components/SoundToggle";
import { useSound } from "@/hooks/useSound";
import { ResumeModal } from "@/components/ResumeModal";
import { BorderBeam } from "@/components/ui/BorderBeam";

const navItems = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Skills", href: "#skills", icon: Cpu },
  { label: "Career", href: "#career", icon: Briefcase },
  { label: "Work", href: "#projects", icon: FolderGit2 },
  { label: "Case Studies", href: "#case-studies", icon: BarChart3 },
  { label: "Certifications", href: "#certifications", icon: Award },
  { label: "Contact", href: "#contact", icon: Mail },
];

export const Navigation = () => {
  const [activeHash, setActiveHash] = useState("#home");
  const [hoveredHash, setHoveredHash] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const { playClick } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
      const sections = navItems.map(item => item.href.substring(1));

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 300) {
            setActiveHash(`#${sectionId}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playClick(850, 0.03, 'sine');
    const element = document.querySelector(href);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setActiveHash(href);
      setIsMobileMenuOpen(false);
    }
  };

  const currentHighlighted = hoveredHash || activeHash;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex justify-center px-4 pointer-events-none z-50 py-3"
      >
        <div
          onMouseLeave={() => setHoveredHash(null)}
          className={cn(
            "group pointer-events-auto flex items-center p-1.5 bg-card/85 border-[0.5px] border-border/80 backdrop-blur-xl rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300 relative",
            isScrolled ? "scale-98 shadow-[0_12px_40px_rgba(0,0,0,0.1)]" : "scale-100"
          )}
        >
          {/* Animated Moving Gradient Border on hover / interaction */}
          <BorderBeam variant="gradient" duration={4} borderRadius={9999} />

          {/* Brand - Mobile only */}
          <a
            href="#home"
            onClick={(e) => handleScrollTo(e, '#home')}
            className="px-3.5 py-1 font-serif-display text-lg tracking-tight text-foreground hover:text-primary transition-colors md:hidden relative z-10"
          >
            VS<span className="text-primary">.</span>
          </a>

          {/* Mobile Toggle */}
          <div className="md:hidden pr-1 relative z-10">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-muted text-foreground h-8 w-8"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </Button>
          </div>

          {/* Desktop Animated Floating Dock Navigation */}
          <nav className="hidden md:flex items-center gap-1 relative z-10 p-0.5">
            {navItems.map((item) => {
              const isActive = activeHash === item.href;
              const isHovered = hoveredHash === item.href;
              const isHighlighted = currentHighlighted === item.href;
              const Icon = item.icon;

              return (
                <div key={item.href} className="relative flex items-center justify-center">
                  {/* Floating Micro-Tooltip Reveal above item on hover */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.88 }}
                        animate={{ opacity: 1, y: -36, scale: 1 }}
                        exit={{ opacity: 0, y: 2, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 420, damping: 24 }}
                        className="absolute left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-foreground text-background text-[9px] font-mono uppercase tracking-wider shadow-lg pointer-events-none whitespace-nowrap z-30 flex flex-col items-center"
                      >
                        <span>{item.label}</span>
                        {/* Tooltip downward caret arrow */}
                        <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-foreground absolute top-full left-1/2 -translate-x-1/2" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <a
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    onMouseEnter={() => setHoveredHash(item.href)}
                    className={cn(
                      "relative flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase transition-colors duration-200 rounded-full select-none",
                      isActive
                        ? "text-primary-foreground dark:text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {/* Sliding Active Pill Capsule Indicator */}
                    {isHighlighted && (
                      <motion.div
                        layoutId="navbar-dock-pill"
                        className={cn(
                          "absolute inset-0 rounded-full shadow-sm",
                          isActive
                            ? "bg-foreground dark:bg-primary/20 dark:border-[0.5px] dark:border-primary/40"
                            : "bg-muted/70 border-[0.5px] border-border/60"
                        )}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 28,
                          mass: 0.8,
                        }}
                      />
                    )}

                    {/* Icon + Label with Spring Scale */}
                    <motion.div
                      whileHover={{ scale: 1.08, y: -0.5 }}
                      whileTap={{ scale: 0.94 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="relative z-10 flex items-center gap-1.5"
                    >
                      <Icon className={cn("h-3.5 w-3.5 transition-colors", isActive ? "text-primary-foreground dark:text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                      <span className="hidden lg:inline text-[11px]">{item.label}</span>
                    </motion.div>
                  </a>
                </div>
              );
            })}
          </nav>

          {/* Vertical Divider */}
          <div className="hidden md:block w-[0.5px] h-4 bg-border/80 mx-1.5 relative z-10" />

          {/* Theme & Sound Controls + Resume Button */}
          <div className="hidden md:flex items-center gap-1.5 relative z-10 pr-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                playClick(800, 0.04, 'sine');
                setIsResumeOpen(true);
              }}
              className="h-7 text-[10px] font-mono uppercase tracking-wider px-2.5 rounded-full border-primary/30 text-primary hover:bg-primary/10 transition-all active:scale-95"
            >
              CV
            </Button>
            <ThemeToggle />
            <SoundToggle />
          </div>

        </div>
      </motion.header>

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-40 bg-background/80 md:hidden flex flex-col items-center justify-center p-4 supports-[backdrop-filter]:bg-background/60"
          >
            <motion.nav
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center gap-5 w-full max-w-sm"
            >
              {navItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ delay: 0.05 + (i * 0.02), type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.2 }}
                    className={cn(
                      "text-xl font-serif-display font-medium tracking-tight w-full text-center py-2.5 border-b-[0.5px] border-border/40 transition-colors flex items-center justify-center gap-2",
                      activeHash === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </motion.a>
                );
              })}

              <div className="mt-6 flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    playClick(800, 0.04, 'sine');
                    setIsMobileMenuOpen(false);
                    setIsResumeOpen(true);
                  }}
                  className="h-8 text-xs font-mono uppercase tracking-wider px-4 rounded-full border-primary/30 text-primary hover:bg-primary/10"
                >
                  View CV / Resume
                </Button>
                <ThemeToggle />
                <SoundToggle />
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
