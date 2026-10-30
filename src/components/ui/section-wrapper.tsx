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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
            className={cn("py-12 sm:py-16 relative scroll-mt-20 sm:scroll-mt-24", className)}
            {...props}
        >
            {children}
        </motion.section>
    );
};
