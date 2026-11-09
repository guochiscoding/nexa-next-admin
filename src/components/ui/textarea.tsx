'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/locales';

type TextareaDisplayType = 'input' | 'textarea';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  backgroundColor?: string;
  bordered?: boolean;
  height?: number | string;
  inputType?: TextareaDisplayType;
  type?: TextareaDisplayType;
  width?: number | string;
}

function resolveSize(size?: number | string) {
  return typeof size === 'number' ? `${size}px` : size;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ backgroundColor, bordered = true, className, disabled = false, height, inputType, maxLength, onChange, placeholder, style, type = 'textarea', value, width = '400px', ...props }, ref) => {
  const { t } = useI18n();
  const [innerValue, setInnerValue] = React.useState('');
  const rawValue = value === undefined ? innerValue : String(value);
  const displayValue = typeof maxLength === 'number' ? rawValue.slice(0, maxLength) : rawValue;
  const isLimited = typeof maxLength === 'number';
  const displayType = inputType ?? type;
  const isInputType = displayType === 'input';

  function emitChange(nextValue: string) {
    setInnerValue(nextValue);
    onChange?.({ target: { value: nextValue }, currentTarget: { value: nextValue } } as React.ChangeEvent<HTMLTextAreaElement>);
  }

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const nextValue = isLimited ? event.target.value.slice(0, maxLength) : event.target.value;
    emitChange(nextValue);
  }

  if (isInputType) {
    return (
      <div className={cn('common-textarea', className)} style={{ ...style, '--control-width': resolveSize(width) } as React.CSSProperties}>
        <div
          className={cn('common-textarea-control', disabled && 'is-disabled', !bordered && 'is-borderless', 'is-input', isLimited && 'is-limited')}
          style={{ '--control-bg': backgroundColor, '--control-height': resolveSize(height ?? '32px') } as React.CSSProperties}
        >
          <input
            className="common-textarea-field common-textarea-input-field"
            disabled={disabled}
            maxLength={maxLength}
            placeholder={placeholder ?? t('common.inputPlaceholder')}
            value={displayValue}
            onChange={(event) => {
              const nextValue = isLimited ? event.target.value.slice(0, maxLength) : event.target.value;
              emitChange(nextValue);
            }}
          />
          {isLimited ? <span className="common-textarea-input-count">{displayValue.length}/{maxLength}</span> : null}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('common-textarea', className)} style={{ ...style, '--control-width': resolveSize(width) } as React.CSSProperties}>
      <div
        className={cn('common-textarea-control', disabled && 'is-disabled', !bordered && 'is-borderless', isInputType && 'is-input', isLimited && 'is-limited')}
        style={{ '--control-bg': backgroundColor, '--control-height': resolveSize(height ?? (isInputType ? '32px' : '120px')) } as React.CSSProperties}
      >
        <textarea
          {...props}
          ref={ref}
          className={cn('common-textarea-field', isInputType && 'common-textarea-input-field')}
          disabled={disabled}
          maxLength={maxLength}
          placeholder={placeholder ?? t('common.inputPlaceholder')}
          rows={isInputType ? 1 : props.rows}
          value={displayValue}
          onChange={handleChange}
        />
        {isInputType && isLimited ? <span className="common-textarea-input-count">{displayValue.length}/{maxLength}</span> : null}
        {!isInputType && isLimited ? <div className="common-textarea-count-row"><span className="common-textarea-count">{displayValue.length}/{maxLength}</span></div> : null}
      </div>
    </div>
  );
});
Textarea.displayName = 'Textarea';
