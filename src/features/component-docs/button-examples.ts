import type { ButtonColorType, ButtonType } from '@/components/ui/button';

export const buttonExamples: { colorType: ButtonColorType; labelKey: string; types: ButtonType[] }[] = [
  { colorType: 'black', labelKey: 'componentExamples.buttons.black', types: ['default', 'outline', 'primary'] },
  { colorType: 'blue', labelKey: 'componentExamples.buttons.blue', types: ['solid', 'primary', 'text', 'link'] },
  { colorType: 'red', labelKey: 'componentExamples.buttons.red', types: ['outline', 'primary', 'link'] },
];
