import { config } from 'migrate-mongo';

export function setMongoMigrateConfig(options: config.Config) {
    config.set(options);
}
