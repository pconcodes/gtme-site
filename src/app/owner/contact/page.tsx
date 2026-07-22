import type { Metadata } from "next";
import Link from "next/link";
import { OwnerLeadForm } from "./owner-lead-form";

export const metadata: Metadata = {
  title: "Get in touch — GTM Engineering for Owner.com",
  description: "Reach Peter Conley about GTM Engineering at Owner.com.",
  robots: { index: false, follow: false },
};

// Mirrors the palette in ../page.tsx — keep the two in sync.
const c = {
  bg: "#faf9f7",
  text: "#1c1b18",
  muted: "#56534c",
  greenDark: "#14401f",
};

const gradientText = {
  backgroundImage: "linear-gradient(90deg, #166534, #22c55e)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
} as const;

export default function OwnerContactPage() {
  return (
    <div style={{ backgroundColor: c.bg, color: c.text }}>
      <div
        className="px-6 py-2.5 text-center font-mono text-[11px] font-semibold tracking-wide"
        style={{ backgroundColor: c.greenDark, color: "#ffffff" }}
      >
        A job-application pitch by{" "}
        <Link href="/" className="underline underline-offset-2" style={{ color: "#ffffff" }}>
          Peter Conley
        </Link>{" "}
        — not an official Owner.com page.
      </div>

      <section className="mx-auto max-w-xl px-6 pb-24 pt-16 sm:pt-24">
        <Link
          href="/owner"
          className="font-mono text-xs uppercase tracking-widest underline-offset-4 hover:underline"
          style={{ color: c.muted }}
        >
          ← Back to the pitch
        </Link>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
          Let&apos;s talk <span style={gradientText}>GTM Engineering</span>.
        </h1>
        <div className="mt-10">
          <OwnerLeadForm />
        </div>
      </section>
    </div>
  );
}
