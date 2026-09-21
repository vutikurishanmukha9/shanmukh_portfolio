import { ContactForm } from '@/components/ContactForm';
import { Github, Linkedin, Mail, ExternalLink, Copy, Check, MessageSquare, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';

const ContactCard = ({ contact }: { contact: { icon: LucideIcon; label: string; value: string; href: string } }) => {
  const Icon = contact.icon;
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(contact.value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-2 border-black bg-card shadow-[4px_4px_0px_#000] rounded-none transition-shadow duration-200 hover:shadow-[6px_6px_0px_#000]">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 shrink-0 border-2 border-black bg-primary flex items-center justify-center text-black font-bold shadow-none rounded-none">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-head font-bold tracking-wider text-muted-foreground uppercase">{contact.label}</p>
          <a
            href={contact.href}
            className="text-xs font-mono font-bold text-foreground hover:underline transition-colors break-all"
          >
            {contact.value}
          </a>
        </div>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          "px-3 py-1.5 text-[10px] font-head font-bold uppercase tracking-wider border-2 border-black transition-all flex items-center gap-1.5 self-end sm:self-auto shrink-0 cursor-pointer shadow-xs active:translate-x-0.5 active:translate-y-0.5",
          copied
            ? "bg-emerald-400 text-black font-bold"
            : "bg-muted text-foreground hover:bg-primary"
        )}
      >
        {copied ? <Check className="h-3 w-3 text-black stroke-[3]" /> : <Copy className="h-3 w-3" />}
        <span>{copied ? "COPIED" : "COPY"}</span>
      </button>
    </div>
  );
};

const contactInfo = [
  {
    icon: Mail,
    label: 'Direct Email',
    value: 'vutikurishanmukh17@gmail.com',
    href: 'mailto:vutikurishanmukh17@gmail.com',
  },
];

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/vutikurishanmukha9',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/shanmukha-vutikuri',
    icon: Linkedin,
  },
  {
    name: 'LeetCode',
    url: 'https://leetcode.com/u/vutikurishanmukh9/',
    icon: ExternalLink,
  },
];

export const ContactSection = () => {
  return (
    <SectionWrapper id="contact" className="py-20 bg-background border-b-2 border-black">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 border-2 border-black bg-primary text-black text-xs font-head font-bold uppercase shadow-[2px_2px_0px_#000] mb-4"
          >
            <MessageSquare className="size-3.5" />
            <span>06 // CONNECT & COLLABORATE</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl font-head font-bold uppercase tracking-tight text-foreground select-none"
          >
            LET'S BUILD TOGETHER
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-muted-foreground text-xs sm:text-sm font-sans font-medium max-w-md mx-auto leading-relaxed"
          >
            Open for full-time engineering roles, high-throughput backend systems, and applied AI/ML architectures.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto items-stretch">
          {/* Contact Information Column */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col h-full"
          >
            <div className="border-2 border-black bg-card p-4 sm:p-8 shadow-[6px_6px_0px_#000] rounded-none h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Terminal className="size-4 text-black" />
                    <h3 className="text-base sm:text-lg font-head font-bold uppercase text-foreground tracking-wide">
                      OPERATOR_CHANNELS
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-primary px-2 py-0.5 border border-black text-black">
                    ACTIVE
                  </span>
                </div>

                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                  Motivated to discuss technical opportunities, cloud telemetry pipelines, vector database architectures, and production-grade fullstack systems.
                </p>

                {/* Contact Details */}
                <div className="space-y-3 mb-8">
                  {contactInfo.map((contact) => (
                    <ContactCard key={contact.label} contact={contact} />
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t-2 border-black">
                <p className="text-[10px] font-head font-bold tracking-wider text-muted-foreground uppercase mb-3">
                  AUTHENTICATED PROFILES
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3.5 py-2 border-2 border-black bg-card hover:bg-primary text-foreground hover:text-black font-head font-bold text-xs uppercase shadow-[3px_3px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                        title={social.name}
                        aria-label={social.name}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{social.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col h-full"
          >
            <div className="border-2 border-black bg-card p-4 sm:p-8 shadow-[6px_6px_0px_#000] rounded-none h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-6">
                  <h3 className="text-base sm:text-lg font-head font-bold uppercase text-foreground tracking-wide">
                    DISPATCH_MESSAGE
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-muted-foreground">
                    ENDPOINT: /api/v1/inbox
                  </span>
                </div>
                <ContactForm />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};
