import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSound } from '@/hooks/useSound';

const DEFAULT_STATUS_ITEMS = [
    "Open to Opportunities",
    "Seeking: SDE • ML • Cloud • Data Analyst Roles",
    "Based in India",
    "B.Tech in ECE",
    "10+ Projects Completed",
    "AWS Certified Cloud Practitioner",
    "AI/ML Specialist",
    "vutikurishanmukh17@gmail.com",
];

interface NewsTickerProps {
    items?: string[];
    speed?: number;
}

export const NewsTicker = ({ items = DEFAULT_STATUS_ITEMS, speed = 30 }: NewsTickerProps) => {
    const [isPaused, setIsPaused] = useState(false);
    const { toast } = useToast();
    const { playClick } = useSound();

    // Duplicate items for seamless infinite scroll with stable IDs
    const tickerContent = [
        ...items.map((t) => ({ id: `track1-${t}`, text: t })),
        ...items.map((t) => ({ id: `track2-${t}`, text: t })),
    ];

    const handleItemClick = (item: string) => {
      playClick(850, 0.04, 'sine');
      if (item.includes('@')) {
        navigator.clipboard.writeText(item);
        toast({
          title: "Email Copied!",
          description: `Copied ${item} to clipboard.`,
        });
      } else if (item.includes("Cloud Practitioner") || item.includes("Certifi")) {
        document.getElementById('certifications')?.scrollIntoView({ behavior: 'smooth' });
      } else if (item.includes("Projects")) {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      } else if (item.includes("Opportunities") || item.includes("Seeking")) {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    return (
        <div
            className="w-full overflow-hidden bg-primary text-black border-b-2 border-black transition-colors duration-200 select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
        >
            <div className="py-1 relative flex items-center h-7.5 sm:h-8">
                {/* LIVE Badge */}
                <div className="flex-shrink-0 hidden sm:flex items-center gap-1.5 px-3 border-r-2 border-black bg-black text-white z-20 h-full">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                    </span>
                    <span className="text-[10px] font-head font-bold tracking-wider uppercase text-white">
                        LIVE BULLETIN
                    </span>
                </div>

                {/* Scrolling content container */}
                <div className="flex-1 overflow-hidden relative h-full flex items-center">
                    {/* Scrolling content */}
                    <div
                        className="ticker-track flex whitespace-nowrap"
                        style={{
                            animationDuration: `${speed}s`,
                            animationPlayState: isPaused ? 'paused' : 'running',
                        }}
                    >
                        {tickerContent.map((item) => (
                            <button
                                type="button"
                                key={item.id}
                                onClick={() => handleItemClick(item.text)}
                                className="inline-flex items-center mx-4 text-xs font-head font-bold tracking-wide uppercase text-black cursor-pointer hover:underline decoration-2 underline-offset-2 transition-colors duration-200 bg-transparent border-0 p-0"
                            >
                                <span className="inline-flex size-4 items-center justify-center border border-black bg-black text-white text-[9px] mr-2.5">
                                    ★
                                </span>
                                <span>
                                    {item.text}
                                </span>
                            </button>
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

