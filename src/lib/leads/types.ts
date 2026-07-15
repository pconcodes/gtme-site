export interface Lead {
  name: string;
  email: string;
  company: string;
  message: string;
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
  };
}

export interface LeadError {
  ok: false;
  errors: string[];
}
