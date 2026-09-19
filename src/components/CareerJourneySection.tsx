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
        <SectionWrapper id="career" className="py-16 bg-muted/20 border-b-2 border-black">
            <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={containerRef}>
                {/* Header */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 border-2 border-black bg-primary text-black font-head text-xs font-bold uppercase shadow-xs mb-4"
                    >
                        <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                        <span>Experience</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 }}
                        className="text-4xl md:text-5xl font-head font-bold tracking-tight text-foreground uppercase select-none"
                    >
                        Career Timeline
                    </motion.h2>
                </div>

                {/* Neobrutalist Milestone Ledger Container */}
                <div className="relative max-w-4xl mx-auto border-2 border-black bg-card rounded-none overflow-hidden shadow-[6px_6px_0px_#000]">
                    <div className="relative z-10 divide-y-2 divide-black">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={`${exp.title}-${exp.company}`}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                className="p-4 sm:p-6 md:p-8 flex flex-col md:grid md:grid-cols-[1.3fr_2.5fr_1.2fr] gap-6 items-start hover:bg-primary/5 transition-colors duration-150"
                            >
                                {/* Left: Period & Location */}
                                <div className="flex flex-col gap-1.5">
                                    <span className="text-[11px] font-head font-bold tracking-wider text-black bg-primary px-2 py-0.5 border border-black uppercase shadow-xs inline-block w-fit">
                                        {exp.period}
                                    </span>
                                    <span className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground font-semibold">
                                        {exp.location}
                                    </span>
                                </div>

                                {/* Middle: Title, Company, Description */}
                                <div className="space-y-2">
                                    <h3 className="text-base sm:text-lg font-head font-bold text-foreground leading-tight uppercase">
                                        {exp.title}
                                    </h3>
                                    <div className="text-xs font-mono uppercase tracking-wider text-foreground font-bold">
                                        @{exp.company}
                                    </div>
                                    <p className="text-foreground text-xs leading-relaxed max-w-xl font-normal">
                                        {exp.description}
                                    </p>
                                </div>

                                {/* Right: Skills Tags */}
                                <div className="flex flex-wrap gap-1.5 md:justify-end w-full">
                                    {exp.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-2 py-0.5 bg-muted/60 border-2 border-black text-[10px] font-head font-medium text-foreground shadow-xs"
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

