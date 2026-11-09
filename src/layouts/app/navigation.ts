import type { NavigationItem } from '@/config/navigation';

export function isActiveNavigationItem(pathname: string, item: NavigationItem) {
  if (item.path === '/') return pathname === '/';
  return pathname === item.path || pathname.startsWith(`${item.path}/`);
}
