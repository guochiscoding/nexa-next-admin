'use client';

import { useState } from 'react';
import { Alert } from '@/components/ui/alert';
import { ContentCard } from '@/components/display/ContentCard';
import { SelectableDataTable } from '@/components/data-table/SelectableDataTable';
import { SecondaryPageLayout } from '@/layouts/secondary';
import { useI18n } from '@/locales';
import { createEditableColumns, createOrderColumns, createSortableColumns, createWorkflowColumns } from '@/features/table-example/columns';
import { createEditableRows, createOrderRows, createSortableRows, createWorkflowRows } from '@/features/table-example/data';
import { DetailSummary } from '@/features/table-example/DetailSummary';
import type { EditableRow, SortableRow } from '@/features/table-example/types';

export function TableExampleView() {
  const { t } = useI18n();
  const [feedback, setFeedback] = useState(t('tableExample.feedback.ready'));
  const [selectedOrderKeys, setSelectedOrderKeys] = useState<(string | number)[]>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [editingId, setEditingId] = useState<string>();
  const [editableDraft, setEditableDraft] = useState<EditableRow | null>(null);
  const [sortableRows, setSortableRows] = useState<SortableRow[]>(() => createSortableRows(t));
  const [editableRows, setEditableRows] = useState<EditableRow[]>(() => createEditableRows(t));

  const workflowRows = createWorkflowRows(t);
  const orders = createOrderRows(t);
  const showViewedFeedback = (name: string) => setFeedback(t('tableExample.feedback.viewed', { name }));
  const workflowColumns = createWorkflowColumns(t, showViewedFeedback);
  const sortableColumns = createSortableColumns(t);
  const editableColumns = createEditableColumns({ cancelEdit, editableDraft, editingId, saveEdit, setEditableDraft, startEdit, t });
  const orderColumns = createOrderColumns(t, showViewedFeedback);

  function startEdit(record: EditableRow) { setEditingId(record.id); setEditableDraft({ ...record }); }
  function saveEdit() { if (!editableDraft) return; setEditableRows((rows) => rows.map((row) => row.id === editableDraft.id ? editableDraft : row)); setFeedback(t('tableExample.feedback.saved', { name: editableDraft.task })); setEditingId(undefined); setEditableDraft(null); }
  function cancelEdit() { setEditingId(undefined); setEditableDraft(null); setFeedback(t('tableExample.feedback.canceled')); }

  return (
    <SecondaryPageLayout title={t('menu.tableExample')}>
      <div className="table-stack">
        <Alert variant="info">{feedback}</Alert>
        <ContentCard title={t('tableExample.workflow.title')}>
          <SelectableDataTable columns={workflowColumns} dataSource={workflowRows} defaultExpandedRowKeys={['flow-1']} expandable expandedRowRender={(record) => <p className="muted">{record.detail}</p>} pageSize={workflowRows.length} showFooter={false} showSelectionActions={false} total={workflowRows.length} />
        </ContentCard>
        <ContentCard title={t('tableExample.sortable.title')}>
          <SelectableDataTable columns={sortableColumns} dataSource={sortableRows} pageSize={sortableRows.length} rowDraggable showFooter={false} showSelectionActions={false} total={sortableRows.length} onRowDragSort={(payload) => { setSortableRows(payload.dataSource.map((row, index) => ({ ...row, sort: index + 1 }))); setFeedback(t('tableExample.feedback.sorted', { name: payload.sourceRow.name })); }} />
        </ContentCard>
        <ContentCard title={t('tableExample.detail.title')}>
          <DetailSummary t={t} />
        </ContentCard>
        <ContentCard title={t('tableExample.editable.title')}>
          <SelectableDataTable columns={editableColumns} dataSource={editableRows} pageSize={editableRows.length} showFooter={false} showSelectionActions={false} total={editableRows.length} />
        </ContentCard>
        <ContentCard title={t('tableExample.orders.title')}>
          <SelectableDataTable columns={orderColumns} current={current} dataSource={orders} onPageChange={(payload) => { setCurrent(payload.current); setPageSize(payload.pageSize); }} onSelectedRowKeysChange={setSelectedOrderKeys} pageSize={pageSize} selectable selectedRowKeys={selectedOrderKeys} total={orders.length} />
        </ContentCard>
      </div>
    </SecondaryPageLayout>
  );
}
