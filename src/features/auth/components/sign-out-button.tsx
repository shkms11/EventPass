"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function signOut() {
    setError("");
    setIsSubmitting(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        setError("We couldn't sign you out. Please try again.");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setError("We couldn't sign you out. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <button disabled={isSubmitting} onClick={signOut} type="button">
        {isSubmitting ? "Signing out..." : "Sign out"}
      </button>
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
