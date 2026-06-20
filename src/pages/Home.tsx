import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Mail, ChevronDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/icons';
import AnimatedTyping from '../components/AnimatedTyping';
import { SITE } from '../constants/data';
import { useTerminal } from '../hooks/useTerminal';
import { staggerContainer, fadeInUp, fadeIn } from '../constants/animations';

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  
  const bootLines = [
    '$ npx gaurav-portfolio --init',
    '✓ loaded core layout modules [OK]',
    '✓ synchronized developer data [OK]',
    '$ start-server --port 3000'
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < bootLines.length) {
        const nextLine = bootLines[index];
        setLines(prev => [...prev, nextLine]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 200);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0c] text-white p-4 font-mono"
    >
      <div className="w-full max-w-md space-y-4 bg-[#0d0d10] border border-white/10 p-5 sm:p-6 rounded-xl shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-2 text-xs text-gray-500">
          <span>PORTFOLIO_BOOT_SEQUENCE.sh</span>
          <button 
            onClick={onComplete}
            className="hover:text-accent transition-colors cursor-pointer text-[10px] uppercase font-bold tracking-wider"
          >
            Skip [Esc]
          </button>
        </div>
        <div className="space-y-2 text-xs sm:text-sm">
          {lines.map((line, i) => (
            <div key={i} className="flex gap-2 leading-relaxed">
              <span className={line && line.startsWith('$') ? 'text-accent font-semibold' : 'text-gray-400'}>
                {line}
              </span>
            </div>
          ))}
          {lines.length < bootLines.length && (
            <div className="flex gap-2 items-center">
              <span className="w-1.5 h-3.5 bg-accent animate-pulse" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function HomeSection() {
  const { isTerminalOpen } = useTerminal();
  const [isBooting, setIsBooting] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !sessionStorage.getItem('portfolio-booted');
  });

  const handleBootComplete = useCallback(() => {
    sessionStorage.setItem('portfolio-booted', 'true');
    setIsBooting(false);
  }, []);

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <AnimatePresence>
        {isBooting && <BootSequence onComplete={handleBootComplete} />}
      </AnimatePresence>

      <section id="home" className="min-h-[100dvh] flex flex-col justify-center relative px-0 overflow-hidden">
        {/* Gemini-style ambient background grid / radial overlay */}
        <div 
          className="absolute inset-0 -z-10 pointer-events-none opacity-40 dark:opacity-100"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(61, 220, 151, 0.05) 0%, transparent 65%)'
          }}
        />

        <div className="section-container py-16 sm:py-20 z-10">
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
              className="text-xs sm:text-sm md:text-base font-medium text-accent mb-3 sm:mb-4 tracking-wider"
            >
              visitor@gaurav:~$ ./whoami
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={fadeInUp}
              className={`font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.1] ${
                isTerminalOpen
                  ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl'
                  : 'text-3xl sm:text-4xl md:text-5xl lg:text-7xl'
              }`}
            >
              <span className="text-accent select-none mr-2 sm:mr-4 font-normal font-mono opacity-80">$</span>
              Gaurav Vibhandik
            </motion.h1>

            {/* Role tagline */}
            <motion.h2
              variants={fadeInUp}
              className={`mt-3 sm:mt-4 font-semibold text-gray-600 dark:text-gray-300 min-h-[1.5em] font-mono ${
                isTerminalOpen
                  ? 'text-base sm:text-lg md:text-xl'
                  : 'text-lg sm:text-xl md:text-2xl lg:text-3xl'
              }`}
            >
              <AnimatedTyping words={['Software Engineer']} />
            </motion.h2>

            {/* Short intro */}
            <motion.p
              variants={fadeInUp}
              className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl font-mono"
            >
              Final-year AI & Data Science engineer building real-time collaborative
              platforms with sub-16ms rendering, 20+ concurrent user support, and
              production DevOps pipelines. Shipping code that scales.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={fadeInUp}
              className="mt-6 sm:mt-8 flex flex-col xs:flex-row flex-wrap gap-2.5 sm:gap-3 font-mono"
            >
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary cursor-pointer"
              >
                ./projects.sh
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={SITE.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Download className="w-4 h-4" />
                resume.pdf
              </a>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                contact_me
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
                className="p-2 sm:p-2.5 rounded-lg bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800
                           text-gray-500 hover:text-accent hover:border-accent
                           transition-all duration-200 hover:-translate-y-0.5"
                aria-label="GitHub profile"
              >
                <GithubIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-2.5 rounded-lg bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800
                           text-gray-500 hover:text-accent hover:border-accent
                           transition-all duration-200 hover:-translate-y-0.5"
                aria-label="LinkedIn profile"
              >
                <LinkedinIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="p-2 sm:p-2.5 rounded-lg bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800
                           text-gray-500 hover:text-accent hover:border-accent
                           transition-all duration-200 hover:-translate-y-0.5"
                aria-label="Send email"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll down indicator */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:block z-10"
        >
          <button
            onClick={scrollToAbout}
            className="flex flex-col items-center gap-1 text-gray-400 dark:text-gray-600 cursor-pointer hover:text-accent transition-colors"
            aria-label="Scroll to About section"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-1 font-mono text-[10px]"
            >
              <span className="font-medium tracking-wider uppercase">scroll_down</span>
              <ChevronDown className="w-4 h-4 text-accent" />
            </motion.div>
          </button>
        </motion.div>
      </section>
    </>
  );
}
