import type { Metadata } from "next";
import Link from "next/link";

/**
 * Targeted pitch page for Owner.com — styled to echo Owner's brand (warm
 * off-white, near-black text, green accents, pill buttons) while clearly
 * framed as Peter's pitch, not an official Owner page. Noindexed on purpose:
 * this is a link to hand to a decision-maker, not a page to rank.
 */

export const metadata: Metadata = {
  title: "GTM Engineering for Owner.com — a pitch by Peter Conley",
  description:
    "Why I'm applying for Owner.com's open GTM Engineer role, and what I'd automate in the first 90 days.",
  robots: { index: false, follow: false },
};

// Owner-inspired palette (light theme), scoped to this page.
const c = {
  bg: "#faf9f7",
  panel: "#ffffff",
  border: "#e3e0da",
  borderSoft: "#eae7e1",
  text: "#1c1b18",
  muted: "#56534c",
  faint: "#8b877e",
  green: "#2f9e44",
  greenDark: "#14401f",
  link: "#15803d",
};

const gradientText = {
  backgroundImage: "linear-gradient(90deg, #166534, #22c55e)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
} as const;

const CALENDLY_URL = "https://calendly.com/peter-david-conley/lets-talk";
const RESUME_URL = "/resume.pdf";
const SCALING_VIDEO_URL = "https://youtu.be/f1f-J8z8oSg?si=5s-ABP6OMJM8jctj&t=93";
const MILLIGAN_VIDEO_URL = "https://youtu.be/VvsthkkOabg?si=Rwcwm5oGyUpC8AWv&t=1235";
const OWNER_JOB_URL =
  "https://jobs.ashbyhq.com/owner/12650f0b-4438-4caa-a178-53fa86a45132";

const whyMe = [
  {
    title: "Certified software engineer",
    body: "Full-stack (React, Next.js, Node, SQL) — I build the systems myself instead of filing tickets for them. Your posting asks for a builder with real engineering time; that's my resume, not an aspiration.",
  },
  {
    title: "Your job post describes my stack",
    body: "It asks for someone at the intersection of CRM, Clay/Apollo/Salesforce, and AI. That's my daily toolkit: HubSpot + Clay + n8n power this site's live pipeline, I ran Apollo sequencing at HeroDevs, and I worked in Salesforce every day at Vercel.",
  },
  {
    title: "SMB velocity, firsthand",
    body: "As founding SMB AE at HeroDevs I carried 25–50 concurrent opportunities — the same high-volume, high-velocity motion Owner's sales org runs with restaurant owners every day.",
  },
  {
    title: "I've shipped a revenue engine in miniature",
    body: "This site is a working acquisition funnel I built end to end: instant enrichment, CRM upsert, routing, notifications, and lifecycle auto-reply — the same shape as the system your posting describes, at portfolio scale.",
  },
  {
    title: "I know rep workflows from the inside",
    body: "2.5 years as an SDR, 2 years as an AE. I automate the busywork because I've lived it.",
  },
];

const ninetyDayPlays = [
  {
    n: "01",
    title: "Reverse-engineer what converts trials to ARR",
    body: "Study the restaurants that went from trial to paid on their own — order volume, menu setup, engagement signals — then point lifecycle automation at every live trial that matches the pattern, so conversion stops depending on manual follow-up.",
  },
  {
    n: "02",
    title: "Wake up closed/nurture deals that went silent",
    body: "Every closed-lost restaurant already knows Owner. Automated, signal-triggered re-engagement — a new location, an ownership change, a delivery-app fee hike — instead of letting them rot in the CRM.",
  },
  {
    n: "03",
    title: "Recover inbound leads that never booked a demo",
    body: "Restaurant owners who raised a hand but never picked a time are the cheapest pipeline that exists. Automated follow-up sequences with booking links until they book or opt out.",
  },
];

const objections = [
  {
    q: "“But you haven't done this role before.”",
    a: "Almost nobody has — your posting asks for a hybrid of product, engineering, and GTM that no traditional career path produces. Mine comes close: my whole career is being hired into roles that didn't exist yet — founding SDR and founding SMB AE at HeroDevs, founding member of Vercel's Growth SDR team — and I ship software.",
  },
  {
    q: "“You don't have the tool knowledge or skill set.”",
    a: "I'm building it in real time. The site you're on is a live HubSpot + Clay + n8n pipeline I built and shipped — the exact CRM + tooling + AI intersection your posting calls for.",
    link: { href: "/case-studies/live-lead-pipeline", label: "See the live pipeline case study →" },
  },
  {
    q: "“We're a fast-moving startup — people wear a lot of hats. You may not be used to our pace.”",
    a: "At Vercel I had two direct managers, worked across two orgs, and held three different titles over the period of 17 months. At HeroDevs I was both the founding SDR and the founding SMB AE. Wearing multiple hats isn't a risk for me; it's my resume.",
  },
];

