import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ShieldCheck, Timer } from 'lucide-react';
import fontPaths from './signatureFontPaths.json';

const ALEX_BRUSH = fontPaths.alexBrush;

// Optimized viewBox with safe padding for flourish sweep
const SIGNATURE_VIEWBOX = "-28 15 1185 180";

// Automated periodic replay interval (120 seconds = 2 minutes)
const AUTO_REPLAY_INTERVAL_MS = 120_000;

// Continuous, overlapping timing curves for seamless 60/120fps motion
const ANIMATION_TIMING = {
  strokeDuration: 2.1,
  strokeDelay: 0.1,
  fillDuration: 0.45,
  fillDelay: 1.7, // Overlaps with final letters so ink settles continuously
  flourishDuration: 0.65,
  flourishDelay: 1.85, // Starts seamlessly as text finishes with zero pause
};

export const SignatureSignoff: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.15 });
  const shouldReduceMotion = useReducedMotion();
  const [animationKey, setAnimationKey] = useState(0);

  const shouldAnimate = shouldReduceMotion || isInView;

  /* ─────────────────────────────────────────────────────────────
   * Automated 120-Second Signature Replay Cycle
   * Automatically redraws the signature every 120 seconds
   * when the signature is visible in viewport.
   * ────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (shouldReduceMotion || !isInView) return;

    const timer = setInterval(() => {
      setAnimationKey((prev) => prev + 1);
    }, AUTO_REPLAY_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [isInView, shouldReduceMotion]);

  return (
    <div ref={containerRef} className="w-full max-w-5xl mx-auto my-8 sm:my-12 px-2 sm:px-4 select-none">
      {/* Outer Specular Enclosure Card */}
      <div className="relative border-[0.5px] border-border/80 bg-card/60 backdrop-blur-md rounded-2xl p-4 sm:p-7 md:p-9 overflow-hidden group shadow-none">
        
        {/* Top Edge Specular Ray */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 dark:via-white/20 to-transparent transition-opacity duration-500 group-hover:via-primary/80 z-20" />

        {/* Ambient Warm Backlight Bloom */}
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-4/5 h-28 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent blur-3xl rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-500 z-0" />

        {/* Header Telemetry Bar */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 sm:pb-5 border-b-[0.5px] border-border/50 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[10px] sm:text-[10.5px] font-mono tracking-widest text-muted-foreground uppercase flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-primary/90 inline" />
              [ 0xAUTH_SIGNATURE // VERIFIED OPERATOR ]
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-[9.5px] sm:text-[10px] font-mono text-muted-foreground/80 bg-background/50 border-[0.5px] border-border/60 px-2.5 py-1 rounded-full">
            <Timer className="w-3 h-3 text-primary inline" />
            <span>AUTO-CYCLE // 120s</span>
          </div>
        </div>

        {/* Main Signature Display Canvas */}
        <div className="relative z-10 py-4 sm:py-8 md:py-10 flex flex-col items-center justify-center text-center w-full">
          
          <div 
            className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center py-1 select-none"
            aria-label="Cursive handwritten signature of Shanmukha Vutikuri"
          >
            {/* Fully Responsive SVG Vector Signature Canvas */}
            <div className="w-full flex items-center justify-center px-1 sm:px-3">
              <svg
                key={`fluid-signature-${animationKey}`}
                viewBox={SIGNATURE_VIEWBOX}
                className="w-full h-auto min-h-[60px] max-h-[85px] xs:max-h-[105px] sm:max-h-[135px] md:max-h-[160px] lg:max-h-[180px] overflow-visible drop-shadow-[0_2px_14px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_4px_24px_rgba(255,255,255,0.22)]"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                {/* 1. Ultra-smooth continuous stroke drawing with seamless cubic-bezier easing */}
                <motion.path
                  d={ALEX_BRUSH.d}
                  fill="none"
                  className="stroke-neutral-900 dark:stroke-white"
                  strokeWidth={2.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{
                    pathLength: shouldReduceMotion ? 1 : 0,
                    opacity: shouldReduceMotion ? 1 : 0,
                  }}
                  animate={
                    shouldAnimate
                      ? { pathLength: 1, opacity: 1 }
                      : { pathLength: 0, opacity: 0 }
                  }
                  transition={{
                    pathLength: {
                      duration: shouldReduceMotion ? 0 : ANIMATION_TIMING.strokeDuration,
                      delay: shouldReduceMotion ? 0 : ANIMATION_TIMING.strokeDelay,
                      ease: [0.22, 1, 0.36, 1], // Fluid human pen acceleration
                    },
                    opacity: {
                      duration: 0.04,
                      delay: shouldReduceMotion ? 0 : ANIMATION_TIMING.strokeDelay,
                    },
                  }}
                />

                {/* 2. Seamless ink density fill — blends in smoothly without stutter */}
                <motion.path
                  d={ALEX_BRUSH.d}
                  stroke="none"
                  className="fill-neutral-900 dark:fill-white"
                  initial={{
                    opacity: shouldReduceMotion ? 1 : 0,
                  }}
                  animate={
                    shouldAnimate
                      ? { opacity: 1 }
                      : { opacity: 0 }
                  }
                  transition={{
                    duration: shouldReduceMotion ? 0 : ANIMATION_TIMING.fillDuration,
                    delay: shouldReduceMotion ? 0 : ANIMATION_TIMING.fillDelay,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                />

                {/* 3. Sweeping Calligraphy Flourish Underline — overlaps text completion with zero hesitation */}
                <motion.path
                  d="M 20,165 C 240,178 600,160 880,168 C 980,171 1060,165 1080,157 C 1090,152 1076,168 1030,175 C 890,188 560,172 260,180"
                  fill="none"
                  className="stroke-primary drop-shadow-[0_2px_8px_rgba(249,115,22,0.35)]"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{
                    pathLength: shouldReduceMotion ? 1 : 0,
                    opacity: shouldReduceMotion ? 1 : 0,
                  }}
                  animate={
                    shouldAnimate
                      ? { pathLength: 1, opacity: 1 }
                      : { pathLength: 0, opacity: 0 }
                  }
                  transition={{
                    pathLength: {
                      duration: shouldReduceMotion ? 0 : ANIMATION_TIMING.flourishDuration,
                      delay: shouldReduceMotion ? 0 : ANIMATION_TIMING.flourishDelay,
                      ease: [0.16, 1, 0.3, 1],
                    },
                    opacity: {
                      duration: 0.01,
                      delay: shouldReduceMotion ? 0 : ANIMATION_TIMING.flourishDelay,
                    },
                  }}
                />
              </svg>
            </div>
          </div>

          {/* Subtext Philosophy Quote */}
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm font-serif-display italic text-muted-foreground max-w-md mx-auto leading-relaxed px-2">
            "Engineered with architectural rigor, sub-pixel precision, and human curiosity."
          </p>
        </div>

        {/* Footer Technical Metadata Strip */}
        <div className="relative z-10 pt-3 sm:pt-4 border-t-[0.5px] border-border/40 flex flex-col sm:flex-row items-center justify-between text-[9px] sm:text-[9.5px] font-mono text-muted-foreground/80 gap-2 text-center sm:text-left">
          <span>SHA-256: 0x9f8b2d41a87e0c33</span>
          <span>LOCATION // HYDERABAD, INDIA</span>
        </div>
      </div>
    </div>
  );
};
