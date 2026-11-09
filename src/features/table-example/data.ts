import type { EditableRow, OrderRow, SortableRow, Translate, WorkflowRow } from '@/features/table-example/types';

export function getOwnerOptions(t: Translate) {
  return ['avery', 'mina', 'noah'].map((key) => ({ value: t(`tableExample.demo.owners.${key}`), label: t(`tableExample.demo.owners.${key}`) }));
}

export function getPriorityOptions(t: Translate) {
  return ['high', 'medium', 'low'].map((key) => ({ value: t(`tableExample.priorities.${key}`), label: t(`tableExample.priorities.${key}`) }));
}

export function createSortableRows(t: Translate): SortableRow[] {
  return [
    { id: 1, sort: 1, name: t('tableExample.demo.sortable.revenue'), category: t('tableExample.demo.categories.dashboard'), updatedAt: '2026-10-10 09:30:00' },
    { id: 2, sort: 2, name: t('tableExample.demo.sortable.activation'), category: t('tableExample.demo.categories.metric'), updatedAt: '2026-10-10 10:12:00' },
    { id: 3, sort: 3, name: t('tableExample.demo.sortable.supportQueue'), category: t('tableExample.demo.categories.operations'), updatedAt: '2026-10-10 11:45:00' },
    { id: 4, sort: 4, name: t('tableExample.demo.sortable.systemHealth'), category: t('tableExample.demo.categories.monitoring'), updatedAt: '2026-10-10 13:20:00' },
  ];
}

export function createEditableRows(t: Translate): EditableRow[] {
  return [
    { id: 'task-1', task: t('tableExample.demo.editable.releaseNotes'), owner: t('tableExample.demo.owners.avery'), priority: t('tableExample.priorities.high'), status: t('tableExample.statuses.running') },
    { id: 'task-2', task: t('tableExample.demo.editable.accessPolicy'), owner: t('tableExample.demo.owners.mina'), priority: t('tableExample.priorities.medium'), status: t('tableExample.statuses.paused') },
    { id: 'task-3', task: t('tableExample.demo.editable.onboardingChecklist'), owner: t('tableExample.demo.owners.noah'), priority: t('tableExample.priorities.low'), status: t('tableExample.statuses.completed') },
  ];
}

export function createWorkflowRows(t: Translate): WorkflowRow[] {
  return [
    { id: 'flow-1', name: t('tableExample.workflow.rows.onboarding.name'), trigger: t('tableExample.workflow.rows.onboarding.trigger'), priority: t('tableExample.priorities.high'), priorityTone: 'danger', owner: t('tableExample.demo.owners.avery'), status: t('tableExample.statuses.running'), statusTone: 'processing', detail: t('tableExample.workflow.rows.onboarding.detail') },
    { id: 'flow-2', name: t('tableExample.workflow.rows.billing.name'), trigger: t('tableExample.workflow.rows.billing.trigger'), priority: t('tableExample.priorities.medium'), priorityTone: 'warning', owner: t('tableExample.demo.owners.mina'), status: t('tableExample.statuses.paused'), statusTone: 'warning', detail: t('tableExample.workflow.rows.billing.detail') },
    { id: 'flow-3', name: t('tableExample.workflow.rows.reporting.name'), trigger: t('tableExample.workflow.rows.reporting.trigger'), priority: t('tableExample.priorities.low'), priorityTone: 'success', owner: t('tableExample.demo.owners.noah'), status: t('tableExample.statuses.completed'), statusTone: 'success', detail: t('tableExample.workflow.rows.reporting.detail') },
  ];
}

export function createOrderRows(t: Translate): OrderRow[] {
  const customers = ['acme', 'northwind', 'globex', 'initech'];
  const plans = ['starter', 'growth', 'enterprise'];

  return Array.from({ length: 26 }, (_, index) => ({
    id: index + 1,
    orderNo: `NX-${1001 + index}`,
    customer: t(`tableExample.demo.customers.${customers[index % customers.length]}`),
    plan: t(`tableExample.demo.plans.${plans[index % plans.length]}`),
    amount: `$${(index + 3) * 120}`,
    progress: `${64 + (index % 5) * 7}%`,
    status: index % 5 === 0 ? t('tableExample.statuses.paused') : t('tableExample.statuses.running'),
    statusTone: index % 5 === 0 ? 'warning' : 'processing',
  }));
}
