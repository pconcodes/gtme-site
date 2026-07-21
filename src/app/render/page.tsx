import type { Metadata } from "next";
import Link from "next/link";

/**
 * Targeted pitch page for Render (render.com) — styled to echo Render's
 * brand (near-black, purple→green gradient, sharp-cornered buttons) while
 * clearly framed as Peter's pitch, not an official Render page. Noindexed
 * on purpose: this is a link to hand to a decision-maker, not a page to rank.
 */

export const metadata: Metadata = {
  title: "GTM Engineering for Render — a pitch by Peter Conley",
  description:
    "Why I'm applying for Render's open GTM Engineer role, and what I'd automate in the first 90 days.",
  robots: { index: false, follow: false },
};

// Render-inspired palette, scoped to this page.
const c = {
  bg: "#0a0a0a",
  panel: "#141414",
  panelDeep: "#101010",
  border: "#2e2e2e",
  borderSoft: "#232323",
  text: "#f5f5f5",
  muted: "#a3a3a3",
  faint: "#6b6b6b",
  purple: "#a78bfa",
  green: "#34d399",
};

const gradientText = {
  backgroundImage: `linear-gradient(90deg, ${c.purple}, ${c.green})`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
} as const;

const CALENDLY_URL = "https://calendly.com/peter-david-conley/lets-talk";
const RESUME_URL = "/resume.pdf";
const SCALING_VIDEO_URL = "https://youtu.be/f1f-J8z8oSg?si=5s-ABP6OMJM8jctj&t=93";
const MILLIGAN_VIDEO_URL = "https://youtu.be/VvsthkkOabg?si=Rwcwm5oGyUpC8AWv&t=1235";
const RENDER_JOBS_URL = "https://jobs.ashbyhq.com/render";

const whyMe = [
  {
    title: "Certified software engineer",
    body: "Full-stack (React, Next.js, Node, SQL) — I build the systems myself instead of filing tickets for them.",
  },
  {
    title: "I've sold this exact category",
    body: "At Vercel I sold developer cloud infrastructure to the same technical buyers Render serves. I know how developers evaluate platforms like Render because I spent two years selling one.",
  },
  {
    title: "I'm already a Render customer",
    body: "The automation hub behind this page — my n8n instance — runs on a Render web service I deployed, configured, and pay for. I didn't research your product for this pitch; I use it.",
  },
  {
    title: "PLG-to-Enterprise motion, firsthand",
    body: "As a Growth SDR at Vercel I worked the specialized motion moving Pro customers into Enterprise pipeline — the exact expansion play a self-serve cloud like Render runs on.",
  },
  {
    title: "I know AE workflows from the inside",
    body: "2.5 years as an SDR, 2 years as an AE. I automate the busywork because I've lived it.",
  },
];

const ninetyDayPlays = [
  {
    n: "01",
    title: "Automate the self-serve → Enterprise motion",
    body: "Reverse-engineer the free and paid teams that upgraded to Enterprise on their own — service count, usage growth, team size, org signals — then point automated outreach at every current account that matches the pattern.",
  },
  {
    n: "02",
    title: "Wake up closed/nurture deals that went silent",
    body: "Every deal marked closed-lost or nurture is a contact who already knows Render. Automated, signal-triggered re-engagement — new funding, new CTO, a cloud-migration announcement — instead of letting them rot in the CRM.",
  },
  {
    n: "03",
    title: "Recover inbound leads that never booked",
    body: "Leads who raised a hand but never picked a time are the cheapest pipeline that exists. Automated follow-up sequences with booking links until they book or opt out.",
  },
];

const objections = [
  {
    q: "“But you haven't done this role before.”",
    a: "My whole career is being hired into roles that didn't exist yet: founding SDR and founding SMB AE at HeroDevs, founding member of Vercel's Growth SDR team. The premise of a GTM Engineer — someone who knows sales workflows deeply enough to automate them — is exactly the combination this page demonstrates.",
  },
  {
    q: "“You don't have the tool knowledge or skill set.”",
    a: "I'm building it in real time. The site you're on is a live HubSpot + Clay + n8n pipeline I built and shipped — and its automation hub is deployed on Render.",
    link: { href: "/case-studies/live-lead-pipeline", label: "See the live pipeline case study →" },
  },
  {
    q: "“We're a fast-moving startup — people wear a lot of hats. You may not be used to our pace.”",
    a: "At Vercel I had two direct managers, worked across two orgs, and held three different titles over the period of 17 months. At HeroDevs I was both the founding SDR and the founding SMB AE. Wearing multiple hats isn't a risk for me; it's my resume.",
  },
];

function RectLink({
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
    "inline-flex h-12 items-center justify-center rounded-[2px] px-7 text-sm font-semibold transition-opacity hover:opacity-85";
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
      className={`rounded-lg p-6 sm:p-8 ${className}`}
      style={{ backgroundColor: c.panel, border: `1px solid ${c.borderSoft}` }}
    >
      {children}
    </div>
  );
}

