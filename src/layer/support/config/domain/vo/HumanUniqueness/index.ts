import { ConfigMappings } from '../ConfigMappings';

declare module '../ConfigMappings' {
  export interface ConfigMappings {
    HumanUniqueness: Set<string>;
  }
}
