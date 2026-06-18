import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, ChevronDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/icons';
import AnimatedTyping from '../components/AnimatedTyping';
import { SITE, ROLES } from '../constants/data';
import { staggerContainer, fadeInUp, fadeIn } from '../constants/animations';

export default function HomeSection() {
  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-[100dvh] flex flex-col justify-center relative px-0">
      <div className="section-container py-16 sm:py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          {/* Greeting */}
          <motion.p
            variants={fadeInUp}
            className="text-xs sm:text-sm md:text-base font-medium text-accent mb-3 sm:mb-4 tracking-wide"
          >
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.1]"
          >
            Gaurav Vibhandik
          </motion.h1>

          {/* Role cycling tagline */}
          <motion.h2
            variants={fadeInUp}
            className="mt-3 sm:mt-4 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-600 dark:text-gray-300 min-h-[1.5em]"
          >
            <AnimatedTyping words={ROLES} />
          </motion.h2>

          {/* Short intro */}
          <motion.p
            variants={fadeInUp}
            className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl"
          >
            Final-year AI & Data Science engineer building real-time collaborative
            platforms with sub-16ms rendering, 20+ concurrent user support, and
            production DevOps pipelines. Shipping code that scales.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeInUp}
            className="mt-6 sm:mt-8 flex flex-col xs:flex-row flex-wrap gap-2.5 sm:gap-3"
          >
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              View Projects
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={SITE.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </button>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={fadeInUp}
            className="mt-6 sm:mt-8 flex items-center gap-2.5 sm:gap-3"
          >
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700
                         text-gray-500 hover:text-gray-900 dark:hover:text-white hover:border-accent
                         transition-all duration-200 hover:-translate-y-0.5"
              aria-label="GitHub profile"
            >
              <GithubIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700
                         text-gray-500 hover:text-gray-900 dark:hover:text-white hover:border-accent
                         transition-all duration-200 hover:-translate-y-0.5"
              aria-label="LinkedIn profile"
            >
              <LinkedinIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="p-2 sm:p-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700
                         text-gray-500 hover:text-gray-900 dark:hover:text-white hover:border-accent
                         transition-all duration-200 hover:-translate-y-0.5"
              aria-label="Send email"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll down indicator — hidden on very short screens */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <button
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-1 text-gray-400 dark:text-gray-600 cursor-pointer hover:text-accent transition-colors"
          aria-label="Scroll to About section"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
}
