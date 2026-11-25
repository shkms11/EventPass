import { requireRole } from "@/features/auth/lib/auth-session";
import { prisma } from "@/lib/prisma";
import { SuperAdminDashboard } from "@/features/superAdmin/components/SuperAdminDashboard";

interface SuperAdminPageProps {
  searchParams: Promise<{ updated?: string; error?: string }>;
}

export default async function SuperAdminPage({
  searchParams,
}: SuperAdminPageProps) {
  const operator = await requireRole("superadmin");
  const { updated, error } = await searchParams;
  const [totalUsers, attendees, organizers, admins, superadmins, users] =
    await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: "attendee" } }),
      prisma.user.count({ where: { role: "organizer" } }),
      prisma.user.count({ where: { role: "admin" } }),
      prisma.user.count({ where: { role: "superadmin" } }),
      prisma.user.findMany({
        orderBy: [{ createdAt: "desc" }],
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          emailVerified: true,
          createdAt: true,
        },
      }),
    ]);

  return (
    <SuperAdminDashboard
      operatorName={operator.name}
      operatorId={operator.id}
      stats={{ totalUsers, attendees, organizers, admins, superadmins }}
      status={updated === "1" ? "Account role updated." : undefined}
      error={
        error === "self-role"
          ? "You cannot remove your own superadmin role."
          : error === "invalid"
            ? "The selected role is invalid."
            : undefined
      }
      users={users.map((user) => ({
        ...user,
        createdAt: user.createdAt.toISOString(),
      }))}
    />
  );
}
