import type { Enrichment, Lead } from "./types";
import { isFreeEmailDomain } from "./validate";

/**
 * Instant, dependency-free enrichment derived from the email address. Runs
 * synchronously so the form can show the submitter something useful right away.
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
