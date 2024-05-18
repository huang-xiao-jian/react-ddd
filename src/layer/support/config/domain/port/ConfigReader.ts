import { injectable } from 'inversify';
import { ConfigMappings } from '../vo/ConfigMappings';

type ConfigMappingsReflector<T extends readonly (keyof ConfigMappings)[]> = {
  [P in keyof T]: ConfigMappings[T[P]];
};

@injectable()
export abstract class ConfigReader {
  abstract read<K extends keyof ConfigMappings>(key: K): Promise<ConfigMappings[K]>;

  abstract batchRead<K extends keyof ConfigMappings, A extends readonly K[]>(
    ...args: A
  ): Promise<ConfigMappingsReflector<A>>;
}
