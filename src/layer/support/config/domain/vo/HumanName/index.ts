import { ConfigMappings } from '../ConfigMappings';

export type HumaneNameElement = 'first' | 'middle' | 'last' | 'full';
export type HumaneNameElements = Set<HumaneNameElement>;

declare module '../ConfigMappings' {
  export interface ConfigMappings {
    HumanName: HumaneNameElements;
  }
}
