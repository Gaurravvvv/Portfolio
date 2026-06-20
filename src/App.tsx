import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import { useActiveSection } from './hooks/useActiveSection';
import { TerminalProvider } from './hooks/useTerminal';
import Layout from './components/Layout';
import HomeSection from './pages/Home';
import AboutSection from './pages/About';
import SkillsSection from './pages/Skills';
import ProjectsSection from './pages/Projects';
import ExperienceSection from './pages/Experience';
import ContactSection from './pages/Contact';
import NotFound from './pages/NotFound';

function FullPage() {
  return (
    <>
      <HomeSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </>
  );
}

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const activeSection = useActiveSection();

  return (
    <Layout theme={theme} onToggleTheme={toggleTheme} activeSection={activeSection}>
      <Routes>
        <Route index element={<FullPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <TerminalProvider>
        <AppContent />
      </TerminalProvider>
    </BrowserRouter>
  );
}
