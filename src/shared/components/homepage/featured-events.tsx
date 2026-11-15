import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import {
  events,
  formatEventDate,
  formatEventPrice,
} from "@/features/events/data/events";
import styles from "./homepage.module.css";

export function FeaturedEvents() {
  const featuredEvents = events.filter((event) => event.featured);

  return (
    <section aria-labelledby="events-heading" className={styles.eventsSection} id="events">
      <div className={styles.sectionHeading}>
        <div>
          <span className={styles.sectionEyebrow}>THE GOOD STUFF</span>
          <h2 id="events-heading">Plans worth making</h2>
          <p className={styles.sectionDescription}>
            A few very good reasons to get out of the group chat.
          </p>
        </div>
        <Link className={styles.subtleLink} href="/events">
          Browse all events
          <ArrowRight aria-hidden="true" size={16} />
        </Link>
      </div>

      <div className={styles.eventGrid}>
        {featuredEvents.map((event, index) => (
          <article className={styles.eventCard} key={event.title}>
            <Link
              aria-label={`View ${event.title}`}
              className={`${styles.eventImage} ${styles[index === 0 ? "eventImageOne" : index === 1 ? "eventImageTwo" : "eventImageThree"]}`}
              href={`/events/${event.slug}`}
              style={{ backgroundImage: `url("${event.image}")` }}
            >
              <span className={styles.eventTag}>{event.badge}</span>
              <span className={styles.eventCategory}>{event.category.toUpperCase()}</span>
            </Link>
            <div className={styles.eventDetails}>
              <span className={styles.eventDate}>{formatEventDate(event.startsAt)}</span>
              <h3>
                <Link href={`/events/${event.slug}`}>{event.title}</Link>
              </h3>
              <p className={styles.eventVenue}>{event.venue}</p>
              <div className={styles.eventMeta}>
                <span>
                  <MapPin aria-hidden="true" size={14} />
                  {event.neighborhood}
                </span>
                <span>
                  <strong>{formatEventPrice(event.price)}</strong>
                  {event.price ? " / person" : ""}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
