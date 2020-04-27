import { CliCommand } from '../models';

export const lokaliseCommand: CliCommand = {
  name: 'lokalise',
  alias: 'l',
  description: 'Extract EN/ES translations and generate TypeScript interface from Lokalise',
  options: [
    {
      type: 'input',
      name: 'apiKey',
      alias: 'api',
      description: 'Lokalise API Token',
      required: true,
    },
    {
      type: 'input',
      name: 'projectId',
      alias: 'pid',
      description: 'Lokalise Project ID',
      required: true,
    },
    {
      type: 'input',
      name: 'translationsOutputPath',
      alias: 'top',
      description: 'Path of the Translations output',
      default: 'src/assets/i18n',
      required: false,
    },
    {
      type: 'input',
      name: 'interfaceOutputPath',
      alias: 'iop',
      description: 'Path of the TypeScript Interface output',
      default: 'src',
      required: false,
    },
    {
      type: 'input',
      name: 'interfaceOutputName',
      alias: 'ion',
      description: 'Name of TypeScript Interface file',
      default: 'translations.types.ts',
      required: false,
    },
  ],
};
