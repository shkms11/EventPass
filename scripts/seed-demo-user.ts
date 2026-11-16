import { randomBytes } from "node:crypto";
import { config } from "dotenv";

config({ path: [".env.local", ".env"] });

async function seedDemoUser(
  auth: typeof import("@/lib/auth").auth,
  prisma: typeof import("@/lib/prisma").prisma,
) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("The demo user seed is disabled in production.");
  }

  const email = (
    process.env.DEMO_USER_EMAIL ?? "demo@eventpass.local"
  ).trim().toLowerCase();
  const password =
    process.env.DEMO_USER_PASSWORD || randomBytes(24).toString("base64url");

  if (password.length < 12 || password.length > 128) {
    throw new Error("DEMO_USER_PASSWORD must be between 12 and 128 characters.");
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new Error(
      `${email} already exists. Use that account or choose a different DEMO_USER_EMAIL.`,
    );
  }

  const { user } = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name: "EventPass Demo Organizer",
    },
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { emailVerified: true, role: "organizer" },
  });
  await prisma.verification.deleteMany({ where: { identifier: email } });

  console.info(`Demo username: ${email}`);
  console.info(`Demo password (shown once): ${password}`);
  console.info("This local account has the organizer role.");
}

async function main() {
  const { prisma } = await import("@/lib/prisma");

  try {
    const { auth } = await import("@/lib/auth");
    await seedDemoUser(auth, prisma);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
