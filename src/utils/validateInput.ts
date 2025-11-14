import { validate } from '@prestonarnold/validate';
import type { InitAnswers } from '../commands/init.js';
import { VALID_TEMPLATES, type TemplateType } from '../types/init.js';

const initSchema = validate.object({
  name: validate.string().min(1),
  template: validate.string(),
});

export function validateInput(input: InitAnswers) {
  const result = initSchema.parse(input);

  if (!result.success) {
    throw new Error('Invalid input: ' + JSON.stringify(result.errors));
  }

  if (!VALID_TEMPLATES.includes(input.template as TemplateType)) {
    throw new Error('Invalid template selected');
  }

  return result.data;
}
