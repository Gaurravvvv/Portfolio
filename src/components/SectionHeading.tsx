import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../constants/animations';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export default function SectionHeading({ title, subtitle, children }: SectionHeadingProps) {
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
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          variants={fadeInUp}
          className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
      {children}
    </motion.div>
  );
}
