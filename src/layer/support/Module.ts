import { Container } from 'inversify';
import { ConfigModule } from './config';
import { FormatterModule } from './formatter';
import { I18nModule } from './i18n';

export class SupportModule {
  /**
   * 控制反转，适用于内部多模块场景
   */
  static connect(container: Container): void {
    // i18n
    container.load(I18nModule.create());
    // formatter
    container.load(FormatterModule.create());
    // config
    container.load(ConfigModule.create());
  }
}
