# RUIVALENTE.COM — Software Architecture Guide

## 1. System Architecture & Boundaries

ruivalente.com is built with Next.js 15, React 19, TypeScript, and Bun.

### Architectural Blueprint

```
ruivalente.com
├── app/
│   ├── api/projects/          -> Project metadata endpoints
│   ├── projects/[slug]/       -> Dynamic case study route
│   └── page.tsx               -> Bento dashboard root
├── components/
│   ├── bento-grid.tsx         -> Dashboard layout container
│   ├── projects-section.tsx   -> Paginated project showcase
│   ├── search-command.tsx     -> Cmd+K global command palette
│   └── terminal/              -> Interactive CLI emulator
├── content/projects/*.md      -> Markdown case studies
├── lib/
│   ├── data/projects.json     -> Canonical project metadata array
│   └── i18n/                  -> Bilingual localization context
└── public/projects/*.svg      -> 16:9 vector preview cards
```

---

## 2. Integration with `@ruivalente99/bibliotheca`

The application directly imports shared design tokens and primitives from Bibliotheca:
- `Kbd`: Keyboard keycap rendering for search command shortcuts.
- `generateProjectPreviewSvg`: Programmatic vector generation for project cards.
- Core tokens: Color scales and border radii aligning with the central design system.
