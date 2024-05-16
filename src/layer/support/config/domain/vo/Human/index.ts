import { ConfigMappings } from '../ConfigMappings';

export type HumaneNameElement = 'first' | 'middle' | 'last' | 'full';
export type HumaneNameElements = Set<HumaneNameElement>;

declare module '../ConfigMappings' {
  export interface ConfigMappings {
    /**
     * 自然人姓名字段集合
     */
    HumanName: HumaneNameElements;
    /**
     * 自然人身份多要素
     */
    HumanUniqueness: Set<string>;
  }
}
