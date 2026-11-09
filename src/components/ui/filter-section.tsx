'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/locales';

export interface FilterSectionProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  actions?: React.ReactNode;
  collapsedRows?: number;
  onSubmit?: () => void;
}

export function FilterSection({ actions, children, className, collapsedRows = 1, onSubmit, ...props }: FilterSectionProps) {
  const { t } = useI18n();
  const gridRef = React.useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = React.useState(false);
  const [canToggle, setCanToggle] = React.useState(false);
  const [collapsedHeight, setCollapsedHeight] = React.useState<number>();

  const measureRows = React.useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const childrenElements = Array.from(grid.children).filter((child): child is HTMLElement => child instanceof HTMLElement && child.offsetParent !== null);
    if (!childrenElements.length) {
      setCanToggle(false);
      setCollapsedHeight(undefined);
      return;
    }

    const gridTop = grid.getBoundingClientRect().top;
    const bottomPadding = Number.parseFloat(window.getComputedStyle(grid).paddingBottom) || 0;
    const rowTops = Array.from(new Set(childrenElements.map((child) => Math.round(child.getBoundingClientRect().top - gridTop)))).sort((a, b) => a - b);
    const nextCanToggle = rowTops.length > collapsedRows;
    setCanToggle(nextCanToggle);

    if (!nextCanToggle) {
      setExpanded(false);
      setCollapsedHeight(undefined);
      return;
    }

    const visibleRowTops = new Set(rowTops.slice(0, collapsedRows));
    const nextHeight = Math.max(...childrenElements
      .map((child) => {
        const rect = child.getBoundingClientRect();
        const top = Math.round(rect.top - gridTop);
        return { bottom: Math.ceil(rect.bottom - gridTop), top };
      })
      .filter((child) => visibleRowTops.has(child.top))
      .map((child) => child.bottom)) + Math.ceil(bottomPadding);
    setCollapsedHeight(nextHeight);
  }, [collapsedRows]);

  React.useLayoutEffect(() => {
    measureRows();
    const grid = gridRef.current;
    if (!grid) return undefined;

    const observer = new ResizeObserver(measureRows);
    observer.observe(grid);
    window.addEventListener('resize', measureRows);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measureRows);
    };
  }, [children, measureRows]);

  return (
    <form
      {...props}
      className={cn('filter-section', className)}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.();
      }}
    >
      <div
        ref={gridRef}
        className={cn('filter-section-grid', !expanded && canToggle && 'is-collapsed')}
        style={!expanded && canToggle && collapsedHeight ? { maxHeight: `${collapsedHeight}px` } : undefined}
      >
        {children}
      </div>
      <div className="filter-section-footer">
        <div className="filter-section-actions">{actions}</div>
        {canToggle ? (
          <button aria-expanded={expanded} className="filter-toggle-button" type="button" onClick={() => setExpanded((value) => !value)}>
            <span>{expanded ? t('common.collapse') : t('common.expand')}</span>
            {expanded ? <ChevronUp aria-hidden="true" className="filter-toggle-icon" /> : <ChevronDown aria-hidden="true" className="filter-toggle-icon" />}
          </button>
        ) : null}
      </div>
    </form>
  );
}
