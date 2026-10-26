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
          title: 'Message Sent Successfully',
          description: 'Thank you for reaching out. I will get back to you shortly.',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch {
      toast({
        title: 'Submission Issue',
        description: 'Failed to send message via form. Please email directly at vutikurishanmukh17@gmail.com',
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
      className="space-y-4"
    >
      {/* Hidden fields for Netlify */}
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Don't fill this out if you're human: <input name="bot-field" />
        </label>
      </p>

      <div className="space-y-1.5">
        <label htmlFor="name" className="text-xs font-mono font-medium text-foreground">
          Full Name
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Alex Morgan"
          required
          className="rounded-xl border border-border bg-card text-foreground text-sm h-10 px-3.5"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="email" className="text-xs font-mono font-medium text-foreground">
          Email Address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="alex@company.com"
          required
          className="rounded-xl border border-border bg-card text-foreground text-sm h-10 px-3.5"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="subject" className="text-xs font-mono font-medium text-foreground">
          Subject
        </label>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Engineering role / technical collaboration"
          required
          className="rounded-xl border border-border bg-card text-foreground text-sm h-10 px-3.5"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="text-xs font-mono font-medium text-foreground">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about your team, system challenges, or project requirements..."
          required
          rows={4}
          className="rounded-xl border border-border bg-card text-foreground text-sm resize-none p-3.5"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group/btn w-full h-11 rounded-full bg-primary hover:bg-primary-hover text-primary-foreground font-sans font-medium text-sm flex items-center justify-center gap-2.5 cursor-pointer transition-all mt-2 shadow-xs"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Sending message...</span>
          </>
        ) : (
          <>
            <span>Send Direct Message</span>
            <span className="w-6 h-6 rounded-full bg-black/15 dark:bg-white/20 flex items-center justify-center transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 shrink-0">
              <Send className="h-3.5 w-3.5" />
            </span>
          </>
        )}
      </button>
    </form>
  );
};