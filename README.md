# Gaurav Vibhandik — Software & DevOps Engineer Portfolio

A professional portfolio website built with React 19, TypeScript, Tailwind CSS, and Framer Motion. Designed for campus placements — recruiter-ready, fully responsive, and deployment-optimized for Vercel.

## Tech Stack

- **React 19** + **Vite** + **TypeScript** — fast builds, type safety
- **Tailwind CSS v4** — utility-first styling with custom design tokens
- **Framer Motion** — page transitions, scroll reveals, typing animation
- **React Router v7** — multi-page SPA with animated route transitions
- **Lucide React** — clean, consistent iconography

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── AnimatedTyping.tsx    # Role-cycling typewriter effect
│   ├── Footer.tsx
│   ├── Layout.tsx            # Page wrapper with Navbar + Footer
│   ├── Navbar.tsx            # Sticky nav with mobile menu + theme toggle
│   ├── ProjectCard.tsx       # Equal-height project cards
│   ├── ScrollToTop.tsx
│   ├── SectionHeading.tsx
│   ├── SkillBadge.tsx
│   ├── ThemeToggle.tsx       # Sun/Moon icon toggle
│   └── TimelineItem.tsx      # Experience timeline entries
├── constants/
│   ├── animations.ts         # Shared Framer Motion variants
│   └── data.ts               # All content data (skills, projects, etc.)
├── hooks/
│   └── useTheme.ts           # Light/dark mode with system preference
├── pages/
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Experience.tsx
│   ├── Home.tsx
│   ├── NotFound.tsx
│   ├── Projects.tsx
│   └── Skills.tsx
├── App.tsx                    # Router configuration
├── index.css                  # Tailwind imports + design tokens
└── main.tsx                   # Entry point
```

## Deployment (Vercel)

This project is pre-configured for zero-config Vercel deployment:

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Framework preset: **Vite**
4. Deploy — that's it

The `vercel.json` handles SPA rewrites for React Router.

## Resume

The `public/resume.pdf` is a **placeholder**. Replace it with your actual resume PDF before deploying to production.

## Features

- 🌗 Light/dark mode with system preference detection
- 🎨 Professional design with Inter typography and curated color palette
- ✨ Smooth page transitions and scroll-triggered animations
- ⌨️ Role-cycling typing animation on the hero
- 📱 Fully responsive — mobile, tablet, desktop
- 📋 Copy-to-clipboard on contact details
- 🔍 SEO-optimized with meta tags and Open Graph
- ♿ Accessible with semantic HTML and ARIA labels

## License

MIT
