"use client";

import { useParticipate } from "@/components/participate/ParticipateProvider";

export function AuthStatus() {
  const { isConfigured, user, openSignIn, signOut } = useParticipate();

  if (!isConfigured) {
    return null;
  }

  if (!user) {
    return (
      <button
        type="button"
        className="auth-status auth-status--sign-in map-chrome-panel map-chrome-body rounded-full px-3.5 py-2 text-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        onClick={openSignIn}
      >
        Sign in
      </button>
    );
  }

  const label = user.email?.split("@")[0] ?? "Signed in";

  return (
    <div className="auth-status auth-status--signed-in map-chrome-panel flex items-center gap-2 rounded-full px-2 py-1.5 sm:px-3 sm:py-2">
      <span className="map-chrome-body max-w-[7rem] truncate text-sm sm:max-w-[10rem]">
        {label}
      </span>
      <button
        type="button"
        className="auth-status__sign-out rounded-full px-2 py-1 text-xs text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        onClick={() => {
          void signOut();
        }}
      >
        Sign out
      </button>
    </div>
  );
}
