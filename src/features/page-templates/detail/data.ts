import type { DetailInfoItem } from '@/components/data-display/DetailInfoTable';
import type { Translate } from '@/features/table-example/types';

export function createOverviewItems(t: Translate): DetailInfoItem[] {
  return [
    { key: 'id', label: t('pageTemplates.detail.fields.id'), value: 'NXA-2026-001' },
    { key: 'owner', label: t('pageTemplates.detail.fields.owner'), value: t('pageTemplates.detail.values.owner') },
    { key: 'status', label: t('pageTemplates.detail.fields.status'), value: t('pageTemplates.detail.values.status') },
    { key: 'createdAt', label: t('pageTemplates.detail.fields.createdAt'), value: '2026-10-13 10:30:00' },
  ];
}

export function createOperationItems(t: Translate): DetailInfoItem[] {
  return [
    { key: 'channel', label: t('pageTemplates.detail.fields.channel'), value: t('pageTemplates.detail.values.channel') },
    { key: 'priority', label: t('pageTemplates.detail.fields.priority'), value: t('pageTemplates.detail.values.priority') },
    { key: 'region', label: t('pageTemplates.detail.fields.region'), value: t('pageTemplates.detail.values.region') },
    { key: 'updatedAt', label: t('pageTemplates.detail.fields.updatedAt'), value: '2026-10-13 12:20:00' },
  ];
}
