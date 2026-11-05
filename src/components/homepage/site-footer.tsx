import Link from "next/link";
import { Ticket } from "lucide-react";
import styles from "./homepage.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerMain}>
        <div className={styles.footerBrandBlock}>
          <Link aria-label="EventPass home" className={styles.brand} href="/">
            <span className={styles.brandMark}>
              <Ticket aria-hidden="true" size={19} strokeWidth={2.4} />
            </span>
            <span>eventpass</span>
          </Link>
          <p>Less scrolling. More living.</p>
        </div>
        <nav aria-label="Footer navigation" className={styles.footerLinks}>
          <Link href="#events">Find an event</Link>
          <Link href="#categories">Explore categories</Link>
          <Link href="#host">Host an event</Link>
        </nav>
        <span className={styles.footerNote}>MADE FOR GETTING OUT THERE</span>
      </div>
      <div className={styles.footerBottom}>
        <span>© {new Date().getFullYear()} EventPass</span>
        <span>Make a little room for the unexpected.</span>
      </div>
    </footer>
  );
}
