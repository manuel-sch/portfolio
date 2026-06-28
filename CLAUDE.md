# Portfolio – Claude Code Context

> Projekt-Kontext und Regeln für Claude Code Sessions.
> Stand: 28.06.2026

## Projekt-Info

@agents.md

## Globale Regeln

- Antworte auf Deutsch.
- Der Benutzer verwendet IntelliJ IDEA als IDE.

## Regeln & Skills

> Die früheren Projekt-Regeln wurden in **globale Skills** umgewandelt
> und stehen projektübergreifend zur Verfügung.

| Skill (global) | Aktivierung |
|----------------|-------------|
| `astro-patterns` | Astro 5 – automatisch bei `.astro`-Dateien |
| `clean-code` | SOLID, DRY – automatisch bei Code-Änderungen |
| `agent-workflow` | Workflow – automatisch bei Feature-Arbeit |

Projekt-lokale Skills:

| Skill | Trigger |
|-------|---------|
| `coding-standards` | Code-Änderungen, Komponenten-Entwicklung |
| `design-rules` | Design-Fragen, UI-Styling, Animationen |

## Subagents

| Subagent | Datei | Zweck |
|----------|-------|-------|
| Context Engineer | `.claude/agents/context-engineer.md` | Agent-Kontext-Dateien optimieren |
| Git Commit | `.claude/agents/commit.md` | Commit-Nachrichten + Push |

## Wichtige Hinweise

- **Zero JS by Default**: Jede `client:`-Direktive muss bewusst gewählt werden
- **Keine Inline-Styles**: Tailwind für statische, CSS Custom Properties für dynamische Styles
- **BEM-Zustandsklassen**: `.block--active`, `.block--hidden` statt direkter Style-Manipulation
- **Deployment**: Push auf `main` → Vercel deployt automatisch
