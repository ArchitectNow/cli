import { existsSync, outputJson, pathExists, readJson } from 'fs-extra';
import { CliCommand } from '../models';
import { Logger } from '../utils';

export abstract class Command<TCommandType extends CliCommand = any> {
  protected constructor(protected readonly logger: Logger, protected readonly command: TCommandType) {
  }

  protected async getExistOptions<TOption = any>(commandName: string): Promise<TOption | null> {
    const cwd = process.cwd();
    const optionPath = cwd + '/.architectnow';
    if (!(await pathExists(optionPath))) {
      return null;
    }

    const filePath = optionPath + '/' + commandName + '.json';
    if (!existsSync(filePath)) {
      return null;
    }

    return readJson(filePath);
  }

  protected async storeOptions<TOption = any>(commandName: string, options: TOption): Promise<void> {
    const cwd = process.cwd();
    const optionPath = cwd + '/.architectnow';
    await outputJson(optionPath + '/' + commandName + '.json', options);
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
