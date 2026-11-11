# charanselvam-portfolio

Personal portfolio for Charanselvam S — AI Integration Engineer.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 with CSS custom properties
- **Fonts:** Geist Sans + Geist Mono (variable fonts, local)
- **Theme:** Dark/light via `next-themes`
- **Smooth scroll:** Lenis
- **AI chat:** Vercel AI SDK (`ai`, `@ai-sdk/google`, `@ai-sdk/openai`)
- **Validation:** Zod
- **Icons:** Lucide React, Radix UI Icons

## Pages

| Route | Description |
|---|---|
| `/` | Home — Hero, FactsStrip, Marquee, BioBlock, FlagshipCard, GlanceBento, NowRadar, Cases |
| `/about` | About story, skills grid, status cards |
| `/work` | Full project index |
| `/projects/[slug]` | Individual project detail |
| `/contact` | Contact form + links |

## Key Components

| Component | What it does |
|---|---|
| `Hero` | Full-screen intro with animated typewriter greeting, dot-grid background, amber cursor blink |
| `FlagshipCard` | Featured project card with animated API hub SVG motif (blinking nodes, dashed connections, spinning orbit), cursor spotlight, hover lift |
| `GlanceBento` | 2-tile bento: NOW block (current activities) + Numbers block (count-up stat animation via CSS Houdini `@property`) |
| `NowRadar` | Live radar sweep animation driven by `requestAnimationFrame` + `IntersectionObserver`; blips represent current focus areas |
| `Cases` | Outcome-led case studies with large amber metrics |
| `ChatFAB` | Floating AI chat button backed by Vercel AI SDK; asks questions about Charan's work |
| `Header` | Minimal nav with theme toggle and menu overlay |
| `AICanvas` | Interactive canvas visualization |

## Content

All content lives in `lib/content.ts` — single source of truth:

- `PROFILE` — name, title, location, email, GitHub, LinkedIn
- `PROJECTS` / `FLAGSHIPS` — project entries with tags, status, links
- `SKILLS` — grouped skill rows
- `MARQUEE_TAGS` — scrolling tag band
- `NOW` — current activities (Building / Using / Learning / Open to)
- `STATS` — numbers shown in GlanceBento (yearsExperience, carriersIntegrated, aiProjectsInProduction, certifications)
- `FACTS` — FactsStrip entries

The AI chat context is in `lib/portfolio-context.ts` — a plain text document the AI reads to answer questions.

## Animations

All driven by CSS, no animation libraries:

- **Scroll-reveal** (`.rv`): `animation-timeline: view()` with `@supports` guard — no effect on unsupported browsers
- **Count-up** (`.count-num`): CSS Houdini `@property --n { syntax: '<integer>' }` + `counter-reset` + `::before { content: counter(n) }`
- **Spin** (`.spin`): `transform-box: fill-box; transform-origin: center` for correct SVG pivot
- **Blink dot** (`.blink-dot`): staggered via `--d` CSS custom property
- **Dash march** (`.dash path`): `stroke-dashoffset` loop
- **Cursor spotlight** (`.spot` / `.has-spot`): `radial-gradient` at `--mx`/`--my` set by `onPointerMove`
- **NowRadar sweep**: `requestAnimationFrame` loop, paused when section is off-screen

All animations respect `prefers-reduced-motion`.

## Design Tokens

Defined in `app/globals.css` as CSS custom properties, mapped into Tailwind via `@theme inline`:

- `--amber` / `--amber-light` — primary accent
- `--surface` — tile backgrounds
- `--line` — divider colour
- `--background` / `--foreground` — base palette
- Light and dark variants defined on `:root` and `.dark`

## Dev

```bash
npm install
npm run dev        # localhost:3000
npm run build
npm run start
```

## Environment Variables

The AI chat feature requires at least one provider key:

```
GOOGLE_GENERATIVE_AI_API_KEY=...
# or
OPENAI_API_KEY=...
```

Create a `.env.local` file at the project root. The app falls back gracefully if keys are absent.
