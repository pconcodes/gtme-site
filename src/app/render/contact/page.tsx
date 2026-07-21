import type { Metadata } from "next";
import Link from "next/link";
import { RenderLeadForm } from "./render-lead-form";

export const metadata: Metadata = {
  title: "Get in touch — GTM Engineering for Render",
  description: "Reach Peter Conley about GTM Engineering at Render.",
  robots: { index: false, follow: false },
};

// Mirrors the palette in ../page.tsx — keep the two in sync.
const c = {
  bg: "#0a0a0a",
  borderSoft: "#232323",
  text: "#f5f5f5",
  muted: "#a3a3a3",
  purple: "#a78bfa",
  green: "#34d399",
};

const gradientText = {
  backgroundImage: `linear-gradient(90deg, ${c.purple}, ${c.green})`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
} as const;

export default function RenderContactPage() {
  return (
    <div style={{ backgroundColor: c.bg, color: c.text }}>
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

      <section className="mx-auto max-w-xl px-6 pb-24 pt-16 sm:pt-24">
        <Link
          href="/render"
          className="font-mono text-xs uppercase tracking-widest underline-offset-4 hover:underline"
          style={{ color: c.muted }}
        >
          ← Back to the pitch
        </Link>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
          Let&apos;s talk <span style={gradientText}>GTM Engineering</span>.
        </h1>
        <div className="mt-10">
          <RenderLeadForm />
        </div>
      </section>
    </div>
  );
}
