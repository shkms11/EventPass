export const APP_ROLES = ["attendee", "organizer", "admin", "superadmin"] as const;

export type AppRole = (typeof APP_ROLES)[number];

export function canAccessRole(userRole: string, requiredRole: AppRole): boolean {
  return (
    userRole === requiredRole ||
    userRole === "superadmin" ||
    (userRole === "admin" && requiredRole !== "superadmin")
  );
}
