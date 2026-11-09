export type LayoutMode = 'side' | 'top';
export type LocaleCode = 'en-US' | 'zh-CN';
export type ThemeMode = 'dark' | 'light' | 'system';

export const appConfig = {
  defaultLayout: 'side' as LayoutMode,
  defaultLocale: 'zh-CN' as LocaleCode,
  defaultTheme: 'light' as ThemeMode,
  storageNamespace: 'nexa-next-admin',
};
