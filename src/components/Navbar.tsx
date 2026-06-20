import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { SITE } from '../constants/data';
import type { SectionId } from '../hooks/useActiveSection';
import { useTerminal } from '../hooks/useTerminal';

interface NavLink {
  label: string;
  sectionId: SectionId;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Home', sectionId: 'home' },
  { label: 'About', sectionId: 'about' },
  { label: 'Skills', sectionId: 'skills' },
  { label: 'Projects', sectionId: 'projects' },
  { label: 'Experience', sectionId: 'experience' },
  { label: 'Contact', sectionId: 'contact' },
];

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  activeSection: SectionId;
}

export default function Navbar({ theme, onToggleTheme, activeSection }: NavbarProps) {
  const { isTerminalOpen } = useTerminal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    setIsMobileOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      const navHeight = 72;
      const top = el.offsetTop - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  return (
    <nav
      className={`fixed top-0 right-0 z-50 transition-all duration-300 ${
        isTerminalOpen ? 'md:left-1/2 left-0' : 'left-0'
      } ${
        isScrolled
          ? 'bg-[#f5f5f4]/80 dark:bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="text-sm sm:text-base font-bold text-gray-900 dark:text-white hover:text-accent transition-colors cursor-pointer font-mono"
          >
            <span className="text-accent mr-1 select-none opacity-80">$</span>
            <span className="hidden min-[400px]:inline">gaurav_vibhandik</span>
            <span className="min-[400px]:hidden">gaurav</span>
          </button>

          {/* Desktop nav */}
          <div className={`hidden ${isTerminalOpen ? '2xl:flex' : 'lg:flex'} items-center gap-1 font-mono`}>
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.sectionId;
              return (
                <button
                  key={link.sectionId}
                  onClick={() => scrollToSection(link.sectionId)}
                  className={`relative px-3 py-2 text-xs font-semibold rounded-md transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-accent font-bold'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />

            <a
              href={SITE.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:inline-flex items-center justify-center bg-accent text-[#0a0a0c] dark:text-[#0a0a0c] hover:bg-accent-hover transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/15 ${
                isTerminalOpen
                  ? 'w-10 h-10 rounded-xl'
                  : 'gap-2 px-3.5 py-1.5 text-xs font-bold font-mono rounded-md'
              }`}
              aria-label="Download Resume"
            >
              {isTerminalOpen ? (
                <FileText className="w-[18px] h-[18px]" />
              ) : (
                <>
                  <FileText className="w-3.5 h-3.5" />
                  Resume
                </>
              )}
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`${isTerminalOpen ? '2xl:hidden' : 'lg:hidden'} flex items-center justify-center w-10 h-10 rounded-md bg-white/[0.02] dark:bg-[#0a0a0c]/40 border border-border cursor-pointer text-accent`}
              aria-label="Toggle navigation menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-5 h-5 text-accent" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-5 h-5 text-accent" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={`${isTerminalOpen ? '2xl:hidden' : 'lg:hidden'} overflow-hidden bg-[#f5f5f4]/95 dark:bg-[#0a0a0c]/95 backdrop-blur-xl
                       border-b border-border`}
          >
            <div className="section-container py-4 flex flex-col gap-1 font-mono">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.sectionId;
                return (
                  <button
                    key={link.sectionId}
                    onClick={() => scrollToSection(link.sectionId)}
                    className={`px-4 py-3 rounded-md text-xs font-semibold transition-colors text-left cursor-pointer ${
                      isActive
                        ? 'bg-accent/10 text-accent'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-900/60'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
              <a
                href={SITE.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3
                           bg-accent text-[#0a0a0c] dark:text-[#0a0a0c] rounded-md text-xs font-bold"
              >
                <FileText className="w-4 h-4" />
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
