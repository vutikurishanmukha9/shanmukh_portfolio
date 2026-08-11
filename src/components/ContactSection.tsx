import { ContactForm } from '@/components/ContactForm';
import { Github, Linkedin, Mail, ExternalLink, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { Magnetic } from '@/components/ui/Magnetic';
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
    <div className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg border-[0.5px] border-border bg-background/40 hover:bg-background/80 transition-colors duration-200 shadow-none">
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-9 h-9 shrink-0 rounded-full bg-muted/60 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-200">
          <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] sm:text-[9px] font-mono tracking-widest text-muted-foreground uppercase mb-0.5">{contact.label}</p>
          <a
            href={contact.href}
            className="text-xs font-mono text-foreground hover:text-primary transition-colors duration-200 break-all"
          >
            {contact.value}
          </a>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCopy}
        className={cn(
          "px-3 py-1.5 rounded-full text-[9px] font-mono uppercase tracking-wider border-[0.5px] transition-all flex items-center gap-1.5 self-end sm:self-auto shrink-0",
          copied 
            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 font-semibold"
            : "bg-background/80 text-muted-foreground hover:text-foreground border-border hover:border-primary/40"
        )}
      >
        {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3 text-primary" />}
        <span>{copied ? "COPIED" : "COPY"}</span>
      </motion.button>
    </div>
  );
};

export const ContactSection = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
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

  return (
    <SectionWrapper id="contact" className="py-16 bg-background border-t-[0.5px] border-border/40">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border-[0.5px] border-border/80 shadow-none mb-4"
          >
            <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">Connect</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-serif-display font-medium tracking-tight text-foreground select-none"
          >
            Get In Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-muted-foreground text-xs max-w-md mx-auto leading-relaxed"
          >
            Ready to collaborate on engineering solutions. Let's discuss how we can build something of robust value.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="h-full"
          >
            <div className="relative border-[0.5px] border-border/80 bg-card/60 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-none h-full flex flex-col justify-between overflow-hidden group">
              {/* Apple / VisionOS Specular Top Highlight Ray */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent transition-all duration-500 group-hover:via-primary/80 group-hover:h-[1.5px] z-20" />

              {/* Ambient Directional Light Bloom */}
              <div className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 w-3/4 h-14 bg-gradient-to-b from-primary/15 via-primary/5 to-transparent blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

              <div className="relative z-10">
                <h3 className="text-xl font-serif-display font-medium text-foreground mb-3 tracking-tight">Let's Connect</h3>
                <p className="text-muted-foreground text-xs leading-relaxed mb-8">
                  I am always motivated to discuss technical opportunities, innovative cloud architectures, and potential open-source collaborations.
                  Drop a message or reach out via email directly.
                </p>

                {/* Contact Details */}
                <div className="space-y-3 mb-8">
                  {contactInfo.map((contact, index) => (
                    <ContactCard key={index} contact={contact} />
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="relative z-10">
                <p className="text-[10px] sm:text-[9px] font-mono tracking-widest text-muted-foreground uppercase mb-3">Social Profiles</p>
                <div className="flex gap-2">
                  {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <Magnetic key={social.name} strength={0.35} radius={80}>
                          <a
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group p-3 rounded border-[0.5px] border-border bg-background/40 hover:bg-background/80 hover:border-primary/35 transition-colors duration-200 shadow-none block"
                              title={social.name}
                              aria-label={social.name}
                          >
                              <Icon className="h-4.5 w-4.5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                          </a>
                        </Magnetic>
                      );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col h-full"
          >
            <div className="relative border-[0.5px] border-border/80 bg-card/60 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-none h-full overflow-hidden group"> 
                {/* Apple / VisionOS Specular Top Highlight Ray */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent transition-all duration-500 group-hover:via-primary/80 group-hover:h-[1.5px] z-20" />

                {/* Ambient Directional Light Bloom */}
                <div className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 w-3/4 h-14 bg-gradient-to-b from-primary/15 via-primary/5 to-transparent blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                <div className="relative z-10">
                  <h3 className="text-xl font-serif-display font-medium text-foreground mb-6 tracking-tight border-b-[0.5px] border-border/40 pb-4">
                    Send a Message
                  </h3>
                  <ContactForm />
                </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};
