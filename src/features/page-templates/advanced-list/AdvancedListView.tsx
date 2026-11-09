'use client';

import { useState } from 'react';
import { SelectableDataTable, type SelectableTableColumn } from '@/components/data-table/SelectableDataTable';
import { Button } from '@/components/ui/button';
import { FilterSection } from '@/components/ui/filter-section';
import { LabelInput } from '@/components/ui/label-input';
import { LabelSelect } from '@/components/ui/label-select';
import { Status } from '@/components/data-display/Status';
import { advancedListStatusOptions, createAdvancedListRows, getAdvancedListOwnerOptions, type AdvancedListStatus, type TemplateListRow } from '@/features/page-templates/advanced-list/data';
import { useI18n } from '@/locales';

export function AdvancedListView() {
  const { t } = useI18n();
  const [keyword, setKeyword] = useState('');
  const [owner, setOwner] = useState<string>();
  const [status, setStatus] = useState<AdvancedListStatus>();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);

  const rows = createAdvancedListRows(t);

  const filteredRows = rows.filter((row) => {
    const nextKeyword = keyword.trim().toLowerCase();
    const matchKeyword = !nextKeyword || row.name.toLowerCase().includes(nextKeyword) || row.owner.toLowerCase().includes(nextKeyword);
    const matchOwner = !owner || row.owner === owner;
    const matchStatus = !status || row.status === status;
    return matchKeyword && matchOwner && matchStatus;
  });

  const columns: SelectableTableColumn<TemplateListRow>[] = [
    { key: 'name', title: t('pageTemplates.advancedList.columns.name'), width: 220 },
    { key: 'owner', title: t('pageTemplates.advancedList.columns.owner'), width: 160 },
    { key: 'priority', title: t('pageTemplates.advancedList.columns.priority'), width: 120 },
    { key: 'status', title: t('pageTemplates.advancedList.columns.status'), width: 140, render: (_value, record) => <Status status={record.status} text={t(`pageTemplates.advancedList.status.${record.status}`)} /> },
    { key: 'updatedAt', title: t('pageTemplates.advancedList.columns.updatedAt'), width: 180 },
  ];

  function resetFilters() {
    setKeyword('');
    setOwner(undefined);
    setStatus(undefined);
    setCurrent(1);
  }

  return (
    <div className="advanced-list-page">
      <FilterSection
        actions={<><Button htmlType="button" type="default" onClick={resetFilters}>{t('common.reset')}</Button><Button colorType="blue" htmlType="submit" type="primary">{t('common.search')}</Button></>}
        onSubmit={() => setCurrent(1)}
      >
        <div className="filter-field"><LabelInput label={t('pageTemplates.advancedList.filters.keyword')} placeholder={t('pageTemplates.advancedList.filters.keywordPlaceholder')} value={keyword} width="100%" onChange={(event) => setKeyword(event.target.value)} /></div>
        <div className="filter-field"><LabelSelect label={t('pageTemplates.advancedList.filters.owner')} value={owner} width="100%" options={getAdvancedListOwnerOptions(t)} onValueChange={setOwner} /></div>
        <div className="filter-field"><LabelSelect label={t('pageTemplates.advancedList.filters.status')} value={status} width="100%" options={advancedListStatusOptions.map((value) => ({ value, label: t(`pageTemplates.advancedList.status.${value}`) }))} onValueChange={(value) => setStatus(value as AdvancedListStatus)} /></div>
      </FilterSection>

      <section className="viewport-table-section list-section is-fit-content">
        <div className="viewport-table-body">
          <SelectableDataTable
            className="list-table"
            columns={columns}
            current={current}
            dataSource={filteredRows}
            onPageChange={(payload) => { setCurrent(payload.current); setPageSize(payload.pageSize); }}
            onSelectedRowKeysChange={setSelectedRowKeys}
            pageSize={pageSize}
            rowKey="id"
            selectable
            selectedRowKeys={selectedRowKeys}
            total={filteredRows.length}
            toolbar={<><div className="table-title-block"><h1 className="table-title">{t('pageTemplates.advancedList.title')}</h1><p className="table-description">{t('pageTemplates.advancedList.description')}</p></div><Button colorType="blue" type="primary">{t('common.create')}</Button></>}
          />
        </div>
      </section>
    </div>
  );
}
