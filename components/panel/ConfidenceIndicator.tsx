interface ConfidenceIndicatorProps {
  level: 1 | 2 | 3 | 4;
  label: string;
}

export function ConfidenceIndicator({ level, label }: ConfidenceIndicatorProps) {
  return (
    <span className="confidence-indicator inline-flex items-center gap-2.5">
      <span className="confidence-indicator__dots inline-flex gap-1" aria-hidden="true">
        {[1, 2, 3, 4].map((step) => (
          <span
            key={step}
            className={`confidence-indicator__dot ${
              step <= level ? "confidence-indicator__dot--filled" : ""
            }`}
          />
        ))}
      </span>
      <span className="confidence-indicator__label">{label}</span>
    </span>
  );
}
