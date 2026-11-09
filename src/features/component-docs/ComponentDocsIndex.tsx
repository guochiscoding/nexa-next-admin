import Link from 'next/link';
import { SecondaryPageLayout } from '@/layouts/secondary';
import { componentDocEntries } from '@/features/component-docs/config';
import type { Translate } from '@/features/component-docs/types';

export function ComponentDocsIndex({ t }: { t: Translate }) {
  return (
    <SecondaryPageLayout breadcrumbs={[{ titleKey: 'menu.componentLibrary' }]} showBack={false}>
      <section className="component-index-page">
        <header className="component-index-header">
          <h1>{t('componentDocs.title')}</h1>
          <p>{t('componentDocs.description')}</p>
        </header>
        <div className="component-entry-grid">
          {componentDocEntries.map((entry) => (
            <Link key={entry.key} className="component-entry-card" href={entry.path}>
              <span className="entry-title">{t(`componentDocs.entries.${entry.key}.title`)}</span>
              <span className="entry-description">{t(`componentDocs.entries.${entry.key}.description`)}</span>
            </Link>
          ))}
        </div>
      </section>
    </SecondaryPageLayout>
  );
}
