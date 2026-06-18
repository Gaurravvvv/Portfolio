import { motion } from 'framer-motion';
import { Code2, Layout, Server, Cloud, Database, Wrench } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import SkillBadge from '../components/SkillBadge';
import { staggerContainer, fadeInUp, fastStaggerContainer } from '../constants/animations';
import { SKILL_CATEGORIES } from '../constants/data';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Layout,
  Server,
  Cloud,
  Database,
  Wrench,
};

const ICON_COLORS: Record<string, string> = {
  Code2: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10',
  Layout: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10',
  Server: 'text-purple-500 bg-purple-50 dark:bg-purple-500/10',
  Cloud: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-500/10',
  Database: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10',
  Wrench: 'text-rose-500 bg-rose-50 dark:bg-rose-500/10',
};

export default function SkillsSection() {
  return (
    <section id="skills" className="py-16 sm:py-20 md:py-24">
      <div className="section-container">
        <SectionHeading
          title="Skills & Tools"
          subtitle="Technologies I use to build, deploy, and scale production applications."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {SKILL_CATEGORIES.map((category) => {
            const Icon = ICON_MAP[category.icon];
            const colorClass = ICON_COLORS[category.icon] ?? 'text-gray-500 bg-gray-50 dark:bg-gray-500/10';

            return (
              <motion.div
                key={category.title}
                variants={fadeInUp}
                className="card-base"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
                  <div className={`p-2 sm:p-2.5 rounded-xl ${colorClass} shrink-0`}>
                    {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>
                <motion.div
                  variants={fastStaggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-1.5 sm:gap-2"
                >
                  {category.skills.map((skill) => (
                    <SkillBadge key={skill} name={skill} />
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
