"use client";

import Link from "next/link";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { APP_ROLES } from "@/features/auth/lib/roles";
import { updateUserRole } from "../actions";
import styles from "./super-admin-dashboard.module.css";

interface SuperAdminDashboardProps {
  operatorName: string;
  operatorId: string;
  status?: string;
  error?: string;
  stats: {
    totalUsers: number;
    attendees: number;
    organizers: number;
    admins: number;
    superadmins: number;
  };
  users: {
    id: string;
    name: string;
    email: string;
    role: string;
    emailVerified: boolean;
    createdAt: string;
  }[];
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
  operatorId,
  stats,
  users,
  status,
  error,
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

        {status && (
          <p className={styles.success} role="status">
            {status}
          </p>
        )}
        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        <section aria-label="Account overview" className={styles.stats}>
          {statLabels.map(([key, label]) => (
            <article className={styles.stat} key={key}>
              <h2>{label}</h2>
              <p>{stats[key].toLocaleString()}</p>
            </article>
          ))}
        </section>

        <section aria-labelledby="accounts-title" className={styles.accounts}>
          <div className={styles.accountsHeader}>
            <div>
              <p className={styles.accountsEyebrow}>ACCOUNT MANAGEMENT</p>
              <h2 id="accounts-title">Platform users</h2>
            </div>
            <span>{users.length} accounts</span>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Verification</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <strong>{user.name}</strong>
                      <span>{user.email}</span>
                    </td>
                    <td>
                      <span className={user.emailVerified ? styles.verified : styles.unverified}>
                        {user.emailVerified ? "Verified" : "Not verified"}
                      </span>
                    </td>
                    <td>
                      <form action={updateUserRole} className={styles.roleForm}>
                        <input name="userId" type="hidden" value={user.id} />
                        <label>
                          <span className={styles.srOnly}>Role for {user.email}</span>
                          <select
                            defaultValue={user.role}
                            disabled={user.id === operatorId}
                            name="role"
                          >
                            {APP_ROLES.map((role) => (
                              <option key={role} value={role}>
                                {role}
                              </option>
                            ))}
                          </select>
                        </label>
                        <button disabled={user.id === operatorId} type="submit">
                          {user.id === operatorId ? "You" : "Update"}
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}