"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, Search } from "lucide-react";
import {
  EVENT_CATEGORIES,
  events as eventsForDiscovery,
  formatEventDate,
  formatEventPrice,
  type EventCategory,
} from "@/features/events/data/events";
import { filterEvents } from "@/features/events/lib/filter-events";
import styles from "./event-discovery.module.css";

interface EventDiscoveryProps {
  initialCategory?: EventCategory;
}

export function EventDiscovery({ initialCategory }: EventDiscoveryProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<EventCategory | "All events">(
    initialCategory ?? "All events",
  );
  const visibleEvents = useMemo(
    () => filterEvents(eventsForDiscovery, { query, category }),
    [category, query],
  );

  return (
    <section aria-label="Find an event" className={styles.discovery}>
      <label className={styles.searchBox}>
        <Search aria-hidden="true" size={19} />
        <span className={styles.visuallyHidden}>Search events, venues, or neighborhoods</span>
        <input
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search events, venues, neighborhoods..."
          type="search"
          value={query}
        />
      </label>

      <div aria-label="Filter by category" className={styles.filters} role="group">
        {(["All events", ...EVENT_CATEGORIES] as const).map((item) => (
          <button
            aria-pressed={category === item}
            className={category === item ? styles.activeFilter : styles.filter}
            key={item}
            onClick={() => setCategory(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>

      <p aria-live="polite" className={styles.resultCount}>
        {visibleEvents.length} {visibleEvents.length === 1 ? "event" : "events"} to explore
      </p>

      {visibleEvents.length > 0 ? (
        <div className={styles.eventGrid}>
          {visibleEvents.map((event) => (
            <article className={styles.eventCard} key={event.slug}>
              <Link
                aria-label={`View ${event.title}`}
                className={styles.eventImage}
                href={`/events/${event.slug}`}
                style={{ backgroundImage: `url("${event.image}")` }}
              >
                <span className={styles.eventBadge}>{event.badge}</span>
              </Link>
              <div className={styles.eventContent}>
                <div className={styles.eventTopline}>
                  <span>{formatEventDate(event.startsAt)}</span>
                  <span>{event.category}</span>
                </div>
                <h2>
                  <Link href={`/events/${event.slug}`}>{event.title}</Link>
                </h2>
                <p className={styles.venue}>
                  <MapPin aria-hidden="true" size={15} />
                  {event.venue} · {event.neighborhood}
                </p>
                <div className={styles.eventBottom}>
                  <span>
                    <strong>{formatEventPrice(event.price)}</strong>
                    {event.price ? " / person" : " entry"}
                  </span>
                  <Link
                    aria-label={`View details for ${event.title}`}
                    className={styles.detailsLink}
                    href={`/events/${event.slug}`}
                  >
                    Details
                    <ArrowUpRight aria-hidden="true" size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h2>No events match those filters yet.</h2>
          <p>Try a different search or browse every event.</p>
          <button
            className={styles.resetButton}
            onClick={() => {
              setCategory("All events");
              setQuery("");
            }}
            type="button"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
