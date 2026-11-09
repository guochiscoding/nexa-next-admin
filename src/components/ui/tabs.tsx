'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';
import { cn } from '@/lib/utils';

export type TabKey = number | string;

export interface TabItem {
  count?: number;
  disabled?: boolean;
  icon?: React.ReactNode;
  key: TabKey;
  label: string;
}

export interface TabsProps {
  children?: (item: TabItem) => React.ReactNode;
  className?: string;
  defaultValue?: TabKey;
  extra?: React.ReactNode;
  fontSize?: 14 | 16;
  items?: TabItem[];
  onChange?: (key: TabKey) => void;
  value?: TabKey;
}

export function Tabs({ children, className, defaultValue, extra, fontSize = 16, items = [], onChange, value }: TabsProps) {
  const fallbackValue = items[0]?.key;
  const rootProps = value === undefined ? { defaultValue: String(defaultValue ?? fallbackValue ?? '') } : { value: String(value) };

  return (
    <TabsPrimitive.Root {...rootProps} className={cn('app-tabs', fontSize === 14 && 'app-tabs--14', className)} onValueChange={(nextValue) => {
      const matched = items.find((item) => String(item.key) === nextValue);
      onChange?.(matched?.key ?? nextValue);
    }}>
      <div className="flex min-w-0 items-start justify-between gap-4">
        <TabsPrimitive.List className="app-tabs-list">
          {items.map((item) => (
            <TabsPrimitive.Trigger className="app-tabs-trigger" disabled={item.disabled} key={item.key} value={String(item.key)}>
              <span className="app-tabs-label">
                <span className="app-tabs-label-content">{item.icon}<span>{item.label}</span></span>
                {item.count !== undefined ? <span className={cn('app-tabs-count', item.disabled && 'is-disabled')}>{item.count}</span> : null}
              </span>
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>
        {extra ? <div className="shrink-0">{extra}</div> : null}
      </div>
      {items.map((item) => <TabsPrimitive.Content className="app-tabs-content" key={item.key} value={String(item.key)}>{children?.(item)}</TabsPrimitive.Content>)}
    </TabsPrimitive.Root>
  );
}

export function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
  return <TabsPrimitive.List className={cn('app-tabs-list', className)}>{children}</TabsPrimitive.List>;
}

export function TabsTrigger({ children, value }: { children: React.ReactNode; value: string }) {
  return <TabsPrimitive.Trigger className="app-tabs-trigger" value={value}>{children}</TabsPrimitive.Trigger>;
}

export const TabsContent = TabsPrimitive.Content;
