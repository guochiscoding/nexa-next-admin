'use client';

import { Button } from '@/components/ui/button';
import { InlineActions } from '@/components/display/InlineActions';
import { SecondaryPageLayout } from '@/layouts/secondary';
import { useI18n } from '@/locales';
import { templateBreadcrumbs } from '@/features/page-templates/shared';

function ExceptionStatusCard({ action, description, title }: { action: React.ReactNode; description: string; title: string }) {
  return <section className="exception-panel"><div className="template-result template-result-exception"><h1>{title}</h1><p>{description}</p><InlineActions>{action}</InlineActions></div></section>;
}

export function ExceptionTemplateView() {
  const { t } = useI18n();
  return (
    <SecondaryPageLayout breadcrumbs={templateBreadcrumbs('menu.templateException')} contentClass="exception-template-content">
      <section className="exception-grid">
        <ExceptionStatusCard title={t('pageTemplates.exception.notFoundTitle')} description={t('pageTemplates.exception.notFoundDescription')} action={<Button colorType="blue" href="/" type="primary">{t('pageTemplates.exception.backHome')}</Button>} />
        <ExceptionStatusCard title={t('pageTemplates.exception.serverTitle')} description={t('pageTemplates.exception.serverDescription')} action={<Button colorType="blue" type="primary" onClick={() => location.reload()}>{t('pageTemplates.exception.refresh')}</Button>} />
      </section>
    </SecondaryPageLayout>
  );
}
