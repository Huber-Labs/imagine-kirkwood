type SubmissionEmailInput = {
  title: string;
  description: string;
  submitterName: string | null;
  submitterEmail: string | null;
  hasPhoto: boolean;
};

function trimEnv(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function resolveAdminUrl(): string {
  const base =
    trimEnv(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://imaginekirkwood.com";
  return `${base.replace(/\/$/, "")}/admin`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Best-effort email notification to the admin when a new idea is submitted.
 *
 * This is intentionally optional: if RESEND_API_KEY and ADMIN_NOTIFICATION_EMAIL
 * are not set, it silently no-ops and the submission is still saved for review
 * in the /admin dashboard. Uses Resend's REST API directly (no extra dependency).
 */
export async function notifyAdminOfSubmission(
  input: SubmissionEmailInput,
): Promise<void> {
  const apiKey = trimEnv(process.env.RESEND_API_KEY);
  const to = trimEnv(process.env.ADMIN_NOTIFICATION_EMAIL);
  if (!apiKey || !to) {
    return;
  }

  const from =
    trimEnv(process.env.RESEND_FROM_EMAIL) ??
    "Imagine Kirkwood <onboarding@resend.dev>";

  const submitter =
    [input.submitterName, input.submitterEmail].filter(Boolean).join(" · ") ||
    "Anonymous";

  const adminUrl = resolveAdminUrl();

  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#1a1a1a">
      <p style="font-size:13px;letter-spacing:0.06em;text-transform:uppercase;color:#888;margin:0 0 4px">
        New idea submission
      </p>
      <h2 style="margin:0 0 12px;font-size:20px">${escapeHtml(input.title)}</h2>
      <p style="white-space:pre-wrap;margin:0 0 16px">${escapeHtml(
        input.description,
      )}</p>
      <p style="margin:0 0 4px"><strong>From:</strong> ${escapeHtml(submitter)}</p>
      <p style="margin:0 0 16px"><strong>Photo attached:</strong> ${
        input.hasPhoto ? "Yes" : "No"
      }</p>
      <p style="margin:0">
        <a href="${adminUrl}" style="color:#0a58ca">Review in the admin dashboard →</a>
      </p>
    </div>
  `;

  const text = [
    "New idea submission",
    "",
    `Title: ${input.title}`,
    "",
    input.description,
    "",
    `From: ${submitter}`,
    `Photo attached: ${input.hasPhoto ? "Yes" : "No"}`,
    "",
    `Review: ${adminUrl}`,
  ].join("\n");

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `New idea: ${input.title}`,
        html,
        text,
        ...(input.submitterEmail
          ? { reply_to: input.submitterEmail }
          : {}),
      }),
    });
  } catch {
    // Never let a notification failure break the submission flow.
  }
}
