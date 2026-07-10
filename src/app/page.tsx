import Link from "next/link";

const experience = [
  {
    company: "HeroDevs",
    role: "SMB Account Executive · Founding SDR",
    dates: "Feb 2024 — Jun 2026",
    points: [
      "Founding and sole AE for the SMB / Drupal NES / LATAM Enterprise segment.",
      "Architected the SMB pipeline-forecasting process from scratch.",
      "Owned 25–50 concurrent deals from $50K–$300K across Mid-Market and LATAM Enterprise.",
      "Built Apollo product sequences for all inbound leads.",
      "205% of quota as Founding SDR (2024); 90% attainment as AE (2025).",
      "Ran full-cycle discovery→close for Drupal NES; 70% conversion on partner outreach.",
      "Architected the SDR→AE handoff and the team's core Notion docs & dashboards.",
    ],
  },
  {
    company: "Vercel",
    role: "Allbound SDR · Growth VDR (founding)",
    dates: "Aug 2022 — Nov 2023",
    points: [
      "127% and 108% quota attainment; Top SDR performance, Q2 2023.",
      "2nd-highest monthly quota attainment in team history.",
      "Founding Growth VDR member — contributed to a 50% QoQ lift in the Enterprise funnel.",
      "Built Outreach sequences for the new Growth PA team and led outreach copywriting.",
      "Managed contacts, cases and opportunities in Salesforce.",
    ],
  },
  {
    company: "BloomTech (Lambda School)",
    role: "Full-Stack Web Development",
    dates: "Aug 2021 — May 2022",
    points: [
      "Built with JavaScript, React, Node.js and SQL (plus HTML/CSS).",
      "Git workflow, Agile development, client & server testing.",
      "Architected PostgreSQL databases.",
    ],
  },
];

const skillGroups = [
  {
    label: "Sales stack",
    items: ["HubSpot", "Salesforce", "Apollo", "Outreach", "ZoomInfo", "RB2B"],
  },
  {
    label: "Technical",
    items: ["JavaScript", "React", "Node.js", "SQL", "HTML", "CSS", "Git", "PostgreSQL"],
  },
  {
    label: "Dev tools",
    items: ["GitHub", "Vercel", "Netlify", "Heroku", "Postman", "pgAdmin", "Replit"],
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 0%, rgba(220,38,38,0.18) 0%, rgba(8,8,10,0) 70%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl px-6 pt-20 pb-16 text-center">
          <Link
            href="/case-studies/live-lead-pipeline"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-300 transition-colors hover:border-white/20"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            Live case study: a working lead pipeline →
          </Link>

          <h1 className="mt-8 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-5xl font-semibold leading-[1.05] tracking-tight text-transparent sm:text-7xl">
            Sales Rep
            <br />→ GTM Engineer
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            I&apos;m a top-performing SDR and AE who builds the systems that make
            sales scale — clean CRM data, automated enrichment and routing, and
            outbound that runs itself. Now I do it as a GTM Engineer.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-red-600 px-7 text-sm font-medium text-white transition-colors hover:bg-red-500"
            >
              Trigger the pipeline →
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 px-7 text-sm font-medium text-zinc-200 transition-colors hover:border-white/25"
            >
              See how this site works
            </Link>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="mx-auto max-w-4xl px-6 py-24">
        <SectionHeading kicker="Track record" title="Experience" />
        <div className="mt-12 space-y-px overflow-hidden rounded-2xl border border-white/10">
          {experience.map((job) => (
            <div key={job.company} className="bg-white/[0.02] p-6 sm:p-8">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-xl font-semibold text-white">{job.company}</h3>
                <span className="text-sm text-zinc-500">{job.dates}</span>
              </div>
              <p className="mt-1 text-sm font-medium text-red-400">{job.role}</p>
              <ul className="mt-4 space-y-2">
                {job.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm leading-6 text-zinc-400">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-red-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="mx-auto max-w-4xl px-6 py-24">
        <SectionHeading kicker="Toolbox" title="Tools I work with" />
        <div className="mt-12 space-y-8">
          {skillGroups.map((g) => (
            <div key={g.label}>
              <div className="text-sm font-medium text-zinc-500">{g.label}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured case study */}
      <section className="border-t border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <div className="rounded-2xl border border-red-600/30 bg-gradient-to-b from-red-950/20 to-transparent p-8 sm:p-12">
            <div className="text-sm font-medium text-red-400">Flagship case study</div>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              This site is a working GTM system — and you can trigger it.
            </h3>
            <p className="mt-4 max-w-2xl leading-7 text-zinc-400">
              The contact form isn&apos;t a form that emails me. It&apos;s a live
              lead pipeline: submit it and your details get enriched and written
              to my CRM in real time, with a Slack ping to me. The job, running
              inside the artifact I used to apply for it.
            </p>
            <Link
              href="/case-studies/live-lead-pipeline"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-500"
            >
              Read the case study →
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="mx-auto max-w-4xl px-6 py-28 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Let&apos;s build your pipeline.
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-8 text-zinc-400">
          Fill out the form and watch the system work. It&apos;s the fastest way
          to see how I&apos;d think about your GTM motion.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-red-600 px-8 text-sm font-medium text-white transition-colors hover:bg-red-500"
        >
          Trigger the pipeline →
        </Link>
      </section>

    </>
  );
}

function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div>
      <div className="text-sm font-medium text-red-400">{kicker}</div>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}
