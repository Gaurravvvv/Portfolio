import { type ReactNode } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import type { SectionId } from '../hooks/useActiveSection';

interface LayoutProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  activeSection: SectionId;
  children: ReactNode;
}

export default function Layout({ theme, onToggleTheme, activeSection, children }: LayoutProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-accent origin-left z-[60]"
        style={{ scaleX }}
      />
      <Navbar theme={theme} onToggleTheme={onToggleTheme} activeSection={activeSection} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
