interface SiteFooterProps {
  variant?: "default" | "exhibition";
}

export function SiteFooter({ variant = "default" }: SiteFooterProps) {
  const isExhibition = variant === "exhibition";

  return (
    <footer
      className={`site-footer${
        isExhibition ? " site-footer--exhibition" : ""
      }`}
    >
      <p className="site-footer__text">
        Built by Huber Labs&nbsp;|&nbsp;Copyright 2026 All rights reserved
      </p>
    </footer>
  );
}
