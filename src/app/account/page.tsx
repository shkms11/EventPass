import Link from "next/link";
import { SiteFooter } from "@/shared/components/homepage/site-footer";
import { SiteHeader } from "@/shared/components/homepage/site-header";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { requireUser } from "@/features/auth/lib/auth-session";
import styles from "./page.module.css";

interface AccountPageProps {
  searchParams: Promise<{ notice?: string }>;
}

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const [user, { notice }] = await Promise.all([requireUser(), searchParams]);

  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.main}>
        <section className={styles.card}>
          <span className={styles.eyebrow}>YOUR EVENTPASS ACCOUNT</span>
          <h1>Good to see you, {user.name}.</h1>
          <p className={styles.intro}>
            Your account is ready. This is the secure starting point for your
            bookings and event plans.
          </p>
          {notice === "access-denied" && (
            <p className={styles.notice} role="status">
              This area is only available to approved organizers.
            </p>
          )}
          <dl className={styles.profile}>
            <div>
              <dt>Email</dt>
              <dd>{user.email}</dd>
            </div>
            <div>
              <dt>Account type</dt>
              <dd>{user.role}</dd>
            </div>
          </dl>
          <div className={styles.actions}>
            <Link href="/events">Explore events</Link>
            {user.role === "organizer" || user.role === "admin" ? (
              <Link href="/organize/dashboard">Organizer dashboard</Link>
            ) : (
              <Link href="/organize">For organizers</Link>
            )}
          </div>
          <SignOutButton />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
