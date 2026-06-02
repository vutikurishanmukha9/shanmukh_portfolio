import { useState } from 'react';

interface NewsTickerProps {
    items: string[];
    speed?: number;
}

export const NewsTicker = ({ items, speed = 30 }: NewsTickerProps) => {
    const [isPaused, setIsPaused] = useState(false);

    // Duplicate items for seamless infinite scroll (only 2 copies needed)
    const tickerContent = [...items, ...items];

    return (
        <div
            className="w-full overflow-hidden bg-card/90 backdrop-blur-md border-b-[0.5px] border-border/60 transition-all duration-200 select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
        >
            <div className="py-1.5 relative flex items-center h-8">
                {/* LIVE Badge */}
                <div className="flex-shrink-0 hidden sm:flex items-center gap-2 px-4 border-r-[0.5px] border-border/60 bg-card z-20 h-full">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                    </span>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-red-500">
                        LIVE
                    </span>
                </div>

                {/* Scrolling content container */}
                <div className="flex-1 overflow-hidden relative h-full flex items-center">
                    {/* Left fade */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-r from-card to-transparent" />
                    {/* Right fade */}
                    <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-l from-card to-transparent" />

                    {/* Scrolling content */}
                    <div
                        className="ticker-track flex whitespace-nowrap"
                        style={{
                            animationDuration: `${speed}s`,
                            animationPlayState: isPaused ? 'paused' : 'running',
                        }}
                    >
                        {tickerContent.map((item, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center mx-4 text-[11px] font-mono tracking-widest text-muted-foreground uppercase select-none"
                            >
                                {/* Clean asterisk separator */}
                                <span className="text-primary/60 mr-3 text-xs">•</span>
                                <span className="hover:text-foreground transition-colors duration-200">
                                    {item}
                                </span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .ticker-track {
                    animation: ticker-seamless linear infinite;
                }
                
                @keyframes ticker-seamless {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>
        </div>
    );
};

// Default status items - concise and impactful
export const defaultStatusItems = [
    "Open to Opportunities",
    "Seeking: SDE • ML • Cloud • Data Analyst Roles",
    "Based in India",
    "B.Tech in ECE",
    "10+ Projects Completed",
    "AWS Certified Cloud Practitioner",
    "AI/ML Specialist",
    "vutikurishanmukh17@gmail.com",
];

