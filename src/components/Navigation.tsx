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
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsResumeOpen(true)}
              className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-foreground text-background hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3 shrink-0" />
            </button>

            <ThemeToggle />

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                type="button"
                className="p-1.5 text-foreground rounded-full hover:bg-muted transition-colors"
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

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 p-4 rounded-2xl border border-border bg-background/95 backdrop-blur-xl shadow-lg md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className="px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2 mt-2 border-t border-border flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsResumeOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  <span>View Full Resume</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <Link
                  to="/design"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Design Portfolio →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};