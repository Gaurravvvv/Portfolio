import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './icons';
import { fadeInUp, fastStaggerContainer } from '../constants/animations';
import type { Project } from '../constants/data';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.article
      variants={fadeInUp}
      className="card-base h-full flex flex-col overflow-hidden !p-0"
    >
      {/* Project image */}
      <div className="relative w-full aspect-video overflow-hidden bg-gray-100 dark:bg-slate-800">
        {!imgError ? (
          <img
            src={project.image}
            alt={`${project.title} — ${project.tagline}`}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-400 dark:text-gray-600">
              {project.title}
            </span>
          </div>
        )}
        {/* Subtle gradient overlay at bottom for text readability */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Card content */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 md:p-6">
        {/* Header */}
        <div className="mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {project.tagline}
          </p>
        </div>

        {/* Tech stack badges */}
        <motion.div
          variants={fastStaggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-1 sm:gap-1.5 mb-4 sm:mb-5"
        >
          {project.stack.map((tech) => (
            <motion.span
              key={tech}
              variants={fadeInUp}
              className="badge-pill"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Highlights */}
        <ul className="space-y-2 sm:space-y-2.5 mb-5 sm:mb-6 flex-1">
          {project.highlights.map((highlight, i) => (
            <li key={i} className="flex gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              <span className="mt-1 text-accent select-none font-bold shrink-0 text-xs">{">"}</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        {/* Action buttons — pinned to bottom */}
        <div className="flex flex-col min-[380px]:flex-row items-stretch min-[380px]:items-center gap-2 mt-auto pt-3 sm:pt-4 border-t border-gray-100 dark:border-zinc-800">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs py-2 px-3 sm:px-4 flex-1 justify-center"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          )}
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-xs py-2 px-3 sm:px-4 flex-1 justify-center"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            Source
          </a>
        </div>
      </div>
    </motion.article>
  );
}
