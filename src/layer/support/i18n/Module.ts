import { ContainerModule } from 'inversify';
import { BuiltinLanguagePlugin } from './BuiltinLanguagePlugin';
import { I18nFetchPlugin } from './I18nFetchPlugin';

export class I18nModule {
  static create(): ContainerModule {
    return new ContainerModule((bind) => {
      // i18next 插件形式
      bind(I18nFetchPlugin).toSelf();
      // 原生插件
      bind(BuiltinLanguagePlugin).toSelf();
    });
  }
}
