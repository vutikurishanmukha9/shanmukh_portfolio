import { useRef } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';

type Experience = {
    title: string;
    company: string;
    location: string;
    period: string;
    description: string;
    skills: string[];
    current: boolean;
};

export const CareerJourneySection = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const experiences: Experience[] = [
        {
            title: 'Cloud Engineering Intern',
            company: 'Brain O Vision',
            location: 'Remote',
            period: 'June 2024 – Aug 2024',
            description: 'Worked on cloud infrastructure projects, designed cloud deployment architectures, and gained hands-on expertise with AWS services.',
            skills: ['Cloud Computing', 'Python', 'AWS', 'Automation'],
            current: false,
        },
        {
            title: 'Cloud Computing Engineering Intern',
            company: 'EXCELr EdTech',
            location: 'Remote',
            period: 'Dec 2024 – Apr 2025',
            description: 'Assisted in deploying cloud-native architectures, configured CI/CD deployment logic, and automated container orchestration pipelines.',
            skills: ['AWS', 'Cloud Architecture', 'DevOps', 'Docker'],
            current: false,
        },
    ];

    return (
        <SectionWrapper id="career" className="py-24 bg-muted/20 border-b-[0.5px] border-border/40">
            <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={containerRef}>
                {/* Header */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border-[0.5px] border-border/80 shadow-none mb-4"
                    >
                        <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">Experience</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 }}
                        className="text-4xl md:text-5xl font-serif-display font-medium tracking-tight text-foreground select-none"
                    >
                        Career Timeline
                    </motion.h2>
                </div>

                {/* Cohere-Inspired Tabular Rows */}
                <div className="max-w-4xl mx-auto border-[0.5px] border-border bg-card/60 backdrop-blur-md rounded-lg overflow-hidden shadow-none">
                    <div className="divide-y divide-border/60">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                className="p-6 md:p-8 flex flex-col md:grid md:grid-cols-[1.25fr_2.5fr_1.25fr] gap-6 items-start hover:bg-background/20 transition-colors duration-200"
                            >
                                {/* Left: Period & Location */}
                                <div className="flex flex-col gap-1">
                                    <span className="text-[11px] font-mono font-medium tracking-wider text-primary uppercase">
                                        {exp.period}
                                    </span>
                                    <span className="text-[9px] font-mono tracking-widest uppercase text-muted-foreground">
                                        {exp.location}
                                    </span>
                                </div>

                                {/* Middle: Title, Company, Description */}
                                <div className="space-y-1.5">
                                    <h3 className="text-base font-serif-display font-medium text-foreground leading-tight">
                                        {exp.title}
                                    </h3>
                                    <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                                        {exp.company}
                                    </div>
                                    <p className="text-muted-foreground text-xs leading-relaxed max-w-xl">
                                        {exp.description}
                                    </p>
                                </div>

                                {/* Right: Skills Tags */}
                                <div className="flex flex-wrap gap-1 md:justify-end w-full">
                                    {exp.skills.map((skill, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-0.5 rounded bg-background/50 border-[0.5px] border-border/80 text-[9px] font-mono text-muted-foreground"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};

