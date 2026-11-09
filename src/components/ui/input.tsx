'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/locales';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  allowClear?: boolean;
  backgroundColor?: string;
  bordered?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  width?: number | string;
  onSuffixClick?: (value: string) => void;
}

function resolveSize(size?: number | string) {
  return typeof size === 'number' ? `${size}px` : size;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ allowClear = true, backgroundColor, bordered = true, className, disabled = false, onChange, onSuffixClick, placeholder, prefix, style, suffix, value, width = '240px', ...props }, ref) => {
  const { t } = useI18n();
  const [innerValue, setInnerValue] = React.useState('');
  const inputValue = value === undefined ? innerValue : String(value);
  const resolvedPlaceholder = placeholder ?? t('common.inputPlaceholder');

  function emitChange(nextValue: string) {
    setInnerValue(nextValue);
    const event = { target: { value: nextValue }, currentTarget: { value: nextValue } } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(event);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInnerValue(event.target.value);
    onChange?.(event);
  }

  return (
    <span
      className={cn('common-input', !bordered && 'is-borderless', disabled && 'is-disabled', className)}
      style={{ ...style, '--control-bg': backgroundColor, '--control-width': resolveSize(width) } as React.CSSProperties}
    >
      {prefix ? <span className="common-input-prefix">{prefix}</span> : null}
      <input {...props} ref={ref} className="common-input-control" disabled={disabled} placeholder={resolvedPlaceholder} value={inputValue} onChange={handleChange} />
      {allowClear && inputValue && !disabled ? <button aria-label={t('common.clear')} className="common-input-clear" type="button" onClick={() => emitChange('')}><X className="size-3.5" /></button> : null}
      {suffix ? <button className="common-input-suffix" disabled={disabled} type="button" onClick={() => onSuffixClick?.(inputValue)}>{suffix}</button> : null}
    </span>
  );
});
Input.displayName = 'Input';
