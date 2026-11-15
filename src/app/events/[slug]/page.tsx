import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, MapPin, Ticket } from "lucide-react";
import {
  events,
  formatEventDate,
  formatEventPrice,
  getEventBySlug,
} from "@/features/events/data/events";
import { SiteFooter } from "@/shared/components/homepage/site-footer";
import { SiteHeader } from "@/shared/components/homepage/site-header";
import { notFound } from "next/navigation";
import styles from "./event-detail.module.css";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return { title: "Event not found" };
  }

  return {
    title: event.title,
    description: event.description,
  };
}

export function generateStaticParams() {
  return events.map(({ slug }) => ({ slug }));
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.main}>
        <Link className={styles.backLink} href="/events">
          <ArrowLeft aria-hidden="true" size={16} />
          All events
        </Link>
        <div
          aria-label={event.title}
          className={styles.heroImage}
          role="img"
          style={{ backgroundImage: `url("${event.image}")` }}
        >
          <span className={styles.badge}>{event.badge}</span>
        </div>
        <div className={styles.content}>
          <article className={styles.details}>
            <span className={styles.category}>{event.category}</span>
            <h1>{event.title}</h1>
            <p className={styles.description}>{event.description}</p>
            <dl className={styles.facts}>
              <div>
                <dt>
                  <CalendarDays aria-hidden="true" size={17} />
                  When
                </dt>
                <dd>
                  {formatEventDate(event.startsAt)} · {event.startTime}
                </dd>
              </div>
              <div>
                <dt>
                  <MapPin aria-hidden="true" size={17} />
                  Where
                </dt>
                <dd>
                  {event.venue}, {event.neighborhood}, {event.city}
                </dd>
              </div>
              <div>
                <dt>
                  <Ticket aria-hidden="true" size={17} />
                  Hosted by
                </dt>
                <dd>{event.organizer}</dd>
              </div>
            </dl>
          </article>
          <aside aria-label="Ticket information" className={styles.ticketCard}>
            <span className={styles.ticketLabel}>TICKETS FROM</span>
            <p className={styles.price}>{formatEventPrice(event.price)}</p>
            <p className={styles.availability}>
              {event.remainingTickets} spots currently available
            </p>
            <button className={styles.checkoutButton} disabled type="button">
              Ticket checkout coming soon
            </button>
            <p className={styles.ticketNote}>
              This preview uses sample listings. Online booking is not enabled
              yet.
            </p>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
