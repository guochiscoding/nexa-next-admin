'use client';

import { AppShell } from '@/layouts/app';
import { ContentCard } from '@/components/display/ContentCard';
import { useApp } from '@/context/AppProvider';
import { useI18n } from '@/locales';
import { isPublicRoute } from '@/routes/definitions';
import { RouteContent } from '@/routes/RouteContent';
import type { RouteKey } from '@/routes/definitions';

export function ProtectedRouteView({ routeKey }: { routeKey: RouteKey }) {
  const { auth } = useApp();
  const { t } = useI18n();
  if (!auth.initialized) return <div className="page-shell"><ContentCard>{t('common.loading')}</ContentCard></div>;
  if (!auth.token?.access_token && !isPublicRoute(routeKey)) return null;
  return <AppShell><RouteContent routeKey={routeKey} /></AppShell>;
}
