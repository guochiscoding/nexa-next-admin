'use client';

import React, { useMemo, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, GripVertical, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useI18n } from '@/locales';

export type RowKey = string | number;

export interface SelectableTableColumn<T extends Record<string, unknown>> {
  align?: 'center' | 'left' | 'right';
  fixed?: 'left' | 'right';
  key: string;
  render?: (value: unknown, record: T, index: number) => React.ReactNode;
  title: React.ReactNode;
  width?: number;
}

export interface RowDragSortPayload<T extends Record<string, unknown>> {
  dataSource: T[];
  sourceRow: T;
  targetRow: T;
}

interface SelectableDataTableProps<T extends Record<string, unknown>> {
  className?: string;
  columns: SelectableTableColumn<T>[];
  current?: number;
  dataSource: T[];
  defaultExpandedRowKeys?: RowKey[];
  emptyText?: string;
  expandable?: boolean;
  expandedRowRender?: (record: T) => React.ReactNode;
  onPageChange?: (payload: { current: number; pageSize: number }) => void;
  onRowDragSort?: (payload: RowDragSortPayload<T>) => void;
  onSelectedRowKeysChange?: (keys: RowKey[]) => void;
  pageSize?: number;
  pageSizeOptions?: number[];
  rowDraggable?: boolean;
  rowKey?: keyof T | string;
  selectable?: boolean;
  selectedRowKeys?: RowKey[];
  showFooter?: boolean;
  showSelectionActions?: boolean;
  toolbar?: React.ReactNode;
  total?: number;
}

function clampPage(page: number, totalPages: number) {
  return Math.min(Math.max(page, 1), Math.max(totalPages, 1));
}

function createPageNumbers(current: number, totalPages: number) {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1);
  const pages = new Set([1, totalPages, current, current - 1, current + 1].filter((page) => page >= 1 && page <= totalPages));
  return Array.from(pages).sort((a, b) => a - b).reduce<(number | '...')[]>((result, page) => {
    const previous = result[result.length - 1];
    if (typeof previous === 'number' && page - previous > 1) result.push('...');
    result.push(page);
    return result;
  }, []);
}

