import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  Mail,
  Palette
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SoundToggle } from "@/components/SoundToggle";
import { useSound } from "@/hooks/useSound";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { ResumeModal } from "@/components/ResumeModal";
import { BorderBeam } from "@/components/ui/BorderBeam";

const navItems = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Skills", href: "#skills", icon: Cpu },
  { label: "Career", href: "#career", icon: Briefcase },
  { label: "Work", href: "#projects", icon: FolderGit2 },
  { label: "Case Studies", href: "#case-studies", icon: BarChart3 },
  { label: "Certs", href: "#certifications", icon: Award },
  { label: "Contact", href: "#contact", icon: Mail },
];

export const Navigation = () => {
  const [activeHash, setActiveHash] = useState("#home");
  const [hoveredHash, setHoveredHash] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const { playClick } = useSound();
  const { scrollTo } = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
      const viewportCenter = window.innerHeight * 0.4;
      let found = false;
      const sections = navItems.map(item => item.href.substring(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= viewportCenter && rect.bottom > viewportCenter) {
            setActiveHash(`#${sections[i]}`);
            found = true;
            break;
          }
        }
      }
      if (!found && window.scrollY < 100) {
        setActiveHash("#home");
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playClick(850, 0.03, "sine");
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      scrollTo(element, -90);
    } else {
      window.location.href = `/${href}`;
    }
    setActiveHash(href);
    setIsMobileMenuOpen(false);
  };

  const currentHighlighted = hoveredHash || activeHash;

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex justify-center px-4 pointer-events-none z-50 py-3"
      >
        <div
          onMouseLeave={() => setHoveredHash(null)}
          className={cn(
            "group pointer-events-auto flex items-center p-1.5 bg-card border-2 border-black rounded-none shadow-[4px_4px_0px_#000] transition-all duration-300 relative",
            isScrolled ? "scale-98 shadow-[6px_6px_0px_#000]" : "scale-100"
          )}
        >
          {/* Brand - Mobile only */}
          <button
            type="button"
            onClick={() => {
              playClick(850, 0.03, "sine");
              window.scrollTo({ top: 0, behavior: "smooth" });
              setActiveHash("#home");
            }}
            className="px-3 py-1 font-head text-base tracking-tight text-foreground hover:text-primary transition-colors md:hidden relative z-30 cursor-pointer"
            aria-label="Scroll to top"
          >
            VS<span className="text-primary">.</span>
          </button>

          {/* Design Portfolio Mode Switcher (Mobile) */}
          <div className="md:hidden flex items-center relative z-30 mr-1.5">
            <Link
              to="/design"
              onClick={() => playClick(800, 0.03, "sine")}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-black text-white hover:bg-primary hover:text-black border-2 border-black text-[10px] font-head font-bold uppercase tracking-wide transition-all shadow-xs"
              aria-label="Switch to Product Designer Portfolio"
            >
              <Palette className="w-3 h-3" />
              <span>Design</span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden pr-1 relative z-30">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-none border-2 border-black bg-card hover:bg-primary text-foreground h-8 w-8 shadow-xs"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </Button>
          </div>

          {/* Desktop Nav: icon + label */}
          <nav className="hidden md:flex items-center gap-0.5 relative z-30 p-0.5">
            {navItems.map((item) => {
              const isActive = activeHash === item.href;
              const isHovered = hoveredHash === item.href;
              const isHighlighted = currentHighlighted === item.href;
              const Icon = item.icon;
              return (
                <div
                  key={item.href}
                  className="relative flex items-center justify-center shrink-0"
                  onMouseEnter={() => {
                    setHoveredHash(item.href);
                    playClick(950, 0.015, "sine");
                  }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className="relative flex items-center gap-1.5 px-2.5 py-1.5 select-none"
                    aria-label={item.label}
                  >
                    {isHighlighted && (
                      <motion.div
                        layoutId="navbar-dock-pill"
                        className={cn(
                          "absolute inset-0 rounded-none border-2 border-black",
                          isActive
                            ? "bg-primary shadow-[2px_2px_0px_#000]"
                            : "bg-muted border-black/40"
                        )}
                        transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.75 }}
                      />
                    )}
                    <motion.div
                      animate={{ scale: isHovered ? 1.1 : 1, y: isHovered ? -1 : 0 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 420, damping: 22 }}
                      className="relative z-10 flex items-center justify-center"
                    >
                      <Icon
                        className={cn(
                          "h-3.5 w-3.5 transition-colors duration-150 shrink-0",
                          isActive && isHighlighted
                            ? "text-black stroke-[2.5]"
                            : isHovered
                              ? "text-black stroke-[2.2]"
                              : "text-muted-foreground stroke-[2]"
                        )}
                      />
                    </motion.div>
                    <span
                      className={cn(
                        "relative z-10 text-[10px] font-head font-bold uppercase tracking-wider transition-colors duration-150 whitespace-nowrap",
                        isActive && isHighlighted
                          ? "text-black"
                          : isHovered
                            ? "text-black"
                            : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </span>
                  </a>
                </div>
              );
            })}
          </nav>

          {/* Vertical Divider */}
          <div className="hidden md:block w-[2px] h-5 bg-black mx-1.5 relative z-10" />

          {/* Design Mode Switcher */}
          <div className="hidden md:flex items-center relative z-10">
            <Link
              to="/design"
              onClick={() => playClick(800, 0.03, "sine")}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-black text-white hover:bg-primary hover:text-black border-2 border-black text-[11px] font-head font-bold uppercase tracking-wide transition-all duration-150 shadow-xs active:translate-x-0.5 active:translate-y-0.5"
              aria-label="Switch to Product Designer Portfolio"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Design Mode</span>
            </Link>
          </div>

          {/* Controls + CV */}
          <div className="hidden md:flex items-center gap-1.5 relative z-10 pr-1 pl-1.5">
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                playClick(800, 0.04, "sine");
                setIsResumeOpen(true);
              }}
              className="h-8 text-[11px] font-head font-bold uppercase tracking-wider px-3 border-2 border-black bg-primary text-black hover:bg-primary-hover shadow-xs"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-between p-6 pt-safe pb-safe supports-[backdrop-filter]:bg-background/90"
          >
            <div className="w-full max-w-sm flex items-center justify-between pt-2 pb-4 border-b-2 border-black">
              <span className="font-head text-lg font-bold uppercase tracking-tight text-foreground">
                VS<span className="text-primary">.</span> Navigation
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-none border-2 border-black hover:bg-muted text-foreground h-9 w-9 shadow-xs"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </Button>
            </div>

            <motion.nav
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-3 w-full max-w-sm my-auto overflow-y-auto py-2 touch-scroll"
            >
              <Link
                to="/design"
                onClick={() => {
                  playClick(800, 0.03, "sine");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 rounded-none bg-primary text-black border-2 border-black font-head text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 hover:bg-primary-hover transition-all shadow-xs mb-1 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              >
                <Palette className="w-4 h-4" />
                <span>Switch to Product Designer Mode →</span>
              </Link>

              {navItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ delay: 0.03 + i * 0.02, type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.2 }}
                    className={cn(
                      "text-base sm:text-lg font-head font-bold uppercase tracking-wider w-full text-center py-2 border-b-2 border-black/10 transition-colors flex items-center justify-center gap-2.5 active:text-primary",
                      activeHash === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4 opacity-70" />
                    <span>{item.label}</span>
                  </motion.a>
                );
              })}
            </motion.nav>

            <div className="w-full max-w-sm pt-4 pb-2 border-t-2 border-black flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  playClick(800, 0.04, "sine");
                  setIsMobileMenuOpen(false);
                  setIsResumeOpen(true);
                }}
                className="h-9 text-xs font-head font-bold uppercase tracking-wider px-4 rounded-none border-2 border-black bg-card text-black hover:bg-primary shadow-xs active:translate-x-0.5 active:translate-y-0.5"
              >
                View CV / Resume
              </Button>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <SoundToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};