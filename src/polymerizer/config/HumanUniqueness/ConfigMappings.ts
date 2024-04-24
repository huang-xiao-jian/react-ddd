import { ConfigMappings } from '../ConfigMappings';

declare module '../ConfigMappings' {
  interface ConfigMappings {
    'HumanUniqueness': Set<string>
  }
}

