"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole } from "@/features/auth/lib/auth-session";
import { APP_ROLES } from "@/features/auth/lib/roles";
import { prisma } from "@/lib/prisma";

export async function updateUserRole(formData: FormData) {
  const operator = await requireRole("superadmin");
  const userId = String(formData.get("userId") ?? "");
  const role = String(formData.get("role") ?? "");

  if (!userId || !APP_ROLES.includes(role as (typeof APP_ROLES)[number])) {
    redirect("/superadmin?error=invalid");
  }

  if (userId === operator.id && role !== "superadmin") {
    redirect("/superadmin?error=self-role");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  revalidatePath("/superadmin");
  revalidatePath("/account");
  redirect("/superadmin?updated=1");
}
