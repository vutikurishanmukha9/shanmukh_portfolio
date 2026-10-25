import { ContactForm } from '@/components/ContactForm';
import { Github, Linkedin, Mail, ExternalLink, Copy, Check, MessageSquare, MapPin } from 'lucide-react';
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
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl border border-border bg-muted/40 transition-colors hover:border-zinc-300 dark:hover:border-zinc-700">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 shrink-0 rounded-lg border border-border bg-card flex items-center justify-center text-foreground font-bold shadow-xs">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-mono font-medium text-muted-foreground uppercase">{contact.label}</p>
          <a
            href={contact.href}
            className="text-xs sm:text-sm font-mono font-semibold text-foreground hover:text-primary transition-colors break-all"
          >
            {contact.value}
          </a>
        </div>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          "px-3 py-1.5 text-xs font-mono font-medium rounded-lg border border-border transition-all flex items-center gap-1.5 self-end sm:self-auto shrink-0 cursor-pointer shadow-xs",
          copied
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            : "bg-card text-foreground hover:bg-muted"
        )}
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5 text-muted-foreground" />}
        <span>{copied ? "Copied" : "Copy"}</span>
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
    <SectionWrapper id="contact" className="py-10 sm:py-12 bg-background border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card text-muted-foreground text-xs font-mono mb-4 shadow-xs"
          >
            <MessageSquare className="size-3.5 text-primary" />
            <span>Direct Communication</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl font-head font-bold tracking-tight text-foreground"
          >
            Let's build something enduring.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-muted-foreground text-sm sm:text-base font-sans max-w-lg mx-auto leading-relaxed"
          >
            Open for full-time engineering roles, backend systems architecture, and applied AI/ML pipelines.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {/* Contact Details Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col h-full"
          >
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    <h3 className="text-base font-head font-semibold text-foreground">
                      Communication Channels
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 whitespace-nowrap shrink-0">
                    Active & Responding
                  </span>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-sans">
                  Whether you are hiring for a software engineering role, discussing distributed RAG architectures, or reviewing production telemetry systems, I welcome thoughtful technical conversations.
                </p>

                {/* Direct Contact Cards */}
                <div className="space-y-3 mb-8">
                  {contactInfo.map((contact) => (
                    <ContactCard key={contact.label} contact={contact} />
                  ))}
                </div>

                {/* Location & Schedule Card */}
                <div className="p-4 rounded-xl border border-border bg-muted/40 mb-6">
                  <div className="flex items-center gap-2 text-xs font-mono font-medium text-foreground mb-1">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Location & Availability</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                    Hyderabad, India (IST / UTC+5:30) • Available for hybrid, on-site, or remote engineering teams worldwide.
                  </p>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="pt-6 border-t border-border">
                <p className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Verified Profiles
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
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border bg-card hover:bg-muted text-foreground hover:text-primary font-mono text-xs font-medium shadow-xs transition-colors"
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col h-full"
          >
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                  <h3 className="text-base font-head font-semibold text-foreground">
                    Send a Message
                  </h3>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    Direct to Inbox
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
