'use client';

import { ContentCard } from '@/components/display/ContentCard';
import { PageHeading } from '@/components/display/PageHeading';
import { featureKeys, stackKeys } from '@/features/project-intro/data';
import { useI18n } from '@/locales';

export function ProjectIntroView() {
  const { t } = useI18n();
  return <section className="page-shell"><PageHeading title={t('projectIntro.title')} description={t('projectIntro.description')} /><ContentCard title={t('projectIntro.about.title')}><p className="page-description">{t('projectIntro.about.paragraphOne')}</p><p className="page-description">{t('projectIntro.about.paragraphTwo')}</p></ContentCard><ContentCard title={t('projectIntro.features.title')}><div className="feature-grid">{featureKeys.map((key) => <article className="doc-entry" style={{ padding: 16 }} key={key}><strong>{t(`projectIntro.features.${key}.title`)}</strong><p className="muted">{t(`projectIntro.features.${key}.description`)}</p></article>)}</div></ContentCard><ContentCard title={t('projectIntro.stack.title')}><div className="table-scroll"><table className="data-table"><tbody>{stackKeys.map((key) => <tr key={key}><th>{t(`projectIntro.stack.${key}.module`)}</th><td>{t(`projectIntro.stack.${key}.content`)}</td></tr>)}</tbody></table></div></ContentCard></section>;
}
