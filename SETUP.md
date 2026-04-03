# Framer Setup — saas-comparison-page-v1

How to get ComparisonPage.tsx into a Framer project from scratch.

---

## Step 1 — Create the project

1. Go to framer.com → Dashboard
2. Click **New project**
3. Name it: **B2B Comparison Page**
4. Choose a blank canvas (not a template)

---

## Step 2 — Add the code component

1. In the Framer editor, open the **Assets** panel (left sidebar)
2. Click **Code** → **+** (New code file)
3. Name it: `ComparisonPage`
4. Delete all boilerplate in the editor
5. Paste the entire contents of `ComparisonPage.tsx`
6. Click **Save** (Cmd+S)

The component will appear in the Assets panel under Code Components.

---

## Step 3 — Place it on the canvas

1. From Assets → Code Components, drag `ComparisonPage` onto the canvas
2. In the right panel → **Layout**: set width to **Fill container** (or a fixed 1440px)
3. Height should auto-size (the component is `@framerSupportedLayoutHeight auto`)

---

## Step 4 — Set Variables in the property panel

With the component selected, the right panel shows 4 controls:

| Control | Set to |
|---|---|
| Color Mode | Dark (default) |
| Accent Color | #818CF8 (default — matches bundle) |
| Product Name | Velo (or your product) |
| Competitor Name | Datadog (or your competitor) |

---

## Step 5 — Set up Variables for the bundle

In Framer: **Assets** → **Variables** → **+** → create these:

| Variable name | Dark value | Light value |
|---|---|---|
| Color/Background | #0D0D0D | #F8F8FC |
| Color/Surface | #141414 | #FFFFFF |
| Color/Elevated | #1C1C1E | #F0F0F8 |
| Color/Border | rgba(255,255,255,0.10) | rgba(0,0,0,0.08) |
| Color/Border Strong | rgba(255,255,255,0.18) | rgba(0,0,0,0.16) |
| Color/Text Primary | #F5F5F5 | #0D0D0D |
| Color/Text Secondary | #A3A3A3 | #6B6B6B |
| Color/Accent | #818CF8 | #818CF8 |
| Font/Heading | Geist | Geist |
| Font/Body | Geist | Geist |
| Font/Mono | Geist Mono | Geist Mono |

These match `shared-design-system/DESIGN-TOKENS.md` exactly — required for bundle consistency.

---

## Step 6 — Add Geist to project fonts

1. Framer → **Settings** (gear icon) → **Fonts**
2. Search: **Geist** → Add weights 400, 500, 600
3. Search: **Geist Mono** → Add weight 400
4. The component also loads fonts via Google Fonts CDN as a fallback

---

## Step 7 — Publish as template

1. Framer → **Share** → **Publish to Marketplace**
2. Title: **B2B Comparison Page**
3. Category: **Landing Page → SaaS**
4. Price: **$79**
5. Description: use `listing/framer-marketplace.md` when ready

---

## Notes

- The component renders the full page — nav, all sections, footer
- The `colorMode` property control switches dark/light for the entire component
- Calculator is interactive (React state) — sliders update costs in real time
- No external dependencies beyond React + Framer built-ins
- For Gumroad: export as **Remix Link** from Framer Share settings
