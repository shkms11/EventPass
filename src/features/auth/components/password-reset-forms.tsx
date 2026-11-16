"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import styles from "./auth-form.module.css";

export function RequestPasswordResetForm() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email")).trim();

    try {
      const result = await authClient.requestPasswordReset({
        email,
        redirectTo: new URL("/reset-password", window.location.origin).toString(),
      });

      if (result.error) {
        setError("We couldn't process that request. Please try again shortly.");
        return;
      }

      setMessage(
        "If an account exists for that email, a password reset link is on its way.",
      );
    } catch {
      setError("Password reset is temporarily unavailable. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section aria-labelledby="reset-heading" className={styles.card}>
      <span className={styles.eyebrow}>ACCOUNT RECOVERY</span>
      <h1 id="reset-heading">Reset your password.</h1>
      <p className={styles.intro}>
        Enter the email on your account and we’ll send a reset link if it exists.
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field}>
          <span>Email address</span>
          <input
            autoComplete="email"
            maxLength={254}
            name="email"
            required
            type="email"
          />
        </label>
        {error && <p className={styles.error} role="alert">{error}</p>}
        {message && <p className={styles.success} role="status">{message}</p>}
        <button className={styles.submitButton} disabled={isSubmitting} type="submit">
          {isSubmitting ? "Please wait..." : "Send reset link"}
        </button>
      </form>
      <Link className={styles.secondaryLink} href="/sign-in">
        Back to sign in
      </Link>
    </section>
  );
}

export function ResetPasswordForm({
  token,
  invalidLink,
}: {
  token?: string;
  invalidLink: boolean;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirmPassword"));

    if (password !== confirmPassword) {
      setError("Your passwords don't match.");
      setIsSubmitting(false);
      return;
    }

    if (!token) {
      setError("This reset link is invalid or expired. Request a new one.");
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await authClient.resetPassword({
        newPassword: password,
        token,
      });

      if (result.error) {
        setError("This reset link is invalid or expired. Request a new one.");
        return;
      }

      router.replace("/sign-in?password-reset=1");
    } catch {
      setError("Password reset is temporarily unavailable. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section aria-labelledby="new-password-heading" className={styles.card}>
      <span className={styles.eyebrow}>ACCOUNT RECOVERY</span>
      <h1 id="new-password-heading">Choose a new password.</h1>
      <p className={styles.intro}>
        {invalidLink
          ? "This reset link is invalid or expired. Request a new one."
          : "Use at least 12 characters for your new password."}
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field}>
          <span>New password</span>
          <input
            autoComplete="new-password"
            maxLength={128}
            minLength={12}
            name="password"
            required
            type="password"
          />
        </label>
        <label className={styles.field}>
          <span>Confirm new password</span>
          <input
            autoComplete="new-password"
            maxLength={128}
            minLength={12}
            name="confirmPassword"
            required
            type="password"
          />
        </label>
        {error && <p className={styles.error} role="alert">{error}</p>}
        <button
          className={styles.submitButton}
          disabled={isSubmitting || !token || invalidLink}
          type="submit"
        >
          {isSubmitting ? "Please wait..." : "Update password"}
        </button>
      </form>
      <Link className={styles.secondaryLink} href="/forgot-password">
        Request a new reset link
      </Link>
    </section>
  );
}
