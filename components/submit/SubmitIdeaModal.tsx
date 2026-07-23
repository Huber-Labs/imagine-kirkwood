"use client";

import { useEffect, useRef, useState } from "react";
import { submitIdea } from "@/lib/submissions/actions";
import {
  IDEA_DESCRIPTION_MAX_LENGTH,
  IDEA_PHOTO_MAX_BYTES,
  IDEA_TITLE_MAX_LENGTH,
} from "@/lib/submissions/types";

type Status = "idle" | "submitting" | "sent" | "error";

export function SubmitIdeaModal({ onClose }: { onClose: () => void }) {
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      titleRef.current?.focus({ preventScroll: true });
    }, 120);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const photo = formData.get("photo");
    if (photo instanceof File && photo.size > IDEA_PHOTO_MAX_BYTES) {
      setStatus("error");
      setMessage("Photo must be 8 MB or smaller.");
      return;
    }

    const result = await submitIdea(formData);
    if (result.ok) {
      setStatus("sent");
      setMessage(null);
      formRef.current?.reset();
    } else {
      setStatus("error");
      setMessage(result.error);
    }
  }

  const submitting = status === "submitting";

  return (
    <div className="sign-in-sheet sign-in-sheet--dialog">
      <button
        type="button"
        className="sign-in-sheet__backdrop"
        aria-label="Close submit an idea"
        onClick={onClose}
      />
      <div
        className="sign-in-sheet__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="submit-idea-title"
      >
        <button
          type="button"
          className="sign-in-sheet__close"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>

        {status === "sent" ? (
          <>
            <h2 id="submit-idea-title" className="sign-in-sheet__title">
              Thanks — idea received
            </h2>
            <p className="sign-in-sheet__copy">
              We&apos;ll review your idea for Kirkwood Avenue. If it&apos;s a fit,
              you may see it turned into a concept on the atlas.
            </p>
            <button
              type="button"
              className="sign-in-form__submit"
              onClick={onClose}
            >
              Done
            </button>
          </>
        ) : (
          <>
            <h2 id="submit-idea-title" className="sign-in-sheet__title">
              Submit an Idea
            </h2>
            <p className="sign-in-sheet__copy">
              Have a vision for Kirkwood Avenue? Share a title, a short
              description, and a photo if you have one. We review every idea.
            </p>
            <form ref={formRef} className="sign-in-form" onSubmit={handleSubmit}>
              <label className="sign-in-form__label" htmlFor="idea-title">
                Title
              </label>
              <input
                ref={titleRef}
                id="idea-title"
                name="title"
                type="text"
                required
                maxLength={IDEA_TITLE_MAX_LENGTH}
                disabled={submitting}
                placeholder="A shaded reading nook near the plaza"
                className="sign-in-form__input"
              />

              <label className="sign-in-form__label" htmlFor="idea-description">
                Description
              </label>
              <textarea
                id="idea-description"
                name="description"
                required
                rows={4}
                maxLength={IDEA_DESCRIPTION_MAX_LENGTH}
                disabled={submitting}
                placeholder="What would it look like? Where on Kirkwood? Why does it matter?"
                className="sign-in-form__input"
                style={{ resize: "vertical" }}
              />

              <label className="sign-in-form__label" htmlFor="idea-photo">
                Photo (optional)
              </label>
              <input
                id="idea-photo"
                name="photo"
                type="file"
                accept="image/*"
                disabled={submitting}
                className="sign-in-form__input"
              />

              <label className="sign-in-form__label" htmlFor="idea-name">
                Your name (optional)
              </label>
              <input
                id="idea-name"
                name="submitterName"
                type="text"
                disabled={submitting}
                placeholder="Jane from Bloomington"
                className="sign-in-form__input"
              />

              <label className="sign-in-form__label" htmlFor="idea-email">
                Your email (optional)
              </label>
              <input
                id="idea-email"
                name="submitterEmail"
                type="email"
                autoComplete="email"
                disabled={submitting}
                placeholder="you@example.com"
                className="sign-in-form__input"
              />

              <button
                type="submit"
                className="sign-in-form__submit"
                disabled={submitting}
              >
                {submitting ? "Sending…" : "Submit idea"}
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
          </>
        )}
      </div>
    </div>
  );
}
