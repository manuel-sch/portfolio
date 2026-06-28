/**
 * Lebenslauf – Client-seitige Interaktionen
 *
 * 1. Timeline-Crossfade: Scroll-getriebener Card-Stack mit verzögerter
 *    Einblendung der nächsten Card („Dip"-Timing).
 * 2. Skill-Bars: Animierte Prozentbalken via IntersectionObserver.
 *
 * STYLE-EXCEPTION: card.style.opacity, tab.style.opacity, tab.style.borderColor,
 * bar.style.width, bar.style.transition, bar.style.backgroundColor werden direkt
 * gesetzt, da sie scroll-/observer-getrieben sind und nicht sinnvoll über CSS
 * Custom Properties abgebildet werden können.
 */

// ---------------------------------------------------------------------------
// 1. Timeline Card Stack – Scroll-Crossfade
// ---------------------------------------------------------------------------

/** Für Cleanup bei View-Transition-Navigation */
let timelineAbortController: AbortController | null = null;

function initTimeline(): void {
  // Vorherige Listener aufräumen (View-Transition-Navigation)
  timelineAbortController?.abort();
  timelineAbortController = new AbortController();
  const { signal } = timelineAbortController;

  const cards = document.querySelectorAll<HTMLElement>('.timeline-card');
  const tabs = document.querySelectorAll<HTMLElement>('.timeline-tab');
  const section = document.getElementById('timeline-section');
  if (!cards.length || !section) return;

  // Schutz gegen doppelte Initialisierung
  if (section.dataset.timelineInitialized === 'true') return;
  section.dataset.timelineInitialized = 'true';

  const totalCards = cards.length;
  const CARD_SCROLL_HEIGHT = section.offsetHeight / totalCards;

  // Transition-Phasen (als Anteil der Card-Scroll-Strecke)
  const OUTGOING_START = 0.60;  // ab 60% beginnt Outgoing-Fade
  const INCOMING_START = 0.80;  // ab 80% beginnt Incoming-Fade

  const setActiveTab = (index: number): void => {
    tabs.forEach((tab, i) => {
      tab.style.opacity = i === index ? '1' : '0.4';
    });
  };

  const onScroll = (): void => {
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const scrollInSection = window.scrollY - sectionTop;
    if (scrollInSection < 0) return; // Sektion noch nicht erreicht

    const activeIndex = Math.min(
      Math.floor(scrollInSection / CARD_SCROLL_HEIGHT),
      totalCards - 1,
    );
    const progress = (scrollInSection % CARD_SCROLL_HEIGHT) / CARD_SCROLL_HEIGHT;

    // Tab-Indikator: umschalten, sobald die nächste Card sichtbar wird
    if (progress < INCOMING_START) {
      setActiveTab(activeIndex);
    } else {
      setActiveTab(Math.min(activeIndex + 1, totalCards - 1));
    }

    cards.forEach((card, i) => {
      if (i === activeIndex) {
        // Aktive Card: vor Transition-Zone voll sichtbar
        if (progress < OUTGOING_START) {
          card.style.opacity = '1';
        } else {
          // Outgoing: linear von 1→0 über die letzten 40%
          card.style.opacity = String(
            1 - (progress - OUTGOING_START) / (1 - OUTGOING_START),
          );
        }
      } else if (i === activeIndex + 1) {
        // Nächste Card: startet verzögert in der Transition-Zone
        if (progress < INCOMING_START) {
          card.style.opacity = '0';
        } else {
          // Incoming: linear von 0→1 über die letzten 20%
          card.style.opacity = String(
            (progress - INCOMING_START) / (1 - INCOMING_START),
          );
        }
      } else {
        card.style.opacity = '0';
      }
    });
  };

  // Tab-Klick: zur entsprechenden Card-Position scrollen
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const index = parseInt(tab.dataset.index ?? '0', 10);
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const targetScroll = sectionTop + index * CARD_SCROLL_HEIGHT;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }, { signal });
  });

  window.addEventListener('scroll', onScroll, { passive: true, signal });
  onScroll();

  // CSS-Transitionen erst nach initialem DOM-Setup aktivieren
  requestAnimationFrame(() => {
    section.classList.add('ready');
  });
}

// ---------------------------------------------------------------------------
// 2. Skill Bars – Prozent-Animation beim Hereinscrollen
// ---------------------------------------------------------------------------

const SKILL_BAR_EASING         = 'width 1s cubic-bezier(0.4, 0, 0.2, 1)';
const SKILL_OBSERVER_THRESHOLD = 0.3;
const SKILL_COUNTER_STEPS      = 40;

// -- Farb-Mapping für 3 Level-Stufen --
interface SkillColor {
  barColor: string;
  glowColor: string;
}

function getSkillColor(level: number): SkillColor {
  if (level <= 40) {
    return { barColor: '#F59E0B', glowColor: 'rgba(245,158,11,0.3)' };
  }
  if (level <= 70) {
    return {
      barColor: 'var(--color-accent)',
      glowColor: 'var(--color-accent-glow)',
    };
  }
  return {
    barColor: 'var(--color-accent-light)',
    glowColor: 'var(--color-accent-glow)',
  };
}

function initSkillBars(): void {
  const skillItems      = document.querySelectorAll<HTMLElement>('.skill-item');
  const totalSkillItems = skillItems.length;

  // Schutz gegen doppelte Initialisierung
  if (totalSkillItems === 0) return;
  const firstItem = skillItems[0];
  if (firstItem.dataset.skillsInitialized === 'true') return;
  firstItem.dataset.skillsInitialized = 'true';

  let completedCount    = 0;

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const bar     = entry.target.querySelector<HTMLElement>('.skill-bar');
      const counter = entry.target.querySelector<HTMLElement>('.skill-counter');
      if (!bar || !counter) return;

      const target = parseInt(bar.dataset.width ?? '0', 10);

      bar.style.width      = target + '%';
      bar.style.transition = SKILL_BAR_EASING;

      let current = 0;
      const step = (): void => {
        if (current < target) {
          current = Math.min(current + Math.ceil(target / SKILL_COUNTER_STEPS), target);
          counter.textContent = current + '%';

          if (current >= target) {
            const { barColor, glowColor } = getSkillColor(target);
            bar.style.backgroundColor = barColor;
            bar.style.setProperty('--glow-color', glowColor);

            completedCount++;

            // Synchronisierter Pulse: erst wenn ALLE Balken fertig geladen sind
            if (completedCount >= totalSkillItems) {
              setTimeout(() => {
                document.querySelectorAll<HTMLElement>('.skill-bar').forEach(b => {
                  b.classList.add('pulse');
                });
                setTimeout(() => {
                  document.querySelectorAll<HTMLElement>('.skill-bar').forEach(b => {
                    b.classList.remove('pulse');
                  });
                }, 600);
              }, 400);
            }
          }

          requestAnimationFrame(step);
        }
      };
      step();
      skillObserver.unobserve(entry.target);
    });
  }, { threshold: SKILL_OBSERVER_THRESHOLD });

  skillItems.forEach(el => skillObserver.observe(el));
}

// ---------------------------------------------------------------------------
// Bootstrap – Initialisierung bei Seitenaufruf & View-Transition
// ---------------------------------------------------------------------------

function initializeAll(): void {
  initTimeline();
  initSkillBars();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAll);
} else {
  initializeAll();
}

// Reinitialisierung nach Astro View Transition
// (dataset-Flags werden beim DOM-Austausch zurückgesetzt, daher direkt aufrufbar)
document.addEventListener('astro:after-swap', initializeAll);
