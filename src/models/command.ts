import { QuestionMap } from 'inquirer';

export interface CliCommand {
  name: string;
  description: string;
  alias?: string;
  options: CliCommandOption[];
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
}
