# REBRAND.md — saas-comparison-page-v1

**Goal:** A non-technical founder should be able to rebrand this template in under 30 minutes using only Framer's property panel + the AI prompts in `ai-prompts/`.

---

## The 15-minute path (Framer Variables only)

These four controls in the Framer property panel update the entire template instantly:

| Control | What it changes | Default |
|---|---|---|
| **Product Name** | Every instance of "Velo" across all sections | Velo |
| **Competitor Name** | Every instance of "Datadog" across all sections | Datadog |
| **Accent Color** | All highlighted values, checkmarks, CTA buttons, column tint | #818CF8 |
| **Color Mode** | Entire page switches dark ↔ light | Dark |

**Steps:**
1. Select the `ComparisonPage` component on the Framer canvas
2. In the right panel, update Product Name → your product
3. Update Competitor Name → your competitor
4. Update Accent Color → your brand color
5. Done. The nav, hero, table headers, CTA banner, and footer all update.

---

## The 30-minute path (full rebrand)

After the 4 Variable changes above, update content in the component source:

### Quick Wins (4 stat cards)
Search for `"80%"` in `ComparisonPage.tsx`. The 4 win objects are:
```
{ val: "80%", label: "...", note: "..." }
```
Replace with your actual metrics.

### Comparison Table
Use `ai-prompts/02-comparison-table.md` to generate rows with an LLM.
Find the `tableGroups` array in `ComparisonPage.tsx` (search for `Pricing & Billing`).
Replace row data — each row is `{ feature, velo, dd }` where values are `true`, `false`, or a string.

### Calculator
The cost formula is in the `// Calculator` section near the top of the component.
Update the formula constants to match your actual pricing:
- `veloCost = Math.round(BASE + logsK * RATE_PER_K)`
- `ddCost = Math.round(engineers * SEAT_PRICE + logsK * LOG_RATE)`

### Migration Story
Use `ai-prompts/03-migration-story.md`.
Search for `"Step 01"` in the component. Update `title`, `body`, and `code` for each step.

### Testimonial
Use `ai-prompts/05-testimonial.md`.
Search for `"Marcus Chen"` in the component. Update the quote text, name, title, and avatar initials.

### Objection Cards
Use `ai-prompts/04-objections.md`.
Search for `"Common questions"` in the component. Update the 3 `{ q, a }` objects.

### CTA Banner
The headline and subhead use `{competitorName}` automatically.
If you want a custom headline, find `"Your next"` in the component and hardcode it.

---

## What stays the same (design system tokens)

Do NOT change these — they're shared across the bundle:

| Token | Value | Why |
|---|---|---|
| Font | Geist 400/500/600 | Bundle consistency |
| Border radius (cards) | 10px | System standard |
| Border radius (buttons) | 6px | System standard |
| Section vertical rhythm | 96px | System standard |
| Container max-width | 1440px | System standard |

Accent color is the one intentional variable — this is how buyers make the template feel like their brand.

---

## QA before you publish

Run through this checklist in both dark and light mode:

- [ ] Product name appears correctly in nav, hero eyebrow, table header, testimonial, footer
- [ ] Competitor name appears correctly in hero, table header, CTA banner
- [ ] Calculator formula produces realistic numbers for your actual pricing
- [ ] All comparison table rows have defensible, accurate values
- [ ] Testimonial dollar amounts are realistic for your product category
- [ ] Accent color passes WCAG AA contrast against `#000000` (button text)
- [ ] Light mode: every section is legible and intentional
- [ ] Dark mode: every section is legible and intentional
