"use client";

import Link from "next/link";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import styles from "./super-admin-dashboard.module.css";

interface SuperAdminDashboardProps {
  operatorName: string;
  stats: {
    totalUsers: number;
    attendees: number;
    organizers: number;
    admins: number;
    superadmins: number;
  };
}

const statLabels = [
  ["totalUsers", "Total accounts"],
  ["attendees", "Attendees"],
  ["organizers", "Organizers"],
  ["admins", "Administrators"],
  ["superadmins", "Superadmins"],
] as const;

export function SuperAdminDashboard({
  operatorName,
  stats,
}: SuperAdminDashboardProps) {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link aria-label="EventPass home" className={styles.brand} href="/">
          eventpass <span>CONTROL</span>
        </Link>
        <nav aria-label="Superadmin navigation">
          <Link href="/events">View events</Link>
          <SignOutButton />
        </nav>
      </header>

      <section aria-labelledby="dashboard-title" className={styles.content}>
        <p className={styles.eyebrow}>PLATFORM ADMINISTRATION</p>
        <h1 id="dashboard-title">Good to see you, {operatorName}.</h1>
        <p className={styles.intro}>
          Your superadmin session is active. Account totals below are read
          directly from the platform database.
        </p>

        <section aria-label="Account overview" className={styles.stats}>
          {statLabels.map(([key, label]) => (
            <article className={styles.stat} key={key}>
              <h2>{label}</h2>
              <p>{stats[key].toLocaleString()}</p>
            </article>
          ))}
        </section>

        <aside className={styles.notice}>
          <h2>Access is protected</h2>
          <p>
            Superadmin access is assigned to verified accounts through a
            controlled server-side command. Event moderation and account
            management actions are not enabled in this preview.
          </p>
        </aside>
      </section>
    </main>
  );
}