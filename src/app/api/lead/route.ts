import { NextResponse } from "next/server";
import { parseLead } from "@/lib/leads/validate";
import { deriveEnrichment, sendToClay } from "@/lib/leads/enrich";
import { pushToHubSpot } from "@/lib/leads/hubspot";
import { pingSlack } from "@/lib/leads/slack";
import type { LeadError, LeadResult } from "@/lib/leads/types";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json<LeadError>(
      { ok: false, errors: ["Invalid request."] },
      { status: 400 },
    );
  }

  const { lead, errors, isBot } = parseLead(body);

  // Honeypot tripped: pretend success, do no work.
  if (isBot) {
    return NextResponse.json<LeadResult>({
      ok: true,
      enrichment: { emailDomain: "", isWorkEmail: false, companyDomain: null },
      integrations: { clay: "skipped", hubspot: "skipped", slack: "skipped" },
    });
  }

  if (!lead) {
    return NextResponse.json<LeadError>(
      { ok: false, errors },
      { status: 400 },
    );
  }

  const enrichment = deriveEnrichment(lead);

  // Run integrations in parallel; each degrades gracefully on its own.
  const [clay, hubspot, slack] = await Promise.all([
    sendToClay(lead, enrichment),
    pushToHubSpot(lead),
    pingSlack(lead, enrichment),
  ]);

  return NextResponse.json<LeadResult>({
    ok: true,
    enrichment,
    integrations: { clay, hubspot, slack },
  });
}
