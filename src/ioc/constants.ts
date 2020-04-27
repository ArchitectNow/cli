import { InjectionToken } from 'tsyringe';

export const CliArguments: InjectionToken<string[]> = '@@cliArgs';
export const CommandsMap: InjectionToken<any> = '@@commandsMap';
