import { motion } from 'framer-motion';
import { scaleIn } from '../constants/animations';

interface SkillBadgeProps {
  name: string;
}

export default function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <motion.span
      variants={scaleIn}
      className="badge-pill hover:border-accent/30 hover:shadow-sm cursor-default"
    >
      {name}
    </motion.span>
  );
}
