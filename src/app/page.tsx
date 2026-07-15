import Link from "next/link";
import {
  BlueprintChip,
  CornerBrackets,
  DimensionRule,
  GridBackdrop,
  PipelineDiagram,
  SheetKicker,
} from "@/components/blueprint";

const experience = [
  {
    company: "HeroDevs",
    dates: "Feb 2024 — Jun 2026",
    roles: [
      {
        role: "SMB Account Executive",
        dates: "Nov 2024 — Jun 2026",
        summary:
          "Managed a high-volume pipeline of 25–50 concurrent opportunities while driving the full sales cycle for SMB customers. Beyond quota-carrying responsibilities, I designed and implemented operational improvements across the sales organization, including product-based inbound sequencing in Apollo and a new pipeline forecasting process for the SMB segment. I also built an internal application using Claude Code to automate prospecting and outbound outreach for end-of-life open-source GitHub repositories, demonstrating a strong blend of sales execution and technical problem-solving.",
      },
      {
        role: "Founding SDR",
        dates: "Feb 2024 — Oct 2024",
        summary:
          "As a founding member of the SDR team, I helped establish the operational foundation for the organization's outbound motion. I designed the SDR-to-AE handoff process, developed the team's reporting and analytics infrastructure, and created the core Notion documentation that standardized sales processes and onboarding. These systems improved visibility into team performance while providing a scalable knowledge base for the growing sales organization.",
      },
    ],
  },
  {
    company: "Vercel",
    dates: "Aug 2022 — Nov 2023",
    roles: [
      {
        role: "Sales Development Representative",
        dates: "Sep 2023 — Nov 2023",
        summary:
          "Consistently exceeded quota while quickly establishing myself as one of the team's top-performing SDRs, achieving 108% quota attainment, earning Top Performer recognition, and delivering the second-highest monthly quota attainment in team history. In addition to outbound prospecting, I spearheaded copywriting for sales outreach campaigns, helping improve messaging and engagement across the team.",
      },
      {
        role: "Growth / Inbound SDR",
        dates: "Jan 2023 — Aug 2023",
        summary:
          "As a founding member of the Growth VDR team, I focused on expanding revenue within the existing customer base through product education, upsell, and expansion campaigns. I designed Outreach sequences and operational workflows for the new team, segmented and nurtured existing contacts, and engaged Hobby and Pro customers to identify additional product needs. These efforts contributed to a 50% quarter-over-quarter increase in the Enterprise sales funnel while consistently exceeding quota at 127%.",
      },
      {
        role: "Product Advocate",
        dates: "Aug 2022 — Jan 2023",
        summary:
          "Served as the first point of contact for prospective customers by educating developers and technical buyers on the Vercel platform and identifying qualified sales opportunities. I managed customer interactions, cases, and opportunities within Salesforce while helping accelerate product adoption through technical guidance and support. This role provided a strong foundation in customer engagement, product education, and qualifying future pipeline for the sales organization.",
      },
    ],
  },
  {
    company: "BloomTech (FKA Lambda School)",
    dates: "Aug 2021 — May 2022",
    roles: [
      {
        role: "Full-Stack Web Development",
        dates: "Aug 2021 — May 2022",
        summary:
          "Completed an immersive full-stack web development program focused on building production-ready applications using modern JavaScript technologies, including React, Redux, Node.js, SQL, HTML, and CSS. Developed a strong foundation in computer science fundamentals such as algorithms and data structures while gaining hands-on experience with frontend and backend development, client and server testing, and collaborative software engineering practices. Worked on agile, team-based projects using Git workflows, pair programming, and iterative product development processes that mirrored real-world engineering environments.",
      },
    ],
  },
];

const skillGroups = [
  {
    label: "Sales stack",
    items: ["HubSpot", "Salesforce", "Apollo", "Outreach", "ZoomInfo", "RB2B", "Clay"],
  },
  {
    label: "Technical",
    items: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "SQL", "HTML", "CSS", "Git", "PostgreSQL"],
  },
  {
    label: "Dev tools",
    items: ["GitHub", "Vercel", "Claude Code", "Postman", "Render", "Zapier", "n8n", "Dust"],
  },
];

