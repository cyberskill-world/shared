import * as fs from 'node:fs';

export const fileExists = (filePath: string) => fs.existsSync(filePath);
