declare function parseCommandOutput(output: string): void;
declare function executeCommand(command: string, parser?: typeof parseCommandOutput): Promise<void>;

export { executeCommand };
