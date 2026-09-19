import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ArrowUpRight, 
  Code2, 
  Menu, 
  X, 
  Workflow, 
  Briefcase, 
  Sliders, 
  Compass, 
  Cpu, 
  Layers
} from 'lucide-react';
import { SoundToggle } from '@/components/SoundToggle';
import { useSound } from '@/hooks/useSound';

interface NavItem {
  key: string;
  label: string;
  target: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const DesignNavigation: React.FC = () => {
  const { playClick } = useSound();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('');
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const navItems: NavItem[] = [
    { key: 'process', label: 'Process', target: 'process-timeline', icon: Workflow },
    { key: 'work', label: 'Projects', target: 'works', icon: Briefcase },
    { key: 'labs', label: 'Tokens & Lab', target: 'craft-lab', icon: Sliders },
    { key: 'philosophy', label: 'Principles', target: 'philosophy', icon: Compass },
    { key: 'tools', label: 'Tooling', target: 'tools', icon: Cpu },
    { key: 'stash', label: 'Design System', target: 'design-stash', badge: '125', icon: Layers },
  ];

  // Precision ScrollSpy to keep navbar flawlessly in sync with the viewport
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 25);

    // If near the top, reset active state to hero
    if (window.scrollY < 200) {
      setActiveNav('');
      return;
    }

    const viewportCenter = window.innerHeight * 0.35;
    let currentActive = '';

