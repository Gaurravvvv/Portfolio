import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import TimelineItem from '../components/TimelineItem';
import { EXPERIENCES } from '../constants/data';

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="experience" className="py-16 sm:py-20 md:py-24">
      <div className="section-container">
        <SectionHeading
          title="Experience"
          subtitle="Internships, community leadership, education, and competitive achievements."
        />

        <div ref={containerRef} className="relative max-w-3xl ml-0">
          {/* Static Grey Timeline Line */}
          <div className="absolute left-[15px] sm:left-[19px] top-4 bottom-4 w-0.5 bg-gray-200 dark:bg-zinc-800 z-0" />

          {/* Active Filling Line (Scroll-Driven) */}
          <motion.div
            className="absolute left-[15px] sm:left-[19px] top-4 bottom-4 w-0.5 bg-accent origin-top z-0"
            style={{ scaleY }}
          />

          <div className="relative space-y-2">
            {EXPERIENCES.map((item, i) => (
              <TimelineItem key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
