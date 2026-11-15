import { EventDiscovery } from "@/features/events/components/event-discovery";
import {
  EVENT_CATEGORIES,
  type EventCategory,
} from "@/features/events/data/events";
import { SiteFooter } from "@/shared/components/homepage/site-footer";
import { SiteHeader } from "@/shared/components/homepage/site-header";
import styles from "./events.module.css";

interface EventsPageProps {
  searchParams: Promise<{ category?: string | string[] }>;
}

function isEventCategory(value: string | undefined): value is EventCategory {
  return EVENT_CATEGORIES.some((category) => category === value);
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const { category: categoryParam } = await searchParams;
  const category = Array.isArray(categoryParam) ? categoryParam[0] : categoryParam;
  const initialCategory = isEventCategory(category) ? category : undefined;

  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.main}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>MAKE A PLAN</span>
          <h1>Find something good.</h1>
          <p>
            Search local events, compare the details, and find a reason to get
            together.
          </p>
        </div>
        <EventDiscovery initialCategory={initialCategory} />
        <p className={styles.demoNote}>
          EventPass preview · Listings are sample events while the organizer and
          booking features are being built.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
