import 'reflect-metadata';
import { container } from 'tsyringe';
import { CLI } from './cli';
import { setupIocContainer } from './ioc/container';
import { Logger } from './utils';

export async function execute(...cliArgs: string[]) {
  setupIocContainer(cliArgs);
  const logger = container.resolve(Logger);

  if (!cliArgs || !cliArgs.length) {
    logger.availableCommands();
    return 0;
  }

  const cli = container.resolve(CLI);
  return cli.executeCli();
}

execute(...process.argv.slice(2))
  .then(process.exit)
  .catch(err => {
    console.error('Unknown error: ' + err.toString());
    process.exit(127);
  });
