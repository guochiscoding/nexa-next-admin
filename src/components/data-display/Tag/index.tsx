export function Tag({ bgColor = 'transparent', bordered = true, children, color = 'var(--Font-Black-Gy1)' }: { bgColor?: string; bordered?: boolean; children: React.ReactNode; color?: string }) {
  const borderColor = bordered ? (color === 'var(--Font-Black-Gy1)' ? 'var(--component-border)' : color) : 'transparent';
  return <span className="tag" style={{ backgroundColor: bgColor, borderColor, color }}>{children}</span>;
}
