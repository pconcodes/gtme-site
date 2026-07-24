import type { Metadata } from "next";
import Link from "next/link";
import { ClickHouseLeadForm } from "./clickhouse-lead-form";

export const metadata: Metadata = {
  title: "Get in touch — GTM Engineering for ClickHouse",
  description: "Reach Peter Conley about GTM Engineering at ClickHouse.",
  robots: { index: false, follow: false },
};

// Mirrors the palette in ../page.tsx — keep the two in sync.
const c = {
  bg: "#0f0f0f",
  text: "#fafafa",
  muted: "#a3a3a3",
  yellow: "#f4ff61",
};

export default function ClickHouseContactPage() {
  return (
    <div style={{ backgroundColor: c.bg, color: c.text }}>
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

      <section className="mx-auto max-w-xl px-6 pb-24 pt-16 sm:pt-24">
        <Link
          href="/clickhouse"
          className="font-mono text-xs uppercase tracking-widest underline-offset-4 hover:underline"
          style={{ color: c.muted }}
        >
          ← Back to the pitch
        </Link>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
          Let&apos;s talk <span style={{ color: c.yellow }}>GTM Engineering</span>.
        </h1>
        <div className="mt-10">
          <ClickHouseLeadForm />
        </div>
      </section>
    </div>
  );
}
