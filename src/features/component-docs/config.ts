import type { ComponentDocKey, ComponentUsageKey } from '@/features/component-docs/types';
import type { RouteKey } from '@/routes/definitions';

export const componentDocEntries: { key: ComponentDocKey; path: string }[] = [
  { key: 'buttons', path: '/component-library/buttons' },
  { key: 'forms', path: '/component-library/forms' },
  { key: 'dates', path: '/component-library/dates' },
  { key: 'tabs', path: '/component-library/tabs' },
  { key: 'radios', path: '/component-library/radios' },
  { key: 'secondaryLayout', path: '/component-library/secondary-layout' },
];

export const componentDocUsageKeys: Record<ComponentDocKey, ComponentUsageKey[]> = {
  buttons: ['loading', 'primary', 'text'],
  dates: ['disabled', 'labeled', 'time'],
  forms: ['filters', 'modal', 'textarea'],
  radios: ['count', 'description', 'intent'],
  secondaryLayout: ['actions', 'detail', 'scroll'],
  tabs: ['count', 'navigation', 'short'],
};

const docKeyByRoute: Partial<Record<RouteKey, ComponentDocKey>> = {
  'component-library/buttons': 'buttons',
  'component-library/dates': 'dates',
  'component-library/forms': 'forms',
  'component-library/radios': 'radios',
  'component-library/secondary-layout': 'secondaryLayout',
  'component-library/tabs': 'tabs',
};

export function getComponentDocKey(routeKey: RouteKey) {
  return docKeyByRoute[routeKey];
}
