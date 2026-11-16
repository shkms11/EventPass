"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { SiteFooter } from "@/shared/components/homepage/site-footer";
import { SiteHeader } from "@/shared/components/homepage/site-header";
import styles from "./auth-form.module.css";

type AuthMode = "sign-in" | "sign-up";

export function AuthForm({
  mode,
  passwordReset = false,
}: {
  mode: AuthMode;
  passwordReset?: boolean;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [message, setMessage] = useState(
    passwordReset ? "Your password was updated. Sign in with the new password." : "",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSignUp = mode === "sign-up";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email")).trim();
    const password = String(formData.get("password"));

    try {
      if (isSignUp) {
        const name = String(formData.get("name")).trim();
        const confirmPassword = String(formData.get("confirmPassword"));

        if (password !== confirmPassword) {
          setError("Your passwords don't match.");
          return;
        }

        const result = await authClient.signUp.email({
          name,
          email,
          password,
          callbackURL: "/account",
        });

        if (result.error) {
          setError("We couldn't create your account. Check your details and try again.");
          return;
        }

        setMessage(
          "If this email can be registered, check your inbox for a verification link.",
        );
        return;
      }

      const result = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/account",
      });

      if (result.error) {
        setError(
          "We couldn't sign you in. Check your details and, if needed, verify your email first.",
        );
        return;
      }

      router.replace("/account");
      router.refresh();
    } catch {
      setError("Authentication is temporarily unavailable. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.main}>
        <section aria-labelledby="auth-heading" className={styles.card}>
          <span className={styles.eyebrow}>EVENTPASS ACCOUNT</span>
          <h1 id="auth-heading">{isSignUp ? "Join the good plans." : "Welcome back."}</h1>
          <p className={styles.intro}>
            {isSignUp
              ? "Create an account to keep your event plans together."
              : "Sign in to pick up where your next plan begins."}
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            {isSignUp && (
              <label className={styles.field}>
                <span>Your name</span>
                <input
                  autoComplete="name"
                  maxLength={80}
                  name="name"
                  required
                  type="text"
                />
              </label>
            )}
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
            <label className={styles.field}>
              <span>Password</span>
              <input
                autoComplete={isSignUp ? "new-password" : "current-password"}
                maxLength={128}
                minLength={12}
                name="password"
                required
                type="password"
              />
              {isSignUp && (
                <span className={styles.hint}>Use at least 12 characters.</span>
              )}
            </label>
            {isSignUp && (
              <label className={styles.field}>
                <span>Confirm password</span>
                <input
                  autoComplete="new-password"
                  maxLength={128}
                  minLength={12}
                  name="confirmPassword"
                  required
                  type="password"
                />
              </label>
            )}

            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}
            {message && (
              <p className={styles.success} role="status">
                {message}
              </p>
            )}

            <button className={styles.submitButton} disabled={isSubmitting} type="submit">
              {isSubmitting
                ? "Please wait..."
                : isSignUp
                  ? "Create account"
                  : "Sign in"}
            </button>
          </form>

          {!isSignUp && (
            <Link className={styles.secondaryLink} href="/forgot-password">
              Forgot your password?
            </Link>
          )}
          <p className={styles.switchMode}>
            {isSignUp ? "Already have an account?" : "New to EventPass?"}{" "}
            <Link href={isSignUp ? "/sign-in" : "/sign-up"}>
              {isSignUp ? "Sign in" : "Create an account"}
            </Link>
          </p>
          <p className={styles.privacyNote}>
            Email verification is required. If a link expires, signing in again
            sends a fresh one. Your password and session token are never shown.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
