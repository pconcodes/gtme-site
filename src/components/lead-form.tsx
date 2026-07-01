"use client";

import { useState, type FormEvent } from "react";
import type { LeadResult } from "@/lib/leads/types";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-zinc-100 outline-none transition-colors placeholder:text-zinc-500 focus:border-red-500";
const labelClass =
  "mb-1.5 block text-sm font-medium text-zinc-300";

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<LeadResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors([]);

    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok || !json.ok) {
        setErrors(json.errors ?? ["Something went wrong. Please try again."]);
        setStatus("error");
        return;
      }

      setResult(json as LeadResult);
      setStatus("success");
      form.reset();
    } catch {
      setErrors(["Network error. Please try again."]);
      setStatus("error");
    }
  }

  if (status === "success" && result) {
    return <SuccessPanel result={result} onReset={() => setStatus("idle")} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot — hidden from real users, catches bots. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input id="name" name="name" type="text" required className={inputClass} placeholder="Jane Rivera" />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Work email
          </label>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="jane@company.com" />
        </div>
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>
          Company
        </label>
        <input id="company" name="company" type="text" required className={inputClass} placeholder="Acme Inc." />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea id="message" name="message" required rows={4} className={inputClass} placeholder="What are you hiring for / what's the GTM pain?" />
      </div>

      {status === "error" && errors.length > 0 && (
        <ul className="space-y-1 rounded-lg border border-red-900/50 bg-red-950/40 p-3 text-sm text-red-300">
          {errors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-lg bg-red-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-red-500 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending through the pipeline…" : "Send it through the pipeline"}
      </button>

      <p className="text-center text-xs text-zinc-500">
        Submitting triggers the same enrich → CRM → Slack pipeline I build for GTM teams.
      </p>
    </form>
  );
}

function StatusBadge({ status }: { status: LeadResult["integrations"]["clay"] }) {
  const map = {
    sent: { label: "fired", cls: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" },
    skipped: { label: "not wired yet", cls: "bg-white/5 text-zinc-400 border-white/10" },
    error: { label: "error", cls: "bg-red-500/15 text-red-300 border-red-500/30" },
  } as const;
  const { label, cls } = map[status];
  return (
    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${cls}`}>{label}</span>
  );
}

function SuccessPanel({
  result,
  onReset,
}: {
  result: LeadResult;
  onReset: () => void;
}) {
  const { enrichment, integrations } = result;
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <h3 className="text-lg font-semibold text-white">
        You just triggered the pipeline.
      </h3>
      <p className="mt-2 text-sm leading-6 text-zinc-400">
        Here&apos;s what happened the instant you hit submit — the same system I
        build for GTM teams, running on my own site.
      </p>

      <div className="mt-5">
        <p className="text-xs font-medium uppercase tracking-wide text-red-400">
          Enriched on the fly
        </p>
        <dl className="mt-2 space-y-1 text-sm text-zinc-300">
          <div className="flex justify-between gap-4">
            <dt className="text-zinc-500">Email domain</dt>
            <dd className="font-medium">{enrichment.emailDomain || "—"}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-zinc-500">Work email</dt>
            <dd className="font-medium">{enrichment.isWorkEmail ? "yes" : "no"}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-zinc-500">Company domain</dt>
            <dd className="font-medium">{enrichment.companyDomain ?? "—"}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-5">
        <p className="text-xs font-medium uppercase tracking-wide text-red-400">
          Routed to
        </p>
        <ul className="mt-2 space-y-2 text-sm text-zinc-300">
          <li className="flex items-center justify-between gap-4">
            <span>Clay (deep enrichment)</span>
            <StatusBadge status={integrations.clay} />
          </li>
          <li className="flex items-center justify-between gap-4">
            <span>HubSpot (CRM)</span>
            <StatusBadge status={integrations.hubspot} />
          </li>
          <li className="flex items-center justify-between gap-4">
            <span>Slack (notify me)</span>
            <StatusBadge status={integrations.slack} />
          </li>
        </ul>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-sm font-medium text-red-400 underline underline-offset-4 transition-colors hover:text-red-300"
      >
        Send another
      </button>
    </div>
  );
}