    // Check sections from bottom to top so lower sections receive precedence
    for (let i = navItems.length - 1; i >= 0; i--) {
      const item = navItems[i];
      const el = document.getElementById(item.target);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportCenter && rect.bottom > 0) {
          currentActive = item.key;
          break;
        }
      }
    }

    if (currentActive) {
      setActiveNav(currentActive);
    }
  }, [navItems]);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = (id: string, navKey: string) => {
    playClick(750, 0.02, 'sine');
    setActiveNav(navKey);
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const top = el.offsetTop - 84;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  };

  const handleBrandClick = (e: React.MouseEvent) => {
    if (window.location.pathname === '/design') {
      e.preventDefault();
      playClick(600, 0.03, 'sine');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveNav('');
    }
  };

  const handleOpenCommandPalette = () => {
    playClick(850, 0.02, 'sine');
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-center pt-3 sm:pt-5 px-3 sm:px-6 pointer-events-none select-none">
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto w-full max-w-[1240px] flex items-center justify-between px-3 sm:px-4 py-2 rounded-full transition-all duration-300 ${
            isScrolled
              ? 'bg-[#090a0f]/90 backdrop-blur-2xl border border-white/[0.12] shadow-[0_16px_48px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.1)]'
              : 'bg-[#090a0f]/75 backdrop-blur-xl border border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.06)]'
          }`}
        >
          {/* ========================================================================= */}
          {/* LEFT BAY: REFINED BRAND SIGNATURE & DUAL MODE SWITCHER */}
          {/* ========================================================================= */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/design"
              onClick={handleBrandClick}
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              {/* Monogram Squircle Badge */}
              <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-white/12 to-white/[0.03] border border-white/15 flex items-center justify-center text-xs font-bold text-white tracking-tight shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] group-hover:border-white/30 group-hover:from-white/20 transition-all">
                SV
              </div>

              {/* Typographic Identity Stack */}
              <div className="flex flex-col leading-none">
                <span className="font-sans text-[13px] font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                  Shanmukh.V
                </span>
                <span className="text-[10px] text-white/45 font-medium tracking-tight mt-0.5">
                  Product Designer
                </span>
              </div>
            </Link>

            {/* Subtle Vertical Hairline Separator */}
            <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />

            {/* Quick Engineering Core Switcher */}
            <Link
              to="/"
              onClick={() => playClick(600, 0.03, 'sine')}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] hover:bg-white/[0.08] text-[11px] font-medium text-white/65 hover:text-white border border-white/[0.08] transition-all cursor-pointer shadow-sm active:scale-95"
              title="Switch to Engineering Core Portfolio"
            >
              <Code2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Dev Mode</span>
            </Link>
          </div>

          {/* ========================================================================= */}
          {/* CENTER BAY: FLUID LUXURY NAVIGATION PILL MATRIX */}
          {/* ========================================================================= */}
          <div 
            onMouseLeave={() => setHoveredNav(null)}
            className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-white/[0.02] border border-white/[0.05] shrink-0"
          >
            {navItems.map((item) => {
              const isActive = activeNav === item.key;
              const isHovered = hoveredNav === item.key;

              return (
                <button
                  key={item.key}
                  type="button"
                  onMouseEnter={() => setHoveredNav(item.key)}
                  onClick={() => scrollToSection(item.target, item.key)}
                  className={`relative px-3 py-1.5 rounded-full text-[12.5px] font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {/* Sliding Spotlight Pill (Active or Hovered) */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.09] border border-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}

                  {!isActive && isHovered && (
                    <motion.div
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.04]"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}

                  <span className="relative z-10">{item.label}</span>

                  {/* Micro Count Badge (for Design System / Stash) */}
                  {item.badge && (
                    <span className="relative z-10 px-1.5 py-0.2 rounded-full text-[10px] font-mono font-medium tracking-tight bg-emerald-400/10 text-emerald-300 border border-emerald-400/20">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* RIGHT BAY: SEARCH, SOUND & ELEVATED CTA */}
          {/* ========================================================================= */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Global Spotlight Search Trigger (Cmd + K) */}
            <button
              type="button"
              onClick={handleOpenCommandPalette}
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] text-[11px] font-medium text-white/50 hover:text-white border border-white/[0.08] transition-all cursor-pointer active:scale-95"
              title="Open Command Spotlight (Cmd + K)"
            >
              <Search className="w-3.5 h-3.5 text-white/40" />
              <kbd className="text-[10px] font-mono px-1 py-0.2 rounded bg-white/[0.06] border border-white/10 text-white/50 leading-none">
                ⌘K
              </kbd>
            </button>

            {/* Sound Toggle */}
            <div className="p-0.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
              <SoundToggle />
            </div>

            {/* Primary Elevated Action: Let's Talk */}
            <a
              href="mailto:vutikurishanmukh17@gmail.com"
              onClick={() => playClick(850, 0.03, 'sine')}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 rounded-full bg-white text-black hover:bg-neutral-100 text-[11px] sm:text-[12px] font-semibold tracking-tight transition-all shadow-[0_2px_14px_rgba(255,255,255,0.18),inset_0_1px_0_rgba(255,255,255,0.8)] active:scale-[0.97] group cursor-pointer"
            >
              <span className="hidden xs:inline">Let's Talk</span>
              <span className="xs:hidden">Talk</span>
              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <ArrowUpRight className="w-2.5 h-2.5 text-black stroke-[3]" />
              </span>
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => {
                playClick(600, 0.03, 'sine');
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="p-1.5 sm:p-2 rounded-full bg-white/[0.04] border border-white/15 text-white lg:hidden cursor-pointer hover:bg-white/10 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* ========================================================================= */}
      {/* MOBILE LUXURY OVERLAY DRAWER */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Dismiss Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md z-40 lg:hidden pointer-events-auto"
            />

            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-3 sm:inset-x-6 top-16 sm:top-20 z-50 max-h-[calc(100dvh-5rem)] overflow-y-auto p-4 sm:p-5 rounded-3xl bg-[#090a0f]/95 border border-white/15 backdrop-blur-3xl shadow-[0_24px_64px_rgba(0,0,0,0.95)] lg:hidden space-y-4 custom-scrollbar pb-safe"
            >
            {/* Top Sheet Telemetry */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs text-white/50 font-medium">
              <span className="flex items-center gap-1.5 text-white/70">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Navigation & Sections</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Available Q3 2026
              </span>
            </div>

            {/* Dual Mode Switcher Button */}
            <Link
              to="/"
              onClick={() => {
                playClick(600, 0.03, 'sine');
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white text-xs font-medium flex items-center justify-between transition-colors shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-amber-400" />
                <span>Switch to Engineering Core</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/40" />
            </Link>

            {/* Navigation Links Grid */}
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive = activeNav === item.key;
                const IconComponent = item.icon;

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => scrollToSection(item.target, item.key)}
                    className={`text-left px-3 py-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white/10 text-white border-white/20 font-semibold shadow-sm'
                        : 'bg-white/[0.02] text-white/70 hover:text-white hover:bg-white/[0.06] border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <IconComponent className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-white/40'}`} />
                      <span className="text-xs">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-medium bg-emerald-400/10 text-emerald-300 border border-emerald-400/20">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions Row */}
            <div className="pt-3 flex items-center justify-between border-t border-white/10 gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleOpenCommandPalette();
                }}
                className="flex-1 py-2 px-3 rounded-full bg-white/[0.04] border border-white/10 text-white/70 text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-white/[0.08]"
              >
                <Search className="w-3.5 h-3.5 text-white/40" />
                <span>Search (⌘K)</span>
              </button>

              <a
                href="mailto:vutikurishanmukh17@gmail.com"
                onClick={() => playClick(850, 0.03, 'sine')}
                className="flex-1 py-2 px-3 rounded-full bg-white text-black text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-black" />
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
};
