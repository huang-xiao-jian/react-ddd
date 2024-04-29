import { ContainerModule } from 'inversify';
import { BuiltinLanguagePlugin, I18nFetchPlugin } from './i18n';
import { JapaneseOverridePlugin } from './i18n-extension';

export class SupportExtensionModule {
  static create(): ContainerModule {
    return new ContainerModule(async (bind) => {
      // TODO - 仅作为示例，具体插件扫描加载暂时搁置
      // 扩展插件
      bind(JapaneseOverridePlugin).toSelf();
    });
  }
}

export class SupportModule {
  static create(): ContainerModule {
    return new ContainerModule((bind) => {
      // spy with i18next
      bind(I18nFetchPlugin).toSelf();
      // 原生插件
      bind(BuiltinLanguagePlugin).toSelf();
    });
  }
}
