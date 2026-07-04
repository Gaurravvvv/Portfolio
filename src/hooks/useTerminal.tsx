import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from 'react';

interface TerminalContextType {
  isTerminalOpen: boolean;
  setIsTerminalOpen: (open: boolean) => void;
  toggleTerminal: () => void;
  isSuperUser: boolean;
  setSuperUser: (isSuper: boolean) => void;
  timeLeft: number; // Seconds remaining in the root session
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 minutes in ms

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isSuperUser, setIsSuperUser] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const expiresAtRef = useRef<number>(0);

  // Clear legacy localStorage items on mount
  useEffect(() => {
    try {
      localStorage.removeItem('isSuperUser');
      localStorage.removeItem('superuserExpiresAt');
    } catch {
      // ignore storage errors
    }
  }, []);

  const setSuperUser = (isSuper: boolean) => {
    setIsSuperUser(isSuper);
    if (isSuper) {
      expiresAtRef.current = Date.now() + SESSION_TIMEOUT;
      setTimeLeft(Math.ceil(SESSION_TIMEOUT / 1000));
    } else {
      expiresAtRef.current = 0;
      setTimeLeft(0);
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

  // Session timeout countdown check
  useEffect(() => {
    if (!isSuperUser) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const expiresAt = expiresAtRef.current;
      if (now >= expiresAt) {
        setSuperUser(false);
      } else {
        setTimeLeft(Math.max(0, Math.ceil((expiresAt - now) / 1000)));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isSuperUser]);

  // Session timeout reset on activity
  useEffect(() => {
    if (!isSuperUser) return;

    const handleActivity = () => {
      expiresAtRef.current = Date.now() + SESSION_TIMEOUT;
      setTimeLeft(Math.ceil(SESSION_TIMEOUT / 1000));
    };

    let lastUpdate = Date.now();
    const throttledActivity = () => {
      const now = Date.now();
      if (now - lastUpdate > 1000) {
        lastUpdate = now;
        handleActivity();
      }
    };

    const events = ['mousemove', 'keydown', 'click', 'scroll'];
    events.forEach(event => window.addEventListener(event, throttledActivity));

    return () => {
      events.forEach(event => window.removeEventListener(event, throttledActivity));
    };
  }, [isSuperUser]);

  return (
    <TerminalContext.Provider value={{ isTerminalOpen, setIsTerminalOpen, toggleTerminal, isSuperUser, setSuperUser, timeLeft }}>
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
