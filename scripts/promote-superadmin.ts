import { config } from "dotenv";

config({ path: [".env.local", ".env"] });

async function promoteSuperadmin(
  prisma: typeof import("@/lib/prisma").prisma,
) {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.SUPERADMIN_BOOTSTRAP_CONFIRM !== "true"
  ) {
    throw new Error(
      "Set SUPERADMIN_BOOTSTRAP_CONFIRM=true to grant production superadmin access.",
    );
  }

  const email = process.env.SUPERADMIN_EMAIL?.trim().toLowerCase();
  if (!email) {
    throw new Error("Set SUPERADMIN_EMAIL to an existing verified account.");
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error(
      `${email} was not found. Create and verify the account before promoting it.`,
    );
  }
  if (!user.emailVerified) {
    throw new Error(
      `${email} is not verified. Verify the account before promoting it.`,
    );
  }

  if (user.role !== "superadmin") {
    await prisma.user.update({
      where: { id: user.id },
      data: { role: "superadmin" },
    });
  }

  console.info(`Superadmin access is enabled for ${email}.`);
}

async function main() {
  const { prisma } = await import("@/lib/prisma");

  try {
    await promoteSuperadmin(prisma);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
