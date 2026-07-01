import type { IntegrationStatus, Lead } from "./types";

/**
 * Upsert the lead as a HubSpot contact via the CRM v3 API. No-ops (returns
 * "skipped") without HUBSPOT_PRIVATE_APP_TOKEN.
 *
 * Note: only standard contact properties are sent (email, first/last name,
 * company). The free-text `message` is intentionally left out — it isn't a
 * default contact property and would 400. Route it to a custom property or a
 * note/engagement once you've created one in HubSpot.
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

  const [firstname, ...rest] = lead.name.split(" ");
  const properties: Record<string, string> = {
    email: lead.email,
    firstname,
    lastname: rest.join(" "),
    company: lead.company,
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
