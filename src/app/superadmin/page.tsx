import { requireRole } from "@/features/auth/lib/auth-session";
import { prisma } from "@/lib/prisma";
import { SuperAdminDashboard } from "@/features/superAdmin/components/SuperAdminDashboard";

export default async function SuperAdminPage() {
  const operator = await requireRole("superadmin");
  const [totalUsers, attendees, organizers, admins, superadmins] =
    await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: "attendee" } }),
      prisma.user.count({ where: { role: "organizer" } }),
      prisma.user.count({ where: { role: "admin" } }),
      prisma.user.count({ where: { role: "superadmin" } }),
    ]);

  return (
    <SuperAdminDashboard
      operatorName={operator.name}
      stats={{ totalUsers, attendees, organizers, admins, superadmins }}
    />
  );
}
