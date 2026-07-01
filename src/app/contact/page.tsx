import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/lead-form";

export const metadata: Metadata = {
  title: "Get in touch — trigger the pipeline",
  description:
    "Fill out the form and watch your details get enriched and routed into my CRM in real time — the lead pipeline I build for GTM teams.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-xl px-6 py-20">
      <Link
        href="/"
        className="text-sm text-zinc-500 transition-colors hover:text-white"
      >
        ← Home
      </Link>

      <header className="mt-6 mb-8">
        <div className="text-sm font-medium text-red-400">Live GTM system</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
          Trigger the pipeline
        </h1>
        <p className="mt-3 leading-7 text-zinc-400">
          This isn&apos;t a contact form that emails me. Submit it and your
          details get enriched and routed into my CRM in real time — the same
          GTM system I&apos;d build for your team. Watch it work.
        </p>
      </header>

      <LeadForm />
    </main>
  );
}
