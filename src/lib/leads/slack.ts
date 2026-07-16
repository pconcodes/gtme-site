import type { Enrichment, IntegrationStatus, Lead } from "./types";

/**
 * Ping a Slack channel via an incoming webhook. No-ops (returns "skipped")
 * without SLACK_WEBHOOK_URL.
 */
export async function pingSlack(
  lead: Lead,
  enrichment: Enrichment,
): Promise<IntegrationStatus> {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) {
    console.warn(
      "[slack] skipped — SLACK_WEBHOOK_URL is not set in this process. " +
        "Did you restart `npm run dev` after editing .env.local?",
    );
    return "skipped";
  }

  const text = [
    ":inbox_tray: *New lead from the portfolio site*",
    `*Work email:* ${lead.email}`,
    `*LinkedIn:* ${lead.linkedinUrl}`,
    `*Company domain:* ${enrichment.companyDomain ?? "—"}`,
  ].join("\n");

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) {
      console.error(
        `[slack] post failed: ${res.status} ${res.statusText} — ${await res
          .text()
          .catch(() => "")}`,
      );
      return "error";
    }
    return "sent";
  } catch (err) {
    console.error("[slack] request threw:", err);
    return "error";
  }
}
