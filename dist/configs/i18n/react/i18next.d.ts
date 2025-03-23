import * as i18next from 'i18next';
import { InitOptions } from 'i18next';

declare function initI18Next(options: InitOptions): Promise<i18next.TFunction<"translation", undefined>>;

export { initI18Next };
