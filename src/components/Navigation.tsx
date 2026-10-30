import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { ResumeModal } from "@/components/ResumeModal";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Architecture & Stack", href: "#skills" },
  { label: "Journey", href: "#career" },
  { label: "Credentials", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export const Navigation = () => {
  const [activeHash, setActiveHash] = useState("#home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const { scrollTo } = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const viewportCenter = window.innerHeight * 0.35;
      let found = false;
      const sections = navItems.map((item) => item.href.substring(1));
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
      if (!found && window.scrollY < 120) {
        setActiveHash("#home");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      scrollTo(element, -80);
    } else {
      window.location.href = `/${href}`;
    }
    setActiveHash(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex justify-center px-4 pointer-events-none z-50 py-3"
      >
        <div
          className={cn(
            "pointer-events-auto flex items-center gap-1 sm:gap-2 px-3 py-1.5 rounded-full border border-border bg-background/85 backdrop-blur-md transition-all duration-300",
            isScrolled ? "shadow-md bg-background/95" : "shadow-sm"
          )}
        >
          {/* Brand Monogram */}
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setActiveHash("#home");
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 text-sm font-semibold tracking-tight text-foreground hover:opacity-80 transition-opacity"
            aria-label="Scroll to top"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Shanmukh</span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 px-1">
            {navItems.map((item) => {
              const isActive = activeHash === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className={cn(
                    "relative px-3 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap shrink-0",
                    isActive
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-indicator"
                      className="absolute inset-0 bg-muted rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-4 bg-border mx-1 shrink-0" />

          {/* Action CTAs & Controls */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsResumeOpen(true)}
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-foreground text-background hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3 shrink-0" />
            </button>

            <ThemeToggle />

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                type="button"
                className="w-8 h-8 text-foreground rounded-full hover:bg-muted flex items-center justify-center transition-colors cursor-pointer"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* Full-Screen Luxury Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-background/98 backdrop-blur-2xl md:hidden flex flex-col justify-between p-6 overflow-y-auto"
          >
            {/* Overlay Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-border/60">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-semibold tracking-tight text-foreground">Shanmukh Vutikuri</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full border border-border bg-card flex items-center justify-center text-foreground hover:bg-muted transition-colors cursor-pointer shadow-xs"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Links - Staggered & Touch-First */}
            <div className="py-6 flex flex-col gap-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground px-3 mb-2">
                Navigation
              </span>
              {navItems.map((item, idx) => {
                const isActive = activeHash === item.href;
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 + 0.05 }}
                    className={cn(
                      "px-4 py-3 rounded-xl text-lg font-semibold tracking-tight flex items-center justify-between transition-colors",
                      isActive
                        ? "bg-foreground text-background"
                        : "text-foreground hover:bg-muted/70"
                    )}
                  >
                    <span>{item.label}</span>
                    <span className={cn("text-xs font-mono", isActive ? "text-background/70" : "text-muted-foreground")}>
                      0{idx + 1}
                    </span>
                  </motion.a>
                );
              })}
            </div>

            {/* Bottom Actions & Status */}
            <div className="pt-6 border-t border-border/60 space-y-4">
              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsResumeOpen(true);
                  }}
                  className="group/btn w-full h-12 inline-flex items-center justify-between px-5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-95 transition-all shadow-xs cursor-pointer"
                >
                  <span>Curriculum Vitae (PDF)</span>
                  <span className="w-7 h-7 rounded-full bg-background/20 flex items-center justify-center transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </button>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <a
                    href="mailto:vutikurishanmukh17@gmail.com"
                    className="p-3 rounded-xl border border-border bg-card/60 hover:bg-muted text-foreground text-center transition-colors truncate"
                  >
                    Send Email ↗
                  </a>
                  <a
                    href="https://linkedin.com/in/shanmukha-vutikuri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl border border-border bg-card/60 hover:bg-muted text-foreground text-center transition-colors truncate"
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground pt-1">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Available for Hire
                </span>
                <span>Hyderabad, India</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};