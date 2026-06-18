import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { pageTransition, staggerContainer, fadeInUp } from '../constants/animations';

export default function NotFound() {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex items-center justify-center"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="section-container text-center"
      >
        <motion.h1
          variants={fadeInUp}
          className="text-8xl md:text-9xl font-extrabold text-gray-200 dark:text-slate-800"
        >
          404
        </motion.h1>
        <motion.h2
          variants={fadeInUp}
          className="mt-4 text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
        >
          Page not found
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="mt-3 text-gray-500 dark:text-gray-400 max-w-md mx-auto"
        >
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </motion.p>
        <motion.div
          variants={fadeInUp}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <Link to="/" className="btn-primary">
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-secondary cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
