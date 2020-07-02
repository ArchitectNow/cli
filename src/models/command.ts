import { QuestionMap } from 'inquirer';

export interface CliCommand {
  name: string;
  description: string;
  alias?: string;
  options: CliCommandOption[];
}

export enum CliShowConditionOperand {
  Eq = 'eq',
  Neq = 'neq',
  Gt = 'gt',
  Gte = 'gte',
  Lt = 'lt',
  Lte = 'lte',
  Ne = 'ne', // not exist aka null/undefined
}

export interface CliShowCondition {
  field: string;
  value: unknown;
  operand: CliShowConditionOperand;
}

export interface CliCommandOption<TType = any> {
  type: keyof QuestionMap;
  name: string;
  description: string;
  required: boolean;
  message?: string;
  validationMessage?: string;
  default?: TType;
  alias?: string;
  showConditions?: CliShowCondition[];
}
