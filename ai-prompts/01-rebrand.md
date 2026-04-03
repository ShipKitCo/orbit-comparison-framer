# Prompt 01 — Rebrand for Your Product

Use this prompt to replace all Velo/Datadog references with your actual product and competitor.

---

## Instructions

Copy and paste this prompt into Claude, ChatGPT, or any LLM. Fill in the brackets with your actual product details before sending.

---

## Prompt

```
I'm using a Framer comparison page template originally built for "Velo vs. Datadog."
I need to rebrand it for my product.

My product: [YOUR PRODUCT NAME]
My competitor: [COMPETITOR NAME]
My product's core value prop: [ONE SENTENCE — e.g. "Usage-based log analytics at 80% less cost than Datadog"]
My product's pricing model: [e.g. "Per GB ingested, starting at $29/mo"]
My competitor's pricing model: [e.g. "Per seat + per host, starting at $15/seat/mo"]

Please rewrite the following copy blocks for my product:

1. Hero eyebrow (5–7 words, format: "[Product] vs. [Competitor]")
2. Hero headline (max 12 words, confident, numerical if possible)
3. Hero subhead (max 15 words, names the core tradeoff)
4. 4 Quick Win cards (big number/stat + label + one-line note each)
5. All comparison table row values (use the same row structure as below)
6. Migration story section title + 3-step titles and body copy
7. Testimonial quote (fictional but realistic VP Eng, must include specific before/after dollar amounts)
8. 3 objection-handler pairs (question + honest 2–3 sentence answer)
9. CTA banner headline and subhead

Return each section clearly labeled. Keep tone: direct, confident, not defensive.
```

---

## Notes

- The Framer component has `productName` and `competitorName` as Variable controls — update those first for instant global find-replace throughout the template.
- The quick wins, testimonial numbers, and table values still need manual updates in the component even after changing the Variable names.
- Use prompt 02 to regenerate the comparison table rows specifically.
