import React, { useState, useMemo } from 'react';
import { 
  Palette, 
  Sliders, 
  ShieldCheck, 
  Copy, 
  Check, 
  Code2, 
  RefreshCw, 
  Layers,
  Box,
  Eye
} from 'lucide-react';
import { useSound } from '@/hooks/useSound';

interface ColorPreset {
  name: string;
  hex: string;
  rgb: [number, number, number];
  role: string;
}

const COLOR_PRESETS: ColorPreset[] = [
  { name: 'Linear Lavender', hex: '#5e6ad2', rgb: [94, 106, 210], role: 'Signature Primary' },
  { name: 'Emerald AAA', hex: '#34d399', rgb: [52, 211, 153], role: 'Success & Active' },
  { name: 'Raycast Crimson', hex: '#f43f5e', rgb: [244, 63, 94], role: 'Action & Attention' },
  { name: 'Solar Amber', hex: '#f59e0b', rgb: [245, 158, 11], role: 'Warning & Highlight' },
  { name: 'Cyber Cyan', hex: '#06b6d4', rgb: [6, 182, 212], role: 'Telemetry Accent' },
  { name: 'Monochrome Silver', hex: '#e2e8f0', rgb: [226, 232, 240], role: 'Minimalist Clean' }
];

// Helper to compute WCAG 2.1 relative luminance
function getRelativeLuminance(rgb: [number, number, number]): number {
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Contrast ratio against dark canvas (#050608, L ≈ 0.001)
function getContrastRatio(rgb: [number, number, number]): number {
  const lum1 = getRelativeLuminance(rgb);
  const lum2 = 0.001; // #050608
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

export const FigmaVariablesBridge: React.FC = () => {
  const { playClick } = useSound();
  const [selectedColor, setSelectedColor] = useState<ColorPreset>(COLOR_PRESETS[0]);
  const [radiusPx, setRadiusPx] = useState<number>(16);
  const [borderOpacity, setBorderOpacity] = useState<number>(0.12);
  const [codeFormat, setCodeFormat] = useState<'figma' | 'tailwind' | 'css'>('figma');
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const contrastRatio = useMemo(() => {
    return getContrastRatio(selectedColor.rgb);
  }, [selectedColor]);

  const wcagRating = useMemo(() => {
    if (contrastRatio >= 7.0) return { label: 'WCAG AAA (PASS)', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
    if (contrastRatio >= 4.5) return { label: 'WCAG AA (PASS)', color: 'text-sky-400 bg-sky-500/10 border-sky-500/30' };
    return { label: 'LARGE TEXT ONLY (3:1)', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
  }, [contrastRatio]);

  const figmaJsonCode = useMemo(() => {
    return JSON.stringify({
      "$version": "1.0",
      "tokens": {
        "color": {
          "accent": {
            "primary": {
              "value": selectedColor.hex,
              "type": "color",
              "description": selectedColor.role
            }
          },
          "surface": {
            "card": { "value": "#0f1015", "type": "color" },
            "canvas": { "value": "#050608", "type": "color" }
          }
        },
        "borderRadius": {
          "card": { "value": `${radiusPx}px`, "type": "borderRadius" }
        },
        "border": {
          "hairline": { "value": `rgba(255, 255, 255, ${borderOpacity})`, "type": "border" }
        }
      }
    }, null, 2);
  }, [selectedColor, radiusPx, borderOpacity]);

  const tailwindCode = useMemo(() => {
    return `@theme {
  --color-accent-primary: ${selectedColor.hex};
  --color-surface-card: #0f1015;
  --color-surface-canvas: #050608;
  --radius-card: ${radiusPx}px;
  --border-hairline: rgba(255, 255, 255, ${borderOpacity});
}`;
  }, [selectedColor, radiusPx, borderOpacity]);

  const cssVariablesCode = useMemo(() => {
    return `:root {
  /* Dynamic Token Collection */
  --accent-primary: ${selectedColor.hex};
  --accent-primary-rgb: ${selectedColor.rgb.join(', ')};
  --surface-card: #0f1015;
  --surface-canvas: #050608;
  --radius-card: ${radiusPx}px;
  --border-hairline: rgba(255, 255, 255, ${borderOpacity});
  --contrast-ratio: ${contrastRatio.toFixed(2)}:1;
}`;
  }, [selectedColor, radiusPx, borderOpacity, contrastRatio]);

  const handleCopy = (code: string, format: string) => {
    playClick(1000, 0.03, 'sine');
    navigator.clipboard.writeText(code);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handlePresetSelect = (preset: ColorPreset) => {
    playClick(850, 0.02, 'sine');
    setSelectedColor(preset);
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#0a0b10] p-5 sm:p-7 space-y-6 select-none shadow-2xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-[10.5px] font-mono tracking-widest text-emerald-400 uppercase font-semibold">
              BI-DIRECTIONAL TOKEN ENGINE // FIGMA VARIABLES TO CODE
            </span>
          </div>
          <h3 className="font-jakarta text-xl sm:text-2xl font-bold tracking-tight text-white">
            Live Token Bridge &amp; WCAG Contrast Engine
          </h3>
          <p className="text-xs font-sans text-white/60 leading-relaxed max-w-2xl">
            Tweak Figma Variable primitives in real time. Inspect dynamic sub-pixel card morphing, live WCAG AAA contrast ratio calculation, and copy sync-ready JSON or CSS.
          </p>
        </div>

        {/* Live Contrast Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <div className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-2 ${wcagRating.color}`}>
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="font-semibold">{wcagRating.label}</span>
            <span className="tabular-nums opacity-80">({contrastRatio.toFixed(1)}:1)</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Controls + Live Specimen + Export Code */}
      <div className="grid md:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (5 Cols): Live Sliders & Color Swatches */}
        <div className="md:col-span-5 space-y-5">
          
          {/* Accent Color Preset Matrix */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block">
              VARIABLE // ACCENT-PRIMARY COLOR
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {COLOR_PRESETS.map((preset) => {
                const isSelected = selectedColor.hex === preset.hex;
                return (
                  <button
                    key={preset.hex}
                    type="button"
                    onClick={() => handlePresetSelect(preset)}
                    className={`p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer text-left flex flex-col justify-between gap-1.5 sm:gap-2 ${
                      isSelected
                        ? 'bg-white/10 border-white/40 ring-1 ring-white/30 shadow-md'
                        : 'bg-white/[0.02] hover:bg-white/5 border-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: preset.hex }}
                      />
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="font-mono text-[10px] sm:text-[10.5px] text-white/90 font-medium truncate block">
                      {preset.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Border Radius Slider */}
          <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-white/60">--radius-card</span>
              <span className="text-white font-bold tabular-nums">{radiusPx}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="32"
              step="2"
              value={radiusPx}
              onChange={(e) => {
                playClick(500 + Number(e.target.value) * 15, 0.01, 'sine');
                setRadiusPx(Number(e.target.value));
              }}
              aria-label="Border Radius Slider"
              className="w-full h-2 rounded-lg bg-white/10 accent-white cursor-pointer"
            />
            <div className="flex items-center justify-between text-[9px] font-mono text-white/30 pt-1">
              <span>0px (Sharp Brutalist)</span>
              <span>16px (Linear Style)</span>
              <span>32px (Hyper-Pill)</span>
            </div>
          </div>

          {/* Hairline Border Opacity Slider */}
          <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-white/60">--border-hairline opacity</span>
              <span className="text-white font-bold tabular-nums">{(borderOpacity * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.04"
              max="0.30"
              step="0.02"
              value={borderOpacity}
              onChange={(e) => {
                playClick(600, 0.01, 'sine');
                setBorderOpacity(Number(e.target.value));
              }}
              aria-label="Border Opacity Slider"
              className="w-full h-2 rounded-lg bg-white/10 accent-white cursor-pointer"
            />
          </div>

        </div>

        {/* Center & Right Column (7 Cols): Live Reactive Specimen & Code Tabs */}
        <div className="md:col-span-7 space-y-5">
          
          {/* Live Reactive Card Specimen */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#050608] border border-white/10 flex items-center justify-center min-h-[260px] relative overflow-hidden">
            {/* Subtle Matrix */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{
                backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Dynamic Specimen Card */}
            <div
              className="w-full max-w-sm p-6 space-y-4 shadow-2xl transition-all duration-150"
              style={{
                backgroundColor: '#0f1015',
                borderRadius: `${radiusPx}px`,
                border: `1px solid rgba(255, 255, 255, ${borderOpacity})`
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold border"
                  style={{
                    color: selectedColor.hex,
                    backgroundColor: `${selectedColor.hex}18`,
                    borderColor: `${selectedColor.hex}40`
                  }}
                >
                  LIVE FIGMA VARIABLE
                </span>
                <span className="font-mono text-[10px] text-white/40">
                  r: {radiusPx}px
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="font-jakarta text-base font-bold text-white tracking-tight">
                  Reactive Token Container
                </h4>
                <p className="font-sans text-xs text-white/60 leading-relaxed">
                  Watching changes to radius, border opacity, and primary accent hue dynamically.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 text-xs font-mono font-semibold transition-transform active:scale-95 cursor-pointer shadow-md"
                  style={{
                    backgroundColor: selectedColor.hex,
                    color: contrastRatio > 5 ? '#050608' : '#ffffff',
                    borderRadius: `${Math.max(4, radiusPx - 6)}px`
                  }}
                >
                  Primary CTA
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-xs font-mono text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border transition-colors cursor-pointer"
                  style={{
                    borderColor: `rgba(255, 255, 255, ${borderOpacity})`,
                    borderRadius: `${Math.max(4, radiusPx - 6)}px`
                  }}
                >
                  Secondary
                </button>
              </div>
            </div>
          </div>

          {/* Export Code Switcher */}
          <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
              {/* Format Switcher */}
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-black/60 border border-white/10 text-xs font-mono overflow-x-auto no-scrollbar max-w-full">
                {[
                  { key: 'figma', label: 'Figma JSON' },
                  { key: 'tailwind', label: 'Tailwind v4' },
                  { key: 'css', label: 'CSS :root' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => {
                      playClick(750, 0.02, 'sine');
                      setCodeFormat(tab.key as 'figma' | 'tailwind' | 'css');
                    }}
                    className={`px-2.5 sm:px-3 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 text-[11px] sm:text-xs ${
                      codeFormat === tab.key
                        ? 'bg-white text-black font-semibold'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Copy Code Button */}
              <button
                type="button"
                onClick={() => {
                  const code = codeFormat === 'figma' ? figmaJsonCode : codeFormat === 'tailwind' ? tailwindCode : cssVariablesCode;
                  handleCopy(code, codeFormat);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white text-white hover:text-black font-mono text-xs transition-colors cursor-pointer self-start sm:self-center font-semibold"
              >
                {copiedFormat === codeFormat ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Config</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Block Display */}
            <pre className="p-3.5 rounded-xl bg-[#07080b] border border-white/5 font-mono text-[11px] text-white/80 overflow-x-auto max-h-[160px] select-text leading-relaxed">
              <code>
                {codeFormat === 'figma' ? figmaJsonCode : codeFormat === 'tailwind' ? tailwindCode : cssVariablesCode}
              </code>
            </pre>
          </div>

        </div>

      </div>
    </div>
  );
};
