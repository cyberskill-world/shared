declare function logProcessStep(message: string, icon?: string): void;
declare function parseCommandOutput(output: string): void;
declare function executeCommand(command: string, description: string, parser?: typeof parseCommandOutput): Promise<void>;

export { executeCommand, logProcessStep };
