"use client";

import { useState } from "react";
import {
  getPrecedentImagePath,
  getSitePhotoPath,
  PHOTO_PLACEHOLDER_PATH,
} from "@/lib/images";

interface StoryPhotoProps {
  src: string;
  alt: string;
  className?: string;
}

export function StoryPhoto({ src, alt, className = "" }: StoryPhotoProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const imageSrc = failed ? PHOTO_PLACEHOLDER_PATH : src;

  return (
    <div
      className={`story-photo overflow-hidden bg-[color-mix(in_srgb,var(--foreground)_4%,var(--background))] ${className}`}
    >
      <img
        src={imageSrc}
        alt={alt}
        className={`story-photo__img h-full w-full object-cover object-[center_42%] transition-opacity duration-700 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

interface TodayPhotoProps {
  siteId: string;
  siteName: string;
  photoPath?: string;
}

export function TodayPhoto({ siteId, siteName, photoPath }: TodayPhotoProps) {
  const src = photoPath ?? getSitePhotoPath(siteId);

  return (
    <StoryPhoto
      src={src}
      alt={`${siteName} today`}
      className="story-photo--today aspect-[5/3] max-h-[34vh] w-full sm:max-h-none sm:aspect-[16/10]"
    />
  );
}

interface PrecedentCardProps {
  siteId: string;
  precedentIndex: number;
  precedent: {
    id: string;
    place: string;
    summary: string;
    image?: string;
  };
}

export function PrecedentCard({
  siteId,
  precedentIndex,
  precedent,
}: PrecedentCardProps) {
  const src =
    precedent.image ?? getPrecedentImagePath(siteId, precedentIndex);

  return (
    <article className="space-y-4">
      <StoryPhoto
        src={src}
        alt={precedent.place}
        className="aspect-[3/2] w-full sm:aspect-[16/10]"
      />
      <div className="space-y-1.5">
        <p className="text-xs tracking-[0.12em] uppercase text-[var(--panel-muted)]">
          {precedent.place}
        </p>
        <p className="font-[family-name:var(--font-instrument-serif)] text-[1rem] leading-[1.55] text-foreground/85">
          {precedent.summary}
        </p>
      </div>
    </article>
  );
}
