'use client';

import * as React from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useI18n } from '@/locales';

export type DatePickerMode = 'date' | 'month' | 'quarter' | 'week' | 'year';
export type DatePickerValue = string | undefined;
export type RangePickerValue = [string, string] | undefined;

interface BasePickerProps {
  allowClear?: boolean;
  className?: string;
  disabled?: boolean;
  picker?: DatePickerMode;
  showTime?: boolean | Record<string, unknown>;
  valueFormat?: string;
  width?: number | string;
}

export interface DatePickerProps extends BasePickerProps {
  onChange?: (value: DatePickerValue) => void;
  placeholder?: string;
  value?: DatePickerValue;
}

export interface RangePickerProps extends BasePickerProps {
  onChange?: (value: RangePickerValue) => void;
  placeholder?: [string, string];
  value?: RangePickerValue;
}

export interface LabelDatePickerProps extends DatePickerProps {
  label: string;
}

export interface LabelRangePickerProps extends RangePickerProps {
  label: string;
}

type CalendarCell = {
  date: Date;
  inView: boolean;
  key: string;
};

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function resolveSize(size?: number | string) {
  return typeof size === 'number' ? `${size}px` : size;
}

function useOutsideClose(open: boolean, ref: React.RefObject<HTMLElement | null>, onClose: () => void) {
  React.useEffect(() => {
    if (!open) return undefined;
    function handlePointerDown(event: PointerEvent) {
      if (ref.current?.contains(event.target as Node)) return;
      onClose();
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, open, ref]);
}

function pad(value: number) {
  return String(value).padStart(2, '0');
}

function dateKey(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function formatDateTime(date: Date, time: string) {
  return `${dateKey(date)} ${time || '00:00:00'}`;
}

function parseDate(value?: string) {
  if (!value) return undefined;
  const normalized = value.replace(' ', 'T');
  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

function parseTime(value?: string) {
  if (!value) return '00:00:00';
  const match = value.match(/(?:\s|T)(\d{2}:\d{2})(?::(\d{2}))?/);
  if (!match) return '00:00:00';
  return `${match[1]}:${match[2] ?? '00'}`;
}

function monthStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function addYears(date: Date, amount: number) {
  return new Date(date.getFullYear() + amount, date.getMonth(), 1);
}

function sameDay(a?: Date, b?: Date) {
  return Boolean(a && b && dateKey(a) === dateKey(b));
}

function isBeforeDay(a: Date, b: Date) {
  return dateKey(a) < dateKey(b);
}

function isAfterDay(a: Date, b: Date) {
  return dateKey(a) > dateKey(b);
}

function createCalendarCells(panelDate: Date): CalendarCell[] {
  const start = monthStart(panelDate);
  const firstCell = new Date(start);
  firstCell.setDate(start.getDate() - start.getDay());
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(firstCell);
    date.setDate(firstCell.getDate() + index);
    return { date, inView: date.getMonth() === panelDate.getMonth(), key: dateKey(date) };
  });
}

function formatPanelTitle(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;
}

function formatDisplay(value?: string, showTime?: boolean | Record<string, unknown>) {
  const date = parseDate(value);
  if (!date) return value;
  return showTime ? formatDateTime(date, parseTime(value)) : dateKey(date);
}

function normalizeValue(date?: Date, time = '00:00:00', showTime?: boolean | Record<string, unknown>) {
  if (!date) return undefined;
  return showTime ? formatDateTime(date, time) : dateKey(date);
}

function PickerSuffix({ canClear, clearLabel, onClear }: { canClear: boolean; clearLabel: string; onClear: (event: React.MouseEvent) => void }) {
  return (
    <span className={cn('app-picker-suffix', canClear && 'has-clear')}>
      <CalendarDays className="app-picker-calendar-icon size-4" />
      {canClear ? <span aria-label={clearLabel} className="app-picker-clear" role="button" tabIndex={-1} onClick={onClear}><X className="size-3.5" /></span> : null}
    </span>
  );
}

function CalendarPanel({ draftDate, panelDate, rangeEnd, rangeStart, selectedDate, setPanelDate, setSelectedDate }: { draftDate?: Date; panelDate: Date; rangeEnd?: Date; rangeStart?: Date; selectedDate?: Date; setPanelDate: (date: Date) => void; setSelectedDate: (date: Date) => void }) {
  const today = new Date();
  const cells = createCalendarCells(panelDate);

  return (
    <div className="app-picker-calendar">
      <div className="app-picker-panel-header">
        <button className="app-picker-nav-button" type="button" onClick={() => setPanelDate(addYears(panelDate, -1))}><ChevronsLeft className="size-4" /></button>
        <button className="app-picker-nav-button" type="button" onClick={() => setPanelDate(addMonths(panelDate, -1))}><ChevronLeft className="size-4" /></button>
        <span className="app-picker-title">{formatPanelTitle(panelDate)}</span>
        <button className="app-picker-nav-button" type="button" onClick={() => setPanelDate(addMonths(panelDate, 1))}><ChevronRight className="size-4" /></button>
        <button className="app-picker-nav-button" type="button" onClick={() => setPanelDate(addYears(panelDate, 1))}><ChevronsRight className="size-4" /></button>
      </div>
      <div className="app-picker-week-row">{weekDays.map((day) => <span key={day}>{day}</span>)}</div>
      <div className="app-picker-date-grid">
        {cells.map((cell) => {
          const inRange = rangeStart && rangeEnd && !isBeforeDay(cell.date, rangeStart) && !isAfterDay(cell.date, rangeEnd);
          const isRangeStart = sameDay(cell.date, rangeStart);
          const isRangeEnd = sameDay(cell.date, rangeEnd);
          return (
            <button
              className={cn('app-picker-cell', !cell.inView && 'is-out-view', sameDay(cell.date, today) && 'is-today', sameDay(cell.date, selectedDate ?? draftDate) && 'is-selected', inRange && 'is-in-range', isRangeStart && 'is-range-start', isRangeEnd && 'is-range-end')}
              key={cell.key}
              type="button"
              onClick={() => setSelectedDate(cell.date)}
            >
              <span>{cell.date.getDate()}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TimeInput({ disabled, onChange, value }: { disabled?: boolean; onChange: (value: string) => void; value: string }) {
  return <input className="app-picker-time-input" disabled={disabled} step="1" type="time" value={value.slice(0, 5)} onChange={(event) => onChange(`${event.target.value || '00:00'}:00`)} />;
}

function DatePickerPanel({ onCancel, onConfirm, showTime, value }: { onCancel: () => void; onConfirm: (value: DatePickerValue) => void; showTime?: boolean | Record<string, unknown>; value?: string }) {
  const { t } = useI18n();
  const initialDate = parseDate(value) ?? new Date();
  const [panelDate, setPanelDate] = React.useState(monthStart(initialDate));
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(parseDate(value));
  const [time, setTime] = React.useState(parseTime(value));

  return (
    <div className="app-picker-panel">
      <CalendarPanel draftDate={initialDate} panelDate={panelDate} selectedDate={selectedDate} setPanelDate={setPanelDate} setSelectedDate={setSelectedDate} />
      {showTime ? <div className="app-picker-time-row"><span>{t('componentExamples.dates.dateTimeLabel')}</span><TimeInput value={time} onChange={setTime} /></div> : null}
      <div className="app-picker-actions"><Button type="default" onClick={onCancel}>{t('common.cancel')}</Button><Button type="primary" onClick={() => onConfirm(normalizeValue(selectedDate, time, showTime))}>{t('common.confirm')}</Button></div>
    </div>
  );
}

function RangePickerPanel({ onCancel, onConfirm, showTime, value }: { onCancel: () => void; onConfirm: (value: RangePickerValue) => void; showTime?: boolean | Record<string, unknown>; value?: RangePickerValue }) {
  const { t } = useI18n();
  const initialStart = parseDate(value?.[0]) ?? new Date();
  const [panelDate, setPanelDate] = React.useState(monthStart(initialStart));
  const [startDate, setStartDate] = React.useState<Date | undefined>(parseDate(value?.[0]));
  const [endDate, setEndDate] = React.useState<Date | undefined>(parseDate(value?.[1]));
  const [startTime, setStartTime] = React.useState(parseTime(value?.[0]));
  const [endTime, setEndTime] = React.useState(parseTime(value?.[1]));

  function selectRangeDate(date: Date) {
    if (!startDate || endDate || isBeforeDay(date, startDate)) {
      setStartDate(date);
      setEndDate(undefined);
      return;
    }
    setEndDate(date);
  }

  const normalizedStart = startDate && endDate && isAfterDay(startDate, endDate) ? endDate : startDate;
  const normalizedEnd = startDate && endDate && isAfterDay(startDate, endDate) ? startDate : endDate;

  return (
    <div className="app-picker-panel app-picker-panel-range">
      <div className="app-picker-range-calendars">
        <CalendarPanel panelDate={panelDate} rangeEnd={normalizedEnd} rangeStart={normalizedStart} selectedDate={normalizedStart} setPanelDate={setPanelDate} setSelectedDate={selectRangeDate} />
        <CalendarPanel panelDate={addMonths(panelDate, 1)} rangeEnd={normalizedEnd} rangeStart={normalizedStart} selectedDate={normalizedEnd} setPanelDate={(date) => setPanelDate(addMonths(date, -1))} setSelectedDate={selectRangeDate} />
      </div>
      {showTime ? <div className="app-picker-range-time-row"><label><span>{t('componentExamples.dates.dateLabel')}</span><TimeInput value={startTime} onChange={setStartTime} /></label><label><span>{t('componentExamples.dates.dateTimeLabel')}</span><TimeInput value={endTime} onChange={setEndTime} /></label></div> : null}
      <div className="app-picker-actions"><Button type="default" onClick={onCancel}>{t('common.cancel')}</Button><Button type="primary" onClick={() => onConfirm(normalizedStart && normalizedEnd ? [normalizeValue(normalizedStart, startTime, showTime)!, normalizeValue(normalizedEnd, endTime, showTime)!] : undefined)}>{t('common.confirm')}</Button></div>
    </div>
  );
}

export function DatePicker({ allowClear = false, className, disabled = false, onChange, placeholder, showTime, value, width = '277px' }: DatePickerProps) {
  const { t } = useI18n();
  const [innerValue, setInnerValue] = React.useState<DatePickerValue>();
  const [open, setOpen] = React.useState(false);
  const pickerRef = React.useRef<HTMLSpanElement | null>(null);
  const selectedValue = value === undefined ? innerValue : value;
  const displayPlaceholder = placeholder ?? t('common.selectPlaceholder');
  const closePanel = React.useCallback(() => setOpen(false), []);
  useOutsideClose(open, pickerRef, closePanel);

  function emit(nextValue: DatePickerValue) {
    setInnerValue(nextValue);
    onChange?.(nextValue);
  }

  const canClear = Boolean(allowClear && selectedValue && !disabled);

  return (
    <span ref={pickerRef} className="app-picker-root" style={{ '--control-width': resolveSize(width) } as React.CSSProperties}>
      <button className={cn('app-picker', open && 'is-open', disabled && 'is-disabled', className)} disabled={disabled} type="button" onClick={() => !disabled && setOpen((value) => !value)}>
        <span className={cn('app-picker-input', !selectedValue && 'common-select-placeholder')}>{formatDisplay(selectedValue, showTime) || displayPlaceholder}</span>
        <PickerSuffix canClear={canClear} clearLabel={t('common.clear')} onClear={(event) => { event.stopPropagation(); emit(undefined); }} />
      </button>
      {open ? <div className="app-picker-dropdown app-picker-floating-panel"><DatePickerPanel showTime={showTime} value={selectedValue} onCancel={() => setOpen(false)} onConfirm={(nextValue) => { emit(nextValue); setOpen(false); }} /></div> : null}
    </span>
  );
}

export function RangePicker({ allowClear = false, className, disabled = false, onChange, placeholder, showTime, value, width = '277px' }: RangePickerProps) {
  const { t } = useI18n();
  const [innerValue, setInnerValue] = React.useState<RangePickerValue>();
  const [open, setOpen] = React.useState(false);
  const pickerRef = React.useRef<HTMLSpanElement | null>(null);
  const selectedValue = value === undefined ? innerValue : value;
  const placeholders = placeholder ?? [t('common.selectPlaceholder'), t('common.selectPlaceholder')];
  const closePanel = React.useCallback(() => setOpen(false), []);
  useOutsideClose(open, pickerRef, closePanel);

  function emit(nextValue: RangePickerValue) {
    setInnerValue(nextValue);
    onChange?.(nextValue);
  }

  const canClear = Boolean(allowClear && selectedValue && !disabled);

  return (
    <span ref={pickerRef} className="app-picker-root" style={{ '--control-width': resolveSize(width) } as React.CSSProperties}>
      <button className={cn('app-picker', open && 'is-open', disabled && 'is-disabled', className)} disabled={disabled} type="button" onClick={() => !disabled && setOpen((value) => !value)}>
        <span className="app-picker-range-inputs">
          <span className={cn('app-picker-input', !selectedValue?.[0] && 'common-select-placeholder')}>{formatDisplay(selectedValue?.[0], showTime) || placeholders[0]}</span>
          <span className="app-picker-separator">-</span>
          <span className={cn('app-picker-input', !selectedValue?.[1] && 'common-select-placeholder')}>{formatDisplay(selectedValue?.[1], showTime) || placeholders[1]}</span>
        </span>
        <PickerSuffix canClear={canClear} clearLabel={t('common.clear')} onClear={(event) => { event.stopPropagation(); emit(undefined); }} />
      </button>
      {open ? <div className="app-picker-dropdown app-picker-dropdown-range app-picker-floating-panel"><RangePickerPanel showTime={showTime} value={selectedValue} onCancel={() => setOpen(false)} onConfirm={(nextValue) => { emit(nextValue); setOpen(false); }} /></div> : null}
    </span>
  );
}

export function LabelDatePicker({ className, disabled, label, width = 240, ...props }: LabelDatePickerProps) {
  return <div className={cn('label-picker', disabled && 'is-disabled', className)} style={{ '--control-width': resolveSize(width) } as React.CSSProperties}><span className="label-picker-text">{label}：</span><DatePicker {...props} disabled={disabled} width="100%" /></div>;
}

export function LabelRangePicker({ className, disabled, label, width = 277, ...props }: LabelRangePickerProps) {
  return <div className={cn('label-picker', disabled && 'is-disabled', className)} style={{ '--control-width': resolveSize(width) } as React.CSSProperties}><span className="label-picker-text">{label}：</span><RangePicker {...props} disabled={disabled} width="100%" /></div>;
}
