# Portfolio – Agent Context

> Schlanker Kontext für Agent-Sessions. Keine CV-Daten, keine Code-Beispiele.
> Stand: 23.06.2026

## Ziel
Minimalistische Portfolio-Website für Manuel Scholtes (B.Sc. Software Engineer). Clean, modern, Tech-Ästhetik. Mit CMS zur einfachen Content-Pflege.

## Tech-Stack
- **Astro 5** – SSG, Content-driven
- **Keystatic** – Git-basiertes CMS, nativ in Astro integriert
- **Tailwind CSS 4** – Utility-First
- **Motion** – Animationen als React-Islands
- **Phosphor Icons** – Clean, modern
- **Vercel** – Hosting + Auto-Deploy (kostenlos)

## Design
Dark Tech Minimalism – reduziert, typografie-zentriert, viel Weißraum. Warmes Weiß im Light-Mode, Deep Charcoal im Dark-Mode. Violette Akzente. DM Sans + Space Grotesk. Glassmorphism auf Cards, Header und Hero-Elementen.

## Projektstruktur
```
portfolio/
├── public/images/
├── src/
│   ├── content/              # YAML (von Keystatic verwaltet)
│   │   ├── profile.yaml
│   │   ├── cv.yaml
│   │   └── projects/*.yaml
│   ├── pages/                # File-based Routing
│   │   ├── index.astro
│   │   ├── lebenslauf.astro
│   │   ├── projekte.astro
│   │   └── impressum.astro
│   ├── components/
│   │   ├── layout/           # Header (Glass), Footer, ThemeToggle
│   │   ├── home/             # HeroSection, AboutPreview
│   │   ├── cv/               # Timeline, SkillsGrid, BadgeCloud
│   │   ├── projects/         # ProjectScroller, ProjectSlide
│   │   └── ui/               # Container, Button, Badge, FadeIn
│   ├── layouts/BaseLayout.astro
│   ├── keystatic/            # CMS Config & Collections
│   ├── styles/global.css
│   └── lib/
├── astro.config.mjs
├── keystatic.config.ts
└── package.json
```

## Seiten-Konzept
1. **`/`** – Hero (Avatar, Name, Titel, Social-Icons) + About-Preview (2-3 Sätze). Keine Projekte.
2. **`/lebenslauf`** – Vertikale Timeline, Skills-Balken + Badge-Cloud, Ausbildung, Sprachen.
3. **`/projekte`** – Horizontaler Snap-Scroll. Nur EIN Projekt auf einmal. Pfeile + Indikator-Punkte.

## Deployment
- Push auf `main` → Vercel deployt automatisch
- Content-Update: `/keystatic` → editieren → Commit in Repo → Vercel deployt neu
