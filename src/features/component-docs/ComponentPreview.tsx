'use client';

import { useMemo, useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { InlineActions } from '@/components/display/InlineActions';
import { Completeness } from '@/components/data-display/Completeness';
import { Status } from '@/components/data-display/Status';
import { Tag } from '@/components/data-display/Tag';
import { Button } from '@/components/ui/button';
import { DatePicker, LabelDatePicker, LabelRangePicker, RangePicker } from '@/components/ui/date-picker';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { FuzzyInput, LabelFuzzyInput, type FuzzyOption } from '@/components/ui/fuzzy-input';
import { Input } from '@/components/ui/input';
import { LabelInput } from '@/components/ui/label-input';
import { LabelSelect } from '@/components/ui/label-select';
import { RadioGroup, type RadioButtonOption } from '@/components/ui/radio-group';
import { SearchInput } from '@/components/ui/search-input';
import { Select } from '@/components/ui/select';
import { Tabs, type TabItem } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { SecondaryPageLayout } from '@/layouts/secondary';
import { buttonExamples } from '@/features/component-docs/button-examples';
import { useI18n } from '@/locales';
import type { ComponentDocKey } from '@/features/component-docs/types';

export function ComponentPreview({ docsKey }: { docsKey: ComponentDocKey }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>();
  const [selectedValues, setSelectedValues] = useState<(number | string)[]>([]);
  const [labelSelectedValue, setLabelSelectedValue] = useState<number | string | undefined>('all');
  const [activeTab, setActiveTab] = useState<string | number>('quality');
  const [activeWorkOrderTab, setActiveWorkOrderTab] = useState<string | number>('all');
  const [selectedRadio, setSelectedRadio] = useState<string | number>('article');
  const [selectedDashboardRadio, setSelectedDashboardRadio] = useState<string | number>('dashboard');

  const formOptions = useMemo(() => [
    { label: t('componentExamples.forms.options.all'), value: 'all' },
    { label: t('componentExamples.forms.options.dashboard'), value: 'dashboard' },
    { label: t('componentExamples.forms.options.users'), value: 'users' },
    { label: t('componentExamples.forms.options.settings'), value: 'settings' },
    { disabled: true, label: t('componentExamples.forms.options.disabled'), value: 'disabled' },
  ], [t]);

  const fetchOptions = useMemo(() => async (keyword: string): Promise<FuzzyOption[]> => {
    await new Promise((resolve) => window.setTimeout(resolve, 160));
    const normalizedKeyword = keyword.trim().toLowerCase();
    return formOptions.filter((item) => !item.disabled && item.label.toLowerCase().includes(normalizedKeyword)).map((item) => ({ label: item.label, value: String(item.value) }));
  }, [formOptions]);

  if (docsKey === 'buttons') {
    return (
      <section className="component-demo-section">
        <h2 className="section-title">{t('componentExamples.buttons.title')}</h2>
        <div className="button-example-stack">
          {buttonExamples.map((example) => (
            <div className="button-example-group" key={example.colorType}>
              <span className="component-form-field-label">{t(example.labelKey)}</span>
              <InlineActions>
                {[false, true].map((disabled) => example.types.map((buttonType) => (
                  <Button colorType={example.colorType} disabled={disabled} key={`${example.colorType}-${buttonType}-${String(disabled)}`} type={buttonType}>
                    {t('common.button')}
                  </Button>
                )))}
              </InlineActions>
            </div>
          ))}
          <div className="button-example-group">
            <span className="component-form-field-label">{t('componentExamples.buttons.iconStates')}</span>
            <InlineActions>
              <Button loading type="primary">{t('common.loading')}</Button>
              <Button icon={<Plus className="size-4" />} type="primary">{t('common.create')}</Button>
              <Button suffixIcon={<ChevronDown className="size-4" />}>{t('common.button')}</Button>
            </InlineActions>
          </div>
          <div className="button-example-group">
            <span className="component-form-field-label">{t('componentExamples.buttons.ghost')}</span>
            <div className="ghost-button-preview-row">
              <InlineActions>
                <Button type="ghost-white">{t('common.button')}</Button>
                <Button loading type="ghost-white">{t('common.loading')}</Button>
                <Button disabled type="ghost-white">{t('common.button')}</Button>
              </InlineActions>
              <InlineActions>
                <Button type="ghost-gray">{t('common.button')}</Button>
                <Button loading type="ghost-gray">{t('common.loading')}</Button>
                <Button disabled type="ghost-gray">{t('common.button')}</Button>
              </InlineActions>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (docsKey === 'forms') {
    const statuses = ['failed', 'processing', 'pending', 'enabled', 'disabled', 'completed', 'queued', 'draft', 'notStarted', 'normal'];
    return (
      <section className="component-demo-section">
        <h2 className="section-title">{t('componentExamples.forms.title')}</h2>
        <div className="component-form-grid">
          <label className="component-form-field"><span>{t('componentExamples.forms.searchInput')}</span><SearchInput /></label>
          <label className="component-form-field"><span>{t('componentExamples.forms.input')}</span><Input placeholder={t('componentExamples.forms.placeholders.input')} /></label>
          <label className="component-form-field"><span>{t('componentExamples.forms.disabledInput')}</span><Input disabled placeholder={t('componentExamples.forms.placeholders.disabled')} /></label>
          <label className="component-form-field"><span>{t('componentExamples.forms.fuzzyInput')}</span><FuzzyInput fetchOptions={fetchOptions} placeholder={t('componentExamples.forms.placeholders.keyword')} /></label>
          <label className="component-form-field"><span>{t('componentExamples.forms.labelInput')}</span><LabelInput label={t('componentExamples.forms.category')} placeholder={t('componentExamples.forms.placeholders.input')} /></label>
          <label className="component-form-field"><span>{t('componentExamples.forms.labelFuzzyInput')}</span><LabelFuzzyInput fetchOptions={fetchOptions} label={t('componentExamples.forms.category')} placeholder={t('componentExamples.forms.placeholders.keyword')} /></label>
          <label className="component-form-field"><span>{t('componentExamples.forms.labelSelect')}</span><LabelSelect label={t('componentExamples.forms.category')} value={labelSelectedValue} options={formOptions} onChange={(value) => setLabelSelectedValue(Array.isArray(value) ? value[0] : value)} /></label>
          <label className="component-form-field"><span>{t('componentExamples.forms.disabledLabelSelect')}</span><LabelSelect disabled label={t('componentExamples.forms.category')} options={formOptions} /></label>
          <label className="component-form-field"><span>{t('componentExamples.forms.select')}</span><Select value={selectedValue} options={formOptions} placeholder={t('componentExamples.forms.placeholders.category')} onValueChange={setSelectedValue} /></label>
          <label className="component-form-field"><span>{t('componentExamples.forms.multiSelect')}</span><Select mode="multiple" value={selectedValues} options={formOptions} placeholder={t('componentExamples.forms.placeholders.categories')} onChange={(value) => setSelectedValues(Array.isArray(value) ? value : [])} /></label>
          <label className="component-form-field"><span>{t('componentExamples.forms.disabledSelect')}</span><Select disabled options={formOptions} placeholder={t('componentExamples.forms.placeholders.select')} /></label>
          <label className="component-form-field"><span>{t('componentExamples.forms.limitedInput')}</span><Textarea maxLength={20} type="input" width={240} placeholder={t('componentExamples.forms.placeholders.input')} /></label>
          <label className="component-form-field"><span>{t('componentExamples.forms.modal')}</span><Button type="default" onClick={() => setOpen(true)}>{t('componentExamples.forms.openModal')}</Button></label>
          <label className="component-form-field"><span>{t('componentExamples.forms.textarea')}</span><Textarea width={240} placeholder={t('componentExamples.forms.placeholders.description')} /></label>
          <label className="component-form-field"><span>{t('componentExamples.forms.limitedTextarea')}</span><Textarea height={140} maxLength={150} width={240} placeholder={t('componentExamples.forms.placeholders.remark')} /></label>
        </div>
        <div className="component-preview-block"><span className="component-form-field-label">{t('componentExamples.forms.status')}</span><div className="component-preview-list">{statuses.map((status) => <Status key={status} status={status} text={t(`componentExamples.forms.statuses.${status}`)} />)}</div></div>
        <div className="component-preview-block"><span className="component-form-field-label">{t('componentExamples.forms.tag')}</span><div className="component-preview-list"><Tag color="var(--error-color)" bgColor="var(--error-light)">{t('componentExamples.forms.tags.critical')}</Tag><Tag color="var(--warning-color)" bgColor="var(--warning-light)">{t('componentExamples.forms.tags.warning')}</Tag><Tag color="var(--brand-blue)" bgColor="var(--brand-blue-light)">{t('componentExamples.forms.tags.normal')}</Tag><Tag color="var(--success-color)" bgColor="var(--success-light)">{t('componentExamples.forms.tags.completed')}</Tag></div></div>
        <div className="component-preview-block"><span className="component-form-field-label">{t('componentExamples.forms.completeness')}</span><div className="component-preview-list"><Completeness level="0" text="0%" /><Completeness level="half" text="50%" /><Completeness level="full" text="100%" /></div></div>
        <Dialog open={open} onOpenChange={setOpen}><DialogContent title={t('componentExamples.forms.modalTitle')}><p>{t('componentExamples.forms.modalContent')}</p></DialogContent></Dialog>
      </section>
    );
  }

  if (docsKey === 'dates') {
    return (
      <section className="component-demo-section">
        <h2 className="section-title">{t('componentExamples.dates.title')}</h2>
        <div className="component-form-grid">
          <label className="component-form-field"><span>{t('componentExamples.dates.date')}</span><DatePicker allowClear /></label>
          <label className="component-form-field"><span>{t('componentExamples.dates.dateTime')}</span><DatePicker allowClear showTime /></label>
          <label className="component-form-field"><span>{t('componentExamples.dates.disabled')}</span><DatePicker disabled value="2026-03-24" /></label>
          <label className="component-form-field"><span>{t('componentExamples.dates.range')}</span><RangePicker allowClear /></label>
        </div>
        <h2 className="section-title">{t('componentExamples.dates.labeledTitle')}</h2>
        <div className="component-form-grid">
          <label className="component-form-field"><span>{t('componentExamples.dates.labelDatePicker')}</span><LabelDatePicker label={t('componentExamples.dates.dateLabel')} width={277} allowClear /></label>
          <label className="component-form-field"><span>{t('componentExamples.dates.labelDateTimePicker')}</span><LabelDatePicker label={t('componentExamples.dates.dateTimeLabel')} width={277} showTime allowClear /></label>
          <label className="component-form-field"><span>{t('componentExamples.dates.disabledLabelDatePicker')}</span><LabelDatePicker label={t('componentExamples.dates.dateLabel')} width={277} value="2026-03-24" disabled /></label>
          <label className="component-form-field"><span>{t('componentExamples.dates.labelRangePicker')}</span><LabelRangePicker label={t('componentExamples.dates.dateRangeLabel')} width={277} allowClear /></label>
          <label className="component-form-field"><span>{t('componentExamples.dates.labelDateTimeRangePicker')}</span><LabelRangePicker label={t('componentExamples.dates.dateTimeLabel')} width={277} showTime allowClear /></label>
          <label className="component-form-field"><span>{t('componentExamples.dates.disabledLabelRangePicker')}</span><LabelRangePicker label={t('componentExamples.dates.dateRangeLabel')} width={277} value={['2026-03-24', '2026-03-31']} disabled /></label>
        </div>
      </section>
    );
  }

  if (docsKey === 'tabs') {
    const tabs: TabItem[] = [{ key: 'coverage', label: t('tabsPreview.coverage') }, { key: 'quality', label: t('tabsPreview.quality') }, { key: 'operations', label: t('tabsPreview.operations') }, { key: 'review', label: t('tabsPreview.review') }];
    const workOrderTabs: TabItem[] = [{ key: 'all', label: t('tabsPreview.allWorkOrders'), count: 51 }, { key: 'pending', label: t('tabsPreview.pendingWorkOrders'), count: 4 }, { key: 'completed', label: t('tabsPreview.completedWorkOrders'), count: 4 }];
    return <section className="component-demo-section"><h2 className="section-title">{t('tabsPreview.title')}</h2><div className="tabs-preview-group"><Tabs value={activeTab} items={tabs} onChange={setActiveTab} /><Tabs fontSize={14} value={activeWorkOrderTab} items={workOrderTabs} onChange={setActiveWorkOrderTab} /></div></section>;
  }

  if (docsKey === 'radios') {
    const options: RadioButtonOption[] = [{ value: 'article', label: t('radioButtonGroupPreview.article', { count: 23 }) }, { value: 'model', label: t('radioButtonGroupPreview.model', { count: 14 }) }];
    const dashboardOptions: RadioButtonOption[] = [{ value: 'dashboard', label: t('radioButtonGroupPreview.dashboard') }, { value: 'dashboardDetail', label: t('radioButtonGroupPreview.dashboard') }, { value: 'rules', label: t('radioButtonGroupPreview.rules') }];
    return <section className="component-demo-section"><h2 className="section-title">{t('radioButtonGroupPreview.title')}</h2><div className="preview-group"><RadioGroup value={selectedRadio} options={options} onChange={setSelectedRadio} /><RadioGroup value={selectedDashboardRadio} options={dashboardOptions} onChange={setSelectedDashboardRadio} /></div></section>;
  }

  return <section className="component-demo-section"><h2 className="section-title">{t('componentDocs.secondaryLayout.previewTitle')}</h2><p className="panel-subtitle">{t('componentDocs.secondaryLayout.previewDescription')}</p><SecondaryPageLayout title={t('componentDocs.secondaryLayout.previewTitle')} actions={<Button colorType="blue" type="primary">{t('common.save')}</Button>}><p>{t('componentDocs.secondaryLayout.fields.layout')}</p></SecondaryPageLayout></section>;
}
