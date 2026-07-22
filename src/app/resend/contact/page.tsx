import type { Metadata } from "next";
import Link from "next/link";
import { ResendLeadForm } from "./resend-lead-form";

export const metadata: Metadata = {
  title: "Get in touch — GTM Engineering for Resend",
  description: "Reach Peter Conley about GTM Engineering at Resend.",
  robots: { index: false, follow: false },
};

// Mirrors the palette in ../page.tsx — keep the two in sync.
const c = {
  bg: "#000000",
  text: "#fafafa",
  muted: "#a1a1a1",
};

const gradientText = {
  backgroundImage: "linear-gradient(90deg, #8b5cf6, #ec4899, #f97316)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
} as const;

const serif = {
  fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", serif',
} as const;

export default function ResendContactPage() {
  return (
    <div style={{ backgroundColor: c.bg, color: c.text }}>
      <div
        className="px-6 py-2.5 text-center font-mono text-[11px] font-semibold tracking-wide"
        style={{ backgroundColor: c.text, color: c.bg }}
      >
        A job-application pitch by{" "}
        <Link href="/" className="underline underline-offset-2" style={{ color: c.bg }}>
          Peter Conley
        </Link>{" "}
        — not an official Resend page.
      </div>

      <section className="mx-auto max-w-xl px-6 pb-24 pt-16 sm:pt-24">
        <Link
          href="/resend"
          className="font-mono text-xs uppercase tracking-widest underline-offset-4 hover:underline"
          style={{ color: c.muted }}
        >
          ← Back to the pitch
        </Link>
        <h1 className="mt-6 text-4xl tracking-tight sm:text-5xl" style={serif}>
          Let&apos;s talk{" "}
          <span style={{ ...gradientText, ...serif }}>GTM Engineering</span>.
        </h1>
        <div className="mt-10">
          <ResendLeadForm />
        </div>
      </section>
    </div>
  );
}
