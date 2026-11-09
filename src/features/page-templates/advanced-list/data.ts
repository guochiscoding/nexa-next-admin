import type { Translate } from '@/features/table-example/types';

export type AdvancedListStatus = 'completed' | 'pending' | 'processing';

export interface TemplateListRow extends Record<string, unknown> {
  id: number;
  name: string;
  owner: string;
  priority: 'P0' | 'P1' | 'P2';
  status: AdvancedListStatus;
  updatedAt: string;
}

const ownerKeys = ['nexaTeam', 'financeOps', 'dataTeam', 'riskTeam'] as const;
export const advancedListStatusOptions = ['processing', 'completed', 'pending'] as const;

export function getAdvancedListOwnerOptions(t: Translate) {
  return ownerKeys.map((key) => {
    const value = t(`pageTemplates.advancedList.owners.${key}`);
    return { label: value, value };
  });
}

export function createAdvancedListRows(t: Translate): TemplateListRow[] {
  const owners = getAdvancedListOwnerOptions(t).map((item) => item.value);
  return [
    { id: 1001, name: t('pageTemplates.advancedList.rows.onboarding'), owner: owners[0], priority: 'P1', status: 'processing', updatedAt: '2026-10-13 09:20' },
    { id: 1002, name: t('pageTemplates.advancedList.rows.billing'), owner: owners[1], priority: 'P0', status: 'pending', updatedAt: '2026-10-13 10:15' },
    { id: 1003, name: t('pageTemplates.advancedList.rows.reporting'), owner: owners[2], priority: 'P2', status: 'completed', updatedAt: '2026-10-12 18:40' },
    { id: 1004, name: t('pageTemplates.advancedList.rows.audit'), owner: owners[3], priority: 'P1', status: 'processing', updatedAt: '2026-10-12 15:05' },
  ];
}
