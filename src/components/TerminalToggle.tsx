import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X } from 'lucide-react';
import { useTerminal } from '../hooks/useTerminal';

export default function TerminalToggle() {
  const { isTerminalOpen, toggleTerminal } = useTerminal();
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    const dismissed = sessionStorage.getItem('terminal-tooltip-dismissed');
    if (dismissed || isTerminalOpen) return;

    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, [isTerminalOpen]);

  // If the terminal is opened, automatically hide the tooltip and record dismissal
  useEffect(() => {
    if (isTerminalOpen) {
      setShowTooltip(false);
      sessionStorage.setItem('terminal-tooltip-dismissed', 'true');
    }
  }, [isTerminalOpen]);

  const handleDismissTooltip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTooltip(false);
    sessionStorage.setItem('terminal-tooltip-dismissed', 'true');
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[80] flex flex-col items-end">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mb-3 flex items-center gap-2.5 p-3 rounded-lg
                       bg-[#0d0d10] border border-accent/30 text-xs text-gray-300 font-mono shadow-xl
                       w-64 max-w-[calc(100vw-2rem)] select-none"
          >
            <span className="flex-1 leading-relaxed">
              Explore via CLI! Press <kbd className="bg-accent/15 border border-accent/30 text-accent px-1.5 py-0.5 rounded font-bold text-[10px]">`</kbd> or click the icon.
            </span>
            <button
              onClick={handleDismissTooltip}
              className="text-gray-500 hover:text-white transition-colors cursor-pointer p-0.5 shrink-0"
              aria-label="Dismiss tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleTerminal}
        className="relative flex items-center justify-center
                   w-12 h-12 rounded-lg bg-[#0d0d10] border border-accent/20 text-accent shadow-xl cursor-pointer
                   hover:bg-accent/10 hover:border-accent hover:shadow-accent/10 transition-all duration-200"
        aria-label="Toggle terminal CLI navigator"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulsing ring background */}
        {!isTerminalOpen && (
          <span className="absolute inset-0 rounded-lg bg-accent/20 animate-ping -z-10" />
        )}
        <div className="relative w-5 h-5 flex items-center justify-center">
          {isTerminalOpen ? (
            <X className="w-5 h-5 absolute" />
          ) : (
            <Terminal className="w-5 h-5 absolute" />
          )}
        </div>
      </motion.button>
    </div>
  );
}
