import { useState, useCallback } from 'react';

const AUDIO_MUTE_KEY = 'portfolio_audio_muted';

export function useSound() {
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem(AUDIO_MUTE_KEY) === 'true';
  });

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      localStorage.setItem(AUDIO_MUTE_KEY, String(next));
      return next;
    });
  }, []);

  const playClick = useCallback((freq = 800, duration = 0.03, type: OscillatorType = 'sine') => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.025, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context might be restricted before user interaction
    }
  }, [isMuted]);

  const playToggle = useCallback(() => {
    playClick(1000, 0.04, 'triangle');
  }, [playClick]);

  const playFilter = useCallback(() => {
    playClick(650, 0.04, 'sine');
  }, [playClick]);

  return { isMuted, toggleMute, playClick, playToggle, playFilter };
}
