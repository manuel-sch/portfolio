/**
 * Mapping von Technologie-Namen zu Shields.io-Badge-Slug und Farbe.
 * Wird auf der Lebenslauf-Seite für Tech-Stack-Badges verwendet.
 */
export const techBadgeMap: Record<string, { slug: string; color: string }> = {
  'JavaScript':       { slug: 'javascript',      color: 'F7DF1E' },
  'SASS':             { slug: 'sass',             color: 'CC6699' },
  'Alpine.js':        { slug: 'alpinedotjs',      color: '8BC0D0' },
  'Kotlin':           { slug: 'kotlin',           color: '7F52FF' },
  'Android SDK':      { slug: 'android',          color: '3DDC84' },
  'Java':             { slug: 'openjdk',          color: '000000' },
  'Gradle':           { slug: 'gradle',           color: '02303A' },
  'Material Design':  { slug: 'materialdesign',   color: '757575' },
  'Azure':            { slug: 'azuredevops',      color: '0078D7' },
  'Android':          { slug: 'android',          color: '3DDC84' },
  'Jetpack':          { slug: 'android',          color: '4285F4' },
  'Coroutines':       { slug: 'kotlin',           color: 'B125EA' },
  'CI/CD':            { slug: 'azuredevops',      color: '0078D7' },
  'CMS':              { slug: '',                 color: '4A4A4A' },
  'Barrierefreiheit': { slug: '',                 color: '2B7A78' },
};

/** Bestimmt, ob eine Hex-Farbe hell ist (für Logo-Textfarbe). */
export function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}

/** Erzeugt eine Shields.io-Badge-URL für eine Technologie. */
export function getBadgeUrl(tech: string): string {
  const entry = techBadgeMap[tech];
  const color = entry?.color ?? '555555';

  if (entry?.slug) {
    const logoColor = isLightColor(entry.color) ? '000' : 'FFF';
    return `https://img.shields.io/badge/${encodeURIComponent(tech)}-${color}?style=flat&logo=${entry.slug}&logoColor=${logoColor}`;
  }

  return `https://img.shields.io/badge/${encodeURIComponent(tech)}-${color}?style=flat`;
}