export function SelectableDataTable<T extends Record<string, unknown>>({
  className,
  columns,
  current,
  dataSource,
  defaultExpandedRowKeys = [],
  emptyText,
  expandable,
  expandedRowRender,
  onPageChange,
  onRowDragSort,
  onSelectedRowKeysChange,
  pageSize,
  pageSizeOptions = [10, 20, 50],
  rowDraggable,
  rowKey = 'id',
  selectable,
  selectedRowKeys,
  showFooter = true,
  showSelectionActions = true,
  toolbar,
  total,
}: SelectableDataTableProps<T>) {
  const { t } = useI18n();
  const [innerCurrent, setInnerCurrent] = useState(current ?? 1);
  const [innerPageSize, setInnerPageSize] = useState(pageSize ?? 10);
  const [jumpPage, setJumpPage] = useState('');
  const [innerSelectedKeys, setInnerSelectedKeys] = useState<RowKey[]>(selectedRowKeys ?? []);
  const [expandedKeys, setExpandedKeys] = useState<RowKey[]>(defaultExpandedRowKeys);
  const [draggedKey, setDraggedKey] = useState<RowKey | null>(null);

  const effectiveCurrent = current ?? innerCurrent;
  const effectivePageSize = pageSize ?? innerPageSize;
  const effectiveTotal = total ?? dataSource.length;
  const totalPages = Math.max(1, Math.ceil(effectiveTotal / effectivePageSize));
  const currentPage = clampPage(effectiveCurrent, totalPages);
  const effectiveSelectedKeys = selectedRowKeys ?? innerSelectedKeys;

  const getRecordKey = React.useCallback((record: T): RowKey => {
    const key = record[rowKey];
    return typeof key === 'number' || typeof key === 'string' ? key : String(key ?? '');
  }, [rowKey]);

  const pagedData = useMemo(() => {
    if (!showFooter) return dataSource;
    const start = (currentPage - 1) * effectivePageSize;
    return dataSource.slice(start, start + effectivePageSize);
  }, [currentPage, dataSource, effectivePageSize, showFooter]);

  const currentPageKeys = useMemo(() => pagedData.map(getRecordKey), [getRecordKey, pagedData]);
  const allCurrentPageSelected = currentPageKeys.length > 0 && currentPageKeys.every((key) => effectiveSelectedKeys.includes(key));
  const someCurrentPageSelected = currentPageKeys.some((key) => effectiveSelectedKeys.includes(key));

  function emitPageChange(nextCurrent: number, nextPageSize = effectivePageSize) {
    const normalizedPage = clampPage(nextCurrent, Math.ceil(effectiveTotal / nextPageSize));
    setInnerCurrent(normalizedPage);
    setInnerPageSize(nextPageSize);
    setJumpPage('');
    onPageChange?.({ current: normalizedPage, pageSize: nextPageSize });
  }

  function handleJump() {
    const targetPage = Number(jumpPage);
    if (!Number.isFinite(targetPage) || targetPage < 1) {
      setJumpPage('');
      return;
    }
    emitPageChange(targetPage);
  }

  function emitSelectedKeys(keys: RowKey[]) {
    setInnerSelectedKeys(keys);
    onSelectedRowKeysChange?.(keys);
  }

  function toggleRowSelection(key: RowKey) {
    emitSelectedKeys(effectiveSelectedKeys.includes(key)
      ? effectiveSelectedKeys.filter((item) => item !== key)
      : [...effectiveSelectedKeys, key]);
  }

  function selectCurrentPage() {
    emitSelectedKeys(Array.from(new Set([...effectiveSelectedKeys, ...currentPageKeys])));
  }

  function invertCurrentPage() {
    const next = new Set(effectiveSelectedKeys);
    currentPageKeys.forEach((key) => {
      if (next.has(key)) next.delete(key);
      else next.add(key);
    });
    emitSelectedKeys(Array.from(next));
  }

  function toggleCurrentPageSelection() {
    if (allCurrentPageSelected) {
      emitSelectedKeys(effectiveSelectedKeys.filter((key) => !currentPageKeys.includes(key)));
      return;
    }
    selectCurrentPage();
  }

  function toggleExpanded(key: RowKey) {
    setExpandedKeys((keys) => keys.includes(key) ? keys.filter((item) => item !== key) : [...keys, key]);
  }

  function handleDrop(targetRecord: T) {
    if (draggedKey === null) return;
    const sourceIndex = dataSource.findIndex((item) => getRecordKey(item) === draggedKey);
    const targetIndex = dataSource.findIndex((item) => getRecordKey(item) === getRecordKey(targetRecord));
    if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) {
      setDraggedKey(null);
      return;
    }

    const nextRows = [...dataSource];
    const [sourceRow] = nextRows.splice(sourceIndex, 1);
    nextRows.splice(targetIndex, 0, sourceRow);
    onRowDragSort?.({ dataSource: nextRows, sourceRow, targetRow: targetRecord });
    setDraggedKey(null);
  }

  const tableColumnCount = columns.length + (selectable ? 1 : 0) + (rowDraggable ? 1 : 0) + (expandable ? 1 : 0);

  return (
    <div className={`selectable-data-table ${className ?? ''}`}>
      {toolbar ? <div className="table-toolbar">{toolbar}</div> : null}
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              {selectable ? <th className="selection-cell"><Checkbox checked={allCurrentPageSelected} indeterminate={someCurrentPageSelected && !allCurrentPageSelected} onCheckedChange={toggleCurrentPageSelection} /></th> : null}
              {rowDraggable ? <th className="w-12" /> : null}
              {expandable ? <th className="w-12" /> : null}
              {columns.map((column) => (
                <th key={column.key} style={{ textAlign: column.align, width: column.width }}>{column.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pagedData.length ? pagedData.flatMap((record, index) => {
              const key = getRecordKey(record);
              const isExpanded = expandedKeys.includes(key);
              return [
                <tr
                  draggable={rowDraggable}
                  key={key}
                  onDragOver={(event) => event.preventDefault()}
                  onDragStart={() => setDraggedKey(key)}
                  onDrop={() => handleDrop(record)}
                >
                  {selectable ? <td className="selection-cell"><Checkbox checked={effectiveSelectedKeys.includes(key)} onCheckedChange={() => toggleRowSelection(key)} /></td> : null}
                  {rowDraggable ? <td><GripVertical className="size-4 cursor-grab text-[var(--Font-Black-Gy3)]" /></td> : null}
                  {expandable ? <td><Button icon={isExpanded ? <Minus className="size-4" /> : <Plus className="size-4" />} size="icon" type="text" onClick={() => toggleExpanded(key)} /></td> : null}
                  {columns.map((column) => {
                    const value = record[column.key];
                    return <td key={column.key} style={{ textAlign: column.align }}>{column.render ? column.render(value, record, index) : String(value ?? '--')}</td>;
                  })}
                </tr>,
                isExpanded && expandedRowRender ? <tr key={`${key}-expanded`}><td colSpan={tableColumnCount}>{expandedRowRender(record)}</td></tr> : null,
              ];
            }) : (
              <tr><td className="text-center text-[var(--Font-Black-Gy3)]" colSpan={tableColumnCount}>{emptyText ?? t('table.emptyText')}</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {showFooter ? (
        <footer className="table-footer">
          {showSelectionActions ? (
            <div className="selection-actions">
              <button className="selection-action-btn" disabled={!selectable} type="button" onClick={selectCurrentPage}>{t('table.selectCurrentPage')}</button>
              <button className="selection-action-btn" disabled={!selectable} type="button" onClick={invertCurrentPage}>{t('table.invertCurrentPage')}</button>
            </div>
          ) : <span />}
          <div className="pagination-controls">
            <span className="total-text">{t('table.total', { total: effectiveTotal })}</span>
            <button aria-label={t('table.previousPage')} className="page-icon-btn" disabled={currentPage <= 1} type="button" onClick={() => emitPageChange(currentPage - 1)}><ChevronLeft className="size-4" /></button>
            {createPageNumbers(currentPage, totalPages).map((page, index) => page === '...'
              ? <span className="page-ellipsis" key={`ellipsis-${index}`}>...</span>
              : <button className={`page-number-btn ${page === currentPage ? 'is-active' : ''}`} key={page} type="button" onClick={() => emitPageChange(page)}>{page}</button>)}
            <button aria-label={t('table.nextPage')} className="page-icon-btn" disabled={currentPage >= totalPages} type="button" onClick={() => emitPageChange(currentPage + 1)}><ChevronRight className="size-4" /></button>
            <div className="page-size-wrapper"><select className="page-size-select" value={effectivePageSize} onChange={(event) => emitPageChange(1, Number(event.target.value))}>{pageSizeOptions.map((size) => <option key={size} value={size}>{t('table.pageSize', { size })}</option>)}</select><ChevronDown aria-hidden="true" className="page-size-icon size-4" /></div>
            <span className="jump-label">{t('table.jumpTo')}</span>
            <input aria-label={t('table.jumpPageInput')} className="jump-input" inputMode="numeric" value={jumpPage} onBlur={handleJump} onChange={(event) => setJumpPage(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') handleJump(); }} />
          </div>
        </footer>
      ) : null}
    </div>
  );
}
