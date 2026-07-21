"use client";

import { useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import type { LeadResult } from "@/lib/leads/types";

// Mirrors the palette in ../page.tsx — keep the two in sync.
const c = {
  bg: "#150f1d",
  panel: "#1d1528",
  border: "#342a47",
  borderSoft: "#2a2138",
  text: "#f2eff6",
  muted: "#a89fb8",
  faint: "#6f6584",
  purple: "#a855f7",
};

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-lg px-3.5 py-2.5 outline-none transition-colors";

export function SocketLeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<string[]>([]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors([]);

    const form = e.currentTarget;
    const payload = {
      ...Object.fromEntries(new FormData(form).entries()),
      source: "socket",
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
        source: "socket",
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
          Socket, and a reply from me is already on its way.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 font-mono text-xs uppercase tracking-widest underline underline-offset-4"
          style={{ color: c.purple }}
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
          placeholder="you@socket.dev"
        />
      </div>

      <div>
        <label
          htmlFor="linkedinUrl"
          className="mb-1.5 block font-mono text-xs uppercase tracking-widest"
          style={{ color: c.faint }}
        >
          LinkedIn profile URL
        </label>
        <input
          id="linkedinUrl"
          name="linkedinUrl"
          type="url"
          required
          className={inputClass}
          style={{ backgroundColor: c.bg, border: `1px solid ${c.border}`, color: c.text }}
          placeholder="https://linkedin.com/in/you"
        />
      </div>

      {status === "error" && errors.length > 0 && (
        <ul
          className="space-y-1 rounded-lg p-3 text-sm"
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
        className="w-full rounded-full px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-85 disabled:opacity-60"
        style={{ backgroundColor: c.text, color: c.bg }}
      >
        {status === "submitting" ? "Sending…" : "Get in touch"}
      </button>
    </form>
  );
}
