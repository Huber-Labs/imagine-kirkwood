interface PanelSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function PanelSection({
  title,
  children,
  className = "",
}: PanelSectionProps) {
  return (
    <section className={className}>
      <div className="panel-section__head">
        <h3 className="panel-section__title">{title}</h3>
        <div className="panel-section__rule" aria-hidden="true" />
      </div>
      {children}
    </section>
  );
}
