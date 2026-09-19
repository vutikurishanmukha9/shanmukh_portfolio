import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ShieldCheck, Timer } from 'lucide-react';
import fontPaths from './signatureFontPaths.json';

const ALEX_BRUSH = fontPaths.alexBrush;

// Optimized viewBox with safe padding for flourish sweep
const SIGNATURE_VIEWBOX = "-28 15 1185 180";

// Automated periodic replay interval (60 seconds = 1 minute)
const AUTO_REPLAY_INTERVAL_MS = 60_000;

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
   * Automated 60-Second Signature Replay Cycle
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
      {/* Neobrutalism Signature Specimen Card */}
      <div className="relative border-2 border-black bg-card shadow-[6px_6px_0px_#000] rounded-none overflow-hidden">
        {/* Header Telemetry Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 px-4 sm:px-6 py-2.5 border-b-2 border-black bg-primary text-black">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-black stroke-[2.5]" />
            <span className="font-head text-xs font-bold tracking-wider uppercase">
              0xAUTH_SIGNATURE // VERIFIED OPERATOR
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold bg-white text-black border-2 border-black px-2.5 py-0.5 shadow-none">
            <Timer className="w-3 h-3 text-black stroke-[2.5]" />
            <span>CYCLE: 60s</span>
          </div>
        </div>

        {/* Main Signature Display Canvas */}
        <div className="p-6 sm:p-10 flex flex-col items-center justify-center text-center w-full bg-card">
          <div 
            className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center py-2 select-none"
            aria-label="Cursive handwritten signature of Shanmukha Vutikuri"
          >
            {/* Fully Responsive SVG Vector Signature Canvas */}
            <div className="w-full flex items-center justify-center px-1 sm:px-3">
              <svg
                key={`fluid-signature-${animationKey}`}
                viewBox={SIGNATURE_VIEWBOX}
                className="w-full h-auto min-h-[65px] max-h-[90px] xs:max-h-[110px] sm:max-h-[140px] md:max-h-[165px] lg:max-h-[185px] overflow-visible"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                {/* 1. Pure Black Continuous Stroke Drawing */}
                <motion.path
                  d={ALEX_BRUSH.d}
                  fill="none"
                  className="stroke-black"
                  strokeWidth={3}
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
                      ease: [0.22, 1, 0.36, 1],
                    },
                    opacity: {
                      duration: 0.04,
                      delay: shouldReduceMotion ? 0 : ANIMATION_TIMING.strokeDelay,
                    },
                  }}
                />

                {/* 2. Black Ink Density Fill */}
                <motion.path
                  d={ALEX_BRUSH.d}
                  stroke="none"
                  className="fill-black"
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

                {/* 3. Primary Yellow Calligraphy Flourish Underline */}
                <motion.path
                  d="M 20,165 C 240,178 600,160 880,168 C 980,171 1060,165 1080,157 C 1090,152 1076,168 1030,175 C 890,188 560,172 260,180"
                  fill="none"
                  className="stroke-[#ffdc58]"
                  strokeWidth={4.5}
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
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-head font-bold uppercase tracking-wide text-foreground max-w-lg mx-auto leading-relaxed px-2">
            &ldquo;Engineered with architectural rigor, sub-pixel precision, and human curiosity.&rdquo;
          </p>
        </div>

        {/* Footer Technical Metadata Strip */}
        <div className="px-4 sm:px-6 py-2.5 border-t-2 border-black bg-muted flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono font-bold text-foreground gap-2 text-center sm:text-left">
          <span>SHA-256: 0x9f8b2d41a87e0c33</span>
          <span className="bg-white px-2 py-0.5 border border-black text-black">LOCATION // HYDERABAD, INDIA</span>
        </div>
      </div>
    </div>
  );
};
