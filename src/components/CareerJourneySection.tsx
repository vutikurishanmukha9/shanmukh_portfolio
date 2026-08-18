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
    {
        title: 'Data Analytics Intern',
        company: 'Codegnan IT Solutions',
        location: 'Hyderabad',
        period: 'June 2025 – Feb 2026',
        description: 'Mastered advanced data analytics workflows under Sr. Data Science Lead Mr. Puneet Kansal and translated them into production-ready solutions. Built and deployed a dynamic Exploratory Data Analysis dashboard on Global Unicorn Companies using Power BI, and engineered multi-region sales analytics reports to drive business decisions.',
        skills: ['Python', 'MySQL', 'Power BI', 'Statistics', 'EDA', 'Excel', 'Snowflake'],
        current: false,
    },
];

export const CareerJourneySection = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <SectionWrapper id="career" className="py-16 bg-muted/20 border-b-[0.5px] border-border/40">
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

                {/* Apple-Grade Specular Hardware Enclosure */}
                <div className="relative max-w-4xl mx-auto border-[0.5px] border-border/80 bg-card/60 backdrop-blur-md rounded-xl overflow-hidden shadow-none group">
                    {/* Apple / VisionOS Specular Top Highlight Ray */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent transition-opacity duration-500 group-hover:via-primary/80 group-hover:h-[1.5px] z-20" />

                    {/* Ambient Directional Light Bloom */}
                    <div className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 w-3/4 h-14 bg-gradient-to-b from-primary/15 via-primary/5 to-transparent blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                    <div className="relative z-10 divide-y divide-border/60">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={`${exp.title}-${exp.company}`}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                className="p-6 md:p-8 flex flex-col md:grid md:grid-cols-[1.25fr_2.5fr_1.25fr] gap-6 items-start hover:bg-card/90 transition-colors duration-200"
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
                                    {exp.skills.map((skill) => (
                                        <span
                                            key={skill}
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

