/**
 * View Transition – Apple-Style Page-Transition
 *
 * Sanfter Crossfade mit minimaler Skalierung (0.98→1).
 * Fühlt sich an wie „die Seite atmet ein".
 *
 * @see src/styles/global.css – @keyframes vt-fade-in / vt-fade-out
 */

import type { TransitionDirectionalAnimations } from 'astro:transitions';

export const pageTransition: TransitionDirectionalAnimations = {
  forwards: {
    old: [
      {
        name: 'vt-fade-out',
        duration: '400ms',
        easing: 'ease-out',
        fillMode: 'both',
      },
    ],
    new: [
      {
        name: 'vt-fade-in',
        duration: '600ms',
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        fillMode: 'both',
      },
    ],
  },
  backwards: {
    old: [
      {
        name: 'vt-fade-out',
        duration: '400ms',
        easing: 'ease-out',
        fillMode: 'both',
      },
    ],
    new: [
      {
        name: 'vt-fade-in',
        duration: '600ms',
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        fillMode: 'both',
      },
    ],
  },
};
