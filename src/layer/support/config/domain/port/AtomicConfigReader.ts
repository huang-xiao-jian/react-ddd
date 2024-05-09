import { injectable } from 'inversify';
import { ConfigMappings } from '../vo/ConfigMappings';

@injectable()
export abstract class AtomicConfigReader<K extends keyof ConfigMappings> {
  abstract read(): Promise<ConfigMappings[K]>;
}
