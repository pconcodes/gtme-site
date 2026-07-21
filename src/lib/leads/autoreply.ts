import nodemailer from "nodemailer";
import type { IntegrationStatus, Lead } from "./types";

const RESUME_URL = "https://gtm-engineer.dev/resume.pdf";
const CALENDLY_URL = "https://calendly.com/peter-david-conley/lets-talk";

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
 * Auto-reply to the lead themselves (not Peter) via Gmail SMTP. No-ops
 * (returns "skipped") without GMAIL_USER / GMAIL_APP_PASSWORD.
 */
export async function sendAutoReply(lead: Lead): Promise<IntegrationStatus> {
  const user = process.env.GMAIL_USER;
  const client = getTransporter();

  if (!client || !user) {
    console.warn(
      "[autoreply] skipped — GMAIL_USER / GMAIL_APP_PASSWORD not fully set " +
        "in this process. Did you restart `npm run dev` after editing .env.local?",
    );
    return "skipped";
  }

  try {
    await client.sendMail({
      from: `"Peter Conley" <${user}>`,
      to: lead.email,
      replyTo: user,
      subject: "Thanks for triggering the pipeline",
      text: [
        "Thanks for reaching out through the live pipeline — you just watched",
        "the exact system I'd build for your team.",
        "",
        `Resume: ${RESUME_URL}`,
        "",
        `If you want to talk, grab time here: ${CALENDLY_URL}`,
        "",
        "Two quick questions so I can be useful on the call:",
        "1. Do you already have a GTM Engineer or GTME team in place?",
        "2. What sparked your interest in reaching out?",
        "",
        "— Peter",
      ].join("\n"),
    });
    return "sent";
  } catch (err) {
    console.error("[autoreply] send threw:", err);
    return "error";
  }
}
