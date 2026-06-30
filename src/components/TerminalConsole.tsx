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

const TERMINAL_DOCS = [
  { id: 'ssc_marksheet', name: 'SSC Marksheet', file: '/Gaurav/SSC_marksheet.pdf' },
  { id: 'hsc_marksheet', name: 'HSC Marksheet', file: '/Gaurav/Hsc__marksheet.pdf' },
  { id: 'fe_marksheet', name: 'First Year Marksheet', file: '/Gaurav/FE_marksheet.pdf' },
  { id: 'se_marksheet', name: 'Second Year Marksheet', file: '/Gaurav/SE_Marksheet.pdf' },
  { id: 'leaving_cert', name: 'Leaving Certificate', file: '/Gaurav/Leaving_Certificate.pdf' },
  { id: 'leaving_gap', name: 'Leaving / Gap Certificate', file: '/Gaurav/Leaving+Gap.pdf' },
  { id: 'caste_cert', name: 'Caste Certificate', file: '/Gaurav/Caste_Certificate.pdf' },
  { id: 'caste_validity', name: 'Caste Validity', file: '/Gaurav/Caste_Validity.pdf' },
  { id: 'domicile', name: 'Domicile Certificate', file: '/Gaurav/Domicile_certificate.pdf' },
  { id: 'nationality', name: 'Nationality Certificate', file: '/Gaurav/Nationality.pdf' },
  { id: 'non_creamy', name: 'Non Creamy Layer', file: '/Gaurav/Non_creamy_layer.pdf' },
  { id: 'declaration', name: 'Declaration Statement', file: '/Gaurav/Declaration.pdf' },
  { id: 'income_cert', name: 'Income Certificate 2023-24', file: '/Gaurav/Income23-24.pdf' },
  { id: 'passport_photo', name: 'Passport Size Photo', file: '/Gaurav/Passportsize.jpeg' },
  { id: 'ration_card', name: 'Ration Card', file: '/Gaurav/Ration_Cardd.pdf' },
  { id: 'acknowledgment', name: 'Acknowledgment Receipt', file: '/Gaurav/Acknowledgmentt.pdf' },
  { id: 'branch_change', name: 'Ack & Branch Change Letter', file: '/Gaurav/Ack+Branch_change.pdf' },
  { id: 'fee_receipt_24_25', name: 'Fee Receipt 2024-25', file: '/Gaurav/Fee_receipt24-25.pdf' },
  { id: 'fee_receipt_25_26', name: 'Fee Receipt 2025-26', file: '/Gaurav/Fee_Receipt25-26.pdf' },
];

const findTerminalDoc = (query: string) => {
  const q = query.toLowerCase().replace(/_/g, '').replace(/\+/g, '').replace(/ /g, '');
  
  // Try exact ID match first
  let match = TERMINAL_DOCS.find(d => d.id.toLowerCase().replace(/_/g, '') === q);
  if (match) return match;

  // Try substring match
  match = TERMINAL_DOCS.find(d => d.id.toLowerCase().includes(q) || d.name.toLowerCase().replace(/ /g, '').includes(q));
  if (match) return match;

  // Legacy fallback
  if (q.includes('ssc')) {
    return { name: 'SSC Marksheet', file: '/Gaurav/SSC_marksheet.pdf' };
  } else if (q.includes('hsc')) {
    return { name: 'HSC Marksheet', file: '/Gaurav/Hsc__marksheet.pdf' };
  } else if (q.includes('trans') || q.includes('college')) {
    return { name: 'College Transcript', file: '/Gaurav/SE_Marksheet.pdf' };
  } else if (q.includes('cert') || q.includes('exp')) {
    return { name: 'Experience Certificate', file: '/Gaurav/Leaving_Certificate.pdf' };
  }
  return null;
};

