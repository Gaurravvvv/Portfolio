import { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Copy,
  Check,
  Loader2,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/icons';
import SectionHeading from '../components/SectionHeading';
import {
  staggerContainer,
  fadeInLeft,
  fadeInRight,
} from '../constants/animations';
import { SITE } from '../constants/data';
import { EMAILJS_CONFIG } from '../constants/emailjs';

interface ContactDetail {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
  copyable: boolean;
}

const CONTACT_DETAILS: ContactDetail[] = [
  {
    icon: Mail,
    label: 'Email',
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    copyable: true,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: SITE.phone,
    href: `tel:${SITE.phone}`,
    copyable: true,
  },
  {
    icon: GithubIcon,
    label: 'GitHub',
    value: 'gaurravvvv',
    href: SITE.github,
    copyable: false,
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    value: 'gaurravvvv',
    href: SITE.linkedin,
    copyable: false,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: SITE.location,
    href: '#',
    copyable: false,
  },
];

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function ContactSection() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<FormStatus>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleCopy = useCallback(async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(label);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Clipboard API may not be available
    }
  }, []);

  const isConfigured =
    EMAILJS_CONFIG.serviceId !== 'YOUR_SERVICE_ID' &&
    EMAILJS_CONFIG.templateId !== 'YOUR_TEMPLATE_ID' &&
    EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConfigured) {
      // Fallback when EmailJS isn't configured yet
      window.location.href = `mailto:${SITE.email}?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.email}`;
      return;
    }

    setStatus('sending');

    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          reply_to: formData.email,
          to_name: 'Gaurav',
          to_email: SITE.email,
          message: formData.message,
        },
        EMAILJS_CONFIG.publicKey
      );

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err: unknown) {
      const errorMsg = err instanceof Object && 'text' in err ? (err as { text: string }).text : String(err);
      console.error('EmailJS error:', errorMsg);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 font-mono">
      <div className="section-container">
        <SectionHeading
          title="Get In Touch"
          subtitle="Open to Software Engineering and DevOps roles. Let's connect."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Contact form */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="card-base space-y-4 sm:space-y-5">
              <div className="flex items-center gap-1.5 border-b border-border pb-3 mb-2 text-xs text-gray-500">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 font-mono text-[10px] tracking-tight text-gray-400">send_message.sh</span>
              </div>

              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 sm:mb-1.5"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-md bg-white/[0.02] dark:bg-[#0a0a0c]/40 border border-border
                             text-gray-900 dark:text-white text-sm font-mono
                             focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent
                             placeholder:text-gray-400 dark:placeholder:text-gray-700"
                  placeholder="gaurav_vibhandik"
                  disabled={status === 'sending'}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 sm:mb-1.5"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-md bg-white/[0.02] dark:bg-[#0a0a0c]/40 border border-border
                             text-gray-900 dark:text-white text-sm font-mono
                             focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent
                             placeholder:text-gray-400 dark:placeholder:text-gray-700"
                  placeholder="visitor@mail.com"
                  disabled={status === 'sending'}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 sm:mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, message: e.target.value }))
                  }
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-md bg-white/[0.02] dark:bg-[#0a0a0c]/40 border border-border
                             text-gray-900 dark:text-white text-sm resize-none font-mono
                             focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent
                             placeholder:text-gray-400 dark:placeholder:text-gray-700"
                  placeholder="System: Write your proposal here..."
                  disabled={status === 'sending'}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className={`btn-primary w-full justify-center ${
                  status === 'sending' ? 'opacity-70 cursor-wait' : ''
                }`}
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    STATUS: SENDING...
                  </>
                ) : status === 'success' ? (
                  <>
                    <Check className="w-4 h-4" />
                    STATUS: DELIVERED
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    ./submit_form
                  </>
                )}
              </button>

              {/* Status feedback */}
              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-emerald-600 dark:text-accent font-semibold text-center mt-2"
                >
                  [SUCCESS] Message successfully routed to gaurav-mesh.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-600 dark:text-red-400 font-semibold text-center mt-2"
                >
                  [ERROR] Failed to send. Please email me directly at {SITE.email}.
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Contact details */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-2.5 sm:space-y-3"
          >
            {CONTACT_DETAILS.map((detail) => {
              const Icon = detail.icon;
              const isCopied = copiedField === detail.label;

              return (
                <motion.div
                  key={detail.label}
                  variants={fadeInRight}
                  className="card-base flex items-center gap-3 sm:gap-4 group"
                >
                  <div className="p-2 sm:p-2.5 rounded-lg bg-accent/5 text-accent border border-accent/15 shrink-0">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  <div className="flex-1 min-w-0 font-mono">
                    <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                      {detail.label}
                    </p>
                    {detail.href !== '#' ? (
                      <a
                        href={detail.href}
                        target={detail.href.startsWith('http') ? '_blank' : undefined}
                        rel={detail.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white hover:text-accent transition-colors truncate block"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {detail.value}
                      </p>
                    )}
                  </div>

                  {detail.copyable && (
                    <button
                      onClick={() => handleCopy(detail.value, detail.label)}
                      className="p-2 rounded-lg text-gray-400 hover:text-accent hover:bg-accent/10
                                 transition-all duration-200 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer"
                      aria-label={`Copy ${detail.label}`}
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </motion.div>
              );
            })}

            {/* Toast for copy confirmation */}
            {copiedField && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-[#0d0d10] border border-accent/20 text-accent
                           px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium shadow-lg z-50
                           flex items-center gap-2"
              >
                <Check className="w-4 h-4 text-accent" />
                [SYSTEM] {copiedField} copied to clipboard
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
