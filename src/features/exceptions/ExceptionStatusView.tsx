'use client';

import { Button } from '@/components/ui/button';
import { InlineActions } from '@/components/display/InlineActions';
import { useI18n } from '@/locales';

export function ExceptionStatusView({ title, description }: { title: string; description: string }) {
  const { t } = useI18n();
  return <section className="exception-card" style={{ padding: 42, textAlign: 'center' }}><h1 style={{ fontSize: 56, margin: 0 }}>{title}</h1><p className="muted">{description}</p><InlineActions><Button colorType="blue" href="/" type="primary">{t('pageTemplates.exception.backHome')}</Button><Button type="default" onClick={() => location.reload()}>{t('pageTemplates.exception.refresh')}</Button></InlineActions></section>;
}

export function ForbiddenView() {
  const { t } = useI18n();
  return <section className="page-shell"><ExceptionStatusView title={t('forbidden.title')} description={t('forbidden.description')} /></section>;
}

export function UnauthorizedView() {
  const { t } = useI18n();
  return <section className="page-shell"><ExceptionStatusView title={t('unauthorized.expiredTitle')} description={t('unauthorized.expiredDescription')} /></section>;
}

export function NotFoundView() {
  const { t } = useI18n();
  return <section className="page-shell"><ExceptionStatusView title={t('pageTemplates.exception.notFoundTitle')} description={t('pageTemplates.exception.notFoundDescription')} /></section>;
}
