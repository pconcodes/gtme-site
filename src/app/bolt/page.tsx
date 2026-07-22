import type { Metadata } from "next";
import Link from "next/link";

/**
 * Targeted pitch page for Bolt.new (StackBlitz) — styled to echo Bolt's
 * brand (black frame, electric-blue glow, rounded blue buttons) while
 * clearly framed as Peter's pitch, not an official Bolt page. Noindexed
 * on purpose: this is a link to hand to a decision-maker, not a page to rank.
 */

export const metadata: Metadata = {
  title: "GTM Engineering for Bolt.new — a pitch by Peter Conley",
  description:
    "Why Bolt.new's revenue org is ready for its first GTM Engineer, and what I'd automate in the first 90 days.",
  robots: { index: false, follow: false },
};

// Bolt-inspired palette, scoped to this page.
const c = {
  bg: "#0b0b0c",
  panel: "#141519",
  panelDeep: "#0f1013",
  border: "#2a2c33",
  borderSoft: "#202229",
  text: "#f4f5f7",
  muted: "#9ba1ad",
  faint: "#646b78",
  blue: "#3b82f6",
  blueBright: "#2f6bff",
  blueLight: "#7cb3ff",
};

const gradientText = {
  backgroundImage: `linear-gradient(90deg, ${c.blueBright}, ${c.blueLight})`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
} as const;

const CALENDLY_URL = "https://calendly.com/peter-david-conley/lets-talk";
const RESUME_URL = "/resume.pdf";
const SCALING_VIDEO_URL = "https://youtu.be/f1f-J8z8oSg?si=5s-ABP6OMJM8jctj&t=93";
const MILLIGAN_VIDEO_URL = "https://youtu.be/VvsthkkOabg?si=Rwcwm5oGyUpC8AWv&t=1235";

const whyMe = [
  {
    title: "Certified software engineer",
    body: "Full-stack (React, Next.js, Node, SQL) — I build the systems myself instead of filing tickets for them.",
  },
  {
    title: "I've sold to your exact buyer",
    body: "At Vercel I sold a developer platform with a self-serve-to-Enterprise motion — the same world Bolt and StackBlitz live in. I know how builders evaluate tools like Bolt because I spent two years selling to them.",
  },
  {
    title: "PLG-to-Enterprise motion, firsthand",
    body: "As a Growth SDR at Vercel I worked the specialized motion moving Pro customers into Enterprise pipeline — the exact play for turning Bolt's massive self-serve base into team and enterprise revenue.",
  },
  {
    title: "I've shipped a revenue engine in miniature",
    body: "This site is a working acquisition funnel I built end to end: instant enrichment, CRM upsert, routing, notifications, and lifecycle auto-reply — the same shape as the system Bolt's revenue org needs, at portfolio scale.",
  },
  {
    title: "I know rep workflows from the inside",
    body: "2.5 years as an SDR, 2 years as an AE. I automate the busywork because I've lived it.",
  },
];

const ninetyDayPlays = [
  {
    n: "01",
    title: "Mine the self-serve base for enterprise signals",
    body: "Reverse-engineer the accounts that upgraded to teams and enterprise on their own — seats, project volume, deploy activity, company domains — then route lookalike high-intent free users straight to sales, automatically.",
  },
  {
    n: "02",
    title: "Wake up closed/nurture deals that went silent",
    body: "Every deal marked closed-lost or nurture is a contact who already knows Bolt. Automated, signal-triggered re-engagement — new funding, new CTO, a company-wide AI-tooling push — instead of letting them rot in the CRM.",
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
    a: "I'm building it in real time. The site you're on is a live HubSpot + Clay + n8n pipeline I built and shipped.",
    link: { href: "/case-studies/live-lead-pipeline", label: "See the live pipeline case study →" },
  },
  {
    q: "“We're a fast-moving startup — people wear a lot of hats. You may not be used to our pace.”",
    a: "At Vercel I had two direct managers, worked across two orgs, and held three different titles over the period of 17 months. At HeroDevs I was both the founding SDR and the founding SMB AE. Wearing multiple hats isn't a risk for me; it's my resume.",
  },
];

function BoltLink({
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
    "inline-flex h-12 items-center justify-center rounded-xl px-7 text-sm font-semibold transition-opacity hover:opacity-85";
  const style =
    variant === "solid"
      ? { backgroundColor: c.blueBright, color: "#ffffff" }
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
      style={{ color: c.blueLight }}
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
      className={`rounded-xl p-6 sm:p-8 ${className}`}
      style={{ backgroundColor: c.panel, border: `1px solid ${c.borderSoft}` }}
    >
      {children}
    </div>
  );
}

