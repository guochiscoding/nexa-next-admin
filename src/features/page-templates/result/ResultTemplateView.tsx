'use client';

import { CheckCircle2, CircleX } from 'lucide-react';
import { InlineActions } from '@/components/display/InlineActions';
import { Button } from '@/components/ui/button';
import { SecondaryPageLayout } from '@/layouts/secondary';
import { useI18n } from '@/locales';
import { templateBreadcrumbs } from '@/features/page-templates/shared';

function ResultStatusCard({ actions, description, status, title }: { actions: React.ReactNode; description: string; status: 'error' | 'success'; title: string }) {
  return <section className="result-panel"><div className={`template-result template-result-${status}`}><span className="template-result-icon">{status === 'success' ? <CheckCircle2 /> : <CircleX />}</span><h1>{title}</h1><p>{description}</p><InlineActions>{actions}</InlineActions></div></section>;
}

export function ResultTemplateView() {
  const { t } = useI18n();
  return (
    <SecondaryPageLayout breadcrumbs={templateBreadcrumbs('menu.templateResult')} contentClass="result-template-content">
      <section className="result-grid">
        <ResultStatusCard status="success" title={t('pageTemplates.result.successTitle')} description={t('pageTemplates.result.successDescription')} actions={<><Button colorType="blue" type="primary">{t('pageTemplates.result.primaryAction')}</Button><Button type="default">{t('pageTemplates.result.secondaryAction')}</Button></>} />
        <ResultStatusCard status="error" title={t('pageTemplates.result.failTitle')} description={t('pageTemplates.result.failDescription')} actions={<><Button colorType="red" type="primary">{t('pageTemplates.result.retryAction')}</Button><Button type="default">{t('pageTemplates.result.backAction')}</Button></>} />
      </section>
    </SecondaryPageLayout>
  );
}
