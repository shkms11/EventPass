import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import styles from "./homepage.module.css";

const benefits = ["Simple setup", "Your audience, your way", "Tickets that just work"];

export function OrganizerCta() {
  return (
    <section aria-labelledby="host-heading" className={styles.organizerSection} id="host">
      <div className={styles.organizerCopy}>
        <span className={styles.organizerEyebrow}>FOR THE PEOPLE WHO MAKE IT HAPPEN</span>
        <h2 id="host-heading">You bring the people together. We’ll handle the rest.</h2>
        <p>
          From your first RSVP to the final encore, make it easy for people to
          show up for what you create.
        </p>
        <Link className={styles.organizerButton} href="mailto:hello@eventpass.example">
          Start hosting
          <ArrowUpRight aria-hidden="true" size={17} />
        </Link>
      </div>
      <div aria-hidden="true" className={styles.organizerCard}>
        <div className={styles.organizerCardTop}>
          <span className={styles.organizerCardLogo}>eventpass</span>
          <span className={styles.organizerStatus}>LIVE EVENT</span>
        </div>
        <div className={styles.organizerCardArt}>
          <span>MAKE</span>
          <strong>IT<br />HAPPEN</strong>
          <span className={styles.organizerSpark}>✳</span>
        </div>
        <div className={styles.organizerCardBottom}>
          <strong>Your next great idea</strong>
          <span>Starts right here</span>
        </div>
        <ul className={styles.benefitList}>
          {benefits.map((benefit) => (
            <li key={benefit}>
              <Check aria-hidden="true" size={15} />
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
