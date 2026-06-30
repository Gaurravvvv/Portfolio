import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface TerminalContextType {
  isTerminalOpen: boolean;
  setIsTerminalOpen: (open: boolean) => void;
  toggleTerminal: () => void;
  isSuperUser: boolean;
  setSuperUser: (isSuper: boolean) => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isSuperUser, setIsSuperUser] = useState(() => {
    try {
      return localStorage.getItem('isSuperUser') === 'true';
    } catch {
      return false;
    }
  });

  const setSuperUser = (isSuper: boolean) => {
    setIsSuperUser(isSuper);
    try {
      localStorage.setItem('isSuperUser', String(isSuper));
    } catch {
      // Ignore storage errors
    }
  };

  const toggleTerminal = () => setIsTerminalOpen(prev => !prev);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInput = activeEl && (
        activeEl.tagName === 'INPUT' || 
        activeEl.tagName === 'TEXTAREA' || 
        activeEl.getAttribute('contenteditable') === 'true'
      );

      if (e.key === '`') {
        if (isInput) return; // Let user type backtick in input fields
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
      }

      if (e.key === 'Escape' && isTerminalOpen) {
        e.preventDefault();
        setIsTerminalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTerminalOpen]);

  return (
    <TerminalContext.Provider value={{ isTerminalOpen, setIsTerminalOpen, toggleTerminal, isSuperUser, setSuperUser }}>
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal() {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return context;
}
