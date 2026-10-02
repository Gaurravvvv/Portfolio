import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import { staggerContainer } from '../constants/animations';
import { PROJECTS } from '../constants/data';
import { useTerminal } from '../hooks/useTerminal';

export default function ProjectsSection() {
  const { isTerminalOpen } = useTerminal();
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll
    ? PROJECTS
    : PROJECTS.filter((p) => p.featured !== false);

  const remainingCount = PROJECTS.length - PROJECTS.filter((p) => p.featured !== false).length;

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-24">
      <div className="section-container">
        <SectionHeading
          title="Projects"
          subtitle="Production applications with real users, real metrics, and real engineering constraints."
        />

        <motion.div
          layout
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className={`grid gap-4 sm:gap-6 ${
            isTerminalOpen
              ? 'grid-cols-1 2xl:grid-cols-2'
              : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
          }`}
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {remainingCount > 0 && (
          <div className="mt-8 sm:mt-12 flex justify-center">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="btn-secondary group flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-lg hover:border-accent hover:text-accent transition-all cursor-pointer shadow-sm"
            >
              {showAll ? (
                <>
                  <span>Show Fewer Projects</span>
                  <ChevronUp className="w-4 h-4 text-accent transition-transform group-hover:-translate-y-0.5" />
                </>
              ) : (
                <>
                  <span>More Projects ({remainingCount} more)</span>
                  <ChevronDown className="w-4 h-4 text-accent transition-transform group-hover:translate-y-0.5" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