export default function TerminalConsole({ theme, onToggleTheme }: TerminalConsoleProps) {
  const { setIsTerminalOpen, isSuperUser, setSuperUser } = useTerminal();
  const [inputVal, setInputVal] = useState('');
  const [isPromptingPassword, setIsPromptingPassword] = useState(false);
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
      const promptStr = isSuperUser ? 'root@portfolio:~#' : 'gaurav@portfolio:~$';
      setHistory(prev => [...prev, { text: promptStr, type: 'prompt' }]);
      return;
    }

    if (isPromptingPassword) {
      // Do not log the actual password to history.
      const newHistory: LogEntry[] = [
        ...history,
        { text: 'Password: ••••••••', type: 'prompt' }
      ];

      if (trimmed === '020804') {
        setSuperUser(true);
        newHistory.push(
          { text: 'Authentication successful.', type: 'success' },
          { text: 'Welcome to Superuser mode. You are now root.', type: 'success' },
          { text: 'Type "secrets" or "docs" to list personal credentials.', type: 'info' }
        );
      } else {
        newHistory.push({ text: 'Access denied: incorrect password.', type: 'error' });
      }

      setIsPromptingPassword(false);
      setHistory(newHistory);
      setInputVal('');
      return;
    }

    const args = trimmed.split(/\s+/);
    const command = args[0].toLowerCase();
    const subArg = args[1]?.toLowerCase();

    // Add prompt line to history
    const promptStr = isSuperUser ? 'root@portfolio:~#' : 'gaurav@portfolio:~$';
    const newHistory: LogEntry[] = [...history, { text: `${promptStr} ${trimmed}`, type: 'prompt' }];

    switch (command) {
      case 'gaurrstic':
        if (isSuperUser) {
          newHistory.push({ text: 'Already logged in as root.', type: 'info' });
        } else {
          setIsPromptingPassword(true);
          newHistory.push({ text: 'Entering superuser mode...', type: 'info' });
        }
        break;

      case 'docs':
      case 'secrets':
        if (!isSuperUser) {
          newHistory.push({ text: `bash: command not found: ${command}. Type "help" to show commands.`, type: 'error' });
        } else {
          newHistory.push(
            { text: 'Decrypted Secure Personal Documents Vault:', type: 'success' },
            { text: '  - ssc_marksheet          - hsc_marksheet', type: 'info' },
            { text: '  - fe_marksheet           - se_marksheet', type: 'info' },
            { text: '  - leaving_cert           - leaving_gap', type: 'info' },
            { text: '  - caste_cert             - caste_validity', type: 'info' },
            { text: '  - domicile               - nationality', type: 'info' },
            { text: '  - non_creamy             - declaration', type: 'info' },
            { text: '  - income_cert            - passport_photo', type: 'info' },
            { text: '  - ration_card            - acknowledgment', type: 'info' },
            { text: '  - branch_change          - fee_receipt_24_25', type: 'info' },
            { text: '  - fee_receipt_25_26', type: 'info' },
            { text: '', type: 'info' },
            { text: 'Usage: type "open <name>" to view, or "download <name>" to download.', type: 'info' }
          );
        }
        break;

      case 'open':
        if (!isSuperUser) {
          newHistory.push({ text: `bash: command not found: ${command}. Type "help" to show commands.`, type: 'error' });
        } else {
          if (!subArg) {
            newHistory.push({ text: 'Usage: open <document_name>. Example: "open ssc_marksheet"', type: 'error' });
          } else {
            const doc = findTerminalDoc(subArg);
            if (doc) {
              newHistory.push({ text: `Decrypting and launching ${doc.name}...`, type: 'success' });
              setTimeout(() => {
                window.open(doc.file, '_blank');
              }, 300);
            } else {
              newHistory.push({ text: `Error: Document "${subArg}" not found. Type "docs" to list files.`, type: 'error' });
            }
          }
        }
        break;

      case 'download':
        if (!isSuperUser) {
          newHistory.push({ text: `bash: command not found: ${command}. Type "help" to show commands.`, type: 'error' });
        } else {
          if (!subArg) {
            newHistory.push({ text: 'Usage: download <document_name>. Example: "download ssc_marksheet"', type: 'error' });
          } else {
            const doc = findTerminalDoc(subArg);
            if (doc) {
              newHistory.push({ text: `Decrypting and downloading ${doc.name}...`, type: 'success' });
              setTimeout(() => {
                const link = document.createElement('a');
                link.href = doc.file;
                link.setAttribute('download', doc.file.split('/').pop() || '');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }, 300);
            } else {
              newHistory.push({ text: `Error: Document "${subArg}" not found. Type "docs" to list files.`, type: 'error' });
            }
          }
        }
        break;

      case 'lock':
      case 'logout':
        if (isSuperUser) {
          setSuperUser(false);
          newHistory.push({ text: 'Superuser session closed. Credentials secured.', type: 'success' });
        } else {
          newHistory.push({ text: 'You are not running in superuser mode.', type: 'error' });
        }
        break;

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
        if (isSuperUser) {
          newHistory.push(
            { text: '', type: 'info' },
            { text: 'Superuser commands:', type: 'success' },
            { text: '  docs, secrets   - List secure documents', type: 'success' },
            { text: '  open <name>     - Open document in new tab', type: 'success' },
            { text: '  download <name> - Automatically download document', type: 'success' },
            { text: '  lock, logout    - Terminate root session', type: 'success' }
          );
        }
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
        if (isSuperUser) {
          newHistory.push({ text: '  - secrets (RESTRICTED)', type: 'success' });
        }
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
          } else if (subArg === 'secrets' && isSuperUser) {
            newHistory.push({ text: 'Reading restricted segment. Loading documents list...', type: 'success' });
            newHistory.push(
              { text: 'Available documents:', type: 'info' },
              { text: '  - ssc_marksheet, hsc_marksheet, fe_marksheet, se_marksheet', type: 'info' },
              { text: '  - leaving_cert, leaving_gap, caste_cert, caste_validity', type: 'info' },
              { text: '  - domicile, nationality, non_creamy, declaration', type: 'info' },
              { text: '  - income_cert, passport_photo, ration_card, acknowledgment', type: 'info' },
              { text: '  - branch_change, fee_receipt_24_25, fee_receipt_25_26', type: 'info' },
              { text: '', type: 'info' },
              { text: 'Type "docs" for full list, or "download <name>" to download.', type: 'info' }
            );
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
        if (isSuperUser) {
          setSuperUser(false);
          newHistory.push({ text: 'Superuser session closed. Returning to guest shell...', type: 'info' });
        } else {
          newHistory.push({ text: 'Closing navigator shell...', type: 'info' });
          setTimeout(() => setIsTerminalOpen(false), 200);
        }
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
          {isSuperUser ? 'root@portfolio:~' : 'gaurav@portfolio:~'}
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
          <span className="shrink-0 font-semibold select-none">
            {isPromptingPassword 
              ? 'Password:' 
              : isSuperUser 
                ? 'root@portfolio:~#' 
                : 'gaurav@portfolio:~$'}
          </span>
          <input
            ref={inputRef}
            type={isPromptingPassword ? 'password' : 'text'}
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none focus:ring-0 focus:outline-none p-0 text-white font-mono placeholder-zinc-800 focus:placeholder-transparent"
            placeholder={
              isPromptingPassword 
                ? '••••••' 
                : isSuperUser 
                  ? 'docs...' 
                  : 'cd about...'
            }
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
