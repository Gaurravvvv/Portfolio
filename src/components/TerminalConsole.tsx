import { useState, useEffect, useRef } from 'react';
import { useTerminal } from '../hooks/useTerminal';

interface LogEntry {
  text: string;
  type: 'prompt' | 'info' | 'error' | 'success';
}

interface TerminalConsoleProps {
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export default function TerminalConsole({ theme, onToggleTheme }: TerminalConsoleProps) {
  const { setIsTerminalOpen } = useTerminal();
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<LogEntry[]>([
    { text: 'Gaurav Portfolio CLI Shell [v1.0.0]', type: 'info' },
    { text: 'Type "help" or "?" to view available commands.', type: 'info' },
    { text: '', type: 'info' },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Also focus on click anywhere inside the console
  const handleConsoleClick = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) {
      setHistory(prev => [...prev, { text: '', type: 'prompt' }]);
      return;
    }

    const args = trimmed.split(/\s+/);
    const command = args[0].toLowerCase();
    const subArg = args[1]?.toLowerCase();

    // Add prompt line to history
    const newHistory: LogEntry[] = [...history, { text: `gaurav@portfolio:~$ ${trimmed}`, type: 'prompt' }];

    switch (command) {
      case 'help':
      case '?':
        newHistory.push(
          { text: 'Available commands:', type: 'info' },
          { text: '  ls, dir       - List portfolio sections', type: 'info' },
          { text: '  cd, goto      - Scroll to section (e.g. "cd about")', type: 'info' },
          { text: '  whoami        - Print developer profile info', type: 'info' },
          { text: '  skills        - List key technical tools', type: 'info' },
          { text: '  projects      - List product portfolio highlights', type: 'info' },
          { text: '  theme         - Change site colors ("theme dark" or "theme light")', type: 'info' },
          { text: '  clear, cls    - Clean the screen logs', type: 'info' },
          { text: '  exit, close   - Close split-screen mode', type: 'info' }
        );
        break;

      case 'ls':
      case 'dir':
        newHistory.push(
          { text: 'Directory list: /sections', type: 'info' },
          { text: '  - home', type: 'info' },
          { text: '  - about', type: 'info' },
          { text: '  - skills', type: 'info' },
          { text: '  - projects', type: 'info' },
          { text: '  - experience', type: 'info' },
          { text: '  - contact', type: 'info' }
        );
        break;

      case 'cd':
      case 'goto':
        if (!subArg) {
          newHistory.push({ text: 'cd: missing arguments. Try "cd about" or "cd projects"', type: 'error' });
        } else {
          const validSections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
          if (validSections.includes(subArg)) {
            newHistory.push({ text: `Navigating to /sections/${subArg}...`, type: 'success' });
            setTimeout(() => {
              const el = document.getElementById(subArg);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }, 100);
          } else {
            newHistory.push({ text: `cd: no such section: ${subArg}. Type "ls" to list sections.`, type: 'error' });
          }
        }
        break;

      case 'whoami':
        newHistory.push(
          { text: 'Gaurav Vibhandik', type: 'success' },
          { text: 'Final-year AI & Data Science student at MET IOE.', type: 'info' },
          { text: 'DevOps Lead & Full-Stack developer shipping collaborative platforms.', type: 'info' }
        );
        break;

      case 'skills':
        newHistory.push(
          { text: 'LANGUAGES: C++, Python, JavaScript, TypeScript', type: 'info' },
          { text: 'FRONTEND: React.js, Vite, Tailwind CSS', type: 'info' },
          { text: 'BACKEND: Node.js, Express, Flask, Redis, Socket.io', type: 'info' },
          { text: 'DEVOPS: Docker, Kubernetes, Jenkins CI/CD, AWS', type: 'info' }
        );
        break;

      case 'projects':
        newHistory.push(
          { text: '1. Drawwww   - AI Draw Game & Collaborative Canvas API', type: 'info' },
          { text: '2. CodeShare - Multi-file Collaborative IDE with S3 Uploads', type: 'info' },
          { text: '3. Doctorra  - Clinic Queue & Intake triage check-in system', type: 'info' }
        );
        break;

      case 'theme':
        {
          const isCurrentlyDark = theme ? theme === 'dark' : document.documentElement.classList.contains('dark');
          const toggleBtn = document.querySelector('button[aria-label^="Switch to"]') as HTMLButtonElement;
          
          console.log('[TerminalConsole CLI] Theme command run. theme prop:', theme, 'has onToggleTheme:', !!onToggleTheme, 'has toggleBtn:', !!toggleBtn);

          if (subArg === 'light') {
            if (isCurrentlyDark) {
              if (onToggleTheme) {
                onToggleTheme();
                newHistory.push({ text: 'Theme changed to LIGHT.', type: 'success' });
              } else if (toggleBtn) {
                toggleBtn.click();
                newHistory.push({ text: 'Theme changed to LIGHT.', type: 'success' });
              } else {
                newHistory.push({ text: 'Theme switch failed: toggle handler/button not found.', type: 'error' });
              }
            } else {
              newHistory.push({ text: 'Theme is already LIGHT.', type: 'info' });
            }
          } else if (subArg === 'dark') {
            if (!isCurrentlyDark) {
              if (onToggleTheme) {
                onToggleTheme();
                newHistory.push({ text: 'Theme changed to DARK.', type: 'success' });
              } else if (toggleBtn) {
                toggleBtn.click();
                newHistory.push({ text: 'Theme changed to DARK.', type: 'success' });
              } else {
                newHistory.push({ text: 'Theme switch failed: toggle handler/button not found.', type: 'error' });
              }
            } else {
              newHistory.push({ text: 'Theme is already DARK.', type: 'info' });
            }
          } else {
            // Toggle
            if (onToggleTheme) {
              onToggleTheme();
              newHistory.push({ text: `Theme toggled to ${isCurrentlyDark ? 'LIGHT' : 'DARK'}.`, type: 'success' });
            } else if (toggleBtn) {
              toggleBtn.click();
              newHistory.push({ text: `Theme toggled to ${isCurrentlyDark ? 'LIGHT' : 'DARK'}.`, type: 'success' });
            } else {
              newHistory.push({ text: 'Theme toggle failed: toggle handler/button not found.', type: 'error' });
            }
          }
        }
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'close':
        newHistory.push({ text: 'Closing navigator shell...', type: 'info' });
        setTimeout(() => setIsTerminalOpen(false), 200);
        break;

      default:
        newHistory.push({ text: `bash: command not found: ${command}. Type "help" to show commands.`, type: 'error' });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    }
  };

  return (
    <div 
      onClick={handleConsoleClick}
      className="flex-1 flex flex-col h-full overflow-hidden bg-[#0a0a0c] text-gray-300 font-mono text-xs sm:text-sm select-none"
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between bg-[#111115] border-b border-border/80 py-2.5 px-4 shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer hover:bg-red-600 transition-colors" onClick={() => setIsTerminalOpen(false)} />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="text-gray-400 font-semibold text-[11px] select-none">
          gaurav@portfolio:~
        </div>
        <div className="w-12 text-right">
          <button 
            onClick={() => setIsTerminalOpen(false)}
            className="text-[10px] text-gray-500 hover:text-accent font-bold cursor-pointer transition-colors"
          >
            ESC
          </button>
        </div>
      </div>

      {/* Terminal Display Logs */}
      <div 
        ref={containerRef}
        className="flex-1 p-4 overflow-y-auto space-y-2 select-text selection:bg-accent selection:text-[#0a0a0c]"
      >
        {history.map((log, i) => {
          let colorClass = 'text-gray-300';
          if (log.type === 'prompt') colorClass = 'text-accent font-semibold';
          else if (log.type === 'error') colorClass = 'text-red-400 font-semibold';
          else if (log.type === 'success') colorClass = 'text-accent';
          else if (log.type === 'info') colorClass = 'text-gray-400';

          return (
            <div key={i} className={`whitespace-pre-wrap leading-relaxed ${colorClass}`}>
              {log.text}
            </div>
          );
        })}

        {/* Input Prompt Line */}
        <div className="flex items-center gap-2 text-accent mt-2">
          <span className="shrink-0 font-semibold select-none">gaurav@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none focus:ring-0 focus:outline-none p-0 text-white font-mono placeholder-zinc-800 focus:placeholder-transparent"
            placeholder="cd about..."
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
