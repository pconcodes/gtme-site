import type { Metadata } from "next";
import Link from "next/link";
import { BoltLeadForm } from "./bolt-lead-form";

export const metadata: Metadata = {
  title: "Get in touch — GTM Engineering for Bolt.new",
  description: "Reach Peter Conley about GTM Engineering at Bolt.new.",
  robots: { index: false, follow: false },
};

// Mirrors the palette in ../page.tsx — keep the two in sync.
const c = {
  bg: "#0b0b0c",
  text: "#f4f5f7",
  muted: "#9ba1ad",
  blueBright: "#2f6bff",
  blueLight: "#7cb3ff",
};

const gradientText = {
  backgroundImage: `linear-gradient(90deg, ${c.blueBright}, ${c.blueLight})`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
} as const;

export default function BoltContactPage() {
  return (
    <div style={{ backgroundColor: c.bg, color: c.text }}>
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

      <section className="mx-auto max-w-xl px-6 pb-24 pt-16 sm:pt-24">
        <Link
          href="/bolt"
          className="font-mono text-xs uppercase tracking-widest underline-offset-4 hover:underline"
          style={{ color: c.muted }}
        >
          ← Back to the pitch
        </Link>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
          Let&apos;s talk <span style={gradientText}>GTM Engineering</span>.
        </h1>
        <div className="mt-10">
          <BoltLeadForm />
        </div>
      </section>
    </div>
  );
}
