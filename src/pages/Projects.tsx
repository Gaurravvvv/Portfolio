import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import { staggerContainer } from '../constants/animations';
import { PROJECTS } from '../constants/data';

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 sm:py-20 md:py-24">
      <div className="section-container">
        <SectionHeading
          title="Projects"
          subtitle="Production applications with real users, real metrics, and real engineering constraints."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
