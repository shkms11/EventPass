import Link from "next/link";
import { ArrowDown, ArrowRight, CalendarDays, MapPin, Sparkles } from "lucide-react";
import styles from "./homepage.module.css";

export function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className={styles.hero}>
      <div className={styles.heroCopy}>
        <span className={styles.eyebrow}>
          <Sparkles aria-hidden="true" size={15} />
          GOOD THINGS HAPPEN IRL
        </span>
        <h1 id="hero-heading">
          Find your
          <br />
          people. <span>Find your</span>
          <br />
          next thing.
        </h1>
        <p className={styles.heroDescription}>
          Big nights, little plans, and the stories you’ll tell later. Discover
          events that bring your city to life.
        </p>
        <div className={styles.heroActions}>
          <Link className={styles.primaryButton} href="#events">
            Explore events
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
          <Link className={styles.textButton} href="#categories">
            See what’s happening
            <ArrowDown aria-hidden="true" size={15} />
          </Link>
        </div>
        <div className={styles.socialProof}>
          <div aria-hidden="true" className={styles.avatarStack}>
            <span>J</span>
            <span>M</span>
            <span>A</span>
            <span>+</span>
          </div>
          <p>
            <strong>Good company</strong>
            <span>starts with a good plan</span>
          </p>
        </div>
      </div>

      <div aria-label="A crowd enjoying a live music event" className={styles.heroVisual} role="img">
        <div className={styles.heroVisualOverlay} />
        <div className={styles.heroNote}>
          <span className={styles.liveDot} />
          <span>MAKE TONIGHT A STORY</span>
        </div>
        <div className={styles.heroEventCard}>
          <div className={styles.heroEventIcon}>
            <CalendarDays aria-hidden="true" size={19} />
          </div>
          <div>
            <span className={styles.heroEventLabel}>YOUR CITY IS ALIVE</span>
            <p>Something good is on</p>
          </div>
          <MapPin aria-hidden="true" className={styles.heroEventPin} size={17} />
        </div>
        <span aria-hidden="true" className={styles.heroStamp}>
          GOOD
          <br />
          TIMES
          <br />
          AHEAD
        </span>
      </div>
    </section>
  );
}
