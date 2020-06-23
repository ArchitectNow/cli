import { CommandMap } from '../models';
import { InjectionToken } from 'tsyringe';

export const CliArguments: InjectionToken<string[]> = '@@cliArgs';
export const CommandsMap: InjectionToken<CommandMap> = '@@commandsMap';
