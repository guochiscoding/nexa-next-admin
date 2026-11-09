export type DemoPermissionResourceType = 'module' | 'page';

export interface RouteDefinition {
  children?: readonly RouteDefinition[];
  iconName?: string;
  key: string;
  name: string;
  nav?: boolean;
  path: string;
  permission?: string;
  public?: boolean;
  sort: number;
  titleKey: string;
  type?: DemoPermissionResourceType;
}

export const routeDefinitions = [
  { iconName: 'overview', key: 'home', name: 'Home', nav: true, path: '/', permission: 'demo.home', sort: 10, titleKey: 'menu.home', type: 'module' },
  { iconName: 'data-table', key: 'table-example', name: 'tableExample', nav: true, path: '/table-example', permission: 'demo.table', sort: 20, titleKey: 'menu.tableExample', type: 'module' },
  { iconName: 'project-intro', key: 'project-intro', name: 'projectIntro', nav: true, path: '/project-intro', permission: 'demo.project-intro', sort: 25, titleKey: 'menu.projectIntro', type: 'module' },
  {
    children: [
      { key: 'page-templates/advanced-list', name: 'templateAdvancedList', nav: true, path: '/page-templates/advanced-list', permission: 'demo.templates.advanced-list', sort: 5, titleKey: 'menu.templateAdvancedList' },
      { key: 'page-templates/basic-form', name: 'templateBasicForm', nav: true, path: '/page-templates/basic-form', permission: 'demo.templates.basic-form', sort: 10, titleKey: 'menu.templateBasicForm' },
      { key: 'page-templates/detail', name: 'templateDetail', nav: true, path: '/page-templates/detail', permission: 'demo.templates.detail', sort: 20, titleKey: 'menu.templateDetail' },
      { key: 'page-templates/result', name: 'templateResult', nav: true, path: '/page-templates/result', permission: 'demo.templates.result', sort: 30, titleKey: 'menu.templateResult' },
      { key: 'page-templates/exception', name: 'templateException', nav: true, path: '/page-templates/exception', permission: 'demo.templates.exception', sort: 40, titleKey: 'menu.templateException' },
      { key: 'page-templates/account-center', name: 'templateAccountCenter', nav: true, path: '/page-templates/account-center', permission: 'demo.templates.account-center', sort: 50, titleKey: 'menu.templateAccountCenter' },
      { key: 'page-templates/account-settings', name: 'templateAccountSettings', nav: true, path: '/page-templates/account-settings', permission: 'demo.templates.account-settings', sort: 60, titleKey: 'menu.templateAccountSettings' },
    ],
    iconName: 'page-templates',
    key: 'page-templates',
    name: 'pageTemplates',
    nav: true,
    path: '/page-templates',
    permission: 'demo.templates',
    sort: 28,
    titleKey: 'menu.pageTemplates',
    type: 'module',
  },
  {
    children: [
      { key: 'component-library/buttons', name: 'componentButtons', nav: true, path: '/component-library/buttons', permission: 'demo.components.buttons', sort: 10, titleKey: 'menu.componentButtons' },
      { key: 'component-library/forms', name: 'componentForms', nav: true, path: '/component-library/forms', permission: 'demo.components.forms', sort: 20, titleKey: 'menu.componentForms' },
      { key: 'component-library/dates', name: 'componentDates', nav: true, path: '/component-library/dates', permission: 'demo.components.dates', sort: 30, titleKey: 'menu.componentDates' },
      { key: 'component-library/tabs', name: 'componentTabs', nav: true, path: '/component-library/tabs', permission: 'demo.components.tabs', sort: 40, titleKey: 'menu.componentTabs' },
      { key: 'component-library/radios', name: 'componentRadios', nav: true, path: '/component-library/radios', permission: 'demo.components.radios', sort: 50, titleKey: 'menu.componentRadios' },
      { key: 'component-library/secondary-layout', name: 'componentSecondaryLayout', nav: true, path: '/component-library/secondary-layout', permission: 'demo.components.secondary-layout', sort: 60, titleKey: 'menu.secondaryLayoutDocs' },
    ],
    iconName: 'component-library',
    key: 'component-library',
    name: 'componentLibrary',
    nav: true,
    path: '/component-library',
    permission: 'demo.components',
    sort: 30,
    titleKey: 'menu.componentLibrary',
    type: 'module',
  },
  { key: '401', name: 'unauthorized', path: '/401', public: true, sort: 900, titleKey: 'unauthorized.expiredTitle' },
  { key: '403', name: 'forbidden', path: '/403', public: true, sort: 910, titleKey: 'forbidden.title' },
  { key: 'not-found', name: 'notFound', path: '/404', public: true, sort: 920, titleKey: 'pageTemplates.exception.notFoundTitle' },
] as const satisfies readonly RouteDefinition[];

type TopLevelRoute = (typeof routeDefinitions)[number];
type ChildRoute<T> = T extends { children: readonly (infer Child)[] } ? Child : never;

export type RouteKey = TopLevelRoute['key'] | ChildRoute<TopLevelRoute>['key'];

export function flattenRouteDefinitions(definitions: readonly RouteDefinition[] = routeDefinitions): RouteDefinition[] {
  return definitions.flatMap((definition) => [definition, ...flattenRouteDefinitions(definition.children ?? [])]);
}

export const routeDefinitionList = flattenRouteDefinitions();
export const routeDefinitionByKey = Object.fromEntries(routeDefinitionList.map((route) => [route.key, route])) as Record<RouteKey, RouteDefinition>;
export const routeDefinitionByPath = Object.fromEntries(routeDefinitionList.map((route) => [route.path, route])) as Record<string, RouteDefinition>;

export function getRouteKeyFromSlug(slug?: string[]): RouteKey {
  const path = slug?.length ? `/${slug.join('/')}` : '/';
  return getRouteKeyFromPath(path);
}

export function getRouteKeyFromPath(path: string): RouteKey {
  const route = routeDefinitionByPath[path];
  return route ? route.key as RouteKey : 'not-found';
}

export function isPublicRoute(routeKey: RouteKey) {
  return routeDefinitionByKey[routeKey].public === true;
}
