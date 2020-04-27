import { container } from 'tsyringe';
import { lokaliseCommand, permissionsCommand } from '../commands';
import { CommandMap } from '../models';
import { CliArguments, CommandsMap } from './constants';

export function setupIocContainer(cliArgs: string[]) {
  container.register<string[]>(CliArguments, { useValue: cliArgs });
  container.register<CommandMap>(CommandsMap, {
    useValue: [lokaliseCommand, permissionsCommand].reduce((map, cmd) => {
      map[cmd.name] = cmd;
      return map;
    }, {} as CommandMap),
  });
}
