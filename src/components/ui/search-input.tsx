'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useI18n } from '@/locales';

export interface SearchInputProps extends Omit<React.ComponentPropsWithoutRef<typeof Input>, 'onKeyDown' | 'suffix'> {
  onSearch?: (value: string) => void;
}

export function SearchInput({ className, disabled = false, onChange, onSearch, placeholder, value, ...props }: SearchInputProps) {
  const { t } = useI18n();
  const [innerValue, setInnerValue] = React.useState('');
  const keyword = value === undefined ? innerValue : String(value);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInnerValue(event.target.value);
    onChange?.(event);
  }

  function emitSearch() {
    if (disabled) return;
    onSearch?.(keyword.trim());
  }

  return (
    <Input
      {...props}
      allowClear
      className={cn('search-input', className)}
      disabled={disabled}
      placeholder={placeholder ?? t('common.searchPlaceholder')}
      suffix={<Search className={cn('size-4 search-input-icon', keyword && 'is-active')} />}
      value={keyword}
      onChange={handleChange}
      onKeyDown={(event) => {
        if (event.key === 'Enter') emitSearch();
      }}
      onSuffixClick={emitSearch}
    />
  );
}
