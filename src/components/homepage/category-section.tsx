import Link from "next/link";
import {
  ArrowUpRight,
  Compass,
  Martini,
  Music2,
  Palette,
  TentTree,
} from "lucide-react";
import styles from "./homepage.module.css";

const categories = [
  { label: "Live music", detail: "For the loud nights", icon: Music2 },
  { label: "Food & drink", detail: "Come hungry", icon: Martini },
  { label: "Arts & culture", detail: "See something new", icon: Palette },
  { label: "Outdoors", detail: "Get out there", icon: TentTree },
  { label: "A little bit of everything", detail: "Follow your curiosity", icon: Compass },
];

export function CategorySection() {
  return (
    <section
      aria-labelledby="categories-heading"
      className={styles.categorySection}
      id="categories"
    >
      <div className={styles.sectionHeading}>
        <div>
          <span className={styles.sectionEyebrow}>PICK YOUR PACE</span>
          <h2 id="categories-heading">What are you in the mood for?</h2>
        </div>
        <Link className={styles.subtleLink} href="#events">
          Browse everything
          <ArrowUpRight aria-hidden="true" size={16} />
        </Link>
      </div>
      <div className={styles.categoryGrid}>
        {categories.map(({ label, detail, icon: Icon }, index) => (
          <Link className={styles.categoryCard} href="#events" key={label}>
            <span className={`${styles.categoryIcon} ${styles[`categoryTone${index + 1}`]}`}>
              <Icon aria-hidden="true" size={21} strokeWidth={1.8} />
            </span>
            <span className={styles.categoryText}>
              <strong>{label}</strong>
              <span>{detail}</span>
            </span>
            <ArrowUpRight aria-hidden="true" className={styles.categoryArrow} size={16} />
          </Link>
        ))}
      </div>
    </section>
  );
}
