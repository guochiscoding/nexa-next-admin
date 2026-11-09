'use client';

import * as React from 'react';
import { Input, type InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface LabelInputProps extends InputProps {
  label: string;
}

function resolveSize(size?: number | string) {
  return typeof size === 'number' ? `${size}px` : size;
}

export const LabelInput = React.forwardRef<HTMLInputElement, LabelInputProps>(({ className, disabled = false, label, width = '240px', ...props }, ref) => (
  <div className={cn('label-input', disabled && 'is-disabled', className)} style={{ '--control-width': resolveSize(width) } as React.CSSProperties}>
    <span className="label-input-text">{label}：</span>
    <Input {...props} ref={ref} bordered={false} className="label-input-control" disabled={disabled} width="100%" />
  </div>
));
LabelInput.displayName = 'LabelInput';