const pipelinePreview = [
  { id: "in", tag: "IN", label: "Form submit", sub: "Name, email, company", status: "planned" as const },
  { id: "crm", tag: "CRM", label: "HubSpot record", sub: "Contact created/updated", status: "planned" as const },
  { id: "enrich", tag: "N8N + CLAY", label: "Enrich HubSpot record", sub: "Coming soon", status: "planned" as const },
  { id: "slack", tag: "SLACK", label: "Slack ping", sub: "Notifies Peter", status: "planned" as const },
  { id: "email", tag: "EMAIL", label: "Email alert", sub: "Notifies Peter", status: "planned" as const },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border-soft">
        <div className="relative mx-auto max-w-4xl px-6 pt-16">
          <div className="relative overflow-hidden rounded-2xl border border-border">
            <GridBackdrop />
            <CornerBrackets />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[280px]"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 0%, rgba(74,143,224,0.14) 0%, rgba(11,12,16,0) 70%)",
              }}
              aria-hidden
            />
            <div className="relative px-6 pt-16 pb-14 text-center sm:px-12">
              <Link
                href="/case-studies/live-lead-pipeline"
                className="inline-flex items-center gap-2 rounded-[2px] border border-border bg-panel px-3.5 py-1.5 font-mono text-xs uppercase tracking-widest text-text-muted transition-colors hover:border-accent/40 hover:text-accent-soft"
              >
                <svg width="10" height="10" viewBox="0 0 20 20" aria-hidden="true">
                  <line x1="10" y1="0" x2="10" y2="20" stroke="var(--color-accent)" strokeWidth="1.5" />
                  <line x1="0" y1="10" x2="20" y2="10" stroke="var(--color-accent)" strokeWidth="1.5" />
                  <circle cx="10" cy="10" r="6" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" />
                </svg>
                Live case study: a working lead pipeline →
              </Link>

              <h1 className="mt-8 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-5xl font-semibold leading-[1.05] tracking-tight text-transparent sm:text-7xl">
                Sales Rep turned
                <br />GTM Engineer
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-text-muted">
                FOR HIRE → Certified full-stack developer with 4+ years in B2B SaaS Sales.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[2px] bg-accent px-7 font-mono text-sm font-medium uppercase tracking-wide text-ink transition-colors hover:bg-accent-soft"
                >
                  Trigger the pipeline →
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex h-12 items-center justify-center rounded-[2px] border border-border px-7 font-mono text-sm uppercase tracking-wide text-text-muted transition-colors hover:border-accent/40 hover:text-text"
                >
                  See how this site works
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="mx-auto max-w-4xl px-6 py-24">
        <SheetKicker index="01" label="Track record" />
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
          Experience
        </h2>
        <div className="mt-12 space-y-px overflow-hidden rounded-2xl border border-border">
          {experience.map((job, i) => (
            <div key={job.company} className="bg-panel p-6 sm:p-8">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-xl font-semibold text-text">{job.company}</h3>
                <span className="font-mono text-xs tracking-wide text-text-faint">
                  SHEET 0{i + 1} · {job.dates}
                </span>
              </div>
              <div className="mt-4">
                <DimensionRule />
              </div>
              <div className="mt-5 space-y-6">
                {job.roles.map((r) => (
                  <div key={r.role}>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <p className="font-mono text-xs uppercase tracking-widest text-accent-soft">
                        {r.role}
                      </p>
                      {job.roles.length > 1 && (
                        <span className="font-mono text-[11px] text-text-faint">{r.dates}</span>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-text-muted">{r.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="mx-auto max-w-4xl px-6 py-24">
        <SheetKicker index="02" label="Toolbox" />
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
          Tools I work with
        </h2>
        <div className="mt-12 space-y-8">
          {skillGroups.map((g) => (
            <div key={g.label}>
              <div className="font-mono text-xs uppercase tracking-widest text-text-faint">
                {g.label}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <BlueprintChip key={item}>{item}</BlueprintChip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured case study */}
      <section className="border-t border-border-soft bg-panel/40">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-panel p-8 sm:p-12">
            <GridBackdrop className="opacity-40" />
            <div className="relative">
              <div className="font-mono text-xs uppercase tracking-widest text-accent">
                Flagship case study
              </div>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-text sm:text-3xl">
                This site is a working GTM system — and you can trigger it.
              </h3>
              <p className="mt-4 max-w-2xl leading-7 text-text-muted">
                The contact form isn&apos;t a passive form that quietly emails me.
                It&apos;s a live lead pipeline: submit it and your details get
                enriched and written to my CRM in real time, with a Slack
                ping and an email alert to me. The job, running
                inside the artifact I used to apply for it.
              </p>

              <div className="mt-8">
                <p className="font-mono text-[10px] uppercase tracking-widest text-text-faint">
                  fig. 01 — pipeline architecture
                </p>
                <div className="mt-3">
                  <PipelineDiagram nodes={pipelinePreview} />
                </div>
              </div>

              <Link
                href="/case-studies/live-lead-pipeline"
                className="mt-8 inline-flex items-center gap-2 rounded-[2px] bg-accent px-6 py-3 font-mono text-sm uppercase tracking-wide text-ink transition-colors hover:bg-accent-soft"
              >
                Read the case study →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="mx-auto max-w-4xl px-6 py-28 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
          Let&apos;s build your pipeline.
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-8 text-text-muted">
          Fill out the form and watch the system work. It&apos;s the fastest way
          to see how I&apos;d think about your GTM motion.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-[2px] bg-accent px-8 font-mono text-sm uppercase tracking-wide text-ink transition-colors hover:bg-accent-soft"
        >
          Trigger the pipeline →
        </Link>
      </section>
    </>
  );
}
