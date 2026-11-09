import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { InlineActions } from '@/components/display/InlineActions';
import { StatusChip } from '@/components/display/StatusChip';
import type { SelectableTableColumn } from '@/components/data-table/SelectableDataTable';
import { getOwnerOptions, getPriorityOptions } from '@/features/table-example/data';
import type { EditableRow, OrderRow, SortableRow, Translate, WorkflowRow } from '@/features/table-example/types';

interface EditableColumnParams {
  cancelEdit: () => void;
  editableDraft: EditableRow | null;
  editingId?: string;
  saveEdit: () => void;
  setEditableDraft: React.Dispatch<React.SetStateAction<EditableRow | null>>;
  startEdit: (record: EditableRow) => void;
  t: Translate;
}

export function createWorkflowColumns(t: Translate, onView: (name: string) => void): SelectableTableColumn<WorkflowRow>[] {
  return [
    { key: 'name', title: t('tableExample.workflow.columns.name'), width: 280, fixed: 'left' },
    { key: 'trigger', title: t('tableExample.workflow.columns.trigger'), width: 240 },
    { key: 'priority', title: t('tableExample.workflow.columns.priority'), width: 120, align: 'center', render: (value, record) => <StatusChip tone={record.priorityTone}>{String(value)}</StatusChip> },
    { key: 'owner', title: t('tableExample.workflow.columns.owner'), width: 180 },
    { key: 'status', title: t('tableExample.workflow.columns.status'), width: 140, align: 'center', render: (value, record) => <StatusChip tone={record.statusTone}>{String(value)}</StatusChip> },
    { key: 'actions', title: t('tableExample.workflow.columns.actions'), width: 160, fixed: 'right', align: 'center', render: (_value, record) => <Button colorType="blue" type="link" onClick={() => onView(record.name)}>{t('tableExample.orders.view')}</Button> },
  ];
}

export function createSortableColumns(t: Translate): SelectableTableColumn<SortableRow>[] {
  return [
    { key: 'sort', title: t('tableExample.sortable.columns.sort'), width: 80 },
    { key: 'name', title: t('tableExample.sortable.columns.name'), width: 260 },
    { key: 'category', title: t('tableExample.sortable.columns.category'), width: 180 },
    { key: 'updatedAt', title: t('tableExample.sortable.columns.updatedAt'), width: 220 },
  ];
}

export function createEditableColumns(params: EditableColumnParams): SelectableTableColumn<EditableRow>[] {
  const { cancelEdit, editableDraft, editingId, saveEdit, setEditableDraft, startEdit, t } = params;

  return [
    { key: 'task', title: t('tableExample.editable.columns.task'), width: 280, fixed: 'left' },
    { key: 'owner', title: t('tableExample.editable.columns.owner'), width: 180, render: (value, record) => editingId === record.id ? <Select allowClear={false} options={getOwnerOptions(t)} value={editableDraft?.owner} onValueChange={(next) => setEditableDraft((draft) => draft && next ? { ...draft, owner: next } : draft)} /> : String(value) },
    { key: 'priority', title: t('tableExample.editable.columns.priority'), width: 160, render: (value, record) => editingId === record.id ? <Select allowClear={false} options={getPriorityOptions(t)} value={editableDraft?.priority} onValueChange={(next) => setEditableDraft((draft) => draft && next ? { ...draft, priority: next } : draft)} /> : String(value) },
    { key: 'status', title: t('tableExample.editable.columns.status'), width: 160, render: (value, record) => editingId === record.id ? <Input value={editableDraft?.status} onChange={(event) => setEditableDraft((draft) => draft ? { ...draft, status: event.target.value } : draft)} /> : String(value) },
    { key: 'actions', title: t('tableExample.editable.columns.actions'), width: 180, fixed: 'right', render: (_value, record) => editingId === record.id ? <InlineActions><Button colorType="blue" size="small" type="link" onClick={saveEdit}>{t('common.save')}</Button><Button colorType="blue" size="small" type="link" onClick={cancelEdit}>{t('common.cancel')}</Button></InlineActions> : <Button colorType="blue" size="small" type="link" onClick={() => startEdit(record)}>{t('common.edit')}</Button> },
  ];
}

export function createOrderColumns(t: Translate, onView: (name: string) => void): SelectableTableColumn<OrderRow>[] {
  return [
    { key: 'orderNo', title: t('tableExample.orders.columns.orderNo'), width: 160, fixed: 'left' },
    { key: 'customer', title: t('tableExample.orders.columns.customer'), width: 180 },
    { key: 'plan', title: t('tableExample.orders.columns.plan'), width: 160 },
    { key: 'amount', title: t('tableExample.orders.columns.amount'), width: 140 },
    { key: 'progress', title: t('tableExample.orders.columns.progress'), width: 140 },
    { key: 'status', title: t('tableExample.orders.columns.status'), width: 140, fixed: 'right', render: (value, record) => <StatusChip tone={record.statusTone}>{String(value)}</StatusChip> },
    { key: 'actions', title: t('tableExample.orders.columns.actions'), width: 140, fixed: 'right', render: (_value, record) => <Button colorType="blue" type="link" onClick={() => onView(record.orderNo)}>{t('tableExample.orders.view')}</Button> },
  ];
}
