import { existsSync, outputJson, pathExists, readJson } from 'fs-extra';
import {
  CliCommand,
  CliCommandOption,
  CliShowConditionOperand,
  CommandMap,
} from '../models';
import { Logger } from '../utils';

export abstract class Command<TOption = any> {
  protected commandKey: string;
  protected command: CliCommand;

  protected constructor(
    protected readonly logger: Logger,
    protected readonly commandsMap: CommandMap,
    commandKey: string,
  ) {
    this.commandKey = commandKey;
    this.command = commandsMap[this.commandKey];
  }

  protected async getExistOptions(): Promise<TOption | null> {
    const cwd = process.cwd();
    const optionPath = cwd + '/.architectnow';
    if (!(await pathExists(optionPath))) {
      return null;
    }

    const filePath = optionPath + '/' + this.commandKey + '.json';
    if (!existsSync(filePath)) {
      return null;
    }

    return readJson(filePath);
  }

  protected async storeOptions(options: TOption): Promise<void> {
    const cwd = process.cwd();
    const optionPath = cwd + '/.architectnow';
    await outputJson(optionPath + '/' + this.commandKey + '.json', options);
  }

  protected async printHelp() {
    this.logger.info(`
usage: architectnow ${this.command.name} [options]
alias: architectnow ${this.command.alias} [options]
    `);

    await this.printHelpOptions();
    return 0;
  }

  protected checkShowCondition(
    option: CliCommandOption,
  ): (answers: TOption) => boolean {
    return (answers: TOption) => {
      if (option.showConditions == null || !option.showConditions.length) {
        return true;
      }

      let show = true;

      for (const { operand, value, field } of option.showConditions) {
        const fieldValue = (answers as any)[field];

        switch (operand) {
          case CliShowConditionOperand.Eq:
            show = fieldValue === value;
            break;
          case CliShowConditionOperand.Neq:
            show = fieldValue !== value;
            break;
          case CliShowConditionOperand.Gt:
            show = fieldValue > (value as number);
            break;
          case CliShowConditionOperand.Gte:
            show = fieldValue >= (value as number);
            break;
          case CliShowConditionOperand.Lt:
            show = fieldValue < (value as number);
            break;
          case CliShowConditionOperand.Lte:
            show = fieldValue <= (value as number);
            break;
          case CliShowConditionOperand.Ne:
            show = fieldValue == null;
            break;
          default:
            show = true;
            break;
        }
      }

      return show;
    };
  }

  private async printHelpOptions() {
    for (let opt of this.command.options) {
      this.logger.info(`  --${opt.name}`);
      if (opt.alias) {
        this.logger.log(`   alias: --${opt.alias}`);
      }

      if (opt.description) {
        this.logger.log(`   description: ${opt.description}`);
      }
    }
  }
}
