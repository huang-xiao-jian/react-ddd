import { ConfigMappings } from '../ConfigMappings';

export type HumaneNameElement = 'first' | 'middle' | 'last' | 'full'

declare module '../ConfigMappings' {
  interface ConfigMappings {
    'HumaneName': Set<HumaneNameElement>
  }
}

