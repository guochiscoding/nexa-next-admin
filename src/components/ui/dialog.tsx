'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({ children, className, title }: { children: React.ReactNode; className?: string; title?: string }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/45" />
      <DialogPrimitive.Content className={cn('fixed left-1/2 top-1/2 z-50 grid w-[min(520px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-md border border-[var(--component-border)] bg-[var(--bg-color-container)] p-5 shadow-xl', className)}>
        {title ? <DialogPrimitive.Title className="text-base font-semibold">{title}</DialogPrimitive.Title> : null}
        {children}
        <DialogPrimitive.Close className="absolute right-3 top-3 rounded p-1 hover:bg-[var(--bg-color-container-hover)]"><X className="size-4" /></DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
