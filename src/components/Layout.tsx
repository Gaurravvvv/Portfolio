import { type ReactNode } from 'react';
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
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar theme={theme} onToggleTheme={onToggleTheme} activeSection={activeSection} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