export default function RenderPitchPage() {
  return (
    <div style={{ backgroundColor: c.bg, color: c.text }}>
      {/* Provenance banner — this is Peter's pitch, not a Render property. */}
      <div
        className="px-6 py-2.5 text-center font-mono text-[11px] font-semibold tracking-wide"
        style={{ backgroundColor: c.green, color: "#0a0a0a" }}
      >
        A job-application pitch by{" "}
        <Link href="/" className="underline underline-offset-2" style={{ color: "#0a0a0a" }}>
          Peter Conley
        </Link>{" "}
        — not an official Render page.
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Scattered gradient blocks, echoing Render's gradient motif */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <span className="absolute right-[8%] top-16 h-6 w-6" style={{ backgroundImage: `linear-gradient(135deg, ${c.purple}, ${c.green})` }} />
          <span className="absolute right-[4%] top-28 h-6 w-6" style={{ backgroundColor: c.green, opacity: 0.7 }} />
          <span className="absolute right-[12%] top-40 h-6 w-6" style={{ backgroundColor: "#d4d4d4", opacity: 0.25 }} />
          <span className="absolute left-[5%] bottom-14 h-6 w-6" style={{ backgroundImage: `linear-gradient(135deg, ${c.green}, ${c.purple})` }} />
          <span className="absolute left-[10%] bottom-24 h-6 w-6" style={{ backgroundColor: "#d4d4d4", opacity: 0.2 }} />
        </div>

        <div className="mx-auto max-w-4xl px-6 pb-20 pt-20 text-center sm:pt-28">
          <p
            className="mx-auto inline-block rounded-full px-4 py-1.5 font-mono text-xs font-semibold tracking-widest"
            style={{ backgroundColor: c.text, color: c.purple }}
          >
            FOR RENDER&apos;S SALES LEADERSHIP
          </p>
          <h1 className="mt-8 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
            GTM Engineering
            <br />
            <span style={gradientText}>for Render</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8" style={{ color: c.muted }}>
            Render gives builders the fastest path to production. I give sales
            teams the fastest path from lead to revenue.{" "}
            <strong style={{ color: c.text }}>
              This page is my application for the GTM Engineer role open on your
              Sales team right now.
            </strong>
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <RectLink href="/render/contact">Contact me</RectLink>
            <RectLink href={RESUME_URL} variant="outline" newTab>
              Resume (PDF)
            </RectLink>
          </div>
        </div>
      </section>

      {/* Sales leadership */}
      <section className="mx-auto max-w-4xl px-6 py-20" style={{ borderTop: `1px solid ${c.borderSoft}` }}>
        <Kicker>01 / For sales leadership</Kicker>
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
              Vanta, selling to the same technical buyers Render does — puts
              actual selling time at about 25%. The other 75% is demo prep, CRM
              hygiene, account research, and forecasting.
            </p>
            <p className="mt-4 leading-7" style={{ color: c.muted }}>
              A GTM Engineer&apos;s entire job is attacking that 75% with software
              — so quota capacity grows without growing headcount.
            </p>
            <a
              href={SCALING_VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block font-mono text-sm underline underline-offset-4"
              style={{ color: c.green }}
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
                  style={{ color: c.green }}
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
              $100M
            </p>
            <p className="mt-2 text-sm leading-6" style={{ color: c.muted }}>
              Series C extension, February 2026, at a $1.5B valuation — $258M
              raised in total.
            </p>
          </Card>
          <Card>
            <p className="text-4xl font-semibold" style={gradientText}>
              4 of 29
            </p>
            <p className="mt-2 text-sm leading-6" style={{ color: c.muted }}>
              Open roles at Render are Sales — Account Executive, Solutions
              Engineer, Strategic Account Manager, and a GTM Engineer. The GTM
              org is scaling now.
            </p>
          </Card>
          <Card>
            <p className="text-4xl font-semibold" style={gradientText}>
              1
            </p>
            <p className="mt-2 text-sm leading-6" style={{ color: c.muted }}>
              Of those openings is a{" "}
              <a
                href={RENDER_JOBS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
                style={{ color: c.text }}
              >
                GTM Engineer
              </a>
              . You&apos;ve already decided you need this role — this page is my
              application for it.
            </p>
          </Card>
        </div>
        <p className="mt-4 font-mono text-[11px]" style={{ color: c.faint }}>
          Funding from Render&apos;s Series C extension announcement (Feb 2026); role
          counts from Render&apos;s live job board (jobs.ashbyhq.com/render), July 2026.
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
                  style={{ color: c.green }}
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
          Give Render&apos;s GTM
          <br />
          <span style={gradientText}>its fastest path to production.</span>
        </h2>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <RectLink href={CALENDLY_URL}>Book 30 minutes</RectLink>
          <RectLink href="/render/contact" variant="outline">
            Email me
          </RectLink>
        </div>
        <p className="mx-auto mt-16 max-w-2xl font-mono text-[11px] leading-5" style={{ color: c.faint }}>
          This page is a personal job-application pitch by Peter Conley and is not
          affiliated with, sponsored by, or endorsed by Render. Quoted metrics are
          from the cited public sources.
        </p>
      </section>
    </div>
  );
}
