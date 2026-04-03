# Prompt 04 — Objection Handler Cards

Use this prompt to write the 3 "Common questions about switching" entries for your product.

---

## Prompt

```
Write 3 honest objection-handler pairs for switching from [COMPETITOR] to [YOUR PRODUCT].

My product: [PRODUCT NAME]
My competitor: [COMPETITOR NAME]
My product's strongest advantage: [e.g. "80% lower cost at equivalent log volume"]
My product's honest weakness vs. the competitor: [e.g. "less mature APM / distributed tracing"]

The 3 objections to address:
1. A feature where [COMPETITOR] is genuinely better — give an honest, non-defensive answer
2. The switching effort objection ("it will take too long / too risky")
3. The familiarity objection ("my team already knows [COMPETITOR]")

For each objection:
- Question: Write it as the buyer would actually say it (in quotes, first person, skeptical tone)
- Answer: 2–3 sentences. Be honest. If your product loses on something, say so and redirect to the real decision criteria. Never be defensive.

Format:
Q: "[The objection]"
A: [The honest answer]

Rules:
- Do NOT use "Great question!" or any marketing opener
- Do NOT pretend your product wins everything
- The answer to objection 1 should acknowledge the limitation directly before pivoting
- Specific numbers and timeframes are always better than vague claims
```

---

## How to update the template

In `ComparisonPage.tsx`, find the objections array (search for `"Common questions"`). Each item is:

```typescript
{
    q: `"The objection in quotes"`,
    a: `The honest answer paragraph.`,
}
```

The `q` value renders as the left column (bold, question font), and `a` renders as the right column (secondary color, reading weight).
