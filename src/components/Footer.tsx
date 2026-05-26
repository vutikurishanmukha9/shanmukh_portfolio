import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, ExternalLink, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
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
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-muted/30 border-t-[0.5px] border-border mt-20">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif-display font-medium text-foreground tracking-tight select-none">Vutikuri Shanmukha</h3>
            <p className="text-muted-foreground leading-relaxed text-xs max-w-xs">
              Building intelligent solutions through AI integrations, cloud telemetry, and robust software design.
            </p>
            <div className="flex gap-2 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded border-[0.5px] border-border bg-background/50 hover:bg-background/80 text-muted-foreground hover:text-primary transition-colors duration-200 shadow-none"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 md:ml-auto w-full md:max-w-[160px]">
            <h4 className="text-[10px] font-mono tracking-widest text-foreground uppercase border-b-[0.5px] border-border/40 pb-1.5 mb-3">Navigation</h4>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 w-fit"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 md:ml-auto w-full md:max-w-[240px]">
            <h4 className="text-[10px] font-mono tracking-widest text-foreground uppercase border-b-[0.5px] border-border/40 pb-1.5 mb-3">Connect</h4>
            <div className="flex flex-col gap-2 text-xs text-muted-foreground font-sans">
              <a href="mailto:vutikurishanmukh17@gmail.com" className="hover:text-foreground transition-colors font-mono text-[11px]">
                vutikurishanmukh17@gmail.com
              </a>
              <p className="text-[11px] text-muted-foreground font-mono uppercase tracking-wider">[ AVAILABLE FOR OPPORTUNITIES ]</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-[0.5px] border-border pt-8 flex flex-col lg:flex-row justify-between items-center gap-6 select-none">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
            <p>© {currentYear} Vutikuri Shanmukha. All rights reserved.</p>
            <span className="hidden sm:inline text-border/60">•</span>
            <p className="flex items-center gap-1.5 font-mono text-[10px]">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              SYSTEM ACTIVE
            </p>
          </div>

          {/* Timezone Clocks */}
          <div className="flex items-center gap-3.5 text-[9.5px] font-mono text-muted-foreground/80 border-[0.5px] border-border bg-background/35 px-3.5 py-1.5 rounded shadow-none">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 bg-primary/45 rounded-full" />
              SYS_UTC: <span className="text-foreground font-semibold">{time.utc}</span>
            </span>
            <span className="text-border/60">|</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500/40 rounded-full" />
              OP_IST: <span className="text-foreground font-semibold">{time.ist}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded bg-background border-[0.5px] border-border text-[9px] font-mono tracking-wide text-muted-foreground">
              <span>REACT + VITE + TAILWIND</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="rounded border-[0.5px] border-border/80 bg-background/50 hover:bg-background text-[9px] font-mono uppercase tracking-wider h-8 shadow-none"
            >
              <ArrowUp className="h-3.5 w-3.5 mr-1.5" />
              Top
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};