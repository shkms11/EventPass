import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import styles from "./homepage.module.css";

const events = [
  {
    title: "Rooftop Sessions: Golden Hour",
    category: "LIVE MUSIC",
    date: "FRI, JUN 14",
    venue: "The Skylark Rooftop",
    location: "Downtown",
    price: "$24",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=85",
    imageClass: styles.eventImageOne,
    tag: "SELLING FAST",
  },
  {
    title: "The Long Table Supper Club",
    category: "FOOD & DRINK",
    date: "SAT, JUN 15",
    venue: "Juniper & Rye",
    location: "East Market",
    price: "$48",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85",
    imageClass: styles.eventImageTwo,
    tag: "A FEW SPOTS LEFT",
  },
  {
    title: "Color Outside the Lines",
    category: "ARTS & CULTURE",
    date: "SUN, JUN 16",
    venue: "The Modern House",
    location: "Arts District",
    price: "$18",
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1000&q=85",
    imageClass: styles.eventImageThree,
    tag: "JUST ADDED",
  },
];

export function FeaturedEvents() {
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
        <Link className={styles.subtleLink} href="#categories">
          Find your kind of thing
          <ArrowRight aria-hidden="true" size={16} />
        </Link>
      </div>

      <div className={styles.eventGrid}>
        {events.map((event) => (
          <article className={styles.eventCard} key={event.title}>
            <div
              aria-label={event.title}
              className={`${styles.eventImage} ${event.imageClass}`}
              role="img"
              style={{ backgroundImage: `url("${event.image}")` }}
            >
              <span className={styles.eventTag}>{event.tag}</span>
              <span className={styles.eventCategory}>{event.category}</span>
            </div>
            <div className={styles.eventDetails}>
              <span className={styles.eventDate}>{event.date}</span>
              <h3>{event.title}</h3>
              <p className={styles.eventVenue}>{event.venue}</p>
              <div className={styles.eventMeta}>
                <span>
                  <MapPin aria-hidden="true" size={14} />
                  {event.location}
                </span>
                <span>
                  <strong>{event.price}</strong> / person
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
