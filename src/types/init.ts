// export const VALID_TEMPLATES = ['web', 'api', 'full'] as const;
export const VALID_TEMPLATES = ['web'] as const;
export type TemplateType = typeof VALID_TEMPLATES[number];