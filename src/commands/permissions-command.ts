import { CliCommand } from '../models';

export const permissionsCommand: CliCommand = {
  name: 'permissions',
  alias: 'p',
  description: 'Extract Permissions collection from an API endpoint',
  options: [
    {
      type: 'input',
      name: 'url',
      alias: 'u',
      description: 'API Endpoint to fetch Permissions',
      message: 'What is the url for the endpoint?',
      validationMessage: 'URL cannot be emptied',
      required: true,
    },
    {
      type: 'input',
      name: 'outputPath',
      alias: 'op',
      description: 'Output path for TypeScript file',
      message: 'Where to store the generated file?',
      validationMessage: 'Output path cannot be emptied',
      required: true,
    },
    {
      type: 'input',
      name: 'outputName',
      alias: 'on',
      description: 'Output name for TypeScript file',
      message: 'What to call the generated file?',
      validationMessage: 'Output name cannot be emptied',
      default: 'permissions.ts',
      required: false,
    },
  ],
};
