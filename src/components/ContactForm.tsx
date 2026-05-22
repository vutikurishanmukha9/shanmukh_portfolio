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
    } catch (error) {
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
        <label htmlFor="name" className="text-[9px] font-mono tracking-widest text-muted-foreground uppercase">
          Name
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          required
          className="bg-transparent border-[0.5px] border-border/80 focus:border-primary focus:ring-[0.5px] focus:ring-primary/30 transition-all rounded px-3 py-4 text-xs font-sans h-9"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="email" className="text-[9px] font-mono tracking-widest text-muted-foreground uppercase">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          required
          className="bg-transparent border-[0.5px] border-border/80 focus:border-primary focus:ring-[0.5px] focus:ring-primary/30 transition-all rounded px-3 py-4 text-xs font-sans h-9"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="subject" className="text-[9px] font-mono tracking-widest text-muted-foreground uppercase">
          Subject
        </label>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="What is this about?"
          required
          className="bg-transparent border-[0.5px] border-border/80 focus:border-primary focus:ring-[0.5px] focus:ring-primary/30 transition-all rounded px-3 py-4 text-xs font-sans h-9"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="text-[9px] font-mono tracking-widest text-muted-foreground uppercase">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about your project..."
          required
          rows={4}
          className="bg-transparent border-[0.5px] border-border/80 focus:border-primary focus:ring-[0.5px] focus:ring-primary/30 transition-all rounded px-3 py-2.5 text-xs font-sans resize-none"
        />
      </div>

      <Button
        type="submit"
        className="w-full h-9 rounded bg-foreground text-background hover:bg-foreground/90 transition-colors duration-200 font-mono text-[10px] tracking-widest uppercase shadow-none group"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-3.5 w-3.5 mr-2 transition-transform duration-200" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
};