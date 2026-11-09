export type ComponentDocKey = 'buttons' | 'dates' | 'forms' | 'radios' | 'secondaryLayout' | 'tabs';

export type ComponentUsageKey = 'actions' | 'count' | 'detail' | 'disabled' | 'description' | 'filters' | 'intent' | 'labeled' | 'loading' | 'modal' | 'navigation' | 'primary' | 'scroll' | 'short' | 'text' | 'textarea' | 'time';

export type Translate = (key: string, params?: Record<string, string | number>) => string;
