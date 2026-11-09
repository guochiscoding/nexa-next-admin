'use client';

import { createContext, useContext } from 'react';
import enUS from './lang/en-US';
import zhCN from './lang/zh-CN';
import type { LocaleCode } from '@/config/app';

type MessageTree = typeof zhCN;

const dictionaries: Record<LocaleCode, MessageTree> = {
  'en-US': enUS as MessageTree,
  'zh-CN': zhCN,
};

export const LocaleContext = createContext<{ locale: LocaleCode }>({ locale: 'zh-CN' });

function readPath(source: unknown, path: string) {
  return path.split('.').reduce<unknown>((current, key) => {
    if (typeof current === 'object' && current !== null && key in current) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, source);
}

export function translate(locale: LocaleCode, key: string, params?: Record<string, string | number>) {
  const value = readPath(dictionaries[locale], key);
  const template = typeof value === 'string' ? value : key;
  if (!params) return template;
  return Object.entries(params).reduce((result, [name, next]) => result.replaceAll(`{${name}}`, String(next)), template);
}

export function useI18n() {
  const { locale } = useContext(LocaleContext);
  return {
    locale,
    t: (key: string, params?: Record<string, string | number>) => translate(locale, key, params),
  };
}
