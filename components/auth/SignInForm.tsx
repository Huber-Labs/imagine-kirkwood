"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface SignInFormProps {
  onSent?: () => void;
}

export function SignInForm({ onSent }: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage(null);

    const supabase = createClient();
    const origin = window.location.origin;
    const redirectTo = `${origin}/auth/callback`;

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: redirectTo },
    });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    setStatus("sent");
    setMessage(
      "Check your email for a sign-in link. Open it in this same browser.",
    );
    onSent?.();
  }

  return (
    <form className="sign-in-form" onSubmit={handleSubmit}>
      <label className="sign-in-form__label" htmlFor="sign-in-email">
        Email address
      </label>
      <input
        id="sign-in-email"
        type="email"
        autoComplete="email"
        required
        value={email}
        disabled={status === "sending" || status === "sent"}
        placeholder="you@example.com"
        className="sign-in-form__input"
        onChange={(event) => setEmail(event.target.value)}
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
