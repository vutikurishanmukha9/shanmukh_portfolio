import { useState, useCallback, useEffect } from 'react';

const AUDIO_MUTE_KEY = 'portfolio_audio_muted';

// Global shared AudioContext singleton for zero-latency instant playback
let globalAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!globalAudioCtx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        globalAudioCtx = new AudioCtx();
      }
    }
    if (globalAudioCtx && globalAudioCtx.state === 'suspended') {
      globalAudioCtx.resume();
    }
    return globalAudioCtx;
  } catch {
    return null;
  }
}

export function useSound() {
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem(AUDIO_MUTE_KEY) === 'true';
  });

  // Listen to cross-component mute changes
  useEffect(() => {
    const handleStorage = () => {
      setIsMuted(localStorage.getItem(AUDIO_MUTE_KEY) === 'true');
    };
    window.addEventListener('storage', handleStorage);
    window.addEventListener('audio_mute_toggle', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('audio_mute_toggle', handleStorage);
    };
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      localStorage.setItem(AUDIO_MUTE_KEY, String(next));
      window.dispatchEvent(new Event('audio_mute_toggle'));
      return next;
    });
  }, []);

  // 1. High-frequency Micro-Haptic Click (for chip hover, buttons)
  const playClick = useCallback((freq = 900, duration = 0.025, type: OscillatorType = 'sine') => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignore user-gesture restrictions
    }
  }, [isMuted]);

  // 2. Resonant Apple-grade Glass Chime (for modal opens & tab changes)
  const playGlassChime = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const fundamental = 880; // A5
      const harmonic = 1760; // A6

      [fundamental, harmonic].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const initialGain = idx === 0 ? 0.03 : 0.015;
        const duration = 0.18;

        gain.gain.setValueAtTime(initialGain, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
      });
    } catch {
      // Ignore
    }
  }, [isMuted]);

  // 3. Sub-Bass Pulse (for section anchor scrolls & milestone reveals)
  const playSubBass = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // Ignore
    }
  }, [isMuted]);

  // 4. Musical Triad Arpeggio (for verified completion / test pass)
  const playSuccessChord = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, i) => {
        setTimeout(() => {
          if (isMuted) return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          gain.gain.setValueAtTime(0.03, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.16);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 0.16);
        }, i * 55);
      });
    } catch {
      // Ignore
    }
  }, [isMuted]);

  const playToggle = useCallback(() => {
    playClick(1050, 0.035, 'triangle');
  }, [playClick]);

  const playFilter = useCallback(() => {
    playClick(720, 0.03, 'sine');
  }, [playClick]);

  return {
    isMuted,
    toggleMute,
    playClick,
    playGlassChime,
    playSubBass,
    playSuccessChord,
    playToggle,
    playFilter,
  };
}
