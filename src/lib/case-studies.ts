import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "case-studies");

export type Domain = "crm" | "outbound" | "leadops";

export const DOMAIN_LABELS: Record<Domain, string> = {
  crm: "CRM / Data workflows",
  outbound: "Outbound / Sequencing",
  leadops: "Lead capture / Automation",
};

export interface CaseStudyMeta {
  title: string;
  slug: string;
  domain: Domain;
  /** One-line teaser of the GTM pain, used on cards and as meta description. */
  problem: string;
  /** Headline result/number shown on the card. */
  result: string;
  /** Sort order on the list page (ascending). */
  order: number;
  featured: boolean;
  /** True when the metrics are illustrative rather than from a real role. */
  illustrative?: boolean;
  stack?: string[];
}

function readFile(slug: string): matter.GrayMatterFile<string> {
  return matter(fs.readFileSync(path.join(CONTENT_DIR, `${slug}.mdx`), "utf8"));
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function toMeta(slug: string, data: Record<string, unknown>): CaseStudyMeta {
  return { ...(data as Omit<CaseStudyMeta, "slug">), slug };
}

/** All case studies, sorted by `order` ascending. Metadata only (no body). */
export function getAllCaseStudies(): CaseStudyMeta[] {
  return getAllSlugs()
    .map((slug) => toMeta(slug, readFile(slug).data))
    .sort((a, b) => a.order - b.order);
}

/** A single case study's metadata + raw MDX body, or null if not found. */
export function getCaseStudy(
  slug: string,
): { meta: CaseStudyMeta; body: string } | null {
  const file = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = readFile(slug);
  return { meta: toMeta(slug, data), body: content };
}
