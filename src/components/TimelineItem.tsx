import { motion } from 'framer-motion';
import { Briefcase, Users, GraduationCap, Trophy } from 'lucide-react';
import { fadeInLeft } from '../constants/animations';
import type { ExperienceItem } from '../constants/data';

const TYPE_CONFIG = {
  work: { icon: Briefcase, color: 'bg-blue-500', label: 'Work' },
  community: { icon: Users, color: 'bg-emerald-500', label: 'Community' },
  education: { icon: GraduationCap, color: 'bg-purple-500', label: 'Education' },
  achievement: { icon: Trophy, color: 'bg-amber-500', label: 'Achievement' },
} as const;

interface TimelineItemProps {
  item: ExperienceItem;
  index: number;
}

export default function TimelineItem({ item, index }: TimelineItemProps) {
  const config = TYPE_CONFIG[item.type];
  const Icon = config.icon;

  return (
    <motion.div
      variants={fadeInLeft}
      custom={index}
      className="relative flex gap-3 sm:gap-6 group"
    >
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <div
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${config.color} flex items-center justify-center
                      shadow-lg ring-4 ring-white dark:ring-slate-900 shrink-0 z-10`}
        >
          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
        </div>
        <div className="w-0.5 flex-1 bg-gray-200 dark:bg-slate-700 -mt-1" />
      </div>

      {/* Content card */}
      <div className="card-base flex-1 mb-6 sm:mb-8 group-last:mb-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2 sm:mb-3">
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-snug">
              {item.title}
            </h3>
            {item.organization && (
              <p className="text-xs sm:text-sm font-medium text-accent truncate">
                {item.organization}
              </p>
            )}
          </div>
          {item.period && (
            <span className="text-[10px] sm:text-xs font-medium text-gray-400 dark:text-gray-500 whitespace-nowrap bg-gray-100 dark:bg-slate-800 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full self-start sm:self-auto">
              {item.period}
            </span>
          )}
        </div>

        <ul className="space-y-1 sm:space-y-1.5">
          {item.description.map((desc, i) => (
            <li
              key={i}
              className="flex gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/50 shrink-0" />
              <span>{desc}</span>
            </li>
          ))}
        </ul>

        {item.link && item.linkLabel && (
          <button
            onClick={() => document.getElementById(item.link!.replace('/', ''))?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-1 mt-2 sm:mt-3 text-xs sm:text-sm font-medium text-accent hover:underline cursor-pointer"
          >
            {item.linkLabel}
          </button>
        )}
      </div>
    </motion.div>
  );
}
