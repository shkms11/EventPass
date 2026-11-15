import { CategorySection } from "@/shared/components/homepage/category-section";
import { FeaturedEvents } from "@/shared/components/homepage/featured-events";
import { HeroSection } from "@/shared/components/homepage/hero-section";
import { OrganizerCta } from "@/shared/components/homepage/organizer-cta";
import { SiteFooter } from "@/shared/components/homepage/site-footer";
import { SiteHeader } from "@/shared/components/homepage/site-header";
import styles from "@/shared/components/homepage/homepage.module.css";

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
