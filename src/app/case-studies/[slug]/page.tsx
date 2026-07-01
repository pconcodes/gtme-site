import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import {
  getAllSlugs,
  getCaseStudy,
  DOMAIN_LABELS,
} from "@/lib/case-studies";
import { mdxComponents } from "@/components/mdx";

type Params = { slug: string };

// Pre-render every case study at build time.
export function generateStaticParams(): Params[] {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: cs.meta.title,
    description: cs.meta.problem,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const { content } = await compileMDX({
    source: cs.body,
    components: mdxComponents,
  });

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-20">
      <Link
        href="/case-studies"
        className="text-sm text-zinc-500 transition-colors hover:text-white"
      >
        ← All case studies
      </Link>

      <header className="mt-6 mb-2">
        <span className="text-xs font-medium uppercase tracking-wide text-red-400">
          {DOMAIN_LABELS[cs.meta.domain]}
        </span>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {cs.meta.title}
        </h1>
        {cs.meta.stack && cs.meta.stack.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {cs.meta.stack.map((tool) => (
              <li
                key={tool}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-400"
              >
                {tool}
              </li>
            ))}
          </ul>
        )}
      </header>

      <article>{content}</article>

      <div className="mt-16 border-t border-white/10 pt-8">
        <p className="text-zinc-300">Want a system like this for your team?</p>
        <Link
          href="/contact"
          className="mt-3 inline-block rounded-full bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-500"
        >
          Get in touch
        </Link>
      </div>
    </main>
  );
}
