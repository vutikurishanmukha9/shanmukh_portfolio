import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

type Experience = {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  skills: string[];
  current?: boolean;
};

const experiences: Experience[] = [
  {
    title: 'Data Analytics Intern',
    company: 'Codegnan IT Solutions',
    location: 'Hyderabad, India',
    period: 'June 2025 – Feb 2026',
    description: 'Executed advanced exploratory data analysis and built business intelligence infrastructure under Sr. Data Science leadership. Designed dynamic Power BI dashboards analyzing 1,074 Global Unicorn startups and engineered multi-region retail sales optimization models.',
    skills: ['Python', 'MySQL', 'Power BI', 'Statistics', 'EDA', 'Snowflake', 'Data Modeling'],
  },
  {
    title: 'Cloud Computing Engineering Intern',
    company: 'EXCELr EdTech',
    location: 'Remote',
    period: 'Dec 2024 – Apr 2025',
    description: 'Configured cloud-native deployment logic, orchestrated automated container pipelines using Docker, and managed cloud infrastructure integration with AWS services.',
    skills: ['AWS', 'Cloud Architecture', 'DevOps', 'Docker', 'Automation'],
  },
  {
    title: 'Cloud Engineering Intern',
    company: 'Brain O Vision',
    location: 'Remote',
    period: 'June 2024 – Aug 2024',
    description: 'Designed cloud infrastructure topologies, provisioned core AWS compute/storage resources, and automated administrative maintenance tasks via Python scripts.',
    skills: ['AWS', 'Python', 'Cloud Computing', 'Linux', 'Automation'],
  },
];

export const CareerJourneySection = () => {
  return (
    <SectionWrapper id="career" className="py-10 sm:py-12 border-t border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/60 text-xs font-medium text-foreground mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>Professional Experience</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
          >
            Career Milestones
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-muted-foreground text-base leading-relaxed"
          >
            Hands-on technical internships building data intelligence, cloud automation, and analytics pipelines.
          </motion.p>
        </div>

        {/* Minimalist Timeline Stack */}
        <div className="relative border-l border-border pl-6 sm:pl-8 ml-3 sm:ml-4 space-y-10 sm:space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.title}-${exp.company}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="relative"
            >
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-background border-2 border-primary" />

              {/* Experience Card */}
              <div className="p-6 rounded-2xl border border-border bg-card shadow-xs hover:border-primary/40 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {exp.title}
                    </h3>
                    <div className="text-sm font-semibold text-primary mt-0.5">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>

                {/* Skills Badges */}
                <div className="mt-4 pt-3.5 border-t border-border flex flex-wrap gap-1.5">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-0.5 text-xs font-medium rounded-md bg-muted/60 text-foreground border border-border/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
};
