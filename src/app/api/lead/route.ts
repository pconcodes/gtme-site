import { NextResponse } from "next/server";
import { parseLead } from "@/lib/leads/validate";
import { deriveEnrichment } from "@/lib/leads/enrich";
import { pushToHubSpot } from "@/lib/leads/hubspot";
import { pingSlack } from "@/lib/leads/slack";
import { emailLead } from "@/lib/leads/email";
import { checkRateLimit, getClientIp } from "@/lib/leads/rate-limit";
import type { LeadError, LeadResult } from "@/lib/leads/types";

export async function POST(req: Request) {
  // Rate limit before doing any work.
  const { allowed, retryAfterSeconds } = checkRateLimit(getClientIp(req));
  if (!allowed) {
    return NextResponse.json<LeadError>(
      {
        ok: false,
        errors: ["Too many submissions. Please wait a minute and try again."],
      },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
    );
  }

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
      integrations: {
        hubspot: "skipped",
        slack: "skipped",
        email: "skipped",
      },
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
  const [hubspot, slack, email] = await Promise.all([
    pushToHubSpot(lead),
    pingSlack(lead, enrichment),
    emailLead(lead, enrichment),
  ]);

  return NextResponse.json<LeadResult>({
    ok: true,
    enrichment,
    integrations: { hubspot, slack, email },
  });
}
