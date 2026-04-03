# Prompt 03 — Migration Story Section

Use this prompt to write the 3-step migration narrative for your specific product switch.

---

## Prompt

```
Write a 3-step migration story for switching from [COMPETITOR] to [YOUR PRODUCT].

My product: [PRODUCT NAME]
My competitor: [COMPETITOR NAME]
My product category: [e.g. "log analytics / observability platform"]
The main technical integration point: [e.g. "Fluent Bit / Logstash log shipper config"]

Write 3 steps that:
1. Address the most common first action when leaving [COMPETITOR] (exporting data, configs, dashboards)
2. Show the actual technical connection step — include a realistic 5–8 line config snippet or CLI command
3. Describe the parallel-run / validation period that removes risk

For each step:
- Step title: action-oriented, max 8 words
- Body copy: 2–3 sentences, specific and honest, no marketing fluff
- Step 2 must include a code snippet in the most common config format for this category

Tone: Written by an engineer for an engineer. No buzzwords. Confident, not salesy.
```

---

## How to update the template

In `ComparisonPage.tsx`, find the migration steps array (search for `"Step 01"`). Update:
- `title`: step headline
- `body`: paragraph text
- `code`: the config snippet string (use `\n` for line breaks) — only step 2 should have a code block; set the others to `null`
