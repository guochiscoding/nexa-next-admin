import { useI18n } from '@/locales';

export function LogoMark({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();
  return (
    <span className="brand-lockup">
      <span className="logo-mark">N</span>
      {!compact ? <span>{t('layout.productName')}</span> : null}
    </span>
  );
}
