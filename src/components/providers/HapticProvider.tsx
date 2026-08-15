"use client";

import React, { createContext, useContext, useEffect, useCallback } from 'react';
import { useSound } from '@/hooks/useSound';

export type HapticType = 'light' | 'selection' | 'medium' | 'heavy' | 'success' | 'warning';

interface HapticContextType {
  triggerHaptic: (type?: HapticType) => void;
  light: () => void;
  selection: () => void;
  medium: () => void;
  heavy: () => void;
  success: () => void;
  warning: () => void;
}

const HapticContext = createContext<HapticContextType | null>(null);

export const HapticProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { playClick, playGlassChime, playSubBass, playSuccessChord, playToggle, isMuted } = useSound();

  const triggerHaptic = useCallback(
    (type: HapticType = 'light') => {
      // 1. Device Hardware Vibration (Mobile, Trackpads, Android)
      if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate) {
        try {
          switch (type) {
            case 'light':
              navigator.vibrate(6);
              break;
            case 'selection':
              navigator.vibrate(10);
              break;
            case 'medium':
              navigator.vibrate(18);
              break;
            case 'heavy':
              navigator.vibrate(28);
              break;
            case 'success':
              navigator.vibrate([10, 30, 15]);
              break;
            case 'warning':
              navigator.vibrate([20, 40, 20]);
              break;
          }
        } catch {
          // Ignore vibration policy restrictions
        }
      }

      // 2. Synthesized Spatial Audio Haptic Feedback
      if (!isMuted) {
        switch (type) {
          case 'light':
            playClick(900, 0.02, 'sine');
            break;
          case 'selection':
            playToggle();
            break;
          case 'medium':
            playGlassChime();
            break;
          case 'heavy':
            playSubBass();
            break;
          case 'success':
            playSuccessChord();
            break;
          case 'warning':
            playClick(400, 0.08, 'sawtooth');
            break;
        }
      }
    },
    [playClick, playGlassChime, playSubBass, playSuccessChord, playToggle, isMuted]
  );

  const light = useCallback(() => triggerHaptic('light'), [triggerHaptic]);
  const selection = useCallback(() => triggerHaptic('selection'), [triggerHaptic]);
  const medium = useCallback(() => triggerHaptic('medium'), [triggerHaptic]);
  const heavy = useCallback(() => triggerHaptic('heavy'), [triggerHaptic]);
  const success = useCallback(() => triggerHaptic('success'), [triggerHaptic]);
  const warning = useCallback(() => triggerHaptic('warning'), [triggerHaptic]);

  // Global Interaction Event Delegation Listener
  useEffect(() => {
    let lastHoverTime = 0;

    // 1. On Pointer Down on Any Interactive Element
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'button, a, input, select, textarea, [role="button"], [role="tab"], [role="switch"], [role="checkbox"], [data-haptic]'
      );

      if (interactive) {
        triggerHaptic('light');
      }
    };

    // 2. Micro-Haptic Tick on Hovering Interactive Elements (Debounced)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const now = Date.now();
      if (now - lastHoverTime < 75) return; // Debounce 75ms to prevent audio jitter

      const interactive = target.closest(
        'button, a, [role="button"], [role="tab"], .interactive-chip, [data-hover-haptic]'
      );

      if (interactive) {
        lastHoverTime = now;
        if (!isMuted) {
          playClick(1400, 0.012, 'sine');
        }
      }
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [triggerHaptic, isMuted, playClick]);

  return (
    <HapticContext.Provider
      value={{
        triggerHaptic,
        light,
        selection,
        medium,
        heavy,
        success,
        warning,
      }}
    >
      {children}
    </HapticContext.Provider>
  );
};

export const useHaptics = () => {
  const context = useContext(HapticContext);
  if (!context) {
    // Fallback if used outside provider
    return {
      triggerHaptic: () => {},
      light: () => {},
      selection: () => {},
      medium: () => {},
      heavy: () => {},
      success: () => {},
      warning: () => {},
    };
  }
  return context;
};
