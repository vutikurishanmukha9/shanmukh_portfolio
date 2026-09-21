import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Code2, 
  Eye, 
  Layers, 
  Palette, 
  Box, 
  Search,
  Sliders,
  Terminal,
  FileCode,
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useSound } from '@/hooks/useSound';
import { 
  buildStashComponents, 
  StashCategory, 
  StashComponent,
  StashStateContext 
} from './stashComponents';

export const DesignSystemStash: React.FC = () => {
  const { playClick } = useSound();
  const [activeTab, setActiveTab] = useState<'components' | 'tokens' | 'stack'>('components');
  const [selectedCompId, setSelectedCompId] = useState<string>('double-bezel');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [componentSearchQuery, setComponentSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Interactive preview state machine
  const [activeSegment, setActiveSegment] = useState<'design' | 'code' | 'review'>('design');
  const [activeViewport, setActiveViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [splitPos, setSplitPos] = useState<number>(50);
  const [spotlightPos, setSpotlightPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isSpotlightHovered, setIsSpotlightHovered] = useState<boolean>(false);
  const [paletteQuery, setPaletteQuery] = useState<string>('');
  const [switchEnabled, setSwitchEnabled] = useState<boolean>(true);
  const [accordionOpen, setAccordionOpen] = useState<number | null>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>(['React', 'TypeScript', 'Tailwind']);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [islandState, setIslandState] = useState<'idle' | 'call' | 'sync'>('idle');
  const [counterVal, setCounterVal] = useState<number>(1420);
  const [selectedColorToken, setSelectedColorToken] = useState<string>('#5e6ad2');
  const [diffView, setDiffView] = useState<'split' | 'unified'>('split');
  const [gaugeVal, setGaugeVal] = useState<number>(84);
  const [pricingInterval, setPricingInterval] = useState<'monthly' | 'annually'>('annually');
  const [passwordInput, setPasswordInput] = useState<string>('k!9_SystemAlpha');
  const [timerCount, setTimerCount] = useState<number>(10);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  // React Bits & Creative interactive states
  const [cardSwapIndex, setCardSwapIndex] = useState<number>(0);
  const [trueFocusIndex, setTrueFocusIndex] = useState<number>(0);
  const [folderOpen, setFolderOpen] = useState<boolean>(false);
  const [scrambleKey, setScrambleKey] = useState<number>(0);
  const [dockHovered, setDockHovered] = useState<number | null>(null);
  const [magnetPos, setMagnetPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [tiltedRot, setTiltedRot] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [copiedCli, setCopiedCli] = useState<boolean>(false);
  const [stepperStep, setStepperStep] = useState<number>(1);
  const [pillNavTab, setPillNavTab] = useState<string>('overview');
  const [isMarqueePaused, setIsMarqueePaused] = useState<boolean>(false);
  const [gradientSpeed, setGradientSpeed] = useState<number>(3);
  const [floatingDockHovered, setFloatingDockHovered] = useState<number | null>(null);
  const [morphDialogOpen, setMorphDialogOpen] = useState<boolean>(false);
  const [activeAnimatedTab, setActiveAnimatedTab] = useState<string>('Spec');
  const [lensZoom, setLensZoom] = useState<number>(2.5);
  const [stackCardsTop, setStackCardsTop] = useState<number>(0);

  const context: StashStateContext = {
    playClick,
    activeSegment,
    setActiveSegment,
    activeViewport,
    setActiveViewport,
    splitPos,
    setSplitPos,
    spotlightPos,
    setSpotlightPos,
    isSpotlightHovered,
    setIsSpotlightHovered,
    paletteQuery,
    setPaletteQuery,
    switchEnabled,
    setSwitchEnabled,
    accordionOpen,
    setAccordionOpen,
    selectedTags,
    setSelectedTags,
    dropdownOpen,
    setDropdownOpen,
    islandState,
    setIslandState,
    counterVal,
    setCounterVal,
    selectedColorToken,
    setSelectedColorToken,
    diffView,
    setDiffView,
    gaugeVal,
    setGaugeVal,
    pricingInterval,
    setPricingInterval,
    passwordInput,
    setPasswordInput,
    timerCount,
    setTimerCount,
    timerRunning,
    setTimerRunning,
    drawerOpen,
    setDrawerOpen,
    confirmOpen,
    setConfirmOpen,
    cardSwapIndex,
    setCardSwapIndex,
    trueFocusIndex,
    setTrueFocusIndex,
    folderOpen,
    setFolderOpen,
    scrambleKey,
    setScrambleKey,
    dockHovered,
    setDockHovered,
    magnetPos,
    setMagnetPos,
    tiltedRot,
    setTiltedRot,
    stepperStep,
    setStepperStep,
    pillNavTab,
    setPillNavTab,
    isMarqueePaused,
    setIsMarqueePaused,
    gradientSpeed,
    setGradientSpeed,
    floatingDockHovered,
    setFloatingDockHovered,
    morphDialogOpen,
    setMorphDialogOpen,
    activeAnimatedTab,
    setActiveAnimatedTab,
    lensZoom,
    setLensZoom,
    stackCardsTop,
    setStackCardsTop
  };

  const STASH_COMPONENTS: StashComponent[] = buildStashComponents(context);

  const handleCopyCode = (id: string, code: string) => {
    playClick(1000, 0.03, 'sine');
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const switchTab = (tab: 'components' | 'tokens' | 'stack') => {
    playClick(750, 0.02, 'sine');
    setActiveTab(tab);
  };

  // Filter components by category and search query
  const filteredComponents = STASH_COMPONENTS.filter(comp => {
    const matchesCategory = activeCategoryFilter === 'all' || comp.category === activeCategoryFilter;
    const matchesQuery = componentSearchQuery === '' || 
      comp.name.toLowerCase().includes(componentSearchQuery.toLowerCase()) ||
      comp.category.toLowerCase().includes(componentSearchQuery.toLowerCase()) ||
      comp.description.toLowerCase().includes(componentSearchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const currentComp = STASH_COMPONENTS.find((c) => c.id === selectedCompId) || filteredComponents[0] || STASH_COMPONENTS[0];

  return (
    <section id="design-stash" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-6 sm:py-10 select-none scroll-mt-24">
      
      {/* Section Header */}
      <div className="flex flex-wrap items-end justify-between border-b-3 border-[#0A0A0A] pb-4 mb-6 sm:mb-8 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#FFD84D] border border-[#0A0A0A]" />
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#0A0A0A]">
              04 / COMPONENT ARSENAL // {STASH_COMPONENTS.length}+ READY-TO-USE PIECES
            </span>
          </div>
          <h2 className="font-['Space_Grotesk'] text-4xl sm:text-6xl font-black text-[#0A0A0A] uppercase tracking-tight">
            COMPONENT STASH
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <span className="font-mono text-[10px] font-bold text-[#0A0A0A]/60 block uppercase">
              LIVING REPOSITORY
            </span>
            <span className="font-['Space_Grotesk'] font-bold text-sm text-[#0A0A0A] uppercase">
              RARE UI · SHADERS · TOKENS
            </span>
          </div>
          <span className="px-3 py-1 bg-[#FFD84D] border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] font-mono text-xs font-bold uppercase text-[#0A0A0A]">
            {STASH_COMPONENTS.length} ITEMS LIVE
          </span>
        </div>
      </div>

      {/* Main Mode Navigation Tabs (Components | Tokens & Variables | Tech Stack & Tools) */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar pb-1">
        <button
          type="button"
          onClick={() => switchTab('components')}
          className={`px-4 py-2 text-xs font-mono font-bold uppercase border-2 transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'components'
              ? 'bg-[#FFD84D] text-[#0A0A0A] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]'
              : 'bg-[#FFFFFF] text-[#0A0A0A] border-[#0A0A0A]/40 hover:border-[#0A0A0A]'
          }`}
        >
          <Box className="w-3.5 h-3.5" />
          <span>COMPONENTS ({STASH_COMPONENTS.length})</span>
        </button>

        <button
          type="button"
          onClick={() => switchTab('tokens')}
          className={`px-4 py-2 text-xs font-mono font-bold uppercase border-2 transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'tokens'
              ? 'bg-[#FFD84D] text-[#0A0A0A] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]'
              : 'bg-[#FFFFFF] text-[#0A0A0A] border-[#0A0A0A]/40 hover:border-[#0A0A0A]'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>TOKENS &amp; VARIABLES</span>
        </button>

        <button
          type="button"
          onClick={() => switchTab('stack')}
          className={`px-4 py-2 text-xs font-mono font-bold uppercase border-2 transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'stack'
              ? 'bg-[#FFD84D] text-[#0A0A0A] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]'
              : 'bg-[#FFFFFF] text-[#0A0A0A] border-[#0A0A0A]/40 hover:border-[#0A0A0A]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>TECH STACK &amp; TOOLS</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: PRODUCTION REACT COMPONENTS (INSPECT & COPY) */}
      {/* ========================================================================= */}
      {activeTab === 'components' && (
        <div className="space-y-4">
          
          {/* Subcategory Filter Pills & Live Search Bar */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-[#FFFFFF] border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] p-2 sm:p-3">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs font-mono">
              {[
                { key: 'all', label: `ALL (${STASH_COMPONENTS.length})` },
                { key: 'Rare UI & Shaders', label: `RARE UI & SHADERS (${STASH_COMPONENTS.filter(c => c.category === 'Rare UI & Shaders').length})` },
                { key: 'React Bits & Creative', label: `EFFECTS (${STASH_COMPONENTS.filter(c => c.category === 'React Bits & Creative').length})` },
                { key: 'Surfaces & Cards', label: `CARDS (${STASH_COMPONENTS.filter(c => c.category === 'Surfaces & Cards').length})` },
                { key: 'Controls & Navigation', label: `BUTTONS & NAV (${STASH_COMPONENTS.filter(c => c.category === 'Controls & Navigation').length})` },
                { key: 'Haptics & Motion', label: `MOTION (${STASH_COMPONENTS.filter(c => c.category === 'Haptics & Motion').length})` },
                { key: 'Data & Telemetry', label: `DATA & TELEMETRY (${STASH_COMPONENTS.filter(c => c.category === 'Data & Telemetry').length})` },
                { key: 'Feedback & Overlays', label: `OVERLAYS (${STASH_COMPONENTS.filter(c => c.category === 'Feedback & Overlays').length})` },
                { key: 'Developer & System Tools', label: `DEV TOOLS (${STASH_COMPONENTS.filter(c => c.category === 'Developer & System Tools').length})` },
                { key: 'Hooks & Utilities', label: `HOOKS (${STASH_COMPONENTS.filter(c => c.category === 'Hooks & Utilities').length})` },
              ].map(f => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => {
                    playClick(750, 0.02, 'sine');
                    setActiveCategoryFilter(f.key);
                    if (f.key !== 'all') {
                      const firstInCat = STASH_COMPONENTS.find(c => c.category === f.key);
                      if (firstInCat) setSelectedCompId(firstInCat.id);
                    }
                  }}
                  className={`px-2.5 py-1 font-mono text-[11px] font-bold uppercase border-2 transition-all cursor-pointer shrink-0 ${
                    activeCategoryFilter === f.key
                      ? 'bg-[#0A0A0A] text-[#E3E6E8] border-[#0A0A0A] shadow-[1px_1px_0px_#0A0A0A]'
                      : 'bg-[#FFFFFF] text-[#0A0A0A] border-[#0A0A0A]/30 hover:border-[#0A0A0A]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Quick Search inside Stash */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#FFFFFF] border-2 border-[#0A0A0A] text-xs font-mono w-full lg:w-72 shrink-0">
              <Search className="w-3.5 h-3.5 text-[#0A0A0A]/60" />
              <input
                type="text"
                value={componentSearchQuery}
                onChange={(e) => setComponentSearchQuery(e.target.value)}
                placeholder={`SEARCH ${STASH_COMPONENTS.length} COMPONENTS...`}
                className="bg-transparent text-[#0A0A0A] placeholder:text-[#0A0A0A]/40 focus:outline-none w-full text-xs font-mono font-bold uppercase"
              />
              {componentSearchQuery && (
                <button 
                  type="button" 
                  onClick={() => setComponentSearchQuery('')}
                  className="text-[#0A0A0A]/60 hover:text-[#0A0A0A] text-xs font-bold cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Master Stash Grid: List (5 Cols) vs Preview (7 Cols) */}
          <div className="grid md:grid-cols-12 gap-5 items-start">
            
            {/* Left: Component List Selector */}
            <div className="md:col-span-5 space-y-2 max-h-[720px] overflow-y-auto pr-1">
              {filteredComponents.length === 0 ? (
                <div className="p-8 bg-[#FFFFFF] border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] text-center font-mono text-xs text-[#0A0A0A]/60 uppercase font-bold">
                  NO COMPONENTS MATCH "{componentSearchQuery}"
                </div>
              ) : (
                filteredComponents.map((comp) => {
                  const isSelected = currentComp.id === comp.id;
                  const IconComponent = comp.icon;
                  return (
                    <div
                      key={comp.id}
                      onClick={() => {
                        playClick(900, 0.02, 'triangle');
                        setSelectedCompId(comp.id);
                      }}
                      className={`p-3 border-2 border-[#0A0A0A] transition-all duration-150 cursor-pointer text-left flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'bg-[#FFD84D] shadow-[4px_4px_0px_#0A0A0A] translate-x-1'
                          : 'bg-[#FFFFFF] hover:bg-[#F3F4F6] shadow-[2px_2px_0px_#0A0A0A]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 border border-[#0A0A0A] shrink-0 ${isSelected ? 'bg-[#0A0A0A] text-[#FFD84D]' : 'bg-[#E3E6E8] text-[#0A0A0A]'}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[9px] font-mono font-bold uppercase text-[#0A0A0A]/60">
                              [{comp.category}]
                            </span>
                          </div>
                          <span className="font-['Space_Grotesk'] font-bold text-xs uppercase text-[#0A0A0A] block truncate">
                            {comp.name}
                          </span>
                          <p className="text-[11px] font-mono text-[#0A0A0A]/70 line-clamp-1">
                            {comp.description}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 mt-2 shrink-0 ${isSelected ? 'text-[#0A0A0A]' : 'text-[#0A0A0A]/30'}`} />
                    </div>
                  );
                })
              )}
            </div>

            {/* Right: Component Preview & Code Copier */}
            <div className="md:col-span-7">
              <div className="bg-[#FFFFFF] border-3 border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] sm:shadow-[8px_8px_0px_#0A0A0A] p-4 sm:p-6 space-y-4">
                
                {/* Header & Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-2 border-[#0A0A0A]">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#0A0A0A]/60 uppercase block">
                      [{currentComp.category}]
                    </span>
                    <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-black uppercase text-[#0A0A0A] tracking-tight">
                      {currentComp.name}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Preview / Code Toggle */}
                    <div className="flex items-center gap-1 bg-[#E3E6E8] p-1 border-2 border-[#0A0A0A]">
                      <button
                        type="button"
                        onClick={() => {
                          playClick(750, 0.02, 'sine');
                          setViewMode('preview');
                        }}
                        className={`px-2.5 py-1 text-xs font-mono font-bold uppercase border transition-all cursor-pointer flex items-center gap-1.5 ${
                          viewMode === 'preview'
                            ? 'bg-[#FFD84D] text-[#0A0A0A] border-[#0A0A0A] shadow-[1px_1px_0px_#0A0A0A]'
                            : 'bg-transparent text-[#0A0A0A]/70 border-transparent hover:text-[#0A0A0A]'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>PREVIEW</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          playClick(850, 0.02, 'sine');
                          setViewMode('code');
                        }}
                        className={`px-2.5 py-1 text-xs font-mono font-bold uppercase border transition-all cursor-pointer flex items-center gap-1.5 ${
                          viewMode === 'code'
                            ? 'bg-[#FFD84D] text-[#0A0A0A] border-[#0A0A0A] shadow-[1px_1px_0px_#0A0A0A]'
                            : 'bg-transparent text-[#0A0A0A]/70 border-transparent hover:text-[#0A0A0A]'
                        }`}
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        <span>CODE</span>
                      </button>
                    </div>

                    {/* shadcn CLI Copy Button if available */}
                    {currentComp.shadcnCommand && (
                      <button
                        type="button"
                        onClick={() => {
                          playClick(1100, 0.03, 'sine');
                          navigator.clipboard.writeText(currentComp.shadcnCommand!);
                          setCopiedCli(true);
                          setTimeout(() => setCopiedCli(false), 2000);
                        }}
                        className="px-3 py-1.5 bg-[#FFFFFF] hover:bg-[#FFD84D] text-[#0A0A0A] border-2 border-[#0A0A0A] font-mono text-xs font-bold uppercase shadow-[2px_2px_0px_#0A0A0A] transition-all cursor-pointer flex items-center gap-1.5"
                        title="Copy npx shadcn CLI install command"
                      >
                        {copiedCli ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#0A0A0A]" />
                            <span>COPIED!</span>
                          </>
                        ) : (
                          <>
                            <Terminal className="w-3.5 h-3.5" />
                            <span>CLI</span>
                          </>
                        )}
                      </button>
                    )}

                    {/* Copy TSX Button */}
                    <button
                      type="button"
                      onClick={() => handleCopyCode(currentComp.id, currentComp.codeSnippet)}
                      className="px-3 py-1.5 bg-[#0A0A0A] text-[#E3E6E8] hover:bg-[#FFD84D] hover:text-[#0A0A0A] border-2 border-[#0A0A0A] font-mono text-xs font-bold uppercase shadow-[2px_2px_0px_#0A0A0A] transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      {copiedId === currentComp.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#63D6A0]" />
                          <span>COPIED!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>COPY TSX</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#0A0A0A]/80 font-mono leading-relaxed">
                  {currentComp.description}
                </p>

                {/* shadcn CLI installation affordance */}
                {currentComp.shadcnCommand && (
                  <div className="flex items-center justify-between gap-3 px-3.5 py-2 bg-[#0A0A0A] text-[#E3E6E8] border-2 border-[#0A0A0A] text-xs font-mono">
                    <div className="flex items-center gap-2 text-[#FFD84D] overflow-x-auto no-scrollbar">
                      <Terminal className="w-3.5 h-3.5 text-[#FFD84D] shrink-0" />
                      <span className="text-[#E3E6E8]/40 shrink-0">$</span>
                      <code className="select-text whitespace-nowrap text-[#E3E6E8]">{currentComp.shadcnCommand}</code>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        playClick(1100, 0.03, 'sine');
                        navigator.clipboard.writeText(currentComp.shadcnCommand!);
                        setCopiedCli(true);
                        setTimeout(() => setCopiedCli(false), 2000);
                      }}
                      className="px-2 py-0.5 bg-[#FFD84D] text-[#0A0A0A] hover:bg-[#F7CE38] text-[10px] font-mono font-bold uppercase shrink-0 transition-colors cursor-pointer border border-[#0A0A0A]"
                    >
                      {copiedCli ? 'COPIED' : 'COPY'}
                    </button>
                  </div>
                )}

                {/* Active Stage (Preview or Code) */}
                <div className="border-2 border-[#0A0A0A] bg-[#0A0A0A] overflow-hidden shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]">
                  {viewMode === 'preview' ? (
                    <div className="p-4 sm:p-6 flex items-center justify-center min-h-[280px]">
                      {currentComp.previewComponent}
                    </div>
                  ) : (
                    <div className="p-4 overflow-x-auto max-h-[420px] text-[11px] font-mono leading-relaxed text-[#E3E6E8] select-text">
                      <pre>
                        <code>{currentComp.codeSnippet}</code>
                      </pre>
                    </div>
                  )}
                </div>

                {/* Bottom Spec Tip */}
                <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-[#0A0A0A]/60 pt-1 border-t border-[#0A0A0A]/20">
                  <span className="font-bold">DEPENDENCY: REACT 19 + TAILWIND CSS</span>
                  <span className="font-bold text-[#0A0A0A]">✓ PRODUCTION TESTED &amp; READY</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: DESIGN SYSTEM TOKENS & CSS VARIABLES */}
      {/* ========================================================================= */}
      {activeTab === 'tokens' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 bg-[#FFFFFF] border-3 border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-2 border-[#0A0A0A]">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#0A0A0A]/60 uppercase block">
                  DESIGN SYSTEM // TOKENS
                </span>
                <h3 className="font-['Space_Grotesk'] text-2xl font-black uppercase text-[#0A0A0A] tracking-tight">
                  CSS Color &amp; Typography Variables
                </h3>
              </div>

              <button
                type="button"
                onClick={() => handleCopyCode('css-tokens', `:root {
  /* Canvas & Ground Surfaces */
  --surface-canvas: #E3E6E8;
  --surface-card: #FFFFFF;
  --surface-ink: #0A0A0A;
  --border-structural: #0A0A0A;

  /* Accent Signatures */
  --accent-yellow: #FFD84D;
  --accent-mint: #63D6A0;
  --accent-blue: #5B8CFF;
  --accent-coral: #FF6B57;

  /* Typography Scale */
  --font-sans: 'Inter', -apple-system, sans-serif;
  --font-display: 'Space Grotesk', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Motion & Spring Dynamics */
  --spring-stiffness: 400;
  --spring-damping: 25;
}`)}
                className="px-3.5 py-1.5 bg-[#FFD84D] hover:bg-[#F7CE38] text-[#0A0A0A] border-2 border-[#0A0A0A] font-mono text-xs font-bold uppercase shadow-[2px_2px_0px_#0A0A0A] transition-all cursor-pointer flex items-center gap-1.5 self-start sm:self-center"
              >
                {copiedId === 'css-tokens' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#0A0A0A]" />
                    <span>COPIED CSS!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY ALL CSS VARIABLES</span>
                  </>
                )}
              </button>
            </div>

            {/* Token Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { name: '--surface-canvas', val: '#E3E6E8', desc: 'Cool Architectural Concrete Ground' },
                { name: '--surface-card', val: '#FFFFFF', desc: 'Tactile White Panel Surface' },
                { name: '--surface-ink', val: '#0A0A0A', desc: 'Primary Structural Ink Anchor' },
                { name: '--border-structural', val: '#0A0A0A', desc: '2px/3px Structural Heavy Border' },
                { name: '--accent-yellow', val: '#FFD84D', desc: 'Signal Yellow Focus Accent' },
                { name: '--accent-mint', val: '#63D6A0', desc: 'Verified Status Mint Token' },
                { name: '--accent-blue', val: '#5B8CFF', desc: 'Blueprint Data Electric Blue' },
                { name: '--accent-coral', val: '#FF6B57', desc: 'Drafting Redline Coral Marker' },
                { name: '--ease-tactile', val: 'cubic-bezier(0.16, 1, 0.3, 1)', desc: '180ms Spring Kinematics' },
              ].map((token) => (
                <div key={token.name} className="p-3.5 bg-[#F8F9FA] border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] space-y-1.5 font-mono">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#0A0A0A] font-bold truncate pr-2">{token.name}</span>
                    <span className="text-[#0A0A0A] font-bold shrink-0 bg-[#E3E6E8] px-1 border border-[#0A0A0A]">{token.val}</span>
                  </div>
                  <span className="text-[10px] text-[#0A0A0A]/60 block font-sans">{token.desc}</span>
                </div>
              ))}
            </div>

            {/* Tailwind Configuration Template */}
            <div className="p-4 bg-[#0A0A0A] text-[#E3E6E8] border-2 border-[#0A0A0A] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-white/20">
                <span className="text-[#FFD84D] font-bold uppercase">tailwind.config.ts Preset</span>
                <button 
                  type="button"
                  onClick={() => handleCopyCode('tw-config', `// tailwind.config.ts preset
export default {
  theme: {
    extend: {
      colors: {
        concrete: '#E3E6E8',
        ink: '#0A0A0A',
        yellow: '#FFD84D',
        coral: '#FF6B57',
        mint: '#63D6A0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
};`)}
                  className="hover:text-[#FFD84D] text-[11px] font-bold uppercase flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>COPY PRESET</span>
                </button>
              </div>
              <pre className="text-[11px] font-mono text-[#E3E6E8]/80 overflow-x-auto select-text">
                <code>{`export default {
  theme: {
    extend: {
      colors: { concrete: '#E3E6E8', ink: '#0A0A0A', yellow: '#FFD84D', coral: '#FF6B57', mint: '#63D6A0' },
      fontFamily: { sans: ['Inter'], grotesk: ['Space Grotesk'], mono: ['JetBrains Mono'] }
    }
  }
};`}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: THE COMPLETE CREATION STACK DIRECTORY */}
      {/* ========================================================================= */}
      {activeTab === 'stack' && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            {
              title: 'React 19 & TypeScript 5',
              category: 'Frontend Framework',
              desc: 'Fast, reliable components with clean TypeScript types and zero layout shifts.',
              tag: 'FRAMEWORK'
            },
            {
              title: 'Tailwind CSS Utilities',
              category: 'CSS Framework',
              desc: 'Strict design-token-backed styling with responsive layouts and hard geometry.',
              tag: 'STYLING'
            },
            {
              title: 'Framer Motion Spring Kinematics',
              category: 'Animation Library',
              desc: 'Physical, tactile spring-driven motion with zero floaty slop.',
              tag: 'MOTION'
            },
            {
              title: 'Web Audio API Clicks',
              category: 'Sound Effects',
              desc: 'Subtle mechanical click sounds generated natively in the browser.',
              tag: 'AUDIO'
            },
            {
              title: 'Curated Typography Hierarchy',
              category: 'Typography & Fonts',
              desc: 'Space Grotesk, Inter, and JetBrains Mono aligned to an 8px grid.',
              tag: 'TYPOGRAPHY'
            },
            {
              title: 'Playwright & Chromium Engine',
              category: 'Testing & Quality',
              desc: 'Automated snapshot tests ensuring screens look clean across mobile and desktop.',
              tag: 'TESTING'
            },
            {
              title: 'Oxlint & Biome Anti-Slop',
              category: 'Code Quality',
              desc: 'Strict code standards banning generic AI patterns, clutter, and uncalibrated gradients.',
              tag: 'LINTING'
            },
            {
              title: 'Lucide Clean Vector System',
              category: 'Clean Icon System',
              desc: 'Consistent vector iconography with strict geometric stroke weights.',
              tag: 'ICONS'
            },
            {
              title: 'Vite 5 Lightning Bundler',
              category: 'Build Tool',
              desc: 'Instant hot reloading during development and optimized production bundles.',
              tag: 'BUNDLER'
            }
          ].map((item) => (
            <div
              key={item.title}
              className="p-5 bg-[#FFFFFF] border-3 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] hover:shadow-[6px_6px_0px_#0A0A0A] transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-[#FFD84D] border border-[#0A0A0A] text-[9.5px] font-mono font-bold tracking-widest text-[#0A0A0A] uppercase">
                  {item.tag}
                </span>
                <span className="w-2 h-2 bg-[#63D6A0] border border-[#0A0A0A]" />
              </div>
              <h4 className="font-['Space_Grotesk'] text-base font-black uppercase tracking-tight text-[#0A0A0A] group-hover:text-[#5B8CFF] transition-colors">
                {item.title}
              </h4>
              <span className="text-[10px] font-mono text-[#0A0A0A]/60 block font-bold uppercase">{item.category}</span>
              <p className="text-xs text-[#0A0A0A]/80 font-mono leading-relaxed pt-1">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      )}

    </section>
  );
};
