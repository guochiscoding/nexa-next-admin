import { CircleAlert, CircleCheck, CircleX, Home, Loader2, Send, ShieldAlert, ShieldCheck, Trash2 } from 'lucide-react';

const statusIconByStatus = {
  completed: ShieldCheck,
  disabled: Send,
  draft: Trash2,
  enabled: CircleCheck,
  failed: CircleX,
  normal: Home,
  notStarted: CircleAlert,
  pending: ShieldAlert,
} as const;

export function Status({ status, text }: { status?: string; text: string }) {
  const key = status ?? 'default';
  const isLoading = key === 'processing' || key === 'queued';
  const Icon = statusIconByStatus[key as keyof typeof statusIconByStatus];

  return <span className={`status status-inline-${key}`}>{isLoading ? <Loader2 className="status-icon is-loading" aria-hidden="true" /> : Icon ? <Icon className="status-icon" aria-hidden="true" /> : <CircleAlert className="status-icon" aria-hidden="true" />}<span className="status-text">{text}</span></span>;
}
