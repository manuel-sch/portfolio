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

## Architektur-Prinzipien
- Astro: `static` Output. Zero JS by default. React-Islands nur für Animationen & Dark Mode Toggle.
- Content in `src/content/*.yaml`. Keystatic liest & schreibt per GitHub API. Keine DB.
- Admin unter `/keystatic` via GitHub OAuth.
- Tailwind 4: `@theme`-Block. Custom Properties für Farben.
- Glassmorphism Header (`backdrop-blur-xl`). Cards `rounded-2xl` mit feinem Border.
- Typografie als Haupt-Stilmittel (Font: Inter, selbst gehostet). Viel Weißraum.

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
