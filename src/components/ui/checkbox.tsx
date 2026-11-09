'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Checkbox({ checked, className, indeterminate, onCheckedChange }: { checked?: boolean; className?: string; indeterminate?: boolean; onCheckedChange?: (checked: boolean) => void }) {
  return (
    <CheckboxPrimitive.Root checked={indeterminate ? 'indeterminate' : checked} className={cn('common-checkbox', className)} onCheckedChange={(value) => onCheckedChange?.(value === true)}>
      <CheckboxPrimitive.Indicator>{indeterminate ? <Minus className="common-checkbox-indicator" /> : <Check className="common-checkbox-indicator" />}</CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
