import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { APP_ROLES } from "@/features/auth/lib/roles";
import { prisma } from "@/lib/prisma";
import { sendAuthEmail } from "@/lib/auth/send-auth-email";

const secret = process.env.BETTER_AUTH_SECRET;

if (!secret || Buffer.byteLength(secret) < 32) {
  throw new Error("BETTER_AUTH_SECRET must contain at least 32 bytes.");
}

const baseURL =
  process.env.BETTER_AUTH_URL ??
  (process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000");

if (!baseURL) {
  throw new Error("BETTER_AUTH_URL is required in production.");
}

const trustedOrigin = new URL(baseURL).origin;

export const auth = betterAuth({
  appName: "EventPass",
  baseURL,
  secret,
  trustedOrigins: [trustedOrigin],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
    transaction: true,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    minPasswordLength: 12,
    maxPasswordLength: 128,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => {
      sendAuthEmail({
        to: user.email,
        subject: "Reset your EventPass password",
        url,
        action: "reset",
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
    expiresIn: 60 * 60,
    sendVerificationEmail: async ({ user, url }) => {
      sendAuthEmail({
        to: user.email,
        subject: "Verify your EventPass email",
        url,
        action: "verify",
      });
    },
  },
  user: {
    additionalFields: {
      role: {
        type: [...APP_ROLES],
        required: false,
        defaultValue: "attendee",
        input: false,
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  rateLimit: {
    enabled: true,
    storage: "database",
    window: 10,
    max: 100,
    customRules: {
      "/sign-in/email": { window: 60, max: 5 },
      "/sign-up/email": { window: 60, max: 5 },
      "/request-password-reset": { window: 60, max: 3 },
      "/send-verification-email": { window: 60, max: 3 },
    },
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
  },
});
