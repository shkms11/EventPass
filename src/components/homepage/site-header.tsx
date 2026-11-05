import Link from "next/link";
import { ArrowUpRight, Ticket } from "lucide-react";
import styles from "./homepage.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link aria-label="EventPass home" className={styles.brand} href="/">
          <span className={styles.brandMark}>
            <Ticket aria-hidden="true" size={19} strokeWidth={2.4} />
          </span>
          <span>eventpass</span>
        </Link>

        <nav aria-label="Main navigation" className={styles.navigation}>
          <Link href="#events">Explore events</Link>
          <Link href="#categories">Categories</Link>
          <Link href="#host">For organizers</Link>
        </nav>

        <Link className={styles.headerCta} href="#host">
          Create an event
          <ArrowUpRight aria-hidden="true" size={16} />
        </Link>
      </div>
    </header>
  );
}
