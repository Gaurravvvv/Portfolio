import { type ReactNode } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import TerminalConsole from './TerminalConsole';
import TerminalToggle from './TerminalToggle';
import { useTerminal } from '../hooks/useTerminal';
import type { SectionId } from '../hooks/useActiveSection';

interface LayoutProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  activeSection: SectionId;
  children: ReactNode;
}

export default function Layout({ theme, onToggleTheme, activeSection, children }: LayoutProps) {
  const { isTerminalOpen } = useTerminal();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className={`min-h-screen bg-[var(--bg-primary)] text-[var(--text-body)] relative flex overflow-x-hidden ${
      isTerminalOpen ? 'terminal-open' : ''
    }`}>
      {/* Scroll Progress Bar (Responsive to terminal split) */}
      <motion.div
        className={`fixed top-0 right-0 h-[3px] bg-accent origin-left z-[60] transition-all duration-300 ${
          isTerminalOpen ? 'md:left-1/2 left-0' : 'left-0'
        }`}
        style={{ scaleX }}
      />

      {/* Floating Toggle Button */}
      <TerminalToggle />

      {/* Mobile Fullscreen Terminal Overlay */}
      <AnimatePresence>
        {isTerminalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-[90] bg-[#0a0a0c] flex flex-col"
          >
            <TerminalConsole theme={theme} onToggleTheme={onToggleTheme} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Split-Screen Panel (Left side) */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: isTerminalOpen ? '50%' : '0%' }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className="hidden md:flex fixed top-0 left-0 bottom-0 border-r border-border/80 overflow-hidden shrink-0 z-[40]"
      >
        <div className="w-screen max-w-[50vw] h-full flex flex-col bg-[#0a0a0c]">
          <TerminalConsole theme={theme} onToggleTheme={onToggleTheme} />
        </div>
      </motion.div>

      {/* Main Content Wrapper (Slides right when split screen is active) */}
      <motion.div
        animate={{ paddingLeft: isTerminalOpen ? '50%' : '0%' }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className="min-h-screen w-full flex flex-col relative"
      >
        <Navbar theme={theme} onToggleTheme={onToggleTheme} activeSection={activeSection} />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </motion.div>
    </div>
  );
}
