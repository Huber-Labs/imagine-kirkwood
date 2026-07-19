"use client";

import { SignInForm } from "@/components/auth/SignInForm";
import { useParticipate } from "@/components/participate/ParticipateProvider";

interface SignInSheetProps {
  returnPath?: string;
}

export function SignInSheet({ returnPath = "/explore" }: SignInSheetProps) {
  const { signInOpen, closeSignIn } = useParticipate();

  if (!signInOpen) return null;

  return (
    <div className="sign-in-sheet">
      <button
        type="button"
        className="sign-in-sheet__backdrop"
        aria-label="Close sign in"
        onClick={closeSignIn}
      />
      <div
        className="sign-in-sheet__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sign-in-title"
      >
        <button
          type="button"
          className="sign-in-sheet__close"
          aria-label="Close"
          onClick={closeSignIn}
        >
          ×
        </button>
        <h2 id="sign-in-title" className="sign-in-sheet__title">
          Sign in to prioritize
        </h2>
        <p className="sign-in-sheet__copy">
          Allocate your Civic Points across ideas you want protected or built.
          We&apos;ll email you a magic link — no password needed.
        </p>
        <SignInForm returnPath={returnPath} />
      </div>
    </div>
  );
}
