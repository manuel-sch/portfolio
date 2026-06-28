---
name: coding-standards
description: Coding-Standards für das Portfolio – Inline-Styles, Komponenten-Architektur, TypeScript, CSS/SCSS, Accessibility.
---

# Coding-Standards – Portfolio

## 🔴 MUST
- **Keine Inline-Styles** – statische via Tailwind, dynamische via `data-`-Attribute + CSS, JS-getriebene via 
- **BEM-Zustandsklassen** (`.block--active`, `.block--hidden`). 
- **JS kennt setzt nicht Styles selbst**, nur Prperties via CSS Custom Properties** (`style.setProperty('--prop', val)`) oder den BEM-Style
- **Keine `style:`-Direktiven** in Astro-Templates – durch `data-`-Attribute + CSS-Selektoren ersetzen
- **Single-Responsibility** – Komponenten max. 150 Zeilen, Skripte max. 200 Zeilen
- **Scoped Styles** – `<style>` immer scoped; `is:global` nur mit Begründung (Keyframes in `src/styles/` ablegen)
- **SCSS nutzen** – `<style lang="scss">` statt `<style>`; SCSS-Mixins für duplizierte Patterns
- **Keine CSS-Duplikation** – wiederholte Patterns via SCSS `@mixin` in `src/styles/` zentralisieren
- **Props typisieren** – `export interface Props {}` vor jeder Astro-Komponente
- **Kein `any`** – TypeScript strict-mode nicht aufweichen
- **Semantisches HTML** – `<nav>`, `<section>`, `<article>` statt `<div>`-Suppe
- **ARIA** – interaktive Elemente haben `aria-label`
- **`prefers-reduced-motion`** respektieren
- **Temporäre JS-Effekte** mit `// STYLE-EXCEPTION`-Kommentar markieren
- **Magic Numbers vermeiden** – als benannte Konstanten definieren

## 🟠 SHOULD
- Tailwind sortieren: Layout → Spacing → Typography → Visual → States
- Interfaces vor inline-Type-Annotationen
- JS-Logik als separate `.ts`-Module in `src/scripts/` auslagern
- PascalCase für Komponenten, camelCase für Scripts/Daten
- **JS-getriebene via CSS Custom Properties** (`style.setProperty('--prop', val)`); SCSS definiert visuelle Properties via `var()`
