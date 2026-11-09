export interface DetailInfoItem {
  ellipsis?: boolean;
  key: string;
  label: string;
  value: unknown;
}

export function DetailInfoTable({ bordered = true, items, labelWidth = 88 }: { bordered?: boolean; items: DetailInfoItem[]; labelWidth?: number }) {
  return (
    <div className={`detail-info-table ${bordered ? 'is-bordered' : ''}`}>
      {items.map((item) => (
        <div className="detail-info-row" key={item.key} role="row" style={{ gridTemplateColumns: `${labelWidth}px minmax(0, 1fr)` }}>
          <div className="detail-info-label" role="rowheader">{item.label}</div>
          <div className={`detail-info-value ${item.ellipsis ? 'is-ellipsis' : ''}`} role="cell" title={item.ellipsis ? String(item.value ?? '') : undefined}>{String(item.value ?? '')}</div>
        </div>
      ))}
    </div>
  );
}
