'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export function DropdownMenuContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content align="end" className={cn('z-50 min-w-40 rounded-md border border-[var(--component-border)] bg-[var(--bg-color-container)] p-1 text-sm shadow-lg', className)} sideOffset={6}>
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}

export function DropdownMenuItem({ children, className, onSelect }: { children: React.ReactNode; className?: string; onSelect?: () => void }) {
  return <DropdownMenuPrimitive.Item className={cn('flex h-8 cursor-pointer select-none items-center gap-2 rounded px-2 outline-none data-[highlighted]:bg-[var(--bg-color-container-hover)]', className)} onSelect={onSelect}>{children}</DropdownMenuPrimitive.Item>;
}

export function DropdownMenuCheckboxItem({ checked, children, onCheckedChange }: { checked?: boolean; children: React.ReactNode; onCheckedChange?: (checked: boolean) => void }) {
  return (
    <DropdownMenuPrimitive.CheckboxItem checked={checked} className="relative flex h-8 cursor-pointer select-none items-center rounded px-8 outline-none data-[highlighted]:bg-[var(--bg-color-container-hover)]" onCheckedChange={onCheckedChange}>
      <span className="absolute left-2"><DropdownMenuPrimitive.ItemIndicator><Check className="size-4" /></DropdownMenuPrimitive.ItemIndicator></span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}
