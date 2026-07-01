# CLAUDE.md — GTM Engineer Portfolio Site

> This file is the project brief. Claude Code reads it every session. Build toward the
> goal stated here, not a generic portfolio template. If a request conflicts with this
> brief, surface the conflict before proceeding.

---

## 1. The one customer

There is exactly one user of this site: **a hiring manager at a developer-tooling startup
who is deciding whether to interview Peter for a GTM Engineer role.** Likely a Head of
Growth, founding GTM lead, or a technical co-founder at a Series Seed–B company like Render
or socket.dev.

Everything is built for that person's 90-second skim, on a phone, from a link dropped in a
DM or attached to an application. If a design or content choice doesn't help that person
say "let's talk," it doesn't belong on the site.

**What this reader believes before landing:** "GTM Engineer" résumés are mostly buzzwords;
most candidates can't actually build the systems they list. They are skeptical by default.

**What they need to believe after:** "This person already does the job we're hiring for.
The proof is in front of me, and I just watched it work."

---

## 2. Who Peter is (positioning)

Peter is a **sales professional (SDR/AE) who builds the systems that make sales work** —
moving from carrying a quota to engineering the pipeline that feeds it.

This is the wedge: he is not a marketer who learned a little SQL, and not an engineer who's
never sold. He has **lived the pain of bad data, broken handoffs, and manual outbound**, and
now builds the automation that fixes it. That lived sales context is the differentiator —
he builds GTM systems with a rep's instinct for what actually converts.

**Positioning statement (use this exact framing across the site):**

> "I spent [X] years in sales hitting quota the hard way — manual research, messy CRM data,
> outbound that didn't scale. So I started building the systems instead. Now I engineer the
> GTM machine: clean data, automated enrichment and routing, outbound that runs itself.
> This site is one of those systems. You're inside it right now."

Avoid: "passionate," "results-driven," "ninja/rockstar," generic agency language, and any
claim not backed by a visible artifact.

---

## 3. The offer

Peter helps an early-stage dev-tool company **turn a leaky, manual GTM motion into an
instrumented, automated pipeline** — so the founding team stops doing rep-research busywork
and starts compounding. Concretely: CRM that's trustworthy, enrichment that's automatic,
outbound that's systematic, and a funnel that's measured end to end.

---

## 4. Target buyer profile (build for this reader)

- **Company:** Developer tools / technical SaaS, Series Seed–B. Render, socket.dev,
  Resend, Liveblocks, Warp, Doppler are the archetype.
- **Buyer motion:** Product-led or hybrid; a technical audience that distrusts marketing fluff.
- **Hiring pain:** Founders/early GTM are buried in manual work and need a first or early
  "GTM engineer" to systematize it.
- **Implication for the site:** Speak like the buyer's audience speaks — direct, technical,
  no fluff. The site itself should look like a product these companies would ship.

---

## 5. The funnel (site = a working funnel, not a résumé)

The site is structured as a three-stage funnel. Every page maps to a stage.

1. **Land** — Home/hero. In one screen: who Peter is, the wedge (sales → systems), and a
   single clear next action. No carousel, no fluff. The reader should grasp the positioning
   before scrolling.
2. **Proof** — Case studies. Each is a GTM system documented as
   **Problem → Architecture → Measurable Result** (see §6). This is the bulk of the site and
   the reason the reader stays.
3. **CTA** — The lead-capture form (book a call / email). This is not a passive contact form;
   it is the centerpiece demo (see §7).

Secondary pages: short **About** (the sales-to-engineering story, in service of credibility,
not biography) and **Contact** (folds into the CTA).

**Rule:** Every page ends by moving the reader toward the CTA.

---

## 6. Proof assets (the case studies)

Peter's proof lives in two domains. Each case study is an **MDX file** in the repo (see §9)
and follows the same skeleton. Lead with the result; the reader is skimming.

**Skeleton for every case study:**

- **Problem** — the GTM pain in the reader's own terms (1–2 sentences).
- **Architecture** — the system Peter built. Show the stack and the data flow; a simple
  diagram beats paragraphs. Name real tools (HubSpot, Clay/Apollo, n8n/Make, webhooks, etc.).
- **Measurable result** — the number. Time saved, reply-rate lift, data-accuracy gain,
  pipeline created. If a metric is illustrative rather than from a past role, label it honestly.

