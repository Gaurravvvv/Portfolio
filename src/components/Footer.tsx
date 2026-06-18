import { Mail, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';
import { SITE } from '../constants/data';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
      <div className="section-container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center gap-1">
            © {year} Gaurav Vibhandik. Built with{' '}
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> and
            React.
          </p>

          <div className="flex items-center gap-3">
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white
                         hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="GitHub profile"
            >
              <GithubIcon className="w-[18px] h-[18px]" />
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white
                         hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="LinkedIn profile"
            >
              <LinkedinIcon className="w-[18px] h-[18px]" />
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white
                         hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Send email"
            >
              <Mail className="w-[18px] h-[18px]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
