"use client";

import { useParticipate } from "@/components/participate/ParticipateProvider";

interface AuthStatusProps {
  variant?: "map" | "panel";
}

export function AuthStatus({ variant = "map" }: AuthStatusProps) {
  const { user, openSignIn, signOut } = useParticipate();
  const isPanel = variant === "panel";

  if (user) {
    const label = user.email?.split("@")[0] ?? "Signed in";

    return (
      <div
        className={
          isPanel
            ? "auth-status auth-status--signed-in flex max-w-[11rem] items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.04] px-2.5 py-1.5"
            : "auth-status auth-status--signed-in map-chrome-panel flex items-center gap-2 rounded-full px-2 py-1.5 sm:px-3 sm:py-2"
        }
      >
        <span
          className={
            isPanel
              ? "max-w-[5.5rem] truncate text-sm text-foreground/80"
              : "map-chrome-body max-w-[7rem] truncate text-sm sm:max-w-[10rem]"
          }
        >
          {label}
        </span>
        <button
          type="button"
          className={
            isPanel
              ? "auth-status__sign-out rounded-full px-2 py-1 text-xs text-foreground/55 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
              : "auth-status__sign-out rounded-full px-2 py-1 text-xs text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          }
          onClick={() => {
            void signOut();
          }}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      className={
        isPanel
          ? "auth-status auth-status--sign-in rounded-full border border-foreground/10 px-3 py-1.5 text-sm text-foreground/80 transition-colors hover:border-foreground/20 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
          : "auth-status auth-status--sign-in map-chrome-panel map-chrome-body rounded-full px-3.5 py-2 text-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
      }
      onClick={openSignIn}
    >
      Sign in
    </button>
  );
}
