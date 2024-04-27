import { injectable } from 'inversify';
import { ConfigMappings } from './ConfigMappings';

@injectable()
export abstract class ConfigReader {
  abstract use<K extends keyof ConfigMappings>(key: K): Promise<ConfigMappings[K]>;
}
