import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

/**
 * Targeted pitch page for ClickHouse — styled to echo ClickHouse's brand
 * (near-black, bold white headlines, highlighter-yellow accent) while
 * clearly framed as Peter's pitch, not an official ClickHouse page.
 *
 * Unlike the other pitch pages, this one is framed entirely as "why me":
 * ClickHouse already has a GTM Engineering team and an open role, so the
 * page argues honestly for a rep-turned-builder as a complement to a team
 * of seasoned developers — including flagging the listed requirements
 * Peter doesn't meet. Noindexed on purpose.
 */

export const metadata: Metadata = {
  title: "GTM Engineering for ClickHouse — a pitch by Peter Conley",
  description:
    "An honest application for ClickHouse's open GTM Engineer role: the boxes I miss, the boxes I hit, and why a rep-turned-builder complements a seasoned team.",
  robots: { index: false, follow: false },
};

// ClickHouse-inspired palette, scoped to this page.
const c = {
  bg: "#0f0f0f",
  panel: "#1a1a1a",
  border: "#2e2e2e",
  borderSoft: "#242424",
  text: "#fafafa",
  muted: "#a3a3a3",
  faint: "#6f6f6f",
  yellow: "#f4ff61",
};

const CALENDLY_URL = "https://calendly.com/peter-david-conley/lets-talk";
const RESUME_URL = "/resume.pdf";
const JOB_URL = "https://job-boards.greenhouse.io/clickhouse/jobs/6122325004";

const gaps = [
  {
    req: "“5+ years building automation and tooling in GTM, RevOps, or growth engineering”",
    honest: (
      <>
        I have 4.5 years carrying quota — 2.5 as an SDR, 2 as an AE — and the
        past few months building GTM systems in public. I&apos;ve lived the
        workflows your team automates for almost half a decade. You&apos;ll
        easily find candidates who know how to automate the workflow better
        than me —{" "}
        <strong>
          <em>
            you&apos;ll be hard pressed to find a candidate who can
            effortlessly identify what to automate.
          </em>
        </strong>
      </>
    ),
  },
  {
    req: "“Bachelor's degree in engineering required”",
    honest:
      "Mine is a full-stack engineering certification from BloomTech (FKA Lambda School) plus a portfolio of shipped, running software. If the degree is a hard gate, I'd rather know now — but I'd argue the work below is the better signal.",
  },
  {
    req: "“Hands-on development in Python… dbt transformation… Gong”",
    honest:
      "My stack today is TypeScript, JavaScript, and SQL. Python, dbt, and Gong are learning curves, not walls — the list below shows how fast I climb them.",
  },
];

const checks = [
  { tool: "Salesforce", proof: "2.5 years living in it daily at Vercel and HeroDevs — cases, opportunities, pipeline hygiene." },
  { tool: "Vercel", proof: "I worked there for 15 months — and this site ships on it." },
  { tool: "Clay", proof: "My job search runs on a 40-company Clay table with enrichment columns I maintain by hand." },
  { tool: "n8n", proof: "I self-host the open-source version — deployed on Render, backed by Supabase Postgres, running production workflows." },
  { tool: "Postgres", proof: "Supabase Postgres backs both my n8n instance and swiftlisting.ai, the real-estate MVP I'm building; I configured the session pooler, SSL, and schema isolation myself." },
  { tool: "Consumption-based GTM", proof: "Vercel is a usage-based business — I worked the motion that turned free and Pro usage into Enterprise pipeline." },
  { tool: "TypeScript / JavaScript", proof: "Daily drivers — this page and the pipeline behind it are TypeScript end to end." },
];

