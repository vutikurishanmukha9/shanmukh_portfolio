import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * ViewportEdgeFade
 * Provides a cinematic top and bottom dissolve transition:
 * - Content vanishing at the top smoothly fades into the background before reaching the floating navbar.
 * - Content arriving from the bottom emerges smoothly through a bottom gradient feather.
 * - Fully theme-adaptive (zero blue tint, obsidian/zinc neutral) and non-blocking (pointer-events-none).
 */
export const ViewportEdgeFade: React.FC = () => {
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(false);

  useEffect(() => {
    let ticking = false;

    const evaluateFades = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Only show top fade once scrolled past the initial hero view (approx 20px)
      setShowTopFade(scrollY > 20);

      // Only show bottom fade during active scroll (hide on hero landing and near footer)
      const isHeroLanding = scrollY < 20;
      const isNearBottom = scrollY + windowHeight >= docHeight - 72;
      setShowBottomFade(!isHeroLanding && !isNearBottom);

      ticking = false;
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(evaluateFades);
        ticking = true;
      }
    };

    evaluateFades();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  return (
    <>
      {/* Top Edge Vignette - Softly dissolves content vanishing as it scrolls under the navbar */}
      <div
        aria-hidden="true"
        className={cn(
          'fixed top-0 left-0 right-0 h-20 sm:h-24 pointer-events-none z-40 transition-opacity duration-300 ease-out viewport-fade-top',
          showTopFade ? 'opacity-100' : 'opacity-0'
        )}
      />

      {/* Bottom Edge Vignette - Softly transitions content emerging as it scrolls up from the bottom */}
      <div
        aria-hidden="true"
        className={cn(
          'fixed bottom-0 left-0 right-0 h-16 sm:h-20 pointer-events-none z-40 transition-opacity duration-300 ease-out viewport-fade-bottom',
          showBottomFade ? 'opacity-100' : 'opacity-0'
        )}
      />
    </>
  );
};
