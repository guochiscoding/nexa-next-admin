'use client';

import { ContentCard } from '@/components/display/ContentCard';
import { PageHeading } from '@/components/display/PageHeading';
import { Button } from '@/components/ui/button';
import { templateNavigationItems } from '@/config/navigation';
import { useI18n } from '@/locales';
import { AccountCenterView } from '@/features/page-templates/account-center';
import { AccountSettingsView } from '@/features/page-templates/account-settings';
import { AdvancedListView } from '@/features/page-templates/advanced-list';
import { BasicFormView } from '@/features/page-templates/basic-form';
import { DetailTemplateView } from '@/features/page-templates/detail';
import { ExceptionTemplateView } from '@/features/page-templates/exception';
import { ResultTemplateView } from '@/features/page-templates/result';
import type { RouteKey } from '@/routes/definitions';

export function PageTemplatesView({ routeKey }: { routeKey: RouteKey }) {
  const { t } = useI18n();

  if (routeKey === 'page-templates/advanced-list') return <AdvancedListView />;
  if (routeKey === 'page-templates/basic-form') return <BasicFormView />;
  if (routeKey === 'page-templates/detail') return <DetailTemplateView />;
  if (routeKey === 'page-templates/result') return <ResultTemplateView />;
  if (routeKey === 'page-templates/exception') return <ExceptionTemplateView />;
  if (routeKey === 'page-templates/account-center') return <AccountCenterView />;
  if (routeKey === 'page-templates/account-settings') return <AccountSettingsView />;

  return (
    <section className="page-shell">
      <PageHeading title={t('menu.pageTemplates')} />
      <div className="template-grid">
        {templateNavigationItems.filter((item) => item.path.startsWith('/page-templates/')).map((item) => (
          <ContentCard key={item.path} title={t(item.titleKey)}>
            <Button colorType="blue" href={item.path} type="primary">{t('common.expand')}</Button>
          </ContentCard>
        ))}
      </div>
    </section>
  );
}
