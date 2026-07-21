import type { Metadata } from "next";
import Link from "next/link";
import { SocketLeadForm } from "./socket-lead-form";

export const metadata: Metadata = {
  title: "Get in touch — GTM Engineering for Socket",
  description: "Reach Peter Conley about GTM Engineering at Socket.",
  robots: { index: false, follow: false },
};

// Mirrors the palette in ../page.tsx — keep the two in sync.
const c = {
  bg: "#150f1d",
  panelDeep: "#171020",
  borderSoft: "#2a2138",
  text: "#f2eff6",
  muted: "#a89fb8",
  purple: "#a855f7",
  pink: "#ec4899",
};

const gradientText = {
  backgroundImage: `linear-gradient(90deg, ${c.purple}, ${c.pink})`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
} as const;

export default function SocketContactPage() {
  return (
    <div style={{ backgroundColor: c.bg, color: c.text }}>
      <div
        className="px-6 py-2.5 text-center font-mono text-[11px] font-semibold tracking-wide"
        style={{ backgroundColor: c.pink, color: "#ffffff" }}
      >
        A job-application pitch by{" "}
        <Link href="/" className="underline underline-offset-2" style={{ color: "#ffffff" }}>
          Peter Conley
        </Link>{" "}
        — not an official Socket page.
      </div>

      <section className="mx-auto max-w-xl px-6 pb-24 pt-16 sm:pt-24">
        <Link
          href="/socket"
          className="font-mono text-xs uppercase tracking-widest underline-offset-4 hover:underline"
          style={{ color: c.muted }}
        >
          ← Back to the pitch
        </Link>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
          Let&apos;s talk <span style={gradientText}>Socket</span>.
        </h1>
        <div className="mt-10">
          <SocketLeadForm />
        </div>
      </section>
    </div>
  );
}
