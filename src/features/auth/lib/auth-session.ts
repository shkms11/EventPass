import "server-only";

import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { canAccessRole, type AppRole } from "./roles";

export const getCurrentSession = cache(async () =>
  auth.api.getSession({ headers: await headers() }),
);

export async function requireUser() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/sign-in");
  }

  return session.user;
}

export async function requireRole(role: AppRole) {
  const user = await requireUser();

  if (!canAccessRole(user.role ?? "attendee", role)) {
    redirect("/account?notice=access-denied");
  }

  return user;
}
