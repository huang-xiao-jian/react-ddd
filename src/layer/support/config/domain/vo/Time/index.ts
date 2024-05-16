import { ConfigMappings } from '../ConfigMappings';

declare module '../ConfigMappings' {
  export interface ConfigMappings {
    /**
     * 系统配置时区
     */
    timezone: string;
    /**
     * 系统配置格式化
     */
    dateFormat: string;
    timeFormat: string;
    dateTimeFormat: string;
    durationFormat: string;
  }
}
