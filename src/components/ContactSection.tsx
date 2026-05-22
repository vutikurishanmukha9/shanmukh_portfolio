import { ContactForm } from '@/components/ContactForm';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';

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
    <SectionWrapper id="contact" className="py-24 bg-background border-t-[0.5px] border-border/40">
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
            <div className="border-[0.5px] border-border bg-card/60 backdrop-blur-md rounded-lg p-6 md:p-8 shadow-none h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-serif-display font-medium text-foreground mb-3 tracking-tight">Let's Connect</h3>
                <p className="text-muted-foreground text-xs leading-relaxed mb-8">
                  I am always motivated to discuss technical opportunities, innovative cloud architectures, and potential open-source collaborations.
                  Drop a message or reach out via email directly.
                </p>

                {/* Contact Details */}
                <div className="space-y-3 mb-8">
                  {contactInfo.map((contact, index) => {
                      const Icon = contact.icon;
                      return (
                          <div
                              key={index}
                              className="group flex items-center gap-4 p-4 rounded border-[0.5px] border-border bg-background/40 hover:bg-background/80 transition-colors duration-200 shadow-none"
                          >
                              <div className="w-9 h-9 rounded bg-muted/60 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-200">
                                  <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                              </div>
                              <div>
                                  <p className="text-[9px] font-mono tracking-widest text-muted-foreground uppercase mb-0.5">{contact.label}</p>
                                  {contact.href !== '#' ? (
                                  <a
                                      href={contact.href}
                                      className="text-xs font-mono text-foreground hover:text-primary transition-colors duration-200 break-all"
                                  >
                                      {contact.value}
                                  </a>
                                  ) : (
                                  <p className="text-xs font-mono text-foreground">{contact.value}</p>
                                  )}
                              </div>
                          </div>
                      )
                  })}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-[9px] font-mono tracking-widest text-muted-foreground uppercase mb-3">Social Profiles</p>
                <div className="flex gap-2">
                  {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group p-3 rounded border-[0.5px] border-border bg-background/40 hover:bg-background/80 hover:border-primary/35 transition-colors duration-200 shadow-none"
                            title={social.name}
                        >
                            <Icon className="h-4.5 w-4.5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                        </a>
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
            <div className="border-[0.5px] border-border bg-card/60 backdrop-blur-md rounded-lg p-6 md:p-8 shadow-none h-full"> 
                <h3 className="text-xl font-serif-display font-medium text-foreground mb-6 tracking-tight border-b-[0.5px] border-border/40 pb-4">
                  Send a Message
                </h3>
                <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};