export default function BoltPitchPage() {
  return (
    <div style={{ backgroundColor: c.bg, color: c.text }}>
      {/* Provenance banner — this is Peter's pitch, not a Bolt property. */}
      <div
        className="px-6 py-2.5 text-center font-mono text-[11px] font-semibold tracking-wide"
        style={{ backgroundColor: c.blueBright, color: "#ffffff" }}
      >
        A job-application pitch by{" "}
        <Link href="/" className="underline underline-offset-2" style={{ color: "#ffffff" }}>
          Peter Conley
        </Link>{" "}
        — not an official Bolt.new page.
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Electric-blue glow, echoing Bolt's hero */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
          style={{
            background:
              "radial-gradient(65% 65% at 50% 0%, rgba(47,107,255,0.28) 0%, rgba(11,11,12,0) 70%)",
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <span className="absolute right-[8%] top-16 h-6 w-6 rounded-lg" style={{ backgroundImage: `linear-gradient(135deg, ${c.blueBright}, ${c.blueLight})` }} />
          <span className="absolute right-[4%] top-28 h-6 w-6 rounded-lg" style={{ backgroundColor: c.blue, opacity: 0.5 }} />
          <span className="absolute left-[5%] bottom-14 h-6 w-6 rounded-lg" style={{ backgroundImage: `linear-gradient(135deg, ${c.blueLight}, ${c.blueBright})` }} />
          <span className="absolute left-[10%] bottom-24 h-6 w-6 rounded-lg" style={{ backgroundColor: "#3a3d45", opacity: 0.6 }} />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 pb-20 pt-20 text-center sm:pt-28">
          <p
            className="mx-auto inline-block rounded-full px-4 py-1.5 font-mono text-xs font-semibold tracking-widest"
            style={{ backgroundColor: c.text, color: c.blueBright }}
          >
            FOR BOLT&apos;S GTM LEADERSHIP
          </p>
          <h1 className="mt-8 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
            GTM Engineering
            <br />
            <span style={gradientText}>for Bolt.new</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8" style={{ color: c.muted }}>
            Bolt turns a prompt into a working app. I turn a sales team&apos;s
            busywork into software.{" "}
            <strong style={{ color: c.text }}>
              This page is my pitch for Bolt&apos;s first dedicated GTM Engineer.
            </strong>
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <BoltLink href="/bolt/contact">Contact me</BoltLink>
            <BoltLink href={RESUME_URL} variant="outline" newTab>
              Resume (PDF)
            </BoltLink>
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
              Vanta, selling to the same technical buyers Bolt does — puts actual
              selling time at about 25%. The other 75% is demo prep, CRM hygiene,
              account research, and forecasting.
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
              style={{ color: c.blueLight }}
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
                  style={{ color: c.blueLight }}
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
        <SectionTitle>Revenue outran the revenue systems.</SectionTitle>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Card>
            <p className="text-4xl font-semibold" style={gradientText}>
              $40M
            </p>
            <p className="mt-2 text-sm leading-6" style={{ color: c.muted }}>
              ARR within about five months of launch (March 2025) — growth no
              manual sales process can keep pace with. $135M raised to press it.
            </p>
          </Card>
          <Card>
            <p className="text-4xl font-semibold" style={gradientText}>
              42 vs 48
            </p>
            <p className="mt-2 text-sm leading-6" style={{ color: c.muted }}>
              Sales + Business Development (42 people on LinkedIn) already rival
              Engineering (48) — and every one of those 42 runs manual workflows
              today.
            </p>
          </Card>
          <Card>
            <p className="text-4xl font-semibold" style={gradientText}>
              0
            </p>
            <p className="mt-2 text-sm leading-6" style={{ color: c.muted }}>
              People at Bolt hold the GTM Engineer title on LinkedIn today. The
              highest-leverage hire for a 42-person revenue org is the one that
              makes it scale like software — this page is my pitch to be the
              first.
            </p>
          </Card>
        </div>
        <p className="mt-4 font-mono text-[11px]" style={{ color: c.faint }}>
          ARR and funding from press coverage (Jan–Mar 2025); team breakdown and
          title search from LinkedIn, July 2026.
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
                <span className="font-mono text-sm" style={{ color: c.blueLight }}>
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
                  style={{ color: c.blueLight }}
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
          What will your revenue team
          <br />
          <span style={gradientText}>build today?</span>
        </h2>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <BoltLink href={CALENDLY_URL}>Book 30 minutes</BoltLink>
          <BoltLink href="/bolt/contact" variant="outline">
            Email me
          </BoltLink>
        </div>
        <p className="mx-auto mt-16 max-w-2xl font-mono text-[11px] leading-5" style={{ color: c.faint }}>
          This page is a personal job-application pitch by Peter Conley and is not
          affiliated with, sponsored by, or endorsed by StackBlitz, Inc. (Bolt.new).
          Quoted metrics are from the cited public sources.
        </p>
      </section>
    </div>
  );
}
