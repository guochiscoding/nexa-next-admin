'use client';

import { useState } from 'react';
import type { LocaleCode, ThemeMode } from '@/config/app';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { SecondaryPageLayout } from '@/layouts/secondary';
import { useApp } from '@/context/AppProvider';
import { accountThemeOptions, localeOptions } from '@/features/page-templates/account-settings/data';
import { useI18n } from '@/locales';
import { templateBreadcrumbs } from '@/features/page-templates/shared';

function Field({ children, label }: { children: React.ReactNode; label: React.ReactNode }) {
  return <label className="grid gap-2 text-sm font-medium text-[var(--Font-Black-Gy2)]">{label}{children}</label>;
}

export function AccountSettingsView() {
  const { auth, preferences, setLocale, setTheme } = useApp();
  const { t } = useI18n();
  const [saved, setSaved] = useState(false);
  const [formState, setFormState] = useState({ email: auth.user?.email ?? '', locale: preferences.locale, nickname: auth.user?.nickname ?? '', theme: preferences.theme });
  const canSave = Boolean(formState.nickname.trim() && formState.email.trim());

  function updateField(field: keyof typeof formState, value: string) {
    setFormState((current) => ({ ...current, [field]: value }));
  }

  function resetSettings() {
    setFormState({ email: auth.user?.email ?? '', locale: preferences.locale, nickname: auth.user?.nickname ?? '', theme: preferences.theme });
    setSaved(false);
  }

  function saveSettings() {
    setTheme(formState.theme as ThemeMode);
    setLocale(formState.locale as LocaleCode);
    setSaved(true);
  }

  return (
    <SecondaryPageLayout breadcrumbs={templateBreadcrumbs('menu.templateAccountSettings')} contentClass="settings-content" actions={<><Button type="default" onClick={resetSettings}>{t('common.reset')}</Button><Button colorType="blue" disabled={!canSave} type="primary" onClick={saveSettings}>{t('common.save')}</Button></>}>
      <section className="settings-panel"><header className="settings-header"><div><h1 className="settings-title">{t('pageTemplates.accountSettings.title')}</h1><p className="settings-description">{t('pageTemplates.accountSettings.description')}</p></div>{saved ? <span className="settings-saved">{t('pageTemplates.accountSettings.saved')}</span> : null}</header><div className="settings-grid"><Field label={t('pageTemplates.accountSettings.fields.nickname')}><Input value={formState.nickname} onChange={(event) => updateField('nickname', event.target.value)} /></Field><Field label={t('pageTemplates.accountSettings.fields.email')}><Input value={formState.email} onChange={(event) => updateField('email', event.target.value)} /></Field><Field label={t('pageTemplates.accountSettings.fields.locale')}><Select allowClear={false} value={formState.locale} onValueChange={(value) => value && updateField('locale', value)} options={localeOptions.map((value) => ({ value, label: value === 'zh-CN' ? t('layout.localeShortZhCn') : t('layout.localeShortEnUs') }))} /></Field><Field label={t('pageTemplates.accountSettings.fields.theme')}><Select allowClear={false} value={formState.theme} onValueChange={(value) => value && updateField('theme', value)} options={accountThemeOptions.map((value) => ({ value, label: t(`pageTemplates.accountSettings.theme.${value}`) }))} /></Field></div></section>
    </SecondaryPageLayout>
  );
}
