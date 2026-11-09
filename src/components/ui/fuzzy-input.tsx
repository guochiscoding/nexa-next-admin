'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/locales';

export interface FuzzyOption {
  label: string;
  value: string;
  [key: string]: unknown;
}

export interface FuzzyInputProps {
  allowClear?: boolean;
  className?: string;
  debounce?: number;
  disabled?: boolean;
  fetchOptions: (keyword: string) => Promise<FuzzyOption[]>;
  onChange?: (value: string | undefined, option: FuzzyOption | undefined) => void;
  onSearch?: (keyword: string) => void;
  placeholder?: string;
  value?: string;
  width?: number | string;
}

function resolveSize(size?: number | string) {
  return typeof size === 'number' ? `${size}px` : size;
}

export function FuzzyInput({ allowClear = true, className, debounce = 300, disabled = false, fetchOptions, onChange, onSearch, placeholder, value, width = '240px' }: FuzzyInputProps) {
  const { t } = useI18n();
  const [keyword, setKeyword] = React.useState(value ?? '');
  const [options, setOptions] = React.useState<FuzzyOption[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setKeyword(value ?? '');
  }, [value]);

  React.useEffect(() => {
    if (!keyword) {
      setOptions([]);
      return;
    }
    onSearch?.(keyword);
    const timer = window.setTimeout(() => {
      setLoading(true);
      void fetchOptions(keyword).then(setOptions).catch(() => setOptions([])).finally(() => setLoading(false));
    }, debounce);
    return () => window.clearTimeout(timer);
  }, [debounce, fetchOptions, keyword, onSearch]);

  function selectOption(option: FuzzyOption) {
    setKeyword(option.label);
    setOpen(false);
    onChange?.(option.value, option);
  }

  function clearValue() {
    setKeyword('');
    setOptions([]);
    onChange?.(undefined, undefined);
  }

  return (
    <div className={cn('fuzzy-input', className)} style={{ '--control-width': resolveSize(width) } as React.CSSProperties}>
      <span className={cn('common-input', disabled && 'is-disabled')}>
        <input
          className="common-input-control"
          disabled={disabled}
          placeholder={placeholder ?? t('common.searchContentPlaceholder')}
          value={keyword}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
          onChange={(event) => { setKeyword(event.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
        />
        {allowClear && keyword && !disabled ? <button aria-label={t('common.clear')} className="common-input-clear" type="button" onClick={clearValue}><X className="size-3.5" /></button> : null}
      </span>
      {open && keyword ? (
        <div className="common-select-dropdown fuzzy-input-dropdown">
          {loading ? <div className="common-select-option is-static">{t('common.searching')}</div> : options.map((option) => <button className="common-select-option fuzzy-input-option" key={option.value} type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => selectOption(option)}>{option.label}</button>)}
        </div>
      ) : null}
    </div>
  );
}

export interface LabelFuzzyInputProps extends FuzzyInputProps {
  label: string;
}

export function LabelFuzzyInput({ className, disabled, label, width = '240px', ...props }: LabelFuzzyInputProps) {
  return (
    <div className={cn('label-fuzzy-input', disabled && 'is-disabled', className)} style={{ '--control-width': resolveSize(width) } as React.CSSProperties}>
      <span className="label-fuzzy-input-text">{label}：</span>
      <FuzzyInput {...props} className="label-fuzzy-input-control" disabled={disabled} width="100%" />
    </div>
  );
}
