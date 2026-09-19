import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send, Loader2 } from 'lucide-react';

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to Netlify Forms
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          ...formData,
        }).toString(),
      });

      if (response.ok) {
        toast({
          title: 'Message Sent!',
          description: 'Thank you for reaching out. I will get back to you soon.',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again or email me directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Hidden fields for Netlify */}
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Don't fill this out if you're human: <input name="bot-field" />
        </label>
      </p>

      <div className="space-y-1.5">
        <label htmlFor="name" className="text-[10px] font-head font-bold tracking-wider text-muted-foreground uppercase">
          01 // Full Name
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Satoshi Nakamoto"
          required
          className="border-2 border-black bg-card text-foreground font-mono focus:bg-white focus:outline-none rounded-none shadow-xs text-xs h-10 px-3"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="email" className="text-[10px] font-head font-bold tracking-wider text-muted-foreground uppercase">
          02 // Email Address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@organization.com"
          required
          className="border-2 border-black bg-card text-foreground font-mono focus:bg-white focus:outline-none rounded-none shadow-xs text-xs h-10 px-3"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="subject" className="text-[10px] font-head font-bold tracking-wider text-muted-foreground uppercase">
          03 // Subject Matter
        </label>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Project Inquiry / Engineering Role"
          required
          className="border-2 border-black bg-card text-foreground font-mono focus:bg-white focus:outline-none rounded-none shadow-xs text-xs h-10 px-3"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="text-[10px] font-head font-bold tracking-wider text-muted-foreground uppercase">
          04 // Message Body
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Describe project requirements, tech stack specs, or timeline..."
          required
          rows={4}
          className="border-2 border-black bg-card text-foreground font-mono focus:bg-white focus:outline-none rounded-none shadow-xs text-xs resize-none p-3"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 border-2 border-black bg-primary text-black font-head font-bold uppercase text-xs shadow-[4px_4px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none rounded-none flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-black" />
            <span>DISPATCHING...</span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4 text-black" />
            <span>TRANSMIT_MESSAGE()</span>
          </>
        )}
      </button>
    </form>
  );
};