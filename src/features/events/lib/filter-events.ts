import type { Event, EventCategory } from "../data/events";

export interface EventFilters {
  query?: string;
  category?: EventCategory | "All events";
}

export function filterEvents(events: Event[], filters: EventFilters): Event[] {
  const query = filters.query?.trim().toLocaleLowerCase();

  return events.filter((event) => {
    const matchesCategory =
      !filters.category ||
      filters.category === "All events" ||
      event.category === filters.category;
    const matchesQuery =
      !query ||
      [event.title, event.venue, event.neighborhood, event.city].some((value) =>
        value.toLocaleLowerCase().includes(query),
      );

    return matchesCategory && matchesQuery;
  });
}
