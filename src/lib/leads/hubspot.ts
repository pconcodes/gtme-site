import type { IntegrationStatus, Lead } from "./types";

/**
 * Upsert the lead as a HubSpot contact via the CRM v3 API. No-ops (returns
 * "skipped") without HUBSPOT_PRIVATE_APP_TOKEN.
 *
 * Note: only the standard `email` property is sent. `linkedinUrl` isn't a
 * default contact property and would 400 — create a custom "linkedin_url"
 * property in HubSpot to start capturing it here too. Either way it still
 * reaches Peter via the Slack ping and email notification.
 */
export async function pushToHubSpot(lead: Lead): Promise<IntegrationStatus> {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) {
    console.warn(
      "[hubspot] skipped — HUBSPOT_PRIVATE_APP_TOKEN is not set in this process. " +
        "Did you restart `npm run dev` after editing .env.local?",
    );
    return "skipped";
  }

  const properties: Record<string, string> = {
    email: lead.email,
  };

  try {
    const res = await fetch(
      "https://api.hubapi.com/crm/v3/objects/contacts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ properties }),
      },
    );

    // 409 = contact already exists; update it by email instead.
    if (res.status === 409) {
      return updateContactByEmail(lead.email, properties, token);
    }
    if (!res.ok) {
      console.error(
        `[hubspot] create failed: ${res.status} ${res.statusText} — ${await res
          .text()
          .catch(() => "")}`,
      );
      return "error";
    }
    return "sent";
  } catch (err) {
    console.error("[hubspot] request threw:", err);
    return "error";
  }
}

async function updateContactByEmail(
  email: string,
  properties: Record<string, string>,
  token: string,
): Promise<IntegrationStatus> {
  try {
    const res = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(
        email,
      )}?idProperty=email`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ properties }),
      },
    );
    return res.ok ? "sent" : "error";
  } catch {
    return "error";
  }
}
