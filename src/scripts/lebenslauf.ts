/**
 * Lebenslauf – Client-seitige Interaktionen
 *
 * 1. Timeline-Sticky-Scroll: Vertikales Durchscrollen der Berufserfahrung
 *    als Card-Stack mit Fade/Slide-Animation und seitlichem Text-Indikator.
 * 2. Skill-Bars: Animierte Prozentbalken via IntersectionObserver.
 */

// ---------------------------------------------------------------------------
// 1. Timeline Card Stack – Scroll-Animation
// ---------------------------------------------------------------------------

// -- Positionierung der Karten relativ zur aktiven Karte --
const CARD_PAST_Y_OFFSET        = -40;  // translateY für bereits passierte Karten
const CARD_PAST_SCALE           = 0.9;  // scale für bereits passierte Karten
const CARD_FUTURE_Y_OFFSET      = 80;   // translateY für nachfolgende Karten
const CARD_FUTURE_SCALE         = 0.88; // scale für nachfolgende Karten

// -- Exit-Animation: aktive Karte fährt langsam nach oben heraus --
const ACTIVE_EXIT_Y_PER_PROGRESS     = 50;   // translateY-Faktor pro Fortschritt
const ACTIVE_EXIT_SCALE_PER_PROGRESS = 0.05; // scale-Abnahme pro Fortschritt

// -- Text-Indikator --
const INDICATOR_INACTIVE_OPACITY = 0.25;
const INDICATOR_CLICK_OFFSET_PX  = 10;

/**
 * Berechnet den aktuellen Scroll-Zustand innerhalb der Timeline-Sektion.
 *
 * @returns activeIndex  – welche Karte gerade sichtbar ist (0-basiert)
 * @returns progress     – wie weit der Nutzer innerhalb dieser Karte gescrollt hat (0…1)
 */
function computeTimelineScrollState(
  section: HTMLElement,
  scrollPerCard: number,
  totalCards: number,
): { activeIndex: number; progress: number } {
  const sectionTopInPage = section.getBoundingClientRect().top + window.scrollY;
  const rawScroll        = Math.max(0, window.scrollY - sectionTopInPage);
  const sectionHeight    = section.offsetHeight;
  const isPastSection    = rawScroll >= sectionHeight;
  const clampedScroll    = isPastSection ? sectionHeight : rawScroll;
  const activeIndex      = Math.min(Math.floor(clampedScroll / scrollPerCard), totalCards - 1);
  const progress         = isPastSection
    ? 1
    : Math.min((clampedScroll % scrollPerCard) / scrollPerCard, 1);

  return { activeIndex, progress };
}

/**
 * Wendet CSS-Transform und Opacity auf eine Karte an, abhängig von ihrer
 * Distanz zur aktiven Karte.
 *
 * @param distanceFromActive  < 0 = bereits passiert | 0 = aktiv | > 0 = kommt noch
 * @param isLastCard          true, wenn die aktive Karte die letzte der Liste ist
 */
function applyCardStyle(
  card: HTMLElement,
  glow: HTMLElement | undefined,
  distanceFromActive: number,
  isLastCard: boolean,
  progress: number,
): void {
  // -- Bereits passierte Karten: ausgeblendet, nach oben verschoben --
  if (distanceFromActive < 0) {
    card.style.opacity       = '0';
    card.style.transform     = `translateY(${CARD_PAST_Y_OFFSET}px) scale(${CARD_PAST_SCALE})`;
    card.style.pointerEvents = 'none';
    card.style.visibility    = 'hidden';
    if (glow) glow.style.opacity = '0';
    return;
  }

  // -- Nachfolgende Karten: ausgeblendet, nach unten versetzt --
  if (distanceFromActive > 0) {
    card.style.opacity       = '0';
    card.style.transform     = `translateY(${CARD_FUTURE_Y_OFFSET}px) scale(${CARD_FUTURE_SCALE})`;
    card.style.pointerEvents = 'none';
    card.style.visibility    = 'hidden';
    if (glow) glow.style.opacity = '0';
    return;
  }

  // -- Aktive Karte: voll sichtbar, Exit-Animation nur für nicht-letzte Karten --
  const shouldExit = !isLastCard && progress > 0;
  const translateY = shouldExit ? -progress * ACTIVE_EXIT_Y_PER_PROGRESS : 0;
  const scale      = shouldExit ? 1 - progress * ACTIVE_EXIT_SCALE_PER_PROGRESS : 1;

  card.style.opacity       = '1';
  card.style.transform     = `translateY(${translateY}px) scale(${scale})`;
  card.style.pointerEvents = 'auto';
  card.style.visibility    = 'visible';
  if (glow) glow.style.opacity = '0';
}

/**
 * Aktualisiert die Opacity der seitlichen Text-Indikatoren.
 * Nur der Indikator der aktiven Karte leuchtet voll.
 */
function highlightActiveIndicator(
  indicators: NodeListOf<HTMLElement>,
  activeIndex: number,
): void {
  indicators.forEach((indicator, index) => {
    indicator.style.opacity = index === activeIndex ? '1' : String(INDICATOR_INACTIVE_OPACITY);
  });
}

function initTimeline(): void {
  const cards      = document.querySelectorAll<HTMLElement>('.timeline-card');
  const glows      = document.querySelectorAll<HTMLElement>('.card-glow');
  const indicators = document.querySelectorAll<HTMLElement>('.timeline-indicator');
  const section    = document.getElementById('timeline-section');

  if (!cards.length || !section) return;

  const totalCards         = cards.length;
  const scrollPerCard      = section.offsetHeight / totalCards;
  let previousActiveIndex  = 0;

  // -- Scroll-Handler: berechnet aktuellen Karten-Index und rendert alle Karten --
  const onTimelineScroll = (): void => {
    const { activeIndex, progress } = computeTimelineScrollState(section, scrollPerCard, totalCards);

    previousActiveIndex = activeIndex;

    cards.forEach((card, index) => {
      const distanceFromActive = index - activeIndex;
      const isLastCard         = activeIndex === totalCards - 1;
      applyCardStyle(card, glows[index], distanceFromActive, isLastCard, progress);
    });

    highlightActiveIndicator(indicators, activeIndex);
  };

  // -- Klick auf Text-Indikator: zu entsprechender Karte springen --
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      const sectionTopInPage = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: sectionTopInPage + scrollPerCard * index + INDICATOR_CLICK_OFFSET_PX,
        behavior: 'smooth',
      });
    });
  });

  // -- Initialen Zustand ohne Transition setzen, dann CSS-Transition aktivieren --
  onTimelineScroll();
  requestAnimationFrame(() => {
    cards.forEach(card => {
      card.style.transition = 'all 600ms ease-out';
    });
  });
  window.addEventListener('scroll', onTimelineScroll, { passive: true });
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
  const skillItems    = document.querySelectorAll<HTMLElement>('.skill-item');
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
            setTimeout(() => {
              bar.classList.add('pulse');
              setTimeout(() => bar.classList.remove('pulse'), 600);
            }, 500);
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

// -- Bootstrap: Initialisierung, sobald DOM bereit ist --
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initTimeline();
    initSkillBars();
  });
} else {
  initTimeline();
  initSkillBars();
}
