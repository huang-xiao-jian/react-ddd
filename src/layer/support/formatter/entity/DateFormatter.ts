import { ConfigReader } from '@/layer/support/config';
import dayjs from 'dayjs';
import { injectable, postConstruct } from 'inversify';
import { Formatter } from './Formatter';

declare module './Formatter' {
  export interface FormatterMappings {
    date: DateFormatter;
  }
}

@injectable()
export class DateFormatter extends Formatter {
  // 占位属性，实例化阶段读取配置
  private pattern: string = '';

  constructor(private readonly configReader: ConfigReader) {
    super();
  }

  @postConstruct()
  private async onInit() {
    this.pattern = await this.configReader.read('dateFormat');
  }

  format(raw: string | number): string {
    return dayjs(raw).format(this.pattern);
  }
}
