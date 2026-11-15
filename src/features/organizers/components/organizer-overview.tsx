import Link from "next/link";
import { ArrowRight, BarChart3, CalendarPlus, ScanLine, Users } from "lucide-react";
import { SiteFooter } from "@/shared/components/homepage/site-footer";
import { SiteHeader } from "@/shared/components/homepage/site-header";
import styles from "./organizer-overview.module.css";

const tools = [
  {
    title: "Create an event",
    description: "Shape your event page with the details people need to say yes.",
    icon: CalendarPlus,
  },
  {
    title: "Manage your guests",
    description: "Keep guest lists, ticket types, and check-in details together.",
    icon: Users,
  },
  {
    title: "Run event day",
    description: "Give your team a clear view of arrivals and attendee updates.",
    icon: ScanLine,
  },
  {
    title: "Learn and improve",
    description: "Bring bookings, attendance, and performance into one overview.",
    icon: BarChart3,
  },
];

export function OrganizerOverview() {
  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.main}>
        <section className={styles.hero}>
          <span className={styles.eyebrow}>FOR THE PEOPLE WHO MAKE IT HAPPEN</span>
          <h1>Make the plan. Bring everyone together.</h1>
          <p>
            EventPass is being built to take the busywork out of bringing people
            together—from your first event page to the last guest checked in.
          </p>
          <Link className={styles.primaryLink} href="/events">
            Explore the event experience
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </section>

        <section aria-labelledby="tools-heading" className={styles.tools}>
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>ONE PLACE FOR THE WHOLE JOURNEY</span>
            <h2 id="tools-heading">Your event toolkit</h2>
          </div>
          <div className={styles.toolGrid}>
            {tools.map(({ title, description, icon: Icon }) => (
              <article className={styles.toolCard} key={title}>
                <span className={styles.toolIcon}>
                  <Icon aria-hidden="true" size={20} />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <p className={styles.previewNote}>
            Organizer accounts, ticket sales, and attendee management are planned
            feature areas; this portfolio preview does not accept events or
            payments yet.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
