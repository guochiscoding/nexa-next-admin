'use client';

import * as React from 'react';
import { Select, type SelectProps } from '@/components/ui/select';
import { cn } from '@/lib/utils';

export interface LabelSelectProps extends SelectProps {
  label: string;
}

export function LabelSelect({ className, disabled = false, label, width = '240px', ...props }: LabelSelectProps) {
  return <Select {...props} className={cn('label-select', disabled && 'is-disabled', className)} disabled={disabled} prefixLabel={label} triggerClassName="label-select-trigger" width={width} />;
}
