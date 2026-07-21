import { LEAD_SOURCE_LABELS, type Lead, type LeadSource } from "./types";

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "gmx.com",
  "live.com",
  "msn.com",
  "me.com",
  "mail.com",
]);

export function isFreeEmailDomain(domain: string): boolean {
  return FREE_EMAIL_DOMAINS.has(domain.toLowerCase());
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LINKEDIN_RE = /^https?:\/\/([\w-]+\.)?linkedin\.com\/.+/i;

export interface ParsedForm {
  lead?: Lead;
  errors: string[];
  /** True when the honeypot field was filled — almost certainly a bot. */
  isBot: boolean;
}

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export function parseLead(body: unknown): ParsedForm {
  const data = (body ?? {}) as Record<string, unknown>;

  // Honeypot: a hidden field real users never see or fill.
  const isBot = str(data.website) !== "";

  const email = str(data.email).toLowerCase();
  const linkedinUrl = str(data.linkedinUrl);
  const rawSource = str(data.source);
  const source: LeadSource | undefined =
    rawSource in LEAD_SOURCE_LABELS ? (rawSource as LeadSource) : undefined;

  const errors: string[] = [];
  if (!email) {
    errors.push("Work email is required.");
  } else if (!EMAIL_RE.test(email)) {
    errors.push("Enter a valid email address.");
  } else if (isFreeEmailDomain(email.split("@")[1] ?? "")) {
    errors.push("Use your work email — personal addresses (Gmail, Yahoo, etc.) aren't accepted.");
  }

  // Pitch-page forms only ask for an email; LinkedIn stays required on the
  // main site form.
  if (!source) {
    if (!linkedinUrl) {
      errors.push("LinkedIn profile URL is required.");
    } else if (!LINKEDIN_RE.test(linkedinUrl)) {
      errors.push("Enter a valid LinkedIn profile URL.");
    }
  }

  const lead = errors.length === 0 ? { email, linkedinUrl, source } : undefined;
  return { lead, errors, isBot };
}
