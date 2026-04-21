# Benefit — Design Tokens for Framer

Complete reference of every color, font, spacing, and component style
used in the current Next.js build. Copy-paste into Framer's Variables panel
or use as a reference when building in Framer.

---

## Colors

| Token               | Hex                        | Usage                                      |
|---------------------|----------------------------|--------------------------------------------|
| Background          | `#000000`                  | All page backgrounds                       |
| Background Card     | `#0a0a0a`                  | Card / form backgrounds                    |
| Background Subtle   | `#111111`                  | Image placeholders, dark accents           |
| Accent Bronze       | `#A38560`                  | ALL primary accents — buttons, labels, dots|
| Accent Bronze Hover | `#B8956C`                  | Hover state for bronze elements            |
| Text Primary        | `#FFFFFF`                  | Headlines, body on dark backgrounds        |
| Text Secondary      | `rgba(255, 255, 255, 0.55)`| Body paragraphs                            |
| Text Muted          | `rgba(255, 255, 255, 0.35)`| Labels, metadata, captions                 |
| Text Faint          | `rgba(255, 255, 255, 0.20)`| Footer copyright                           |
| Border Subtle       | `rgba(255, 255, 255, 0.07)`| Card borders, section dividers             |
| Border Medium       | `rgba(255, 255, 255, 0.15)`| Input borders on hover                     |
| White               | `#FFFFFF`                  | Ticker background, primary button text     |
| Black               | `#000000`                  | Primary button text color                  |

**Critical rule: `#A38560` is the ONLY accent color. Never use yellow, gold, or orange.**

---

## Typography

### Font Families
```
Primary (Latin):   'Outfit', weights 300 / 400 / 500 / 600 / 700
Georgian fallback: 'Noto Sans Georgian', weights 300 / 400 / 500 / 600 / 700

Google Fonts URL:
https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap
```

Add this URL in Framer: Project Settings → Fonts → Custom Fonts → Add Google Font URL

### Type Scale

| Element              | Size                          | Weight | Tracking    | Case      |
|----------------------|-------------------------------|--------|-------------|-----------|
| Hero wordmark (h1)   | clamp(5rem, 16vw, 20rem)      | 700    | 0.01em      | uppercase |
| Section heading (h2) | clamp(3rem, 5.5vw, 6.5rem)    | 700/300| -0.02em     | uppercase |
| Sub-page h1          | clamp(2.5rem, 6vw, 7rem)      | 700    | -0.02em     | uppercase |
| Section label        | 0.68rem (≈ 10.9px)            | 600    | 0.2em       | uppercase |
| Body copy            | 1rem (16px)                   | 400    | 0           | normal    |
| Small body           | 0.875rem (14px)               | 400    | 0           | normal    |
| Nav links            | 0.7rem (11.2px)               | 500    | 0.1em       | uppercase |
| Micro labels         | 0.58–0.68rem                  | 500–600| 0.15–0.2em  | uppercase |

### Bold + Thin split headings
Used in Magazine, Talks, Digital sections:
```
Line 1 → fontWeight: 700, e.g. "Benefit"
Line 2 → fontWeight: 300, e.g. "Magazine"
Both:   fontSize: clamp(3rem, 5.5vw, 6.5rem), textTransform: uppercase
```

---

## Spacing System

All values are intentional — the layout has no arbitrary spacing.

| Context                         | Value           |
|---------------------------------|-----------------|
| Section vertical padding        | 80–120px        |
| Content max-width               | 1100–1280px     |
| Container side padding          | 48px (desktop)  |
| Container side padding (mobile) | 24px            |
| Card gap                        | 16–32px         |
| Heading → body margin           | 36px            |
| Body → CTA button margin        | 40px            |
| Grid columns (Where You Find Us)| repeat(4, 1fr)  |
| Grid columns (Partners)         | repeat(5, 1fr)  |
| Grid columns (Articles)         | repeat(3, 1fr)  |
| Nav height                      | 64px            |

---

## Component Styles

