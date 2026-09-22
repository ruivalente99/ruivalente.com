# RUIVALENTE.COM — Design System & Engineering Guidelines

## 1. Visual Philosophy & Lowercase Styling

ruivalente.com embodies modern editorial minimalism:
- **Lowercase Discipline**: All titles, navigation items, category chips, and section headers are rendered in lowercase (`lowercase` utility class).
- **Zero Emojis**: Automated tests assert zero emojis across all markdown case studies and content files.
- **Bento Hierarchy**: Interactive card grids with high surface contrast, 16px to 24px border radii, and subtle accent glows.

---

## 2. Color System & Themes

The interface supports three themes:
1. **Light Mode**: Warm off-white surfaces (`#fafaf9`, `#ffffff`) with crisp stone borders (`#e7e5e4`).
2. **Dark Mode** (Default): Obsidian surfaces (`#0a0e17`, `#121826`) with golden amber accents (`#f59e0b`).
3. **Dark-Side Theme**: Crimson and imperial red accents (`#f43f5e`, `#ef4444`) with terminal monospace styling.

---

## 3. Project Visual Cards (16:9 SVG Standards)

Every showcase card is rendered as a standalone vector SVG (`public/projects/<id>.svg`):
- Dimensions: `1200x675` (16:9 aspect ratio).
- Window frame: macOS window controls (red, yellow, green) with monospace title.
- Split layout: Left card with title, description, and tags; right pane with visual preview wireframe.
- Atmospheric glow: Radial gradient matching the project's signature accent color.