function PillLink({
  href,
  children,
  variant = "solid",
  newTab,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  newTab?: boolean;
}) {
  const base =
    "inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-semibold transition-opacity hover:opacity-85";
  const style =
    variant === "solid"
      ? { backgroundColor: c.text, color: c.bg }
      : { border: `1px solid ${c.border}`, color: c.text };
  const opensNewTab = newTab ?? href.startsWith("http");
  return (
    <a
      href={href}
      className={base}
      style={style}
      {...(opensNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-mono text-xs uppercase tracking-[0.2em]"
      style={{ color: c.green }}
    >
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
      style={{ color: c.text }}
    >
      {children}
    </h2>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl p-6 sm:p-8 ${className}`}
      style={{ backgroundColor: c.panel, border: `1px solid ${c.borderSoft}` }}
    >
      {children}
    </div>
  );
}

export default function OwnerPitchPage() {
  return (
    <div style={{ backgroundColor: c.bg, color: c.text }}>
      {/* Provenance banner — this is Peter's pitch, not an Owner property. */}
      <div
        className="px-6 py-2.5 text-center font-mono text-[11px] font-semibold tracking-wide"
        style={{ backgroundColor: c.greenDark, color: "#ffffff" }}
      >
        A job-application pitch by{" "}
        <Link href="/" className="underline underline-offset-2" style={{ color: "#ffffff" }}>
          Peter Conley
        </Link>{" "}
        — not an official Owner.com page.
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Scattered green blocks, echoing Owner's gradient panels */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <span className="absolute right-[8%] top-16 h-6 w-6 rounded-md" style={{ backgroundImage: "linear-gradient(135deg, #166534, #4ade80)" }} />
          <span className="absolute right-[4%] top-28 h-6 w-6 rounded-md" style={{ backgroundColor: c.green, opacity: 0.55 }} />
          <span className="absolute right-[12%] top-40 h-6 w-6 rounded-md" style={{ backgroundColor: "#d6d3cc", opacity: 0.6 }} />
          <span className="absolute left-[5%] bottom-14 h-6 w-6 rounded-md" style={{ backgroundImage: "linear-gradient(135deg, #4ade80, #166534)" }} />
          <span className="absolute left-[10%] bottom-24 h-6 w-6 rounded-md" style={{ backgroundColor: "#d6d3cc", opacity: 0.5 }} />
        </div>

        <div className="mx-auto max-w-4xl px-6 pb-20 pt-20 text-center sm:pt-28">
          <p
            className="mx-auto inline-block rounded-full px-4 py-1.5 font-mono text-xs font-semibold tracking-widest"
            style={{ backgroundColor: c.greenDark, color: "#ffffff" }}
          >
            FOR OWNER&apos;S GROWTH LEADERSHIP
          </p>
          <h1 className="mt-8 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
            GTM Engineering
            <br />
            <span style={gradientText}>for Owner.com</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8" style={{ color: c.muted }}>
            Owner&apos;s product philosophy is doing the work for the restaurant
            owner. Mine is doing the work for the revenue team.{" "}
            <strong style={{ color: c.text }}>
              This page is my application for the GTM Engineer role you just
              posted.
            </strong>
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PillLink href="/owner/contact">Contact me</PillLink>
            <PillLink href={RESUME_URL} variant="outline" newTab>
              Resume (PDF)
            </PillLink>
          </div>
        </div>
      </section>

      {/* Sales leadership */}
      <section className="mx-auto max-w-4xl px-6 py-20" style={{ borderTop: `1px solid ${c.borderSoft}` }}>
        <Kicker>01 / For the revenue org</Kicker>
        <SectionTitle>Your AEs sell for a quarter of their day.</SectionTitle>
        <div className="mt-10 grid gap-4 sm:grid-cols-[1fr_1.4fr]">
          <Card className="flex flex-col items-center justify-center text-center">
            <p className="text-7xl font-semibold" style={gradientText}>
              25%
            </p>
            <p className="mt-3 font-mono text-xs uppercase tracking-widest" style={{ color: c.faint }}>
              of AE time spent selling
            </p>
          </Card>
          <Card>
            <p className="leading-7" style={{ color: c.muted }}>
              On HubSpot&apos;s <em>Science of Scaling</em>, Stevie Case — CRO of
              Vanta — puts actual selling time at about 25%. The other 75% is
              demo prep, CRM hygiene, account research, and forecasting.
            </p>
            <p className="mt-4 leading-7" style={{ color: c.muted }}>
              With 125 salespeople, every point of that 75% Owner claws back is
              real ARR — a GTM Engineer&apos;s entire job is attacking it with
              software, so quota capacity grows without growing headcount.
            </p>
            <a
              href={SCALING_VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block font-mono text-sm underline underline-offset-4"
              style={{ color: c.link }}
            >
              Watch the clip — &ldquo;Selling Time&rdquo; →
            </a>
          </Card>
        </div>

        <Card className="mt-4">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <p className="text-6xl font-semibold" style={gradientText}>
              1.7x
            </p>
            <div>
              <p className="leading-7" style={{ color: c.muted }}>
                QuotaPath grew closed ARR per rep <strong style={{ color: c.text }}>1.7x in 18 months</strong> —
                with a GTM engineering team of two doing most of the building.
              </p>
              <p className="mt-2 font-mono text-xs" style={{ color: c.faint }}>
                —{" "}
                <a
                  href={MILLIGAN_VIDEO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 transition-opacity hover:opacity-80"
                  style={{ color: c.link }}
                >
                  Ryan Milligan, CRO at QuotaPath →
                </a>
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Why me */}
      <section className="mx-auto max-w-4xl px-6 py-20" style={{ borderTop: `1px solid ${c.borderSoft}` }}>
        <Kicker>02 / Why me</Kicker>
        <SectionTitle>A rep who ships software.</SectionTitle>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {whyMe.map((w) => (
            <Card key={w.title}>
              <h3 className="font-semibold" style={{ color: c.text }}>
                {w.title}
              </h3>
              <p className="mt-2 text-sm leading-6" style={{ color: c.muted }}>
                {w.body}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Why now */}
      <section className="mx-auto max-w-4xl px-6 py-20" style={{ borderTop: `1px solid ${c.borderSoft}` }}>
        <Kicker>03 / Why right now</Kicker>
        <SectionTitle>The role is already open. Here&apos;s the fit.</SectionTitle>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Card>
            <p className="text-4xl font-semibold" style={gradientText}>
              $120M
            </p>
            <p className="mt-2 text-sm leading-6" style={{ color: c.muted }}>
              Series C at a $1B valuation (May 2025) — $189M raised in total,
              powering 20,000+ restaurants.
            </p>
          </Card>
          <Card>
            <p className="text-4xl font-semibold" style={gradientText}>
              170 vs 67
            </p>
            <p className="mt-2 text-sm leading-6" style={{ color: c.muted }}>
              Sales + Business Development (170 people on LinkedIn) outnumber
              Engineering (67) two and a half to one. Every manual workflow is
              multiplied 170 times.
            </p>
          </Card>
          <Card>
            <p className="text-4xl font-semibold" style={gradientText}>
              1st
            </p>
            <p className="mt-2 text-sm leading-6" style={{ color: c.muted }}>
              No one at Owner holds the GTM Engineer title on LinkedIn today —
              the{" "}
              <a
                href={OWNER_JOB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
                style={{ color: c.text }}
              >
                open role
              </a>{" "}
              would be the first. This page is my application for it.
            </p>
          </Card>
        </div>
        <p className="mt-4 font-mono text-[11px]" style={{ color: c.faint }}>
          Funding and traction from press coverage and Owner&apos;s job posting; team
          breakdown and title search from LinkedIn, July 2026.
        </p>
      </section>

      {/* First 90 days */}
      <section className="mx-auto max-w-4xl px-6 py-20" style={{ borderTop: `1px solid ${c.borderSoft}` }}>
        <Kicker>04 / The first 90 days</Kicker>
        <SectionTitle>Three plays, all revenue-adjacent.</SectionTitle>
        <div className="mt-10 space-y-4">
          {ninetyDayPlays.map((p) => (
            <Card key={p.n}>
              <div className="flex gap-5">
                <span className="font-mono text-sm" style={{ color: c.green }}>
                  {p.n}
                </span>
                <div>
                  <h3 className="font-semibold" style={{ color: c.text }}>
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6" style={{ color: c.muted }}>
                    {p.body}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Objections */}
      <section className="mx-auto max-w-4xl px-6 py-20" style={{ borderTop: `1px solid ${c.borderSoft}` }}>
        <Kicker>05 / The objections, handled</Kicker>
        <SectionTitle>Handling objections</SectionTitle>
        <div className="mt-10 space-y-4">
          {objections.map((o) => (
            <Card key={o.q}>
              <h3 className="font-semibold" style={{ color: c.text }}>
                {o.q}
              </h3>
              <p className="mt-3 text-sm leading-6" style={{ color: c.muted }}>
                {o.a}
              </p>
              {o.link && (
                <a
                  href={o.link.href}
                  {...(o.link.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="mt-4 inline-block font-mono text-sm underline underline-offset-4"
                  style={{ color: c.link }}
                >
                  {o.link.label}
                </a>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center" style={{ borderTop: `1px solid ${c.borderSoft}` }}>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
          Owner does the work for restaurants.
          <br />
          <span style={gradientText}>I&apos;ll do it for your revenue team.</span>
        </h2>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PillLink href={CALENDLY_URL}>Book 30 minutes</PillLink>
          <PillLink href="/owner/contact" variant="outline">
            Email me
          </PillLink>
        </div>
        <p className="mx-auto mt-16 max-w-2xl font-mono text-[11px] leading-5" style={{ color: c.faint }}>
          This page is a personal job-application pitch by Peter Conley and is not
          affiliated with, sponsored by, or endorsed by Owner.com. Quoted metrics
          are from the cited public sources.
        </p>
      </section>
    </div>
  );
}
