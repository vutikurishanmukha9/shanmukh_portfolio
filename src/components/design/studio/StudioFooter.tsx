import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Terminal, Mail, Github, Linkedin, ArrowUp } from 'lucide-react';

export const StudioFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t-3 border-[#0A0A0A] bg-[#FFFFFF] text-[#0A0A0A] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8 sm:space-y-10">
        
        {/* Giant Typographic Signoff */}
        <div className="space-y-4">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0A0A0A]/60 block">
            CALL TO COLLABORATION
          </span>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-5xl lg:text-7xl font-black text-[#0A0A0A] tracking-tighter uppercase leading-none break-words">
            LET'S BUILD SOMETHING <span className="underline decoration-[#FFD84D] decoration-8">OBVIOUS.</span>
          </h2>
          <p className="font-['Inter'] text-base sm:text-lg text-[#0A0A0A]/80 max-w-2xl">
            Available for product design leadership, design systems architecture, and high-impact design engineering contracts.
          </p>
        </div>

        {/* Major Cross-Switch Banner: Return to Developer Portfolio */}
        <div className="p-4 sm:p-6 bg-[#E3E6E8] border-3 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[6px_6px_0px_#0A0A0A] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#FFD84D] border border-[#0A0A0A] uppercase inline-block">
              TWO SIDES OF THE SAME MIND
            </span>
            <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-black text-[#0A0A0A] uppercase">
              VISIT THE DEVELOPER PORTFOLIO
            </h3>
            <p className="text-xs font-mono text-[#0A0A0A]/70">
              Explore the raw infrastructure, telemetry engine, RAG pipeline, and code benchmarks.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0A0A0A] text-[#E3E6E8] hover:bg-[#FFD84D] hover:text-[#0A0A0A] font-mono font-bold text-xs uppercase tracking-wider border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#FFD84D] transition-all cursor-pointer"
          >
            <Terminal className="w-4 h-4" />
            <span>OPEN SYSTEM OPERATOR [DEV]</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Directory Links & Socials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-6 border-t-2 border-[#0A0A0A]">
          {/* Col 1: Identity */}
          <div className="space-y-2">
            <span className="font-['Space_Grotesk'] text-lg font-black tracking-tight block">
              SHANMUKH
            </span>
            <p className="text-xs font-mono text-[#0A0A0A]/70 leading-normal">
              DESIGN / PRODUCT / INTERACTION
              <br />
              EST. 2026 · DIGITAL STUDIO
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2 font-mono text-xs">
            <span className="font-bold uppercase tracking-wider text-[#0A0A0A]/50 block">
              STUDIO INDEX
            </span>
            <ul className="space-y-1.5 font-bold">
              <li>
                <a href="#studio-work" className="hover:text-[#FF6B57] transition-colors">
                  01 // WORK
                </a>
              </li>
              <li>
                <a href="#studio-lab" className="hover:text-[#5B8CFF] transition-colors">
                  02 // LAB // 001
                </a>
              </li>
              <li>
                <a href="#studio-design-code" className="hover:text-[#FFD84D] transition-colors">
                  03 // DESIGN × CODE
                </a>
              </li>
              <li>
                <a href="#studio-system" className="hover:text-[#63D6A0] transition-colors">
                  04 // SYSTEM // LIVE
                </a>
              </li>
              <li>
                <a href="#studio-about" className="hover:text-[#0A0A0A] transition-colors">
                  05 // ABOUT
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Network */}
          <div className="space-y-2 font-mono text-xs">
            <span className="font-bold uppercase tracking-wider text-[#0A0A0A]/50 block">
              EXTERNAL NETWORK
            </span>
            <ul className="space-y-1.5 font-bold">
              <li>
                <a
                  href="https://github.com/vutikurishanmukha9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#FF6B57] transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GITHUB</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/shanmukha-vutikuri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#5B8CFF] transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LINKEDIN</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:vutikurishanmukh17@gmail.com"
                  className="inline-flex items-center gap-1 hover:text-[#63D6A0] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>EMAIL DIRECT</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Top Action */}
          <div className="space-y-4 sm:space-y-2 text-left sm:text-right flex flex-col justify-between items-start sm:items-end">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#E3E6E8] hover:bg-[#FFD84D] border-2 border-[#0A0A0A] font-mono text-xs font-bold uppercase shadow-[2px_2px_0px_#0A0A0A] transition-all cursor-pointer"
            >
              <span>BACK TO APEX</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>

            <span className="font-mono text-[10px] text-[#0A0A0A]/60">
              © 2026 VUTIKURI SHANMUKHA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
