import { motion } from 'framer-motion';
import { Terminal, X } from 'lucide-react';
import { useTerminal } from '../hooks/useTerminal';

export default function TerminalToggle() {
  const { isTerminalOpen, toggleTerminal } = useTerminal();

  return (
    <motion.button
      onClick={toggleTerminal}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[80] flex items-center justify-center
                 w-12 h-12 rounded-lg bg-[#0d0d10] border border-accent/20 text-accent shadow-xl cursor-pointer
                 hover:bg-accent/10 hover:border-accent hover:shadow-accent/10 transition-all duration-200"
      aria-label="Toggle terminal CLI navigator"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isTerminalOpen ? (
          <X className="w-5 h-5 absolute" />
        ) : (
          <Terminal className="w-5 h-5 absolute" />
        )}
      </div>
    </motion.button>
  );
}