const shipped = [
  {
    title: "This portfolio — a live lead pipeline",
    body: "Next.js site where the contact form runs a real GTM system: instant enrichment, HubSpot upsert, Slack ping, email alert, n8n webhook, and a lifecycle auto-reply. Every submission demos the job itself.",
    link: { href: "/case-studies/live-lead-pipeline", label: "Case study →" },
  },
  {
    title: "Real-estate data-entry MVP",
    body: "Built an MVP application that takes the manual data entry out of a real-estate agent's workflow — the same instinct as GTM engineering, pointed at a different industry.",
    link: { href: "https://www.swiftlisting.ai/", label: "swiftlisting.ai →" },
  },
  {
    title: "WordPress → Next.js migration",
    body: "Migrated my WordPress blog to Next.js on Vercel — content modeling, routing, and redirects, shipped end to end.",
    link: { href: "https://www.pcon.blog/", label: "pcon.blog →" },
  },
  {
    title: "Memoir landing page on Astro",
    body: "Designed and shipped a memoir landing page on Astro — a different framework chosen deliberately for a content-first, zero-JS-by-default page.",
    link: { href: "https://fatherifoundmyway.com/", label: "fatherifoundmyway.com →" },
  },
  {
    title: "Self-hosted open-source n8n",
    body: "Deployed n8n's OSS build to a Render web service backed by Supabase Postgres — connection pooling, SSL workarounds, schema isolation, a keep-alive workflow, and published production automations.",
    image: {
      src: "/n8n-render.png",
      alt: "Render dashboard showing the n8n web service live on a Standard instance",
      width: 674,
      height: 366,
    },
  },
];

