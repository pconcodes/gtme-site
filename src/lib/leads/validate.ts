import type { Lead } from "./types";

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

  const name = str(data.name);
  const email = str(data.email).toLowerCase();
  const company = str(data.company);
  const message = str(data.message);

  const errors: string[] = [];
  if (!name) errors.push("Name is required.");
  if (!email) errors.push("Email is required.");
  else if (!EMAIL_RE.test(email)) errors.push("Enter a valid email address.");
  if (!company) errors.push("Company is required.");
  if (!message) errors.push("Message is required.");
  if (message.length > 4000) errors.push("Message is too long.");

  const lead =
    errors.length === 0 ? { name, email, company, message } : undefined;
  return { lead, errors, isBot };
}
