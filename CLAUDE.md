# Apple-Level Website Builder

You provide a few things. Claude Code builds everything else.

---

## What You Provide

Drop these in the `assets/` folder:

### 1. `brand.json` — Your brand assets

Extract your brand from any website using Firecrawl's `/extract` endpoint. Save the output as `assets/brand.json`.

Includes colors, fonts, logo URL, button styles, and design tokens. Claude Code reads it all automatically.

### 2. `video.mp4` — Your animation

The scroll-driven animation video. AI-generated or filmed.

**Don't have one yet?**
1. Generate a start frame and end frame with an AI image generator (Nano Banana 2, Midjourney, etc.)
2. Feed both frames into an AI video generator (Kling 3.0, Veo 3.1) → smooth transition video
3. Download the MP4

### 3. `first-frame.png` + `last-frame.png` — Start and end of the animation

The first and last frame of your video. Claude Code analyzes these to understand what the animation shows and decide how to integrate it on the page. These may also be `.jpg` files — look for either extension.

---

## How to Use

Open Claude Code in this folder and say:

> Build me an Apple-level landing page for [product/company name]. It's a [one-line description].

That's it.

---

## What You Get

A production-ready Next.js website with:
- Scroll-driven product animation (canvas + GSAP ScrollTrigger)
- Your brand colors, fonts, and logo applied everywhere
- Premium typography, spacing, and animations
- Responsive (desktop + mobile with reduced frame sets)
- Smooth scrolling via Lenis

## Prerequisites

- **FFmpeg** — `brew install ffmpeg` (macOS) or `sudo apt install ffmpeg` (Linux)
- **Node.js 18+**

---

## Brand Asset Rules — CRITICAL

> **These rules apply to every agent in every phase. No exceptions.**

### Colors
- Use ONLY the hex values in `assets/brand.json` → `branding.colors`
- Do NOT invent, add, or guess any additional colors from prior knowledge of the brand
- If a color isn't in brand.json, it does not exist — do not use it
- You MAY create utility variants (e.g. `--text-secondary`) but they MUST be opacity or lightness variants of brand.json colors, not invented values

### Logo
- Use the exact logo URL from `assets/brand.json` → `branding.images.logo`
- Render it as an `<img>` tag pointing to that URL — do not substitute text, SVGs, or placeholders
- Do not invent a logo or draw one from memory
- If the logo URL is a data URI, use it directly as the `src`

### Fonts
- Load only the font families listed in `assets/brand.json` → `branding.fonts`
- Use Google Fonts or system fonts only if they're named there
- Do not add decorative or display fonts that aren't in brand.json

### Buttons & Components
- Apply border-radius, background, and text colors from `branding.components.buttonPrimary` and `buttonSecondary`
- Do not invent rounded corners, gradients, or shadows unless they're in brand.json

### The Rule
**If it's not in brand.json, don't use it.** Inventing brand assets makes the output look wrong and breaks trust.

---

## Animation Rules — CRITICAL

> Violating these rules produces blank, broken pages. Follow them exactly.

### Content must be visible on initial paint
- **NEVER** start any element at `opacity: 0` or `visibility: hidden` in CSS or via `gsap.from({ opacity: 0 })`
- All text, images, and UI elements must be fully visible when the HTML first renders, before any JavaScript runs
- If JavaScript fails or is slow, the page must still look correct

### How to use GSAP correctly
- ✅ Allowed: `gsap.from(el, { y: 30, duration: 0.8 })` — animates position only, content visible
- ✅ Allowed: `gsap.fromTo(el, { y: 30 }, { y: 0, duration: 0.8 })` — same
- ❌ Forbidden: `gsap.from(el, { opacity: 0 })` — hides content until animation completes
- ❌ Forbidden: `gsap.set(el, { opacity: 0 })` followed by a fade-in — same problem
- ❌ Forbidden: CSS `opacity: 0` on any element that depends on JS to become visible

### Scroll animation section height
- The pinned scroll animation section must be **250vh maximum**
- Do not use 400vh or more — it creates dead zones that look broken

