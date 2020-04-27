# @architectnow/cli
This is a generic CLI to be used for multiple projects at **ArchitectNow**

## Installations

```
npm i -g @architectnow/cli
yarn add global @architectnow/cli
```

or use `npx`

```
npx @architectnow/cli <sub-command>
```

## Usage

Once installed, `architectnow` command will be available. Current available sub-commands are:
- `permissions`
- `lokalise`

```
architectnow <sub-command>
```

> or use `npx` as above without having to install `@architectnow/cli`

## Commands
Each command, when run the first time, will generate a `.architectnow/<command_name>.json`
to store the options entered so the CLI will not ask for the information the next time it runs.
Make sure to run the CLI at the root level of your project. Ideally, where `package.json` is.

### Permissions
Generate a permissions TypeScript enum from an API endpoint that exposes permissions in the following format:

```json
{
   "GroupingName": {
      "ResourceName": "grouping.resource",
      "ResourceName2": "grouping.resource2",
      "ResourceNameItemName": "grouping.resource.item",
      "ResourceNameItemName2": "grouping.resource.item2",
   },
   "GroupingName2": {
         "ResourceName": "grouping2.resource",
         "ResourceName2": "grouping2.resource2",
         "ResourceNameItemName": "grouping2.resource.item",
         "ResourceNameItemName2": "grouping2.resource.item2",
  }
}
```

Generated TypeScript enum will be in the following format:

```typescript
export enum Permissions {
    GroupingNameResourceName = "grouping.resource";
    GroupingNameResourceName2 = "grouping.resource2";
    // ...
}
```

```
architectnow permissions
architectnow p
```

- Command name: `permissions`
- Alias: `p`
- Options:
    - `url`: The API Endpoint to fetch the Permissions JSON
    - `outputPath`: Where to store the generated enum
    - `outputName`: The generated enum file name (default: `permissions.ts`)

### Lokalise
Generate translation files in JSON format depending on the languages set on the Lokalise project. A TypeScript interface will also be generated to accompany the translations.

```
architectnow lokalise
architectnow l
```

- Command name: `lokalise`
- Alias: 'l'
- Options:
    - `apiKey`: Lokalise API Key
    - `projectId`: Project ID on Lokalise
    - `translationsOutputPath`: Where to store the generated translations JSON files (default: `src/assets/i18n`)
    - `interfaceOutputPath`: Where to store the generated TypeScript interface (default: `src`)
    - `interfaceOutputName`: The generated interface file name (default: `translations.types.ts`)

- Plural key: `<keyName>_plural` (eg: `activity` and `activity_plural`)


