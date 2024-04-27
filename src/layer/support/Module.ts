import { Axios } from 'axios';
import { AsyncContainerModule, ContainerModule } from 'inversify';
import { BuiltinLanguagePlugin } from './i18n/BuiltinLanguagePlugin';
import { I18nFetchPlugin } from './i18n/I18nFetchPlugin';
import { JapaneseOverridePlugin } from './i18n/JapaneseOverridePlugin';

export class SupportExtensionModule {
  static create(): ContainerModule {
    return new ContainerModule(async (bind) => {
      // spy with i18next
      bind(I18nFetchPlugin).toSelf();
      // 原生插件
      bind(BuiltinLanguagePlugin).toSelf();
      // 扩展插件
      // TODO - 仅作为示例，具体插件扫描加载暂时搁置
      bind(JapaneseOverridePlugin).toSelf();
    });
  }
}

export class SupportModule {
  static create(http: Axios): AsyncContainerModule {
    return new AsyncContainerModule(async (bind) => {});
  }
}
