import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { Award, CheckCircle2, ShieldCheck } from 'lucide-react';

interface Certification {
  title: string;
  issuer: string;
  description: string;
  category: string;
  credentialId: string;
  year: string;
}

const certifications: Certification[] = [
  {
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    description: 'Cloud architecture fundamentals, core AWS microservices, security protocols, and cost management.',
    category: 'Cloud Computing',
    credentialId: 'AWS-CCP-9842',
    year: '2024',
  },
  {
    title: 'Oracle Certified AI Foundations Associate',
    issuer: 'Oracle',
    description: 'Machine learning algorithms, deep learning neural networks, and generative AI foundations.',
    category: 'Artificial Intelligence',
    credentialId: 'ORA-AI-7721',
    year: '2024',
  },
  {
    title: 'Oracle Certified Foundations Associate',
    issuer: 'Oracle',
    description: 'Oracle Cloud Infrastructure (OCI) services, identity & access management, and cloud networking.',
    category: 'Cloud & Database',
    credentialId: 'ORA-FND-4389',
    year: '2024',
  },
  {
    title: 'IBM Data Analysis with Python',
    issuer: 'IBM',
    description: 'Data wrangling, exploratory data analysis with Pandas and NumPy, and predictive modeling with Scikit-learn.',
    category: 'Data Analysis',
    credentialId: 'IBM-DA-5541',
    year: '2024',
  },
  {
    title: 'IBM SQL for Data Science',
    issuer: 'IBM',
    description: 'Relational database schema querying, complex joins, stored procedures, and query performance tuning.',
    category: 'Database & SQL',
    credentialId: 'IBM-SQL-3219',
    year: '2024',
  },
  {
    title: 'IBM Python for Data Science',
    issuer: 'IBM',
    description: 'Python computational programming, data structures, functional paradigms, and API integration.',
    category: 'Programming',
    credentialId: 'IBM-PY-8802',
    year: '2024',
  },
];

export const CertificationsSection = () => {
  return (
    <SectionWrapper id="certifications" className="py-10 sm:py-12 bg-muted/10 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-medium text-foreground mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>Accreditations</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
          >
            Verified Certifications
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-muted-foreground text-base leading-relaxed"
          >
            Industry certifications from AWS, Oracle, and IBM demonstrating verified cloud, AI, and data competencies.
          </motion.p>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="p-5 sm:p-6 rounded-2xl border border-border bg-card shadow-xs hover:border-primary/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 whitespace-nowrap shrink-0">
                    <CheckCircle2 className="w-3 h-3 shrink-0" />
                    <span>Verified</span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">{cert.year}</span>
                </div>

                <div>
                  <div className="text-xs font-medium text-primary">
                    {cert.issuer}
                  </div>
                  <h3 className="text-base font-bold text-foreground mt-0.5 leading-snug">
                    {cert.title}
                  </h3>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-border flex items-center justify-between gap-2 text-[11px] font-mono text-muted-foreground">
                <span className="truncate">{cert.category}</span>
                <span className="font-semibold text-foreground whitespace-nowrap shrink-0">{cert.credentialId}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
};