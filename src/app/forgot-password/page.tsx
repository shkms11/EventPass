import { RequestPasswordResetForm } from "@/features/auth/components/password-reset-forms";
import { SiteFooter } from "@/shared/components/homepage/site-footer";
import { SiteHeader } from "@/shared/components/homepage/site-header";
import styles from "@/features/auth/components/auth-form.module.css";

export default function ForgotPasswordPage() {
  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.main}>
        <RequestPasswordResetForm />
      </main>
      <SiteFooter />
    </div>
  );
}
