"use client";

import { useEffect, useRef, useState } from "react";
import { useParticipate } from "@/components/participate/ParticipateProvider";

interface SignInFormProps {
  onSent?: () => void;
  autoFocus?: boolean;
}

const LAST_EMAIL_KEY = "imagine-kirkwood:last-sign-in-email";

function readStoredEmail(): string {
  if (typeof window === "undefined") return "";
  try {
    return sessionStorage.getItem(LAST_EMAIL_KEY) ?? "";
  } catch {
    return "";
  }
}

function storeEmail(email: string) {
  try {
    sessionStorage.setItem(LAST_EMAIL_KEY, email);
  } catch {
    // Ignore storage failures in private browsing.
  }
}

export function SignInForm({ onSent, autoFocus = false }: SignInFormProps) {
  const { isConfigured, getSupabaseClient } = useParticipate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = readStoredEmail();
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    if (!autoFocus) return;
    const timer = window.setTimeout(() => {
      inputRef.current?.focus({ preventScroll: true });
    }, 120);
    return () => window.clearTimeout(timer);
  }, [autoFocus]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage(null);

    const trimmedEmail = email.trim();

    if (!isConfigured) {
      setStatus("error");
      setMessage(
        "Supabase URL is misconfigured on the server. Open /api/health/supabase, fix urlIssue for NEXT_PUBLIC_SUPABASE_URL, then redeploy.",
      );
      return;
    }

    const supabase = getSupabaseClient();
    const origin = window.location.origin;
    const redirectTo = `${origin}/auth/callback`;

    const { error } = await supabase.auth.signInWithOtp({
      email: trimmedEmail,
      options: { emailRedirectTo: redirectTo },
    });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    storeEmail(trimmedEmail);
    setStatus("sent");
    setMessage(
      "Check your email for a sign-in link. Open it in this same browser.",
    );
    onSent?.();
  }

  return (
    <form
      className="sign-in-form"
      method="post"
      autoComplete="on"
      onSubmit={handleSubmit}
    >
      <label className="sign-in-form__label" htmlFor="sign-in-email">
        Email address
      </label>
      <input
        ref={inputRef}
        id="sign-in-email"
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        enterKeyHint="go"
        required
        value={email}
        disabled={status === "sending" || status === "sent"}
        placeholder="you@example.com"
        className="sign-in-form__input"
        onChange={(event) => setEmail(event.target.value)}
        onInput={(event) => setEmail(event.currentTarget.value)}
      />
      <button
        type="submit"
        className="sign-in-form__submit"
        disabled={status === "sending" || status === "sent"}
      >
        {status === "sending" ? "Sending…" : "Send magic link"}
      </button>
      {message && (
        <p
          className={`sign-in-form__message${
            status === "error" ? " sign-in-form__message--error" : ""
          }`}
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  );
}