function YellowLink({
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
    "inline-flex h-12 items-center justify-center rounded-lg px-7 text-sm font-semibold transition-opacity hover:opacity-85";
  const style =
    variant === "solid"
      ? { backgroundColor: c.yellow, color: "#0f0f0f" }
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
      className="font-mono text-2xl uppercase tracking-[0.2em]"
      style={{ color: c.yellow }}
    >
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
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

export default function ClickHousePitchPage() {
  return (
    <div style={{ backgroundColor: c.bg, color: c.text }}>
      {/* Provenance banner — this is Peter's pitch, not a ClickHouse property. */}
      <div
        className="px-6 py-2.5 text-center font-mono text-[11px] font-semibold tracking-wide"
        style={{ backgroundColor: c.yellow, color: "#0f0f0f" }}
      >
        A job-application pitch by{" "}
        <Link href="/" className="underline underline-offset-2" style={{ color: "#0f0f0f" }}>
          Peter Conley
        </Link>{" "}
        — not an official ClickHouse page.
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 pb-20 pt-20 text-center sm:pt-28">
          <p
            className="mx-auto inline-block rounded-full px-4 py-1.5 font-mono text-xs font-semibold tracking-widest"
            style={{ backgroundColor: c.yellow, color: "#0f0f0f" }}
          >
            FOR CLICKHOUSE&apos;S REVOPS LEADERSHIP
          </p>
          <h1 className="mt-8 text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
            GTM Engineering
            <br />
            <span style={{ color: c.yellow }}>for ClickHouse</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8" style={{ color: c.muted }}>
            You have an open{" "}
            <a
              href={JOB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
              style={{ color: c.text }}
            >
              GTM Engineer, AI &amp; Automation
            </a>{" "}
            role and a GTM Engineering team that already ships.{" "}
            <strong style={{ color: c.text }}>
              This page is my application — starting with an honest accounting
              of the boxes I don&apos;t check.
            </strong>
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <YellowLink href="/clickhouse/contact">Contact me</YellowLink>
            <YellowLink href={RESUME_URL} variant="outline" newTab>
              Resume (PDF)
            </YellowLink>
          </div>
        </div>
      </section>

      {/* The honest part */}
      <section className="mx-auto max-w-4xl px-6 py-20" style={{ borderTop: `1px solid ${c.borderSoft}` }}>
        <Kicker>01 / The honest part</Kicker>
        <SectionTitle>I don&apos;t check every box.</SectionTitle>
        <p className="mt-4 max-w-2xl leading-7" style={{ color: c.muted }}>
          Your posting lists requirements I don&apos;t meet, and pretending
          otherwise would waste your time. Here they are, next to what I have
          instead.
        </p>
        <div className="mt-10 space-y-4">
          {gaps.map((g) => (
            <Card key={g.req}>
              <p className="font-mono text-sm" style={{ color: c.faint }}>
                {g.req}
              </p>
              <p className="mt-3 leading-7" style={{ color: c.muted }}>
                {g.honest}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* The boxes I do check */}
      <section className="mx-auto max-w-4xl px-6 py-20" style={{ borderTop: `1px solid ${c.borderSoft}` }}>
        <Kicker>02 / The boxes I do check</Kicker>
        <SectionTitle>Your required stack is my daily stack.</SectionTitle>
        <p className="mt-4 max-w-2xl leading-7" style={{ color: c.muted }}>
          The posting asks for production experience with Salesforce, Vercel,
          Clay, n8n, and Postgres in a consumption-based business. Unusual for
          a candidate coming from quota — that&apos;s a list I can walk through
          line by line.
        </p>
        <div className="mt-10 space-y-2">
          {checks.map((t) => (
            <div
              key={t.tool}
              className="flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-lg px-5 py-4"
              style={{ backgroundColor: c.panel, border: `1px solid ${c.borderSoft}` }}
            >
              <span className="font-mono text-sm font-semibold" style={{ color: c.yellow }}>
                {t.tool}
              </span>
              <span className="text-sm leading-6" style={{ color: c.muted }}>
                {t.proof}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* What I've shipped */}
      <section className="mx-auto max-w-4xl px-6 py-20" style={{ borderTop: `1px solid ${c.borderSoft}` }}>
        <Kicker>03 / What I&apos;ve shipped</Kicker>
        <SectionTitle>Proof I build, not plans to build.</SectionTitle>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {shipped.map((s) => (
            <Card key={s.title}>
              <h3 className="font-semibold" style={{ color: c.text }}>
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-6" style={{ color: c.muted }}>
                {s.body}
              </p>
              {s.image && (
                <Image
                  src={s.image.src}
                  alt={s.image.alt}
                  width={s.image.width}
                  height={s.image.height}
                  className="mt-4 h-auto w-full max-w-72 rounded-lg"
                  style={{ border: `1px solid ${c.border}` }}
                />
              )}
              {s.link && (
                <a
                  href={s.link.href}
                  {...(s.link.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="mt-4 inline-block font-mono text-sm underline underline-offset-4"
                  style={{ color: c.yellow }}
                >
                  {s.link.label}
                </a>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Why this works */}
      <section className="mx-auto max-w-4xl px-6 py-20" style={{ borderTop: `1px solid ${c.borderSoft}` }}>
        <Kicker>04 / Why this works</Kicker>
        <SectionTitle>Your team has seasoned engineers. Add the rep.</SectionTitle>
        <div className="mt-10 grid gap-4 sm:grid-cols-[1fr_1.4fr]">
          <Card className="flex flex-col items-center justify-center text-center">
            <p className="text-6xl font-bold" style={{ color: c.yellow }}>
              4.5yrs
            </p>
            <p className="mt-3 font-mono text-xs uppercase tracking-widest" style={{ color: c.faint }}>
              carrying quota — 2.5 as an SDR, 2 as an AE
            </p>
          </Card>
          <Card>
            <p className="leading-7" style={{ color: c.muted }}>
              ClickHouse&apos;s GTM Engineering team already exists, and from the
              posting it&apos;s clear the bar is high. You don&apos;t need
              another résumé that looks like the ones you have — seasoned
              developers can be hired. What&apos;s rare is someone who has
              carried the number, prospected for a living, worked the CRM at 6pm
              on the last day of the quarter — and then taught themselves to
              ship software about it.
            </p>
            <p className="mt-4 leading-7" style={{ color: c.muted }}>
              The posting asks for &ldquo;sound judgment on where AI and
              automation apply, and where humans stay in the loop.&rdquo; That
              judgment is exactly what living the workflows teaches — I know
              which automations reps adopt and which they quietly route around,
              because I&apos;ve been the rep on both sides. That&apos;s the
              complement, not a replacement, to the engineers you already have.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center" style={{ borderTop: `1px solid ${c.borderSoft}` }}>
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Ask me the hard questions.
          <br />
          <span style={{ color: c.yellow }}>I answer in milliseconds.</span>
        </h2>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <YellowLink href={CALENDLY_URL}>Book 30 minutes</YellowLink>
          <YellowLink href="/clickhouse/contact" variant="outline">
            Email me
          </YellowLink>
        </div>
        <p className="mx-auto mt-16 max-w-2xl font-mono text-[11px] leading-5" style={{ color: c.faint }}>
          This page is a personal job-application pitch by Peter Conley and is not
          affiliated with, sponsored by, or endorsed by ClickHouse, Inc. Role
          requirements quoted from ClickHouse&apos;s public job posting, July 2026.
        </p>
      </section>
    </div>
  );
}
