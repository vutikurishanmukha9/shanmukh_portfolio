import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Career", href: "#career" },
  { label: "Work", href: "#projects" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export const Navigation = () => {
  const [activeHash, setActiveHash] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    const element = document.querySelector(href);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setActiveHash(href);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex justify-center px-4 pointer-events-none z-50 py-2"
      >
        <div
          className={cn(
            "pointer-events-auto flex items-center p-1 bg-card/95 border-[0.5px] border-border/80 backdrop-blur-md rounded-full shadow-none transition-all duration-300 relative",
            isScrolled ? "scale-98" : "scale-100"
          )}
        >
          {/* Brand - Mobile only */}
          <a
            href="#home"
            onClick={(e) => handleScrollTo(e, '#home')}
            className="px-4 py-1.5 font-serif-display text-lg tracking-tight text-foreground hover:text-primary transition-colors md:hidden relative z-10"
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

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center relative z-10 p-0.5">
            {navItems.map((item) => {
              const isActive = activeHash === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className={cn(
                    "relative px-4 py-1.5 text-xs font-mono tracking-wider uppercase transition-colors duration-200",
                    isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-primary/10 border-[0.5px] border-primary/20"
                      transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.2 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Vertical Divider */}
          <div className="hidden md:block w-[0.5px] h-4 bg-border/80 mx-2 relative z-10" />

          {/* Theme Toggle - Integrated */}
          <div className="hidden md:block relative z-10 pr-1">
            <ThemeToggle />
          </div>

        </div>
      </motion.header>

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
              className="flex flex-col items-center gap-6 w-full max-w-sm"
            >
              {navItems.map((item, i) => (
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
                    "text-2xl font-serif-display font-medium tracking-tight w-full text-center py-2 border-b-[0.5px] border-border/40 transition-colors",
                    activeHash === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </motion.a>
              ))}

              <div className="mt-8">
                <ThemeToggle />
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
