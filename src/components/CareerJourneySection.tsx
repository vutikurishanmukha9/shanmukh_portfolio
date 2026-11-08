import React from 'react';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { Calendar, MapPin } from 'lucide-react';
import { BlurFade } from '@/components/magicui/blur-fade';

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
    <SectionWrapper id="career" className="py-20 sm:py-28 md:py-32 border-t border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* Section Header */}
        <BlurFade delay={0.05} inView>
          <div className="max-w-2xl mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-muted/60 text-xs font-mono font-medium text-foreground mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>PROFESSIONAL EXPERIENCE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground font-display leading-[1.12]">
              Career Milestones
            </h2>
            <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed max-w-[62ch]">
              Hands-on technical internships building data intelligence, cloud automation, and analytics pipelines.
            </p>
          </div>
        </BlurFade>

        {/* Minimalist Timeline Stack with Magic UI BlurFade */}
        <div className="relative border-l border-border pl-6 sm:pl-8 ml-3 sm:ml-4 space-y-10 sm:space-y-12">
          {experiences.map((exp, index) => (
            <BlurFade
              key={`${exp.title}-${exp.company}`}
              delay={0.1 + index * 0.08}
              inView
              className="relative"
            >
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-4 w-3.5 h-3.5 rounded-full bg-background border-2 border-primary z-10" />

              {/* Experience Card (Double-Bezel Hardware Enclosure) */}
              <div className="p-1.5 rounded-[1.5rem] border border-border/80 bg-muted/20 shadow-xs hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="p-6 rounded-[1.375rem] border border-border bg-card shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
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
                      className="px-2.5 py-0.5 text-xs font-mono rounded-md bg-muted/40 text-muted-foreground border border-border/50 hover:text-foreground transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </BlurFade>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
};
