import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import TimelineItem from '../components/TimelineItem';
import { staggerContainer } from '../constants/animations';
import { EXPERIENCES } from '../constants/data';

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 sm:py-20 md:py-24">
      <div className="section-container">
        <SectionHeading
          title="Experience"
          subtitle="Internships, community leadership, education, and competitive achievements."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="max-w-3xl"
        >
          {EXPERIENCES.map((item, i) => (
            <TimelineItem key={item.title} item={item} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
