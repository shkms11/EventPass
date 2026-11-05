import { CategorySection } from "@/components/homepage/category-section";
import { FeaturedEvents } from "@/components/homepage/featured-events";
import { HeroSection } from "@/components/homepage/hero-section";
import { OrganizerCta } from "@/components/homepage/organizer-cta";
import { SiteFooter } from "@/components/homepage/site-footer";
import { SiteHeader } from "@/components/homepage/site-header";
import styles from "@/components/homepage/homepage.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <SiteHeader />
      <main>
        <HeroSection />
        <CategorySection />
        <FeaturedEvents />
        <OrganizerCta />
      </main>
      <SiteFooter />
    </div>
  );
}
