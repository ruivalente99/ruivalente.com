# ruivalente.com

> High-performance personal engineering portfolio and interactive bento dashboard built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Bun.

Powered by shared design primitives and tokens from **`@ruivalente99/bibliotheca`**.

---

## Core System Architecture

1. **Interactive Bento Grid Dashboard (`components/bento-grid.tsx`)**:
   - High-density responsive grid displaying featured projects, work experience, technical stack, music activity, and contact interface.
   - Smooth paginated carousel with vector 16:9 preview cards.
2. **Case Study Dynamic Route (`app/projects/[slug]/page.tsx`)**:
   - Client-side markdown renderer consuming `/api/projects/[slug]/content`.
   - Technical breakdown with architectural blueprints, key capabilities, and stack badges.
3. **Interactive Terminal Emulator (`components/terminal/`)**:
   - Fully functional command line interface with simulated virtual filesystem, themes, and commands.
4. **Theme Versatility**:
   - Dual-mode theme system (Light, Dark) plus secret imperial dark-side easter egg.
5. **Bilingual Internationalization (`lib/i18n`)**:
   - Symmetrical English (`en`) and Portuguese (`pt`) localization across all UI surfaces and case studies.

---

## 16:9 Vector SVG Project Previews

Project visual cards are rendered as standalone vector SVGs (`public/projects/<id>.svg`):
- Dimensions: Exact `1200x675` (16:9 aspect ratio).
- macOS window frame with window controls and monospace title bar.
- Split layout: Left card with title, description, and stack badges; right pane with visual wireframe or architecture diagram.
- Generated via the `@ruivalente99/bibliotheca/ui` helper `generateProjectPreviewSvg`.

---

## Development & Quality Gates

```bash
# Install dependencies
bun install

# Start local development server
bun run dev

# Run comprehensive quality suite (TypeCheck + ESLint + Unit Tests)
bun run quality

# Run Playwright E2E and accessibility audits
bun run test:e2e

# Build production bundle
bun run build
```

---

## The Four Canonical Documentation Pillars

- [AGENTS.md](./AGENTS.md): Operational manual for agents and developers covering workflows, testing, and branching.
- [DESIGN.md](./DESIGN.md): Visual design system, lowercase discipline, color tokens, and 16:9 card specifications.
- [ARCHITECTURE.md](./ARCHITECTURE.md): Software architecture, component boundaries, and Bibliotheca integration.
- [SOUL.md](./SOUL.md): Philosophical manifesto on engineering craftsmanship, performance, and sobriety.

---

*ruivalente.com — Engineering craftsmanship and sovereign design.*
