export const initialBasicFormState = { description: '', effectiveDate: '', name: '', owner: '', publishMode: '', visibility: '' };
export const publishModeOptions = ['manual', 'scheduled', 'automatic'] as const;
export const visibilityOptions = ['private', 'team', 'public'] as const;
