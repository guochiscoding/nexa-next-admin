'use client';

import { useI18n } from '@/locales';
import { ComponentDocDetail } from '@/features/component-docs/ComponentDocDetail';
import { ComponentDocsIndex } from '@/features/component-docs/ComponentDocsIndex';
import { getComponentDocKey } from '@/features/component-docs/config';
import type { RouteKey } from '@/routes/definitions';

export function ComponentDocsView({ routeKey }: { routeKey: RouteKey }) {
  const { t } = useI18n();
  const docsKey = getComponentDocKey(routeKey);
  return docsKey ? <ComponentDocDetail docsKey={docsKey} t={t} /> : <ComponentDocsIndex t={t} />;
}
