'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDown, X } from 'lucide-react';
import * as React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { useI18n } from '@/locales';

export type SelectOptionValue = string | number;
export type SelectMode = 'combobox' | 'multiple' | 'tags';

export interface SelectOption {
  disabled?: boolean;
  label: string;
  value: SelectOptionValue;
}

export type SelectModelValue = SelectOptionValue | SelectOptionValue[] | undefined;

export interface SelectProps {
  allowClear?: boolean;
  className?: string;
  disabled?: boolean;
  mode?: SelectMode;
  onChange?: (value: SelectModelValue, selectedOptions: SelectOption[]) => void;
  onValueChange?: (value: string | undefined) => void;
  options: SelectOption[];
  placeholder?: string;
  prefixLabel?: string;
  showSearch?: boolean;
  triggerClassName?: string;
  value?: SelectModelValue;
  width?: number | string;
}

function resolveSize(size?: number | string) {
  return typeof size === 'number' ? `${size}px` : size;
}

function normalizeValue(value: SelectModelValue) {
  return Array.isArray(value) ? value.map(String).join(',') : value === undefined ? '' : String(value);
}

function getSelectedOptions(options: SelectOption[], value: SelectModelValue) {
  const selectedValues = Array.isArray(value) ? value : value === undefined ? [] : [value];
  return options.filter((option) => selectedValues.includes(option.value));
}

function stopTriggerEvent(event: React.PointerEvent | React.MouseEvent) {
  event.preventDefault();
  event.stopPropagation();
}

function SelectSuffix({ canClear, clearLabel, onClear }: { canClear: boolean; clearLabel: string; onClear: (event: React.MouseEvent | React.PointerEvent) => void }) {
  return (
    <span className={cn('common-select-suffix', canClear && 'has-clear')}>
      <ChevronDown className="common-select-arrow size-4" />
      {canClear ? <span aria-label={clearLabel} className="common-select-clear" role="button" tabIndex={-1} onPointerDown={onClear} onClick={onClear}><X className="size-3.5" /></span> : null}
    </span>
  );
}

export function Select({ allowClear = true, className, disabled = false, mode, onChange, onValueChange, options, placeholder, prefixLabel, triggerClassName, value, width = '240px' }: SelectProps) {
  const { t } = useI18n();
  const [innerValue, setInnerValue] = React.useState<SelectModelValue>(mode === 'multiple' ? [] : undefined);
  const selectedValue = value === undefined ? innerValue : value;
  const isMultiple = mode === 'multiple';
  const selectedOptions = getSelectedOptions(options, selectedValue);
  const displayLabel = selectedOptions.length ? selectedOptions.map((option) => option.label).join(', ') : '';
  const resolvedPlaceholder = placeholder ?? t('common.selectPlaceholder');
  const multiRef = React.useRef<HTMLDivElement | null>(null);
  const [multiOpen, setMultiOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isMultiple || !multiOpen) return undefined;
    function handlePointerDown(event: PointerEvent) {
      if (multiRef.current?.contains(event.target as Node)) return;
      setMultiOpen(false);
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setMultiOpen(false);
    }
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMultiple, multiOpen]);

  function emit(nextValue: SelectModelValue) {
    setInnerValue(nextValue);
    onChange?.(nextValue, getSelectedOptions(options, nextValue));
    if (!Array.isArray(nextValue)) onValueChange?.(nextValue === undefined ? undefined : String(nextValue));
  }

  if (isMultiple) {
    const selectedValues = Array.isArray(selectedValue) ? selectedValue : [];
    const canClear = Boolean(allowClear && selectedValues.length && !disabled);
    const toggleOption = (option: SelectOption) => {
      if (option.disabled) return;
      const checked = selectedValues.includes(option.value);
      emit(checked ? selectedValues.filter((item) => item !== option.value) : [...selectedValues, option.value]);
    };
    return (
      <div ref={multiRef} className={cn('common-select', className)} style={{ '--control-width': resolveSize(width) } as React.CSSProperties}>
        <button aria-expanded={multiOpen} className={cn('common-select-trigger', triggerClassName)} data-state={multiOpen ? 'open' : 'closed'} disabled={disabled} type="button" onClick={() => setMultiOpen((open) => !open)}>
            {prefixLabel ? <span className="common-select-prefix">{prefixLabel}：</span> : null}
            <span className={cn('common-select-value', !selectedOptions.length && 'common-select-placeholder', selectedOptions.length && 'common-select-value-multiple')}>
              {selectedOptions.length ? selectedOptions.map((option) => (
                <span className="common-select-tag" key={option.value}>
                  <span className="common-select-tag-label">{option.label}</span>
                  {!disabled ? <span aria-label={t('common.clear')} className="common-select-tag-remove" role="button" tabIndex={-1} onPointerDown={stopTriggerEvent} onClick={(event) => { stopTriggerEvent(event); emit(selectedValues.filter((item) => item !== option.value)); }}><X className="size-3" /></span> : null}
                </span>
              )) : resolvedPlaceholder}
            </span>
            <SelectSuffix canClear={canClear} clearLabel={t('common.clear')} onClear={(event) => { stopTriggerEvent(event); emit([]); setMultiOpen(false); }} />
        </button>
        {multiOpen ? (
          <div className="common-select-dropdown common-select-dropdown-inline" role="listbox" aria-multiselectable="true">
            {options.map((option) => {
              const checked = selectedValues.includes(option.value);
              return (
                <button aria-disabled={option.disabled || undefined} aria-selected={checked} className="common-select-option common-select-option-button" disabled={option.disabled} key={option.value} role="option" type="button" onClick={() => toggleOption(option)}>
                  <Checkbox checked={checked} />
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }

  const canClear = Boolean(allowClear && selectedValue !== undefined && !disabled);

  return (
    <div className={cn('common-select', className)} style={{ '--control-width': resolveSize(width) } as React.CSSProperties}>
      <SelectPrimitive.Root disabled={disabled} value={normalizeValue(selectedValue)} onValueChange={(nextValue) => {
        const matched = options.find((option) => String(option.value) === nextValue);
        emit(matched?.value ?? nextValue);
      }}>
        <SelectPrimitive.Trigger className={cn('common-select-trigger', triggerClassName)} disabled={disabled}>
          {prefixLabel ? <span className="common-select-prefix">{prefixLabel}：</span> : null}
          <span className={cn('common-select-value', !displayLabel && 'common-select-placeholder')}>{displayLabel || resolvedPlaceholder}</span>
          <SelectSuffix canClear={canClear} clearLabel={t('common.clear')} onClear={(event) => { stopTriggerEvent(event); emit(undefined); }} />
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content className="common-select-dropdown" position="popper" sideOffset={4}>
            <SelectPrimitive.Viewport>
              {options.map((option) => (
                <SelectPrimitive.Item className="common-select-option" disabled={option.disabled} key={option.value} value={String(option.value)}>
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </div>
  );
}
