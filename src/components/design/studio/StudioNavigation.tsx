import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Terminal, Menu, X, Layers } from 'lucide-react';

interface NavLinkItem {
  id: string;
  label: string;
  targetId: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { id: 'work', label: 'WORK', targetId: 'studio-work' },
  { id: 'lab', label: 'LAB // 001', targetId: 'studio-lab' },
  { id: 'design-code', label: 'DESIGN × CODE', targetId: 'studio-design-code' },
  { id: 'stash', label: '160+ STASH', targetId: 'design-stash' },
  { id: 'system', label: 'SYSTEM // LIVE', targetId: 'studio-system' },
  { id: 'desk', label: 'THE DESK', targetId: 'studio-desk' },
  { id: 'about', label: 'ABOUT', targetId: 'studio-about' },
];

export const StudioNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('work');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const scrollPos = window.scrollY + 200;
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const item = NAV_LINKS[i];
        const el = document.getElementById(item.targetId);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (targetId: string, id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none flex justify-center">
        <nav
          aria-label="Studio Navigation"
          className={`pointer-events-auto w-full max-w-6xl transition-all duration-300 ${
            isScrolled ? 'translate-y-0 scale-[0.99]' : 'translate-y-0'
          }`}
        >
          <div className="bg-[#E3E6E8]/95 backdrop-blur-md border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4">
            
            {/* Brand Section */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="#studio-hero"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group flex items-center gap-1.5 sm:gap-2 text-left"
              >
                <span className="font-['Space_Grotesk'] font-bold text-xs sm:text-sm tracking-tight text-[#0A0A0A] group-hover:text-[#FFD84D] transition-colors">
                  SHANMUKH
                </span>
                <span className="inline-block px-1.5 py-0.5 text-[8px] sm:text-[9px] font-mono font-bold bg-[#0A0A0A] text-[#E3E6E8] uppercase tracking-wider">
                  STUDIO
                </span>
              </a>

              <div className="hidden md:flex items-center gap-1.5 pl-2 border-l border-[#0A0A0A]/20">
                <span className="w-2 h-2 rounded-full bg-[#63D6A0] animate-pulse" />
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#0A0A0A]/70 font-semibold">
                  DESIGNING
                </span>
              </div>
            </div>

            {/* Desktop Editorial Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => scrollToSection(link.targetId, link.id)}
                    className={`relative px-3 py-1 text-xs font-mono font-semibold tracking-wider uppercase transition-all ${
                      isActive
                        ? 'text-[#0A0A0A] bg-[#FFD84D] border border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]'
                        : 'text-[#0A0A0A]/80 hover:text-[#0A0A0A] hover:bg-[#EAE3D2] border border-transparent'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            {/* Right Controls: Developer Portfolio Switcher & Mobile Menu Trigger */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link
                to="/"
                className="group inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-mono font-bold tracking-wider text-[#0A0A0A] bg-[#FFFFFF] hover:bg-[#FFD84D] border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                title="Switch to Developer Portfolio"
              >
                <Terminal className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#0A0A0A]" />
                <span className="hidden sm:inline">DEV SYSTEM</span>
                <span className="sm:hidden">DEV</span>
                <ArrowUpRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#0A0A0A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              {/* Mobile Menu Hamburger Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                className="lg:hidden p-1.5 border-2 border-[#0A0A0A] bg-[#FFFFFF] text-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu & Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop click dismiss */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-[#0A0A0A]/40 backdrop-blur-xs lg:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-3 sm:inset-x-4 top-16 sm:top-20 z-50 max-h-[calc(100dvh-5.5rem)] overflow-y-auto lg:hidden bg-[#E3E6E8] border-3 border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] p-4 sm:p-5"
            >
              <div className="flex items-center justify-between pb-3 border-b-2 border-[#0A0A0A] mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0A0A0A]">
                  STUDIO DIRECTORY
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-[#FFD84D] border border-[#0A0A0A] font-bold">
                  INDEX 2026
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <button
                      key={link.id}
                      type="button"
                      onClick={() => scrollToSection(link.targetId, link.id)}
                      className={`w-full text-left px-3 py-2.5 text-xs font-mono font-bold tracking-wider uppercase border-2 transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-[#FFD84D] text-[#0A0A0A] border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A]'
                          : 'bg-[#FFFFFF] text-[#0A0A0A] border-[#0A0A0A]/40 hover:border-[#0A0A0A]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <span className="text-[10px] opacity-60">→</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t-2 border-[#0A0A0A] flex items-center justify-between">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 bg-[#0A0A0A] text-[#E3E6E8] font-mono font-bold text-xs uppercase tracking-widest hover:bg-[#FFD84D] hover:text-[#0A0A0A] border-2 border-[#0A0A0A] transition-colors"
                >
                  SWITCH TO DEVELOPER PORTFOLIO [SYSTEM]
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
