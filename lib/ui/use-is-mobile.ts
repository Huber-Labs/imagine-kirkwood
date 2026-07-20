"use client";

import { useEffect, useState } from "react";

const MOBILE_MEDIA_QUERY = "(max-width: 767px)";

export function useIsMobile(defaultValue = false) {
  const [isMobile, setIsMobile] = useState(defaultValue);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_MEDIA_QUERY);
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isMobile;
}