### Primary Button (`.btn-primary`)
```css
background:       #A38560
color:            #000000
font-family:      Outfit, sans-serif
font-weight:      600
font-size:        0.875rem
letter-spacing:   0.08em
text-transform:   uppercase
padding:          14px 32px
border-radius:    0              ← sharp corners, no radius
border:           none
transition:       background 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)
hover background: #B8956C
```

### Secondary / Outlined Button
```css
background:       transparent
color:            #FFFFFF
border:           1px solid rgba(255, 255, 255, 0.45)
font-weight:      600
font-size:        0.72rem
letter-spacing:   0.14em
text-transform:   uppercase
padding:          14px 32px
border-radius:    0
hover border:     rgba(255, 255, 255, 1)
```

### "Read More" outlined button (content sections)
```css
background:       transparent
color:            #FFFFFF
border:           1px solid rgba(255, 255, 255, 0.5)
padding:          13px 32px
font-size:        0.82rem
font-weight:      500
letter-spacing:   0.04em
border-radius:    0
hover border:     #FFFFFF
```

### KA Language Toggle
```css
border:           1px solid rgba(255, 255, 255, 0.4)
color:            #FFFFFF
font-size:        0.7rem
font-weight:      600
letter-spacing:   0.1em
padding:          8px 16px
background:       transparent
```

---

## Navigation Bar

```css
position:         fixed, top: 0
background:       rgba(0, 0, 0, 0.95)
backdrop-filter:  blur(20px)
border-bottom:    1px solid rgba(255, 255, 255, 0.07)
height:           64px
max-width inner:  1280px
padding inner:    0 48px
```

Nav links:
```css
color:            rgba(255, 255, 255, 0.55)
font-size:        0.7rem
letter-spacing:   0.1em
text-transform:   uppercase
font-weight:      500
hover color:      #FFFFFF
```

---

## Section Patterns

### Full-bleed content section (Magazine / Talks / Digital)
```css
layout:           CSS Grid, gridTemplateColumns: "1fr 40%"
left padding:     max(48px, calc((100vw - 1280px) / 2 + 48px))   ← aligns with nav
right column:     position relative, Image with objectFit: cover
image gradient:   linear-gradient(to top, #000 10%, rgba(0,0,0,0.55) 55%, transparent)
                  height: 50%, position: absolute, bottom: 0
```

### Cards / Grid items
```css
border:           1px solid rgba(255, 255, 255, 0.06–0.09)
background:       #0a0a0a or transparent
padding:          28–48px
hover border:     rgba(255, 255, 255, 0.15)
```

### Ticker strip
```css
background:       #FFFFFF
color:            #000000
font-size:        0.65rem
font-weight:      500
letter-spacing:   0.18em
text-transform:   uppercase
separator:        · (middle dot)
animation:        ticker 28s linear infinite
                  translateX(0) → translateX(-50%)
```

---

## Logo

The logo is served from `/logo.svg` (Benefit's SVG file in `public/`).
In Framer, use: Insert → Image → upload your logo.svg file.
Render at height: 20–22px in the nav, auto width.

---

## Panoramic Slider

```css
container perspective:  1100px
card center:            translateX(0) rotateY(0deg) scale(1) opacity(1)
card ±1:                translateX(±320px) rotateY(±38deg) scale(0.84) opacity(0.72)
card ±2:                translateX(±540px) rotateY(±52deg) scale(0.70) opacity(0.38)
card transition:        0.55s cubic-bezier(0.25, 0.1, 0.25, 1)
reflection (webkit):    below 3px linear-gradient(transparent 58%, rgba(0,0,0,0.4))
dot active width:       22px
dot inactive width:     6px
dot height:             6px, border-radius: 3px
dot color:              #A38560 (active) / rgba(255,255,255,0.22) (inactive)
edge fades:             15% width, gradient from background to transparent
```

---

## Scroll Animation

```
frames:       frame-001.webp … frame-083.webp
canvas size:  1920 × 1080px
display:      objectFit: contain
pin height:   250vh (2.5× viewport = scroll distance)
scrub:        driven by scroll progress (0 → 1 → frame 0 → frame 83)
background:   #000000
```
