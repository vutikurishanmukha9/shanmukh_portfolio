import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionWrapperProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    id?: string;
    delay?: number;
}

export const SectionWrapper = ({ children, className, id, delay = 0, ...props }: SectionWrapperProps) => {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
            className={cn("py-10 lg:py-16 relative", className)}
            {...props}
        >
            {children}
        </motion.section>
    );
};
