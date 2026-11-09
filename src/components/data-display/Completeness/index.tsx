import { Check, Minus, X } from 'lucide-react';

export type CompletenessLevel = 0 | '0' | 'full' | 'half';

const configByLevel = {
  empty: { Icon: X, className: 'is-empty' },
  full: { Icon: Check, className: 'is-full' },
  half: { Icon: Minus, className: 'is-half' },
} as const;

export function Completeness({ level = 'full', text }: { level?: CompletenessLevel; text: string }) {
  const normalizedLevel = level === 0 || level === '0' ? 'empty' : level;
  const config = configByLevel[normalizedLevel];
  const Icon = config.Icon;
  return <span className={`completeness ${config.className}`}><span className="completeness-icon-wrap" aria-hidden="true"><Icon className="completeness-icon" /></span><span className="completeness-text">{text}</span></span>;
}
