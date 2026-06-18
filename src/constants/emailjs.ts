/**
 * EmailJS Configuration
 *
 * To set up:
 * 1. Go to https://www.emailjs.com/ and create a free account
 * 2. Add Gmail as an Email Service → copy the Service ID
 * 3. Create an Email Template (use the template below) → copy the Template ID
 * 4. Go to Account → API Keys → copy your Public Key
 * 5. Paste all three values below
 */
export const EMAILJS_CONFIG = {
  serviceId: 'service_f6syyjk',    // e.g. 'service_abc123'
  templateId: 'template_mzq39yb',  // e.g. 'template_xyz789'
  publicKey: 'sIsVcFBVSh6bsAhut',    // e.g. 'aBcDeFgHiJkLmN'
} as const;
