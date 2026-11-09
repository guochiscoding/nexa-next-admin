'use client';

import { DetailInfoTable } from '@/components/data-display/DetailInfoTable';
import { Status } from '@/components/data-display/Status';
import { Tag } from '@/components/data-display/Tag';
import { Button } from '@/components/ui/button';
import { SecondaryPageLayout } from '@/layouts/secondary';
import { createOperationItems, createOverviewItems } from '@/features/page-templates/detail/data';
import { useI18n } from '@/locales';
import { templateBreadcrumbs } from '@/features/page-templates/shared';

export function DetailTemplateView() {
  const { t } = useI18n();
  const overviewItems = createOverviewItems(t);
  const operationItems = createOperationItems(t);

  return (
    <SecondaryPageLayout breadcrumbs={templateBreadcrumbs('menu.templateDetail')} contentClass="detail-template-content" actions={<><Button type="default">{t('common.edit')}</Button><Button colorType="blue" type="primary">{t('common.confirm')}</Button></>}>
      <section className="detail-hero"><div className="detail-heading"><div><h1 className="detail-title">{t('pageTemplates.detail.title')}</h1><p className="detail-description">{t('pageTemplates.detail.description')}</p></div><Status status="processing" text={t('pageTemplates.detail.values.processing')} /></div><div className="detail-tags"><Tag color="var(--brand-blue)" bgColor="var(--brand-blue-light)">{t('pageTemplates.detail.values.enterprise')}</Tag><Tag color="var(--warning-color)" bgColor="var(--warning-light)">{t('pageTemplates.detail.values.highPriority')}</Tag></div></section>
      <section className="detail-section"><h2 className="section-title">{t('pageTemplates.detail.sections.overview')}</h2><DetailInfoTable items={overviewItems} labelWidth={112} /></section>
      <section className="detail-section"><h2 className="section-title">{t('pageTemplates.detail.sections.operation')}</h2><DetailInfoTable items={operationItems} labelWidth={112} /></section>
    </SecondaryPageLayout>
  );
}
