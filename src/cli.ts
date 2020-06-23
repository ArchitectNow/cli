import { inject, singleton } from 'tsyringe';
import { Lokalise, Permissions } from './commands';
import { CliArguments, CommandsMap } from './ioc';
import { CommandMap } from './models';
import { Logger } from './utils';

@singleton()
export class CLI {
  constructor(
    @inject(CliArguments) private readonly cliArgs: string[],
    @inject(CommandsMap) private readonly commandsMap: CommandMap,
    @inject(Logger) private readonly logger: Logger,
    @inject(Permissions) private readonly permissionsCommand: Permissions,
    @inject(Lokalise) private readonly lokaliseCommand: Lokalise,
  ) {}

  executeCli() {
    const [commandName, ...commandArgs] = this.cliArgs;
    if (!this.isValidCommand(commandName)) {
      this.showInvalidCommandError(commandName);
      return 1;
    }

    switch (commandName) {
      case 'permissions':
      case 'p':
        return this.permissionsCommand.run(commandArgs);
      case 'lokalise':
      case 'l':
        return this.lokaliseCommand.run(commandArgs);
      default:
        return 0;
    }
  }

  private showInvalidCommandError(commandName: string): void {
    this.logger.error(`"${commandName}" is not a valid command.`);
    this.logger.availableCommands();
  }

  private isValidCommand(commandName: string) {
    return Object.values(this.commandsMap).some(
      command => command.name === commandName || command.alias === commandName,
    );
  }
}
