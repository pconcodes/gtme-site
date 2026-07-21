import type { Metadata } from "next";
import Link from "next/link";

/**
 * Targeted pitch page for Socket (socket.dev) — styled to echo Socket's
 * brand (dark plum, purple→magenta gradient, pill buttons, terminal-style
 * cards) while clearly framed as Peter's pitch, not an official Socket page.
 * Noindexed on purpose: this is a link to hand to a decision-maker, not a
 * page to rank.
 */

export const metadata: Metadata = {
  title: "GTM Engineering for Socket — a pitch by Peter Conley",
  description:
    "Why Socket's sales org is the perfect place for a GTM Engineer, and what I'd automate in the first 90 days.",
  robots: { index: false, follow: false },
};

// Socket-inspired palette, scoped to this page.
const c = {
  bg: "#150f1d",
  panel: "#1d1528",
  panelDeep: "#171020",
  border: "#342a47",
  borderSoft: "#2a2138",
  text: "#f2eff6",
  muted: "#a89fb8",
  faint: "#6f6584",
  purple: "#a855f7",
  pink: "#ec4899",
  yellow: "#facc15",
};

const gradientText = {
  backgroundImage: `linear-gradient(90deg, ${c.purple}, ${c.pink})`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
} as const;

const CALENDLY_URL = "https://calendly.com/peter-david-conley/lets-talk";
const RESUME_URL = "/resume.pdf";
const SCALING_VIDEO_URL = "https://youtu.be/f1f-J8z8oSg?si=5s-ABP6OMJM8jctj&t=93";
const FEROSS_VIDEO_URL = "https://youtu.be/9zPos04KL5c?si=YK2e_Rpi04TqXnTW&t=898";

const whyMe = [
  {
    title: "Certified software engineer",
    body: "Full-stack (React, Next.js, Node, SQL) — I build the systems myself instead of filing tickets for them.",
  },
  {
    title: "Ex-Vercel",
    body: "I've sold to developers before. Socket's buyers — CISOs, CIOs, VPs of Engineering — don't tolerate marketing fluff, and I already speak their language.",
  },
  {
    title: "Security-adjacent ICP experience",
    body: "At HeroDevs I sold end-of-life open-source security to the same personas Socket targets: CISO, CIO, VP of Engineering.",
  },
  {
    title: "PLG-to-Enterprise motion, firsthand",
    body: "As a Growth SDR at Vercel I worked the specialized motion moving Pro customers into Enterprise pipeline — the exact expansion play Socket's GTM runs on.",
  },
  {
    title: "I know AE workflows from the inside",
    body: "2.5 years as an SDR, 2 years as an AE. I automate the busywork because I've lived it.",
  },
];

