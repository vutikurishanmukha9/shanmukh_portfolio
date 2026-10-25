import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, ExternalLink, ArrowUp } from 'lucide-react';

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Selected Work', href: '#projects' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Technical Stack', href: '#skills' },
  { label: 'Milestones', href: '#journey' },
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
    const offset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [istTime, setIstTime] = useState('--:--:--');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setIstTime(now.toLocaleTimeString('en-US', istOptions));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="relative bg-card/40 border-t border-border mt-8 sm:mt-10">
      <div className="container mx-auto px-4 lg:px-8 py-10 sm:py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand & Narrative */}
          <div className="space-y-4">
            <h3 className="text-lg font-head font-bold tracking-tight text-foreground">
              Shanmukh Vutikuri
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm max-w-sm font-sans">
              AI Systems & Full-Stack Engineer building high-throughput retrieval pipelines, microservices, and reliable cloud software.
            </p>
            <div className="flex gap-2 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground shadow-xs transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-4 md:ml-auto w-full md:max-w-[180px]">
            <h4 className="text-xs font-mono font-medium tracking-wider text-muted-foreground uppercase">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <button
                  type="button"
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="group flex items-center text-sm font-sans text-muted-foreground hover:text-foreground transition-colors w-fit cursor-pointer text-left"
                >
                  <span>{link.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Communication & Status */}
          <div className="space-y-4 md:ml-auto w-full md:max-w-[280px]">
            <h4 className="text-xs font-mono font-medium tracking-wider text-muted-foreground uppercase">
              Direct Contact
            </h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground font-sans">
              <a 
                href="mailto:vutikurishanmukh17@gmail.com" 
                className="hover:text-foreground font-mono text-xs transition-colors break-all"
              >
                vutikurishanmukh17@gmail.com
              </a>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono w-fit">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for Opportunities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-muted-foreground">
          <p>© {currentYear} Shanmukh Vutikuri. All rights reserved.</p>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-primary" />
              IST: <span className="font-semibold text-foreground">{istTime}</span>
            </span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-foreground transition-colors cursor-pointer text-xs font-mono"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            <span>Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};