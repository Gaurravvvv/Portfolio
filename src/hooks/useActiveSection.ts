import { useState, useEffect, useRef } from 'react';

const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'experience', 'contact'] as const;
export type SectionId = (typeof SECTION_IDS)[number];

/**
 * Uses IntersectionObserver to track which section occupies the most viewport.
 * Returns the id of the currently active section.
 */
export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>('home');
  const ratios = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.current.set(entry.target.id, entry.intersectionRatio);
        }

        // Find section with highest visible ratio
        let maxRatio = 0;
        let maxId: SectionId = 'home';
        for (const [id, ratio] of ratios.current) {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            maxId = id as SectionId;
          }
        }

        // Also check scroll position for edge cases (top of page = home)
        if (window.scrollY < 100) {
          setActive('home');
        } else {
          setActive(maxId);
        }
      },
      {
        // Multiple thresholds for granular tracking
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        // Offset for the sticky navbar height
        rootMargin: '-72px 0px 0px 0px',
      }
    );

    // Observe all sections
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return active;
}
