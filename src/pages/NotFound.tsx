import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal, ArrowLeft } from 'lucide-react';
import { pageTransition, staggerContainer, fadeInUp } from '../constants/animations';

export default function NotFound() {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex items-center justify-center font-mono p-4"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md card-base space-y-5"
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-1.5 border-b border-border pb-3 mb-1 text-xs text-gray-500">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <span className="ml-2 text-[10px] tracking-tight">bash --error-handler</span>
        </div>

        {/* Error Simulation */}
        <div className="space-y-2.5 text-left text-xs sm:text-sm">
          <motion.div variants={fadeInUp} className="flex gap-2">
            <span className="text-accent">$</span>
            <span>cd /requested-route</span>
          </motion.div>
          <motion.div variants={fadeInUp} className="text-red-500/90 font-semibold leading-relaxed">
            bash: cd: /requested-route: No such file or directory
          </motion.div>
          <motion.div variants={fadeInUp} className="text-yellow-600 dark:text-yellow-500 text-xs pt-2">
            [WARNING] Route resolution failed. Shell exit code: 404 (Not Found)
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          variants={fadeInUp}
          className="mt-6 pt-4 border-t border-border flex items-center gap-2.5"
        >
          <Link to="/" className="btn-primary text-xs py-2 px-3 sm:px-4">
            <Terminal className="w-3.5 h-3.5" />
            ./go_home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-secondary text-xs py-2 px-3 sm:px-4 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            cd ..
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
