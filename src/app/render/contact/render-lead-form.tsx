"use client";

import { useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import type { LeadResult } from "@/lib/leads/types";

// Mirrors the palette in ../page.tsx — keep the two in sync.
const c = {
  bg: "#0a0a0a",
  panel: "#141414",
  border: "#2e2e2e",
  borderSoft: "#232323",
  text: "#f5f5f5",
  muted: "#a3a3a3",
  faint: "#6b6b6b",
  green: "#34d399",
};

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-[2px] px-3.5 py-2.5 outline-none transition-colors";

export function RenderLeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<string[]>([]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors([]);

    const form = e.currentTarget;
    const payload = {
      ...Object.fromEntries(new FormData(form).entries()),
      source: "render",
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
        source: "render",
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
        className="rounded-lg p-8 text-center"
        style={{ backgroundColor: c.panel, border: `1px solid ${c.borderSoft}` }}
      >
        <h3 className="text-xl font-semibold" style={{ color: c.text }}>
          Got it — check your inbox.
        </h3>
        <p className="mt-3 leading-7" style={{ color: c.muted }}>
          Your details just ran through the same pipeline I&apos;d build for
          Render, and a reply from me is already on its way.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 font-mono text-xs uppercase tracking-widest underline underline-offset-4"
          style={{ color: c.green }}
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
          style={{ backgroundColor: c.bg, border: `1px solid ${c.border}`, color: c.text }}
          placeholder="you@render.com"
        />
      </div>

      {status === "error" && errors.length > 0 && (
        <ul
          className="space-y-1 rounded-[2px] p-3 text-sm"
          style={{ backgroundColor: "rgba(127,29,29,0.3)", border: "1px solid rgba(127,29,29,0.6)", color: "#fca5a5" }}
        >
          {errors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-[2px] px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-85 disabled:opacity-60"
        style={{ backgroundColor: c.text, color: c.bg }}
      >
        {status === "submitting" ? "Sending…" : "Get in touch"}
      </button>
    </form>
  );
}
