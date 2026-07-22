export type LeadSource = "socket" | "render" | "owner" | "bolt";

/** Display names for pitch-page sources, used in notification/auto-reply copy. */
export const LEAD_SOURCE_LABELS: Record<LeadSource, string> = {
  socket: "Socket",
  render: "Render",
  owner: "Owner.com",
  bolt: "Bolt.new",
};

export interface Lead {
  email: string;
  linkedinUrl: string;
  /** Which form captured the lead; set for pitch-page forms (e.g. /socket). */
  source?: LeadSource;
}

export interface Enrichment {
  emailDomain: string;
  /** False for free providers (gmail, outlook, …), true for company domains. */
  isWorkEmail: boolean;
  /** The likely company domain, or null for free-email submitters. */
  companyDomain: string | null;
}

export type IntegrationStatus = "sent" | "skipped" | "error";

export interface LeadResult {
  ok: true;
  enrichment: Enrichment;
  integrations: {
    hubspot: IntegrationStatus;
    slack: IntegrationStatus;
    email: IntegrationStatus;
    n8n: IntegrationStatus;
    autoreply: IntegrationStatus;
  };
}

export interface LeadError {
  ok: false;
  errors: string[];
}
