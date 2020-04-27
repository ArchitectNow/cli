import { existsSync, outputJson, pathExists, readJson } from 'fs-extra';
import { CliCommand, CommandMap } from '../models';
import { Logger } from '../utils';

export abstract class Command {
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

  protected async getExistOptions<TOption = any>(): Promise<TOption | null> {
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

  protected async storeOptions<TOption = any>(options: TOption): Promise<void> {
    const cwd = process.cwd();
    const optionPath = cwd + '/.architectnow';
    await outputJson(optionPath + '/' + this.commandKey + '.json', options);
  }

  protected async printHelp() {
    this.logger.info('');
    this.logger.info(this.command.description);
    this.logger.info(`
usage: architectnow ${ this.command.name } [options]
alias: architectnow ${ this.command.alias } [options]
    `);

    await this.printHelpOptions();
    return 0;
  }

  private async printHelpOptions() {
    for (let opt of this.command.options) {
      this.logger.info(`  --${ opt.name }`);
      if (opt.alias) {
        this.logger.log(`   alias: --${ opt.alias }`);
      }

      if (opt.description) {
        this.logger.log(`   description: ${ opt.description }`);
      }
    }
  }
}
