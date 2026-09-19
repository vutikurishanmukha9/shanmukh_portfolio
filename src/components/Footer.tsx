import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, ExternalLink, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SignatureSignoff } from '@/components/ui/SignatureSignoff';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/vutikurishanmukha9', icon: Github },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/shanmukha-vutikuri', icon: Linkedin },
  { name: 'Email', url: 'mailto:vutikurishanmukh17@gmail.com', icon: Mail },
  { name: 'LeetCode', url: 'https://leetcode.com/u/vutikurishanmukh9/', icon: ExternalLink },
];

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const scrollToSection = (href: string) => {
  const element = document.querySelector(href);
  if (element) {
    const offset = 120;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [time, setTime] = useState({ utc: '--:--:--', ist: '--:--:--' });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      const utcOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'UTC',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const utcString = now.toLocaleTimeString('en-US', utcOptions);

      const istOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const istString = now.toLocaleTimeString('en-US', istOptions);

      setTime({ utc: utcString, ist: istString });
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="relative bg-card border-t-2 border-black mt-20">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        {/* Author Signature & Authentication Signoff */}
        <SignatureSignoff />

        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-head font-bold uppercase text-foreground tracking-tight select-none">
              Vutikuri Shanmukha
            </h3>
            <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm max-w-xs font-sans">
              Building intelligent fullstack solutions through AI integrations, cloud telemetry, and robust software design.
            </p>
            <div className="flex gap-2.5 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border-2 border-black bg-card hover:bg-primary text-foreground hover:text-black shadow-[3px_3px_0px_#000] rounded-none hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-150"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 md:ml-auto w-full md:max-w-[160px]">
            <h4 className="text-xs font-head font-bold tracking-wider text-foreground uppercase border-b-2 border-black pb-1.5 mb-3">
              NAVIGATION
            </h4>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <button
                  type="button"
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="group flex items-center text-xs font-mono font-bold text-muted-foreground hover:text-foreground hover:underline transition-colors duration-200 w-fit select-none cursor-pointer"
                >
                  <span className="text-black mr-1.5 font-bold">›</span>
                  <span>{link.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 md:ml-auto w-full md:max-w-[260px]">
            <h4 className="text-xs font-head font-bold tracking-wider text-foreground uppercase border-b-2 border-black pb-1.5 mb-3">
              DISPATCH_HUB
            </h4>
            <div className="flex flex-col gap-2.5 text-xs text-muted-foreground">
              <a 
                href="mailto:vutikurishanmukh17@gmail.com" 
                className="group flex items-center hover:underline text-foreground font-mono text-xs font-bold break-all"
              >
                <span className="text-black mr-1 font-bold">›</span>
                <span>vutikurishanmukh17@gmail.com</span>
              </a>
              <div className="inline-block border-2 border-black bg-primary text-black px-2 py-1 font-head text-[10px] font-bold uppercase shadow-xs w-fit">
                AVAILABLE FOR HIRE // 2026
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-black pt-8 flex flex-col lg:flex-row justify-between items-center gap-6 select-none">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs font-mono text-muted-foreground">
            <p className="font-bold text-foreground">© {currentYear} Vutikuri Shanmukha.</p>
            <span className="hidden sm:inline text-black font-bold">•</span>
            <p className="flex items-center gap-1.5 font-bold text-black bg-emerald-400 px-2 py-0.5 border border-black">
              <span className="size-2 bg-black rounded-full animate-pulse" />
              SYSTEM ACTIVE
            </p>
          </div>

          {/* Timezone Clocks */}
          <div className="flex items-center gap-3 text-[10px] font-mono font-bold text-foreground border-2 border-black bg-muted px-3 py-1.5 shadow-xs">
            <span className="flex items-center gap-1.5">
              <span className="size-2 bg-primary border border-black" />
              UTC: <span className="text-black font-extrabold">{time.utc}</span>
            </span>
            <span className="text-black font-bold">|</span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 bg-emerald-500 border border-black animate-pulse" />
              IST: <span className="text-black font-extrabold">{time.ist}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 border-2 border-black bg-card text-[10px] font-head font-bold uppercase shadow-xs text-foreground">
              <span>REACT + VITE + TAILWIND</span>
            </div>

            <Button
              variant="default"
              size="sm"
              onClick={scrollToTop}
              className="font-head text-xs font-bold uppercase shadow-[3px_3px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              <ArrowUp className="h-3.5 w-3.5 mr-1 stroke-[3]" />
              <span>TOP</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};