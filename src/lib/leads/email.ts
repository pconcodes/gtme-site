import nodemailer from "nodemailer";
import type { Enrichment, IntegrationStatus, Lead } from "./types";

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (transporter) return transporter;
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
  return transporter;
}

/**
 * Email a lead notification via Gmail SMTP (App Password auth). No-ops
 * (returns "skipped") without GMAIL_USER / GMAIL_APP_PASSWORD.
 */
export async function emailLead(
  lead: Lead,
  enrichment: Enrichment,
): Promise<IntegrationStatus> {
  const user = process.env.GMAIL_USER;
  const to = process.env.LEAD_NOTIFY_EMAIL ?? user;
  const client = getTransporter();

  if (!client || !to) {
    console.warn(
      "[email] skipped — GMAIL_USER / GMAIL_APP_PASSWORD / LEAD_NOTIFY_EMAIL " +
        "not fully set in this process. Did you restart `npm run dev` after " +
        "editing .env.local?",
    );
    return "skipped";
  }

  try {
    await client.sendMail({
      from: `"GTME portfolio" <${user}>`,
      to,
      replyTo: lead.email,
      subject:
        lead.source === "socket"
          ? `New Socket lead: ${lead.email}`
          : `New lead: ${lead.email}`,
      text: [
        `Work email: ${lead.email}`,
        `LinkedIn: ${lead.linkedinUrl}`,
        `Company domain: ${enrichment.companyDomain ?? "—"}`,
        ...(lead.source === "socket" ? ["Source: Socket pitch page contact form"] : []),
      ].join("\n"),
    });
    return "sent";
  } catch (err) {
    console.error("[email] send threw:", err);
    return "error";
  }
}
