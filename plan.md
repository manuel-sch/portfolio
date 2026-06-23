# Portfolio – Agent Context

> Schlanker Kontext für Agent-Sessions. Keine CV-Daten, keine Code-Beispiele.
> Stand: 23.06.2026

## Ziel
Apple-minimalistische Portfolio-Website für Manuel Scholtes (B.Sc. Software Engineer). Mit CMS zur einfachen Content-Pflege ohne Code.

## Tech-Stack
- **Astro 5** – SSG, Content-driven
- **Keystatic** – Git-basiertes CMS, nativ in Astro integriert
- **Tailwind CSS 4** – Utility-First
- **Motion** – Animationen als React-Islands
- **Phosphor Icons** – Clean, Apple-like
- **Vercel** – Hosting + Auto-Deploy (kostenlos)

## Design-System (Dark Tech Minimalism)

- Hintergrund: Deep Charcoal `#0E0E10`, Cards `#18181C`
- Akzent: Electric Violet `#8B5CF6` → Hell `#A78BFA`
- Font Body: DM Sans, Headings: Space Grotesk
- Glassmorphism Header: `bg-bg/70 backdrop-blur-xl`
- Keine Apple-Farbpalette, kein Inter-Font

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
3. **`/projekte`** – Apple-Style horizontaler Snap-Scroll. Nur EIN Projekt auf einmal. Pfeile + Indikator-Punkte.

## Deployment
- Push auf `main` → Vercel deployt automatisch
- Content-Update: `/keystatic` → editieren → Commit in Repo → Vercel deployt neu
