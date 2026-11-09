import { SecondaryPageLayout } from '@/layouts/secondary';
import { ComponentDocLayout } from '@/features/component-docs/ComponentDocLayout';
import { componentDocUsageKeys } from '@/features/component-docs/config';
import { ComponentPreview } from '@/features/component-docs/ComponentPreview';
import type { ComponentDocKey, Translate } from '@/features/component-docs/types';

export function ComponentDocDetail({ docsKey, t }: { docsKey: ComponentDocKey; t: Translate }) {
  const usage = componentDocUsageKeys[docsKey].map((key) => t(`componentDocs.docs.${docsKey}.usage.${key}`));

  return (
    <SecondaryPageLayout breadcrumbs={[{ href: '/component-library', titleKey: 'menu.componentLibrary' }, { titleKey: `componentDocs.docs.${docsKey}.title` }]}>
      <ComponentDocLayout title={t(`componentDocs.docs.${docsKey}.title`)} description={t(`componentDocs.docs.${docsKey}.description`)} usage={usage}>
        <ComponentPreview docsKey={docsKey} />
      </ComponentDocLayout>
    </SecondaryPageLayout>
  );
}
