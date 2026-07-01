import type { Enrichment, IntegrationStatus, Lead } from "./types";
import { isFreeEmailDomain } from "./validate";

/**
 * Instant, dependency-free enrichment derived from the email address. Runs
 * synchronously so the form can show the submitter something useful right away,
 * while Clay does the deeper enrichment downstream.
 */
export function deriveEnrichment(lead: Lead): Enrichment {
  const emailDomain = lead.email.split("@")[1] ?? "";
  const isWorkEmail = emailDomain !== "" && !isFreeEmailDomain(emailDomain);
  return {
    emailDomain,
    isWorkEmail,
    companyDomain: isWorkEmail ? emailDomain : null,
  };
}

/**
 * Send the lead to a Clay table webhook for deep enrichment + routing.
 * Fire-and-forget — Clay enriches asynchronously. No-ops (returns "skipped")
 * when CLAY_WEBHOOK_URL isn't set, so the form works before it's wired.
 */
export async function sendToClay(
  lead: Lead,
  enrichment: Enrichment,
): Promise<IntegrationStatus> {
  const url = process.env.CLAY_WEBHOOK_URL;
  if (!url) return "skipped";
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...lead,
        ...enrichment,
        source: "portfolio-site",
        submittedAt: new Date().toISOString(),
      }),
    });
    return res.ok ? "sent" : "error";
  } catch {
    return "error";
  }
}
