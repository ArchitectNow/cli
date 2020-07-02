export interface LokaliseCommandOption {
  apiKey: string;
  projectId: string;
  translationsOutputPath: string;
  shouldGenerateInterface: boolean;
  interfaceOutputPath?: string;
  interfaceOutputName?: string;
}
