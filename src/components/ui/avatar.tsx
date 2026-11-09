'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';

export function Avatar({ fallback }: { fallback: string }) {
  return <AvatarPrimitive.Root className="inline-flex size-7 items-center justify-center rounded-full bg-[var(--brand-black)] text-xs font-semibold text-white"><AvatarPrimitive.Fallback>{fallback}</AvatarPrimitive.Fallback></AvatarPrimitive.Root>;
}
