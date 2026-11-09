import { routeDefinitions, routeDefinitionList, type DemoPermissionResourceType, type RouteDefinition } from '@/routes/definitions';

export interface NavigationItem {
  children?: NavigationItem[];
  iconName?: string;
  name: string;
  path: string;
  permission: string;
  sort: number;
  title: string;
  titleKey: string;
  type?: DemoPermissionResourceType;
}

function toNavigationItem(route: RouteDefinition): NavigationItem | null {
  if (!route.nav || !route.permission) return null;
  const children = (route.children ?? []).map(toNavigationItem).filter((item): item is NavigationItem => Boolean(item));
  return {
    children: children.length ? children : undefined,
    iconName: route.iconName,
    name: route.name,
    path: route.path,
    permission: route.permission,
    sort: route.sort,
    title: route.name,
    titleKey: route.titleKey,
    type: route.type,
  };
}

export const templateNavigationConfig = routeDefinitions.map(toNavigationItem).filter((item): item is NavigationItem => Boolean(item));

export const templateNavigationItems = templateNavigationConfig.flatMap((item) => [item, ...(item.children ?? [])]);
export const templatePermissionCodes = routeDefinitionList.map((item) => item.permission).filter((code): code is string => Boolean(code));
export const templatePermissionSignature = templatePermissionCodes.join('|');
