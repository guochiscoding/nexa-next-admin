'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronsLeft, ChevronsRight, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { templateNavigationConfig } from '@/config/navigation';
import type { NavigationItem } from '@/config/navigation';
import { useApp } from '@/context/AppProvider';
import { useI18n } from '@/locales';
import { MenuIcon } from '@/layouts/app/MenuIcon';
import { isActiveNavigationItem } from '@/layouts/app/navigation';

export function SideNavigation({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();
  const { auth } = useApp();
  const { t } = useI18n();
  const userName = auth.user?.nickname || auth.user?.username || t('menu.administrator');
  const userRealName = auth.user?.real_name || auth.user?.username || t('menu.administrator');
  const avatarLabel = userName.trim().slice(0, 1).toUpperCase();
  const [flyout, setFlyout] = useState<{ item: NavigationItem; left: number; top: number } | null>(null);

  function openFlyout(source: HTMLElement, item: NavigationItem) {
    if (!collapsed || !item.children?.length) return;
    const rect = source.getBoundingClientRect();
    setFlyout({ item, left: rect.right + 8, top: rect.top });
  }

  function closeFlyout() {
    setFlyout(null);
  }

  return (
    <nav className={`navigation-shell ${collapsed ? 'is-collapsed' : 'is-expanded'}`} aria-label={t('menu.navigation')}>
      <span className={`navigation-caption ${collapsed ? 'is-collapsed' : ''}`}>{t('menu.navigation')}</span>
      <div className="navigation-menu">
        {templateNavigationConfig.map((item) => {
          const active = isActiveNavigationItem(pathname, item);
          const hasChildren = Boolean(item.children?.length);
          return (
            <div className="navigation-group" key={item.name} onMouseEnter={(event) => openFlyout(event.currentTarget, item)} onMouseLeave={closeFlyout} onFocus={(event) => openFlyout(event.currentTarget, item)}>
              <Link aria-current={active ? 'page' : undefined} className={`navigation-link ${active ? 'is-active' : ''} ${hasChildren ? 'has-children' : ''}`} href={item.path} title={collapsed ? t(item.titleKey) : undefined}>
                <MenuIcon name={item.iconName} />
                <span className="navigation-label">{t(item.titleKey)}</span>
                {hasChildren ? <span className="navigation-expand-icon">{!collapsed && active ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}</span> : null}
              </Link>
              {!collapsed && item.children?.length ? (
                <div className="navigation-children">
                  {item.children.map((child) => {
                    const childActive = isActiveNavigationItem(pathname, child);
                    return <Link aria-current={childActive ? 'page' : undefined} className={`navigation-child-link ${childActive ? 'is-active' : ''}`} href={child.path} key={child.name}>{t(child.titleKey)}</Link>;
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      {collapsed && flyout?.item.children?.length ? (
        <div className="navigation-flyout is-open" role="menu" style={{ left: `${flyout.left}px`, top: `${flyout.top}px` }} onMouseEnter={() => setFlyout(flyout)} onMouseLeave={closeFlyout}>
          {flyout.item.children.map((child) => {
            const childActive = isActiveNavigationItem(pathname, child);
            return <Link aria-current={childActive ? 'page' : undefined} className={`navigation-flyout-link ${childActive ? 'is-active' : ''}`} href={child.path} key={child.name} role="menuitem">{t(child.titleKey)}</Link>;
          })}
        </div>
      ) : null}
      <footer className={`navigation-footer ${collapsed ? 'is-collapsed' : ''}`}>
        <span className="navigation-avatar">{avatarLabel}</span>
        <span className="navigation-user"><strong>{userName}</strong><small>{userRealName}</small></span>
        <button aria-label={collapsed ? t('layout.expand') : t('layout.collapse')} className="navigation-toggle" type="button" onClick={onToggle}>{collapsed ? <ChevronsRight className="navigation-toggle-icon" /> : <ChevronsLeft className="navigation-toggle-icon" />}</button>
      </footer>
    </nav>
  );
}
