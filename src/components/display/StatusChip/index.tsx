export function StatusChip({ tone = 'processing', children }: { tone?: 'danger' | 'processing' | 'success' | 'warning'; children: React.ReactNode }) {
  return <span className={`status-chip status-${tone}`}>{children}</span>;
}
