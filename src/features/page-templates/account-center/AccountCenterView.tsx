'use client';

import { DetailInfoTable, type DetailInfoItem } from '@/components/data-display/DetailInfoTable';
import { Tag } from '@/components/data-display/Tag';
import { SecondaryPageLayout } from '@/layouts/secondary';
import { useApp } from '@/context/AppProvider';
import { useI18n } from '@/locales';
import { templateBreadcrumbs } from '@/features/page-templates/shared';

export function AccountCenterView() {
  const { auth } = useApp();
  const { t } = useI18n();
  const userName = auth.user?.nickname || auth.user?.username || t('menu.administrator');
  const profileItems: DetailInfoItem[] = [
    { key: 'username', label: t('pageTemplates.accountCenter.fields.username'), value: auth.user?.username ?? '--' },
    { key: 'nickname', label: t('pageTemplates.accountCenter.fields.nickname'), value: auth.user?.nickname ?? '--' },
    { key: 'realName', label: t('pageTemplates.accountCenter.fields.realName'), value: auth.user?.real_name ?? '--' },
    { key: 'email', label: t('pageTemplates.accountCenter.fields.email'), value: auth.user?.email ?? '--', ellipsis: true },
  ];
  const accessItems: DetailInfoItem[] = [
    { key: 'role', label: t('pageTemplates.accountCenter.fields.role'), value: t('pageTemplates.accountCenter.values.role') },
    { key: 'department', label: t('pageTemplates.accountCenter.fields.department'), value: t('pageTemplates.accountCenter.values.department') },
    { key: 'lastLogin', label: t('pageTemplates.accountCenter.fields.lastLogin'), value: auth.user?.last_login_at ?? '--' },
    { key: 'status', label: t('pageTemplates.accountCenter.fields.status'), value: auth.user?.status ?? '--' },
  ];

  return (
    <SecondaryPageLayout breadcrumbs={templateBreadcrumbs('menu.templateAccountCenter')} contentClass="account-center-content">
      <section className="profile-panel"><div className="profile-avatar" aria-hidden="true">{userName.slice(0, 1).toUpperCase()}</div><div className="profile-summary"><h1 className="profile-title">{userName}</h1><p className="profile-description">{t('pageTemplates.accountCenter.description')}</p><div className="profile-tags"><Tag color="var(--brand-blue)" bgColor="var(--brand-blue-light)">{t('pageTemplates.accountCenter.values.role')}</Tag><Tag color="var(--success-color)" bgColor="var(--success-light)">{t('pageTemplates.accountCenter.values.department')}</Tag></div></div></section>
      <section className="account-section"><h2 className="section-title">{t('pageTemplates.accountCenter.sections.profile')}</h2><DetailInfoTable items={profileItems} labelWidth={112} /></section>
      <section className="account-section"><h2 className="section-title">{t('pageTemplates.accountCenter.sections.access')}</h2><DetailInfoTable items={accessItems} labelWidth={112} /></section>
    </SecondaryPageLayout>
  );
}
