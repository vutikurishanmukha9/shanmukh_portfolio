import { useState, useEffect } from 'react';

export const PageLoader = () => {
    const [loading, setLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Skip loader if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            setLoading(false);
            return;
        }

        // Start fade out after content likely loaded
        const fadeTimer = setTimeout(() => {
            setFadeOut(true);
        }, 1500);

        // Remove loader after fade animation
        const removeTimer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    if (!loading) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'
                }`}
        >
            <div className="flex flex-col items-center gap-6">
                {/* Animated Logo */}
                <div className="relative">
                    {/* Outer ring */}
                    <div className="w-20 h-20 rounded-full border-2 border-primary/20 animate-ping absolute inset-0" />

                    {/* Spinning ring */}
                    <div className="w-20 h-20 rounded-full border-2 border-transparent border-t-primary animate-spin" />

                    {/* Center text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-primary font-serif-display">SV</span>
                    </div>
                </div>

                {/* Loading text */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Loading</span>
                    <span className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                </div>
            </div>
        </div>
    );
};
