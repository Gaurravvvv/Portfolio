import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../constants/animations';
import { useTerminal } from '../hooks/useTerminal';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export default function SectionHeading({ title, subtitle, children }: SectionHeadingProps) {
  const { isTerminalOpen } = useTerminal();

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="mb-10 sm:mb-12 md:mb-16"
    >
      <motion.h1
        variants={fadeInUp}
        className={`font-bold text-gray-900 dark:text-white tracking-tight ${
          isTerminalOpen 
            ? 'text-xl sm:text-2xl md:text-3xl lg:text-4xl' 
            : 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl'
        }`}
      >
        <span className="text-accent font-normal mr-2 sm:mr-3 select-none opacity-80">$</span>
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          variants={fadeInUp}
          className={`mt-3 sm:mt-4 text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed ${
            isTerminalOpen ? 'text-xs sm:text-sm md:text-base' : 'text-sm sm:text-base md:text-lg'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
      {children}
    </motion.div>
  );
}
