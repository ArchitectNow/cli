import { cyan, red } from 'kleur';
import { inject, singleton } from 'tsyringe';
import { CommandsMap } from '../ioc';
import { CommandMap } from '../models';

@singleton()
export class Logger {
  private readonly newLine = '\n';

  constructor(@inject(CommandsMap) private readonly commandsMap: CommandMap) {
  }

  error(message: string | Error, withNewLine: boolean = false): void {
    console.error(this.constructMessage(red(typeof message === 'string' ? message : message.message), withNewLine));
  }

  info(message: string, withNewLine: boolean = false): void {
    console.info(this.constructMessage(cyan(message), withNewLine));
  }

  log(message: string, withNewLine: boolean = false): void {
    console.log(this.constructMessage(message, withNewLine));
  }

  availableCommands() {
    this.info(`
Available commands:
${ Object.values(this.commandsMap).map(command => `- ${ command.name }: ${ command.description }`).join(this.newLine) }
    `);
  }

  private constructMessage(message: string, withNewLine: boolean): string {
    return withNewLine ? message + this.newLine : message;
  }
}
