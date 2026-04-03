# Prompt 05 — Testimonial

Use this prompt to generate a realistic migration testimonial for your product.

---

## Prompt

```
Generate one fictional but realistic testimonial from a VP of Engineering or infrastructure lead who switched from [COMPETITOR] to [YOUR PRODUCT].

My product: [PRODUCT NAME]
My competitor: [COMPETITOR NAME]
Typical cost savings: [e.g. "60–80% reduction in monthly observability spend"]
Typical migration time: [e.g. "3–5 days for a team of 10"]

The testimonial must:
- Be 1–3 sentences max
- Include specific before/after dollar amounts (monthly bill, not annual)
- Include a specific timeframe for when savings appeared (e.g. "in week one", "by day three")
- Sound like a real person talking, not a press release
- NOT include superlatives like "amazing", "incredible", "game-changer"
- End on a specific operational detail (not a vague endorsement)

Also provide:
- A realistic full name for the author
- A realistic job title (VP Engineering, Head of Infrastructure, Staff SRE, etc.)
- A realistic fictional company name (1 word, sounds like a B2B SaaS startup)
- Two-letter initials for the avatar

Format your response as:
QUOTE: "[the testimonial]"
NAME: [Full name]
TITLE: [Job title, Company name]
INITIALS: [XX]
```

---

## How to update the template

In `ComparisonPage.tsx`, find the testimonial block (search for `"Marcus Chen"`). Update:
- The quote text (the `<p>` containing the testimonial — keep the `<span style={{ color: T.accent }}>` wrapper around the key dollar amount)
- `Marcus Chen` → new name
- `VP Engineering, Ferron` → new title + company
- `MC` in the avatar `<div>` → new initials