**Domain 1 — CRM / data workflows:** lifecycle stages, dedup/cleanup, lead scoring,
enrichment, reporting. The story: "I made the CRM something the team can actually trust."

**Domain 2 — Outbound / sequencing systems:** automated prospecting, personalization at
scale, deliverability, sequence logic. The story: "I made outbound a system, not a grind."

The **flagship case study is the site's own lead-capture pipeline** (§7) — it's the one the
reader can trigger live.

---

## 7. The centerpiece: live lead-capture automation

This is the most important feature on the site. It converts the portfolio from *claim* to
*demonstration*. When the hiring manager fills out the form, they personally trigger the
exact system Peter builds for a living:

```
Form submit → Next.js API route → enrich (Clay / Apollo / company-lookup)
            → push contact to HubSpot CRM → Slack ping to Peter
            → (optional) auto-reply showing the enriched data back to the submitter
```

The reader fills out a form and watches it land, enriched, in a CRM — that is the job,
performed inside the artifact used to apply for the job. Treat this as the hero of the build.
HubSpot is the CRM of record (tracks applications/pipeline per the project goals).

---

## 8. Voice & design principles

- **Tone:** direct, technical, confident, zero fluff. Write like the dev-tool companies
  Peter is targeting write their own docs and landing pages.
- **Show, don't assert.** Replace adjectives with artifacts, diagrams, and numbers.
- **Design:** clean, fast, looks like a product these companies would ship. Restraint over
  decoration. Mobile-first (the reader is on a phone).
- **Performance is a feature** — fast load and clean Lighthouse scores are part of the proof
  that Peter ships quality.

---

## 9. Tech stack & conventions

- **Framework:** Next.js (App Router), TypeScript, Tailwind. Single app, single repo — no CMS.
- **Content: MDX files in the repo.** Case studies and page copy live as content, not in a
  database. Rationale: the only editor is Peter, the content set is small, and a commit +
  push already redeploys via Vercel — a headless CMS would add a second app, auth, and CORS
  for no payoff on this project. Keep the stack minimal so effort goes to the funnel (§7).
  - Suggested layout: `content/case-studies/*.mdx`, one file per case study, with
    frontmatter (`title`, `slug`, `domain`, `problem`, `result`, `order`, `featured`).
  - Use `@next/mdx` (or `next-mdx-remote` / Contentlayer) to render MDX in App Router routes.
  - List page reads the `content/` directory; detail pages render by `slug`. No GROQ, no client.
  - Updating a case study = edit the MDX file, commit, push. That's the whole content workflow.
- **Hosting/CI:** Vercel. Git push = deploy. Branch push → preview; merge to `main` →
  production. No manual deploy steps.
- **CRM:** HubSpot (lead capture + application tracking) — see §7.
- **Instrumentation:** Vercel Analytics or PostHog from day one — measuring is half the job.
- **SEO/OG:** clean metadata and OG images on every page; the link will be shared in DMs and
  applications and must look sharp.

> **Migration note:** The repo still contains a `studio/` folder from the earlier Sanity
> setup. It is no longer used and can be deleted (`rm -rf ../studio`), along with any
> `next-sanity` / `@sanity/*` deps in `web/package.json` and the `NEXT_PUBLIC_SANITY_*`
> vars in `web/.env.local`.

---

## 10. Definition of done

- A reader can land, understand the positioning, read at least one Problem → Architecture →
  Result case study, and submit the form — in under two minutes on mobile.
- Form submission visibly enriches and lands in HubSpot with a Slack ping.
- Site is live on a custom domain with clean OG previews and analytics recording funnel steps.
- Nothing on the site is a claim without a visible artifact behind it.

---

## 11. Guardrails for the agent

- **Build toward the funnel.** Before adding anything, ask: does this help the hiring manager
  say "let's talk"? If not, don't build it.
- **No fabricated metrics.** Use real numbers where they exist; clearly label illustrative ones.
- **No fluff copy.** If a sentence would embarrass Peter in front of a skeptical engineer, cut it.
- **Prefer demonstration over description** in every tradeoff.
- **Keep it fast and simple.** Resist scope creep, animation for its own sake, and
  template-style "features" that don't serve the one customer.
- **No CMS.** Content is MDX in the repo (§9). Don't reintroduce Sanity or another CMS unless
  Peter explicitly asks and the tradeoff is re-justified.
- When in doubt about positioning or scope, re-read §1 and §5.
