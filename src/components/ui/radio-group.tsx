'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React from 'react';
import { cn } from '@/lib/utils';

export type RadioButtonValue = number | string;

export interface RadioButtonOption {
  disabled?: boolean;
  label: string;
  value: RadioButtonValue;
}

interface RadioGroupProps extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>, 'onChange' | 'onValueChange' | 'value'> {
  onChange?: (value: RadioButtonValue) => void;
  onValueChange?: (value: string) => void;
  options?: RadioButtonOption[];
  value?: RadioButtonValue;
}

export function RadioGroup({ children, className, onChange, onValueChange, options, value, ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root {...props} className={cn('app-radio-button-group', className)} value={value === undefined ? undefined : String(value)} onValueChange={(nextValue) => {
      const matched = options?.find((option) => String(option.value) === nextValue);
      onChange?.(matched?.value ?? nextValue);
      onValueChange?.(nextValue);
    }}>
      {options ? options.map((option) => <RadioButton disabled={option.disabled} key={option.value} value={String(option.value)}>{option.label}</RadioButton>) : children}
    </RadioGroupPrimitive.Root>
  );
}

export function RadioButton({ children, className, disabled, value }: { children: React.ReactNode; className?: string; disabled?: boolean; value: string }) {
  return <RadioGroupPrimitive.Item className={cn('app-radio-button', className)} disabled={disabled} value={value}><span className="app-radio-button-label">{children}</span></RadioGroupPrimitive.Item>;
}
