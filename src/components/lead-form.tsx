"use client";

import { useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import type { LeadResult } from "@/lib/leads/types";
import { PipelineDiagram, type NodeStatus } from "@/components/blueprint";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-[2px] border border-border bg-panel px-3.5 py-2.5 text-text outline-none transition-colors placeholder:text-text-faint focus:border-accent";
const labelClass =
  "mb-1.5 block font-mono text-xs uppercase tracking-widest text-text-faint";

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

      const leadResult = json as LeadResult;
      // Conversion event — the funnel's actual goal.
      track("lead_submitted", {
        workEmail: leadResult.enrichment.isWorkEmail,
        hubspot: leadResult.integrations.hubspot,
      });
      setResult(leadResult);
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

      <div>
        <label htmlFor="email" className={labelClass}>
          Work email
        </label>
        <input id="email" name="email" type="email" required className={inputClass} placeholder="jane@company.com" />
      </div>

      <div>
        <label htmlFor="linkedinUrl" className={labelClass}>
          LinkedIn profile URL
        </label>
        <input id="linkedinUrl" name="linkedinUrl" type="url" required className={inputClass} placeholder="https://linkedin.com/in/janedoe" />
      </div>

      {status === "error" && errors.length > 0 && (
        <ul className="space-y-1 rounded-[2px] border border-red-900/50 bg-red-950/40 p-3 text-sm text-red-300">
          {errors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-[2px] bg-accent px-5 py-3 font-mono text-sm uppercase tracking-wide text-ink transition-colors hover:bg-accent-soft disabled:opacity-60"
      >
        {status === "submitting" ? "Sending through the pipeline…" : "Send it through the pipeline"}
      </button>

      <p className="text-center font-mono text-[10px] uppercase tracking-widest text-text-faint">
        Submitting triggers the same enrich → CRM → Slack/email pipeline I build for GTM teams.
      </p>
    </form>
  );
}

function integrationToStatus(s: LeadResult["integrations"]["hubspot"]): NodeStatus {
  return s;
}

function SuccessPanel({
  result,
  onReset,
}: {
  result: LeadResult;
  onReset: () => void;
}) {
  const { enrichment, integrations } = result;

  const nodes = [
    { id: "in", tag: "IN", label: "Your details", sub: "Submitted just now", status: "sent" as NodeStatus },
    { id: "crm", tag: "CRM", label: "HubSpot record", sub: "Contact created/updated", status: integrationToStatus(integrations.hubspot) },
    { id: "slack", tag: "SLACK", label: "Slack ping", sub: "Notifies Peter", status: integrationToStatus(integrations.slack) },
    { id: "email", tag: "EMAIL", label: "Email alert", sub: "Notifies Peter", status: integrationToStatus(integrations.email) },
  ];

  return (
    <div className="rounded-2xl border border-border bg-panel p-6">
      <h3 className="text-lg font-semibold text-text">
        You just triggered the pipeline.
      </h3>
      <p className="mt-2 text-sm leading-6 text-text-muted">
        Here&apos;s what happened the instant you hit submit — the same system I
        build for GTM teams, running on my own site.
      </p>

      <div className="mt-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-text-faint">
          fig. 01 — pipeline result
        </p>
        <div className="mt-3">
          <PipelineDiagram nodes={nodes} />
        </div>
      </div>

      <div className="mt-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
          Enriched on the fly
        </p>
        <dl className="mt-2 space-y-1 text-sm text-text-muted">
          <div className="flex justify-between gap-4">
            <dt className="text-text-faint">Email domain</dt>
            <dd className="font-medium text-text">{enrichment.emailDomain || "—"}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-text-faint">Work email</dt>
            <dd className="font-medium text-text">{enrichment.isWorkEmail ? "yes" : "no"}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-text-faint">Company domain</dt>
            <dd className="font-medium text-text">{enrichment.companyDomain ?? "—"}</dd>
          </div>
        </dl>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mt-6 font-mono text-xs uppercase tracking-widest text-accent-soft underline underline-offset-4 transition-colors hover:text-accent"
      >
        Send another
      </button>
    </div>
  );
}
