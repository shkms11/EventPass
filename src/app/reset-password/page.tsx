import { ResetPasswordForm } from "@/features/auth/components/password-reset-forms";
import { SiteFooter } from "@/shared/components/homepage/site-footer";
import { SiteHeader } from "@/shared/components/homepage/site-header";
import styles from "@/features/auth/components/auth-form.module.css";

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string | string[]; error?: string }>;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const { token: tokenParam, error } = await searchParams;
  const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam;

  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.main}>
        <ResetPasswordForm token={token} invalidLink={Boolean(error)} />
      </main>
      <SiteFooter />
    </div>
  );
}
