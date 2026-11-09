'use client';

import { ChevronDown, Globe2, LogOut, Moon, PanelLeftClose, PanelLeftOpen, Settings, Sun } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { LayoutMode, LocaleCode, ThemeMode } from '@/config/app';
import { useApp } from '@/context/AppProvider';
import { useI18n } from '@/locales';
import { LogoMark } from '@/layouts/app/LogoMark';
import { TopNavigation } from '@/layouts/app/TopNavigation';

export function AppHeader({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const { auth, logout, preferences, setLayout, setLocale, setTheme } = useApp();
  const { t } = useI18n();
  const userName = auth.user?.nickname || auth.user?.username || t('menu.administrator');
  const themeItems = [
    { key: 'light', label: t('preferences.modeLight') },
    { key: 'dark', label: t('preferences.modeDark') },
    { key: 'system', label: t('preferences.modeSystem') },
  ];
  const layoutItems = [
    { key: 'side', label: t('preferences.layoutSide') },
    { key: 'top', label: t('preferences.layoutTop') },
  ];

  return (
    <header className="app-header">
      <div className="inline-flex items-center gap-3">
        {preferences.layout === 'side' ? <Button className="mobile-only" icon={collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />} size="icon" type="default" onClick={onToggle} /> : null}
        <LogoMark />
      </div>
      {preferences.layout === 'top' ? <TopNavigation /> : null}
      <div className="header-actions">
        <Button icon={<Globe2 className="size-4" />} type="default" onClick={() => setLocale((preferences.locale === 'zh-CN' ? 'en-US' : 'zh-CN') as LocaleCode)}>{preferences.locale === 'zh-CN' ? t('layout.localeShortZhCn') : t('layout.localeShortEnUs')}</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button icon={preferences.resolvedTheme === 'dark' ? <Moon className="size-4" /> : <Sun className="size-4" />} suffixIcon={<ChevronDown className="size-4 opacity-60" />} type="default">{themeItems.find((item) => item.key === preferences.theme)?.label}</Button></DropdownMenuTrigger>
          <DropdownMenuContent>{themeItems.map((item) => <DropdownMenuCheckboxItem key={item.key} checked={preferences.theme === item.key} onCheckedChange={() => setTheme(item.key as ThemeMode)}>{item.label}</DropdownMenuCheckboxItem>)}</DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button icon={<Settings className="size-4" />} suffixIcon={<ChevronDown className="size-4 opacity-60" />} type="default">{preferences.layout === 'side' ? t('preferences.layoutSide') : t('preferences.layoutTop')}</Button></DropdownMenuTrigger>
          <DropdownMenuContent>{layoutItems.map((item) => <DropdownMenuCheckboxItem key={item.key} checked={preferences.layout === item.key} onCheckedChange={() => setLayout(item.key as LayoutMode)}>{item.label}</DropdownMenuCheckboxItem>)}</DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild><button className="header-user" type="button"><Avatar fallback={userName.slice(0, 1).toUpperCase()} /><span>{userName}</span></button></DropdownMenuTrigger>
          <DropdownMenuContent><DropdownMenuItem onSelect={() => void logout()}><LogOut className="size-4" />{t('auth.logout')}</DropdownMenuItem></DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
