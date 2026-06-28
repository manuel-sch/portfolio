---
name: design-rules
description: >-
  Nutze diesen Skill bei Design-Fragen, UI-Visualisierung, Animation-Bewertung,
  Komponenten-Styling oder Theme-Anpassungen.
  Enthält die vollständige Design-Sprache: Interaktions-Patterns, Animationen, Theme).
---

# Design Rules – Animation & Interaction

> Design-Sprache für die Portfolio-Seite. Beschreibt WAS sich wie anfühlen soll, nicht WIE es technisch umgesetzt wird.s

---

## Interaktive Buttons (CTA, Social, Footer)

- Satisfaction durch minimales Vergrößern bei Annäherung, sanftes Verkleinern beim Drücken
- Fühlt sich an wie ein physischer Knopf mit haptischem Feedback
- Weiche Übergänge – kein „Springen", kein Ruckeln

## Icon-Buttons (ThemeToggle)

- Spielerischer als Text-Buttons: Rotation beim Zustandswechsel
- Kurzer Leuchteffekt nach erfolgter Aktion als visuelle Bestätigung
- Fühlt sich belohnend an – wie ein kleiner „Erfolgs-Moment"

## Navigations-Links

- Unterstreichung gleitet von links herein bei Hover (Sliding Underline)
- Dezent vergrößert sich der Link-Text bei Annäherung
- Weicher Rücklauf beim Verlassen

## Daten-Visualisierung (Skill-Bars)

- Drei Intensitäts-Level, die Fortschritt visuell kommunizieren:
  - „Im Aufbau" – warm, einladend
  - „Solide" – im Accent-Ton
  - „Experte" – leuchtende Accent-Variante
- Balken füllt sich animiert beim Erscheinen (Viewport-Entry)
- Kurzer Pulse-Glow nach Abschluss der Füll-Animation als Abschlussakzent

---

## Transition-Prinzipien

- **Nicht alles animieren** – nur gezielt `transform`, `color` und `background-color`
- Dauer: kurz und präzise; Hover etwas langsamer als Click (schnelles „Eindrücken")
- Komplexere Sequenzen mit dezentem Overshoot für satisfying Gefühl – kein lineares Abspulen
- Animationen fühlen sich „gemeißelt" an, nicht schwammig

---

## Glassmorphism

- Pur und reduziert: Unschärfe-Hintergrund, dezente Transparenz, feine Border
- Keine zusätzlichen Texturen, kein Noise, kein Gradient-Overlay
- Tech-Ästhetik ohne visuellen Ballast
- Light-Mode: warmes Weiß | Dark-Mode: tiefes Charcoal

---

## Theme

- **Accent**: Grün – frisch, technisch, positiv
- **Fonts**: DM Sans (Fließtext), Space Grotesk (Überschriften)
- **Stil**: Tech Minimalism – typografie-zentriert, viel Weißraum, reduziert aufs Wesentliche
