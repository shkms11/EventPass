import Link from "next/link";
import { requireRole } from "@/features/auth/lib/auth-session";

export default async function OrganizerDashboardPage() {
  const organizer = await requireRole("organizer");

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-orange-700">
        Organizer workspace
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        Welcome, {organizer.name}.
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-7 text-stone-600">
        Organizer access is checked against the server-side session and
        server-owned account role. Event publishing and ticket operations are
        not enabled in this preview.
      </p>
      <Link className="mt-8 inline-flex font-semibold underline" href="/organize">
        Organizer overview
      </Link>
    </main>
  );
}
