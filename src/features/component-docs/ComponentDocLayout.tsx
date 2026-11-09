'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/locales';

export function ComponentDocLayout({ children, description, title, usage }: { children: React.ReactNode; description: string; title: string; usage: string[] }) {
  const { t } = useI18n();
  const [expanded, setExpanded] = useState(true);
  const usageItems = usage.filter((item) => item.trim());

  return (
    <section className="component-doc-layout">
      <header className="component-doc-header">
        <div>
          <h1 className="component-doc-title">{title}</h1>
          <p className="component-doc-description">{description}</p>
        </div>
        <Button className="usage-toggle" htmlType="button" type="default" onClick={() => setExpanded((value) => !value)}>
          {expanded ? t('componentDocs.collapseUsage') : t('componentDocs.expandUsage')}
        </Button>
      </header>
      {expanded ? (
        <div className="usage-panel">
          <ol className="usage-list">
            {usageItems.map((item) => <li key={item}>{item}</li>)}
          </ol>
        </div>
      ) : null}
      <div className="component-doc-demo">{children}</div>
    </section>
  );
}
