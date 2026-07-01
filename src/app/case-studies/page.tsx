import Link from "next/link";
import type { Metadata } from "next";
import { getAllCaseStudies, DOMAIN_LABELS } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Case studies — GTM systems, documented",
  description:
    "GTM systems I've built, each documented as Problem → Architecture → Measurable result.",
};

export default function CaseStudiesPage() {
  const studies = getAllCaseStudies();

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-20">
      <Link
        href="/"
        className="text-sm text-zinc-500 transition-colors hover:text-white"
      >
        ← Home
      </Link>

      <header className="mt-6 mb-12">
        <div className="text-sm font-medium text-red-400">Case study</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
          GTM systems, documented
        </h1>
        <p className="mt-3 max-w-prose text-lg leading-8 text-zinc-400">
          Each one a problem, the architecture I shipped, and the measurable
          result.
        </p>
      </header>

      <ul className="space-y-5">
        {studies.map((cs) => (
          <li key={cs.slug}>
            <Link
              href={`/case-studies/${cs.slug}`}
              className="group block rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/25"
            >
              <span className="text-xs font-medium uppercase tracking-wide text-red-400">
                {DOMAIN_LABELS[cs.domain]}
              </span>
              <h2 className="mt-2 text-xl font-semibold text-white group-hover:underline">
                {cs.title}
              </h2>
              <p className="mt-2 leading-7 text-zinc-400">{cs.problem}</p>
              <p className="mt-4 text-sm font-medium text-zinc-200">
                Result: {cs.result}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {studies.length === 0 && (
        <p className="text-zinc-500">No case studies yet.</p>
      )}
    </main>
  );
}
