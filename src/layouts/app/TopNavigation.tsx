'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { templateNavigationConfig } from '@/config/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useI18n } from '@/locales';
import { MenuIcon } from '@/layouts/app/MenuIcon';
import { isActiveNavigationItem } from '@/layouts/app/navigation';

export function TopNavigation() {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <nav className="top-navigation" aria-label={t('menu.navigation')}>
      {templateNavigationConfig.map((item) => {
        const active = isActiveNavigationItem(pathname, item);
        const children = item.children?.map((child) => ({ key: child.path, label: <Link href={child.path}>{t(child.titleKey)}</Link> }));

        if (children?.length) {
          return (
            <DropdownMenu key={item.name}>
              <DropdownMenuTrigger asChild>
                <Link className={`top-nav-link ${active ? 'is-active' : ''}`} href={item.path}>
                  <MenuIcon name={item.iconName} />
                  {t(item.titleKey)}
                </Link>
              </DropdownMenuTrigger>
              <DropdownMenuContent>{children.map((child) => <DropdownMenuItem key={child.key}>{child.label}</DropdownMenuItem>)}</DropdownMenuContent>
            </DropdownMenu>
          );
        }

        return (
          <Link key={item.name} className={`top-nav-link ${active ? 'is-active' : ''}`} href={item.path}>
            <MenuIcon name={item.iconName} />
            {t(item.titleKey)}
          </Link>
        );
      })}
    </nav>
  );
}
