import { injectable } from 'inversify';
import { ConfigMappings } from '../vo/ConfigMappings';

@injectable()
export abstract class ConfigReader {
  abstract read<K extends keyof ConfigMappings>(key: K): Promise<ConfigMappings[K]>;
}
