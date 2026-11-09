'use client';

import * as React from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ButtonType = 'default' | 'ghost-gray' | 'ghost-white' | 'link' | 'outline' | 'primary' | 'solid' | 'text';
export type ButtonColorType = 'black' | 'blue' | 'red';
export type ButtonSize = 'default' | 'icon' | 'large' | 'lg' | 'medium' | 'small' | 'sm';
type NativeButtonType = 'button' | 'reset' | 'submit';

interface ButtonAppearance {
  colorType: ButtonColorType;
  type: ButtonType;
}

const sizeClassBySize: Record<ButtonSize, string> = {
  default: 'app-button--medium',
  icon: 'app-button--icon',
  large: 'app-button--large',
  lg: 'app-button--large',
  medium: 'app-button--medium',
  small: 'app-button--small',
  sm: 'app-button--small',
};

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'type'> {
  colorType?: ButtonColorType;
  hasPermission?: boolean;
  href?: string;
  htmlType?: NativeButtonType;
  icon?: React.ReactNode;
  loading?: boolean;
  size?: ButtonSize;
  suffixIcon?: React.ReactNode;
  type?: ButtonType;
}

function resolveButtonAppearance(type: ButtonProps['type'] = 'default', colorType: ButtonColorType = 'black'): ButtonAppearance {
  return { colorType, type };
}

export function Button({ className, children, colorType, disabled = false, hasPermission = true, href, htmlType = 'button', icon, loading = false, size = 'medium', suffixIcon, type = 'default', onClick, ...props }: ButtonProps) {
  const appearance = resolveButtonAppearance(type, colorType);
  const isDisabled = disabled || loading;
  const classes = cn(
    'app-button',
    `app-button--${appearance.type}`,
    `app-button-color--${appearance.colorType}`,
    sizeClassBySize[size],
    loading && 'is-loading',
    className,
  );

  if (!hasPermission) return null;

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (isDisabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event as React.MouseEvent<HTMLButtonElement>);
  }

  const content = (
    <span className="app-button-content">
      {loading || icon ? <span className="app-button-icon" aria-hidden="true">{loading ? <Loader2 className="app-button-spinner" /> : icon}</span> : null}
      {children ? <span className="app-button-label">{children}</span> : null}
      {suffixIcon ? <span className="app-button-icon app-button-suffix-icon" aria-hidden="true">{suffixIcon}</span> : null}
    </span>
  );

  if (href) {
    return <Link aria-disabled={isDisabled || undefined} className={classes} href={href} onClick={handleClick} tabIndex={isDisabled ? -1 : undefined}>{content}</Link>;
  }

  return <button aria-busy={loading || undefined} className={classes} disabled={isDisabled} type={htmlType} onClick={handleClick} {...props}>{content}</button>;
}