const ninetyDayPlays = [
  {
    n: "01",
    title: "Automate the PLG → Enterprise motion",
    body: "Reverse-engineer the free/Pro customers who upgraded to Enterprise on their own — seat count, product usage, org signals — then point automated outreach at every current account that matches the pattern.",
  },
  {
    n: "02",
    title: "Wake up closed/nurture deals that went silent",
    body: "Every deal marked closed-lost or nurture is a contact who already knows Socket. Automated, signal-triggered re-engagement — new funding, new CISO, new breach in their stack — instead of letting them rot in the CRM.",
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
    a: "Neither had a lot of Socket's best people before Socket hired them — Feross has said directly that Socket hires people into roles they haven't done before.",
    link: { href: FEROSS_VIDEO_URL, label: "Watch Feross say it (≈15:00) →" },
  },
  {
    q: "“You don't have the tool knowledge or skill set.”",
    a: "I'm building it in real time. The site you're on is a live HubSpot + Clay + n8n pipeline I built and shipped.",
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
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
}) {
  const base =
    "inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-semibold transition-opacity hover:opacity-85";
  const style =
    variant === "solid"
      ? { backgroundColor: c.text, color: c.bg }
      : { border: `1px solid ${c.border}`, color: c.text };
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={base}
      style={style}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-mono text-xs uppercase tracking-[0.2em]"
      style={{ color: c.purple }}
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

export default function SocketPitchPage() {
  return (
    <div style={{ backgroundColor: c.bg, color: c.text }}>
      {/* Provenance banner — this is Peter's pitch, not a Socket property. */}
      <div
        className="px-6 py-2.5 text-center font-mono text-[11px] font-semibold tracking-wide"
        style={{ backgroundColor: c.pink, color: "#ffffff" }}
      >
        A job-application pitch by{" "}
        <Link href="/" className="underline underline-offset-2" style={{ color: "#ffffff" }}>
          Peter Conley
        </Link>{" "}
        — not an official Socket page.
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Scattered color blocks, echoing Socket's grid motif */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <span className="absolute right-[8%] top-16 h-6 w-6" style={{ backgroundColor: c.yellow, opacity: 0.85 }} />
          <span className="absolute right-[4%] top-28 h-6 w-6" style={{ backgroundImage: `linear-gradient(135deg, ${c.purple}, ${c.pink})` }} />
          <span className="absolute right-[12%] top-40 h-6 w-6" style={{ backgroundColor: "#d6d3d1", opacity: 0.35 }} />
          <span className="absolute left-[5%] bottom-14 h-6 w-6" style={{ backgroundImage: `linear-gradient(135deg, ${c.pink}, ${c.purple})` }} />
          <span className="absolute left-[10%] bottom-24 h-6 w-6" style={{ backgroundColor: "#d6d3d1", opacity: 0.25 }} />
        </div>

        <div className="mx-auto max-w-4xl px-6 pb-20 pt-20 text-center sm:pt-28">
          <p
            className="mx-auto inline-block rounded-full px-4 py-1.5 font-mono text-xs font-semibold tracking-widest"
            style={{ backgroundColor: c.text, color: c.purple }}
          >
            FOR SOCKET&apos;S SALES LEADERSHIP
          </p>
          <h1 className="mt-8 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
            A GTM Machine
            <br />
            <span style={gradientText}>at AI Speed</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8" style={{ color: c.muted }}>
            Socket blocks malicious packages before they reach your code. I block
            manual busywork before it reaches your AEs.{" "}
            <strong style={{ color: c.text }}>
              This page is my pitch for Socket&apos;s first dedicated GTM Engineer
              — and the site it lives on is the working proof.
            </strong>
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PillLink href={CALENDLY_URL}>Book 30 minutes</PillLink>
            <PillLink href={RESUME_URL} variant="outline">
              Resume (PDF)
            </PillLink>
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
              Vanta, another security company selling to technical buyers — puts
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
              style={{ color: c.purple }}
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
                  href="https://youtu.be/VvsthkkOabg?si=Rwcwm5oGyUpC8AWv&t=1235"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 transition-opacity hover:opacity-80"
                  style={{ color: c.purple }}
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
        <SectionTitle>Socket just loaded the spring.</SectionTitle>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Card>
            <p className="text-4xl font-semibold" style={gradientText}>
              $60M
            </p>
            <p className="mt-2 text-sm leading-6" style={{ color: c.muted }}>
              Series C, March 2026 — $125M raised in total.
            </p>
          </Card>
          <Card>
            <p className="text-4xl font-semibold" style={gradientText}>
              14 of 23
            </p>
            <p className="mt-2 text-sm leading-6" style={{ color: c.muted }}>
              Open roles at Socket right now are Go-to-Market — AEs, sales
              engineers, customer success, partnerships. Sales and business
              development (51 people on LinkedIn) already outnumber
              engineering (33), and the gap is still widening.
            </p>
          </Card>
          <Card>
            <p className="text-4xl font-semibold" style={gradientText}>
              0
            </p>
            <p className="mt-2 text-sm leading-6" style={{ color: c.muted }}>
              Of those openings are a GTM Engineer. Every rep hired without
              automation multiplies manual busywork — the highest-leverage hire
              is the one that scales the reps you already have.
            </p>
          </Card>
        </div>
        <p className="mt-4 font-mono text-[11px]" style={{ color: c.faint }}>
          Funding from public sources (Tracxn, press coverage); role counts from
          Socket&apos;s live job board (jobs.ashbyhq.com/socket); team breakdown from
          LinkedIn, July 2026.
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
                <span className="font-mono text-sm" style={{ color: c.purple }}>
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
        <SectionTitle>Ask the hard questions. Here are mine.</SectionTitle>
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
                  style={{ color: c.purple }}
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
          Let&apos;s scale Socket&apos;s GTM
          <br />
          <span style={gradientText}>at AI speed.</span>
        </h2>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PillLink href={CALENDLY_URL}>Book 30 minutes</PillLink>
          <PillLink href="/contact" variant="outline">
            Trigger my live pipeline instead
          </PillLink>
        </div>
        <p className="mx-auto mt-16 max-w-2xl font-mono text-[11px] leading-5" style={{ color: c.faint }}>
          This page is a personal job-application pitch by Peter Conley and is not
          affiliated with, sponsored by, or endorsed by Socket Inc. Quoted metrics
          are from the cited public sources.
        </p>
      </section>
    </div>
  );
}
