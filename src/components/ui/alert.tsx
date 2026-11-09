'use client';

import * as React from 'react';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

type AlertVariant = 'default' | 'destructive' | 'info' | 'success';

export function Alert({ children, className, variant = 'default' }: { children: React.ReactNode; className?: string; variant?: AlertVariant }) {
  const Icon = variant === 'destructive' ? AlertCircle : variant === 'success' ? CheckCircle2 : Info;
  return (
    <div className={cn('flex items-start gap-2 rounded-md border px-3 py-2 text-sm', variant === 'destructive' && 'border-[var(--error-color)] bg-[var(--error-light)] text-[var(--error-color)]', variant === 'info' && 'border-[var(--brand-blue)] bg-[var(--brand-blue-light)] text-[var(--brand-blue)]', variant === 'success' && 'border-[var(--success-color)] bg-[var(--success-light)] text-[var(--success-color)]', variant === 'default' && 'border-[var(--component-border)] bg-[var(--bg-color-container)]', className)}>
      <Icon className="mt-0.5 size-4 shrink-0" />
      <div>{children}</div>
    </div>
  );
}
