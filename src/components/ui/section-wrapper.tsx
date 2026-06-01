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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay, ease: "easeOut" }}
            className={cn("py-10 lg:py-16 relative", className)}
            {...props}
        >
            {children}
        </motion.section>
    );
};
