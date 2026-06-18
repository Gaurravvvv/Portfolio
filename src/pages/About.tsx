import { motion } from 'framer-motion';
import { Rocket, BookOpen, Compass, Users } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { staggerContainer, fadeInUp } from '../constants/animations';

const RIGHT_NOW = [
  {
    icon: Rocket,
    label: 'Building',
    value: 'Real-time collaborative applications with sub-16ms rendering engines',
    color: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10',
  },
  {
    icon: BookOpen,
    label: 'Learning',
    value: 'Kubernetes orchestration, CI/CD pipeline optimization, and system design',
    color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10',
  },
  {
    icon: Compass,
    label: 'Exploring',
    value: 'AI/ML integration in production systems — LangChain, Gemini, Groq inference',
    color: 'text-purple-500 bg-purple-50 dark:bg-purple-500/10',
  },
  {
    icon: Users,
    label: 'Leading',
    value: 'Open Source initiatives at GDG on Campus — mentoring 40+ developers',
    color: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-24">
      <div className="section-container">
        <SectionHeading
          title="About Me"
          subtitle="Engineer. Builder. Shipping products that handle real users at real scale."
        />

        {/* Profile summary */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-12 mb-16 sm:mb-20"
        >
          <motion.div variants={fadeInUp} className="lg:col-span-3 space-y-4 sm:space-y-5">
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              I'm a final-year B.E. student in Artificial Intelligence & Data Science
              at MET Institute of Engineering, Nashik. I build software that works under
              pressure — real-time systems handling 20+ concurrent users, custom rendering
              engines hitting 60FPS, and DevOps pipelines that don't break at 2 AM.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              My work sits at the intersection of full-stack engineering and DevOps:
              React frontends backed by Node.js and Flask services, containerized with
              Docker, deployed on AWS, and monitored through CI/CD pipelines. I've shipped
              three production applications, each solving real problems with measurable
              engineering outcomes.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Beyond code, I lead the Open Source vertical at Google Developer Group on Campus,
              organizing workshops for 300+ members and mentoring students on Git, cloud tools,
              and modern development workflows.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <div className="card-base">
              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3 sm:mb-4">
                Quick Facts
              </h3>
              <dl className="space-y-2.5 sm:space-y-3">
                {[
                  ['Education', 'B.E. AI & Data Science'],
                  ['CGPA', '8.8'],
                  ['Location', 'Nashik, India'],
                  ['Focus', 'Full-Stack · DevOps · AI/ML'],
                  ['Status', 'Open to SDE / DevOps roles'],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between items-start gap-3 sm:gap-4">
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-500 whitespace-nowrap">
                      {label}
                    </dt>
                    <dd className="text-xs sm:text-sm text-gray-900 dark:text-white text-right font-medium">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Now section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8"
          >
            Right Now
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {RIGHT_NOW.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  variants={fadeInUp}
                  className="card-base flex gap-3 sm:gap-4 items-start"
                >
                  <div className={`p-2 sm:p-2.5 rounded-xl ${item.color} shrink-0`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                      {item.label}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
