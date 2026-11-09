'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useI18n } from '@/locales';

export interface BreadcrumbItemConfig {
  href?: string;
  title?: string;
  titleKey?: string;
}

interface SecondaryPageLayoutProps {
  actions?: React.ReactNode;
  breadcrumbs?: BreadcrumbItemConfig[];
  children: React.ReactNode;
  contentClass?: string;
  showBack?: boolean;
  title?: string;
}

export function SecondaryPageLayout({ actions, breadcrumbs, children, contentClass = '', showBack = true, title }: SecondaryPageLayoutProps) {
  const { t } = useI18n();
  const router = useRouter();
  const resolvedBreadcrumbs = breadcrumbs ?? (title ? [{ title }] : []);

  return (
    <section className="secondary-layout-shell">
      <header className="secondary-top-bar">
        <nav className="custom-breadcrumb-nav" aria-label={t('layout.breadcrumb')}>
          {showBack ? <button aria-label={t('layout.back')} className="back-icon-btn" type="button" onClick={() => router.back()}><ArrowLeft className="back-icon" /></button> : null}
          <ol className="breadcrumb-list">
            {resolvedBreadcrumbs.map((item, index) => {
              const label = item.title ?? (item.titleKey ? t(item.titleKey) : '');
              const current = index === resolvedBreadcrumbs.length - 1;
              return (
                <li className="breadcrumb-item" key={`${label}-${index}`}>
                  {index > 0 ? <span className="breadcrumb-separator" aria-hidden="true">/</span> : null}
                  {item.href ? <Link className="breadcrumb-link" href={item.href}>{label}</Link> : <span className={`breadcrumb-text ${current ? 'is-current' : ''}`}>{label}</span>}
                </li>
              );
            })}
          </ol>
        </nav>
      </header>
      <main className={`secondary-main-content ${contentClass}`}>{children}</main>
      {actions ? <footer className="secondary-bottom-bar"><div className="secondary-actions-center">{actions}</div></footer> : null}
    </section>
  );
}
