"use client";

import { useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import type { LeadResult } from "@/lib/leads/types";

// Mirrors the palette in ../page.tsx — keep the two in sync.
const c = {
  bg: "#faf9f7",
  panel: "#ffffff",
  border: "#e3e0da",
  borderSoft: "#eae7e1",
  text: "#1c1b18",
  muted: "#56534c",
  faint: "#8b877e",
  link: "#15803d",
};

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-xl px-3.5 py-2.5 outline-none transition-colors";

export function OwnerLeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<string[]>([]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors([]);

    const form = e.currentTarget;
    const payload = {
      ...Object.fromEntries(new FormData(form).entries()),
      source: "owner",
    };

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
      track("lead_submitted", {
        workEmail: leadResult.enrichment.isWorkEmail,
        hubspot: leadResult.integrations.hubspot,
        source: "owner",
      });
      setStatus("success");
      form.reset();
    } catch {
      setErrors(["Network error. Please try again."]);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-2xl p-8 text-center"
        style={{ backgroundColor: c.panel, border: `1px solid ${c.borderSoft}` }}
      >
        <h3 className="text-xl font-semibold" style={{ color: c.text }}>
          Got it — check your inbox.
        </h3>
        <p className="mt-3 leading-7" style={{ color: c.muted }}>
          Your details just ran through the same pipeline I&apos;d build for
          Owner, and a reply from me is already on its way.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 font-mono text-xs uppercase tracking-widest underline underline-offset-4"
          style={{ color: c.link }}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot — hidden from real users, catches bots. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block font-mono text-xs uppercase tracking-widest"
          style={{ color: c.faint }}
        >
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputClass}
          style={{ backgroundColor: c.panel, border: `1px solid ${c.border}`, color: c.text }}
          placeholder="you@owner.com"
        />
      </div>

      {status === "error" && errors.length > 0 && (
        <ul
          className="space-y-1 rounded-xl p-3 text-sm"
          style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c" }}
        >
          {errors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-85 disabled:opacity-60"
        style={{ backgroundColor: c.text, color: c.bg }}
      >
        {status === "submitting" ? "Sending…" : "Get in touch"}
      </button>
    </form>
  );
}
