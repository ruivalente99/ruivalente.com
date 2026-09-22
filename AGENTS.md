# RUIVALENTE.COM — Agent Reference & Developer Manual

This document serves as the technical guide for AI Agents, LLMs, and engineers operating on, extending, or maintaining the **ruivalente.com** portfolio application.

---

## 1. System Identity & Core Tenets

ruivalente.com is a high-performance personal engineering portfolio and interactive bento dashboard built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Bun.

All modifications, additions, and refactors must strictly adhere to these tenets:
- **Design Discipline**: Modern editorial minimalism with consistent lowercase visual styling across titles, labels, badges, and navigation items (`lowercase` class).
- **Zero Emojis**: All code, documentation, case studies, tests, and commit messages must strictly avoid emojis. Automated quality tests (`tests/data.test.ts`) assert 0 emojis in content files.
- **Offline & Performance First**: Fast initial render, responsive across mobile (`375px`), tablet (`768px`), and desktop (`1280px`), with zero layout shifts.
- **Theme Versatility**: Dual-mode theme system (`light`, `dark`, and secret `dark-side` easter egg) styled with Tailwind CSS variables.
- **Bilingual Internationalization**: Dual-language support (English `en` default and Portuguese `pt` toggle) powered by `lib/i18n`.
- **Strict Branching Policy**: Never push directly to `main`. Every task, feature, bug fix, refactor, or documentation update must be developed on a dedicated branch (`git checkout -b <type>/<description>`), pushed to the remote branch, and merged exclusively via Pull Request. Direct pushes to `main` are strictly forbidden.

---

## 2. Project System Architecture

Projects on ruivalente.com are showcased in two key areas:
1. **Interactive Bento Grid Card (`components/projects-section.tsx`)**:
   - Displays 2 featured projects per page with smooth paginated sliding animation.
   - Links to live demo (`Globe`), GitHub repository (`Github`), and the in-depth case study (`ArrowRight`).
2. **Case Study Dynamic Route (`app/projects/[slug]/page.tsx`)**:
   - Client-side markdown renderer (`project-content.tsx`) consuming `/api/projects/[slug]/content`.
   - Renders overview, capabilities, technical stack chips, and action links.

### File Dependency Map:
```
ruivalente.com
├── lib/data/projects.json            -> Primary project metadata array
├── lib/data/dark-side/projects.json  -> Dark-side theme alternate project list
├── public/projects/[id].svg          -> 16:9 vector SVG visual preview card (1200x675)
├── content/projects/[id].md          -> Detailed Markdown case study
├── app/api/projects/route.ts         -> API endpoint serving project list
├── app/api/projects/[slug]/content/  -> API route serving case study markdown
└── components/projects-section.tsx   -> Paginated featured projects bento card
```

---

## 3. Step-by-Step Workflow: How an Agent Adds a New Project

When instructed to add a new project to the portfolio, follow these steps in order:

### Step 1: Design & Generate the 16:9 Vector SVG Asset
Create a vector SVG file at `public/projects/<id>.svg`.

#### Geometry & Visual Standards:
- **Canvas Size**: Exact `1200x675` (`viewBox="0 0 1200 675"`, 16:9 aspect ratio).
- **Background**: Multi-stop dark gradient (`#0a0e17` to `#121826`) with a subtle dot or line pattern overlay.
- **Atmospheric Glow**: Large blurred radial gradient in the top-right matching the project's signature accent color (e.g. Amber `#f59e0b`, Teal `#14b8a6`, Blue `#38bdf8`, Emerald `#10b981`, Rose `#f43f5e`, Slate `#94a3b8`).
- **macOS Window Mockup Frame**:
  - Position: `transform="translate(100, 110)"` with `width="1000"` and `height="480"`.
  - Header bar with traffic light window controls (red `#f43f5e`, yellow `#fbbf24`, green `#10b981`) and a monospace title (e.g. `package-name — v1.0.0`).
- **Split Layout Inside Window**:
  - **Left Card (`x=36, y=70, w=400, h=360`)**: Project Title (`font-size="20" font-weight="700"`), Subtitle (`font-size="12"` uppercase accent color), 2-line description (`fill="#94a3b8"`), and rounded token chips (`rx="6"`) for core technologies.
  - **Right Visual Preview Pane (`x=460, y=70, w=500, h=360`)**: Visual wireframe, code snippet editor mockup, architecture diagram, or UI components.

#### Reusable Helper from Bibliotheca:
You can also generate the SVG using the Bibliotheca helper:
```typescript
import { generateProjectPreviewSvg } from "@ruivalente99/bibliotheca/ui";

const svg = generateProjectPreviewSvg({
  title: "Project Name",
  subtitle: "Architecture Headline",
  description: ["Line one of description", "Line two of description"],
  tags: [{ label: "React 19" }, { label: "TypeScript" }, { label: "Bun" }],
  accentColor: "#f59e0b",
  windowTitle: "project-name — v1.0.0",
});
```

---

### Step 2: Register Metadata in `lib/data/projects.json`

