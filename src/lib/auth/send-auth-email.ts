import { after } from "next/server";

interface AuthEmail {
  to: string;
  subject: string;
  url: string;
  action: "reset" | "verify";
}

export function sendAuthEmail({ to, subject, url, action }: AuthEmail): void {
  if (process.env.NODE_ENV !== "production") {
    if (process.env.NODE_ENV === "development") {
      console.info(`[EventPass ${action} email] ${to}: ${url}`);
    }
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.AUTH_EMAIL_FROM;

  if (!apiKey || !from) {
    throw new Error(
      "RESEND_API_KEY and AUTH_EMAIL_FROM are required to send auth emails in production.",
    );
  }

  after(async () => {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text: `${subject}\n\n${url}\n\nIf you did not request this, you can ignore this email.`,
      }),
    });

    if (!response.ok) {
      throw new Error(`Auth email delivery failed with status ${response.status}.`);
    }
  });
}
