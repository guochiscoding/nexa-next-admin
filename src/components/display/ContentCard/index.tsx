export function ContentCard({ title, subtitle, children }: { title?: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="content-card">
      {title ? <h2 className="panel-title">{title}</h2> : null}
      {subtitle ? <p className="panel-subtitle">{subtitle}</p> : null}
      {children}
    </section>
  );
}
