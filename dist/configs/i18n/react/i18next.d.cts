import * as i18next from 'i18next';
import { InitOptions } from 'i18next';

declare function createI18NextConfig(options: InitOptions): Promise<i18next.TFunction<"translation", undefined>>;

export { createI18NextConfig };
