import type { Translate } from '@/features/table-example/types';

const detailKeys = ['workspace', 'owner', 'activeUsers', 'pendingTasks'] as const;

export function DetailSummary({ t }: { t: Translate }) {
  return (
    <div className="detail-grid">
      {detailKeys.map((key) => (
        <div className="detail-row" key={key}>
          <span className="muted">{t(`tableExample.detail.${key}`)}</span>
          <strong>{t(`tableExample.detailValues.${key}`)}</strong>
        </div>
      ))}
    </div>
  );
}
