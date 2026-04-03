# Prompt 02 — Generate Comparison Table Rows

Use this prompt to generate a full set of comparison rows for your specific product vs. competitor.

---

## Prompt

```
I need to build an honest feature comparison table for [YOUR PRODUCT] vs. [COMPETITOR].

My product: [PRODUCT NAME]
My competitor: [COMPETITOR NAME]
My product's category: [e.g. "log analytics and observability"]
My product's key advantages: [list 3–5]
Areas where my competitor is stronger (be honest): [list 1–3]

Generate 20 comparison rows across these 4 groups. Return them in this exact format:

GROUP: Pricing & Billing
- [Feature name] | [Your product value] | [Competitor value]
- [repeat for 5–6 rows]

GROUP: Core Features
- [Feature name] | [Your product value] | [Competitor value]
- [repeat for 6–7 rows]

GROUP: Setup & Experience
- [Feature name] | [Your product value] | [Competitor value]
- [repeat for 4–5 rows]

GROUP: Support & SLA
- [Feature name] | [Your product value] | [Competitor value]
- [repeat for 4 rows]

Rules:
- Use specific values where possible (dollar amounts, time estimates, percentages)
- Use "✓" for genuine yes, "✗" for genuine no, or a specific value
- Be honest — if the competitor is better at something, say so with context
- Don't make up metrics you can't verify — use ranges or "varies" where appropriate
- Each row should have a clear winner that's defensible
```

---

## After you have the rows

In `ComparisonPage.tsx`, update the `tableGroups` array starting around line 185. Each row follows this structure:

```typescript
{ feature: "Feature name", velo: true, dd: false }
{ feature: "Feature name", velo: "Your value", dd: "Competitor value" }
{ feature: "Feature name", velo: true, dd: false, veloNote: "With caveat" }
```

- `true` renders a filled checkmark in accent color
- `false` renders a muted ✗ icon
- A string renders as text
- Add `veloNote` or `ddNote` for a small caption beneath the value