Append the new project entry to the `projects` array in `lib/data/projects.json`:

```json
{
  "id": "project-id",
  "title": "Project Name",
  "description": "Concise 1-2 sentence description highlighting core technical innovations and architecture.",
  "image": "/projects/project-id.svg",
  "demo": "https://demo-url.com",
  "github": "https://github.com/ruivalente99/project-id",
  "contentPath": "/content/projects/project-id.md",
  "skills": ["React 19", "TypeScript", "Tailwind CSS", "Bun"]
}
```

#### Field Specifications:
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | URL-friendly unique slug (must match markdown filename and image base name) |
| `title` | `string` | Display title of the project |
| `description` | `string` | Short description shown on the bento card and project detail banner |
| `image` | `string` | Relative path starting with `/projects/<id>.svg` (file must exist in `public/projects/`) |
| `demo` | `string` | Live demo URL or primary landing page link |
| `github` | `string` | GitHub repository URL |
| `contentPath` | `string` | Relative path `/content/projects/<id>.md` (file must exist) |
| `skills` | `string[]` | Array of technology tags displayed as badges |

---

### Step 3: Author the Markdown Case Study

Create `content/projects/<id>.md`.

#### Document Structure Template:
```markdown
## Overview

Provide a concise 2-3 paragraph overview of the project, problem space, design rationale, and system architecture.

Emphasize technical challenges solved, offline-first principles, algorithmic innovations, or performance benchmarks.

## Key Capabilities

- **Core Capability 1**: Detailed explanation of technical highlights.
- **Core Capability 2**: Performance, security, or design system details.
- **Core Capability 3**: High-DPI export, synchronization, or data persistence.
- **Zero-Compromise Quality**: Verification, testing coverage, and accessibility compliance.
```

> [!IMPORTANT]
> - Never include emojis in the case study text.
> - The file must have more than 50 characters to satisfy `tests/data.test.ts`.
> - Do not include frontmatter; the page template handles title and metadata automatically.

---

### Step 4: Update Dark Side Alternative (Optional)

If the dark side theme requires a themed counterpart for this project, add a corresponding entry to `lib/data/dark-side/projects.json` and provide the asset in `public/projects/`.

---

### Step 5: Verification & Quality Gates

Always execute the automated verification suite before considering the task complete:

```bash
# Run full quality check (TypeCheck + ESLint + Unit Tests)
bun run quality

# Run accessibility and layout geometry tests
bun run test:e2e
```

#### What These Commands Check:
1. `bun run typecheck`: Validates TypeScript definitions with zero errors (`tsc --noEmit`).
2. `bun run lint`: Runs ESLint across all components and pages.
3. `bun test`: Validates `tests/data.test.ts`:
   - Checks that all projects in `projects.json` have valid required fields.
   - Verifies that `public/<image>` exists for every project.
   - Verifies that `contentPath` exists and has greater than 50 characters.
   - Asserts zero emojis across all content files.
4. `bun run test:e2e`: Playwright accessibility scan and responsive layout audit.

---

### Step 6: Atomic Conventional Commit

Commit the changes following conventional commit format:
```bash
git add public/projects/<id>.svg lib/data/projects.json content/projects/<id>.md
git commit -m "feat(projects): add <id> showcase and case study"
```

Never include emojis in commit titles or commit descriptions.

---

### Step 7: Push to Branch and Open Pull Request

Push exclusively to the remote feature branch (NEVER push to `main`):
```bash
git push -u origin <branch-name>
```

Open a Pull Request for review:
```bash
gh pr create --fill
```

---

## 4. Git Branching & Protection Policy

AI agents and engineers operating in this repository must strictly obey these branching rules:

1. **NEVER Push to `main`**:
   - `git push origin main` is strictly prohibited.
   - Any attempt to push directly to `main` violates repository governance and branch protection rules.
2. **Always Create a Branch**:
   - Before editing or creating files, check out a new branch from up-to-date `main`:
     ```bash
     git checkout main
     git pull origin main
     git checkout -b <type>/<short-description>
     ```
   - Standard branch prefixes:
     - `feat/`: New features, components, or UI additions
     - `fix/`: Bug fixes, alignment repairs, or a11y corrections
     - `refactor/`: Code improvements without behavior changes
     - `docs/`: Markdown documentation, AGENTS.md, or case studies
     - `chore/`: Dependency updates, tooling, or config tweaks
3. **Pre-Push Quality Verification**:
   - Never push code that fails local validation:
     ```bash
     bun run quality
     bun run test:e2e
     bun run build
     ```
4. **Push Exclusively to the Remote Branch**:
   - Always push to `origin <branch-name>`:
     ```bash
     git push -u origin <branch-name>
     ```
5. **Merge Exclusively via Pull Request**:
   - Open a PR (`gh pr create --fill` or via GitHub UI) and merge only after CI checks pass and explicit user approval is provided.
6. **Zero Emojis**:
   - Commit messages, branch names, PR titles, and PR descriptions must never include emojis.

