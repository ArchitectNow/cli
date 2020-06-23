import { CliCommand } from './command';

export interface CommandMap {
  [key: string]: CliCommand;
}
