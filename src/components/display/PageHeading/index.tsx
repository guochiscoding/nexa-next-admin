export function PageHeading({ eyebrow, title, description, extra }: { eyebrow?: string; title: string; description?: string; extra?: React.ReactNode }) {
  return (
    <header className="page-heading">
      <div>
        {eyebrow ? <p className="page-eyebrow">{eyebrow}</p> : null}
        <h1 className="page-title">{title}</h1>
        {description ? <span className="page-description">{description}</span> : null}
      </div>
      {extra}
    </header>
  );
}
