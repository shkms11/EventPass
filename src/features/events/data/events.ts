export const EVENT_CATEGORIES = [
  "Live music",
  "Food & drink",
  "Arts & culture",
  "Outdoors",
  "Community",
] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number];

export interface Event {
  slug: string;
  title: string;
  category: EventCategory;
  startsAt: string;
  startTime: string;
  venue: string;
  neighborhood: string;
  city: string;
  price: number;
  remainingTickets: number;
  badge: string;
  image: string;
  description: string;
  organizer: string;
  featured: boolean;
}

export const events: Event[] = [
  {
    slug: "rooftop-sessions-golden-hour",
    title: "Rooftop Sessions: Golden Hour",
    category: "Live music",
    startsAt: "2026-11-20",
    startTime: "6:30 PM",
    venue: "The Skylark Rooftop",
    neighborhood: "Chelsea",
    city: "New York",
    price: 24,
    remainingTickets: 18,
    badge: "Selling fast",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=85",
    description:
      "Catch the last light over the city with a live set from local favorites, an open-air rooftop, and a view worth arriving early for.",
    organizer: "Good Company Presents",
    featured: true,
  },
  {
    slug: "long-table-supper-club",
    title: "The Long Table Supper Club",
    category: "Food & drink",
    startsAt: "2026-11-21",
    startTime: "7:00 PM",
    venue: "Juniper & Rye",
    neighborhood: "East Market",
    city: "New York",
    price: 48,
    remainingTickets: 9,
    badge: "A few spots left",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85",
    description:
      "Pull up a chair for a seasonal, family-style dinner where the menu is local, the table is shared, and conversation is part of the evening.",
    organizer: "Juniper & Rye",
    featured: true,
  },
  {
    slug: "color-outside-the-lines",
    title: "Color Outside the Lines",
    category: "Arts & culture",
    startsAt: "2026-11-22",
    startTime: "1:00 PM",
    venue: "The Modern House",
    neighborhood: "Arts District",
    city: "New York",
    price: 18,
    remainingTickets: 42,
    badge: "Just added",
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1000&q=85",
    description:
      "Spend an afternoon exploring a hands-on exhibition of bold new work from independent artists, with time to meet the makers.",
    organizer: "Modern House Arts",
    featured: true,
  },
  {
    slug: "sunset-yoga-in-the-park",
    title: "Sunset Yoga in the Park",
    category: "Outdoors",
    startsAt: "2026-11-25",
    startTime: "5:15 PM",
    venue: "Pier 6 Lawn",
    neighborhood: "Brooklyn Bridge Park",
    city: "New York",
    price: 12,
    remainingTickets: 26,
    badge: "All levels",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=85",
    description:
      "Unroll your mat for a welcoming, all-levels flow timed to the sunset. Bring a friend, a water bottle, and a little room to breathe.",
    organizer: "Open Air Wellness",
    featured: false,
  },
  {
    slug: "makers-market-after-hours",
    title: "Makers Market After Hours",
    category: "Community",
    startsAt: "2026-11-27",
    startTime: "5:00 PM",
    venue: "The Foundry",
    neighborhood: "Long Island City",
    city: "New York",
    price: 0,
    remainingTickets: 120,
    badge: "Free entry",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1000&q=85",
    description:
      "Meet the neighborhood makers, browse small-batch goods, and stay for a rotating lineup of food stalls and local DJs.",
    organizer: "Queens Creative Collective",
    featured: false,
  },
  {
    slug: "indie-film-and-a-conversation",
    title: "Indie Film & a Conversation",
    category: "Arts & culture",
    startsAt: "2026-11-29",
    startTime: "7:30 PM",
    venue: "Metrograph",
    neighborhood: "Lower East Side",
    city: "New York",
    price: 16,
    remainingTickets: 34,
    badge: "New this week",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=85",
    description:
      "See an independent feature on the big screen, then stick around for a relaxed audience Q&A with the filmmakers.",
    organizer: "Side Street Cinema",
    featured: false,
  },
];

export function getEventBySlug(slug: string): Event | undefined {
  return events.find((event) => event.slug === slug);
}

export function formatEventDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })
    .format(new Date(`${date}T12:00:00Z`))
    .toUpperCase();
}

export function formatEventPrice(price: number): string {
  return price === 0 ? "Free" : `$${price}`;
}