### Product image in the hero
- The hero section MUST display `assets/first-frame.png` (or `.jpg`) as the product image
- This is the visual centerpiece — a hero without the product image looks empty and broken
- Place it prominently: full-width below the headline, or large right-side column

---

## Layout Rules — CRITICAL

> Edge-hugging content looks broken. Follow these rules for every section.

### Centering
- Every section's content must be wrapped in a centered container: `max-width: 1100px; margin: 0 auto; padding: 0 48px`
- Never let text or content touch the viewport edges
- On mobile, minimum `padding: 0 24px`

### Spacing
- Sections need breathing room: minimum `padding: 120px 0` vertically
- Cards and grid items need gaps: minimum `gap: 32px`
- Headlines need `margin-bottom: 24px` before body text

### Typography
- Body text should never exceed `640px` wide (it becomes unreadable)
- Use `max-width: 640px` on paragraph containers

---

## How Claude Code Builds This (Orchestration)

When a user asks to build a page, follow this exact workflow using sub-agents:

### Phase 1 — Research & Analysis (3 sub-agents in parallel)

**Agent 1: Brand Research**
- Read `assets/brand.json`
- Use the brand name and metadata to understand what this company does, their industry, and tone of voice
- Do NOT look up the brand or use prior knowledge to invent brand colors, logos, or design choices — everything visual comes from brand.json only
- Output: Brand research summary (company description, value props, target audience, key messaging themes, tone)

**Agent 2: Technical Strategy**
- Read `assets/brand.json` (colors, fonts, components)
- Output a complete CSS variable map. Every variable must trace back to a brand.json value:
  ```css
  --brand-primary: [brand.json colors.primary]
  --brand-accent:  [brand.json colors.accent]
  --brand-bg:      [brand.json colors.background]
  --brand-text:    [brand.json colors.textPrimary]
  --text-secondary: [brand.json colors.textPrimary at 55% opacity — use rgba or hex variant]
  ```
- Decide layout and design approach based strictly on what brand.json provides
- Output: Technical plan (CSS variable map, layout structure, component choices, typography setup)

**Agent 3: Animation Integration**
- Read `assets/first-frame.png` (or `.jpg`) and `assets/last-frame.png` (or `.jpg`)
- Analyze what the animation depicts (product rotation? zoom? reveal?)
- Decide WHERE on the page the scroll animation goes — always AFTER the hero section, never replacing it
- Decide HOW to integrate it: full-viewport pinned canvas, max 250vh scroll distance
- Output: Animation integration plan (placement, scroll height, surrounding sections, callout text positions)

### Phase 2 — Build (1 sub-agent)

**Agent 4: Page Builder**
- Receives all outputs from Agents 1, 2, and 3
- Extracts frames from `assets/video.mp4` using FFmpeg (see scroll-animation skill)
- Scaffolds the Next.js project
- Writes `globals.css` using ONLY the CSS variable map from Agent 2 — no invented colors
- **Hero section:** Must include the product image (`assets/first-frame.png` or `.jpg`) as an `<img>` or Next.js `<Image>` — large, prominent, centered or right-column
- **Logo:** Rendered as `<img src="[brand.json logo URL]">` in the navigation — not text, not an invented SVG
- **All sections:** Wrapped in `max-width: 1100px; margin: 0 auto; padding: 0 48px` containers
- **No `opacity: 0` anywhere** — all content visible on initial paint, GSAP animates position only
- Output: The finished website

### Phase 3 — Verify

After the build agent finishes:

1. Run `npm run build` — must pass with zero errors
2. Start `npm run dev` on a free port
3. Take a full-page screenshot with Playwright:
   ```bash
   npx playwright screenshot --browser chromium --full-page http://localhost:PORT /tmp/verify-screenshot.png
   ```
4. **Read the screenshot** and visually confirm:
   - Hero section has visible headline, subheadline, CTA buttons, AND the product image
   - Logo is visible in the nav (not a broken image or fallback letter)
   - No large blank sections — every section has visible content
   - Content is centered, not edge-hugging the viewport
   - Scroll animation section is not excessively tall
5. If anything looks wrong, fix it before declaring done
