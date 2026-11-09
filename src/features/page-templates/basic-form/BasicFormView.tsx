'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { SecondaryPageLayout } from '@/layouts/secondary';
import { initialBasicFormState, publishModeOptions, visibilityOptions } from '@/features/page-templates/basic-form/data';
import { useI18n } from '@/locales';
import { templateBreadcrumbs } from '@/features/page-templates/shared';

function Field({ children, label }: { children: React.ReactNode; label: React.ReactNode }) {
  return <label className="form-field grid gap-2 text-sm font-medium text-[var(--Font-Black-Gy2)]">{label}{children}</label>;
}

export function BasicFormView() {
  const { t } = useI18n();
  const [formState, setFormState] = useState(initialBasicFormState);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const canSubmit = Boolean(formState.name.trim() && formState.owner.trim() && formState.publishMode && formState.visibility);

  function updateField(field: keyof typeof formState, value: string) {
    setFormState((current) => ({ ...current, [field]: value }));
  }

  function resetForm() {
    setFormState(initialBasicFormState);
    setSubmitted(false);
  }

  function submitForm() {
    if (!canSubmit) return;
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 360);
  }

  return (
    <SecondaryPageLayout breadcrumbs={templateBreadcrumbs('menu.templateBasicForm')} contentClass="template-page-content" actions={<><Button type="default" onClick={resetForm}>{t('common.reset')}</Button><Button colorType="blue" disabled={!canSubmit} loading={submitting} type="primary" onClick={submitForm}>{t('common.submit')}</Button></>}>
      <section className="template-panel">
        <header className="template-header"><div><h1 className="template-title">{t('pageTemplates.basicForm.title')}</h1><p className="template-description">{t('pageTemplates.basicForm.description')}</p></div>{submitted ? <span className="template-success-text">{t('pageTemplates.basicForm.submitted')}</span> : null}</header>
        <div className="form-grid">
          <Field label={t('pageTemplates.basicForm.fields.name')}><Input placeholder={t('pageTemplates.basicForm.placeholders.name')} value={formState.name} onChange={(event) => updateField('name', event.target.value)} /></Field>
          <Field label={t('pageTemplates.basicForm.fields.owner')}><Input placeholder={t('pageTemplates.basicForm.placeholders.owner')} value={formState.owner} onChange={(event) => updateField('owner', event.target.value)} /></Field>
          <Field label={t('pageTemplates.basicForm.fields.publishMode')}><Select placeholder={t('pageTemplates.basicForm.placeholders.publishMode')} value={formState.publishMode || undefined} onValueChange={(value) => updateField('publishMode', value ?? '')} options={publishModeOptions.map((value) => ({ value, label: t(`pageTemplates.basicForm.options.${value}`) }))} /></Field>
          <Field label={t('pageTemplates.basicForm.fields.visibility')}><Select placeholder={t('pageTemplates.basicForm.placeholders.visibility')} value={formState.visibility || undefined} onValueChange={(value) => updateField('visibility', value ?? '')} options={visibilityOptions.map((value) => ({ value, label: t(`pageTemplates.basicForm.options.${value}`) }))} /></Field>
          <Field label={t('pageTemplates.basicForm.fields.effectiveDate')}><DatePicker placeholder={t('pageTemplates.basicForm.placeholders.effectiveDate')} value={formState.effectiveDate || undefined} onChange={(value) => updateField('effectiveDate', value ?? '')} /></Field>
        </div>
        <div className="textarea-row"><span className="textarea-label">{t('pageTemplates.basicForm.fields.description')}</span><Textarea maxLength={240} placeholder={t('pageTemplates.basicForm.placeholders.description')} rows={5} value={formState.description} onChange={(event) => updateField('description', event.target.value)} /></div>
      </section>
    </SecondaryPageLayout>
  );
}
