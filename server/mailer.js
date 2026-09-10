import { loadServerEnv } from "./env.js";

function brandFrom(from, fallback) {
  const s = String(from || "").trim() || fallback;
  return s.replace(/AYURMARG/gi, "AYURDISHA");
}

/**
 * Email delivery for registration OTPs.
 * Priority: Resend API key > SMTP (nodemailer) > dev console fallback.
 * The OTP is NEVER returned to the client in any mode.
 */
export function mailConfig() {
  const env = loadServerEnv();
  const from = String(env.MAIL_FROM || "").trim();
  if (String(env.RESEND_API_KEY || "").trim()) {
    return { kind: "resend", apiKey: env.RESEND_API_KEY.trim(), from: brandFrom(from, "AYURDISHA <onboarding@resend.dev>") };
  }
  if (env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS) {
    return {
      kind: "smtp",
      host: String(env.SMTP_HOST).trim(),
      port: Number(env.SMTP_PORT || 587),
      user: String(env.SMTP_USER).trim(),
      pass: String(env.SMTP_PASS),
      from: brandFrom(from, String(env.SMTP_USER).trim()),
    };
  }
  return { kind: "console" };
}

function otpHtml(name, otp) {
  const esc = s => String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return `<div style="font-family:Georgia,serif;background:#F5EBE0;padding:32px 16px">
  <div style="max-width:480px;margin:0 auto;background:#FFFEFB;border:1px solid #D9CBB8;border-radius:18px;overflow:hidden">
    <div style="background:#1B4332;color:#F5EBE0;padding:22px 26px">
      <div style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#C4A484">AYURDISHA · Meet the Mentors</div>
      <div style="font-size:24px;font-weight:700;margin-top:4px">Email verification</div>
    </div>
    <div style="padding:26px">
      <p style="margin:0 0 14px;color:#1A2E24;font-size:15px">Namaste${name ? " " + esc(name) : ""},</p>
      <p style="margin:0 0 18px;color:#5C6B62;font-size:14px;line-height:1.6">
        Use this one-time code to verify your email and complete your registration for the Meet the Mentors hall.
      </p>
      <div style="font-family:monospace;font-size:32px;letter-spacing:.35em;font-weight:700;color:#1B4332;background:#EDE4D4;border-radius:12px;padding:14px 18px;text-align:center">${esc(otp)}</div>
      <p style="margin:18px 0 0;color:#5C6B62;font-size:12.5px;line-height:1.6">
        The code expires in 10 minutes. If you did not request this, you can ignore this email.
      </p>
    </div>
  </div>
</div>`;
}

async function sendMail({ to, subject, text, html, logLabel }) {
  const cfg = mailConfig();

  if (cfg.kind === "resend") {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${cfg.apiKey}` },
      body: JSON.stringify({ from: cfg.from, to: [to], subject, text, html }),
    });
    if (!r.ok) {
      const detail = await r.text().catch(() => "");
      throw new Error(`Resend rejected the email (${r.status}): ${detail.slice(0, 200)}`);
    }
    return { delivery: "email" };
  }

  if (cfg.kind === "smtp") {
    const { default: nodemailer } = await import("nodemailer");
    const transport = nodemailer.createTransport({
      host: cfg.host,
      port: cfg.port,
      secure: cfg.port === 465,
      auth: { user: cfg.user, pass: cfg.pass },
    });
    await transport.sendMail({ from: cfg.from, to, subject, text, html });
    return { delivery: "email" };
  }

  console.log(`[aym-mail] DEV FALLBACK — no SMTP/RESEND creds configured. ${logLabel || subject} → ${to}`);
  return { delivery: "console" };
}

/**
 * Sends the OTP. Returns { delivery: "email" | "console" }.
 * Throws only for hard transport errors when a real transport is configured.
 */
export async function sendOtpEmail(email, otp, name) {
  const subject = "Your AYURDISHA verification code";
  const text = `Namaste${name ? " " + name : ""},\n\nYour AYURDISHA verification code is: ${otp}\n\nIt expires in 10 minutes. If you did not request this, ignore this email.`;
  return sendMail({
    to: email, subject, text, html: otpHtml(name, otp),
    logLabel: `OTP for ${email}: ${otp}`,
  });
}

function selectionHtml(row) {
  const esc = s => String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return `<div style="font-family:Georgia,serif;background:#F5EBE0;padding:32px 16px">
  <div style="max-width:480px;margin:0 auto;background:#FFFEFB;border:1px solid #D9CBB8;border-radius:18px;overflow:hidden">
    <div style="background:#1B4332;color:#F5EBE0;padding:22px 26px">
      <div style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#C4A484">AYURDISHA · Meet the Mentors</div>
      <div style="font-size:24px;font-weight:700;margin-top:4px">Bhubaneswar selection</div>
    </div>
    <div style="padding:26px">
      <p style="margin:0 0 14px;color:#1A2E24;font-size:15px">Namaste${row.name ? " " + esc(row.name) : ""},</p>
      <p style="margin:0 0 18px;color:#5C6B62;font-size:14px;line-height:1.6">
        You have been selected for the AYURDISHA Meet the Mentors in-person programme at the
        11th World Ayurveda Congress, Bhubaneswar 2026.
      </p>
      ${row.regNo ? `<div style="font-family:monospace;font-size:28px;letter-spacing:.12em;font-weight:700;color:#1B4332;background:#EDE4D4;border-radius:12px;padding:14px 18px;text-align:center">${esc(row.regNo)}</div>
      <p style="margin:8px 0 18px;color:#5C6B62;font-size:12px;letter-spacing:.12em;text-transform:uppercase;text-align:center">Your WAC registration number</p>` : ""}
      <p style="margin:0;color:#5C6B62;font-size:13.5px;line-height:1.6">
        Keep this email. Visit-date instructions will follow. This is a selection notice for the
        AYURDISHA hall — not a job offer, a Congress pass by itself, or medical advice.
      </p>
    </div>
  </div>
</div>`;
}

/** Staff-only: notify one selected student. Same transport as OTP. */
export async function sendSelectionEmail(row) {
  const name = String(row.name || "").trim();
  const email = String(row.email || "").trim();
  const regNo = String(row.regNo || "").trim();
  const subject = "AYURDISHA · Selected for Bhubaneswar WAC Meet the Mentors";
  const text = `Namaste${name ? " " + name : ""},\n\nYou have been selected for the AYURDISHA Meet the Mentors in-person programme at the 11th World Ayurveda Congress, Bhubaneswar 2026.${regNo ? `\n\nYour WAC registration number: ${regNo}` : ""}\n\nKeep this email. Visit-date instructions will follow.\n\nWorld Ayurveda Foundation · AYURDISHA\nThis is a selection notice — not a job offer or medical advice.`;
  return sendMail({
    to: email, subject, text, html: selectionHtml({ name, email, regNo }),
    logLabel: `WAC selection notice for ${email}`,
  });
}
